<script lang="ts">
  import '../app.css';
  import { uiStore } from '$lib/stores';
  import { onMount } from 'svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import { registerServiceWorker, setupInstallPrompt } from '$lib/utils/pwa';

  // Apply dark mode class and register service worker on mount
  onMount(() => {
    const darkMode = $uiStore.darkMode;
    document.documentElement.classList.toggle('dark', darkMode);

    // Register service worker for PWA
    registerServiceWorker();

    // Setup PWA install prompt
    setupInstallPrompt();
  });

  // Reactively update dark mode
  $: {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', $uiStore.darkMode);
    }
  }
</script>

<div class="app">
  <Header />
  <main id="app">
    <slot />
  </main>
</div>
