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
  import Badge from '$lib/components/ui/badge/badge.svelte';
  import BackButton from '$lib/components/common/BackButton.svelte';
  import PageEmpty from '$lib/components/common/PageEmpty.svelte';
  import UiButton from '$lib/components/ui/button/button.svelte';
  import { RefreshCw, PenLine, Layers, CheckCircle, Keyboard, BookOpen, Book, ChevronRight } from 'lucide-svelte';
  import { progressStore } from '$lib/stores';
  import { getLessonMastery } from '$lib/utils/progressUtils';
  import type { CourseId } from '$lib/types/course';
  import type { QuizDirection } from '$lib/types';

  $: courseId = $page.params.courseId as CourseId;
  $: lessonId = parseInt($page.params.id || '0');
  $: course = getCourse(courseId);
  $: lesson = course?.getLessonData(lessonId);
  $: mastery = getLessonMastery($progressStore, courseId, lessonId);

  let selectedDirection: QuizDirection = 'ja-vi';

  const directions: { value: QuizDirection; label: string; desc: string }[] = [
    { value: 'ja-vi', label: 'JP → VN', desc: 'Xem tiếng Nhật, trả lời tiếng Việt' },
    { value: 'vi-ja', label: 'VN → JP', desc: 'Xem tiếng Việt, trả lời tiếng Nhật' },
    { value: 'vi-romaji', label: 'VN → Romaji', desc: 'Xem tiếng Việt, trả lời bằng romaji' }
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
      class="text-white pt-3 pb-5 px-4"
      style="background: linear-gradient(135deg, {course.metadata.color}, var(--color-primary))"
    >
      <div class="mb-3">
        <BackButton href={`/course/${courseId}`} variant="overlay" />
      </div>
      <div class="text-center">
        <Badge class="bg-white/20 text-white border-0 mb-2">Bài {lesson.lessonNumber}</Badge>
        <h1 class="text-xl font-bold mb-2">{lesson.title}</h1>
        <div class="flex items-center justify-center gap-2 text-sm opacity-95">
          <span>{lesson.vocabulary.length} từ vựng</span>
          <span>•</span>
          <span>{lesson.grammar.length} ngữ pháp</span>
        </div>
        <!-- Progress bar -->
        <div class="mt-3 max-w-xs mx-auto">
          <div class="h-1.5 bg-white/25 rounded-full overflow-hidden">
            <div class="h-full bg-white rounded-full transition-all duration-500" style="width: {mastery}%"></div>
          </div>
          <p class="text-xs text-white/80 mt-1">{mastery}% hoàn thành</p>
        </div>
      </div>
    </div>

    <div class="px-4 py-6 flex flex-col gap-8">
      <!-- Direction Selector -->
      <section>
        <h3 class="text-xs font-semibold uppercase tracking-wider text-foreground/60 mb-6 flex items-center gap-1.5">
          <RefreshCw size={12} aria-hidden="true" /> Direction
        </h3>
        <div class="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Quiz direction">
          {#each directions as dir}
            <button
              role="radio"
              aria-checked={selectedDirection === dir.value}
              class="flex flex-col items-center gap-1 py-3.5 px-4 rounded-xl transition-all cursor-pointer active:scale-[0.97]
                {selectedDirection === dir.value
                  ? 'bg-primary text-primary-foreground shadow-md ring-2 ring-primary/30'
                  : 'bg-card text-foreground/70 shadow-sm border border-border hover:border-primary hover:text-foreground'}"
              on:click={() => selectedDirection = dir.value}
            >
              <span class="text-sm font-semibold">{dir.label}</span>
              <span class="text-[0.6rem] opacity-75 leading-tight">{dir.desc}</span>
            </button>
          {/each}
        </div>
      </section>

      <!-- Quiz Modes -->
      <section>
        <h3 class="text-xs font-semibold uppercase tracking-wider text-foreground/60 mb-6 flex items-center gap-1.5">
          <PenLine size={12} aria-hidden="true" /> Quiz Modes
        </h3>
        <div class="flex flex-col gap-3.5">
          <button
            class="flex items-center gap-4 w-full px-5 py-5 bg-primary text-primary-foreground rounded-xl shadow-md text-left transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
            on:click={() => startQuiz('flashcard')}
          >
            <Layers size={20} aria-hidden="true" />
            <div class="flex-1 min-w-0">
              <span class="font-semibold text-sm block">Flashcard Quiz</span>
              <span class="text-[0.65rem] opacity-75">Lật thẻ để xem đáp án</span>
            </div>
            <ChevronRight size={16} class="ml-auto opacity-60" aria-hidden="true" />
          </button>
          <button
            class="flex items-center gap-4 w-full px-5 py-5 bg-card rounded-xl shadow-sm text-left transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer group"
            on:click={() => startQuiz('multiple-choice')}
          >
            <CheckCircle size={20} class="text-primary" aria-hidden="true" />
            <div class="flex-1 min-w-0">
              <span class="font-semibold text-sm block">Multiple Choice</span>
              <span class="text-[0.65rem] text-muted-foreground">Chọn đáp án đúng trong 4 lựa chọn</span>
            </div>
            <ChevronRight size={16} class="ml-auto text-muted-foreground group-hover:text-primary" aria-hidden="true" />
          </button>
          <button
            class="flex items-center gap-4 w-full px-5 py-5 bg-card rounded-xl shadow-sm text-left transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer group"
            on:click={() => startQuiz('typing')}
          >
            <Keyboard size={20} class="text-primary" aria-hidden="true" />
            <div class="flex-1 min-w-0">
              <span class="font-semibold text-sm block">Typing Quiz</span>
              <span class="text-[0.65rem] text-muted-foreground">Nhập câu trả lời bằng bàn phím</span>
            </div>
            <ChevronRight size={16} class="ml-auto text-muted-foreground group-hover:text-primary" aria-hidden="true" />
          </button>
        </div>
      </section>

      <!-- Grammar Quiz -->
      {#if lesson.grammar.length > 0}
        <section>
          <h3 class="text-xs font-semibold uppercase tracking-wider text-foreground/60 mb-6 flex items-center gap-1.5">
            <PenLine size={12} aria-hidden="true" /> Grammar
          </h3>
          <button
            class="flex items-center gap-4 w-full px-5 py-5 bg-card rounded-xl shadow-sm text-left transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer group"
            on:click={() => goto(`${base}/course/${courseId}/lesson/${lessonId}/grammar-quiz/mixed`)}
          >
            <PenLine size={20} class="text-success" aria-hidden="true" />
            <span class="font-semibold text-sm">Grammar Quiz ({lesson.grammar.length} patterns)</span>
            <ChevronRight size={16} class="ml-auto text-muted-foreground group-hover:text-success" aria-hidden="true" />
          </button>
        </section>
      {/if}

      <!-- Study Materials -->
      <section>
        <h3 class="text-xs font-semibold uppercase tracking-wider text-foreground/60 mb-6 flex items-center gap-1.5">
          <BookOpen size={12} aria-hidden="true" /> Study Materials
        </h3>
        <div class="flex flex-col gap-3.5">
          <button
            class="flex items-center gap-4 w-full px-5 py-5 bg-card rounded-xl shadow-sm text-left transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer group"
            on:click={() => goto(buildVocabularyUrl(courseId, lessonId))}
          >
            <BookOpen size={20} class="text-warning" aria-hidden="true" />
            <span class="font-semibold text-sm">Vocabulary ({lesson.vocabulary.length})</span>
            <ChevronRight size={16} class="ml-auto text-muted-foreground group-hover:text-warning" aria-hidden="true" />
          </button>
          <button
            class="flex items-center gap-4 w-full px-5 py-5 bg-card rounded-xl shadow-sm text-left transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer group"
            on:click={() => goto(buildGrammarUrl(courseId, lessonId))}
          >
            <Book size={20} class="text-warning" aria-hidden="true" />
            <span class="font-semibold text-sm">Grammar ({lesson.grammar.length})</span>
            <ChevronRight size={16} class="ml-auto text-muted-foreground group-hover:text-warning" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  </div>
{:else}
  <PageEmpty
    title="Lesson Not Found"
    description="The lesson you're looking for doesn't exist."
    action={{ label: 'Back to Courses', href: '/courses' }}
  />
{/if}
