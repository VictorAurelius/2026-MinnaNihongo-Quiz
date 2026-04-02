# Code Fix Suggestions — Guidelines

When the review identifies issues, provide **actionable code fixes** using the project's actual stack.

## Project Stack

- **Framework**: SvelteKit 2 + Svelte 4
- **Styling**: Tailwind CSS v4 + design tokens (`app.css`)
- **Components**: shadcn-svelte
- **Icons**: lucide-svelte
- **Language**: TypeScript

## Component Locator — Before Writing Any Fix

Before suggesting a fix, **identify the exact source file**:

1. Map the page to its route file: `src/routes/{path}/+page.svelte`
2. If the issue is in a shared element (header, back button), check `src/lib/components/`
3. **Spacing/margin issues are usually in the parent container**, not the child component
4. Search for the element by visible text or class: `grep -rn "text content" src/routes/`
5. **Always state the file path** in the fix: `<!-- File: src/routes/course/[courseId]/+page.svelte -->`

### Route → File Mapping (Smart Quiz)

| Page | File |
|------|------|
| Home | `src/routes/+page.svelte` |
| Courses | `src/routes/courses/+page.svelte` |
| Course Detail | `src/routes/course/[courseId]/+page.svelte` |
| Lesson Menu | `src/routes/course/[courseId]/lesson/[id]/+page.svelte` |
| Vocabulary | `src/routes/course/[courseId]/lesson/[id]/vocabulary/+page.svelte` |
| Kanji | `src/routes/kanji/+page.svelte` |
| HSK | `src/routes/hsk/+page.svelte` |
| Settings | `src/routes/settings/+page.svelte` |
| Results | `src/routes/results/+page.svelte` |
| Header | `src/lib/components/layout/Header.svelte` |
| Layout | `src/routes/+layout.svelte` |

## Fix Format

For each of the Top 3 issues, provide:

```markdown
### {N}. {Issue title} — Severity: **High/Medium/Low**

**Problem:** {What's wrong}
**Impact:** {How it affects users}
**Heuristic:** {Which scoring dimension this violates}
**File:** `src/routes/{path}/+page.svelte`

​```svelte
<!-- BEFORE -->
<div class="...">...</div>

<!-- AFTER -->
<div class="...">...</div>
​```
```

## Common Spacing Fixes (SvelteKit + Tailwind v4)

### Gap between sibling elements

```svelte
<!-- File: src/routes/course/[courseId]/+page.svelte -->

<!-- BEFORE: elements stuck together -->
<div class="flex flex-col">
  <a class="...">Lesson 1</a>
  <a class="...">Lesson 2</a>
</div>

<!-- AFTER: add gap -->
<div class="flex flex-col gap-3.5">
  <a class="...">Lesson 1</a>
  <a class="...">Lesson 2</a>
</div>
```

### Internal padding

```svelte
<!-- BEFORE: text touching container edges -->
<div class="bg-card rounded-xl">
  <p>Content</p>
</div>

<!-- AFTER: add padding -->
<div class="bg-card rounded-xl px-5 py-5">
  <p>Content</p>
</div>
```

### Section spacing (use parent gap, not individual margins)

```svelte
<!-- BEFORE: manual margins -->
<section class="mt-6">...</section>
<section class="mt-6">...</section>

<!-- AFTER: parent flex + gap -->
<div class="flex flex-col gap-8">
  <section>...</section>
  <section>...</section>
</div>
```

### Row height too small (touch target)

```svelte
<!-- BEFORE: hard to tap -->
<button class="p-2">
  <Icon size={20} />
</button>

<!-- AFTER: min-h-11 = 44px WCAG minimum -->
<button class="min-h-11 min-w-11 flex items-center justify-center">
  <Icon size={20} aria-hidden="true" />
</button>
```

### Section heading too close to content

```svelte
<!-- BEFORE: heading dính content -->
<h3 class="text-xs uppercase mb-3">Section</h3>
<div>...</div>

<!-- AFTER -->
<h3 class="text-xs uppercase mb-6">Section</h3>
<div>...</div>
```

## Tailwind Spacing Quick Reference

| Need | Class | Pixels |
|------|-------|--------|
| Touch target minimum | `min-h-11 min-w-11` | 44px |
| Row height comfortable | `py-5` | ~56px total |
| Internal padding | `p-4` or `px-5 py-5` | 16-20px |
| Sibling gap small | `gap-2` | 8px |
| Sibling gap standard | `gap-3.5` | 14px |
| Section gap | `gap-8` | 32px |
| Heading to content | `mb-6` | 24px |

## Rules

- **MUST use Tailwind classes** — no raw CSS (`style=""`) unless for dynamic values
- **MUST use lucide-svelte** icons — no emoji, no custom SVG
- **MUST use shadcn-svelte** components when available (Button, Badge, Card)
- **MUST include `aria-hidden="true"`** on decorative icons
- **MUST show file path** where the fix should be applied
- Before/after should be minimal diff — don't rewrite entire components
- Prefer Tailwind utilities over new CSS: `min-h-11` instead of `min-height: 44px`
- **Spacing issues: check the PARENT first** — gap/padding is usually on the wrapper, not the child
