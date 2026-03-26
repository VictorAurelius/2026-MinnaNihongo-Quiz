<script lang="ts">
  /**
   * Course Grammar Patterns Page
   * Shows all grammar patterns for a specific lesson in a course
   */

  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { getCourse } from '$lib/data/courses';
  import { Card, CardContent } from '$lib/components/ui/card';
  import Badge from '$lib/components/ui/badge/badge.svelte';
  import UiButton from '$lib/components/ui/button/button.svelte';
  import type { CourseId } from '$lib/types/course';

  let searchTerm = '';
  let expandedIndex: number | null = null;

  $: courseId = $page.params.courseId as CourseId;
  $: lessonId = parseInt($page.params.id || '0');
  $: course = getCourse(courseId);
  $: lessonData = course?.getLessonData(lessonId);
  $: grammar = lessonData?.grammar || [];

  $: filteredGrammar = grammar.filter(item => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      item.pattern.toLowerCase().includes(search) ||
      item.vietnamese.toLowerCase().includes(search) ||
      item.english.toLowerCase().includes(search) ||
      item.explanation.toLowerCase().includes(search)
    );
  });

  function toggleExpand(index: number) {
    expandedIndex = expandedIndex === index ? null : index;
  }

  function goBack() {
    goto(`${base}/course/${courseId}/lesson/${lessonId}`);
  }
</script>

<svelte:head>
  <title>Grammar - {lessonData?.title || 'Lesson'} | {course?.metadata.title || 'Smart Quiz'}</title>
</svelte:head>

{#if lessonData && course}
  <div class="mx-auto max-w-3xl p-4 animate-in">
    <!-- Header -->
    <div class="text-center mb-5 relative">
      <button class="sm:absolute top-0 left-0 mb-3 sm:mb-0 text-sm px-3 py-1.5 bg-card border border-border rounded-lg hover:border-primary transition-colors cursor-pointer" on:click={goBack}>
        ← Back to Lesson
      </button>
      <h2 class="text-xl font-bold mb-1">📖 Grammar - Bài {lessonData.lessonNumber}</h2>
      <p class="text-sm text-muted-foreground">{lessonData.title}</p>
      <p class="text-sm font-semibold text-primary">{grammar.length} ngữ pháp</p>
    </div>

    <!-- Search -->
    <div class="relative mb-4">
      <input
        type="text"
        placeholder="Search patterns, meanings..."
        bind:value={searchTerm}
        class="w-full py-2.5 pl-3 pr-10 border border-border rounded-xl text-sm bg-card text-foreground focus:outline-none focus:border-primary transition-colors"
      />
      {#if searchTerm}
        <button class="absolute right-2.5 top-1/2 -translate-y-1/2 bg-transparent border-none text-muted-foreground cursor-pointer text-base hover:text-foreground" on:click={() => searchTerm = ''}>✕</button>
      {/if}
    </div>

    {#if searchTerm}
      <p class="text-center text-sm text-muted-foreground mb-4">
        Showing <strong class="text-primary">{filteredGrammar.length}</strong> of {grammar.length} patterns
      </p>
    {/if}

    <!-- Grammar Cards -->
    <div class="flex flex-col gap-3">
      {#each filteredGrammar as item, index}
        <Card class="{expandedIndex === index ? 'border-primary' : ''} hover:border-primary transition-all">
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div class="p-4 cursor-pointer flex justify-between items-start gap-4" on:click={() => toggleExpand(index)}>
            <div class="flex-1 flex flex-col gap-1">
              <div class="text-lg font-bold text-primary" style="font-family: var(--font-jp)">{item.pattern}</div>
              <div class="text-sm font-semibold text-foreground">{item.vietnamese}</div>
              <div class="text-sm text-muted-foreground">{item.english}</div>
            </div>
            <div class="flex flex-col items-end gap-2">
              <Badge class="{item.type === 'main' ? 'bg-primary text-white' : 'bg-secondary text-secondary-foreground'} text-[0.65rem] uppercase">{item.type}</Badge>
              <span class="text-xs text-muted-foreground">{expandedIndex === index ? '▲' : '▼'}</span>
            </div>
          </div>

          {#if expandedIndex === index}
            <CardContent class="pt-0 flex flex-col gap-3">
              <div class="p-3 bg-muted rounded-lg">
                <h4 class="text-sm font-bold text-primary mb-2">Explanation:</h4>
                <p class="text-sm leading-relaxed text-foreground">{item.explanation}</p>
              </div>

              {#if item.examples && item.examples.length > 0}
                <div class="p-3 bg-muted rounded-lg">
                  <h4 class="text-sm font-bold text-primary mb-2">Examples:</h4>
                  {#each item.examples as example}
                    <div class="p-3 bg-card rounded-lg mb-2 last:mb-0">
                      <div class="text-sm font-semibold text-foreground mb-1" style="font-family: var(--font-jp)">{example.japanese}</div>
                      <div class="text-sm text-foreground mb-0.5">{example.vietnamese}</div>
                      <div class="text-xs text-muted-foreground">{example.english}</div>
                    </div>
                  {/each}
                </div>
              {/if}
            </CardContent>
          {/if}
        </Card>
      {/each}

      {#if filteredGrammar.length === 0}
        <div class="text-center py-12 text-muted-foreground">
          No grammar patterns found matching "{searchTerm}"
        </div>
      {/if}
    </div>
  </div>
{:else}
  <div class="text-center py-12 px-6">
    <h2 class="text-xl font-bold mb-3">Lesson Not Found</h2>
    <p class="text-muted-foreground mb-4">The lesson you're looking for doesn't exist.</p>
    <UiButton onclick={() => goto(`${base}/courses`)}>Back to Courses</UiButton>
  </div>
{/if}

<style>
  @keyframes fade-in { from { opacity: 0; transform: translateY(0.5rem); } to { opacity: 1; transform: translateY(0); } }
  .animate-in { animation: fade-in 0.25s ease; }
</style>
