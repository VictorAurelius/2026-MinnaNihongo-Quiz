# PR Plan v4.0 — Smart Quiz "Full Parity + Beyond"

> **Ngày:** 2026-03-23
> **Baseline:** v2.0 (100/100 audit, 605 tests)
> **Mục tiêu:** Có TẤT CẢ tính năng Nhai Kanji + vượt trội ở quiz, bilingual, offline, a11y
> **Methodology:** Superpowers (Brainstorm → TDD → Implement → Verify)

---

## Tổng quan 9 Phases, 19 PRs

| Phase | Tên | PRs | Mục tiêu |
|-------|-----|-----|----------|
| 1 | SEO & Visibility | #1 | Discoverable trên Google + social |
| 2 | Learning Path | #2, #3 | Guided learning + JLPT mock test |
| 3 | Kanji Core | #4, #5 | Stroke order + chiết tự bộ thủ |
| 4 | Bilingual HSK | #6, #7 | HSK quiz modes + HSK1-4 data |
| 5 | UI Polish & A11y | #8, #9 | Skeleton, branding, WCAG AA |
| 6 | Kanji Mastery | #10, #11 | Luyện viết tay + N3→N1 kanji data (2500+) |
| 7 | User System | #12, #13 | Supabase auth + cloud sync + leaderboard |
| 8 | Content Expansion | #14, #15, #16 | N3→N1 vocab/grammar + advanced SRS |
| 9 | Premium & Community | #17, #18, #19 | Font settings, premium tier, community |

---

## Phase 1-5: Giữ nguyên từ PR Plan v3.0

> Xem chi tiết brainstorm, TDD, acceptance criteria tại [PR_PLAN_V3.md](PR_PLAN_V3.md)

| PR | Tên | Tests | Status |
|----|-----|-------|--------|
| #1 | SEO meta tags | 9 | [ ] |
| #2 | Learning path + mastery unlock | 15 | [ ] |
| #3 | JLPT mock test | 10 | [ ] |
| #4 | Kanji stroke order (KanjiVG) | 9 | [ ] |
| #5 | Kanji radicals (KRADFILE) | 11 | [ ] |
| #6 | HSK quiz modes | 7 | [ ] |
| #7 | HSK1-4 data | 10 | [ ] |
| #8 | Skeleton loading + branding | 6 | [ ] |
| #9 | Accessibility fixes | 10 | [ ] |

---

## Phase 6: Kanji Mastery (match Nhai Kanji writing + N1 coverage)

### PR #10: Kanji handwriting recognition (luyện viết tay)

**Branch:** `feat/kanji-handwriting`

#### Brainstorm

- **Problem:** Nhai Kanji core = luyện viết tay. Smart Quiz không có canvas draw.
- **Solution:** Dùng [KanjiCanvas](https://github.com/asdfjkl/kanjicanvas) (MIT, client-side, stroke-order-free recognition).
- **Risks:**
  - KanjiCanvas API compatibility với Svelte? → Wrapper component, init on mount.
  - Bundle size: `ref-patterns.js` data file lớn? → Lazy load khi user mở writing mode.
  - Mobile touch events vs mouse events → KanjiCanvas hỗ trợ cả hai.
  - Accuracy cho kanji phức tạp (>15 strokes)? → KanjiCanvas nhận dạng không phụ thuộc thứ tự/số nét.
- **Edge cases:** User vẽ quá nhanh, vẽ sai hoàn toàn (trả top 5 candidates). Canvas resize trên mobile.

#### Task Breakdown

| # | Task | Files |
|---|------|-------|
| 1 | Integrate KanjiCanvas library | `package.json`, vendor setup |
| 2 | Viết tests cho WritingCanvas | `src/tests/components/kanji/WritingCanvas.test.ts` (new) |
| 3 | Implement WritingCanvas component | `src/lib/components/kanji/WritingCanvas.svelte` (new) |
| 4 | Viết tests cho WritingQuiz | `src/tests/components/kanji/WritingQuiz.test.ts` (new) |
| 5 | Implement WritingQuiz (quiz mode) | `src/lib/components/kanji/KanjiWritingQuiz.svelte` (new) |
| 6 | Add writing mode to kanji quiz page | `src/routes/kanji/[lesson]/quiz/[mode]/+page.svelte` |
| 7 | Add "Practice Writing" to kanji reference | `src/routes/kanji/[lesson]/reference/+page.svelte` |

#### TDD — Test Cases

```typescript
// src/tests/components/kanji/WritingCanvas.test.ts
describe('WritingCanvas', () => {
  it('should render canvas element');
  it('should have Clear button');
  it('should have Undo button');
  it('should call onRecognize callback with candidates array');
  it('should show "Draw a kanji" placeholder when empty');
  it('should support width/height props');
  it('should have role="img" and aria-label');
});

// src/tests/components/kanji/WritingQuiz.test.ts
describe('KanjiWritingQuiz', () => {
  it('should show target kanji meaning/reading as question');
  it('should show WritingCanvas for drawing');
  it('should check if drawn kanji matches target');
  it('should show correct/wrong feedback');
  it('should advance to next question after feedback');
  it('should show hint button revealing stroke count');
  it('should dispatch correct/wrong events');
});
```

#### Acceptance Criteria

- [ ] Canvas vẽ kanji hoạt động trên desktop (mouse) + mobile (touch)
- [ ] Nhận dạng trả top 5 candidates, match với target kanji
- [ ] Clear/Undo buttons hoạt động
- [ ] Writing quiz mode: hiện meaning → user vẽ kanji → check đúng/sai
- [ ] Lazy load KanjiCanvas data (không tăng initial bundle)
- [ ] Tích hợp vào kanji quiz page (mode=writing) + kanji reference ("Practice Writing")
- [ ] Tests: ≥ 13 new tests pass
- [ ] Build pass

### PR #11: N3→N1 kanji data expansion (2500+ kanji)

**Branch:** `feat/kanji-n3-n1`

#### Brainstorm

- **Problem:** Smart Quiz chỉ có 256 kanji (N5/N4). Nhai Kanji có 2500+.
- **Solution:** Thêm kanji data cho N3 (~370), N2 (~370), N1 (~600). Total ~1600 kanji mới.
- **Data source:** Dùng open source JLPT kanji lists + KANJIDIC2 (CC BY-SA 4.0) cho readings/meanings.
- **Risks:**
  - Data entry khối lượng lớn → Script tự động generate từ KANJIDIC2 XML, chỉ cần manual review Vietnamese meanings.
  - Bundle size: 1600 kanji ~= 800KB raw → code-split per JLPT level, lazy load.
  - KanjiVG SVG cho N3-N1: đã có sẵn (KanjiVG cover 6700+ kanji).
- **Edge cases:** Kanji trùng giữa các levels. Kanji không có Hán Việt reading.

#### Task Breakdown

| # | Task | Files |
|---|------|-------|
| 1 | Script generate kanji data từ KANJIDIC2 | `scripts/generate-kanji-data.ts` (new) |
| 2 | Manual review + thêm Vietnamese meanings | Data files |
| 3 | Viết tests cho data integrity | `src/tests/data/kanji-all-levels.test.ts` (new) |
| 4 | Tạo N3/N2/N1 kanji lesson files | `src/lib/data/kanji/n3/`, `n2/`, `n1/` (new) |
| 5 | Update kanji index + types | `src/lib/data/kanji/lessons/index.ts` |
| 6 | Update kanji landing page (level selector) | `src/routes/kanji/+page.svelte` |
| 7 | Download KanjiVG SVGs cho 1600 kanji mới | `static/kanjivg/` |

#### TDD — Test Cases

```typescript
describe('Kanji N3-N1 Data', () => {
  it('should have N3 kanji (~370 characters)');
  it('should have N2 kanji (~370 characters)');
  it('should have N1 kanji (~600 characters)');
  it('total kanji across all levels should be >= 1800');
  it('each kanji should have character, onyomi, kunyomi, vietnamese, english');
  it('each kanji should have at least 1 example');
  it('no duplicate characters across levels');
  it('every kanji should have corresponding KanjiVG SVG file');
  it('KRADFILE mapping should exist for every kanji');
});
```

#### Acceptance Criteria

- [ ] N3: ~370 kanji, N2: ~370 kanji, N1: ~600 kanji
- [ ] Tổng ≥ 1800 kanji (256 existing + 1600 new)
- [ ] Mỗi kanji: character, onyomi[], kunyomi[], vietnamese, english, examples[]
- [ ] Kanji landing page có level selector (N5/N4/N3/N2/N1)
- [ ] Code-split: mỗi level lazy load riêng
- [ ] KanjiVG SVGs cho tất cả kanji mới
- [ ] KRADFILE radical mapping cho tất cả
- [ ] Tests: ≥ 9 new tests pass
- [ ] Build pass, lazy chunk size hợp lý

---

## Phase 7: User System (match Nhai Kanji auth + cloud + leaderboard)

### PR #12: Supabase auth + cloud sync

**Branch:** `feat/supabase-auth`

#### Brainstorm

- **Problem:** Smart Quiz chỉ localStorage → mất data khi xóa browser, không sync across devices.
- **Solution:** Supabase (free tier: 50K MAU, 500MB DB, unlimited API). Client-side only, giữ adapter-static.
- **Tech:** `@supabase/supabase-js` (không cần `@supabase/ssr` vì static site).
- **Auth methods:** Google OAuth + GitHub OAuth (Supabase built-in).
- **Risks:**
  - Supabase project pause sau 7 ngày inactive (free tier) → cron job ping hoặc user activity.
  - RLS (Row Level Security) cần setup đúng → user chỉ đọc/ghi data của mình.
  - Migration: existing localStorage progress → sync lên cloud khi user đăng nhập lần đầu.
  - Offline fallback: localStorage vẫn là primary, sync lên cloud khi online.
- **Edge cases:** Conflict khi cùng account login 2 devices → last-write-wins với timestamp.

#### Task Breakdown

| # | Task | Files |
|---|------|-------|
| 1 | Setup Supabase project + DB schema | Supabase dashboard, `supabase/migrations/` |
| 2 | Viết tests cho auth utils | `src/tests/utils/authUtils.test.ts` (new) |
| 3 | Implement auth utils | `src/lib/utils/authUtils.ts` (new) |
| 4 | Viết tests cho sync utils | `src/tests/utils/syncUtils.test.ts` (new) |
| 5 | Implement sync utils | `src/lib/utils/syncUtils.ts` (new) |
| 6 | Create auth store | `src/lib/stores/auth.ts` (new) |
| 7 | Add login/logout UI | `src/lib/components/common/AuthButton.svelte` (new) |
| 8 | Add auth to Header + Settings page | `Header.svelte`, `settings/+page.svelte` |
| 9 | Migration: localStorage → Supabase on first login | syncUtils |
| 10 | Setup RLS policies | Supabase dashboard |

#### TDD — Test Cases

```typescript
// src/tests/utils/authUtils.test.ts
describe('Auth Utils', () => {
  it('isLoggedIn() should return false when no session');
  it('getCurrentUser() should return null when not logged in');
  it('signInWithGoogle() should call supabase.auth.signInWithOAuth');
  it('signOut() should clear session');
});

// src/tests/utils/syncUtils.test.ts
describe('Sync Utils', () => {
  it('syncProgressToCloud() should upsert progress data');
  it('syncProgressFromCloud() should fetch and merge with local');
  it('mergeProgress() should take latest by timestamp');
  it('migrateLocalToCloud() should upload localStorage data on first login');
  it('should fallback to localStorage when offline');
  it('should handle empty cloud data (new user)');
  it('should not overwrite newer cloud data with older local data');
});
```

#### Supabase DB Schema

```sql
-- users progress
create table user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  progress_data jsonb not null,  -- same structure as ProgressState
  streak_data jsonb,
  srs_data jsonb,
  updated_at timestamptz default now(),
  unique(user_id)
);

-- RLS: user can only read/write their own data
alter table user_progress enable row level security;
create policy "Users can read own data" on user_progress for select using (auth.uid() = user_id);
create policy "Users can insert own data" on user_progress for insert with check (auth.uid() = user_id);
create policy "Users can update own data" on user_progress for update using (auth.uid() = user_id);
```

#### Acceptance Criteria

- [ ] Google OAuth login/logout hoạt động
- [ ] Progress auto-sync lên Supabase khi online
- [ ] Offline fallback: localStorage vẫn hoạt động bình thường
- [ ] First login: migrate localStorage → cloud
- [ ] Cross-device: login device B → thấy progress từ device A
- [ ] RLS: user không thể đọc data user khác
- [ ] Settings page hiện login status + sync status
- [ ] Tests: ≥ 12 new tests pass
- [ ] Build pass (adapter-static vẫn hoạt động)

### PR #13: Leaderboard / Xếp hạng

**Branch:** `feat/leaderboard`

#### Brainstorm

- **Problem:** Nhai Kanji có xếp hạng → tạo competitive motivation. Smart Quiz không có social.
- **Solution:** Supabase query top users by score/streak/mastery. Opt-in (user chọn public profile).
- **Risks:**
  - Privacy: không expose data user không muốn → opt-in public profile.
  - Performance: query leaderboard aggregation → Supabase view hoặc materialized view.
  - Cheating: user sửa localStorage → cloud data là source of truth cho leaderboard.
- **Dependencies:** PR #12 (Supabase auth) phải xong trước.

#### Task Breakdown

| # | Task | Files |
|---|------|-------|
| 1 | DB schema cho leaderboard | Supabase migration |
| 2 | Viết tests cho leaderboard utils | `src/tests/utils/leaderboardUtils.test.ts` (new) |
| 3 | Implement leaderboard utils | `src/lib/utils/leaderboardUtils.ts` (new) |
| 4 | Implement leaderboard page | `src/routes/leaderboard/+page.svelte` (new) |
| 5 | Add opt-in toggle in settings | `settings/+page.svelte` |
| 6 | Add nav link | `Header.svelte` |

#### TDD — Test Cases

```typescript
describe('Leaderboard', () => {
  it('getTopUsers(category, limit) should return sorted array');
  it('should support categories: streak, mastery, totalCorrect');
  it('should only include opted-in users');
  it('getCurrentUserRank() should return rank number');
  it('should handle empty leaderboard');
  it('should handle user not opted in');
});
```

#### Acceptance Criteria

- [ ] Leaderboard page hiển thị top 50 users
- [ ] 3 categories: Longest Streak, Total Mastery, Total Correct
- [ ] User rank hiện ở cuối list
- [ ] Opt-in toggle trong Settings (default off)
- [ ] Chỉ hiện display name (không hiện email)
- [ ] Tests: ≥ 6 new tests pass

---

## Phase 8: Content Expansion (N3→N1 vocab/grammar + advanced SRS)

### PR #14: N3 vocabulary + grammar data

**Branch:** `feat/n3-content`

#### Brainstorm

- **Problem:** Smart Quiz chỉ có N5/N4. Nhai Kanji có đến N1.
- **Solution:** Thêm N3 course (Minna no Nihongo Sơ cấp II, bài 26-50).
- **Data source:** Minna no Nihongo textbook (bài 26-50), ~500 vocab + ~80 grammar patterns.
- **Risks:** Data entry lớn → chia nhỏ thành batches.

#### Task Breakdown

| # | Task | Files |
|---|------|-------|
| 1 | Tests data integrity | `src/tests/data/n3-content.test.ts` (new) |
| 2 | Tạo N3 course metadata | `src/lib/data/courses/n3/` (new) |
| 3 | Tạo lesson files (bài 26-50) | 25 lesson files |
| 4 | Register N3 trong course index | `src/lib/data/courses/index.ts` |

#### TDD — Test Cases

```typescript
describe('N3 Content', () => {
  it('should have 25 lessons (26-50)');
  it('each lesson should have >= 10 vocabulary items');
  it('each lesson should have >= 2 grammar patterns');
  it('total vocabulary should be >= 500');
  it('total grammar patterns should be >= 80');
  it('all VocabItem types should be valid');
  it('getCourse("n3") should return valid course');
});
```

#### Acceptance Criteria

- [ ] N3 course: 25 lessons (bài 26-50)
- [ ] ≥ 500 vocab items, ≥ 80 grammar patterns
- [ ] Course page hiện N3 cùng N5/N4
- [ ] Tất cả quiz modes hoạt động với N3
- [ ] Tests: ≥ 7 new tests pass

### PR #15: N2 + N1 vocabulary data (Shin Kanzen Master)

**Branch:** `feat/n2-n1-vocab`

> Tương tự PR #14 nhưng cho N2/N1. Scope lớn hơn — có thể chia thành nhiều sub-PRs.

#### Acceptance Criteria

- [ ] N2: ≥ 1000 vocab items
- [ ] N1: ≥ 1500 vocab items
- [ ] Organized theo lessons/chapters
- [ ] Tests: ≥ 8 new tests pass

### PR #16: Advanced SRS (learning steps, leech detection, adaptive)

**Branch:** `feat/advanced-srs`

#### Brainstorm

- **Problem:** SRS hiện tại basic (SM-2 binary quality). Nhai Kanji mature hơn.
- **Solution:** Thêm learning steps (1m→10m→1d), leech detection (>8 fails), granular quality (0-5 dựa trên time), adaptive difficulty.
- **Risks:** Complexity tăng → cần backward compatible với existing SRS data.

#### Task Breakdown

| # | Task | Files |
|---|------|-------|
| 1 | Viết tests cho advanced SRS | `src/tests/utils/srsUtils.test.ts` (update) |
| 2 | Thêm learning steps logic | `src/lib/utils/srsUtils.ts` |
| 3 | Thêm leech detection | `src/lib/utils/srsUtils.ts` |
| 4 | Quality mapping từ response time | `src/lib/utils/srsUtils.ts` |
| 5 | Adaptive difficulty (ưu tiên weak items) | `src/lib/utils/srsUtils.ts` |
| 6 | Connect mastery level với SRS easeFactor | `src/lib/stores/progress.ts` |
| 7 | Update review page UI | `src/routes/review/+page.svelte` |

#### TDD — Test Cases

```typescript
describe('Advanced SRS', () => {
  // Learning steps
  it('new card should go through learning steps: 1m, 10m');
  it('graduating card should enter review with interval=1d');
  it('failing learning card should reset to step 0');

  // Leech detection
  it('card with >8 consecutive fails should be marked as leech');
  it('leech cards should be flagged in review UI');
  it('leech status should reset when card gets 3 consecutive correct');

  // Quality from response time
  it('answer < 5s should map to quality 5 (easy)');
  it('answer 5-15s should map to quality 4 (good)');
  it('answer 15-30s should map to quality 3 (hard)');
  it('wrong answer should map to quality 1');

  // Adaptive
  it('review should prioritize items with lowest easeFactor');
  it('review should mix new + review items (80/20)');

  // Mastery connection
  it('SRS easeFactor should update mastery level');
  it('mastery >= 4 when easeFactor >= 2.2 and interval >= 21d');
});
```

#### Acceptance Criteria

- [ ] Learning steps: new → 1m → 10m → 1d → review
- [ ] Leech detection: flag sau 8 fails, hiện warning trong review UI
- [ ] Quality 0-5 tự động tính từ response time
- [ ] Adaptive: weak items xuất hiện nhiều hơn
- [ ] Mastery level đồng bộ với SRS metrics
- [ ] Backward compatible với existing SRS localStorage data
- [ ] Tests: ≥ 12 new tests pass

---

## Phase 9: Premium & Community

### PR #17: Custom font selection

**Branch:** `feat/custom-fonts`

#### Brainstorm

- **Problem:** Nhai Kanji cho user chọn font kanji (Zen Maru Gothic, UD Digi Kyokasho, etc.). Smart Quiz chỉ có Noto Sans JP.
- **Solution:** Thêm 3-4 font kanji chuyên dụng, cho user chọn trong Settings.

#### Task Breakdown

| # | Task | Files |
|---|------|-------|
| 1 | Thêm font files (woff2) | `static/fonts/` (new) |
| 2 | Viết tests | `src/tests/utils/fontUtils.test.ts` (new) |
| 3 | Font loading utils | `src/lib/utils/fontUtils.ts` (new) |
| 4 | Font selector trong Settings | `settings/+page.svelte` |
| 5 | Apply font preference globally | `src/app.css`, `+layout.svelte` |

#### TDD — Test Cases

```typescript
describe('Font Utils', () => {
  it('getAvailableFonts() should return list of font options');
  it('setFont(fontId) should save to localStorage');
  it('getFont() should return saved font or default');
  it('each font should have id, name, family, preview text');
});
```

#### Fonts to include

| Font | Use case | Size (woff2) |
|------|----------|-------------|
| Noto Sans JP (default) | Clean, neutral | ~4MB subset |
| Zen Maru Gothic | Rounded, friendly | ~3MB subset |
| UD Digi Kyokasho | Textbook style | ~3MB subset |
| Klee One | Handwriting style | ~3MB subset |

> Dùng unicode-range subsetting để chỉ load glyphs cần thiết (~500KB mỗi font thay vì full).

#### Acceptance Criteria

- [ ] Settings page có font selector với preview
- [ ] 4 font options (Noto Sans JP, Zen Maru Gothic, UD Digi Kyokasho, Klee One)
- [ ] Font preference persist qua localStorage (+ cloud sync nếu logged in)
- [ ] Font apply global cho tất cả Japanese text
- [ ] Lazy load: font chỉ download khi user chọn
- [ ] Tests: ≥ 4 new tests pass

### PR #18: Premium tier (freemium model)

**Branch:** `feat/premium`

#### Brainstorm

- **Problem:** Smart Quiz $0 revenue, không bền vững nếu scale. Nhai Kanji có 3 gói trả phí.
- **Solution:** Freemium — free tier đủ tốt (N5 + HSK1-3 + basic quiz), premium unlock N4-N1 + advanced SRS + mock test + writing + cloud sync.
- **Payment:** Stripe (global) hoặc MoMo/ZaloPay (Vietnam).
- **Risks:** Paywall quá aggressive → user bỏ đi. → Giữ free tier generous.

#### Free vs Premium

| Feature | Free | Premium |
|---------|------|---------|
| N5 vocab + grammar + quiz | ✅ | ✅ |
| HSK1-3 | ✅ | ✅ |
| Kanji N5 (reference + stroke) | ✅ | ✅ |
| Basic flashcard + MC | ✅ | ✅ |
| Dark mode, offline | ✅ | ✅ |
| N4/N3/N2/N1 content | ❌ | ✅ |
| HSK4-5 | ❌ | ✅ |
| Typing quiz + Writing quiz | ❌ | ✅ |
| JLPT mock test | ❌ | ✅ |
| Advanced SRS + leech detection | ❌ | ✅ |
| Cloud sync + cross-device | ❌ | ✅ |
| Leaderboard | ❌ | ✅ |
| Custom fonts | ❌ | ✅ |

#### Acceptance Criteria

- [ ] Premium gate check: `isPremium(user)` function
- [ ] Free content fully accessible without login
- [ ] Premium features show "Upgrade" prompt
- [ ] Stripe checkout integration (hoặc placeholder)
- [ ] Premium status sync via Supabase user metadata

### PR #19: Community integration

**Branch:** `feat/community`

#### Brainstorm

- **Problem:** Nhai Kanji có Facebook group + TikTok. Smart Quiz không có community.
- **Solution:** Nhẹ nhàng — link đến Discord server + GitHub Discussions. Không cần build custom forum.

#### Acceptance Criteria

- [ ] Discord invite link trong Settings/About page
- [ ] GitHub Discussions link cho feedback
- [ ] "Share progress" button (tạo shareable image card)
- [ ] Footer với community links

---

## Test Coverage Summary — Full Plan

| Phase | PRs | New Tests |
|-------|-----|-----------|
| 1-5 (v3.0) | #1-#9 | ~87 |
| 6 Kanji Mastery | #10-#11 | ~22 |
| 7 User System | #12-#13 | ~18 |
| 8 Content Expansion | #14-#16 | ~27 |
| 9 Premium & Community | #17-#19 | ~10 |
| **Total** | **19 PRs** | **~164 new tests** |
| **Final total** | | **605 + 164 = ~769 tests** |

---

## Thứ tự thực hiện & Dependencies

```
Phase 1: #1 SEO ─────────────────────────────────────────────────────┐
Phase 2: #2 Learning Path ──── #3 Mock Test                          │
Phase 5: #8 UI Polish ──────── #9 A11y                               │  Parallel
Phase 3: #4 Stroke Order ───── #5 Radicals                           │  tracks
Phase 4: #6 HSK Quiz ────────  #7 HSK1-4 Data                        │
                                                                      │
Phase 6: #10 Handwriting ──── #11 N3-N1 Kanji (depends on #4,#5)     │
Phase 7: #12 Supabase Auth ── #13 Leaderboard (depends on #12)       │
Phase 8: #14 N3 Content ───── #15 N2-N1 Content ── #16 Advanced SRS  │
Phase 9: #17 Fonts ─── #18 Premium (depends on #12) ── #19 Community │
```

---

## Scoring dự kiến sau 19 PRs

### So với Nhai Kanji

| Category | Hiện tại | Sau v4.0 | Nhai Kanji | Result |
|----------|---------|----------|------------|--------|
| Nội dung Kanji | 3/10 | **9/10** | 9/10 | **Ngang** |
| Nội dung Vocab | 7/10 | **9/10** | 7/10 | **Vượt** |
| Nội dung Grammar | 6/10 | **8/10** | 8/10 | **Ngang** |
| Quiz modes | 9/10 | **10/10** | 6/10 | **Vượt** |
| Kanji đặc biệt | 2/10 | **9/10** | 10/10 | **Gần ngang** |
| SRS | 5/10 | **9/10** | 9/10 | **Ngang** |
| Gamification | 5/10 | **8/10** | 8/10 | **Ngang** |
| User system | 2/10 | **9/10** | 9/10 | **Ngang** |
| UI/UX | 7/10 | **9/10** | 9/10 | **Ngang** |
| Bilingual | 8/10 | **10/10** | 2/10 | **Vượt xa** |
| Offline/PWA | 7/10 | **9/10** | 4/10 | **Vượt xa** |
| Community | 1/10 | **5/10** | 7/10 | Gần ngang |
| **Total** | **62/120** | **104/120** | **88/120** | **Vượt +16** |

### Điểm VƯỢT Nhai Kanji

| Thế mạnh | Smart Quiz v4.0 | Nhai Kanji |
|----------|----------------|------------|
| Quiz modes | 10/10 (5 modes) | 6/10 |
| Bilingual JP+CN | 10/10 (HSK1-5) | 2/10 |
| Offline/PWA | 9/10 | 4/10 |
| Vocab content | 9/10 (N5-N1 + HSK1-5) | 7/10 |
| Accessibility | WCAG AA | Minimal |
| Open source + DX | 9/10 (769 tests, CI) | 5/10 |

---

## Deferred (v5.0+)

| Feature | Lý do |
|---------|-------|
| Kanji writing practice with stroke order validation | Cần stroke detection ML, rất phức tạp |
| N1 grammar (Shin Kanzen Master full) | Data entry cực lớn |
| Listening comprehension (audio passages) | Cần recorded audio |
| Reading comprehension (passage quiz) | Cần curated passages |
| Mobile native app (React Native / Capacitor) | Khác stack hoàn toàn |
| AI-powered explanations | Cần API budget |
