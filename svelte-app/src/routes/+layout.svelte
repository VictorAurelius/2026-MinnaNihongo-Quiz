<script lang="ts">
  import '../app.css';
  import { uiStore } from '$lib/stores';
  import { onMount } from 'svelte';

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
  <slot />
</div>
