<script lang="ts">
  /**
   * App Header Component
   * Includes navigation, title, and dark mode toggle
   */

  import { toggleDarkMode, uiStore } from '$lib/stores';
  import { page } from '$app/stores';
  import BackButton from '../common/BackButton.svelte';

  $: showBackButton = $page.url.pathname !== '/';
  $: pageTitle = getPageTitle($page.url.pathname);

  function getPageTitle(pathname: string): string {
    if (pathname === '/') return 'Smart Quiz';
    if (pathname.startsWith('/lesson/')) return 'Lesson Menu';
    if (pathname.startsWith('/quiz/')) return 'Quiz';
    if (pathname.startsWith('/grammar-reference')) return 'Grammar Reference';
    if (pathname.startsWith('/results')) return 'Results';
    return 'Smart Quiz';
  }

  function handleDarkModeToggle() {
    toggleDarkMode();
  }
</script>

<header id="app-header">
  <div class="header-left">
    {#if showBackButton}
      <BackButton text="" />
    {/if}
    <h1 id="header-title">{pageTitle}</h1>
  </div>

  <div class="header-right">
    <button
      class="icon-btn"
      on:click={handleDarkModeToggle}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {$uiStore.darkMode ? '☀️' : '🌙'}
    </button>
  </div>
</header>

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
    gap: 0.6rem;
  }

  #header-title {
    font-size: 1.1rem;
    font-weight: 700;
    white-space: nowrap;
    margin: 0;
  }

  @media (max-width: 600px) {
    #header-title {
      font-size: 0.95rem;
    }
  }
</style>
