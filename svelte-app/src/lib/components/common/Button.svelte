<script lang="ts">
  /**
   * Reusable Button Component
   * Supports multiple variants and sizes
   */

  import { createEventDispatcher } from 'svelte';

  export let variant: 'primary' | 'accent' | 'secondary' | 'success' | 'danger' | 'outline' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let disabled = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let href: string | undefined = undefined;

  // Icon support
  export let icon: string | undefined = undefined;
  export let iconPosition: 'left' | 'right' = 'left';

  const dispatch = createEventDispatcher();

  $: classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    icon && 'btn-with-icon'
  ].filter(Boolean).join(' ');

  function handleClick(event: MouseEvent) {
    dispatch('click', event);
  }
</script>

{#if href}
<a
  class={classes}
  {href}
  {...$$restProps}
>
  {#if icon && iconPosition === 'left'}
    <span class="btn-icon">{icon}</span>
  {/if}
  <slot />
  {#if icon && iconPosition === 'right'}
    <span class="btn-icon">{icon}</span>
  {/if}
</a>
{:else}
<button
  class={classes}
  {type}
  {disabled}
  on:click={handleClick}
  {...$$restProps}
>
  {#if icon && iconPosition === 'left'}
    <span class="btn-icon">{icon}</span>
  {/if}
  <slot />
  {#if icon && iconPosition === 'right'}
    <span class="btn-icon">{icon}</span>
  {/if}
</button>
{/if}

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
    transition: background 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;
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

  /* Variants — using Tailwind design tokens */
  .btn-primary {
    background: var(--color-primary);
    color: var(--color-primary-foreground);
  }
  .btn-primary:hover:not(:disabled) {
    background: color-mix(in srgb, var(--color-primary) 85%, black);
  }

  .btn-accent {
    background: hsl(262 70% 50%);
    color: var(--color-primary-foreground);
  }
  .btn-accent:hover:not(:disabled) {
    background: hsl(262 70% 40%);
  }

  .btn-success {
    background: var(--color-success);
    color: var(--color-success-foreground);
  }
  .btn-success:hover:not(:disabled) {
    opacity: 0.85;
  }

  .btn-danger {
    background: var(--color-destructive);
    color: var(--color-destructive-foreground);
  }
  .btn-danger:hover:not(:disabled) {
    opacity: 0.85;
  }

  .btn-secondary {
    background: var(--color-border);
    color: var(--color-foreground);
  }
  .btn-secondary:hover:not(:disabled) {
    opacity: 0.8;
  }

  .btn-outline {
    background: transparent;
    color: var(--color-foreground);
    border: 1.5px solid var(--color-border);
  }
  .btn-outline:hover:not(:disabled) {
    background: var(--color-border);
  }

  .btn-icon {
    display: inline-flex;
    font-size: 1.1em;
  }
</style>
