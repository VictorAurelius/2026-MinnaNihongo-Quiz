# 🧪 Comprehensive Testing Plan - Smart Quiz Svelte App

> **Plan superpowers**: Complete testing strategy với Unit Tests (UT), Integration Tests (IT), và End-to-End Tests (E2E)
> **Mục tiêu**: Đạt 80%+ coverage, catch bugs sớm, confidence deploy production

**Phạm vi**: 9 pages, 25 components, 58 utility files
**Testing stack**: Vitest + Testing Library + Playwright
**Timeline**: 2-3 weeks (có thể parallel)

---

## 📋 Table of Contents

1. [Overview & Strategy](#overview--strategy)
2. [Phase 1: Setup & Infrastructure](#phase-1-setup--infrastructure)
3. [Phase 2: Unit Tests (UT)](#phase-2-unit-tests-ut)
4. [Phase 3: Integration Tests (IT)](#phase-3-integration-tests-it)
5. [Phase 4: End-to-End Tests (E2E)](#phase-4-end-to-end-tests-e2e)
6. [Phase 5: CI/CD & Coverage](#phase-5-cicd--coverage)
7. [Testing Checklist](#testing-checklist)

---

## 🎯 Overview & Strategy

### Testing Pyramid

```
        /\      E2E Tests (10-15 tests)
       /  \     Critical user journeys
      /----\
     / IT   \   Integration Tests (30-40 tests)
    /--------\  Component + logic interactions
   /   UT     \ Unit Tests (80-100 tests)
  /------------\ Pure functions, utilities, isolated components
```

### Coverage Targets

| Type | Target | Purpose |
|------|--------|---------|
| **Unit Tests** | 85%+ | Utilities, stores, pure functions |
| **Integration Tests** | 70%+ | Components with logic, pages |
| **E2E Tests** | Critical paths | User flows, happy paths |
| **Overall** | 80%+ | Combined coverage |

### Test Categories

**Unit Tests (UT)**:
- ✅ Pure functions trong `utils/`
- ✅ Stores (localStorage, quiz state)
- ✅ Data transformations
- ✅ Constants & types
- ✅ Isolated components (presentational)

**Integration Tests (IT)**:
- ✅ Components với user interactions
- ✅ Pages với data loading
- ✅ Quiz flows (session management)
- ✅ Navigation & routing
- ✅ LocalStorage integration

**End-to-End Tests (E2E)**:
- ✅ Complete quiz journey (Flashcard, MC, Typing)
- ✅ Lesson navigation
- ✅ Grammar reference browsing
- ✅ HSK vocabulary search
- ✅ Theme switching & PWA

---

## 🔧 Phase 1: Setup & Infrastructure

**Timeline**: 1-2 days
**Goal**: Setup testing tools, configs, và helpers

### 1.1. Install Dependencies

```bash
cd svelte-app
npm install -D @testing-library/svelte@latest
npm install -D @testing-library/jest-dom@latest
npm install -D @testing-library/user-event@latest
npm install -D vitest@latest
npm install -D jsdom@latest
npm install -D @vitest/ui@latest
npm install -D @vitest/coverage-v8@latest
npm install -D playwright@latest
npm install -D @playwright/test@latest
```

### 1.2. Configure Vitest

**File**: `svelte-app/vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,ts}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData',
        'src/lib/data/**' // Generated data files
      ],
      lines: 80,
      functions: 75,
      branches: 70,
      statements: 80
    }
  },
  resolve: {
    alias: {
      '$lib': path.resolve(__dirname, './src/lib'),
      '$app': path.resolve(__dirname, './.svelte-kit/runtime/app')
    }
  }
});
```

### 1.3. Setup Test Utilities

**File**: `svelte-app/src/tests/setup.ts`

```typescript
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock SvelteKit modules
vi.mock('$app/environment', () => ({
  browser: true,
  dev: false,
  building: false,
  version: 'test'
}));

vi.mock('$app/navigation', () => ({
  goto: vi.fn(),
  invalidate: vi.fn(),
  invalidateAll: vi.fn(),
  preloadData: vi.fn(),
  preloadCode: vi.fn(),
  beforeNavigate: vi.fn(),
  afterNavigate: vi.fn()
}));

vi.mock('$app/stores', () => ({
  page: {
    subscribe: vi.fn()
  },
  navigating: {
    subscribe: vi.fn()
  },
  updated: {
    check: vi.fn(),
    subscribe: vi.fn()
  }
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};
global.localStorage = localStorageMock as any;

// Mock window.matchMedia for theme tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
  localStorageMock.getItem.mockReset();
  localStorageMock.setItem.mockReset();
  localStorageMock.removeItem.mockReset();
  localStorageMock.clear.mockReset();
});
```

**File**: `svelte-app/src/tests/utils/test-helpers.ts`

```typescript
import { render, type RenderResult } from '@testing-library/svelte';
import { vi } from 'vitest';

export function renderComponent<T>(
  Component: any,
  props?: Record<string, any>
): RenderResult<T> {
  return render(Component, { props });
}

export function createMockQuizSession() {
  return {
    questions: [
      {
        id: '1',
        japanese: 'こんにちは',
        vietnamese: 'Xin chào',
        kana: 'こんにちは',
        romaji: 'konnichiwa',
        lesson: 1
      }
    ],
    currentIndex: 0,
    answers: [],
    startTime: Date.now()
  };
}

export function mockLocalStorage(data: Record<string, any>) {
  Object.entries(data).forEach(([key, value]) => {
    localStorage.setItem(key, JSON.stringify(value));
  });
}

export function waitForAsync(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

### 1.4. Configure Playwright

**File**: `svelte-app/playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

### 1.5. Update package.json scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:unit": "vitest run --coverage",
    "test:watch": "vitest watch",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:all": "npm run test:unit && npm run test:e2e"
  }
}
```

---

## 🧩 Phase 2: Unit Tests (UT)

**Timeline**: 1 week
**Target**: 80-100 tests, 85%+ coverage
**Focus**: Pure functions, utilities, stores

### 2.1. Utilities Testing

#### `src/lib/utils/quizUtils.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import {
  shuffleArray,
  generateDistracters,
  validateRomajiInput,
  calculateScore,
  formatTime
} from './quizUtils';

describe('quizUtils', () => {
  describe('shuffleArray', () => {
    it('should shuffle array elements', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray([...original]);

      expect(shuffled).toHaveLength(original.length);
      expect(shuffled).not.toEqual(original);
      expect(shuffled.sort()).toEqual(original);
    });

    it('should handle empty array', () => {
      expect(shuffleArray([])).toEqual([]);
    });

    it('should handle single element', () => {
      expect(shuffleArray([1])).toEqual([1]);
    });
  });

  describe('generateDistracters', () => {
    it('should generate 3 unique distracters', () => {
      const correct = { id: '1', vietnamese: 'Xin chào' };
      const pool = [
        { id: '1', vietnamese: 'Xin chào' },
        { id: '2', vietnamese: 'Tạm biệt' },
        { id: '3', vietnamese: 'Cảm ơn' },
        { id: '4', vietnamese: 'Xin lỗi' },
        { id: '5', vietnamese: 'Vâng' }
      ];

      const distracters = generateDistracters(correct, pool, 3);

      expect(distracters).toHaveLength(3);
      expect(distracters).not.toContainEqual(correct);
      distracters.forEach(d => {
        expect(pool).toContainEqual(d);
      });
    });

    it('should handle insufficient pool size', () => {
      const correct = { id: '1', vietnamese: 'Xin chào' };
      const pool = [
        { id: '1', vietnamese: 'Xin chào' },
        { id: '2', vietnamese: 'Tạm biệt' }
      ];

      const distracters = generateDistracters(correct, pool, 3);

      expect(distracters.length).toBeLessThanOrEqual(1);
    });
  });

  describe('validateRomajiInput', () => {
    it('should accept correct romaji', () => {
      expect(validateRomajiInput('konnichiwa', 'konnichiwa')).toBe(true);
    });

    it('should handle shi/si variation', () => {
      expect(validateRomajiInput('si', 'shi')).toBe(true);
      expect(validateRomajiInput('shi', 'si')).toBe(true);
    });

    it('should handle chi/ti variation', () => {
      expect(validateRomajiInput('ti', 'chi')).toBe(true);
      expect(validateRomajiInput('chi', 'ti')).toBe(true);
    });

    it('should handle tsu/tu variation', () => {
      expect(validateRomajiInput('tu', 'tsu')).toBe(true);
      expect(validateRomajiInput('tsu', 'tu')).toBe(true);
    });

    it('should handle n/nn variation', () => {
      expect(validateRomajiInput('konnichiwa', 'konniciwa')).toBe(true);
    });

    it('should reject incorrect input', () => {
      expect(validateRomajiInput('wrong', 'konnichiwa')).toBe(false);
    });

    it('should be case insensitive', () => {
      expect(validateRomajiInput('KONNICHIWA', 'konnichiwa')).toBe(true);
    });

    it('should ignore spaces', () => {
      expect(validateRomajiInput('kon nichi wa', 'konnichiwa')).toBe(true);
    });
  });

  describe('calculateScore', () => {
    it('should calculate score correctly', () => {
      const answers = [
        { correct: true, timeSpent: 5000 },
        { correct: true, timeSpent: 3000 },
        { correct: false, timeSpent: 10000 },
        { correct: true, timeSpent: 4000 }
      ];

      const score = calculateScore(answers);

      expect(score).toEqual({
        correct: 3,
        total: 4,
        percentage: 75,
        averageTime: 5500
      });
    });

    it('should handle empty answers', () => {
      const score = calculateScore([]);

      expect(score).toEqual({
        correct: 0,
        total: 0,
        percentage: 0,
        averageTime: 0
      });
    });
  });

  describe('formatTime', () => {
    it('should format seconds to mm:ss', () => {
      expect(formatTime(0)).toBe('00:00');
      expect(formatTime(59)).toBe('00:59');
      expect(formatTime(60)).toBe('01:00');
      expect(formatTime(125)).toBe('02:05');
      expect(formatTime(3661)).toBe('61:01');
    });

    it('should handle negative values', () => {
      expect(formatTime(-10)).toBe('00:00');
    });
  });
});
```

#### Test coverage cho tất cả utilities:

- ✅ `quizUtils.test.ts` - Shuffle, generate, validate, calculate
- ✅ `lessonUtils.test.ts` - Lesson navigation, filtering
- ✅ `grammarUtils.test.ts` - Grammar parsing, comparison
- ✅ `storageUtils.test.ts` - LocalStorage helpers

### 2.2. Stores Testing

#### `src/lib/stores/quiz.test.ts`

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { get } from 'svelte/store';
import {
  quizSession,
  startQuiz,
  submitAnswer,
  endQuiz,
  resetQuiz
} from './quiz';

describe('Quiz Store', () => {
  beforeEach(() => {
    resetQuiz();
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('quizSession', () => {
    it('should initialize with null', () => {
      const session = get(quizSession);
      expect(session).toBeNull();
    });
  });

  describe('startQuiz', () => {
    it('should create new quiz session', () => {
      const questions = [
        { id: '1', japanese: 'こんにちは', vietnamese: 'Xin chào' }
      ];

      startQuiz(questions, 'flashcard');

      const session = get(quizSession);
      expect(session).not.toBeNull();
      expect(session?.questions).toEqual(questions);
      expect(session?.mode).toBe('flashcard');
      expect(session?.currentIndex).toBe(0);
      expect(session?.answers).toEqual([]);
      expect(session?.startTime).toBeDefined();
    });

    it('should save session to localStorage', () => {
      const questions = [
        { id: '1', japanese: 'こんにちは', vietnamese: 'Xin chào' }
      ];

      startQuiz(questions, 'flashcard');

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'quiz-session',
        expect.any(String)
      );
    });
  });

  describe('submitAnswer', () => {
    it('should record answer and move to next question', () => {
      const questions = [
        { id: '1', japanese: 'こんにちは' },
        { id: '2', japanese: 'ありがとう' }
      ];

      startQuiz(questions, 'mc');
      submitAnswer(true, 5000);

      const session = get(quizSession);
      expect(session?.answers).toHaveLength(1);
      expect(session?.answers[0]).toEqual({
        questionId: '1',
        correct: true,
        timeSpent: 5000
      });
      expect(session?.currentIndex).toBe(1);
    });

    it('should auto-end quiz on last question', () => {
      const questions = [{ id: '1', japanese: 'こんにちは' }];

      startQuiz(questions, 'mc');
      submitAnswer(true, 5000);

      const session = get(quizSession);
      expect(session?.isCompleted).toBe(true);
      expect(session?.endTime).toBeDefined();
    });
  });

  describe('endQuiz', () => {
    it('should mark quiz as completed', () => {
      const questions = [{ id: '1', japanese: 'こんにちは' }];

      startQuiz(questions, 'mc');
      endQuiz();

      const session = get(quizSession);
      expect(session?.isCompleted).toBe(true);
    });

    it('should save results to localStorage', () => {
      const questions = [{ id: '1', japanese: 'こんにちは' }];

      startQuiz(questions, 'mc');
      submitAnswer(true, 5000);
      endQuiz();

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'quiz-history',
        expect.any(String)
      );
    });
  });

  describe('resetQuiz', () => {
    it('should clear session', () => {
      const questions = [{ id: '1', japanese: 'こんにちは' }];

      startQuiz(questions, 'mc');
      resetQuiz();

      const session = get(quizSession);
      expect(session).toBeNull();
    });
  });
});
```

#### Test coverage cho stores:

- ✅ `quiz.test.ts` - Quiz session management
- ✅ `theme.test.ts` - Dark/light mode
- ✅ `lesson.test.ts` - Current lesson tracking
- ✅ `progress.test.ts` - User progress tracking

### 2.3. Data Transformations Testing

#### `src/lib/data/transformers.test.ts`

```typescript
describe('Data Transformers', () => {
  describe('transformLessonData', () => {
    it('should transform lesson with vocabulary', () => {
      // Test data transformation
    });
  });

  describe('transformGrammarData', () => {
    it('should parse grammar patterns', () => {
      // Test grammar parsing
    });
  });

  describe('transformHSKData', () => {
    it('should split HSK into groups', () => {
      // Test HSK grouping
    });
  });
});
```

### 2.4. Simple Components Testing

#### `src/lib/components/common/Button.test.ts`

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Button from './Button.svelte';

describe('Button Component', () => {
  it('should render with text', () => {
    const { getByText } = render(Button, {
      props: { text: 'Click me' }
    });

    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('should handle click event', async () => {
    const handleClick = vi.fn();
    const { getByRole } = render(Button, {
      props: { text: 'Click', onclick: handleClick }
    });

    const button = getByRole('button');
    await fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when prop is true', () => {
    const { getByRole } = render(Button, {
      props: { text: 'Click', disabled: true }
    });

    const button = getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should apply variant class', () => {
    const { getByRole } = render(Button, {
      props: { text: 'Click', variant: 'primary' }
    });

    const button = getByRole('button');
    expect(button).toHaveClass('btn-primary');
  });
});
```

### Phase 2 Checklist - Unit Tests

**Utilities (10 files)**:
- [ ] `quizUtils.test.ts` - 15 tests
- [ ] `lessonUtils.test.ts` - 10 tests
- [ ] `grammarUtils.test.ts` - 12 tests
- [ ] `storageUtils.test.ts` - 8 tests
- [ ] `dataUtils.test.ts` - 10 tests
- [ ] `formatUtils.test.ts` - 8 tests
- [ ] `validationUtils.test.ts` - 12 tests

**Stores (5 files)**:
- [ ] `quiz.test.ts` - 15 tests
- [ ] `theme.test.ts` - 8 tests
- [ ] `lesson.test.ts` - 10 tests
- [ ] `progress.test.ts` - 12 tests
- [ ] `ui.test.ts` - 6 tests

**Components - Common (8 files)**:
- [ ] `Button.test.ts` - 8 tests
- [ ] `Card.test.ts` - 6 tests
- [ ] `Modal.test.ts` - 10 tests
- [ ] `BackButton.test.ts` - 5 tests
- [ ] `ProgressBar.test.ts` - 7 tests

**Total**: ~80 tests

---

## 🔗 Phase 3: Integration Tests (IT)

**Timeline**: 1 week
**Target**: 30-40 tests, 70%+ coverage
**Focus**: Component interactions, pages, data flow

### 3.1. Quiz Components Integration

#### `src/lib/components/quiz/FlashcardQuiz.integration.test.ts`

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import FlashcardQuiz from './FlashcardQuiz.svelte';
import { startQuiz } from '$lib/stores/quiz';

describe('FlashcardQuiz Integration', () => {
  const mockQuestions = [
    {
      id: '1',
      japanese: 'こんにちは',
      kana: 'こんにちは',
      vietnamese: 'Xin chào',
      english: 'Hello'
    },
    {
      id: '2',
      japanese: 'ありがとう',
      kana: 'ありがとう',
      vietnamese: 'Cảm ơn',
      english: 'Thank you'
    }
  ];

  beforeEach(() => {
    startQuiz(mockQuestions, 'flashcard');
  });

  it('should display first question', () => {
    const { getByText } = render(FlashcardQuiz);

    expect(getByText('こんにちは')).toBeInTheDocument();
    expect(getByText('Question 1 of 2')).toBeInTheDocument();
  });

  it('should flip card to show answer', async () => {
    const { getByText, getByRole } = render(FlashcardQuiz);

    const flipButton = getByRole('button', { name: /flip/i });
    await fireEvent.click(flipButton);

    await waitFor(() => {
      expect(getByText('Xin chào')).toBeInTheDocument();
      expect(getByText('Hello')).toBeInTheDocument();
    });
  });

  it('should navigate to next question', async () => {
    const { getByText, getByRole } = render(FlashcardQuiz);

    // Flip first card
    const flipButton = getByRole('button', { name: /flip/i });
    await fireEvent.click(flipButton);

    // Click next
    const nextButton = getByRole('button', { name: /next/i });
    await fireEvent.click(nextButton);

    await waitFor(() => {
      expect(getByText('ありがとう')).toBeInTheDocument();
      expect(getByText('Question 2 of 2')).toBeInTheDocument();
    });
  });

  it('should complete quiz on last question', async () => {
    const { getByRole, getByText } = render(FlashcardQuiz);

    // Navigate through all questions
    for (let i = 0; i < mockQuestions.length; i++) {
      const flipButton = getByRole('button', { name: /flip/i });
      await fireEvent.click(flipButton);

      const nextButton = getByRole('button', { name: /next/i });
      await fireEvent.click(nextButton);
    }

    await waitFor(() => {
      expect(getByText(/quiz complete/i)).toBeInTheDocument();
      expect(getByText(/2 of 2/)).toBeInTheDocument();
    });
  });

  it('should track answer correctness', async () => {
    const { getByRole } = render(FlashcardQuiz);

    // Mark first answer as correct
    const flipButton = getByRole('button', { name: /flip/i });
    await fireEvent.click(flipButton);

    const correctButton = getByRole('button', { name: /correct/i });
    await fireEvent.click(correctButton);

    const nextButton = getByRole('button', { name: /next/i });
    await fireEvent.click(nextButton);

    // Mark second answer as incorrect
    await fireEvent.click(flipButton);

    const incorrectButton = getByRole('button', { name: /incorrect/i });
    await fireEvent.click(incorrectButton);

    await fireEvent.click(nextButton);

    // Check results page
    await waitFor(() => {
      const results = getByRole('region', { name: /results/i });
      expect(results).toHaveTextContent('1 of 2');
      expect(results).toHaveTextContent('50%');
    });
  });
});
```

### 3.2. Page Integration Tests

#### `src/routes/quiz/[mode]/+page.integration.test.ts`

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import QuizPage from './+page.svelte';
import { page } from '$app/stores';

describe('Quiz Page Integration', () => {
  beforeEach(() => {
    // Mock page store with params
    page.set({
      params: { mode: 'flashcard' },
      data: {
        questions: [
          { id: '1', japanese: 'こんにちは', vietnamese: 'Xin chào' }
        ]
      }
    });
  });

  it('should load and display quiz component', () => {
    const { getByRole } = render(QuizPage);

    expect(getByRole('main')).toBeInTheDocument();
    expect(getByRole('heading', { level: 1 })).toHaveTextContent(/flashcard quiz/i);
  });

  it('should handle quiz completion and navigate to results', async () => {
    const { getByRole } = render(QuizPage);

    // Complete quiz
    const flipButton = getByRole('button', { name: /flip/i });
    await fireEvent.click(flipButton);

    const correctButton = getByRole('button', { name: /correct/i });
    await fireEvent.click(correctButton);

    // Should navigate to results
    await waitFor(() => {
      expect(goto).toHaveBeenCalledWith('/results');
    });
  });

  it('should allow quiz restart', async () => {
    const { getByRole } = render(QuizPage);

    // Complete quiz
    // ... (similar to above)

    const restartButton = getByRole('button', { name: /restart/i });
    await fireEvent.click(restartButton);

    await waitFor(() => {
      expect(getByText('Question 1 of 1')).toBeInTheDocument();
    });
  });
});
```

### 3.3. Navigation Integration

#### `src/routes/lesson/[id]/+page.integration.test.ts`

```typescript
describe('Lesson Page Integration', () => {
  it('should load lesson data and display vocabulary', async () => {
    const { getByRole, getAllByRole } = render(LessonPage, {
      props: { data: { lesson: mockLesson } }
    });

    expect(getByRole('heading')).toHaveTextContent('Lesson 1');

    const vocabItems = getAllByRole('listitem');
    expect(vocabItems).toHaveLength(mockLesson.vocabulary.length);
  });

  it('should filter vocabulary by search', async () => {
    const { getByRole, getAllByRole } = render(LessonPage, {
      props: { data: { lesson: mockLesson } }
    });

    const searchInput = getByRole('searchbox');
    await fireEvent.input(searchInput, { target: { value: 'こんにちは' } });

    await waitFor(() => {
      const vocabItems = getAllByRole('listitem');
      expect(vocabItems).toHaveLength(1);
      expect(vocabItems[0]).toHaveTextContent('こんにちは');
    });
  });

  it('should navigate to quiz page', async () => {
    const { getByRole } = render(LessonPage, {
      props: { data: { lesson: mockLesson } }
    });

    const quizButton = getByRole('button', { name: /start quiz/i });
    await fireEvent.click(quizButton);

    expect(goto).toHaveBeenCalledWith('/quiz/flashcard?lesson=1');
  });
});
```

### 3.4. LocalStorage Integration

#### `src/lib/stores/progress.integration.test.ts`

```typescript
describe('Progress Store LocalStorage Integration', () => {
  it('should persist progress to localStorage', async () => {
    const { saveProgress } = await import('./progress');

    saveProgress({
      lessonId: '1',
      score: 85,
      completedAt: Date.now()
    });

    const stored = JSON.parse(localStorage.getItem('user-progress') || '{}');
    expect(stored).toHaveProperty('1');
    expect(stored['1'].score).toBe(85);
  });

  it('should load progress from localStorage on init', async () => {
    localStorage.setItem('user-progress', JSON.stringify({
      '1': { score: 85, completedAt: 123456 }
    }));

    const { progress } = await import('./progress');
    const value = get(progress);

    expect(value['1'].score).toBe(85);
  });

  it('should merge new progress with existing', async () => {
    localStorage.setItem('user-progress', JSON.stringify({
      '1': { score: 85, completedAt: 123456 }
    }));

    const { saveProgress } = await import('./progress');

    saveProgress({
      lessonId: '2',
      score: 90,
      completedAt: Date.now()
    });

    const stored = JSON.parse(localStorage.getItem('user-progress') || '{}');
    expect(stored).toHaveProperty('1');
    expect(stored).toHaveProperty('2');
  });
});
```

### Phase 3 Checklist - Integration Tests

**Quiz Components (8 tests)**:
- [ ] `FlashcardQuiz.integration.test.ts` - 5 tests
- [ ] `MultipleChoiceQuiz.integration.test.ts` - 6 tests
- [ ] `TypingQuiz.integration.test.ts` - 7 tests
- [ ] `QuizResults.integration.test.ts` - 4 tests

**Pages (10 tests)**:
- [ ] `quiz/[mode]/+page.integration.test.ts` - 5 tests
- [ ] `lesson/[id]/+page.integration.test.ts` - 4 tests
- [ ] `grammar-reference/+page.integration.test.ts` - 3 tests
- [ ] `hsk/[group]/+page.integration.test.ts` - 4 tests
- [ ] `results/+page.integration.test.ts` - 3 tests

**Navigation & Routing (6 tests)**:
- [ ] `navigation.integration.test.ts` - 6 tests

**LocalStorage Integration (6 tests)**:
- [ ] `progress.integration.test.ts` - 4 tests
- [ ] `theme.integration.test.ts` - 2 tests

**Total**: ~35 tests

---

## 🎭 Phase 4: End-to-End Tests (E2E)

**Timeline**: 3-4 days
**Target**: 10-15 tests
**Focus**: Critical user journeys, happy paths

### 4.1. Complete Quiz Journey

#### `src/tests/e2e/quiz-journey.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Complete Quiz Journey', () => {
  test('should complete flashcard quiz end-to-end', async ({ page }) => {
    // 1. Navigate to home
    await page.goto('/');
    await expect(page).toHaveTitle(/Smart Quiz/);

    // 2. Select lesson
    await page.click('text=Lesson 1');
    await expect(page).toHaveURL(/\/lesson\/1/);

    // 3. Start flashcard quiz
    await page.click('button:has-text("Flashcard Quiz")');
    await expect(page).toHaveURL(/\/quiz\/flashcard/);

    // 4. Answer questions
    const totalQuestions = await page.locator('.question-count').textContent();
    const questionCount = parseInt(totalQuestions?.match(/\d+/)?.[1] || '0');

    for (let i = 0; i < questionCount; i++) {
      // Flip card
      await page.click('button:has-text("Flip")');
      await expect(page.locator('.card-back')).toBeVisible();

      // Mark as correct
      await page.click('button:has-text("Correct")');

      // Next question (if not last)
      if (i < questionCount - 1) {
        await page.click('button:has-text("Next")');
      }
    }

    // 5. View results
    await expect(page).toHaveURL(/\/results/);
    await expect(page.locator('.score')).toContainText(`${questionCount} of ${questionCount}`);
    await expect(page.locator('.percentage')).toContainText('100%');

    // 6. Return home
    await page.click('button:has-text("Back to Home")');
    await expect(page).toHaveURL('/');
  });

  test('should complete multiple choice quiz with mixed results', async ({ page }) => {
    await page.goto('/');

    // Navigate to lesson
    await page.click('text=Lesson 1');

    // Start MC quiz
    await page.click('button:has-text("Multiple Choice")');
    await expect(page).toHaveURL(/\/quiz\/mc/);

    // Answer first question correctly
    const correctAnswer = await page.locator('.option.correct').first();
    await correctAnswer.click();

    await expect(page.locator('.feedback.correct')).toBeVisible();
    await page.click('button:has-text("Next")');

    // Answer second question incorrectly
    const wrongAnswer = await page.locator('.option').nth(1);
    await wrongAnswer.click();

    await expect(page.locator('.feedback.incorrect')).toBeVisible();
    await page.click('button:has-text("Next")');

    // Check results
    await expect(page).toHaveURL(/\/results/);
    await expect(page.locator('.score')).toContainText('1 of 2');
    await expect(page.locator('.percentage')).toContainText('50%');
  });

  test('should complete typing quiz with romaji validation', async ({ page }) => {
    await page.goto('/');

    await page.click('text=Lesson 1');
    await page.click('button:has-text("Typing Quiz")');

    // Type correct answer
    const input = page.locator('input[type="text"]');
    await input.fill('konnichiwa');
    await page.click('button:has-text("Submit")');

    await expect(page.locator('.feedback.correct')).toBeVisible();

    // Type with variation (shi -> si)
    await page.click('button:has-text("Next")');
    await input.fill('si');  // Should accept si for shi
    await page.click('button:has-text("Submit")');

    await expect(page.locator('.feedback.correct')).toBeVisible();
  });
});
```

### 4.2. Navigation & Browsing

#### `src/tests/e2e/navigation.spec.ts`

```typescript
test.describe('Navigation', () => {
  test('should navigate through all main pages', async ({ page }) => {
    await page.goto('/');

    // Home
    await expect(page.locator('h1')).toContainText('Smart Quiz');

    // Japanese Lessons
    await page.click('nav >> text=Japanese');
    await expect(page).toHaveURL('/');
    await expect(page.locator('.lesson-card')).toHaveCount(25);

    // HSK
    await page.click('nav >> text=HSK');
    await expect(page).toHaveURL('/hsk');
    await expect(page.locator('.hsk-group-card')).toHaveCount(5);

    // Grammar
    await page.click('nav >> text=Grammar');
    await expect(page).toHaveURL('/grammar-reference');
    await expect(page.locator('.grammar-pattern')).toBeVisible();

    // Alphabet
    await page.click('nav >> text=Alphabet');
    await expect(page).toHaveURL('/alphabet');
    await expect(page.locator('.hiragana-grid')).toBeVisible();

    // Counters
    await page.click('nav >> text=Counters');
    await expect(page).toHaveURL('/counters');
    await expect(page.locator('.counter-category')).toBeVisible();
  });

  test('should use back button correctly', async ({ page }) => {
    await page.goto('/');

    // Navigate forward
    await page.click('text=Lesson 1');
    await expect(page).toHaveURL(/\/lesson\/1/);

    // Use back button
    await page.click('[aria-label="Back"]');
    await expect(page).toHaveURL('/');
  });

  test('should use browser back/forward buttons', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Lesson 1');
    await expect(page).toHaveURL(/\/lesson\/1/);

    // Browser back
    await page.goBack();
    await expect(page).toHaveURL('/');

    // Browser forward
    await page.goForward();
    await expect(page).toHaveURL(/\/lesson\/1/);
  });
});
```

### 4.3. Grammar Reference

#### `src/tests/e2e/grammar-reference.spec.ts`

```typescript
test.describe('Grammar Reference', () => {
  test('should browse and search grammar patterns', async ({ page }) => {
    await page.goto('/grammar-reference');

    // Check initial load
    const patterns = page.locator('.grammar-pattern');
    await expect(patterns.first()).toBeVisible();

    // Search for pattern
    const searchBox = page.locator('input[type="search"]');
    await searchBox.fill('～は～です');

    await expect(patterns).toHaveCount(1);
    await expect(patterns.first()).toContainText('～は～です');
  });

  test('should open grammar detail modal', async ({ page }) => {
    await page.goto('/grammar-reference');

    // Click on grammar pattern
    await page.click('.grammar-pattern >> nth=0');

    // Modal should open
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Explanation');
    await expect(modal).toContainText('Examples');

    // Close modal
    await page.click('button:has-text("Close")');
    await expect(modal).not.toBeVisible();
  });

  test('should view grammar comparisons', async ({ page }) => {
    await page.goto('/grammar-reference');

    // Click comparison button
    await page.click('button:has-text("Comparisons")');

    // Comparison modal should open
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Comparison');
    await expect(modal).toContainText('Difference');
  });
});
```

### 4.4. HSK Vocabulary

#### `src/tests/e2e/hsk-vocabulary.spec.ts`

```typescript
test.describe('HSK Vocabulary', () => {
  test('should browse HSK groups', async ({ page }) => {
    await page.goto('/hsk');

    // Check all 5 groups are visible
    const groups = page.locator('.hsk-group-card');
    await expect(groups).toHaveCount(5);

    // Click on group A
    await page.click('text=Group A');
    await expect(page).toHaveURL(/\/hsk\/a/);

    // Check vocabulary list
    const vocabItems = page.locator('.vocab-item');
    await expect(vocabItems.first()).toBeVisible();
  });

  test('should search HSK vocabulary', async ({ page }) => {
    await page.goto('/hsk/a');

    const searchBox = page.locator('input[type="search"]');
    await searchBox.fill('你好');

    const vocabItems = page.locator('.vocab-item');
    await expect(vocabItems).toHaveCount(1);
    await expect(vocabItems.first()).toContainText('你好');
  });

  test('should start HSK quiz', async ({ page }) => {
    await page.goto('/hsk/a');

    await page.click('button:has-text("Start Quiz")');
    await expect(page).toHaveURL(/\/quiz\/flashcard\?hsk=a/);

    // Should show HSK vocabulary in quiz
    await expect(page.locator('.chinese-text')).toBeVisible();
  });
});
```

### 4.5. Theme & PWA

#### `src/tests/e2e/theme-and-pwa.spec.ts`

```typescript
test.describe('Theme and PWA', () => {
  test('should toggle dark/light mode', async ({ page }) => {
    await page.goto('/');

    // Check default theme
    const html = page.locator('html');
    const initialTheme = await html.getAttribute('class');

    // Toggle theme
    await page.click('[aria-label="Toggle theme"]');

    // Theme should change
    const newTheme = await html.getAttribute('class');
    expect(newTheme).not.toBe(initialTheme);

    // Toggle back
    await page.click('[aria-label="Toggle theme"]');
    const finalTheme = await html.getAttribute('class');
    expect(finalTheme).toBe(initialTheme);
  });

  test('should persist theme preference', async ({ page, context }) => {
    await page.goto('/');

    // Set dark theme
    await page.click('[aria-label="Toggle theme"]');
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Open new page
    const newPage = await context.newPage();
    await newPage.goto('/');

    // Theme should be persisted
    await expect(newPage.locator('html')).toHaveClass(/dark/);
  });

  test('should load manifest.json', async ({ page }) => {
    const response = await page.goto('/manifest.webmanifest');
    expect(response?.status()).toBe(200);

    const manifest = await response?.json();
    expect(manifest.name).toContain('Smart Quiz');
    expect(manifest.short_name).toBeDefined();
    expect(manifest.icons).toHaveLength.greaterThan(0);
  });

  test('should register service worker', async ({ page }) => {
    await page.goto('/');

    // Wait for service worker registration
    await page.waitForFunction(() => {
      return navigator.serviceWorker.controller !== null;
    }, { timeout: 5000 });

    // Service worker should be active
    const swState = await page.evaluate(() => {
      return navigator.serviceWorker.controller?.state;
    });
    expect(swState).toBe('activated');
  });
});
```

### 4.6. Mobile Experience

#### `src/tests/e2e/mobile.spec.ts`

```typescript
test.describe('Mobile Experience', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE

  test('should be responsive on mobile', async ({ page }) => {
    await page.goto('/');

    // Check mobile menu
    const menuButton = page.locator('[aria-label="Menu"]');
    await expect(menuButton).toBeVisible();

    // Open menu
    await menuButton.click();
    const menu = page.locator('[role="navigation"]');
    await expect(menu).toBeVisible();

    // Navigate
    await page.click('text=Lesson 1');
    await expect(page).toHaveURL(/\/lesson\/1/);
  });

  test('should handle touch interactions in quiz', async ({ page }) => {
    await page.goto('/');

    await page.click('text=Lesson 1');
    await page.click('button:has-text("Flashcard Quiz")');

    // Swipe to flip card (tap on card)
    await page.tap('.flashcard');
    await expect(page.locator('.card-back')).toBeVisible();

    // Tap correct button
    await page.tap('button:has-text("Correct")');

    // Next question
    await page.tap('button:has-text("Next")');
    await expect(page.locator('.card-front')).toBeVisible();
  });
});
```

### Phase 4 Checklist - E2E Tests

**Quiz Journeys (4 tests)**:
- [ ] `quiz-journey.spec.ts` - 3 full quiz flows

**Navigation (3 tests)**:
- [ ] `navigation.spec.ts` - Main navigation, back button, browser history

**Grammar (3 tests)**:
- [ ] `grammar-reference.spec.ts` - Browse, search, modal, comparisons

**HSK (3 tests)**:
- [ ] `hsk-vocabulary.spec.ts` - Browse groups, search, quiz

**Theme & PWA (4 tests)**:
- [ ] `theme-and-pwa.spec.ts` - Theme toggle, persistence, manifest, SW

**Mobile (2 tests)**:
- [ ] `mobile.spec.ts` - Responsive, touch interactions

**Total**: ~15 tests

---

## 🚀 Phase 5: CI/CD & Coverage

**Timeline**: 1-2 days
**Goal**: Automate testing in CI, enforce coverage thresholds

### 5.1. Update GitHub Actions Workflow

**File**: `.github/workflows/test.yml`

```yaml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  unit-tests:
    name: Unit & Integration Tests
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v6

      - name: Setup Node.js
        uses: actions/setup-node@v6
        with:
          node-version: '24'
          cache: 'npm'
          cache-dependency-path: svelte-app/package-lock.json

      - name: Install dependencies
        run: |
          cd svelte-app
          npm ci

      - name: Run unit tests with coverage
        run: |
          cd svelte-app
          npm run test:unit

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v4
        with:
          files: ./svelte-app/coverage/lcov.info
          flags: unittests
          name: unit-coverage

      - name: Check coverage thresholds
        run: |
          cd svelte-app
          npm run test:coverage-check

  e2e-tests:
    name: E2E Tests
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v6

      - name: Setup Node.js
        uses: actions/setup-node@v6
        with:
          node-version: '24'
          cache: 'npm'
          cache-dependency-path: svelte-app/package-lock.json

      - name: Install dependencies
        run: |
          cd svelte-app
          npm ci

      - name: Install Playwright browsers
        run: |
          cd svelte-app
          npx playwright install --with-deps chromium firefox

      - name: Run E2E tests
        run: |
          cd svelte-app
          npm run test:e2e
        env:
          NODE_ENV: production

      - name: Upload Playwright report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: svelte-app/playwright-report/
          retention-days: 7

  test-summary:
    name: Test Summary
    runs-on: ubuntu-latest
    needs: [unit-tests, e2e-tests]
    if: always()

    steps:
      - name: Test Results Summary
        run: |
          echo "## Test Results" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "- Unit Tests: ${{ needs.unit-tests.result }}" >> $GITHUB_STEP_SUMMARY
          echo "- E2E Tests: ${{ needs.e2e-tests.result }}" >> $GITHUB_STEP_SUMMARY
```

### 5.2. Add Coverage Scripts

**File**: `svelte-app/package.json` (update scripts)

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:unit": "vitest run --coverage",
    "test:watch": "vitest watch",
    "test:coverage-check": "vitest run --coverage && node scripts/check-coverage.js",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:all": "npm run test:unit && npm run test:e2e"
  }
}
```

**File**: `svelte-app/scripts/check-coverage.js`

```javascript
const fs = require('fs');
const path = require('path');

const coverageSummary = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../coverage/coverage-summary.json'), 'utf8')
);

const total = coverageSummary.total;

const thresholds = {
  lines: 80,
  statements: 80,
  functions: 75,
  branches: 70
};

const results = {
  lines: total.lines.pct,
  statements: total.statements.pct,
  functions: total.functions.pct,
  branches: total.branches.pct
};

console.log('\n📊 Coverage Report:');
console.log('==================');

let failed = false;

Object.entries(results).forEach(([metric, value]) => {
  const threshold = thresholds[metric];
  const passed = value >= threshold;
  const icon = passed ? '✅' : '❌';

  console.log(`${icon} ${metric}: ${value.toFixed(2)}% (threshold: ${threshold}%)`);

  if (!passed) {
    failed = true;
  }
});

if (failed) {
  console.error('\n❌ Coverage thresholds not met!');
  process.exit(1);
} else {
  console.log('\n✅ All coverage thresholds met!');
  process.exit(0);
}
```

### 5.3. Pre-commit Hook

**File**: `.husky/pre-commit`

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "🧪 Running tests before commit..."

cd svelte-app

# Run unit tests
npm run test:unit -- --run --reporter=verbose

if [ $? -ne 0 ]; then
  echo "❌ Unit tests failed. Commit aborted."
  exit 1
fi

echo "✅ All tests passed!"
```

---

## ✅ Testing Checklist

### Setup
- [ ] Install all testing dependencies
- [ ] Configure Vitest with coverage
- [ ] Configure Playwright for E2E
- [ ] Create test setup files and helpers
- [ ] Update package.json scripts

### Unit Tests (80-100 tests)
- [ ] Utilities (40 tests)
  - [ ] Quiz utils - shuffle, generate, validate
  - [ ] Lesson utils - navigation, filtering
  - [ ] Grammar utils - parsing, comparison
  - [ ] Storage utils - localStorage helpers
  - [ ] Format utils - time, number formatting
  - [ ] Validation utils - input validation
- [ ] Stores (30 tests)
  - [ ] Quiz session management
  - [ ] Theme store
  - [ ] Lesson tracking
  - [ ] Progress tracking
  - [ ] UI state
- [ ] Components (30 tests)
  - [ ] Button, Card, Modal
  - [ ] Back button, Progress bar
  - [ ] Quiz components (isolated)

### Integration Tests (30-40 tests)
- [ ] Quiz Components (15 tests)
  - [ ] Flashcard quiz with state
  - [ ] Multiple choice quiz flow
  - [ ] Typing quiz with validation
  - [ ] Quiz results display
- [ ] Pages (10 tests)
  - [ ] Quiz page with routing
  - [ ] Lesson page with data
  - [ ] Grammar reference page
  - [ ] HSK vocabulary page
  - [ ] Results page
- [ ] Navigation (5 tests)
  - [ ] Route navigation
  - [ ] Back button functionality
  - [ ] Deep linking
- [ ] LocalStorage (5 tests)
  - [ ] Progress persistence
  - [ ] Theme persistence
  - [ ] Quiz state recovery

### E2E Tests (10-15 tests)
- [ ] Quiz Journeys (3 tests)
  - [ ] Complete flashcard quiz
  - [ ] Complete MC quiz with mixed results
  - [ ] Complete typing quiz with variations
- [ ] Navigation (3 tests)
  - [ ] Browse all main pages
  - [ ] Use back button
  - [ ] Browser back/forward
- [ ] Grammar Reference (3 tests)
  - [ ] Browse and search patterns
  - [ ] Open detail modal
  - [ ] View comparisons
- [ ] HSK Vocabulary (3 tests)
  - [ ] Browse groups
  - [ ] Search vocabulary
  - [ ] Start HSK quiz
- [ ] Theme & PWA (4 tests)
  - [ ] Toggle theme
  - [ ] Persist theme
  - [ ] Load manifest
  - [ ] Register service worker
- [ ] Mobile (2 tests)
  - [ ] Responsive layout
  - [ ] Touch interactions

### CI/CD
- [ ] Create GitHub Actions workflow for tests
- [ ] Configure coverage reporting (Codecov)
- [ ] Add coverage threshold checks
- [ ] Setup pre-commit hooks
- [ ] Add test results to PR comments
- [ ] Badge coverage in README

### Documentation
- [ ] Document how to run tests locally
- [ ] Document how to write new tests
- [ ] Document testing patterns and best practices
- [ ] Add troubleshooting guide

---

## 📚 Testing Best Practices

### Writing Good Tests

1. **AAA Pattern**: Arrange, Act, Assert
2. **One assertion per test** (when possible)
3. **Descriptive test names** - Should read like documentation
4. **Independent tests** - No shared state between tests
5. **Fast tests** - Mock slow operations
6. **Reliable tests** - No flaky tests

### Test Organization

```
src/
├── lib/
│   ├── components/
│   │   ├── Button.svelte
│   │   └── Button.test.ts          // Co-located with component
│   ├── utils/
│   │   ├── quizUtils.ts
│   │   └── quizUtils.test.ts       // Co-located with utility
│   └── stores/
│       ├── quiz.ts
│       └── quiz.test.ts            // Co-located with store
├── routes/
│   └── quiz/
│       ├── [mode]/
│       │   ├── +page.svelte
│       │   └── +page.integration.test.ts  // Integration test
└── tests/
    ├── setup.ts                     // Global setup
    ├── utils/
    │   └── test-helpers.ts          // Shared test utilities
    └── e2e/
        ├── quiz-journey.spec.ts     // E2E tests
        └── navigation.spec.ts
```

### Mocking Guidelines

- **Mock external dependencies** (APIs, localStorage, navigation)
- **Don't mock what you're testing**
- **Use realistic mock data**
- **Keep mocks simple and maintainable**

### Coverage Goals

- **Don't chase 100%** - Focus on valuable coverage
- **Test critical paths** first
- **Test edge cases** and error conditions
- **Test user interactions** more than implementation details

---

## 🎓 Resources

### Documentation
- [Vitest](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/svelte-testing-library/intro/)
- [Playwright](https://playwright.dev/)
- [SvelteKit Testing](https://kit.svelte.dev/docs/testing)

### Example Repos
- [SvelteKit Examples](https://github.com/sveltejs/kit/tree/master/examples)
- [Testing Library Examples](https://github.com/testing-library/svelte-testing-library/tree/main/src/__tests__)

---

## 🎯 Success Metrics

### Coverage Targets
- ✅ Overall coverage: 80%+
- ✅ Utilities coverage: 85%+
- ✅ Components coverage: 75%+
- ✅ Critical paths: 100%

### Quality Metrics
- ✅ Zero flaky tests
- ✅ Test suite runs < 5 minutes
- ✅ E2E tests run < 3 minutes
- ✅ All tests pass in CI before merge

### Team Metrics
- ✅ New features include tests
- ✅ Bug fixes include regression tests
- ✅ Code reviews check test coverage
- ✅ Tests are documentation

---

## 📝 Implementation Notes

### Week 1: Setup + Unit Tests
- Days 1-2: Setup infrastructure
- Days 3-7: Write unit tests (utilities, stores, components)

### Week 2: Integration Tests
- Days 8-12: Write integration tests (components, pages, navigation)
- Days 13-14: LocalStorage and data flow tests

### Week 3: E2E Tests + CI
- Days 15-18: Write E2E tests (critical journeys)
- Days 19-20: CI/CD setup and documentation

**Total**: 20 working days (~4 weeks với parallel work)

### Parallel Work Opportunities
- Unit tests có thể viết parallel (mỗi developer 1 module)
- Integration tests parallel theo pages
- E2E tests parallel theo user journeys

---

## ⚡ Next Steps

1. **Review plan với team**
2. **Assign tasks** cho team members
3. **Setup infrastructure** (Phase 1)
4. **Start with utilities** (easiest wins first)
5. **Iterate and improve** testing patterns

---

**Plan created**: 2026-03-19
**Version**: 1.0
**Status**: Ready for implementation 🚀
