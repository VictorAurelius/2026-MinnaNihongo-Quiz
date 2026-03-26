<script lang="ts">
  /**
   * SRS Review Page — Advanced
   * Shows due items for spaced repetition review
   * Supports vocab + kanji, multi-course (N5/N4/N3)
   */

  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';
  import { progressStore } from '$lib/stores';
  import { getDueItems, getDueItemsByType, reviewItem, recordReviewDay, getReviewStats, type SRSItemType } from '$lib/utils/srsUtils';
  import SkeletonCard from '$lib/components/common/SkeletonCard.svelte';
  import { recordStudySession } from '$lib/utils/achievementUtils';
  import { playJapaneseAudio } from '$lib/utils/audioUtils';
  import { getCourse, getAllCourses } from '$lib/data/courses';
  import type { VocabItem } from '$lib/types';

  interface ReviewCard {
    itemId: string;
    lessonNumber: number;
    item: VocabItem | null;
    itemType: SRSItemType;
    courseLabel: string;
  }

  let cards: ReviewCard[] = [];
  let currentIndex = 0;
  let flipped = false;
  let score = 0;
  let total = 0;
  let loaded = false;
  let filterType: 'all' | SRSItemType = 'all';

  $: currentCard = cards[currentIndex] || null;
  $: isComplete = loaded && currentIndex >= cards.length;
  $: progressPct = cards.length > 0 ? Math.round(((currentIndex) / cards.length) * 100) : 0;
  $: stats = getReviewStats();

  onMount(() => {
    loadCards();
  });

  function loadCards() {
    const due = getDueItems($progressStore);
    const courses = getAllCourses();

    cards = due.map(d => {
      let item: VocabItem | null = null;
      let courseLabel = '';
      const itemType: SRSItemType = d.itemType || 'vocab';

      // Try each course to find the vocab item
      for (const course of courses) {
        const lessonData = course.getLessonData(d.lessonNumber);
        if (lessonData) {
          const vocab = lessonData.vocabulary.find(v => v.japanese === d.itemId || v.kana === d.itemId);
          if (vocab) {
            item = vocab;
            courseLabel = course.metadata.level;
            break;
          }
        }
      }

      return { ...d, item, itemType, courseLabel };
    }).filter(c => c.item !== null);

    // Apply type filter
    if (filterType !== 'all') {
      cards = cards.filter(c => c.itemType === filterType);
    }

    total = cards.length;
    currentIndex = 0;
    score = 0;
    flipped = false;
    loaded = true;
  }

  function handleCorrect() {
    const card = cards[currentIndex];
    reviewItem(card.itemId, card.lessonNumber, 4, card.itemType);
    score++;
    advance();
  }

  function handleWrong() {
    const card = cards[currentIndex];
    reviewItem(card.itemId, card.lessonNumber, 1, card.itemType);
    advance();
  }

  function advance() {
    flipped = false;
    currentIndex++;
    if (currentIndex >= cards.length) {
      recordReviewDay();
      recordStudySession();
    }
  }

  function toggleFlip() {
    flipped = !flipped;
  }

  function setFilter(type: 'all' | SRSItemType) {
    filterType = type;
    loaded = false;
    loadCards();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'F1' && currentCard?.item) {
      event.preventDefault();
      playJapaneseAudio(currentCard.item.kana || currentCard.item.japanese);
      return;
    }
    if (event.code === 'Space' || event.code === 'Enter') {
      event.preventDefault();
      if (flipped) {
        // If flipped, Enter = correct
        if (event.code === 'Enter') handleCorrect();
      } else {
        toggleFlip();
      }
    }
  }
</script>

<svelte:head>
  <title>Review - Smart Quiz</title>
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<div class="review-page">
  <!-- Stats Bar -->
  <div class="stats-bar">
    <div class="stat">
      <span class="stat-label">Streak</span>
      <span class="stat-value">{stats.streak} days</span>
    </div>
    <div class="stat">
      <span class="stat-label">Today</span>
      <span class="stat-value">{stats.todayCompleted} done</span>
    </div>
  </div>

  <!-- Type Filter -->
  <div class="filter-bar">
    <button class="filter-btn" class:active={filterType === 'all'} on:click={() => setFilter('all')}>
      All
    </button>
    <button class="filter-btn" class:active={filterType === 'vocab'} on:click={() => setFilter('vocab')}>
      Vocab
    </button>
    <button class="filter-btn" class:active={filterType === 'kanji'} on:click={() => setFilter('kanji')}>
      Kanji
    </button>
  </div>

  {#if !loaded}
    <div class="skeleton-loading">
      <SkeletonCard />
      <SkeletonCard />
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
      {#if stats.streak > 0}
        <div class="streak-badge">🔥 {stats.streak} day streak!</div>
      {/if}
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
      on:keydown={handleKeydown}
    >
      <div class="flashcard-inner">
        <div class="flashcard-front">
          <div class="card-badges">
            {#if currentCard.courseLabel}
              <span class="badge badge-level">{currentCard.courseLabel}</span>
            {/if}
            <span class="badge badge-type">{currentCard.itemType}</span>
          </div>
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

  /* Stats Bar */
  .stats-bar {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.75rem;
    padding: 0.75rem 1rem;
    background: var(--bg-card, #fff);
    border: 1px solid var(--border, #e5e7eb);
    border-radius: var(--radius, 0.5rem);
  }

  .stat {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .stat-label {
    font-size: 0.7rem;
    text-transform: uppercase;
    color: var(--text-muted, #9ca3af);
    letter-spacing: 0.05em;
  }

  .stat-value {
    font-size: 0.95rem;
    font-weight: 600;
  }

  /* Filter Bar */
  .filter-bar {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .filter-btn {
    padding: 0.4rem 0.8rem;
    border: 1px solid var(--border, #e5e7eb);
    border-radius: 2rem;
    background: var(--bg-card, #fff);
    cursor: pointer;
    font-size: 0.85rem;
    color: var(--text-muted, #6b7280);
    transition: all 0.15s;
  }

  .filter-btn.active {
    background: var(--primary, #6366f1);
    color: white;
    border-color: var(--primary, #6366f1);
  }

  /* Card badges */
  .card-badges {
    display: flex;
    gap: 0.4rem;
    margin-bottom: 0.5rem;
  }

  .badge {
    font-size: 0.7rem;
    padding: 0.15rem 0.5rem;
    border-radius: 1rem;
    font-weight: 600;
  }

  .badge-level {
    background: var(--primary, #6366f1);
    color: white;
  }

  .badge-type {
    background: var(--border, #e5e7eb);
    color: var(--text-muted, #6b7280);
  }

  .streak-badge {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: #f59e0b;
    font-weight: 600;
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
    margin-bottom: 0.5rem;
  }

  .results-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>
