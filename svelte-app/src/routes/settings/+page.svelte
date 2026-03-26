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

  // Quiz settings
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

  // Export
  function handleExport() {
    const json = exportProgress();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smart-quiz-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    exportMessage = 'Exported successfully!';
    setTimeout(() => { exportMessage = ''; }, 3000);
  }

  // Import
  let fileInput: HTMLInputElement;
  let importMessage = '';
  let exportMessage = '';

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
        importMessage = 'Imported successfully!';
      } else {
        importMessage = 'Invalid file format.';
      }
      setTimeout(() => { importMessage = ''; }, 3000);
    };
    reader.readAsText(file);
    // Reset input so same file can be re-selected
    target.value = '';
  }

  // Stats summary
  $: lessonCount = Object.keys($progressStore.lessons).length;
  $: hskCount = Object.keys($progressStore.hsk).length;
  $: totalItems = Object.values($progressStore.lessons).reduce((sum, l) =>
    sum + Object.keys(l.vocabProgress).length, 0);
</script>

<svelte:head>
  <title>Settings - Smart Quiz</title>
</svelte:head>

<div class="settings-page">
  <!-- Quiz Settings -->
  <section class="settings-section">
    <h2>Quiz Settings</h2>

    <div class="setting-row">
      <label for="direction">Default Direction</label>
      <select id="direction" value={settings.defaultDirection} on:change={handleDirectionChange}>
        {#each directions as d}
          <option value={d.value}>{d.label}</option>
        {/each}
      </select>
    </div>

    <div class="setting-row">
      <label for="autoPlay">Auto-speak on new card</label>
      <input id="autoPlay" type="checkbox" checked={settings.autoPlay} on:change={handleAutoPlayChange} />
    </div>

    <div class="setting-row">
      <label for="showEnglish">Show English translations</label>
      <input id="showEnglish" type="checkbox" checked={settings.showEnglish} on:change={handleShowEnglishChange} />
    </div>
  </section>

  <!-- Font Settings -->
  <section class="settings-section">
    <h2>Japanese Font</h2>
    <div class="font-grid">
      {#each fonts as font}
        <button
          class="font-card"
          class:selected={selectedFont === font.id}
          on:click={() => handleFontChange(font.id)}
        >
          <div class="font-preview" style="font-family: {font.family}">
            {font.preview}
          </div>
          <div class="font-name">{font.name}</div>
          <div class="font-name-ja">{font.nameJa}</div>
        </button>
      {/each}
    </div>
  </section>

  <!-- Progress Summary -->
  <section class="settings-section">
    <h2>Progress Summary</h2>
    <div class="stats-grid">
      <div class="stat-item">
        <span class="stat-value">{lessonCount}</span>
        <span class="stat-label">Lessons studied</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{totalItems}</span>
        <span class="stat-label">Words practiced</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{hskCount}</span>
        <span class="stat-label">HSK groups</span>
      </div>
    </div>
  </section>

  <!-- Export / Import -->
  <section class="settings-section">
    <h2>Data Management</h2>

    <div class="action-row">
      <div class="action-info">
        <strong>Export Progress</strong>
        <span class="action-desc">Download your progress as a JSON file</span>
      </div>
      <button class="btn btn-primary" on:click={handleExport}>Export</button>
    </div>
    {#if exportMessage}
      <div class="message success">{exportMessage}</div>
    {/if}

    <div class="action-row">
      <div class="action-info">
        <strong>Import Progress</strong>
        <span class="action-desc">Restore from a previously exported file</span>
      </div>
      <button class="btn btn-secondary" on:click={handleImportClick}>Import</button>
      <input
        type="file"
        accept=".json"
        bind:this={fileInput}
        on:change={handleFileChange}
        style="display:none"
      />
    </div>
    {#if importMessage}
      <div class="message" class:success={importMessage.includes('success')} class:error={!importMessage.includes('success')}>
        {importMessage}
      </div>
    {/if}

    <div class="action-row danger">
      <div class="action-info">
        <strong>Clear All Progress</strong>
        <span class="action-desc">Delete all saved data permanently</span>
      </div>
      <button class="btn btn-danger" on:click={() => showClearConfirm = true}>Clear</button>
    </div>
  </section>
</div>

<ConfirmDialog
  bind:open={showClearConfirm}
  title="Clear All Progress"
  message="Are you sure you want to clear all progress? This cannot be undone."
  confirmText="Clear All"
  destructive
  on:confirm={clearProgress}
/>

<style>
  .settings-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
    animation: fadeIn 0.25s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .settings-section {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.25rem;
    margin-bottom: 1rem;
    box-shadow: var(--shadow);
  }

  .settings-section h2 {
    font-size: 1rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border);
  }

  .setting-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.6rem 0;
  }

  .setting-row + .setting-row {
    border-top: 1px solid var(--border);
  }

  .setting-row label {
    font-size: 0.9rem;
    font-weight: 500;
  }

  .setting-row select {
    padding: 0.4rem 0.6rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    background: var(--bg);
    color: var(--text);
    font-size: 0.85rem;
    font-family: inherit;
  }

  .setting-row input[type="checkbox"] {
    width: 1.2rem;
    height: 1.2rem;
    accent-color: var(--primary);
  }

  /* Stats */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
    padding: 0.75rem;
    background: var(--bg);
    border-radius: var(--radius-sm);
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary);
  }

  .stat-label {
    font-size: 0.75rem;
    color: var(--text-muted);
    text-align: center;
  }

  /* Actions */
  .action-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 0;
  }

  .action-row + .action-row {
    border-top: 1px solid var(--border);
  }

  .action-row.danger {
    border-top: 1px solid var(--border);
    margin-top: 0.5rem;
    padding-top: 1rem;
  }

  .action-info {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .action-info strong {
    font-size: 0.9rem;
  }

  .action-desc {
    font-size: 0.78rem;
    color: var(--text-muted);
  }

  .message {
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-sm);
    font-size: 0.85rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .message.success {
    background: var(--success-bg);
    color: var(--success);
  }

  .message.error {
    background: var(--danger-bg);
    color: var(--danger);
  }

  /* Font Grid */
  .font-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .font-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    padding: 1rem 0.75rem;
    background: var(--bg);
    border: 2px solid var(--border);
    border-radius: var(--radius);
    cursor: pointer;
    transition: all 0.15s;
    text-align: center;
  }

  .font-card:hover {
    border-color: var(--primary);
  }

  .font-card.selected {
    border-color: var(--primary);
    background: color-mix(in srgb, var(--primary) 8%, var(--bg));
  }

  .font-preview {
    font-size: 1.3rem;
    line-height: 1.4;
  }

  .font-name {
    font-size: 0.8rem;
    font-weight: 600;
  }

  .font-name-ja {
    font-size: 0.7rem;
    color: var(--text-muted);
  }

  @media (max-width: 600px) {
    .stats-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;
    }

    .stat-value {
      font-size: 1.2rem;
    }

    .action-row {
      flex-wrap: wrap;
      gap: 0.5rem;
    }
  }
</style>
