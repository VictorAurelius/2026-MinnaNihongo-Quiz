<script lang="ts">
  /**
   * Course Lesson Grid
   * Displays all lessons for a specific course
   */

  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { getCourse } from '$lib/data/courses';
  import { buildLessonUrl } from '$lib/utils/courseUtils';
  import { progressStore } from '$lib/stores';
  import { getLessonMastery, isLessonUnlocked, getNextLesson, getCourseProgress } from '$lib/utils/progressUtils';
  import MasteryRing from '$lib/components/common/MasteryRing.svelte';
  import type { CourseId } from '$lib/types/course';

  $: courseId = $page.params.courseId as CourseId;
  $: course = getCourse(courseId);
  $: lessons = course?.getLessonMetadata() ?? [];
  $: courseProgress = getCourseProgress($progressStore, courseId);
  $: nextLesson = getNextLesson($progressStore, courseId);
</script>

<svelte:head>
  <title>{course?.metadata.title || 'Course'} - Smart Quiz</title>
</svelte:head>

{#if course}
  <div class="lessons-page">
    <!-- Course Header -->
    <div class="course-header" style="--course-color: {course.metadata.color}">
      <button class="back-button" on:click={() => goto(`${base}/courses`)}>
        ← Back to Courses
      </button>
      <div class="course-icon-large">{course.metadata.icon}</div>
      <h1 class="course-title-large">{course.metadata.title}</h1>
      <p class="course-description">{course.metadata.description}</p>
      <div class="course-progress">
        {courseProgress.completed}/{courseProgress.total} lessons mastered ({courseProgress.percentage}%)
      </div>
    </div>

    <!-- Continue Button -->
    <div class="lessons-container">
      <button class="btn btn-primary btn-lg continue-btn" on:click={() => goto(buildLessonUrl(courseId, nextLesson))}>
        Continue — Bài {nextLesson} →
      </button>

      <h2 class="section-title">📖 Lessons</h2>
      <div class="lesson-grid">
        {#each lessons as lesson}
          {@const mastery = getLessonMastery($progressStore, courseId, lesson.lessonNumber)}
          {@const unlocked = isLessonUnlocked($progressStore, courseId, lesson.lessonNumber)}
          <button
            class="lesson-card"
            class:locked={!unlocked}
            disabled={!unlocked}
            on:click={() => unlocked && goto(buildLessonUrl(courseId, lesson.lessonNumber))}
            title={unlocked ? '' : `Complete Bài ${lesson.lessonNumber - 1} first (need 70% mastery)`}
          >
            <div class="lesson-card-header">
              <div class="lesson-number">Bài {lesson.lessonNumber}</div>
              <MasteryRing percentage={mastery} size={40} locked={!unlocked} />
            </div>
            <h3 class="lesson-title">{lesson.title}</h3>
            <div class="lesson-stats">
              <span class="stat">
                <span class="stat-icon">📚</span>
                {lesson.vocabCount} từ
              </span>
              <span class="stat">
                <span class="stat-icon">📖</span>
                {lesson.grammarCount} ngữ pháp
              </span>
            </div>
          </button>
        {/each}
      </div>
    </div>
  </div>
{:else}
  <div class="error-state">
    <h2>Course Not Found</h2>
    <p>The course you're looking for doesn't exist.</p>
    <button class="button-primary" on:click={() => goto(`${base}/courses`)}>
      View All Courses
    </button>
  </div>
{/if}

<style>
  .lessons-page {
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

  .course-header {
    background: linear-gradient(135deg, var(--course-color, var(--primary)), var(--accent));
    color: white;
    padding: 2rem 1rem;
    text-align: center;
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
    font-size: 0.9rem;
    transition: background 0.2s ease;
  }

  .back-button:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .course-icon-large {
    font-size: 4rem;
    margin-bottom: 0.5rem;
  }

  .course-title-large {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
  }

  .course-description {
    font-size: 1rem;
    opacity: 0.9;
  }

  .lessons-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem 2rem;
  }

  .section-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 1.5rem 0;
    color: var(--text);
  }

  .lesson-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }

  .course-progress {
    font-size: 0.9rem;
    opacity: 0.85;
    margin-top: 0.5rem;
  }

  .continue-btn {
    width: 100%;
    margin-bottom: 1.5rem;
  }

  .lesson-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .lesson-card.locked {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .lesson-card.locked:hover {
    transform: none;
    box-shadow: none;
    border-color: var(--border);
  }

  .lesson-card {
    background: var(--card-bg);
    border: 2px solid var(--border);
    border-radius: var(--radius);
    padding: 1.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
  }

  .lesson-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: var(--primary);
  }

  .lesson-number {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: var(--primary);
    color: white;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.75rem;
  }

  .lesson-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    color: var(--text);
    line-height: 1.4;
  }

  .lesson-stats {
    display: flex;
    gap: 1rem;
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  .stat {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .stat-icon {
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

  .button-primary:hover {
    background: var(--primary-hover);
  }

  @media (max-width: 600px) {
    .lesson-grid {
      grid-template-columns: 1fr;
    }

    .course-title-large {
      font-size: 1.5rem;
    }

    .back-button {
      position: static;
      margin-bottom: 1rem;
    }
  }
</style>
