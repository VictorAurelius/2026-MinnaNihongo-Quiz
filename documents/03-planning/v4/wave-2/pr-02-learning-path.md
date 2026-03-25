# PR #2: Learning Path with Mastery-Based Unlocking

**Wave:** 2 — Learning Path
**Branch:** `feat/learning-path`
**Est:** 4h | **New tests:** 15
**Status:** [ ] Not started

---

## 1. Brainstorm

### Problem
- User mở app → 25 bài ngang nhau → không biết bắt đầu từ đâu
- Không có motivation hoàn thành — mọi bài đều accessible ngay
- Nhai Kanji có Roadmap với progression rõ ràng

### Solution
- Mastery unlock: bài N unlock khi bài N-1 đạt ≥ 70% mastery
- "Continue" button trên course page → nhảy đến bài tiếp theo cần học
- MasteryRing SVG quanh lesson number hiển thị tiến độ

### Mastery Calculation
```
mastery % = (items with masteryLevel >= 3) / (total vocab items in lesson) × 100
```
- masteryLevel 0-2 = chưa thuộc
- masteryLevel 3-5 = đã thuộc
- 70% = 7/10 words at level ≥ 3

### Risks
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| User cũ đã có progress | High | Medium | Tính mastery từ existing vocabProgress, không lock bài đã có data |
| 70% threshold quá cao/thấp | Medium | Low | Configurable constant, dễ adjust |
| Course page performance (25 bài × mastery calc) | Low | Low | Tính inline, không heavy computation |
| N4 course ít lessons | Low | Low | Same logic, fewer iterations |

### Edge Cases
- Fresh user: chỉ bài 1 unlocked, rest locked
- User clear progress: tất cả lock lại trừ bài 1
- Lesson chưa có vocab data trong progress: mastery = 0%
- User có progress bài 5 nhưng không có bài 1-4: unlock tất cả có data + bài 1

---

## 2. Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | Viết progressUtils tests (RED) | `src/tests/utils/progressUtils.test.ts` | 10m | 10 tests FAIL |
| 2 | Implement progressUtils | `src/lib/utils/progressUtils.ts` | 15m | 10 tests GREEN |
| 3 | Viết MasteryRing tests (RED) | `src/tests/components/common/MasteryRing.test.ts` | 5m | 5 tests FAIL |
| 4 | Implement MasteryRing SVG | `src/lib/components/common/MasteryRing.svelte` | 15m | 5 tests GREEN |
| 5 | Update course page UI | `src/routes/course/[courseId]/+page.svelte` | 20m | Visual + lock logic |

---

## 3. TDD — Full Test Code

```typescript
// src/tests/utils/progressUtils.test.ts
import { describe, it, expect } from 'vitest';
import { getLessonMastery, isLessonUnlocked, getNextLesson, getCourseProgress } from '$lib/utils/progressUtils';
import type { ProgressState } from '$lib/types';

function makeState(lessons: Record<number, any> = {}): ProgressState {
  return { lessons, hsk: {}, settings: { defaultDirection: 'ja-vi', autoPlay: false, showEnglish: true } };
}

function makeLesson(vocabProgress: Record<string, { masteryLevel: number }>) {
  const vp: Record<string, any> = {};
  for (const [id, { masteryLevel }] of Object.entries(vocabProgress)) {
    vp[id] = { itemId: id, correctCount: 0, wrongCount: 0, lastReviewed: Date.now(), masteryLevel };
  }
  return { lessonNumber: 0, vocabProgress: vp, grammarProgress: {}, lastStudied: Date.now(), totalQuizzes: 0 };
}

describe('getLessonMastery', () => {
  it('should return 0 for lesson with no progress', () => {
    expect(getLessonMastery(makeState(), 'n5', 1)).toBe(0);
  });

  it('should return percentage of items with masteryLevel >= 3', () => {
    const state = makeState({
      1: makeLesson({ w1: { masteryLevel: 4 }, w2: { masteryLevel: 2 }, w3: { masteryLevel: 3 }, w4: { masteryLevel: 1 } })
    });
    state.lessons[1].lessonNumber = 1;
    expect(getLessonMastery(state, 'n5', 1)).toBe(50); // 2/4 = 50%
  });

  it('should return 100 when all items mastered', () => {
    const state = makeState({
      1: makeLesson({ w1: { masteryLevel: 5 }, w2: { masteryLevel: 3 } })
    });
    state.lessons[1].lessonNumber = 1;
    expect(getLessonMastery(state, 'n5', 1)).toBe(100);
  });

  it('should handle missing lesson gracefully', () => {
    expect(getLessonMastery(makeState(), 'n5', 99)).toBe(0);
  });
});

describe('isLessonUnlocked', () => {
  it('should always unlock lesson 1', () => {
    expect(isLessonUnlocked(makeState(), 'n5', 1)).toBe(true);
  });

  it('should lock lesson 2 when lesson 1 mastery < 70%', () => {
    const state = makeState({
      1: makeLesson({ w1: { masteryLevel: 2 }, w2: { masteryLevel: 1 } })
    });
    state.lessons[1].lessonNumber = 1;
    expect(isLessonUnlocked(state, 'n5', 2)).toBe(false);
  });

  it('should unlock lesson 2 when lesson 1 mastery >= 70%', () => {
    const state = makeState({
      1: makeLesson({ w1: { masteryLevel: 5 }, w2: { masteryLevel: 4 }, w3: { masteryLevel: 3 } })
    });
    state.lessons[1].lessonNumber = 1;
    expect(isLessonUnlocked(state, 'n5', 2)).toBe(true);
  });

  it('should handle empty progress state', () => {
    expect(isLessonUnlocked(makeState(), 'n5', 5)).toBe(false);
  });
});

describe('getNextLesson', () => {
  it('should return 1 for fresh user', () => {
    expect(getNextLesson(makeState(), 'n5')).toBe(1);
  });

  it('should return first locked lesson', () => {
    const state = makeState({
      1: makeLesson({ w1: { masteryLevel: 5 }, w2: { masteryLevel: 5 } })
    });
    state.lessons[1].lessonNumber = 1;
    expect(getNextLesson(state, 'n5')).toBe(2);
  });
});

describe('getCourseProgress', () => {
  it('should return 0/total for fresh user', () => {
    const result = getCourseProgress(makeState(), 'n5');
    expect(result.completed).toBe(0);
    expect(result.total).toBeGreaterThan(0);
  });

  it('should count lessons with mastery >= 70% as completed', () => {
    const state = makeState({
      1: makeLesson({ w1: { masteryLevel: 5 }, w2: { masteryLevel: 4 }, w3: { masteryLevel: 3 } })
    });
    state.lessons[1].lessonNumber = 1;
    const result = getCourseProgress(state, 'n5');
    expect(result.completed).toBe(1);
  });
});
```

```typescript
// src/tests/components/common/MasteryRing.test.ts
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import MasteryRing from '$lib/components/common/MasteryRing.svelte';

describe('MasteryRing', () => {
  it('should render SVG element', () => {
    const { container } = render(MasteryRing, { props: { percentage: 50 } });
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should show percentage text', () => {
    const { container } = render(MasteryRing, { props: { percentage: 75 } });
    expect(container.textContent).toContain('75');
  });

  it('should show lock icon when locked=true', () => {
    const { container } = render(MasteryRing, { props: { percentage: 0, locked: true } });
    expect(container.textContent).toContain('🔒');
  });

  it('should handle 0% edge case', () => {
    const { container } = render(MasteryRing, { props: { percentage: 0 } });
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should handle 100% edge case', () => {
    const { container } = render(MasteryRing, { props: { percentage: 100 } });
    expect(container.textContent).toContain('100');
  });
});
```

---

## 4. Implementation Notes

### progressUtils.ts
```typescript
import type { ProgressState } from '$lib/types';
import { getCourse } from '$lib/data/courses';
import type { CourseId } from '$lib/types/course';

const MASTERY_THRESHOLD = 70; // % needed to unlock next lesson
const MASTERED_LEVEL = 3;     // masteryLevel >= 3 counts as "learned"

export function getLessonMastery(state: ProgressState, courseId: string, lessonNumber: number): number {
  const lesson = state.lessons?.[lessonNumber];
  if (!lesson) return 0;
  const items = Object.values(lesson.vocabProgress || {});
  if (items.length === 0) return 0;
  const mastered = items.filter(i => i.masteryLevel >= MASTERED_LEVEL).length;
  return Math.round((mastered / items.length) * 100);
}

export function isLessonUnlocked(state: ProgressState, courseId: string, lessonNumber: number): boolean {
  if (lessonNumber <= 1) return true;
  return getLessonMastery(state, courseId, lessonNumber - 1) >= MASTERY_THRESHOLD;
}

export function getNextLesson(state: ProgressState, courseId: string): number {
  const course = getCourse(courseId as CourseId);
  if (!course) return 1;
  const total = course.metadata.lessonCount;
  for (let i = 1; i <= total; i++) {
    if (!isLessonUnlocked(state, courseId, i) || getLessonMastery(state, courseId, i) < MASTERY_THRESHOLD) {
      return i;
    }
  }
  return total;
}

export function getCourseProgress(state: ProgressState, courseId: string): { completed: number; total: number; percentage: number } {
  const course = getCourse(courseId as CourseId);
  if (!course) return { completed: 0, total: 0, percentage: 0 };
  const total = course.metadata.lessonCount;
  let completed = 0;
  for (let i = 1; i <= total; i++) {
    if (getLessonMastery(state, courseId, i) >= MASTERY_THRESHOLD) completed++;
  }
  return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
}
```

### MasteryRing.svelte
```svelte
<script lang="ts">
  export let percentage = 0;
  export let size = 48;
  export let locked = false;

  $: radius = (size - 6) / 2;
  $: circumference = 2 * Math.PI * radius;
  $: offset = circumference - (percentage / 100) * circumference;
</script>

<div class="mastery-ring" style="width: {size}px; height: {size}px">
  <svg viewBox="0 0 {size} {size}">
    <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="var(--border)" stroke-width="3" />
    {#if percentage > 0}
      <circle cx={size/2} cy={size/2} r={radius} fill="none"
        stroke={percentage >= 70 ? 'var(--success)' : 'var(--primary)'}
        stroke-width="3" stroke-linecap="round"
        stroke-dasharray={circumference} stroke-dashoffset={offset}
        transform="rotate(-90 {size/2} {size/2})" />
    {/if}
  </svg>
  <span class="mastery-text">
    {#if locked}🔒{:else}{percentage}%{/if}
  </span>
</div>
```

---

## 5. Acceptance Criteria

- [ ] `getLessonMastery()` returns correct % from vocabProgress
- [ ] Lesson 1 always unlocked
- [ ] Lesson N unlocked when N-1 ≥ 70%
- [ ] Course page shows MasteryRing + lock state per lesson
- [ ] "Continue" button navigates to next unlocked lesson
- [ ] Existing progress respected (no false locks)
- [ ] Tests: 15 new pass
- [ ] Build pass

---

## 6. Diagrams to Create

| Diagram | File | Type |
|---------|------|------|
| Learning Path State Machine | `documents/06-diagrams/source/learning-path-sm.puml` | PlantUML |

## 7. Skills to Create

Không dự kiến skill mới (pattern đơn giản, không lặp lại).
