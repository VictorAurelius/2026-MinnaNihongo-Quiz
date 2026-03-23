<script lang="ts">
  /**
   * Kanji Home Page - Lesson Selection Grid
   */

  import { getKanjiLessonMetadata } from '$lib/data/kanji/lessons';
  import Card from '$lib/components/common/Card.svelte';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';

  const lessons = getKanjiLessonMetadata();

  function handleLessonClick(lessonNumber: number) {
    goto(`${base}/kanji/${lessonNumber}`);
  }
</script>

<svelte:head>
  <title>Kanji - Minna no Nihongo | Smart Quiz</title>
</svelte:head>

<div class="kanji-home">
  <div class="screen-heading">
    <h2>Kanji - Minna no Nihongo</h2>
    <p class="text-muted">
      Select a lesson to study kanji
    </p>
  </div>

  <div class="lesson-grid">
    {#each lessons as lesson}
      <Card hover clickable on:click={() => handleLessonClick(lesson.lessonNumber)}>
        <div class="lesson-number">Bài {lesson.lessonNumber}</div>
        <div class="lesson-title">{lesson.title}</div>
        <div class="lesson-meta">
          {lesson.kanjiCount} kanji
        </div>
        <div class="lesson-progress-bar">
          <div class="fill" style="width: 0%"></div>
        </div>
      </Card>
    {/each}
  </div>
</div>

<style>
  .kanji-home {
    animation: fadeIn 0.25s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
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
    font-family: var(--font-jp);
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
