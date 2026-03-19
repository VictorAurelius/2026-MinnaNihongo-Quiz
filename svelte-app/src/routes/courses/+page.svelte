<script lang="ts">
  /**
   * Course Selection Page
   * Displays all available Japanese courses
   */

  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { getAllCourses } from '$lib/data/courses';
  import Button from '$lib/components/common/Button.svelte';

  const courses = getAllCourses();
</script>

<svelte:head>
  <title>Courses - Smart Quiz</title>
</svelte:head>

<div class="courses-page">
  <div class="page-header">
    <h1>📚 Japanese Courses</h1>
    <p class="subtitle">Select a course to begin studying</p>
  </div>

  <div class="course-grid">
    {#each courses as course}
      <button
        class="course-card"
        style="--course-color: {course.metadata.color}"
        on:click={() => goto(`${base}/course/${course.metadata.id}`)}
      >
        <div class="course-icon">{course.metadata.icon}</div>
        <h2 class="course-title">{course.metadata.title}</h2>
        <p class="course-description">{course.metadata.description}</p>
        <span class="course-level-badge">{course.metadata.level}</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .courses-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
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

  .page-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .page-header h1 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    color: var(--text);
  }

  .subtitle {
    color: var(--text-muted);
    font-size: 1rem;
  }

  .course-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .course-card {
    position: relative;
    padding: 2rem;
    background: var(--card-bg);
    border: 2px solid var(--border);
    border-radius: var(--radius);
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
    overflow: hidden;
  }

  .course-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--course-color, var(--primary));
    opacity: 0.8;
  }

  .course-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    border-color: var(--course-color);
  }

  .course-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .course-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 0.75rem 0;
    color: var(--text);
  }

  .course-description {
    color: var(--text-muted);
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  .course-level-badge {
    display: inline-block;
    padding: 0.35rem 0.75rem;
    background: var(--course-color);
    color: white;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  @media (max-width: 600px) {
    .course-grid {
      grid-template-columns: 1fr;
    }

    .page-header h1 {
      font-size: 1.5rem;
    }
  }
</style>
