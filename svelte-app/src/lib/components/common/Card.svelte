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
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class={classes} on:click={handleClick} {...$$restProps}>
  <slot />
</div>

<style>
  .card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
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
    box-shadow: var(--shadow-lg);
    border-color: var(--primary);
  }

  .card-clickable {
    cursor: pointer;
  }

  .card-clickable:active {
    transform: translateY(0);
  }
</style>
