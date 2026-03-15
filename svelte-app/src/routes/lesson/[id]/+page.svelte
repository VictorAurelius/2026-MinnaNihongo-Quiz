<script lang="ts">
  /**
   * Lesson Menu Page
   * Shows quiz mode options for a specific lesson
   */

  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { getLessonData } from '$lib/data/minna/lessons';
  import Button from '$lib/components/common/Button.svelte';
  import Card from '$lib/components/common/Card.svelte';

  $: lessonId = parseInt($page.params.id || '0');
  $: lessonData = lessonId > 0 ? getLessonData(lessonId) : null;

  function startQuiz(mode: 'flashcard' | 'multiple-choice' | 'typing') {
    goto(`/quiz/${mode}?lesson=${lessonId}`);
  }

  function viewVocabulary() {
    goto(`/lesson/${lessonId}/vocabulary`);
  }

  function viewGrammar() {
    goto(`/lesson/${lessonId}/grammar`);
  }
</script>

<svelte:head>
  <title>{lessonData?.title || 'Lesson'} - Smart Quiz</title>
</svelte:head>

{#if lessonData}
  <div class="lesson-menu">
    <div class="lesson-header">
      <div class="lesson-number-badge">Bài {lessonData.lessonNumber}</div>
      <h2 class="lesson-title-large">{lessonData.title}</h2>
      <div class="lesson-stats">
        <span>{lessonData.vocabulary.length} từ vựng</span>
        <span>•</span>
        <span>{lessonData.grammar.length} ngữ pháp</span>
      </div>
    </div>

    <div class="menu-actions">
      <h3 class="section-title">📝 Quiz Modes</h3>

      <Button
        variant="primary"
        size="lg"
        icon="🎴"
        on:click={() => startQuiz('flashcard')}
      >
        Flashcard Quiz
      </Button>

      <Button
        variant="accent"
        size="lg"
        icon="✓"
        on:click={() => startQuiz('multiple-choice')}
      >
        Multiple Choice
      </Button>

      <Button
        variant="success"
        size="lg"
        icon="⌨️"
        on:click={() => startQuiz('typing')}
      >
        Typing Quiz
      </Button>

      <div class="menu-section-divider">
        <hr class="menu-divider-line" />
        <span class="menu-divider-text">Study Materials</span>
        <hr class="menu-divider-line" />
      </div>

      <Button
        variant="outline"
        size="md"
        icon="📚"
        on:click={viewVocabulary}
      >
        View Vocabulary List
      </Button>

      <Button
        variant="outline"
        size="md"
        icon="📖"
        on:click={viewGrammar}
      >
        View Grammar Patterns
      </Button>
    </div>
  </div>
{:else}
  <div class="error-state">
    <h2>Lesson Not Found</h2>
    <p>The lesson you're looking for doesn't exist.</p>
    <Button variant="primary" on:click={() => goto('/')}>
      Back to Home
    </Button>
  </div>
{/if}

<style>
  .lesson-menu {
    max-width: 500px;
    margin: 0 auto;
    animation: fadeIn 0.25s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .lesson-header {
    text-align: center;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    border-radius: var(--radius);
    color: #fff;
  }

  .lesson-number-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.75rem;
  }

  .lesson-title-large {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 0.75rem 0;
  }

  .lesson-stats {
    font-size: 0.9rem;
    opacity: 0.9;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
  }

  .menu-actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .section-title {
    font-size: 1.05rem;
    font-weight: 700;
    margin: 0.5rem 0;
    color: var(--text);
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

  @media (max-width: 600px) {
    .lesson-header {
      padding: 1rem;
    }

    .lesson-title-large {
      font-size: 1.25rem;
    }
  }
</style>
