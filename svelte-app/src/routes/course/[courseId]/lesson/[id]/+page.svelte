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
  import UiButton from '$lib/components/ui/button/button.svelte';
  import type { CourseId } from '$lib/types/course';
  import type { QuizDirection } from '$lib/types';

  $: courseId = $page.params.courseId as CourseId;
  $: lessonId = parseInt($page.params.id || '0');
  $: course = getCourse(courseId);
  $: lesson = course?.getLessonData(lessonId);

  let selectedDirection: QuizDirection = 'ja-vi';

  const directions: { value: QuizDirection; label: string; icon: string }[] = [
    { value: 'ja-vi', label: 'JP → VN', icon: '🇯🇵→🇻🇳' },
    { value: 'vi-ja', label: 'VN → JP', icon: '🇻🇳→🇯🇵' },
    { value: 'vi-romaji', label: 'VN → Romaji', icon: '🇻🇳→abc' }
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
        <CardHeader class="pb-2"><CardTitle class="text-sm">🔄 Quiz Direction</CardTitle></CardHeader>
        <CardContent>
          <div class="grid grid-cols-3 gap-2">
            {#each directions as dir}
              <button
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
        <CardHeader class="pb-2"><CardTitle class="text-sm">📝 Quiz Modes</CardTitle></CardHeader>
        <CardContent class="flex flex-col gap-2.5">
          <UiButton size="lg" class="w-full" onclick={() => startQuiz('flashcard')}>
            🎴 Flashcard Quiz
          </UiButton>
          <UiButton variant="secondary" size="lg" class="w-full" onclick={() => startQuiz('multiple-choice')}>
            ✓ Multiple Choice
          </UiButton>
          <UiButton variant="outline" size="lg" class="w-full" onclick={() => startQuiz('typing')}>
            ⌨️ Typing Quiz
          </UiButton>
        </CardContent>
      </Card>

      <!-- Grammar Quiz -->
      {#if lesson.grammar.length > 0}
        <Card>
          <CardHeader class="pb-2"><CardTitle class="text-sm">📝 Grammar Quiz</CardTitle></CardHeader>
          <CardContent>
            <UiButton variant="outline" class="w-full" onclick={() => goto(`${base}/course/${courseId}/lesson/${lessonId}/grammar-quiz/mixed`)}>
              📝 Grammar Quiz ({lesson.grammar.length} patterns)
            </UiButton>
          </CardContent>
        </Card>
      {/if}

      <!-- Study Materials -->
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-sm">📚 Study Materials</CardTitle></CardHeader>
        <CardContent class="flex flex-col gap-2.5">
          <UiButton variant="outline" class="w-full" onclick={() => goto(buildVocabularyUrl(courseId, lessonId))}>
            📚 View Vocabulary ({lesson.vocabulary.length})
          </UiButton>
          <UiButton variant="outline" class="w-full" onclick={() => goto(buildGrammarUrl(courseId, lessonId))}>
            📖 View Grammar ({lesson.grammar.length})
          </UiButton>
        </CardContent>
      </Card>
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
