<script lang="ts">
  import { HSK5_DATA } from '$lib/data/hsk';
  import { goto } from '$app/navigation';

  function navigateToGroup(groupId: string) {
    goto(`/hsk/${groupId}`);
  }
</script>

<svelte:head>
  <title>HSK 5 Vocabulary</title>
</svelte:head>

<div class="hsk-menu-container">
  <header class="page-header">
    <h1>HSK 5 Vocabulary</h1>
    <p class="subtitle">汉语水平考试 - Chinese Proficiency Test Level 5</p>
    <p class="word-count">Total: ~1600 words across 5 groups</p>
  </header>

  <div class="groups-grid">
    {#each HSK5_DATA as group}
      <button
        class="group-card"
        on:click={() => navigateToGroup(group.id)}
      >
        <div class="group-letter">{group.id.toUpperCase()}</div>
        <div class="group-info">
          <h2 class="group-title">{group.title}</h2>
          <p class="group-count">{group.words.length} words</p>
        </div>
        <div class="arrow">→</div>
      </button>
    {/each}
  </div>

  <div class="info-panel">
    <h3>About HSK 5</h3>
    <p>
      HSK 5 là cấp độ 5 trong kỳ thi năng lực tiếng Trung Quốc.
      Người học cần nắm vững khoảng 2500 từ vựng để đạt trình độ này.
    </p>
    <p>
      Danh sách này bao gồm 1600+ từ cốt lõi được sắp xếp theo thứ tự chữ cái (Pinyin).
    </p>
  </div>
</div>

<style>
  .hsk-menu-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .page-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .page-header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.125rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
  }

  .word-count {
    font-size: 0.875rem;
    color: var(--text-tertiary);
    font-weight: 500;
  }

  .groups-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .group-card {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 2rem;
    background: white;
    border: 2px solid var(--border-color);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    text-align: left;
  }

  .group-card:hover {
    border-color: var(--primary);
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  }

  .group-letter {
    flex-shrink: 0;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    color: white;
    font-size: 2.5rem;
    font-weight: 700;
    border-radius: 12px;
  }

  .group-info {
    flex: 1;
  }

  .group-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
  }

  .group-count {
    font-size: 1rem;
    color: var(--text-secondary);
    font-weight: 500;
  }

  .arrow {
    flex-shrink: 0;
    font-size: 1.5rem;
    color: var(--text-tertiary);
    transition: transform 0.2s;
  }

  .group-card:hover .arrow {
    transform: translateX(4px);
    color: var(--primary);
  }

  .info-panel {
    background: var(--bg-secondary);
    border-left: 4px solid var(--primary);
    padding: 2rem;
    border-radius: 8px;
  }

  .info-panel h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }

  .info-panel p {
    line-height: 1.8;
    color: var(--text-secondary);
    margin-bottom: 1rem;
  }

  .info-panel p:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    .hsk-menu-container {
      padding: 1rem 0.5rem;
    }

    .page-header h1 {
      font-size: 1.75rem;
    }

    .groups-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .group-card {
      padding: 1.5rem;
      gap: 1rem;
    }

    .group-letter {
      width: 60px;
      height: 60px;
      font-size: 2rem;
    }

    .group-title {
      font-size: 1.25rem;
    }
  }
</style>
