<script lang="ts">
  /**
   * Home / Landing Page
   * Redesigned with Tailwind CSS + shadcn components
   */

  import { base } from '$app/paths';
  import { getAllCourses } from '$lib/data/courses';
  import { getKanjiLessonMetadata } from '$lib/data/kanji/lessons';
  import { HSK5_DATA } from '$lib/data/hsk';
  import Badge from '$lib/components/ui/badge/badge.svelte';
  import PageError from '$lib/components/common/PageError.svelte';
  import { Layers, CheckCircle, Keyboard, ChevronRight, BookOpen, Languages, GraduationCap, Hash, ClipboardCheck } from 'lucide-svelte';

  let courses: ReturnType<typeof getAllCourses> = [];
  let totalLessons = 0;
  let totalVocab = 0;
  let kanjiCount = 0;
  let hskWordCount = 0;
  let dataError = false;

  try {
    courses = getAllCourses();
    totalLessons = courses.reduce((sum, c) => sum + c.metadata.lessonCount, 0);
    totalVocab = courses.reduce((sum, c) =>
      sum + c.getAllLessons().reduce((s, l) => s + l.vocabulary.length, 0), 0);
    kanjiCount = getKanjiLessonMetadata().reduce((sum, l) => sum + l.kanjiCount, 0);
    hskWordCount = HSK5_DATA.reduce((sum, g) => sum + g.words.length, 0);
  } catch (e) {
    console.error('[SmartQuiz] Home data error:', e);
    dataError = true;
  }

  const courseSections = courses.map(c => ({
    icon: c.metadata.icon,
    title: c.metadata.title,
    desc: c.metadata.description,
    href: `${base}/course/${c.metadata.id}`,
    color: c.metadata.color,
  }));

  const referenceSections = [
    { component: BookOpen, title: 'Kanji', desc: `${kanjiCount} kanji — readings, meanings & examples`, href: `${base}/kanji` },
    { component: Languages, title: 'Alphabet', desc: 'Hiragana & Katakana charts', href: `${base}/alphabet` },
    { component: GraduationCap, title: 'Grammar Reference', desc: 'Patterns, comparisons & examples', href: `${base}/grammar-reference` },
    { component: Hash, title: 'Counters', desc: 'Japanese counting systems', href: `${base}/counters` },
    { component: Languages, title: 'HSK 5 Vocabulary', desc: `${hskWordCount}+ Chinese words`, href: `${base}/hsk` },
    { component: ClipboardCheck, title: 'JLPT Mock Test', desc: '30 questions · 30 min · Pass/Fail', href: `${base}/mock-test` },
  ];

  const quizModes = [
    { component: Layers, name: 'Flashcard', desc: 'Flip to reveal' },
    { component: CheckCircle, name: 'Multiple Choice', desc: 'Pick the answer' },
    { component: Keyboard, name: 'Typing', desc: 'Type to answer' },
  ];

  const stats = [
    { value: totalLessons, label: 'Lessons' },
    { value: `${totalVocab}+`, label: 'Words' },
    { value: kanjiCount, label: 'Kanji' },
    { value: `${hskWordCount}+`, label: 'HSK Words' },
  ];
</script>

<svelte:head>
  <title>Smart Quiz - Japanese & Chinese Learning</title>
</svelte:head>

{#if dataError}
  <PageError message="Failed to load course data. Please refresh the page." retry={() => location.reload()} />
{:else}
<div class="mx-auto max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
  <!-- Hero Section -->
  <section class="py-6 px-4 text-center">
    <Badge variant="outline" class="mb-4 text-xs font-bold uppercase tracking-wider">Smart Quiz</Badge>
    <h1 class="text-3xl font-extrabold leading-tight mb-3">
      Learn <span class="text-primary" style="font-family: var(--font-jp)">日本語</span>
      &amp;
      <span style="font-family: var(--font-cn); color: hsl(174, 100%, 41%)">中文</span>
    </h1>
    <p class="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto mb-6">
      Interactive flashcards, quizzes, and reference tables for Japanese &amp; Chinese learners
    </p>

    <!-- Stats Row -->
    <div class="flex justify-center items-center gap-4 flex-wrap">
      {#each stats as stat, i}
        {#if i > 0}
          <div class="w-px h-7 bg-border"></div>
        {/if}
        <div class="flex flex-col items-center">
          <span class="text-xl font-extrabold text-primary">{stat.value}</span>
          <span class="text-[0.7rem] font-semibold text-muted-foreground uppercase tracking-wide">{stat.label}</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- Courses -->
  <section class="mb-6 px-4">
    <h2 class="text-lg font-bold mb-3">Courses</h2>
    <div class="flex flex-col gap-3.5">
      {#each courseSections as section}
        <a
          href={section.href}
          class="flex items-center gap-4 w-full px-5 py-5 bg-card border border-border rounded-xl shadow-sm text-left no-underline transition-all duration-200 hover:border-primary hover:-translate-y-0.5 hover:shadow-lg hover:bg-accent/50 active:scale-[0.98] cursor-pointer group relative overflow-hidden"
        >
          <div class="absolute left-0 inset-y-0 w-1 rounded-l-xl" style="background: {section.color}"></div>
          <span class="flex-shrink-0 text-2xl pl-1">{section.icon}</span>
          <div class="flex-1 min-w-0">
            <h3 class="text-sm font-bold text-foreground">{section.title}</h3>
            <p class="text-xs text-muted-foreground leading-snug">{section.desc}</p>
          </div>
          <ChevronRight size={18} class="flex-shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
        </a>
      {/each}
    </div>
  </section>

  <!-- Reference & Tools -->
  <section class="mb-6 px-4">
    <h2 class="text-lg font-bold mb-3">Reference & Tools</h2>
    <div class="flex flex-col gap-3.5">
      {#each referenceSections as section}
        <a
          href={section.href}
          class="flex items-center gap-4 w-full px-5 py-5 bg-card border border-border rounded-xl shadow-sm text-left no-underline transition-all duration-200 hover:border-primary hover:-translate-y-0.5 hover:shadow-lg hover:bg-accent/50 active:scale-[0.98] cursor-pointer group"
        >
          <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
            <svelte:component this={section.component} size={20} aria-hidden="true" />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-sm font-bold text-foreground">{section.title}</h3>
            <p class="text-xs text-muted-foreground leading-snug">{section.desc}</p>
          </div>
          <ChevronRight size={18} class="flex-shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
        </a>
      {/each}
    </div>
  </section>

  <!-- Quiz Modes -->
  <section class="mb-8 px-4">
    <h2 class="text-lg font-bold mb-3">3 Quiz Modes</h2>
    <div class="grid grid-cols-3 gap-3">
      {#each quizModes as mode}
        <div class="flex flex-col items-center gap-2 p-5 bg-card border border-border rounded-xl shadow-sm text-center">
          <div class="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10">
            <svelte:component this={mode.component} size={20} class="text-primary" aria-hidden="true" />
          </div>
          <span class="text-xs font-bold">{mode.name}</span>
          <span class="text-[0.68rem] text-muted-foreground">{mode.desc}</span>
        </div>
      {/each}
    </div>
  </section>
</div>
{/if}

