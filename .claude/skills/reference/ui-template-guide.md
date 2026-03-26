# UI Template Guide — Code from Design, Not Freeform

## Principle

**NEVER render UI freeform.** Every page/component MUST be based on:
1. Figma template (if available) → pixel-perfect
2. Component library as design system → built-in tokens + components
3. Page templates from frontend standards → copy-paste
4. Existing page in codebase → follow pattern

**Priority:** Figma > Component library > Page template > Copy existing > Freeform (AVOID)

---

## Option A: Figma Workflow

Best when: designer available, pixel-perfect required, custom branding.

### Setup

```
documents/06-diagrams/figma/
├── README.md           # Link to Figma file + page index
├── exports/            # PNG exports per page (committed)
└── tokens/             # Design tokens export (optional)
```

### Process

1. **Designer creates/selects Figma template** → share link in README.md
2. **Export PNGs** per page → `figma/exports/` (committed so Claude AI can read them)
3. **Developer codes** from exports — Claude can see PNGs and generate matching code
4. **Review** — compare code vs Figma export

### No Figma? Pick a Template

| Template | Stack | Best For |
|----------|-------|---------|
| Shadcn Taxonomy | Next.js + Shadcn | SaaS dashboard |
| Shadcn Admin | Next.js + Shadcn | Admin panel |
| Next SaaS Starter | Next.js + Shadcn | Landing + dashboard |
| Tremor Dashboard | React + Tremor | Analytics |

**Workflow:**
1. Clone template → screenshot key pages → `figma/exports/`
2. Document design decisions in `figma/README.md`
3. Code from screenshots — maintain consistency

---

## Option B: Component Library as Design System

Best when: no designer, solo dev, rapid iteration, professional quality needed fast.

### Concept

A mature component library already IS a design system:
- **Design tokens** (colors, spacing, typography, radius, shadows) — pre-defined, customizable
- **Components** (Button, Card, Dialog, Input, Badge, Tabs...) — accessible, dark mode, responsive
- **Consistency** — enforced by library, not by developer discipline

### When to choose this over Figma

| Situation | Figma | Component library |
|-----------|-------|-------------------|
| Designer on team | ✅ | ❌ |
| Solo developer | ❌ overkill | ✅ |
| Existing ugly codebase | Slow (export → code) | Fast (swap components) |
| Custom branding critical | ✅ | ⚠️ customize theme |
| Speed priority | Slow | ✅ fast |

### Process

1. **Choose library** matching your framework:

| Framework | Library | Description |
|-----------|---------|-------------|
| Svelte/SvelteKit | shadcn-svelte | Accessible, copy-paste components |
| Next.js/React | shadcn/ui | Most popular, Radix-based |
| Vue/Nuxt | shadcn-vue | Vue port |
| Any (CSS-only) | DaisyUI | Tailwind plugin, no JS |

2. **Install + configure** (Tailwind CSS + component library)
3. **Customize theme once** → document in `documents/01-business/ui/rules.md`:
   - Colors (primary, accent, destructive...)
   - Typography scale
   - Spacing scale
   - Border radius
4. **Migrate components** — replace custom CSS with library components
5. **Delete old CSS** — reduce duplication

### Business Doc Required

Before migrating, create `documents/01-business/ui/rules.md` with:

```markdown
## Design Tokens
- Colors: primary, secondary, accent, destructive, muted, background, foreground
- Typography: text-xs → text-3xl (7 levels)
- Spacing: 4px base scale
- Radius: sm, md, lg, xl, full

## Component Inventory
| Current | Issues | Target Component |
|---------|--------|-----------------|
| ...     | ...    | ...             |

## Migration Strategy
Phase 1: Foundation (install + base components)
Phase 2: Core pages (highest traffic)
Phase 3: Supporting pages
```

### Migration Rules

| Rule | Rationale |
|------|-----------|
| Install framework first, coexist with old CSS | Don't break existing features |
| Migrate 1 component at a time | Testable increments |
| Delete old CSS after migration, not before | Safety net |
| Run full test suite after each component swap | Catch regressions |
| 1 component = 1 implementation (delete duplicates) | No parallel systems |

---

## Page Checklist (MANDATORY — both options)

Every new page/component MUST pass before commit:

### States (ALL required)
- [ ] **Loading:** Spinner or Skeleton
- [ ] **Error:** Error banner with message
- [ ] **Empty:** Centered message + CTA
- [ ] **Success:** Toast notification

### UX Patterns
- [ ] Delete/destructive → Confirm dialog (NOT `window.confirm`)
- [ ] CRUD success → Toast
- [ ] Form validation → Inline errors under fields
- [ ] Navigation → `Link` component (NOT `router.push` for regular nav)

### Visual Consistency
- [ ] Colors: design tokens only (NO hardcoded hex)
- [ ] NO inline styles (except dynamic values)
- [ ] Icons: consistent library + consistent sizes
- [ ] Spacing: follow project spacing scale

## Anti-patterns

```tsx
// ❌ Freeform spacing
<div className="mt-3 mb-7 px-5">
// ✅ Convention
<div className="space-y-6">

// ❌ Hardcoded color
<div className="bg-[#3B82F6]">
// ✅ Design token
<div className="bg-primary">

// ❌ window.confirm
if (window.confirm('Delete?')) handleDelete();
// ✅ Confirm dialog component
<ConfirmDialog onConfirm={handleDelete} />

// ❌ No empty state
{data?.map(item => <Card />)}
// ✅ With empty state
{data?.length === 0 ? <EmptyState /> : data.map(item => <Card />)}

// ❌ Two button systems
<Button /> + <button class="btn btn-primary">
// ✅ One system
<Button variant="default" />

// ❌ Custom CSS when library component exists
.my-card { padding: 1.1rem; border: 1px solid... }
// ✅ Library component
<Card><CardContent>...</CardContent></Card>
```

## Pre-commit Quality Check

```bash
# Hardcoded colors (adjust glob for your framework: *.tsx, *.svelte, *.vue)
grep -rn 'bg-\[#\|text-\[#\|color: #\|background: #' src/ --include="*.svelte" --include="*.tsx"

# window.confirm
grep -rn "window.confirm\|[^.]confirm(" src/ --include="*.svelte" --include="*.tsx" --include="*.ts"

# Duplicate component systems (example: both .btn CSS and <Button> component)
echo "--- Check for parallel button systems ---"
grep -rn 'class="btn ' src/ --include="*.svelte" --include="*.tsx" | head -5
echo "--- Should use <Button> component instead ---"
```
