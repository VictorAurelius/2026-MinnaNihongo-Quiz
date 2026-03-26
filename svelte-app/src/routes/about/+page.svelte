<script lang="ts">
  import { base } from '$app/paths';
  import { getProjectInfo, getCommunityLinks } from '$lib/utils/communityUtils';

  const info = getProjectInfo();
  const links = getCommunityLinks();
</script>

<svelte:head>
  <title>About - Smart Quiz</title>
</svelte:head>

<div class="about-page">
  <header class="about-header">
    <img src="{base}/logo.svg" alt="Smart Quiz" class="about-logo" height="48" />
    <h1>{info.name} <span class="version">v{info.version}</span></h1>
    <p class="description">{info.description}</p>
  </header>

  <!-- Features -->
  <section class="about-section">
    <h2>Features</h2>
    <ul class="feature-list">
      <li>Japanese JLPT N5-N1: Vocabulary, grammar, kanji with stroke order</li>
      <li>Chinese HSK 1-5: 2200+ words with pinyin + Vietnamese</li>
      <li>Quiz modes: Flashcard, multiple choice, typing, writing</li>
      <li>Spaced repetition (SRS) for long-term memory</li>
      <li>Offline-first: works without internet</li>
      <li>Custom Japanese fonts</li>
      <li>Dark mode + accessibility</li>
    </ul>
  </section>

  <!-- Community -->
  <section class="about-section">
    <h2>Community</h2>
    <div class="link-grid">
      {#each links as link}
        <a href={link.url} target="_blank" rel="noopener noreferrer" class="link-card">
          <span class="link-icon">{link.icon}</span>
          <span class="link-label">{link.label}</span>
        </a>
      {/each}
    </div>
  </section>

  <!-- Credits -->
  <section class="about-section">
    <h2>Credits</h2>
    <ul class="credits-list">
      <li><strong>Kanji Data:</strong> KANJIDIC2 (CC BY-SA 4.0), KanjiVG (CC BY-SA 3.0)</li>
      <li><strong>Radical Data:</strong> KRADFILE (EDRDG License)</li>
      <li><strong>Framework:</strong> SvelteKit 2 + TypeScript</li>
      <li><strong>Fonts:</strong> Google Fonts (Noto Sans JP, Noto Serif JP, Zen Maru Gothic)</li>
      <li><strong>Author:</strong> {info.author}</li>
      <li><strong>License:</strong> {info.license}</li>
    </ul>
  </section>

  <a href="{base}/" class="back-link">← Back to Home</a>
</div>

<style>
  .about-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
  }

  .about-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .about-logo {
    margin-bottom: 0.75rem;
  }

  .about-header h1 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .version {
    font-size: 0.85rem;
    font-weight: 400;
    color: var(--text-muted, #6b7280);
  }

  .description {
    color: var(--text-muted, #6b7280);
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .about-section {
    background: var(--bg-card, #fff);
    border: 1px solid var(--border, #e5e7eb);
    border-radius: var(--radius, 0.5rem);
    padding: 1.25rem;
    margin-bottom: 1rem;
  }

  .about-section h2 {
    font-size: 1rem;
    margin: 0 0 0.75rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border, #e5e7eb);
  }

  .feature-list, .credits-list {
    padding-left: 1.25rem;
    font-size: 0.9rem;
    line-height: 1.8;
  }

  .link-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .link-card {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background: var(--bg, #f9fafb);
    border: 1px solid var(--border, #e5e7eb);
    border-radius: var(--radius-sm, 0.375rem);
    text-decoration: none;
    color: var(--text, #111);
    font-size: 0.85rem;
    transition: border-color 0.15s;
  }

  .link-card:hover {
    border-color: var(--primary, #6366f1);
  }

  .link-icon { font-size: 1.2rem; }

  .back-link {
    display: inline-block;
    margin-top: 1rem;
    color: var(--primary, #6366f1);
    text-decoration: none;
    font-size: 0.9rem;
  }
</style>
