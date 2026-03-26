# Premium Business Rules

> **Module:** Premium Tier & Monetization
> **Dependencies:** None (offline-first, no payment gateway yet)

---

## Rules

| ID | Rule | Rationale |
|----|------|-----------|
| BR-PREM-001 | Free tier PHẢI đủ để học N5/N4 hoàn chỉnh | Không paywall core learning |
| BR-PREM-002 | Premium = N3+ content + advanced features | Upsell giá trị thực |
| BR-PREM-003 | Premium gate hiển thị rõ ràng (không bẫy click) | Trust + UX |
| BR-PREM-004 | Premium status lưu localStorage (BR-AUTH-010) | Offline access |
| BR-PREM-005 | No payment integration v1 — chỉ UI gate + manual activation | MVP, iterate later |
| BR-PREM-006 | Premium features có preview/teaser cho free users | Encourage upgrade |

## Free vs Premium Matrix

| Feature | Free | Premium |
|---------|------|---------|
| N5 course (25 lessons) | ✅ | ✅ |
| N4 course (25 lessons) | ✅ | ✅ |
| N3 course (15 lessons) | ✅ | ✅ |
| N2/N1 vocab reference | Preview (50 items) | ✅ Full |
| Kanji N5-N3 | ✅ | ✅ |
| Kanji N2-N1 | Preview (50 each) | ✅ Full |
| HSK 1-5 | ✅ | ✅ |
| SRS review | ✅ | ✅ |
| Custom fonts | ❌ | ✅ |
| Export/Import progress | ❌ | ✅ |
| Ad-free (future) | ❌ | ✅ |

## Font System

| ID | Rule |
|----|------|
| BR-FONT-001 | Default font: system Japanese font (Noto Sans JP fallback) |
| BR-FONT-002 | Premium fonts: 教科書体 (textbook), 明朝体 (serif), 手書き (handwriting) |
| BR-FONT-003 | Font preview available for all users |
| BR-FONT-004 | Font selection persisted in settings |
| BR-FONT-005 | Fonts loaded via Google Fonts (no self-hosting) |

## Community Features (v1 — Minimal)

| ID | Rule |
|----|------|
| BR-COMM-001 | Community = GitHub Discussions link (no in-app forum) |
| BR-COMM-002 | Feature request via GitHub Issues |
| BR-COMM-003 | About page with contributor info |
| BR-COMM-004 | Share progress as image (screenshot-friendly card) |
