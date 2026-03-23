# Business Logic Documentation

## Learning System Overview

Smart Quiz is designed for Vietnamese learners studying Japanese (JLPT N5/N4) and Chinese (HSK5). The app provides structured lesson-based learning with multiple practice modes.

## Course System

### Course Registry

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   N5 Course │     │   N4 Course │     │   HSK5      │
│ 25 lessons  │     │ 25 lessons  │     │ 5 groups    │
│ 1100+ vocab │     │ core vocab  │     │ 1600+ words │
│ 103 grammar │     │             │     │             │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       └───────────┬───────┘                   │
                   │                           │
            Course System                Independent
          /course/[courseId]             /hsk/[group]
```

### Course vs Standalone Sections

| Section | Type | URL Pattern | Data Source |
|---------|------|-------------|-------------|
| N5 Minna no Nihongo | Course | `/course/n5/lesson/[id]` | `data/minna/lessons/` |
| N4 Core Lessons | Course | `/course/n4/lesson/[id]` | `data/courses/n4/lessons/` |
| Kanji | Standalone | `/kanji/[lesson]` | `data/kanji/lessons/` |
| HSK5 Chinese | Standalone | `/hsk/[group]` | `data/hsk/` |
| Alphabet | Standalone | `/alphabet` | `data/minna/alphabet.ts` |
| Counters | Standalone | `/counters` | `data/minna/counters.ts` |
| Grammar Reference | Standalone | `/grammar-reference` | `data/minna/grammar/` |

## Quiz Flow

### User Journey

```
Home → Course → Lesson Menu → Select Direction → Choose Quiz Mode → Quiz → Results
                                    │                                        │
                                    │                                        ├→ Retry Wrong Items
                                    │                                        ├→ Retry All
                                    │                                        └→ Back to Lesson
                                    │
                                    ├→ View Vocabulary (select items → quiz)
                                    └→ View Grammar
```

### Direction System

The user selects a quiz direction before starting. This determines what is shown as the question and what is expected as the answer:

| Direction | Question Shows | Answer Expected | Use Case |
|-----------|---------------|-----------------|----------|
| `ja-vi` | Japanese (kanji + kana) | Vietnamese meaning | Recognition |
| `vi-ja` | Vietnamese meaning | Japanese text | Production |
| `vi-romaji` | Vietnamese meaning | Romaji reading | Pronunciation |

Hidden directions (in type system but not in UI):
- `ja-en` — Japanese → English
- `en-ja` — English → Japanese
- `ja-romaji` — Japanese → Romaji

### Question Generation

```typescript
generateQuestions(vocabItems, direction, count?)
```

1. Shuffle all vocabulary items (Fisher-Yates)
2. For each item, extract question/answer based on direction:
   - `ja-vi`: question = `item.japanese`, answer = `item.vietnamese`
   - `vi-ja`: question = `item.vietnamese`, answer = `item.japanese`
   - `vi-romaji`: question = `item.vietnamese`, answer = `kanaToRomaji(item.kana)`
3. Return array of `QuizQuestion` objects with unique IDs

### Quiz Modes

#### Flashcard

```
┌────────────────────┐         ┌────────────────────┐
│                    │  flip   │                    │
│   questionText     │ ──────→ │   answerText       │
│                    │ Space/  │   + example        │
│   [🔊 Speak (F1)] │ Enter   │                    │
│                    │         │                    │
└────────────────────┘         └────────────────────┘
                                     │
                            ┌────────┴────────┐
                            │                 │
                        [✗ Wrong]        [✓ Correct]
                            │                 │
                            └────────┬────────┘
                                     │
                              Next question
                              or Results
```

- Auto-speak: TTS plays Japanese pronunciation when new card appears
- Score: user self-evaluates (Correct/Wrong buttons)
- No answer validation — purely self-assessment

#### Multiple Choice

```
┌────────────────────────────┐
│  What is the meaning of:   │
│      questionText          │
│      [🔊 Speak (F1)]      │
├────────────────────────────┤
│  1. Option A               │
│  2. Option B  ← correct    │
│  3. Option C               │
│  4. Option D               │
└────────────────────────────┘
         │ select
         ▼
┌────────────────────────────┐
│  ✓ Correct!               │  ← green feedback
│  or                        │
│  ✗ Wrong! Answer: B       │  ← red + shows correct
└────────────────────────────┘
         │ 1.5s auto-advance
         ▼
      Next question
```

- 4 options: 1 correct + 3 random wrong answers from same lesson
- Keyboard: 1-4 to select, F1 to speak
- Auto-advance after 1.5 seconds
- Wrong answers tracked in `wrongItems[]`

#### Typing Quiz

```
┌────────────────────────────┐
│  Type the answer:          │
│      questionText          │
│      [🔊 Speak (F1)]      │
├────────────────────────────┤
│  [________________] [⌨️]   │
│                            │
│  [💡 Show Romaji Hint]     │
│                            │
│  [Submit Answer]           │
└────────────────────────────┘
         │ Enter (submit)
         ▼
┌────────────────────────────┐
│  ✓ Correct!               │  ← TTS plays Japanese
│  or                        │
│  ✗ Wrong! Answer: ...     │
│                            │
│  [Next Question →]         │
│  Press Enter to continue   │
└────────────────────────────┘
         │ Enter (advance)
         ▼
      Next question
      (input auto-focused)
```

- Two-step Enter flow: first Enter submits, second Enter advances
- TTS plays after submission (not on advance)
- Input auto-focuses on next question
- Virtual keyboard available for Japanese input

### Answer Validation

#### Normal Mode (Vietnamese/Japanese/English)

```
normalizeString(str):
  1. Trim whitespace
  2. Lowercase
  3. Remove all spaces
```

Example: `"  Xin Chào  "` → `"xinchào"` = `"xinchào"` ✓

#### Romaji Mode

```
normalizeRomaji(str):
  1. Lowercase + trim
  2. Remove spaces
  3. Remove hyphens (long vowel mark ー → "-")
  4. Alternative readings:
     shi → si, chi → ti, tsu → tu
     fu → hu, ji → zi
     ō → ou, ū → uu, ē → ei, ā → aa
```

Example: `"shitsureishimasu"` → `"situреisimasu"` = `"sorosoro situreisimasu"` after normalization ✓

### Scoring & Results

```typescript
calculateStats(correctCount, totalCount) → {
  correct: number,
  wrong: number,
  total: number,
  percentage: number,     // 0-100, rounded
  grade: 'A'|'B'|'C'|'D'|'F'
}
```

| Grade | Percentage |
|-------|-----------|
| A | 90-100% |
| B | 80-89% |
| C | 70-79% |
| D | 60-69% |
| F | 0-59% |

### Retry System

After completing a quiz, the user has two retry options:

1. **Retry Wrong Items** — creates a new quiz using only `wrongItems[]` from the completed quiz
2. **Retry All** — regenerates the full quiz from the lesson's vocabulary with new shuffle

Both preserve the same mode, direction, course, and lesson number.

## Vocabulary Selection

Users can select specific vocabulary items from the vocabulary list page before starting a quiz:

1. Vocabulary list page shows checkboxes per item
2. User selects items → "Quiz Selected (N)" button appears
3. Selected items are stored in `sessionStorage` as JSON
4. Quiz page reads from `sessionStorage` and uses those items instead of full lesson vocabulary
5. `sessionStorage` is cleared after reading (one-time use)

## Kanji Learning

Kanji has its own quiz system separate from the main course quiz:

```typescript
interface KanjiItem {
  character: string;      // 漢
  onyomi: string[];       // On'yomi (Chinese reading)
  kunyomi: string[];      // Kun'yomi (Japanese reading)
  strokeCount: number;
  jlpt: number;           // N5 or N4
  vietnamese: string;     // Hán Việt reading
  english: string;
  examples: KanjiExampleWord[];  // 3 example words per kanji
}
```

**Kanji quiz directions:**
- `kanji-vi`: See kanji → answer Vietnamese meaning
- `kanji-en`: See kanji → answer English meaning
- `kanji-reading`: See kanji → answer primary reading (onyomi first)

## Text-to-Speech

### TTS Rules

1. **Use `item.kana`** for pronunciation (not `item.japanese`)
   - `item.japanese` may contain kanji → TTS reads both kanji and furigana
   - `item.kana` contains only hiragana/katakana → clean single pronunciation
2. **Cancel previous utterance** before speaking new one (`speechSynthesis.cancel()`)
3. **Guard against SSR** — check `typeof window !== 'undefined'` before accessing `speechSynthesis`
4. **Rate:** 0.8 (slightly slower for learners)
5. **Lang:** `ja-JP`

### When TTS Plays

| Trigger | Component | Timing |
|---------|-----------|--------|
| New flashcard appears | FlashCard | Auto (200ms delay) |
| F1 key pressed | All quiz modes | Immediate |
| Speak button clicked | All quiz modes | Immediate |
| Typing answer submitted | TypingQuiz | After submission |

## Grammar System

### Data Structure

```typescript
interface GrammarItem {
  pattern: string;        // "～は～です"
  vietnamese: string;     // "là"
  english: string;        // "is/am/are"
  explanation: string;    // Detailed explanation
  examples: GrammarExample[];
  category?: string;      // Grammar category
  lesson?: number;        // Lesson number
}

interface GrammarComparison {
  patterns: string[];     // ["～たい", "～ほしい"]
  title: string;
  explanation: string;
  examples: GrammarExample[];
}
```

### Grammar Reference Features

- **Search:** Filter by pattern text, Vietnamese, or English
- **Filter by lesson:** Show patterns from specific lessons
- **Comparisons:** Side-by-side comparison of similar patterns
- **Detail modal:** Full explanation with examples and related patterns

## HSK5 Chinese Vocabulary

### Data Organization

1600+ words divided into 5 groups (A-E) alphabetically by pinyin:

| Group | Range | Words |
|-------|-------|-------|
| A | A-G | ~320 |
| B | G-M | ~320 |
| C | M-S | ~320 |
| D | S-X | ~320 |
| E | X-Z | ~320 |

### HSK Data Structure

```typescript
interface HSKWord {
  chinese: string;     // 你好
  pinyin: string;      // nǐ hǎo
  vietnamese: string;  // Xin chào
}

interface HSKGroup {
  id: string;          // 'a', 'b', 'c', 'd', 'e'
  title: string;
  words: HSKWord[];
}
```

## Dark Mode

- Toggle button in header
- Persists to `localStorage` (`minna_dark`)
- Uses CSS custom properties for theming (`:root` vs `.dark`)
- Respects system preference on first load via `window.matchMedia`

## PWA (Progressive Web App)

- **Service Worker:** caches static assets for offline use
- **Manifest:** installable on mobile/desktop
- **Icons:** 192x192 and 512x512 PNG
- **Offline:** all lesson data is bundled in JS (no API calls needed)
