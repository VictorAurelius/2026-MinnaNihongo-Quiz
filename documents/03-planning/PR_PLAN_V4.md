# PR Plan v4.0 — Smart Quiz "Full Parity + Beyond"

> **Ngày:** 2026-03-25 (rewrite theo kit rules)
> **Baseline:** v2.0 (100/100 audit, 605 tests)
> **Mục tiêu:** Có TẤT CẢ tính năng Nhai Kanji + vượt ở quiz, bilingual, offline, a11y
> **Methodology:** Superpowers (Brainstorm → TDD → Implement → Verify)
> **Kit rules applied:** waves + audit checkpoints, business docs first, time estimates, verification per task

---

## Wave Overview (8 waves, 19 PRs)

| Wave | PRs | Deliverable | Audit Checkpoint |
|------|-----|-------------|-----------------|
| **1** | #1, #8, #9 | User tìm thấy app + UX polished | SEO ≥ 6/10, audit ≥ 100/100 |
| **2** | #2, #3 | Guided learning + mock test | Progression 8/10 |
| **3** | #4, #5 | Kanji stroke + radicals | Kanji 7/10 |
| **4** | #6, #7 | HSK quiz + HSK1-4 data | Bilingual 10/10 |
| **5** | #10, #11 | Handwriting + 2500+ kanji | Kanji 9/10 |
| **6** | #12, #13 | Auth + cloud sync + leaderboard | User 9/10 |
| **7** | #14, #15, #16 | N3→N1 content + advanced SRS | Content 9/10 |
| **8** | #17, #18, #19 | Fonts + premium + community | Business 8/10 |

**Quy trình mỗi wave:**
1. Implement PRs
2. `./scripts/test-local.sh all`
3. `./scripts/quality-audit.sh --save`
4. Update plan: đánh ✅, ghi PR number
5. Review business gaps trước wave tiếp

---

## Wave 1: Foundation (SEO + UI Polish + A11y)

### PR #1: SEO fundamentals

**Branch:** `feat/seo-meta-tags` | **Est:** 1h

#### Brainstorm
- **Problem:** SEO 2/10 — app invisible trên Google, blank preview khi share link MXH
- **Solution:** Thêm OG tags, Twitter cards, canonical URL, fix lang attribute
- **Risks:** `lang` attribute — dùng `vi` (target audience) không phải `ja` (content)
- **Edge cases:** SvelteKit `<svelte:head>` override `app.html` title — cần fallback + per-page

#### Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | Viết SEO tests | `src/tests/seo.test.ts` | 5m | Tests RED |
| 2 | Thêm meta tags vào app.html | `src/app.html` | 5m | Tests GREEN |
| 3 | Fix manifest.json (start_url, theme_color) | `static/manifest.json` | 3m | Grep verify |
| 4 | Verify 25 routes có `<title>` | All `+page.svelte` | 5m | Grep 0 missing |
| 5 | Tạo OG image placeholder | `static/og-image.png` | 2m | File exists |

#### TDD — Test Cases (9 tests)

```typescript
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
- [ ] OG tags complete (title, desc, image, type, url)
- [ ] Twitter cards complete
- [ ] `lang="vi"`, canonical URL present
- [ ] manifest.json start_url = `/2026-Smart-Quiz/`
- [ ] 25/25 routes have `<title>`
- [ ] Tests: 9 new pass | Build pass

---

### PR #8: Skeleton loading + branding

**Branch:** `feat/ui-polish` | **Est:** 3h

#### Brainstorm
- **Problem:** Blank flash khi chuyển trang. Không có logo (brand identity yếu)
- **Solution:** Skeleton shimmer components + SVG logo
- **Risks:** Skeleton pattern cho SvelteKit? → `onMount` loading state + `{#if}`

#### Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | Viết Skeleton tests | `src/tests/components/common/Skeleton.test.ts` | 5m | RED |
| 2 | Implement Skeleton + SkeletonCard | `src/lib/components/common/Skeleton.svelte`, `SkeletonCard.svelte` | 10m | GREEN |
| 3 | Thêm shimmer CSS | `src/app.css` | 5m | Visual |
| 4 | Tạo logo SVG | `static/logo.svg` | 10m | File exists |
| 5 | Thêm skeleton vào Course, Stats, Review pages | 3 route files | 15m | No blank flash |
| 6 | Logo trong Header | `Header.svelte` | 5m | Visual |

#### TDD — Test Cases (6 tests)

```typescript
describe('Skeleton', () => {
  it('should render with default dimensions');
  it('should accept custom width/height props');
  it('should have shimmer animation class');
  it('should have role="status" and aria-label');
});
describe('SkeletonCard', () => {
  it('should render title + lines + button skeletons');
  it('should have card container styling');
});
```

#### Acceptance Criteria
- [ ] Skeleton component reusable (width/height props)
- [ ] Shimmer animation smooth
- [ ] 3+ pages use skeleton loading
- [ ] Logo SVG in Header (24px)
- [ ] Tests: 6 new pass | Build pass

---

### PR #9: Accessibility fixes

**Branch:** `fix/accessibility` | **Est:** 3h

#### Brainstorm
- **Problem:** WCAG gaps: no focus-visible, no skip-link, no aria-live, contrast fail
- **Risks:** Color changes (warning/success) may affect visual design → pick closest AA-compliant
- **Edge cases:** Modal without focusable elements. `prefers-reduced-motion` must not break functionality

#### Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | Viết SkipLink + a11y tests | 2 test files | 10m | RED |
| 2 | Implement SkipLink | `SkipLink.svelte` | 5m | GREEN |
| 3 | focus-visible + reduced-motion + sr-only CSS | `app.css` | 10m | Tab navigation visible |
| 4 | Fix warning/success colors (AA compliant) | `app.css` | 5m | Contrast ≥ 4.5:1 |
| 5 | Add SkipLink to layout | `+layout.svelte` | 3m | Focus on Tab |
| 6 | Add aria-live to quiz feedback | FlashCard, MC, TypingQuiz | 10m | Screen reader |
| 7 | Focus trap in Modal | `Modal.svelte` | 15m | Tab cycles |

#### TDD — Test Cases (10 tests)

```typescript
describe('SkipLink', () => {
  it('should render link with "Skip to main content"');
  it('should have href="#main-content"');
  it('should have sr-only class');
  it('should become visible on focus');
});
describe('Accessibility CSS', () => {
  it('should have focus-visible styles');
  it('should have prefers-reduced-motion media query');
  it('should have sr-only utility class');
  it('warning color contrast >= 4.5:1 on white');
  it('success color contrast >= 4.5:1 on white');
});
describe('Modal focus trap', () => {
  it('should trap Tab within modal');
});
```

#### Acceptance Criteria
- [ ] Skip link visible on Tab, hidden otherwise
- [ ] focus-visible outline on all interactive elements
- [ ] `prefers-reduced-motion` disables animations
- [ ] Warning `#c27400` + success `#1a8a3a` pass WCAG AA
- [ ] aria-live on quiz feedback
- [ ] Modal focus trap
- [ ] `npx svelte-check` — 0 warnings
- [ ] Tests: 10 new pass | Build pass

#### Wave 1 Checkpoint
```bash
./scripts/quality-audit.sh --save  # Expect: 100/100
# Verify SEO: curl + grep og:title
# Verify: 0 svelte-check warnings
```

---

## Wave 2: Learning Path

### PR #2: Learning path with mastery-based unlocking

**Branch:** `feat/learning-path` | **Est:** 4h

#### Brainstorm
- **Problem:** 25 bài ngang nhau — user không biết học gì tiếp, không có motivation
- **Solution:** Mastery unlock (bài N-1 ≥ 70% → unlock bài N) + "Continue" button
- **Risks:** User cũ đã có progress → phải tính mastery từ existing data, không lock bài đã học
- **Edge cases:** Course mới (n4) ít lessons. Clear progress → tất cả lock trừ bài 1

#### Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | Viết progressUtils tests | `tests/utils/progressUtils.test.ts` | 15m | RED (10 tests) |
| 2 | Implement progressUtils | `lib/utils/progressUtils.ts` | 15m | GREEN |
| 3 | Viết MasteryRing tests | `tests/components/common/MasteryRing.test.ts` | 10m | RED (5 tests) |
| 4 | Implement MasteryRing SVG | `lib/components/common/MasteryRing.svelte` | 15m | GREEN |
| 5 | Update course page UI | `routes/course/[courseId]/+page.svelte` | 20m | Visual + lock logic |

#### TDD — Test Cases (15 tests)

```typescript
describe('getLessonMastery', () => {
  it('return 0 for no progress');
  it('return % based on masteryLevel >= 3');
  it('return 100 when all mastered');
  it('handle missing lesson gracefully');
});
describe('isLessonUnlocked', () => {
  it('always unlock lesson 1');
  it('lock lesson 2 when lesson 1 < 70%');
  it('unlock lesson 2 when lesson 1 >= 70%');
  it('unlock chain works');
  it('handle empty progress');
});
describe('getNextLesson', () => {
  it('return 1 for fresh user');
  it('return first locked lesson');
  it('return last if all unlocked');
});
describe('getCourseProgress', () => {
  it('return 0/total for fresh');
  it('count >= 70% as completed');
});
describe('MasteryRing', () => {
  it('render SVG circle');
  it('show percentage text');
  it('show lock icon when locked');
  it('correct stroke-dashoffset');
  it('handle 0% and 100%');
});
```

#### Acceptance Criteria
- [ ] Lesson 1 always unlocked
- [ ] Lesson N unlock when N-1 ≥ 70%
- [ ] Course page: mastery ring + lock state per lesson
- [ ] "Continue" button → next unlocked lesson
- [ ] Existing progress respected
- [ ] Tests: 15 new pass | Build pass

---

### PR #3: JLPT mock test

**Branch:** `feat/jlpt-mock-test` | **Est:** 4h

#### Brainstorm
- **Problem:** Nhai Kanji có "Đề thi" — Smart Quiz không. User muốn biết level
- **Solution:** 30 câu random mixed (vocab MC + grammar MC), timer 30 phút, JLPT scoring
- **Risks:** Thiếu reading section → label "Vocabulary & Grammar Only". N4 grammar data sparse
- **Edge cases:** User finish trước timer. Timer hết → auto submit. Resume sau refresh

#### Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | Viết mockTestUtils tests | `tests/utils/mockTestUtils.test.ts` | 10m | RED (7 tests) |
| 2 | Implement mockTestUtils | `lib/utils/mockTestUtils.ts` | 15m | GREEN |
| 3 | Implement mock test page | `routes/mock-test/+page.svelte` | 30m | E2E manual |
| 4 | Add timer component tests | `tests/components/common/Timer.test.ts` | 5m | RED (3 tests) |
| 5 | Implement Timer | `lib/components/common/Timer.svelte` | 10m | GREEN |
| 6 | Add nav link + home card | `Header.svelte`, `+page.svelte` | 5m | Visual |

#### TDD — Test Cases (10 tests)

```typescript
describe('generateMockTest', () => {
  it('generate exactly 30 questions for N5');
  it('include both vocab and grammar');
  it('no duplicates');
  it('shuffle randomly');
  it('handle N4 level');
  it('return empty for invalid level');
  it('each question has id, question, answer, options, type');
});
describe('calculateJLPTScore', () => {
  it('pass when total >= 80 and each section >= 19');
  it('fail when total < 80');
  it('fail when one section < 19 even if total >= 80');
});
```

#### Acceptance Criteria
- [ ] 30 random questions, no duplicates, mixed vocab+grammar
- [ ] Timer 30 min, auto-submit on expire
- [ ] Results: vocab score, grammar score, total, pass/fail
- [ ] N5 and N4 levels work
- [ ] Home page "JLPT Mock Test" card
- [ ] Tests: 10 new pass | Build pass

#### Wave 2 Checkpoint
```bash
./scripts/quality-audit.sh --save
# Verify: learning path locks/unlocks correctly
# Verify: mock test timer + scoring
```

---

## Wave 3: Kanji Core

### PR #4: Kanji stroke order (KanjiVG)

**Branch:** `feat/kanji-stroke-order` | **Est:** 6h

#### Brainstorm
- **Problem:** Nhai Kanji core = stroke order. Smart Quiz chỉ reference table
- **Solution:** KanjiVG SVGs (CC BY-SA 3.0, 6700+ kanji) + CSS stroke animation
- **Risks:** 256 SVGs ~5MB → lazy load per character. SVG format variation → parser needed
- **Edge cases:** Missing SVG → fallback message. Browser support stroke-dasharray → IE11+

#### Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | Download KanjiVG SVGs (256) | `static/kanjivg/` | 15m | `ls | wc -l` = 256 |
| 2 | Viết StrokeOrder tests | `tests/components/kanji/StrokeOrder.test.ts` | 10m | RED |
| 3 | Implement StrokeOrder | `lib/components/kanji/StrokeOrder.svelte` | 30m | GREEN |
| 4 | Integrate kanji reference page | `routes/kanji/[lesson]/reference/+page.svelte` | 15m | Visual |
| 5 | Integrate KanjiFlashCard back | `lib/components/kanji/KanjiFlashCard.svelte` | 10m | Visual |

#### TDD — Test Cases (9 tests)
```typescript
describe('StrokeOrder', () => {
  it('render SVG container');
  it('show stroke counter');
  it('Play/Pause button');
  it('speed control (0.5x, 1x, 2x)');
  it('Step forward/back');
  it('fallback when SVG not found');
  it('reset on character change');
  it('autoPlay prop');
  it('no autoplay when false');
});
```

#### Acceptance Criteria
- [ ] 256 SVGs in static/kanjivg/
- [ ] Smooth stroke animation (CSS stroke-dasharray)
- [ ] Controls: Play/Pause, Speed, Step
- [ ] Lazy load SVG per character
- [ ] Graceful fallback
- [ ] Tests: 9 new pass | Build pass | Bundle < +1MB

---

### PR #5: Kanji radicals (KRADFILE)

**Branch:** `feat/kanji-radicals` | **Est:** 5h

#### Brainstorm
- **Problem:** Nhai Kanji có "chiết tự trực quan". Smart Quiz không
- **Solution:** KRADFILE (public domain) kanji→radicals mapping. 214 bộ thủ with Hán Việt names
- **Risks:** KRADFILE chỉ list radicals, không visual positioning → simple list layout
- **Edge cases:** Simple kanji (一) = few radicals. Radical not in current 256 kanji

#### Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | Tạo radicals data + mapping | `lib/data/kanji/radicals.ts` | 30m | Data file exists |
| 2 | Viết radicals data tests | `tests/data/radicals.test.ts` | 10m | RED (7 tests) |
| 3 | Viết RadicalBreakdown tests | `tests/components/kanji/RadicalBreakdown.test.ts` | 5m | RED (4 tests) |
| 4 | Implement RadicalBreakdown | `lib/components/kanji/RadicalBreakdown.svelte` | 15m | GREEN |
| 5 | Integrate kanji reference | `routes/kanji/[lesson]/reference/+page.svelte` | 10m | Visual |
| 6 | Implement 214 radicals page | `routes/kanji/radicals/+page.svelte` | 20m | Visual + nav |

#### TDD — Test Cases (11 tests)
```typescript
describe('Radicals Data', () => {
  it('214 Kangxi radicals');
  it('each has character, meaningVi, meaningEn, strokeCount');
  it('getRadicals("会") returns radicals');
  it('getRadicals unknown = empty');
  it('getKanjiByRadical("人") returns kanji');
  it('getKanjiByRadical unknown = empty');
  it('all 256 kanji have >= 1 radical');
});
describe('RadicalBreakdown', () => {
  it('render kanji large');
  it('list radicals with Hán Việt');
  it('show "No data" for unknown');
  it('radicals are clickable');
});
```

#### Acceptance Criteria
- [ ] 214 radicals with character, meaningVi, meaningEn
- [ ] 256 kanji have radical mapping
- [ ] RadicalBreakdown in reference expanded card
- [ ] `/kanji/radicals` page with search/filter
- [ ] Click radical → kanji list
- [ ] Tests: 11 new pass | Build pass

#### Wave 3 Checkpoint
```bash
./scripts/quality-audit.sh --save
# Verify: stroke animation plays correctly
# Verify: radical breakdown shows for all kanji
```

---

## Wave 4: Bilingual Advantage

### PR #6: HSK quiz modes
**Branch:** `feat/hsk-quiz` | **Est:** 4h | **Tests:** 7

Reuse existing quiz components with HSK adapter. 3 modes × 3 directions. TTS `playChineseAudio()`.

### PR #7: HSK1-4 data
**Branch:** `feat/hsk-levels` | **Est:** 8h | **Tests:** 10

HSK1 ~150, HSK2 ~150, HSK3 ~300, HSK4 ~600 words. Code-split per level. Level selector on landing.

#### Wave 4 Checkpoint: Bilingual 10/10

---

## Wave 5: Kanji Mastery

### PR #10: Kanji handwriting (KanjiCanvas)
**Branch:** `feat/kanji-handwriting` | **Est:** 6h | **Tests:** 13

Canvas draw + recognition (MIT, client-side). Writing quiz mode. Lazy load pattern data.

### PR #11: N3→N1 kanji data (2500+)
**Branch:** `feat/kanji-n3-n1` | **Est:** 8h | **Tests:** 9

**Split into sub-PRs if needed:**
- #11a: N3 kanji (~370) + script generate từ KANJIDIC2
- #11b: N2 kanji (~370)
- #11c: N1 kanji (~600) + level selector UI

#### Wave 5 Checkpoint: Kanji 9/10

---

## Wave 6: User System

### PR #12: Supabase auth + cloud sync
**Branch:** `feat/supabase-auth` | **Est:** 8h | **Tests:** 12

Google OAuth. localStorage primary, cloud sync khi online. Migration on first login. RLS policies.

**Business doc required:** `documents/01-business/auth/rules.md` — auth rules, data ownership, sync strategy.

### PR #13: Leaderboard
**Branch:** `feat/leaderboard` | **Est:** 4h | **Tests:** 6 | **Depends:** PR #12

Opt-in public profile. Top 50, 3 categories. Cloud data = source of truth (anti-cheat).

#### Wave 6 Checkpoint: User 9/10

---

## Wave 7: Content Expansion

### PR #14: N3 vocab + grammar (Minna bài 26-50)
**Branch:** `feat/n3-content` | **Est:** 8h | **Tests:** 7

**Split into sub-PRs:**
- #14a: Bài 26-35 (10 lessons)
- #14b: Bài 36-45 (10 lessons)
- #14c: Bài 46-50 (5 lessons) + register course

### PR #15: N2 + N1 vocab
**Branch:** `feat/n2-n1-vocab` | **Est:** 12h | **Tests:** 8

**Split:** N2 and N1 as separate sub-PRs. Script-assisted from open data.

### PR #16: Advanced SRS
**Branch:** `feat/advanced-srs` | **Est:** 5h | **Tests:** 12

Learning steps (1m→10m→1d), leech detection (>8 fails), quality from response time, adaptive difficulty. Backward compatible with existing data.

#### Wave 7 Checkpoint: Content 9/10

---

## Wave 8: Premium & Community

### PR #17: Custom fonts
**Branch:** `feat/custom-fonts` | **Est:** 3h | **Tests:** 4

4 fonts (Noto, Zen Maru, UD Digi, Klee One). Unicode-range subsetting. User choice in Settings.

### PR #18: Premium tier
**Branch:** `feat/premium` | **Est:** 6h | **Tests:** 5

`isPremium(user)` gate. Free: N5 + HSK1-3 + basic quiz. Premium: N4-N1 + advanced features. Stripe placeholder.

**Business doc required:** `documents/01-business/premium/rules.md` — free vs premium matrix, pricing.

### PR #19: Community
**Branch:** `feat/community` | **Est:** 2h | **Tests:** 0

Discord + GitHub Discussions links. "Share progress" shareable card. Lightweight, no custom backend.

#### Wave 8 Checkpoint: Business 8/10, final audit

---

## Summary

| Metric | Value |
|--------|-------|
| **Total PRs** | 19 (+ sub-PRs for data) |
| **Total new tests** | ~164 |
| **Final test count** | 605 + 164 = ~769 |
| **Audit checkpoints** | 8 (1 per wave) |
| **Business docs required** | 2 (auth, premium) |
| **Target score** | 104/120 (vs Nhai Kanji 88/120) |

---

## Tracking

| Wave | PR | Name | Tests | Status |
|------|----|------|-------|--------|
| 1 | #1 | SEO meta tags | 9 | [ ] |
| 1 | #8 | Skeleton + branding | 6 | [ ] |
| 1 | #9 | Accessibility | 10 | [ ] |
| 2 | #2 | Learning path | 15 | [ ] |
| 2 | #3 | JLPT mock test | 10 | [ ] |
| 3 | #4 | Kanji stroke order | 9 | [ ] |
| 3 | #5 | Kanji radicals | 11 | [ ] |
| 4 | #6 | HSK quiz modes | 7 | [ ] |
| 4 | #7 | HSK1-4 data | 10 | [ ] |
| 5 | #10 | Kanji handwriting | 13 | [ ] |
| 5 | #11 | N3→N1 kanji | 9 | [ ] |
| 6 | #12 | Supabase auth | 12 | [ ] |
| 6 | #13 | Leaderboard | 6 | [ ] |
| 7 | #14 | N3 content | 7 | [ ] |
| 7 | #15 | N2-N1 vocab | 8 | [ ] |
| 7 | #16 | Advanced SRS | 12 | [ ] |
| 8 | #17 | Custom fonts | 4 | [ ] |
| 8 | #18 | Premium tier | 5 | [ ] |
| 8 | #19 | Community | 0 | [ ] |

---

## Deferred (v5.0+)

| Feature | Lý do |
|---------|-------|
| Stroke order validation (draw + check) | ML complexity |
| N1 grammar full (Shin Kanzen Master) | Data entry cực lớn |
| Listening comprehension | Cần recorded audio |
| Reading comprehension | Cần curated passages |
| Mobile native app | Khác stack |
| AI explanations | API budget |
