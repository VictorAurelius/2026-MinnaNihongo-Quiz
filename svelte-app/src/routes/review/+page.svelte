<script lang="ts">
  /**
   * SRS Review Page
   * Shows due items for spaced repetition review
   */

  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';
  import { progressStore } from '$lib/stores';
  import { getDueItems, reviewItem } from '$lib/utils/srsUtils';
  import { recordStudySession } from '$lib/utils/achievementUtils';
  import { playJapaneseAudio } from '$lib/utils/audioUtils';
  import { getCourse } from '$lib/data/courses';
  import type { VocabItem } from '$lib/types';

  interface ReviewCard {
    itemId: string;
    lessonNumber: number;
    item: VocabItem | null;
  }

  let cards: ReviewCard[] = [];
  let currentIndex = 0;
  let flipped = false;
  let score = 0;
  let total = 0;
  let loaded = false;

  $: currentCard = cards[currentIndex] || null;
  $: isComplete = loaded && currentIndex >= cards.length;
  $: progressPct = cards.length > 0 ? Math.round(((currentIndex) / cards.length) * 100) : 0;

  onMount(() => {
    const due = getDueItems($progressStore);
    const course = getCourse('n5');

    cards = due.map(d => {
      const lessonData = course?.getLessonData(d.lessonNumber);
      const vocab = lessonData?.vocabulary.find(v => v.japanese === d.itemId || v.kana === d.itemId);
      return { ...d, item: vocab || null };
    }).filter(c => c.item !== null);

    total = cards.length;
    loaded = true;
  });

  function handleCorrect() {
    const card = cards[currentIndex];
    reviewItem(card.itemId, card.lessonNumber, 4);
    score++;
    advance();
  }

  function handleWrong() {
    const card = cards[currentIndex];
    reviewItem(card.itemId, card.lessonNumber, 1);
    advance();
  }

  function advance() {
    flipped = false;
    currentIndex++;
    if (currentIndex >= cards.length) {
      recordStudySession();
    }
  }

  function toggleFlip() {
    flipped = !flipped;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'F1' && currentCard?.item) {
      event.preventDefault();
      playJapaneseAudio(currentCard.item.kana || currentCard.item.japanese);
      return;
    }
    if (event.code === 'Space' || event.code === 'Enter') {
      event.preventDefault();
      toggleFlip();
    }
  }
</script>

<svelte:head>
  <title>Review - Smart Quiz</title>
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<div class="review-page">
  {#if !loaded}
    <div class="empty-state">
      <p>Loading...</p>
    </div>
  {:else if cards.length === 0}
    <div class="empty-state">
      <div class="empty-icon">🎉</div>
      <h2>All caught up!</h2>
      <p>No items due for review. Keep studying to build your review queue.</p>
      <a href="{base}/courses" class="btn btn-primary">Go to Courses</a>
    </div>
  {:else if isComplete}
    <div class="results-card">
      <h2>Review Complete!</h2>
      <div class="results-score">
        <span class="score-num">{score}</span>
        <span class="score-div">/</span>
        <span class="score-total">{total}</span>
      </div>
      <div class="results-pct">{Math.round((score / total) * 100)}%</div>
      <div class="results-actions">
        <a href="{base}/stats" class="btn btn-primary">View Stats</a>
        <a href="{base}/" class="btn btn-secondary">Home</a>
      </div>
    </div>
  {:else if currentCard?.item}
    <!-- Progress bar -->
    <div class="review-progress">
      <div class="progress-bar-bg">
        <div class="progress-bar" style="width: {progressPct}%"></div>
      </div>
      <span class="progress-text">{currentIndex + 1} / {cards.length}</span>
    </div>

    <!-- Card -->
    <div
      class="flashcard"
      class:flipped
      tabindex="0"
      role="button"
      aria-label="Flip card"
      on:click={toggleFlip}
    >
      <div class="flashcard-inner">
        <div class="flashcard-front">
          <div class="fc-text">{currentCard.item.japanese}</div>
          {#if currentCard.item.kana !== currentCard.item.japanese}
            <div class="fc-kana">{currentCard.item.kana}</div>
          {/if}
          <div class="fc-lesson">Lesson {currentCard.lessonNumber}</div>
          <div class="hint-text">Space to flip · F1 to speak</div>
          <button class="btn-speak btn-speak--fc" on:click|stopPropagation={() => playJapaneseAudio(currentCard?.item?.kana || currentCard?.item?.japanese || '')}>
            🔊 Speak (F1)
          </button>
        </div>
        <div class="flashcard-back">
          <div class="fc-meaning">{currentCard.item.vietnamese}</div>
          <div class="fc-english">{currentCard.item.english}</div>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="review-nav">
      <button class="btn btn-danger" on:click={handleWrong}>
        ✗ Again
      </button>
      <button class="btn btn-success" on:click={handleCorrect}>
        ✓ Got it
      </button>
    </div>
  {/if}
</div>

<style>
  .review-page {
    max-width: 500px;
    margin: 0 auto;
    padding: 1rem;
    animation: fadeIn 0.25s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .empty-state {
    text-align: center;
    padding: 3rem 1rem;
    color: var(--text-muted);
  }

  .empty-icon {
    font-size: 3rem;
    margin-bottom: 0.75rem;
  }

  .empty-state h2 {
    color: var(--text);
    margin-bottom: 0.5rem;
  }

  .empty-state .btn {
    margin-top: 1rem;
  }

  /* Progress */
  .review-progress {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .progress-bar-bg {
    flex: 1;
    height: 0.5rem;
    background: var(--border);
    border-radius: 0.25rem;
    overflow: hidden;
  }

  .progress-bar {
    height: 100%;
    background: var(--primary);
    border-radius: 0.25rem;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-muted);
    white-space: nowrap;
  }

  /* Flashcard */
  .flashcard {
    perspective: 800px;
    width: 100%;
    height: 260px;
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

  .fc-text {
    font-family: var(--font-jp);
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 0.3rem;
  }

  .fc-kana {
    font-family: var(--font-jp);
    font-size: 1.1rem;
    color: var(--primary);
    margin-bottom: 0.3rem;
  }

  .fc-lesson {
    font-size: 0.75rem;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
  }

  .hint-text {
    font-size: 0.78rem;
    color: var(--text-muted);
    margin-top: 0.5rem;
  }

  .fc-meaning {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  .fc-english {
    font-size: 0.9rem;
    color: var(--text-muted);
    text-align: center;
  }

  .review-nav {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
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

  .results-card h2 {
    margin-bottom: 1rem;
  }

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
