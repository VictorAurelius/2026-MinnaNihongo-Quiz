# Offline-First Architecture

> **Nguyên tắc:** FE LUÔN chạy độc lập. BE (Supabase) là enhancement, KHÔNG phải dependency.

---

## Data Flow

```
┌─────────────────────────────────────────────────┐
│  Browser (SvelteKit Static + Service Worker)     │
│                                                   │
│  ┌─────────────────┐   ┌──────────────────────┐ │
│  │  localStorage    │   │  Service Worker       │ │
│  │  (PRIMARY)       │   │  (Cache-first)        │ │
│  │                  │   │                        │ │
│  │  - progress      │   │  - HTML/JS/CSS        │ │
│  │  - streak        │   │  - KanjiVG SVGs       │ │
│  │  - srs           │   │  - Font files         │ │
│  │  - settings      │   │  - Static data        │ │
│  │  - premium cache │   │                        │ │
│  └────────┬─────────┘   └──────────────────────┘ │
│           │                                       │
│           │ sync (khi online + logged in)          │
│           ▼                                       │
│  ┌─────────────────────┐                          │
│  │  Sync Queue          │                          │
│  │  (pending changes)   │                          │
│  └────────┬─────────────┘                          │
└───────────┼──────────────────────────────────────┘
            │ online?
            ▼
┌───────────────────────────────────────┐
│  Supabase (OPTIONAL enhancement)      │
│                                       │
│  ├── Auth (Google OAuth)              │
│  ├── user_progress (JSONB)            │
│  ├── leaderboard (view)               │
│  └── premium_status                   │
└───────────────────────────────────────┘
```

## Feature Matrix: Offline vs Online

| Feature | Offline (no login) | Online (no login) | Online (logged in) |
|---------|-------------------|-------------------|-------------------|
| Tất cả quiz modes | ✅ | ✅ | ✅ |
| Vocab/grammar/kanji reference | ✅ | ✅ | ✅ |
| Kanji stroke order | ✅ (cached SVG) | ✅ | ✅ |
| Kanji radicals | ✅ | ✅ | ✅ |
| HSK quiz (all levels) | ✅ | ✅ | ✅ |
| JLPT mock test | ✅ | ✅ | ✅ |
| Progress tracking | ✅ localStorage | ✅ localStorage | ✅ localStorage + cloud |
| SRS review | ✅ localStorage | ✅ localStorage | ✅ localStorage + cloud |
| Achievements/streaks | ✅ localStorage | ✅ localStorage | ✅ localStorage + cloud |
| Settings (theme, font) | ✅ localStorage | ✅ localStorage | ✅ localStorage + cloud |
| Cloud sync | ❌ queued | ❌ no account | ✅ auto-sync |
| Cross-device sync | ❌ | ❌ | ✅ |
| Leaderboard (xem) | ❌ cần data | ✅ public | ✅ + own rank |
| Leaderboard (tham gia) | ❌ | ❌ no account | ✅ opt-in |
| Premium features | ✅ cached status | ✅ cached status | ✅ verified |
| Custom fonts | ✅ cached font | ✅ | ✅ |

## Sync Strategy

### localStorage → Supabase (upstream)

```typescript
// Khi user thay đổi progress (quiz complete, SRS review, etc.)
1. Ghi localStorage NGAY (không chờ network)
2. Thêm vào sync queue: { type: 'progress', data, timestamp }
3. Nếu online + logged in → flush queue → upsert Supabase
4. Nếu offline → queue giữ lại, sync khi online
```

### Supabase → localStorage (downstream)

```typescript
// Khi user login hoặc app mở (đã logged in)
1. Fetch cloud data (progress, streak, srs)
2. Merge: compare timestamps → keep newest
3. Update localStorage với merged data
4. Update UI
```

### Conflict Resolution

```
Local timestamp > Cloud timestamp → Local wins (user vừa thay đổi)
Cloud timestamp > Local timestamp → Cloud wins (đã sync từ device khác)
Same timestamp → Merge (take higher mastery, sum correct counts)
```

### First Login Migration

```typescript
// User có localStorage data, login lần đầu → cloud trống
1. Detect: cloud data empty + localStorage has data
2. Upload toàn bộ localStorage → cloud
3. Set synced = true
```

## Implementation Rules

### Rule 1: localStorage LUÔN là primary
```typescript
// ✅ ĐÚNG — ghi local trước, sync sau
localStorage.setItem('progress', data);
syncQueue.push({ type: 'progress', data });

// ❌ SAI — chờ cloud rồi mới update UI
await supabase.upsert(data); // Nếu offline → UI stuck
```

### Rule 2: App PHẢI hoạt động khi Supabase down
```typescript
// Mọi Supabase call phải có try/catch + fallback
try {
  await syncToCloud(data);
} catch {
  // Queue for later — app vẫn hoạt động bình thường
  syncQueue.push(data);
}
```

### Rule 3: Premium check cached
```typescript
// Login → check premium → cache trong localStorage
// Offline → đọc cache → cho phép premium features
// Cache TTL: 7 ngày (không check lại nếu offline)
```

### Rule 4: Không import Supabase trong core modules
```typescript
// ✅ ĐÚNG — Supabase chỉ trong sync layer
// src/lib/stores/progress.ts → KHÔNG import supabase
// src/lib/utils/syncUtils.ts → import supabase (sync layer only)

// ❌ SAI — Supabase trong business logic
// src/lib/stores/progress.ts → import { supabase }
```

## Supabase Schema

```sql
-- Core table: stores all user data as JSONB
create table user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  progress_data jsonb not null default '{}',
  streak_data jsonb not null default '{}',
  srs_data jsonb not null default '{}',
  settings jsonb not null default '{}',
  updated_at timestamptz not null default now(),
  unique(user_id)
);

-- Leaderboard: opt-in public profile
create table leaderboard_profiles (
  user_id uuid references auth.users(id) on delete cascade primary key,
  display_name text not null,
  opted_in boolean not null default false,
  total_correct int not null default 0,
  longest_streak int not null default 0,
  total_mastery int not null default 0,
  updated_at timestamptz not null default now()
);

-- RLS
alter table user_progress enable row level security;
create policy "own_data" on user_progress
  for all using (auth.uid() = user_id);

alter table leaderboard_profiles enable row level security;
create policy "own_profile" on leaderboard_profiles
  for all using (auth.uid() = user_id);
create policy "public_read" on leaderboard_profiles
  for select using (opted_in = true);

-- Leaderboard view (top 50)
create view leaderboard_top as
  select display_name, total_correct, longest_streak, total_mastery
  from leaderboard_profiles
  where opted_in = true
  order by total_correct desc
  limit 50;
```
