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
  import UiButton from '$lib/components/ui/button/button.svelte';
  import { Settings2, Type, BarChart3, Database, Download, Upload, Trash2 } from 'lucide-svelte';

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

<div class="mx-auto max-w-xl p-4 animate-in flex flex-col gap-8">
  <!-- Quiz Settings -->
  <section>
    <h3 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6 flex items-center gap-1.5">
      <Settings2 size={12} aria-hidden="true" /> Quiz Settings
    </h3>
    <div class="bg-card rounded-xl shadow-sm overflow-hidden">
      <div class="flex items-center justify-between px-5 py-5">
        <label for="direction" class="text-sm font-medium">Default Direction</label>
        <select
          id="direction"
          value={settings.defaultDirection}
          on:change={handleDirectionChange}
          class="px-3 py-1.5 rounded-lg bg-muted text-foreground text-sm font-medium border-0 cursor-pointer"
        >
          {#each directions as d}
            <option value={d.value}>{d.label}</option>
          {/each}
        </select>
      </div>
      <div class="h-px bg-border/50 mx-5"></div>
      <div class="flex items-center justify-between px-5 py-5">
        <label for="autoPlay" class="text-sm font-medium">Auto-speak on new card</label>
        <input id="autoPlay" type="checkbox" checked={settings.autoPlay} on:change={handleAutoPlayChange}
          class="w-5 h-5 accent-primary cursor-pointer" />
      </div>
      <div class="h-px bg-border/50 mx-5"></div>
      <div class="flex items-center justify-between px-5 py-5">
        <label for="showEnglish" class="text-sm font-medium">Show English translations</label>
        <input id="showEnglish" type="checkbox" checked={settings.showEnglish} on:change={handleShowEnglishChange}
          class="w-5 h-5 accent-primary cursor-pointer" />
      </div>
    </div>
  </section>

  <!-- Font Settings -->
  <section>
    <h3 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6 flex items-center gap-1.5">
      <Type size={12} aria-hidden="true" /> Japanese Font
    </h3>
    <div class="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Font selection">
      {#each fonts as font}
        <button
          role="radio"
          aria-checked={selectedFont === font.id}
          class="flex flex-col items-center gap-2 p-5 rounded-xl cursor-pointer transition-all text-center active:scale-[0.97]
            {selectedFont === font.id
              ? 'bg-primary/10 shadow-md ring-2 ring-primary'
              : 'bg-card shadow-sm hover:shadow-md hover:-translate-y-0.5'}"
          on:click={() => handleFontChange(font.id)}
        >
          <div class="text-xl leading-snug" style="font-family: {font.family}">{font.preview}</div>
          <div class="text-xs font-semibold">{font.name}</div>
          <div class="text-[0.65rem] text-muted-foreground">{font.nameJa}</div>
        </button>
      {/each}
    </div>
  </section>

  <!-- Progress Summary -->
  <section>
    <h3 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6 flex items-center gap-1.5">
      <BarChart3 size={12} aria-hidden="true" /> Progress Summary
    </h3>
    <div class="grid grid-cols-3 gap-3">
      <div class="flex flex-col items-center gap-1 p-5 bg-card rounded-xl shadow-sm">
        <span class="text-2xl font-bold text-primary">{lessonCount}</span>
        <span class="text-[0.7rem] text-muted-foreground text-center">Lessons studied</span>
      </div>
      <div class="flex flex-col items-center gap-1 p-5 bg-card rounded-xl shadow-sm">
        <span class="text-2xl font-bold text-primary">{totalItems}</span>
        <span class="text-[0.7rem] text-muted-foreground text-center">Words practiced</span>
      </div>
      <div class="flex flex-col items-center gap-1 p-5 bg-card rounded-xl shadow-sm">
        <span class="text-2xl font-bold text-primary">{hskCount}</span>
        <span class="text-[0.7rem] text-muted-foreground text-center">HSK groups</span>
      </div>
    </div>
  </section>

  <!-- Data Management -->
  <section>
    <h3 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6 flex items-center gap-1.5">
      <Database size={12} aria-hidden="true" /> Data Management
    </h3>
    <div class="flex flex-col gap-3.5">
      <button
        class="flex items-center gap-4 w-full px-5 py-5 bg-card rounded-xl shadow-sm text-left transition-all hover:shadow-md active:scale-[0.98] cursor-pointer group"
        on:click={handleExport}
      >
        <Download size={20} class="text-primary flex-shrink-0" aria-hidden="true" />
        <div class="flex-1 min-w-0">
          <strong class="text-sm block">Export Progress</strong>
          <span class="text-xs text-muted-foreground">Download as JSON</span>
        </div>
      </button>
      <button
        class="flex items-center gap-4 w-full px-5 py-5 bg-card rounded-xl shadow-sm text-left transition-all hover:shadow-md active:scale-[0.98] cursor-pointer group"
        on:click={handleImportClick}
      >
        <Upload size={20} class="text-primary flex-shrink-0" aria-hidden="true" />
        <div class="flex-1 min-w-0">
          <strong class="text-sm block">Import Progress</strong>
          <span class="text-xs text-muted-foreground">Restore from file</span>
        </div>
      </button>
      <input type="file" accept=".json" bind:this={fileInput} on:change={handleFileChange} class="hidden" />
      <button
        class="flex items-center gap-4 w-full px-5 py-5 bg-card rounded-xl shadow-sm text-left transition-all hover:shadow-md active:scale-[0.98] cursor-pointer group"
        on:click={() => showClearConfirm = true}
      >
        <Trash2 size={20} class="text-destructive flex-shrink-0" aria-hidden="true" />
        <div class="flex-1 min-w-0">
          <strong class="text-sm block text-destructive">Clear All Progress</strong>
          <span class="text-xs text-muted-foreground">Delete permanently</span>
        </div>
      </button>
    </div>
  </section>
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
  .accent-primary { accent-color: var(--color-primary); }
</style>
