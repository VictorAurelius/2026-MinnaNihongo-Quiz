# Fix Checklist — Copy-Paste Ready Fixes

Đây là file quan trọng nhất khi review. Luôn đọc file này TRƯỚC khi viết bất kỳ code fix nào.

## Mục đích

File này giải quyết 3 vấn đề cốt lõi của skill:
1. **Issue tồn đọng** — Track những gì đã báo nhưng chưa fix qua nhiều version
2. **Generic fixes** — Cung cấp code copy-paste cụ thể, không phải pattern chung chung
3. **Verification** — Khi review version mới, so sánh với checklist này trước

---

## Bước 1: Fix Verification Protocol (BẮT BUỘC khi review version mới)

**Trước khi chấm điểm, kiểm tra từng item trong Persistent Issues List:**

```
Với mỗi issue đã báo trong lần review trước:
  → Nhìn vào screenshot mới
  → Nếu đã fix: đánh dấu ✅ FIXED, tăng điểm tương ứng
  → Nếu chưa fix: đánh dấu ❌ STILL OPEN, giữ nguyên điểm trừ
  → Nếu fix một phần: đánh dấu ⚠ PARTIAL, tăng điểm một nửa
```

**Output bắt buộc đầu mỗi report khi có version trước:**

```markdown
## Fix Verification — v{N} vs v{N-1}

| Issue | v{N-1} | v{N} | Status |
|-------|--------|------|--------|
| Header icon 44px | ❌ | ❌ | STILL OPEN — -2 WCAG |
| Streak = 0 state | ❌ | ✅ | FIXED — +1 Friendly |
| Direction tab height | ⚠ | ⚠ | PARTIAL — no change |
```

---

## Bước 2: Persistent Issues — Smart Quiz App

Issues đã xuất hiện ≥2 lần trong lịch sử review. Luôn kiểm tra những cái này TRƯỚC.

### P1 — Header Icon Touch Target (CRITICAL, tồn đọng từ v1)

**File:** `src/lib/components/AppHeader.svelte` (hoặc tương đương)
**WCAG:** 2.5.5 Target Size — FAIL
**Score penalty:** -2 WCAG, -1 Technical nếu không fix

```svelte
<!-- ❌ BEFORE — icon quá nhỏ, không aria-label -->
<a href="/" class="p-1">
  <HomeIcon size={20} />
</a>
<button class="p-1">
  <Settings size={20} />
</button>
<button class="p-1">
  <Sun size={20} />
</button>

<!-- ✅ AFTER — 44×44px tap area + aria-label đầy đủ -->
<a href="/"
   class="min-w-[44px] min-h-[44px] flex items-center justify-center
          rounded-xl hover:bg-white/8 active:scale-95 transition-all"
   aria-label="Trang chủ">
  <HomeIcon size={20} class="text-slate-400" aria-hidden="true" />
</a>

<button
  class="min-w-[44px] min-h-[44px] flex items-center justify-center
         rounded-xl hover:bg-white/8 active:scale-95 transition-all"
  aria-label="Cài đặt">
  <Settings size={20} class="text-slate-400" aria-hidden="true" />
</button>

<button
  class="min-w-[44px] min-h-[44px] flex items-center justify-center
         rounded-xl hover:bg-white/8 active:scale-95 transition-all"
  on:click={toggleTheme}
  aria-label="Chuyển chế độ sáng/tối">
  {#if isDark}
    <Sun size={20} class="text-slate-400" aria-hidden="true" />
  {:else}
    <Moon size={20} class="text-slate-400" aria-hidden="true" />
  {/if}
</button>
```

**Verification:** Nhìn header — 3 icons bên phải trông có vùng tap rõ ràng, không bị nhỏ xíu sát nhau.
**Done when:** Mỗi icon button rộng ít nhất bằng chiều cao của header bar (~44px).

---

### P2 — Direction Tab Height Mobile (MEDIUM, tồn đọng từ v2)

**File:** `src/routes/lesson/[id]/+page.svelte`
**WCAG:** 2.5.5 Target Size — WARN
**Score penalty:** -1 WCAG nếu không fix

```svelte
<!-- ❌ BEFORE — py-2.5 = 10px × 2 + text ~16px ≈ 36–40px, dưới 44px -->
<button
  class="flex-1 py-2.5 px-2 rounded-[9px] text-center transition-all"
  on:click={() => selected = dir.id}>
  <p class="text-[11px] font-semibold text-white">{dir.label}</p>
  <p class="text-[8px] text-white/55 mt-0.5">{dir.shortDesc}</p>
</button>

<!-- ✅ AFTER — min-h-[44px] đảm bảo WCAG bất kể font size -->
<button
  class="flex-1 min-h-[44px] py-2 px-2 rounded-[9px] text-center
         transition-all duration-200 active:scale-[0.97]
         flex flex-col items-center justify-center"
  on:click={() => selected = dir.id}
  aria-pressed={selected === dir.id}>
  <p class="text-[11px] font-semibold text-white">{dir.label}</p>
  <p class="text-[8px] text-white/55 leading-tight">{dir.shortDesc}</p>
</button>
```

**Verification:** Tab buttons trông cao hơn rõ, không bị mỏng dẹt.
**Done when:** Chiều cao visual của tab bằng hoặc lớn hơn quiz mode rows bên dưới.

---

### P3 — Streak = 0 State (FIXED in v3 — giữ làm reference)

**File:** `src/lib/components/StreakBadge.svelte`
**Status:** ✅ Fixed — dùng làm reference pattern cho zero-states tương tự

```svelte
<!-- Pattern chuẩn cho zero-state motivational UI -->
{#if streak === 0}
  <span class="inline-flex items-center gap-1 text-xs text-white/60
               bg-white/10 rounded-full px-2.5 py-1 font-medium">
    ✨ Bắt đầu streak hôm nay!
  </span>
{:else if streak < 3}
  <span class="inline-flex items-center gap-1.5 text-xs text-amber-300
               font-semibold bg-amber-500/15 rounded-full px-2.5 py-1">
    <FlameIcon size={11} aria-hidden="true" />
    {streak} ngày — tiếp tục nào!
  </span>
{:else}
  <span class="inline-flex items-center gap-1.5 text-xs text-orange-400
               font-bold bg-orange-500/15 rounded-full px-2.5 py-1
               drop-shadow-[0_0_4px_rgba(249,115,22,0.4)]">
    <FlameIcon size={11} aria-hidden="true" />
    {streak} ngày streak!
  </span>
{/if}
```

---

## Bước 3: Issue Ticket Format (dùng cho mọi issue mới)

Khi phát hiện issue mới, luôn output theo format này để track được qua nhiều version:

```markdown
### 🎫 ISSUE-{N} — {Tên ngắn} [{WCAG/Heuristic/Aesthetic}]

**Severity:** Critical / High / Medium / Low
**First seen:** v{N}
**File:** `src/...`
**Criteria vi phạm:** WCAG 2.5.5 / Nielsen #X / ...
**Score impact:** -X {dimension}

**Mô tả:** {1-2 câu}

**Fix (copy-paste ready):**
\`\`\`svelte
// File: src/...
// BEFORE
...
// AFTER
...
\`\`\`

**Verification:** Nhìn vào screenshot — {mô tả cụ thể cần thấy để confirm đã fix}
**Done when:** {điều kiện rõ ràng: "button height ≥ 44px", "không thấy text '0 ngày'", ...}
```

---

## Bước 4: Score Delta Rules

Rules cứng để tính điểm khi có issue tồn đọng:

| Tình huống | Score delta |
|---|---|
| Issue Critical chưa fix sau 2 reviews | -1 điểm penalty thêm |
| Issue được fix hoàn toàn | +điểm theo rubric |
| Issue được fix một phần | +50% điểm |
| Issue mới phát sinh | -điểm theo severity |
| Fix mới nhưng tạo issue khác | +điểm cũ - điểm mới |

---

## Bước 5: Common ARIA Labels — Smart Quiz App

Bảng tra nhanh — copy đúng string này, không đặt tên khác:

| Element | aria-label / role |
|---|---|
| Home icon button | `aria-label="Trang chủ"` |
| Settings icon button | `aria-label="Cài đặt"` |
| Dark/light toggle | `aria-label="Chuyển chế độ sáng/tối"` |
| Back button | `aria-label="Quay lại"` |
| Direction tab active | `aria-pressed={selected === dir.id}` |
| Progress bar | `role="progressbar" aria-valuenow={n} aria-valuemin={0} aria-valuemax={100} aria-label="Tiến độ hoàn thành bài học"` |
| Streak badge | `aria-label="{streak} ngày streak liên tiếp"` |
| XP badge | `aria-label="Nhận {xp} XP khi hoàn thành bài"` |
| Decorative icons | `aria-hidden="true"` |

---

## Bước 6: Touch Target Cheat Sheet

```
min-h-[44px] min-w-[44px]  → WCAG 2.5.5 minimum (bắt buộc)
min-h-[48px] min-w-[48px]  → Comfortable (khuyến nghị cho quiz rows)
min-h-[56px]               → Large CTA buttons

flex items-center justify-center  → căn giữa icon trong vùng tap
active:scale-[0.97]               → press feedback
hover:bg-white/8                  → dark mode hover state
rounded-xl                        → nhất quán với design system app
transition-all duration-150       → smooth interaction
```

---

## Bước 7: Hero Gradient Migration (P4 — optional)

```svelte
<!-- File: src/routes/lesson/[id]/+page.svelte hoặc LessonHero.svelte -->

<!-- ❌ BEFORE — Pink/Fuchsia (entertainment feel) -->
<div class="bg-gradient-to-br from-pink-500 via-fuchsia-600 to-purple-700 ...">

<!-- ✅ AFTER option A — Indigo/Violet (learning/focus feel) -->
<div class="bg-gradient-to-br from-indigo-700 via-violet-700 to-purple-800 ...">

<!-- ✅ AFTER option B — Dynamic theo JLPT level -->
<div class="{heroGradient} ...">

<script lang="ts">
  const LEVEL_GRADIENTS: Record<string, string> = {
    N5: 'bg-gradient-to-br from-indigo-700 via-violet-700 to-purple-800',
    N4: 'bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-800',
    N3: 'bg-gradient-to-br from-teal-700 via-cyan-700 to-blue-800',
    N2: 'bg-gradient-to-br from-emerald-700 via-teal-700 to-cyan-800',
    N1: 'bg-gradient-to-br from-amber-700 via-orange-700 to-red-800',
  };
  $: heroGradient = LEVEL_GRADIENTS[lesson.level] ?? LEVEL_GRADIENTS.N5;
</script>
```

**Verification:** Hero không còn màu hồng/magenta.
**Done when:** Gradient thiên về xanh/tím/indigo thay vì hồng.
