# Grammar Reference Components

This document describes the three new Svelte components created for the Grammar Reference screen.

## Components Overview

### 1. GrammarDetailModal.svelte
**Location:** `/mnt/f/2026-Smart-Quiz/svelte-app/src/lib/components/grammar/GrammarDetailModal.svelte`

**Purpose:** Full-screen modal that displays detailed information about a grammar pattern.

**Props:**
- `pattern: GrammarPattern` - The grammar pattern to display
- `allPatterns: GrammarPattern[]` - All available patterns (for related pattern navigation)
- `isOpen: boolean` - Controls modal visibility

**Events:**
- `close` - Emitted when the modal is closed (ESC key, overlay click, or close button)
- `showRelated` - Emitted when a related pattern is clicked (passes the pattern object)

**Features:**
- Pattern meaning (Vietnamese and English)
- Meta tags (JLPT level, difficulty, lesson number)
- Detailed explanation
- Tips and mnemonics for memorization
- Common mistakes warnings
- Usage notes
- Multiple examples with translations
- Related patterns (clickable to navigate)
- ESC key support for closing
- Responsive design for mobile

**Based on:** `showPatternDetail()` function from `grammar-reference.js` (line 680)

---

### 2. ComparisonCard.svelte
**Location:** `/mnt/f/2026-Smart-Quiz/svelte-app/src/lib/components/grammar/ComparisonCard.svelte`

**Purpose:** Card component that displays a grammar comparison summary.

**Props:**
- `comparison: GrammarComparison` - The comparison data to display

**Events:**
- `click` - Emitted when the card is clicked

**Features:**
- Comparison title (Japanese)
- Pattern badges showing which patterns are compared
- Vietnamese and English descriptions
- JLPT level and difficulty tags
- Hover effects and keyboard navigation (Enter key support)
- Responsive design

**Based on:** `createComparisonCard()` function from `grammar-reference.js` (line 365)

---

### 3. ComparisonModal.svelte
**Location:** `/mnt/f/2026-Smart-Quiz/svelte-app/src/lib/components/grammar/ComparisonModal.svelte`

**Purpose:** Full-screen modal that displays a detailed comparison between grammar patterns.

**Props:**
- `comparison: GrammarComparison` - The comparison data to display
- `isOpen: boolean` - Controls modal visibility

**Events:**
- `close` - Emitted when the modal is closed (ESC key, overlay click, or close button)

**Features:**
- Comparison title
- Tips section for distinguishing patterns
- Comparison table (side-by-side with headers and rows)
- Examples section with pattern-specific examples
- Common mistakes warnings
- ESC key support for closing
- Responsive table with horizontal scrolling on mobile
- Theme-aware styling (light/dark mode)

**Based on:** `showComparisonModal()` function from `grammar-reference.js` (line 408)

---

## Usage Examples

### GrammarDetailModal

```svelte
<script>
  import { GrammarDetailModal } from '$lib/components/grammar';

  let showModal = false;
  let currentPattern = {
    pattern: "～は ～です",
    vietnamese: "là, thì",
    english: "is, am, are",
    explanation: "Mẫu câu cơ bản để giới thiệu hoặc mô tả...",
    lessonNumber: 1,
    meta: {
      jlptLevel: "N5",
      difficulty: "beginner",
      tips: "は đánh dấu chủ đề của câu...",
      relatedPatterns: ["～が ～です", "～も ～です"]
    },
    examples: [
      {
        japanese: "私は学生です。",
        vietnamese: "Tôi là học sinh.",
        english: "I am a student."
      }
    ]
  };

  function handleShowRelated(event) {
    currentPattern = event.detail;
  }
</script>

<GrammarDetailModal
  pattern={currentPattern}
  allPatterns={allPatterns}
  bind:isOpen={showModal}
  on:close={() => showModal = false}
  on:showRelated={handleShowRelated}
/>
```

### ComparisonCard

```svelte
<script>
  import { ComparisonCard } from '$lib/components/grammar';

  const comparison = {
    id: "wa-vs-ga",
    title: "は vs が",
    vietnamese: "So sánh trợ từ は và が",
    patterns: ["～は ～です", "～が ～です"],
    jlptLevel: "N5",
    difficulty: "beginner"
  };

  function handleClick() {
    // Open comparison modal
  }
</script>

<ComparisonCard
  {comparison}
  on:click={handleClick}
/>
```

### ComparisonModal

```svelte
<script>
  import { ComparisonModal } from '$lib/components/grammar';

  let showModal = false;

  const comparison = {
    id: "wa-vs-ga",
    title: "は vs が",
    vietnamese: "So sánh trợ từ は và が",
    patterns: ["～は ～です", "～が ～です"],
    tips: "Quy tắc đơn giản: は cho chủ đề chung...",
    table: {
      headers: ["", "は (wa)", "が (ga)"],
      rows: [
        {
          aspect: "Vai trò",
          wa: "Đánh dấu chủ đề của câu",
          ga: "Đánh dấu chủ ngữ của câu"
        }
      ]
    },
    examples: [
      {
        pattern: "は",
        japanese: "田中さんは先生です。",
        vietnamese: "Anh Tanaka là giáo viên.",
        explanation: "は đánh dấu chủ đề: đang nói về Tanaka"
      }
    ],
    commonMistakes: [
      "Không dùng が trong câu 'Tôi là học sinh' → 私は学生です (dùng は)"
    ]
  };
</script>

<ComparisonModal
  {comparison}
  bind:isOpen={showModal}
  on:close={() => showModal = false}
/>
```

---

## TypeScript Types

All components use types from `$lib/types/grammar.ts`:

- `GrammarPattern` - Pattern with metadata
- `GrammarComparison` - Comparison data
- `ComparisonTable` - Table structure
- `ComparisonRow` - Table row data
- `ComparisonExample` - Example with pattern context

---

## Styling

All components use CSS custom properties for theming:

### Colors
- `--bg-primary` - Primary background
- `--bg-card` - Card background
- `--text-primary` - Primary text
- `--text-muted` - Muted text
- `--primary` - Primary accent color
- `--accent` - Secondary accent color
- `--border` - Border color
- `--success` - Success color
- `--warning` - Warning color
- `--danger` - Danger color

### Spacing & Layout
- `--radius` - Border radius
- `--radius-sm` - Small border radius
- `--shadow` - Box shadow
- `--shadow-lg` - Large box shadow
- `--transition` - Transition duration

### Typography
- `--font-jp` - Japanese font family

All components are fully responsive and support dark mode through theme-aware CSS.

---

## Accessibility

All components include:
- Keyboard navigation (ESC key to close modals)
- ARIA labels for close buttons
- Focus management
- Semantic HTML
- Role attributes for interactive elements

---

## Animation

- Modal components use a slide-up animation on open
- Smooth transitions on hover states
- Backdrop blur effect for modal overlays

---

## Integration with Grammar Reference Screen

These components are designed to be used together:

1. **GrammarCard** (from Phase 2) - Shows pattern in list view
2. **GrammarDetailModal** - Opens when "Chi tiết" button is clicked
3. **ComparisonCard** - Shows comparison in comparisons view
4. **ComparisonModal** - Opens when comparison card is clicked

Example workflow:
```
Grammar List → Click "Chi tiết" → GrammarDetailModal
              → Click related pattern → Show new pattern in same modal

Comparisons View → Click comparison card → ComparisonModal
```

---

## Files Created

1. `/mnt/f/2026-Smart-Quiz/svelte-app/src/lib/components/grammar/GrammarDetailModal.svelte`
2. `/mnt/f/2026-Smart-Quiz/svelte-app/src/lib/components/grammar/ComparisonCard.svelte`
3. `/mnt/f/2026-Smart-Quiz/svelte-app/src/lib/components/grammar/ComparisonModal.svelte`
4. `/mnt/f/2026-Smart-Quiz/svelte-app/src/lib/components/grammar/index.ts` (barrel export)

---

## Next Steps

To complete the Grammar Reference screen migration:

1. Create the main Grammar Reference page component (`routes/grammar/+page.svelte`)
2. Migrate grammar data to TypeScript (if not already done)
3. Implement filtering and search functionality
4. Implement view mode switching (lesson/category/function/comparisons)
5. Add quiz mode selection for selected patterns
6. Integrate with existing stores and state management
