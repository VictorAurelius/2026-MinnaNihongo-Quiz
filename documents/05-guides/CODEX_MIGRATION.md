# Codex Migration

This project has migrated from Claude-specific project configuration to Codex-oriented repository instructions.

## Current Source Of Truth

- `AGENTS.md`: project conventions, workflow, architecture rules, and Codex operating instructions.
- `.impeccable.md`: product and UI design context.
- `documents/01-business/ui/rules.md`: UI rules and component guidance.
- `scripts/`: canonical local verification, CI, quality, and diagram scripts.

## Removed Claude-Specific State

The migration removes:

- `CLAUDE.md`
- `.claude/`
- Claude-specific commit trailers in workflow scripts
- Claude-specific PR body footers in workflow scripts
- Quality audit dependency on `CLAUDE.md`

## Mapping

| Previous Claude File Or Concept | Codex Replacement |
| --- | --- |
| `CLAUDE.md` | `AGENTS.md` |
| `.claude/settings.local.json` | Codex sandbox and approval flow |
| `.claude/skills/core/*` | Workflow rules in `AGENTS.md` |
| `.claude/skills/frontend-design/*` | `.impeccable.md` and `documents/01-business/ui/rules.md` |
| `.claude/skills/git-pr-workflow.md` stats | `documents/05-guides/CODEX_WORKFLOW_STATS.md` |
| Claude-generated PR footer | Smart Quiz workflow script footer |

## Migration Checks

After changing this migration, run:

```bash
rg -n "Claude|CLAUDE|\\.claude|claude" -S -g "!documents/07-archived/**" -g "!documents/04-quality/quality-audit-*.md" -g "!documents/05-guides/CODEX_MIGRATION.md"
./scripts/test-local.sh --quick
```

Historical references can remain in archived reports when they describe past work, but active workflow files should use Codex terminology.
