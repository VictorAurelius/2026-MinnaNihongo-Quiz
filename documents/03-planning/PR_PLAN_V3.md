# PR Plan v3.0 — Smart Quiz "Better Than Nhai Kanji"

> **Ngày:** 2026-03-23
> **Baseline:** v2.0 (100/100 audit, 605 tests)
> **Mục tiêu:** Vượt Nhai Kanji ở core experience, giữ bilingual advantage
> **Chiến lược:** Không copy Nhai Kanji — tập trung vào thế mạnh riêng
> **Methodology:** Superpowers (Brainstorm → TDD → Implement → Verify)

---

## Tổng quan 5 Phases, 9 PRs

| Phase | Tên | PRs | Impact | Effort |
|-------|-----|-----|--------|--------|
| 1 | SEO & Visibility | PR #1 | Từ invisible → discoverable | Thấp |
| 2 | Learning Path & Progression | PR #2, #3 | Từ random → guided learning | Thấp-TB |
| 3 | Kanji Core Experience | PR #4, #5 | Match Nhai Kanji core | TB-Cao |
| 4 | Bilingual Advantage | PR #6, #7 | Vượt Nhai Kanji unique | TB |
| 5 | Polish & Accessibility | PR #8, #9 | Production excellence | Thấp-TB |

---

## Phase 1: SEO & Visibility (2/10 → 8/10)

### PR #1: SEO fundamentals

**Branch:** `feat/seo-meta-tags`

#### Brainstorm

- **Problem:** Smart Quiz SEO = 2/10 (không title, không OG tags, không Twitter cards). Khi share link trên MXH → blank preview. Google không index nội dung (SPA).
- **Risks:** `lang` attribute nên là `vi` (audience Việt) hay `ja` (nội dung Nhật)? → Dùng `vi` vì target audience là người Việt học tiếng Nhật.
- **Edge cases:** SvelteKit `<svelte:head>` override `app.html` title — cần đảm bảo fallback title + per-page title.

#### Task Breakdown

| # | Task | Files |
|---|------|-------|
| 1 | Viết tests cho SEO metadata | `src/tests/seo.test.ts` (new) |
| 2 | Thêm meta tags vào `app.html` | `src/app.html` |
| 3 | Fix manifest.json URLs + theme_color | `static/manifest.json` |
| 4 | Verify tất cả routes có `<svelte:head><title>` | Grep all `+page.svelte` |
| 5 | Tạo OG image | `static/og-image.png` |

#### TDD — Test Cases (viết trước)

```typescript
// src/tests/seo.test.ts
describe('SEO Metadata', () => {
  it('app.html should have default title tag');
  it('app.html should have meta description');
  it('app.html should have og:title, og:description, og:image, og:type');
  it('app.html should have twitter:card, twitter:title, twitter:description');
  it('app.html should have canonical URL');
  it('app.html lang attribute should be "vi"');
  it('manifest.json start_url should include base path');
  it('manifest.json theme_color should match app.html');
  it('every route +page.svelte should have <svelte:head> with <title>');
});
```

#### Acceptance Criteria

- [ ] `app.html` có `<title>`, `meta description`, OG tags, Twitter cards, canonical
- [ ] `lang="vi"` trên `<html>`
- [ ] `manifest.json` `start_url` = `/2026-Smart-Quiz/`
- [ ] `theme_color` nhất quán giữa `manifest.json` và `app.html`
- [ ] 25/25 routes có `<svelte:head><title>`
- [ ] `og-image.png` 1200×630 tồn tại
- [ ] Tests: tất cả SEO tests pass
- [ ] Build pass, 0 svelte-check warnings

---

## Phase 2: Learning Path & Progression (3/10 → 8/10)

### PR #2: Learning path with mastery-based unlocking

**Branch:** `feat/learning-path`

#### Brainstorm

- **Problem:** User mở app → thấy 25 bài → không biết bắt đầu từ đâu, không có motivation để hoàn thành.
- **Solution:** Mastery-based unlock (bài N-1 ≥ 70% → unlock bài N). "Continue" button.
- **Risks:**
  - User cũ đã có progress → phải tính mastery từ existing vocabProgress, không lock bài đã học.
  - Mastery 70% threshold có quá cao/thấp? → 70% = 7/10 words mastered level ≥ 3 (reasonable).
  - Course page performance nếu tính mastery cho 25 bài? → Tính lazy, cache in derived store.
- **Edge cases:** Course mới (n4) có ít lessons → xử lý đúng. User clear progress → tất cả lock lại trừ bài 1.

#### Task Breakdown

| # | Task | Files |
|---|------|-------|
| 1 | Viết tests cho progressUtils | `src/tests/utils/progressUtils.test.ts` (new) |
| 2 | Implement progressUtils | `src/lib/utils/progressUtils.ts` (new) |
| 3 | Viết tests cho MasteryRing | `src/tests/components/common/MasteryRing.test.ts` (new) |
| 4 | Implement MasteryRing component | `src/lib/components/common/MasteryRing.svelte` (new) |
| 5 | Update course page với mastery UI | `src/routes/course/[courseId]/+page.svelte` |

#### TDD — Test Cases

```typescript
// src/tests/utils/progressUtils.test.ts
describe('getLessonMastery', () => {
  it('should return 0 for lesson with no progress');
  it('should return percentage based on vocabProgress masteryLevel >= 3');
  it('should return 100 when all items at mastery >= 3');
  it('should handle missing lesson data gracefully');
});

describe('isLessonUnlocked', () => {
  it('should always unlock lesson 1');
  it('should lock lesson 2 when lesson 1 mastery < 70%');
  it('should unlock lesson 2 when lesson 1 mastery >= 70%');
  it('should unlock all lessons with sufficient mastery chain');
  it('should handle empty progress state');
});

describe('getNextLesson', () => {
  it('should return 1 for fresh user');
  it('should return first locked lesson number');
  it('should return last lesson if all unlocked');
});

describe('getCourseProgress', () => {
  it('should return 0/total for fresh user');
  it('should count lessons with mastery >= 70% as completed');
});

// src/tests/components/common/MasteryRing.test.ts
describe('MasteryRing', () => {
  it('should render SVG circle');
  it('should show percentage text');
  it('should show lock icon when locked=true');
  it('should apply correct stroke-dashoffset for percentage');
  it('should handle 0% and 100% edge cases');
});
```

#### Acceptance Criteria

- [ ] `getLessonMastery()` tính đúng từ vocabProgress (items with masteryLevel >= 3 / total items)
- [ ] Bài 1 luôn unlocked, bài N unlock khi bài N-1 ≥ 70%
- [ ] Course page hiển thị mastery ring + lock state cho mỗi lesson
- [ ] "Continue" button nhảy đến next unlocked lesson
- [ ] Existing progress: bài đã có data không bị lock sai
- [ ] Tests: ≥ 15 new tests pass
- [ ] Build pass, audit score không giảm

### PR #3: JLPT mock test mode

**Branch:** `feat/jlpt-mock-test`

#### Brainstorm

- **Problem:** Nhai Kanji có "Đề thi" (mock test) — Smart Quiz không có. User muốn biết mình ở level nào.
- **Solution:** Random 30 câu mixed (vocab MC + grammar MC), timer 30 phút, tính điểm JLPT.
- **Risks:**
  - Thiếu data cho reading section → chỉ làm vocab + grammar MC, ghi rõ "Vocabulary & Grammar Only".
  - Timer UX: user đóng tab giữa chừng? → Save state localStorage, resume khi quay lại.
  - N4 có đủ grammar data? → Kiểm tra, fallback chỉ vocab nếu thiếu grammar.
- **Edge cases:** User finish trước timer. Timer hết → auto submit. Câu hỏi trùng.

#### Task Breakdown

| # | Task | Files |
|---|------|-------|
| 1 | Viết tests cho mockTestUtils | `src/tests/utils/mockTestUtils.test.ts` (new) |
| 2 | Implement mockTestUtils | `src/lib/utils/mockTestUtils.ts` (new) |
| 3 | Implement mock test page | `src/routes/mock-test/+page.svelte` (new) |
| 4 | Thêm nav link + route title | `Header.svelte`, Home page |

#### TDD — Test Cases

```typescript
// src/tests/utils/mockTestUtils.test.ts
describe('generateMockTest', () => {
  it('should generate exactly 30 questions for N5');
  it('should include both vocab and grammar questions');
  it('should not have duplicate questions');
  it('should shuffle questions randomly');
  it('should handle N4 level');
  it('should throw/return empty for invalid level');
  it('each question should have id, question, answer, options (4), type');
});

describe('calculateJLPTScore', () => {
  it('should calculate vocab and grammar section scores separately');
  it('should return total score');
  it('should return pass=true when total >= 80/180 and each section >= 19/60');
  it('should return pass=false when total < 80');
  it('should return pass=false when one section < 19 even if total >= 80');
  it('should handle perfect score');
  it('should handle zero score');
});
```

#### Acceptance Criteria

- [ ] Mock test: 30 câu random, không trùng, mixed vocab+grammar
- [ ] Timer: 30 phút đếm ngược, auto-submit khi hết
- [ ] Results: điểm vocab, grammar, total, pass/fail theo chuẩn JLPT
- [ ] N5 và N4 levels hoạt động
- [ ] Home page có "JLPT Mock Test" card
- [ ] Tests: ≥ 10 new tests pass
- [ ] Build pass

---

## Phase 3: Kanji Core Experience (2/10 → 7/10)

### PR #4: Kanji stroke order animation

**Branch:** `feat/kanji-stroke-order`

#### Brainstorm

- **Problem:** Nhai Kanji có luyện viết + stroke order → core differentiator. Smart Quiz chỉ có reference table.
- **Solution:** SVG stroke animation dùng KanjiVG data (CC BY-SA 3.0). Không cần canvas draw — animation đủ.
- **Risks:**
  - 256 SVG files = ~5MB? → Lazy load per character, chỉ load khi user mở stroke view.
  - KanjiVG SVG format khác nhau? → Cần parser cho `<path>` elements, mỗi path = 1 stroke.
  - Browser support `stroke-dasharray` animation? → Rất tốt (IE11+).
- **Edge cases:** Kanji không có SVG (rare kanji) → hiện message "Stroke data not available". SVG load fail → retry + fallback.

#### Task Breakdown

| # | Task | Files |
|---|------|-------|
| 1 | Download + process KanjiVG data cho 256 kanji | `static/kanjivg/*.svg` |
| 2 | Viết tests cho StrokeOrder component | `src/tests/components/kanji/StrokeOrder.test.ts` (new) |
| 3 | Implement StrokeOrder component | `src/lib/components/kanji/StrokeOrder.svelte` (new) |
| 4 | Integrate vào kanji reference page | `src/routes/kanji/[lesson]/reference/+page.svelte` |
| 5 | Integrate vào KanjiFlashCard | `src/lib/components/kanji/KanjiFlashCard.svelte` |

#### TDD — Test Cases

```typescript
// src/tests/components/kanji/StrokeOrder.test.ts
describe('StrokeOrder', () => {
  it('should render SVG container');
  it('should show stroke counter "Stroke 1/N"');
  it('should have Play/Pause button');
  it('should have speed control (0.5x, 1x, 2x)');
  it('should have Step forward/back buttons');
  it('should show fallback message when SVG not found');
  it('should reset animation when character prop changes');
  it('should autoplay when autoPlay=true');
  it('should not autoplay when autoPlay=false');
});
```

#### Acceptance Criteria

- [ ] 256 kanji SVG files trong `static/kanjivg/`
- [ ] Stroke animation smooth (CSS `stroke-dasharray` + `stroke-dashoffset`)
- [ ] Controls: Play/Pause, Speed (0.5x/1x/2x), Step forward/back
- [ ] Stroke counter hiện "Stroke X/Y"
- [ ] Lazy load SVG (chỉ fetch khi user mở stroke view)
- [ ] Fallback graceful khi SVG không tồn tại
- [ ] Tích hợp vào kanji reference page + KanjiFlashCard back side
- [ ] Tests: ≥ 9 new tests pass
- [ ] Build pass, bundle size tăng < 1MB

### PR #5: Kanji radical breakdown (chiết tự)

**Branch:** `feat/kanji-radicals`

#### Brainstorm

- **Problem:** Nhai Kanji có "chiết tự trực quan" — phân tích kanji thành radicals. Smart Quiz không có.
- **Solution:** Data từ KRADFILE (public domain) — mapping kanji → component radicals. Visual breakdown.
- **Risks:**
  - KRADFILE chỉ list radicals, không có visual positioning → layout đơn giản (list, không phải diagram).
  - 214 bộ thủ cần Vietnamese names → cần data Hán Việt cho mỗi radical.
  - Một số kanji có nhiều cách phân tích → dùng KRADFILE mapping duy nhất.
- **Edge cases:** Kanji đơn giản (一, 二) có ít radicals. Radical không có trong 256 kanji hiện tại.

#### Task Breakdown

| # | Task | Files |
|---|------|-------|
| 1 | Tạo radicals data (214 bộ thủ + mapping) | `src/lib/data/kanji/radicals.ts` (new) |
| 2 | Viết tests cho radical functions | `src/tests/data/radicals.test.ts` (new) |
| 3 | Viết tests cho RadicalBreakdown | `src/tests/components/kanji/RadicalBreakdown.test.ts` (new) |
| 4 | Implement RadicalBreakdown component | `src/lib/components/kanji/RadicalBreakdown.svelte` (new) |
| 5 | Tích hợp vào kanji reference page | `src/routes/kanji/[lesson]/reference/+page.svelte` |
| 6 | Tạo 214 bộ thủ page | `src/routes/kanji/radicals/+page.svelte` (new) |

#### TDD — Test Cases

```typescript
// src/tests/data/radicals.test.ts
describe('Radicals Data', () => {
  it('should have 214 Kangxi radicals');
  it('each radical should have character, meaningVi, meaningEn, strokeCount');
  it('getRadicals("会") should return array of radicals');
  it('getRadicals should return empty array for unknown character');
  it('getKanjiByRadical("人") should return array of kanji containing 人');
  it('getKanjiByRadical should return empty for unknown radical');
  it('all 256 kanji should have at least 1 radical');
});

// src/tests/components/kanji/RadicalBreakdown.test.ts
describe('RadicalBreakdown', () => {
  it('should render kanji character large');
  it('should list all radicals with Hán Việt name');
  it('should show "No radical data" for unknown kanji');
  it('each radical should be clickable');
});
```

#### Acceptance Criteria

- [ ] 214 bộ thủ với character, meaningVi, meaningEn, strokeCount
- [ ] 256 kanji đều có radical mapping
- [ ] RadicalBreakdown hiện trong expanded kanji reference card
- [ ] Click radical → navigate đến danh sách kanji chứa radical đó
- [ ] `/kanji/radicals` page hiển thị 214 bộ thủ grid
- [ ] Search/filter theo tên, stroke count trên radicals page
- [ ] Tests: ≥ 11 new tests pass
- [ ] Build pass

---

## Phase 4: Bilingual Advantage (8/10 → 10/10)

### PR #6: HSK quiz modes

**Branch:** `feat/hsk-quiz`

#### Brainstorm

- **Problem:** HSK section chỉ có vocabulary list — không có quiz. Đây là content 1600+ words đang waste.
- **Solution:** Reuse existing quiz components (FlashCard, MC, TypingQuiz) với HSK adapter.
- **Risks:**
  - `FlashCard` expect `VocabItem` (japanese, kana) nhưng HSK dùng `HSKWord` (chinese, pinyin) → cần adapter/mapping.
  - TTS: phải dùng `playChineseAudio()` thay vì `playJapaneseAudio()`.
  - Direction naming: chinese-vi, vi-chinese, chinese-pinyin (khác ja-vi pattern).
- **Edge cases:** HSK words không có `kana` field. Some words có cùng pinyin nhưng khác nghĩa.

#### Task Breakdown

| # | Task | Files |
|---|------|-------|
| 1 | Viết tests cho hskQuizUtils | `src/tests/utils/hskQuizUtils.test.ts` (new) |
| 2 | Implement hskQuizUtils | `src/lib/utils/hskQuizUtils.ts` (new) |
| 3 | Implement HSK quiz page | `src/routes/hsk/[group]/quiz/[mode]/+page.svelte` (new) |
| 4 | Update HSK group page với quiz buttons | `src/routes/hsk/[group]/+page.svelte` |
| 5 | Thêm route title | `Header.svelte` |

#### TDD — Test Cases

```typescript
// src/tests/utils/hskQuizUtils.test.ts
describe('generateHSKQuestions', () => {
  it('should generate questions from HSK words');
  it('should support chinese-vi direction');
  it('should support vi-chinese direction');
  it('should support chinese-pinyin direction');
  it('each question should have id, question, answer, item');
});

describe('generateHSKMCOptions', () => {
  it('should generate 4 options including correct answer');
  it('should not have duplicate options');
  it('should shuffle options randomly');
});
```

#### Acceptance Criteria

- [ ] 3 quiz modes (flashcard, MC, typing) hoạt động cho HSK
- [ ] 3 directions (chinese-vi, vi-chinese, chinese-pinyin)
- [ ] TTS dùng `playChineseAudio()` (zh-CN)
- [ ] HSK group page có quiz mode buttons + direction selector
- [ ] 1600+ words quizzable
- [ ] Tests: ≥ 7 new tests pass
- [ ] Build pass

### PR #7: HSK levels expansion (HSK1-4 data)

**Branch:** `feat/hsk-levels`

#### Brainstorm

- **Problem:** Chỉ có HSK5 (1600 words). HSK1-4 (~1200 words) dễ hơn, phù hợp cho beginner.
- **Solution:** Thêm data HSK1-4. Restructure HSK index thành multi-level.
- **Risks:**
  - Data accuracy: cần source reliable cho HSK1-4 word lists.
  - Bundle size: thêm ~1200 words ~= 200KB raw → nên code-split thành lazy chunks.
  - Breaking change: HSK5_DATA export hiện tại → cần backward compatible.
- **Edge cases:** HSK1 chỉ ~150 words → group nhỏ hơn HSK5. Trùng từ giữa các levels.

#### Task Breakdown

| # | Task | Files |
|---|------|-------|
| 1 | Viết tests cho HSK multi-level | `src/tests/data/hsk.test.ts` (new) |
| 2 | Tạo HSK1-4 data files | `src/lib/data/hsk/hsk1.ts` → `hsk4.ts` (new) |
| 3 | Update HSK index | `src/lib/data/hsk/index.ts` |
| 4 | Update HSK types | `src/lib/types/hsk.ts` |
| 5 | Update HSK landing page | `src/routes/hsk/+page.svelte` |

#### TDD — Test Cases

```typescript
// src/tests/data/hsk.test.ts
describe('HSK Data', () => {
  it('should have 5 HSK levels (1-5)');
  it('HSK1 should have ~150 words');
  it('HSK2 should have ~150 words');
  it('HSK3 should have ~300 words');
  it('HSK4 should have ~600 words');
  it('HSK5 should have ~1600 words (existing)');
  it('each word should have chinese, pinyin, vietnamese fields');
  it('getHSKData(1) should return HSK1 groups');
  it('getAllHSKLevels() should return 5 levels with metadata');
  it('total words across all levels should be > 2800');
});
```

#### Acceptance Criteria

- [ ] 5 HSK levels (1-5) accessible
- [ ] HSK landing page có level selector
- [ ] Mỗi level có quiz modes (từ PR #6)
- [ ] Tổng ≥ 2800 words
- [ ] HSK5_DATA export vẫn backward compatible
- [ ] Code-split: mỗi level là lazy chunk riêng
- [ ] Tests: ≥ 10 new tests pass
- [ ] Build pass, bundle size tăng hợp lý

---

## Phase 5: Polish & Accessibility

### PR #8: Skeleton loading + branding

**Branch:** `feat/ui-polish`

#### Brainstorm

- **Problem:** Trang trắng khi chuyển page (SPA no skeleton). Không có logo (brand identity yếu).
- **Risks:**
  - Skeleton pattern nào cho SvelteKit? → `{#await}` block hoặc `onMount` loading state.
  - Logo design: cần simple, render tốt ở 24px (header). SVG best.
  - Skeleton mỗi page khác nhau? → Tạo 2-3 reusable skeletons (card, list, grid).

#### Task Breakdown

| # | Task | Files |
|---|------|-------|
| 1 | Viết tests cho Skeleton components | `src/tests/components/common/Skeleton.test.ts` (new) |
| 2 | Implement Skeleton + SkeletonCard | `src/lib/components/common/Skeleton.svelte`, `SkeletonCard.svelte` (new) |
| 3 | Thêm shimmer CSS | `src/app.css` |
| 4 | Tạo logo SVG | `static/logo.svg` (new) |
| 5 | Thêm skeleton loading vào key routes | Course page, Stats page, Review page |
| 6 | Thêm logo vào Header | `Header.svelte` |

#### TDD — Test Cases

```typescript
// src/tests/components/common/Skeleton.test.ts
describe('Skeleton', () => {
  it('should render with default width and height');
  it('should accept custom width and height props');
  it('should have shimmer animation class');
  it('should have role="status" and aria-label for accessibility');
});

describe('SkeletonCard', () => {
  it('should render title skeleton + 3 line skeletons + button skeleton');
  it('should have card container with correct styling');
});
```

#### Acceptance Criteria

- [ ] `<Skeleton>` component reusable với width/height props
- [ ] `<SkeletonCard>` pre-built layout
- [ ] Shimmer animation smooth (CSS `@keyframes shimmer`)
- [ ] Course page, Stats page, Review page có skeleton khi loading
- [ ] Logo SVG hiển thị trên Header (24px height)
- [ ] Tests: ≥ 6 new tests pass
- [ ] Build pass

### PR #9: Accessibility fixes

**Branch:** `fix/accessibility`

#### Brainstorm

- **Problem:** WCAG gaps: no focus-visible, no skip-link, no aria-live, no focus trap, color contrast fail.
- **Risks:**
  - `focus-visible` có thể conflict với existing focus styles → check kỹ.
  - Focus trap trong modal: cần handle Tab + Shift+Tab cycle → standard pattern.
  - Color change (warning/success) có thể ảnh hưởng visual design → chọn colors gần nhất đạt AA.
  - `prefers-reduced-motion` cần tắt đúng animations, giữ functionality.
- **Edge cases:** Modal không có focusable elements bên trong. Nested modals (không có hiện tại).

#### Task Breakdown

| # | Task | Files |
|---|------|-------|
| 1 | Viết tests cho SkipLink | `src/tests/components/common/SkipLink.test.ts` (new) |
| 2 | Viết tests cho focus trap | `src/tests/components/common/Modal.test.ts` (update) |
| 3 | Implement SkipLink | `src/lib/components/common/SkipLink.svelte` (new) |
| 4 | Add focus-visible + reduced-motion + sr-only + fix colors | `src/app.css` |
| 5 | Add SkipLink to layout | `src/routes/+layout.svelte` |
| 6 | Add aria-live to quiz components | FlashCard, MC, TypingQuiz |
| 7 | Add focus trap to Modal | `src/lib/components/common/Modal.svelte` |

#### TDD — Test Cases

```typescript
// src/tests/components/common/SkipLink.test.ts
describe('SkipLink', () => {
  it('should render a link with "Skip to main content" text');
  it('should have href="#main-content"');
  it('should have sr-only class (hidden until focused)');
  it('should become visible on focus');
});

// src/tests/a11y.test.ts (new)
describe('Accessibility', () => {
  it('app.css should have focus-visible styles');
  it('app.css should have prefers-reduced-motion media query');
  it('app.css should have sr-only utility class');
  it('warning color should have contrast ratio >= 4.5:1 on white');
  it('success color should have contrast ratio >= 4.5:1 on white');
});

// Update existing Modal tests
describe('Modal focus trap', () => {
  it('should trap Tab within modal when open');
  it('should focus first focusable element on open');
  it('should return focus to trigger on close');
});
```

#### Acceptance Criteria

- [ ] Skip link visible khi Tab, hidden otherwise
- [ ] `focus-visible` outline: `2px solid var(--primary)` on all interactive elements
- [ ] `@media (prefers-reduced-motion: reduce)` tắt tất cả animations
- [ ] `.sr-only` class hoạt động
- [ ] Warning color `#c27400` + success `#1a8a3a` đạt WCAG AA (≥ 4.5:1 trên trắng)
- [ ] `aria-live="polite"` trên quiz feedback regions
- [ ] Modal focus trap: Tab cycle, focus first element on open, return focus on close
- [ ] `npx svelte-check` — 0 errors, 0 warnings
- [ ] Tests: ≥ 10 new tests pass

---

## Test Coverage Summary

| PR | New Tests (est.) | Test Focus |
|----|-----------------|------------|
| #1 SEO | 9 | Meta tags validation, route titles |
| #2 Learning Path | 15 | progressUtils (mastery, unlock, next), MasteryRing |
| #3 Mock Test | 10 | generateMockTest, calculateJLPTScore |
| #4 Stroke Order | 9 | StrokeOrder component rendering, controls |
| #5 Radicals | 11 | Radicals data integrity, RadicalBreakdown rendering |
| #6 HSK Quiz | 7 | hskQuizUtils (questions, MC options) |
| #7 HSK Levels | 10 | HSK data integrity (5 levels, word counts) |
| #8 UI Polish | 6 | Skeleton components |
| #9 Accessibility | 10 | SkipLink, focus trap, CSS utilities |
| **Total** | **~87 new tests** | **605 + 87 = ~692 tests** |

---

## Thứ tự thực hiện

| Order | PR | Phase | New Tests | Dependencies |
|-------|----|-------|-----------|-------------|
| 1 | #1 SEO meta tags | 1 | 9 | Không |
| 2 | #2 Learning path | 2 | 15 | Không |
| 3 | #8 UI polish | 5 | 6 | Không |
| 4 | #9 Accessibility | 5 | 10 | Không |
| 5 | #6 HSK quiz modes | 4 | 7 | Không |
| 6 | #3 JLPT mock test | 2 | 10 | Không |
| 7 | #4 Kanji stroke order | 3 | 9 | KanjiVG data |
| 8 | #5 Kanji radicals | 3 | 11 | KRADFILE data |
| 9 | #7 HSK1-4 data | 4 | 10 | Data entry |

---

## Verification per PR (BẮT BUỘC trước push)

```bash
cd svelte-app
npx vitest run                    # Tất cả tests pass
npx vite build                    # Build pass
npx svelte-check --threshold error # 0 errors
./scripts/quality-audit.sh        # Score không giảm
```

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
