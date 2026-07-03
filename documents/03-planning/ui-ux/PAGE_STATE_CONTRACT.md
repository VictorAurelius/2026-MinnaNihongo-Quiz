# Page-State Contract

> **Wave:** 0 — Baseline & Contract  
> **Applies to:** Every redesigned page and page-level learning flow

## State Vocabulary

| State | Trigger | Required UI | Forbidden behavior |
|---|---|---|---|
| Loading | Local hydration, lazy data chunk, or async enhancement is unresolved | Preserve page geometry with skeletons; retain title/context when known | Full-page spinner for bundled learning data; implying network is required |
| Empty | Request succeeded but there is no content, progress, match, or due item | Explain why; provide one relevant next action | Generic “No data”; dead-end illustration; error styling |
| Error | Content is invalid or an operation failed | Plain-language cause, preserved input, safe retry/back action | Raw exception text; destructive automatic reset |
| Success/ready | Content or action is available | Current task first, next action obvious | Equal visual weight for every possible action |
| Offline | Network enhancement is unavailable | Keep bundled/cached study active; name only unavailable enhancements | Blocking core lessons behind a connectivity banner |
| Locked | A business or progression rule denies access | Explain the requirement and show available alternatives | Disabled control without explanation |
| Complete | Quiz, review, lesson, or exam is finished | Outcome, mistakes/insight, retry/review/continue action | Celebration that interrupts recovery or hides errors |

## Route-Family Requirements

| Family | Loading | Empty | Error | Offline | Complete |
|---|---|---|---|---|---|
| Home/course/lesson | progress hydration | no courses/content | invalid course/lesson | bundled catalog remains usable | next recommended lesson |
| Vocabulary/grammar/reference | chunk hydration | no items/no search match | invalid content id | reading and local search remain usable | selection leads to practice |
| Quiz | question setup | no eligible questions | invalid mode/query | active session remains usable | result and retry path |
| Kanji/canvas | lesson/canvas setup | no kanji/radical match | unsupported lesson/radical | reference and drawing remain local | return to lesson/review |
| Review/SRS | stored queue hydration | all caught up | corrupt stored schedule | due queue remains local | session summary |
| Exams | paper/session hydration | no papers for filter | invalid paper/session | bundled papers remain available | explicit submission review |
| Stats/settings | stored state hydration | no activity | import/storage failure | settings and local analytics remain available | persistence confirmation |
| Supporting pages | route chunk | missing optional content | not found | static content remains available | relevant navigation |

## Interaction Rules

1. Focus moves to the state heading when a page replaces its primary content with an error or empty state.
2. Retry never discards user input unless the user explicitly confirms.
3. State meaning never relies on color alone.
4. Skeleton dimensions match the ready layout closely enough to avoid major shift.
5. Offline status is global context; route-specific messaging appears only when capability is actually reduced.
6. Page states use shared primitives and Vietnamese product language; learning content stays in its source language.
7. Every state remains functional at 320 px, 200% zoom, dark mode, and reduced motion.

## Known Wave 0 Gaps

- Settings toggles do not reliably persist through reload because client hydration resets stored state.
- Warm anchor navigation and cold startup fail offline in the current browser probe.
- Several routes use imperative redirect or ad-hoc state messages instead of shared page-state primitives.
- Route focus restoration and announcements are not centralized.

These are owned implementation gaps, not exceptions to this contract.

