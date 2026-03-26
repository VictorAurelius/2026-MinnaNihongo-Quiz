# Wave 6 Checkpoint — User System

## PRs in Wave

| PR | Name | Status | Tests | Actual PR |
|----|------|--------|-------|-----------|
| #12 | [Supabase auth + sync](pr-12-auth.md) | [ ] | 12 | |
| #13 | [Leaderboard](pr-13-leaderboard.md) | [ ] | 6 | |

## Business Docs
- [x] `documents/01-business/auth/rules.md` — 10 auth rules + 6 leaderboard rules

## Entry Criteria
- [x] Wave 5 checkpoint passed (95/100, 713 tests)
- [x] Business docs created (auth rules)

## Prerequisites
- [ ] Create Supabase project (free tier)
- [ ] Setup Google OAuth in Supabase dashboard
- [ ] Create DB tables (user_progress, leaderboard_profiles)
- [ ] Configure RLS policies
- [ ] Add .env.example with VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY

## Exit Criteria
- [ ] Google OAuth login/logout works
- [ ] Cloud sync bidirectional (localStorage ↔ Supabase)
- [ ] Offline fallback works (BR-AUTH-001)
- [ ] Leaderboard: top 50, 3 categories, opt-in
- [ ] Tests: ≥ 731 (713 + 18 new)
- [ ] Business gaps: none

## Audit Report
> Chạy sau wave complete
