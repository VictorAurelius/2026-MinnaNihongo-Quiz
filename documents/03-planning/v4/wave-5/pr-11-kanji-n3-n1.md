# PR #11: N3→N1 Kanji Data Expansion

**Wave:** 5 — Kanji Mastery
**Branch:** `feat/kanji-n3-n1`
**Est:** 8h | **New tests:** 9
**Status:** [ ] Not started
**Note:** Chia thành sub-PRs nếu quá lớn

---

## 1. Brainstorm

### Problem
- Smart Quiz chỉ có 255 kanji (N5/N4). Nhai Kanji có 2500+
- Cần N3 (~370), N2 (~370), N1 (~600) = ~1340 kanji mới

### Solution
- Script generate từ KANJIDIC2 XML (CC BY-SA 4.0)
- Auto-extract: character, onyomi, kunyomi, english meaning, stroke count, JLPT level
- Manual add: vietnamese (Hán Việt) meanings + examples
- Code-split per level (lazy load)
- Download KanjiVG SVGs cho kanji mới

### Data Source
- KANJIDIC2: http://www.edrdg.org/wiki/index.php/KANJIDIC_Project
- Format: XML, contains all JIS kanji with readings, meanings, JLPT level
- License: CC BY-SA 4.0

### Risks
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Vietnamese meanings cần manual work | Certain | High | Script auto-generate Hán Việt từ readings, manual review |
| Bundle size 1340 kanji ~800KB | Medium | Medium | Code-split per level, lazy import |
| Examples cần manual curation | Certain | Medium | Start with 1 example/kanji, expand later |
| KANJIDIC2 XML parsing complex | Low | Low | Use existing parsers (python xml.etree) |

### Sub-PR Strategy
| Sub-PR | Scope | Est |
|--------|-------|-----|
| #11a | Script + N3 kanji (~370) | 3h |
| #11b | N2 kanji (~370) | 2h |
| #11c | N1 kanji (~600) + level selector UI | 3h |

---

## 2. Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | Download KANJIDIC2 XML | `/tmp/` | 10m | File exists |
| 2 | Create generation script | `scripts/generate-kanji-data.py` | 60m | Script runs |
| 3 | Generate N3 data | `src/lib/data/kanji/n3/` | 30m | Data files |
| 4 | Generate N2 data | `src/lib/data/kanji/n2/` | 30m | Data files |
| 5 | Generate N1 data | `src/lib/data/kanji/n1/` | 30m | Data files |
| 6 | Viết data integrity tests (RED) | `src/tests/data/kanji-all-levels.test.ts` | 10m | 9 tests |
| 7 | Update kanji index (multi-level) | `src/lib/data/kanji/lessons/index.ts` | 20m | GREEN |
| 8 | Update kanji landing page (level selector) | `src/routes/kanji/+page.svelte` | 20m | Visual |
| 9 | Download KanjiVG SVGs cho N3-N1 | `static/kanjivg/` | 20m | Files exist |
| 10 | Update KRADFILE mapping | `src/lib/data/kanji/radicals.ts` | 15m | Radicals work |

---

## 3. TDD — Test Cases

```typescript
describe('Kanji All Levels Data', () => {
  it('should have N3 kanji (>= 200 characters)');
  it('should have N2 kanji (>= 200 characters)');
  it('should have N1 kanji (>= 300 characters)');
  it('total kanji across all levels >= 1000');
  it('each kanji has character, onyomi, kunyomi, vietnamese, english');
  it('each kanji has at least 1 example');
  it('no duplicate characters across levels');
  it('kanji landing page shows level selector (N5-N1)');
  it('getKanjiByLevel(level) returns correct data');
});
```

---

## 4. Acceptance Criteria

- [ ] N3: ≥ 200 kanji with readings + meanings
- [ ] N2: ≥ 200 kanji
- [ ] N1: ≥ 300 kanji
- [ ] Total ≥ 1000 kanji (255 existing + new)
- [ ] Each kanji: character, onyomi[], kunyomi[], vietnamese, english, examples[]
- [ ] Level selector on kanji landing page (N5/N4/N3/N2/N1)
- [ ] Code-split per level (lazy load)
- [ ] KanjiVG SVGs for all new kanji
- [ ] KRADFILE mapping for all new kanji
- [ ] Tests: 9 new pass
- [ ] Build pass
