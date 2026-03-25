<script lang="ts">
  /**
   * JLPT Mock Test Page
   * 30 questions, 30-minute timer, JLPT-style scoring
   */

  import { onMount, onDestroy } from 'svelte';
  import { base } from '$app/paths';
  import { generateMockTest, calculateJLPTScore } from '$lib/utils/mockTestUtils';
  import type { MockTestQuestion, JLPTScoreResult } from '$lib/utils/mockTestUtils';
  import { recordStudySession } from '$lib/utils/achievementUtils';
  import ProgressBar from '$lib/components/common/ProgressBar.svelte';

  let selectedLevel = 'n5';
  let started = false;
  let questions: MockTestQuestion[] = [];
  let currentIndex = 0;
  let answers: Record<string, string> = {};
  let selectedOption: string | null = null;
  let answered = false;
  let timeRemaining = 30 * 60; // 30 minutes in seconds
  let timer: ReturnType<typeof setInterval>;
  let result: JLPTScoreResult | null = null;

  $: currentQ = questions[currentIndex] || null;
  $: isComplete = started && (currentIndex >= questions.length || timeRemaining <= 0);
  $: minutes = Math.floor(timeRemaining / 60);
  $: seconds = timeRemaining % 60;

  function startTest() {
    questions = generateMockTest(selectedLevel);
    if (questions.length === 0) return;
    started = true;
    currentIndex = 0;
    answers = {};
    result = null;
    timeRemaining = 30 * 60;

    timer = setInterval(() => {
      timeRemaining--;
      if (timeRemaining <= 0) {
        clearInterval(timer);
        finishTest();
      }
    }, 1000);
  }

  function selectOption(option: string) {
    if (answered) return;
    selectedOption = option;
    answered = true;
    answers[currentQ.id] = option;

    setTimeout(() => {
      selectedOption = null;
      answered = false;
      currentIndex++;
      if (currentIndex >= questions.length) {
        finishTest();
      }
    }, 800);
  }

  function finishTest() {
    clearInterval(timer);
    recordStudySession();

    const vocabQs = questions.filter(q => q.section === 'vocab');
    const grammarQs = questions.filter(q => q.section === 'grammar');

    result = calculateJLPTScore({
      vocabCorrect: vocabQs.filter(q => answers[q.id] === q.answer).length,
      vocabTotal: vocabQs.length,
      grammarCorrect: grammarQs.filter(q => answers[q.id] === q.answer).length,
      grammarTotal: grammarQs.length
    });
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!currentQ || answered || isComplete) return;
    const key = event.key;
    if (['1', '2', '3', '4'].includes(key) && currentQ.options) {
      const idx = parseInt(key) - 1;
      if (currentQ.options[idx]) selectOption(currentQ.options[idx]);
    }
  }

  function getOptionClass(option: string): string {
    if (!answered) return 'mc-option';
    if (option === currentQ?.answer) return 'mc-option correct';
    if (option === selectedOption && option !== currentQ?.answer) return 'mc-option wrong';
    return 'mc-option disabled';
  }

  onDestroy(() => { clearInterval(timer); });
</script>

<svelte:head>
  <title>JLPT Mock Test - Smart Quiz</title>
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<div class="mock-test-page">
  {#if !started}
    <!-- Level Select -->
    <div class="start-card">
      <h1>JLPT Mock Test</h1>
      <p class="desc">30 questions · 30 minutes · Vocabulary & Grammar</p>

      <div class="level-select">
        <button class="level-btn" class:active={selectedLevel === 'n5'} on:click={() => selectedLevel = 'n5'}>N5</button>
        <button class="level-btn" class:active={selectedLevel === 'n4'} on:click={() => selectedLevel = 'n4'}>N4</button>
      </div>

      <button class="btn btn-primary btn-lg" on:click={startTest}>Start Test</button>
    </div>

  {:else if isComplete && result}
    <!-- Results -->
    <div class="results-card">
      <h2>{result.pass ? '🎉 PASSED!' : '📚 Not Yet'}</h2>

      <div class="score-sections">
        <div class="score-section">
          <span class="section-label">Vocabulary</span>
          <span class="section-score">{result.vocabPercentage}%</span>
          <span class="section-detail">{result.vocabScore}/60</span>
        </div>
        <div class="score-section">
          <span class="section-label">Grammar</span>
          <span class="section-score">{result.grammarPercentage}%</span>
          <span class="section-detail">{result.grammarScore}/60</span>
        </div>
      </div>

      <div class="total-score">
        <span class="total-label">Total</span>
        <span class="total-value">{result.totalScore}/120</span>
        <span class="total-pct">{result.totalPercentage}%</span>
      </div>

      <div class="pass-info">
        {#if result.pass}
          You meet the passing criteria for JLPT {selectedLevel.toUpperCase()}!
        {:else}
          Need ≥44% total AND ≥32% each section to pass.
        {/if}
      </div>

      <div class="results-actions">
        <button class="btn btn-primary" on:click={startTest}>Try Again</button>
        <a href="{base}/" class="btn btn-secondary">Home</a>
      </div>
    </div>

  {:else if currentQ}
    <!-- Quiz -->
    <div class="test-header">
      <div class="timer" class:warning={timeRemaining < 300}>
        {minutes}:{seconds.toString().padStart(2, '0')}
      </div>
      <ProgressBar current={currentIndex + 1} total={questions.length} showText={true} />
      <div class="section-badge">{currentQ.section === 'vocab' ? '📚 Vocab' : '📖 Grammar'}</div>
    </div>

    <div class="question-card">
      <div class="q-label">
        {currentQ.section === 'vocab' ? 'What is the meaning of:' : 'Which meaning matches:'}
      </div>
      <div class="q-text">{currentQ.question}</div>
    </div>

    <div class="mc-options">
      {#each currentQ.options as option, idx}
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

<style>
  .mock-test-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
    animation: fadeIn 0.25s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Start */
  .start-card {
    text-align: center;
    padding: 3rem 1.5rem;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow-lg);
  }

  .start-card h1 { margin-bottom: 0.5rem; }
  .desc { color: var(--text-muted); margin-bottom: 2rem; }

  .level-select {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .level-btn {
    padding: 0.75rem 2rem;
    font-size: 1.1rem;
    font-weight: 700;
    font-family: inherit;
    border: 2px solid var(--border);
    border-radius: var(--radius);
    background: var(--bg-card);
    color: var(--text);
    cursor: pointer;
    transition: all 0.15s;
  }

  .level-btn.active {
    border-color: var(--primary);
    background: color-mix(in srgb, var(--primary) 10%, var(--bg-card));
    color: var(--primary);
  }

  /* Timer */
  .test-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .timer {
    font-size: 1.1rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: var(--text);
    min-width: 4rem;
  }

  .timer.warning { color: var(--danger); }

  .section-badge {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.5rem;
    background: var(--bg);
    border-radius: var(--radius-sm);
    white-space: nowrap;
  }

  /* Question */
  .question-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: var(--shadow);
    text-align: center;
  }

  .q-label { font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.5rem; }
  .q-text { font-size: 1.3rem; font-weight: 700; font-family: var(--font-jp); }

  /* MC Options */
  .mc-options { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }

  .mc-option {
    display: flex; align-items: center; gap: 0.75rem;
    width: 100%; padding: 0.8rem 1rem; font-size: 0.95rem;
    font-family: inherit; font-weight: 500; text-align: left;
    background: var(--bg-card); color: var(--text);
    border: 2px solid var(--border); border-radius: var(--radius-sm);
    cursor: pointer; transition: border-color 0.15s, background 0.15s;
  }

  .mc-option:hover:not(:disabled):not(.disabled) { border-color: var(--primary); }
  .mc-option.correct { border-color: var(--success); background: var(--success-bg); }
  .mc-option.wrong { border-color: var(--danger); background: var(--danger-bg); }
  .mc-option.disabled { cursor: default; opacity: 0.7; }
  .mc-option.correct.disabled { opacity: 1; }

  .mc-num { min-width: 1.5rem; font-weight: 700; color: var(--primary); }
  .hint-text { text-align: center; font-size: 0.78rem; color: var(--text-muted); }

  /* Results */
  .results-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 2rem;
    text-align: center;
    box-shadow: var(--shadow-lg);
  }

  .results-card h2 { margin-bottom: 1.5rem; font-size: 1.5rem; }

  .score-sections { display: flex; gap: 1rem; justify-content: center; margin-bottom: 1.5rem; }

  .score-section {
    display: flex; flex-direction: column; align-items: center; gap: 0.2rem;
    padding: 1rem 1.5rem; background: var(--bg); border-radius: var(--radius-sm);
    min-width: 120px;
  }

  .section-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; }
  .section-score { font-size: 1.5rem; font-weight: 700; color: var(--primary); }
  .section-detail { font-size: 0.78rem; color: var(--text-muted); }

  .total-score {
    display: flex; align-items: center; justify-content: center; gap: 0.75rem;
    margin-bottom: 1rem; font-size: 1.2rem;
  }

  .total-label { font-weight: 600; }
  .total-value { font-size: 2rem; font-weight: 700; color: var(--primary); }
  .total-pct { color: var(--text-muted); }

  .pass-info { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem; }

  .results-actions { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
</style>
