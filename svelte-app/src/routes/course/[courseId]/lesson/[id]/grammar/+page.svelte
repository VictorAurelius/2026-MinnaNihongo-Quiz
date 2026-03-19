<script lang="ts">
  /**
   * Course Grammar Patterns Page
   * Shows all grammar patterns for a specific lesson in a course
   */

  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { getCourse } from '$lib/data/courses';
  import type { CourseId } from '$lib/types/course';
  import type { GrammarItem } from '$lib/types';

  let searchTerm = '';
  let expandedIndex: number | null = null;

  $: courseId = $page.params.courseId as CourseId;
  $: lessonId = parseInt($page.params.id || '0');
  $: course = getCourse(courseId);
  $: lessonData = course?.getLessonData(lessonId);
  $: grammar = lessonData?.grammar || [];

  $: filteredGrammar = grammar.filter(item => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      item.pattern.toLowerCase().includes(search) ||
      item.vietnamese.toLowerCase().includes(search) ||
      item.english.toLowerCase().includes(search) ||
      item.explanation.toLowerCase().includes(search)
    );
  });

  function toggleExpand(index: number) {
    expandedIndex = expandedIndex === index ? null : index;
  }

  function goBack() {
    goto(`${base}/course/${courseId}/lesson/${lessonId}`);
  }
</script>

<svelte:head>
  <title>Grammar - {lessonData?.title || 'Lesson'} | {course?.metadata.title || 'Smart Quiz'}</title>
</svelte:head>

{#if lessonData && course}
  <div class="grammar-page">
    <div class="page-header">
      <button class="back-button" on:click={goBack}>
        ← Back to Lesson
      </button>
      <h2>📖 Grammar - Bài {lessonData.lessonNumber}</h2>
      <p class="subtitle">{lessonData.title}</p>
      <p class="pattern-count">{grammar.length} ngữ pháp</p>
    </div>

    <!-- Search -->
    <div class="controls">
      <div class="search-box">
        <input
          type="text"
          placeholder="Search patterns, meanings..."
          bind:value={searchTerm}
          class="search-input"
        />
        {#if searchTerm}
          <button class="clear-search" on:click={() => searchTerm = ''}>✕</button>
        {/if}
      </div>
    </div>

    {#if searchTerm}
      <div class="results-info">
        <p>Showing <strong>{filteredGrammar.length}</strong> of {grammar.length} patterns</p>
      </div>
    {/if}

    <!-- Grammar Cards -->
    <div class="grammar-list">
      {#each filteredGrammar as item, index}
        <div class="grammar-card" class:expanded={expandedIndex === index}>
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div class="grammar-header" on:click={() => toggleExpand(index)}>
            <div class="grammar-main">
              <div class="grammar-pattern">{item.pattern}</div>
              <div class="grammar-vietnamese">{item.vietnamese}</div>
              <div class="grammar-english">{item.english}</div>
            </div>
            <div class="grammar-meta">
              <span class="type-badge type-{item.type}">{item.type}</span>
              <span class="expand-icon">{expandedIndex === index ? '▲' : '▼'}</span>
            </div>
          </div>

          {#if expandedIndex === index}
            <div class="grammar-details">
              <div class="explanation-section">
                <h4>Explanation:</h4>
                <p>{item.explanation}</p>
              </div>

              {#if item.examples && item.examples.length > 0}
                <div class="examples-section">
                  <h4>Examples:</h4>
                  {#each item.examples as example}
                    <div class="example-item">
                      <div class="example-japanese">{example.japanese}</div>
                      <div class="example-vietnamese">{example.vietnamese}</div>
                      <div class="example-english">{example.english}</div>
                    </div>
                  {/each}
                </div>
              {/if}
            </div>
          {/if}
        </div>
      {/each}

      {#if filteredGrammar.length === 0}
        <div class="empty-state">
          No grammar patterns found matching "{searchTerm}"
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
  .grammar-page {
    max-width: 900px;
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

  .pattern-count {
    color: var(--primary);
    font-size: 0.9rem;
    font-weight: 600;
  }

  .controls {
    margin-bottom: 1rem;
  }

  .search-box {
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

  .grammar-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .grammar-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    transition: all 0.2s ease;
  }

  .grammar-card:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border-color: var(--primary);
  }

  .grammar-card.expanded {
    border-color: var(--primary);
  }

  .grammar-header {
    padding: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 1rem;
  }

  .grammar-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .grammar-pattern {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--primary);
  }

  .grammar-vietnamese {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text);
  }

  .grammar-english {
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  .grammar-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
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

  .expand-icon {
    color: var(--text-muted);
    font-size: 0.85rem;
  }

  .grammar-details {
    padding: 0 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .explanation-section,
  .examples-section {
    padding: 1rem;
    background: var(--hover-bg);
    border-radius: var(--radius);
  }

  .explanation-section h4,
  .examples-section h4 {
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--primary);
    margin: 0 0 0.75rem 0;
  }

  .explanation-section p {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--text);
    margin: 0;
  }

  .example-item {
    padding: 0.75rem;
    background: var(--card-bg);
    border-radius: var(--radius);
    margin-bottom: 0.75rem;
  }

  .example-item:last-child {
    margin-bottom: 0;
  }

  .example-japanese {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 0.35rem;
  }

  .example-vietnamese {
    font-size: 0.9rem;
    color: var(--text);
    margin-bottom: 0.25rem;
  }

  .example-english {
    font-size: 0.85rem;
    color: var(--text-muted);
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
    .grammar-header {
      flex-direction: column;
      align-items: stretch;
    }

    .grammar-meta {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .back-button {
      position: static;
      margin-bottom: 1rem;
    }
  }
</style>
