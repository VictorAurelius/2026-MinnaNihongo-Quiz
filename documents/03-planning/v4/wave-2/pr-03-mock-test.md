# PR #3: JLPT Mock Test Mode

**Wave:** 2 — Learning Path
**Branch:** `feat/jlpt-mock-test`
**Est:** 4h | **New tests:** 10
**Status:** [ ] Not started

---

## 1. Brainstorm

### Problem
- Nhai Kanji có "Đề thi" (mock test) — Smart Quiz không có
- User muốn biết mình ở level nào trước khi thi JLPT thật
- Hiện tại quiz chỉ per-lesson, không có cross-lesson assessment

### Solution
- Mock test: 30 câu random mixed (vocab MC + grammar MC) từ toàn bộ lessons
- Timer 30 phút, auto-submit khi hết
- Tính điểm theo format JLPT: vocab section + grammar section + total + pass/fail

### JLPT N5 Scoring
- Total: 180 điểm (60 vocab + 60 grammar + 60 reading)
- Pass: ≥ 80/180 tổng VÀ ≥ 19/60 mỗi section
- Smart Quiz chỉ có vocab + grammar → scale to 120 (60+60), pass ≥ 53/120 + ≥ 19/60 each

### Risks
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Thiếu reading section | Certain | Low | Label "Vocabulary & Grammar Only", note in results |
| N4 grammar data sparse | Medium | Low | Fallback to vocab-only if < 10 grammar patterns |
| 30 câu không đủ diverse | Low | Medium | Shuffle from all lessons, no duplicates |

### Edge Cases
- User finish trước 30 phút → show results immediately
- Timer hết → auto-submit current answers, unanswered = wrong
- Chưa đủ 30 câu (new course ít data) → generate max available, adjust scoring
- User refresh mid-test → test lost (no localStorage save for simplicity)

---

## 2. Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | Viết mockTestUtils tests (RED) | `src/tests/utils/mockTestUtils.test.ts` | 10m | 7 tests FAIL |
| 2 | Implement mockTestUtils | `src/lib/utils/mockTestUtils.ts` | 20m | 7 tests GREEN |
| 3 | Viết Timer tests (RED) | Inline in mockTestUtils test or separate | 5m | 3 tests FAIL |
| 4 | Implement mock test page | `src/routes/mock-test/+page.svelte` | 30m | Manual |
| 5 | Add nav link + home card | `Header.svelte`, `+page.svelte` (home) | 10m | Visual |
| 6 | Add route title | `Header.svelte` | 2m | Title shows |

---

## 3. TDD — Full Test Code

```typescript
// src/tests/utils/mockTestUtils.test.ts
import { describe, it, expect } from 'vitest';
import { generateMockTest, calculateJLPTScore } from '$lib/utils/mockTestUtils';

describe('generateMockTest', () => {
  it('should generate exactly 30 questions for N5', () => {
    const questions = generateMockTest('n5');
    expect(questions.length).toBe(30);
  });

  it('should include both vocab and grammar questions', () => {
    const questions = generateMockTest('n5');
    const types = new Set(questions.map(q => q.section));
    expect(types.has('vocab')).toBe(true);
    expect(types.has('grammar')).toBe(true);
  });

  it('should not have duplicate questions', () => {
    const questions = generateMockTest('n5');
    const ids = questions.map(q => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('should shuffle questions randomly', () => {
    const q1 = generateMockTest('n5').map(q => q.id);
    const q2 = generateMockTest('n5').map(q => q.id);
    // Very unlikely to be identical order
    expect(q1).not.toEqual(q2);
  });

  it('each question should have required fields', () => {
    const questions = generateMockTest('n5');
    for (const q of questions) {
      expect(q.id).toBeTruthy();
      expect(q.question).toBeTruthy();
      expect(q.answer).toBeTruthy();
      expect(q.options?.length).toBe(4);
      expect(['vocab', 'grammar']).toContain(q.section);
    }
  });

  it('should handle N4 level', () => {
    const questions = generateMockTest('n4');
    expect(questions.length).toBeGreaterThan(0);
    expect(questions.length).toBeLessThanOrEqual(30);
  });

  it('should return empty for invalid level', () => {
    const questions = generateMockTest('invalid' as any);
    expect(questions.length).toBe(0);
  });
});

describe('calculateJLPTScore', () => {
  it('should return pass when scores are sufficient', () => {
    const result = calculateJLPTScore({ vocabCorrect: 12, vocabTotal: 15, grammarCorrect: 12, grammarTotal: 15 });
    expect(result.pass).toBe(true);
    expect(result.totalPercentage).toBeGreaterThanOrEqual(70);
  });

  it('should return fail when total too low', () => {
    const result = calculateJLPTScore({ vocabCorrect: 3, vocabTotal: 15, grammarCorrect: 3, grammarTotal: 15 });
    expect(result.pass).toBe(false);
  });

  it('should return fail when one section below minimum', () => {
    // High vocab but zero grammar
    const result = calculateJLPTScore({ vocabCorrect: 15, vocabTotal: 15, grammarCorrect: 0, grammarTotal: 15 });
    expect(result.pass).toBe(false);
  });
});
```

---

## 4. Implementation Notes

### mockTestUtils.ts
```typescript
import { getCourse } from '$lib/data/courses';
import { generateQuestions, generateMCOptions } from '$lib/utils/quizUtils';
import type { CourseId } from '$lib/types/course';

export interface MockTestQuestion {
  id: string;
  question: string;
  answer: string;
  options: string[];
  section: 'vocab' | 'grammar';
}

export interface JLPTScoreInput {
  vocabCorrect: number;
  vocabTotal: number;
  grammarCorrect: number;
  grammarTotal: number;
}

export interface JLPTScoreResult {
  vocabScore: number;    // /60 scaled
  grammarScore: number;  // /60 scaled
  totalScore: number;    // /120 scaled
  vocabPercentage: number;
  grammarPercentage: number;
  totalPercentage: number;
  pass: boolean;
}

const QUESTIONS_COUNT = 30;
const SECTION_MIN_PERCENTAGE = 32; // ~19/60 = 31.7%

export function generateMockTest(courseId: string): MockTestQuestion[] {
  const course = getCourse(courseId as CourseId);
  if (!course) return [];

  const allLessons = course.getAllLessons();
  const allVocab = allLessons.flatMap(l => l.vocabulary);
  const allGrammar = allLessons.flatMap(l => l.grammar);

  // Split: 60% vocab, 40% grammar
  const vocabCount = Math.min(Math.ceil(QUESTIONS_COUNT * 0.6), allVocab.length);
  const grammarCount = Math.min(QUESTIONS_COUNT - vocabCount, allGrammar.length);

  // Generate vocab MC questions
  const vocabQs = generateQuestions(allVocab, 'ja-vi', vocabCount);
  const vocabMock: MockTestQuestion[] = vocabQs.map((q, i) => ({
    id: `mock-v-${i}`,
    question: q.question,
    answer: q.answer,
    options: generateMCOptions(q.answer, allVocab, 'ja-vi'),
    section: 'vocab' as const
  }));

  // Generate grammar MC questions (pattern → meaning)
  const shuffledGrammar = [...allGrammar].sort(() => Math.random() - 0.5).slice(0, grammarCount);
  const grammarMock: MockTestQuestion[] = shuffledGrammar.map((g, i) => {
    const others = allGrammar.filter(x => x.pattern !== g.pattern)
      .sort(() => Math.random() - 0.5).slice(0, 3).map(x => x.vietnamese);
    return {
      id: `mock-g-${i}`,
      question: g.pattern,
      answer: g.vietnamese,
      options: [...others, g.vietnamese].sort(() => Math.random() - 0.5),
      section: 'grammar' as const
    };
  });

  return [...vocabMock, ...grammarMock].sort(() => Math.random() - 0.5);
}

export function calculateJLPTScore(input: JLPTScoreInput): JLPTScoreResult {
  const vocabPct = input.vocabTotal > 0 ? Math.round((input.vocabCorrect / input.vocabTotal) * 100) : 0;
  const grammarPct = input.grammarTotal > 0 ? Math.round((input.grammarCorrect / input.grammarTotal) * 100) : 0;
  const totalPct = (input.vocabTotal + input.grammarTotal) > 0
    ? Math.round(((input.vocabCorrect + input.grammarCorrect) / (input.vocabTotal + input.grammarTotal)) * 100) : 0;

  // Scale to JLPT 60-point sections
  const vocabScore = Math.round(vocabPct * 0.6);
  const grammarScore = Math.round(grammarPct * 0.6);
  const totalScore = vocabScore + grammarScore;

  const pass = totalPct >= 44 && vocabPct >= SECTION_MIN_PERCENTAGE && grammarPct >= SECTION_MIN_PERCENTAGE;
  // 44% of 120 ≈ 53 (JLPT pass line 80/180 = 44%)

  return { vocabScore, grammarScore, totalScore, vocabPercentage: vocabPct, grammarPercentage: grammarPct, totalPercentage: totalPct, pass };
}
```

---

## 5. Acceptance Criteria

- [ ] 30 random questions, no duplicates, mixed vocab + grammar
- [ ] Timer 30 min, auto-submit on expire
- [ ] Results: vocab score, grammar score, total, pass/fail
- [ ] N5 and N4 levels work
- [ ] Home page "JLPT Mock Test" card
- [ ] Header route title for `/mock-test`
- [ ] Tests: 10 new pass
- [ ] Build pass

---

## 6. Diagrams to Create

| Diagram | File | Type |
|---------|------|------|
| Mock Test Flow | `documents/06-diagrams/source/mock-test-flow.puml` | PlantUML |

## 7. Skills to Create

Không dự kiến skill mới.
