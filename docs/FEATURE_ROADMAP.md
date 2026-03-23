# Feature Roadmap — Smart Quiz v2.0

> **Ngày lập:** 2026-03-23
> **Baseline:** v1.2.0 (Quality Audit 100/100)

## Tổng quan

8 features chia 4 phases, thực hiện tuần tự. Mỗi feature = 1 PR riêng.

---

## Phase 1: Quick Wins (Low complexity)

### PR #1: Export/Import Progress
- **Branch:** `feat/export-import-progress`
- **Scope:** Cho phép user export progress ra JSON file và import lại
- **Files:**
  - `src/lib/components/common/ExportImport.svelte` (new)
  - `src/lib/stores/progress.ts` — thêm `exportProgress()`, `importProgress()`
  - `src/routes/settings/+page.svelte` (new) — settings page chứa export/import
  - `src/lib/components/layout/Header.svelte` — thêm link Settings
- **Status:** [ ] Pending

### PR #2: Customizable Quiz Settings
- **Branch:** `feat/quiz-settings`
- **Scope:** Cho phép user tuỳ chỉnh số câu, auto-speak, timer
- **Files:**
  - `src/lib/components/quiz/QuizSettings.svelte` (new)
  - `src/lib/stores/progress.ts` — mở rộng settings
  - `src/lib/types/lesson.ts` — thêm QuizSettings interface
  - `src/lib/constants/quiz.ts` — mở rộng defaults
- **Status:** [ ] Pending

---

## Phase 2: Analytics (Medium complexity)

### PR #3: Statistics Dashboard
- **Branch:** `feat/statistics-dashboard`
- **Scope:** Dashboard hiển thị tiến độ học, accuracy, mastery distribution
- **Files:**
  - `src/routes/stats/+page.svelte` (new)
  - `src/lib/components/stats/OverviewCards.svelte` (new)
  - `src/lib/components/stats/MasteryChart.svelte` (new)
  - `src/lib/components/stats/RecentActivity.svelte` (new)
  - `src/lib/utils/statsUtils.ts` (new) — tính toán stats từ progress store
  - `src/lib/components/layout/Header.svelte` — thêm link Stats
- **Status:** [ ] Pending

### PR #4: Study Streaks & Achievements
- **Branch:** `feat/streaks-achievements`
- **Scope:** Track daily study streak, unlock achievements
- **Files:**
  - `src/lib/stores/progress.ts` — thêm streaks, achievements tracking
  - `src/lib/types/lesson.ts` — thêm Streak, Achievement interfaces
  - `src/lib/components/stats/StreakCard.svelte` (new)
  - `src/lib/components/stats/AchievementList.svelte` (new)
  - `src/lib/utils/achievementUtils.ts` (new) — logic check achievements
- **Status:** [ ] Pending

---

## Phase 3: Core Learning (High complexity)

### PR #5: Spaced Repetition System (SRS)
- **Branch:** `feat/srs`
- **Scope:** SM-2 algorithm cho review scheduling dựa trên masteryLevel hiện có
- **Files:**
  - `src/lib/utils/srsUtils.ts` (new) — SM-2 algorithm, review scheduling
  - `src/lib/stores/progress.ts` — thêm SRS fields (interval, easeFactor, nextReview)
  - `src/routes/review/+page.svelte` (new) — daily review page
  - `src/lib/components/common/ReviewBadge.svelte` (new) — badge số items cần review
- **Status:** [ ] Pending

### PR #6: Grammar Exercises
- **Branch:** `feat/grammar-exercises`
- **Scope:** Quiz mode cho grammar patterns (fill-in-blank, sentence ordering)
- **Files:**
  - `src/lib/components/grammar/GrammarFillBlank.svelte` (new)
  - `src/lib/components/grammar/GrammarOrdering.svelte` (new)
  - `src/routes/course/[courseId]/lesson/[id]/grammar-quiz/[mode]/+page.svelte` (new)
  - `src/lib/utils/grammarQuizUtils.ts` (new)
- **Status:** [ ] Pending

---

## Phase 4: UX Polish

### PR #7: Better Mobile Keyboard UX
- **Branch:** `feat/mobile-keyboard`
- **Scope:** Cải thiện virtual keyboard — layout tối ưu, haptic feedback, swipe
- **Files:**
  - `src/lib/components/quiz/VirtualKeyboard.svelte` — redesign layout
  - `src/lib/utils/keyboardUtils.ts` (new) — haptic, swipe handling
- **Status:** [ ] Pending

### PR #8: PWA & Offline Improvements
- **Branch:** `feat/pwa-improvements`
- **Scope:** Improve caching strategy, add update notification, install prompt UX
- **Files:**
  - `static/service-worker.js` — improve caching strategy
  - `src/lib/components/common/UpdateNotification.svelte` (new)
  - `src/lib/components/common/InstallPrompt.svelte` (new)
  - `src/lib/utils/pwa.ts` — enhance update detection
- **Status:** [ ] Pending

---

## Tracking

| # | Feature | Phase | PR | Status |
|---|---------|-------|-----|--------|
| 1 | Export/Import Progress | 1 | — | [ ] Pending |
| 2 | Customizable Quiz Settings | 1 | — | [ ] Pending |
| 3 | Statistics Dashboard | 2 | — | [ ] Pending |
| 4 | Study Streaks & Achievements | 2 | — | [ ] Pending |
| 5 | Spaced Repetition (SRS) | 3 | — | [ ] Pending |
| 6 | Grammar Exercises | 3 | — | [ ] Pending |
| 7 | Mobile Keyboard UX | 4 | — | [ ] Pending |
| 8 | PWA & Offline | 4 | — | [ ] Pending |
