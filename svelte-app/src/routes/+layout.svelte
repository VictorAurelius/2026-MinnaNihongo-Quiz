<script lang="ts">
  import '../app.css';
  import { uiStore } from '$lib/stores';
  import { onMount } from 'svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import {
    registerServiceWorker,
    setupInstallPrompt,
    updateAvailable,
    canInstall,
    applyUpdate,
    showInstallPrompt,
    isPWA
  } from '$lib/utils/pwa';

  let showInstallBanner = false;

  // Apply dark mode class and register service worker on mount
  onMount(() => {
    console.log('[SmartQuiz] Layout mounted');
    const darkMode = $uiStore.darkMode;
    document.documentElement.classList.toggle('dark', darkMode);

    registerServiceWorker().then(() => console.log('[SmartQuiz] SW registered'))
      .catch(e => console.error('[SmartQuiz] SW failed:', e));
    setupInstallPrompt();

    // Show install banner after 30s if not already installed
    setTimeout(() => {
      if ($canInstall && !isPWA()) {
        showInstallBanner = true;
      }
    }, 30000);
  });

  // Reactively update dark mode
  $: {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', $uiStore.darkMode);
    }
  }

  function dismissInstall() {
    showInstallBanner = false;
  }

  async function handleInstall() {
    await showInstallPrompt();
    showInstallBanner = false;
  }
</script>

<div class="app">
  <Header />

  {#if $updateAvailable}
    <div class="update-banner">
      <span>A new version is available!</span>
      <button class="banner-btn" on:click={applyUpdate}>Update now</button>
    </div>
  {/if}

  {#if showInstallBanner}
    <div class="install-banner">
      <span>Install Smart Quiz for offline access</span>
      <div class="banner-actions">
        <button class="banner-btn" on:click={handleInstall}>Install</button>
        <button class="banner-dismiss" on:click={dismissInstall}>✕</button>
      </div>
    </div>
  {/if}

  <main id="app">
    <slot />
  </main>
</div>

<style>
  .update-banner,
  .install-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.6rem 1.25rem;
    font-size: 0.85rem;
    font-weight: 500;
    animation: slideDown 0.3s ease;
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-100%); }
    to { opacity: 1; transform: translateY(0); }
  }

  .update-banner {
    background: var(--primary);
    color: white;
  }

  .install-banner {
    background: var(--accent);
    color: white;
  }

  .banner-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .banner-btn {
    padding: 0.3rem 0.75rem;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: var(--radius-sm);
    font-size: 0.8rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.15s;
  }

  .banner-btn:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .banner-dismiss {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    font-size: 1rem;
    cursor: pointer;
    padding: 0.2rem;
  }

  .banner-dismiss:hover {
    color: white;
  }
</style>
