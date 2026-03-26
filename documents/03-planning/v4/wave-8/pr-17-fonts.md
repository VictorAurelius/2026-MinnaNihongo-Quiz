# PR #17: Custom Japanese Fonts

**Wave:** 8 — Business Ready
**Branch:** `feat/custom-fonts`
**Est:** 3h | **New tests:** 4
**Business doc:** `documents/01-business/premium/rules.md` ✅
**Status:** [ ] Not started

---

## 1. Brainstorm

### Problem
- App dùng system font → không optimal cho Japanese learning
- Learner cần font rõ nét (textbook style) để nhận diện stroke
- Nhai Kanji có font đẹp hơn

### Solution
- Font selector trong Settings (BR-FONT-004)
- 4 font options: System (default), Noto Sans JP, 教科書体 style, 明朝体
- Google Fonts loading (BR-FONT-005)
- Font preview cho tất cả users (BR-FONT-003)

### Risks
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Font load delay | Medium | Low | Preconnect, font-display: swap |
| Bundle size increase | Low | Low | Google Fonts CDN, not bundled |

---

## 2. Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | Viết font tests (RED) | `tests/utils/fontUtils.test.ts` | 10m | 4 tests FAIL |
| 2 | Implement fontUtils | `utils/fontUtils.ts` | 20m | GREEN |
| 3 | Font selector in Settings | `routes/settings/+page.svelte` | 30m | Visual |
| 4 | Apply font via CSS variable | `app.css`, `+layout.svelte` | 15m | Font changes |
| 5 | Google Fonts preconnect | `app.html` | 5m | Network tab |

---

## 3. TDD — Test Cases (4 tests)

```typescript
describe('Font Utils', () => {
  it('getAvailableFonts returns at least 3 options');
  it('setFont updates settings store');
  it('getCurrentFont returns saved font or default');
  it('font CSS variable is valid');
});
```

---

## 4. Acceptance Criteria

- [ ] 4 font options in Settings page
- [ ] Font applies to all Japanese text
- [ ] Font persisted in localStorage
- [ ] Font preview visible before selecting
- [ ] Tests: 4 new pass
- [ ] Build pass
