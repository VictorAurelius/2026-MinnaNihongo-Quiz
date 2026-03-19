<script lang="ts">
  /**
   * Kanji Multiple Choice Component
   * Shows kanji character → choose meaning/reading
   */

  import type { KanjiItem } from '$lib/types';
  import { createEventDispatcher } from 'svelte';

  export let item: KanjiItem;
  export let options: string[] = [];
  export let answer: string;

  const dispatch = createEventDispatcher();

  let selectedOption: string | null = null;
  let answered = false;

  function selectOption(option: string) {
    if (answered) return;

    selectedOption = option;
    answered = true;

    const isCorrect = option === answer;

    setTimeout(() => {
      dispatch(isCorrect ? 'correct' : 'wrong', { item });
    }, 1500);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (answered) return;

    const key = event.key;
    if (['1', '2', '3', '4'].includes(key)) {
      const index = parseInt(key) - 1;
      if (options[index]) {
        selectOption(options[index]);
      }
    }
  }

  function getOptionClass(option: string): string {
    if (!answered) return 'mc-option';
    if (option === answer) return 'mc-option correct';
    if (option === selectedOption) return 'mc-option wrong';
    return 'mc-option disabled';
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
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="quiz-question-card">
  <div class="question-label">What is the meaning of:</div>
  <div class="question-kanji">{item.character}</div>
  <div class="question-meta">
    {#if item.onyomi.length > 0}
      <span class="meta-reading">{item.onyomi.join('、')}</span>
    {/if}
  </div>
  <button class="btn-speak btn-speak--fc" on:click={playAudio}>
    🔊 Speak
  </button>
</div>

<div class="mc-options">
  {#each options as option, index}
    <button
      class={getOptionClass(option)}
      on:click={() => selectOption(option)}
      disabled={answered}
    >
      <span class="mc-option-number">{index + 1}.</span>
      <span class="mc-option-text">{option}</span>
    </button>
  {/each}
</div>

{#if answered}
  <div class="feedback" class:correct={selectedOption === answer} class:wrong={selectedOption !== answer}>
    {#if selectedOption === answer}
      ✓ Correct!
    {:else}
      ✗ Wrong! The correct answer is: {answer}
    {/if}
  </div>
{/if}

{#if !answered}
  <div class="hint-text">
    Press 1-4 on your keyboard or click an option
  </div>
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
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 0.5rem;
  }

  .question-meta {
    margin-bottom: 0.5rem;
  }

  .meta-reading {
    font-family: var(--font-jp);
    font-size: 0.95rem;
    color: var(--text-muted);
  }

  .mc-options {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    margin-bottom: 1rem;
  }

  .mc-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.9rem 1.2rem;
    font-size: 1rem;
    font-family: inherit;
    font-weight: 500;
    text-align: left;
    background: var(--bg-card);
    color: var(--text);
    border: 2px solid var(--border);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: border-color var(--transition), background var(--transition);
    line-height: 1.4;
  }

  .mc-option:hover:not(:disabled):not(.disabled) {
    border-color: var(--primary);
  }

  .mc-option.correct {
    border-color: var(--success);
    background: var(--success-bg);
  }

  .mc-option.wrong {
    border-color: var(--danger);
    background: var(--danger-bg);
  }

  .mc-option.disabled {
    cursor: default;
    opacity: 0.7;
  }

  .mc-option.correct.disabled {
    opacity: 1;
  }

  .mc-option-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.5rem;
    font-weight: 700;
    color: var(--primary);
  }

  .mc-option-text {
    flex: 1;
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
  }

  @media (max-width: 600px) {
    .question-kanji {
      font-size: 2.5rem;
    }

    .mc-option {
      padding: 0.75rem 1rem;
      font-size: 0.9rem;
    }
  }
</style>
