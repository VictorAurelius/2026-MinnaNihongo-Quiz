<script lang="ts">
  /**
   * Home Page - Lesson Selection
   * Displays all available JLPT lessons in a grid
   */

  import { getLessonMetadata } from '$lib/data/minna/lessons';
  import Card from '$lib/components/common/Card.svelte';
  import { goto } from '$app/navigation';

  const lessons = getLessonMetadata();

  // Track active course (JLPT vs HSK)
  let activeCourse: 'jlpt' | 'hsk' = 'jlpt';

  function handleLessonClick(lessonNumber: number) {
    goto(`/lesson/${lessonNumber}`);
  }
</script>

<svelte:head>
  <title>Smart Quiz - Japanese & Chinese Learning</title>
</svelte:head>

<div class="home">
  <div class="screen-heading">
    <h2>Choose a Lesson</h2>
    <p class="text-muted">
      Select a lesson to practice vocabulary and grammar
    </p>
  </div>

  <!-- Course Selector Tabs -->
  <div class="course-tabs">
    <button
      class="course-tab"
      class:active={activeCourse === 'jlpt'}
      on:click={() => activeCourse = 'jlpt'}
    >
      <div class="course-tab-flag">🇯🇵</div>
      <div class="course-tab-label">JLPT</div>
      <div class="course-tab-sub">Minna no Nihongo</div>
    </button>

    <button
      class="course-tab"
      class:active={activeCourse === 'hsk'}
      on:click={() => activeCourse = 'hsk'}
    >
      <div class="course-tab-flag">🇨🇳</div>
      <div class="course-tab-label">HSK</div>
      <div class="course-tab-sub">Chinese Vocabulary</div>
    </button>
  </div>

  <!-- JLPT Lessons -->
  {#if activeCourse === 'jlpt'}
    <div class="lesson-grid">
      {#each lessons as lesson}
        <Card hover clickable on:click={() => handleLessonClick(lesson.lessonNumber)}>
          <div class="lesson-number">Bài {lesson.lessonNumber}</div>
          <div class="lesson-title">{lesson.title}</div>
          <div class="lesson-meta">
            {lesson.vocabCount} từ • {lesson.grammarCount} ngữ pháp
          </div>
          <div class="lesson-progress-bar">
            <div class="fill" style="width: 0%"></div>
          </div>
        </Card>
      {/each}
    </div>
  {/if}

  <!-- HSK Coming Soon -->
  {#if activeCourse === 'hsk'}
    <div class="hsk-coming-soon">
      <div class="hsk-coming-soon-icon">🚧</div>
      <h3>HSK Vocabulary Coming Soon</h3>
      <p>
        We're working on adding HSK vocabulary lessons.<br />
        Check back later for Chinese language learning content!
      </p>
    </div>
  {/if}
</div>

<style>
  .home {
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

  .screen-heading h2 {
    font-size: 1.35rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .lesson-number {
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--primary);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 0.25rem;
  }

  .lesson-title {
    font-size: 0.95rem;
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 0.4rem;
  }

  .lesson-meta {
    font-size: 0.78rem;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
  }

  .lesson-progress-bar {
    height: 4px;
    background: var(--border);
    border-radius: 2px;
    overflow: hidden;
  }

  .lesson-progress-bar .fill {
    height: 100%;
    background: var(--success);
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  @media (max-width: 600px) {
    .lesson-grid {
      grid-template-columns: 1fr 1fr;
      gap: 0.6rem;
    }

    .screen-heading h2 {
      font-size: 1.15rem;
    }

    .lesson-title {
      font-size: 0.85rem;
    }
  }

  @media (max-width: 380px) {
    .lesson-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
