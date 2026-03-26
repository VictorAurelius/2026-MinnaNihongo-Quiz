<script lang="ts">
  import { base } from '$app/paths';
  import { isPremium } from '$lib/utils/premiumUtils';

  export let featureName = 'this feature';
  export let previewCount = 50;

  $: premium = isPremium();
</script>

{#if premium}
  <slot />
{:else}
  <slot name="preview" />
  <div class="premium-gate">
    <div class="gate-icon">🔒</div>
    <h3>Premium Feature</h3>
    <p>Showing first {previewCount} items. Upgrade to access full {featureName}.</p>
    <a href="{base}/premium" class="btn btn-primary">Learn More</a>
  </div>
{/if}

<style>
  .premium-gate {
    text-align: center;
    padding: 2rem 1rem;
    margin-top: 1rem;
    background: var(--bg-card, #fff);
    border: 2px dashed var(--border, #e5e7eb);
    border-radius: var(--radius, 0.5rem);
  }

  .gate-icon {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
  }

  p {
    color: var(--text-muted, #6b7280);
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .btn-primary {
    display: inline-block;
    background: var(--primary, #6366f1);
    color: white;
    padding: 0.6rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 600;
  }
</style>
