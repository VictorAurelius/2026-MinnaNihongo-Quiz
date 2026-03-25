# Smart Quiz

Interactive language learning app for Japanese (JLPT N5/N4) and Chinese (HSK5).

**Live:** https://victoraurelius.github.io/2026-Smart-Quiz/

## Features

| Section | Content |
|---------|---------|
| **Minna no Nihongo N5** | 25 lessons, 1100+ vocabulary, grammar patterns |
| **JLPT N4** | 25 lessons, core vocabulary |
| **Kanji** | 256 kanji across 25 lessons, readings + examples |
| **HSK 5** | 1600+ Chinese words with pinyin |
| **Grammar Reference** | Searchable patterns, comparisons, examples |
| **Alphabet** | Interactive hiragana/katakana charts |
| **Counters** | Japanese counting systems |

### Quiz Modes

- **Flashcard** — flip to reveal answer, mark known/unknown
- **Multiple Choice** — 4 options, keyboard shortcuts 1-4
- **Typing** — type the answer (supports romaji with flexible matching)

### Directions

- JP → VN (see Japanese, answer Vietnamese)
- VN → JP (see Vietnamese, answer Japanese)
- VN → Romaji (see Vietnamese, type romaji reading)

## Quick Start

```bash
cd svelte-app
npm install
npm run dev        # http://localhost:5173
```

## Tech Stack

- **SvelteKit 2** + TypeScript + Vite
- **Static adapter** (GitHub Pages SPA with 404.html fallback)
- **Vitest** (523+ unit tests) + **Playwright** (E2E)
- **PWA** with offline support

## Project Structure

```
svelte-app/src/
├── routes/                 # Pages (course, quiz, kanji, hsk, etc.)
├── lib/
│   ├── components/         # 17 Svelte components
│   ├── data/               # Lesson data (93 TypeScript files)
│   ├── types/              # TypeScript interfaces
│   ├── utils/              # Quiz logic, TTS, kana conversion
│   └── stores/             # Quiz state, UI state
└── tests/                  # Unit + E2E tests
```

## Documentation

| Doc | Purpose |
|-----|---------|
| [CLAUDE.md](CLAUDE.md) | Project conventions, patterns, pitfalls |
| [docs/QUICKSTART.md](docs/QUICKSTART.md) | Setup guide |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System design |
| [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) | How to contribute |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Deploy to GitHub Pages / Vercel / Netlify |
| [docs/CHANGELOG.md](docs/CHANGELOG.md) | Version history |

## Scripts

```bash
npm run dev           # Dev server
npm run build         # Production build
npm test              # Unit tests
npx playwright test   # E2E tests
npm run check         # TypeScript check
```

## License

MIT
