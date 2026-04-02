<script lang="ts">
  import { getAllHSKLevels, getHSKData } from '$lib/data/hsk';
  import { base } from '$app/paths';
  import { ChevronRight, Languages } from 'lucide-svelte';
  import Breadcrumb from '$lib/components/common/Breadcrumb.svelte';

  const levels = getAllHSKLevels();
  let selectedLevel = 5;

  $: groups = getHSKData(selectedLevel);
  $: totalWords = groups.reduce((s, g) => s + g.words.length, 0);
  $: selectedLevelData = levels.find(l => l.level === selectedLevel);

  const groupDescriptions: Record<string, string> = {
    a: 'Từ phổ biến nhất',
    b: 'Giao tiếp hàng ngày',
    c: 'Học thuật & công việc',
    d: 'Chuyên ngành',
    e: 'Nâng cao',
  };
</script>

<svelte:head>
  <title>HSK {selectedLevel} — {totalWords} từ | Smart Quiz</title>
</svelte:head>

<div class="mx-auto max-w-2xl animate-in">
  <!-- Hero -->
  <div class="relative text-white pt-3 pb-6 px-4 overflow-hidden" style="background: linear-gradient(135deg, hsl(174 70% 35%), hsl(262 60% 45%))">
    <div class="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
    <div class="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/5 blur-xl pointer-events-none"></div>
    <div class="relative z-10">
      <h1 class="text-[22px] font-extrabold tracking-tight drop-shadow-sm" style="font-family: var(--font-cn)">HSK 汉语水平考试</h1>
      <p class="text-sm font-medium text-white/80 mt-1">Chinese Proficiency Test — {levels.reduce((s, l) => s + l.wordCount, 0)}+ từ vựng</p>
    </div>
  </div>

  <div class="px-4 py-5 flex flex-col gap-6">
    <Breadcrumb items={[
      { label: 'Home', href: '/' },
      { label: 'HSK' }
    ]} />

    <!-- Level Selector — pill tabs -->
    <div class="flex gap-0 p-1.5 bg-muted/50 rounded-2xl" role="radiogroup" aria-label="HSK level">
      {#each levels as lvl}
        <button
          role="radio"
          aria-checked={selectedLevel === lvl.level}
          aria-label="HSK {lvl.level} — {lvl.wordCount} từ"
          class="flex-1 flex flex-col items-center gap-0.5 py-3 px-2 rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none
            {selectedLevel === lvl.level
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'text-muted-foreground hover:text-foreground hover:bg-background/50'}"
          on:click={() => selectedLevel = lvl.level}
        >
          <span class="text-xs font-bold">HSK {lvl.level}</span>
          <span class="text-[0.6rem] opacity-75">{lvl.wordCount} từ</span>
        </button>
      {/each}
    </div>

    <p class="text-sm text-muted-foreground">HSK {selectedLevel} — {totalWords} từ vựng, {groups.length} nhóm</p>

    <div class="flex flex-col gap-3">
      {#each groups as group, i}
        {@const desc = groupDescriptions[group.id.toLowerCase()] || ''}
        <a
          href="{base}/hsk/{group.id}"
          class="stagger-item group flex items-center gap-4 w-full px-5 py-5 bg-card border border-border/50 rounded-2xl shadow-sm cursor-pointer text-left no-underline transition-all duration-200 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-lg hover:bg-accent/30 active:scale-[0.98]"
          style="animation-delay: {i * 50}ms"
        >
          <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
            <span class="text-lg font-bold text-primary" style="font-family: var(--font-cn)">{group.id.toUpperCase()}</span>
          </div>
          <div class="flex-1 min-w-0">
            <h2 class="text-sm font-semibold mb-0.5">{group.title}</h2>
            {#if desc}
              <p class="text-xs text-muted-foreground">{desc}</p>
            {/if}
          </div>
          <span class="px-2 py-0.5 rounded-lg bg-muted text-xs text-muted-foreground font-medium flex-shrink-0">{group.words.length} từ</span>
          <ChevronRight size={18} class="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary flex-shrink-0" aria-hidden="true" />
        </a>
      {/each}
    </div>
  </div>
</div>
