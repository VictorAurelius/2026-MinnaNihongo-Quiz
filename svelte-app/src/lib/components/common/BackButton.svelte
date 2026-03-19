<script lang="ts">
  /**
   * Back Button Component
   * Navigates to parent route (hierarchical, not browser history)
   */

  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { page } from '$app/stores';

  export let href: string | undefined = undefined;
  export let showIcon = true;
  export let text = 'Back';

  // Routes that should go directly to home when back is pressed
  const HOME_PARENTS = new Set(['lesson', 'quiz', 'results', 'alphabet', 'counters', 'grammar-reference', 'hsk']);

  function getParentPath(fullPathname: string): string {
    // Strip base path first to get route-only path
    const routePath = fullPathname.startsWith(base) && base
      ? fullPathname.slice(base.length) || '/'
      : fullPathname;
    // /lesson/1/vocabulary → /lesson/1
    // /lesson/1 → / (home, not /lesson)
    // /quiz/flashcard → / (home)
    // /hsk/a → /hsk
    // /alphabet → /
    const parts = routePath.split('/').filter(Boolean);
    if (parts.length <= 1) return '/';
    // If parent would be a top-level route like /lesson, /quiz → go home
    if (parts.length === 2 && HOME_PARENTS.has(parts[0])) return '/';
    parts.pop();
    return '/' + parts.join('/');
  }

  function handleBack() {
    if (href) {
      goto(`${base}${href}`);
    } else {
      const parent = getParentPath($page.url.pathname);
      goto(`${base}${parent}`);
    }
  }
</script>

<button class="icon-btn back-btn" on:click={handleBack} aria-label="Go back">
  {#if showIcon}
    <span class="back-icon">←</span>
  {/if}
  {#if text}
    <span class="back-text">{text}</span>
  {/if}
</button>

<style>
  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text);
    background: transparent;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all var(--transition);
  }

  .back-btn:hover {
    background: var(--border);
    border-color: var(--primary);
    color: var(--primary);
  }

  .back-icon {
    font-size: 1.2em;
    line-height: 1;
  }

  .back-text {
    font-size: 0.9rem;
  }
</style>
