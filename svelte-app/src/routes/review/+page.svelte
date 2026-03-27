<script lang="ts">
  /**
   * SRS Review Page — Advanced
   * Shows due items for spaced repetition review
   */

  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';
  import { progressStore } from '$lib/stores';
  import { getDueItems, reviewItem, recordReviewDay, getReviewStats, type SRSItemType } from '$lib/utils/srsUtils';
  import SkeletonCard from '$lib/components/common/SkeletonCard.svelte';
  import { recordStudySession } from '$lib/utils/achievementUtils';
  import { playJapaneseAudio } from '$lib/utils/audioUtils';
  import { getAllCourses } from '$lib/data/courses';
  import { Card, CardContent } from '$lib/components/ui/card';
  import Badge from '$lib/components/ui/badge/badge.svelte';
  import UiButton from '$lib/components/ui/button/button.svelte';
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

  onMount(() => { loadCards(); });

  function loadCards() {
    const due = getDueItems($progressStore);
    const courses = getAllCourses();
    cards = due.map(d => {
      let item: VocabItem | null = null;
      let courseLabel = '';
      const itemType: SRSItemType = d.itemType || 'vocab';
      for (const course of courses) {
        const lessonData = course.getLessonData(d.lessonNumber);
        if (lessonData) {
          const vocab = lessonData.vocabulary.find(v => v.japanese === d.itemId || v.kana === d.itemId);
          if (vocab) { item = vocab; courseLabel = course.metadata.level; break; }
        }
      }
      return { ...d, item, itemType, courseLabel };
    }).filter(c => c.item !== null);
    if (filterType !== 'all') cards = cards.filter(c => c.itemType === filterType);
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
    if (currentIndex >= cards.length) { recordReviewDay(); recordStudySession(); }
  }

  function toggleFlip() { flipped = !flipped; }

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
      if (flipped) { if (event.code === 'Enter') handleCorrect(); }
      else toggleFlip();
    }
  }
</script>

<svelte:head>
  <title>Review - Smart Quiz</title>
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<div class="mx-auto max-w-md p-4 animate-in">
  <!-- Stats Bar -->
  <Card class="mb-3">
    <CardContent class="py-3 flex gap-6">
      <div>
        <div class="text-[0.65rem] uppercase text-muted-foreground tracking-wider">Streak</div>
        <div class="text-sm font-semibold">{stats.streak} days</div>
      </div>
      <div>
        <div class="text-[0.65rem] uppercase text-muted-foreground tracking-wider">Today</div>
        <div class="text-sm font-semibold">{stats.todayCompleted} done</div>
      </div>
    </CardContent>
  </Card>

  <!-- Type Filter -->
  <div class="flex gap-2 mb-4">
    {#each [{ type: 'all' as const, label: 'All' }, { type: 'vocab' as const, label: 'Vocab' }, { type: 'kanji' as const, label: 'Kanji' }] as f}
      <button
        class="px-3.5 py-1.5 rounded-full border text-sm cursor-pointer transition-all
          {filterType === f.type ? 'bg-primary text-white border-primary' : 'bg-card text-muted-foreground border-border hover:border-primary'}"
        on:click={() => setFilter(f.type)}
      >{f.label}</button>
    {/each}
  </div>

  {#if !loaded}
    <div class="space-y-3"><SkeletonCard /><SkeletonCard /></div>
  {:else if cards.length === 0}
    <div class="text-center py-12 text-muted-foreground">
      <div class="text-5xl mb-3">🎉</div>
      <h2 class="text-lg font-bold text-foreground mb-2">All caught up!</h2>
      <p class="text-sm mb-4">No items due for review. Keep studying to build your review queue.</p>
      <UiButton onclick={() => goto(`${base}/courses`)}>Go to Courses</UiButton>
    </div>
  {:else if isComplete}
    <Card>
      <CardContent class="py-8 text-center">
        <h2 class="text-xl font-bold mb-3">Review Complete!</h2>
        <div class="text-4xl font-bold mb-2">
          <span class="text-success">{score}</span>
          <span class="text-muted-foreground mx-1">/</span>
          <span class="text-muted-foreground">{total}</span>
        </div>
        <div class="text-lg text-primary font-semibold mb-2">{Math.round((score / total) * 100)}%</div>
        {#if stats.streak > 0}
          <div class="text-base font-semibold text-warning mb-4">🔥 {stats.streak} day streak!</div>
        {/if}
        <div class="flex gap-3 justify-center flex-wrap">
          <UiButton onclick={() => goto(`${base}/stats`)}>View Stats</UiButton>
          <UiButton variant="secondary" onclick={() => goto(`${base}/`)}>Home</UiButton>
        </div>
      </CardContent>
    </Card>
  {:else if currentCard?.item}
    <!-- Progress bar -->
    <div class="flex items-center gap-3 mb-4">
      <div class="flex-1 h-2 bg-border rounded-full overflow-hidden">
        <div class="h-full bg-primary rounded-full transition-all duration-300" style="width: {progressPct}%"></div>
      </div>
      <span class="text-xs font-semibold text-muted-foreground whitespace-nowrap">{currentIndex + 1} / {cards.length}</span>
    </div>

    <!-- Flashcard (keep scoped CSS for 3D flip) -->
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
          <div class="flex gap-1.5 mb-2">
            {#if currentCard.courseLabel}
              <Badge>{currentCard.courseLabel}</Badge>
            {/if}
            <Badge variant="secondary">{currentCard.itemType}</Badge>
          </div>
          <div class="text-3xl font-bold text-center mb-1" style="font-family: var(--font-jp)">{currentCard.item.japanese}</div>
          {#if currentCard.item.kana !== currentCard.item.japanese}
            <div class="text-base text-primary mb-1">{currentCard.item.kana}</div>
          {/if}
          <div class="text-xs text-muted-foreground mb-2">Lesson {currentCard.lessonNumber}</div>
          <div class="text-xs text-muted-foreground mt-2">Space to flip · F1 to speak</div>
          <button class="btn-speak btn-speak--fc mt-1" on:click|stopPropagation={() => playJapaneseAudio(currentCard?.item?.kana || currentCard?.item?.japanese || '')}>
            🔊 Speak (F1)
          </button>
        </div>
        <div class="flashcard-back">
          <div class="text-xl font-semibold mb-2 text-center">{currentCard.item.vietnamese}</div>
          <div class="text-sm text-muted-foreground text-center">{currentCard.item.english}</div>
        </div>
      </div>
    </div>

    <!-- Nav buttons -->
    <div class="flex justify-center gap-3 mt-4">
      <button class="btn btn-danger" on:click={handleWrong}>✗ Again</button>
      <button class="btn btn-success" on:click={handleCorrect}>✓ Got it</button>
    </div>
  {/if}
</div>

<style>
  /* 3D Flashcard — must be scoped CSS for preserve-3d to work */
  .flashcard {
    perspective: 800px;
    width: 100%;
    height: 280px;
    margin: 0 auto;
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
  .flashcard.flipped .flashcard-inner { transform: rotateY(180deg); }
  .flashcard-front, .flashcard-back {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background: var(--color-card);
    border: 1px solid var(--color-border);
    border-radius: 0.75rem;
    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
  .flashcard-back { transform: rotateY(180deg); }
</style>
