<script lang="ts">
  import { NUMBERS_DATA, COUNTERS_DATA } from '$lib/data/minna/counters';
  import type { NumberData, CounterType } from '$lib/types/lesson';

  let activeTab: 'numbers' | 'counters' = 'counters';
  let expandedCounters = new Set<number>();

  function toggleCounter(index: number) {
    if (expandedCounters.has(index)) {
      expandedCounters.delete(index);
    } else {
      expandedCounters.add(index);
    }
    expandedCounters = expandedCounters; // Trigger reactivity
  }

  function speak(text: string) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  }

  const hasAudio = typeof window !== 'undefined' && 'speechSynthesis' in window;
</script>

<svelte:head>
  <title>Trợ số từ - Japanese Counters</title>
</svelte:head>

<div class="counters-container">
  <header class="page-header">
    <h1>Số đếm & Trợ số từ</h1>
    <p class="subtitle">Numbers & Japanese Counter Words</p>
  </header>

  <!-- Tab Navigation -->
  <div class="tabs">
    <button
      class="tab"
      class:active={activeTab === 'numbers'}
      on:click={() => activeTab = 'numbers'}
    >
      📊 Số cơ bản
    </button>
    <button
      class="tab"
      class:active={activeTab === 'counters'}
      on:click={() => activeTab = 'counters'}
    >
      🔢 Trợ số từ ({COUNTERS_DATA.length})
    </button>
  </div>

  {#if activeTab === 'numbers'}
    <!-- Numbers Section -->
    <div class="section">
      <h2>Số cơ bản (Basic Numbers)</h2>
      <p class="section-desc">
        Hệ thống số trong tiếng Nhật từ 0 đến 兆 (trillion)
      </p>

      <div class="table-wrapper">
        <table class="numbers-table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Kanji</th>
              <th>Kana</th>
              <th>Romaji</th>
              {#if hasAudio}
                <th>Audio</th>
              {/if}
            </tr>
          </thead>
          <tbody>
            {#each NUMBERS_DATA as num}
              <tr class:irregular={num.note === 'irregular'}>
                <td class="number-col">{num.number.toLocaleString()}</td>
                <td class="jp-text kanji-col">{num.kanji}</td>
                <td class="jp-text kana-col">
                  {num.kana}
                  {#if num.alt}
                    <span class="alt"> / {num.alt.kana}</span>
                  {/if}
                </td>
                <td class="romaji-col">
                  {num.romaji}
                  {#if num.alt}
                    <span class="alt"> / {num.alt.romaji}</span>
                  {/if}
                </td>
                {#if hasAudio}
                  <td>
                    <button
                      class="btn-speak"
                      on:click={() => speak(num.kanji)}
                      title="Phát âm"
                    >
                      🔊
                    </button>
                  </td>
                {/if}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {:else}
    <!-- Counters Section -->
    <div class="section">
      <h2>Trợ số từ (Counter Words)</h2>
      <p class="section-desc">
        Từ đếm đặc biệt dùng để đếm các loại vật khác nhau trong tiếng Nhật
      </p>

      <div class="counters-grid">
        {#each COUNTERS_DATA as counter, index}
          {@const isExpanded = expandedCounters.has(index)}
          <div class="counter-card" class:expanded={isExpanded}>
            <button
              class="counter-header"
              on:click={() => toggleCounter(index)}
            >
              <div class="counter-main">
                <span class="counter-kanji jp-text">{counter.counter}</span>
                <div class="counter-info">
                  <span class="counter-reading">{counter.kana} ({counter.romaji})</span>
                  <span class="counter-usage">{counter.vietnamese}</span>
                  {#if counter.lesson}
                    <span class="lesson-badge">Bài {counter.lesson}</span>
                  {/if}
                </div>
              </div>
              {#if hasAudio}
                <div
                  class="audio-wrapper"
                  on:click|stopPropagation
                  on:keypress|stopPropagation
                  role="button"
                  tabindex="0"
                >
                  <button
                    class="btn-speak inline"
                    on:click={() => speak(counter.counter)}
                    title="Phát âm"
                  >
                    🔊
                  </button>
                </div>
              {/if}
              <span class="expand-icon">{isExpanded ? '▼' : '▶'}</span>
            </button>

            {#if isExpanded}
              <div class="counter-content">
                <!-- Readings Table -->
                <div class="readings-section">
                  <h4>Cách đọc (1-10{counter.readings.length > 10 ? '+' : ''})</h4>
                  <div class="readings-grid">
                    {#each counter.readings as reading}
                      <div class="reading-item" class:irregular={reading.irregular}>
                        <span class="reading-number">{reading.number}</span>
                        <span class="reading-form jp-text">{reading.form}</span>
                        <span class="reading-kana">{reading.kana}</span>
                        <span class="reading-romaji">({reading.romaji})</span>
                        {#if hasAudio}
                          <button
                            class="btn-speak small"
                            on:click={() => speak(reading.form)}
                            title="Phát âm"
                          >
                            🔊
                          </button>
                        {/if}
                      </div>
                    {/each}
                  </div>
                </div>

                <!-- Example -->
                <div class="example-section">
                  <h4>Ví dụ:</h4>
                  <p class="example-jp jp-text">{counter.example.japanese}</p>
                  <p class="example-vi">{counter.example.vietnamese}</p>
                </div>

                <!-- Legend -->
                {#if counter.readings.some(r => r.irregular)}
                  <div class="legend">
                    <span class="legend-item">
                      <span class="irregular-marker"></span>
                      Bất quy tắc (Irregular)
                    </span>
                  </div>
                {/if}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Info Panel -->
  <div class="info-panel">
    <h3>💡 Ghi chú</h3>
    <ul>
      <li><strong>Trợ số từ (Counter words)</strong> là từ đặc biệt dùng khi đếm vật trong tiếng Nhật</li>
      <li>Mỗi loại vật dùng counter khác nhau (vật phẳng, vật dài, động vật, người...)</li>
      <li><strong>Màu đỏ</strong> chỉ các cách đọc bất quy tắc cần học thuộc</li>
      <li>Click vào mỗi counter để xem chi tiết cách đọc từ 1-10</li>
    </ul>
  </div>
</div>

<style>
  .counters-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .page-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .page-header h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    color: var(--text-secondary);
    font-size: 1rem;
  }

  .tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
    border-bottom: 2px solid var(--border-color);
  }

  .tab {
    padding: 0.75rem 1.5rem;
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-secondary);
    transition: all 0.2s;
  }

  .tab:hover {
    color: var(--text-primary);
    background: var(--bg-secondary);
  }

  .tab.active {
    color: var(--primary);
    border-bottom-color: var(--primary);
  }

  .section {
    margin-bottom: 2rem;
  }

  .section h2 {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .section-desc {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }

  .table-wrapper {
    overflow-x: auto;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  .numbers-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
  }

  .numbers-table th {
    background: var(--bg-secondary);
    padding: 0.75rem;
    text-align: left;
    font-weight: 600;
    border-bottom: 2px solid var(--border-color);
  }

  .numbers-table td {
    padding: 0.75rem;
    border-bottom: 1px solid var(--border-color);
  }

  .numbers-table tr.irregular {
    background: #fff5f5;
  }

  .numbers-table tr.irregular td {
    color: var(--error);
  }

  .number-col {
    font-weight: 600;
    font-family: monospace;
  }

  .jp-text {
    font-size: 1.125rem;
  }

  .alt {
    color: var(--text-secondary);
    font-size: 0.875rem;
  }

  .btn-speak {
    background: none;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s;
  }

  .btn-speak:hover {
    background: var(--primary-light);
    border-color: var(--primary);
  }

  .counters-grid {
    display: grid;
    gap: 1rem;
  }

  .counter-card {
    background: white;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.2s;
  }

  .counter-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  .counter-header {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem;
    background: white;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background 0.2s;
  }

  .counter-header:hover {
    background: var(--bg-secondary);
  }

  .counter-main {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .counter-kanji {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary);
    min-width: 60px;
    text-align: center;
  }

  .counter-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .counter-reading {
    font-size: 1.125rem;
    font-weight: 500;
  }

  .counter-usage {
    color: var(--text-secondary);
    font-size: 0.875rem;
  }

  .lesson-badge {
    display: inline-block;
    background: var(--primary);
    color: white;
    padding: 0.125rem 0.5rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    width: fit-content;
    margin-top: 0.25rem;
  }

  .btn-speak.inline {
    padding: 0.5rem;
  }

  .audio-wrapper {
    display: inline-flex;
  }

  .expand-icon {
    color: var(--text-secondary);
    font-size: 0.875rem;
  }

  .counter-content {
    padding: 1.25rem;
    border-top: 1px solid var(--border-color);
    background: var(--bg-secondary);
  }

  .readings-section h4,
  .example-section h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--text-primary);
  }

  .readings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .reading-item {
    display: grid;
    grid-template-columns: 30px 1fr auto auto;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background: white;
    border-radius: 4px;
    border: 1px solid var(--border-color);
  }

  .reading-item.irregular {
    background: #fff5f5;
    border-color: var(--error);
  }

  .reading-item.irregular .reading-kana {
    color: var(--error);
    font-weight: 600;
  }

  .reading-number {
    font-weight: 700;
    color: var(--text-secondary);
    font-size: 0.875rem;
  }

  .reading-form {
    font-weight: 600;
  }

  .reading-kana {
    font-size: 0.875rem;
  }

  .reading-romaji {
    font-size: 0.75rem;
    color: var(--text-tertiary);
    grid-column: 2 / -1;
  }

  .btn-speak.small {
    padding: 0.125rem 0.375rem;
    font-size: 0.75rem;
  }

  .example-section {
    padding: 1rem;
    background: white;
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  .example-jp {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
  }

  .example-vi {
    color: var(--text-secondary);
  }

  .legend {
    display: flex;
    gap: 1rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .irregular-marker {
    width: 12px;
    height: 12px;
    background: #fff5f5;
    border: 2px solid var(--error);
    border-radius: 2px;
  }

  .info-panel {
    background: var(--bg-secondary);
    border-left: 4px solid var(--primary);
    padding: 1.5rem;
    border-radius: 4px;
    margin-top: 2rem;
  }

  .info-panel h3 {
    margin-bottom: 1rem;
    font-size: 1.25rem;
  }

  .info-panel ul {
    list-style: none;
    padding: 0;
  }

  .info-panel li {
    margin-bottom: 0.75rem;
    line-height: 1.6;
  }

  .info-panel li:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    .counters-container {
      padding: 1rem 0.5rem;
    }

    .counter-main {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .counter-kanji {
      min-width: auto;
    }

    .readings-grid {
      grid-template-columns: 1fr;
    }

    .numbers-table {
      font-size: 0.875rem;
    }
  }
</style>
