# PR Plan v4.0 — Master Index

> **Mục tiêu:** Full Nhai Kanji parity + vượt trội ở quiz, bilingual, offline, a11y
> **Methodology:** Superpowers (Brainstorm → TDD → Implement → Verify)
> **Kit:** starter-kit v1.1.0 (waves, audit checkpoints, business docs first)
> **Architecture:** Offline-first — FE luôn độc lập, Supabase là enhancement
> **Deploy:** main → GitHub Pages (stable) | v4-dev → Vercel (preview)

### Key Architecture Docs
- [Deployment Strategy](../../02-architecture/DEPLOYMENT_STRATEGY.md) — branch model, Vercel setup, merge criteria
- [Offline-First Architecture](../../02-architecture/OFFLINE_FIRST_ARCHITECTURE.md) — data flow, sync, feature matrix, Supabase schema

### Branch Model
```
main ────► GitHub Pages (v2 stable, user đang dùng)
v4-dev ──► Vercel (v4 preview, development)
  └── feat/* (feature branches → PR vào v4-dev)
```
Feature branches tạo từ `v4-dev`. Merge vào `v4-dev` sau mỗi PR.
Merge `v4-dev` → `main` sau mỗi wave complete + audit pass.

---

## Waves & PRs

| Wave | Dir | PRs | Deliverable | Checkpoint |
|------|-----|-----|-------------|-----------|
| 1 | [wave-1/](wave-1/) | #1 SEO, #8 Skeleton, #9 A11y | Discoverable + polished | SEO ≥ 6, audit 100 |
| 2 | [wave-2/](wave-2/) | #2 Learning path, #3 Mock test | Guided learning | Progression 8/10 |
| 3 | [wave-3/](wave-3/) | #4 Stroke order, #5 Radicals | Kanji core | Kanji 7/10 |
| 4 | [wave-4/](wave-4/) | #6 HSK quiz, #7 HSK1-4 | Bilingual complete | Bilingual 10/10 |
| 5 | [wave-5/](wave-5/) | #10 Handwriting, #11 N3-N1 kanji | Full kanji | Kanji 9/10 |
| 6 | [wave-6/](wave-6/) | #12 Auth, #13 Leaderboard | User system | User 9/10 |
| 7 | [wave-7/](wave-7/) | #14 N3, #15 N2-N1, #16 SRS | Content complete | Content 9/10 |
| 8 | [wave-8/](wave-8/) | #17 Fonts, #18 Premium, #19 Community | Business ready | Business 8/10 |

---

## Tracking

| Wave | PR | Name | Tests | Status | Actual PR |
|------|----|------|-------|--------|-----------|
| 1 | #1 | [SEO meta tags](wave-1/pr-01-seo.md) | 9 | [ ] | |
| 1 | #8 | [Skeleton + branding](wave-1/pr-08-skeleton.md) | 6 | [ ] | |
| 1 | #9 | [Accessibility](wave-1/pr-09-a11y.md) | 10 | [ ] | |
| 2 | #2 | [Learning path](wave-2/pr-02-learning-path.md) | 15 | [ ] | |
| 2 | #3 | [JLPT mock test](wave-2/pr-03-mock-test.md) | 10 | [ ] | |
| 3 | #4 | [Kanji stroke order](wave-3/pr-04-stroke-order.md) | 9 | [ ] | |
| 3 | #5 | [Kanji radicals](wave-3/pr-05-radicals.md) | 11 | [ ] | |
| 4 | #6 | [HSK quiz modes](wave-4/pr-06-hsk-quiz.md) | 7 | [ ] | |
| 4 | #7 | [HSK1-4 data](wave-4/pr-07-hsk-levels.md) | 10 | [ ] | |
| 5 | #10 | [Kanji handwriting](wave-5/pr-10-handwriting.md) | 13 | [ ] | |
| 5 | #11 | [N3-N1 kanji](wave-5/pr-11-kanji-n3-n1.md) | 9 | [ ] | |
| 6 | #12 | [Supabase auth](wave-6/pr-12-auth.md) | 12 | [ ] | |
| 6 | #13 | [Leaderboard](wave-6/pr-13-leaderboard.md) | 6 | [ ] | |
| 7 | #14 | [N3 content](wave-7/pr-14-n3-content.md) | 7 | [ ] | |
| 7 | #15 | [N2-N1 vocab](wave-7/pr-15-n2-n1-vocab.md) | 8 | [ ] | |
| 7 | #16 | [Advanced SRS](wave-7/pr-16-advanced-srs.md) | 12 | [ ] | |
| 8 | #17 | [Custom fonts](wave-8/pr-17-fonts.md) | 4 | [ ] | |
| 8 | #18 | [Premium tier](wave-8/pr-18-premium.md) | 5 | [ ] | |
| 8 | #19 | [Community](wave-8/pr-19-community.md) | 0 | [ ] | |

---

## Wave Workflow

Mỗi wave tuân theo:
```
1. Đọc PR files trong wave folder
2. Brainstorm (đã viết sẵn trong mỗi PR file)
3. Viết tests RED (TDD)
4. Implement GREEN
5. ./scripts/test-local.sh all
6. Commit + push + PR
7. ./scripts/check-ci.sh
8. Merge
9. ./scripts/quality-audit.sh --save
10. Update tracking table: ✅ + PR number
```

---

## Skills mới phát sinh

Khi implement, nếu phát hiện pattern mới cần document:
→ Tạo file trong `.claude/skills/smart-quiz/`

| Skill | Tạo khi | File |
|-------|---------|------|
| SvelteKit component pattern | Wave 1 (skeleton, a11y) | `component-patterns.md` |
| Data file convention | Wave 4-5 (HSK, kanji data) | `data-conventions.md` |
| Supabase integration | Wave 6 (auth) | `supabase-patterns.md` |
| Quiz adapter pattern | Wave 4 (HSK quiz reuse) | `quiz-adapter.md` |
| Canvas/SVG patterns | Wave 3-5 (stroke, draw) | `canvas-svg-patterns.md` |

**Process khi phát sinh skill mới:**
1. Gặp pattern lặp lại ≥ 2 lần → tạo skill file
2. Đặt trong `.claude/skills/smart-quiz/`
3. Update `.claude/skills/_README-skills-index.md`
4. Commit cùng PR đang làm

---

## Business Docs Required

| PR | Business doc | Path | Tạo trước khi code |
|----|-------------|------|---------------------|
| #12 | Auth rules | `documents/01-business/auth/rules.md` | ✅ Bắt buộc |
| #18 | Premium rules | `documents/01-business/premium/rules.md` | ✅ Bắt buộc |
| #2 | Learning rules | `documents/01-business/learning/rules.md` | Nên có |
| #16 | SRS rules | `documents/01-business/srs/rules.md` | Nên có |

---

## Metrics

| Metric | Current | After v4.0 |
|--------|---------|-----------|
| Tests | 605 | ~769 |
| Routes | 25 | ~35 |
| Kanji | 256 | 2500+ |
| HSK words | 1600 | 3200+ |
| Score vs Nhai Kanji | 62/120 | 104/120 |
