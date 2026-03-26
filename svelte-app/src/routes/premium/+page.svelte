<script lang="ts">
  import { base } from '$app/paths';
  import { getPremiumFeatures, isPremium, setPremium } from '$lib/utils/premiumUtils';

  $: premium = isPremium();
  $: features = getPremiumFeatures();
  $: freeFeatures = features.filter(f => f.free);
  $: premiumFeatures = features.filter(f => !f.free);

  function togglePremium() {
    setPremium(!premium);
    premium = isPremium();
  }
</script>

<svelte:head>
  <title>Premium - Smart Quiz</title>
</svelte:head>

<div class="premium-page">
  <header class="premium-header">
    <h1>Smart Quiz Premium</h1>
    <p class="subtitle">Unlock advanced features for serious learners</p>
  </header>

  {#if premium}
    <div class="status-badge active">Premium Active</div>
  {:else}
    <div class="status-badge free">Free Plan</div>
  {/if}

  <section class="features-section">
    <h2>Free Features</h2>
    <div class="feature-list">
      {#each freeFeatures as feature}
        <div class="feature-item free">
          <span class="feature-check">✅</span>
          <div>
            <strong>{feature.name}</strong>
            <span class="feature-desc">{feature.description}</span>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <section class="features-section">
    <h2>Premium Features</h2>
    <div class="feature-list">
      {#each premiumFeatures as feature}
        <div class="feature-item premium" class:unlocked={premium}>
          <span class="feature-check">{premium ? '✅' : '🔒'}</span>
          <div>
            <strong>{feature.name}</strong>
            <span class="feature-desc">{feature.description}</span>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Dev toggle (v1 — no payment) -->
  <section class="features-section">
    <h2>Activation</h2>
    <p class="note">Premium is currently free during beta. Toggle below to try premium features.</p>
    <button class="btn" class:btn-primary={!premium} class:btn-danger={premium} on:click={togglePremium}>
      {premium ? 'Deactivate Premium' : 'Activate Premium (Free Beta)'}
    </button>
  </section>

  <a href="{base}/" class="back-link">← Back to Home</a>
</div>

<style>
  .premium-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
  }

  .premium-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .premium-header h1 {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }

  .subtitle {
    color: var(--text-muted, #6b7280);
    font-size: 0.95rem;
  }

  .status-badge {
    text-align: center;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }

  .status-badge.active {
    background: color-mix(in srgb, var(--success, #22c55e) 15%, transparent);
    color: var(--success, #22c55e);
  }

  .status-badge.free {
    background: color-mix(in srgb, var(--primary, #6366f1) 10%, transparent);
    color: var(--primary, #6366f1);
  }

  .features-section {
    background: var(--bg-card, #fff);
    border: 1px solid var(--border, #e5e7eb);
    border-radius: var(--radius, 0.5rem);
    padding: 1.25rem;
    margin-bottom: 1rem;
  }

  .features-section h2 {
    font-size: 1rem;
    margin: 0 0 0.75rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border, #e5e7eb);
  }

  .feature-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0;
  }

  .feature-check { font-size: 1.1rem; }

  .feature-item strong {
    display: block;
    font-size: 0.9rem;
  }

  .feature-desc {
    font-size: 0.8rem;
    color: var(--text-muted, #6b7280);
  }

  .note {
    font-size: 0.85rem;
    color: var(--text-muted, #6b7280);
    margin-bottom: 0.75rem;
  }

  .back-link {
    display: inline-block;
    margin-top: 1rem;
    color: var(--primary, #6366f1);
    text-decoration: none;
    font-size: 0.9rem;
  }

  .btn {
    padding: 0.6rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    font-size: 0.9rem;
  }

  .btn-primary { background: var(--primary, #6366f1); color: white; }
  .btn-danger { background: var(--danger, #ef4444); color: white; }
</style>
