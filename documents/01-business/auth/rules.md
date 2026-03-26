# Auth Business Rules

> **Module:** Authentication & Cloud Sync
> **Dependencies:** Supabase (free tier)

---

## Rules

| ID | Rule | Rationale |
|----|------|-----------|
| BR-AUTH-001 | App PHẢI hoạt động 100% offline không cần login | Offline-first architecture |
| BR-AUTH-002 | Login là OPTIONAL — chỉ cần cho cloud sync + leaderboard | Không block users |
| BR-AUTH-003 | Auth providers: Google OAuth (primary) | Supabase built-in, phổ biến nhất |
| BR-AUTH-004 | localStorage là PRIMARY storage, Supabase là backup | Offline-first |
| BR-AUTH-005 | First login: migrate localStorage → cloud (không mất data) | User experience |
| BR-AUTH-006 | Conflict resolution: last-write-wins by timestamp | Simple, predictable |
| BR-AUTH-007 | User chỉ đọc/ghi data của mình (RLS) | Security |
| BR-AUTH-008 | Supabase down → app vẫn hoạt động bình thường | Resilience |
| BR-AUTH-009 | Sync queue: offline changes queued, flush khi online | Eventual consistency |
| BR-AUTH-010 | Premium status cached 7 ngày trong localStorage | Offline premium access |

## Data Ownership

| Data | Storage | Sync |
|------|---------|------|
| Progress (lessons, vocab mastery) | localStorage + Supabase | Bidirectional |
| Streak data | localStorage + Supabase | Bidirectional |
| SRS data | localStorage + Supabase | Bidirectional |
| Settings (theme, font, direction) | localStorage + Supabase | Bidirectional |
| Quiz history | localStorage only | No sync (too large) |
| Leaderboard profile | Supabase only | Read from cloud |

## Sync Flow

```
User action → Write localStorage → Add to sync queue
  ↓
Online + logged in? → Flush queue → Upsert Supabase
  ↓
App open (logged in) → Fetch Supabase → Merge by timestamp → Update localStorage
```

## Leaderboard Rules

| ID | Rule |
|----|------|
| BR-LB-001 | Opt-in only (default OFF) |
| BR-LB-002 | Display name required (không show email) |
| BR-LB-003 | Categories: Total Correct, Longest Streak, Total Mastery |
| BR-LB-004 | Top 50 per category |
| BR-LB-005 | Cloud data = source of truth (anti-cheat) |
| BR-LB-006 | User can opt-out anytime → remove from leaderboard |

## Supabase Free Tier Constraints

| Resource | Limit | Our usage |
|----------|-------|-----------|
| MAU | 50,000 | < 1,000 expected |
| Database | 500 MB | < 10 MB (JSON progress) |
| Bandwidth | 5 GB | < 1 GB |
| API calls | Unlimited | Low volume |
| **Risk:** Project pauses after 7 days inactive | | Cron ping or user activity |
