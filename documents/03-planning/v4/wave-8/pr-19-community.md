# PR #19: Community & About Page

**Wave:** 8 — Business Ready
**Branch:** `feat/community`
**Est:** 2h | **New tests:** 3
**Business doc:** `documents/01-business/premium/rules.md` ✅
**Status:** [ ] Not started

---

## 1. Brainstorm

### Problem
- App không có social proof hay community
- User không biết cách contribute hay request feature
- Không có about/credits page

### Solution
- /about page: project info, credits, links (BR-COMM-003)
- Community links: GitHub Discussions, Issues (BR-COMM-001, 002)
- Share progress card: screenshot-friendly summary (BR-COMM-004)
- Footer links trên home page

### Risks
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Low engagement | High | Low | Links are low-effort |
| Privacy concern (share) | Low | Low | Client-side only, no upload |

---

## 2. Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | Viết community tests (RED) | `tests/routes/about.test.ts` | 10m | 3 tests FAIL |
| 2 | /about page | `routes/about/+page.svelte` | 30m | Visual |
| 3 | Share progress card | `components/common/ShareCard.svelte` | 30m | Visual |
| 4 | Footer links on home | `routes/+page.svelte` | 10m | Links show |
| 5 | Header nav: About link | `components/layout/Header.svelte` | 5m | Link works |

---

## 3. TDD — Test Cases (3 tests)

```typescript
describe('About Page', () => {
  it('renders project description');
  it('has GitHub links');
  it('has community section');
});
```

---

## 4. Acceptance Criteria

- [ ] /about page with project info + credits
- [ ] GitHub Discussions + Issues links
- [ ] Share progress card (downloadable/screenshot)
- [ ] Footer links on home
- [ ] Tests: 3 new pass
- [ ] Build pass
