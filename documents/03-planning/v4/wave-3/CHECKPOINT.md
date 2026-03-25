# Wave 3 Checkpoint — Kanji Core

## PRs in Wave

| PR | Name | Status | Tests | Actual PR |
|----|------|--------|-------|-----------|
| #4 | [Kanji stroke order](pr-04-stroke-order.md) | [ ] | 9 | |
| #5 | [Kanji radicals](pr-05-radicals.md) | [ ] | 11 | |

## Entry Criteria
- [x] Wave 2 checkpoint passed (97/100, 657 tests)

## Exit Criteria
- [ ] `./scripts/quality-audit.sh --save` ≥ 97/100
- [ ] 256 KanjiVG SVGs in static/kanjivg/
- [ ] Stroke order animation with controls (play/pause/speed/step)
- [ ] 214 Kangxi radicals with Hán Việt names
- [ ] RadicalBreakdown in kanji reference cards
- [ ] /kanji/radicals page
- [ ] Tests: ≥ 677 (657 + 20 new)
- [ ] Business gaps: none

## Prerequisites (trước khi implement)
- [ ] Download KanjiVG repo → extract 256 SVGs
- [ ] Download KRADFILE → parse kanji→radicals mapping
- [ ] Prepare 214 radical Vietnamese names

## Diagrams
| Diagram | File | Created by PR |
|---------|------|---------------|
| Stroke Animation Pipeline | `06-diagrams/source/stroke-animation.puml` | #4 |
| Radical Data Flow | `06-diagrams/source/radical-flow.puml` | #5 |

## Audit Report
> Chạy sau wave complete
