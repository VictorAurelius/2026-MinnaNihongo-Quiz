# Smart Quiz Codex Instructions

## Communication

- Reply to the user in Vietnamese.
- Keep code, commit messages, branch names, PR titles, and PR bodies in English.
- Be direct and pragmatic. Prefer making the change and verifying it over giving only a proposal.

## Project Overview

Smart Quiz is an offline-first bilingual language learning SPA built with SvelteKit 2, Svelte 5, TypeScript, Vite, Vitest, and Playwright.

The app covers:

- Japanese: Minna no Nihongo N5/N4 lessons, vocabulary, grammar, kanji, quizzes.
- Chinese: HSK5 vocabulary with pinyin.
- Quiz modes: flashcard, multiple choice, typing.

Live production site: https://victoraurelius.github.io/2026-Smart-Quiz/

## Required Workflow

For medium or larger tasks:

1. Understand the user request and inspect the relevant files first.
2. Break the work into small, testable steps.
3. Prefer TDD when changing behavior: add or update tests before implementation when practical.
4. Keep edits scoped to the requested behavior.
5. Run the project scripts listed below before reporting completion.
6. For frontend changes, review the UI against `.impeccable.md` and `documents/01-business/ui/rules.md`.

Do not:

- Commit directly to `main` unless the user explicitly asks for a critical hotfix.
- Push untested code.
- Replace project scripts with ad-hoc commands when an approved script exists.
- Revert user changes or unrelated work.

## Scripts

Use project scripts for verification:

| Task | Use | Avoid |
| --- | --- | --- |
| Full local test | `./scripts/test-local.sh` | Running individual tools directly as the final check |
| Quick local test | `./scripts/test-local.sh --quick` | `npx vite build` alone |
| CI status | `./scripts/check-ci.sh --status` | Direct `gh run list` as the only check |
| Wait for CI | `./scripts/check-ci.sh` | Direct `gh run watch` as the only check |
| Quality audit | `./scripts/quality-audit.sh` | Manual grep/count audits |
| Render diagrams | `./scripts/render-diagrams.sh` | Manual Java/Mermaid commands |

The app commands still live in `svelte-app`:

```bash
cd svelte-app
npm run dev
npm run build
npm test
npx playwright test
```

## Git Workflow

- `main`: production branch for GitHub Pages.
- `v4-dev`: development/preview branch.
- Feature branches should be created from `v4-dev` unless the user asks otherwise.
- Branch prefixes: `feat/`, `fix/`, `docs/`, `test/`, `chore/`.
- Commit format: conventional commits, for example `feat(quiz): add retry summary`.
- Feature PRs merge into `v4-dev`.
- Stable release waves merge from `v4-dev` into `main` after audit passes.

## Architecture Rules

### Offline First

Core learning flows must work without network or backend access. Supabase or external services are enhancements only.

Relevant docs:

- `documents/02-architecture/DEPLOYMENT_STRATEGY.md`
- `documents/02-architecture/OFFLINE_FIRST_ARCHITECTURE.md`

### Routing And Base Path

Production deploys to GitHub Pages at `/2026-Smart-Quiz/`. All internal navigation must include SvelteKit's `base` path.

```typescript
import { base } from '$app/paths';
goto(`${base}/course/n5/lesson/1`);
```

Avoid:

```typescript
goto('/course/n5/lesson/1');
```

Checklist:

- `goto()` uses `${base}`.
- `redirect()` in `+page.ts` uses `${base}`.
- `<a href>` uses `{base}` for internal absolute paths.
- Prefer `courseUtils.ts` URL builders when available.

### Data Pattern

Each lesson is a separate TypeScript file exporting a typed constant. Central indexes re-export lesson data and provide lookup helpers.

When adding vocabulary:

- Use valid `VocabItem.type` values only: `main`, `additional`, `kanji`, `supplementary`.
- Do not introduce `"kaiwa"` or other values outside the union.
- Keep Japanese display text, kana reading, Vietnamese, English, and examples consistent.

### Quiz Components

Quiz components are direction-aware. Pass computed `questionText` and `answerText` props instead of deriving direction inside leaf components.

State must reset when the question or answer changes because Svelte can reuse component instances.

### TTS

Use `playJapaneseAudio()` from `$lib/utils/audioUtils`.

- Prefer `item.kana || item.japanese`.
- Avoid passing `item.japanese` when it contains kanji plus kana, because speech synthesis may read duplicated text.
- Guard browser APIs with `typeof window`.

### Answer Normalization

Use `checkAnswer()` from `$lib/utils/quizUtils`.

Romaji mode should preserve the existing flexible matching for pairs such as `shi/si`, `chi/ti`, `tsu/tu`, and `fu/hu`.

## Frontend Guidance

Before UI changes, review:

- `.impeccable.md`
- `documents/01-business/ui/rules.md`

UI expectations:

- Content first: vocabulary, kanji, and grammar are the product.
- Maintain WCAG 2.1 AA accessibility.
- Preserve keyboard shortcuts: F1 for speech, Space/Enter for flashcards, 1-4 for multiple choice.
- Support responsive mobile study sessions.
- Respect dark mode and `prefers-reduced-motion`.

## Living Documents

Update these when the work changes their subject:

| Document | Update When |
| --- | --- |
| `AGENTS.md` | Project conventions or agent workflow changes |
| `documents/05-guides/CHANGELOG.md` | Version release |
| `documents/03-planning/FEATURE_ROADMAP.md` | Feature added or completed |
| `documents/03-planning/PR_PLAN_V4.md` | PR implementation status changes |
| `documents/04-quality/quality-audit-*.md` | Quality audit output is saved |

## Common Pitfalls

1. GitHub Pages 404: missing `${base}` in navigation.
2. TTS reads twice: `item.japanese` used instead of `item.kana`.
3. Quiz state leaks between questions: component local state was not reset reactively.
4. `window is not defined`: browser APIs used without SSR/test guards.
5. Invalid vocabulary type: use `"supplementary"` instead of `"kaiwa"`.
