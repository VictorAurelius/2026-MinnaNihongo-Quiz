<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { GrammarPattern } from '$lib/types';
  import { Lightbulb, Brain } from 'lucide-svelte';

  export let pattern: GrammarPattern;
  export let selected = false;

  const dispatch = createEventDispatcher();

  function handleToggle() {
    dispatch('toggle');
  }

  function handleDetail() {
    dispatch('detail');
  }

  $: tags = (() => {
    const tagList = [];
    if (pattern.meta?.jlptLevel) {
      tagList.push({ text: pattern.meta.jlptLevel, className: 'tag-jlpt' });
    }
    if (pattern.lessonNumber) {
      tagList.push({ text: `Bài ${pattern.lessonNumber}`, className: 'tag-lesson' });
    }
    return tagList;
  })();
</script>

<div class="grammar-card" class:selected>
  <div class="pattern-card-header">
    <div class="pattern-select">
      <input
        type="checkbox"
        class="pattern-checkbox"
        checked={selected}
        on:change={handleToggle}
      />
    </div>

    <div class="pattern-main">
      <h4 class="pattern-text">{pattern.pattern}</h4>
      <p class="pattern-meaning">{pattern.vietnamese}</p>
      {#if pattern.english}
        <p class="pattern-meaning-en">{pattern.english}</p>
      {/if}
    </div>

    <div class="pattern-tags">
      {#each tags as tag}
        <span class="tag {tag.className}">{tag.text}</span>
      {/each}
    </div>
  </div>

  <div class="pattern-card-actions">
    <button class="btn-text" on:click={handleDetail}>
      <Lightbulb size={14} aria-hidden="true" /> Chi tiết
    </button>
    {#if pattern.meta?.tips}
      <button class="btn-text btn-tips">
        <Brain size={14} aria-hidden="true" /> Tips
      </button>
    {/if}
  </div>
</div>

<style>
  .grammar-card {
    background: var(--bg-secondary);
    border: 2px solid var(--border);
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 0.75rem;
    transition: all 0.2s;
  }

  .grammar-card:hover {
    border-color: var(--primary-light);
  }

  .grammar-card.selected {
    border-color: var(--primary);
    background: var(--primary-bg);
  }

  .pattern-card-header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 1rem;
    align-items: start;
    margin-bottom: 0.75rem;
  }

  .pattern-select {
    padding-top: 0.25rem;
  }

  .pattern-checkbox {
    width: 1.25rem;
    height: 1.25rem;
    cursor: pointer;
  }

  .pattern-main {
    flex: 1;
  }

  .pattern-text {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  .pattern-meaning {
    font-size: 0.95rem;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
  }

  .pattern-meaning-en {
    font-size: 0.85rem;
    color: var(--text-muted);
    font-style: italic;
  }

  .pattern-tags {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-end;
  }

  .tag {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
  }

  .tag-jlpt {
    background: var(--accent-bg);
    color: var(--accent);
  }

  .tag-lesson {
    background: var(--primary-bg);
    color: var(--primary);
  }

  .pattern-card-actions {
    display: flex;
    gap: 1rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--border);
  }

  .btn-text {
    background: none;
    border: none;
    color: var(--primary);
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    transition: all 0.2s;
  }

  .btn-text:hover {
    color: var(--primary-dark);
    text-decoration: underline;
  }

  .btn-tips {
    color: var(--accent);
  }

  .btn-tips:hover {
    color: var(--accent-dark);
  }
</style>
