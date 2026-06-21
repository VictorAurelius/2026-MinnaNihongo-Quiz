# `fetch-exams` — build-time exam-paper pipeline

A **source-agnostic, build-time** pipeline that produces the static exam data for
the "làm đề" (mock JLPT) feature. It runs locally/in CI, validates everything,
and regenerates the typed data module the UI reads. No runtime backend — the app
stays fully offline-first.

```
source adapter ──▶ fetchPaperList() ──▶ fetchAndParse(ref) ──▶ validate ──▶ generate
   (fixture | http)        PaperRef[]            ExamPaper            (fail on            papers.ts
                                                                      any issue)
```

## Quick start

```bash
cd svelte-app
npm run fetch-exams            # default --source=fixture → regenerates src/lib/data/exams/papers.ts
npm run fetch-exams -- --dry-run   # fetch + validate only, do NOT write
node scripts/fetch-exams/fetch-exams.js --help
```

The generated `src/lib/data/exams/papers.ts` is **machine-owned** (DO NOT EDIT by
hand). The UI imports only from `src/lib/data/exams/index.ts`, never the data
file directly, so the data layer and UI stay decoupled.

## Layout

| File | Role |
|------|------|
| `fetch-exams.js` | Orchestrator / CLI. Picks a source, runs it, validates, regenerates. |
| `validate.js` | Pure validator (`validatePaper` / `validatePapers`). The fail-gate. |
| `generate.js` | Renders the validated papers into `papers.ts` (sorted N5→N1). |
| `sources/types.js` | The `ExamSourceAdapter` + `PaperRef` contract (JSDoc). |
| `sources/fixture.js` | Local, no-network source — parses `fixtures/*.json` → `ExamPaper`. |
| `sources/example-http.js` | Template for a real HTTP source (good-citizen demo). |
| `sources/index.js` | Registry mapping `--source=<name>` → adapter. |
| `http.js` `robots.js` `cache.js` | Good-citizen HTTP layer (see below). |
| `fixtures/*.json` | Committed original sample papers (one+ per level). |
| `.cache/` | Raw-response cache for HTTP sources (git-ignored). |

## CLI options

| Flag | Default | Notes |
|------|---------|-------|
| `--source=<name>` | `fixture` | Registered sources: `fixture`, `example-http`. |
| `--delay=<ms>` | `1000` | Min delay between live HTTP requests (HTTP sources only). |
| `--user-agent=<str>` | built-in bot UA | Override the bot User-Agent (HTTP sources only). |
| `--dry-run` | off | Fetch + validate, but don't write `papers.ts`. |
| `--help` | — | Usage. |

The pipeline exits **non-zero** if any paper fails validation, and never writes a
partial/invalid `papers.ts`.

## Validation rules (`validate.js`)

Each `ExamPaper` must satisfy:

- non-empty `sections`; every section has **≥1 question**;
- every question: non-empty `prompt`, **≥2 non-empty options**, an **integer
  `answerIndex` within `0..options.length-1`**;
- a question's `passageId` (if present) **resolves to a passage in its own
  section**, and only `reading` sections may carry passage-linked questions;
- structural sanity: non-empty `id`/`title`, valid `level` (N5–N1), positive
  `durationMinutes`, present `source.name`; question ids unique within a paper;
  paper ids unique across the set.

The validator is a pure function (no I/O, no throw) — unit-tested in
`src/tests/exam-pipeline/validate.test.ts`.

## The fixture source

`sources/fixture.js` reads local `fixtures/*.json` so the whole pipeline is
runnable and testable today with **no network**. The fixture authoring format is
intentionally lighter than the runtime `ExamPaper`, so the adapter does real
parse work:

- a question's correct answer may be given as the option **string** (`"answer":
  "とうきょう"`) or a 0-based **index** (`"answer": 1` / `"answerIndex": 1`) — the
  adapter computes `answerIndex`;
- question/passage `id`s may be omitted — the adapter generates stable ids
  (`<paperId>-s<n>-q<n>`, `<paperId>-s<n>-<passageKey>`);
- a reading question references a passage by a local `passage` **key**, which the
  adapter rewrites to the generated global `passageId`.

Fixtures ship one or more **original** sample papers for **every level N5→N1**
(`source.license: "original"`). They are short, hand-authored samples — not
copies of real exams (see the legal caveat).

## Adding a real source adapter

A real public-site source is a plug-in: implement `ExamSourceAdapter`
(`sources/types.js`) and register it in `sources/index.js`. Use
`sources/example-http.js` as the template.

```js
// sources/my-source.js
import { politeFetch, assertAllowed } from '../http.js';

/** @returns {import('./types.js').ExamSourceAdapter} */
export function createMySource(opts = {}) {
  return {
    name: 'my-source',
    license: 'CC-BY-4.0',                 // the source's actual license — verify it!
    async fetchPaperList() {
      const url = 'https://example.org/exams/index.json';
      await assertAllowed(url, opts);     // robots.txt check
      const body = await politeFetch(url, opts);
      return JSON.parse(body).map((e) => ({ id: e.id, level: e.level, title: e.title, url: e.url }));
    },
    async fetchAndParse(ref) {
      await assertAllowed(ref.url, opts);
      const body = await politeFetch(ref.url, opts);  // cached + rate-limited
      return /* parse `body` (HTML/JSON) into an ExamPaper */;
    }
  };
}
```

```js
// sources/index.js — register it
const REGISTRY = {
  fixture: (ctx) => createFixtureAdapter({ fetchedAt: ctx.fetchedAt }),
  'my-source': (ctx) => createMySource({ delayMs: ctx.delayMs, userAgent: ctx.userAgent })
};
```

Then: `npm run fetch-exams -- --source=my-source`. Validation runs unchanged, so
your parsed papers must satisfy the same rules.

## Good-citizen HTTP behavior

Real sources route every request through `http.js`, which gives you, for free:

- **robots.txt** — `assertAllowed(url)` fetches + honors the site's robots.txt
  for our User-Agent (per-UA groups, `Allow`/`Disallow`, longest-match,
  `*`/`$` wildcards). Fetching a disallowed path throws.
- **Rate-limit** — `politeFetch` waits at least `--delay` ms (default 1000)
  between live requests.
- **User-Agent** — an identifying bot UA is sent on every request (overridable
  via `--user-agent`).
- **Raw-response cache** — bodies are cached under `.cache/<sha256(url)>` (this
  directory is git-ignored) so re-runs do **not** re-hit the remote site.

The fixture source bypasses all of this (local files only).

## ⚠️ Legal caveat — read before adding a source

JLPT past papers and most commercial prep materials are **copyrighted**. Only
fetch from sources whose **license or Terms of Service explicitly permit reuse**:

- **open-licensed** datasets (e.g. CC-BY / CC-BY-SA — keep the attribution);
- **official sample questions** published for free reuse by the JLPT bodies;
- **your own original** content (like the bundled fixtures).

**Never scrape copyrighted past papers**, paywalled material, or any site whose
ToS forbids automated access — even if technically reachable. Every `ExamPaper`
carries a required `source` (`name` / `url` / `license`) so provenance stays
traceable; set `license` honestly. When in doubt, don't fetch it.
