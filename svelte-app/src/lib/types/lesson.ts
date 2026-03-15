/**
 * TypeScript type definitions for Smart Quiz data structures
 */

// Vocabulary Types
export interface VocabItem {
  japanese: string;
  kana: string;
  vietnamese: string;
  english: string;
  type: 'main' | 'additional' | 'kanji' | 'supplementary';
  example?: string;
  audio?: string;
}

// Grammar Types
export interface GrammarExample {
  japanese: string;
  vietnamese: string;
  english: string;
  type: 'main' | 'additional';
}

export interface GrammarItem {
  pattern: string;
  vietnamese: string;
  english: string;
  type: 'main' | 'additional';
  explanation: string;
  examples: GrammarExample[];
  category?: string;
  function?: string;
  lesson?: number;
}

// Lesson Data
export interface LessonData {
  lessonNumber: number;
  title: string;
  vocabulary: VocabItem[];
  grammar: GrammarItem[];
}

// HSK Data (Chinese)
export interface HSKVocabItem {
  chinese: string;
  pinyin: string;
  vietnamese: string;
  english: string;
  type: 'main' | 'additional';
  example?: string;
  audio?: string;
}

export interface HSKLessonData {
  group: number;
  title: string;
  vocabulary: HSKVocabItem[];
}

// Alphabet Data
export interface AlphabetChar {
  hiragana: string;
  katakana: string;
  romaji: string;
  examples?: string[];
}

// Counter Data
export interface CounterExample {
  japanese: string;
  vietnamese: string;
  english: string;
}

export interface CounterType {
  counter: string;
  usage: string;
  examples: CounterExample[];
}

// Quiz Types
export type QuizMode = 'flashcard' | 'multiple-choice' | 'typing';
export type QuizDirection = 'ja-vi' | 'vi-ja' | 'ja-en' | 'en-ja';

export interface QuizQuestion {
  id: string;
  question: string;
  answer: string;
  options?: string[]; // For multiple choice
  item: VocabItem | HSKVocabItem;
}

export interface QuizState {
  mode: QuizMode;
  direction: QuizDirection;
  lessonNumber: number;
  questions: QuizQuestion[];
  currentIndex: number;
  score: number;
  wrongItems: QuizQuestion[];
  startTime: number;
  endTime?: number;
}

// Progress Tracking
export interface ItemProgress {
  itemId: string;
  correctCount: number;
  wrongCount: number;
  lastReviewed: number; // timestamp
  masteryLevel: number; // 0-5
}

export interface LessonProgress {
  lessonNumber: number;
  vocabProgress: Record<string, ItemProgress>;
  grammarProgress: Record<string, ItemProgress>;
  lastStudied: number;
  totalQuizzes: number;
}

export interface ProgressState {
  lessons: Record<number, LessonProgress>;
  hsk: Record<number, LessonProgress>;
  settings: {
    defaultDirection: QuizDirection;
    autoPlay: boolean;
    showEnglish: boolean;
  };
}

// UI State
export interface UIState {
  darkMode: boolean;
  showVirtualKeyboard: boolean;
  activeModal: string | null;
  breadcrumbs: string[];
}

// Navigation
export interface NavigationState {
  history: string[];
  currentScreen: string;
}

// Grammar Reference Types
export interface GrammarMetadata {
  pattern: string;
  category: string;
  function: string;
  lesson: number;
  related?: string[];
  comparisons?: GrammarComparison[];
}

export interface GrammarComparison {
  patterns: string[];
  title: string;
  vietnamese: string;
  english: string;
  explanation: string;
  examples: GrammarExample[];
}

// Search/Filter Types
export interface FilterOptions {
  lesson?: number[];
  category?: string[];
  function?: string[];
  searchTerm?: string;
}

export type ViewMode = 'lesson' | 'category' | 'function' | 'comparisons';
