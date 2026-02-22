#!/usr/bin/env python3
"""
ocr_easyocr.py — Improve HSK5 coverage using EasyOCR (better Chinese recognition).

Reads existing scripts/hsk5_raw.json, identifies gaps (missing entry numbers),
runs EasyOCR on the relevant PDF pages to fill those gaps, translates new
entries to Vietnamese, and writes an updated hsk5_raw.json.

Usage:
    python3 scripts/ocr_easyocr.py
    python3 scripts/ocr_easyocr.py --skip-translate
    python3 scripts/ocr_easyocr.py --pages-only     # show which pages have gaps
"""

import re
import sys
import json
import time
import math
import argparse
import os

try:
    import easyocr
    from pdf2image import convert_from_path
    from PIL import Image, ImageEnhance
    from pypinyin import pinyin as get_pinyin, Style
    from deep_translator import GoogleTranslator
except ImportError as e:
    print(f"Missing dependency: {e}")
    print("Run: python3 -m pip install easyocr pytesseract pdf2image deep-translator pypinyin pillow --break-system-packages")
    sys.exit(1)

PDF_PATHS = [
    "data-pdf/hsk5/tu-vung-hsk-5-1-20.pdf",   # pages 1-20  (~entries 1-1300)
    "data-pdf/hsk5/tu-vung-hsk-5-21-40.pdf",  # pages 21-40 (~entries 1300-2500)
]
# Approximate entries per PDF page (each page has 3 columns, ~20-22 entries per col)
ENTRIES_PER_PAGE = 65
INPUT_JSON  = "scripts/hsk5_raw.json"
OUTPUT_JSON = "scripts/hsk5_raw.json"   # overwrite in-place

TRANSLATE_BATCH = 50
TRANSLATE_SLEEP = 0.8

# ── Regex helpers ─────────────────────────────────────────────────────────────

_NUM_RAW_RE = re.compile(
    r'^[\W\s]*([0-9$SO]{1,5})\s*[.，,。、]\s*["""\'\'「」『』"]*\s*(.+)$'
)
_CJK_RE = re.compile(r'[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]{1,8}')


def _clean_num(s):
    s = s.replace('$', '5').replace('S', '5').replace('O', '0').replace('s', '5')
    s = s.lstrip('0') or '0'
    try:
        n = int(s)
        return n if 1 <= n <= 2500 else None
    except ValueError:
        return None


def derive_pinyin(chinese):
    parts = get_pinyin(chinese, style=Style.TONE, heteronym=False)
    return "".join(p[0] for p in parts)


# ── Gap analysis ──────────────────────────────────────────────────────────────

def find_gaps(data):
    """Return sorted list of missing entry numbers 1-2500."""
    present = set(e['num'] for e in data)
    return sorted(n for n in range(1, 2501) if n not in present)


def gaps_to_pages(gaps):
    """
    Map entry numbers to (pdf_index, page_number_1based) tuples.
    Both PDFs have 20 pages; each page covers ~ENTRIES_PER_PAGE entries.
    PDF 0: entries ~1–1300  (pages 1-20)
    PDF 1: entries ~1300–2500 (pages 1-20)
    """
    page_set = set()
    for num in gaps:
        if num <= 1300:
            pdf_idx  = 0
            page_num = max(1, min(20, math.ceil(num / ENTRIES_PER_PAGE)))
        else:
            pdf_idx  = 1
            rel      = num - 1300
            page_num = max(1, min(20, math.ceil(rel / ENTRIES_PER_PAGE)))
        page_set.add((pdf_idx, page_num))
    return sorted(page_set)


# ── EasyOCR extraction ────────────────────────────────────────────────────────

# Number-only pattern: "6." "10." "5$12." etc.
_NUM_ONLY_RE = re.compile(r'^[\W\s]*([0-9$SO]{1,5})\s*[.，,。、]\s*$')

def preprocess_np(img):
    """Convert PIL image to high-contrast grayscale numpy array for EasyOCR."""
    import numpy as np
    g = img.convert("L")
    g = g.point(lambda x: 255 if x > 140 else 0)
    return np.array(g)


def parse_easyocr_column(results):
    """
    Parse EasyOCR output for one column.

    EasyOCR splits entries into separate blocks, sorted by vertical position:
      Block A (number): "6."
      Block B (chinese): "爱好"
    Or combined on one line: "1。阿姨"

    Strategy: sort by Y, then pair each number-block with the next CJK-block.
    """
    entries = []
    # Sort blocks by top-left Y coordinate
    sorted_blocks = sorted(results, key=lambda r: r[0][0][1])

    pending_num = None

    for bbox, text, _conf in sorted_blocks:
        text = text.strip()
        if not text:
            continue

        # Case 1: Number + Chinese on same line, e.g. "1。阿姨"
        m_combo = _NUM_RAW_RE.match(text)
        if m_combo:
            num = _clean_num(m_combo.group(1))
            cjk = _CJK_RE.findall(m_combo.group(2))
            if num and cjk:
                entries.append({"num": num, "chinese": max(cjk, key=len)})
                pending_num = None
                continue

        # Case 2: Number-only block, e.g. "6." or "10."
        m_num = _NUM_ONLY_RE.match(text)
        if m_num:
            num = _clean_num(m_num.group(1))
            if num:
                pending_num = num
            continue

        # Case 3: CJK block — associate with pending number
        cjk = _CJK_RE.findall(text)
        if cjk and pending_num is not None:
            chinese = max(cjk, key=len)
            if 1 <= len(chinese) <= 6:
                entries.append({"num": pending_num, "chinese": chinese})
            pending_num = None
            continue

        # Non-matching block (pinyin line, stray char, etc.) — leave pending_num as-is

    return entries


def ocr_page_easyocr(reader, page_img):
    """
    Run EasyOCR on a page split into 3 columns.
    Returns deduplicated list of {num, chinese} dicts.
    """
    w, h = page_img.size
    col_w = w // 3
    all_entries = []

    for x0, x1 in [
        (0,              col_w + 40),
        (col_w - 40,     col_w * 2 + 40),
        (col_w * 2 - 40, w),
    ]:
        col = page_img.crop((x0, 300, x1, h - 300))
        results = reader.readtext(preprocess_np(col), detail=1, paragraph=False)
        all_entries.extend(parse_easyocr_column(results))

    seen = {}
    for e in all_entries:
        if e["num"] not in seen:
            seen[e["num"]] = e
    return list(seen.values())


# ── Translation ───────────────────────────────────────────────────────────────

def translate_batch(texts):
    translator = GoogleTranslator(source="zh-CN", target="vi")
    results = []
    for i in range(0, len(texts), TRANSLATE_BATCH):
        batch = texts[i : i + TRANSLATE_BATCH]
        for text in batch:
            try:
                results.append(translator.translate(text) or "")
            except Exception as ex:
                print(f"  [warn] translate failed for '{text}': {ex}")
                results.append("")
        done = min(i + TRANSLATE_BATCH, len(texts))
        print(f"  translated {done}/{len(texts)}...")
        if i + TRANSLATE_BATCH < len(texts):
            time.sleep(TRANSLATE_SLEEP)
    return results


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--skip-translate", action="store_true")
    parser.add_argument("--pages-only", action="store_true",
                        help="Just show which pages need processing and exit")
    args = parser.parse_args()

    # Load existing data
    with open(INPUT_JSON, encoding="utf-8") as f:
        data = json.load(f)

    gaps = find_gaps(data)
    print(f"Existing entries: {len(data)}/2500  —  Gaps: {len(gaps)}")

    if not gaps:
        print("No gaps — nothing to do.")
        return

    pages_needed = gaps_to_pages(gaps)
    print(f"Pages to scan: {len(pages_needed)}")
    for pdf_idx, page_num in pages_needed[:10]:
        print(f"  PDF {pdf_idx+1} page {page_num}")
    if len(pages_needed) > 10:
        print(f"  ... and {len(pages_needed)-10} more")

    if args.pages_only:
        return

    # Init EasyOCR
    print("\nInitialising EasyOCR (ch_sim + en)...")
    reader = easyocr.Reader(['ch_sim', 'en'], gpu=False)
    print("Ready.")

    # Track which entries already exist
    existing = {e['num']: e for e in data}
    new_entries = {}

    # Process pages that contain gaps
    for pdf_idx, page_num in pages_needed:
        pdf_path = PDF_PATHS[pdf_idx]
        print(f"\n  PDF {pdf_idx+1} page {page_num:02d} — {pdf_path}")

        pages = convert_from_path(pdf_path, dpi=200,
                                  first_page=page_num, last_page=page_num)
        page_img = pages[0]
        del pages

        found = ocr_page_easyocr(reader, page_img)

        new_on_page = 0
        for e in found:
            num = e["num"]
            if num not in existing and num not in new_entries:
                new_entries[num] = e
                new_on_page += 1

        print(f"    found {len(found)} entries, {new_on_page} new gaps filled")

    print(f"\nNew entries found by EasyOCR: {len(new_entries)}")

    # Add pinyin to new entries
    for e in new_entries.values():
        e["pinyin"]     = derive_pinyin(e["chinese"])
        e["vietnamese"] = ""

    # Translate
    if not args.skip_translate and new_entries:
        entries_list = list(new_entries.values())
        print(f"Translating {len(entries_list)} new entries...")
        vi_texts = translate_batch([e["chinese"] for e in entries_list])
        for e, vi in zip(entries_list, vi_texts):
            e["vietnamese"] = vi

    # Merge and sort
    merged = {e['num']: e for e in data}
    merged.update(new_entries)
    all_entries = sorted(merged.values(), key=lambda x: x['num'])

    # Write output
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(all_entries, f, ensure_ascii=False, indent=2)

    remaining_gaps = find_gaps(all_entries)
    print(f"\nResult: {len(all_entries)}/2500 entries ({len(all_entries)/2500*100:.1f}%)")
    print(f"Remaining gaps: {len(remaining_gaps)}")
    print(f"\nNext: python3 scripts/generate_js.py")


if __name__ == "__main__":
    main()
