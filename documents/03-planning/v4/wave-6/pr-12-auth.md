# PR #12: Supabase Auth + Cloud Sync

**Wave:** 6 — User System
**Branch:** `feat/supabase-auth`
**Est:** 8h | **New tests:** 12
**Business doc:** `documents/01-business/auth/rules.md` ✅
**Status:** [ ] Not started

---

## 1. Brainstorm

### Problem
- localStorage only → mất data khi xóa browser, không sync across devices
- Nhai Kanji có Google login + Firebase sync

### Solution
- Supabase `@supabase/supabase-js` (client-side only, giữ adapter-static)
- Google OAuth (Supabase built-in)
- localStorage primary, Supabase = backup + sync
- Per BR-AUTH-001 to BR-AUTH-010

### Risks
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Supabase project pause (7 days inactive) | Medium | High | Cron ping / uptime monitor |
| RLS misconfiguration | Medium | High | Test with multiple users |
| Migration data loss | Low | High | Backup localStorage before sync |
| Offline → online sync conflicts | Medium | Medium | Last-write-wins (BR-AUTH-006) |

---

## 2. Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | Setup Supabase project + DB | Dashboard | 30m | Tables exist |
| 2 | Install @supabase/supabase-js | package.json | 5m | `npm ls` |
| 3 | Viết authUtils tests (RED) | `tests/utils/authUtils.test.ts` | 10m | 4 tests FAIL |
| 4 | Implement authUtils | `lib/utils/authUtils.ts` | 20m | GREEN |
| 5 | Viết syncUtils tests (RED) | `tests/utils/syncUtils.test.ts` | 10m | 7 tests FAIL |
| 6 | Implement syncUtils | `lib/utils/syncUtils.ts` | 30m | GREEN |
| 7 | Create auth store | `lib/stores/auth.ts` | 15m | Store works |
| 8 | AuthButton component | `lib/components/common/AuthButton.svelte` | 15m | Visual |
| 9 | Add to Header + Settings | Header.svelte, settings page | 15m | Login/logout |
| 10 | Supabase env config | `.env.example`, vite config | 10m | Build pass |

---

## 3. TDD — Test Cases (12 tests)

```typescript
describe('Auth Utils', () => {
  it('isLoggedIn() returns false when no session');
  it('getCurrentUser() returns null when not logged in');
  it('signInWithGoogle() calls supabase.auth.signInWithOAuth');
  it('signOut() clears session');
});

describe('Sync Utils', () => {
  it('syncToCloud() upserts progress data');
  it('syncFromCloud() fetches and merges with local');
  it('mergeProgress() takes latest by timestamp');
  it('migrateLocalToCloud() uploads on first login');
  it('fallback to localStorage when offline');
  it('handle empty cloud data (new user)');
  it('not overwrite newer cloud data with older local');
  it('queue changes when offline');
});
```

---

## 4. Acceptance Criteria

- [ ] Google OAuth login/logout works
- [ ] Progress auto-sync when online + logged in
- [ ] Offline: app works normally (BR-AUTH-001)
- [ ] First login: migrate localStorage → cloud (BR-AUTH-005)
- [ ] Cross-device: login device B → see device A progress
- [ ] RLS: user can't read other user's data
- [ ] Settings page shows login/sync status
- [ ] .env.example with Supabase URL + anon key
- [ ] Tests: 12 new pass
- [ ] Build pass (adapter-static still works)
