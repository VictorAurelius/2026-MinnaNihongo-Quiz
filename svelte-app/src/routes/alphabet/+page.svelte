<script lang="ts">
  import { onMount } from 'svelte';
  import { HIRAGANA_DATA, KATAKANA_DATA } from '$lib/data/minna/alphabet';
  import type { AlphabetData, AlphabetChar } from '$lib/types';
  import BackButton from '$lib/components/common/BackButton.svelte';
  import Button from '$lib/components/common/Button.svelte';

  type AlphabetScript = 'hiragana' | 'katakana';

  let currentScript: AlphabetScript = 'hiragana';
  let hasAudioSupport = false;

  const ROW_LABELS: Record<string, string> = {
    vowel: 'あ行',
    k: 'か行',
    g: 'が行',
    s: 'さ行',
    z: 'ざ行',
    t: 'た行',
    d: 'だ行',
    n: 'な行',
    h: 'は行',
    b: 'ば行',
    p: 'ぱ行',
    m: 'ま行',
    y: 'や行',
    r: 'ら行',
    w: 'わ行',
    nn: 'ん'
  };

  const COL_HEADERS = ['a', 'i', 'u', 'e', 'o'];

  onMount(() => {
    // Check for speech synthesis support
    hasAudioSupport = typeof window !== 'undefined' && 'speechSynthesis' in window;
  });

  function switchScript(script: AlphabetScript) {
    currentScript = script;
  }

  function speakKana(kana: string) {
    if (!hasAudioSupport) return;

    const utterance = new SpeechSynthesisUtterance(kana);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  }

  $: currentData = currentScript === 'hiragana' ? HIRAGANA_DATA : KATAKANA_DATA;
</script>

<svelte:head>
  <title>Alphabet - Smart Quiz</title>
</svelte:head>

<div class="alphabet-page">
  <!-- Header -->
  <div class="page-header">
    <div class="page-header-top">
      <BackButton />
      <h1>🔤 Bảng chữ cái</h1>
    </div>
  </div>

  <!-- Tabs -->
  <div class="alphabet-tabs">
    <button
      class="tab"
      class:active={currentScript === 'hiragana'}
      on:click={() => switchScript('hiragana')}
    >
      Hiragana (ひらがな)
    </button>
    <button
      class="tab"
      class:active={currentScript === 'katakana'}
      on:click={() => switchScript('katakana')}
    >
      Katakana (カタカナ)
    </button>
  </div>

  <!-- Content -->
  <div class="alphabet-content">
    <!-- Basic Characters Table -->
    <div class="alpha-section">
      <h2 class="section-heading">Bảng cơ bản (46 ký tự)</h2>

      <div class="table-wrapper">
        <table class="alpha-table">
          <thead>
            <tr>
              <th></th>
              {#each COL_HEADERS as col}
                <th>{col}</th>
              {/each}
            </tr>
          </thead>
          <tbody>
            {#each currentData.rows as row}
              {@const firstCell = row.find(Boolean)}
              {#if firstCell}
                <tr>
                  <th class="alpha-row-label">
                    {ROW_LABELS[firstCell.row] || firstCell.row}
                  </th>
                  {#each row as cell}
                    {#if cell}
                      <td
                        class="alpha-cell"
                        class:alpha-cell--audio={hasAudioSupport}
                        title={hasAudioSupport ? `Phát âm: ${cell.romaji}` : cell.romaji}
                        on:click={() => speakKana(cell.kana)}
                        on:keydown={(e) => e.key === 'Enter' && speakKana(cell.kana)}
                        tabindex={hasAudioSupport ? 0 : -1}
                        role={hasAudioSupport ? 'button' : undefined}
                      >
                        <span class="alpha-kana">{cell.kana}</span>
                        <span class="alpha-romaji">{cell.romaji}</span>
                      </td>
                    {:else}
                      <td class="alpha-cell alpha-cell--empty"></td>
                    {/if}
                  {/each}
                </tr>
              {/if}
            {/each}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Combo Characters (Youon) -->
    {#if currentData.combo.length > 0}
      <div class="alpha-section">
        <h2 class="section-heading">
          拗音 (Youon) - {currentScript === 'hiragana' ? 'Hiragana' : 'Katakana'}
        </h2>

        <div class="alpha-combo-grid">
          {#each currentData.combo as cell}
            <div
              class="alpha-cell alpha-combo-cell"
              class:alpha-cell--audio={hasAudioSupport}
              title={hasAudioSupport ? `Phát âm: ${cell.romaji}` : cell.romaji}
              on:click={() => speakKana(cell.kana)}
              on:keydown={(e) => e.key === 'Enter' && speakKana(cell.kana)}
              tabindex={hasAudioSupport ? 0 : -1}
              role={hasAudioSupport ? 'button' : undefined}
            >
              <span class="alpha-kana">{cell.kana}</span>
              <span class="alpha-romaji">{cell.romaji}</span>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Quiz Actions -->
    <div class="quiz-actions">
      <h3 class="quiz-actions-heading">Luyện tập</h3>
      <div class="quiz-buttons">
        <Button variant="primary" size="lg">
          🎯 Quiz {currentScript === 'hiragana' ? 'Hiragana' : 'Katakana'}
        </Button>
        <Button variant="outline" size="lg">
          🎲 Quiz cả hai
        </Button>
      </div>
    </div>

    <!-- Audio Note -->
    {#if hasAudioSupport}
      <p class="audio-note">
        💡 Nhấp vào ký tự để nghe phát âm
      </p>
    {/if}
  </div>
</div>

<style>
  .alphabet-page {
    min-height: 100vh;
    padding-bottom: 2rem;
  }

  .page-header {
    padding: 1.5rem;
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border);
  }

  .page-header-top {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .page-header h1 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .alphabet-tabs {
    display: flex;
    background: var(--bg-primary);
    border-bottom: 2px solid var(--border);
    padding: 0 1.5rem;
    overflow-x: auto;
  }

  .tab {
    flex: 1;
    padding: 1rem 1.5rem;
    background: transparent;
    border: none;
    border-bottom: 3px solid transparent;
    color: var(--text-muted);
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;
  }

  .tab:hover {
    color: var(--text-primary);
    background: var(--bg-hover);
  }

  .tab.active {
    color: var(--primary);
    border-bottom-color: var(--primary);
  }

  .alphabet-content {
    padding: 1.5rem;
  }

  .alpha-section {
    margin-bottom: 3rem;
  }

  .section-heading {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 1.5rem;
  }

  .table-wrapper {
    overflow-x: auto;
    border-radius: 8px;
    background: var(--bg-secondary);
    padding: 1rem;
  }

  .alpha-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1rem;
  }

  .alpha-table thead th {
    padding: 0.75rem 0.5rem;
    text-align: center;
    font-weight: 600;
    color: var(--text-muted);
    font-size: 0.85rem;
    text-transform: uppercase;
  }

  .alpha-table tbody th {
    padding: 0.75rem 1rem;
    text-align: right;
    font-weight: 600;
    color: var(--text-muted);
    font-size: 0.85rem;
  }

  .alpha-row-label {
    min-width: 80px;
  }

  .alpha-cell {
    padding: 1rem 0.5rem;
    text-align: center;
    border: 1px solid var(--border);
    background: var(--bg-primary);
    transition: all 0.2s;
  }

  .alpha-cell--empty {
    background: var(--bg-secondary);
    opacity: 0.3;
  }

  .alpha-cell--audio {
    cursor: pointer;
  }

  .alpha-cell--audio:hover {
    background: var(--primary-bg);
    border-color: var(--primary);
    transform: scale(1.05);
  }

  .alpha-cell--audio:focus {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }

  .alpha-kana {
    display: block;
    font-size: 1.75rem;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
  }

  .alpha-romaji {
    display: block;
    font-size: 0.8rem;
    color: var(--text-muted);
    font-style: italic;
  }

  .alpha-combo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.75rem;
  }

  .alpha-combo-cell {
    padding: 1.25rem 0.75rem;
    border-radius: 8px;
  }

  .quiz-actions {
    margin: 3rem 0;
    padding: 2rem;
    background: var(--bg-secondary);
    border-radius: 12px;
    border: 2px dashed var(--border);
  }

  .quiz-actions-heading {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .quiz-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .audio-note {
    text-align: center;
    color: var(--text-muted);
    font-size: 0.9rem;
    margin-top: 2rem;
    font-style: italic;
  }

  @media (max-width: 768px) {
    .alpha-table {
      font-size: 0.9rem;
    }

    .alpha-kana {
      font-size: 1.5rem;
    }

    .alpha-romaji {
      font-size: 0.75rem;
    }

    .alpha-combo-grid {
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    }
  }
</style>
