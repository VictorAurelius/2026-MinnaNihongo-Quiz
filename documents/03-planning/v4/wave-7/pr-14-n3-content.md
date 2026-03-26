# PR #14: N3 Vocabulary + Grammar Content

**Wave:** 7 — Content Complete
**Branch:** `feat/n3-content`
**Est:** 6h | **New tests:** 7
**Depends:** None (independent of Wave 6)
**Status:** [ ] Not started

---

## 1. Brainstorm

### Problem
- Smart Quiz chỉ có N5/N4 course → người học trung cấp không có content
- Nhai Kanji cover đến N1 → Smart Quiz thua ở content depth
- CourseId hardcoded `'n5' | 'n4'` → không mở rộng được

### Solution
- Tạo N3 course với ~15 lessons (vocabulary + grammar)
- Mở rộng CourseId type để support N3
- Tận dụng existing course architecture (extensible by design)
- Thêm kanji examples cho 70 N3 kanji đã có

### Risks
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Data quality (auto-generated) | Medium | Medium | Review manually, flag uncertain |
| Too many lessons → overwhelm | Low | Low | Start with 15, expand later |
| CourseId change breaks existing | Low | High | Add to union, don't change existing |

---

## 2. Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | Extend CourseId type | `types/course.ts` | 5m | Type compiles |
| 2 | Viết N3 course tests (RED) | `tests/data/n3Course.test.ts` | 15m | 4 tests FAIL |
| 3 | Create N3 lesson data (15 lessons) | `data/courses/n3/lessons/*.ts` | 2h | Data exists |
| 4 | Create N3 grammar aggregation | `data/courses/n3/grammar/index.ts` | 15m | Functions work |
| 5 | Create N3 metadata + register | `data/courses/n3/metadata.ts`, `data/courses/index.ts` | 15m | getCourse('n3') works |
| 6 | Update courseUtils validation | `utils/courseUtils.ts` | 10m | N3 routes work |
| 7 | Viết kanji examples tests (RED) | `tests/data/kanjiN3Examples.test.ts` | 10m | 3 tests FAIL |
| 8 | Add examples to N3 kanji | `data/kanji/kanji-n3.ts` | 1h | Examples populated |
| 9 | Verify build + all tests | — | 10m | GREEN |

---

## 3. TDD — Test Cases (7 tests)

```typescript
describe('N3 Course', () => {
  it('getCourse("n3") returns valid course');
  it('N3 has at least 15 lessons');
  it('each N3 lesson has vocabulary and grammar');
  it('N3 metadata has correct JLPT level');
});

describe('N3 Kanji Examples', () => {
  it('all N3 kanji have at least 1 example');
  it('examples have reading and meaning');
  it('examples use the kanji character');
});
```

---

## 4. Acceptance Criteria

- [ ] CourseId supports 'n3'
- [ ] getCourse('n3') returns course with ≥15 lessons
- [ ] Each lesson has vocabulary (≥10 items) + grammar (≥2 patterns)
- [ ] N3 kanji (70) have examples populated
- [ ] /course/n3 route works (existing parameterized route)
- [ ] Existing N5/N4 unaffected (regression)
- [ ] Tests: 7 new pass
- [ ] Build pass
