<script lang="ts">
  /**
   * Settings Page
   * Quiz settings, export/import progress, clear data
   */

  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import {
    progressStore,
    updateSettings,
    clearProgress,
    exportProgress,
    importProgress
  } from '$lib/stores';
  import type { QuizDirection } from '$lib/types';
  import { getAvailableFonts, getCurrentFont, setFont, initFont } from '$lib/utils/fontUtils';
  import ConfirmDialog from '$lib/components/common/ConfirmDialog.svelte';
  import { showToast } from '$lib/stores/toast';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import UiButton from '$lib/components/ui/button/button.svelte';

  const fonts = getAvailableFonts();
  let selectedFont = 'system';
  let showClearConfirm = false;

  onMount(() => {
    selectedFont = getCurrentFont();
    initFont();
  });

  function handleFontChange(fontId: string) {
    selectedFont = fontId;
    setFont(fontId);
  }

  $: settings = $progressStore.settings;

  const directions: { value: QuizDirection; label: string }[] = [
    { value: 'ja-vi', label: 'Japanese → Vietnamese' },
    { value: 'vi-ja', label: 'Vietnamese → Japanese' },
    { value: 'ja-en', label: 'Japanese → English' },
    { value: 'en-ja', label: 'English → Japanese' }
  ];

  function handleDirectionChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    updateSettings({ defaultDirection: target.value as QuizDirection });
  }

  function handleAutoPlayChange(e: Event) {
    const target = e.target as HTMLInputElement;
    updateSettings({ autoPlay: target.checked });
  }

  function handleShowEnglishChange(e: Event) {
    const target = e.target as HTMLInputElement;
    updateSettings({ showEnglish: target.checked });
  }

  function handleExport() {
    const json = exportProgress();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smart-quiz-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported successfully!', 'success');
  }

  let fileInput: HTMLInputElement;

  function handleImportClick() {
    fileInput?.click();
  }

  function handleFileChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      if (importProgress(text)) {
        showToast('Imported successfully!', 'success');
      } else {
        showToast('Invalid file format.', 'error');
      }
    };
    reader.readAsText(file);
    target.value = '';
  }

  $: lessonCount = Object.keys($progressStore.lessons).length;
  $: hskCount = Object.keys($progressStore.hsk).length;
  $: totalItems = Object.values($progressStore.lessons).reduce((sum, l) =>
    sum + Object.keys(l.vocabProgress).length, 0);
</script>

<svelte:head>
  <title>Settings - Smart Quiz</title>
</svelte:head>

<div class="mx-auto max-w-xl p-4 animate-in">
  <!-- Quiz Settings -->
  <Card class="mb-3">
    <CardHeader class="pb-2"><CardTitle class="text-sm">Quiz Settings</CardTitle></CardHeader>
    <CardContent>
      <div class="flex items-center justify-between py-2.5 border-b border-border">
        <label for="direction" class="text-sm font-medium">Default Direction</label>
        <select
          id="direction"
          value={settings.defaultDirection}
          on:change={handleDirectionChange}
          class="px-2.5 py-1.5 border border-border rounded-md bg-background text-foreground text-sm"
        >
          {#each directions as d}
            <option value={d.value}>{d.label}</option>
          {/each}
        </select>
      </div>
      <div class="flex items-center justify-between py-2.5 border-b border-border">
        <label for="autoPlay" class="text-sm font-medium">Auto-speak on new card</label>
        <input id="autoPlay" type="checkbox" checked={settings.autoPlay} on:change={handleAutoPlayChange}
          class="w-5 h-5 accent-primary" />
      </div>
      <div class="flex items-center justify-between py-2.5">
        <label for="showEnglish" class="text-sm font-medium">Show English translations</label>
        <input id="showEnglish" type="checkbox" checked={settings.showEnglish} on:change={handleShowEnglishChange}
          class="w-5 h-5 accent-primary" />
      </div>
    </CardContent>
  </Card>

  <!-- Font Settings -->
  <Card class="mb-3">
    <CardHeader class="pb-2"><CardTitle class="text-sm">Japanese Font</CardTitle></CardHeader>
    <CardContent>
      <div class="grid grid-cols-2 gap-3">
        {#each fonts as font}
          <button
            class="flex flex-col items-center gap-1.5 p-3.5 rounded-xl border-2 cursor-pointer transition-all text-center
              {selectedFont === font.id
                ? 'border-primary bg-primary/5'
                : 'border-border bg-muted hover:border-primary'}"
            on:click={() => handleFontChange(font.id)}
          >
            <div class="text-xl leading-snug" style="font-family: {font.family}">{font.preview}</div>
            <div class="text-xs font-semibold">{font.name}</div>
            <div class="text-[0.65rem] text-muted-foreground">{font.nameJa}</div>
          </button>
        {/each}
      </div>
    </CardContent>
  </Card>

  <!-- Progress Summary -->
  <Card class="mb-3">
    <CardHeader class="pb-2"><CardTitle class="text-sm">Progress Summary</CardTitle></CardHeader>
    <CardContent>
      <div class="grid grid-cols-3 gap-3">
        <div class="flex flex-col items-center gap-0.5 p-3 bg-muted rounded-lg">
          <span class="text-2xl font-bold text-primary">{lessonCount}</span>
          <span class="text-[0.7rem] text-muted-foreground text-center">Lessons studied</span>
        </div>
        <div class="flex flex-col items-center gap-0.5 p-3 bg-muted rounded-lg">
          <span class="text-2xl font-bold text-primary">{totalItems}</span>
          <span class="text-[0.7rem] text-muted-foreground text-center">Words practiced</span>
        </div>
        <div class="flex flex-col items-center gap-0.5 p-3 bg-muted rounded-lg">
          <span class="text-2xl font-bold text-primary">{hskCount}</span>
          <span class="text-[0.7rem] text-muted-foreground text-center">HSK groups</span>
        </div>
      </div>
    </CardContent>
  </Card>

  <!-- Data Management -->
  <Card class="mb-3">
    <CardHeader class="pb-2"><CardTitle class="text-sm">Data Management</CardTitle></CardHeader>
    <CardContent>
      <div class="flex items-center justify-between gap-3 py-3 border-b border-border">
        <div class="min-w-0">
          <strong class="text-sm block">Export Progress</strong>
          <span class="text-xs text-muted-foreground">Download as JSON</span>
        </div>
        <div class="flex-shrink-0"><UiButton size="sm" onclick={handleExport}>Export</UiButton></div>
      </div>
      <div class="flex items-center justify-between gap-3 py-3 border-b border-border">
        <div class="min-w-0">
          <strong class="text-sm block">Import Progress</strong>
          <span class="text-xs text-muted-foreground">Restore from file</span>
        </div>
        <div class="flex-shrink-0"><UiButton variant="secondary" size="sm" onclick={handleImportClick}>Import</UiButton></div>
        <input type="file" accept=".json" bind:this={fileInput} on:change={handleFileChange} class="hidden" />
      </div>
      <div class="flex items-center justify-between gap-3 py-3 mt-2">
        <div class="min-w-0">
          <strong class="text-sm block text-destructive">Clear All Progress</strong>
          <span class="text-xs text-muted-foreground">Delete permanently</span>
        </div>
        <div class="flex-shrink-0"><UiButton variant="destructive" size="sm" onclick={() => showClearConfirm = true}>Clear</UiButton></div>
      </div>
    </CardContent>
  </Card>
</div>

<ConfirmDialog
  bind:open={showClearConfirm}
  title="Clear All Progress"
  message="Are you sure you want to clear all progress? This cannot be undone."
  confirmText="Clear All"
  destructive
  on:confirm={() => { clearProgress(); showToast('Progress cleared', 'success'); }}
/>

<style>
  @keyframes fade-in { from { opacity: 0; transform: translateY(0.5rem); } to { opacity: 1; transform: translateY(0); } }
  .animate-in { animation: fade-in 0.25s ease; }
  .accent-primary { accent-color: var(--color-primary); }
</style>
