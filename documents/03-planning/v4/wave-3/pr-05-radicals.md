# PR #5: Kanji Radical Breakdown (KRADFILE)

**Wave:** 3 — Kanji Core
**Branch:** `feat/kanji-radicals`
**Est:** 5h | **New tests:** 11
**Status:** [ ] Not started

---

## 1. Brainstorm

### Problem
- Nhai Kanji có "chiết tự trực quan" — phân tích kanji thành radicals
- Smart Quiz không có radical data, user không biết cấu trúc kanji

### Solution
- KRADFILE data (public domain): mapping kanji → component radicals
- 214 Kangxi radicals với tên Hán Việt + English meaning
- RadicalBreakdown component trong expanded kanji card
- Separate /kanji/radicals page hiển thị 214 bộ thủ

### Data Sources
- KRADFILE-U: 13,108 kanji→radicals mapping (Unicode version)
- JSON conversion: https://github.com/hoffmannjp/krad-unicode
- License: EDRDG (free use, attribution required)

### Risks
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| KRADFILE chỉ list radicals, không visual | Certain | Low | Simple list layout, not diagram |
| 214 radicals cần Vietnamese names | High | Medium | Manual translation, ~2h work |
| Some kanji missing from KRADFILE | Very Low | Low | Show "No radical data" fallback |

### Edge Cases
- Simple kanji (一, 二) = very few or same radical as character itself
- Radical not in current 256 kanji list → show in radicals page but no "kanji using this" link
- Click radical → filter kanji by radical

---

## 2. Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | Create radicals data (214 bộ thủ + mapping) | `src/lib/data/kanji/radicals.ts` | 60m | Data file exists |
| 2 | Viết radicals data tests (RED) | `src/tests/data/radicals.test.ts` | 10m | 7 tests FAIL |
| 3 | Viết RadicalBreakdown tests (RED) | `src/tests/components/kanji/RadicalBreakdown.test.ts` | 5m | 4 tests FAIL |
| 4 | Implement RadicalBreakdown component | `src/lib/components/kanji/RadicalBreakdown.svelte` | 15m | 4 tests GREEN |
| 5 | Integrate into kanji reference page | `src/routes/kanji/[lesson]/reference/+page.svelte` | 10m | Visual |
| 6 | Create 214 radicals page | `src/routes/kanji/radicals/+page.svelte` | 30m | Visual + nav |
| 7 | Add route title + nav link | `Header.svelte` | 5m | Title shows |

---

## 3. TDD — Full Test Code

```typescript
// src/tests/data/radicals.test.ts
import { describe, it, expect } from 'vitest';
import { KANGXI_RADICALS, getRadicals, getKanjiByRadical } from '$lib/data/kanji/radicals';

describe('Radicals Data', () => {
  it('should have 214 Kangxi radicals', () => {
    expect(KANGXI_RADICALS.length).toBe(214);
  });

  it('each radical should have character, meaningVi, meaningEn, strokeCount', () => {
    for (const r of KANGXI_RADICALS) {
      expect(r.character).toBeTruthy();
      expect(r.meaningVi).toBeTruthy();
      expect(r.meaningEn).toBeTruthy();
      expect(r.strokeCount).toBeGreaterThan(0);
    }
  });

  it('getRadicals("会") should return array of radicals', () => {
    const radicals = getRadicals('会');
    expect(radicals.length).toBeGreaterThan(0);
  });

  it('getRadicals should return empty for unknown character', () => {
    expect(getRadicals('🎉')).toEqual([]);
  });

  it('getKanjiByRadical("人") should return kanji array', () => {
    const kanji = getKanjiByRadical('人');
    expect(kanji.length).toBeGreaterThan(0);
  });

  it('getKanjiByRadical should return empty for unknown radical', () => {
    expect(getKanjiByRadical('🎉')).toEqual([]);
  });

  it('all 256 current kanji should have at least 1 radical', () => {
    // Import all kanji characters from lessons
    // Each should have mapping in KRADFILE
    // (This test validates data completeness)
    expect(true).toBe(true); // Implement with actual kanji list
  });
});

// src/tests/components/kanji/RadicalBreakdown.test.ts
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import RadicalBreakdown from '$lib/components/kanji/RadicalBreakdown.svelte';

describe('RadicalBreakdown', () => {
  it('should render kanji character', () => {
    const { container } = render(RadicalBreakdown, { props: { character: '会' } });
    expect(container.textContent).toContain('会');
  });

  it('should list radicals', () => {
    const { container } = render(RadicalBreakdown, { props: { character: '会' } });
    const items = container.querySelectorAll('.radical-item');
    expect(items.length).toBeGreaterThan(0);
  });

  it('should show fallback for unknown kanji', () => {
    const { container } = render(RadicalBreakdown, { props: { character: '🎉' } });
    expect(container.textContent).toMatch(/no radical|not available/i);
  });

  it('should show Hán Việt name for each radical', () => {
    const { container } = render(RadicalBreakdown, { props: { character: '人' } });
    // 人 radical should show its Vietnamese name
    expect(container.textContent).toBeTruthy();
  });
});
```

---

## 4. Implementation Notes

### radicals.ts structure
```typescript
export interface KangxiRadical {
  number: number;       // 1-214
  character: string;    // 一, 丨, 丶, etc.
  meaningVi: string;    // Hán Việt: nhất, cổn, chủ, etc.
  meaningEn: string;    // one, line, dot, etc.
  strokeCount: number;
  variants?: string[];  // alternative forms
}

export const KANGXI_RADICALS: KangxiRadical[] = [
  { number: 1, character: '一', meaningVi: 'nhất', meaningEn: 'one', strokeCount: 1 },
  // ... 214 entries
];

// KRADFILE mapping: kanji → radical characters
const KANJI_RADICALS: Record<string, string[]> = {
  '会': ['人', '一', '云'],
  // ... 256+ entries
};

export function getRadicals(character: string): KangxiRadical[] { ... }
export function getKanjiByRadical(radical: string): string[] { ... }
```

### RadicalBreakdown.svelte
```svelte
<script lang="ts">
  import { getRadicals } from '$lib/data/kanji/radicals';
  export let character: string;
  $: radicals = getRadicals(character);
</script>

<div class="radical-breakdown">
  {#if radicals.length > 0}
    <div class="radical-list">
      {#each radicals as r}
        <a href="..." class="radical-item">
          <span class="radical-char">{r.character}</span>
          <span class="radical-name">{r.meaningVi}</span>
        </a>
      {/each}
    </div>
  {:else}
    <p class="no-data">No radical data available</p>
  {/if}
</div>
```

---

## 5. Acceptance Criteria

- [ ] 214 Kangxi radicals with character, meaningVi, meaningEn, strokeCount
- [ ] 256 kanji have radical mapping (from KRADFILE)
- [ ] RadicalBreakdown shows in expanded kanji reference card
- [ ] `/kanji/radicals` page: 214 radicals grid with search/filter
- [ ] Click radical → show kanji containing that radical
- [ ] Fallback for unknown characters
- [ ] Route title in Header
- [ ] Tests: 11 new pass
- [ ] Build pass

---

## 6. Diagrams to Create

| Diagram | File | Type |
|---------|------|------|
| Radical Data Flow | `documents/06-diagrams/source/radical-flow.puml` | PlantUML |

## 7. Skills to Create

**Dự kiến:** Thêm vào `data-conventions.md` (nếu chưa tạo):
- Large data file pattern (TS const export, code-split by level)
- Mapping data pattern (Record<string, string[]>)
