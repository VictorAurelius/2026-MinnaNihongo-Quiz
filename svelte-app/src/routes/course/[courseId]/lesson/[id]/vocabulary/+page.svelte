<script lang="ts">
  /**
   * Course Vocabulary List Page
   * Shows all vocabulary items for a specific lesson in a course
   */

  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { getCourse } from '$lib/data/courses';
  import { kanaToRomaji } from '$lib/utils/kanaUtils';
  import type { CourseId } from '$lib/types/course';
  import type { VocabItem } from '$lib/types';

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

  function speak(text: string, event?: MouseEvent) {
    event?.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  }

  function goBack() {
    goto(`${base}/course/${courseId}/lesson/${lessonId}`);
  }

  const hasAudio = typeof window !== 'undefined' && 'speechSynthesis' in window;
</script>

<svelte:head>
  <title>Vocabulary - {lessonData?.title || 'Lesson'} | {course?.metadata.title || 'Smart Quiz'}</title>
</svelte:head>

{#if lessonData && course}
  <div class="vocab-page">
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

    <div class="results-info">
      {#if searchTerm || filterType !== 'all'}
        <p>Showing <strong>{filteredVocab.length}</strong> of {vocabulary.length} words</p>
      {:else}
        <p>All <strong>{vocabulary.length}</strong> words</p>
      {/if}
    </div>

    <!-- Vocabulary Cards -->
    <div class="vocab-list">
      {#each filteredVocab as item, index}
        <div class="vocab-card">
          <div class="vocab-index">{index + 1}</div>
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
              <button class="btn-speak" on:click={(e) => speak(item.kana, e)} title="Listen">
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

<style>
  .vocab-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
    animation: fadeIn 0.25s ease;
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
    margin-bottom: 1rem;
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

  .clear-search:hover {
    color: var(--text);
  }

  .filter-select {
    padding: 0.65rem;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--card-bg);
    color: var(--text);
    font-size: 0.9rem;
    cursor: pointer;
  }

  .results-info {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  .results-info strong {
    color: var(--primary);
    font-weight: 600;
  }

  .vocab-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

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
  }

  .vocab-card:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border-color: var(--primary);
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

  .type-main {
    background: var(--primary);
    color: white;
  }

  .type-additional {
    background: var(--accent);
    color: white;
  }

  .type-kanji {
    background: var(--success);
    color: white;
  }

  .type-supplementary {
    background: var(--text-muted);
    color: white;
  }

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

  .error-state h2 {
    margin-bottom: 1rem;
  }

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
    transition: background 0.2s ease;
  }

  .btn-back:hover {
    background: var(--primary-hover);
  }

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
  }
</style>
