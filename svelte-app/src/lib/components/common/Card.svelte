<script lang="ts">
  /**
   * Reusable Card Component
   * Used for lesson cards, quiz cards, etc.
   */

  export let hover = false;
  export let clickable = false;
  export let padding: 'sm' | 'md' | 'lg' = 'md';

  $: classes = [
    'card',
    hover && 'card-hover',
    clickable && 'card-clickable',
    `card-padding-${padding}`
  ].filter(Boolean).join(' ');
</script>

<div class={classes} on:click {...$$restProps}>
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
