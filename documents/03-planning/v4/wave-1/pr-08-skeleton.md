# PR #8: Skeleton Loading + Branding

**Wave:** 1 — Foundation
**Branch:** `feat/ui-polish`
**Est:** 3h | **New tests:** 6
**Status:** [ ] Not started

---

## 1. Brainstorm

### Problem
- Blank flash khi chuyển trang (SPA re-render)
- Không có logo — "Smart Quiz" text-only, brand identity yếu (3/10 branding)
- Nhai Kanji có skeleton loading cards — cảm giác polished hơn

### Solution
- Reusable `<Skeleton>` component với shimmer animation
- `<SkeletonCard>` pre-built cho card layouts
- SVG logo monogram "SQ" + text
- Apply skeleton cho 3+ pages có data loading

### Alternatives
| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| CSS-only skeleton | Zero JS, fast | Không reusable, repeat code | ❌ |
| Svelte component + CSS | Reusable, props | Thêm component | ✅ Pick |
| Library (svelte-loading-skeleton) | Feature-rich | Dependency, overkill | ❌ |

### Risks
| Risk | Mitigation |
|------|-----------|
| Skeleton flash quá nhanh (data load < 100ms) | Minimum display time 200ms |
| Logo SVG không render đúng ở 24px | Test multiple sizes, use viewBox |

### Edge Cases
- SSR/prerender: skeleton không cần (content sẵn) → guard `onMount`
- Dark mode: skeleton colors phải theo theme variables

---

## 2. Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | Viết Skeleton tests (RED) | `tests/components/common/Skeleton.test.ts` | 5m | 4 tests FAIL |
| 2 | Implement Skeleton component | `lib/components/common/Skeleton.svelte` | 10m | 4 tests GREEN |
| 3 | Viết SkeletonCard tests (RED) | Same file | 3m | 2 tests FAIL |
| 4 | Implement SkeletonCard | `lib/components/common/SkeletonCard.svelte` | 10m | 2 tests GREEN |
| 5 | Thêm shimmer CSS keyframes | `src/app.css` | 5m | Visual check |
| 6 | Tạo logo SVG | `static/logo.svg` | 15m | Renders at 24/48/96px |
| 7 | Thêm skeleton vào Course page | `routes/course/[courseId]/+page.svelte` | 10m | No blank flash |
| 8 | Thêm skeleton vào Stats page | `routes/stats/+page.svelte` | 10m | No blank flash |
| 9 | Thêm skeleton vào Review page | `routes/review/+page.svelte` | 10m | No blank flash |
| 10 | Logo trong Header | `components/layout/Header.svelte` | 5m | Visual |

---

## 3. TDD — Full Test Code

```typescript
// src/tests/components/common/Skeleton.test.ts
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import Skeleton from '$lib/components/common/Skeleton.svelte';
import SkeletonCard from '$lib/components/common/SkeletonCard.svelte';

describe('Skeleton', () => {
  it('should render with default dimensions', () => {
    const { container } = render(Skeleton);
    const el = container.querySelector('.skeleton');
    expect(el).toBeInTheDocument();
  });

  it('should accept custom width and height props', () => {
    const { container } = render(Skeleton, { props: { width: '200px', height: '2rem' } });
    const el = container.querySelector('.skeleton');
    expect(el?.getAttribute('style')).toContain('width: 200px');
    expect(el?.getAttribute('style')).toContain('height: 2rem');
  });

  it('should have shimmer animation class', () => {
    const { container } = render(Skeleton);
    expect(container.querySelector('.skeleton-shimmer')).toBeInTheDocument();
  });

  it('should have role="status" and aria-label', () => {
    const { container } = render(Skeleton);
    const el = container.querySelector('.skeleton');
    expect(el?.getAttribute('role')).toBe('status');
    expect(el?.getAttribute('aria-label')).toBe('Loading');
  });
});

describe('SkeletonCard', () => {
  it('should render title + lines + button skeleton', () => {
    const { container } = render(SkeletonCard);
    const skeletons = container.querySelectorAll('.skeleton');
    expect(skeletons.length).toBeGreaterThanOrEqual(4); // title + 2 lines + button
  });

  it('should have card container', () => {
    const { container } = render(SkeletonCard);
    expect(container.querySelector('.skeleton-card')).toBeInTheDocument();
  });
});
```

---

## 4. Implementation Notes

### Skeleton.svelte
```svelte
<script lang="ts">
  export let width = '100%';
  export let height = '1rem';
  export let rounded = false;
</script>

<div
  class="skeleton skeleton-shimmer"
  class:rounded
  style="width: {width}; height: {height}"
  role="status"
  aria-label="Loading"
></div>
```

### Shimmer CSS (app.css)
```css
.skeleton {
  background: var(--border);
  border-radius: var(--radius-sm);
}
.skeleton-shimmer {
  background: linear-gradient(90deg, var(--border) 25%, var(--bg) 50%, var(--border) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Loading pattern cho pages
```svelte
<script>
  import { onMount } from 'svelte';
  import SkeletonCard from '$lib/components/common/SkeletonCard.svelte';

  let loaded = false;
  onMount(() => { loaded = true; });
</script>

{#if !loaded}
  <SkeletonCard />
  <SkeletonCard />
{:else}
  <!-- actual content -->
{/if}
```

---

## 5. Acceptance Criteria

- [ ] `<Skeleton>` reusable (width, height, rounded props)
- [ ] `<SkeletonCard>` renders title + lines + button placeholders
- [ ] Shimmer animation smooth, respects dark mode
- [ ] Course, Stats, Review pages show skeleton when loading
- [ ] Logo SVG renders correctly at 24px in Header
- [ ] Tests: 6 new pass
- [ ] Build pass

---

## 6. Diagrams to Create

| Diagram | File | Type |
|---------|------|------|
| Quiz Flow (user journey) | `documents/06-diagrams/source/quiz-flow.mmd` | Mermaid |

## 7. Skills to Create

**Dự kiến:** `component-patterns.md` — document Skeleton pattern cho future components.
```
.claude/skills/smart-quiz/component-patterns.md
- Skeleton loading pattern (onMount + {#if loaded})
- SVG icon component pattern
- Reusable props interface
```
