# PR #25 — N2 Full Course

## Goal
Create JLPT N2 as a full course with 15 lessons covering upper-intermediate grammar and vocabulary.

## N2 Grammar Topics (15 Lessons)

| Lesson | Title | Grammar Focus |
|--------|-------|---------------|
| 1 | ～ようにする / ～ようになる | Habitual change, gradual change |
| 2 | ～ことにする / ～ことになる | Personal decision vs external decision |
| 3 | ～わけだ / ～わけがない / ～わけではない | Reasoning, impossibility, partial negation |
| 4 | ～にしたがって / ～につれて / ～とともに | Proportional change |
| 5 | ～ばかり / ～ばかりか / ～ばかりに | Only, not only, just because |
| 6 | ～くせに / ～にもかかわらず / ～ものの | Contradiction, despite |
| 7 | ～おかげで / ～せいで / ～ために | Cause (positive/negative) |
| 8 | ～っぽい / ～気味 / ～がち | Tendency, seeming |
| 9 | ～に関して / ～について / ～に対して | Regarding, about, toward |
| 10 | ～ざるを得ない / ～ないわけにはいかない | Compulsion, unavoidable |
| 11 | ～以上 / ～上で / ～次第 | Once, upon, depending on |
| 12 | ～限り / ～限りでは / ～に限って | As long as, as far as, only when |
| 13 | ～たびに / ～際に / ～途中で | Every time, on the occasion, mid-way |
| 14 | ～恐れがある / ～かねない / ～得る | Risk, possibility |
| 15 | Review & Mixed Grammar | All N2 patterns combined |

## Vocabulary Strategy
- Each lesson: ~15 vocab items thematic to the grammar topic
- Total: ~225 vocab items
- Include: japanese, kana, vietnamese, english, type, example
- Types: main, additional, kanji
- Reuse existing N2 vocab data where overlapping

## Files to Create
```
svelte-app/src/lib/data/courses/n2/
├── metadata.ts          (CourseMetadata)
├── lessons/
│   ├── index.ts         (getLessonData, getAllLessons, getLessonMetadata)
│   ├── lesson-01.ts     through
│   └── lesson-15.ts
```

## Files to Modify
- `src/lib/types/course.ts` — Add `'n2'` to CourseId union
- `src/lib/data/courses/index.ts` — Register N2 course
- `src/lib/utils/courseUtils.ts` — Update isValidCourseId

## Tests
- N2 course data integrity (15 lessons, each has vocab + grammar)
- N2 registration (getCourse('n2') returns valid course)
- N2 lesson navigation (quiz URLs work)
- Vocab count per lesson ≥ 10
- Grammar count per lesson ≥ 3

## Acceptance
- N2 shows in /courses page
- Can browse all 15 lessons
- Can quiz (flashcard, MC, typing) on any lesson
- Vocabulary page shows all items
- Grammar page shows expandable patterns
