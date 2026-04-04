# PR #32: Kanji Component Tests + kanjiQuizUtils Tests

**Wave:** 12 — Kanji Enhancement
**Branch:** `feat/kanji-component-tests`
**Est:** 4h | **New tests:** ~40
**Status:** [ ] Not started

---

## 1. Brainstorm

### Problem
- 3 kanji quiz components hoàn toàn không có unit tests: KanjiFlashCard, KanjiMultipleChoice, KanjiTypingQuiz
- `kanjiQuizUtils.ts` (core logic: generateKanjiQuestions, generateKanjiMCOptions, getKanjiQA) không có tests
- Khi sửa component → không có safety net, dễ regression
- Branch coverage thấp một phần do các Svelte component chưa được test

### Solution
- Viết unit tests cho 3 components theo pattern đã có (vocabulary.test.ts, conversations.test.ts)
- Viết unit tests cho kanjiQuizUtils
- Mock speechSynthesis, kanaToRomaji theo pattern chuẩn của project

### Scope
| File cần test | Tests | Mô tả |
|--------------|-------|-------|
| `KanjiFlashCard.svelte` | ~12 | Render, flip, audio, ví dụ hiển thị |
| `KanjiMultipleChoice.svelte` | ~10 | Options, select, correct/wrong feedback |
| `KanjiTypingQuiz.svelte` | ~10 | Input, hint, submit, validation |
| `kanjiQuizUtils.ts` | ~8 | generateKanjiQuestions, generateKanjiMCOptions, 4 directions |

### Không test
- `KanjiWritingQuiz.svelte` → đã có tests trong WritingCanvas.test.ts
- `StrokeOrder.svelte` → đã có 9 tests
- `RadicalBreakdown.svelte` → UI-only, thấp priority

---

## 2. Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | Tests RED cho kanjiQuizUtils | `src/tests/utils/kanjiQuizUtils.test.ts` | 30m | ~8 tests FAIL |
| 2 | Tests RED cho KanjiFlashCard | `src/tests/components/kanji/KanjiFlashCard.test.ts` | 45m | ~12 tests FAIL |
| 3 | Tests RED cho KanjiMultipleChoice | `src/tests/components/kanji/KanjiMultipleChoice.test.ts` | 45m | ~10 tests FAIL |
| 4 | Tests RED cho KanjiTypingQuiz | `src/tests/components/kanji/KanjiTypingQuiz.test.ts` | 45m | ~10 tests FAIL |
| 5 | Fix bất kỳ bug nào phát hiện qua tests | Varies | 30m | Tests GREEN |
| 6 | Verify coverage improvement | — | 15m | Branch ≥ 63% |

---

## 3. TDD — Full Test Code

### kanjiQuizUtils.test.ts

```typescript
// src/tests/utils/kanjiQuizUtils.test.ts
import { describe, it, expect } from 'vitest';
import { generateKanjiQuestions, generateKanjiMCOptions, getKanjiQA } from '$lib/utils/kanjiQuizUtils';
import type { KanjiItem } from '$lib/types/lesson';

const mockKanji: KanjiItem[] = [
  {
    character: '会', onyomi: ['カイ'], kunyomi: ['あ.う'],
    strokeCount: 6, jlpt: 5,
    vietnamese: 'hội', english: 'meet, association',
    examples: [{ word: '会社', kana: 'かいしゃ', meaning: 'company', vietnamese: 'công ty' }]
  },
  {
    character: '山', onyomi: ['サン'], kunyomi: ['やま'],
    strokeCount: 3, jlpt: 5,
    vietnamese: 'sơn', english: 'mountain',
    examples: [{ word: '山田', kana: 'やまだ', meaning: 'Yamada (surname)', vietnamese: 'Yamada' }]
  },
  {
    character: '水', onyomi: ['スイ'], kunyomi: ['みず'],
    strokeCount: 4, jlpt: 5,
    vietnamese: 'thủy', english: 'water',
    examples: [{ word: '水曜日', kana: 'すいようび', meaning: 'Wednesday', vietnamese: 'Thứ Tư' }]
  },
  {
    character: '火', onyomi: ['カ'], kunyomi: ['ひ'],
    strokeCount: 4, jlpt: 5,
    vietnamese: 'hỏa', english: 'fire',
    examples: [{ word: '火曜日', kana: 'かようび', meaning: 'Tuesday', vietnamese: 'Thứ Ba' }]
  }
];

describe('getKanjiQA', () => {
  it('kanji-vi: question=character, answer=vietnamese', () => {
    const qa = getKanjiQA(mockKanji[0], 'kanji-vi');
    expect(qa.question).toBe('会');
    expect(qa.answer).toBe('hội');
  });

  it('kanji-en: question=character, answer=english', () => {
    const qa = getKanjiQA(mockKanji[0], 'kanji-en');
    expect(qa.question).toBe('会');
    expect(qa.answer).toContain('meet');
  });

  it('kanji-reading: question=character, answer contains onyomi', () => {
    const qa = getKanjiQA(mockKanji[0], 'kanji-reading');
    expect(qa.question).toBe('会');
    expect(qa.answer).toContain('カイ');
  });

  it('kanji-romaji: question=character, answer is romaji string', () => {
    const qa = getKanjiQA(mockKanji[0], 'kanji-romaji');
    expect(qa.question).toBe('会');
    expect(qa.answer).toBeTruthy();
  });
});

describe('generateKanjiQuestions', () => {
  it('generates one question per kanji', () => {
    const questions = generateKanjiQuestions(mockKanji, 'kanji-vi');
    expect(questions.length).toBe(mockKanji.length);
  });

  it('each question has item, question, answer', () => {
    const questions = generateKanjiQuestions(mockKanji, 'kanji-en');
    for (const q of questions) {
      expect(q.item).toBeTruthy();
      expect(q.question).toBeTruthy();
      expect(q.answer).toBeTruthy();
    }
  });
});

describe('generateKanjiMCOptions', () => {
  it('generates 4 options', () => {
    const options = generateKanjiMCOptions(mockKanji[0], mockKanji, 'kanji-vi');
    expect(options.length).toBe(4);
  });

  it('correct answer is included in options', () => {
    const options = generateKanjiMCOptions(mockKanji[0], mockKanji, 'kanji-vi');
    const correct = getKanjiQA(mockKanji[0], 'kanji-vi').answer;
    expect(options.some(o => o.text === correct)).toBe(true);
  });

  it('options are unique', () => {
    const options = generateKanjiMCOptions(mockKanji[0], mockKanji, 'kanji-vi');
    const texts = options.map(o => o.text);
    expect(new Set(texts).size).toBe(4);
  });
});
```

### KanjiFlashCard.test.ts

```typescript
// src/tests/components/kanji/KanjiFlashCard.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte/svelte5';
import userEvent from '@testing-library/user-event';
import KanjiFlashCard from '$lib/components/kanji/KanjiFlashCard.svelte';
import type { KanjiItem } from '$lib/types/lesson';

vi.mock('$lib/utils/audioUtils', () => ({ playJapaneseAudio: vi.fn() }));
vi.mock('$lib/utils/kanaUtils', () => ({ kanaToRomaji: (k: string) => `r:${k}` }));
vi.mock('$lib/components/kanji/StrokeOrder.svelte', () => ({ default: vi.fn() }));

const mockKanji: KanjiItem = {
  character: '会', onyomi: ['カイ'], kunyomi: ['あ.う'],
  strokeCount: 6, jlpt: 5,
  vietnamese: 'hội', english: 'meet, association',
  examples: [{ word: '会社', kana: 'かいしゃ', meaning: 'company', vietnamese: 'công ty' }]
};

beforeEach(() => {
  vi.clearAllMocks();
  Object.defineProperty(window, 'speechSynthesis', {
    value: { speak: vi.fn(), cancel: vi.fn() },
    writable: true, configurable: true
  });
});

describe('KanjiFlashCard', () => {
  it('renders kanji character on front', () => {
    render(KanjiFlashCard, { props: { item: mockKanji, questionText: '会', answerText: 'hội' } });
    expect(screen.getByText('会')).toBeInTheDocument();
  });

  it('shows stroke count', () => {
    render(KanjiFlashCard, { props: { item: mockKanji, questionText: '会', answerText: 'hội' } });
    expect(screen.getByText(/6/)).toBeInTheDocument();
  });

  it('starts face-up (answer hidden)', () => {
    render(KanjiFlashCard, { props: { item: mockKanji, questionText: '会', answerText: 'hội' } });
    expect(screen.queryByText('hội')).not.toBeInTheDocument();
  });

  it('flips on Space key to reveal answer', async () => {
    render(KanjiFlashCard, { props: { item: mockKanji, questionText: '会', answerText: 'hội' } });
    await fireEvent.keyDown(document, { key: ' ' });
    expect(screen.getByText('hội')).toBeInTheDocument();
  });

  it('shows onyomi and kunyomi on flip', async () => {
    render(KanjiFlashCard, { props: { item: mockKanji, questionText: '会', answerText: 'hội' } });
    await fireEvent.keyDown(document, { key: ' ' });
    expect(screen.getByText('カイ')).toBeInTheDocument();
  });

  it('shows example word on flip', async () => {
    render(KanjiFlashCard, { props: { item: mockKanji, questionText: '会', answerText: 'hội' } });
    await fireEvent.keyDown(document, { key: ' ' });
    expect(screen.getByText('会社')).toBeInTheDocument();
  });

  it('F1 triggers audio', async () => {
    const { playJapaneseAudio } = await import('$lib/utils/audioUtils');
    render(KanjiFlashCard, { props: { item: mockKanji, questionText: '会', answerText: 'hội' } });
    await fireEvent.keyDown(document, { key: 'F1' });
    expect(playJapaneseAudio).toHaveBeenCalled();
  });

  it('resets to front when item changes', async () => {
    const user = userEvent.setup();
    const { rerender } = render(KanjiFlashCard, { props: { item: mockKanji, questionText: '会', answerText: 'hội' } });
    await fireEvent.keyDown(document, { key: ' ' });
    expect(screen.getByText('hội')).toBeInTheDocument();

    const newKanji = { ...mockKanji, character: '山', vietnamese: 'sơn' };
    await rerender({ item: newKanji, questionText: '山', answerText: 'sơn' });
    expect(screen.queryByText('sơn')).not.toBeInTheDocument();
  });
});
```

### KanjiMultipleChoice.test.ts

```typescript
// src/tests/components/kanji/KanjiMultipleChoice.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import userEvent from '@testing-library/user-event';
import KanjiMultipleChoice from '$lib/components/kanji/KanjiMultipleChoice.svelte';

vi.mock('$lib/utils/audioUtils', () => ({ playJapaneseAudio: vi.fn() }));

const mockOptions = [
  { text: 'hội', isCorrect: true },
  { text: 'sơn', isCorrect: false },
  { text: 'thủy', isCorrect: false },
  { text: 'hỏa', isCorrect: false }
];

beforeEach(() => {
  vi.clearAllMocks();
  Object.defineProperty(window, 'speechSynthesis', {
    value: { speak: vi.fn(), cancel: vi.fn() }, writable: true, configurable: true
  });
});

describe('KanjiMultipleChoice', () => {
  it('renders 4 options', () => {
    render(KanjiMultipleChoice, { props: { questionText: '会', options: mockOptions } });
    expect(screen.getAllByRole('button').filter(b => ['hội','sơn','thủy','hỏa'].includes(b.textContent || ''))).toHaveLength(4);
  });

  it('shows question kanji', () => {
    render(KanjiMultipleChoice, { props: { questionText: '会', options: mockOptions } });
    expect(screen.getByText('会')).toBeInTheDocument();
  });

  it('selecting correct answer shows success feedback', async () => {
    const user = userEvent.setup();
    render(KanjiMultipleChoice, { props: { questionText: '会', options: mockOptions } });
    await user.click(screen.getByText('hội'));
    expect(screen.getByText('hội').closest('button')).toHaveClass(/correct|success/i);
  });

  it('selecting wrong answer shows error feedback', async () => {
    const user = userEvent.setup();
    render(KanjiMultipleChoice, { props: { questionText: '会', options: mockOptions } });
    await user.click(screen.getByText('sơn'));
    expect(screen.getByText('sơn').closest('button')).toHaveClass(/wrong|error|incorrect/i);
  });

  it('hotkey 1 selects first option', async () => {
    render(KanjiMultipleChoice, { props: { questionText: '会', options: mockOptions } });
    await userEvent.keyboard('1');
    // First option selected = hội (correct)
    expect(screen.getByText('hội').closest('button')).toHaveClass(/correct|success/i);
  });
});
```

### KanjiTypingQuiz.test.ts

```typescript
// src/tests/components/kanji/KanjiTypingQuiz.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte/svelte5';
import userEvent from '@testing-library/user-event';
import KanjiTypingQuiz from '$lib/components/kanji/KanjiTypingQuiz.svelte';

vi.mock('$lib/utils/audioUtils', () => ({ playJapaneseAudio: vi.fn() }));
vi.mock('$lib/utils/kanaUtils', () => ({ kanaToRomaji: (k: string) => `r:${k}` }));

beforeEach(() => {
  vi.clearAllMocks();
  Object.defineProperty(window, 'speechSynthesis', {
    value: { speak: vi.fn(), cancel: vi.fn() }, writable: true, configurable: true
  });
});

describe('KanjiTypingQuiz', () => {
  it('renders kanji question', () => {
    render(KanjiTypingQuiz, { props: { questionText: '会', answerText: 'hội' } });
    expect(screen.getByText('会')).toBeInTheDocument();
  });

  it('has input field', () => {
    render(KanjiTypingQuiz, { props: { questionText: '会', answerText: 'hội' } });
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('submits on Enter and shows correct feedback', async () => {
    const user = userEvent.setup();
    render(KanjiTypingQuiz, { props: { questionText: '会', answerText: 'hội' } });
    await user.type(screen.getByRole('textbox'), 'hội');
    await user.keyboard('{Enter}');
    expect(screen.getByText(/đúng|correct/i)).toBeInTheDocument();
  });

  it('shows wrong feedback on incorrect answer', async () => {
    const user = userEvent.setup();
    render(KanjiTypingQuiz, { props: { questionText: '会', answerText: 'hội' } });
    await user.type(screen.getByRole('textbox'), 'sai');
    await user.keyboard('{Enter}');
    expect(screen.getByText(/sai|wrong|incorrect/i)).toBeInTheDocument();
  });

  it('hint button shows onyomi/kunyomi', async () => {
    const user = userEvent.setup();
    render(KanjiTypingQuiz, { props: { questionText: '会', answerText: 'hội' } });
    const hintBtn = screen.getByRole('button', { name: /hint|gợi ý/i });
    await user.click(hintBtn);
    expect(screen.getByText(/カイ|あ\.う/)).toBeInTheDocument();
  });
});
```

---

## 4. Implementation Notes

- Không thay đổi component logic — chỉ viết tests
- Nếu test phát hiện bug → fix bug trong cùng PR
- Mock pattern theo `src/tests/routes/vocabulary.test.ts`
- Sau khi tests pass, verify coverage improvement với `vitest run --coverage`
