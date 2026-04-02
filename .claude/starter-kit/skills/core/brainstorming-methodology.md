# Brainstorming — When to Think Before Coding

Claude already knows how to brainstorm. This file defines **when it's mandatory** and records **decisions already made**.

## Mandatory (Medium+ complexity)

- New features touching multiple modules
- Architecture changes (routing, state, data layer)
- Cross-cutting concerns (theming, auth, i18n)

## Skip

- Bug fixes, UI tweaks, data additions, config changes

## {project} Decision Log

When brainstorming leads to a non-obvious decision, note it here so future sessions don't re-debate:

<!-- Add project-specific decisions here. Examples: -->
<!-- - **Offline-first**: FE always works standalone, backend is enhancement -->
<!-- - **Base path**: All navigation must use `${base}` for deployment -->
<!-- - **Dual branch**: main = production, develop = preview -->
