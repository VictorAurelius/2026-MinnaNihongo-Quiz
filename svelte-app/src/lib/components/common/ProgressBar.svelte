<script lang="ts">
  /**
   * Reusable Progress Bar Component
   * Shows completion percentage with smooth animation
   */

  export let current = 0;
  export let total = 100;
  export let showText = true;
  export let textPosition: 'top' | 'inside' | 'none' = 'top';

  $: percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  $: displayText = `${current} / ${total} (${percentage}%)`;
</script>

<div class="progress-bar-wrapper">
  {#if showText && textPosition === 'top'}
    <div class="progress-text">{displayText}</div>
  {/if}

  <div class="progress-bar">
    <div
      class="progress-fill"
      style="transform: scaleX({percentage / 100})"
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total}
    >
      {#if showText && textPosition === 'inside' && percentage > 15}
        <span class="progress-text-inside">{percentage}%</span>
      {/if}
    </div>
  </div>
</div>

<style>
  .progress-bar-wrapper {
    width: 100%;
  }

  .progress-text {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-muted-foreground);
    margin-bottom: 0.4rem;
    text-align: right;
  }

  .progress-bar {
    height: 6px;
    background: var(--color-border);
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    width: 100%;
    background: var(--color-primary);
    border-radius: 3px;
    transition: transform 0.35s ease;
    transform-origin: left;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 0.5rem;
  }

  .progress-text-inside {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--color-primary-foreground);
    white-space: nowrap;
  }
</style>
