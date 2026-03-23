# PR Plan v3.0 — Smart Quiz "Better Than Nhai Kanji"

> **Ngày:** 2026-03-23
> **Baseline:** v2.0 (100/100 audit, 605 tests)
> **Mục tiêu:** Vượt Nhai Kanji ở core experience, giữ bilingual advantage
> **Chiến lược:** Không copy Nhai Kanji — tập trung vào thế mạnh riêng

---

## Tổng quan 5 Phases

| Phase | Tên | PRs | Impact | Effort |
|-------|-----|-----|--------|--------|
| 1 | SEO & Visibility | 1 PR | Từ invisible → discoverable | Thấp |
| 2 | Learning Path & Progression | 2 PRs | Từ random → guided learning | Thấp-TB |
| 3 | Kanji Core Experience | 2 PRs | Match Nhai Kanji core | TB-Cao |
| 4 | Bilingual Advantage | 2 PRs | Vượt Nhai Kanji unique | TB |
| 5 | Polish & Accessibility | 2 PRs | Production excellence | Thấp-TB |

**Tổng: 9 PRs**

---

## Phase 1: SEO & Visibility (hiện tại 2/10 → 8/10)

> Smart Quiz hiện invisible trên search engines. Fix này mất 1 giờ nhưng impact cực lớn.

### PR #1: SEO fundamentals

**Branch:** `feat/seo-meta-tags`

**Files cần sửa:**

1. `svelte-app/src/app.html`
   - Thêm `<title>Smart Quiz - Learn Japanese & Chinese</title>`
   - Thêm OG tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
   - Thêm Twitter Card: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
   - Thêm `canonical` URL
   - Fix `lang="ja"` → `lang="vi"` (target audience là người Việt)

2. `svelte-app/static/og-image.png` (new)
   - Tạo OG image 1200x630 cho social sharing

3. `svelte-app/static/manifest.json`
   - Fix `start_url`: `/` → `/2026-Smart-Quiz/`
   - Fix shortcuts URLs: thêm `/2026-Smart-Quiz/` prefix
   - Thống nhất `theme_color`: `#6366f1` everywhere

4. Mỗi route `+page.svelte` đã có `<svelte:head><title>` → verify tất cả 25 routes có title

**Verification:**
- Grep: 0 routes thiếu `<title>` trong `<svelte:head>`
- Manual: share link trên Facebook/Twitter hiện preview đúng

---

## Phase 2: Learning Path & Progression (hiện tại 3/10 → 8/10)

> Smart Quiz hiện không có guided learning — user không biết học gì tiếp. Đây là gap lớn thứ 2 sau SEO.

### PR #2: Learning path with mastery-based unlocking

**Branch:** `feat/learning-path`

**Concept:** Mỗi lesson cần đạt 70% mastery trước khi unlock bài tiếp theo. Hiển thị progress trên course page.

**Files:**

1. `src/lib/utils/progressUtils.ts` (new)
   - `getLessonMastery(courseId, lessonNumber)` → 0-100%
   - `isLessonUnlocked(courseId, lessonNumber)` → boolean (bài 1 luôn unlock, bài N unlock khi bài N-1 ≥ 70%)
   - `getNextLesson(courseId)` → lesson number tiếp theo cần học
   - `getCourseProgress(courseId)` → { completed, total, percentage }

2. `src/routes/course/[courseId]/+page.svelte`
   - Thêm progress bar tổng cho course
   - Mỗi lesson card hiển thị mastery % + lock/unlock state
   - Lock icon + "Complete Lesson X first" tooltip cho locked lessons
   - "Continue" button → jump to next unlocked lesson
   - Visual: mastery ring quanh lesson number (giống Duolingo)

3. `src/lib/stores/progress.ts`
   - Sửa `updateLessonProgress()` để tính mastery % từ vocabProgress

4. `src/lib/components/common/MasteryRing.svelte` (new)
   - SVG circular progress indicator
   - Props: `percentage`, `size`, `locked`

**Verification:**
- Bài 1 luôn accessible
- Bài 2+ locked cho đến khi bài trước ≥ 70%
- "Continue" button nhảy đúng bài

### PR #3: JLPT mock test mode

**Branch:** `feat/jlpt-mock-test`

**Concept:** Thi thử JLPT — random 30 câu từ toàn bộ lessons, có timer, tính điểm theo chuẩn JLPT.

**Files:**

1. `src/lib/utils/mockTestUtils.ts` (new)
   - `generateMockTest(level, sections)` → mixed questions (vocab MC + grammar MC + reading)
   - `calculateJLPTScore(results)` → { vocab, grammar, reading, total, pass }
   - JLPT N5 passing: 80/180 tổng, ≥ 19/60 mỗi section

2. `src/routes/mock-test/+page.svelte` (new)
   - Level selector (N5, N4)
   - Timer (30 phút)
   - Progress bar (câu 1/30)
   - Mixed question types: vocab MC, grammar MC
   - Results page: điểm từng section + pass/fail

3. `src/lib/components/layout/Header.svelte`
   - Thêm route title cho `/mock-test`

4. Home page: thêm "JLPT Mock Test" card

**Verification:**
- Timer đếm ngược đúng
- 30 câu random, không trùng
- Kết quả hiện pass/fail theo chuẩn JLPT

---

## Phase 3: Kanji Core Experience (hiện tại 2/10 → 7/10)

> Match Nhai Kanji core: stroke order + radical breakdown. Dùng open data (KanjiVG) thay vì tự vẽ.

### PR #4: Kanji stroke order animation

**Branch:** `feat/kanji-stroke-order`

**Concept:** Hiển thị stroke order animation cho mỗi kanji bằng SVG data từ KanjiVG (open source, CC BY-SA 3.0).

**Files:**

1. `svelte-app/static/kanjivg/` (new)
   - Download 256 SVG files cho kanji hiện có từ KanjiVG
   - Naming: `{unicode-hex}.svg` (e.g., `04e00.svg` cho 一)

2. `src/lib/components/kanji/StrokeOrder.svelte` (new)
   - Load SVG từ static folder
   - Animate từng stroke với CSS `stroke-dasharray` + `stroke-dashoffset`
   - Controls: Play/Pause, Speed (0.5x, 1x, 2x), Step forward/back
   - Stroke counter: "Stroke 3/8"
   - Props: `character`, `autoPlay`

3. `src/routes/kanji/[lesson]/reference/+page.svelte`
   - Thêm StrokeOrder component trong expanded kanji card
   - Button "Show Strokes" toggle

4. `src/lib/components/kanji/KanjiFlashCard.svelte`
   - Thêm mini stroke animation trên back side

**Verification:**
- 256 kanji hiện stroke order đúng
- Animation smooth, controls hoạt động
- Fallback graceful khi SVG không tồn tại

### PR #5: Kanji radical breakdown (chiết tự)

**Branch:** `feat/kanji-radicals`

**Concept:** Hiển thị cấu trúc radical của kanji. Dùng data từ KRADFILE (open source).

**Files:**

1. `src/lib/data/kanji/radicals.ts` (new)
   - 214 bộ thủ (Kangxi radicals): character, meaning_vi, meaning_en, strokeCount
   - Mapping kanji → radicals (từ KRADFILE)
   - `getRadicals(character)` → radical[]
   - `getKanjiByRadical(radical)` → kanji[]

2. `src/lib/components/kanji/RadicalBreakdown.svelte` (new)
   - Visual breakdown: kanji → các bộ thành phần
   - Mỗi radical: character + tên Hán Việt + meaning
   - Click radical → xem tất cả kanji chứa radical đó
   - Layout: kanji lớn ở giữa, radicals xung quanh

3. `src/routes/kanji/[lesson]/reference/+page.svelte`
   - Thêm "Chiết tự" section trong expanded card

4. `src/routes/kanji/radicals/+page.svelte` (new)
   - Trang 214 bộ thủ — grid view
   - Search/filter theo tên, stroke count
   - Click → xem tất cả kanji chứa bộ thủ đó

**Verification:**
- 256 kanji đều hiện radical breakdown
- Click radical → navigate đến danh sách kanji đúng
- 214 bộ thủ page hiển thị đầy đủ

---

## Phase 4: Bilingual Advantage (hiện tại 8/10 → 10/10)

> Đây là thế mạnh unique mà Nhai Kanji KHÔNG có. Double down.

### PR #6: HSK quiz modes (flashcard + MC + typing cho Chinese)

**Branch:** `feat/hsk-quiz`

**Concept:** Hiện tại HSK chỉ có vocabulary list. Thêm quiz modes giống Japanese quiz.

**Files:**

1. `src/routes/hsk/[group]/quiz/[mode]/+page.svelte` (new)
   - 3 modes: flashcard, MC, typing
   - Directions: chinese-vi, vi-chinese, chinese-pinyin
   - Dùng lại quiz components (FlashCard, MultipleChoice, TypingQuiz) với adapter

2. `src/lib/utils/hskQuizUtils.ts` (new)
   - `generateHSKQuestions(words, direction)` → QuizQuestion[]
   - `generateHSKMCOptions(answer, allWords, direction)` → string[]
   - Dùng `playChineseAudio()` cho TTS

3. `src/routes/hsk/[group]/+page.svelte`
   - Thêm quiz mode buttons (giống lesson menu)
   - Direction selector (Chinese→VN, VN→Chinese, Pinyin)

4. `src/lib/components/layout/Header.svelte`
   - Thêm route title cho HSK quiz

**Verification:**
- 3 quiz modes hoạt động cho HSK
- TTS phát âm tiếng Trung đúng
- 1600+ words quizzable

### PR #7: HSK levels expansion (HSK1-4 data)

**Branch:** `feat/hsk-levels`

**Concept:** Thêm HSK1-4 (hiện chỉ có HSK5). Total coverage HSK1-6 → ~5000+ words.

**Files:**

1. `src/lib/data/hsk/hsk1.ts` → `hsk4.ts` (new, 4 files)
   - HSK1: ~150 words
   - HSK2: ~150 words
   - HSK3: ~300 words
   - HSK4: ~600 words

2. `src/lib/data/hsk/index.ts`
   - Thêm exports cho HSK1-4
   - `getHSKData(level)` → HSKGroup[]
   - `getAllHSKLevels()` → metadata

3. `src/routes/hsk/+page.svelte`
   - Level selector (HSK1 → HSK5)
   - Progress per level
   - Total word count

4. `src/lib/types/hsk.ts`
   - Thêm `HSKLevel = 1 | 2 | 3 | 4 | 5`

**Verification:**
- 5 HSK levels accessible
- Mỗi level có quiz modes
- Tổng ~3200+ words (HSK1-5)

---

## Phase 5: Polish & Accessibility (hiện tại 41/80 UI → 55/80)

### PR #8: Skeleton loading + page transitions + branding

**Branch:** `feat/ui-polish`

**Files:**

1. `src/lib/components/common/Skeleton.svelte` (new)
   - Reusable skeleton component: `<Skeleton width="100%" height="1rem" />`
   - Animated shimmer effect

2. `src/lib/components/common/SkeletonCard.svelte` (new)
   - Pre-built skeleton cho card layout (title + 3 lines + button)

3. Các route pages: thêm skeleton loading state
   - `{#if loading} <SkeletonCard /> {:else} ... {/if}`

4. `src/app.css`
   - Thêm page transition animation (slide + fade)
   - Thêm `.skeleton` shimmer keyframes

5. `svelte-app/static/logo.svg` (new)
   - Simple logo: "SQ" monogram + "Smart Quiz" text
   - Dùng trong Header thay vì text-only title

6. `src/lib/components/layout/Header.svelte`
   - Logo thay cho text title

**Verification:**
- Mọi page có skeleton loading (không blank flash)
- Logo hiển thị đúng trên header
- Transitions smooth

### PR #9: Accessibility fixes

**Branch:** `fix/accessibility`

**Files:**

1. `src/app.css`
   - Thêm `focus-visible` styles: `outline: 2px solid var(--primary); outline-offset: 2px`
   - Thêm `@media (prefers-reduced-motion: reduce)` → tắt animations
   - Thêm `.sr-only` utility class
   - Fix warning color: `#ff9500` → `#c27400` (đạt AA trên trắng)
   - Fix success color: `#34c759` → `#1a8a3a` (đạt AA trên trắng)

2. `src/lib/components/common/SkipLink.svelte` (new)
   - "Skip to main content" link, visible on focus

3. `src/routes/+layout.svelte`
   - Thêm `<SkipLink />` trước Header
   - Thêm `<main id="main-content">` target

4. Quiz components (FlashCard, MultipleChoice, TypingQuiz):
   - Thêm `aria-live="polite"` region cho feedback (đúng/sai, score)

5. `src/lib/components/common/Modal.svelte`
   - Thêm focus trap (Tab cycle trong modal)

**Verification:**
- `npx svelte-check` — 0 warnings
- Tab navigation có focus indicator rõ ràng
- Screen reader announce quiz feedback
- Modal trap focus đúng
- `prefers-reduced-motion` tắt animations

---

## Scoring dự kiến sau 9 PRs

### So với Nhai Kanji (từ báo cáo COMPARISON_FEATURES)

| Category | Trước | Sau 9 PRs | Nhai Kanji | Gap |
|----------|-------|-----------|------------|-----|
| Nội dung Kanji | 3/10 | 6/10 | 9/10 | -3 (chấp nhận) |
| Nội dung Vocab | 7/10 | 7/10 | 7/10 | 0 |
| Nội dung Grammar | 6/10 | 6/10 | 8/10 | -2 (chấp nhận) |
| Quiz modes | 9/10 | 10/10 | 6/10 | **+4** |
| Kanji đặc biệt | 2/10 | 7/10 | 10/10 | -3 (chấp nhận) |
| SRS | 5/10 | 6/10 | 9/10 | -3 |
| Gamification | 5/10 | 5/10 | 8/10 | -3 |
| User system | 2/10 | 2/10 | 9/10 | -7 (defer) |
| UI/UX | 7/10 | 9/10 | 9/10 | **0** |
| Bilingual | 8/10 | 10/10 | 2/10 | **+8** |
| Offline/PWA | 7/10 | 8/10 | 4/10 | **+4** |
| Community | 1/10 | 1/10 | 7/10 | -6 (defer) |
| **Total** | **62/120** | **77/120** | **88/120** | **-11** |

### So với Nhai Kanji (COMPARISON_UI_UX)

| Category | Trước | Sau | Nhai Kanji |
|----------|-------|-----|------------|
| Layout | 5/10 | 6/10 | 8/10 |
| Typography | 5/10 | 5/10 | 9/10 |
| Color/Theme | 6/10 | 7/10 | 8/10 |
| Animations | 5/10 | 8/10 | 8/10 |
| Components | 6/10 | 7/10 | 7/10 |
| Mobile | 6/10 | 6/10 | 7/10 |
| Onboarding | 5/10 | 7/10 | 7/10 |
| Branding | 3/10 | 6/10 | 8/10 |
| **Total** | **41/80** | **52/80** | **62/80** |

---

## Thứ tự thực hiện

| Order | PR | Phase | Effort | Dependencies |
|-------|----|-------|--------|-------------|
| 1 | #1 SEO meta tags | 1 | 1h | Không |
| 2 | #2 Learning path | 2 | 4h | Không |
| 3 | #8 UI polish (skeleton + logo) | 5 | 3h | Không |
| 4 | #9 Accessibility | 5 | 3h | Không |
| 5 | #6 HSK quiz modes | 4 | 4h | Không |
| 6 | #3 JLPT mock test | 2 | 4h | Không |
| 7 | #4 Kanji stroke order | 3 | 6h | KanjiVG data download |
| 8 | #5 Kanji radicals | 3 | 5h | radicals data |
| 9 | #7 HSK1-4 data | 4 | 8h | Data entry |

**Tổng effort ước tính:** ~38h

---

## Deferred (không làm trong v3.0)

| Feature | Lý do defer |
|---------|-------------|
| User auth + cloud sync | Cần backend, chi phí, phức tạp — chưa có users |
| Leaderboard | Cần auth |
| Premium/monetization | Chưa có users |
| N3→N1 content | Data entry quá lớn (~2000 kanji, ~5000 vocab) |
| Luyện viết tay (canvas draw) | High effort, cần touch gesture handling phức tạp |
| Community features | Cần backend + moderation |
