# UI Review Playbook

Use this for frontend review, polish, and accessibility checks.

## Review Areas

- Layout: no overlapping content, stable dimensions, usable mobile layout.
- Typography: readable Japanese/Chinese text, no viewport-width font scaling.
- Interaction: clear focus states, hover/pressed/disabled states.
- Accessibility: semantic controls, labels, WCAG 2.1 AA contrast.
- Motion: respects `prefers-reduced-motion`.
- Quiz ergonomics: F1, Space, Enter, and 1-4 shortcuts still work.

## Output

When reviewing, list findings first by severity with file references. If no issues are found, state that and mention residual test gaps.

## Verification

Run:

```bash
./scripts/impeccable-audit.sh
./scripts/test-local.sh --quick
```
