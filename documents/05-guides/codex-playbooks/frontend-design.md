# Frontend Design Playbook

Use this before frontend UI work.

## Read First

- `PRODUCT.md`
- `DESIGN.md`
- `documents/01-business/ui/rules.md`

## Principles

- Content first: vocabulary, kanji, and grammar are the product.
- Use existing component patterns before adding new abstractions.
- Maintain responsive mobile study flows.
- Keep dark mode polished.
- Keep touch targets at least 44px.
- Preserve keyboard shortcuts in quiz flows.
- Use semantic HTML first, ARIA only when needed.

## Avoid

- Decorative-only layout work that obscures learning content.
- Hardcoded hex colors when tokens or CSS variables exist.
- Parallel button/card/modal systems.
- UI text that explains implementation details.

## Verification

For UI changes, run the project checks and manually inspect affected viewports.

```bash
./scripts/impeccable-audit.sh
./scripts/test-local.sh --quick
```
