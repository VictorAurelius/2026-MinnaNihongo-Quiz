# PR #30 — Final Polish

> **Type:** fix(ui)
> **Scope:** Final quality pass using design skills audit + polish commands
> **Depends on:** PR #27, #28, #29
> **Risk:** LOW — refinement only

## Process

1. Run `frontend-design/commands/audit.md` on full app → generate scored report
2. Run `frontend-design/commands/polish.md` on each page → fix micro-details
3. Re-run audit → verify score ≥ 17/20

## Checklist (from polish.md)

### Visual Alignment & Spacing
- [ ] All elements align to Tailwind spacing scale (no random values)
- [ ] Consistent spacing between sections across all pages
- [ ] Optical alignment of icons with adjacent text
- [ ] Responsive spacing works at all breakpoints

### Typography
- [ ] Consistent heading hierarchy across pages
- [ ] Japanese/Chinese text uses `font-jp`/`font-cn` consistently
- [ ] Body text line length 45-75 characters
- [ ] No font loading flash (FOUT/FOIT)

### Color & Contrast
- [ ] All text meets WCAG AA contrast ratios
- [ ] No hardcoded colors remain (grep check)
- [ ] Tinted neutrals (no pure gray/black)
- [ ] Dark mode equally polished as light mode

### Interaction States
- [ ] Every button: default, hover, focus, active, disabled states
- [ ] Every link: hover, focus, visited states
- [ ] Loading buttons show spinner
- [ ] Destructive actions use ConfirmDialog

### Transitions
- [ ] All state changes animated (150-300ms, ease-out)
- [ ] Only `transform` and `opacity` animated
- [ ] No bounce/elastic easing
- [ ] `prefers-reduced-motion` respected

### Content
- [ ] Consistent terminology (Vietnamese UI text)
- [ ] Consistent capitalization
- [ ] No placeholder/debug text remaining
- [ ] Error messages are helpful (what + why + how to fix)

### Responsive
- [ ] All pages tested at 320px, 768px, 1024px, 1440px
- [ ] Touch targets ≥ 44x44px on mobile
- [ ] No horizontal scroll at any viewport
- [ ] Text readable at all sizes (≥ 14px on mobile)

### Performance
- [ ] No layout shift on page load (CLS)
- [ ] Images lazy loaded below fold
- [ ] Kanji data lazy loaded per level
- [ ] No console errors or warnings

### Code Hygiene
- [ ] No `console.log` in production code
- [ ] No commented-out code
- [ ] No unused imports
- [ ] No TypeScript `any` types
- [ ] No suppressed a11y warnings

## Verification

```bash
# Check for hardcoded colors
grep -rn 'color: #\|background: #\|bg-\[#\|text-\[#' svelte-app/src/ --include="*.svelte"

# Check for emoji icons
grep -Prn '[\x{1F300}-\x{1F9FF}]' svelte-app/src/lib/components/

# Check for console.log
grep -rn 'console.log' svelte-app/src/ --include="*.ts" --include="*.svelte"

# Check for legacy CSS vars (should be minimal)
grep -rn 'var(--bg)\|var(--text)\|var(--primary)' svelte-app/src/ --include="*.svelte" | wc -l
```

## Tests
- Full test suite passes
- Visual inspection of all 10 pages (light + dark mode)
- Lighthouse accessibility score ≥ 95
- No console errors

## Files Changed
- Various fixes across components and pages (scope TBD based on audit results)
- Estimated ~10-15 files with minor tweaks
