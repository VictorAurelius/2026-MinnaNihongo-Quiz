# Refactor Playbook

Use this when restructuring code without changing intended behavior.

## Rules

- Preserve public behavior and routes.
- Keep commits focused by ownership area.
- Avoid unrelated style churn.
- Move code only when the new location matches existing project boundaries.
- Keep data exports and imports stable unless the refactor explicitly updates them.

## Process

1. Identify current behavior and tests that protect it.
2. Add missing characterization tests for risky logic.
3. Make one structural change at a time.
4. Run focused checks after each meaningful step.
5. Run the standard verification before completion.

## Verification

```bash
./scripts/test-local.sh --quick
```

For broad refactors:

```bash
./scripts/test-local.sh
```
