<script lang="ts">
  import Skeleton from './Skeleton.svelte';
</script>

<div class="skeleton-card">
  <Skeleton width="60%" height="1.2rem" />
  <Skeleton width="100%" height="0.8rem" />
  <Skeleton width="90%" height="0.8rem" />
  <Skeleton width="40%" height="2rem" />
</div>

<style>
  .skeleton-card {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.25rem;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
  }
</style>
