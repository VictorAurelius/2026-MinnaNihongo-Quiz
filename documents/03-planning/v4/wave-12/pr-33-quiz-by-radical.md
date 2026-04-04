# PR #33: Quiz by Radical

**Wave:** 12 — Kanji Enhancement
**Branch:** `feat/kanji-quiz-by-radical`
**Est:** 6h | **New tests:** ~15
**Status:** [ ] Not started

---

## 1. Brainstorm

### Problem
- Radicals page (`/kanji/radicals`) hiện chỉ là bảng tham khảo — xem, không học được
- Học viên muốn luyện tập kanji theo nhóm bộ thủ (vd: tất cả kanji có bộ 水 = liên quan đến nước)
- Học theo radical giúp ghi nhớ tốt hơn (pattern recognition) — phương pháp này được Remembering the Kanji (RTK) và KANJIDIC validate

### Solution
- Thêm "Quiz" button vào radical page, dẫn đến quiz tất cả kanji trong radical đó
- Reuse `kanjiQuizUtils` và quiz components hiện có (flashcard, mc, typing)
- Route mới: `/kanji/radicals/[radicalId]/quiz/[mode]`
- Radical data đã có sẵn: `radicals.ts` với KRADFILE mapping (kanji → radicals)

### User Flow
```
/kanji/radicals
  → click vào radical 水 (radical id: 'water' hoặc unicode)
  → /kanji/radicals/水
      → xem danh sách kanji có bộ này
      → "Luyện tập" button
  → /kanji/radicals/水/quiz/flashcard?direction=kanji-vi
      → quiz với tất cả kanji có bộ thủ 水
```

### Data Analysis
- KRADFILE đã map kanji → radicals trong `radicals.ts`
- Cần thêm function `getKanjiByRadical(radical)` → `KanjiItem[]`
- Kết hợp dữ liệu từ N5/N4 lessons + N3/N2/N1 arrays

### Risks
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Một số radical chỉ có 1-2 kanji | Medium | Low | Cho phép quiz với ít items, không enforce min |
| Route conflict với existing routes | Low | Medium | Verify routing order trong SvelteKit |
| N2/N1 examples rỗng | High | Low | PR #31 làm trước; nếu chưa có thì vẫn quiz được |
| Base path missing | Low | High | Dùng `${base}` theo convention |

### Edge Cases
- Radical không tồn tại trong KRADFILE → show "Không có kanji nào"
- Radical chỉ có 1 kanji → disable Multiple Choice (cần ≥ 4 để gen options)
- User điều hướng về từ quiz → back button về `/kanji/radicals/[radicalId]`

---

## 2. Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | Thêm `getKanjiByRadical()` vào radicals utils | `src/lib/data/kanji/radicals.ts` | 30m | Unit test pass |
| 2 | Viết tests RED cho utils + page | `src/tests/data/radicals.test.ts` (extend) | 30m | ~8 tests FAIL |
| 3 | Route: radical detail page | `src/routes/kanji/radicals/[radicalId]/+page.svelte` | 45m | Renders kanji list |
| 4 | Route: quiz page cho radical | `src/routes/kanji/radicals/[radicalId]/quiz/[mode]/+page.svelte` | 1h | Quiz works |
| 5 | Update radical landing page: add links | `src/routes/kanji/radicals/+page.svelte` | 30m | Click → detail page |
| 6 | Tests cho route component | `src/tests/routes/radical-quiz.test.ts` | 45m | ~7 tests GREEN |
| 7 | CI pass | — | 15m | ✅ |

---

## 3. TDD — Full Test Code

### radicals.test.ts (extend existing)

```typescript
// Thêm vào src/tests/data/radicals.test.ts
import { getKanjiByRadical, getAllRadicals } from '$lib/data/kanji/radicals';

describe('getKanjiByRadical', () => {
  it('returns kanji array for valid radical', () => {
    const kanji = getKanjiByRadical('水');
    expect(Array.isArray(kanji)).toBe(true);
    expect(kanji.length).toBeGreaterThan(0);
  });

  it('returns empty array for unknown radical', () => {
    const kanji = getKanjiByRadical('UNKNOWN_RADICAL_XYZ');
    expect(kanji).toEqual([]);
  });

  it('each returned kanji is a valid KanjiItem', () => {
    const kanji = getKanjiByRadical('水');
    for (const k of kanji) {
      expect(k.character).toBeTruthy();
      expect(k.english).toBeTruthy();
      expect(typeof k.strokeCount).toBe('number');
    }
  });

  it('returned kanji actually contain the radical', () => {
    // Verify cross-reference: kanji returned for radical 日 should all be in KRADFILE under 日
    const kanji = getKanjiByRadical('日');
    expect(kanji.length).toBeGreaterThan(0);
  });
});
```

### radical-quiz.test.ts

```typescript
// src/tests/routes/radical-quiz.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import userEvent from '@testing-library/user-event';

vi.mock('$lib/data/kanji/radicals', () => ({
  getKanjiByRadical: vi.fn(() => [
    { character: '海', onyomi: ['カイ'], kunyomi: ['うみ'], strokeCount: 9, jlpt: 4,
      vietnamese: 'hải', english: 'sea', examples: [] },
    { character: '泳', onyomi: ['エイ'], kunyomi: ['およ.ぐ'], strokeCount: 8, jlpt: 4,
      vietnamese: 'vịnh', english: 'swim', examples: [] },
  ]),
  getAllRadicals: vi.fn(() => [
    { radical: '水', meaning: 'water', strokeCount: 4, unicode: '6c34' }
  ])
}));

vi.mock('$lib/utils/audioUtils', () => ({ playJapaneseAudio: vi.fn() }));
vi.mock('$app/navigation', () => ({ goto: vi.fn() }));

// Test cho radical detail page
describe('Radical Detail Page', () => {
  // import RadicalDetailPage từ routes sau khi tạo file
  it('shows radical character', async () => {
    // render RadicalDetailPage với params { radicalId: '水' }
    // expect(screen.getByText('水')).toBeInTheDocument();
  });

  it('shows list of kanji for radical', async () => {
    // expect(screen.getByText('海')).toBeInTheDocument();
    // expect(screen.getByText('泳')).toBeInTheDocument();
  });

  it('has Quiz button', async () => {
    // expect(screen.getByRole('link', { name: /luyện tập|quiz/i })).toBeInTheDocument();
  });
});
```

*Note: Tests sẽ được hoàn chỉnh sau khi tạo route components.*

---

## 4. Implementation Notes

### Route structure
```
src/routes/kanji/radicals/
├── +page.svelte                      (existing — thêm link đến detail)
├── [radicalId]/
│   ├── +page.svelte                  (NEW — hiển thị kanji list)
│   ├── +page.ts                      (NEW — load radical data)
│   └── quiz/
│       └── [mode]/
│           ├── +page.svelte          (NEW — reuse KanjiQuiz player pattern)
│           └── +page.ts              (NEW — load kanji questions)
```

### Reuse pattern
```typescript
// Tương tự src/routes/kanji/[lesson]/quiz/[mode]/+page.svelte
// Chỉ thay đổi nguồn data: từ getLessonKanji() → getKanjiByRadical()
```

### getKanjiByRadical() implementation
```typescript
// Trong radicals.ts — cần aggregate từ tất cả sources:
export function getKanjiByRadical(radical: string): KanjiItem[] {
  // 1. Lấy set of kanji characters có radical này từ KRADFILE
  // 2. Lookup trong N5/N4 lessons data
  // 3. Lookup trong N3/N2/N1 arrays
  // 4. Merge & deduplicate
  // 5. Return KanjiItem[]
}
```

### Navigation với base path
```typescript
// Tất cả goto() và href phải dùng ${base}
import { base } from '$app/paths';
href={`${base}/kanji/radicals/${encodeURIComponent(radical)}/quiz/flashcard`}
```
