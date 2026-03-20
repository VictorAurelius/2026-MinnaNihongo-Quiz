<script lang="ts">
  /**
   * Typing Quiz Component
   * Enter to submit → plays audio → Enter again to advance
   */

  import type { VocabItem } from '$lib/types';
  import { createEventDispatcher } from 'svelte';
  import VirtualKeyboard from './VirtualKeyboard.svelte';
  import { showVirtualKeyboard, hideVirtualKeyboard, uiStore } from '$lib/stores';
  import { checkAnswer as checkQuizAnswer } from '$lib/utils/quizUtils';

  export let question: VocabItem;
  export let questionText = '';
  export let answer: string;
  export let isRomaji = false;

  $: displayText = questionText || question.japanese || question.vietnamese;

  const dispatch = createEventDispatcher();

  let userInput = '';
  let answered = false;
  let showHint = false;
  let isCorrect = false;
  let inputEl: HTMLInputElement;

  // Reset local state when question changes (new card)
  let prevQuestionText = '';
  $: if (questionText !== prevQuestionText || answer !== prevAnswer) {
    prevQuestionText = questionText;
    prevAnswer = answer;
    userInput = '';
    answered = false;
    showHint = false;
    isCorrect = false;
    // Auto-focus input for next question
    setTimeout(() => inputEl?.focus(), 50);
  }
  let prevAnswer = '';

  function submitAnswer() {
    if (answered || !userInput.trim()) return;

    answered = true;
    isCorrect = checkQuizAnswer(userInput, answer, isRomaji);

    // Play Japanese audio after submitting (use kana to avoid double reading)
    playAudio();
  }

  function advance() {
    dispatch(isCorrect ? 'correct' : 'wrong', { item: question });
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!answered) {
        submitAnswer();
      } else {
        advance();
      }
      return;
    }
    // 1 to speak — only when answered (so it doesn't interfere with typing)
    if (answered && event.key === '1') {
      playAudio();
    }
  }

  function insertChar(char: string) {
    if (!answered) {
      userInput += char;
    }
  }

  function deleteChar() {
    if (!answered && userInput.length > 0) {
      userInput = userInput.slice(0, -1);
    }
  }

  function clearInput() {
    if (!answered) {
      userInput = '';
    }
  }

  function toggleKeyboard() {
    if ($uiStore.showVirtualKeyboard) {
      hideVirtualKeyboard();
    } else {
      showVirtualKeyboard();
    }
  }

  function toggleHint() {
    showHint = !showHint;
  }

  function playAudio() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Use kana for TTS to avoid double reading (kanji + kana)
      const text = question.kana || question.japanese;
      if (!text) return;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  }

  $: inputClass = answered
    ? isCorrect
      ? 'typing-input correct'
      : 'typing-input wrong'
    : 'typing-input';
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="quiz-question-card">
  <div class="question-label">
    {#if isRomaji}
      Type the romaji reading:
    {:else}
      Type the answer:
    {/if}
  </div>
  <div class="question-text">{displayText}</div>
  {#if !isRomaji && question.english}
    <div class="question-romaji">{question.english}</div>
  {/if}
  <button class="btn-speak btn-speak--fc" on:click={playAudio}>
    🔊 Speak (1)
  </button>
</div>

<div class="typing-input-wrapper">
  <input
    type="text"
    class={inputClass}
    bind:value={userInput}
    bind:this={inputEl}
    placeholder={isRomaji ? "Type romaji..." : "Type your answer..."}
    disabled={answered}
    autocomplete="off"
  />
  <button class="btn btn-secondary" on:click={toggleKeyboard}>
    ⌨️
  </button>
</div>

<!-- Virtual Keyboard -->
<VirtualKeyboard
  visible={$uiStore.showVirtualKeyboard}
  on:insert={(e) => insertChar(e.detail.char)}
  on:delete={deleteChar}
  on:clear={clearInput}
/>

<!-- Romaji Hint -->
<div class="romaji-hint-wrapper">
  {#if !showHint}
    <button class="btn-hint" on:click={toggleHint}>
      💡 Show Romaji Hint
    </button>
  {:else if question.kana}
    <div class="hint-romaji">{question.kana}</div>
  {/if}
</div>

{#if answered}
  <div class="feedback" class:correct={isCorrect} class:wrong={!isCorrect}>
    {#if isCorrect}
      ✓ Correct!
    {:else}
      ✗ Wrong! The correct answer is: {answer}
    {/if}
  </div>
  <button class="btn btn-primary btn-lg" on:click={advance}>
    Next Question →
  </button>
  <div class="hint-text">Press Enter to continue</div>
{:else}
  <button class="btn btn-primary btn-lg" on:click={submitAnswer} disabled={!userInput.trim()}>
    Submit Answer
  </button>
{/if}

<style>
  .quiz-question-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.5rem;
    margin-bottom: 1.25rem;
    box-shadow: var(--shadow);
    text-align: center;
  }

  .question-label {
    font-size: 0.82rem;
    color: var(--text-muted);
    margin-bottom: 0.4rem;
  }

  .question-text {
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 1.4;
    margin-bottom: 0.5rem;
  }

  .question-romaji {
    font-size: 0.95rem;
    color: var(--text-muted);
    font-style: italic;
    margin-top: 0.5rem;
  }

  .typing-input-wrapper {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .typing-input {
    flex: 1;
    padding: 0.75rem 1rem;
    font-size: 1.1rem;
    font-family: var(--font-jp);
    border: 2px solid var(--border);
    border-radius: var(--radius-sm);
    background: var(--bg-card);
    color: var(--text);
    outline: none;
    transition: border-color var(--transition);
  }

  .typing-input:focus {
    border-color: var(--primary);
  }

  .typing-input.correct {
    border-color: var(--success);
  }

  .typing-input.wrong {
    border-color: var(--danger);
  }

  .romaji-hint-wrapper {
    margin-top: 0.75rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .btn-hint {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
    font-weight: 500;
    font-family: inherit;
    background: transparent;
    color: var(--text-muted);
    border: 1.5px dashed var(--border);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all var(--transition);
  }

  .btn-hint:hover {
    background: var(--border);
    color: var(--text);
  }

  .hint-romaji {
    font-size: 0.9rem;
    color: var(--primary);
    font-style: italic;
    padding: 0.4rem 0.8rem;
    background: var(--bg);
    border-radius: var(--radius-sm);
    letter-spacing: 0.02em;
  }

  .feedback {
    padding: 0.8rem 1rem;
    border-radius: var(--radius-sm);
    margin-bottom: 1rem;
    font-weight: 600;
    font-size: 0.95rem;
    text-align: center;
  }

  .feedback.correct {
    background: var(--success-bg);
    color: var(--success);
  }

  .feedback.wrong {
    background: var(--danger-bg);
    color: var(--danger);
  }

  .hint-text {
    text-align: center;
    font-size: 0.82rem;
    color: var(--text-muted);
    margin-top: 0.5rem;
  }

  @media (max-width: 600px) {
    .typing-input-wrapper {
      flex-direction: column;
    }

    .typing-input {
      font-size: 1rem;
    }
  }
</style>
