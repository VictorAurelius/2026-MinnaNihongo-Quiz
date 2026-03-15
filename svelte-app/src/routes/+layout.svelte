<script lang="ts">
  import '../app.css';
  import { uiStore } from '$lib/stores';
  import { onMount } from 'svelte';
  import Header from '$lib/components/layout/Header.svelte';

  // Apply dark mode class on mount
  onMount(() => {
    const darkMode = $uiStore.darkMode;
    document.documentElement.classList.toggle('dark', darkMode);
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
