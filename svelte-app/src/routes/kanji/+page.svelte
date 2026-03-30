<script lang="ts">
  /**
   * Kanji Home Page - Multi-level with lesson selection
   */

  import { getKanjiLessonMetadata } from '$lib/data/kanji/lessons';
  import { KANJI_N3_DATA } from '$lib/data/kanji/kanji-n3';
  import { KANJI_N2_DATA } from '$lib/data/kanji/kanji-n2';
  import { KANJI_N1_DATA } from '$lib/data/kanji/kanji-n1';
  import { base } from '$app/paths';
  import { BookOpen, ChevronRight } from 'lucide-svelte';

  const lessons = getKanjiLessonMetadata();
  let selectedLevel: 'n5n4' | 'n3' | 'n2' | 'n1' = 'n5n4';

  const levels = [
    { id: 'n5n4' as const, label: 'N5/N4', count: 255, desc: 'Minna no Nihongo (25 bài)' },
    { id: 'n3' as const, label: 'N3', count: KANJI_N3_DATA.length, desc: 'Trung cấp' },
    { id: 'n2' as const, label: 'N2', count: KANJI_N2_DATA.length, desc: 'Trung cao cấp' },
    { id: 'n1' as const, label: 'N1', count: KANJI_N1_DATA.length, desc: 'Cao cấp' },
  ];

  $: totalKanji = levels.reduce((s, l) => s + l.count, 0);

  function getKanjiList(level: string) {
    switch (level) {
      case 'n3': return KANJI_N3_DATA;
      case 'n2': return KANJI_N2_DATA;
      case 'n1': return KANJI_N1_DATA;
      default: return [];
    }
  }
</script>

<svelte:head>
  <title>Kanji ({totalKanji} chữ) | Smart Quiz</title>
</svelte:head>

<div class="mx-auto max-w-4xl p-4 animate-in">
  <h2 class="text-xl font-bold mb-4">Kanji — {totalKanji} chữ Hán</h2>

  <div class="flex gap-2.5 mb-5 flex-wrap" role="radiogroup" aria-label="JLPT level">
    {#each levels as lvl}
      <button
        role="radio"
        aria-checked={selectedLevel === lvl.id}
        class="flex flex-col items-center gap-0.5 px-5 py-3 border-2 rounded-xl cursor-pointer transition-all active:scale-[0.97]
          {selectedLevel === lvl.id ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card text-foreground hover:border-primary'}"
        on:click={() => selectedLevel = lvl.id}
      >
        <span class="text-sm font-bold">{lvl.label}</span>
        <span class="text-[0.7rem] text-muted-foreground">{lvl.count} chữ</span>
      </button>
    {/each}
  </div>

  <a href="{base}/kanji/radicals" class="inline-flex items-center gap-1 mb-5 text-sm text-primary font-semibold no-underline hover:underline">
    <BookOpen size={14} aria-hidden="true" /> 214 Bộ Thủ →
  </a>

  {#if selectedLevel === 'n5n4'}
    <div class="flex flex-col gap-3.5">
      {#each lessons as lesson}
        <a
          href="{base}/kanji/{lesson.lessonNumber}"
          class="flex items-center gap-4 w-full px-5 py-5 bg-card rounded-xl shadow-sm text-left no-underline transition-all duration-150 hover:shadow-md hover:-translate-y-0.5 hover:bg-accent/50 active:scale-[0.98] cursor-pointer group"
        >
          <span class="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold">
            {lesson.lessonNumber}
          </span>
          <div class="flex-1 min-w-0">
            <h3 class="text-sm font-semibold text-foreground leading-snug truncate" style="font-family: var(--font-jp)">{lesson.title}</h3>
            <span class="text-[0.7rem] text-muted-foreground">{lesson.kanjiCount} kanji</span>
          </div>
          <ChevronRight size={16} class="flex-shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
        </a>
      {/each}
    </div>
  {:else}
    <div class="grid gap-2.5" style="grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));">
      {#each getKanjiList(selectedLevel) as k}
        <div class="flex flex-col items-center gap-1 p-3 bg-card border border-border rounded-xl cursor-default" title="{k.english} — {k.onyomi.join(', ')}">
          <span class="text-3xl font-bold" style="font-family: var(--font-jp)">{k.character}</span>
          <span class="text-[0.6rem] text-muted-foreground text-center overflow-hidden text-ellipsis whitespace-nowrap max-w-full">{k.english.split(',')[0]}</span>
        </div>
      {/each}
    </div>
  {/if}
</div>
