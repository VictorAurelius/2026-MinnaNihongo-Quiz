<script lang="ts">
  /**
   * Home / Landing Page
   * Attractive intro with quick access to all sections
   */

  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { getAllCourses } from '$lib/data/courses';
  import { getKanjiLessonMetadata } from '$lib/data/kanji/lessons';
  import { HSK5_DATA } from '$lib/data/hsk';

  console.log('[SmartQuiz] Home page script init');

  let courses: ReturnType<typeof getAllCourses> = [];
  let totalLessons = 0;
  let totalVocab = 0;
  let kanjiCount = 0;
  let hskWordCount = 0;

  try {
    courses = getAllCourses();
    totalLessons = courses.reduce((sum, c) => sum + c.metadata.lessonCount, 0);
    totalVocab = courses.reduce((sum, c) =>
      sum + c.getAllLessons().reduce((s, l) => s + l.vocabulary.length, 0), 0);
    kanjiCount = getKanjiLessonMetadata().reduce((sum, l) => sum + l.kanjiCount, 0);
    hskWordCount = HSK5_DATA.reduce((sum, g) => sum + g.words.length, 0);
    console.log('[SmartQuiz] Home data loaded:', { courses: courses.length, totalLessons, totalVocab, kanjiCount, hskWordCount });
  } catch (e) {
    console.error('[SmartQuiz] Home data error:', e);
  }

  onMount(() => {
    console.log('[SmartQuiz] Home page mounted');
  });
</script>

<svelte:head>
  <title>Smart Quiz - Japanese & Chinese Learning</title>
</svelte:head>

<div class="landing">
  <!-- Hero Section -->
  <section class="hero">
    <div class="hero-badge">Smart Quiz</div>
    <h1 class="hero-title">
      Learn <span class="hero-jp">日本語</span> &amp; <span class="hero-cn">中文</span>
    </h1>
    <p class="hero-subtitle">
      Interactive flashcards, quizzes, and reference tables for Japanese &amp; Chinese learners
    </p>
    <div class="hero-stats">
      <div class="stat">
        <span class="stat-number">{totalLessons}</span>
        <span class="stat-label">Lessons</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat">
        <span class="stat-number">{totalVocab}+</span>
        <span class="stat-label">Words</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat">
        <span class="stat-number">{kanjiCount}</span>
        <span class="stat-label">Kanji</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat">
        <span class="stat-number">{hskWordCount}+</span>
        <span class="stat-label">HSK Words</span>
      </div>
    </div>
  </section>

  <!-- Section Cards -->
  <section class="sections">
    <h2 class="sections-title">Start Learning</h2>

    <div class="section-grid">
      <!-- Japanese Courses -->
      {#each courses as course}
        <button
          class="section-card card-lessons"
          style="--course-color: {course.metadata.color}"
          on:click={() => goto(`${base}/course/${course.metadata.id}`)}
        >
          <div class="card-icon">{course.metadata.icon}</div>
          <div class="card-content">
            <h3>{course.metadata.title}</h3>
            <p>{course.metadata.description}</p>
          </div>
          <span class="card-arrow">→</span>
        </button>
      {/each}

      <!-- Kanji -->
      <button class="section-card card-kanji" on:click={() => goto(`${base}/kanji`)}>
        <div class="card-icon-jp">漢</div>
        <div class="card-content">
          <h3>Kanji</h3>
          <p>{kanjiCount} kanji — readings, meanings &amp; examples</p>
        </div>
        <span class="card-arrow">→</span>
      </button>

      <!-- Alphabet -->
      <button class="section-card card-alphabet" on:click={() => goto(`${base}/alphabet`)}>
        <div class="card-icon-jp">あ</div>
        <div class="card-content">
          <h3>Alphabet</h3>
          <p>Hiragana &amp; Katakana charts</p>
        </div>
        <span class="card-arrow">→</span>
      </button>

      <!-- Grammar -->
      <button class="section-card card-grammar" on:click={() => goto(`${base}/grammar-reference`)}>
        <div class="card-icon-jp">文</div>
        <div class="card-content">
          <h3>Grammar Reference</h3>
          <p>Patterns, comparisons &amp; examples</p>
        </div>
        <span class="card-arrow">→</span>
      </button>

      <!-- Counters -->
      <button class="section-card card-counters" on:click={() => goto(`${base}/counters`)}>
        <div class="card-icon-jp">数</div>
        <div class="card-content">
          <h3>Counters</h3>
          <p>Japanese counting systems</p>
        </div>
        <span class="card-arrow">→</span>
      </button>

      <!-- HSK -->
      <button class="section-card card-hsk" on:click={() => goto(`${base}/hsk`)}>
        <div class="card-icon-jp card-icon-cn">中</div>
        <div class="card-content">
          <h3>HSK 5 Vocabulary</h3>
          <p>{hskWordCount}+ Chinese words</p>
        </div>
        <span class="card-arrow">→</span>
      </button>
    </div>
  </section>

  <!-- Quiz modes highlight -->
  <section class="modes">
    <h2 class="modes-title">3 Quiz Modes</h2>
    <div class="modes-grid">
      <div class="mode-card">
        <span class="mode-icon">🎴</span>
        <span class="mode-name">Flashcard</span>
        <span class="mode-desc">Flip to reveal</span>
      </div>
      <div class="mode-card">
        <span class="mode-icon">✓</span>
        <span class="mode-name">Multiple Choice</span>
        <span class="mode-desc">Pick the answer</span>
      </div>
      <div class="mode-card">
        <span class="mode-icon">⌨️</span>
        <span class="mode-name">Typing</span>
        <span class="mode-desc">Type to answer</span>
      </div>
    </div>
  </section>
</div>

<style>
  .landing {
    max-width: 700px;
    margin: 0 auto;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* --- Hero --- */
  .hero {
    text-align: center;
    padding: 2rem 1rem 1.75rem;
  }

  .hero-badge {
    display: inline-block;
    padding: 0.3rem 0.9rem;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--primary);
    background: color-mix(in srgb, var(--primary) 10%, transparent);
    border: 1px solid color-mix(in srgb, var(--primary) 25%, transparent);
    border-radius: 20px;
    margin-bottom: 1rem;
  }

  .hero-title {
    font-size: 1.8rem;
    font-weight: 800;
    line-height: 1.3;
    margin-bottom: 0.75rem;
  }

  .hero-jp {
    font-family: var(--font-jp);
    color: var(--primary);
  }

  .hero-cn {
    font-family: var(--font-cn);
    color: var(--accent);
  }

  .hero-subtitle {
    font-size: 0.95rem;
    color: var(--text-muted);
    line-height: 1.5;
    max-width: 440px;
    margin: 0 auto 1.5rem;
  }

  .hero-stats {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stat-number {
    font-size: 1.3rem;
    font-weight: 800;
    color: var(--primary);
  }

  .stat-label {
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .stat-divider {
    width: 1px;
    height: 28px;
    background: var(--border);
  }

  /* --- Sections --- */
  .sections {
    margin-bottom: 1.5rem;
  }

  .sections-title {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
  }

  .section-grid {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .section-card {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    width: 100%;
    padding: 0.9rem 1.1rem;
    background: var(--bg-card);
    border: 1.5px solid var(--border);
    border-radius: var(--radius);
    cursor: pointer;
    text-align: left;
    font-family: inherit;
    color: var(--text);
    transition: all 0.2s ease;
  }

  .section-card:hover {
    border-color: var(--primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .section-card:active {
    transform: translateY(0);
  }

  .card-icon {
    font-size: 1.8rem;
    line-height: 1;
    flex-shrink: 0;
    width: 2.5rem;
    text-align: center;
  }

  .card-icon-jp {
    font-family: var(--font-jp);
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1;
    flex-shrink: 0;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in srgb, var(--primary) 10%, transparent);
    color: var(--primary);
    border-radius: var(--radius-sm);
  }

  .card-icon-cn {
    font-family: var(--font-cn);
    background: color-mix(in srgb, var(--accent) 10%, transparent);
    color: var(--accent);
  }

  .card-content {
    flex: 1;
    min-width: 0;
  }

  .card-content h3 {
    font-size: 0.95rem;
    font-weight: 700;
    margin-bottom: 0.15rem;
  }

  .card-content p {
    font-size: 0.8rem;
    color: var(--text-muted);
    line-height: 1.4;
  }

  .card-arrow {
    font-size: 1.1rem;
    color: var(--text-muted);
    flex-shrink: 0;
    transition: transform 0.2s;
  }

  .section-card:hover .card-arrow {
    transform: translateX(3px);
    color: var(--primary);
  }

  /* --- Quiz Modes --- */
  .modes {
    margin-bottom: 2rem;
  }

  .modes-title {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
  }

  .modes-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.6rem;
  }

  .mode-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
    padding: 1rem 0.5rem;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    text-align: center;
  }

  .mode-icon {
    font-size: 1.5rem;
    line-height: 1;
  }

  .mode-name {
    font-size: 0.8rem;
    font-weight: 700;
  }

  .mode-desc {
    font-size: 0.7rem;
    color: var(--text-muted);
  }

  /* --- Responsive --- */
  @media (max-width: 600px) {
    .hero {
      padding: 1.5rem 0.5rem 1.25rem;
    }

    .hero-title {
      font-size: 1.45rem;
    }

    .hero-subtitle {
      font-size: 0.88rem;
    }

    .hero-stats {
      gap: 0.7rem;
    }

    .stat-number {
      font-size: 1.1rem;
    }

    .section-card {
      padding: 0.75rem 0.9rem;
    }

    .card-content h3 {
      font-size: 0.88rem;
    }

    .modes-grid {
      gap: 0.4rem;
    }

    .mode-card {
      padding: 0.75rem 0.35rem;
    }

    .mode-name {
      font-size: 0.72rem;
    }
  }
</style>
