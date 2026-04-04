<script lang="ts">
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { KANGXI_RADICALS, getKanjiByRadical } from '$lib/data/kanji/radicals';

  let searchTerm = '';
  let selectedRadical: string | null = null;

  $: query = $page.url.searchParams.get('q') || '';
  $: if (query) selectedRadical = query;

  $: filtered = searchTerm
    ? KANGXI_RADICALS.filter(r =>
        r.character.includes(searchTerm) ||
        r.meaningVi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.meaningEn.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : KANGXI_RADICALS;

  $: kanjiList = selectedRadical ? getKanjiByRadical(selectedRadical) : [];
</script>

<svelte:head>
  <title>214 Bộ Thủ - Smart Quiz</title>
</svelte:head>

<div class="radicals-page">
  <h1>214 Bộ Thủ (Kangxi Radicals)</h1>

  <input
    type="text"
    class="search-input"
    placeholder="Search radicals..."
    bind:value={searchTerm}
  />

  {#if selectedRadical}
    <div class="selected-radical">
      <h2>Kanji containing {selectedRadical}</h2>
      <div class="kanji-grid">
        {#each kanjiList as k}
          <span class="kanji-chip">{k}</span>
        {/each}
        {#if kanjiList.length === 0}
          <p class="no-data">No kanji found</p>
        {/if}
      </div>
      <button class="btn btn-secondary" on:click={() => selectedRadical = null}>Back to all radicals</button>
    </div>
  {/if}

  <div class="radical-grid">
    {#each filtered as r}
      <a
        href="{base}/kanji/radicals/{encodeURIComponent(r.character)}"
        class="radical-card"
        class:active={selectedRadical === r.character}
      >
        <span class="rc-char">{r.character}</span>
        <span class="rc-vi">{r.meaningVi}</span>
        <span class="rc-en">{r.meaningEn}</span>
        <span class="rc-strokes">{r.strokeCount} nét</span>
      </a>
    {/each}
  </div>
</div>

<style>
  .radicals-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
    animation: fadeIn 0.25s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  h1 { font-size: 1.3rem; margin-bottom: 1rem; }

  .search-input {
    width: 100%;
    padding: 0.6rem 1rem;
    border: 2px solid var(--border);
    border-radius: var(--radius-sm);
    background: var(--bg-card);
    color: var(--text);
    font-size: 0.95rem;
    margin-bottom: 1rem;
    outline: none;
  }

  .search-input:focus { border-color: var(--primary); }

  .selected-radical {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .selected-radical h2 { font-size: 1rem; margin-bottom: 0.5rem; }

  .kanji-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 0.75rem;
  }

  .kanji-chip {
    font-family: var(--font-jp);
    font-size: 1.3rem;
    padding: 0.3rem 0.5rem;
    background: var(--bg);
    border-radius: var(--radius-sm);
  }

  .radical-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.5rem;
  }

  .radical-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
    padding: 0.6rem;
    background: var(--bg-card);
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all 0.15s;
    font-family: inherit;
    color: var(--text);
  }

  .radical-card:hover { border-color: var(--primary); }
  .radical-card.active { border-color: var(--primary); background: color-mix(in srgb, var(--primary) 8%, var(--bg-card)); }

  .rc-char { font-family: var(--font-jp); font-size: 1.5rem; font-weight: 700; color: var(--primary); }
  .rc-vi { font-size: 0.75rem; font-weight: 600; }
  .rc-en { font-size: 0.65rem; color: var(--text-muted); }
  .rc-strokes { font-size: 0.6rem; color: var(--text-muted); }

  .no-data { color: var(--text-muted); font-size: 0.85rem; }

  @media (max-width: 600px) {
    .radical-grid { grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); }
  }
</style>
