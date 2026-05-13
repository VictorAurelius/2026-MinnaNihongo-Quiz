# Technical Documentation

## System Architecture

```
┌─────────────────────────────────────────────────┐
│                  GitHub Pages                    │
│          victoraurelius.github.io                │
│              /2026-Smart-Quiz/                   │
├─────────────────────────────────────────────────┤
│              Static Build Output                 │
│  index.html + 404.html (SPA fallback) + JS/CSS  │
├─────────────────────────────────────────────────┤
│              SvelteKit Client Router             │
│  Reads URL → matches route → renders component  │
├──────────┬──────────┬───────────┬───────────────┤
│  Routes  │Components│  Stores   │    Utils       │
│ /course/ │FlashCard │ quizStore │ quizUtils      │
│ /quiz/   │MC/Typing │ uiStore   │ audioUtils     │
│ /kanji/  │Header    │ progress  │ kanaUtils      │
│ /hsk/    │BackBtn   │           │ courseUtils     │
├──────────┴──────────┴───────────┴───────────────┤
│                  Data Layer                      │
│  TypeScript constants (no database/API)          │
│  courses/ · minna/ · kanji/ · hsk/               │
└─────────────────────────────────────────────────┘
```

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | SvelteKit | 2.5+ |
| Language | TypeScript | 5.0+ |
| Build | Vite | 5.0+ |
| Adapter | @sveltejs/adapter-static | SPA mode |
| Unit Tests | Vitest | 4.1+ |
| E2E Tests | Playwright | 1.58+ |
| CI/CD | GitHub Actions | deploy.yml |
| Hosting | GitHub Pages | Static |

## Build & Deploy Pipeline

```
git push main
    ↓
GitHub Actions (.github/workflows/deploy.yml)
    ↓
┌─ test job ────────────────────┐
│  npm ci                       │
│  npx vitest run               │
│  npm run build (for E2E)      │
│  npx playwright test          │
└───────────────────────────────┘
    ↓ (pass)
┌─ build job ───────────────────┐
│  npm ci                       │
│  npm run build                │
│    = vite build               │
│    + cp build/index.html      │
│        build/404.html         │
│  upload-pages-artifact        │
└───────────────────────────────┘
    ↓
┌─ deploy job ──────────────────┐
│  deploy-pages (GitHub Pages)  │
└───────────────────────────────┘
```

### SPA Routing on GitHub Pages

GitHub Pages has no server-side routing. All dynamic routes (e.g. `/course/n5/lesson/8`) return 404 from the server. The workaround:

1. Build outputs `404.html` = exact copy of `index.html`
2. GitHub Pages serves `404.html` for unknown paths (HTTP 404 status)
3. Browser loads the SPA shell JS
4. SvelteKit client-side router reads the URL and renders the correct page
5. HTTP 404 status is irrelevant — the page renders correctly

**Critical:** all `goto()` and `redirect()` calls must include `${base}` (`/2026-Smart-Quiz`).

## Routing Structure

```
/                                    → Home (landing page)
/courses                             → Course selection
/course/[courseId]                    → Lesson grid for a course
/course/[courseId]/lesson/[id]        → Lesson menu (direction + quiz modes)
/course/[courseId]/lesson/[id]/vocabulary → Vocabulary list (with selection)
/course/[courseId]/lesson/[id]/grammar    → Grammar patterns
/quiz/[mode]?course=X&lesson=Y&direction=Z → Quiz player
/results                             → Quiz results + retry
/kanji                               → Kanji lesson grid
/kanji/[lesson]                      → Kanji lesson menu
/kanji/[lesson]/reference            → Kanji reference table
/kanji/[lesson]/quiz/[mode]          → Kanji quiz
/hsk                                 → HSK group selection
/hsk/[group]                         → HSK vocabulary list
/alphabet                            → Hiragana/Katakana charts
/counters                            → Japanese counters
/grammar-reference                   → Searchable grammar patterns

Legacy redirects (301 → /course/n5/...):
/lessons → /course/n5
/lesson/[id] → /course/n5/lesson/[id]
/lesson/[id]/vocabulary → /course/n5/lesson/[id]/vocabulary
/lesson/[id]/grammar → /course/n5/lesson/[id]/grammar
```

## Component Architecture

### Quiz Components (src/lib/components/quiz/)

All quiz components follow the same contract:

```typescript
// Props
export let question: VocabItem;     // Full vocab item (for TTS, metadata)
export let questionText: string;     // Display text (direction-aware)
export let answer: string;           // Expected answer (direction-aware)

// Events dispatched
dispatch('correct', { item })       // User answered correctly
dispatch('wrong', { item })         // User answered incorrectly
```

| Component | Behavior |
|-----------|----------|
| **FlashCard** | Front: `questionText`. Back: `answerText`. Space/Enter to flip. Auto-speak on new card. |
| **MultipleChoice** | Shows `questionText` + 4 options. Keys 1-4 select. Auto-advance 1.5s after answer. |
| **TypingQuiz** | Shows `questionText`, user types answer. Enter submits → TTS plays → Enter advances. |

### State Reset Pattern

Svelte reuses component instances across questions. Each quiz component implements reactive state reset:

```typescript
let prevAnswer = '';
$: if (answer !== prevAnswer || questionText !== prevQuestionText) {
  prevAnswer = answer;
  prevQuestionText = questionText;
  userInput = '';
  answered = false;
  // ... reset all local state
}
```

### Common Components (src/lib/components/common/)

| Component | Props | Purpose |
|-----------|-------|---------|
| **Button** | variant, size, icon, href | Styled button/link |
| **Card** | hover, clickable, padding | Card container |
| **Modal** | isOpen, title, showCloseButton | Dialog overlay |
| **ProgressBar** | current, total, showText | Quiz progress |
| **BackButton** | href, showIcon, text | Hierarchical back navigation |

### BackButton Logic

```
/course/n5/lesson/1/vocabulary → /course/n5/lesson/1
/course/n5/lesson/1            → /course/n5
/course/n5                     → / (home — "course" is in HOME_PARENTS)
/kanji/1/reference             → /kanji/1
/kanji/1                       → / (home — "kanji" is in HOME_PARENTS)
```

## Store Architecture (src/lib/stores/)

### quizStore

```typescript
interface QuizState {
  mode: QuizMode;              // 'flashcard' | 'multiple-choice' | 'typing'
  direction: QuizDirection;     // 'ja-vi' | 'vi-ja' | 'vi-romaji' | ...
  courseId: string;             // 'n5' | 'n4'
  lessonNumber: number;
  questions: QuizQuestion[];    // Shuffled question list
  currentIndex: number;
  score: number;
  wrongItems: QuizQuestion[];   // For retry-wrong feature
  startTime: number;
  endTime?: number;
}
```

**Derived stores:** `isComplete`, `progress`, `currentQuestion`, `accuracy`

**Actions:** `startQuiz()`, `answerCorrect()`, `answerWrong()`, `endQuiz()`, `resetQuiz()`

### uiStore

```typescript
interface UIState {
  darkMode: boolean;
  showVirtualKeyboard: boolean;
  activeModal: string | null;
  breadcrumbs: string[];
}
```

## Data Layer

### File Organization

```
src/lib/data/
├── courses/
│   ├── index.ts           # Course registry: getCourse(), getAllCourses()
│   ├── n5/
│   │   ├── metadata.ts    # { id: 'n5', title, color, lessonCount }
│   │   └── lessons/       # → delegates to minna/lessons/
│   └── n4/
│       ├── metadata.ts
│       └── lessons/       # 25 lesson files
├── minna/
│   ├── lessons/
│   │   ├── lesson-01.ts ... lesson-25.ts
│   │   └── index.ts       # getLessonData(), getAllLessons(), getLessonMetadata()
│   └── grammar/
│       ├── metadata.ts
│       ├── comparisons.ts
│       └── index.ts
├── kanji/
│   └── lessons/
│       ├── kanji-lesson-01.ts ... kanji-lesson-25.ts
│       └── index.ts       # getKanjiLessonData(), getKanjiLessonMetadata()
└── hsk/
    ├── hsk5-a.ts ... hsk5-e.ts   # 5 groups (~320 words each)
    └── index.ts
```

### Adding a New Course

1. Create `src/lib/data/courses/<id>/metadata.ts`
2. Create lesson files in `src/lib/data/courses/<id>/lessons/`
3. Add to course registry in `src/lib/data/courses/index.ts`
4. Add `CourseId` type in `src/lib/types/course.ts`

### Adding Vocabulary to a Lesson

Follow the data rules in `AGENTS.md` or add the item manually:

```typescript
// src/lib/data/minna/lessons/lesson-XX.ts
{
  japanese: "食べる",
  kana: "たべる",
  vietnamese: "ăn",
  english: "to eat",
  type: "main",           // main | additional | kanji | supplementary
  example: "毎日ご飯を食べます。"
}
```

## Utility Modules

### audioUtils.ts
```typescript
playJapaneseAudio(text: string): void
// Uses Web Speech API (speechSynthesis)
// Guards against SSR (typeof window === 'undefined')
// Cancels previous utterance before speaking
// Rate: 0.8, Lang: ja-JP
```

### quizUtils.ts
```typescript
shuffleArray<T>(array: T[]): T[]           // Fisher-Yates shuffle
generateQuestions(vocab, direction, count?)  // Create quiz questions
generateMCOptions(answer, allItems, dir)    // 4 MC options (1 correct + 3 wrong)
checkAnswer(userAnswer, correct, isRomaji?) // Normalized comparison
normalizeString(str)                        // Trim + lowercase + strip spaces
calculateStats(correct, total)              // Score, grade (A-F), percentage
formatDuration(ms)                          // mm:ss format
```

### kanaUtils.ts
```typescript
kanaToRomaji(kana: string): string
// Handles: hiragana, katakana, small tsu (っ→double consonant),
// combo characters (きゃ→kya), long vowel (ー→-)
```

### courseUtils.ts
```typescript
buildLessonUrl(courseId, lessonNumber)       // includes ${base}
buildQuizUrl(courseId, mode, lesson, dir?)   // includes ${base}
buildVocabularyUrl(courseId, lessonNumber)   // includes ${base}
buildGrammarUrl(courseId, lessonNumber)      // includes ${base}
parseCourseFromUrl(searchParams)            // Extract courseId from ?course=
```

## Testing Strategy

### Unit Tests (Vitest, 523+ tests)

```
src/tests/
├── components/
│   ├── common/          # Button, Card, Modal, ProgressBar, BackButton
│   ├── grammar/         # GrammarCard, ComparisonCard
│   └── quiz/            # FlashCard, MultipleChoice, TypingQuiz, VirtualKeyboard
├── stores/              # quiz store, UI store
├── utils/               # quizUtils, grammarUtils
├── routes/              # Route-specific tests
├── __mocks__/           # $app/paths, $app/stores mocks
└── setup.ts             # Global test setup (localStorage, speechSynthesis)
```

### E2E Tests (Playwright)

```
src/tests/e2e/
├── home.spec.ts
├── alphabet.spec.ts
├── lesson-menu.spec.ts
├── quiz-flashcard.spec.ts
├── quiz-multiple-choice.spec.ts
├── quiz-typing.spec.ts
└── user-flows.spec.ts
```

### Test Conventions

- Mock `speechSynthesis` with both `speak` and `cancel`: `{ speak: vi.fn(), cancel: vi.fn() }`
- Guard browser APIs with `typeof window === 'undefined'`
- Use `VocabItem` type field: `'main'` (not `'kaiwa'` or other invalid values)
- Cast `QuizQuestion.item` to `VocabItem` when accessing `.japanese` (union type)

## Performance

- **No database/API** — all data is bundled TypeScript constants
- **Tree-shaking** — each lesson file is separately importable
- **Precompression** — `.br` and `.gz` files generated at build time
- **Static adapter** — zero server runtime
- **Total build size** — ~2MB uncompressed (mostly lesson data)
