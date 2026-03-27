<script lang="ts">
  export let width = '100%';
  export let height = '1rem';
  export let rounded = false;
</script>

<div
  class="skeleton skeleton-shimmer"
  class:rounded
  style="width: {width}; height: {height}"
  role="status"
  aria-label="Loading"
></div>

<style>
  .skeleton {
    background: var(--color-border);
    border-radius: 8px;
  }
  .skeleton-shimmer {
    background: linear-gradient(90deg, var(--color-border) 25%, var(--color-background) 50%, var(--color-border) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
  .rounded {
    border-radius: 50%;
  }
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
</style>
