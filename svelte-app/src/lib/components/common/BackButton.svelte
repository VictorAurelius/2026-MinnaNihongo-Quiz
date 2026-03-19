<script lang="ts">
  /**
   * Back Button Component
   * Navigates back in browser history
   */

  import { goto } from '$app/navigation';
  import { base } from '$app/paths';

  export let fallbackPath = '/';
  export let showIcon = true;
  export let text = 'Back';

  function handleBack() {
    // Try to go back in history, fallback to specified path
    if (window.history.length > 1) {
      window.history.back();
    } else {
      goto(`${base}${fallbackPath}`);
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
