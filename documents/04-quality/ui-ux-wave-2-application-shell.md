# UI/UX Wave 2 — Application Shell

**Completed:** 2026-07-03
**Scope:** PR 2.1–2.3 — desktop shell, mobile shell, navigation UX

## Delivered

- Replaced the header-only layout with a global responsive application shell.
- Added a restrained desktop rail with primary learning destinations, active state, due-review count, current-course progress, connection state, and settings.
- Added a compact mobile top bar and safe-area-aware bottom navigation with one-handed primary destinations.
- Added focused quiz and exam chrome that removes the persistent rail and bottom navigation.
- Centralized route titles, shell modes, active navigation sections, course/lesson context, and breadcrumbs in `routeMeta.ts`.
- Added a Vietnamese skip link and route announcement live region while preserving SvelteKit's accessible route-focus restoration after client navigation.
- Kept every internal shell link base-path-safe and native-anchor-based for predictable history and scroll restoration.
- Made online/offline state reactive to browser connection events without blocking offline-first study flows.
- Removed the retired `Header.svelte` implementation.

## Acceptance evidence

| Requirement | Evidence |
|---|---|
| Correct shell mode on all routes | Root layout owns `AppShell`; route metadata tests cover workspace and focus families. |
| Desktop navigation | Chromium journey at 1280×800 verifies rail, active state, course context, and breadcrumbs. |
| Mobile navigation | Chromium journey at 320×700 verifies bottom navigation and zero horizontal overflow. |
| Focused study mode | Quiz journey verifies reduced chrome and no persistent navigation. |
| Keyboard and assistive navigation | Skip link, `aria-current`, live route announcer, and SvelteKit's body-focus reset are globally present; E2E verifies focus restoration after client navigation. |
| Offline accuracy | E2E dispatches a browser offline event and verifies the status changes to “Đang ngoại tuyến”. |
| GitHub Pages base path | Shell destinations are composed with SvelteKit `base`; route metadata separately strips the base for matching. |
| Content obstruction | Shell content reserves mobile safe-area and bottom-navigation space; 320 px journey confirms usable page width. |

## Visual review

- Reviewed the lesson workspace at 1280×800: the rail stays quiet while learning content remains the dominant surface.
- Reviewed courses at 320×700: the top bar and bottom navigation remain legible with no horizontal overflow.
- Reviewed review and quiz routes: standard pages retain context; quiz routes reduce chrome and restore focus to the task.
- Light theme, dark shell contrast, active states, touch targets, and connection affordances match `DESIGN.md` and the UI rules.

## Verification result

- `./scripts/test-local.sh all`: 61 files, 903 tests passed.
- `npm run check`: 0 errors, 0 warnings.
- `npm run build`: production build and SPA fallback passed.
- Chromium shell journeys: 7 passed, covering desktop, 320 px mobile, focus mode, route focus, offline state, settings, review, and F1 speech.
- `./scripts/impeccable-audit.sh`: 0 findings, 0 warnings against a zero baseline.
- `git diff --check`: clean.
- The local test runner now enables `pipefail`, so a failing Vitest process can no longer be masked by its output pipeline.

## Next wave

Wave 3 should build the shared quiz frame on top of the new focused shell without reintroducing route-specific navigation chrome.
