<script lang="ts">
  /**
   * Reusable Button Component
   * Supports multiple variants and sizes
   */

  export let variant: 'primary' | 'accent' | 'secondary' | 'success' | 'danger' | 'outline' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let disabled = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let href: string | undefined = undefined;

  // Icon support
  export let icon: string | undefined = undefined;
  export let iconPosition: 'left' | 'right' = 'left';

  const Component = href ? 'a' : 'button';

  $: classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    icon && 'btn-with-icon'
  ].filter(Boolean).join(' ');
</script>

<svelte:element
  this={Component}
  class={classes}
  {type}
  {disabled}
  href={href || undefined}
  on:click
  {...$$restProps}
>
  {#if icon && iconPosition === 'left'}
    <span class="btn-icon">{icon}</span>
  {/if}

  <slot />

  {#if icon && iconPosition === 'right'}
    <span class="btn-icon">{icon}</span>
  {/if}
</svelte:element>

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-family: inherit;
    font-weight: 600;
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: background var(--transition), transform 0.1s ease, box-shadow var(--transition);
    text-decoration: none;
    line-height: 1.4;
  }

  .btn:active {
    transform: scale(0.97);
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Sizes */
  .btn-sm {
    padding: 0.5rem 0.875rem;
    font-size: 0.85rem;
  }

  .btn-md {
    padding: 0.6rem 1.2rem;
    font-size: 0.95rem;
  }

  .btn-lg {
    padding: 0.85rem 1.5rem;
    font-size: 1rem;
  }

  /* Variants - using global CSS variables */
  .btn-primary {
    background: var(--primary);
    color: #fff;
  }
  .btn-primary:hover:not(:disabled) {
    background: var(--primary-hover);
  }

  .btn-accent {
    background: var(--accent);
    color: #fff;
  }
  .btn-accent:hover:not(:disabled) {
    background: var(--accent-hover);
  }

  .btn-success {
    background: var(--success);
    color: #fff;
  }
  .btn-success:hover:not(:disabled) {
    opacity: 0.85;
  }

  .btn-danger {
    background: var(--danger);
    color: #fff;
  }
  .btn-danger:hover:not(:disabled) {
    opacity: 0.85;
  }

  .btn-secondary {
    background: var(--border);
    color: var(--text);
  }
  .btn-secondary:hover:not(:disabled) {
    opacity: 0.8;
  }

  .btn-outline {
    background: transparent;
    color: var(--text);
    border: 1.5px solid var(--border);
  }
  .btn-outline:hover:not(:disabled) {
    background: var(--border);
  }

  .btn-icon {
    display: inline-flex;
    font-size: 1.1em;
  }
</style>
