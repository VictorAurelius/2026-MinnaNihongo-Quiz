# Smart Quiz UI/UX Redesign — Wave Plan 2026

> **Status:** Waves 0–2 complete — application shell verified  
> **Default branch:** `v4-dev`  
> **Visual direction:** Direction C + A — *Immersive Language Desk* structure with *Focused Editorial* restraint  
> **Scope:** Production-ready redesign of all 36 page routes and shared UI components  
> **Priority:** Reduce technical debt before redesigning product surfaces

## 1. Design Brief

### Feature summary

This program redesigns the complete Smart Quiz experience for Vietnamese learners of Japanese and Chinese. It replaces the current mixture of legacy CSS, partial Tailwind migration, duplicate components, and inconsistent page patterns with one coherent, content-first workspace.

The visual change is intentionally substantial. Smart Quiz should feel like an immersive language desk: persistent learning context, language content as the visual hero, and tools arranged around the current task. The system retains editorial restraint so density remains calm rather than dashboard-like.

### Primary user action

At every point, the learner should immediately understand **what to study next** and be able to begin or continue that action without navigating through decorative or administrative UI.

### Design direction

- **Register:** Product UI.
- **Color strategy:** Restrained by default. Study Violet marks primary actions, focus, selection, and progress. Semantic colors communicate outcomes only.
- **Scene sentence:** A learner studies for 10–30 minutes on a phone while commuting or at a quiet desk; the interface must remain calm in mixed ambient light and keep the current language content unmistakably prominent.
- **Anchors:** Figma workspace clarity, Linear interaction polish, Anki focus, and Japanese calligraphy desk hierarchy.
- **Winning probe:** Direction C supplies the split-workspace topology, persistent course context, and immersive content tools. Direction A supplies whitespace, typography discipline, and controlled color.
- **Anti-goals:** No purple-to-blue gradients, glowing dark UI, glassmorphism, nested card grids, decorative icon tiles, or entertainment-first gamification.

### Scope

- **Fidelity:** Production-ready.
- **Breadth:** Entire application: 36 routes, application shell, common components, quiz modes, content tools, settings, analytics, marketing/supporting pages, and all responsive states.
- **Interactivity:** Shipped-quality Svelte components with keyboard, touch, screen-reader, offline, dark-mode, and reduced-motion behavior.
- **Time intent:** Wave-based delivery; each wave is independently testable and releasable to `v4-dev`.

### Layout strategy

- Desktop uses an application shell with persistent course context where it improves task continuity. Content-heavy study tools may use two or three functional panes; simple pages stay single-column.
- Mobile collapses context into a compact header or bottom navigation and preserves one dominant study action. Desktop panes become sequential sections, sheets, or inline disclosure—not miniature columns.
- Japanese/Chinese text owns the largest type tier. Translation, metadata, hints, and progress remain subordinate.
- Cards are used only for real grouping or interaction. Dividers, whitespace, and tonal layers handle ordinary structure.

### Required states

Every page-level flow must explicitly cover:

1. Ready/success.
2. Loading or local hydration.
3. Empty/first-use.
4. Recoverable error.
5. Offline/degraded enhancement.
6. Disabled/locked where applicable.
7. Long content and smallest supported viewport.
8. Dark mode and reduced motion.

### Interaction model

- Familiar controls, consistent focus rings, 44×44 px touch targets, and immediate feedback.
- Quiz shortcuts remain unchanged: F1, Space/Enter, and 1–4.
- State transitions use 150–250 ms ease-out and communicate state rather than decorate page load.
- Core learning actions remain offline-first; network enhancements never block study.
- Modals are reserved for interruption or confirmation. Prefer inline disclosure, side panels, and dedicated pages.

### Content requirements

- Vietnamese is the primary UI language; Japanese and Chinese learning content remains verbatim.
- Labels must be short, consistent, and task-oriented.
- Error text explains recovery. Empty states teach the next action.
- Dynamic layouts must tolerate long Vietnamese/English translations, furigana/kana, pinyin, and large CJK glyphs.

## 2. Program Principles

1. Foundation precedes visual page work.
2. One component and one token source for each UI role.
3. Preserve learning behavior while changing presentation.
4. Mobile and keyboard behavior are acceptance criteria, not final polish.
5. Baselines may only improve: tests, accessibility, performance, and Impeccable findings cannot regress.
6. Each PR changes one layer or one coherent user journey.
7. No broad “big-bang” replacement branch.

## 3. Wave Map

| Wave | Name | Primary outcome | Depends on |
|---|---|---|---|
| 0 | Baseline & Contract | Trusted visual, behavioral, and performance baselines | — |
| 1 | Design-System Foundation | One token, primitive, icon, state, and motion system | 0 |
| 2 | Application Shell | New responsive navigation and persistent study context | 1 |
| 3 | Core Quiz Experience | Unified flashcard, choice, typing, results, and feedback UX | 2 |
| 4 | Learning & Content Workspace | Course, lesson, vocabulary, grammar, HSK and alphabet surfaces | 3 |
| 5 | Kanji Immersive Desk | Reference, radicals, stroke order, handwriting and kanji quizzes | 3–4 |
| 6 | Review, Exams & Progress | Review/SRS, mock tests, exams, stats and settings | 3–4 |
| 7 | Supporting Surfaces | Home, premium, about, conversations, counters and edge pages | 2–6 |
| 8 | Hardening & Release | Full accessibility, performance, visual regression and rollout | 3–7 |

## 4. Wave Details

### Wave 0 — Baseline & Contract

**Purpose:** Prevent a redesign from silently changing learning behavior or reducing quality.

#### PR 0.1 — Route and interaction inventory

- Map all 36 page routes to user journeys, page states, keyboard shortcuts, data sources, and offline behavior.
- Mark duplicate/legacy routes and decide whether they remain, redirect, or consolidate.
- Identify the canonical page for each course, lesson, vocabulary, grammar, kanji, quiz, review, and result flow.
- **Status:** Complete — see [`ui-ux/ROUTE_INTERACTION_INVENTORY.md`](ui-ux/ROUTE_INTERACTION_INVENTORY.md).

#### PR 0.2 — Visual and UX baseline

- Capture representative mobile and desktop screenshots for light/dark themes.
- Establish Playwright journeys for navigation, quiz completion, review, TTS, settings persistence, and offline startup.
- Record Lighthouse or equivalent baseline for home, lesson, quiz, vocabulary, and kanji reference.
- **Status:** Complete — see [`../../04-quality/ui-ux-wave-0-baseline.md`](../../04-quality/ui-ux-wave-0-baseline.md).

#### PR 0.3 — Redesign contracts

- Refresh `DESIGN.md` and `.impeccable/design.json` for the C+A direction.
- Define route-level loading/error/empty/offline contracts.
- Convert the current Impeccable baseline into categorized debt targets rather than a permanent waiver.
- **Status:** Complete — `DESIGN.md`, `.impeccable/design.json`, categorized debt ownership, and [`ui-ux/PAGE_STATE_CONTRACT.md`](ui-ux/PAGE_STATE_CONTRACT.md) updated.

**Exit gate:** Complete on 2026-07-02. Route inventory, protected canonical journeys, baseline screenshots/metrics, compatibility ownership, known offline/settings gaps, and redesign contracts are documented with named wave owners. The full local suite passed 973 tests, the saved quality audit scored 97/100 (A+), and the latest 10 CI runs on `main` passed.

---

### Wave 1 — Design-System Foundation

**Purpose:** Remove the technical debt that would otherwise multiply across every redesigned screen.

#### PR 1.1 — Tokens and theme

- Make Tailwind v4 theme tokens the sole visual source of truth.
- Define light/dark semantic ramps, CJK typography roles, spacing, radii, elevation, z-index, motion, and focus tokens.
- Remove literal fallback colors and undocumented radius values from active primitives.
- Align PWA theme colors and Canvas drawing colors with CSS tokens.
- **Status:** Complete — semantic light/dark, CJK, spacing, radius, elevation, z-index, motion, focus, PWA, and Canvas tokens share one source.

#### PR 1.2 — Primitive consolidation

- Consolidate duplicate Button, Card, Progress, Skeleton, Modal/Dialog, Toast, and page-state implementations.
- Adopt shadcn-svelte/Bits UI behavior while preserving project APIs only when they add real product value.
- Add missing Input, Select, Tabs, Sheet, Tooltip, Switch, Dialog, AlertDialog, Table, and navigation primitives only as needed.
- **Status:** Complete — active roles use one canonical implementation; Input, Select, Switch, Dialog, AlertDialog, and IconButton were added for current consumers.

#### PR 1.3 — Interaction and icon system

- Standardize Lucide icons, sizes, stroke weight, accessible labels, and icon-button hit areas.
- Define component states: default, hover, focus, active, selected, disabled, loading, error.
- Replace layout-property animation and decorative page entrances with state-driven motion.
- **Status:** Complete — fixed Lucide scale/stroke contract, labeled 44 px icon controls, transform-based progress, and no decorative entrance keyframes.

#### PR 1.4 — Legacy CSS retirement

- Remove `.btn`, legacy card/modal systems, obsolete CSS aliases, side-tab accents, dead selectors, and duplicate keyframes.
- Reduce `app.css` to tokens, reset, accessibility foundations, and genuinely global patterns.
- **Status:** Complete — duplicate common primitives, legacy `.btn`, aliases, side-tabs, layout transitions, and duplicate keyframes removed.

**Exit gate:** Complete on 2026-07-02. One component per active role, one semantic theme system, Impeccable at 0 findings/0 warnings, 894 tests passing, type-check at 0 errors/0 warnings, production build passing, and runtime review completed at 390 px and 1280 px in light/dark modes. See [`../../04-quality/ui-ux-wave-1-foundation.md`](../../04-quality/ui-ux-wave-1-foundation.md).

---

### Wave 2 — Application Shell

**Purpose:** Establish the information architecture every later surface will inherit.

#### PR 2.1 — Desktop shell

- Replace the current header-only model with a responsive application shell.
- Provide persistent course context, primary learning navigation, review count, progress summary, offline status, and settings access.
- Keep navigation quiet and allow focused quiz/exam mode to reduce chrome.
- **Status:** Complete — persistent dark rail, active learning navigation, course progress, review count, connection state, settings, and reduced focus chrome shipped in the root layout.

#### PR 2.2 — Mobile shell

- Define compact top bar and bottom navigation or contextual action bar.
- Ensure safe-area support, one-handed access, scroll restoration, and no content obstruction.
- Preserve SvelteKit base-path-safe navigation.
- **Status:** Complete — compact top bar and safe-area-aware four-destination bottom navigation work without horizontal overflow at 320 px; focused routes remove the bottom bar.

#### PR 2.3 — Navigation UX

- Standardize breadcrumbs, back behavior, active states, page titles, and route transitions.
- Add skip link, focus restoration, route announcements, and predictable browser history behavior.
- **Status:** Complete — centralized route metadata now owns titles, shell modes, active sections and breadcrumbs; skip navigation, live announcements, SvelteKit route-focus restoration and native anchor history are active globally.

**Exit gate:** Complete on 2026-07-03. All routes inherit workspace or focus chrome from the root layout; desktop and 320 px navigation, base-safe links, keyboard focus restoration, route announcements, safe-area spacing, no-overflow behavior, and reactive online/offline status are covered. See [`../../04-quality/ui-ux-wave-2-application-shell.md`](../../04-quality/ui-ux-wave-2-application-shell.md).

---

### Wave 3 — Core Quiz Experience

**Purpose:** Redesign the highest-frequency learning loop before secondary pages.

#### PR 3.1 — Quiz frame and progress

- Create one shared quiz frame for vocabulary, HSK, kanji, grammar, and radical modes.
- Standardize prompt hierarchy, direction labels, progress, exit confirmation, TTS, shortcut help, and focused mode.

#### PR 3.2 — Flashcard and multiple choice

- Redesign flip/reveal mechanics without relying on animation for comprehension.
- Standardize option geometry, selection, correct/incorrect feedback, explanations, and next action.

#### PR 3.3 — Typing and virtual keyboard

- Redesign text entry, IME behavior, kana/romaji modes, validation, hints, mobile keyboard coexistence, and virtual keyboard ergonomics.
- Preserve flexible romaji normalization.

#### PR 3.4 — Results and retry

- Replace decorative score presentation with actionable mastery summary, mistakes, retry, review scheduling, and next lesson action.
- Ensure failure feedback is gentle, precise, and recovery-oriented.

**Status:** Complete on 2026-07-03 (PR 3.1–3.4 scope implemented).

**Exit gate:** Complete. Vocabulary, HSK, kanji, grammar, and radical quizzes use the shared `QuizFrame`; explicit feedback/advance behavior, exit confirmation, keyboard help, TTS, responsive actions, and recovery-oriented results are covered. See [`../../04-quality/ui-ux-wave-3-core-quiz.md`](../../04-quality/ui-ux-wave-3-core-quiz.md).

---

### Wave 4 — Learning & Content Workspace

**Purpose:** Turn browsing content into a coherent progression from course discovery to active practice.

#### PR 4.1 — Home, courses, and learning path

- Redesign home as “continue learning” rather than a marketing card grid.
- Unify course selection, lesson path, mastery states, locked states, and resume actions.

#### PR 4.2 — Lesson hub

- Create a lesson workspace connecting vocabulary, grammar, kanji, conversation, and quizzes.
- Surface progress and recommended next activity without showing every possible action equally.

#### PR 4.3 — Vocabulary and HSK browsing

- Use responsive table/list patterns with search, filters, TTS, selection, bulk quiz entry, and long-content handling.
- Remove duplicate legacy vocabulary routes where safe or establish explicit compatibility redirects.

#### PR 4.4 — Grammar and reference content

- Replace modal-first reading with progressive inline/reference layouts.
- Standardize patterns, examples, comparison, difficulty, and quiz entry.

#### PR 4.5 — Alphabet and conversations

- Improve scanability, pronunciation controls, and mobile table/grid behavior.
- Make audio availability and offline limitations explicit.

**Status:** Complete on 2026-07-03 (PR 4.1–4.5 scope implemented).

**Exit gate:** Complete. Home prioritizes one continue-learning action; the lesson hub connects content to practice; vocabulary/HSK discovery, inline grammar references, alphabet, and conversations preserve responsive, searchable, audio-aware learning flows. See [`../../04-quality/ui-ux-wave-4-learning-workspace.md`](../../04-quality/ui-ux-wave-4-learning-workspace.md).

---

### Wave 5 — Kanji Immersive Desk

**Purpose:** Deliver the strongest expression of the selected visual direction.

#### PR 5.1 — Kanji catalog and lesson context

- Redesign kanji level browsing, lesson navigation, mastery filters, and resume state.

#### PR 5.2 — Reference workspace

- Build the C-direction desktop workspace: glyph and readings, examples, radicals/components, stroke order, related kanji, and persistent lesson timeline.
- Collapse into a clear mobile sequence with sticky contextual actions.

#### PR 5.3 — Stroke order and handwriting

- Unify canvas tools, replay controls, stroke feedback, undo/reset, accessibility alternative, and reduced-motion behavior.
- Resolve Canvas colors from design tokens.

#### PR 5.4 — Radicals and kanji quiz modes

- Align radical exploration and all kanji quiz modes with the shared quiz frame.

**Status:** Complete on 2026-07-03 (PR 5.1–5.4 scope implemented).

**Exit gate:** Complete. The kanji catalog persists mastery/resume state; the reference desk recomposes from three desktop panes to a 320 px sequence; stroke and handwriting controls use tokens and textual alternatives; kanji/radical quizzes share the Wave 3 frame. See [`../../04-quality/ui-ux-wave-5-kanji-desk.md`](../../04-quality/ui-ux-wave-5-kanji-desk.md).

---

### Wave 6 — Review, Exams & Progress

**Purpose:** Make long-term learning loops understandable and actionable.

#### PR 6.1 — Review and SRS

- Redesign review queue, due/overdue states, leech indicators, rating controls, session summary, and empty state.
- Explain scheduling in plain language without exposing algorithm jargon by default.

#### PR 6.2 — Mock tests and exams

- Create a distraction-free exam shell, section navigation, unanswered-state review, timer behavior, interruption recovery, and final confirmation.
- Separate practice feedback from exam feedback.

#### PR 6.3 — Stats and achievements

- Prioritize learning decisions over decorative metrics.
- Show trend, mastery distribution, weak areas, consistency, and next recommended action with accessible data representations.

#### PR 6.4 — Settings and data portability

- Group learning, audio, appearance, offline data, export/import, and privacy settings.
- Use autosave or explicit save consistently and announce persistence state.

**Status:** Complete on 2026-07-03 (PR 6.1–6.4 scope implemented).

**Exit gate:** Complete. Review uses four plain-language recall ratings and recovery states; active exams survive refresh through expiring local drafts; statistics always lead to a learning action; settings announce autosave and explain local/offline data ownership. See [`../../04-quality/ui-ux-wave-6-review-progress.md`](../../04-quality/ui-ux-wave-6-review-progress.md).

---

### Wave 7 — Supporting Surfaces

**Purpose:** Finish all remaining routes without diluting the product system.

#### PR 7.1 — Premium and about

- Treat these as restrained brand surfaces while preserving the product’s visual language.
- Clearly distinguish current functionality, future functionality, and offline guarantees.

#### PR 7.2 — Counters and utility tools

- Bring specialized utilities into the shared shell and component vocabulary.

#### PR 7.3 — Global states and rare paths

- Cover not-found, unsupported content, corrupt local data, update available, install prompt, and offline fallback.
- Audit every route against the four page states and shell behavior.

**Status:** Complete on 2026-07-03 (PR 7.1–7.3 scope implemented).

**Exit gate:** Complete. Premium and About distinguish current local functionality from optional/future services; utilities remain in the shared shell and pass mobile reflow; global error, offline, update, install, empty, and corrupt-storage paths use documented recovery behavior. See [`../../04-quality/ui-ux-wave-7-supporting-surfaces.md`](../../04-quality/ui-ux-wave-7-supporting-surfaces.md).

---

### Wave 8 — Hardening & Release

**Purpose:** Turn a collection of redesigned screens into a reliable release.

#### PR 8.1 — Accessibility certification pass

- WCAG 2.1 AA contrast, semantics, focus order, screen-reader names, zoom, reflow, touch targets, reduced motion, and color-independent meaning.
- Verify F1, Space/Enter, and 1–4 across all relevant modes.

#### PR 8.2 — Visual regression and device matrix

- Add stable screenshot coverage for representative routes in light/dark and mobile/desktop.
- Test 320, 375, 768, 1024, and 1440 px classes plus long Vietnamese/CJK content.

#### PR 8.3 — Performance and offline hardening

- Audit route chunks, fonts, hydration, large lists, canvas, PWA caches, and interaction responsiveness.
- Validate cold offline startup and cached navigation through core study journeys.

#### PR 8.4 — Final critique, polish, and rollout

- Run Impeccable critique/audit/polish and resolve all P0/P1 findings.
- Complete manual UX review, update screenshots/docs, stage preview release, and execute rollback checklist.

**Status:** Implementation complete on 2026-07-03; release verification continues through `v4-dev` and GitHub Pages.

**Exit gate:** Local gates complete: full test/build/type checks pass, Impeccable remains at zero findings, representative Chromium contracts cover 320–1440 px, and the production build emits base-safe service-worker/Workbox artifacts. CI, preview approval, main merge, and deployed-site verification remain release actions. See [`../../04-quality/ui-ux-wave-8-hardening-release.md`](../../04-quality/ui-ux-wave-8-hardening-release.md).

## 5. Cross-Wave Quality Gates

Every implementation PR must pass:

```bash
./scripts/impeccable-audit.sh
./scripts/test-local.sh --quick
```

Every completed wave must additionally pass:

```bash
./scripts/test-local.sh all
./scripts/check-ci.sh
./scripts/quality-audit.sh --save
```

Frontend PR review must include:

- Mobile and desktop screenshots.
- Light and dark themes.
- Keyboard and touch verification.
- Reduced-motion behavior.
- Loading, error, empty, and success states.
- GitHub Pages base-path navigation.
- Offline behavior for affected core flows.
- Impeccable count comparison; update baseline only when debt decreases.

## 6. Program Metrics

| Metric | Baseline | Final target |
|---|---:|---:|
| Impeccable findings | 100 | 0 warnings; advisories explicitly resolved or narrowly justified |
| Side-tab warnings | 14 | 0 |
| Layout-transition warnings | 2 | 0 |
| Duplicate component roles | At least 3 pairs | 0 |
| Active visual token systems | Legacy + Tailwind | 1 |
| Routes on documented design system | Partial | 36/36 or explicit redirects |
| Page-state coverage | Inconsistent | 100% applicable routes |
| Touch targets | Mixed | 100% interactive mobile controls ≥44×44 px |
| Svelte diagnostics | 0 errors / 0 warnings | Maintain 0 / 0 |
| Core offline journeys | Existing, unevenly surfaced | Home → lesson → quiz → result → review verified |

## 7. Dependencies and Parallelism

```text
Wave 0
  └─ Wave 1
       └─ Wave 2
            ├─ Wave 3
            │    ├─ Wave 4
            │    ├─ Wave 5
            │    └─ Wave 6
            └─ Wave 7 (supporting work may start after shell stabilizes)

Waves 4, 5, and 6 may run in parallel only after Wave 3 establishes the quiz contract.
Wave 8 begins after Waves 3–7 are merged into v4-dev.
```

## 8. Recommended Impeccable References

- `extract` for Wave 1 token/component consolidation.
- `layout` and `interaction-design.md` for Waves 2–6.
- `typeset` for CJK hierarchy in Waves 3–5.
- `adapt` for every mobile collapse strategy.
- `harden` for offline, errors, localization, and edge states.
- `audit` for accessibility/performance gates.
- `critique` after each journey wave and `polish` before each wave closes.

## 9. Explicit Non-Goals

- Rewriting lesson, vocabulary, kanji, or HSK data solely for visual redesign.
- Adding backend dependency to core learning flows.
- Replacing SvelteKit, Tailwind, or shadcn-svelte.
- Introducing a second component library.
- Shipping all routes in one PR.
- Changing quiz answer semantics, SRS algorithms, or progress rules without separate behavior requirements and tests.

## 10. First Implementation Slice

Waves 0 and 1 are closed. Begin **Wave 2, PR 2.1** on the application shell; page-level redesign can now build on the verified foundation.
