# OCR Content Playbook

Use this when extracting Chinese or Japanese learning content from PDFs/images before adding it to app data.

## Rules

- Treat OCR output as untrusted draft text.
- Manually verify characters, pinyin/kana, Vietnamese meanings, and duplicates.
- Keep source notes in planning or archive docs when useful.
- Do not add OCR output directly to production data without normalization.

## Process

1. Extract text with the available OCR toolchain.
2. Normalize punctuation and whitespace.
3. Deduplicate against existing data.
4. Convert into typed lesson or HSK records.
5. Run data and build checks.

## Verification

```bash
./scripts/test-local.sh --quick
```
