# UI/UX Wave 0 Baseline

> **Captured:** 2026-07-02  
> **Build:** Local production build served at the GitHub Pages base path  
> **Purpose:** Pre-redesign evidence, not a target design

## Coverage

### Screenshots

| Surface | Desktop light | Mobile light | Mobile dark |
|---|---:|---:|---:|
| Home | `home-desktop-light.png` | `home-mobile-light.png` | `home-mobile-dark.png` |
| Lesson | `lesson-desktop-light.png` | — | — |
| Quiz | `quiz-desktop-light.png` | `quiz-mobile-light.png` | — |
| Vocabulary | `vocabulary-desktop-light.png` | — | — |
| Kanji reference | `kanji-reference-desktop-light.png` | — | — |

Files live under `documents/04-quality/screenshots/ui-ux-wave-0/`.

### Protected journeys

| Journey | Evidence | Baseline status |
|---|---|---|
| Home → course → lesson | Existing `home.spec.ts`, `lesson-menu.spec.ts`, route inventory | Protected |
| Quiz load and completion → results | Existing quiz specs and `user-flows.spec.ts` | Protected |
| Exam selection → submission → review | Existing `exam-flow.spec.ts` | Protected |
| Settings controls | `ui-ux-baseline.spec.ts` | Stable labels protected |
| Settings persistence across reload | Manual/E2E probe | **Gap — current hydration resets the toggled value** |
| Empty review recovery | `ui-ux-baseline.spec.ts` | Added |
| F1/TTS invocation | `ui-ux-baseline.spec.ts` | Added |
| Warm cached route navigation offline | Playwright probe | **Gap — anchor navigation reaches Chrome offline error** |
| Cold offline startup | App shell currently unregisters service workers | **Gap — must not be claimed as passing** |

## Runtime Complexity Snapshot

The in-app browser inspected the rendered production build. Timing APIs are not exposed by this browser surface, so this is an equivalent structural baseline rather than a Lighthouse score.

| Surface | DOM nodes | Interactive elements | Headings | Images |
|---|---:|---:|---:|---:|
| Home | 288 | 22 | 14 | 1 |
| Lesson | 205 | 16 | 6 | 0 |
| Quiz | 108 | 10 | 1 | 0 |
| Vocabulary | 1,174 | 186 | 2 | 0 |
| Kanji reference | 311 | 20 | 2 | 0 |

### Build artifact baseline

| Metric | Value |
|---|---:|
| JavaScript files | 77 |
| JavaScript bytes | 2,910,648 |
| Largest JavaScript file | 744,080 bytes |
| CSS files | 34 |
| CSS bytes | 154,028 |
| Largest CSS file | 62,114 bytes |

These values are uncompressed build artifact totals. Wave 8 may add Lighthouse/Web Vitals budgets; it must compare like-for-like rather than mixing compressed and uncompressed measurements.

## Baseline Findings

1. Vocabulary is the dominant DOM/interaction hotspot and needs virtualization or progressive rendering review in Wave 4.
2. Home uses 14 headings and a broad card-like discovery surface; the redesign should prioritize Continue Learning and reduce equal-weight choices.
3. Quiz is structurally compact, but each language family owns separate route-level interaction code.
4. Dark mode activates correctly through the global toggle, but only the home/mobile baseline was captured in Wave 0.
5. Cold offline startup is unproven and likely contradicted by the startup service-worker unregister logic. Treat this as release debt, not a waived baseline.
6. Production preview correctly resolves assets and routes under `/2026-Smart-Quiz/`.
7. A settings toggle changed through the UI returns to its default after reload. Persistence must be corrected before the Wave 6 settings redesign can close.
8. Even after warming the course route, clicking its home-page anchor while offline performs a network navigation and reaches the browser offline error. Offline navigation needs a dedicated architecture fix before release.

## Screenshot Manifest

```text
documents/04-quality/screenshots/ui-ux-wave-0/
├── home-desktop-light.png
├── home-mobile-dark.png
├── home-mobile-light.png
├── kanji-reference-desktop-light.png
├── lesson-desktop-light.png
├── quiz-desktop-light.png
├── quiz-mobile-light.png
└── vocabulary-desktop-light.png
```

## PR 0.2 Acceptance

- [x] Representative desktop screenshots captured.
- [x] Representative mobile screenshots captured.
- [x] Dark-mode baseline captured.
- [x] Navigation, quiz completion, review, TTS, and labeled settings controls have Playwright coverage.
- [x] Settings persistence failure is recorded explicitly instead of hidden behind a passing claim.
- [x] Warm navigation and cold-start offline failures are recorded explicitly instead of hidden behind passing claims.
- [x] Equivalent performance/complexity baseline recorded for five critical surfaces.
- [x] Cold offline startup gap recorded explicitly.

## Verification Record

| Check | Result |
|---|---|
| Route inventory reconciliation | 36 route files = 36 inventory rows; 4 compatibility redirects |
| Baseline E2E contracts | 3/3 test bodies passed; Playwright process remained open on Windows while shutting down its managed web server and was terminated by the command timeout |
| `npm run check` | 0 errors, 0 warnings |
| `npm run build` | Pass; static build and `build/404.html` created |
| `./scripts/test-local.sh all` | 59 files, 973 tests passed |
| Impeccable detector | 100 findings: 18 warnings, 82 advisories; matches categorized baseline |
| Impeccable JSON artifacts | Valid JSON |
| `quality-audit.sh --save` | Passed: 97/100 (A+), all required commands ran successfully |
| `check-ci.sh --status` | Passed: 10 successful, 0 failed, 0 in progress on `main` |

Wave 0 closed on 2026-07-02 after both final project gates passed. The settings-persistence and cold-offline-startup findings remain explicit implementation debt assigned to later waves; they are not hidden or waived.
