# UI Business Rules — Design System

> **Module:** UI Redesign — shadcn-svelte + Tailwind CSS v4
> **Approach:** Component library as design system (no Figma templates)
> **Skill ref:** `.claude/skills/reference/ui-template-guide.md`

---

## Principles

| ID | Rule | Rationale |
|----|------|-----------|
| BR-UI-001 | Component library: shadcn-svelte (copy vào project, own code) | Professional, accessible, consistent |
| BR-UI-002 | CSS framework: Tailwind CSS v4 (thay thế 2,697 dòng vanilla CSS) | Atomic, no duplication |
| BR-UI-003 | Design tokens từ shadcn theme — customize 1 lần, apply everywhere | Single source of truth |
| BR-UI-004 | Dark mode: shadcn built-in (class-based, CSS variables) | Existing feature preserved |
| BR-UI-005 | Mobile-first: Tailwind responsive (`sm:`, `md:`, `lg:`) | 60%+ users on mobile |
| BR-UI-006 | Touch targets ≥ 44px trên mobile | WCAG 2.5.5 |
| BR-UI-007 | Mỗi page PHẢI có 4 states: loading, error, empty, success | UI Template Guide |
| BR-UI-008 | KHÔNG hardcoded hex — chỉ Tailwind classes / CSS vars | Maintainability |
| BR-UI-009 | Animation: Tailwind `animate-*` + `transition-*` | Consistent timing |
| BR-UI-010 | 1 component = 1 implementation (KHÔNG parallel systems) | No duplication |

---

## Design Tokens (shadcn default + customize)

### Colors (customize cho education/gamified feel)
```
--primary:       hsl(262, 80%, 60%)     Purple — gamified, friendly
--primary-foreground: hsl(0, 0%, 100%)
--secondary:     hsl(220, 14%, 96%)
--accent:        hsl(174, 100%, 41%)    Teal — quiz success
--destructive:   hsl(0, 72%, 63%)       Red — errors
--muted:         hsl(220, 14%, 96%)
--background:    hsl(240, 25%, 99%)     Light lavender
--foreground:    hsl(220, 13%, 20%)
--card:          hsl(0, 0%, 100%)
--border:        hsl(240, 10%, 90%)
--ring:          hsl(262, 80%, 60%)     Focus ring = primary
```

### Typography (Tailwind defaults + Japanese)
```
Font family: Inter (body) + Noto Sans JP (Japanese) + Noto Sans SC (Chinese)
Scale: text-xs → text-sm → text-base → text-lg → text-xl → text-2xl → text-3xl
Quiz question text: text-3xl (ALL modes — consistent)
```

### Spacing (Tailwind 4px base)
```
Tailwind scale: 1(4px) 2(8px) 3(12px) 4(16px) 5(20px) 6(24px) 8(32px) 10(40px) 12(48px)
Card padding: p-4 (mobile) → p-6 (desktop)
Section gap: space-y-4 (mobile) → space-y-6 (desktop)
Page padding: px-4 (mobile) → px-6 (desktop)
```

### Border Radius (rounded, friendly)
```
radius: 0.75rem (shadcn default — rounded-xl feel)
Cards: rounded-xl
Buttons: rounded-lg
Inputs: rounded-md
Badges: rounded-full
```

---

## Component Migration Plan

| Current | Issues | shadcn Target | Notes |
|---------|--------|---------------|-------|
| Button.svelte + .btn CSS | 2 parallel systems | `shadcn Button` | Variants: default, secondary, destructive, outline, ghost |
| Card.svelte (unused) + 4 CSS patterns | Inconsistent padding/style | `shadcn Card` | CardHeader, CardContent, CardFooter |
| Modal.svelte + ConfirmDialog.svelte | 2 implementations | `shadcn Dialog` + `AlertDialog` | AlertDialog for destructive |
| Input (raw HTML) | Minimal styling, no states | `shadcn Input` + `Select` | Focus, error, disabled states |
| Toast.svelte | Custom | `shadcn Sonner` | Auto-dismiss, multiple types |
| ProgressBar.svelte | Basic | `shadcn Progress` | Animated, accessible |
| Skeleton.svelte | Basic | `shadcn Skeleton` | Pulse animation |
| (none) | Missing | `shadcn Badge` | Level, streak, status indicators |
| (none) | Missing | `shadcn Tabs` | Quiz direction, filters |
| (none) | Missing | `shadcn Separator` | Section dividers |
| Header.svelte | Custom nav | Redesign with shadcn Button + Sheet | Mobile: bottom nav or hamburger Sheet |

---

## Page Redesign Scope

| Page | Current Issues | Redesign Goal |
|------|---------------|---------------|
| Home `/` | Cluttered, no visual hierarchy | Hero + course cards (shadcn Card) + streak badge |
| Courses `/courses` | Plain grid | Gamified cards with progress Badge + mastery ring |
| Quiz (all 3 modes) | 3 different font sizes, inconsistent cards | Unified quiz Card, same text scale, consistent nav |
| Results `/results` | Basic score display | Score ring (shadcn Progress), stats grid, share |
| Lesson Grid `/course/[id]` | Plain list | Path-style grid with lock/mastery states |
| Vocabulary | Functional but plain | Clean table with Badge types, TTS button |
| Settings | Works but boring | Grouped sections with Switch/Select, clean spacing |
| Review `/review` | Functional | Filter Tabs, streak display, card stack |
| Stats `/stats` | Basic | Dashboard layout with cards + progress |
| About/Premium | Minimal | Professional cards, feature grid |

---

## Migration Strategy (3 PRs)

```
PR #22: Foundation — Tailwind + shadcn setup
├── Install: tailwindcss v4, shadcn-svelte, bits-ui
├── Configure: tailwind.config, app.css → Tailwind base
├── Add shadcn components: Button, Card, Dialog, Input, Badge, Tabs, Progress, Skeleton, Sonner
├── Migrate Header → shadcn components
├── Preserve: ALL existing functionality + tests
├── Delete: duplicate CSS (Button.svelte old, .btn classes, Card.svelte old)
├── Dark mode: verify shadcn theme switching works
└── Tests: existing 755 pass + build pass

PR #23: Core Pages Redesign — Home, Courses, Quiz, Results
├── Home: hero section, course cards, streak/progress
├── Courses: gamified grid with badges
├── Quiz (3 modes): unified card, consistent text, better nav
├── Results: score ring, stats, next action
└── Tests: existing pass + visual regression manual

PR #24: Content + Supporting Pages — Lessons, Vocab, Grammar, Settings, Stats
├── Lesson grid: mastery path visual
├── Vocabulary: shadcn Table pattern
├── Grammar: pattern cards
├── Settings: grouped sections, shadcn Switch/Select
├── Stats: dashboard cards
├── Review: filter tabs, streak
├── About/Premium: professional layout
├── Kanji/HSK: apply tokens (minimal changes)
└── Tests: existing pass + build pass
```

---

## Anti-patterns

| KHÔNG | Thay bằng |
|-------|-----------|
| Hardcoded hex colors | Tailwind classes (`bg-primary`, `text-muted-foreground`) |
| Ad-hoc spacing | Tailwind scale (`p-4`, `gap-6`, `space-y-4`) |
| Multiple button/card systems | Single shadcn component |
| `window.confirm` | shadcn AlertDialog |
| @keyframes duplication | Tailwind `animate-*` |
| 2,697 lines app.css | ~200 lines globals + Tailwind utilities |
| 13+ font sizes | Tailwind type scale (7 levels) |
| Quiz modes khác font size | `text-3xl` cho tất cả |
| Inline styles for layout | Tailwind flex/grid utilities |

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Tailwind migration breaks existing styles | HIGH | Phase 1: coexist, phase 2-3: migrate page by page |
| 755 tests break | HIGH | Run after every component swap, fix immediately |
| Dark mode regression | MEDIUM | shadcn dark mode = class-based (same as current) |
| Bundle size increase | LOW | Tailwind purges unused, shadcn tree-shakes |
| Japanese font rendering | LOW | Keep --font-jp variable, apply via Tailwind config |
