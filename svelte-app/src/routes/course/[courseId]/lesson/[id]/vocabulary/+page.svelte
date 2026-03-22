<script lang="ts">
  /**
   * Course Vocabulary List Page
   * Shows all vocabulary items for a specific lesson in a course
   */

  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { getCourse } from '$lib/data/courses';
  import { kanaToRomaji } from '$lib/utils/kanaUtils';
  import { buildQuizUrl } from '$lib/utils/courseUtils';
  import { playJapaneseAudio } from '$lib/utils/audioUtils';
  import type { CourseId } from '$lib/types/course';
  import type { QuizMode, VocabItem } from '$lib/types';

  let searchTerm = '';
  let filterType: 'all' | 'main' | 'additional' | 'kanji' | 'supplementary' = 'all';

  $: courseId = $page.params.courseId as CourseId;
  $: lessonId = parseInt($page.params.id || '0');
  $: course = getCourse(courseId);
  $: lessonData = course?.getLessonData(lessonId);
  $: vocabulary = lessonData?.vocabulary || [];

  $: filteredVocab = vocabulary.filter(item => {
    if (filterType !== 'all' && item.type !== filterType) return false;
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      item.japanese.toLowerCase().includes(search) ||
      item.kana.toLowerCase().includes(search) ||
      item.vietnamese.toLowerCase().includes(search) ||
      item.english.toLowerCase().includes(search)
    );
  });

  // Selection state
  let selectedSet: Set<VocabItem> = new Set();
  $: allFilteredSelected = filteredVocab.length > 0 && filteredVocab.every(item => selectedSet.has(item));

  function toggleItem(item: VocabItem) {
    if (selectedSet.has(item)) selectedSet.delete(item);
    else selectedSet.add(item);
    selectedSet = selectedSet;
  }

  function toggleFiltered() {
    if (allFilteredSelected) {
      filteredVocab.forEach(item => selectedSet.delete(item));
    } else {
      filteredVocab.forEach(item => selectedSet.add(item));
    }
    selectedSet = selectedSet;
  }

  function clearSelection() {
    selectedSet.clear();
    selectedSet = selectedSet;
  }

  function practice(mode: QuizMode) {
    if (!selectedSet.size) return;
    sessionStorage.setItem('smartquiz_custom_vocab', JSON.stringify([...selectedSet]));
    goto(buildQuizUrl(courseId, mode, lessonId));
  }

  function goBack() {
    goto(`${base}/course/${courseId}/lesson/${lessonId}`);
  }

  // Delay hasAudio to onMount so SSR and initial hydration both render without speak buttons
  let hasAudio = false;
  onMount(() => {
    hasAudio = 'speechSynthesis' in window;
  });
</script>

<svelte:head>
  <title>Vocabulary - {lessonData?.title || 'Lesson'} | {course?.metadata.title || 'Smart Quiz'}</title>
</svelte:head>

{#if lessonData && course}
  <div class="vocab-page" class:has-bar={selectedSet.size > 0}>
    <div class="page-header">
      <button class="back-button" on:click={goBack}>
        ← Back to Lesson
      </button>
      <h2>📚 Vocabulary - Bài {lessonData.lessonNumber}</h2>
      <p class="subtitle">{lessonData.title}</p>
      <p class="word-count">{vocabulary.length} từ vựng</p>
    </div>

    <!-- Controls -->
    <div class="controls">
      <div class="search-box">
        <input
          type="text"
          placeholder="Search Japanese, Kana, Vietnamese, English..."
          bind:value={searchTerm}
          class="search-input"
        />
        {#if searchTerm}
          <button class="clear-search" on:click={() => searchTerm = ''}>✕</button>
        {/if}
      </div>

      <div class="filter-controls">
        <select bind:value={filterType} class="filter-select">
          <option value="all">All types</option>
          <option value="main">Main</option>
          <option value="additional">Additional</option>
          <option value="kanji">Kanji</option>
          <option value="supplementary">Supplementary</option>
        </select>
      </div>
    </div>

    <!-- Selection bar -->
    <div class="selection-bar">
      <button class="btn-select-all" on:click={toggleFiltered}>
        <span class="checkbox-icon">{allFilteredSelected ? '☑' : '☐'}</span>
        {allFilteredSelected ? 'Bỏ chọn' : 'Chọn tất cả'}
        {#if filterType !== 'all'}({filterType}){/if}
        ({filteredVocab.length})
      </button>

      {#if selectedSet.size > 0}
        <span class="selected-info">{selectedSet.size} đã chọn</span>
        <button class="btn-clear-sel" on:click={clearSelection}>Xóa chọn</button>
      {/if}

      <span class="results-count">
        {#if searchTerm || filterType !== 'all'}
          {filteredVocab.length} / {vocabulary.length} từ
        {:else}
          {vocabulary.length} từ
        {/if}
      </span>
    </div>

    <!-- Vocabulary Cards -->
    <div class="vocab-list">
      {#each filteredVocab as item, index}
        <!-- Checkbox + index share one grid cell (.vocab-index-wrap) so grid layout is unchanged -->
        <div
          class="vocab-card"
          class:selected={selectedSet.has(item)}
          on:click={() => toggleItem(item)}
          role="checkbox"
          aria-checked={selectedSet.has(item)}
          tabindex="0"
          on:keydown={(e) => e.key === ' ' && (e.preventDefault(), toggleItem(item))}
        >
          <div class="vocab-index-wrap">
            <input
              type="checkbox"
              class="vocab-checkbox"
              checked={selectedSet.has(item)}
              on:click|stopPropagation
              on:change={() => toggleItem(item)}
            />
            <span class="vocab-index">{index + 1}</span>
          </div>
          <div class="vocab-main">
            <div class="vocab-japanese">{item.japanese}</div>
            {#if item.kana && item.kana !== item.japanese}
              <div class="vocab-kana">{item.kana}</div>
            {/if}
            <div class="vocab-romaji" aria-hidden="true">{kanaToRomaji(item.kana)}</div>
          </div>
          <div class="vocab-meanings">
            <div class="vocab-vietnamese">{item.vietnamese}</div>
            <div class="vocab-english">{item.english}</div>
          </div>
          <div class="vocab-meta">
            <span class="type-badge type-{item.type}">{item.type}</span>
            {#if hasAudio}
              <button class="btn-speak" on:click|stopPropagation={() => playJapaneseAudio(item.kana || item.japanese)} title="Listen">
                🔊
              </button>
            {/if}
          </div>
          {#if item.example}
            <div class="vocab-example">
              <span class="example-label">Ex:</span> {item.example}
            </div>
          {/if}
        </div>
      {/each}

      {#if filteredVocab.length === 0}
        <div class="empty-state">
          No vocabulary found matching "{searchTerm}"
        </div>
      {/if}
    </div>
  </div>
{:else}
  <div class="error-state">
    <h2>Lesson Not Found</h2>
    <p>The lesson you're looking for doesn't exist.</p>
    <button class="btn-back" on:click={() => goto(`${base}/courses`)}>Back to Courses</button>
  </div>
{/if}

<!-- Practice bar (fixed at bottom when words are selected) -->
{#if selectedSet.size > 0}
  <div class="practice-bar">
    <span class="practice-count"><strong>{selectedSet.size}</strong> từ</span>
    <div class="practice-actions">
      <button class="btn-practice" on:click={() => practice('flashcard')}>🎴 Flashcard</button>
      <button class="btn-practice" on:click={() => practice('multiple-choice')}>✓ Trắc nghiệm</button>
      <button class="btn-practice" on:click={() => practice('typing')}>⌨️ Nhập chữ</button>
    </div>
    <button class="btn-dismiss" on:click={clearSelection} title="Bỏ chọn tất cả">✕</button>
  </div>
{/if}

<style>
  .vocab-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
    animation: fadeIn 0.25s ease;
  }

  .vocab-page.has-bar {
    padding-bottom: 5rem;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .page-header {
    text-align: center;
    margin-bottom: 1.5rem;
    position: relative;
  }

  .back-button {
    position: absolute;
    top: 0;
    left: 0;
    background: var(--card-bg);
    border: 1px solid var(--border);
    color: var(--text);
    padding: 0.5rem 1rem;
    border-radius: var(--radius);
    cursor: pointer;
    font-size: 0.85rem;
    transition: all 0.2s ease;
  }

  .back-button:hover {
    background: var(--hover-bg);
    border-color: var(--primary);
  }

  .page-header h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--text);
  }

  .subtitle {
    color: var(--text-muted);
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }

  .word-count {
    color: var(--primary);
    font-size: 0.9rem;
    font-weight: 600;
  }

  .controls {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
  }

  .search-box {
    flex: 1;
    min-width: 200px;
    position: relative;
  }

  .search-input {
    width: 100%;
    padding: 0.65rem 2.5rem 0.65rem 0.75rem;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    font-size: 0.9rem;
    background: var(--card-bg);
    color: var(--text);
    transition: border-color 0.2s ease;
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
    padding: 0.25rem 0.5rem;
    font-size: 1rem;
  }

  .clear-search:hover { color: var(--text); }

  .filter-select {
    padding: 0.65rem;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--card-bg);
    color: var(--text);
    font-size: 0.9rem;
    cursor: pointer;
  }

  /* Selection bar */
  .selection-bar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
    font-size: 0.85rem;
  }

  .btn-select-all {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.3rem 0.7rem;
    background: transparent;
    border: 1.5px solid var(--border);
    border-radius: var(--radius);
    cursor: pointer;
    font-size: 0.83rem;
    color: var(--text);
    transition: all 0.2s ease;
  }

  .btn-select-all:hover {
    border-color: var(--primary);
    color: var(--primary);
  }

  .checkbox-icon {
    font-size: 1rem;
    line-height: 1;
  }

  .selected-info {
    font-weight: 600;
    color: var(--primary);
  }

  .btn-clear-sel {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    font-size: 0.83rem;
    text-decoration: underline;
    padding: 0;
  }

  .btn-clear-sel:hover { color: var(--danger, #e53e3e); }

  .results-count {
    margin-left: auto;
    color: var(--text-muted);
    font-size: 0.82rem;
  }

  /* Vocab list */
  .vocab-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  /* Keep original 3-col grid; checkbox is inside vocab-index-wrap (col 1) */
  .vocab-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1rem;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 1rem;
    align-items: start;
    transition: all 0.2s ease;
    cursor: pointer;
    user-select: none;
  }

  .vocab-card:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border-color: var(--primary);
  }

  .vocab-card.selected {
    border-color: var(--primary);
    background: color-mix(in srgb, var(--primary) 6%, var(--card-bg));
  }

  /* Checkbox + circle index stacked vertically in col 1 */
  .vocab-index-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
  }

  .vocab-checkbox {
    width: 1rem;
    height: 1rem;
    cursor: pointer;
    accent-color: var(--primary);
    flex-shrink: 0;
  }

  .vocab-index {
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary);
    color: white;
    border-radius: 50%;
    font-size: 0.75rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  .vocab-main {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .vocab-japanese {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text);
  }

  .vocab-kana {
    font-size: 0.95rem;
    color: var(--text-muted);
  }

  .vocab-romaji {
    font-size: 0.8rem;
    color: var(--text-muted);
    font-style: italic;
  }

  .vocab-meanings {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .vocab-vietnamese {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text);
  }

  .vocab-english {
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  .vocab-meta {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-end;
  }

  .type-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .type-main { background: var(--primary); color: white; }
  .type-additional { background: var(--accent); color: white; }
  .type-kanji { background: var(--success); color: white; }
  .type-supplementary { background: var(--text-muted); color: white; }

  .btn-speak {
    background: none;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s ease;
  }

  .btn-speak:hover {
    background: var(--hover-bg);
    border-color: var(--primary);
  }

  .vocab-example {
    grid-column: 2 / -1;
    padding: 0.75rem;
    background: var(--hover-bg);
    border-radius: var(--radius);
    font-size: 0.9rem;
    color: var(--text);
    margin-top: 0.5rem;
  }

  .example-label {
    font-weight: 600;
    color: var(--primary);
  }

  /* Practice bar */
  .practice-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--card-bg);
    border-top: 2px solid var(--primary);
    padding: 0.65rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    z-index: 100;
    box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.12);
  }

  .practice-count {
    font-size: 0.9rem;
    white-space: nowrap;
    color: var(--text-muted);
  }

  .practice-count strong {
    color: var(--primary);
    font-size: 1rem;
  }

  .practice-actions {
    display: flex;
    gap: 0.5rem;
    flex: 1;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-practice {
    padding: 0.45rem 0.9rem;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: var(--radius);
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 600;
    transition: filter 0.2s;
    white-space: nowrap;
  }

  .btn-practice:hover { filter: brightness(0.9); }

  .btn-dismiss {
    background: none;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.3rem 0.5rem;
    cursor: pointer;
    color: var(--text-muted);
    font-size: 0.9rem;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .btn-dismiss:hover {
    border-color: var(--danger, #e53e3e);
    color: var(--danger, #e53e3e);
  }

  .empty-state {
    text-align: center;
    padding: 3rem 1rem;
    color: var(--text-muted);
    font-size: 1rem;
  }

  .error-state {
    text-align: center;
    padding: 3rem 1.5rem;
  }

  .error-state h2 { margin-bottom: 1rem; }

  .error-state p {
    color: var(--text-muted);
    margin-bottom: 1.5rem;
  }

  .btn-back {
    background: var(--primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius);
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: filter 0.2s;
  }

  .btn-back:hover { filter: brightness(0.9); }

  @media (max-width: 768px) {
    .vocab-card {
      grid-template-columns: auto 1fr;
      gap: 0.75rem;
    }

    .vocab-meta {
      grid-column: 2;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .vocab-example {
      grid-column: 1 / -1;
    }

    .back-button {
      position: static;
      margin-bottom: 1rem;
    }

    .practice-bar {
      flex-wrap: wrap;
      padding: 0.5rem 0.75rem;
    }

    .practice-actions {
      order: -1;
      width: 100%;
    }

    .btn-practice {
      flex: 1;
      font-size: 0.8rem;
      padding: 0.4rem 0.5rem;
    }
  }
</style>
