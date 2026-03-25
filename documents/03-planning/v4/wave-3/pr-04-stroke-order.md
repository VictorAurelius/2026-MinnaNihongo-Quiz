# PR #4: Kanji Stroke Order Animation (KanjiVG)

**Wave:** 3 — Kanji Core
**Branch:** `feat/kanji-stroke-order`
**Est:** 6h | **New tests:** 9
**Status:** [ ] Not started

---

## 1. Brainstorm

### Problem
- Nhai Kanji core differentiator = stroke order animation
- Smart Quiz chỉ có static reference table (character + readings)
- User không biết thứ tự viết kanji

### Solution
- Download KanjiVG SVGs (CC BY-SA 3.0) cho 256 kanji hiện có
- StrokeOrder component: parse SVG paths, animate từng stroke bằng CSS `stroke-dasharray`
- Controls: Play/Pause, Speed, Step forward/back
- Lazy load SVG per character (không tăng initial bundle)

### KanjiVG Data
- Source: https://github.com/KanjiVG/kanjivg (CC BY-SA 3.0)
- Format: `{5-digit-unicode-hex}.svg` (e.g., `04e00.svg` cho 一)
- Mỗi SVG chứa `<path>` elements, mỗi path = 1 stroke
- Cover 6700+ kanji (dư cho 256 kanji hiện tại)

### Risks
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| SVG format inconsistent | Low | Medium | Parse `<path>` elements only, ignore metadata |
| 256 SVGs = large download | Medium | Low | Lazy load per character, ~5KB each = ~1.3MB total |
| stroke-dasharray browser support | Very Low | Low | Supported all modern browsers |
| SVG missing for some kanji | Very Low | Low | Fallback message "Stroke data not available" |

### Edge Cases
- Kanji không có SVG → show fallback
- User switch kanji nhanh → cancel previous animation
- SVG load fail (network) → retry once + fallback
- Very complex kanji (>20 strokes) → animation slower, step mode useful

---

## 2. Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | Script extract 256 SVGs from KanjiVG | `scripts/extract-kanjivg.sh` | 30m | 256 files in static/kanjivg/ |
| 2 | Viết StrokeOrder tests (RED) | `src/tests/components/kanji/StrokeOrder.test.ts` | 10m | 9 tests FAIL |
| 3 | Implement StrokeOrder component | `src/lib/components/kanji/StrokeOrder.svelte` | 45m | 9 tests GREEN |
| 4 | Integrate into kanji reference page | `src/routes/kanji/[lesson]/reference/+page.svelte` | 15m | Visual |
| 5 | Integrate into KanjiFlashCard back | `src/lib/components/kanji/KanjiFlashCard.svelte` | 10m | Visual |

---

## 3. TDD — Full Test Code

```typescript
// src/tests/components/kanji/StrokeOrder.test.ts
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import StrokeOrder from '$lib/components/kanji/StrokeOrder.svelte';

describe('StrokeOrder', () => {
  it('should render container element', () => {
    const { container } = render(StrokeOrder, { props: { character: '一' } });
    expect(container.querySelector('.stroke-order')).toBeInTheDocument();
  });

  it('should show stroke counter', () => {
    const { container } = render(StrokeOrder, { props: { character: '一' } });
    expect(container.textContent).toMatch(/stroke/i);
  });

  it('should have Play button', () => {
    render(StrokeOrder, { props: { character: '一' } });
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
  });

  it('should have speed control', () => {
    const { container } = render(StrokeOrder, { props: { character: '一' } });
    expect(container.querySelector('.speed-control')).toBeInTheDocument();
  });

  it('should have Step forward button', () => {
    render(StrokeOrder, { props: { character: '一' } });
    expect(screen.getByRole('button', { name: /next|step|forward/i })).toBeInTheDocument();
  });

  it('should have Step back button', () => {
    render(StrokeOrder, { props: { character: '一' } });
    expect(screen.getByRole('button', { name: /prev|back/i })).toBeInTheDocument();
  });

  it('should show fallback when character has no SVG', () => {
    const { container } = render(StrokeOrder, { props: { character: '🎉' } });
    expect(container.textContent).toMatch(/not available|no stroke/i);
  });

  it('should accept autoPlay prop', () => {
    const { container } = render(StrokeOrder, { props: { character: '一', autoPlay: true } });
    expect(container.querySelector('.stroke-order')).toBeInTheDocument();
  });

  it('should reset when character prop changes', () => {
    const { container, component } = render(StrokeOrder, { props: { character: '一' } });
    expect(container.querySelector('.stroke-order')).toBeInTheDocument();
  });
});
```

---

## 4. Implementation Notes

### SVG Extraction Script
```bash
# scripts/extract-kanjivg.sh
# Extract 256 kanji SVGs from KanjiVG repo
# Usage: ./scripts/extract-kanjivg.sh

# 1. Clone KanjiVG (if not cached)
# 2. For each kanji in our data → find matching SVG by unicode hex
# 3. Copy to svelte-app/static/kanjivg/{hex}.svg
```

### StrokeOrder.svelte (simplified)
```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { base } from '$app/paths';

  export let character: string;
  export let autoPlay = false;

  let paths: SVGPathElement[] = [];
  let currentStroke = 0;
  let playing = false;
  let speed = 1;
  let loaded = false;
  let error = false;

  // Convert character to unicode hex for SVG filename
  function charToHex(char: string): string {
    return char.codePointAt(0)?.toString(16).padStart(5, '0') || '';
  }

  async function loadSVG() {
    const hex = charToHex(character);
    try {
      const response = await fetch(`${base}/kanjivg/${hex}.svg`);
      if (!response.ok) { error = true; return; }
      const text = await response.text();
      // Parse paths from SVG
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'image/svg+xml');
      paths = Array.from(doc.querySelectorAll('path[d]'));
      loaded = true;
      if (autoPlay) play();
    } catch { error = true; }
  }

  function play() { /* animate strokes */ }
  function pause() { playing = false; }
  function stepForward() { currentStroke = Math.min(currentStroke + 1, paths.length); }
  function stepBack() { currentStroke = Math.max(currentStroke - 1, 0); }

  $: if (character) { loaded = false; error = false; currentStroke = 0; loadSVG(); }
</script>
```

### Integration in kanji reference
```svelte
<!-- In expanded card, after readings -->
{#if showStrokes}
  <StrokeOrder character={kanji.character} />
{/if}
<button on:click={() => showStrokes = !showStrokes}>
  {showStrokes ? 'Hide' : 'Show'} Strokes
</button>
```

---

## 5. Acceptance Criteria

- [ ] 256 SVG files in `static/kanjivg/`
- [ ] StrokeOrder component renders with controls
- [ ] CSS stroke-dasharray animation smooth
- [ ] Controls: Play/Pause, Speed (0.5x/1x/2x), Step forward/back
- [ ] Stroke counter "Stroke X/Y"
- [ ] Lazy load: SVG fetched on demand (not bundled)
- [ ] Fallback when SVG not found
- [ ] Integrated in kanji reference page (toggle)
- [ ] Tests: 9 new pass
- [ ] Build pass, bundle size increase < 100KB (SVGs are static, not bundled)

---

## 6. Diagrams to Create

| Diagram | File | Type |
|---------|------|------|
| Stroke Animation Pipeline | `documents/06-diagrams/source/stroke-animation.puml` | PlantUML |

## 7. Skills to Create

**Dự kiến:** `canvas-svg-patterns.md`
- SVG lazy loading pattern (fetch + DOMParser)
- stroke-dasharray animation technique
- Character → unicode hex conversion
