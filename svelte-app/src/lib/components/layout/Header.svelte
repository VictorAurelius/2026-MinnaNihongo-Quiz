<script lang="ts">
  /**
   * App Header Component
   * Navigation, title, home button, section links, dark mode
   */

  import { toggleDarkMode, uiStore, progressStore } from '$lib/stores';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { getDueCount } from '$lib/utils/srsUtils';
  import BackButton from '../common/BackButton.svelte';

  $: dueCount = getDueCount($progressStore);

  // Strip base path from pathname for route matching
  $: pathname = $page.url.pathname.startsWith(base) && base
    ? $page.url.pathname.slice(base.length) || '/'
    : $page.url.pathname;
  $: isHome = pathname === '/' || pathname === '';
  $: pageTitle = getPageTitle(pathname);

  function getPageTitle(p: string): string {
    if (p === '/' || p === '') return 'Smart Quiz';
    if (p === '/courses') return 'Courses';
    if (p === '/lessons') return 'Lessons'; // Legacy redirect
    if (p.match(/^\/course\/[^/]+\/lesson\/\d+\/vocabulary/)) return 'Vocabulary';
    if (p.match(/^\/course\/[^/]+\/lesson\/\d+\/grammar/)) return 'Grammar';
    if (p.match(/^\/course\/[^/]+\/lesson\/\d+/)) return 'Lesson Menu';
    if (p.match(/^\/course\/[^/]+/)) return 'Course';
    if (p.match(/^\/lesson\/\d+\/vocabulary/)) return 'Vocabulary'; // Legacy
    if (p.match(/^\/lesson\/\d+\/grammar/)) return 'Grammar'; // Legacy
    if (p.startsWith('/lesson/')) return 'Lesson Menu'; // Legacy
    if (p.startsWith('/quiz/')) return 'Quiz';
    if (p.startsWith('/grammar-reference')) return 'Grammar Reference';
    if (p.startsWith('/results')) return 'Results';
    if (p.startsWith('/alphabet')) return 'Alphabet';
    if (p.startsWith('/counters')) return 'Counters';
    if (p.match(/^\/hsk\/[^/]+\/quiz/)) return 'HSK Quiz';
    if (p.startsWith('/hsk/')) return 'HSK Vocabulary';
    if (p === '/hsk') return 'HSK 5';
    if (p.match(/^\/kanji\/\d+\/reference/)) return 'Kanji Reference';
    if (p.match(/^\/kanji\/\d+\/quiz/)) return 'Kanji Quiz';
    if (p.match(/^\/kanji\/\d+/)) return 'Kanji Lesson';
    if (p === '/kanji/radicals') return 'Bộ Thủ';
    if (p === '/kanji') return 'Kanji';
    if (p === '/mock-test') return 'JLPT Mock Test';
    if (p === '/settings') return 'Settings';
    if (p === '/stats') return 'Statistics';
    if (p === '/review') return 'Review';
    if (p === '/premium') return 'Premium';
    if (p === '/about') return 'About';
    if (p.startsWith('/vocab/')) return 'Vocabulary';
    return 'Smart Quiz';
  }

  function goHome() {
    goto(`${base}/`);
  }
</script>

<header id="app-header">
  <div class="header-left">
    {#if !isHome}
      <BackButton text="" />
    {/if}
    {#if isHome}
      <img src="{base}/logo.svg" alt="Smart Quiz" class="header-logo" height="24" />
    {:else}
      <h1 id="header-title">{pageTitle}</h1>
    {/if}
  </div>

  <div class="header-right">
    {#if !isHome}
      <button
        class="icon-btn"
        on:click={goHome}
        aria-label="Go to home"
        title="Home"
      >
        🏠
      </button>
    {/if}

    <a
      href="{base}/settings"
      class="icon-btn"
      aria-label="Settings"
      title="Settings"
    >
      ⚙️
    </a>

    <button
      class="icon-btn"
      on:click={toggleDarkMode}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {$uiStore.darkMode ? '☀️' : '🌙'}
    </button>
  </div>
</header>

<!-- Bottom navigation on home page -->
{#if isHome}
  <nav class="section-nav">
    <a href="{base}/courses" class="nav-link">
      <span class="nav-icon">📚</span>
      <span>Courses</span>
    </a>
    <a href="{base}/kanji" class="nav-link">
      <span class="nav-icon">漢</span>
      <span>Kanji</span>
    </a>
    <a href="{base}/alphabet" class="nav-link">
      <span class="nav-icon">あ</span>
      <span>Alphabet</span>
    </a>
    <a href="{base}/grammar-reference" class="nav-link">
      <span class="nav-icon">文</span>
      <span>Grammar</span>
    </a>
    <a href="{base}/counters" class="nav-link">
      <span class="nav-icon">数</span>
      <span>Counters</span>
    </a>
    <a href="{base}/hsk" class="nav-link">
      <span class="nav-icon">中</span>
      <span>HSK</span>
    </a>
    <a href="{base}/stats" class="nav-link">
      <span class="nav-icon">📊</span>
      <span>Stats</span>
    </a>
    <a href="{base}/review" class="nav-link">
      <span class="nav-icon">🔄</span>
      <span>Review{#if dueCount > 0} ({dueCount}){/if}</span>
    </a>
  </nav>
{/if}

<style>
  #app-header {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1.25rem;
    background: var(--bg-header);
    border-bottom: 1px solid var(--border);
    box-shadow: var(--shadow);
    transition: background var(--transition), border-color var(--transition);
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .header-logo {
    height: 24px;
    width: auto;
  }

  #header-title {
    font-size: 1.1rem;
    font-weight: 700;
    white-space: nowrap;
    margin: 0;
  }

  .section-nav {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    background: var(--bg-card);
    border-bottom: 1px solid var(--border);
    flex-wrap: wrap;
  }

  .nav-link {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.35rem 0.75rem;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-muted);
    text-decoration: none;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    transition: all var(--transition);
  }

  .nav-link:hover {
    color: var(--primary);
    border-color: var(--primary);
    background: var(--bg);
  }

  .nav-icon {
    font-size: 1rem;
    font-family: var(--font-jp);
  }

  @media (max-width: 600px) {
    #header-title {
      font-size: 0.95rem;
    }

    .section-nav {
      gap: 0.35rem;
      padding: 0.5rem 0.5rem;
    }

    .nav-link {
      font-size: 0.75rem;
      padding: 0.3rem 0.5rem;
    }
  }
</style>
