<script lang="ts">
  /**
   * Kanji Typing Quiz Component
   * Shows kanji → type the meaning or reading
   */

  import type { KanjiItem } from '$lib/types';
  import { createEventDispatcher } from 'svelte';

  export let item: KanjiItem;
  export let answer: string;

  const dispatch = createEventDispatcher();

  let userInput = '';
  let answered = false;
  let showHint = false;

  function checkAnswer() {
    if (answered || !userInput.trim()) return;

    answered = true;
    const normalized = userInput.trim().toLowerCase();
    const correctAnswer = answer.toLowerCase();
    const isCorrect = normalized === correctAnswer;

    setTimeout(() => {
      dispatch(isCorrect ? 'correct' : 'wrong', { item });
    }, 1500);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      checkAnswer();
    }
  }

  function toggleHint() {
    showHint = !showHint;
  }

  function playAudio() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(item.character);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  }

  $: inputClass = answered
    ? userInput.trim().toLowerCase() === answer.toLowerCase()
      ? 'typing-input correct'
      : 'typing-input wrong'
    : 'typing-input';
</script>

<div class="quiz-question-card">
  <div class="question-label">Type the meaning of this kanji:</div>
  <div class="question-kanji">{item.character}</div>
  <button class="btn-speak btn-speak--fc" on:click={playAudio}>
    🔊 Speak
  </button>
</div>

<div class="typing-input-wrapper">
  <input
    type="text"
    class={inputClass}
    bind:value={userInput}
    on:keydown={handleKeydown}
    placeholder="Type the meaning..."
    disabled={answered}
    autocomplete="off"
  />
</div>

<!-- Hint -->
<div class="hint-wrapper">
  {#if !showHint}
    <button class="btn-hint" on:click={toggleHint}>
      💡 Show Hint
    </button>
  {:else}
    <div class="hint-content">
      {#if item.onyomi.length > 0}
        <span>音: {item.onyomi.join('、')}</span>
      {/if}
      {#if item.kunyomi.length > 0}
        <span>訓: {item.kunyomi.join('、')}</span>
      {/if}
    </div>
  {/if}
</div>

{#if answered}
  <div class="feedback" class:correct={userInput.trim().toLowerCase() === answer.toLowerCase()} class:wrong={userInput.trim().toLowerCase() !== answer.toLowerCase()}>
    {#if userInput.trim().toLowerCase() === answer.toLowerCase()}
      ✓ Correct!
    {:else}
      ✗ Wrong! The correct answer is: {answer}
    {/if}
  </div>
{:else}
  <button class="btn btn-primary btn-lg" on:click={checkAnswer} disabled={!userInput.trim()}>
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

  .question-kanji {
    font-family: var(--font-jp);
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 0.5rem;
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

  .hint-wrapper {
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

  .hint-content {
    display: flex;
    gap: 1rem;
    font-family: var(--font-jp);
    font-size: 0.9rem;
    color: var(--primary);
    padding: 0.4rem 0.8rem;
    background: var(--bg);
    border-radius: var(--radius-sm);
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

  @media (max-width: 600px) {
    .question-kanji {
      font-size: 2.8rem;
    }

    .typing-input {
      font-size: 1rem;
    }
  }
</style>
