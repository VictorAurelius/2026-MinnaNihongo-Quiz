# Feature Development Checklist - Smart Quiz

## 📋 Overview

Checklists chi tiết cho các loại feature và tasks phổ biến trong Smart Quiz. Copy checklist tương ứng khi bắt đầu feature mới.

---

## 📚 Table of Contents

1. [Adding New Lesson Data](#1-adding-new-lesson-data)
2. [Adding New Quiz Mode](#2-adding-new-quiz-mode)
3. [Modifying Existing Component](#3-modifying-existing-component)
4. [Adding Grammar Patterns](#4-adding-grammar-patterns)
5. [UI/UX Enhancement](#5-uiux-enhancement)
6. [Performance Optimization](#6-performance-optimization)
7. [Bug Fix](#7-bug-fix)
8. [Adding HSK Content](#8-adding-hsk-content)
9. [PWA Feature](#9-pwa-feature)
10. [Accessibility Improvement](#10-accessibility-improvement)

---

## 1. Adding New Lesson Data

**Use case:** Thêm bài học JLPT mới (lesson-26.ts, lesson-27.ts, etc.)

### Planning Phase

- [ ] Gather source material (textbook, vocabulary list)
- [ ] Prepare audio files (if available)
- [ ] Check lesson number sequence (no gaps)
- [ ] Verify JLPT level (N5/N4/N3)

### Implementation

- [ ] Copy template from existing lesson (e.g., `lesson-01.ts`)
- [ ] Update `lessonNumber` field
- [ ] Update `title` field (Japanese title)
- [ ] Add vocabulary items (minimum 5)
  - [ ] All required fields: japanese, vietnamese, english, romaji
  - [ ] Validate romaji (Hepburn romanization)
  - [ ] Add audio file paths (if available)
  - [ ] Add kanji field (if applicable)
  - [ ] Add example sentences (optional, recommended for N3+)
- [ ] Add grammar patterns (if lesson has grammar)
  - [ ] Pattern notation (use ～)
  - [ ] Vietnamese explanation
  - [ ] English explanation
  - [ ] Examples (2-3 per pattern)
- [ ] Update index file: `src/lib/data/minna/lessons/index.ts`
  ```typescript
  export { LESSON_26_DATA } from './lesson-26';
  ```

### Validation

- [ ] Run validation script: `npm run validate:data`
- [ ] Check for duplicate vocabulary
- [ ] Verify all required fields present
- [ ] Check romaji accuracy (no uppercase, correct Hepburn)
- [ ] Verify audio files exist (if specified)
- [ ] Test data loads in app

### Testing

- [ ] Load lesson in lesson list (home screen)
- [ ] Test flashcard mode with new lesson
- [ ] Test multiple choice mode
- [ ] Test typing mode (with virtual keyboard)
- [ ] Verify audio playback (if present)
- [ ] Check example sentences display correctly

### Documentation

- [ ] Add entry to CHANGELOG.md
- [ ] Update lesson count in README.md (if milestone)
- [ ] Document any special notes (e.g., cultural context)

### Commit

```bash
git add src/lib/data/minna/lessons/lesson-26.ts
git add src/lib/data/minna/lessons/index.ts
git commit -m "feat(data): add lesson 26 - [lesson title]

- Add X vocabulary items
- Add Y grammar patterns
- Include audio files for all vocab"
```

---

## 2. Adding New Quiz Mode

**Use case:** Tạo quiz mode mới (e.g., listening comprehension, sentence building)

### Planning Phase

- [ ] Define mode mechanics (how does it work?)
- [ ] Identify data requirements (what data needed?)
- [ ] Design UI mockup (sketch/wireframe)
- [ ] List keyboard shortcuts needed
- [ ] Plan scoring system
- [ ] Consider mobile UX

### Implementation - Component

- [ ] Create component: `src/lib/components/quiz/YourMode.svelte`
  ```svelte
  <script lang="ts">
    import type { VocabItem } from '$lib/types/lesson';

    export let item: VocabItem;
    export let onAnswer: (correct: boolean) => void;

    // Component logic
  </script>

  <!-- Template -->

  <style>
    /* Scoped styles */
  </style>
  ```
- [ ] Implement core quiz logic
  - [ ] Display question
  - [ ] Handle user input
  - [ ] Check answer
  - [ ] Show feedback
  - [ ] Emit events
- [ ] Add keyboard shortcuts
  - [ ] Document shortcuts in component
  - [ ] Test all shortcuts work
- [ ] Add mobile touch support
- [ ] Add loading states
- [ ] Add error states

### Implementation - Route

- [ ] Create route: `src/routes/quiz/your-mode/+page.svelte`
- [ ] Implement page logic:
  - [ ] Load lesson data
  - [ ] Initialize quiz store
  - [ ] Shuffle questions
  - [ ] Track progress
  - [ ] Navigate to results
- [ ] Add back button (use history.back())
- [ ] Add progress indicator
- [ ] Handle edge cases (no data, empty lesson)

### Implementation - Store

- [ ] Update `src/lib/stores/quiz.ts`
  - [ ] Add mode to QuizMode type
  - [ ] Add mode-specific state (if needed)
  - [ ] Add mode-specific actions (if needed)
- [ ] Test store updates reactively

### Implementation - Navigation

- [ ] Add mode to lesson menu: `src/routes/lesson/[id]/+page.svelte`
  ```svelte
  <button on:click={() => goto(`/quiz/your-mode?lesson=${id}`)}>
    Your Mode Name
  </button>
  ```
- [ ] Add icon/emoji for visual distinction
- [ ] Test navigation from lesson menu
- [ ] Test deep linking: `/quiz/your-mode?lesson=5`

### Styling

- [ ] Match app design system (colors, spacing, typography)
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Dark mode support
- [ ] Animations (entrance, exit, feedback)
- [ ] Accessibility (focus states, hover states)

### Testing

- [ ] Unit tests for quiz logic
  ```typescript
  // tests/components/YourMode.test.ts
  import { render, fireEvent } from '@testing-library/svelte';
  import YourMode from '$lib/components/quiz/YourMode.svelte';

  test('shows correct feedback on right answer', async () => {
    // Test implementation
  });
  ```
- [ ] Test with different lesson types (N5, N4, N3)
- [ ] Test with small dataset (5 items)
- [ ] Test with large dataset (50+ items)
- [ ] Test keyboard shortcuts
- [ ] Test on mobile device
- [ ] Test offline mode
- [ ] Test with screen reader (basic)

### Documentation

- [ ] Add to README.md feature list
- [ ] Document keyboard shortcuts in component
- [ ] Add to user guide (if exists)
- [ ] Add entry to CHANGELOG.md

### Performance Check

- [ ] No unnecessary re-renders
- [ ] Lazy load if component is large
- [ ] Check bundle size impact: `npm run build`
- [ ] Lighthouse audit (maintain 95+ score)

### Commit

```bash
git add src/lib/components/quiz/YourMode.svelte
git add src/routes/quiz/your-mode/
git add src/lib/stores/quiz.ts
git commit -m "feat(quiz): add new quiz mode - [mode name]

- Implement [mode] component with keyboard support
- Add route and navigation
- Update quiz store
- Add tests
- Maintains bundle size target"
```

---

## 3. Modifying Existing Component

**Use case:** Sửa đổi component hiện có (bug fix, enhancement, refactor)

### Planning Phase

- [ ] Identify component location
- [ ] Read component code thoroughly
- [ ] Understand current behavior
- [ ] List dependencies (stores, utils, types)
- [ ] Plan changes (what to modify, what to preserve)

### Before Modification

- [ ] **READ THE FILE FIRST** - Use Read tool
- [ ] Check if component has tests
- [ ] Run existing tests: `npm run test`
- [ ] Take note of current behavior
- [ ] Check usages (where is component used?)
  ```bash
  # Find component usage
  npm run grep "YourComponent"
  ```

### Implementation

- [ ] Make changes incrementally (one thing at a time)
- [ ] Preserve existing functionality (unless removing intentionally)
- [ ] Update TypeScript types if needed
- [ ] Update props interface if needed
- [ ] Update events if needed
- [ ] Test after each change

### Testing

- [ ] Update existing tests to match new behavior
- [ ] Add new tests for new functionality
- [ ] Run full test suite: `npm run test`
- [ ] Manual testing in browser
- [ ] Test in all contexts where component is used
- [ ] Test edge cases
- [ ] Test on mobile

### Documentation

- [ ] Update component comments (if public API changed)
- [ ] Update prop descriptions
- [ ] Update CHANGELOG.md (if user-facing change)

### Regression Check

- [ ] Test all screens that use the component
- [ ] Check nothing broke
- [ ] Verify bundle size: `npm run build`

### Commit

```bash
git add src/lib/components/[component-path]
git commit -m "refactor(component): improve [component name]

- [Change 1]
- [Change 2]
- Update tests
- No breaking changes"
```

---

## 4. Adding Grammar Patterns

**Use case:** Thêm grammar patterns vào grammar reference

### Planning Phase

- [ ] Gather grammar information
  - [ ] Pattern notation (～は, ～を, etc.)
  - [ ] Vietnamese explanation
  - [ ] English explanation
  - [ ] Example sentences (2-5)
  - [ ] Related patterns
  - [ ] JLPT level
  - [ ] Common mistakes (if applicable)

### Implementation - Data

- [ ] Add to metadata: `src/lib/data/minna/grammar/metadata.ts`
  ```typescript
  "～pattern": {
    categories: ["category1", "category2"],
    functions: ["function1"],
    jlptLevel: "N5",
    difficulty: "beginner",
    relatedPatterns: ["～related1", "～related2"],
    tips: "Mẹo sử dụng",
    mnemonics: "Cách ghi nhớ",
    commonMistakes: "Lỗi thường gặp",
    usageNotes: "Ghi chú sử dụng"
  }
  ```
- [ ] Add examples to lesson data (if belongs to specific lesson)
- [ ] Add to comparisons (if comparing with similar patterns)
  ```typescript
  // src/lib/data/minna/grammar/comparisons.ts
  {
    title: "Pattern A vs Pattern B",
    description: "So sánh [...]",
    patterns: [...]
  }
  ```

### Validation

- [ ] Pattern format correct (uses ～)
- [ ] All required fields present
- [ ] Examples are grammatically correct
- [ ] Categories valid (check existing categories)
- [ ] Functions valid (check existing functions)
- [ ] JLPT level accurate

### Testing

- [ ] Load grammar reference screen
- [ ] Search for new pattern
- [ ] Filter by category (should appear)
- [ ] Filter by function (should appear)
- [ ] Filter by JLPT level (should appear)
- [ ] Click pattern to see detail modal
- [ ] Verify all fields display correctly
- [ ] Check related patterns links work

### Documentation

- [ ] Add entry to CHANGELOG.md
- [ ] Update grammar pattern count (if milestone)

### Commit

```bash
git add src/lib/data/minna/grammar/
git commit -m "feat(grammar): add pattern [pattern notation]

- Add pattern metadata
- Add N examples
- Add to [category] category
- Add comparison with [related pattern]"
```

---

## 5. UI/UX Enhancement

**Use case:** Cải thiện giao diện hoặc trải nghiệm người dùng

### Planning Phase

- [ ] Identify pain point (user feedback, analytics, observation)
- [ ] Define improvement goal (what should improve?)
- [ ] Design solution (mockup, sketch)
- [ ] Consider mobile + desktop
- [ ] Check accessibility impact

### Implementation

- [ ] Implement UI changes
  - [ ] HTML structure changes
  - [ ] CSS styling changes
  - [ ] JavaScript interaction changes
- [ ] Test responsiveness (mobile, tablet, desktop)
- [ ] Test dark mode (if applicable)
- [ ] Add animations (if enhances UX)
  - [ ] Keep animations subtle (<300ms)
  - [ ] Use `prefers-reduced-motion` media query
- [ ] Test with keyboard navigation
- [ ] Test with screen reader (basic check)

### Visual Testing

- [ ] Test on different screen sizes
  - [ ] Mobile (320px, 375px, 414px)
  - [ ] Tablet (768px, 1024px)
  - [ ] Desktop (1280px, 1920px)
- [ ] Test on different browsers
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari (if available)
- [ ] Take screenshots (before/after)

### Performance Check

- [ ] No layout shifts (CLS)
- [ ] Smooth animations (60fps)
- [ ] No jank on scroll
- [ ] Lighthouse score maintained

### Accessibility Check

- [ ] Color contrast ratio ≥4.5:1 (WCAG AA)
- [ ] Focus visible on interactive elements
- [ ] Keyboard navigation works
- [ ] Screen reader announces changes (if applicable)
- [ ] Touch targets ≥44x44px (mobile)

### Documentation

- [ ] Update screenshots in README (if major change)
- [ ] Add entry to CHANGELOG.md
- [ ] Document design decisions (if non-obvious)

### Commit

```bash
git add [modified-files]
git commit -m "feat(ui): improve [component/screen] UX

- [Change 1]
- [Change 2]
- Maintains accessibility
- Responsive on all screen sizes"
```

---

## 6. Performance Optimization

**Use case:** Tối ưu hiệu suất app (bundle size, load time, runtime)

### Analysis Phase

- [ ] Run Lighthouse audit (before)
  ```bash
  npm run build
  npm run preview
  # Open Chrome DevTools → Lighthouse → Generate report
  ```
- [ ] Analyze bundle size
  ```bash
  npm run build
  # Check dist/ folder size
  ```
- [ ] Identify bottlenecks
  - [ ] Chrome DevTools → Performance tab
  - [ ] Record user interaction
  - [ ] Analyze flame graph
- [ ] Set improvement targets (specific metrics)

### Bundle Size Optimization

- [ ] Check for duplicate dependencies
  ```bash
  npm ls [package-name]
  ```
- [ ] Remove unused dependencies
  ```bash
  npm uninstall [package-name]
  ```
- [ ] Update `vite.config.ts` manualChunks
  ```typescript
  manualChunks: (id) => {
    if (id.includes('heavy-library')) {
      return 'heavy-library-chunk';
    }
  }
  ```
- [ ] Lazy load heavy components
  ```svelte
  <script>
    import { browser } from '$app/environment';

    let HeavyComponent;
    if (browser) {
      import('./HeavyComponent.svelte').then(m => {
        HeavyComponent = m.default;
      });
    }
  </script>
  ```
- [ ] Optimize images (compress, use WebP, lazy load)
- [ ] Remove console.log (terser already does this)

### Runtime Optimization

- [ ] Reduce unnecessary re-renders
  - [ ] Use `const` for static data
  - [ ] Use derived stores instead of computed in template
  - [ ] Debounce expensive operations
- [ ] Optimize event listeners
  - [ ] Use event delegation where possible
  - [ ] Clean up listeners on unmount
- [ ] Optimize animations
  - [ ] Use CSS transforms (not top/left)
  - [ ] Use `will-change` sparingly
- [ ] Lazy load data
  - [ ] Load lesson data on demand
  - [ ] Don't load all lessons at once

### Verification

- [ ] Run Lighthouse audit (after)
- [ ] Compare metrics:
  - [ ] Bundle size (target: <350 KB)
  - [ ] First Contentful Paint (target: <1.5s)
  - [ ] Time to Interactive (target: <3.5s)
  - [ ] Lighthouse score (target: ≥95)
- [ ] Test on slow 3G network (Chrome DevTools)
- [ ] Test on low-end device (if available)

### Documentation

- [ ] Document optimization in OPTIMIZATION.md
- [ ] Add before/after metrics
- [ ] Add entry to CHANGELOG.md

### Commit

```bash
git add [modified-files]
git commit -m "perf: optimize [specific area]

- Reduce bundle size by X KB (Y%)
- Improve FCP by Z ms
- Lazy load [components]
- Lighthouse score: [before] → [after]"
```

---

## 7. Bug Fix

**Use case:** Sửa bug được report hoặc phát hiện

### Investigation Phase

- [ ] Reproduce bug reliably
  - [ ] Note exact steps to reproduce
  - [ ] Note environment (browser, OS, device)
  - [ ] Note expected vs actual behavior
- [ ] Identify root cause
  - [ ] Add console.logs
  - [ ] Use debugger
  - [ ] Check error messages
  - [ ] Check recent changes (git log)
- [ ] Assess impact (how many users affected?)

### Testing Phase (TDD Approach)

- [ ] Write failing test that reproduces bug
  ```typescript
  test('bug: [description]', () => {
    // Test that currently fails
    expect(buggyFunction()).toBe(expectedResult);
  });
  ```
- [ ] Verify test fails (red)

### Implementation

- [ ] Fix the bug (minimal change)
- [ ] Verify test passes (green)
- [ ] Refactor if needed (but keep test passing)
- [ ] Check for similar bugs elsewhere

### Regression Testing

- [ ] Run full test suite: `npm run test`
- [ ] Test related functionality
- [ ] Test on multiple browsers (if relevant)
- [ ] Test on mobile (if relevant)

### Documentation

- [ ] Add entry to CHANGELOG.md
- [ ] Update documentation if bug was due to unclear docs
- [ ] Add comment in code explaining fix (if non-obvious)

### Commit

```bash
git add [modified-files]
git commit -m "fix([scope]): [brief description]

- Root cause: [explanation]
- Fix: [what was changed]
- Adds test to prevent regression
- Closes #[issue-number]"
```

---

## 8. Adding HSK Content

**Use case:** Thêm nội dung HSK (Chinese vocabulary)

### Planning Phase

- [ ] Determine HSK level (1-6)
- [ ] Gather vocabulary list
- [ ] Prepare audio files (if available)
- [ ] Check group number sequence

### Implementation

- [ ] Create HSK data file: `src/lib/data/hsk/hsk[level]/group-[number].ts`
- [ ] Add vocabulary items (minimum 10)
  - [ ] All required fields: simplified, pinyin, vietnamese, english
  - [ ] Add traditional characters (if different)
  - [ ] Add audio file paths (if available)
  - [ ] Add type field (noun, verb, etc.)
- [ ] Update index file: `src/lib/data/hsk/hsk[level]/index.ts`

### Validation

- [ ] Run validation script: `npm run validate:data`
- [ ] Check pinyin accuracy (tone marks correct)
- [ ] Verify simplified vs traditional (no duplicates)
- [ ] Verify audio files exist (if specified)
- [ ] Check for duplicate vocabulary

### Testing

- [ ] Load HSK screen
- [ ] Select level and group
- [ ] Test flashcard mode
- [ ] Test multiple choice mode
- [ ] Test typing mode (pinyin input)
- [ ] Verify audio playback (Chinese pronunciation)
- [ ] Check character display (no encoding issues)

### Documentation

- [ ] Add entry to CHANGELOG.md
- [ ] Update HSK content count in README.md

### Commit

```bash
git add src/lib/data/hsk/
git commit -m "feat(hsk): add HSK level [N] group [M]

- Add X vocabulary items
- Include audio files for all vocab
- Traditional characters included"
```

---

## 9. PWA Feature

**Use case:** Thêm hoặc cải thiện PWA functionality

### Planning Phase

- [ ] Define PWA feature (offline, install prompt, notifications, etc.)
- [ ] Check browser support
- [ ] Plan fallback for unsupported browsers

### Implementation

- [ ] Update service worker: `static/service-worker.js`
  - [ ] Add caching strategies
  - [ ] Handle offline scenarios
  - [ ] Update cache version
- [ ] Update manifest: `static/manifest.json`
  - [ ] Add shortcuts (if applicable)
  - [ ] Update icons (if applicable)
- [ ] Update PWA utils: `src/lib/utils/pwa.ts`
  - [ ] Add feature detection
  - [ ] Add feature implementation
  - [ ] Handle errors gracefully

### Testing

- [ ] Test in online mode
- [ ] Test in offline mode (Chrome DevTools → Network → Offline)
- [ ] Test install prompt (Chrome, Edge)
- [ ] Test as installed app
- [ ] Test on mobile device (actual device, not emulator)
- [ ] Test service worker updates
  ```bash
  # Make change to service worker
  # Reload page
  # Check new service worker installs
  ```

### PWA Audit

- [ ] Run Lighthouse PWA audit
- [ ] Check all PWA criteria pass:
  - [ ] Installable
  - [ ] Works offline
  - [ ] Uses HTTPS
  - [ ] Has manifest
  - [ ] Has service worker

### Documentation

- [ ] Update PWA documentation
- [ ] Add entry to CHANGELOG.md
- [ ] Document any user-facing changes

### Commit

```bash
git add static/service-worker.js static/manifest.json src/lib/utils/pwa.ts
git commit -m "feat(pwa): [PWA feature description]

- [Change 1]
- [Change 2]
- Maintains offline functionality
- PWA audit: passing"
```

---

## 10. Accessibility Improvement

**Use case:** Cải thiện khả năng tiếp cận (a11y)

### Audit Phase

- [ ] Run Lighthouse accessibility audit
- [ ] Use axe DevTools extension
- [ ] Test with keyboard only (no mouse)
- [ ] Test with screen reader (NVDA, VoiceOver, or JAWS)

### Common Issues to Check

- [ ] Color contrast (WCAG AA: ≥4.5:1)
  ```css
  /* Check with Chrome DevTools → CSS Overview */
  ```
- [ ] Focus indicators visible
  ```css
  button:focus {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
  ```
- [ ] Semantic HTML
  ```html
  <!-- Use proper heading hierarchy -->
  <h1>Main title</h1>
  <h2>Section title</h2>

  <!-- Use button for actions -->
  <button on:click={action}>Action</button>

  <!-- Not div -->
  <div on:click={action}>Action</div> ❌
  ```
- [ ] ARIA labels where needed
  ```svelte
  <button aria-label="Close modal">
    <span aria-hidden="true">×</span>
  </button>

  <div role="alert" aria-live="polite">
    {message}
  </div>
  ```
- [ ] Keyboard navigation
  ```svelte
  <div
    role="button"
    tabindex="0"
    on:click={action}
    on:keydown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        action();
      }
    }}
  >
    Action
  </div>
  ```
- [ ] Skip links (for main navigation)
  ```svelte
  <a href="#main-content" class="skip-link">
    Skip to main content
  </a>
  ```

### Implementation

- [ ] Fix contrast issues (lighten/darken colors)
- [ ] Add/fix focus indicators
- [ ] Add ARIA labels where needed
- [ ] Fix heading hierarchy
- [ ] Add keyboard support where missing
- [ ] Test with assistive technologies

### Keyboard Navigation Testing

Test all interactive elements with:
- [ ] Tab (forward navigation)
- [ ] Shift+Tab (backward navigation)
- [ ] Enter (activate buttons/links)
- [ ] Space (activate buttons, checkboxes)
- [ ] Arrow keys (custom controls like virtual keyboard)
- [ ] Escape (close modals)

### Screen Reader Testing

- [ ] Install screen reader (NVDA on Windows, VoiceOver on Mac)
- [ ] Navigate through app
- [ ] Verify announcements make sense
- [ ] Check if all content is accessible
- [ ] Test form labels and error messages

### Documentation

- [ ] Document accessibility features in README
- [ ] Add entry to CHANGELOG.md
- [ ] Document keyboard shortcuts

### Commit

```bash
git add [modified-files]
git commit -m "a11y: improve accessibility for [component/screen]

- Fix color contrast issues
- Add ARIA labels
- Improve keyboard navigation
- Screen reader tested
- Lighthouse a11y score: [before] → [after]"
```

---

## 🎯 General Checklist (All Features)

Use this checklist for **every** feature/change:

### Before Starting

- [ ] Read relevant documentation (DEVELOPMENT.md, VALIDATION.md)
- [ ] Check if similar feature exists
- [ ] Read existing code (use Read tool)
- [ ] Plan approach (don't jump into coding)

### During Development

- [ ] Make small, incremental changes
- [ ] Test frequently (after each change)
- [ ] Commit frequently (working checkpoints)
- [ ] Follow TypeScript strict mode (no `any`)
- [ ] Follow naming conventions (camelCase, PascalCase)

### Before Committing

- [ ] Run all tests: `npm run test`
- [ ] TypeScript compiles: `npm run check`
- [ ] Build succeeds: `npm run build`
- [ ] No console errors in browser
- [ ] Code formatted (Prettier)
- [ ] No leftover console.log() or debugger
- [ ] Reviewed own changes (git diff)

### After Committing

- [ ] Push to remote
- [ ] Check CI/CD passes (GitHub Actions)
- [ ] Update task tracking (if applicable)
- [ ] Notify team (if applicable)

---

## 📞 Need Help?

### When stuck:

1. **Check checklists above** - Maybe you missed a step
2. **Read existing code** - Similar features already implemented
3. **Check documentation** - DEVELOPMENT.md, VALIDATION.md, TESTING.md
4. **Search issues** - GitHub Issues might have solution
5. **Ask Claude Code** - Provide context, what you tried, error messages

### Common Questions

**Q: Which checklist should I use?**
A: Match your task to the checklist title, or use multiple if needed

**Q: Do I need to follow every item?**
A: Yes for critical items (testing, validation), optional items marked "(optional)"

**Q: Can I skip testing?**
A: No - testing prevents bugs and makes maintenance easier

**Q: Can I commit without running checks?**
A: No - always run test + check + build before committing

---

**Last updated:** 2026-03-18
**Maintainer:** Development Team
