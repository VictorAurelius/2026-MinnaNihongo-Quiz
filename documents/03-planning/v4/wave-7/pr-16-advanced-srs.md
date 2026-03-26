# PR #16: Advanced SRS Review System

**Wave:** 7 — Content Complete
**Branch:** `feat/advanced-srs`
**Est:** 6h | **New tests:** 12
**Business doc:** `documents/01-business/srs/rules.md` ✅
**Depends:** PR #14 (N3 content for review items)
**Status:** [ ] Not started

---

## 1. Brainstorm

### Problem
- SRS algorithm tồn tại (SM-2) nhưng chưa có dedicated review UX
- User không biết có bao nhiêu items due
- Chỉ vocab được track, kanji chưa có SRS
- Không có review history hay streak

### Solution
- Dedicated /review route: filter by type (vocab/kanji) + level (N5-N1)
- Due badge trên Header nav (BR-SRS-004)
- Extend SRS để track kanji items (BR-SRS-001)
- Daily summary + streak tracking (BR-SRS-006, BR-SRS-007)
- Auto-queue from quiz results (BR-SRS-005)

### Risks
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Too many due items → overwhelm | Medium | Medium | Daily limit option (20/50/all) |
| Performance with 1000+ SRS items | Low | Medium | Paginate, lazy compute |
| Kanji SRS conflicts with vocab SRS | Low | Medium | Separate itemId namespace |

---

## 2. Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | Viết SRS extension tests (RED) | `tests/utils/srsUtils.test.ts` | 15m | 5 tests FAIL |
| 2 | Extend srsUtils for kanji items | `utils/srsUtils.ts` | 20m | GREEN |
| 3 | Viết review page tests (RED) | `tests/routes/review.test.ts` | 10m | 3 tests FAIL |
| 4 | Create /review route + page | `routes/review/+page.svelte` | 45m | Visual |
| 5 | Viết review store tests (RED) | `tests/stores/reviewStore.test.ts` | 10m | 4 tests FAIL |
| 6 | Review store (filter, daily stats) | `stores/review.ts` | 30m | GREEN |
| 7 | Due badge in Header | `components/layout/Header.svelte` | 15m | Badge shows |
| 8 | Auto-queue from quiz results | `stores/quiz.ts` integration | 15m | Items queued |
| 9 | Daily summary component | `components/common/ReviewSummary.svelte` | 20m | Visual |
| 10 | Streak tracking | `utils/srsUtils.ts` | 15m | Streak counts |

---

## 3. TDD — Test Cases (12 tests)

```typescript
describe('SRS Extension', () => {
  it('reviewItem supports kanji type items');
  it('getDueItems filters by item type (vocab/kanji)');
  it('getDueItems filters by JLPT level');
  it('getDueCount returns correct count per type');
  it('getStreak returns consecutive review days');
});

describe('Review Page', () => {
  it('renders due items count');
  it('filters by type and level');
  it('shows empty state when no items due');
});

describe('Review Store', () => {
  it('tracks daily review stats (completed/total)');
  it('auto-queues items from quiz results');
  it('respects daily limit setting');
  it('persists review history in localStorage');
});
```

---

## 4. Acceptance Criteria

- [ ] /review route: shows due items with filter (type + level)
- [ ] Kanji items tracked by SRS (BR-SRS-001)
- [ ] Due badge on Header nav (BR-SRS-004)
- [ ] Auto-queue from quiz (BR-SRS-005)
- [ ] Daily summary: due/overdue/completed (BR-SRS-006)
- [ ] Streak tracking (BR-SRS-007)
- [ ] localStorage primary (BR-SRS-008)
- [ ] Tests: 12 new pass
- [ ] Build pass
