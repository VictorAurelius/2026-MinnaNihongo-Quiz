<script lang="ts">
  /**
   * Kanji Reference Table
   * Shows all kanji for a lesson with readings, meanings, and examples
   */

  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { getKanjiLessonData } from '$lib/data/kanji/lessons';
  import { playJapaneseAudio } from '$lib/utils/audioUtils';
  import StrokeOrder from '$lib/components/kanji/StrokeOrder.svelte';
  import type { KanjiItem } from '$lib/types';

  let searchTerm = '';
  let expandedKanji: string | null = null;
  let showStrokes: string | null = null;

  $: lessonId = parseInt($page.params.lesson || '0');
  $: lessonData = lessonId > 0 ? getKanjiLessonData(lessonId) : null;
  $: kanjiList = lessonData?.kanji || [];

  $: filteredKanji = kanjiList.filter(item => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      item.character.includes(search) ||
      item.onyomi.some(r => r.toLowerCase().includes(search)) ||
      item.kunyomi.some(r => r.toLowerCase().includes(search)) ||
      item.vietnamese.toLowerCase().includes(search) ||
      item.english.toLowerCase().includes(search)
    );
  });

  function toggleExpand(character: string) {
    expandedKanji = expandedKanji === character ? null : character;
  }

  function speak(text: string, event?: MouseEvent) {
    event?.stopPropagation();
    playJapaneseAudio(text);
  }

  const hasAudio = typeof window !== 'undefined' && 'speechSynthesis' in window;
</script>

<svelte:head>
  <title>Kanji Reference - Bài {lessonId} | Smart Quiz</title>
</svelte:head>

{#if lessonData}
  <div class="reference-page">
    <div class="page-header">
      <h2>Kanji Reference - Bài {lessonData.lessonNumber}</h2>
      <p class="subtitle">{lessonData.title}</p>
      <p class="word-count">{kanjiList.length} kanji</p>
    </div>

    <!-- Search -->
    <div class="controls">
      <div class="search-box">
        <input
          type="text"
          placeholder="Search kanji, reading, meaning..."
          bind:value={searchTerm}
          class="search-input"
        />
        {#if searchTerm}
          <button class="clear-search" on:click={() => searchTerm = ''}>✕</button>
        {/if}
      </div>
    </div>

    <div class="results-info">
      {#if searchTerm}
        <p>Showing <strong>{filteredKanji.length}</strong> of {kanjiList.length} kanji</p>
      {:else}
        <p>All <strong>{kanjiList.length}</strong> kanji</p>
      {/if}
    </div>

    <!-- Kanji Cards -->
    <div class="kanji-list">
      {#each filteredKanji as item, index}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
          class="kanji-card"
          class:expanded={expandedKanji === item.character}
          on:click={() => toggleExpand(item.character)}
        >
          <div class="kanji-row">
            <div class="kanji-character">{item.character}</div>
            <div class="kanji-info">
              <div class="kanji-readings">
                {#if item.onyomi.length > 0}
                  <span class="reading-label">音</span>
                  <span class="reading-on">{item.onyomi.join('、')}</span>
                {/if}
                {#if item.kunyomi.length > 0}
                  <span class="reading-label">訓</span>
                  <span class="reading-kun">{item.kunyomi.join('、')}</span>
                {/if}
              </div>
              <div class="kanji-meanings">
                <span class="meaning-vi">{item.vietnamese}</span>
                <span class="meaning-en">{item.english}</span>
              </div>
            </div>
            <div class="kanji-meta">
              <span class="stroke-count">{item.strokeCount} nét</span>
              <span class="jlpt-badge">N{item.jlpt}</span>
              {#if hasAudio}
                <button class="btn-speak" on:click|stopPropagation={(e) => speak(item.character, e)} title="Listen">
                  🔊
                </button>
              {/if}
            </div>
          </div>

          {#if expandedKanji === item.character}
            <!-- Stroke Order -->
            <div class="kanji-stroke-section">
              <button class="btn-toggle-strokes" on:click|stopPropagation={() => showStrokes = showStrokes === item.character ? null : item.character}>
                {showStrokes === item.character ? 'Hide' : 'Show'} Strokes
              </button>
              {#if showStrokes === item.character}
                <StrokeOrder character={item.character} size={120} />
              {/if}
            </div>

            <!-- Examples -->
            {#if item.examples.length > 0}
            <div class="kanji-examples">
              <div class="examples-title">Examples:</div>
              {#each item.examples as ex}
                <div class="example-item">
                  <span class="ex-word">{ex.word}</span>
                  <span class="ex-kana">{ex.kana}</span>
                  <span class="ex-meaning">{ex.vietnamese} / {ex.meaning}</span>
                </div>
              {/each}
            </div>
            {/if}
          {/if}
        </div>
      {/each}

      {#if filteredKanji.length === 0}
        <div class="empty-state">
          No kanji found matching "{searchTerm}"
        </div>
      {/if}
    </div>
  </div>
{:else}
  <div class="error-state">
    <h2>Kanji Lesson Not Found</h2>
    <p>Lesson {lessonId} does not exist.</p>
    <button class="btn-back" on:click={() => goto(`${base}/kanji`)}>Back to Kanji</button>
  </div>
{/if}

<style>
  .reference-page {
    max-width: 800px;
    margin: 0 auto;
    animation: fadeIn 0.25s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .page-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .page-header h2 {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }

  .subtitle {
    color: var(--text-muted);
    font-size: 0.9rem;
    font-family: var(--font-jp);
    margin-bottom: 0.25rem;
  }

  .word-count {
    color: var(--primary);
    font-size: 0.85rem;
    font-weight: 600;
  }

  .controls {
    margin-bottom: 1rem;
  }

  .search-box {
    position: relative;
  }

  .search-input {
    width: 100%;
    padding: 0.6rem 2rem 0.6rem 0.75rem;
    border: 2px solid var(--border);
    border-radius: var(--radius-sm);
    font-size: 0.9rem;
    background: var(--bg-card);
    color: var(--text);
  }

  .search-input:focus {
    outline: none;
    border-color: var(--primary);
  }

  .clear-search {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    font-size: 1rem;
  }

  .results-info {
    margin-bottom: 0.75rem;
    color: var(--text-muted);
    font-size: 0.82rem;
  }

  .kanji-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .kanji-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: border-color var(--transition);
  }

  .kanji-card:hover {
    border-color: var(--primary);
  }

  .kanji-card.expanded {
    border-color: var(--primary);
    box-shadow: var(--shadow);
  }

  .kanji-row {
    display: grid;
    grid-template-columns: 3.5rem 1fr auto;
    gap: 0.75rem;
    align-items: center;
  }

  .kanji-character {
    font-family: var(--font-jp);
    font-size: 2.2rem;
    font-weight: 700;
    text-align: center;
    line-height: 1;
  }

  .kanji-info {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .kanji-readings {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    flex-wrap: wrap;
    font-family: var(--font-jp);
    font-size: 0.9rem;
  }

  .reading-label {
    font-size: 0.65rem;
    font-weight: 700;
    padding: 0.1rem 0.3rem;
    border-radius: 3px;
    background: var(--border);
    color: var(--text-muted);
  }

  .reading-on {
    color: var(--primary);
    font-weight: 500;
  }

  .reading-kun {
    color: var(--accent);
    font-weight: 500;
  }

  .kanji-meanings {
    display: flex;
    gap: 0.5rem;
    align-items: baseline;
  }

  .meaning-vi {
    font-size: 0.9rem;
    font-weight: 600;
  }

  .meaning-en {
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  .kanji-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.3rem;
  }

  .stroke-count {
    font-size: 0.7rem;
    color: var(--text-muted);
  }

  .jlpt-badge {
    font-size: 0.65rem;
    font-weight: 700;
    padding: 0.1rem 0.4rem;
    border-radius: 8px;
    background: var(--primary);
    color: #fff;
  }

  .btn-speak {
    background: none;
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 0.2rem 0.4rem;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;
  }

  .btn-speak:hover {
    border-color: var(--primary);
  }

  /* Examples section */
  .kanji-examples {
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--border);
  }

  .examples-title {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--text-muted);
    margin-bottom: 0.4rem;
  }

  .example-item {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    padding: 0.25rem 0;
    flex-wrap: wrap;
  }

  .ex-word {
    font-family: var(--font-jp);
    font-size: 1rem;
    font-weight: 600;
  }

  .ex-kana {
    font-family: var(--font-jp);
    font-size: 0.85rem;
    color: var(--primary);
  }

  .ex-meaning {
    font-size: 0.82rem;
    color: var(--text-muted);
  }

  .btn-back {
    padding: 0.4rem 0.8rem;
    background: none;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-size: 0.85rem;
    color: var(--text);
    transition: all 0.2s;
  }

  .btn-back:hover {
    background: var(--border);
    border-color: var(--primary);
    color: var(--primary);
  }

  .empty-state, .error-state {
    text-align: center;
    padding: 3rem;
    color: var(--text-muted);
  }

  @media (max-width: 600px) {
    .kanji-row {
      grid-template-columns: 3rem 1fr auto;
      gap: 0.5rem;
    }

    .kanji-character {
      font-size: 1.8rem;
    }

    .kanji-readings {
      font-size: 0.82rem;
    }

    .example-item {
      flex-direction: column;
      gap: 0.15rem;
    }
  }
</style>
