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
    if (p === '/lessons') return 'Lessons';
    if (p.match(/^\/course\/[^/]+\/lesson\/\d+\/vocabulary/)) return 'Vocabulary';
    if (p.match(/^\/course\/[^/]+\/lesson\/\d+\/grammar/)) return 'Grammar';
    if (p.match(/^\/course\/[^/]+\/lesson\/\d+/)) return 'Lesson Menu';
    if (p.match(/^\/course\/[^/]+/)) return 'Course';
    if (p.match(/^\/lesson\/\d+\/vocabulary/)) return 'Vocabulary';
    if (p.match(/^\/lesson\/\d+\/grammar/)) return 'Grammar';
    if (p.startsWith('/lesson/')) return 'Lesson Menu';
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

<header class="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-card border-b border-border shadow-sm transition-colors">
  <div class="flex items-center gap-2.5">
    {#if !isHome}
      <BackButton text="" />
    {/if}
    {#if isHome}
      <img src="{base}/logo.svg" alt="Smart Quiz" class="h-6 w-auto" height="24" />
    {:else}
      <h1 class="text-base font-bold whitespace-nowrap m-0 sm:text-lg">{pageTitle}</h1>
    {/if}
  </div>

  <div class="flex items-center gap-1">
    {#if !isHome}
      <button
        class="icon-btn w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors text-base"
        on:click={goHome}
        aria-label="Go to home"
        title="Home"
      >
        🏠
      </button>
    {/if}

    <a
      href="{base}/settings"
      class="icon-btn w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors text-base no-underline"
      aria-label="Settings"
      title="Settings"
    >
      ⚙️
    </a>

    <button
      class="icon-btn w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors text-base"
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
  <nav class="flex justify-center gap-1.5 sm:gap-2 px-3 py-2.5 bg-card border-b border-border flex-wrap">
    {#each [
      { href: `${base}/courses`, icon: '📚', label: 'Courses', jp: false },
      { href: `${base}/kanji`, icon: '漢', label: 'Kanji', jp: true },
      { href: `${base}/alphabet`, icon: 'あ', label: 'Alphabet', jp: true },
      { href: `${base}/grammar-reference`, icon: '文', label: 'Grammar', jp: true },
      { href: `${base}/counters`, icon: '数', label: 'Counters', jp: true },
      { href: `${base}/hsk`, icon: '中', label: 'HSK', jp: true },
      { href: `${base}/stats`, icon: '📊', label: 'Stats', jp: false },
      { href: `${base}/review`, icon: '🔄', label: dueCount > 0 ? `Review (${dueCount})` : 'Review', jp: false },
    ] as link}
      <a
        href={link.href}
        class="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-muted-foreground no-underline border border-border rounded-lg hover:text-primary hover:border-primary hover:bg-muted transition-colors"
      >
        <span class="text-sm" style={link.jp ? 'font-family: var(--font-jp)' : ''}>{link.icon}</span>
        <span>{link.label}</span>
      </a>
    {/each}
  </nav>
{/if}
