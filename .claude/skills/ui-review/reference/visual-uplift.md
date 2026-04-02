# Visual Uplift Guide — E-Learning Apps (SvelteKit + Tailwind v4)

Dùng file này khi user yêu cầu nâng cấp visual, app trông "nhạt", "không bắt mắt", hoặc score Aesthetics < 20/28.

---

## 1. Color Psychology cho E-Learning

### Màu nền tảng theo mục tiêu cảm xúc

| Mục tiêu | Màu chính | Tại sao |
|----------|-----------|---------|
| Tập trung / Flow | Indigo `#4F46E5`, Deep Blue `#1D4ED8` | Kích thích cognitive processing, không gây distraction |
| Reward / Achievement | Purple `#7C3AED` → Violet `#8B5CF6` | Dopamine-adjacent, dùng cho streak, badges |
| Energy / Urgency | Amber `#F59E0B`, Orange `#EA580C` | CTA, streak fire, deadline reminder |
| Success / Calm | Emerald `#10B981` | Correct answer, completion |
| Neutral Background | Slate `#0F172A` (dark), `#F8FAFC` (light) | Không cạnh tranh với content |

### Palette nâng cấp cho app học tiếng Nhật/Trung

```css
/* app.css — thêm vào :root */

/* Primary: Indigo → Purple gradient feel */
--primary: oklch(0.585 0.233 277);        /* #4F46E5 */
--primary-glow: oklch(0.585 0.233 277 / 0.2);

/* Accent: Amber cho reward moments */
--accent-reward: oklch(0.769 0.188 70);   /* #F59E0B */
--accent-success: oklch(0.696 0.17 162);  /* #10B981 */
--accent-streak: oklch(0.65 0.22 45);     /* #EA580C */

/* Surface hierarchy (dark mode) */
--surface-base: oklch(0.13 0.02 264);     /* #0F172A */
--surface-raised: oklch(0.18 0.02 264);   /* #1E293B */
--surface-overlay: oklch(0.23 0.02 264);  /* #334155 */

/* Glow effects cho hero elements */
--glow-primary: 0 0 40px oklch(0.585 0.233 277 / 0.3);
--glow-reward: 0 0 20px oklch(0.769 0.188 70 / 0.4);
```

---

## 2. Typography Upgrade

### Font pairing cho language learning apps

**Option A — Modern & Clean (khuyến nghị):**
```html
<!-- src/app.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
```

```css
/* app.css */
--font-display: 'Plus Jakarta Sans', sans-serif;  /* UI, headings */
--font-target: 'Noto Sans JP', sans-serif;         /* Japanese text */
```

**Option B — Playful & Energetic:**
```
Display: Nunito (rounded, friendly)
Body: Inter
Target lang: Noto Sans JP
```

### Type scale upgrade (Tailwind v4 custom scale)

```css
/* app.css */
@theme {
  --text-display: clamp(2rem, 5vw, 3rem);
  --text-hero: clamp(1.5rem, 4vw, 2.25rem);

  /* Japanese text cần line-height cao hơn */
  --leading-jp: 1.8;
}
```

```svelte
<!-- Lesson title với Japanese — BEFORE -->
<h1 class="text-2xl font-bold">{lesson.title}</h1>

<!-- AFTER -->
<h1 class="font-display text-[length:var(--text-hero)] font-extrabold 
           tracking-tight leading-tight text-white">
  {lesson.japaneseTitle}
</h1>
<p class="font-target text-lg leading-[1.8] text-white/80">
  {lesson.vietnameseTitle}
</p>
```

---

## 3. Hero Banner Upgrade

### Pattern: Gradient + Noise texture (không phải glassmorphism)

```svelte
<!-- src/lib/components/LessonHero.svelte -->
<div class="relative overflow-hidden rounded-2xl p-6 
            bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700">
  
  <!-- Noise texture overlay — adds depth without glass -->
  <div class="absolute inset-0 opacity-[0.03] mix-blend-overlay"
       style="background-image: url('data:image/svg+xml,...')">
  </div>
  
  <!-- Decorative orb — subtle depth -->
  <div class="absolute -top-8 -right-8 w-40 h-40 
              rounded-full bg-white/10 blur-2xl pointer-events-none" />
  <div class="absolute -bottom-4 -left-4 w-24 h-24 
              rounded-full bg-purple-400/20 blur-xl pointer-events-none" />

  <!-- Content -->
  <div class="relative z-10">
    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full 
                 bg-white/20 text-white/90 text-xs font-semibold tracking-wide uppercase mb-3">
      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      Bài 1
    </span>
    
    <p class="text-4xl font-bold text-white mb-1 font-target leading-[1.4]">
      わたしは〜です
    </p>
    <p class="text-white/80 text-base font-medium">Giới thiệu bản thân</p>
    
    <!-- Progress bar -->
    <div class="mt-4">
      <div class="flex justify-between text-xs text-white/70 mb-1.5">
        <span>Tiến độ</span>
        <span>{learned}/{total} từ</span>
      </div>
      <div class="h-1.5 bg-white/20 rounded-full overflow-hidden">
        <div class="h-full bg-white rounded-full transition-all duration-700"
             style="width: {(learned/total)*100}%" />
      </div>
    </div>
  </div>
</div>
```

---

## 4. Card & List Item Upgrade

### Quiz mode cards — từ flat list → visual cards

```svelte
<!-- BEFORE: flat list item -->
<button class="flex items-center gap-3 p-4 border rounded-lg w-full">
  <Icon name="layers" />
  <div>
    <p class="font-semibold">Flashcard Quiz</p>
    <p class="text-sm text-muted-foreground">Lật thẻ để xem đáp án</p>
  </div>
  <ChevronRight class="ml-auto" />
</button>

<!-- AFTER: visual card với hierarchy rõ, icon lớn hơn -->
<button class="group relative flex items-center gap-4 p-5 rounded-2xl 
               bg-card border border-border/50 w-full text-left
               hover:border-primary/50 hover:bg-primary/5
               hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.3)]
               transition-all duration-200 active:scale-[0.98]">
  
  <!-- Icon container với colored bg -->
  <div class="flex-shrink-0 w-12 h-12 rounded-xl 
              bg-primary/10 flex items-center justify-center
              group-hover:bg-primary/20 transition-colors">
    <Layers class="w-6 h-6 text-primary" />
  </div>
  
  <div class="flex-1 min-w-0">
    <p class="font-semibold text-foreground">Flashcard Quiz</p>
    <p class="text-sm text-muted-foreground truncate">Lật thẻ để xem đáp án</p>
  </div>
  
  <!-- Chevron với animation -->
  <ChevronRight class="w-4 h-4 text-muted-foreground flex-shrink-0
                       group-hover:text-primary group-hover:translate-x-0.5
                       transition-all duration-200" />
</button>
```

### Direction selector — pill upgrade

```svelte
<!-- AFTER: pill tabs với cleaner active state -->
<div class="flex gap-2 p-1 bg-muted rounded-xl">
  {#each directions as dir}
    <button
      class="flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200
             {selected === dir.id 
               ? 'bg-primary text-primary-foreground shadow-sm' 
               : 'text-muted-foreground hover:text-foreground hover:bg-background/50'}"
      on:click={() => selected = dir.id}
    >
      {dir.label}
    </button>
  {/each}
</div>
```

---

## 5. Micro-Details Checklist

Áp dụng sau khi fix layout cơ bản. Mỗi item tạo ra "professional feel":

| Detail | Implementation | Impact |
|--------|---------------|--------|
| **Active press** | `active:scale-[0.97] transition-transform` trên mọi button | Tactile feedback |
| **Hover glow** | `hover:shadow-[0_0_0_2px_var(--primary)]` | Interactive affordance |
| **Stagger animation** | `animation-delay: {i * 50}ms` trên list items | Polished entry |
| **Rounded consistency** | Chọn 1 trong: `rounded-xl` (16px) hoặc `rounded-2xl` (20px) — dùng nhất quán | Cohesion |
| **Section dividers** | `border-t border-border/50` thay vì margin đơn thuần | Breathing room |
| **Empty states** | Illustration + message thay vì khoảng trắng | Delight |
| **Loading skeleton** | `animate-pulse bg-muted rounded` | Perceived performance |

---

## 6. Dark Mode Polish

```css
/* app.css — dark mode specific refinements */
.dark {
  /* Softer backgrounds — không pure black */
  --background: oklch(0.13 0.015 264);
  --card: oklch(0.17 0.015 264);
  
  /* Text không pure white — dễ đọc hơn */
  --foreground: oklch(0.95 0.005 264);
  --muted-foreground: oklch(0.60 0.01 264);

  /* Borders subtle hơn */
  --border: oklch(0.25 0.015 264);
}
```

---

## Scoring Impact Dự Kiến

| Dimension | Trước | Sau visual uplift |
|-----------|-------|-------------------|
| Visual Aesthetics (/28) | 14-18 | 22-26 |
| User Friendliness (/20) | 12-14 | 16-18 |
| Combined (/128) | ~65-80 | ~90-105 |
