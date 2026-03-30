# Brainstorming — When to Think Before Coding

Claude already knows how to brainstorm. This file defines **when it's mandatory** for Smart Quiz.

## Mandatory (Medium+ complexity)

- New course system features (new quiz mode, new language)
- Architecture changes (routing, state management, data layer)
- Cross-cutting concerns (theming, accessibility overhaul)

## Skip

- Bug fixes, UI tweaks, data additions, config changes

## Smart Quiz Decision Log

When brainstorming leads to a non-obvious decision, note it here so future sessions don't re-debate:

- **Offline-first**: FE always works standalone, Supabase is enhancement (not dependency)
- **Base path**: All navigation must use `${base}` — GitHub Pages deploys to `/2026-Smart-Quiz/`
- **TTS**: Always use `item.kana` (not `item.japanese`) to avoid double-reading kanji+kana
- **Quiz directions**: `ja-vi`, `vi-ja`, `vi-romaji` are user-facing. `ja-en`, `en-ja`, `ja-romaji` exist in types but hidden from UI
- **Dual branch**: `main` = GitHub Pages (stable), `v4-dev` = Vercel (preview). Feature branches from `v4-dev`
