<script lang="ts">
  /**
   * Grammar Quiz Page
   * Fill-in-blank and pattern-match quiz modes for grammar items
   */

  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { getCourse } from '$lib/data/courses';
  import { generateGrammarQuestions } from '$lib/utils/grammarQuizUtils';
  import type { GrammarQuizQuestion } from '$lib/utils/grammarQuizUtils';
  import type { CourseId } from '$lib/types/course';
  import ProgressBar from '$lib/components/common/ProgressBar.svelte';

  $: courseId = $page.params.courseId as CourseId;
  $: lessonId = parseInt($page.params.id || '0');
  $: mode = $page.params.mode as 'fill-blank' | 'pattern-match' | 'mixed';

  let questions: GrammarQuizQuestion[] = [];
  let currentIndex = 0;
  let score = 0;
  let selectedOption: string | null = null;
  let answered = false;
  let userInput = '';
  let started = false;

  $: currentQ = questions[currentIndex] || null;
  $: isComplete = started && currentIndex >= questions.length;

  onMount(() => {
    const course = getCourse(courseId);
    if (!course) { goto(`${base}/courses`); return; }

    const lessonData = course.getLessonData(lessonId);
    if (!lessonData || lessonData.grammar.length === 0) {
      goto(`${base}/course/${courseId}/lesson/${lessonId}`);
      return;
    }

    questions = generateGrammarQuestions(lessonData.grammar);
    started = true;
  });

  function selectOption(option: string) {
    if (answered) return;
    selectedOption = option;
    answered = true;
    const correct = option === currentQ?.answer;
    if (correct) score++;
    setTimeout(advance, 1500);
  }

  function submitFillBlank() {
    if (answered || !userInput.trim()) return;
    answered = true;
    const correct = userInput.trim() === currentQ?.answer;
    if (correct) score++;
  }

  function advance() {
    selectedOption = null;
    answered = false;
    userInput = '';
    currentIndex++;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (currentQ?.type === 'pattern-match' && !answered) {
      const key = event.key;
      if (['1', '2', '3', '4'].includes(key) && currentQ.options) {
        const idx = parseInt(key) - 1;
        if (currentQ.options[idx]) selectOption(currentQ.options[idx]);
      }
    }
    if (currentQ?.type === 'fill-blank' && event.key === 'Enter') {
      event.preventDefault();
      if (!answered) {
        submitFillBlank();
      } else {
        advance();
      }
    }
  }

  function restart() {
    const course = getCourse(courseId);
    const lessonData = course?.getLessonData(lessonId);
    if (lessonData) {
      questions = generateGrammarQuestions(lessonData.grammar);
    }
    currentIndex = 0;
    score = 0;
    answered = false;
    selectedOption = null;
    userInput = '';
  }

  function getOptionClass(option: string): string {
    if (!answered) return 'mc-option';
    if (option === currentQ?.answer) return 'mc-option correct';
    if (option === selectedOption) return 'mc-option wrong';
    return 'mc-option disabled';
  }
</script>

<svelte:head>
  <title>Grammar Quiz - Lesson {lessonId}</title>
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<div class="quiz-page">
  {#if isComplete}
    <div class="results-card">
      <h2>Grammar Quiz Complete!</h2>
      <div class="results-score">
        <span class="score-num">{score}</span>
        <span class="score-div">/</span>
        <span class="score-total">{questions.length}</span>
      </div>
      <div class="results-pct">{Math.round((score / questions.length) * 100)}%</div>
      <div class="results-actions">
        <button class="btn btn-primary" on:click={restart}>Try Again</button>
        <a href="{base}/course/{courseId}/lesson/{lessonId}" class="btn btn-secondary">Back to Lesson</a>
      </div>
    </div>
  {:else if currentQ}
    <ProgressBar current={currentIndex + 1} total={questions.length} showText={true} />

    <div class="question-card">
      {#if currentQ.type === 'fill-blank'}
        <div class="q-label">Fill in the blank:</div>
        <div class="q-text q-japanese">{currentQ.question}</div>
        {#if currentQ.hint}
          <div class="q-hint">{currentQ.hint}</div>
        {/if}

        <div class="fill-input-wrapper">
          <input
            type="text"
            class="fill-input"
            class:correct={answered && userInput.trim() === currentQ.answer}
            class:wrong={answered && userInput.trim() !== currentQ.answer}
            bind:value={userInput}
            placeholder="Type the missing part..."
            disabled={answered}
            autocomplete="off"
          />
        </div>

        {#if answered}
          <div class="feedback" class:correct={userInput.trim() === currentQ.answer} class:wrong={userInput.trim() !== currentQ.answer}>
            {#if userInput.trim() === currentQ.answer}
              ✓ Correct!
            {:else}
              ✗ Answer: {currentQ.answer}
            {/if}
          </div>
          <button class="btn btn-primary" on:click={advance}>Next →</button>
        {:else}
          <button class="btn btn-primary" on:click={submitFillBlank} disabled={!userInput.trim()}>Submit</button>
        {/if}

      {:else}
        <!-- Pattern Match (MC) -->
        <div class="q-label">Which grammar pattern means:</div>
        <div class="q-text">{currentQ.question}</div>
        {#if currentQ.hint}
          <div class="q-hint">{currentQ.hint}</div>
        {/if}

        <div class="mc-options">
          {#each currentQ.options || [] as option, idx}
            <button
              class={getOptionClass(option)}
              on:click={() => selectOption(option)}
              disabled={answered}
            >
              <span class="mc-num">{idx + 1}.</span>
              <span class="mc-text">{option}</span>
            </button>
          {/each}
        </div>

        {#if !answered}
          <div class="hint-text">Press 1-4 to choose</div>
        {/if}
      {/if}
    </div>

    <!-- Grammar Reference (after answering) -->
    {#if answered && currentQ.grammarItem}
      <div class="grammar-ref">
        <strong>{currentQ.grammarItem.pattern}</strong>
        <p>{currentQ.grammarItem.explanation}</p>
      </div>
    {/if}
  {/if}
</div>

<style>
  .quiz-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
    animation: fadeIn 0.25s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .question-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: var(--shadow);
    text-align: center;
  }

  .q-label {
    font-size: 0.82rem;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
  }

  .q-text {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }

  .q-japanese {
    font-family: var(--font-jp);
    font-size: 1.4rem;
  }

  .q-hint {
    font-size: 0.85rem;
    color: var(--text-muted);
    font-style: italic;
    margin-bottom: 1rem;
  }

  /* Fill blank */
  .fill-input-wrapper {
    margin: 1rem 0;
  }

  .fill-input {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1.1rem;
    font-family: var(--font-jp);
    border: 2px solid var(--border);
    border-radius: var(--radius-sm);
    background: var(--bg);
    color: var(--text);
    outline: none;
    text-align: center;
  }

  .fill-input:focus { border-color: var(--primary); }
  .fill-input.correct { border-color: var(--success); }
  .fill-input.wrong { border-color: var(--danger); }

  /* MC options */
  .mc-options {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 1rem 0;
    text-align: left;
  }

  .mc-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.8rem 1rem;
    font-size: 0.95rem;
    font-family: var(--font-jp);
    font-weight: 500;
    background: var(--bg-card);
    color: var(--text);
    border: 2px solid var(--border);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: border-color var(--transition), background var(--transition);
  }

  .mc-option:hover:not(:disabled):not(.disabled) { border-color: var(--primary); }
  .mc-option.correct { border-color: var(--success); background: var(--success-bg); }
  .mc-option.wrong { border-color: var(--danger); background: var(--danger-bg); }
  .mc-option.disabled { cursor: default; opacity: 0.7; }
  .mc-option.correct.disabled { opacity: 1; }

  .mc-num {
    min-width: 1.5rem;
    font-weight: 700;
    color: var(--primary);
  }

  .hint-text {
    font-size: 0.78rem;
    color: var(--text-muted);
    text-align: center;
  }

  .feedback {
    padding: 0.6rem;
    border-radius: var(--radius-sm);
    font-weight: 600;
    font-size: 0.9rem;
    text-align: center;
    margin-bottom: 0.75rem;
  }

  .feedback.correct { background: var(--success-bg); color: var(--success); }
  .feedback.wrong { background: var(--danger-bg); color: var(--danger); }

  /* Grammar reference */
  .grammar-ref {
    background: var(--bg);
    border: 1px dashed var(--border);
    border-radius: var(--radius-sm);
    padding: 0.75rem 1rem;
    margin-top: 0.5rem;
    font-size: 0.85rem;
    line-height: 1.5;
  }

  .grammar-ref strong {
    font-family: var(--font-jp);
    color: var(--primary);
  }

  .grammar-ref p {
    margin: 0.3rem 0 0;
    color: var(--text-muted);
  }

  /* Results */
  .results-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 2rem;
    text-align: center;
    box-shadow: var(--shadow-lg);
  }

  .results-card h2 { margin-bottom: 1rem; }

  .results-score {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .score-num { color: var(--success); }
  .score-div { color: var(--text-muted); margin: 0 0.2rem; }
  .score-total { color: var(--text-muted); }

  .results-pct {
    font-size: 1.2rem;
    color: var(--primary);
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  .results-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>
