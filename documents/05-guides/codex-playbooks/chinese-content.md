# Chinese Content Playbook

Use this when adding or updating HSK vocabulary or Chinese learning sections.

## Files

- HSK data: `svelte-app/src/lib/data/hsk/`
- HSK routes: `svelte-app/src/routes/hsk/`
- Shared lesson/data types: `svelte-app/src/lib/types/`

## Rules

- Preserve existing HSK group structure.
- Keep Chinese text, pinyin, Vietnamese, and English aligned.
- Avoid duplicate vocabulary unless the existing data model explicitly supports it.
- Keep offline-first behavior; do not require network access for core study flows.
- Add or update tests when data shape or UI behavior changes.

## Verification

Run:

```bash
./scripts/test-local.sh --quick
```
