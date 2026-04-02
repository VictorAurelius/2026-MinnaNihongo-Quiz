# UI Review Scoring Guide

## Screenshots to Review

Read `dark-mobile.png` from each screen subfolder (use latest label or specific label):

```
documents/04-quality/screenshots/{label}/
├── home/dark-mobile.png
├── courses/dark-mobile.png
├── course-detail/dark-mobile.png
├── lesson-menu/dark-mobile.png
├── kanji/dark-mobile.png
├── hsk/dark-mobile.png
├── settings/dark-mobile.png
└── vocabulary/dark-mobile.png
```

For before/after comparison, read same screen from both labels:
- `screenshots/before-pr-XXX/lesson-menu/dark-mobile.png`
- `screenshots/after-pr-XXX/lesson-menu/dark-mobile.png`

---

## 1. Technical Audit (/20)

Score 0-4 per dimension:

| # | Dimension | Criteria |
|---|-----------|----------|
| 1 | Accessibility | ARIA roles, keyboard nav, focus indicators, semantic HTML, contrast |
| 2 | Performance | No layout thrashing, transform/opacity animations, lazy loading |
| 3 | Responsive Design | Mobile-first, breakpoints, touch targets ≥44px, no overflow |
| 4 | Theming | Design tokens used, dark mode works, no hardcoded colors |
| 5 | Anti-Patterns | No AI slop (glassmorphism, gradient text, bounce easing, hero metrics) |

---

## 2. Design Heuristics (/40)

Nielsen's 10 heuristics, score 0-4 each:

| # | Heuristic | What to check |
|---|-----------|---------------|
| 1 | Visibility of System Status | Loading states, active states, progress indicators |
| 2 | Match System / Real World | Natural language, familiar concepts for Vietnamese learners |
| 3 | User Control and Freedom | Undo, back buttons, exit points, cancel options |
| 4 | Consistency and Standards | Same patterns across pages, icon consistency |
| 5 | Error Prevention | Confirm on destructive actions, safe defaults |
| 6 | Recognition Rather Than Recall | Labels, descriptions, visible options |
| 7 | Flexibility and Efficiency | Shortcuts, search, filters, power user features |
| 8 | Aesthetic and Minimalist Design | No clutter, clean layout, relevant info only |
| 9 | Error Recovery | Helpful error messages, recovery paths, fallback states |
| 10 | Help and Documentation | Tooltips, descriptions, onboarding |

---

## 3. Visual Aesthetics (/28)

Score 0-4 each. **0**=Missing, **1**=Broken/flawed, **2**=Present but has obvious issues (most features), **3**=Works well + consistent across all screens, **4**=Genuinely excellent

| # | Dimension | What to judge |
|---|-----------|---------------|
| 1 | **Color Harmony** | Colors pleasing together? Contrast? Palette cohesive? Dark mode comfortable? |
| 2 | **Typography** | Clear hierarchy? Readable sizes? Consistent weights? Good line spacing? |
| 3 | **Element Sizing** | Buttons/rows tall enough for tapping? Icons proportional? Sizes consistent across pages? |
| 4 | **Spacing & Breathing Room** | Gaps between elements? Internal padding generous? Cramped or too loose? Consistent? |
| 5 | **Alignment & Grid** | Consistent grid? Left edges aligned? Same width? No floating elements? |
| 6 | **Visual Hierarchy** | Eye flows naturally? Primary action obvious? Important elements stand out? |
| 7 | **Polish & Detail** | Corners consistent? Shadows appropriate? Borders tasteful? Hover/active designed? Professional? |

### Layout Checklist (per screen)

| Check | Threshold | Tailwind Class |
|-------|-----------|----------------|
| Row height | ≥ 48px (tap target) | `min-h-12` or `py-5` |
| Internal padding | ≥ 16px | `p-4` or `px-5 py-5` |
| Sibling gap | ≥ 12px | `gap-3` or `gap-3.5` |
| Section gap | ≥ 24px | `gap-6` or `gap-8` |
| Heading to content | ≥ 24px | `mb-6` |
| Touch target | ≥ 44px | `min-h-11 min-w-11` |
| Icon proportion | Proportional to text | `size={16-20}` |
| Consistent sizing | Same type = same height | Verify across pages |

---

## 4. User Friendliness (/20)

Score 0-4 as a **first-time Vietnamese learner**. **0**=Confusing, **1**=Difficult, **2**=Usable, **3**=Easy, **4**=Intuitive/delightful

| # | Dimension | What to judge |
|---|-----------|---------------|
| 1 | **First Impression** | Does home communicate what app does? Where to start? |
| 2 | **Navigation Clarity** | Find things in ≤2 taps? Back buttons clear? Location obvious? |
| 3 | **Action Clarity** | Buttons obviously clickable? Labels describe outcome? Primary action clear? |
| 4 | **Learning Curve** | Start quiz without instructions? Modes self-explanatory? |
| 5 | **Delight & Motivation** | Encouraging? Progress indicators? Rewarding? Would user return? |

---

## 5. WCAG Accessibility (/20)

Detailed audit per `reference/wcag-audit.md`. Score 0-4 each:

| # | Category | What to check |
|---|----------|---------------|
| 1 | **Contrast** | Text ≥4.5:1 (normal), ≥3:1 (large). Hero subtitle, section labels, muted text |
| 2 | **Touch Targets** | All interactive ≥44×44px. Header icons, checkboxes, small links |
| 3 | **Labels & ARIA** | Icons have text/aria-label. Proper roles. Form labels |
| 4 | **Screen Reader** | Heading hierarchy h1→h2→h3. Landmarks. Alt text |
| 5 | **Keyboard & Focus** | Focus indicators visible. Tab order logical. Skip-to-content |

Output a PASS/WARN/FAIL table for specific elements (see `reference/wcag-audit.md`).

---

## Report Template

```
=== UI REVIEW REPORT ===
Technical (app-wide): ??/20

Per-Screen Scores:
| Screen         | Heuristics (/40) | Aesthetics (/28) | Friendly (/20) | WCAG (/20) |
|----------------|-------------------|-------------------|----------------|------------|
| Home           | ? | ? | ? | ? |
| Courses        | ? | ? | ? | ? |
| Course Detail  | ? | ? | ? | ? |
| Lesson Menu    | ? | ? | ? | ? |
| Kanji          | ? | ? | ? | ? |
| HSK            | ? | ? | ? | ? |
| Settings       | ? | ? | ? | ? |
| **Average**    | ? | ? | ? | ? |
| **Lowest**     | ? (screen) | ? (screen) | ? (screen) | ? (screen) |

Combined: Tech + avg(Heuristics) + avg(Aesthetics) + avg(Friendly) + avg(WCAG) = ??/128

Before/After Comparison (per changed screen):
| Screen | Before | After | What changed visually |
|--------|--------|-------|----------------------|
| {screen} | screenshots/before-pr-XXX/{screen}/dark-mobile.png | screenshots/after-pr-XXX/{screen}/dark-mobile.png | {description} |
Weakest screen: [name] at ??/128

WCAG Audit Table:
| Status | Element | Check | Notes |
|--------|---------|-------|-------|
| ✅/⚠️/❌ | ... | ... | ... |

Top 3 Issues (with code fixes per reference/code-fixes.md):
1. [Screen: X] ...
2. [Screen: Y] ...
3. [Screen: Z] ...
```

**Key rule:** Report the LOWEST screen score separately. This is the real quality bar.
Screenshots are local only (gitignored). Save report to `documents/04-quality/ui-review-latest.md`.
