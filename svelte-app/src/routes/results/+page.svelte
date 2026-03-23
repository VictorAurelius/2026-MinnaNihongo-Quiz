<script lang="ts">
  /**
   * Results Page
   * Shows quiz results with score, time, retry options
   */

  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { quizStore, startQuiz, resetQuiz } from '$lib/stores';
  import { calculateStats, formatDuration, generateQuestions } from '$lib/utils/quizUtils';
  import { buildQuizUrl } from '$lib/utils/courseUtils';
  import { getCourse } from '$lib/data/courses';
  import type { CourseId } from '$lib/types/course';
  import Button from '$lib/components/common/Button.svelte';
  import Card from '$lib/components/common/Card.svelte';

  $: stats = calculateStats($quizStore.score, $quizStore.questions.length);
  $: duration = $quizStore.endTime
    ? formatDuration($quizStore.endTime - $quizStore.startTime)
    : '0:00';
  $: wrongCount = $quizStore.wrongItems.length;
  $: courseId = $quizStore.courseId as CourseId;

  function retryAll() {
    const course = getCourse(courseId);
    const lessonData = course?.getLessonData($quizStore.lessonNumber);
    if (!lessonData) return;

    const questions = generateQuestions(lessonData.vocabulary, $quizStore.direction);
    startQuiz($quizStore.mode, $quizStore.direction, courseId, $quizStore.lessonNumber, questions);
    goto(`${base}/quiz/${$quizStore.mode}?course=${courseId}&lesson=${$quizStore.lessonNumber}&direction=${$quizStore.direction}`);
  }

  function retryWrong() {
    const wrongVocabItems = $quizStore.wrongItems.map(q => q.item);
    if (wrongVocabItems.length === 0) return;

    const questions = generateQuestions(wrongVocabItems as any, $quizStore.direction);
    startQuiz($quizStore.mode, $quizStore.direction, courseId, $quizStore.lessonNumber, questions);
    goto(`${base}/quiz/${$quizStore.mode}?course=${courseId}&lesson=${$quizStore.lessonNumber}&direction=${$quizStore.direction}`);
  }

  function backToLesson() {
    const cid = courseId;
    const lid = $quizStore.lessonNumber;
    resetQuiz();
    goto(`${base}/course/${cid}/lesson/${lid}`);
  }

  function backToHome() {
    resetQuiz();
    goto(`${base}/`);
  }

  // Calculate stroke-dasharray for circular progress
  $: strokeDasharray = `${stats.percentage}, 100`;
</script>

<svelte:head>
  <title>Quiz Results - Smart Quiz</title>
</svelte:head>

<div class="results-container">
  <Card padding="lg">
    <h2 class="results-title">Quiz Complete!</h2>

    <!-- Score Circle -->
    <div class="results-score-circle">
      <svg class="score-ring" viewBox="0 0 36 36">
        <circle
          class="score-ring-bg"
          cx="18"
          cy="18"
          r="15.915"
        />
        <circle
          class="score-ring-fill"
          cx="18"
          cy="18"
          r="15.915"
          style="stroke-dasharray: {strokeDasharray}"
        />
      </svg>
      <div class="score-percent">
        {stats.percentage}%
      </div>
    </div>

    <div class="results-detail">
      <p><strong>Score:</strong> {stats.correct} / {stats.total}</p>
      <p><strong>Grade:</strong> {stats.grade}</p>
      <p><strong>Time:</strong> {duration}</p>
      {#if wrongCount > 0}
        <p><strong>Wrong:</strong> {wrongCount} questions</p>
      {/if}
    </div>

    <!-- Feedback Message -->
    <div class="results-message">
      {#if stats.percentage === 100}
        🎉 Perfect score! Excellent work!
      {:else if stats.percentage >= 80}
        👍 Great job! Keep it up!
      {:else if stats.percentage >= 60}
        💪 Good effort! Practice makes perfect.
      {:else}
        📚 Keep practicing! You'll get better.
      {/if}
    </div>

    <!-- Action Buttons -->
    <div class="results-actions">
      {#if wrongCount > 0}
        <Button variant="accent" size="lg" on:click={retryWrong}>
          📝 Retry {wrongCount} Wrong Items
        </Button>
      {/if}

      <Button variant="primary" size="lg" on:click={retryAll}>
        🔄 Retry All
      </Button>

      <Button variant="outline" on:click={backToLesson}>
        ← Back to Lesson
      </Button>

      <Button variant="outline" on:click={backToHome}>
        🏠 Home
      </Button>
    </div>
  </Card>
</div>

<style>
  .results-container {
    max-width: 500px;
    margin: 0 auto;
    animation: fadeIn 0.25s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .results-title {
    font-size: 1.4rem;
    text-align: center;
    margin-bottom: 1.25rem;
  }

  .results-score-circle {
    position: relative;
    width: 130px;
    height: 130px;
    margin: 0 auto 1rem;
  }

  .score-ring {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }

  .score-ring-bg {
    fill: none;
    stroke: var(--border);
    stroke-width: 3;
  }

  .score-ring-fill {
    fill: none;
    stroke: var(--success);
    stroke-width: 3;
    stroke-linecap: round;
    transition: stroke-dasharray 0.8s ease;
  }

  .score-percent {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--text);
  }

  .results-detail {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .results-detail p {
    margin: 0.5rem 0;
    font-size: 1rem;
    color: var(--text);
  }

  .results-message {
    text-align: center;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--primary);
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: var(--bg);
    border-radius: var(--radius-sm);
  }

  .results-actions {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
</style>
