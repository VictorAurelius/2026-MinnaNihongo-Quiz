<script lang="ts">
  /**
   * Kanji Home Page - Multi-level with lesson selection
   */

  import { getKanjiLessonMetadata } from '$lib/data/kanji/lessons';
  import { KANJI_N3_DATA } from '$lib/data/kanji/kanji-n3';
  import { KANJI_N2_DATA } from '$lib/data/kanji/kanji-n2';
  import { KANJI_N1_DATA } from '$lib/data/kanji/kanji-n1';
  import Card from '$lib/components/common/Card.svelte';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';

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

<div class="kanji-home">
  <h2>Kanji — {totalKanji} chữ Hán</h2>

  <!-- Level Selector -->
  <div class="level-selector">
    {#each levels as lvl}
      <button class="level-btn" class:active={selectedLevel === lvl.id} on:click={() => selectedLevel = lvl.id}>
        <span class="lvl-label">{lvl.label}</span>
        <span class="lvl-count">{lvl.count} chữ</span>
      </button>
    {/each}
  </div>

  <a href="{base}/kanji/radicals" class="radicals-link">📚 214 Bộ Thủ →</a>

  {#if selectedLevel === 'n5n4'}
    <!-- Original lesson-based grid -->
    <div class="lesson-grid">
      {#each lessons as lesson}
        <Card hover clickable on:click={() => goto(`${base}/kanji/${lesson.lessonNumber}`)}>
          <div class="lesson-number">Bài {lesson.lessonNumber}</div>
          <div class="lesson-title">{lesson.title}</div>
          <div class="lesson-meta">{lesson.kanjiCount} kanji</div>
        </Card>
      {/each}
    </div>
  {:else}
    <!-- Flat kanji grid for N3/N2/N1 -->
    <div class="kanji-grid">
      {#each getKanjiList(selectedLevel) as k}
        <div class="kanji-card" title="{k.english} — {k.onyomi.join(', ')}">
          <span class="kc-char">{k.character}</span>
          <span class="kc-meaning">{k.english.split(',')[0]}</span>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .kanji-home { animation: fadeIn 0.25s ease; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  h2 { font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem; }

  .level-selector { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
  .level-btn {
    display: flex; flex-direction: column; align-items: center; gap: 0.1rem;
    padding: 0.5rem 1rem; border: 2px solid var(--border); border-radius: var(--radius-sm);
    background: var(--bg-card); font-family: inherit; cursor: pointer; transition: all 0.15s; color: var(--text);
  }
  .level-btn:hover { border-color: var(--primary); }
  .level-btn.active { border-color: var(--primary); background: color-mix(in srgb, var(--primary) 10%, var(--bg-card)); color: var(--primary); }
  .lvl-label { font-size: 0.9rem; font-weight: 700; }
  .lvl-count { font-size: 0.7rem; color: var(--text-muted); }

  .radicals-link {
    display: inline-block; margin-bottom: 1rem; font-size: 0.85rem;
    color: var(--primary); text-decoration: none; font-weight: 600;
  }
  .radicals-link:hover { text-decoration: underline; }

  .lesson-number { font-size: 0.8rem; font-weight: 700; color: var(--primary); margin-bottom: 0.25rem; }
  .lesson-title { font-size: 0.95rem; font-weight: 600; font-family: var(--font-jp); margin-bottom: 0.4rem; }
  .lesson-meta { font-size: 0.78rem; color: var(--text-muted); }

  .kanji-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 0.5rem;
  }
  .kanji-card {
    display: flex; flex-direction: column; align-items: center; gap: 0.2rem;
    padding: 0.5rem; background: var(--bg-card); border: 1px solid var(--border);
    border-radius: var(--radius-sm); cursor: default;
  }
  .kc-char { font-family: var(--font-jp); font-size: 1.8rem; font-weight: 700; }
  .kc-meaning { font-size: 0.6rem; color: var(--text-muted); text-align: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%; }

  @media (max-width: 600px) {
    .kanji-grid { grid-template-columns: repeat(auto-fill, minmax(65px, 1fr)); }
  }
</style>
