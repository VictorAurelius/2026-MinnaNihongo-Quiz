# Quality Audit Playbook

Use this before release, large PRs, or quality-focused work.

## Command

```bash
./scripts/quality-audit.sh
```

To save a report:

```bash
./scripts/quality-audit.sh --save
```

Reports are stored in `documents/04-quality/`.

## Areas Covered

- Unit/component tests
- Build and TypeScript checks
- SPA routing
- Quiz logic
- TTS audio rules
- CI/CD status
- UI/UX indicators
- Data quality
- Documentation
- Code quality

## Rule

Do not claim the audit passed unless the script completed and the score is known.
