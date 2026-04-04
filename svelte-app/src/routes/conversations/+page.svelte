<script lang="ts">
  /**
   * Conversation Patterns Page
   * Shows dialogues + sentence patterns + memory tips per JLPT level
   */

  import { base } from '$app/paths';
  import { getConversations } from '$lib/data/conversations';
  import { playJapaneseAudio } from '$lib/utils/audioUtils';
  import { kanaToRomaji } from '$lib/utils/kanaUtils';
  import { ChevronRight, Volume2, MessageCircle, Lightbulb, Globe } from 'lucide-svelte';
  import Breadcrumb from '$lib/components/common/Breadcrumb.svelte';
  import type { ConversationPattern } from '$lib/types/lesson';

  let selectedLevel = 'n5';
  let expandedId: string | null = null;

  const levels = [
    { id: 'n5', label: 'N5', desc: 'Cơ bản' },
    { id: 'n4', label: 'N4', desc: 'Sơ cấp' },
    { id: 'n3', label: 'N3', desc: 'Trung cấp' },
    { id: 'n2', label: 'N2', desc: 'Trung cao' },
    { id: 'n1', label: 'N1', desc: 'Cao cấp' },
  ];

  $: conversations = getConversations(selectedLevel);

  function toggle(id: string) {
    expandedId = expandedId === id ? null : id;
  }
</script>

<svelte:head>
  <title>Mẫu câu giao tiếp — Smart Quiz</title>
</svelte:head>

<div class="mx-auto max-w-2xl animate-in">
  <!-- Hero -->
  <div class="relative text-white pt-3 pb-6 px-4 overflow-hidden" style="background: linear-gradient(135deg, hsl(245 58% 35%), hsl(262 60% 45%))">
    <div class="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
    <div class="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/5 blur-xl pointer-events-none"></div>
    <div class="relative z-10">
      <h1 class="text-[22px] font-extrabold tracking-tight drop-shadow-sm">Mẫu câu giao tiếp</h1>
      <p class="text-sm font-medium text-white/80 mt-1">Hội thoại thực tế + cách ghi nhớ</p>
    </div>
  </div>

  <div class="px-4 py-5 flex flex-col gap-6">
    <Breadcrumb items={[
      { label: 'Home', href: '/' },
      { label: 'Giao tiếp' }
    ]} />

    <!-- Level Selector -->
    <div class="flex gap-0 p-1.5 bg-muted/50 rounded-2xl" role="radiogroup" aria-label="JLPT level">
      {#each levels as lvl}
        <button
          role="radio"
          aria-checked={selectedLevel === lvl.id}
          class="flex-1 flex flex-col items-center gap-0.5 py-3 px-2 rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.97]
            {selectedLevel === lvl.id
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'text-muted-foreground hover:text-foreground hover:bg-background/50'}"
          on:click={() => { selectedLevel = lvl.id; expandedId = null; }}
        >
          <span class="text-xs font-bold">{lvl.label}</span>
          <span class="text-[0.6rem] opacity-75">{lvl.desc}</span>
        </button>
      {/each}
    </div>

    <!-- Conversation Cards -->
    <div class="flex flex-col gap-3">
      {#each conversations as conv, i}
        <div
          class="stagger-item bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden transition-all duration-200"
          style="animation-delay: {i * 50}ms"
        >
          <!-- Header (clickable) -->
          <button
            class="w-full flex items-center gap-4 px-5 py-5 text-left cursor-pointer hover:bg-accent/30 transition-colors active:scale-[0.99]"
            on:click={() => toggle(conv.id)}
            aria-expanded={expandedId === conv.id}
          >
            <div class="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
              <MessageCircle size={20} class="text-primary" aria-hidden="true" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-bold text-foreground">{conv.title}</h3>
              <p class="text-xs text-muted-foreground">{conv.titleJp} — {conv.situation}</p>
            </div>
            <ChevronRight size={18} class="flex-shrink-0 text-muted-foreground transition-transform duration-200 {expandedId === conv.id ? 'rotate-90' : ''}" aria-hidden="true" />
          </button>

          <!-- Expanded content -->
          {#if expandedId === conv.id}
            <div class="px-5 pb-5 flex flex-col gap-4 border-t border-border/30 pt-4">
              <!-- Sentence Patterns -->
              <div>
                <h4 class="text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-3 flex items-center gap-1.5">
                  <Globe size={12} aria-hidden="true" /> Mẫu câu
                </h4>
                <div class="flex flex-col gap-3">
                  {#each conv.patterns as pat}
                    <div class="bg-muted/30 rounded-xl p-4 space-y-1.5">
                      <div class="flex items-center gap-2">
                        <p class="text-sm font-semibold" style="font-family: var(--font-jp)">{pat.japanese}</p>
                        <button
                          class="flex-shrink-0 p-1 rounded hover:bg-muted transition-colors"
                          on:click|stopPropagation={() => playJapaneseAudio(pat.kana)}
                          aria-label="Phát âm"
                        >
                          <Volume2 size={14} class="text-muted-foreground" aria-hidden="true" />
                        </button>
                      </div>
                      <p class="text-xs text-muted-foreground italic">{kanaToRomaji(pat.kana)}</p>
                      <p class="text-xs text-foreground/80">{pat.vietnamese}</p>
                      <div class="flex items-start gap-1.5 mt-2 pt-2 border-t border-border/30">
                        <Lightbulb size={12} class="text-warning flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <p class="text-[0.7rem] text-warning leading-relaxed">{pat.memoryTip}</p>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>

              <!-- Dialogue -->
              <div>
                <h4 class="text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-3 flex items-center gap-1.5">
                  <MessageCircle size={12} aria-hidden="true" /> Hội thoại
                </h4>
                <div class="bg-muted/20 rounded-xl p-4 space-y-3">
                  {#each conv.dialogue as line}
                    <div class="flex gap-3">
                      <span class="flex-shrink-0 text-xs font-bold text-primary min-w-[2rem]">{line.speaker}:</span>
                      <div class="space-y-0.5">
                        <div class="flex items-center gap-2">
                          <p class="text-sm" style="font-family: var(--font-jp)">{line.japanese}</p>
                          <button
                            class="flex-shrink-0 p-0.5 rounded hover:bg-muted transition-colors"
                            on:click|stopPropagation={() => playJapaneseAudio(line.kana)}
                            aria-label="Phát âm"
                          >
                            <Volume2 size={12} class="text-muted-foreground" aria-hidden="true" />
                          </button>
                        </div>
                        <p class="text-xs text-muted-foreground italic">{kanaToRomaji(line.kana)}</p>
                        <p class="text-xs text-foreground/70">{line.vietnamese}</p>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>

              <!-- Cultural Note -->
              {#if conv.culturalNote}
                <div class="flex items-start gap-2 bg-primary/5 border border-primary/10 rounded-xl p-4">
                  <span class="text-base flex-shrink-0">🇯🇵</span>
                  <p class="text-xs text-foreground/80 leading-relaxed">{conv.culturalNote}</p>
                </div>
              {/if}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>
