# Wave 12 Checkpoint — Kanji Enhancement

## PRs in Wave

| PR | Name | Status | Tests | Actual PR |
|----|------|--------|-------|-----------|
| #31 | [N2/N1 Kanji Examples](pr-31-kanji-examples.md) | [ ] | ~20 | — |
| #32 | [Kanji Component Tests](pr-32-kanji-tests.md) | [ ] | ~40 | — |
| #33 | [Quiz by Radical](pr-33-quiz-by-radical.md) | [ ] | ~15 | — |

## Entry Criteria
- [ ] Wave 11 checkpoint passed (hoặc wave 11 còn blocked)
- [ ] PR #138 (conversation patterns) đã merge vào main ✅
- [ ] Kanji evaluation report hoàn thành ✅

## Exit Criteria
- [ ] Mỗi kanji N2/N1 có ≥ 3 ví dụ từ (800 kanji × 3 = 2,400+ examples)
- [ ] KanjiFlashCard, KanjiMultipleChoice, KanjiTypingQuiz có unit tests
- [ ] `kanjiQuizUtils.ts` có unit tests (generateKanjiQuestions, generateKanjiMCOptions)
- [ ] `/kanji/radicals/[radical]/quiz` hoạt động với 4 modes
- [ ] Tests: 807 + ~75 mới = ~882 tests
- [ ] CI pass (cả 2 workflows)
- [ ] Branch coverage ≥ 60%, lines/statements ≥ 80%

## Motivation (từ Evaluation Report)

> Hệ thống kanji rất toàn diện về tính năng nhưng còn 2 điểm yếu chính:
> 1. N2/N1 examples rỗng → học sinh không có context từ thực tế
> 2. Component tests thiếu hoàn toàn → coverage thấp, dễ regression

## Audit Report
> Pending — chạy sau khi wave complete
