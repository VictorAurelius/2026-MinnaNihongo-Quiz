# WCAG 2.1 AA Accessibility Audit

Score /20 total (5 categories × 0-4 each). Output a PASS/WARN/FAIL table.

## 5 Audit Categories

| # | Category | Score 0-4 | What to check |
|---|----------|-----------|---------------|
| 1 | **Contrast** | ? | Text on backgrounds ≥4.5:1 (normal) or ≥3:1 (large). Check: hero banner subtitle, section labels, muted text, unselected tabs |
| 2 | **Touch Targets** | ? | All interactive elements ≥44×44px. Check: header icons, nav buttons, checkboxes, small links |
| 3 | **Labels & ARIA** | ? | All icons have text labels or aria-label. Interactive elements have proper roles. Forms have associated labels |
| 4 | **Screen Reader** | ? | Heading hierarchy (h1→h2→h3). Landmark regions. Alt text. Live regions for dynamic content |
| 5 | **Keyboard & Focus** | ? | Visible focus indicators. Logical tab order. No keyboard traps. Skip-to-content link |

## Output Format

For each check, mark status:

```markdown
| Status | Element | Check | Notes |
|--------|---------|-------|-------|
| ✅ PASS | Quiz items text | Contrast ≥4.5:1 | Dark text on white bg |
| ⚠️ WARN | Section labels | Contrast ~3.8:1 | Light gray uppercase on white — borderline |
| ❌ FAIL | Header icons | No text labels | Screen reader cannot identify function |
| 🔍 N/A | Keyboard nav | Needs live test | Cannot verify from screenshot |
```

## Scoring

- **4/4**: Zero FAIL, ≤1 WARN
- **3/4**: Zero FAIL, 2-3 WARNs
- **2/4**: 1 FAIL or 4+ WARNs
- **1/4**: 2-3 FAILs
- **0/4**: 4+ FAILs or fundamentally inaccessible

## Common Smart Quiz Checks

| Element | Expected | WCAG Criterion |
|---------|----------|----------------|
| Hero banner subtitle (white on purple gradient) | Contrast ≥3:1 (large text) | 1.4.3 |
| Section headings (uppercase muted-foreground) | Contrast ≥4.5:1 | 1.4.3 |
| Unselected direction tabs | Contrast ≥4.5:1 | 1.4.3 |
| Header nav icons (home, settings, dark mode) | Must have aria-label | 1.1.1 |
| Header nav icons | Touch target ≥44×44px | 2.5.8 |
| Checkboxes (settings) | Associated label element | 1.3.1 |
| Quiz mode buttons | Descriptive accessible name | 4.1.2 |
| Page headings | Proper h1→h2→h3 hierarchy | 1.3.1 |
