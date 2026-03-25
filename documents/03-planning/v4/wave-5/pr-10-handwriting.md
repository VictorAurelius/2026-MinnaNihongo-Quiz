# PR #10: Kanji Handwriting Recognition (KanjiCanvas)

**Wave:** 5 — Kanji Mastery
**Branch:** `feat/kanji-handwriting`
**Est:** 6h | **New tests:** 10
**Status:** [ ] Not started

---

## 1. Brainstorm

### Problem
- Nhai Kanji core = luyện viết tay. Smart Quiz không có canvas draw
- User muốn practice viết kanji, không chỉ xem stroke order

### Solution
- [KanjiCanvas](https://github.com/asdfjkl/kanjicanvas) (MIT, client-side, stroke-order-free)
- WritingCanvas component: draw + recognize + show candidates
- KanjiWritingQuiz: quiz mode — show meaning → user draw → check match
- Lazy load pattern data (không tăng initial bundle)

### KanjiCanvas Library
- Nhận dạng client-side, không cần server
- Stroke-order-free: nhận đúng kể cả viết sai thứ tự
- 2 files: `kanji-canvas.min.js` + `ref-patterns.js`
- MIT license

### Risks
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| KanjiCanvas compatibility với Svelte | Medium | Medium | Wrapper component, init on onMount |
| ref-patterns.js lớn (~2MB) | High | Low | Lazy load khi user mở writing mode |
| Mobile touch accuracy | Medium | Low | KanjiCanvas handles touch natively |
| Recognition accuracy cho complex kanji | Medium | Low | Show top 5 candidates, user confirm |

### Edge Cases
- User vẽ quá nhanh → show "Draw slower" hint
- Canvas resize on mobile → re-init
- No match found → show "Try again" + hint (stroke count)

---

## 2. Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | Download KanjiCanvas lib | `svelte-app/static/vendor/` | 15m | Files exist |
| 2 | Viết WritingCanvas tests (RED) | `src/tests/components/kanji/WritingCanvas.test.ts` | 10m | 5 tests FAIL |
| 3 | Implement WritingCanvas | `src/lib/components/kanji/WritingCanvas.svelte` | 40m | GREEN |
| 4 | Viết KanjiWritingQuiz tests (RED) | `src/tests/components/kanji/WritingQuiz.test.ts` | 5m | 5 tests FAIL |
| 5 | Implement KanjiWritingQuiz | `src/lib/components/kanji/KanjiWritingQuiz.svelte` | 30m | GREEN |
| 6 | Add writing mode to kanji quiz page | `src/routes/kanji/[lesson]/quiz/[mode]/+page.svelte` | 10m | Mode works |
| 7 | Add "Practice Writing" to kanji reference | `src/routes/kanji/[lesson]/reference/+page.svelte` | 10m | Button works |

---

## 3. TDD — Test Cases

```typescript
// WritingCanvas tests
describe('WritingCanvas', () => {
  it('should render canvas element');
  it('should have Clear button');
  it('should have Undo button');
  it('should have role="img" and aria-label');
  it('should show placeholder text when empty');
});

// KanjiWritingQuiz tests
describe('KanjiWritingQuiz', () => {
  it('should show target meaning as question');
  it('should render WritingCanvas');
  it('should show hint button');
  it('should dispatch correct/wrong events');
  it('should advance to next question');
});
```

---

## 4. Acceptance Criteria

- [ ] Canvas draw works on desktop (mouse) + mobile (touch)
- [ ] Recognition returns top 5 candidates
- [ ] Clear/Undo buttons work
- [ ] Writing quiz mode: meaning → draw → check
- [ ] Lazy load KanjiCanvas data
- [ ] Integrated in kanji quiz page (mode=writing)
- [ ] "Practice Writing" in kanji reference
- [ ] Tests: 10 new pass
- [ ] Build pass
