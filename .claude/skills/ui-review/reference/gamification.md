# Gamification Guide — E-Learning Apps (SvelteKit + Tailwind v4)

Dùng file này khi user muốn tăng engagement, retention, và "fun factor" của app học.
Tham khảo Duolingo, Anki, và Wanikani — 3 app học ngôn ngữ thành công nhất.

---

## Tại Sao Gamification Quan Trọng

| Mechanic | Tác động tâm lý | Implement như thế nào |
|----------|----------------|----------------------|
| Progress visibility | Endowment effect — đã đầu tư nên tiếp tục | Progress bars, XP, completion % |
| Streaks | Loss aversion — sợ mất chuỗi | Streak counter, fire icon, nguy hiểm khi bỏ ngày |
| Badges/Achievements | Variable reward — não tiết dopamine | Milestone badges, surprise unlocks |
| Leaderboard | Social comparison | Optional — cẩn thận với anxiety |
| Immediate feedback | Operant conditioning | Correct/wrong animation ngay lập tức |

---

## 1. XP & Level System

### Data model (TypeScript)

```typescript
// src/lib/types/gamification.ts
export interface UserProgress {
  xp: number;           // Total XP earned
  level: number;        // Derived từ xp
  xpToNextLevel: number;
  streak: number;       // Days in a row
  longestStreak: number;
  lastStudiedAt: Date | null;
  achievements: string[]; // achievement IDs
}

// XP thresholds per level — accelerating curve
export const XP_THRESHOLDS = [
  0, 100, 250, 500, 900, 1400, 2000, 2800, 3800, 5000
];

export function getLevel(xp: number): number {
  return XP_THRESHOLDS.findIndex(threshold => xp < threshold) - 1;
}

// XP rewards
export const XP_REWARDS = {
  flashcard_correct: 5,
  multiple_choice_correct: 8,
  typing_correct: 12,
  lesson_complete: 50,
  perfect_lesson: 100,  // 0 mistakes
  daily_goal: 30,
  streak_milestone: 50, // every 7 days
};
```

### XP Bar Component

```svelte
<!-- src/lib/components/XPBar.svelte -->
<script lang="ts">
  import { spring } from 'svelte/motion';
  import { getLevel, XP_THRESHOLDS } from '$lib/types/gamification';

  export let xp: number;
  export let showLabel = true;

  $: level = getLevel(xp);
  $: currentLevelXP = XP_THRESHOLDS[level];
  $: nextLevelXP = XP_THRESHOLDS[level + 1];
  $: progress = (xp - currentLevelXP) / (nextLevelXP - currentLevelXP);

  const animatedProgress = spring(0, { stiffness: 0.08, damping: 0.6 });
  $: animatedProgress.set(progress);
</script>

<div class="space-y-1.5">
  {#if showLabel}
    <div class="flex items-center justify-between text-xs">
      <span class="font-semibold text-primary">Level {level}</span>
      <span class="text-muted-foreground">{xp - currentLevelXP} / {nextLevelXP - currentLevelXP} XP</span>
    </div>
  {/if}
  
  <div class="h-2 bg-muted rounded-full overflow-hidden">
    <div 
      class="h-full rounded-full bg-gradient-to-r from-primary to-violet-500
             shadow-[0_0_8px_hsl(var(--primary)/0.5)] transition-none"
      style="width: {$animatedProgress * 100}%"
    />
  </div>
</div>
```

---

## 2. Streak System

### Streak Counter Component (Duolingo-inspired)

```svelte
<!-- src/lib/components/StreakBadge.svelte -->
<script lang="ts">
  import { Flame } from 'lucide-svelte';
  export let streak: number;
  export let isAtRisk = false; // user chưa học hôm nay

  $: streakColor = streak === 0 
    ? 'text-muted-foreground' 
    : isAtRisk 
      ? 'text-amber-400' 
      : 'text-orange-500';
</script>

<div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full
            {streak > 0 ? 'bg-orange-500/10' : 'bg-muted'}">
  <Flame 
    class="w-4 h-4 {streakColor} {streak > 0 ? 'drop-shadow-[0_0_4px_rgba(249,115,22,0.8)]' : ''}"
    aria-hidden="true"
  />
  <span class="text-sm font-bold {streakColor}">{streak}</span>
  {#if isAtRisk && streak > 0}
    <span class="text-xs text-amber-400/80 font-medium">Học ngay!</span>
  {/if}
</div>

<!-- Streak milestone toast -->
{#if streak > 0 && streak % 7 === 0}
  <div class="mt-2 text-center text-xs text-orange-400 font-semibold animate-bounce">
    🔥 {streak} ngày liên tiếp! Tuyệt vời!
  </div>
{/if}
```

### Streak Logic (store)

```typescript
// src/lib/stores/streak.ts
import { writable, derived } from 'svelte/store';

function isToday(date: Date): boolean {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

function isYesterday(date: Date): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
}

export function updateStreak(lastStudied: Date | null, currentStreak: number): number {
  if (!lastStudied) return 0;
  if (isToday(lastStudied)) return currentStreak;        // Đã học hôm nay
  if (isYesterday(lastStudied)) return currentStreak;    // Học hôm qua, streak còn sống
  return 0;                                              // Miss → reset
}
```

---

## 3. Achievement Badges

### Badge definitions

```typescript
// src/lib/data/achievements.ts
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;       // emoji hoặc lucide icon name
  xpReward: number;
  condition: (stats: UserStats) => boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_lesson',
    title: 'Bước Đầu Tiên',
    description: 'Hoàn thành bài học đầu tiên',
    icon: '🎌',
    xpReward: 50,
    rarity: 'common',
    condition: (s) => s.lessonsCompleted >= 1,
  },
  {
    id: 'streak_7',
    title: 'Kiên Trì 7 Ngày',
    description: 'Học 7 ngày liên tiếp',
    icon: '🔥',
    xpReward: 100,
    rarity: 'rare',
    condition: (s) => s.streak >= 7,
  },
  {
    id: 'perfect_lesson',
    title: 'Hoàn Hảo',
    description: 'Hoàn thành bài không sai câu nào',
    icon: '⭐',
    xpReward: 100,
    rarity: 'rare',
    condition: (s) => s.perfectLessons >= 1,
  },
  {
    id: 'vocab_100',
    title: 'Bộ Sưu Tập 100 Từ',
    description: 'Học được 100 từ vựng',
    icon: '📚',
    xpReward: 200,
    rarity: 'epic',
    condition: (s) => s.wordsLearned >= 100,
  },
];
```

### Badge Card Component

```svelte
<!-- src/lib/components/AchievementBadge.svelte -->
<script lang="ts">
  export let achievement: Achievement;
  export let unlocked = false;
</script>

<div class="relative flex flex-col items-center gap-2 p-4 rounded-2xl border
            transition-all duration-300
            {unlocked 
              ? 'bg-card border-primary/30 shadow-[0_0_20px_hsl(var(--primary)/0.15)]' 
              : 'bg-muted/50 border-border/50 opacity-50 grayscale'}">
  
  <!-- Rarity glow ring -->
  {#if unlocked}
    <div class="absolute inset-0 rounded-2xl opacity-20
                {achievement.rarity === 'legendary' ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                 achievement.rarity === 'epic'      ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                 achievement.rarity === 'rare'      ? 'bg-gradient-to-br from-blue-500 to-cyan-400' : ''}" />
  {/if}
  
  <span class="text-3xl relative z-10">{achievement.icon}</span>
  <div class="text-center relative z-10">
    <p class="text-xs font-bold text-foreground">{achievement.title}</p>
    <p class="text-[10px] text-muted-foreground mt-0.5 leading-tight">{achievement.description}</p>
  </div>
  
  {#if unlocked}
    <span class="text-[10px] font-semibold text-primary">+{achievement.xpReward} XP</span>
  {:else}
    <span class="text-[10px] text-muted-foreground">🔒 Chưa mở khóa</span>
  {/if}
</div>
```

---

## 4. Correct/Wrong Answer Animations

### Quiz Feedback — Immediate & Satisfying

```svelte
<!-- src/lib/components/QuizFeedback.svelte -->
<script lang="ts">
  import { scale, fly } from 'svelte/transition';
  import { elasticOut } from 'svelte/easing';

  export let result: 'correct' | 'wrong' | null = null;
  export let xpEarned = 0;
</script>

{#if result === 'correct'}
  <!-- Green overlay + XP float -->
  <div class="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
    <!-- Background flash -->
    <div class="absolute inset-0 bg-emerald-500/10 animate-[fadeOut_0.4s_ease_forwards]" />
    
    <!-- XP popup -->
    {#if xpEarned > 0}
      <div 
        class="relative text-2xl font-extrabold text-emerald-400 
               drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]"
        in:fly={{ y: 0, duration: 600 }}
        out:fly={{ y: -60, duration: 400 }}
      >
        +{xpEarned} XP ✓
      </div>
    {/if}
  </div>

{:else if result === 'wrong'}
  <div class="fixed inset-0 pointer-events-none z-50">
    <div class="absolute inset-0 bg-red-500/10 animate-[shake_0.4s_ease]" />
  </div>
{/if}

<style>
  @keyframes fadeOut {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-8px); }
    40%       { transform: translateX(8px); }
    60%       { transform: translateX(-4px); }
    80%       { transform: translateX(4px); }
  }
</style>
```

---

## 5. Lesson Completion Screen

### End-of-lesson summary — Duolingo style

```svelte
<!-- src/routes/lesson/[id]/complete/+page.svelte -->
<script lang="ts">
  import { confetti } from '@neoconfetti/svelte';
  import { scale } from 'svelte/transition';
  import { elasticOut } from 'svelte/easing';

  export let data; // { xpEarned, accuracy, newStreak, isPerfect }
</script>

<div class="flex flex-col items-center justify-center min-h-screen px-6 text-center">
  
  <!-- Confetti for perfect score -->
  {#if data.isPerfect}
    <div use:confetti={{ particleCount: 80, spread: 100 }} />
  {/if}

  <!-- Trophy / Star -->
  <div 
    class="text-7xl mb-6"
    in:scale={{ duration: 600, easing: elasticOut, start: 0.3 }}
  >
    {data.isPerfect ? '⭐' : '🎌'}
  </div>

  <h1 class="text-2xl font-extrabold text-foreground mb-1">
    {data.isPerfect ? 'Hoàn Hảo!' : 'Bài Học Hoàn Thành!'}
  </h1>
  <p class="text-muted-foreground mb-8">
    Chính xác {data.accuracy}% • {data.xpEarned} XP earned
  </p>

  <!-- Stats row -->
  <div class="flex gap-6 mb-10">
    <div class="flex flex-col items-center">
      <span class="text-3xl font-bold text-primary">{data.xpEarned}</span>
      <span class="text-xs text-muted-foreground mt-1">XP kiếm được</span>
    </div>
    <div class="w-px bg-border" />
    <div class="flex flex-col items-center">
      <span class="text-3xl font-bold text-orange-500">{data.newStreak}🔥</span>
      <span class="text-xs text-muted-foreground mt-1">Ngày liên tiếp</span>
    </div>
    <div class="w-px bg-border" />
    <div class="flex flex-col items-center">
      <span class="text-3xl font-bold text-emerald-500">{data.accuracy}%</span>
      <span class="text-xs text-muted-foreground mt-1">Chính xác</span>
    </div>
  </div>

  <a href="/lessons" class="w-full">
    <Button class="w-full h-14 text-base font-bold rounded-2xl">
      Tiếp tục học
    </Button>
  </a>
</div>
```

---

## 6. Daily Goal Widget

```svelte
<!-- src/lib/components/DailyGoal.svelte -->
<script lang="ts">
  export let todayXP: number;
  export let goalXP = 50; // configurable in settings
  $: progress = Math.min(todayXP / goalXP, 1);
  $: isComplete = progress >= 1;
</script>

<div class="flex items-center gap-4 p-4 rounded-2xl 
            {isComplete ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-card border border-border'}">
  
  <div class="relative w-12 h-12 flex-shrink-0">
    <!-- SVG circular progress -->
    <svg class="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" 
              stroke-width="4" class="text-muted" />
      <circle cx="24" cy="24" r="20" fill="none" 
              stroke="{isComplete ? '#10B981' : 'hsl(var(--primary))'}"
              stroke-width="4" stroke-linecap="round"
              stroke-dasharray="{2 * Math.PI * 20}"
              stroke-dashoffset="{2 * Math.PI * 20 * (1 - progress)}"
              class="transition-all duration-700" />
    </svg>
    <span class="absolute inset-0 flex items-center justify-center text-xs font-bold">
      {isComplete ? '✓' : `${Math.round(progress * 100)}%`}
    </span>
  </div>

  <div>
    <p class="font-semibold text-sm {isComplete ? 'text-emerald-500' : 'text-foreground'}">
      {isComplete ? '🎉 Mục tiêu hôm nay đạt rồi!' : 'Mục tiêu hôm nay'}
    </p>
    <p class="text-xs text-muted-foreground">
      {todayXP} / {goalXP} XP
    </p>
  </div>
</div>
```

---

## 7. Install Dependencies

```bash
# Confetti effect cho completion screen
npm install @neoconfetti/svelte

# Animation utilities (optional — nếu muốn advanced)
npm install motion
```

---

## Gamification Integration Checklist

Sau khi implement, kiểm tra:

- [ ] XP tăng sau mỗi correct answer với animation
- [ ] Streak update ở cuối ngày hoặc khi mở app ngày mới
- [ ] Achievement unlock toast hiện ngay khi đủ điều kiện
- [ ] Completion screen hiện đúng stats
- [ ] Daily goal widget trên home screen
- [ ] XP bar trong lesson header (biết mình đang ở level nào)
- [ ] Streak badge trong lesson menu header
