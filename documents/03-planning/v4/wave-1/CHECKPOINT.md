# Wave 1 Checkpoint — Foundation

## PRs in Wave

| PR | Name | Status | Tests | Actual PR |
|----|------|--------|-------|-----------|
| #1 | [SEO meta tags](pr-01-seo.md) | [ ] | 9 | |
| #8 | [Skeleton + branding](pr-08-skeleton.md) | [ ] | 6 | |
| #9 | [Accessibility](pr-09-a11y.md) | [ ] | 10 | |

## Entry Criteria
- [x] Baseline: 100/100 audit, 605 tests
- [x] Branch: main up-to-date

## Exit Criteria (phải đạt trước sang Wave 2)
- [ ] `./scripts/quality-audit.sh --save` ≥ 100/100
- [ ] SEO: `curl` verify OG tags present
- [ ] A11y: `npx svelte-check` — 0 warnings
- [ ] A11y: Tab navigation có focus indicator
- [ ] UI: 0 blank flash (skeleton loading)
- [ ] UI: Logo visible in header
- [ ] Tests: ≥ 630 (605 + 25 new)
- [ ] Business gaps: none identified

## Diagrams Created
| Diagram | File | Created by PR |
|---------|------|---------------|
| Architecture v2 (current) | `06-diagrams/source/architecture-v2.mmd` | Pre-wave |
| Route Map | `06-diagrams/source/route-map.mmd` | Pre-wave |
| Component Hierarchy | `06-diagrams/source/component-tree.mmd` | Pre-wave |
| Data Store Flow | `06-diagrams/source/store-flow.mmd` | Pre-wave |
| Quiz Flow | `06-diagrams/source/quiz-flow.mmd` | #8 |
| PWA Lifecycle | `06-diagrams/source/pwa-lifecycle.mmd` | #1 |

## Skills Created
| Skill | File | Created by PR |
|-------|------|---------------|
| Component patterns | `.claude/skills/smart-quiz/component-patterns.md` | #8 |

## Audit Report
> Chạy `./scripts/quality-audit.sh --save` sau wave → paste link report
