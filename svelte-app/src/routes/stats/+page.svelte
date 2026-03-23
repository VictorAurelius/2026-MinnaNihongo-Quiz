<script lang="ts">
  /**
   * Statistics Dashboard
   * Shows overview stats, mastery distribution, lesson breakdown
   */

  import { progressStore } from '$lib/stores';
  import {
    computeOverviewStats,
    computeLessonStats,
    getMasteryLabel,
    getMasteryColor,
    formatLastStudied
  } from '$lib/utils/statsUtils';

  $: overview = computeOverviewStats($progressStore);
  $: lessonStats = computeLessonStats($progressStore);
  $: hasData = overview.totalWords > 0;

  // Mastery bar chart max
  $: maxMastery = Math.max(...overview.masteryDistribution, 1);
</script>

<svelte:head>
  <title>Statistics - Smart Quiz</title>
</svelte:head>

<div class="stats-page">
  {#if !hasData}
    <div class="empty-state">
      <div class="empty-icon">📊</div>
      <h2>No data yet</h2>
      <p>Start studying to see your statistics here!</p>
    </div>
  {:else}
    <!-- Overview Cards -->
    <div class="overview-grid">
      <div class="overview-card">
        <span class="ov-value">{overview.totalWords}</span>
        <span class="ov-label">Words Practiced</span>
      </div>
      <div class="overview-card">
        <span class="ov-value">{overview.accuracy}%</span>
        <span class="ov-label">Accuracy</span>
      </div>
      <div class="overview-card">
        <span class="ov-value">{overview.totalCorrect}</span>
        <span class="ov-label">Correct</span>
      </div>
      <div class="overview-card">
        <span class="ov-value">{overview.totalLessons}</span>
        <span class="ov-label">Lessons</span>
      </div>
    </div>

    <!-- Mastery Distribution -->
    <section class="stats-section">
      <h2>Mastery Distribution</h2>
      <div class="mastery-chart">
        {#each overview.masteryDistribution as count, level}
          <div class="mastery-row">
            <span class="mastery-label" style="color: {getMasteryColor(level)}">
              {getMasteryLabel(level)}
            </span>
            <div class="mastery-bar-bg">
              <div
                class="mastery-bar"
                style="width: {(count / maxMastery) * 100}%; background: {getMasteryColor(level)}"
              ></div>
            </div>
            <span class="mastery-count">{count}</span>
          </div>
        {/each}
      </div>
    </section>

    <!-- Lesson Breakdown -->
    {#if lessonStats.length > 0}
      <section class="stats-section">
        <h2>Lesson Breakdown</h2>
        <div class="lesson-table">
          <div class="table-header">
            <span>Lesson</span>
            <span>Words</span>
            <span>Accuracy</span>
            <span>Mastery</span>
            <span>Last</span>
          </div>
          {#each lessonStats as ls}
            <div class="table-row">
              <span class="lesson-num">#{ls.lessonNumber}</span>
              <span>{ls.wordCount}</span>
              <span class:good={ls.accuracy >= 80} class:poor={ls.accuracy < 50}>
                {ls.accuracy}%
              </span>
              <span>{ls.avgMastery}</span>
              <span class="last-studied">{formatLastStudied(ls.lastStudied)}</span>
            </div>
          {/each}
        </div>
      </section>
    {/if}
  {/if}
</div>

<style>
  .stats-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
    animation: fadeIn 0.25s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .empty-state {
    text-align: center;
    padding: 3rem 1rem;
    color: var(--text-muted);
  }

  .empty-icon {
    font-size: 3rem;
    margin-bottom: 0.75rem;
  }

  .empty-state h2 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: var(--text);
  }

  /* Overview */
  .overview-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .overview-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
    padding: 1rem;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
  }

  .ov-value {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--primary);
  }

  .ov-label {
    font-size: 0.78rem;
    color: var(--text-muted);
  }

  /* Sections */
  .stats-section {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.25rem;
    margin-bottom: 1rem;
    box-shadow: var(--shadow);
  }

  .stats-section h2 {
    font-size: 1rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border);
  }

  /* Mastery Chart */
  .mastery-chart {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .mastery-row {
    display: grid;
    grid-template-columns: 5rem 1fr 2.5rem;
    align-items: center;
    gap: 0.5rem;
  }

  .mastery-label {
    font-size: 0.8rem;
    font-weight: 600;
    text-align: right;
  }

  .mastery-bar-bg {
    height: 1.2rem;
    background: var(--bg);
    border-radius: 0.6rem;
    overflow: hidden;
  }

  .mastery-bar {
    height: 100%;
    border-radius: 0.6rem;
    transition: width 0.4s ease;
    min-width: 2px;
  }

  .mastery-count {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-muted);
    text-align: right;
  }

  /* Lesson Table */
  .lesson-table {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .table-header {
    display: grid;
    grid-template-columns: 3.5rem 3rem 4rem 3.5rem 1fr;
    gap: 0.5rem;
    padding: 0.5rem 0;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--text-muted);
    text-transform: uppercase;
    border-bottom: 1px solid var(--border);
  }

  .table-row {
    display: grid;
    grid-template-columns: 3.5rem 3rem 4rem 3.5rem 1fr;
    gap: 0.5rem;
    padding: 0.5rem 0;
    font-size: 0.85rem;
    border-bottom: 1px solid var(--border);
    align-items: center;
  }

  .table-row:last-child {
    border-bottom: none;
  }

  .lesson-num {
    font-weight: 600;
    color: var(--primary);
  }

  .good {
    color: var(--success);
    font-weight: 600;
  }

  .poor {
    color: var(--danger);
    font-weight: 600;
  }

  .last-studied {
    font-size: 0.78rem;
    color: var(--text-muted);
  }

  @media (max-width: 600px) {
    .overview-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
    }

    .ov-value {
      font-size: 1.4rem;
    }

    .mastery-row {
      grid-template-columns: 4rem 1fr 2rem;
    }

    .table-header,
    .table-row {
      grid-template-columns: 2.5rem 2.5rem 3.5rem 3rem 1fr;
      font-size: 0.78rem;
    }
  }
</style>
