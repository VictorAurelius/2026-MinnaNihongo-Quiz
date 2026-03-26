# SRS Business Rules

> **Module:** Spaced Repetition System (Advanced)
> **Dependencies:** Existing SM-2 implementation in srsUtils.ts

---

## Rules

| ID | Rule | Rationale |
|----|------|-----------|
| BR-SRS-001 | SRS áp dụng cho cả vocab, kanji, và grammar | Tất cả đều cần ôn tập |
| BR-SRS-002 | Algorithm: SM-2 (giữ nguyên) với quality 0-5 | Đã proven, đơn giản |
| BR-SRS-003 | Review page riêng: /review với filter by type + level | UX rõ ràng |
| BR-SRS-004 | Due items hiển thị badge count trên Header nav | User biết cần ôn |
| BR-SRS-005 | Auto-queue items khi user trả lời quiz | Seamless integration |
| BR-SRS-006 | Daily review summary: items due today, overdue, completed | Motivation |
| BR-SRS-007 | Streak tracking: consecutive days reviewed | Gamification |
| BR-SRS-008 | localStorage primary (consistent with BR-AUTH-004) | Offline-first |

## SRS Item Types

| Type | Source | Review Format |
|------|--------|---------------|
| Vocabulary | Course lessons (N5/N4/N3) | Flashcard, MC, Typing |
| Kanji | Kanji data (N5→N1) | Flashcard, MC, Writing |
| Grammar | Grammar patterns | Fill-blank (future) |

## SM-2 Parameters (Existing)

| Parameter | Value | Notes |
|-----------|-------|-------|
| Initial interval | 1 day | First review |
| Second interval | 6 days | After first success |
| Ease factor range | 1.3 - 2.5 | Dynamic |
| Quality threshold | 3 | 0-2 = fail, 3-5 = pass |
| Failed item interval | 1 day | Reset |

## Review Flow

```
App open → getDueItems() → Show badge count
  ↓
User opens /review → Filter (type, level) → Start review
  ↓
Answer → reviewItem(quality) → Update SRS state → Next item
  ↓
All done → Summary (correct/total, streak)
```
