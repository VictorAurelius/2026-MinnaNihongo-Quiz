# Supabase Setup Guide — Smart Quiz Wave 6

> Hướng dẫn step-by-step tạo Supabase project cho Wave 6 (Auth + Leaderboard).
> Thời gian: ~15 phút.

---

## Step 1: Tạo Supabase Project

1. Vào [supabase.com](https://supabase.com) → **Start your project** (hoặc Sign in nếu đã có account)
2. **New Project:**
   - Organization: chọn hoặc tạo mới
   - Name: `smart-quiz`
   - Database Password: tạo strong password (lưu lại!)
   - Region: **Southeast Asia (Singapore)** — gần nhất
   - Plan: **Free** (đủ dùng: 50K MAU, 500MB DB)
3. Đợi ~2 phút để project khởi tạo

## Step 2: Lấy API Keys

1. Vào **Project Settings** → **API**
2. Copy 2 giá trị:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon / public key** → `VITE_SUPABASE_ANON_KEY`
3. Tạo file `.env` trong `svelte-app/`:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

> **LƯU Ý:** KHÔNG commit file `.env`. Đã có trong `.gitignore`.

## Step 3: Setup Google OAuth

1. **Google Cloud Console:**
   - Vào [console.cloud.google.com](https://console.cloud.google.com)
   - Tạo project mới (hoặc dùng existing)
   - APIs & Services → **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
   - Application type: **Web application**
   - Authorized redirect URIs: thêm `https://xxxxx.supabase.co/auth/v1/callback` (thay `xxxxx` bằng project ID)
   - Copy **Client ID** và **Client Secret**

2. **Supabase Dashboard:**
   - Authentication → **Providers** → **Google**
   - Enable → paste Client ID + Client Secret
   - Save

## Step 4: Tạo Database Tables

1. Vào **SQL Editor** trong Supabase Dashboard
2. Paste và chạy SQL sau:

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

-- RLS policies
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

3. Click **Run** → phải thấy "Success"

## Step 5: Verify Setup

Checklist xác nhận:

- [ ] Project tạo xong, status = Active
- [ ] Có `VITE_SUPABASE_URL` và `VITE_SUPABASE_ANON_KEY`
- [ ] Google OAuth enabled trong Supabase → Providers → Google
- [ ] Table `user_progress` tồn tại (check Table Editor)
- [ ] Table `leaderboard_profiles` tồn tại
- [ ] RLS enabled trên cả 2 tables (check Policies tab)

## Step 6: Cung cấp cho Claude

Khi xong, gửi 2 giá trị này:

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Claude sẽ:
1. Tạo `.env` file
2. Install `@supabase/supabase-js`
3. Implement PR #12 (Auth + Cloud Sync) + PR #13 (Leaderboard)
4. Test + push + CI

---

## Kiến trúc tham khảo

- **Business rules:** `documents/01-business/auth/rules.md`
- **Architecture:** `documents/02-architecture/OFFLINE_FIRST_ARCHITECTURE.md`
- **PR plans:** `documents/03-planning/v4/wave-6/pr-12-auth.md`, `pr-13-leaderboard.md`

## Free Tier Limits

| Resource | Limit | Dự kiến sử dụng |
|----------|-------|-----------------|
| MAU | 50,000 | < 1,000 |
| Database | 500 MB | < 10 MB |
| Bandwidth | 5 GB | < 1 GB |
| API calls | Unlimited | Low volume |

> **⚠️ Lưu ý:** Supabase free tier pause project sau 7 ngày không hoạt động.
> Giải pháp: cron ping hoặc đảm bảo có user activity thường xuyên.
