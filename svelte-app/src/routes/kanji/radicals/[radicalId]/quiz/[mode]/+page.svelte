<script lang="ts">
  /**
   * Radical Quiz Page — quiz all kanji sharing a radical
   * Reuses the same pattern as /kanji/[lesson]/quiz/[mode]
   */

  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { getKanjiItemsByRadical, getRadicals } from '$lib/data/kanji/radicals';
  import { getAllKanjiLessons } from '$lib/data/kanji/lessons';
  import { KANJI_N3_DATA } from '$lib/data/kanji/kanji-n3';
  import { KANJI_N2_DATA } from '$lib/data/kanji/kanji-n2';
  import { KANJI_N1_DATA } from '$lib/data/kanji/kanji-n1';
  import { generateKanjiQuestions, generateKanjiMCOptions } from '$lib/utils/kanjiQuizUtils';
  import type { KanjiQuizQuestion, KanjiQuizDirection } from '$lib/utils/kanjiQuizUtils';
  import type { KanjiItem } from '$lib/types';
  import KanjiFlashCard from '$lib/components/kanji/KanjiFlashCard.svelte';
  import KanjiMultipleChoice from '$lib/components/kanji/KanjiMultipleChoice.svelte';
  import KanjiTypingQuiz from '$lib/components/kanji/KanjiTypingQuiz.svelte';
  import ProgressBar from '$lib/components/common/ProgressBar.svelte';
  import SkeletonCard from '$lib/components/common/SkeletonCard.svelte';

  $: mode = $page.params.mode as 'flashcard' | 'mc' | 'typing';
  $: radicalId = decodeURIComponent($page.params.radicalId);
  $: direction = ($page.url.searchParams.get('direction') || 'kanji-vi') as KanjiQuizDirection;
  $: radicalInfo = getRadicals(radicalId)[0] ?? null;

  let questions: KanjiQuizQuestion[] = [];
  let currentIndex = 0;
  let score = 0;
  let flipped = false;
  let quizStarted = false;
  let mcOptions: string[] = [];
  let allKanjiItems: KanjiItem[] = [];

  $: currentQuestion = questions[currentIndex] || null;
  $: isComplete = quizStarted && currentIndex >= questions.length;
  $: progressCurrent = currentIndex + 1;
  $: progressTotal = questions.length;

  onMount(() => {
    const kanjiItems = getKanjiItemsByRadical(radicalId);
    if (kanjiItems.length === 0) {
      goto(`${base}/kanji/radicals/${encodeURIComponent(radicalId)}`);
      return;
    }

    // Pool for MC options
    allKanjiItems = [
      ...getAllKanjiLessons().flatMap(l => l.kanji),
      ...KANJI_N3_DATA,
      ...KANJI_N2_DATA,
      ...KANJI_N1_DATA,
    ];

    questions = generateKanjiQuestions(kanjiItems, direction);
    quizStarted = true;

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
      if (mode === 'mc' && questions[nextIdx]) {
        mcOptions = generateKanjiMCOptions(questions[nextIdx].answer, allKanjiItems, direction);
      }
    }, 300);
  }

  function restartQuiz() {
    const kanjiItems = getKanjiItemsByRadical(radicalId);
    questions = generateKanjiQuestions(kanjiItems, direction);
    currentIndex = 0;
    score = 0;
    flipped = false;
    if (mode === 'mc' && questions.length > 0) {
      mcOptions = generateKanjiMCOptions(questions[0].answer, allKanjiItems, direction);
    }
  }

  function goBack() {
    goto(`${base}/kanji/radicals/${encodeURIComponent(radicalId)}`);
  }
</script>

<svelte:head>
  <title>Quiz bộ thủ {radicalId} — Smart Quiz</title>
</svelte:head>

{#if isComplete}
  <div class="results-container">
    <div class="results-card">
      <h2>Quiz hoàn thành!</h2>
      <div class="results-radical">Bộ thủ: <span class="radical-char">{radicalId}</span>
        {#if radicalInfo} · {radicalInfo.meaningVi}{/if}
      </div>
      <div class="results-score">
        <span class="score-number">{score}</span>
        <span class="score-divider">/</span>
        <span class="score-total">{questions.length}</span>
      </div>
      <div class="results-percentage">
        {Math.round((score / questions.length) * 100)}%
      </div>
      <div class="results-actions">
        <button class="btn btn-primary" on:click={restartQuiz}>Thử lại</button>
        <button class="btn btn-secondary" on:click={goBack}>Về bộ thủ</button>
      </div>
    </div>
  </div>
{:else if currentQuestion}
  <div class="quiz-container">
    <div class="quiz-header">
      <button class="back-btn" on:click={goBack}>← {radicalId}</button>
    </div>
    <ProgressBar current={progressCurrent} total={progressTotal} showText={true} />

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
  <div class="loading"><SkeletonCard /></div>
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

  .quiz-header {
    margin-bottom: 1rem;
  }

  .back-btn {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    font-family: var(--font-jp);
    font-size: 1rem;
    padding: 0;
    transition: color var(--transition);
  }

  .back-btn:hover {
    color: var(--primary);
  }

  .loading {
    text-align: center;
    padding: 3rem;
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
    margin-bottom: 0.75rem;
  }

  .results-radical {
    font-size: 0.9rem;
    color: var(--text-muted);
    margin-bottom: 1.25rem;
  }

  .radical-char {
    font-family: var(--font-jp);
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text);
  }

  .results-score {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .score-number { color: var(--success); }
  .score-divider { color: var(--text-muted); margin: 0 0.25rem; }
  .score-total { color: var(--text-muted); }

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
