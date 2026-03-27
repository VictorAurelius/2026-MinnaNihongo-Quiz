<script lang="ts">
  /**
   * Course Lesson Menu
   * Shows quiz modes with direction selector, and study materials
   */

  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { getCourse } from '$lib/data/courses';
  import { buildQuizUrl, buildVocabularyUrl, buildGrammarUrl } from '$lib/utils/courseUtils';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import Badge from '$lib/components/ui/badge/badge.svelte';
  import BackButton from '$lib/components/common/BackButton.svelte';
  import PageEmpty from '$lib/components/common/PageEmpty.svelte';
  import UiButton from '$lib/components/ui/button/button.svelte';
  import { RefreshCw, PenLine, Layers, CheckCircle, Keyboard, BookOpen, Book } from 'lucide-svelte';
  import type { CourseId } from '$lib/types/course';
  import type { QuizDirection } from '$lib/types';

  $: courseId = $page.params.courseId as CourseId;
  $: lessonId = parseInt($page.params.id || '0');
  $: course = getCourse(courseId);
  $: lesson = course?.getLessonData(lessonId);

  let selectedDirection: QuizDirection = 'ja-vi';

  const directions: { value: QuizDirection; label: string; icon: string }[] = [
    { value: 'ja-vi', label: 'JP → VN', icon: 'JP→VN' },
    { value: 'vi-ja', label: 'VN → JP', icon: 'VN→JP' },
    { value: 'vi-romaji', label: 'VN → Romaji', icon: 'VN→abc' }
  ];

  function startQuiz(mode: string) {
    goto(buildQuizUrl(courseId, mode, lessonId, selectedDirection));
  }
</script>

<svelte:head>
  <title>{lesson?.title || 'Lesson'} - {course?.metadata.title || 'Smart Quiz'}</title>
</svelte:head>

{#if lesson && course}
  <div class="mx-auto max-w-xl animate-in">
    <!-- Lesson Header -->
    <div
      class="text-white py-8 px-4 text-center relative"
      style="background: linear-gradient(135deg, {course.metadata.color}, var(--color-primary))"
    >
      <div class="absolute top-4 left-4">
        <BackButton href={`/course/${courseId}`} variant="overlay" />
      </div>
      <Badge class="bg-white/20 text-white border-0 mb-2">Bài {lesson.lessonNumber}</Badge>
      <h1 class="text-xl font-bold mb-2">{lesson.title}</h1>
      <div class="flex items-center justify-center gap-2 text-sm opacity-90">
        <span>{lesson.vocabulary.length} từ vựng</span>
        <span>•</span>
        <span>{lesson.grammar.length} ngữ pháp</span>
      </div>
    </div>

    <div class="px-4 py-6 flex flex-col gap-6">
      <!-- Direction Selector -->
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-sm flex items-center gap-1.5"><RefreshCw size={14} aria-hidden="true" /> Quiz Direction</CardTitle></CardHeader>
        <CardContent>
          <div class="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Quiz direction">
            {#each directions as dir}
              <button
                role="radio"
                aria-checked={selectedDirection === dir.value}
                class="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border-2 text-sm font-semibold transition-all cursor-pointer
                  {selectedDirection === dir.value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-card text-muted-foreground hover:border-primary hover:text-foreground'}"
                on:click={() => selectedDirection = dir.value}
              >
                <span class="text-xs">{dir.icon}</span>
                <span>{dir.label}</span>
              </button>
            {/each}
          </div>
        </CardContent>
      </Card>

      <!-- Quiz Modes -->
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-sm flex items-center gap-1.5"><PenLine size={14} aria-hidden="true" /> Quiz Modes</CardTitle></CardHeader>
        <CardContent class="flex flex-col gap-2.5">
          <UiButton size="lg" class="w-full" onclick={() => startQuiz('flashcard')}>
            <Layers size={16} aria-hidden="true" /> Flashcard Quiz
          </UiButton>
          <UiButton variant="secondary" size="lg" class="w-full" onclick={() => startQuiz('multiple-choice')}>
            <CheckCircle size={16} aria-hidden="true" /> Multiple Choice
          </UiButton>
          <UiButton variant="outline" size="lg" class="w-full" onclick={() => startQuiz('typing')}>
            <Keyboard size={16} aria-hidden="true" /> Typing Quiz
          </UiButton>
        </CardContent>
      </Card>

      <!-- Grammar Quiz -->
      {#if lesson.grammar.length > 0}
        <Card>
          <CardHeader class="pb-2"><CardTitle class="text-sm flex items-center gap-1.5"><PenLine size={14} aria-hidden="true" /> Grammar Quiz</CardTitle></CardHeader>
          <CardContent>
            <UiButton variant="outline" class="w-full" onclick={() => goto(`${base}/course/${courseId}/lesson/${lessonId}/grammar-quiz/mixed`)}>
              <PenLine size={16} aria-hidden="true" /> Grammar Quiz ({lesson.grammar.length} patterns)
            </UiButton>
          </CardContent>
        </Card>
      {/if}

      <!-- Study Materials -->
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-sm flex items-center gap-1.5"><BookOpen size={14} aria-hidden="true" /> Study Materials</CardTitle></CardHeader>
        <CardContent class="flex flex-col gap-2.5">
          <UiButton variant="outline" class="w-full" onclick={() => goto(buildVocabularyUrl(courseId, lessonId))}>
            <BookOpen size={16} aria-hidden="true" /> View Vocabulary ({lesson.vocabulary.length})
          </UiButton>
          <UiButton variant="outline" class="w-full" onclick={() => goto(buildGrammarUrl(courseId, lessonId))}>
            <Book size={16} aria-hidden="true" /> View Grammar ({lesson.grammar.length})
          </UiButton>
        </CardContent>
      </Card>
    </div>
  </div>
{:else}
  <PageEmpty
    title="Lesson Not Found"
    description="The lesson you're looking for doesn't exist."
    action={{ label: 'Back to Courses', href: '/courses' }}
  />
{/if}
