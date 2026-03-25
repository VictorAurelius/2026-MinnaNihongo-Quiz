<script lang="ts">
  /**
   * Kanji Quiz Page - Handles all kanji quiz modes (flashcard, mc, typing)
   */

  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { getKanjiLessonData, getAllKanjiLessons } from '$lib/data/kanji/lessons';
  import { generateKanjiQuestions, generateKanjiMCOptions } from '$lib/utils/kanjiQuizUtils';
  import type { KanjiQuizQuestion, KanjiQuizDirection } from '$lib/utils/kanjiQuizUtils';
  import type { KanjiItem } from '$lib/types';
  import KanjiFlashCard from '$lib/components/kanji/KanjiFlashCard.svelte';
  import KanjiMultipleChoice from '$lib/components/kanji/KanjiMultipleChoice.svelte';
  import KanjiTypingQuiz from '$lib/components/kanji/KanjiTypingQuiz.svelte';
  import ProgressBar from '$lib/components/common/ProgressBar.svelte';
  import SkeletonCard from '$lib/components/common/SkeletonCard.svelte';

  $: mode = $page.params.mode as 'flashcard' | 'mc' | 'typing';
  $: lessonId = parseInt($page.params.lesson || '0');
  $: direction = ($page.url.searchParams.get('direction') || 'kanji-vi') as KanjiQuizDirection;

  $: lessonData = lessonId > 0 ? getKanjiLessonData(lessonId) : null;

  let questions: KanjiQuizQuestion[] = [];
  let currentIndex = 0;
  let score = 0;
  let flipped = false;
  let quizStarted = false;
  let mcOptions: string[] = [];

  // All kanji items for MC option generation (pool from all lessons)
  let allKanjiItems: KanjiItem[] = [];

  $: currentQuestion = questions[currentIndex] || null;
  $: isComplete = quizStarted && currentIndex >= questions.length;
  $: progressCurrent = currentIndex + 1;
  $: progressTotal = questions.length;

  onMount(() => {
    if (!lessonData) {
      goto(`${base}/kanji`);
      return;
    }

    // Gather all kanji for MC option pool
    allKanjiItems = getAllKanjiLessons().flatMap(l => l.kanji);

    // Generate questions
    questions = generateKanjiQuestions(lessonData.kanji, direction);
    quizStarted = true;

    // Generate MC options for first question
    if (mode === 'mc' && questions.length > 0) {
      mcOptions = generateKanjiMCOptions(questions[0].answer, allKanjiItems, direction);
    }
  });

  function handleCorrect() {
    score++;
    advanceQuestion();
  }

  function handleWrong() {
    advanceQuestion();
  }

  function advanceQuestion() {
    flipped = false;
    const nextIdx = currentIndex + 1;

    setTimeout(() => {
      currentIndex = nextIdx;

      // Generate MC options for next question
      if (mode === 'mc' && questions[nextIdx]) {
        mcOptions = generateKanjiMCOptions(questions[nextIdx].answer, allKanjiItems, direction);
      }
    }, 300);
  }

  function restartQuiz() {
    if (!lessonData) return;
    questions = generateKanjiQuestions(lessonData.kanji, direction);
    currentIndex = 0;
    score = 0;
    flipped = false;

    if (mode === 'mc' && questions.length > 0) {
      mcOptions = generateKanjiMCOptions(questions[0].answer, allKanjiItems, direction);
    }
  }

  function goBack() {
    goto(`${base}/kanji/${lessonId}`);
  }
</script>

<svelte:head>
  <title>Kanji Quiz - {lessonData?.title || 'Smart Quiz'}</title>
</svelte:head>

{#if isComplete}
  <div class="results-container">
    <div class="results-card">
      <h2>Quiz Complete!</h2>
      <div class="results-score">
        <span class="score-number">{score}</span>
        <span class="score-divider">/</span>
        <span class="score-total">{questions.length}</span>
      </div>
      <div class="results-percentage">
        {Math.round((score / questions.length) * 100)}%
      </div>
      <div class="results-actions">
        <button class="btn btn-primary" on:click={restartQuiz}>
          Try Again
        </button>
        <button class="btn btn-secondary" on:click={goBack}>
          Back to Lesson
        </button>
      </div>
    </div>
  </div>
{:else if currentQuestion}
  <div class="quiz-container">
    <ProgressBar
      current={progressCurrent}
      total={progressTotal}
      showText={true}
    />

    {#if mode === 'flashcard'}
      {#key currentQuestion.id}
        <KanjiFlashCard
          item={currentQuestion.item}
          bind:flipped
          on:correct={handleCorrect}
          on:wrong={handleWrong}
        />
      {/key}
    {:else if mode === 'mc'}
      {#key currentQuestion.id}
        <KanjiMultipleChoice
          item={currentQuestion.item}
          options={mcOptions}
          answer={currentQuestion.answer}
          on:correct={handleCorrect}
          on:wrong={handleWrong}
        />
      {/key}
    {:else if mode === 'typing'}
      {#key currentQuestion.id}
        <KanjiTypingQuiz
          item={currentQuestion.item}
          answer={currentQuestion.answer}
          on:correct={handleCorrect}
          on:wrong={handleWrong}
        />
      {/key}
    {/if}
  </div>
{:else}
  <div class="loading">
    <SkeletonCard />
  </div>
{/if}

<style>
  .quiz-container {
    max-width: 600px;
    margin: 0 auto;
    animation: fadeIn 0.25s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .loading {
    text-align: center;
    padding: 3rem;
    color: var(--text-muted);
  }

  .results-container {
    max-width: 500px;
    margin: 2rem auto;
    animation: fadeIn 0.25s ease;
  }

  .results-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 2rem;
    text-align: center;
    box-shadow: var(--shadow-lg);
  }

  .results-card h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .results-score {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .score-number {
    color: var(--success);
  }

  .score-divider {
    color: var(--text-muted);
    margin: 0 0.25rem;
  }

  .score-total {
    color: var(--text-muted);
  }

  .results-percentage {
    font-size: 1.2rem;
    color: var(--primary);
    font-weight: 600;
    margin-bottom: 2rem;
  }

  .results-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>
