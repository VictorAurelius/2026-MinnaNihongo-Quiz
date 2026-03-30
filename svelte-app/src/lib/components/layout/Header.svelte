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
  import { Home, Settings, Sun, Moon, BookOpen, BarChart3, RefreshCw } from 'lucide-svelte';

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
        class="icon-btn w-11 h-11 flex items-center justify-center rounded-lg hover:bg-muted transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
        on:click={goHome}
        aria-label="Go to home"
        title="Home"
      >
        <Home size={18} aria-hidden="true" />
      </button>
    {/if}

    <a
      href="{base}/settings"
      class="icon-btn w-11 h-11 flex items-center justify-center rounded-lg hover:bg-muted transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none no-underline"
      aria-label="Settings"
      title="Settings"
    >
      <Settings size={18} aria-hidden="true" />
    </a>

    <button
      class="icon-btn w-11 h-11 flex items-center justify-center rounded-lg hover:bg-muted transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
      on:click={toggleDarkMode}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {#if $uiStore.darkMode}
        <Sun size={18} aria-hidden="true" />
      {:else}
        <Moon size={18} aria-hidden="true" />
      {/if}
    </button>
  </div>
</header>

<!-- Bottom navigation on home page — scrollable on mobile -->
{#if isHome}
  <nav class="flex justify-center gap-1.5 px-3 py-2 bg-card border-b border-border overflow-x-auto scrollbar-hide flex-wrap">
    {#each [
      { href: `${base}/courses`, label: 'Courses', jp: false, text: '' },
      { href: `${base}/kanji`, label: 'Kanji', jp: true, text: '漢' },
      { href: `${base}/alphabet`, label: 'Alphabet', jp: true, text: 'あ' },
      { href: `${base}/grammar-reference`, label: 'Grammar', jp: true, text: '文' },
      { href: `${base}/counters`, label: 'Counters', jp: true, text: '数' },
      { href: `${base}/hsk`, label: 'HSK', jp: true, text: '中' },
      { href: `${base}/stats`, label: 'Stats', jp: false, text: '' },
      { href: `${base}/review`, label: dueCount > 0 ? `Review (${dueCount})` : 'Review', jp: false, text: '' },
    ] as link, i}
      <a
        href={link.href}
        class="inline-flex items-center gap-1 px-2 py-1.5 text-[0.7rem] font-semibold text-muted-foreground no-underline border border-border rounded-full hover:text-primary hover:border-primary hover:bg-muted transition-colors whitespace-nowrap flex-shrink-0"
      >
        {#if link.text}
          <span class="text-xs" style={link.jp ? 'font-family: var(--font-jp)' : ''}>{link.text}</span>
        {:else if i === 0}
          <BookOpen size={12} aria-hidden="true" />
        {:else if i === 6}
          <BarChart3 size={12} aria-hidden="true" />
        {:else if i === 7}
          <RefreshCw size={12} aria-hidden="true" />
        {/if}
        <span>{link.label}</span>
      </a>
    {/each}
  </nav>
{/if}

<style>
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  .scrollbar-hide::-webkit-scrollbar { display: none; }
</style>
