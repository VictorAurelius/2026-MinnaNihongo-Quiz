/**
 * Tests for KanjiMultipleChoice component.
 * Covers: render, option selection, correct/wrong feedback, hotkeys.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte/svelte5';
import userEvent from '@testing-library/user-event';
import KanjiMultipleChoice from '$lib/components/kanji/KanjiMultipleChoice.svelte';
import type { KanjiItem } from '$lib/types';

vi.mock('$lib/utils/audioUtils', () => ({ playJapaneseAudio: vi.fn() }));

const mockKanji: KanjiItem = {
  character: '会',
  onyomi: ['カイ'],
  kunyomi: ['あ.う'],
  strokeCount: 6,
  jlpt: 5,
  vietnamese: 'hội',
  english: 'meet',
  examples: [],
};

const mockOptions = ['hội', 'sơn', 'thủy', 'hỏa'];
const correctAnswer = 'hội';

beforeEach(() => {
  vi.clearAllMocks();
  vi.useFakeTimers();
  Object.defineProperty(window, 'speechSynthesis', {
    value: { speak: vi.fn(), cancel: vi.fn() },
    writable: true, configurable: true,
  });
});

describe('KanjiMultipleChoice — render', () => {
  it('shows the kanji character', () => {
    render(KanjiMultipleChoice, { props: { item: mockKanji, options: mockOptions, answer: correctAnswer } });
    expect(screen.getByText('会')).toBeInTheDocument();
  });

  it('renders all 4 options', () => {
    render(KanjiMultipleChoice, { props: { item: mockKanji, options: mockOptions, answer: correctAnswer } });
    for (const opt of mockOptions) {
      expect(screen.getByText(opt)).toBeInTheDocument();
    }
  });

  it('shows numbered labels 1-4', () => {
    render(KanjiMultipleChoice, { props: { item: mockKanji, options: mockOptions, answer: correctAnswer } });
    expect(screen.getByText('1.')).toBeInTheDocument();
    expect(screen.getByText('4.')).toBeInTheDocument();
  });

  it('shows hint text before answering', () => {
    render(KanjiMultipleChoice, { props: { item: mockKanji, options: mockOptions, answer: correctAnswer } });
    expect(screen.getByText(/press 1-4/i)).toBeInTheDocument();
  });
});

describe('KanjiMultipleChoice — selection', () => {
  it('correct answer gets correct class', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(KanjiMultipleChoice, { props: { item: mockKanji, options: mockOptions, answer: correctAnswer } });
    await user.click(screen.getByText(correctAnswer));
    const btn = screen.getByText(correctAnswer).closest('button')!;
    expect(btn.className).toContain('correct');
  });

  it('wrong answer gets wrong class', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(KanjiMultipleChoice, { props: { item: mockKanji, options: mockOptions, answer: correctAnswer } });
    const wrongOpt = 'sơn';
    await user.click(screen.getByText(wrongOpt));
    const btn = screen.getByText(wrongOpt).closest('button')!;
    expect(btn.className).toContain('wrong');
  });

  it('correct answer stays highlighted after wrong selection', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(KanjiMultipleChoice, { props: { item: mockKanji, options: mockOptions, answer: correctAnswer } });
    await user.click(screen.getByText('sơn'));
    const correctBtn = screen.getByText(correctAnswer).closest('button')!;
    expect(correctBtn.className).toContain('correct');
  });

  it('shows feedback div after answering', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(KanjiMultipleChoice, { props: { item: mockKanji, options: mockOptions, answer: correctAnswer } });
    await user.click(screen.getByText(correctAnswer));
    expect(screen.getByText(/correct!/i)).toBeInTheDocument();
  });

  it('shows wrong feedback when incorrect', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(KanjiMultipleChoice, { props: { item: mockKanji, options: mockOptions, answer: correctAnswer } });
    await user.click(screen.getByText('sơn'));
    expect(screen.getByText(/wrong!/i)).toBeInTheDocument();
  });

  it('cannot select again after answering', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(KanjiMultipleChoice, { props: { item: mockKanji, options: mockOptions, answer: correctAnswer } });
    await user.click(screen.getByText(correctAnswer));
    // All option buttons should be disabled
    const buttons = screen.getAllByRole('button').filter(b => mockOptions.includes(b.textContent?.trim() || ''));
    for (const btn of buttons) {
      expect(btn).toBeDisabled();
    }
  });
});

describe('KanjiMultipleChoice — keyboard', () => {
  it('key 1 selects first option', async () => {
    render(KanjiMultipleChoice, { props: { item: mockKanji, options: mockOptions, answer: correctAnswer } });
    await fireEvent.keyDown(window, { key: '1' });
    const btn = screen.getByText(mockOptions[0]).closest('button')!;
    expect(btn.className).toMatch(/correct|wrong/);
  });

  it('key 2 selects second option', async () => {
    render(KanjiMultipleChoice, { props: { item: mockKanji, options: mockOptions, answer: correctAnswer } });
    await fireEvent.keyDown(window, { key: '2' });
    const btn = screen.getByText(mockOptions[1]).closest('button')!;
    expect(btn.className).toMatch(/correct|wrong/);
  });

  it('F1 triggers playJapaneseAudio', async () => {
    const { playJapaneseAudio } = await import('$lib/utils/audioUtils');
    render(KanjiMultipleChoice, { props: { item: mockKanji, options: mockOptions, answer: correctAnswer } });
    await fireEvent.keyDown(window, { key: 'F1' });
    expect(playJapaneseAudio).toHaveBeenCalledWith('会');
  });
});

describe('KanjiMultipleChoice — state reset', () => {
  it('resets selection when answer prop changes', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { rerender } = render(KanjiMultipleChoice, { props: { item: mockKanji, options: mockOptions, answer: correctAnswer } });
    await user.click(screen.getByText(correctAnswer));
    expect(screen.getByText(/correct!/i)).toBeInTheDocument();

    await rerender({ item: mockKanji, options: ['a', 'b', 'c', 'd'], answer: 'a' });
    expect(screen.queryByText(/correct!/i)).not.toBeInTheDocument();
  });
});
