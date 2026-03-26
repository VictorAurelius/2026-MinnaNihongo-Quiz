# Figma Design Reference

## Source Template

**Elingo — Language Learning App UI Kit**
- Figma: https://www.figma.com/community/file/1218212467115389086/elingo-language-learning-app-ui-kit
- Style: Clean, modern, education-focused
- Screens: 150 (light + dark)
- License: Free community file

## Export Instructions

1. Duplicate Elingo to your Figma drafts
2. Select frame → Export → PNG 2x
3. Save to `exports/` folder with naming convention:

```
exports/
├── 01-home-dashboard.png
├── 02-course-list.png
├── 03-lesson-grid.png
├── 04-lesson-detail.png
├── 05-vocabulary-list.png
├── 06-quiz-flashcard.png
├── 07-quiz-multiple-choice.png
├── 08-quiz-typing.png
├── 09-progress-stats.png
├── 10-settings-profile.png
├── 11-review-srs.png
├── 12-onboarding.png
└── 13-dark-mode-samples.png
```

## Page Mapping: Elingo → Smart Quiz

| Elingo Screen | Smart Quiz Route | Notes |
|---------------|-----------------|-------|
| Home/Dashboard | `/` (home) | Course cards + progress summary |
| Course List | `/courses` | N5/N4/N3 course grid |
| Lesson List | `/course/[id]` | Lesson grid with mastery rings |
| Vocabulary | `/course/[id]/lesson/[n]/vocabulary` | Word list with TTS |
| Quiz (MC) | `/quiz/multiple-choice` | 4-option layout |
| Quiz (Flashcard) | `/quiz/flashcard` | Flip card |
| Quiz (Input) | `/quiz/typing` | Text input + virtual keyboard |
| Progress | `/stats` | Charts, streaks, mastery |
| Settings | `/settings` | Font, direction, export/import |
| Profile | `/about` | Credits, community links |
| Review | `/review` | SRS due items |

## Status

- [ ] Figma duplicated
- [ ] Key screens exported (13 PNGs)
- [ ] Business doc created (`documents/01-business/ui/rules.md`)
- [ ] Design tokens extracted (colors, spacing, typography)
- [ ] PR plan created
