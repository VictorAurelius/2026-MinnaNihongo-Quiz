# PR #26 — N1 Full Course

## Goal
Create JLPT N1 as a full course with 15 lessons covering advanced grammar and vocabulary.

## N1 Grammar Topics (15 Lessons)

| Lesson | Title | Grammar Focus |
|--------|-------|---------------|
| 1 | ～てはじめて / ～た上で | Only after, after doing |
| 2 | ～にほかならない / ～に相違ない | Nothing but, no doubt |
| 3 | ～をものともせず / ～をよそに | Despite, regardless of |
| 4 | ～かたわら / ～がてら / ～ついでに | While doing, taking the opportunity |
| 5 | ～に至るまで / ～を皮切りに | Ranging to, starting with |
| 6 | ～ならでは / ～ともなると | Unique to, when it comes to |
| 7 | ～べく / ～んがために | In order to (literary) |
| 8 | ～まじき / ～ざるを得ない | Must not (literary), cannot help but |
| 9 | ～なり / ～や否や / ～そばから | As soon as |
| 10 | ～極まりない / ～きわまる / ～限りだ | Extremely |
| 11 | ～めく / ～じみた / ～ぶる | Seeming, -ish, pretending |
| 12 | ～もさることながら / ～はおろか | Not to mention, let alone |
| 13 | ～たりとも～ない / ～といえども | Not even, although (formal) |
| 14 | ～に即して / ～を踏まえて | Based on, taking into account |
| 15 | Review & Mixed Grammar | All N1 patterns combined |

## Vocabulary Strategy
- Each lesson: ~15 vocab items thematic to the grammar topic
- Total: ~225 vocab items
- Include: japanese, kana, vietnamese, english, type, example
- Types: main, additional, kanji
- N1-level: formal, literary, academic vocabulary
- Reuse existing N1 vocab data where overlapping

## Files to Create
```
svelte-app/src/lib/data/courses/n1/
├── metadata.ts          (CourseMetadata)
├── lessons/
│   ├── index.ts         (getLessonData, getAllLessons, getLessonMetadata)
│   ├── lesson-01.ts     through
│   └── lesson-15.ts
```

## Files to Modify
- `src/lib/types/course.ts` — Add `'n1'` to CourseId union
- `src/lib/data/courses/index.ts` — Register N1 course

## Tests
- N1 course data integrity (15 lessons, each has vocab + grammar)
- N1 registration (getCourse('n1') returns valid course)
- N1 lesson navigation
- Vocab count per lesson ≥ 10
- Grammar count per lesson ≥ 3

## Acceptance
- N1 shows in /courses page
- Can browse all 15 lessons
- Can quiz (flashcard, MC, typing) on any lesson
- Vocabulary page shows all items
- Grammar page shows expandable patterns
