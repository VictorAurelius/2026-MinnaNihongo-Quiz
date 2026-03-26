<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { playJapaneseAudio } from '$lib/utils/audioUtils';

  let searchTerm = '';
  let selectedGroup = 'all';

  $: level = $page.params.level;
  $: isValidLevel = level === 'n2' || level === 'n1';

  // Dynamic import based on level
  let vocabData: any[] = [];
  let groupedData: Record<string, any[]> = {};

  $: if (isValidLevel) {
    loadData(level);
  }

  async function loadData(lvl: string) {
    if (lvl === 'n2') {
      const mod = await import('$lib/data/vocab/n2');
      vocabData = mod.N2_VOCAB_DATA;
      groupedData = mod.getN2VocabByGroup();
    } else if (lvl === 'n1') {
      const mod = await import('$lib/data/vocab/n1');
      vocabData = mod.N1_VOCAB_DATA;
      groupedData = mod.getN1VocabByGroup();
    }
  }

  $: groups = Object.keys(groupedData);
  $: displayItems = selectedGroup === 'all'
    ? vocabData
    : (groupedData[selectedGroup] || []);

  $: filteredItems = displayItems.filter((item: any) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      item.japanese.toLowerCase().includes(search) ||
      item.kana.toLowerCase().includes(search) ||
      item.vietnamese.toLowerCase().includes(search) ||
      item.english.toLowerCase().includes(search)
    );
  });

  function speak(text: string) {
    playJapaneseAudio(text);
  }

  const hasAudio = typeof window !== 'undefined' && 'speechSynthesis' in window;
</script>

<svelte:head>
  <title>JLPT {(level || '').toUpperCase()} Vocabulary | Smart Quiz</title>
</svelte:head>

<div class="vocab-container">
  {#if !isValidLevel}
    <div class="error-state">
      <h2>Level not found</h2>
      <p>The level "{level}" is not available. Choose N2 or N1.</p>
      <button class="btn-primary" on:click={() => goto(`${base}/courses`)}>Back to Courses</button>
    </div>
  {:else}
    <header class="page-header">
      <button class="btn-back" on:click={() => goto(`${base}/courses`)}>← Back</button>
      <div class="header-content">
        <div class="level-badge" class:n2={level === 'n2'} class:n1={level === 'n1'}>
          {(level || '').toUpperCase()}
        </div>
        <div>
          <h1>JLPT {(level || '').toUpperCase()} Vocabulary Reference</h1>
          <p class="word-count">{vocabData.length} words</p>
        </div>
      </div>
    </header>

    <!-- Controls -->
    <div class="controls">
      <div class="search-box">
        <input
          type="text"
          placeholder="Search by Japanese, kana, Vietnamese, or English..."
          bind:value={searchTerm}
          class="search-input"
        />
      </div>
      <div class="filter-row">
        <select bind:value={selectedGroup} class="group-select">
          <option value="all">All groups ({vocabData.length})</option>
          {#each groups as group}
            <option value={group}>{group} ({groupedData[group]?.length || 0})</option>
          {/each}
        </select>
      </div>
    </div>

    <!-- Results count -->
    <p class="results-count">{filteredItems.length} results</p>

    <!-- Vocabulary Table -->
    <div class="table-wrapper">
      <table class="vocab-table">
        <thead>
          <tr>
            <th class="col-num">#</th>
            <th class="col-jp">Japanese</th>
            <th class="col-kana">Kana</th>
            <th class="col-vi">Vietnamese</th>
            <th class="col-en">English</th>
            {#if hasAudio}
              <th class="col-audio">Audio</th>
            {/if}
          </tr>
        </thead>
        <tbody>
          {#each filteredItems as item, i}
            <tr>
              <td class="col-num">{i + 1}</td>
              <td class="col-jp">{item.japanese}</td>
              <td class="col-kana">{item.kana}</td>
              <td class="col-vi">{item.vietnamese}</td>
              <td class="col-en">{item.english}</td>
              {#if hasAudio}
                <td class="col-audio">
                  <button class="btn-speak" on:click={() => speak(item.kana)} title="Speak">
                    🔊
                  </button>
                </td>
              {/if}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>

<style>
  .vocab-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 1rem;
  }

  .error-state {
    text-align: center;
    padding: 3rem 1rem;
  }

  .page-header {
    margin-bottom: 1.5rem;
  }

  .btn-back {
    background: none;
    border: none;
    color: var(--color-primary, #6366f1);
    cursor: pointer;
    font-size: 0.95rem;
    padding: 0.25rem 0;
    margin-bottom: 0.5rem;
  }

  .header-content {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .level-badge {
    font-size: 1.2rem;
    font-weight: 700;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    color: white;
  }

  .level-badge.n2 { background: #8b5cf6; }
  .level-badge.n1 { background: #ef4444; }

  h1 {
    font-size: 1.3rem;
    margin: 0;
  }

  .word-count {
    color: var(--color-text-secondary, #6b7280);
    margin: 0.25rem 0 0;
    font-size: 0.9rem;
  }

  .controls {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .search-box { flex: 1; min-width: 200px; }

  .search-input, .group-select {
    width: 100%;
    padding: 0.6rem 0.75rem;
    border: 1px solid var(--color-border, #d1d5db);
    border-radius: 0.5rem;
    font-size: 0.9rem;
    background: var(--color-surface, white);
    color: var(--color-text, #111);
  }

  .results-count {
    font-size: 0.85rem;
    color: var(--color-text-secondary, #6b7280);
    margin-bottom: 0.5rem;
  }

  .table-wrapper {
    overflow-x: auto;
    border-radius: 0.5rem;
    border: 1px solid var(--color-border, #e5e7eb);
  }

  .vocab-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
  }

  .vocab-table th {
    background: var(--color-surface-alt, #f9fafb);
    padding: 0.6rem 0.75rem;
    text-align: left;
    font-weight: 600;
    border-bottom: 2px solid var(--color-border, #e5e7eb);
    white-space: nowrap;
  }

  .vocab-table td {
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid var(--color-border, #f3f4f6);
  }

  .vocab-table tbody tr:hover {
    background: var(--color-surface-alt, #f9fafb);
  }

  .col-num { width: 3rem; text-align: center; color: var(--color-text-secondary, #9ca3af); }
  .col-jp { font-size: 1.1rem; font-weight: 500; }
  .col-kana { color: var(--color-text-secondary, #6b7280); }
  .col-audio { width: 3rem; text-align: center; }

  .btn-speak {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.25rem;
  }

  .btn-primary {
    background: var(--color-primary, #6366f1);
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  @media (max-width: 640px) {
    .col-en { display: none; }
    .vocab-table { font-size: 0.85rem; }
  }
</style>
