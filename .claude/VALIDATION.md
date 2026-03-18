# Data Validation Rules - Smart Quiz

## 📋 Overview

Quy tắc validation cho JLPT (Japanese) và HSK (Chinese) data trong Smart Quiz. **BẮT BUỘC tuân thủ** khi thêm hoặc sửa lesson data.

---

## 🎌 JLPT Lesson Data Validation

### Lesson Structure

```typescript
interface LessonData {
  lessonNumber: number;           // REQUIRED: 1-50
  title: string;                  // REQUIRED: Tiếng Nhật
  vocabulary: VocabItem[];        // REQUIRED: ≥5 items
  grammar: GrammarPattern[];      // OPTIONAL: Can be []
  culturalNotes?: string[];       // OPTIONAL
}
```

### ✅ Validation Rules - Lesson Level

| Field | Rules | Example |
|-------|-------|---------|
| `lessonNumber` | • 1-50<br>• Match filename<br>• Unique | `1` (lesson-01.ts) |
| `title` | • Not empty<br>• Japanese chars<br>• <50 chars | `"わたしは ～です"` |
| `vocabulary` | • ≥5 items<br>• No duplicates<br>• All valid format | `[{...}, {...}]` |
| `grammar` | • Can be []<br>• All valid format | `[{...}]` or `[]` |

---

## 📝 Vocabulary Item Validation

### Structure

```typescript
interface VocabItem {
  japanese: string;               // REQUIRED
  vietnamese: string;             // REQUIRED
  english: string;                // REQUIRED
  romaji: string;                 // REQUIRED
  audioFile?: string;             // OPTIONAL
  type?: VocabType;               // OPTIONAL
  kanji?: string;                 // OPTIONAL
  exampleSentence?: {             // OPTIONAL
    japanese: string;
    vietnamese: string;
    english: string;
  };
}
```

### ✅ Validation Rules - Vocabulary

#### 1. Japanese Field
```typescript
japanese: string  // REQUIRED

Rules:
✓ Not empty
✓ Contains Hiragana/Katakana/Kanji (Unicode ranges)
✓ No leading/trailing spaces
✓ 1-20 characters

Valid:   "見る", "テレビ", "先生"
Invalid: "", "   見る", "very long text here...", "abc123"
```

#### 2. Vietnamese Field
```typescript
vietnamese: string  // REQUIRED

Rules:
✓ Not empty
✓ No leading/trailing spaces
✓ 1-100 characters
✓ Should use Vietnamese tone marks if applicable

Valid:   "nhìn, xem", "tivi", "giáo viên"
Invalid: "", "   nhìn", "A very very very very long translation..."
```

#### 3. English Field
```typescript
english: string  // REQUIRED

Rules:
✓ Not empty
✓ No leading/trailing spaces
✓ 1-100 characters
✓ Lowercase (except proper nouns)

Valid:   "to see, to watch", "television", "teacher"
Invalid: "", "TO SEE", "   to see"
```

#### 4. Romaji Field
```typescript
romaji: string  // REQUIRED

Rules:
✓ Not empty
✓ Lowercase only (except proper nouns)
✓ Use Hepburn romanization
✓ Match japanese reading
✓ 1-30 characters

Valid:   "miru", "terebi", "sensei"
Invalid: "", "MIRU", "Miru", "mi ru" (extra space)

Special cases:
- Long vowels: "ou" → "ō" or "ou" (consistent)
- "を" → "o" (not "wo")
- "は" (particle) → "wa" (not "ha")
```

**Hepburn Romanization Reference:**
```
あ=a  い=i  う=u  え=e  お=o
か=ka き=ki く=ku け=ke こ=ko
さ=sa し=shi す=su せ=se そ=so
た=ta ち=chi つ=tsu て=te と=to
な=na に=ni ぬ=nu ね=ne の=no
は=ha ひ=hi ふ=fu へ=he ほ=ho
ま=ma み=mi む=mu め=me も=mo
や=ya    ゆ=yu    よ=yo
ら=ra り=ri る=ru れ=re ろ=ro
わ=wa              を=o
ん=n

Dakuten (゛):
が=ga ぎ=gi ぐ=gu げ=ge ご=go
ざ=za じ=ji ず=zu ぜ=ze ぞ=zo
だ=da ぢ=ji づ=zu で=de ど=do
ば=ba び=bi ぶ=bu べ=be ぼ=bo

Handakuten (゜):
ぱ=pa ぴ=pi ぷ=pu ぺ=pe ぽ=po

Yōon (small や/ゆ/よ):
きゃ=kya きゅ=kyu きょ=kyo
しゃ=sha しゅ=shu しょ=sho
ちゃ=cha ちゅ=chu ちょ=cho
にゃ=nya にゅ=nyu にょ=nyo
etc.
```

#### 5. Audio File (Optional)
```typescript
audioFile?: string

Rules:
✓ Format: "lesson-XX/word.mp3"
✓ XX = two-digit lesson number
✓ File must exist in static/audio/
✓ .mp3 format only

Valid:   "lesson-01/watashi.mp3"
Invalid: "watashi.mp3", "lesson-1/watashi.mp3", "lesson-01/watashi.wav"
```

#### 6. Type (Optional)
```typescript
type?: 'noun' | 'verb' | 'adjective' | 'adverb' | 'particle' | 'expression' | 'counter'

Rules:
✓ Must be one of allowed values
✓ Helps with quiz generation

Valid:   "noun", "verb", "adjective"
Invalid: "名詞", "n", "Noun"
```

#### 7. Kanji (Optional)
```typescript
kanji?: string

Rules:
✓ Only if japanese contains kanji
✓ Kanji only (no kana)
✓ 1-10 characters

Valid:   "見", "先生", "食"
Invalid: "みる", "見る", ""
```

#### 8. Example Sentence (Optional)
```typescript
exampleSentence?: {
  japanese: string;     // Must contain the vocab word
  vietnamese: string;
  english: string;
}

Rules:
✓ All three fields required if present
✓ Japanese must contain the vocab word
✓ Complete sentence (ends with 。or ！or ？)

Valid:
{
  japanese: "私はテレビを見ます。",
  vietnamese: "Tôi xem tivi.",
  english: "I watch television."
}
```

---

## 🎓 Grammar Pattern Validation

### Structure

```typescript
interface GrammarPattern {
  pattern: string;                // REQUIRED
  vietnamese: string;             // REQUIRED
  english: string;                // REQUIRED
  explanation?: string;           // OPTIONAL
  examples?: Example[];           // OPTIONAL
  lessonNumber?: number;          // OPTIONAL
  lessonTitle?: string;           // OPTIONAL
}
```

### ✅ Validation Rules - Grammar

#### 1. Pattern Field
```typescript
pattern: string  // REQUIRED

Rules:
✓ Not empty
✓ Contains Japanese grammar notation
✓ Use ～ for placeholder
✓ 2-50 characters

Valid:   "～は ～です", "～を ～ます", "どこで ～か"
Invalid: "", "です", "this is a pattern" (no Japanese)
```

#### 2. Vietnamese & English
```typescript
vietnamese: string  // REQUIRED
english: string     // REQUIRED

Rules:
✓ Not empty
✓ Clear explanation of usage
✓ 5-200 characters

Valid:
vietnamese: "Giới thiệu danh tính"
english: "Introduce identity"
```

#### 3. Examples Array (Optional)
```typescript
examples?: Array<{
  japanese: string;
  vietnamese: string;
  english?: string;
}>

Rules:
✓ 1-5 examples
✓ Each example must have japanese + vietnamese
✓ Examples use the pattern

Valid:
[
  {
    japanese: "私は学生です。",
    vietnamese: "Tôi là học sinh.",
    english: "I am a student."
  }
]
```

#### 4. Metadata (Optional)
```typescript
lessonNumber?: number    // 1-50
lessonTitle?: string     // Match lesson data

Rules:
✓ If present, must match existing lesson
✓ Used for cross-referencing
```

---

## 🇨🇳 HSK Data Validation

### HSK Structure

```typescript
interface HSKData {
  level: 1 | 2 | 3 | 4 | 5 | 6;  // REQUIRED
  groupNumber: number;             // REQUIRED: 1-N
  title: string;                   // REQUIRED
  vocabulary: HSKVocabItem[];      // REQUIRED: ≥10 items
}
```

### ✅ Validation Rules - HSK Level

| Field | Rules | Example |
|-------|-------|---------|
| `level` | • 1-6 only<br>• Match directory | `1` (hsk1/) |
| `groupNumber` | • ≥1<br>• Sequential | `1, 2, 3...` |
| `title` | • Chinese chars<br>• <30 chars | `"基础词汇 1"` |
| `vocabulary` | • ≥10 items<br>• No duplicates | `[{...}]` |

---

## 📝 HSK Vocabulary Validation

### Structure

```typescript
interface HSKVocabItem {
  simplified: string;              // REQUIRED
  traditional?: string;            // OPTIONAL
  pinyin: string;                  // REQUIRED
  vietnamese: string;              // REQUIRED
  english: string;                 // REQUIRED
  audioFile?: string;              // OPTIONAL
  type?: VocabType;                // OPTIONAL
}
```

### ✅ Validation Rules - HSK Vocabulary

#### 1. Simplified Chinese
```typescript
simplified: string  // REQUIRED

Rules:
✓ Not empty
✓ Simplified Chinese characters only
✓ No spaces (unless compound word)
✓ 1-10 characters

Valid:   "你", "好", "学生", "中国人"
Invalid: "", "學生" (traditional), "ni", "   你"
```

#### 2. Traditional Chinese (Optional)
```typescript
traditional?: string

Rules:
✓ Traditional Chinese characters only
✓ Same length as simplified
✓ Only if different from simplified

Valid:   "學生" (for "学生")
Invalid: "学生" (same as simplified - omit field)
```

#### 3. Pinyin
```typescript
pinyin: string  // REQUIRED

Rules:
✓ Not empty
✓ Lowercase with tone marks (ā á ǎ à)
✓ Or tone numbers (a1 a2 a3 a4)
✓ Correct pinyin spelling
✓ 1-30 characters

Valid:   "nǐ", "hǎo", "xuésheng", "ni3", "hao3"
Invalid: "", "NI", "Ni", "ni " (extra space)

Tone marks:
1st tone: ā ē ī ō ū ǖ
2nd tone: á é í ó ú ǘ
3rd tone: ǎ ě ǐ ǒ ǔ ǚ
4th tone: à è ì ò ù ǜ
No tone: a e i o u ü
```

#### 4. Vietnamese & English
```typescript
vietnamese: string  // REQUIRED
english: string     // REQUIRED

Rules:
✓ Same as JLPT vocab rules
✓ Not empty
✓ No extra spaces
✓ 1-100 characters
```

---

## 🔍 Validation Scripts

### Automated Validation

```typescript
// src/lib/utils/validation.ts

/**
 * Validate JLPT lesson data
 */
export function validateLessonData(lesson: LessonData): ValidationResult {
  const errors: string[] = [];

  // Lesson number
  if (!lesson.lessonNumber || lesson.lessonNumber < 1 || lesson.lessonNumber > 50) {
    errors.push(`Invalid lesson number: ${lesson.lessonNumber}`);
  }

  // Title
  if (!lesson.title || lesson.title.length === 0 || lesson.title.length > 50) {
    errors.push(`Invalid title: ${lesson.title}`);
  }

  // Vocabulary
  if (!lesson.vocabulary || lesson.vocabulary.length < 5) {
    errors.push(`Insufficient vocabulary items: ${lesson.vocabulary?.length || 0}`);
  }

  // Validate each vocab item
  lesson.vocabulary?.forEach((item, index) => {
    const vocabErrors = validateVocabItem(item);
    if (vocabErrors.length > 0) {
      errors.push(`Vocab item ${index}: ${vocabErrors.join(', ')}`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validate vocabulary item
 */
export function validateVocabItem(item: VocabItem): string[] {
  const errors: string[] = [];

  // Japanese
  if (!item.japanese || !isJapanese(item.japanese)) {
    errors.push('Invalid japanese field');
  }

  // Vietnamese
  if (!item.vietnamese || item.vietnamese.trim() !== item.vietnamese) {
    errors.push('Invalid vietnamese field');
  }

  // English
  if (!item.english || item.english.trim() !== item.english) {
    errors.push('Invalid english field');
  }

  // Romaji
  if (!item.romaji || !isValidRomaji(item.romaji)) {
    errors.push('Invalid romaji field');
  }

  // Audio file
  if (item.audioFile && !item.audioFile.match(/^lesson-\d{2}\/[\w-]+\.mp3$/)) {
    errors.push('Invalid audio file format');
  }

  return errors;
}

/**
 * Check if string contains Japanese characters
 */
function isJapanese(str: string): boolean {
  const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/;
  return japaneseRegex.test(str);
}

/**
 * Check if romaji is valid
 */
function isValidRomaji(romaji: string): boolean {
  // Lowercase, no spaces, valid Hepburn characters
  const romajiRegex = /^[a-z]+$/;
  return romajiRegex.test(romaji);
}
```

### Run Validation

```bash
# Manual validation script
npm run validate:data

# Auto-validate on save (VSCode)
# Add to .vscode/settings.json:
{
  "editor.codeActionsOnSave": {
    "source.validate": true
  }
}
```

---

## ⚠️ Common Mistakes

### ❌ WRONG

```typescript
// 1. Missing required fields
{
  japanese: "見る",
  vietnamese: "nhìn"
  // Missing: english, romaji
}

// 2. Wrong romaji
{
  japanese: "私",
  romaji: "watasi"  // Should be "watashi"
}

// 3. Uppercase romaji
{
  japanese: "見る",
  romaji: "Miru"  // Should be "miru"
}

// 4. Extra spaces
{
  japanese: "見る  ",
  vietnamese: "  nhìn"
}

// 5. Wrong audio format
{
  audioFile: "watashi.mp3"  // Should be "lesson-01/watashi.mp3"
}

// 6. No Japanese in pattern
{
  pattern: "Subject-Topic"  // Should be "～は"
}

// 7. Duplicate vocabulary
vocabulary: [
  { japanese: "見る", ... },
  { japanese: "見る", ... }  // Duplicate!
]
```

### ✅ CORRECT

```typescript
// 1. All required fields
{
  japanese: "見る",
  vietnamese: "nhìn, xem",
  english: "to see, to watch",
  romaji: "miru"
}

// 2. Correct romaji (Hepburn)
{
  japanese: "私",
  romaji: "watashi"
}

// 3. Lowercase romaji
{
  japanese: "見る",
  romaji: "miru"
}

// 4. No extra spaces
{
  japanese: "見る",
  vietnamese: "nhìn"
}

// 5. Correct audio format
{
  audioFile: "lesson-01/watashi.mp3"
}

// 6. Japanese in pattern
{
  pattern: "～は ～です"
}

// 7. Unique vocabulary
vocabulary: [
  { japanese: "見る", ... },
  { japanese: "聞く", ... }  // Different word
]
```

---

## 🧪 Testing Validation

### Unit Tests

```typescript
// tests/validation.test.ts
import { validateVocabItem } from '$lib/utils/validation';

describe('Vocabulary Validation', () => {
  test('valid vocab item passes', () => {
    const item = {
      japanese: '見る',
      vietnamese: 'nhìn, xem',
      english: 'to see, to watch',
      romaji: 'miru'
    };

    const errors = validateVocabItem(item);
    expect(errors).toHaveLength(0);
  });

  test('missing required field fails', () => {
    const item = {
      japanese: '見る',
      vietnamese: 'nhìn'
      // Missing: english, romaji
    };

    const errors = validateVocabItem(item);
    expect(errors.length).toBeGreaterThan(0);
  });

  test('invalid romaji fails', () => {
    const item = {
      japanese: '見る',
      vietnamese: 'nhìn',
      english: 'to see',
      romaji: 'MIRU'  // Should be lowercase
    };

    const errors = validateVocabItem(item);
    expect(errors).toContain('Invalid romaji field');
  });
});
```

---

## 📋 Pre-commit Checklist

Before committing lesson data changes:

- [ ] All required fields present
- [ ] No duplicate vocabulary items
- [ ] Romaji uses correct Hepburn romanization
- [ ] All fields trimmed (no extra spaces)
- [ ] Audio files exist (if specified)
- [ ] Lesson number matches filename
- [ ] Ran validation script: `npm run validate:data`
- [ ] All tests pass: `npm run test`

---

## 🔧 Validation Tools

### VSCode Extensions (Recommended)

1. **Japanese Language Support**
   - Highlight Japanese characters
   - Detect encoding issues

2. **ESLint + TypeScript**
   - Catch type errors
   - Enforce data structure

3. **Error Lens**
   - Show validation errors inline

### Online Tools

- **Romaji Converter:** https://www.lexilogos.com/keyboard/japanese_conversion.htm
- **Pinyin Converter:** https://www.pinyinput.com/
- **Unicode Checker:** https://www.compart.com/en/unicode/

---

## 📞 Need Help?

### When validation fails:

1. **Read error message carefully**
2. **Check this guide** for correct format
3. **Compare with existing data** (lesson-01.ts is good reference)
4. **Run validation script** to see all errors at once
5. **Ask Claude Code** with specific error message

---

**Last updated:** 2026-03-18
**Maintainer:** Development Team
