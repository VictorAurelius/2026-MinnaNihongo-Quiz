# UI System Wave Audit

Date: 2026-07-08
Branch: `feat/ui-system-waves`

## Goal

Bring Smart Quiz from mixed legacy page styling to one consistent “Immersive Language Desk” visual system across the whole app.

## Wave 0 findings

### Foundation debt

- `#main-content` in `svelte-app/src/app.css` still applies a legacy max-width and padding to the AppShell content area.
- Several route pages rebuild their own page frame with `mx-auto max-w-*`, instead of relying on AppShell and shared page primitives.
- Several workspace routes render an in-page `Breadcrumb` even though `AppShell` already renders route breadcrumbs.
- Page hero sections are repeatedly hand-built with `text-white pt-3 pb-6 px-4` and `background: var(--color-shell)`, which creates cramped headers and inconsistent hierarchy.
- Card/list rows are repeatedly hand-built with `rounded-2xl shadow-sm border-border/50`, producing parallel surface systems next to the existing `Card` primitive.
- Filter tabs are repeatedly hand-built with pill containers, but do not share one selected/focus/touch contract.

### Routes with obvious legacy page frames

- `/courses`
- `/course/[courseId]`
- `/kanji`
- `/hsk`
- `/conversations`
- `/settings`
- `/review`
- `/stats`
- `/exams`
- `/mock-test`
- `/premium`
- `/about`

### High-priority UX regressions

- Duplicate breadcrumb/title hierarchy on workspace pages.
- Content can feel too close to page edges on mobile because spacing comes from route-local wrappers instead of one shell contract.
- Search input and adjacent controls do not have enough structural spacing on dense pages.
- Study list rows vary in icon size, card padding, hover motion, and metadata placement.
- Dark shell hero blocks are used as decorative headers even when AppShell already provides page context.

## Design contract for remaining waves

- AppShell owns global page title and breadcrumbs.
- Workspace pages use shared page primitives for width, padding, hero, sections, list cards, filters, empty states, and search placement.
- Learning content remains the strongest visual element.
- Purple is reserved for action, selection, focus, and progress.
- Cards are flat by default; use borders and tonal layers before shadows.
- Mobile touch targets are at least 44px.
- Internal navigation keeps the SvelteKit `base` path.
- Dark mode and reduced motion must remain supported.

## Wave mapping

- Wave 1: fix global shell leakage and add shared page primitives.
- Wave 2: migrate study/content routes to the shared primitives.
- Wave 3: migrate quiz surfaces to one question/feedback contract.
- Wave 4: normalize navigation hierarchy and mobile IA.
- Wave 5: accessibility, focus, reduced motion, dark mode pass.
- Wave 6: run Impeccable, local tests, build, deploy verification.

## Implementation evidence

### Foundation fixes

- Replaced the legacy `#main-content` rule so it no longer constrains AppShell's `.shell-content`.
- Removed the global `margin: 0; padding: 0` universal reset that was overriding Tailwind spacing utilities after `@import "tailwindcss"`.
- Added shared primitives:
  - `PageWorkspace`
  - `PageHero`
  - `FilterTabs`
  - `StudyListCard`

### Migrated route groups

- Study surfaces: `/courses`, `/course/[courseId]`, lesson vocabulary, lesson grammar, `/kanji`, `/kanji/radicals`, `/hsk`.
- Review and quiz-adjacent surfaces: `/review`, `/quiz/[mode]` loading state, `/mock-test`.
- Supporting surfaces: `/settings`, `/stats`, `/conversations`, `/counters`, `/exams`, `/premium`, `/about`.

### Verification

- `npm run check`: 0 errors, 0 warnings.
- `npm run build`: passed.
- `./scripts/impeccable-audit.sh`: 0 findings, 0 warnings.
- `./scripts/test-local.sh svelte-app --quick`: 64 files passed, 912 tests passed.
- Local visual smoke checked 17 routes across mobile 390×844 and desktop 1280×900, 34 screenshots total, with no horizontal overflow and no page errors.
- `/kanji` mobile evidence after the global reset fix:
  - workspace left gutter: 16px
  - search input padding-left: 40px
  - no horizontal overflow

### Remaining release gate

The branch `feat/ui-system-waves` is pushed, but PR creation and deploy verification are blocked until GitHub authentication is refreshed. Both `gh` and the Codex GitHub connector reported expired/invalid tokens during PR creation.
