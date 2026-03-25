# PR #6: HSK Quiz Modes (Flashcard + MC + Typing cho Chinese)

**Wave:** 4 — Bilingual Advantage
**Branch:** `feat/hsk-quiz`
**Est:** 4h | **New tests:** 7
**Status:** [ ] Not started

---

## 1. Brainstorm

### Problem
- HSK section chỉ có vocabulary list — 1603 words waste không quiz
- Nhai Kanji KHÔNG có Chinese → đây là unique advantage cần maximize
- Existing quiz components (FlashCard, MC, TypingQuiz) chỉ support VocabItem (jp)

### Solution
- Tạo hskQuizUtils: adapter HSKWord → QuizQuestion format
- Reuse quiz page pattern (mode selector, direction selector, quiz flow)
- 3 directions: chinese-vi, vi-chinese, chinese-pinyin
- TTS dùng `playChineseAudio()` (zh-CN)

### Risks
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Quiz components expect VocabItem props | High | Medium | Map HSKWord → compatible object |
| TTS zh-CN quality varies | Low | Low | Already tested with playChineseAudio |
| MC option generation: same pinyin different meaning | Medium | Low | Filter by vietnamese, not pinyin |

### Edge Cases
- HSK words with same vietnamese meaning → different chinese → MC options unique
- Very short words (1 char) → MC options need minimum length check
- Pinyin with tones in typing quiz → normalize, case-insensitive

---

## 2. Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | Viết hskQuizUtils tests (RED) | `src/tests/utils/hskQuizUtils.test.ts` | 10m | 7 tests FAIL |
| 2 | Implement hskQuizUtils | `src/lib/utils/hskQuizUtils.ts` | 20m | 7 tests GREEN |
| 3 | Create HSK quiz page | `src/routes/hsk/[group]/quiz/[mode]/+page.svelte` | 40m | Manual |
| 4 | Add quiz buttons to HSK group page | `src/routes/hsk/[group]/+page.svelte` | 15m | Visual |
| 5 | Add route title | `Header.svelte` | 3m | Title shows |

---

## 3. TDD — Test Cases

```typescript
// src/tests/utils/hskQuizUtils.test.ts
import { describe, it, expect } from 'vitest';
import { generateHSKQuestions, generateHSKMCOptions } from '$lib/utils/hskQuizUtils';
import type { HSKWord } from '$lib/types/hsk';

const sampleWords: HSKWord[] = [
  { chinese: '你好', pinyin: 'nǐ hǎo', vietnamese: 'xin chào' },
  { chinese: '谢谢', pinyin: 'xiè xie', vietnamese: 'cảm ơn' },
  { chinese: '再见', pinyin: 'zài jiàn', vietnamese: 'tạm biệt' },
  { chinese: '对不起', pinyin: 'duì bu qǐ', vietnamese: 'xin lỗi' },
  { chinese: '没关系', pinyin: 'méi guān xi', vietnamese: 'không sao' },
];

describe('generateHSKQuestions', () => {
  it('should generate questions from HSK words', () => {
    const qs = generateHSKQuestions(sampleWords, 'chinese-vi');
    expect(qs.length).toBeGreaterThan(0);
  });

  it('should support chinese-vi direction', () => {
    const qs = generateHSKQuestions(sampleWords, 'chinese-vi');
    expect(qs[0].question).toMatch(/[\u4e00-\u9fff]/); // Chinese chars
  });

  it('should support vi-chinese direction', () => {
    const qs = generateHSKQuestions(sampleWords, 'vi-chinese');
    expect(qs[0].answer).toMatch(/[\u4e00-\u9fff]/);
  });

  it('should support chinese-pinyin direction', () => {
    const qs = generateHSKQuestions(sampleWords, 'chinese-pinyin');
    expect(qs[0].question).toMatch(/[\u4e00-\u9fff]/);
  });

  it('each question should have required fields', () => {
    const qs = generateHSKQuestions(sampleWords, 'chinese-vi');
    for (const q of qs) {
      expect(q.id).toBeTruthy();
      expect(q.question).toBeTruthy();
      expect(q.answer).toBeTruthy();
    }
  });
});

describe('generateHSKMCOptions', () => {
  it('should generate 4 options including correct answer', () => {
    const opts = generateHSKMCOptions('xin chào', sampleWords, 'chinese-vi');
    expect(opts.length).toBe(4);
    expect(opts).toContain('xin chào');
  });

  it('should not have duplicate options', () => {
    const opts = generateHSKMCOptions('xin chào', sampleWords, 'chinese-vi');
    expect(new Set(opts).size).toBe(opts.length);
  });
});
```

---

## 4. Acceptance Criteria

- [ ] 3 quiz modes (flashcard, MC, typing) work for HSK
- [ ] 3 directions (chinese-vi, vi-chinese, chinese-pinyin)
- [ ] TTS uses `playChineseAudio()` (zh-CN)
- [ ] HSK group page has quiz mode buttons + direction selector
- [ ] 1600+ words quizzable
- [ ] Tests: 7 new pass
- [ ] Build pass
