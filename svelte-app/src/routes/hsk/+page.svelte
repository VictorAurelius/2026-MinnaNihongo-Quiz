<script lang="ts">
  import { getAllHSKLevels, getHSKData } from '$lib/data/hsk';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';

  const levels = getAllHSKLevels();
  let selectedLevel = 5;

  $: groups = getHSKData(selectedLevel);
  $: totalWords = groups.reduce((s, g) => s + g.words.length, 0);

  function navigateToGroup(groupId: string) {
    goto(`${base}/hsk/${groupId}`);
  }
</script>

<svelte:head>
  <title>HSK Vocabulary — Smart Quiz</title>
</svelte:head>

<div class="hsk-page">
  <header class="page-header">
    <h1>HSK Vocabulary</h1>
    <p class="subtitle">汉语水平考试 — Chinese Proficiency Test</p>
  </header>

  <!-- Level Selector -->
  <div class="level-selector">
    {#each levels as lvl}
      <button
        class="level-btn"
        class:active={selectedLevel === lvl.level}
        on:click={() => selectedLevel = lvl.level}
      >
        <span class="level-num">HSK {lvl.level}</span>
        <span class="level-count">{lvl.wordCount} từ</span>
      </button>
    {/each}
  </div>

  <p class="total-info">HSK {selectedLevel} — {totalWords} words, {groups.length} group{groups.length > 1 ? 's' : ''}</p>

  <!-- Groups -->
  <div class="groups-grid">
    {#each groups as group}
      <button class="group-card" on:click={() => navigateToGroup(group.id)}>
        <div class="group-letter">{group.id.toUpperCase()}</div>
        <div class="group-info">
          <h2 class="group-title">{group.title}</h2>
          <p class="group-count">{group.words.length} words</p>
        </div>
        <div class="arrow">→</div>
      </button>
    {/each}
  </div>
</div>

<style>
  .hsk-page { max-width: 800px; margin: 0 auto; padding: 1rem; animation: fadeIn 0.25s ease; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .page-header { text-align: center; margin-bottom: 1.5rem; }
  .page-header h1 { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.3rem; }
  .subtitle { font-size: 0.9rem; color: var(--text-muted); }

  .level-selector { display: flex; gap: 0.5rem; justify-content: center; margin-bottom: 1rem; flex-wrap: wrap; }
  .level-btn {
    display: flex; flex-direction: column; align-items: center; gap: 0.1rem;
    padding: 0.5rem 1rem; border: 2px solid var(--border); border-radius: var(--radius-sm);
    background: var(--bg-card); font-family: inherit; cursor: pointer; transition: all 0.15s;
    color: var(--text);
  }
  .level-btn:hover { border-color: var(--primary); }
  .level-btn.active { border-color: var(--primary); background: color-mix(in srgb, var(--primary) 10%, var(--bg-card)); color: var(--primary); }
  .level-num { font-size: 0.9rem; font-weight: 700; }
  .level-count { font-size: 0.7rem; color: var(--text-muted); }

  .total-info { text-align: center; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem; }

  .groups-grid { display: flex; flex-direction: column; gap: 0.75rem; }
  .group-card {
    display: flex; align-items: center; gap: 1rem; width: 100%;
    padding: 1rem; background: var(--bg-card); border: 1.5px solid var(--border);
    border-radius: var(--radius); cursor: pointer; text-align: left;
    font-family: inherit; color: var(--text); transition: all 0.2s;
  }
  .group-card:hover { border-color: var(--primary); transform: translateY(-2px); box-shadow: var(--shadow-lg); }
  .group-letter {
    width: 3rem; height: 3rem; display: flex; align-items: center; justify-content: center;
    background: var(--accent); color: white; font-size: 1.3rem; font-weight: 700; border-radius: var(--radius-sm); flex-shrink: 0;
  }
  .group-info { flex: 1; }
  .group-title { font-size: 1rem; font-weight: 600; margin: 0 0 0.15rem; }
  .group-count { font-size: 0.8rem; color: var(--text-muted); margin: 0; }
  .arrow { color: var(--text-muted); font-size: 1.1rem; transition: transform 0.2s; }
  .group-card:hover .arrow { transform: translateX(3px); color: var(--primary); }

  @media (max-width: 600px) {
    .level-selector { gap: 0.3rem; }
    .level-btn { padding: 0.4rem 0.6rem; }
    .level-num { font-size: 0.8rem; }
  }
</style>
