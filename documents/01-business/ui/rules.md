# UI Business Rules — Design System

> **Module:** UI Redesign — Queezy + Duolingo DS + BahasaKu templates
> **Dependencies:** Figma exports, shadcn-svelte, Tailwind CSS v4
> **Skill ref:** `.claude/skills/reference/ui-template-guide.md`

---

## Source Templates (ALL FREE)

| Template | Role | Screens | Figma Link |
|----------|------|---------|------------|
| Queezy | Primary (quiz, home, results) | 52 | [Link](https://www.figma.com/community/file/1178996093139112052) |
| Duolingo DS | Secondary (tokens, lesson, progress) | 16 | [Link](https://www.figma.com/community/file/1460744749282136015) |
| BahasaKu | Supplementary (vocabulary, lesson grid) | 25+ | [Link](https://www.figma.com/community/file/1082985450689546470) |

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

## Design Tokens

> **TODO:** Finalize sau khi export Figma. Values below based on Queezy + Duolingo style analysis.

### Colors (Queezy-inspired: purple primary, gamified)
```
Light:
--primary:       #6C5CE7   (Queezy purple)
--primary-hover:  #5A4BD1
--accent:        #00D2D3   (Queezy teal)
--success:       #00B894   (green)
--danger:        #FF6B6B   (red)
--warning:       #FECA57   (yellow)
--bg:            #F8F9FE   (light lavender)
--bg-card:       #FFFFFF
--text:          #2D3436
--text-muted:    #636E72
--border:        #E8E8F0

Dark:
--primary:       #A29BFE
--accent:        #55EFC4
--bg:            #1A1A2E
--bg-card:       #25253E
--text:          #F5F5F7
--text-muted:    #A0A0B0
--border:        #3A3A52
```

### Typography Scale
```
--text-xs:   0.75rem   (12px) — captions, badges
--text-sm:   0.875rem  (14px) — secondary text, hints
--text-base: 1rem      (16px) — body text
--text-lg:   1.125rem  (18px) — emphasized text
--text-xl:   1.25rem   (20px) — section headers
--text-2xl:  1.5rem    (24px) — page titles
--text-3xl:  2rem      (32px) — hero, quiz questions (ALL quiz modes same size)
```

### Spacing Scale (8px base)
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

### Border Radius (Queezy: very rounded)
```
--radius-sm:   0.5rem   (8px)
--radius-md:   0.75rem  (12px)
--radius-lg:   1rem     (16px)
--radius-xl:   1.5rem   (24px)
--radius-full: 9999px   (pill/circle)
```

### Shadows
```
--shadow-sm:  0 1px 2px rgba(0,0,0,0.05)
--shadow-md:  0 4px 12px rgba(0,0,0,0.08)
--shadow-lg:  0 8px 24px rgba(0,0,0,0.12)
```

### Animations
```
--duration-fast:   150ms   (micro: hover, press)
--duration-normal: 300ms   (page transitions, card flip)
--ease-out:        cubic-bezier(0.16, 1, 0.3, 1)
```

---

## Component Inventory

| Component | Hiện tại | Target (shadcn) | Priority |
|-----------|----------|-----------------|----------|
| Button | 2 systems song song | shadcn Button (primary, secondary, danger, ghost, outline) | P0 |
| Card | 4+ variants inconsistent | shadcn Card (base + quiz variant + course variant) | P0 |
| Dialog/Modal | 2 implementations | shadcn Dialog | P0 |
| Input/Select | Minimal styling | shadcn Input/Select | P0 |
| Toast | Custom Toast.svelte | shadcn Sonner | P1 |
| Progress | Custom ProgressBar | shadcn Progress | P1 |
| Badge | None | shadcn Badge (level, streak, status) | P1 |
| Tabs | None | shadcn Tabs (quiz direction, vocabulary filter) | P1 |
| Skeleton | Custom Skeleton.svelte | shadcn Skeleton | P2 |
| Avatar | None | shadcn Avatar (leaderboard, profile) | P2 |

---

## Page Redesign Priority + Template Mapping

| Priority | Page | Template Source | Key Changes |
|----------|------|----------------|-------------|
| P0 | Home `/` | Queezy Home + Duolingo tree | Hero section, course cards gamified, streak display |
| P0 | Courses `/courses` | Queezy Discover | Category cards with icons, progress badges |
| P0 | Quiz MC `/quiz/multiple-choice` | Queezy Quiz MC | 4-option cards (not radio buttons), progress bar |
| P0 | Quiz Flashcard `/quiz/flashcard` | Queezy Quiz (adapted) | Card flip with gradient, swipe gesture hint |
| P0 | Quiz Typing `/quiz/typing` | Queezy Quiz (adapted) | Clean input, virtual keyboard consistent |
| P0 | Results `/results` | Queezy Results | Score ring, stats summary, share card |
| P1 | Lesson Grid `/course/[id]` | Duolingo Lesson Tree | Mastery rings, lock states, path visual |
| P1 | Vocabulary `/course/[id]/lesson/[n]/vocabulary` | BahasaKu Vocabulary | Clean table, TTS button, search |
| P1 | Grammar | BahasaKu Lesson | Pattern cards, example blocks |
| P1 | Review `/review` | Duolingo Lesson | SRS cards, filter tabs, streak |
| P2 | Settings `/settings` | Queezy Profile | Grouped sections, toggles |
| P2 | Stats `/stats` | Duolingo Progress | Charts, streak calendar, mastery map |
| P3 | About `/about` | Queezy Profile | Community links, credits |
| P3 | Premium `/premium` | Queezy Onboarding | Feature comparison, CTA |
| P3 | Kanji `/kanji` | Custom (no template) | Keep existing + apply design tokens |
| P3 | HSK `/hsk` | BahasaKu Vocabulary | Apply vocab template |

---

## Migration Strategy

```
Phase 1: Foundation (1 PR)
├── Install Tailwind CSS v4 + shadcn-svelte
├── Define design tokens in tailwind.config
├── Create base components (Button, Card, Input, Dialog)
├── Create layout shell (Header redesign, page wrapper)
├── app.css → Tailwind globals + token vars
├── Verify dark mode + existing tests pass
└── Est: 4-6h

Phase 2: Core Pages — P0 (1-2 PRs)
├── Home → Queezy dashboard
├── Courses → Queezy discover
├── Quiz modes (3) → Queezy quiz
├── Results → Queezy results
└── Est: 4-6h

Phase 3: Content Pages — P1 (1-2 PRs)
├── Lesson grid → Duolingo tree
├── Vocabulary → BahasaKu vocab
├── Grammar → BahasaKu lesson
├── Review/SRS → Duolingo lesson
└── Est: 3-4h

Phase 4: Supporting Pages — P2/P3 (1 PR)
├── Settings, Stats, About, Premium
├── Kanji, HSK (apply tokens only)
└── Est: 2-3h
```

---

## Anti-patterns (KHÔNG được làm)

| Anti-pattern | Thay bằng |
|-------------|-----------|
| Hardcoded hex colors | Tailwind classes / CSS vars |
| Ad-hoc spacing (0.35rem, 0.82rem...) | Tailwind spacing scale (space-1 → space-12) |
| Multiple button/card systems | Single shadcn component |
| `window.confirm` | shadcn Dialog |
| Component-level @keyframes duplication | Tailwind `animate-*` utilities |
| 2,697 lines app.css | Tailwind utilities + ~200 lines globals |
| 13+ font sizes scattered | 7-level type scale |
| Quiz modes khác font size | `--text-3xl` cho tất cả quiz question text |

---

## Blocking: Figma Export Required

**Trước khi bắt đầu Phase 2+, user PHẢI export Figma screens:**
1. Duplicate 3 templates vào Figma drafts
2. Export key screens (PNG 2x) → `documents/06-diagrams/figma/exports/`
3. Commit vào repo
4. Claude đọc PNGs → code pixel-perfect

**Phase 1 (Foundation) có thể bắt đầu ngay** — chỉ cần design tokens, không cần screen exports.
