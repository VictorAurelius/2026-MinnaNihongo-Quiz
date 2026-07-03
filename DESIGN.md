---
name: Smart Quiz
description: An immersive, editorially restrained workspace for focused language practice.
colors:
  background: "#f4f4f8"
  foreground: "#2d3037"
  card: "#ffffff"
  primary: "#8b4fe6"
  secondary: "#f3f4f6"
  muted-foreground: "#6b707a"
  border: "#e3e2e8"
  success: "#299e5f"
  warning: "#f59e0b"
  destructive: "#e05b5b"
  shell-ink: "#121821"
  progress-teal: "#169c93"
  info: "#3399e6"
  course-n5: "#c0392b"
  course-n4: "#e67e22"
  course-n3: "#6366f1"
  course-n2: "#10b981"
  course-n1: "#ef4444"
typography:
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans JP, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans JP, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans JP, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  japanese:
    fontFamily: "Noto Sans JP, Hiragino Kaku Gothic Pro, Yu Gothic, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.5
  chinese:
    fontFamily: "Noto Sans SC, PingFang SC, Microsoft YaHei, SimHei, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.6
  optionalMincho:
    fontFamily: "Noto Serif JP, serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  optionalRounded:
    fontFamily: "Zen Maru Gothic, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
rounded:
  control: "8px"
  surface: "12px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.card}"
    rounded: "{rounded.control}"
    height: "40px"
    padding: "8px 16px"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.surface}"
    padding: "16px"
---

# Design System: Smart Quiz

## Overview

**Creative North Star: "The Immersive Language Desk"**

Smart Quiz should feel like an immersive language desk: the current script, word, grammar pattern, or exercise is the visual center while course context and study tools remain close at hand. Desktop learning tools may use a functional split workspace; mobile turns the same hierarchy into a calm sequence with one dominant action. It is a product surface, so consistency and task completion matter more than novelty.

The direction combines the workspace clarity of Direction C with the editorial restraint of Direction A. Dark shell surfaces may frame a bright content workspace, but content remains readable in mixed ambient light and neither theme uses glow. Visual personality comes from careful CJK typography, disciplined density, restrained violet accents, and constructive feedback—not decoration.

The system rejects cluttered education apps, entertainment-first gamification, and generic AI aesthetics such as purple gradients, glowing dark surfaces, glassmorphism, nested cards, and repeated icon-card grids.

**Key Characteristics:**

- Content-first hierarchy with larger Japanese and Chinese text.
- Persistent learning context on desktop; sequential disclosure on mobile.
- Restrained color: purple marks actions and selection; semantic colors communicate outcomes.
- Familiar controls and stable layouts across quiz modes.
- Mobile-first spacing, 44 px touch targets, polished light and dark themes.
- Motion limited to feedback and state transitions, normally 150–250 ms.

## Colors

The palette uses purple-tinted neutrals and one friendly violet accent, with semantic colors reserved for learning feedback.

### Primary

- **Study Violet:** the primary action, active selection, focus, and progress accent. It must not become a decorative wash across whole screens.

### Secondary

- **Quiet Lavender Gray:** supporting controls, inactive surfaces, and low-emphasis grouping.

### Neutral

- **Study Canvas:** the page background; lightly violet-tinted to reduce glare without looking beige or papery.
- **Clear Paper:** cards, popovers, and raised content surfaces.
- **Reading Ink:** all primary text and learning content.
- **Soft Divider:** borders and structural separation.

### Named Rules

**The One Accent Rule.** Purple identifies actions, selection, focus, or progress; it is never ambient decoration.

**The Meaningful Color Rule.** Green, orange, and red communicate success, warning, and error. Never use them merely to make a screen more colorful.

**The Shell-and-Desk Rule.** A dark shell may establish persistent context, but the study workspace stays quiet and high-contrast. Never drench core reading content in the shell color.

## Typography

**Display Font:** Product sans stack with Noto Sans JP fallback  
**Body Font:** Product sans stack with Noto Sans JP fallback  
**CJK Fonts:** Noto Sans JP for Japanese and Noto Sans SC for Chinese

**Character:** familiar and calm for controls, generous and highly legible for learning content. A single product sans family keeps the interface stable while dedicated CJK stacks protect glyph quality.

### Hierarchy

- **Headline** (700, 1.5rem, 1.25): page titles and major study milestones.
- **Title** (600, 1.125rem, 1.4): section and card titles.
- **Body** (400, 1rem, 1.6): instructions and explanations, normally capped at 70ch.
- **Japanese prompt** (600, 1.875rem, 1.5): quiz questions and primary vocabulary.
- **Chinese content** (600, 1.25rem, 1.6): hanzi and primary HSK content.
- **Label** (600, 0.875rem): controls and metadata; sentence case by default.

### Named Rules

**The Script Leads Rule.** When Japanese or Chinese is the learning target, its script is visually larger than translations and metadata.

**The Fixed Product Scale Rule.** Product headings use a fixed rem scale; viewport-width typography is prohibited in study flows.

## Elevation

The system is flat by default. Borders and tonal layering establish structure; subtle shadows appear only for popovers, dialogs, or an interactive surface lifting on hover. Dark mode uses stronger tonal separation instead of glow.

### Shadow Vocabulary

- **Surface:** `0 1px 3px rgba(0,0,0,.08)` for restrained separation where a border is insufficient.
- **Lifted:** `0 4px 16px rgba(0,0,0,.10)` for popovers, dialogs, and intentional hover lift.

### Named Rules

**The Flat-by-Default Rule.** A card does not receive a shadow merely because it is a card.

## Components

Components are familiar, consistent, and quiet until interaction gives them meaning.

### Buttons

- **Shape:** gently rounded controls (8 px), never pills except compact filters or tags.
- **Primary:** Study Violet with high-contrast foreground; minimum 40 px component height and 44 px mobile hit area.
- **Hover / Focus:** small color shift and a 2 px semantic focus ring; never glow or bounce.
- **Secondary / Ghost:** neutral or transparent surfaces with the same geometry and state vocabulary.

### Chips

- **Style:** pill geometry is permitted for level, type, streak, and filter metadata only.
- **State:** selection must remain distinguishable without relying on color alone.

### Cards / Containers

- **Corner Style:** friendly surface radius (12 px).
- **Background:** Clear Paper over Study Canvas.
- **Shadow Strategy:** flat by default; use borders or tonal separation first.
- **Internal Padding:** 16 px mobile, up to 24 px desktop.
- Cards represent real grouping. Nested cards and card-per-sentence layouts are prohibited.

### Inputs / Fields

- **Style:** 8 px radius, semantic border, readable foreground, and at least 44 px mobile height.
- **Focus:** visible ring using the shared focus token.
- **Error / Disabled:** pair color with text or icon; disabled state remains readable.

### Navigation

- Desktop may use a persistent application rail with course context, review count, progress, offline status, and settings. Simple pages may use a reduced shell.
- Mobile uses a compact top bar plus bottom or contextual navigation; persistent desktop panes collapse into sequential content or a sheet.
- Quiz and exam routes use focused shell mode with reduced navigation chrome.
- Use stable, familiar navigation with clear current-page state and focus restoration.
- Internal routes must include the SvelteKit base path.
- Mobile navigation must preserve access to the current study task without crowding content.

### Iconography

- Use Lucide icons with 2 px stroke weight.
- Use the fixed 12/16/20/24 px scale for metadata, compact actions, standard actions, and emphasis.
- Icon-only controls require an accessible label and a 44×44 px mobile hit area through `IconButton`.
- Emoji may remain learning content or course identity, but must not replace interface icons.

### Quiz Surface

- All quiz modes use the same question scale, progress vocabulary, answer feedback, and navigation geometry.
- Preserve F1, Space/Enter, and 1–4 shortcuts.
- Reset local answer state whenever the question or answer changes.

## Do's and Don'ts

### Do:

- **Do** make vocabulary, kanji, grammar, examples, and quiz prompts the strongest content on screen.
- **Do** use shared Tailwind tokens and shadcn-svelte primitives before creating a new component system.
- **Do** provide loading, error, empty, and success states for every page-level flow.
- **Do** verify light mode, dark mode, mobile, keyboard, screen reader, and reduced motion behavior.
- **Do** keep state transitions between 150 and 250 ms and ensure content is visible before animation.

### Don't:

- **Don't** use cluttered education-app styling with too many competing colors and controls.
- **Don't** prioritize entertainment-first gamification over actual learning.
- **Don't** use purple-to-blue gradients, glowing dark surfaces, glassmorphism, nested cards, decorative icon tiles, or gradient text.
- **Don't** use colored left or right borders wider than 1 px as card or callout decoration.
- **Don't** hardcode colors, radius values, or parallel Button/Card/Modal implementations when a shared token or primitive exists.
- **Don't** hide learning content behind ornament, modal-first interaction, or decorative motion.
- **Don't** shrink a multi-pane desktop workspace into miniature mobile columns; recompose it into a deliberate sequence.
