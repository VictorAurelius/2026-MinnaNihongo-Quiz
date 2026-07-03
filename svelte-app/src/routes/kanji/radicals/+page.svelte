<script lang="ts">
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { browser } from '$app/environment';
  import { KANGXI_RADICALS, getKanjiByRadical } from '$lib/data/kanji/radicals';

  let searchTerm = '';
  let selectedRadical: string | null = null;

  // Guard searchParams behind `browser`: accessing url.searchParams during
  // prerender is unsafe (the static HTML can't depend on the query string), so
  // the full radical grid prerenders unfiltered; the ?q= deep-link still
  // pre-selects a radical after hydration in the browser.
  $: query = browser ? ($page.url.searchParams.get('q') || '') : '';
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
      <button class="ui-button" data-variant="secondary" on:click={() => selectedRadical = null}>Back to all radicals</button>
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
  }

  h1 { font-size: 1.3rem; margin-bottom: 1rem; }

  .search-input {
    width: 100%;
    padding: 0.6rem 1rem;
    border: 2px solid var(--color-border);
    border-radius: var(--radius-control);
    background: var(--color-card);
    color: var(--color-foreground);
    font-size: 0.95rem;
    margin-bottom: 1rem;
    outline: none;
  }

  .search-input:focus { border-color: var(--color-primary); }

  .selected-radical {
    background: var(--color-card);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-surface);
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
    font-family: var(--font-japanese);
    font-size: 1.3rem;
    padding: 0.3rem 0.5rem;
    background: var(--color-background);
    border-radius: var(--radius-control);
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
    background: var(--color-card);
    border: 1.5px solid var(--color-border);
    border-radius: var(--radius-control);
    cursor: pointer;
    transition: all 0.15s;
    font-family: inherit;
    color: var(--color-foreground);
  }

  .radical-card:hover { border-color: var(--color-primary); }
  .radical-card.active { border-color: var(--color-primary); background: color-mix(in srgb, var(--color-primary) 8%, var(--color-card)); }

  .rc-char { font-family: var(--font-japanese); font-size: 1.5rem; font-weight: 700; color: var(--color-primary); }
  .rc-vi { font-size: 0.75rem; font-weight: 600; }
  .rc-en { font-size: 0.65rem; color: var(--color-muted-foreground); }
  .rc-strokes { font-size: 0.6rem; color: var(--color-muted-foreground); }

  .no-data { color: var(--color-muted-foreground); font-size: 0.85rem; }

  @media (max-width: 600px) {
    .radical-grid { grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); }
  }
</style>
