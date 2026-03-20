<script lang="ts">
  /**
   * Course Lesson Menu
   * Shows quiz modes with direction selector, and study materials
   */

  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { getCourse } from '$lib/data/courses';
  import { buildQuizUrl, buildVocabularyUrl, buildGrammarUrl } from '$lib/utils/courseUtils';
  import type { CourseId } from '$lib/types/course';
  import type { QuizDirection } from '$lib/types';
  import Button from '$lib/components/common/Button.svelte';

  $: courseId = $page.params.courseId as CourseId;
  $: lessonId = parseInt($page.params.id || '0');
  $: course = getCourse(courseId);
  $: lesson = course?.getLessonData(lessonId);

  // Direction selector state
  let selectedDirection: QuizDirection = 'ja-vi';

  const directions: { value: QuizDirection; label: string; icon: string }[] = [
    { value: 'ja-vi', label: 'JP → VN', icon: '🇯🇵→🇻🇳' },
    { value: 'vi-ja', label: 'VN → JP', icon: '🇻🇳→🇯🇵' },
    { value: 'ja-en', label: 'JP → EN', icon: '🇯🇵→🇬🇧' },
    { value: 'en-ja', label: 'EN → JP', icon: '🇬🇧→🇯🇵' }
  ];

  function startQuiz(mode: string) {
    goto(buildQuizUrl(courseId, mode, lessonId, selectedDirection));
  }
</script>

<svelte:head>
  <title>{lesson?.title || 'Lesson'} - {course?.metadata.title || 'Smart Quiz'}</title>
</svelte:head>

{#if lesson && course}
  <div class="lesson-menu">
    <!-- Lesson Header -->
    <div class="lesson-header" style="--course-color: {course.metadata.color}">
      <button class="back-button" on:click={() => goto(`${base}/course/${courseId}`)}>
        ← Back to {course.metadata.title}
      </button>
      <div class="lesson-number-badge">Bài {lesson.lessonNumber}</div>
      <h1 class="lesson-title-large">{lesson.title}</h1>
      <div class="lesson-stats">
        <span>{lesson.vocabulary.length} từ vựng</span>
        <span>•</span>
        <span>{lesson.grammar.length} ngữ pháp</span>
      </div>
    </div>

    <!-- Direction Selector -->
    <div class="menu-section">
      <h2 class="section-title">🔄 Quiz Direction</h2>
      <div class="direction-grid">
        {#each directions as dir}
          <button
            class="direction-btn"
            class:active={selectedDirection === dir.value}
            on:click={() => selectedDirection = dir.value}
          >
            <span class="dir-icon">{dir.icon}</span>
            <span class="dir-label">{dir.label}</span>
          </button>
        {/each}
      </div>
    </div>

    <!-- Quiz Modes -->
    <div class="menu-section">
      <h2 class="section-title">📝 Quiz Modes</h2>

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
    </div>

    <!-- Study Materials -->
    <div class="menu-section">
      <h2 class="section-title">📚 Study Materials</h2>

      <Button
        variant="outline"
        size="md"
        icon="📚"
        on:click={() => goto(buildVocabularyUrl(courseId, lessonId))}
      >
        View Vocabulary ({lesson.vocabulary.length})
      </Button>

      <Button
        variant="outline"
        size="md"
        icon="📖"
        on:click={() => goto(buildGrammarUrl(courseId, lessonId))}
      >
        View Grammar ({lesson.grammar.length})
      </Button>
    </div>
  </div>
{:else}
  <div class="error-state">
    <h2>Lesson Not Found</h2>
    <p>The lesson you're looking for doesn't exist.</p>
    <button class="button-primary" on:click={() => goto(`${base}/courses`)}>
      Back to Courses
    </button>
  </div>
{/if}

<style>
  .lesson-menu {
    max-width: 600px;
    margin: 0 auto;
    animation: fadeIn 0.25s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .lesson-header {
    text-align: center;
    padding: 2rem 1.5rem;
    background: linear-gradient(135deg, var(--course-color, var(--primary)), var(--accent));
    border-radius: var(--radius);
    color: white;
    margin-bottom: 2rem;
    position: relative;
  }

  .back-button {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: var(--radius);
    cursor: pointer;
    font-size: 0.85rem;
    transition: background 0.2s ease;
  }

  .back-button:hover {
    background: rgba(255, 255, 255, 0.3);
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
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0 0 0.75rem 0;
  }

  .lesson-stats {
    font-size: 0.95rem;
    opacity: 0.9;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
  }

  .menu-section {
    padding: 0 1rem;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .section-title {
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0 0 0.25rem 0;
    color: var(--text);
  }

  /* Direction Selector */
  .direction-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  .direction-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.6rem 0.75rem;
    background: var(--bg-card);
    border: 2px solid var(--border);
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-family: inherit;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-muted);
    transition: all 0.15s ease;
  }

  .direction-btn:hover {
    border-color: var(--primary);
    color: var(--text);
  }

  .direction-btn.active {
    border-color: var(--primary);
    background: color-mix(in srgb, var(--primary) 12%, var(--bg-card));
    color: var(--primary);
  }

  .dir-icon {
    font-size: 0.75rem;
  }

  .dir-label {
    font-size: 0.85rem;
  }

  .error-state {
    text-align: center;
    padding: 3rem 1.5rem;
  }

  .error-state h2 { margin-bottom: 1rem; }
  .error-state p { color: var(--text-muted); margin-bottom: 1.5rem; }

  .button-primary {
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

  .button-primary:hover { background: var(--primary-hover); }

  @media (max-width: 600px) {
    .lesson-header { padding: 1.5rem 1rem; }
    .lesson-title-large { font-size: 1.35rem; }
    .back-button {
      position: static;
      margin-bottom: 1rem;
      display: block;
      width: fit-content;
    }
  }
</style>
