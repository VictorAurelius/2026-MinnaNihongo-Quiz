<div align="center">

# 🎌 Smart Quiz

### Free, offline-first app to master **Japanese (JLPT)** & **Chinese (HSK)**

Flashcards · quizzes · mock exams · kanji · spaced repetition — no account, no ads, works offline.

[![Live Demo](https://img.shields.io/badge/▶_Try_it-live-brightgreen?style=for-the-badge)](https://victoraurelius.github.io/2026-Smart-Quiz/)
&nbsp;
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

![SvelteKit](https://img.shields.io/badge/SvelteKit-2-FF3E00?logo=svelte&logoColor=white)
![Svelte 5](https://img.shields.io/badge/Svelte-5-FF3E00?logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-installable-5A0FC8?logo=pwa&logoColor=white)
![Tests](https://img.shields.io/badge/tests-973%20passing-success?logo=vitest&logoColor=white)

**[▶ Open the live app](https://victoraurelius.github.io/2026-Smart-Quiz/)** — installable, works offline.

</div>

---

## Why Smart Quiz?

- 🆓 **100% free & open source** — no account, no ads, no paywall on the core.
- 📴 **Offline-first PWA** — install it and study on the train; nothing needs a server.
- 📚 **Content-first** — real JLPT/HSK vocabulary, kanji with stroke order, grammar, and **full mock exams**.
- 🧠 **Smart review** — built-in **SM-2 spaced repetition** with leech detection schedules what you keep forgetting.
- 🇻🇳 **Vietnamese-friendly** — Japanese/Chinese ↔ Vietnamese directions throughout.
- ⚡ **Fast & accessible** — prerendered pages, WCAG-AA contrast, full keyboard control, dark mode.

## ✨ Features

| Area | What's inside |
|------|---------------|
| **Japanese — Minna no Nihongo** | N5 & N4 lessons: 1,100+ vocabulary, grammar patterns, examples |
| **Kanji** | N5–N1 kanji with readings, stroke order, examples & quiz-by-radical |
| **Grammar** | Searchable reference: patterns, comparisons, example sentences |
| **JLPT Mock Exams** 🆕 | `/exams` — timed N5→N1 papers (vocab · grammar · reading) with JLPT-style scoring + per-question review |
| **HSK 5 (Chinese)** | 1,600+ words with pinyin |
| **Conversations** | 110 dialogue patterns with memory tips (N1–N5) |
| **Alphabet & Counters** | Interactive hiragana/katakana charts, Japanese counting systems |

### Quiz modes
- **Flashcard** — flip to reveal, mark known/unknown
- **Multiple choice** — 4 options, keyboard shortcuts `1`–`4`
- **Typing** — type the answer (flexible romaji matching: `shi/si`, `tsu/tu`, …)

### Directions
`JP → VN` · `VN → JP` · `VN → Romaji` — practise recognition and recall both ways.

### Spaced repetition (SRS)
`/review` schedules reviews with the **SM-2** algorithm, grades answers by recall speed, and flags **leeches** (items you keep failing) so you can focus where it matters.

## 🚀 Quick start

```bash
cd svelte-app
npm install
npm run dev        # → http://localhost:5173
```

```bash
npm run build      # static production build (GitHub Pages SPA + 404 fallback)
npm test           # Vitest unit/component tests
npm run check      # svelte-check (TypeScript)
npx playwright test  # E2E
```

## 🧰 Tech stack

**SvelteKit 2** · **Svelte 5** (runes) · **TypeScript** (strict) · **Vite** · **Tailwind CSS 4** + shadcn-style UI · **adapter-static** (prerendered + SPA fallback) · **vite-plugin-pwa** (offline) · **Vitest** (973 tests) + **Playwright** (E2E).

> Exam papers are **static, committed data** generated at build time by a source-agnostic pipeline (`scripts/fetch-exams/`) — so the app stays fully offline with no backend.

## 📂 Project structure

```
svelte-app/src/
├── routes/      # pages: course, quiz, kanji, hsk, exams, review, stats …
├── lib/
│   ├── components/   # Svelte components (incl. shadcn-style ui/)
│   ├── data/         # lesson / kanji / hsk / exam data (TypeScript)
│   ├── utils/        # quiz logic, SRS, TTS, scoring, kana conversion
│   └── stores/       # quiz + UI state
└── tests/       # unit + component + E2E
scripts/fetch-exams/  # build-time exam-paper pipeline (open-licensed sources)
```

## 📖 Documentation

| Doc | Purpose |
|-----|---------|
| [Quick start](documents/05-guides/QUICKSTART.md) | Local setup |
| [Architecture](documents/02-architecture/ARCHITECTURE.md) | System design |
| [Contributing](documents/05-guides/CONTRIBUTING.md) | How to contribute |
| [Deployment](documents/05-guides/DEPLOYMENT.md) | GitHub Pages / Vercel / Netlify |
| [Changelog](documents/05-guides/CHANGELOG.md) | Version history |

## 🤝 Contributing

Contributions are very welcome — vocabulary, kanji, grammar, exam papers, bug fixes, UI. See **[CONTRIBUTING](documents/05-guides/CONTRIBUTING.md)**. Adding content is just editing typed data files; the [exam pipeline README](svelte-app/scripts/fetch-exams/README.md) explains how to plug in new (open-licensed) question sources.

## 📜 License

[MIT](LICENSE) — free to use, modify, and share. Exam content is generated from open-licensed sources (e.g. the MIT-licensed [open-anki-jlpt-decks](https://github.com/jamsinclair/open-anki-jlpt-decks)); original sample papers are CC-friendly. Please respect third-party licenses when adding sources.

---

<div align="center">

**If Smart Quiz helps you study, please ⭐ the repo — it helps others find it!**

[▶ Live app](https://victoraurelius.github.io/2026-Smart-Quiz/) · [Report a bug](https://github.com/VictorAurelius/2026-Smart-Quiz/issues) · 頑張って！🎌

</div>
