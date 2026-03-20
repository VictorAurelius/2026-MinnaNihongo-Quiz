<script lang="ts">
  /**
   * Quiz Page - Handles all quiz modes (flashcard, multiple-choice, typing)
   */

  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { getCourse } from '$lib/data/courses';
  import { parseCourseFromUrl } from '$lib/utils/courseUtils';
  import { quizStore, startQuiz, answerCorrect, answerWrong, nextQuestion, isComplete, progress, currentQuestion } from '$lib/stores';
  import { generateQuestions, generateMCOptions } from '$lib/utils/quizUtils';
  import FlashCard from '$lib/components/quiz/FlashCard.svelte';
  import MultipleChoice from '$lib/components/quiz/MultipleChoice.svelte';
  import TypingQuiz from '$lib/components/quiz/TypingQuiz.svelte';
  import ProgressBar from '$lib/components/common/ProgressBar.svelte';
  import type { QuizMode, QuizDirection, CourseId } from '$lib/types';

  $: mode = $page.params.mode as QuizMode;
  $: courseId = parseCourseFromUrl($page.url.searchParams);
  $: lessonId = parseInt($page.url.searchParams.get('lesson') || '0');
  $: direction = ($page.url.searchParams.get('direction') || 'ja-vi') as QuizDirection;

  $: course = getCourse(courseId);
  $: lessonData = course?.getLessonData(lessonId) ?? null;

  let mcOptions: string[] = [];
  let flipped = false;

  onMount(() => {
    if (!lessonData) {
      goto(`${base}/`);
      return;
    }

    // Generate questions
    const questions = generateQuestions(lessonData.vocabulary, direction);
    startQuiz(mode, direction, courseId, lessonId, questions);
  });

  function handleCorrect(event: CustomEvent) {
    answerCorrect();
    flipped = false;

    // Check if quiz is complete
    setTimeout(() => {
      if ($isComplete) {
        goto(`${base}/results`);
      }
    }, 300);
  }

  function handleWrong(event: CustomEvent) {
    answerWrong();
    flipped = false;

    // Check if quiz is complete
    setTimeout(() => {
      if ($isComplete) {
        goto(`${base}/results`);
      }
    }, 300);
  }

  // Generate MC options when question changes
  $: if ($currentQuestion && mode === 'multiple-choice' && lessonData) {
    mcOptions = generateMCOptions(
      $currentQuestion.answer,
      lessonData.vocabulary,
      direction,
      4
    );
  }
</script>

<svelte:head>
  <title>Quiz - {lessonData?.title || 'Smart Quiz'}</title>
</svelte:head>

{#if lessonData && $currentQuestion}
  <div class="quiz-container">
    <!-- Progress Bar -->
    <ProgressBar
      current={$progress.current}
      total={$progress.total}
      showText={true}
    />

    <!-- Quiz Mode Rendering -->
    {#if mode === 'flashcard' && 'japanese' in $currentQuestion.item}
      <FlashCard
        item={$currentQuestion.item}
        bind:flipped
        on:correct={handleCorrect}
        on:wrong={handleWrong}
      />
    {:else if mode === 'multiple-choice' && 'japanese' in $currentQuestion.item}
      <MultipleChoice
        question={$currentQuestion.item}
        options={mcOptions}
        answer={$currentQuestion.answer}
        on:correct={handleCorrect}
        on:wrong={handleWrong}
      />
    {:else if mode === 'typing' && 'japanese' in $currentQuestion.item}
      <TypingQuiz
        question={$currentQuestion.item}
        answer={$currentQuestion.answer}
        isRomaji={direction === 'ja-romaji' || direction === 'vi-romaji'}
        on:correct={handleCorrect}
        on:wrong={handleWrong}
      />
    {/if}
  </div>
{:else}
  <div class="loading">
    <p>Loading quiz...</p>
  </div>
{/if}

<style>
  .quiz-container {
    max-width: 600px;
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

  .loading {
    text-align: center;
    padding: 3rem;
    color: var(--text-muted);
  }
</style>
