# Code Fix Suggestions — Guidelines

When the review identifies issues, provide **actionable code fixes** using the project's actual stack.

## Project Stack

- **Framework**: SvelteKit 2 + Svelte 4
- **Styling**: Tailwind CSS v4 + design tokens (`app.css`)
- **Components**: shadcn-svelte
- **Icons**: lucide-svelte
- **Language**: TypeScript

## Fix Format

For each of the Top 3 issues, provide:

```markdown
### {N}. {Issue title} — Severity: **High/Medium/Low**

**Problem:** {What's wrong}
**Impact:** {How it affects users}
**Heuristic:** {Which scoring dimension this violates}

​```svelte
<!-- BEFORE -->
<button class="...">
  <Icon size={20} />
</button>

<!-- AFTER -->
<button class="..." aria-label="Description">
  <Icon size={20} aria-hidden="true" />
  <span class="text-xs">Label</span>
</button>
​```
```

## Rules

- **MUST use Tailwind classes** — no raw CSS (`style=""`) unless for dynamic values
- **MUST use lucide-svelte** icons — no emoji, no custom SVG
- **MUST use shadcn-svelte** components when available (Button, Badge, Card)
- **MUST include `aria-hidden="true"`** on decorative icons
- **MUST show file path** where the fix should be applied
- Before/after should be minimal diff — don't rewrite entire components
- Prefer Tailwind utilities over new CSS: `min-h-11` instead of `min-height: 44px`
