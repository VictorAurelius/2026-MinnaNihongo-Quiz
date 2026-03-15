<script lang="ts">
  // Home page - Lesson Grid
  import { getLessonMetadata } from '$lib/data/minna/lessons';

  const lessons = getLessonMetadata();
</script>

<svelte:head>
  <title>Smart Quiz - Japanese & Chinese Learning</title>
</svelte:head>

<div class="home">
  <h1>Smart Quiz</h1>
  <p>Master Japanese (JLPT) and Chinese (HSK) vocabulary with interactive quizzes</p>

  <div class="lessons-grid">
    {#each lessons as lesson}
      <div class="lesson-card">
        <h3>Bài {lesson.lessonNumber}</h3>
        <p>{lesson.title}</p>
        <div class="stats">
          <span>{lesson.vocabCount} từ</span>
          <span>{lesson.grammarCount} ngữ pháp</span>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .home {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .lessons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 2rem;
  }

  .lesson-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .lesson-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }

  .stats {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #666;
  }
</style>
