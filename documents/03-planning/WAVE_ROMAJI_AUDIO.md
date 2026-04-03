# Wave Romaji + Audio — Kanji Examples Enhancement

**Goal:** Thêm romaji + nút phát âm cho 768 kanji examples across 25 lessons.

## Current State

- 25 kanji lessons, 256 kanji, 768 examples total
- Each example has: `word`, `kana`, `meaning`, `vietnamese`
- **Missing:** `romaji` field
- **Missing:** Audio playback button on examples
- Romaji conversion: kana → romaji (có sẵn `kanaToRomaji()` util)

## Scope

### Data Layer
- [ ] Add `romaji` field to `KanjiExampleWord` type
- [ ] Generate romaji từ `kana` field bằng `kanaToRomaji()` util (runtime, không cần hardcode)
- [ ] OR: add romaji field to data files (768 entries)

### UI — Kanji Reference Page (`/kanji/[lesson]/reference`)
- [ ] Show romaji dưới kana cho mỗi example
- [ ] Add speaker button 🔊 per example (dùng `playJapaneseAudio(kana)`)
- [ ] Layout: `word (kana / romaji) — meaning | 🔊`

### UI — Kanji FlashCard component
- [ ] Show romaji trên back side
- [ ] Add speaker button per example on back

### UI — Kanji Quiz components
- [ ] Multiple Choice: show romaji in options if direction is ja-romaji
- [ ] Typing Quiz: accept romaji input

## Approach Decision

**Option A — Runtime romaji** (recommended):
- Dùng `kanaToRomaji(example.kana)` tại render time
- Không cần sửa 768 data entries
- `kanaToRomaji` đã tồn tại trong `src/lib/utils/kanaUtils.ts`

**Option B — Hardcoded romaji**:
- Add `romaji` field to type + all 25 data files
- More accurate but 768 manual entries
- Useful if kanaToRomaji() has edge cases

**Recommendation:** Option A (runtime). Fix edge cases nếu phát hiện.

## PRs

### PR 1: Type + Runtime Romaji Display (Small)
- [ ] Verify `kanaToRomaji()` works for all kana patterns
- [ ] Kanji Reference page: show romaji per example
- [ ] Kanji FlashCard: show romaji on back

### PR 2: Audio Playback on Examples (Small)
- [ ] Add 🔊 button per example row on Reference page
- [ ] Add 🔊 button on FlashCard back
- [ ] Use `playJapaneseAudio(example.kana)` (already exists)

### PR 3: Quiz Direction Support (Medium)
- [ ] Ensure kanji quiz supports ja-romaji direction
- [ ] Typing Quiz accepts romaji input for kanji examples

## Estimated Effort

| PR | Effort | Files |
|----|--------|-------|
| PR 1 | 1h | reference/+page.svelte, KanjiFlashCard.svelte |
| PR 2 | 30min | Same files + audioUtils import |
| PR 3 | 2h | KanjiMultipleChoice, KanjiTypingQuiz |
| **Total** | **~3.5h** | |
