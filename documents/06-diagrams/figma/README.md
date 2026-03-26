# Figma Design Reference

## Source Templates (ALL FREE)

### Primary: Queezy — Quiz App UI Kit
- Figma: https://www.figma.com/community/file/1178996093139112052/free-queezy-quiz-app-ui-kit
- Screens: 52 (quiz flows, categories, results, leaderboard)
- Style: Bold, gamified, rounded
- Use for: Quiz modes, results, categories, leaderboard

### Secondary: Duolingo Design System
- Figma: https://www.figma.com/community/file/1460744749282136015/duolingo-design-system
- Screens: 16 (components, tokens, lesson/progress)
- Style: Green gamified, proven UX
- Use for: Design tokens, lesson UI, progress tracking

### Supplementary: BahasaKu E-learning
- Figma: https://www.figma.com/community/file/1082985450689546470/free-bahasaku-e-learning-local-language-ui-kit
- Screens: 25+ (e-learning flows, vocabulary)
- Style: Clean education
- Use for: Vocabulary list, lesson grid

## Export Instructions

1. Open each template → **Duplicate to your drafts**
2. Select frames → Export → **PNG 2x**
3. Save to `exports/` with naming:

```
exports/
├── queezy/
│   ├── 01-home.png
│   ├── 02-discover-categories.png
│   ├── 03-quiz-question-mc.png
│   ├── 04-quiz-result.png
│   ├── 05-leaderboard.png
│   ├── 06-profile.png
│   ├── 07-onboarding.png
│   └── 08-design-elements.png
├── duolingo/
│   ├── 01-lesson-tree.png
│   ├── 02-lesson-detail.png
│   ├── 03-quiz-screen.png
│   ├── 04-progress.png
│   ├── 05-profile.png
│   └── 06-components.png
└── bahasaku/
    ├── 01-home.png
    ├── 02-vocabulary.png
    ├── 03-lesson.png
    └── 04-quiz.png
```

## Page Mapping: Templates → Smart Quiz

| Smart Quiz Route | Primary Template | Secondary |
|-----------------|-----------------|-----------|
| `/` (home) | Queezy Home | Duolingo lesson tree |
| `/courses` | Queezy Discover | BahasaKu home |
| `/course/[id]` | Duolingo lesson tree | BahasaKu lesson |
| `/course/[id]/lesson/[n]/vocabulary` | BahasaKu vocabulary | — |
| `/quiz/flashcard` | Queezy quiz (adapted) | — |
| `/quiz/multiple-choice` | Queezy quiz MC | Duolingo quiz |
| `/quiz/typing` | Queezy quiz (adapted) | — |
| `/results` | Queezy quiz result | — |
| `/stats` | Duolingo progress | Queezy profile |
| `/review` | Duolingo lesson detail | — |
| `/settings` | Queezy profile | — |
| `/kanji` | Custom (no template) | — |
| `/hsk` | BahasaKu vocabulary | — |
| `/premium` | Queezy onboarding | — |
| `/about` | Queezy profile | — |

## Status

- [ ] Queezy duplicated + exported (8 PNGs)
- [ ] Duolingo DS duplicated + exported (6 PNGs)
- [ ] BahasaKu duplicated + exported (4 PNGs)
- [x] Business doc created (`documents/01-business/ui/rules.md`)
- [ ] Design tokens extracted from exports
- [ ] PR plan created for UI redesign wave
