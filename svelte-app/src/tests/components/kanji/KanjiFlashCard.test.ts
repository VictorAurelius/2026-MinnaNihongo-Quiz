/**
 * Tests for KanjiFlashCard component.
 * Covers: render front/back, flip, audio (F1), Correct/Wrong buttons.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte/svelte5';
import userEvent from '@testing-library/user-event';
import KanjiFlashCard from '$lib/components/kanji/KanjiFlashCard.svelte';
import type { KanjiItem } from '$lib/types';

vi.mock('$lib/utils/audioUtils', () => ({ playJapaneseAudio: vi.fn() }));
vi.mock('$lib/utils/kanaUtils', () => ({ kanaToRomaji: (k: string) => `r:${k}` }));

const mockKanji: KanjiItem = {
  character: '会',
  onyomi: ['カイ', 'エ'],
  kunyomi: ['あ.う'],
  strokeCount: 6,
  jlpt: 5,
  vietnamese: 'hội',
  english: 'meet, association',
  examples: [
    { word: '会社', kana: 'かいしゃ', meaning: 'company', vietnamese: 'công ty' },
  ],
};

beforeEach(() => {
  vi.clearAllMocks();
  Object.defineProperty(window, 'speechSynthesis', {
    value: { speak: vi.fn(), cancel: vi.fn() },
    writable: true, configurable: true,
  });
});

describe('KanjiFlashCard — front side', () => {
  it('renders kanji character', () => {
    render(KanjiFlashCard, { props: { item: mockKanji } });
    expect(screen.getByText('会')).toBeInTheDocument();
  });

  it('shows stroke count', () => {
    render(KanjiFlashCard, { props: { item: mockKanji } });
    expect(screen.getByText(/6 strokes/i)).toBeInTheDocument();
  });

  it('shows flip hint text', () => {
    render(KanjiFlashCard, { props: { item: mockKanji } });
    expect(screen.getByText(/space to flip/i)).toBeInTheDocument();
  });

  it('back content is not visible initially', () => {
    render(KanjiFlashCard, { props: { item: mockKanji } });
    // Vietnamese meaning only visible on back
    expect(screen.queryByText('hội')).not.toBeInTheDocument();
  });
});

describe('KanjiFlashCard — flip behaviour', () => {
  it('flips on card click', async () => {
    const user = userEvent.setup();
    render(KanjiFlashCard, { props: { item: mockKanji } });
    const card = document.querySelector('.flashcard') as HTMLElement;
    await user.click(card);
    expect(card).toHaveClass('flipped');
  });

  it('reveals vietnamese meaning after flip', async () => {
    const user = userEvent.setup();
    render(KanjiFlashCard, { props: { item: mockKanji } });
    await user.click(document.querySelector('.flashcard') as HTMLElement);
    expect(screen.getByText('hội')).toBeInTheDocument();
  });

  it('shows onyomi on back', async () => {
    const user = userEvent.setup();
    render(KanjiFlashCard, { props: { item: mockKanji } });
    await user.click(document.querySelector('.flashcard') as HTMLElement);
    expect(screen.getByText('カイ、エ')).toBeInTheDocument();
  });

  it('shows english meaning on back', async () => {
    const user = userEvent.setup();
    render(KanjiFlashCard, { props: { item: mockKanji } });
    await user.click(document.querySelector('.flashcard') as HTMLElement);
    expect(screen.getByText('meet, association')).toBeInTheDocument();
  });

  it('shows first example word on back', async () => {
    const user = userEvent.setup();
    render(KanjiFlashCard, { props: { item: mockKanji } });
    await user.click(document.querySelector('.flashcard') as HTMLElement);
    expect(screen.getByText(/会社/)).toBeInTheDocument();
  });

  it('flips on Space key', async () => {
    render(KanjiFlashCard, { props: { item: mockKanji } });
    const card = document.querySelector('.flashcard') as HTMLElement;
    card.focus();
    await fireEvent.keyDown(card, { code: 'Space', key: ' ' });
    expect(card).toHaveClass('flipped');
  });

  it('flips on Enter key', async () => {
    render(KanjiFlashCard, { props: { item: mockKanji } });
    const card = document.querySelector('.flashcard') as HTMLElement;
    card.focus();
    await fireEvent.keyDown(card, { code: 'Enter', key: 'Enter' });
    expect(card).toHaveClass('flipped');
  });

  it('unflips on second click', async () => {
    const user = userEvent.setup();
    render(KanjiFlashCard, { props: { item: mockKanji } });
    const card = document.querySelector('.flashcard') as HTMLElement;
    await user.click(card);
    await user.click(card);
    expect(card).not.toHaveClass('flipped');
  });
});

describe('KanjiFlashCard — audio', () => {
  it('F1 key triggers playJapaneseAudio with character', async () => {
    const { playJapaneseAudio } = await import('$lib/utils/audioUtils');
    render(KanjiFlashCard, { props: { item: mockKanji } });
    const card = document.querySelector('.flashcard') as HTMLElement;
    card.focus();
    await fireEvent.keyDown(card, { key: 'F1' });
    expect(playJapaneseAudio).toHaveBeenCalledWith('会');
  });

  it('Speak button triggers audio', async () => {
    const { playJapaneseAudio } = await import('$lib/utils/audioUtils');
    const user = userEvent.setup();
    render(KanjiFlashCard, { props: { item: mockKanji } });
    await user.click(screen.getByText(/speak/i));
    expect(playJapaneseAudio).toHaveBeenCalledWith('会');
  });
});

describe('KanjiFlashCard — navigation buttons', () => {
  it('renders Correct and Wrong buttons', () => {
    render(KanjiFlashCard, { props: { item: mockKanji } });
    expect(screen.getByText(/correct/i)).toBeInTheDocument();
    expect(screen.getByText(/wrong/i)).toBeInTheDocument();
  });

  it('Correct button dispatches correct event', async () => {
    const user = userEvent.setup();
    const result = render(KanjiFlashCard, { props: { item: mockKanji } });
    const events: Event[] = [];
    result.component.$on('correct', (e: Event) => events.push(e));
    await user.click(screen.getByText(/correct/i));
    expect(events.length).toBe(1);
  });

  it('Wrong button dispatches wrong event', async () => {
    const user = userEvent.setup();
    const result = render(KanjiFlashCard, { props: { item: mockKanji } });
    const events: Event[] = [];
    result.component.$on('wrong', (e: Event) => events.push(e));
    await user.click(screen.getByText(/wrong/i));
    expect(events.length).toBe(1);
  });
});
