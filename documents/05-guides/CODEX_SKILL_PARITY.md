# Codex Skill Parity Matrix

This matrix is the review checklist for the migration from the previous task-skill system to Codex.

## Trust Model

Do not treat this migration as correct because the files were renamed. Treat it as correct only if:

- Every previous active skill has an explicit Codex replacement.
- The replacement is discoverable from `AGENTS.md`.
- The replacement points to executable project scripts or concrete repository files.
- Verification commands pass in the PR.
- A pilot task after merge confirms the workflow in practice.

## Replacement Layers

| Layer | Purpose |
| --- | --- |
| `AGENTS.md` | Always-on Codex behavior, project conventions, architecture rules |
| `documents/05-guides/codex-playbooks/` | Task-specific playbooks replacing removed task skills |
| `.impeccable.md` | Product and design context |
| `documents/01-business/ui/rules.md` | UI business rules and design-system direction |
| `scripts/` | Canonical test, CI, quality, and deploy verification commands |

## Skill Mapping

| Previous skill area | Codex replacement | Parity status |
| --- | --- | --- |
| Skill index | `documents/05-guides/codex-playbooks/README.md` | Covered |
| Continue/session handoff | `AGENTS.md`, `engineering-workflow.md` | Covered |
| Brainstorming | `engineering-workflow.md` | Covered |
| Task breakdown | `engineering-workflow.md` | Covered |
| TDD enforcement | `engineering-workflow.md` | Covered |
| Systematic debugging | `engineering-workflow.md` | Covered |
| Two-stage code review | `engineering-workflow.md`, `ui-review.md` | Covered |
| Git/commit/PR workflow | `git-pr-workflow.md`, workflow scripts | Covered |
| SPA routing fixes | `spa-routing.md` | Covered |
| Add lesson | `lesson-data.md` | Covered |
| Add vocabulary to lesson | `lesson-data.md` | Covered |
| Add HSK content | `chinese-content.md` | Covered |
| Add Chinese section | `chinese-content.md` | Covered |
| Update HSK5 | `chinese-content.md` | Covered |
| OCR Chinese PDF | `ocr-content.md` | Covered |
| Refactor phase 1/2 | `refactor.md`, `engineering-workflow.md` | Covered |
| Frontend design main skill | `frontend-design.md`, `.impeccable.md`, UI rules | Covered |
| Frontend design commands | `frontend-design.md`, `ui-review.md` | Consolidated |
| Frontend design references | `.impeccable.md`, UI rules, `frontend-design.md` | Consolidated |
| Quality audit | `quality-audit.md`, `scripts/quality-audit.sh` | Covered |
| UI review | `ui-review.md` | Covered |
| Verify deploy | `verify-deploy.md` | Covered |
| Reference docs | Existing `documents/` tree and playbooks | Covered |
| Smart Quiz project notes | `AGENTS.md`, `README.md`, architecture docs | Covered |

## Quality Bar

The migration can preserve or improve output quality only through enforceable checks:

- `AGENTS.md` makes project conventions always visible.
- Playbooks are shorter and task-focused, reducing prompt drift.
- Workflow scripts remain the source of truth for verification.
- Shell scripts are pinned to LF through `.gitattributes`.
- Active files are checked for stale vendor-specific references.

## Verification

Run before merging:

```bash
rg -n "Claude|CLAUDE|\\.claude|claude" -S -g "!documents/07-archived/**" -g "!documents/04-quality/quality-audit-*.md" -g "!documents/05-guides/CODEX_MIGRATION.md" -g "!documents/05-guides/CODEX_SKILL_PARITY.md"
bash -n scripts/workflow/feature.sh scripts/workflow/fix.sh scripts/workflow/docs.sh scripts/workflow/test.sh scripts/workflow/update-skill-stats.sh scripts/quality-audit.sh scripts/check-ci.sh scripts/test-local.sh scripts/render-diagrams.sh scripts/pre-commit-check.sh
bash scripts/test-local.sh --quick
```

## Residual Risk

No migration can prove that one model will always produce output equal to or better than another model. What this PR can prove is that Codex receives equivalent project instructions, task playbooks, and verification gates. Quality still depends on using those gates on every task.
