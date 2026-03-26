# UI Business Rules — Design System

> **Module:** UI Redesign based on Elingo template
> **Dependencies:** Figma exports, shadcn-svelte, Tailwind CSS v4
> **Skill ref:** `.claude/skills/reference/ui-template-guide.md`

---

## Principles

| ID | Rule | Rationale |
|----|------|-----------|
| BR-UI-001 | Mọi page/component PHẢI code từ Figma export, KHÔNG freeform | Consistency |
| BR-UI-002 | Design tokens (colors, spacing, typography) PHẢI định nghĩa trước code | Single source of truth |
| BR-UI-003 | Component library: shadcn-svelte (copy vào project, own code) | Maintainable, accessible |
| BR-UI-004 | CSS framework: Tailwind CSS v4 (thay thế vanilla CSS) | Atomic, no duplication |
| BR-UI-005 | Dark mode PHẢI hoạt động cho mọi component | Existing feature, must preserve |
| BR-UI-006 | Mobile-first: design cho 375px trước, scale up | 60%+ users on mobile |
| BR-UI-007 | Touch targets ≥ 44px trên mobile | WCAG 2.5.5 |
| BR-UI-008 | Mỗi page PHẢI có 4 states: loading, error, empty, success | UI Template Guide |
| BR-UI-009 | KHÔNG hardcoded hex colors — chỉ design tokens | Maintainability |
| BR-UI-010 | Animation timing nhất quán: 150ms (micro), 300ms (page) | Predictable UX |

## Design Tokens (extract từ Elingo sau khi có exports)

> **TODO:** Cập nhật sau khi export Figma screens

### Colors
```
--primary:      TBD (extract từ Elingo)
--primary-hover: TBD
--accent:       TBD
--success:      TBD
--danger:       TBD
--warning:      TBD
--bg:           TBD
--bg-card:      TBD
--text:         TBD
--text-muted:   TBD
--border:       TBD
```

### Typography Scale
```
--text-xs:   0.75rem   (12px) — captions, badges
--text-sm:   0.875rem  (14px) — secondary text
--text-base: 1rem      (16px) — body text
--text-lg:   1.125rem  (18px) — emphasized text
--text-xl:   1.25rem   (20px) — section headers
--text-2xl:  1.5rem    (24px) — page titles
--text-3xl:  2rem      (32px) — hero, quiz questions
```

### Spacing Scale
```
--space-1:  0.25rem  (4px)
--space-2:  0.5rem   (8px)
--space-3:  0.75rem  (12px)
--space-4:  1rem     (16px)
--space-5:  1.25rem  (20px)
--space-6:  1.5rem   (24px)
--space-8:  2rem     (32px)
--space-10: 2.5rem   (40px)
--space-12: 3rem     (48px)
```

### Border Radius
```
--radius-sm:  0.375rem (6px)
--radius-md:  0.5rem   (8px)
--radius-lg:  0.75rem  (12px)
--radius-xl:  1rem     (16px)
--radius-full: 9999px  (pill)
```

## Component Inventory

> Danh sách components cần migrate → shadcn-svelte

| Component | Hiện tại | Target (shadcn) | Priority |
|-----------|----------|-----------------|----------|
| Button | 2 systems (component + CSS) | shadcn Button | P0 |
| Card | 4+ variants inconsistent | shadcn Card | P0 |
| Dialog/Modal | 2 implementations | shadcn Dialog | P0 |
| Input/Select | Minimal styling | shadcn Input/Select | P0 |
| Toast | Custom Toast.svelte | shadcn Sonner | P1 |
| Progress | Custom ProgressBar | shadcn Progress | P1 |
| Badge | None | shadcn Badge | P1 |
| Tabs | None | shadcn Tabs | P1 |
| Skeleton | Custom Skeleton.svelte | shadcn Skeleton | P2 |
| Avatar | None | shadcn Avatar | P2 |

## Page Redesign Priority

| Priority | Pages | Reason |
|----------|-------|--------|
| P0 | Home, Courses, Quiz (3 modes) | First impression + core UX |
| P1 | Lesson grid, Vocabulary, Grammar | Content consumption |
| P2 | Settings, Stats, Review | Supporting pages |
| P3 | About, Premium, Kanji reference | Secondary pages |

## Migration Strategy

```
Phase 1: Foundation
├── Install Tailwind CSS v4 + shadcn-svelte
├── Extract design tokens from Elingo exports
├── Create base components (Button, Card, Input, Dialog)
├── Create layout shell (Header, Footer, Page wrapper)
└── app.css → Tailwind globals + token vars

Phase 2: Core Pages (P0)
├── Home → Elingo dashboard layout
├── Courses → Elingo course grid
├── Quiz modes → Elingo quiz screens
└── Results → Elingo progress card

Phase 3: Content Pages (P1)
├── Lesson grid → Elingo lesson list
├── Vocabulary → Elingo word list
├── Grammar → Elingo detail modal
└── Review/SRS → Elingo review screen

Phase 4: Supporting Pages (P2-P3)
├── Settings → Elingo settings
├── Stats → Elingo progress charts
├── About/Premium → Elingo profile
└── Kanji/HSK → Custom (no Elingo equivalent)
```

## Anti-patterns (KHÔNG được làm)

| Anti-pattern | Thay bằng |
|-------------|-----------|
| Hardcoded hex colors | Design tokens |
| Ad-hoc spacing (0.35rem, 0.82rem...) | Spacing scale (--space-1 đến --space-12) |
| Multiple button/card systems | Single shadcn component |
| `window.confirm` | shadcn Dialog |
| Component-level @keyframes duplication | Global animation utilities |
| 2,697 lines app.css | Tailwind utilities + minimal globals |
