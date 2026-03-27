<script lang="ts">
  import { getAllHSKLevels, getHSKData } from '$lib/data/hsk';
  import { base } from '$app/paths';
  import { ChevronRight } from 'lucide-svelte';

  const levels = getAllHSKLevels();
  let selectedLevel = 5;

  $: groups = getHSKData(selectedLevel);
  $: totalWords = groups.reduce((s, g) => s + g.words.length, 0);
</script>

<svelte:head>
  <title>HSK Vocabulary — Smart Quiz</title>
</svelte:head>

<div class="mx-auto max-w-3xl p-4 animate-in">
  <header class="text-center mb-6">
    <h1 class="text-2xl font-bold mb-1">HSK Vocabulary</h1>
    <p class="text-sm text-muted-foreground">汉语水平考试 — Chinese Proficiency Test</p>
  </header>

  <div class="flex gap-2 justify-center mb-4 flex-wrap" role="radiogroup" aria-label="HSK level">
    {#each levels as lvl}
      <button
        role="radio"
        aria-checked={selectedLevel === lvl.level}
        class="flex flex-col items-center gap-0.5 px-4 py-2 border-2 rounded-lg cursor-pointer transition-all
          {selectedLevel === lvl.level ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card text-foreground hover:border-primary'}"
        on:click={() => selectedLevel = lvl.level}
      >
        <span class="text-sm font-bold">HSK {lvl.level}</span>
        <span class="text-[0.7rem] text-muted-foreground">{lvl.wordCount} từ</span>
      </button>
    {/each}
  </div>

  <p class="text-center text-sm text-muted-foreground mb-4">HSK {selectedLevel} — {totalWords} words, {groups.length} group{groups.length > 1 ? 's' : ''}</p>

  <div class="flex flex-col gap-3">
    {#each groups as group}
      <a
        href="{base}/hsk/{group.id}"
        class="flex items-center gap-4 w-full p-4 bg-card border border-border rounded-xl shadow-sm cursor-pointer text-left no-underline transition-all hover:border-primary hover:-translate-y-0.5 hover:shadow-lg group"
      >
        <div class="w-12 h-12 flex items-center justify-center bg-primary/80 text-white text-xl font-bold rounded-lg flex-shrink-0" style="font-family: var(--font-cn)">
          {group.id.toUpperCase()}
        </div>
        <div class="flex-1">
          <h2 class="text-base font-semibold mb-0.5">{group.title}</h2>
          <p class="text-sm text-muted-foreground">{group.words.length} words</p>
        </div>
        <ChevronRight size={18} class="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
      </a>
    {/each}
  </div>
</div>
