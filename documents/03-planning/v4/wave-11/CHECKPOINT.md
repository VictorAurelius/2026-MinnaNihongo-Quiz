# Wave 11 — Components Migration + CSS Cleanup

> **Goal:** Migrate Quiz/Kanji components to Tailwind. Clean up app.css legacy (~2500 lines).
> **Entry:** All pages migrated. Components still use old scoped CSS (296 refs).
> **Exit:** Unified design system. app.css minimal. Zero old CSS vars in active code.

## PRs

| PR | Name | Scope |
|----|------|-------|
| #29 | Quiz components migration | FlashCard, MultipleChoice, TypingQuiz, VirtualKeyboard (4 components, 91 refs) |
| #30 | Kanji components + CSS cleanup | 7 kanji components (105 refs) + common components + app.css legacy removal |
