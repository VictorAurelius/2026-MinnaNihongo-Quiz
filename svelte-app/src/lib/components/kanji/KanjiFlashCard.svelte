<script lang="ts">
  /**
   * Kanji FlashCard Component with 3D Flip Animation
   * Front: large kanji character; Back: readings + meanings + examples
   */

  import type { KanjiItem } from '$lib/types';
  import { createEventDispatcher } from 'svelte';
  import { playJapaneseAudio } from '$lib/utils/audioUtils';

  export let item: KanjiItem;
  export let flipped = false;

  const dispatch = createEventDispatcher();

  function toggleFlip() {
    flipped = !flipped;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'F1') {
      event.preventDefault();
      playJapaneseAudio(item.character);
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
</script>

<div
  class="flashcard"
  class:flipped
  tabindex="0"
  role="button"
  aria-label="Flip card"
  on:click={toggleFlip}
  on:keydown={handleKeydown}
>
  <div class="flashcard-inner">
    <!-- Front Side (Kanji) -->
    <div class="flashcard-front">
      <div class="fc-kanji">{item.character}</div>
      <div class="fc-stroke">{item.strokeCount} strokes</div>
      <div class="hint-text">Space to flip · F1 to speak</div>
      <button class="btn-speak btn-speak--fc" on:click|stopPropagation={() => playJapaneseAudio(item.character)}>
        🔊 Speak (F1)
      </button>
    </div>

    <!-- Back Side (Readings + Meaning + Examples) -->
    <div class="flashcard-back">
      <div class="fc-readings">
        {#if item.onyomi.length > 0}
          <div class="fc-reading-row">
            <span class="reading-label">音</span>
            <span class="reading-on">{item.onyomi.join('、')}</span>
          </div>
        {/if}
        {#if item.kunyomi.length > 0}
          <div class="fc-reading-row">
            <span class="reading-label">訓</span>
            <span class="reading-kun">{item.kunyomi.join('、')}</span>
          </div>
        {/if}
      </div>
      <div class="fc-meaning">{item.vietnamese}</div>
      <div class="fc-english">{item.english}</div>
      {#if item.examples.length > 0}
        <div class="fc-example">
          {item.examples[0].word} ({item.examples[0].kana}) - {item.examples[0].vietnamese}
        </div>
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
  .flashcard {
    perspective: 800px;
    width: 100%;
    max-width: 480px;
    height: 300px;
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

  .fc-kanji {
    font-family: var(--font-jp);
    font-size: 4rem;
    font-weight: 700;
    text-align: center;
    line-height: 1.2;
    margin-bottom: 0.5rem;
  }

  .fc-stroke {
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
  }

  .hint-text {
    text-align: center;
    font-size: 0.82rem;
    color: var(--text-muted);
    margin-top: 0.5rem;
  }

  .fc-readings {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    margin-bottom: 0.75rem;
  }

  .fc-reading-row {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--font-jp);
    font-size: 1.1rem;
  }

  .reading-label {
    font-size: 0.65rem;
    font-weight: 700;
    padding: 0.1rem 0.3rem;
    border-radius: 3px;
    background: var(--border);
    color: var(--text-muted);
  }

  .reading-on {
    color: var(--primary);
    font-weight: 500;
  }

  .reading-kun {
    color: var(--accent);
    font-weight: 500;
  }

  .fc-meaning {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.3rem;
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
    font-size: 0.82rem;
    color: var(--text-muted);
    font-style: italic;
    text-align: center;
  }

  .fc-nav {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: 1rem;
  }

  @media (max-width: 600px) {
    .flashcard {
      height: 260px;
    }

    .fc-kanji {
      font-size: 3rem;
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
