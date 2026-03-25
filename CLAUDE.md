# CLAUDE.md — Project Conventions for Smart Quiz

## Communication Language

Giao tiếp bằng **tiếng Việt**. Code, commit messages, PR titles/bodies giữ tiếng Anh.

## Development Workflow — Superpowers Methodology

Mỗi PR tuân theo quy trình:

1. **Brainstorm** → `.claude/skills/core/brainstorming-methodology.md`
2. **Task Breakdown** → `.claude/skills/core/task-breakdown-guide.md`
3. **TDD** → `.claude/skills/core/tdd-enforcement.md` (viết test TRƯỚC code)
4. **Implementation** → Theo patterns bên dưới
5. **Self-test** → `./scripts/test-local.sh` (BẮT BUỘC trước push)
6. **Push + CI** → `./scripts/check-ci.sh`
7. **Code Review** → `.claude/skills/core/two-stage-code-review.md`

**KHÔNG BAO GIỜ:**
- Chạy lệnh ad-hoc thay scripts (xem bảng Scripts bên dưới)
- Push code chưa test local
- Kết luận CI pass/fail khi đang in_progress
- Code trước khi brainstorm (Medium+ complexity)

## Scripts (PHẢI dùng, KHÔNG lệnh ad-hoc)

| Việc | Script | KHÔNG dùng |
|------|--------|------------|
| Test local | `./scripts/test-local.sh` | `npx vitest run` trực tiếp |
| Test nhanh | `./scripts/test-local.sh --quick` | `npx vite build` trực tiếp |
| CI status | `./scripts/check-ci.sh --status` | `gh run list` trực tiếp |
| CI đợi | `./scripts/check-ci.sh` | `gh run watch` trực tiếp |
| Quality audit | `./scripts/quality-audit.sh` | Chạy từng lệnh grep/count |

## Git Workflow (Main-Only)

- **Main branch:** `main` (auto-deploy GitHub Pages)
- **Feature branches:** `feat/`, `fix/`, `docs/`, `test/`, `chore/`
- **Commit convention:** `<type>(<scope>): <subject>` (conventional commits)
- **Merge:** Tạo PR → CI green → merge → delete branch
- **KHÔNG commit trực tiếp lên main** (trừ docs/config nhỏ)

## Living Documents

| Document | Update khi |
|----------|-----------|
| `CLAUDE.md` | Thêm pattern/convention mới |
| `documents/05-guides/CHANGELOG.md` | Mỗi version release |
| `documents/03-planning/FEATURE_ROADMAP.md` | Thêm/hoàn thành feature |
| `documents/03-planning/PR_PLAN_V4.md` | Implement xong PR → đánh ✅ |
| `documents/04-quality/quality-audit-*.md` | Chạy audit script |

## Project Overview

Smart Quiz is a bilingual language learning SPA built with SvelteKit 2 + TypeScript. It covers Japanese (Minna no Nihongo N5/N4, 50 lessons) and Chinese (HSK5, 1600+ words), with kanji reference, grammar comparison, and multiple quiz modes.

**Live site:** https://victoraurelius.github.io/2026-Smart-Quiz/

## Quick Commands

```bash
cd svelte-app
npm run dev          # Dev server at localhost:5173
npm run build        # Build (includes cp build/index.html build/404.html for SPA fallback)
npm test             # Run unit tests (vitest)
npx playwright test  # Run E2E tests
```

## Architecture

```
svelte-app/src/
├── routes/                    # SvelteKit file-based routing
│   ├── course/[courseId]/     # Multi-course system (n5, n4)
│   │   └── lesson/[id]/      # Lesson menu, vocabulary, grammar
│   ├── quiz/[mode]/           # Quiz player (flashcard, mc, typing)
│   ├── kanji/[lesson]/        # Kanji section (separate from courses)
│   ├── hsk/[group]/           # HSK Chinese vocabulary
│   └── results/               # Quiz results page
├── lib/
│   ├── components/            # Svelte components
│   │   ├── common/            # Button, Card, Modal, ProgressBar, BackButton
│   │   ├── quiz/              # FlashCard, MultipleChoice, TypingQuiz, VirtualKeyboard
│   │   ├── kanji/             # KanjiFlashCard, KanjiMultipleChoice, KanjiTypingQuiz
│   │   ├── grammar/           # GrammarCard, ComparisonCard, modals
│   │   └── layout/            # Header
│   ├── data/                  # All lesson/vocabulary data (TypeScript)
│   │   ├── courses/           # Course registry (n5, n4) + per-course data
│   │   ├── minna/lessons/     # 25 Minna no Nihongo lesson files
│   │   ├── kanji/lessons/     # 25 kanji lesson files (256 kanji)
│   │   └── hsk/               # HSK5 vocabulary (5 groups, 1600+ words)
│   ├── types/                 # TypeScript interfaces
│   ├── utils/                 # Utility functions
│   ├── stores/                # Svelte stores (quiz state, UI state, progress)
│   └── constants/             # App constants
└── tests/                     # Vitest unit + Playwright E2E
```

## Key Patterns

### Routing — Base Path Required

This app deploys to GitHub Pages at `/2026-Smart-Quiz/`. All navigation MUST include the base path.

```typescript
// ✅ CORRECT
import { base } from '$app/paths';
goto(`${base}/course/n5/lesson/1`);

// ❌ WRONG — causes 404 on GitHub Pages
goto('/course/n5/lesson/1');
```

**Checklist (see `.claude/skills/fix-spa-routing.md`):**
- Every `goto()` must use `${base}`
- Every `redirect()` in `+page.ts` must use `${base}`
- Every `<a href>` must use `{base}`
- `courseUtils.ts` functions (`buildLessonUrl`, `buildQuizUrl`, etc.) already include `base`

### Data Pattern — One File Per Lesson

Each lesson is a separate TypeScript file exporting a constant:

```typescript
// src/lib/data/minna/lessons/lesson-01.ts
export const LESSON_01_DATA: LessonData = {
  lessonNumber: 1,
  title: "わたしは ～です",
  vocabulary: [...],
  grammar: [...]
};
```

Central index re-exports all + provides `getLessonData(n)`, `getAllLessons()`, `getLessonMetadata()`.

### Course System

```typescript
// src/lib/types/course.ts
type CourseId = 'n5' | 'n4';

// src/lib/data/courses/index.ts
getCourse(courseId)     // Get course by ID
getAllCourses()         // List all courses
```

Adding a new course: create data files in `data/courses/<id>/`, add metadata, register in `index.ts`.

### Quiz Components — Direction-Aware

Quiz components accept `questionText` and `answerText` props (computed from direction):

```svelte
<FlashCard
  item={$currentQuestion.item}
  questionText={$currentQuestion.question}
  answerText={$currentQuestion.answer}
/>
```

Available directions: `ja-vi`, `vi-ja`, `vi-romaji` (+ `ja-en`, `en-ja`, `ja-romaji` in types but hidden from UI).

### TTS Audio

```typescript
import { playJapaneseAudio } from '$lib/utils/audioUtils';
playJapaneseAudio(item.kana || item.japanese);  // Use kana to avoid double-reading
```

Always use `item.kana` for TTS (not `item.japanese`) to avoid reading kanji + kana together.

### Answer Normalization

```typescript
import { checkAnswer } from '$lib/utils/quizUtils';
checkAnswer(userInput, correctAnswer, isRomaji);
```

- Normal mode: strips spaces, lowercase
- Romaji mode: also handles `shi/si`, `chi/ti`, `tsu/tu`, `fu/hu`, strips `-` (long vowel)

## Type System

### Core Types (src/lib/types/lesson.ts)

```typescript
interface VocabItem {
  japanese: string;    // Display text (may include kanji)
  kana: string;        // Reading in hiragana/katakana
  vietnamese: string;
  english: string;
  type: 'main' | 'additional' | 'kanji' | 'supplementary';
  example?: string;
}

interface KanjiItem {
  character: string;   // Single kanji
  onyomi: string[];    // On'yomi readings
  kunyomi: string[];   // Kun'yomi readings
  strokeCount: number;
  jlpt: number;        // 5 or 4
  vietnamese: string;  // Hán Việt reading
  english: string;
  examples: KanjiExampleWord[];
}

type QuizDirection = 'ja-vi' | 'vi-ja' | 'ja-en' | 'en-ja' | 'ja-romaji' | 'vi-romaji';
type QuizMode = 'flashcard' | 'multiple-choice' | 'typing';
```

## Testing

- **Unit tests:** `npx vitest run` (523+ tests)
- **E2E tests:** `npx playwright test --project=chromium`
- **Test files:** `src/tests/` mirrors `src/lib/` structure
- **Mock speechSynthesis:** always include `cancel: vi.fn()` in mock

```typescript
Object.defineProperty(window, 'speechSynthesis', {
  value: { speak: vi.fn(), cancel: vi.fn() },
  writable: true
});
```

## Keyboard Shortcuts (Quiz)

| Key | FlashCard | Multiple Choice | Typing |
|-----|-----------|-----------------|--------|
| F1 | Speak | Speak | Speak |
| Space | Flip card | — | — |
| Enter | Flip card | — | Submit / Next |
| 1-4 | — | Select option | — |

## Deployment

- **GitHub Pages:** auto-deploy via `.github/workflows/deploy.yml` on push to `main`
- **SPA fallback:** `build/404.html` = copy of `index.html` (handles client-side routing)
- **Base path:** `/2026-Smart-Quiz` in production, empty in dev

## Common Pitfalls

1. **404 on GitHub Pages** — forgot `${base}` in `goto()` or `redirect()`
2. **TTS reads twice** — used `item.japanese` instead of `item.kana` for TTS
3. **Quiz component state not resetting** — Svelte reuses component instances; need reactive reset when props change
4. **`window is not defined`** — accessing browser APIs without `typeof window` guard in SSR/test
5. **VocabItem type `"kaiwa"`** — not in the union type, use `"supplementary"` instead
