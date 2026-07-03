# UI/UX Route & Interaction Inventory

> **Program:** Smart Quiz UI/UX Redesign 2026  
> **Wave:** 0 — Baseline & Contract  
> **PR slice:** 0.1  
> **Captured:** 2026-07-01  
> **Coverage:** 36 page routes + root layout + error boundary

## 1. Decisions

### Canonical route families

| Journey | Canonical route family |
|---|---|
| Course discovery | `/` → `/courses` → `/course/[courseId]` |
| Lesson study | `/course/[courseId]/lesson/[id]` and its `vocabulary`, `grammar`, `grammar-quiz` children |
| Vocabulary quiz | `/quiz/[mode]?course=&lesson=&direction=` → `/results` |
| Chinese study | `/hsk` → `/hsk/[group]` → `/hsk/[group]/quiz/[mode]` |
| Kanji study | `/kanji` → `/kanji/[lesson]` → reference/quiz routes |
| Radical study | `/kanji/radicals` → `/kanji/radicals/[radicalId]` → quiz route |
| Review and progress | `/review`, `/stats`, `/settings` |
| Assessment | `/exams`, `/exams/[paperId]`, `/mock-test` |

### Compatibility-only routes

These routes must not receive a second visual implementation. Keep redirects for old bookmarks until route analytics or an explicit deprecation decision permits removal.

| Compatibility route | Canonical destination | Existing behavior | Redesign decision |
|---|---|---|---|
| `/lessons` | `/course/n5` | `+page.ts` 301 redirect | Keep redirect; retire unreachable page UI |
| `/lesson/[id]` | `/course/n5/lesson/[id]` | `+page.ts` 301 redirect | Keep redirect; retire unreachable page UI |
| `/lesson/[id]/vocabulary` | `/course/n5/lesson/[id]/vocabulary` | `+page.ts` 301 redirect | Keep redirect; retire unreachable page UI |
| `/lesson/[id]/grammar` | `/course/n5/lesson/[id]/grammar` | `+page.ts` 301 redirect | Keep redirect; retire unreachable page UI |

### Consolidation candidates

- `/mock-test` and `/exams/[paperId]` represent overlapping assessment concepts. Preserve both during redesign, but Wave 6 must decide whether mock test becomes a preset exam paper or remains a separate practice flow.
- `/vocab/[level]` is a global level browser while lesson vocabulary is course-aware. Keep both only if the global route provides cross-lesson value; otherwise redirect it to a filtered canonical vocabulary workspace in Wave 4.
- Quiz implementations currently exist in vocabulary, HSK, kanji, grammar, and radical route families. Their data adapters remain distinct, but Wave 3 owns one shared interaction frame.

## 2. Route Inventory

Legend:

- **C:** canonical product route.
- **K:** compatibility route; redirect only.
- **R:** retain pending consolidation decision.
- **Local:** core content available without network after app assets are cached.
- **Stored:** relies on local persisted progress/settings.

| # | Route | Class | Primary job | Critical states | Key interaction contract | Data/offline | Redesign wave |
|---:|---|:---:|---|---|---|---|---:|
| 1 | `/` | C | Resume learning or choose the next study path | load failure, first use, returning learner | One dominant Continue action; course/content discovery secondary | Static data + stored progress; Local/Stored | 4 |
| 2 | `/courses` | C | Compare and choose a Japanese course | empty catalog, partial progress | Open course; show level and progress without card-grid noise | Static course index + stored progress | 4 |
| 3 | `/course/[courseId]` | C | Resume or choose a lesson | invalid course, no lessons, locked/completed lesson | Continue next lesson; open lesson; stable mastery states | Static course data + stored progress | 4 |
| 4 | `/course/[courseId]/lesson/[id]` | C | Choose the next activity within a lesson | invalid lesson, no content, partial/completed | Start quiz; open vocab/grammar; preserve direction selection | Static lesson data + stored progress | 4 |
| 5 | `/course/[courseId]/lesson/[id]/vocabulary` | C | Browse, hear, select, and quiz lesson words | empty/search no-result, TTS unavailable | Row/card selection by click/keyboard; TTS; bulk quiz entry | Static lesson data; Local | 4 |
| 6 | `/course/[courseId]/lesson/[id]/grammar` | C | Understand grammar patterns and examples | invalid lesson, no grammar | Progressive reading; comparison; enter grammar quiz | Static grammar data; Local | 4 |
| 7 | `/course/[courseId]/lesson/[id]/grammar-quiz/[mode]` | C | Practice grammar | invalid mode/data, active, answered, complete | 1–4 for choice; Enter for fill; immediate feedback | Static grammar data + session state | 3/4 |
| 8 | `/quiz/[mode]` | C | Practice lesson vocabulary | missing query, invalid mode, active, complete | F1/Space/Enter/1–4 by mode; state resets per question | Static lesson data + quiz store; Local/Stored | 3 |
| 9 | `/results` | C | Understand performance and choose recovery action | missing session, pass/struggle, no wrong items | Retry wrong/all; return to lesson; continue learning | Quiz store + stored progress | 3 |
| 10 | `/vocab/[level]` | R | Browse vocabulary across a level | invalid level, empty/search no-result | Search/filter/TTS; clarify cross-lesson value | Static vocabulary data; Local | 4 |
| 11 | `/hsk` | C | Choose a Chinese vocabulary group | no groups, group progress | Open group; clearly communicate HSK scope | Static HSK data; Local | 4 |
| 12 | `/hsk/[group]` | C | Browse one HSK group and choose practice mode | invalid group, empty list | Back to HSK; start flashcard/choice/typing | Static HSK data; Local | 4 |
| 13 | `/hsk/[group]/quiz/[mode]` | C | Practice Chinese vocabulary | invalid group/mode, active, answered, complete | F1, Space, 1–4, Enter; Chinese TTS; consistent results | Static HSK data + session state | 3 |
| 14 | `/kanji` | C | Choose kanji lesson or radical path | no lessons, partial mastery | Resume kanji; open lesson; open radicals | Static kanji metadata + stored progress | 5 |
| 15 | `/kanji/[lesson]` | C | Choose reference or kanji quiz mode | invalid lesson, empty lesson | Open immersive reference; choose direction/mode | Static kanji lesson data | 5 |
| 16 | `/kanji/[lesson]/reference` | C | Study glyphs, readings, examples, and strokes | invalid lesson, long examples, TTS unavailable | Select kanji; play audio/strokes; preserve lesson context | Static kanji data; Local | 5 |
| 17 | `/kanji/[lesson]/quiz/[mode]` | C | Practice lesson kanji | invalid mode, active, answered, complete | Shared quiz shortcuts plus writing-specific controls | Static kanji data + session state | 3/5 |
| 18 | `/kanji/radicals` | C | Browse and search radicals | empty/search no-result | Select radical; scan by stroke/category | Static radical data | 5 |
| 19 | `/kanji/radicals/[radicalId]` | C | Understand a radical and related kanji | invalid radical, no related kanji | Start radical quiz; open related kanji | Static radical/kanji data | 5 |
| 20 | `/kanji/radicals/[radicalId]/quiz/[mode]` | C | Practice kanji by radical | invalid radical/mode, active, complete | Shared quiz frame; return to radical context | Static radical/kanji data + session state | 3/5 |
| 21 | `/review` | C | Complete due SRS review | hydration, empty queue, active, complete | F1, Space, rating actions; route to stats/home | Stored SRS/progress; Local/Stored | 6 |
| 22 | `/stats` | C | Identify progress and weak areas | no activity, partial history | Move from insight to review/course action | Stored progress/achievements | 6 |
| 23 | `/settings` | C | Configure learning, audio, appearance, and data | hydration, import error/success | Predictable persistence; export/import; font preview | Stored UI/progress settings | 6 |
| 24 | `/exams` | C | Choose a JLPT practice paper | no papers, level filter | Select paper with duration/question context | Bundled exam metadata | 6 |
| 25 | `/exams/[paperId]` | C | Complete and review an exam paper | invalid paper, active, paused, unanswered, complete | Timed navigation; confirm submit; interruption recovery | Bundled exam data + session state | 6 |
| 26 | `/mock-test` | R | Complete an generated/mock JLPT test | setup, active, timer, complete | Keyboard choice navigation; decide merge with exams | Bundled/generated local questions | 6 |
| 27 | `/grammar-reference` | C | Search grammar across lessons | hydration, empty/search no-result | Search/filter; open pattern detail without modal dependence | Static grammar index; Local | 4 |
| 28 | `/alphabet` | C | Learn kana charts and pronunciation | hydration, audio unavailable | Click/Enter to pronounce; scan tables on mobile | Static alphabet data; Local | 4 |
| 29 | `/conversations` | C | Browse conversation examples | empty/long content/audio unavailable | Read/listen; preserve bilingual hierarchy | Bundled conversation data; Local | 4/7 |
| 30 | `/counters` | C | Use Japanese counter reference/tool | no match, unusual values | Select counter/value; clear computed result | Bundled counter data; Local | 7 |
| 31 | `/premium` | C | Understand premium status and scope | free/premium/offline | Honest feature comparison; non-blocking navigation | Static product content | 7 |
| 32 | `/about` | C | Understand project and access external resources | external link unavailable | External links are explicit; return home | Static content | 7 |
| 33 | `/lessons` | K | Preserve old lesson-list bookmarks | redirect | No independent UI | 301 to `/course/n5` | 0/7 |
| 34 | `/lesson/[id]` | K | Preserve old lesson bookmarks | redirect | No independent UI | 301 to canonical lesson | 0/7 |
| 35 | `/lesson/[id]/vocabulary` | K | Preserve old vocabulary bookmarks | redirect | No independent UI | 301 to canonical vocabulary | 0/7 |
| 36 | `/lesson/[id]/grammar` | K | Preserve old grammar bookmarks | redirect | No independent UI | 301 to canonical grammar | 0/7 |

## 3. Shared Shell Contracts

### Root layout

The root layout owns:

- Theme initialization and persistence.
- Global header/application shell.
- Toast region.
- Install/update messaging.
- Main-content landmark and skip-link target.
- Global online/offline presentation.

It must not own route-specific learning state or force full navigation chrome during focused quiz/exam sessions.

### Error boundary

The root error route must provide:

- Plain-language Vietnamese summary.
- Safe path home and, when known, back to the previous canonical learning context.
- No dependency on network or JavaScript recovery beyond normal Svelte rendering.
- Diagnostic detail only when it helps recovery; never expose implementation noise by default.

## 4. Interaction Contracts by Journey

| Journey | Entry | Completion | Must preserve |
|---|---|---|---|
| Resume learning | Home/shell Continue | Canonical lesson hub | Stored course and lesson progress |
| Lesson study | Course lesson selection | Quiz start or lesson content complete | Selected direction and course context |
| Vocabulary quiz | Lesson/word selection | Results and retry/continue | `checkAnswer()`, romaji flexibility, TTS source rules |
| HSK quiz | Group and mode selection | Return to group or continue review | Chinese TTS and mode shortcuts |
| Kanji study | Kanji lesson/radical selection | Reference mastery or quiz result | Canvas/stroke controls and accessible alternative |
| Review | Due queue | Session summary/empty queue | SRS ratings, due dates, progress persistence |
| Exam | Paper selection | Reviewed submission | Timer, unanswered state, explicit final submission |
| Settings | Shell/settings navigation | Immediate or confirmed persistence | Offline storage, import validation, theme stability |

## 5. Page-State Contract

Page redesigns must use these meanings consistently:

| State | Meaning | Required response |
|---|---|---|
| Loading | Local hydration or code/data chunk is not ready | Preserve layout with skeleton; never imply network is required for core data |
| Empty | Valid state with no content/activity/results | Explain why and provide one relevant next action |
| Error | Requested content or operation failed | State what failed, preserve entered data, and offer safe recovery |
| Success | Content is ready or action completed | Show current task and the next action; avoid celebratory interruption |
| Offline | Network enhancement unavailable | Keep core study enabled and identify only the affected enhancement |
| Locked | Product/business rule prevents access | Explain requirement and preserve access to available learning paths |

## 6. Findings That Feed Later Waves

1. Four compatibility routes retain obsolete page components behind server redirects. Remove their duplicate UI during Wave 7 after redirect tests exist.
2. Header page-title logic still recognizes compatibility paths and misses deeper radical/exam distinctions. Wave 2 replaces path-string title branching with route metadata or a shared context contract.
3. BackButton calls receive unbased absolute paths in course child routes. Wave 2 must make its API base-path-safe by construction.
4. Quiz behavior is duplicated across five route families. Wave 3 must separate shared frame/interaction state from language-specific data adapters.
5. Core data is bundled, but offline state is mostly implicit. The new shell must communicate availability without suggesting that learning depends on the network.
6. Page-state coverage is uneven: several routes redirect imperatively or render ad-hoc messages instead of shared state components.
7. `/mock-test` versus `/exams` and `/vocab/[level]` versus course vocabulary need product decisions before their redesign PRs begin.

## 7. PR 0.1 Acceptance Checklist

- [x] All 36 page routes inventoried.
- [x] Canonical route families documented.
- [x] Compatibility routes identified with destinations.
- [x] Consolidation candidates recorded without premature deletion.
- [x] Core keyboard/TTS/offline contracts mapped.
- [x] Each route assigned to a redesign wave.
- [x] Root shell and error-boundary ownership documented.
- [ ] Baseline journey tests and screenshots captured — PR 0.2.
- [ ] `DESIGN.md` refreshed for C+A direction — PR 0.3.

