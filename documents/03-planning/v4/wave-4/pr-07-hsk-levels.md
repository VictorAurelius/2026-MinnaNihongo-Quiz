# PR #7: HSK Levels Expansion (HSK1-4 Data)

**Wave:** 4 — Bilingual Advantage
**Branch:** `feat/hsk-levels`
**Est:** 8h | **New tests:** 10
**Status:** [ ] Not started

---

## 1. Brainstorm

### Problem
- Chỉ có HSK5 (1603 words) — quá khó cho beginner
- HSK1-4 dễ hơn (~1200 words), phù hợp cho learner mới

### Solution
- Thêm HSK1-4 data files, restructure index thành multi-level
- Level selector trên HSK landing page
- Backward compatible: HSK5_DATA export vẫn hoạt động

### Data Sizes
| Level | Words | Groups |
|-------|-------|--------|
| HSK1 | ~150 | 1 |
| HSK2 | ~150 | 1 |
| HSK3 | ~300 | 2 |
| HSK4 | ~600 | 3 |
| HSK5 | 1603 | 5 (existing) |

### Risks
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Data accuracy | Medium | Medium | Cross-check with official HSK word lists |
| Bundle size +200KB | Low | Low | Code-split per level, lazy import |
| Breaking existing HSK5 imports | Medium | High | Keep HSK5_DATA export, add getHSKData(level) |

---

## 2. Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | Viết HSK data tests (RED) | `src/tests/data/hsk.test.ts` | 10m | 10 tests FAIL |
| 2 | Create HSK1 data | `src/lib/data/hsk/hsk1.ts` | 60m | Data file |
| 3 | Create HSK2 data | `src/lib/data/hsk/hsk2.ts` | 60m | Data file |
| 4 | Create HSK3 data | `src/lib/data/hsk/hsk3.ts` | 90m | Data file |
| 5 | Create HSK4 data | `src/lib/data/hsk/hsk4.ts` | 120m | Data file |
| 6 | Update HSK index + types | `src/lib/data/hsk/index.ts`, `src/lib/types/hsk.ts` | 15m | Tests GREEN |
| 7 | Update HSK landing page (level selector) | `src/routes/hsk/+page.svelte` | 20m | Visual |
| 8 | Update HSK group page (support all levels) | `src/routes/hsk/[group]/+page.svelte` | 10m | Works for all levels |

---

## 3. TDD — Test Cases

```typescript
// src/tests/data/hsk.test.ts
import { describe, it, expect } from 'vitest';
import { getHSKData, getAllHSKLevels, HSK5_DATA } from '$lib/data/hsk';

describe('HSK Data', () => {
  it('should have 5 HSK levels', () => {
    const levels = getAllHSKLevels();
    expect(levels.length).toBe(5);
  });

  it('HSK1 should have >= 100 words', () => {
    const data = getHSKData(1);
    const total = data.reduce((s, g) => s + g.words.length, 0);
    expect(total).toBeGreaterThanOrEqual(100);
  });

  it('HSK2 should have >= 100 words', () => {
    const data = getHSKData(2);
    const total = data.reduce((s, g) => s + g.words.length, 0);
    expect(total).toBeGreaterThanOrEqual(100);
  });

  it('HSK3 should have >= 200 words', () => {
    const data = getHSKData(3);
    const total = data.reduce((s, g) => s + g.words.length, 0);
    expect(total).toBeGreaterThanOrEqual(200);
  });

  it('HSK4 should have >= 400 words', () => {
    const data = getHSKData(4);
    const total = data.reduce((s, g) => s + g.words.length, 0);
    expect(total).toBeGreaterThanOrEqual(400);
  });

  it('HSK5 should have >= 1600 words (existing)', () => {
    expect(HSK5_DATA.length).toBe(5);
    const total = HSK5_DATA.reduce((s, g) => s + g.words.length, 0);
    expect(total).toBeGreaterThanOrEqual(1600);
  });

  it('each word should have chinese, pinyin, vietnamese', () => {
    const data = getHSKData(1);
    for (const group of data) {
      for (const word of group.words) {
        expect(word.chinese).toBeTruthy();
        expect(word.pinyin).toBeTruthy();
        expect(word.vietnamese).toBeTruthy();
      }
    }
  });

  it('getHSKData should return groups with id and title', () => {
    const data = getHSKData(1);
    for (const group of data) {
      expect(group.id).toBeTruthy();
      expect(group.title).toBeTruthy();
    }
  });

  it('getAllHSKLevels should return metadata', () => {
    const levels = getAllHSKLevels();
    for (const level of levels) {
      expect(level.level).toBeGreaterThanOrEqual(1);
      expect(level.wordCount).toBeGreaterThan(0);
    }
  });

  it('total words across all levels should be >= 2800', () => {
    const levels = getAllHSKLevels();
    const total = levels.reduce((s, l) => s + l.wordCount, 0);
    expect(total).toBeGreaterThanOrEqual(2800);
  });
});
```

---

## 4. Acceptance Criteria

- [ ] 5 HSK levels (1-5) accessible
- [ ] HSK landing page has level selector
- [ ] Each level has groups with quiz support (from PR #6)
- [ ] Total ≥ 2800 words
- [ ] HSK5_DATA export backward compatible
- [ ] Each word: chinese, pinyin, vietnamese
- [ ] Tests: 10 new pass
- [ ] Build pass
