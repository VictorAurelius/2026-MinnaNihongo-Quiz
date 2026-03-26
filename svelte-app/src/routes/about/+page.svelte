<script lang="ts">
  import { base } from '$app/paths';
  import { getProjectInfo, getCommunityLinks } from '$lib/utils/communityUtils';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';

  const info = getProjectInfo();
  const links = getCommunityLinks();
</script>

<svelte:head>
  <title>About - Smart Quiz</title>
</svelte:head>

<div class="mx-auto max-w-xl p-4 animate-in">
  <header class="text-center mb-6">
    <img src="{base}/logo.svg" alt="Smart Quiz" class="mx-auto mb-3" height="48" />
    <h1 class="text-2xl font-bold">
      {info.name} <span class="text-sm font-normal text-muted-foreground">v{info.version}</span>
    </h1>
    <p class="text-sm text-muted-foreground leading-relaxed">{info.description}</p>
  </header>

  <Card class="mb-3">
    <CardHeader class="pb-2"><CardTitle class="text-sm">Features</CardTitle></CardHeader>
    <CardContent>
      <ul class="list-disc pl-5 text-sm leading-7">
        <li>Japanese JLPT N5-N1: Vocabulary, grammar, kanji with stroke order</li>
        <li>Chinese HSK 1-5: 2200+ words with pinyin + Vietnamese</li>
        <li>Quiz modes: Flashcard, multiple choice, typing, writing</li>
        <li>Spaced repetition (SRS) for long-term memory</li>
        <li>Offline-first: works without internet</li>
        <li>Custom Japanese fonts</li>
        <li>Dark mode + accessibility</li>
      </ul>
    </CardContent>
  </Card>

  <Card class="mb-3">
    <CardHeader class="pb-2"><CardTitle class="text-sm">Community</CardTitle></CardHeader>
    <CardContent>
      <div class="grid grid-cols-2 gap-2.5">
        {#each links as link}
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 p-3 bg-muted rounded-lg border border-border text-sm text-foreground no-underline hover:border-primary transition-colors"
          >
            <span class="text-lg">{link.icon}</span>
            <span>{link.label}</span>
          </a>
        {/each}
      </div>
    </CardContent>
  </Card>

  <Card class="mb-3">
    <CardHeader class="pb-2"><CardTitle class="text-sm">Credits</CardTitle></CardHeader>
    <CardContent>
      <ul class="list-disc pl-5 text-sm leading-7">
        <li><strong>Kanji Data:</strong> KANJIDIC2 (CC BY-SA 4.0), KanjiVG (CC BY-SA 3.0)</li>
        <li><strong>Radical Data:</strong> KRADFILE (EDRDG License)</li>
        <li><strong>Framework:</strong> SvelteKit 2 + TypeScript</li>
        <li><strong>Fonts:</strong> Google Fonts (Noto Sans JP, Noto Serif JP, Zen Maru Gothic)</li>
        <li><strong>Author:</strong> {info.author}</li>
        <li><strong>License:</strong> {info.license}</li>
      </ul>
    </CardContent>
  </Card>

  <a href="{base}/" class="inline-block mt-3 text-primary text-sm no-underline hover:underline">← Back to Home</a>
</div>

<style>
  @keyframes fade-in { from { opacity: 0; transform: translateY(0.5rem); } to { opacity: 1; transform: translateY(0); } }
  .animate-in { animation: fade-in 0.25s ease; }
</style>
