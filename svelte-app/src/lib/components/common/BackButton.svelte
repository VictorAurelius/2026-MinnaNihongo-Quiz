<script lang="ts">
  /**
   * Back Button Component
   * Navigates to parent route (hierarchical, not browser history)
   */

  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { page } from '$app/stores';
  import { ArrowLeft } from 'lucide-svelte';

  export let href: string | undefined = undefined;
  export let showIcon = true;
  export let text = 'Back';
  export let variant: 'default' | 'overlay' = 'default';

  // Routes that should go directly to home when back is pressed
  const HOME_PARENTS = new Set(['lesson', 'lessons', 'course', 'courses', 'quiz', 'results', 'alphabet', 'counters', 'grammar-reference', 'hsk', 'kanji']);

  // Known valid routes — segments that are NOT standalone routes
  // Segments that are NOT standalone routes — must be skipped when navigating back
  const SKIP_SEGMENTS = new Set(['lesson', 'grammar-quiz']);

  function getParentPath(fullPathname: string): string {
    // Strip base path first to get route-only path
    const routePath = fullPathname.startsWith(base) && base
      ? fullPathname.slice(base.length) || '/'
      : fullPathname;
    const parts = routePath.split('/').filter(Boolean);
    if (parts.length <= 1) return '/';
    if (parts.length === 2 && HOME_PARENTS.has(parts[0])) return '/';

    // Pop until we land on a valid route (skip intermediate segments)
    parts.pop();
    while (parts.length > 0 && SKIP_SEGMENTS.has(parts[parts.length - 1])) {
      parts.pop();
    }
    return parts.length > 0 ? '/' + parts.join('/') : '/';
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

<button
  class="back-btn {variant === 'overlay' ? 'back-btn--overlay' : ''}"
  on:click={handleBack}
  aria-label="Go back"
>
  {#if showIcon}
    <ArrowLeft size={16} aria-hidden="true" />
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
    color: var(--color-foreground);
    background: transparent;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .back-btn:hover {
    background: var(--color-border);
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  /* Overlay variant — for use on gradient/colored backgrounds */
  .back-btn--overlay {
    color: white;
    background: rgba(255, 255, 255, 0.2);
    border-color: transparent;
  }

  .back-btn--overlay:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: transparent;
    color: white;
  }

  .back-text {
    font-size: 0.9rem;
  }
</style>
