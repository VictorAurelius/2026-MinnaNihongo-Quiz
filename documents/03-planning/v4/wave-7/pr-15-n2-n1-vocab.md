# PR #15: N2-N1 Vocabulary Data

**Wave:** 7 — Content Complete
**Branch:** `feat/n2-n1-vocab`
**Est:** 5h | **New tests:** 8
**Depends:** PR #14 (CourseId extension)
**Status:** [ ] Not started

---

## 1. Brainstorm

### Problem
- N2/N1 chỉ có kanji data (400+400), không có vocabulary hay grammar
- Learners cần vocabulary context để nhớ kanji
- Kanji examples hiện rỗng cho N2/N1

### Solution
- Tạo N2 vocabulary reference (grouped, không full course format)
- Tạo N1 vocabulary reference (grouped)
- Populate kanji examples cho N2 (400) + N1 (400)
- Vocabulary page per level: /vocab/n2, /vocab/n1

### Design Decision
N2/N1 dùng **vocabulary reference** (không phải full course) vì:
- Full course cần grammar + lessons → quá lớn cho 1 PR
- Vocabulary reference đủ cho kanji context + quiz
- Có thể upgrade thành full course sau (Wave 8+)

### Risks
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| 800 kanji examples = huge data | High | Medium | Generate batch, review sample |
| Data accuracy | Medium | Medium | Cross-reference JLPT lists |
| Bundle size increase | Medium | Low | Code-split per level |

---

## 2. Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | Viết N2 vocab tests (RED) | `tests/data/n2Vocab.test.ts` | 10m | 4 tests FAIL |
| 2 | Create N2 vocabulary data | `data/vocab/n2/*.ts` | 1.5h | Data exists |
| 3 | Viết N1 vocab tests (RED) | `tests/data/n1Vocab.test.ts` | 10m | 4 tests FAIL |
| 4 | Create N1 vocabulary data | `data/vocab/n1/*.ts` | 1.5h | Data exists |
| 5 | Add examples to N2 kanji (400) | `data/kanji/kanji-n2.ts` | 30m | Examples populated |
| 6 | Add examples to N1 kanji (400) | `data/kanji/kanji-n1.ts` | 30m | Examples populated |
| 7 | Vocab reference route | `routes/vocab/[level]/+page.svelte` | 20m | Visual |
| 8 | Nav link for vocab levels | Header / course listing | 10m | Links work |

---

## 3. TDD — Test Cases (8 tests)

```typescript
describe('N2 Vocabulary', () => {
  it('has at least 200 vocabulary items');
  it('each item has japanese, kana, vietnamese, english');
  it('items are grouped by topic/category');
  it('N2 kanji have at least 1 example each');
});

describe('N1 Vocabulary', () => {
  it('has at least 200 vocabulary items');
  it('each item has japanese, kana, vietnamese, english');
  it('items are grouped by topic/category');
  it('N1 kanji have at least 1 example each');
});
```

---

## 4. Acceptance Criteria

- [ ] N2 vocab: ≥200 items with full fields
- [ ] N1 vocab: ≥200 items with full fields
- [ ] N2 kanji (400): examples populated
- [ ] N1 kanji (400): examples populated
- [ ] /vocab/n2 and /vocab/n1 routes work
- [ ] Code-split: N2/N1 data lazy loaded
- [ ] Tests: 8 new pass
- [ ] Build pass
