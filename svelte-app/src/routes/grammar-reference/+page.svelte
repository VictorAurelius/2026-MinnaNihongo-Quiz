<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { getAllGrammar } from '$lib/data/minna/grammar';
  import { getAllComparisons } from '$lib/data/minna/grammar/comparisons';
  import { GRAMMAR_CATEGORIES, GRAMMAR_FUNCTIONS, JLPT_LEVELS } from '$lib/data/minna/grammar/metadata';
  import {
    mergeGrammarWithMetadata,
    applyFilters,
    groupByLesson,
    groupByCategory,
    groupByFunction
  } from '$lib/utils/grammarUtils';
  import type { GrammarPattern, GrammarFilters, GrammarViewMode, GrammarComparison } from '$lib/types';
  import GrammarCard from '$lib/components/grammar/GrammarCard.svelte';
  import GrammarDetailModal from '$lib/components/grammar/GrammarDetailModal.svelte';
  import ComparisonCard from '$lib/components/grammar/ComparisonCard.svelte';
  import ComparisonModal from '$lib/components/grammar/ComparisonModal.svelte';
  import BackButton from '$lib/components/common/BackButton.svelte';

  // State
  let allPatterns: GrammarPattern[] = [];
  let filteredPatterns: GrammarPattern[] = [];
  let selectedPatterns = new Set<string>();
  let currentView: GrammarViewMode = 'lesson';

  const filters = writable<GrammarFilters>({
    search: '',
    jlpt: 'all',
    category: 'all',
    function: 'all'
  });

  // Modal state
  let selectedPattern: GrammarPattern | null = null;
  let selectedComparison: GrammarComparison | null = null;
  let showDetailModal = false;
  let showComparisonModal = false;

  // Search debounce
  let searchTimeout: ReturnType<typeof setTimeout>;

  // Initialize data
  onMount(() => {
    const rawPatterns = getAllGrammar();
    allPatterns = mergeGrammarWithMetadata(rawPatterns);
    filteredPatterns = allPatterns;
  });

  // Apply filters when they change
  $: {
    filteredPatterns = applyFilters(allPatterns, $filters);
  }

  // Handle search input with debounce
  function handleSearchInput(e: Event) {
    const target = e.target as HTMLInputElement;
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      filters.update(f => ({ ...f, search: target.value }));
    }, 300);
  }

  // Handle view change
  function handleViewChange(view: GrammarViewMode) {
    currentView = view;
  }

  // Toggle pattern selection
  function togglePatternSelection(patternString: string) {
    if (selectedPatterns.has(patternString)) {
      selectedPatterns.delete(patternString);
    } else {
      selectedPatterns.add(patternString);
    }
    selectedPatterns = selectedPatterns; // Trigger reactivity
  }

  // Show pattern detail
  function showPattern(pattern: GrammarPattern) {
    selectedPattern = pattern;
    showDetailModal = true;
  }

  // Show comparison
  function showComparison(comparison: GrammarComparison) {
    selectedComparison = comparison;
    showComparisonModal = true;
  }

  // Grouped data for rendering
  $: groupedData = (() => {
    switch (currentView) {
      case 'lesson':
        return groupByLesson(filteredPatterns);
      case 'category':
        return groupByCategory(filteredPatterns);
      case 'function':
        return groupByFunction(filteredPatterns);
      default:
        return {};
    }
  })();

  $: comparisons = getAllComparisons();
</script>

<svelte:head>
  <title>Grammar Reference - Smart Quiz</title>
</svelte:head>

<div class="grammar-reference-page">
  <!-- Header -->
  <div class="page-header">
    <div class="page-header-top">
      <BackButton />
      <h1>📖 Ngữ pháp tổng hợp</h1>
    </div>
  </div>

  <!-- Search and Filters -->
  <div class="grammar-filters">
    <div class="search-box">
      <input
        type="text"
        class="search-input"
        placeholder="Tìm kiếm ngữ pháp..."
        on:input={handleSearchInput}
      />
    </div>

    <div class="filter-row">
      <select
        class="filter-select"
        bind:value={$filters.jlpt}
        on:change={() => filters.set($filters)}
      >
        <option value="all">Tất cả JLPT</option>
        {#each JLPT_LEVELS as level}
          <option value={level}>{level}</option>
        {/each}
      </select>

      <select
        class="filter-select"
        bind:value={$filters.category}
        on:change={() => filters.set($filters)}
      >
        <option value="all">Tất cả phân loại</option>
        {#each Object.values(GRAMMAR_CATEGORIES) as category}
          <option value={category.id}>{category.icon} {category.name}</option>
        {/each}
      </select>

      <select
        class="filter-select"
        bind:value={$filters.function}
        on:change={() => filters.set($filters)}
      >
        <option value="all">Tất cả chức năng</option>
        {#each Object.values(GRAMMAR_FUNCTIONS) as func}
          <option value={func.id || ''}>{func.name}</option>
        {/each}
      </select>
    </div>
  </div>

  <!-- View Tabs -->
  <div class="view-tabs">
    <button
      class="view-tab"
      class:active={currentView === 'lesson'}
      on:click={() => handleViewChange('lesson')}
    >
      📖 Theo bài
    </button>
    <button
      class="view-tab"
      class:active={currentView === 'category'}
      on:click={() => handleViewChange('category')}
    >
      🎯 Theo phân loại
    </button>
    <button
      class="view-tab"
      class:active={currentView === 'function'}
      on:click={() => handleViewChange('function')}
    >
      💡 Theo chức năng
    </button>
    <button
      class="view-tab"
      class:active={currentView === 'comparisons'}
      on:click={() => handleViewChange('comparisons')}
    >
      📊 So sánh
    </button>
  </div>

  <!-- Content -->
  <div class="grammar-content">
    {#if currentView === 'comparisons'}
      <!-- Comparisons View -->
      <div class="grammar-group-header">
        <h3>📊 So sánh ngữ pháp</h3>
        <span class="pattern-count">{comparisons.length} so sánh</span>
      </div>
      <div class="comparison-list">
        {#each comparisons as comparison}
          <ComparisonCard {comparison} on:click={() => showComparison(comparison)} />
        {/each}
      </div>
    {:else}
      <!-- Patterns View -->
      {#if filteredPatterns.length === 0}
        <div class="empty-state">
          <p>Không tìm thấy ngữ pháp nào.</p>
          <p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.</p>
        </div>
      {:else}
        {#each Object.entries(groupedData) as [key, group]}
          <div class="grammar-group">
            <!-- Group Header -->
            <div class="grammar-group-header">
              {#if currentView === 'lesson'}
                <h3>📖 Bài {group.lessonNumber}</h3>
              {:else if currentView === 'category' && group.category}
                <h3>{group.category.icon} {group.category.name}</h3>
              {:else if currentView === 'function' && group.function}
                <h3>{group.function.name}</h3>
              {/if}
              <span class="pattern-count">{group.patterns.length} patterns</span>
            </div>

            <!-- Patterns -->
            {#each group.patterns as pattern}
              <GrammarCard
                {pattern}
                selected={selectedPatterns.has(pattern.pattern)}
                on:toggle={() => togglePatternSelection(pattern.pattern)}
                on:detail={() => showPattern(pattern)}
              />
            {/each}
          </div>
        {/each}
      {/if}
    {/if}
  </div>

  <!-- Selected Footer -->
  {#if selectedPatterns.size > 0}
    <div class="grammar-footer">
      <div class="selected-info">
        <span class="selected-count">{selectedPatterns.size}</span> patterns đã chọn
      </div>
      <button class="btn btn-primary">
        🎯 Quiz các pattern đã chọn
      </button>
    </div>
  {/if}
</div>

<!-- Modals -->
{#if showDetailModal && selectedPattern}
  <GrammarDetailModal
    pattern={selectedPattern}
    {allPatterns}
    on:close={() => {
      showDetailModal = false;
      selectedPattern = null;
    }}
    on:showRelated={(e) => showPattern(e.detail)}
  />
{/if}

{#if showComparisonModal && selectedComparison}
  <ComparisonModal
    comparison={selectedComparison}
    on:close={() => {
      showComparisonModal = false;
      selectedComparison = null;
    }}
  />
{/if}

<style>
  .grammar-reference-page {
    min-height: 100vh;
    padding-bottom: 100px;
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

  .grammar-filters {
    padding: 1rem 1.5rem;
    background: var(--bg-primary);
    border-bottom: 1px solid var(--border);
  }

  .search-box {
    margin-bottom: 1rem;
  }

  .search-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid var(--border);
    border-radius: 8px;
    font-size: 1rem;
    background: var(--bg-secondary);
    color: var(--text-primary);
    transition: all 0.2s;
  }

  .search-input:focus {
    outline: none;
    border-color: var(--primary);
  }

  .filter-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.75rem;
  }

  .filter-select {
    padding: 0.5rem;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--bg-secondary);
    color: var(--text-primary);
    font-size: 0.9rem;
  }

  .view-tabs {
    display: flex;
    padding: 0 1.5rem;
    background: var(--bg-primary);
    border-bottom: 2px solid var(--border);
    overflow-x: auto;
  }

  .view-tab {
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

  .view-tab:hover {
    color: var(--text-primary);
    background: var(--bg-hover);
  }

  .view-tab.active {
    color: var(--primary);
    border-bottom-color: var(--primary);
  }

  .grammar-content {
    padding: 1.5rem;
  }

  .grammar-group {
    margin-bottom: 2rem;
  }

  .grammar-group-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    margin-bottom: 1rem;
    background: var(--bg-secondary);
    border-radius: 8px;
  }

  .grammar-group-header h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .pattern-count {
    font-size: 0.9rem;
    color: var(--text-muted);
    font-weight: 500;
  }

  .comparison-list {
    display: grid;
    gap: 1rem;
  }

  .empty-state {
    text-align: center;
    padding: 3rem 1.5rem;
    color: var(--text-muted);
  }

  .empty-state p:first-child {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .grammar-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem 1.5rem;
    background: var(--bg-secondary);
    border-top: 2px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }

  .selected-info {
    font-size: 1rem;
    color: var(--text-primary);
  }

  .selected-count {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--primary);
  }
</style>
