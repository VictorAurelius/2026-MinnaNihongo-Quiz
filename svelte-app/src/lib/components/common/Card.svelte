<script lang="ts">
  /**
   * Reusable Card Component
   * Used for lesson cards, quiz cards, etc.
   */

  import { createEventDispatcher } from 'svelte';

  export let hover = false;
  export let clickable = false;
  export let padding: 'sm' | 'md' | 'lg' = 'md';

  const dispatch = createEventDispatcher();

  $: classes = [
    'card',
    hover && 'card-hover',
    clickable && 'card-clickable',
    `card-padding-${padding}`
  ].filter(Boolean).join(' ');

  function handleClick(event: MouseEvent) {
    dispatch('click', event);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (clickable && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      dispatch('click', event);
    }
  }
</script>

<div
  class={classes}
  on:click={handleClick}
  on:keydown={handleKeydown}
  role={clickable ? 'button' : undefined}
  tabindex={clickable ? 0 : undefined}
  {...$$restProps}
>
  <slot />
</div>

<style>
  .card {
    background: var(--color-card);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  }

  .card-padding-sm {
    padding: 0.75rem;
  }

  .card-padding-md {
    padding: 1rem 1.1rem;
  }

  .card-padding-lg {
    padding: 1.5rem;
  }

  .card-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    border-color: var(--color-primary);
  }

  .card-clickable {
    cursor: pointer;
  }

  .card-clickable:active {
    transform: translateY(0);
  }
</style>
