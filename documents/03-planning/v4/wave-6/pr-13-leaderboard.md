# PR #13: Leaderboard / Xếp hạng

**Wave:** 6 — User System
**Branch:** `feat/leaderboard`
**Est:** 4h | **New tests:** 6
**Depends:** PR #12 (auth)
**Status:** [ ] Not started

---

## 1. Brainstorm

### Problem
- Nhai Kanji có xếp hạng → competitive motivation
- Smart Quiz không có social features

### Solution
- Supabase query top users (per BR-LB-001 to BR-LB-006)
- Opt-in public profile (default OFF)
- 3 categories: Total Correct, Longest Streak, Total Mastery
- /leaderboard page

### Risks
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Privacy concerns | Medium | Medium | Opt-in only, no email exposed |
| Cheating (localStorage manipulation) | Low | Medium | Cloud data = source of truth |
| Empty leaderboard (few users) | High | Low | Show "Be the first!" message |

---

## 2. Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | DB: leaderboard_profiles table + RLS | Supabase dashboard | 15m | Table exists |
| 2 | Viết leaderboardUtils tests (RED) | `tests/utils/leaderboardUtils.test.ts` | 10m | 6 tests FAIL |
| 3 | Implement leaderboardUtils | `lib/utils/leaderboardUtils.ts` | 20m | GREEN |
| 4 | Leaderboard page | `routes/leaderboard/+page.svelte` | 30m | Visual |
| 5 | Opt-in toggle in Settings | `routes/settings/+page.svelte` | 15m | Toggle works |
| 6 | Nav link + route title | `Header.svelte` | 5m | Link shows |

---

## 3. TDD — Test Cases (6 tests)

```typescript
describe('Leaderboard', () => {
  it('getTopUsers(category, limit) returns sorted array');
  it('supports categories: streak, mastery, totalCorrect');
  it('only includes opted-in users');
  it('getCurrentUserRank() returns rank number');
  it('handles empty leaderboard');
  it('handles user not opted in');
});
```

---

## 4. Acceptance Criteria

- [ ] Leaderboard page: top 50, 3 categories
- [ ] User rank shown at bottom
- [ ] Opt-in toggle in Settings (default OFF, per BR-LB-001)
- [ ] Display name only, no email (BR-LB-002)
- [ ] Cloud data = source of truth (BR-LB-005)
- [ ] Tests: 6 new pass
- [ ] Build pass
