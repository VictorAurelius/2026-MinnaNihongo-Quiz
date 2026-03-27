---
name: frontend-design
description: "Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when building or modifying web components, pages, or UI features. Generates polished code that avoids generic AI aesthetics. Based on Anthropic's official frontend-design skill + Impeccable references."
---

# Frontend Design Skill — Smart Quiz

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

## Context: Smart Quiz

Smart Quiz is a bilingual language learning SPA (Japanese + Chinese → Vietnamese/English).

- **Stack**: SvelteKit 2 + Svelte 5 + TypeScript + Tailwind CSS v4 + shadcn-svelte
- **Users**: Vietnamese learners studying Japanese (JLPT N5-N1) and Chinese (HSK1-5)
- **Tone**: Friendly, gamified, encouraging — but clean and professional
- **Theme**: Purple primary (`hsl(262, 80%, 60%)`) + Teal accent. Light/dark mode.
- **Design System**: shadcn-svelte components + Tailwind tokens (see `documents/01-business/ui/rules.md`)
- **Accessibility**: WCAG 2.1 AA mandatory
- **Mobile-first**: PWA offline-first, responsive design required

> For full design context, see `.impeccable.md` in project root.

---

## Design Thinking

Before coding any UI, understand the context:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Match Smart Quiz's personality — encouraging, clean, gamified
- **Constraints**: Must work with existing shadcn-svelte + Tailwind system
- **Differentiation**: What makes this screen memorable and useful for language learners?

**CRITICAL**: Choose a clear direction and execute with precision. Consistency with the existing design system matters more than novelty.

---

## Frontend Aesthetics Guidelines

### Typography
> *Consult [typography reference](reference/typography.md) for scales, pairing, and loading strategies.*

- **Smart Quiz fonts**: Inter (body) + Noto Sans JP (Japanese) + Noto Sans SC (Chinese)
- Use modular type scale with fluid sizing (`clamp()`)
- Vary font weights and sizes for clear visual hierarchy
- Japanese/Chinese text needs larger font sizes than Latin text for readability
- **DON'T**: Mix too many font sizes — stick to the Tailwind scale

### Color & Theme
> *Consult [color reference](reference/color-and-contrast.md) for OKLCH, palettes, and dark mode.*

- Use design tokens from `app.css` — NEVER hardcode hex values
- Primary: Purple (`--color-primary`), Success: Green (`--color-success`), Warning: Orange (`--color-warning`)
- Tint neutrals toward brand hue for subconscious cohesion
- **DO**: Use `bg-primary`, `text-muted-foreground`, etc. — semantic token classes
- **DON'T**: Use pure black (#000) or pure white (#fff) — always tint
- **DON'T**: Use gray text on colored backgrounds — use a shade of the background color

### Layout & Space
> *Consult [spatial reference](reference/spatial-design.md) for grids, rhythm, and container queries.*

- Use Tailwind spacing scale (4px base): `p-2`, `p-4`, `p-6`, `gap-4`, etc.
- Create visual rhythm through varied spacing — not same padding everywhere
- **DO**: Use `space-y-6`, `gap-4` — consistent Tailwind conventions
- **DON'T**: Wrap everything in cards — not everything needs a container
- **DON'T**: Nest cards inside cards — flatten the hierarchy
- **DON'T**: Use identical card grids with icon + heading + text repeated endlessly

### Visual Details
- **DO**: Use intentional, purposeful decorative elements
- **DON'T**: Use glassmorphism everywhere
- **DON'T**: Use rounded elements with thick colored border on one side
- **DON'T**: Use modals unless there's truly no better alternative

### Motion
> *Consult [motion reference](reference/motion-design.md) for timing, easing, and reduced motion.*

- Focus on high-impact moments: staggered page load reveals > scattered micro-interactions
- Use exponential easing (`ease-out-quart/quint/expo`) for natural deceleration
- Only animate `transform` and `opacity` for 60fps
- **DON'T**: Use bounce or elastic easing — dated and tacky
- **MUST**: Respect `prefers-reduced-motion`

### Interaction
> *Consult [interaction reference](reference/interaction-design.md) for forms, focus, and loading patterns.*

- Every interactive element needs 8 states: default, hover, focus, active, disabled, loading, error, success
- Use `:focus-visible` for keyboard focus rings
- Use progressive disclosure — start simple, reveal sophistication through interaction
- Design empty states that teach the interface
- **DO**: Optimistic UI updates — update immediately, sync later

### Responsive
> *Consult [responsive reference](reference/responsive-design.md) for mobile-first and container queries.*

- Mobile-first with `min-width` queries (Tailwind default)
- Touch targets minimum 44x44px on mobile
- Use container queries (`@container`) for component-level responsiveness
- **DON'T**: Hide critical functionality on mobile — adapt, don't amputate

### UX Writing
> *Consult [ux-writing reference](reference/ux-writing.md) for labels, errors, and empty states.*

- Smart Quiz is bilingual: UI text in Vietnamese, content in Japanese/Chinese
- Button labels: action-object pairs ("Start Quiz", "Next Card")
- Error messages: What happened? Why? How to fix?
- Make every word earn its place

---

## The AI Slop Test

**Critical quality check**: If you showed this interface to someone and said "AI made this," would they believe you immediately? If yes, that's the problem.

Review the DON'T guidelines above — they are the fingerprints of AI-generated work:
- Purple gradients on white backgrounds
- Identical card grids everywhere
- Inter/Roboto as default font
- Glassmorphism for "modern" look
- Bounce/elastic animations
- Generic hero sections with big numbers

---

## Implementation Rules (Smart Quiz Specific)

### Component Usage Priority
1. **shadcn-svelte** (`$lib/components/ui/`) — Button, Card, Badge, Progress, Skeleton, Separator
2. **Custom common** (`$lib/components/common/`) — Modal, ConfirmDialog, Toast, BackButton
3. **New component** — only if nothing above fits

### Tailwind Class Order
Follow Tailwind's recommended order: layout → sizing → spacing → typography → color → border → effects → state

### Base Path
Every `goto()`, `redirect()`, `<a href>` MUST use `${base}` from `$app/paths`.

### Dark Mode
- Use class-based dark mode (`.dark` on `<html>`)
- All components must look good in both themes
- Use semantic token classes: `bg-card`, `text-foreground`, `border-border`

### States Checklist (MANDATORY per page)
- [ ] Loading state (Skeleton)
- [ ] Error state (clear message + recovery)
- [ ] Empty state (helpful, not just "nothing here")
- [ ] Success state (confirmation)

---

## Available Design Commands

These commands can be used for targeted improvements:

| Command | Purpose |
|---------|---------|
| `audit` | Technical quality checks (a11y, performance, responsive, anti-patterns) — scored report |
| `critique` | UX design review with heuristics scoring |
| `polish` | Final pass before shipping — comprehensive checklist |
| `normalize` | Align with design system standards |
| `typeset` | Fix font choices, hierarchy, sizing |
| `arrange` | Fix layout, spacing, visual rhythm |
| `colorize` | Introduce strategic color |
| `animate` | Add purposeful motion |
| `harden` | Error handling, i18n, edge cases |
| `optimize` | Performance improvements |
| `adapt` | Adapt for different devices |
| `bolder` | Amplify boring designs |
| `quieter` | Tone down overly bold designs |
| `delight` | Add moments of joy |
| `clarify` | Improve UX copy |
| `distill` | Strip to essence |
| `extract` | Pull into reusable components |
| `onboard` | Design onboarding flows |
| `overdrive` | Add extraordinary effects |

> Command details in `commands/` directory.

---

## References

- [Typography](reference/typography.md) — Scales, pairing, loading, fluid type
- [Color & Contrast](reference/color-and-contrast.md) — OKLCH, palettes, dark mode, a11y
- [Spatial Design](reference/spatial-design.md) — Grid, spacing, hierarchy, container queries
- [Motion Design](reference/motion-design.md) — Timing, easing, reduced motion
- [Interaction Design](reference/interaction-design.md) — Forms, focus, loading, modals
- [Responsive Design](reference/responsive-design.md) — Mobile-first, fluid, breakpoints
- [UX Writing](reference/ux-writing.md) — Labels, errors, empty states, voice

---

*Based on [Anthropic's frontend-design skill](https://github.com/anthropics/claude-code) + [Impeccable](https://github.com/pbakaus/impeccable) (Apache 2.0). Customized for Smart Quiz.*
