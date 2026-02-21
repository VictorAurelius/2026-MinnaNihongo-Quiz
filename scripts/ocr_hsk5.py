#!/usr/bin/env python3
"""
ocr_hsk5.py — OCR the 2 scanned HSK5 PDFs and translate to Vietnamese.

Output: scripts/hsk5_raw.json
  [{ "num": 1, "chinese": "阿姨", "pinyin": "āyí", "vietnamese": "cô/dì", "english": "" }, ...]

Usage:
    python3 scripts/ocr_hsk5.py
    python3 scripts/ocr_hsk5.py --skip-translate   # OCR only, translate later
"""

import re
import sys
import json
import time
import argparse
import os

try:
    from pdf2image import convert_from_path
    import pytesseract
    from PIL import Image, ImageFilter, ImageEnhance
    from pypinyin import pinyin as get_pinyin, Style
    from deep_translator import GoogleTranslator
except ImportError as e:
    print(f"Missing dependency: {e}")
    print("Run: python3 -m pip install pytesseract pdf2image deep-translator pypinyin pillow --break-system-packages")
    sys.exit(1)

PDF_PATHS = [
    "data-pdf/hsk5/tu-vung-hsk-5-1-20.pdf",
    "data-pdf/hsk5/tu-vung-hsk-5-21-40.pdf",
]

TESS_CONFIG = "--oem 3 --psm 6 -l chi_sim"
DPI = 200  # 300 OOMs with 4 GB RAM — 200 DPI still ~5200x7300 px, plenty for OCR
OUTPUT_JSON = "scripts/hsk5_raw.json"
TRANSLATE_BATCH = 50
TRANSLATE_SLEEP = 0.8  # seconds between batches


# ── Image preprocessing ─────────────────────────────────────────────────────

def preprocess(img):
    """Convert to high-contrast binary image for better OCR."""
    g = img.convert("L")
    g = ImageEnhance.Contrast(g).enhance(2.0)
    g = g.point(lambda x: 255 if x > 140 else 0)
    return g


# ── Per-column OCR ───────────────────────────────────────────────────────────

def ocr_column(page_img, x0, x1, top_trim=300, bot_trim=300):
    h = page_img.height
    col = page_img.crop((x0, top_trim, x1, h - bot_trim))
    pre = preprocess(col)
    return pytesseract.image_to_string(pre, config=TESS_CONFIG)


# ── Entry parsing ────────────────────────────────────────────────────────────

# Number prefix: digits possibly with OCR artifacts ($, S, O mixed in)
# Examples: "510.", "5$10.", "5$12.", "S30.", "$521."
_NUM_RAW_RE = re.compile(
    r'^[\W\s]*([0-9$SO]{1,5})\s*[.，,。、]\s*["""\'\'「」『』"]*\s*(.+)$'
)
# CJK block extractor
_CJK_RE = re.compile(r'[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]{1,8}')


def _clean_num(raw_num_str):
    """
    Clean an OCR'd number string:
      '5$10' -> 510, 'S30' -> 530, '0521' -> 521, '$16' -> 16
    Returns int or None if not a plausible entry number.
    """
    s = raw_num_str
    s = s.replace('$', '5').replace('S', '5').replace('O', '0').replace('s', '5')
    # Remove leading zeros except for single '0'
    s = s.lstrip('0') or '0'
    try:
        n = int(s)
        return n if 1 <= n <= 2500 else None
    except ValueError:
        return None


def parse_entries(raw_text):
    """
    Parse OCR raw text into (num, chinese) pairs.
    Lines that match 'N. CJK...' are kept.
    """
    entries = []
    for line in raw_text.splitlines():
        line = line.strip()
        if not line:
            continue
        m = _NUM_RAW_RE.match(line)
        if not m:
            continue
        num = _clean_num(m.group(1))
        if num is None:
            continue
        rest = m.group(2)
        # Extract CJK chars only (drop OCR artifacts)
        cjk_matches = _CJK_RE.findall(rest)
        if not cjk_matches:
            continue
        # Take longest CJK run (usually the actual word)
        chinese = max(cjk_matches, key=len)
        if 1 <= len(chinese) <= 6:
            entries.append({"num": num, "chinese": chinese})
    return entries


# ── Pinyin derivation ────────────────────────────────────────────────────────

def derive_pinyin(chinese):
    """Generate tone-marked pinyin from Chinese characters using pypinyin."""
    parts = get_pinyin(chinese, style=Style.TONE, heteronym=False)
    return "".join(p[0] for p in parts)


# ── Translation ──────────────────────────────────────────────────────────────

def translate_batch(texts, src="zh-CN", target="vi"):
    """Translate list of Chinese strings to Vietnamese."""
    translator = GoogleTranslator(source=src, target=target)
    results = []
    for i in range(0, len(texts), TRANSLATE_BATCH):
        batch = texts[i : i + TRANSLATE_BATCH]
        batch_results = []
        for text in batch:
            try:
                vi = translator.translate(text)
                batch_results.append(vi or "")
            except Exception as ex:
                print(f"  [warn] translate failed for '{text}': {ex}")
                batch_results.append("")
        results.extend(batch_results)
        done = min(i + TRANSLATE_BATCH, len(texts))
        print(f"  translated {done}/{len(texts)}...")
        if i + TRANSLATE_BATCH < len(texts):
            time.sleep(TRANSLATE_SLEEP)
    return results


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--skip-translate", action="store_true",
                        help="Skip translation step (fill vietnamese with empty string)")
    parser.add_argument("--resume", action="store_true",
                        help="Load existing hsk5_raw.json and only translate entries missing vietnamese")
    args = parser.parse_args()

    # ── Resume mode ──
    if args.resume and os.path.exists(OUTPUT_JSON):
        print(f"Resuming from {OUTPUT_JSON}...")
        with open(OUTPUT_JSON, encoding="utf-8") as f:
            all_entries = json.load(f)
        missing = [e for e in all_entries if not e.get("vietnamese")]
        if missing and not args.skip_translate:
            print(f"Translating {len(missing)} missing entries...")
            vi_texts = translate_batch([e["chinese"] for e in missing])
            for e, vi in zip(missing, vi_texts):
                e["vietnamese"] = vi
            with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
                json.dump(all_entries, f, ensure_ascii=False, indent=2)
            print(f"Done. Saved {OUTPUT_JSON}")
        return

    # ── OCR phase ──
    seen = {}  # num → entry

    for pdf_idx, pdf_path in enumerate(PDF_PATHS):
        if not os.path.exists(pdf_path):
            print(f"[warn] PDF not found: {pdf_path}")
            continue

        # Get page count first without loading images
        from pdf2image.exceptions import PDFInfoNotInstalledError
        import subprocess
        result = subprocess.run(
            ["pdfinfo", pdf_path], capture_output=True, text=True
        )
        n_pages = 20  # default
        for line in result.stdout.splitlines():
            if line.startswith("Pages:"):
                n_pages = int(line.split(":")[1].strip())
                break

        print(f"\n[{pdf_idx+1}/{len(PDF_PATHS)}] Processing {pdf_path} ({n_pages} pages)...")

        for page_num in range(1, n_pages + 1):
            # Load ONE page at a time to avoid OOM
            pages = convert_from_path(pdf_path, dpi=DPI, first_page=page_num, last_page=page_num)
            page_img = pages[0]
            del pages  # free RAM immediately
            w = page_img.width
            col_w = w // 3

            page_entries = []
            for x0, x1 in [
                (0,              col_w + 40),
                (col_w - 40,     col_w * 2 + 40),
                (col_w * 2 - 40, w),
            ]:
                raw = ocr_column(page_img, x0, x1)
                page_entries.extend(parse_entries(raw))

            # Deduplicate within page (keep first occurrence)
            page_unique = {}
            for e in page_entries:
                if e["num"] not in page_unique:
                    page_unique[e["num"]] = e

            new_on_page = sum(1 for n in page_unique if n not in seen)
            # First occurrence wins — don't overwrite entries from earlier pages
            for num, entry in page_unique.items():
                if num not in seen:
                    seen[num] = entry
            print(f"  page {page_num:02d}: found {len(page_unique)} entries ({new_on_page} new), "
                  f"total so far: {len(seen)}")

            if len(page_unique) < 40:
                print(f"  [warn] page {page_num} yielded only {len(page_unique)} entries — "
                      f"may need manual review")

    # Sort and add pinyin
    all_entries = sorted(seen.values(), key=lambda x: x["num"])
    print(f"\nTotal unique entries after OCR: {len(all_entries)}")

    print("Deriving pinyin from Chinese characters...")
    for e in all_entries:
        e["pinyin"] = derive_pinyin(e["chinese"])
        e["vietnamese"] = ""
        e["english"] = ""

    # ── Translation phase ──
    if not args.skip_translate:
        print(f"\nTranslating {len(all_entries)} entries to Vietnamese...")
        vi_texts = translate_batch([e["chinese"] for e in all_entries])
        for e, vi in zip(all_entries, vi_texts):
            e["vietnamese"] = vi or ""

    # ── Write output ──
    os.makedirs(os.path.dirname(OUTPUT_JSON), exist_ok=True)
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(all_entries, f, ensure_ascii=False, indent=2)

    filled = sum(1 for e in all_entries if e.get("vietnamese"))
    print(f"\nWrote {OUTPUT_JSON}")
    print(f"  Total entries: {len(all_entries)}")
    print(f"  With Vietnamese: {filled}")
    missing_nums = [e["num"] for e in all_entries if not e.get("vietnamese")]
    if missing_nums[:10]:
        print(f"  Missing VI for entries: {missing_nums[:10]}{'...' if len(missing_nums) > 10 else ''}")

    print("\nNext step: review scripts/hsk5_raw.json, then run:")
    print("  python3 scripts/generate_js.py")


if __name__ == "__main__":
    main()
