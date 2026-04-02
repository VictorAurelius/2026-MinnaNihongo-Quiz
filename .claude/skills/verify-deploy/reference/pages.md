# Pages to Verify

Base URL: `https://victoraurelius.github.io/2026-Smart-Quiz`

| Page | Path | Expected in HTML |
|------|------|-----------------|
| Home | `/` | `Smart Quiz` in title |
| Courses | `/courses` | `Smart Quiz` (SPA, same index) |
| Course Detail | `/course/n5` | `Smart Quiz` |
| Lesson Menu | `/course/n5/lesson/1` | `Smart Quiz` |
| Kanji | `/kanji` | `Smart Quiz` |
| HSK | `/hsk` | `Smart Quiz` |
| Settings | `/settings` | `Smart Quiz` |
| 404 Fallback | `/nonexistent` | `Smart Quiz` (SPA fallback) |

## What to check

Since this is an SPA (client-side rendering):
- HTML will always be the same index.html
- Verify: `<title>` contains "Smart Quiz"
- Verify: `%sveltekit.body%` is NOT in output (means build succeeded)
- Verify: JS/CSS assets load (check for `/_app/` references)
- Verify: manifest.json accessible (PWA)
