# UI Template Guide — Code from Design, Not Freeform

## Principle

**NEVER render UI freeform.** Every page/component MUST be based on:
1. Figma template (if available) → pixel-perfect
2. Page templates from frontend standards → copy-paste
3. Existing page in codebase → follow pattern

**Priority:** Figma > Page template > Copy existing > Freeform (AVOID)

## Figma Workflow

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

## Page Checklist (MANDATORY)

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
- [ ] Spacing: follow project spacing tokens

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
```

## Pre-commit Quality Check

```bash
# Hardcoded colors
grep -rn 'bg-\[#\|text-\[#' src/ --include="*.tsx" && echo "Use design tokens"

# window.confirm
grep -rn "window.confirm" src/ --include="*.tsx" && echo "Use ConfirmDialog"

# Missing error handling
for page in $(find src/app -name "page.tsx"); do
  grep -q "error\|Error" "$page" || echo "Missing error: $page"
done
```
