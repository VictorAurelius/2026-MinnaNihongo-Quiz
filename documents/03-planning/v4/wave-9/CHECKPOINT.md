# Wave 9 — N2 & N1 Full Course Completion

> **Goal:** Convert N2/N1 from reference-only data to full courses with lessons, grammar, quiz support
> **Entry:** Waves 1-5, 7-8 done. UI redesign done. 755 tests.
> **Exit:** N2 + N1 courses playable end-to-end (browse, quiz, review). Tests pass.

## Entry Criteria
- [x] N2 vocab exists (251 items in `vocab/n2/`)
- [x] N1 vocab exists (251 items in `vocab/n1/`)
- [x] N2 kanji exists (400 items in `kanji-n2.ts`)
- [x] N1 kanji exists (400 items in `kanji-n1.ts`)
- [x] N3 course pattern established (15 lessons, metadata, index)
- [x] CourseId type and course registry in place

## Exit Criteria
- [ ] CourseId includes `'n2' | 'n1'`
- [ ] N2 course: 15 lessons × ~15 vocab + ~5 grammar each
- [ ] N1 course: 15 lessons × ~15 vocab + ~5 grammar each
- [ ] Both courses registered, browsable, quiz-ready
- [ ] Tests: +20 new tests, all existing pass
- [ ] Build passes

## PRs

| PR | Name | Scope | Detail |
|----|------|-------|--------|
| #25 | N2 Full Course | 15 lessons + metadata + registration | [pr-25-n2-course.md](pr-25-n2-course.md) |
| #26 | N1 Full Course | 15 lessons + metadata + registration | [pr-26-n1-course.md](pr-26-n1-course.md) |

## Risk
- Large data files (~225 vocab + ~75 grammar per course)
- Grammar accuracy for advanced levels
- Bundle size increase (mitigated by SvelteKit code splitting)
