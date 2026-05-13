# Lesson Data Playbook

Use this when adding or updating Japanese lesson vocabulary, grammar, or kanji content.

## Files

- N5 lesson data: `svelte-app/src/lib/data/minna/lessons/lesson-XX.ts`
- N4 lesson data: `svelte-app/src/lib/data/courses/n4/lessons/`
- Lesson indexes: `svelte-app/src/lib/data/**/index.ts`
- Types: `svelte-app/src/lib/types/lesson.ts`

## Rules

- Preserve the one-file-per-lesson pattern.
- Keep exports named consistently, for example `LESSON_01_DATA`.
- Use valid `VocabItem.type` values only: `main`, `additional`, `kanji`, `supplementary`.
- Do not use `"kaiwa"`.
- Include `japanese`, `kana`, `vietnamese`, `english`, and `type` for vocabulary.
- Prefer kana for TTS paths.
- Keep examples short and relevant to the lesson.

## Verification

Run:

```bash
./scripts/test-local.sh --quick
```

For larger data changes, also run:

```bash
./scripts/quality-audit.sh
```
