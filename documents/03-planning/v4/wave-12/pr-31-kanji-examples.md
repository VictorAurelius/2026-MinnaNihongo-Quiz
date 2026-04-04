# PR #31: Populate N2/N1 Kanji Examples

**Wave:** 12 — Kanji Enhancement
**Branch:** `feat/kanji-n2-n1-examples`
**Est:** 8h | **New tests:** ~20
**Status:** [ ] Not started

---

## 1. Brainstorm

### Problem
- N2/N1 kanji data (800 kanji) hiện có `examples: []` — mảng rỗng
- Người học không có ví dụ từ thực tế để hiểu cách dùng kanji trong câu
- Kanji N5/N4 (Minna) mỗi ký tự có 3 ví dụ tốt → cần parity cho N2/N1
- Writing mode, Flashcard back side đều phụ thuộc `examples` để hiển thị context

### Solution
- Dùng parallel agents để generate 3 ví dụ chất lượng cao cho mỗi trong 800 kanji
- Mỗi ví dụ gồm: `word` (chữ Hán), `kana` (furigana), `meaning` (English), `vietnamese`
- Ưu tiên từ JLPT N2/N1 thực tế, tần suất cao
- Giữ nguyên cấu trúc `KanjiExampleWord` hiện có

### Cấu trúc ví dụ target
```typescript
// Ví dụ cho kanji 愛 (N2)
examples: [
  { word: '愛情', kana: 'あいじょう', meaning: 'love, affection', vietnamese: 'tình yêu, tình cảm' },
  { word: '愛国心', kana: 'あいこくしん', meaning: 'patriotism', vietnamese: 'lòng yêu nước' },
  { word: '愛用', kana: 'あいよう', meaning: 'favorite use, using habitually', vietnamese: 'thường dùng, yêu thích dùng' }
]
```

### Scope
| File | Kanji | Ví dụ cần thêm |
|------|-------|----------------|
| `kanji-n2.ts` | 400 | ~1,200 examples |
| `kanji-n1.ts` | 400 | ~1,200 examples |
| **Tổng** | **800** | **~2,400 examples** |

### Risks
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Ví dụ không chính xác | Medium | High | Dùng JLPT wordlist làm nguồn, review sample |
| File size tăng nhiều | Low | Low | ~2,400 × 4 fields ≈ +200KB, acceptable |
| Kanji xuất hiện trong nhiều ví dụ | Low | Low | OK, diversity là tốt |
| Kana sai furigana | Medium | Medium | Verify bằng test — kana phải chứa ký tự kana hợp lệ |

### Edge Cases
- Kanji rất hiếm (N1 level) → vẫn tìm được ít nhất 2 ví dụ thực tế
- Từ ghép phức tạp → dùng từ phổ biến nhất, không quá chuyên ngành
- Trùng ví dụ giữa các kanji → OK, tự nhiên vì kanji dùng chung trong từ

---

## 2. Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | Viết tests RED cho data validation | `src/tests/data/kanji-examples.test.ts` | 30m | ~20 tests FAIL |
| 2 | Generate examples N2 (200 kanji, batch 1) | `src/lib/data/kanji/kanji-n2.ts` | 2h | examples.length >= 3 |
| 3 | Generate examples N2 (200 kanji, batch 2) | `src/lib/data/kanji/kanji-n2.ts` | 2h | examples.length >= 3 |
| 4 | Generate examples N1 (200 kanji, batch 1) | `src/lib/data/kanji/kanji-n1.ts` | 2h | examples.length >= 3 |
| 5 | Generate examples N1 (200 kanji, batch 2) | `src/lib/data/kanji/kanji-n1.ts` | 2h | examples.length >= 3 |
| 6 | Run tests GREEN + CI | — | 15m | All pass |

---

## 3. TDD — Full Test Code

```typescript
// src/tests/data/kanji-examples.test.ts
import { describe, it, expect } from 'vitest';
import { N2_KANJI } from '$lib/data/kanji/kanji-n2';
import { N1_KANJI } from '$lib/data/kanji/kanji-n1';

describe('N2 Kanji Examples', () => {
  it('every N2 kanji has at least 3 examples', () => {
    for (const k of N2_KANJI) {
      expect(k.examples.length, `${k.character} has < 3 examples`).toBeGreaterThanOrEqual(3);
    }
  });

  it('each example has required fields', () => {
    for (const k of N2_KANJI) {
      for (const ex of k.examples) {
        expect(ex.word, `${k.character} example missing word`).toBeTruthy();
        expect(ex.kana, `${k.character} example missing kana`).toBeTruthy();
        expect(ex.meaning, `${k.character} example missing meaning`).toBeTruthy();
        expect(ex.vietnamese, `${k.character} example missing vietnamese`).toBeTruthy();
      }
    }
  });

  it('example kana contains only valid kana characters', () => {
    const kanaRegex = /^[\u3040-\u309F\u30A0-\u30FF\u30FC\s・]+$/;
    for (const k of N2_KANJI) {
      for (const ex of k.examples) {
        expect(kanaRegex.test(ex.kana), `${k.character} example kana invalid: ${ex.kana}`).toBe(true);
      }
    }
  });

  it('example word contains the kanji character', () => {
    for (const k of N2_KANJI) {
      const hasKanji = k.examples.some(ex => ex.word.includes(k.character));
      expect(hasKanji, `${k.character} has no example containing the kanji itself`).toBe(true);
    }
  });
});

describe('N1 Kanji Examples', () => {
  it('every N1 kanji has at least 3 examples', () => {
    for (const k of N1_KANJI) {
      expect(k.examples.length, `${k.character} has < 3 examples`).toBeGreaterThanOrEqual(3);
    }
  });

  it('each example has required fields', () => {
    for (const k of N1_KANJI) {
      for (const ex of k.examples) {
        expect(ex.word, `${k.character} example missing word`).toBeTruthy();
        expect(ex.kana, `${k.character} example missing kana`).toBeTruthy();
        expect(ex.meaning, `${k.character} example missing meaning`).toBeTruthy();
        expect(ex.vietnamese, `${k.character} example missing vietnamese`).toBeTruthy();
      }
    }
  });

  it('example kana contains only valid kana characters', () => {
    const kanaRegex = /^[\u3040-\u309F\u30A0-\u30FF\u30FC\s・]+$/;
    for (const k of N1_KANJI) {
      for (const ex of k.examples) {
        expect(kanaRegex.test(ex.kana), `${k.character} example kana invalid: ${ex.kana}`).toBe(true);
      }
    }
  });

  it('example word contains the kanji character', () => {
    for (const k of N1_KANJI) {
      const hasKanji = k.examples.some(ex => ex.word.includes(k.character));
      expect(hasKanji, `${k.character} has no example containing the kanji itself`).toBe(true);
    }
  });
});

describe('N2/N1 Examples — totals', () => {
  it('N2 has >= 1200 total examples', () => {
    const total = N2_KANJI.reduce((s, k) => s + k.examples.length, 0);
    expect(total).toBeGreaterThanOrEqual(1200);
  });

  it('N1 has >= 1200 total examples', () => {
    const total = N1_KANJI.reduce((s, k) => s + k.examples.length, 0);
    expect(total).toBeGreaterThanOrEqual(1200);
  });
});
```

---

## 4. Implementation Notes

### Data generation strategy
- Dùng 10 parallel agents (5 cho N2, 5 cho N1), mỗi agent xử lý 80 kanji
- Nguồn tham khảo: JLPT N2/N1 wordlist, KANJIDIC2, Jisho.org pattern
- Format output nhất quán với `KanjiExampleWord` interface

### Verify sau generate
```bash
# Chạy test ngay sau khi generate mỗi batch
npx vitest run src/tests/data/kanji-examples.test.ts
```

### Không thay đổi
- Cấu trúc `KanjiItem` interface
- `strokeCount`, `onyomi`, `kunyomi`, `jlpt`, `vietnamese`, `english` fields
- KanjiVG SVG files
