# PR #18: Premium Tier UI

**Wave:** 8 — Business Ready
**Branch:** `feat/premium-tier`
**Est:** 4h | **New tests:** 5
**Business doc:** `documents/01-business/premium/rules.md` ✅
**Depends:** PR #17 (fonts as premium feature)
**Status:** [ ] Not started

---

## 1. Brainstorm

### Problem
- App hoàn toàn free → không có monetization path
- Cần phân biệt free vs premium rõ ràng
- Không block core learning (BR-PREM-001)

### Solution
- Premium status in settings store (BR-PREM-004)
- Content gate UI cho N2/N1 full data (BR-PREM-003)
- Premium features page: /premium
- Manual activation (no payment gateway yet — BR-PREM-005)

### Risks
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Users confused by gate | Medium | Medium | Clear messaging, preview |
| Premium bypass (localStorage) | High | Low | Acceptable for v1 |

---

## 2. Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | Viết premium tests (RED) | `tests/utils/premiumUtils.test.ts` | 10m | 5 tests FAIL |
| 2 | Implement premiumUtils | `utils/premiumUtils.ts` | 20m | GREEN |
| 3 | Premium gate component | `components/common/PremiumGate.svelte` | 30m | Visual |
| 4 | /premium info page | `routes/premium/+page.svelte` | 30m | Visual |
| 5 | Add gates to N2/N1 content | `routes/vocab/[level]/+page.svelte` | 15m | Gate shows |
| 6 | Settings: premium toggle | `routes/settings/+page.svelte` | 10m | Toggle works |

---

## 3. TDD — Test Cases (5 tests)

```typescript
describe('Premium Utils', () => {
  it('isPremium returns false by default');
  it('setPremium(true) enables premium');
  it('getPremiumFeatures returns feature list');
  it('isFeatureAvailable checks premium status');
  it('premium status persists in localStorage');
});
```

---

## 4. Acceptance Criteria

- [ ] isPremium() utility function
- [ ] PremiumGate component with preview + upgrade CTA
- [ ] /premium page explaining features
- [ ] N2/N1 vocab gated (50 preview, full for premium)
- [ ] Settings toggle for manual premium activation
- [ ] Tests: 5 new pass
- [ ] Build pass
