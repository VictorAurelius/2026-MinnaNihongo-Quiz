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
  import SearchInput from '$lib/components/common/SearchInput.svelte';
  import Breadcrumb from '$lib/components/common/Breadcrumb.svelte';

  const allLessons = getKanjiLessonMetadata();
  let searchQuery = '';
  let selectedLevel: 'n5n4' | 'n3' | 'n2' | 'n1' = 'n5n4';

  const levels = [
    { id: 'n5n4' as const, label: 'N5/N4', count: 255, desc: '25 bài Minna no Nihongo' },
    { id: 'n3' as const, label: 'N3', count: KANJI_N3_DATA.length, desc: 'Trung cấp' },
    { id: 'n2' as const, label: 'N2', count: KANJI_N2_DATA.length, desc: 'Trung cao cấp' },
    { id: 'n1' as const, label: 'N1', count: KANJI_N1_DATA.length, desc: 'Cao cấp' },
  ];

  $: totalKanji = levels.reduce((s, l) => s + l.count, 0);
  $: selectedLevelData = levels.find(l => l.id === selectedLevel);

  $: lessons = searchQuery
    ? allLessons.filter(l =>
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(l.lessonNumber).includes(searchQuery)
      )
    : allLessons;

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

<div class="mx-auto max-w-2xl animate-in">
  <!-- Hero -->
  <div class="relative text-white pt-3 pb-6 px-4 overflow-hidden" style="background: linear-gradient(135deg, hsl(245 58% 35%), hsl(262 60% 45%))">
    <div class="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
    <div class="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/5 blur-xl pointer-events-none"></div>
    <div class="relative z-10">
      <h1 class="text-[22px] font-extrabold tracking-tight drop-shadow-sm" style="font-family: var(--font-jp)">漢字 Kanji</h1>
      <p class="text-sm font-medium text-white/80 mt-1">{totalKanji} chữ Hán — N5 đến N1</p>
    </div>
  </div>

  <div class="px-4 py-5 flex flex-col gap-6">
    <Breadcrumb items={[
      { label: 'Home', href: '/' },
      { label: 'Kanji' }
    ]} />

    <!-- Level Selector — pill tabs -->
    <div class="flex gap-0 p-1.5 bg-muted/50 rounded-2xl" role="radiogroup" aria-label="JLPT level">
      {#each levels as lvl}
        <button
          role="radio"
          aria-checked={selectedLevel === lvl.id}
          aria-label="{lvl.label} — {lvl.count} kanji, {lvl.desc}"
          class="flex-1 flex flex-col items-center gap-0.5 py-3 px-2 rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none
            {selectedLevel === lvl.id
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'text-muted-foreground hover:text-foreground hover:bg-background/50'}"
          on:click={() => selectedLevel = lvl.id}
        >
          <span class="text-xs font-bold">{lvl.label}</span>
          <span class="text-[0.6rem] opacity-75">{lvl.count} chữ</span>
        </button>
      {/each}
    </div>

    <a href="{base}/kanji/radicals" class="inline-flex items-center gap-1.5 text-sm text-primary font-semibold no-underline hover:underline">
      <BookOpen size={14} aria-hidden="true" /> 214 Bộ Thủ →
    </a>

    {#if selectedLevel === 'n5n4'}
      <SearchInput bind:value={searchQuery} placeholder="Tìm bài kanji... (số hoặc tên)" />

      <div class="flex flex-col gap-3">
        {#each lessons as lesson, i}
          <a
            href="{base}/kanji/{lesson.lessonNumber}"
            class="stagger-item group flex items-center gap-4 w-full px-5 py-5 bg-card border border-border/50 rounded-2xl shadow-sm text-left no-underline transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 hover:bg-accent/30 active:scale-[0.98] cursor-pointer"
            style="animation-delay: {Math.min(i * 30, 300)}ms"
          >
            <div class="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <span class="text-sm font-bold text-primary">{lesson.lessonNumber}</span>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-semibold text-foreground leading-snug" style="font-family: var(--font-jp)">{lesson.title}</h3>
              <span class="text-xs text-muted-foreground" style="font-family: var(--font-jp)">{lesson.preview}</span>
            </div>
            <span class="px-2 py-0.5 rounded-lg bg-muted text-xs text-muted-foreground font-medium flex-shrink-0">{lesson.kanjiCount} chữ</span>
            <ChevronRight size={18} class="flex-shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
          </a>
        {/each}
      </div>
    {:else}
      <div class="grid gap-2.5" style="grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));">
        {#each getKanjiList(selectedLevel) as k}
          <div class="flex flex-col items-center gap-1 p-3 bg-card border border-border/50 rounded-xl cursor-default" title="{k.english} — {k.onyomi.join(', ')}">
            <span class="text-3xl font-bold" style="font-family: var(--font-jp)">{k.character}</span>
            <span class="text-[0.6rem] text-muted-foreground text-center overflow-hidden text-ellipsis whitespace-nowrap max-w-full">{k.english.split(',')[0]}</span>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
