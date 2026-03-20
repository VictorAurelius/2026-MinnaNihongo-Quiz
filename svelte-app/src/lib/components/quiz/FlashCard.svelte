<script lang="ts">
  /**
   * FlashCard Component with 3D Flip Animation
   * Preserves CSS transform-style: preserve-3d for smooth flip
   */

  import type { VocabItem } from '$lib/types';
  import { createEventDispatcher, afterUpdate } from 'svelte';

  export let item: VocabItem;
  export let questionText = '';  // display text (based on direction)
  export let answerText = '';    // answer text (based on direction)
  export let showEnglish = true;
  export let autoFlip = false;
  export let autoSpeak = true;
  export let flipped = false;

  $: frontText = questionText || item.japanese;
  $: backText = answerText || item.vietnamese;

  const dispatch = createEventDispatcher();

  let cardElement: HTMLDivElement;
  let lastSpokenItem = '';

  function toggleFlip() {
    flipped = !flipped;
  }

  // Auto-speak when new card appears (front side)
  $: if (autoSpeak && !flipped && item?.japanese && item.japanese !== lastSpokenItem) {
    lastSpokenItem = item.japanese;
    // Small delay to let card render
    setTimeout(() => playAudio(), 200);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 's' || event.key === 'S') {
      event.preventDefault();
      playAudio();
      return;
    }
    if (event.code === 'Space' || event.code === 'Enter') {
      event.preventDefault();
      toggleFlip();
    }
  }

  function handleCorrect() {
    dispatch('correct', { item });
  }

  function handleWrong() {
    dispatch('wrong', { item });
  }

  function playAudio() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Use kana for TTS to avoid double reading (kanji + kana)
      const text = item.kana || item.japanese;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  }

  // Auto-flip after delay
  $: {
    if (autoFlip && !flipped) {
      const timer = setTimeout(() => {
        flipped = true;
      }, 3000);
      // Cleanup will be handled by Svelte
    }
  }
</script>

<div
  class="flashcard"
  class:flipped
  tabindex="0"
  role="button"
  aria-label="Flip card"
  on:click={toggleFlip}
  on:keydown={handleKeydown}
  bind:this={cardElement}
>
  <div class="flashcard-inner">
    <!-- Front Side (Question) -->
    <div class="flashcard-front">
      <div class="fc-japanese">{frontText}</div>
      <div class="hint-text">Space to flip · S to speak</div>
      <button class="btn-speak btn-speak--fc" on:click|stopPropagation={playAudio}>
        🔊 Speak (S)
      </button>
    </div>

    <!-- Back Side (Answer) -->
    <div class="flashcard-back">
      <div class="fc-meaning">{backText}</div>
      {#if item.example}
        <div class="fc-example">{item.example}</div>
      {/if}
    </div>
  </div>
</div>

<!-- Navigation Controls -->
<div class="fc-nav">
  <button class="btn btn-danger" on:click={handleWrong}>
    ✗ Wrong
  </button>
  <button class="btn btn-success" on:click={handleCorrect}>
    ✓ Correct
  </button>
</div>

<style>
  /* 3D Flip Animation - Critical: preserve-3d */
  .flashcard {
    perspective: 800px;
    width: 100%;
    max-width: 480px;
    height: 280px;
    margin: 0 auto 1rem;
    cursor: pointer;
    outline: none;
  }

  .flashcard-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.5s ease;
    transform-style: preserve-3d;
  }

  .flashcard.flipped .flashcard-inner {
    transform: rotateY(180deg);
  }

  .flashcard-front,
  .flashcard-back {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow-lg);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .flashcard-back {
    transform: rotateY(180deg);
  }

  /* Front Side Styles */
  .fc-japanese {
    font-family: var(--font-jp);
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    line-height: 1.4;
    margin-bottom: 0.5rem;
  }

  .fc-kana {
    font-family: var(--font-jp);
    font-size: 1.3rem;
    color: var(--primary);
    margin-bottom: 0.3rem;
  }

  .hint-text {
    text-align: center;
    font-size: 0.82rem;
    color: var(--text-muted);
    margin-top: 1rem;
  }

  /* Back Side Styles */
  .fc-meaning {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  .fc-english {
    font-size: 0.9rem;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
    text-align: center;
  }

  .fc-example {
    font-family: var(--font-jp);
    font-size: 0.85rem;
    color: var(--text-muted);
    font-style: italic;
    text-align: center;
    margin-top: 0.5rem;
  }

  /* Navigation */
  .fc-nav {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: 1rem;
  }

  /* Mobile Responsive */
  @media (max-width: 600px) {
    .flashcard {
      height: 240px;
    }

    .fc-japanese {
      font-size: 1.6rem;
    }

    .fc-nav {
      gap: 0.4rem;
    }

    .fc-nav .btn {
      padding: 0.5rem 0.8rem;
      font-size: 0.85rem;
    }
  }
</style>
