# PR #27 — Icon System (Emoji → lucide-svelte)

> **Type:** refactor(ui)
> **Scope:** Replace 26+ emoji icons with lucide-svelte icon library
> **Depends on:** PR #26 (component migration)
> **Risk:** MEDIUM — visual change only, no logic changes

## Problem

26+ emoji characters used as UI icons across the app. Issues:
- Inconsistent rendering across OS/browsers (Windows vs macOS vs Android)
- No size control (emoji scale with font-size, not icon-size)
- No color control (emoji colors are fixed)
- Poor accessibility (screen readers may read emoji names)
- "AI slop" tell per design skills audit

## Solution: lucide-svelte

[lucide-svelte](https://lucide.dev/) — MIT licensed, 1400+ icons, tree-shakeable, Svelte-native.

```bash
cd svelte-app && npm install lucide-svelte
```

## Migration Map

| Current Emoji | Location | Replace With |
|---------------|----------|-------------|
| `🏠` | Header | `<Home />` |
| `⚙️` | Header | `<Settings />` |
| `☀️` / `🌙` | Header | `<Sun />` / `<Moon />` |
| `📚` | Header, Kanji, Vocabulary | `<BookOpen />` |
| `📊` | Header | `<BarChart3 />` |
| `🔄` | Header, Results | `<RefreshCw />` |
| `🔊` | FlashCard, MC, Typing, Kanji | `<Volume2 />` |
| `⌨️` | TypingQuiz | `<Keyboard />` |
| `💡` | TypingQuiz, Grammar | `<Lightbulb />` |
| `📝` | Lesson Menu, Results | `<PenLine />` |
| `🎴` | Home, Lesson Menu, Vocabulary | `<Layers />` (flashcard) |
| `✓` / `✗` | Quiz components | `<Check />` / `<X />` |
| `⌨️` / `✓` | Quiz mode buttons | `<Keyboard />` / `<CheckCircle />` |
| `←` | BackButton | `<ArrowLeft />` |
| `→` | TypingQuiz next | `<ArrowRight />` |
| `✕` | Close buttons, Vocabulary | `<X />` |
| `☑` / `☐` | Vocabulary checkbox | `<CheckSquare />` / `<Square />` |
| `🎉` `👍` `💪` | Results feedback | `<PartyPopper />` `<ThumbsUp />` `<Zap />` |
| `🇯🇵` `🇻🇳` | Direction selector | Text labels or custom flag icons |
| `📖` | Lesson Menu | `<Book />` |
| `⚠️` | Grammar modals | `<AlertTriangle />` |
| `✍️` | Grammar modals | `<Edit3 />` |

## Tasks

1. Install `lucide-svelte`
2. Create `$lib/components/common/Icon.svelte` wrapper (optional — for consistent sizing)
3. Replace emojis in each component file (see map above)
4. For flag emojis (`🇯🇵`, `🇻🇳`), use text labels ("JP→VN") instead
5. Ensure all icons have `aria-hidden="true"` when decorative
6. Ensure icons with meaning have `aria-label`

## Tests
- Snapshot/visual tests for components with icon changes
- Test icon sizing at different viewport sizes
- Verify `aria-hidden` on decorative icons
- Verify emoji count = 0 in component files:
  ```bash
  grep -rn '[\x{1F300}-\x{1F9FF}]' svelte-app/src/lib/components/ | wc -l
  # Should be 0
  ```

## Files Changed
- `svelte-app/package.json` (add lucide-svelte)
- `svelte-app/src/lib/components/layout/Header.svelte`
- `svelte-app/src/lib/components/common/BackButton.svelte`
- `svelte-app/src/lib/components/quiz/FlashCard.svelte`
- `svelte-app/src/lib/components/quiz/MultipleChoice.svelte`
- `svelte-app/src/lib/components/quiz/TypingQuiz.svelte`
- `svelte-app/src/lib/components/kanji/*.svelte` (3-4 files)
- `svelte-app/src/lib/components/grammar/*.svelte` (2-3 files)
- Route pages: Home, Lesson Menu, Vocabulary, Results, Kanji
- ~15-20 files total
