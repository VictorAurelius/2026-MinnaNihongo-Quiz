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
  import Breadcrumb from '$lib/components/common/Breadcrumb.svelte';
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
      class="relative text-white pt-3 pb-6 px-4 overflow-hidden"
      style="background: linear-gradient(135deg, color-mix(in srgb, {course.metadata.color} 30%, hsl(245 58% 35%)), hsl(262 60% 45%))"
    >
      <!-- Decorative orbs -->
      <div class="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
      <div class="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/5 blur-xl pointer-events-none"></div>

      <div class="relative z-10">
        <div class="mb-3">
          <BackButton href={`/course/${courseId}`} variant="overlay" />
        </div>
        <div>
          <Badge class="bg-white/20 text-white border-0 mb-2 backdrop-blur-sm">Bài {lesson.lessonNumber}</Badge>
          <h1 class="text-[22px] font-extrabold leading-tight tracking-tight drop-shadow-sm" style="font-family: var(--font-jp)">{lesson.title}</h1>
          <p class="text-sm font-medium text-white/80 mt-1 drop-shadow-sm">
            {lesson.vocabulary.length} từ vựng • {lesson.grammar.length} ngữ pháp
          </p>
          <!-- Progress bar -->
          <div class="mt-4" role="progressbar" aria-valuenow={mastery} aria-valuemin={0} aria-valuemax={100} aria-label="Tiến trình bài học">
            <div class="flex justify-between text-[10px] text-white/70 mb-1.5">
              <span>Tiến độ học</span>
              <span>{mastery}%</span>
            </div>
            <div class="h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div class="h-full bg-white rounded-full transition-all duration-700" style="width: {mastery}%"></div>
            </div>
          </div>
          <!-- Motivation row -->
          <div class="flex items-center gap-2 mt-3 flex-wrap">
            <span class="inline-flex items-center gap-1 bg-white/15 rounded-full px-2.5 py-1 text-[10px] font-semibold text-white/80 backdrop-blur-sm" aria-label="0 ngày streak liên tiếp">
              ✨ Bắt đầu streak hôm nay!
            </span>
            <span class="inline-flex items-center gap-1 bg-white/15 rounded-full px-2.5 py-1 text-[10px] font-semibold text-white/90 backdrop-blur-sm" aria-label="Nhận 50 XP khi hoàn thành bài">
              ⭐ +50 XP khi hoàn thành
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="px-4 py-6 flex flex-col gap-8">
      <Breadcrumb items={[
        { label: 'Courses', href: '/courses' },
        { label: course.metadata.title, href: `/course/${courseId}` },
        { label: `Bài ${lesson.lessonNumber}` }
      ]} />
      <!-- Direction Selector -->
      <section>
        <h2 class="text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-6 flex items-center gap-1.5">
          <RefreshCw size={12} aria-hidden="true" /> Direction
        </h2>
        <div class="flex gap-2 p-1.5 bg-muted/50 rounded-2xl" role="radiogroup" aria-label="Quiz direction">
          {#each directions as dir}
            <button
              role="radio"
              aria-checked={selectedDirection === dir.value}
              class="flex-1 flex flex-col items-center gap-1 min-h-12 py-3.5 px-3 rounded-xl text-center transition-all duration-200 cursor-pointer active:scale-[0.97]
                {selectedDirection === dir.value
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50'}"
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
        <h2 class="text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-6 flex items-center gap-1.5">
          <PenLine size={12} aria-hidden="true" /> Quiz Modes
        </h2>
        <div class="flex flex-col gap-3">
          <button
            class="stagger-item group flex items-center gap-4 w-full px-5 py-5 bg-primary text-primary-foreground rounded-2xl shadow-md text-left transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
            style="animation-delay: 0ms"
            on:click={() => startQuiz('flashcard')}
          >
            <div class="flex-shrink-0 w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
              <Layers size={22} aria-hidden="true" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="font-semibold">Flashcard Quiz</span>
                <span class="text-[0.55rem] font-bold uppercase tracking-wider bg-white/20 px-1.5 py-0.5 rounded-full">Gợi ý</span>
              </div>
              <span class="text-xs opacity-75">Lật thẻ để xem đáp án</span>
            </div>
            <ChevronRight size={18} class="ml-auto opacity-60 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </button>
          <button
            class="stagger-item group flex items-center gap-4 w-full px-5 py-5 bg-card border border-border/50 rounded-2xl shadow-sm text-left transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
            style="animation-delay: 50ms"
            on:click={() => startQuiz('multiple-choice')}
          >
            <div class="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <CheckCircle size={22} class="text-primary" aria-hidden="true" />
            </div>
            <div class="flex-1 min-w-0">
              <span class="font-semibold block">Multiple Choice</span>
              <span class="text-xs text-muted-foreground">Chọn đáp án đúng trong 4 lựa chọn</span>
            </div>
            <ChevronRight size={18} class="ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
          </button>
          <button
            class="stagger-item group flex items-center gap-4 w-full px-5 py-5 bg-card border border-border/50 rounded-2xl shadow-sm text-left transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
            style="animation-delay: 100ms"
            on:click={() => startQuiz('typing')}
          >
            <div class="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Keyboard size={22} class="text-primary" aria-hidden="true" />
            </div>
            <div class="flex-1 min-w-0">
              <span class="font-semibold block">Typing Quiz</span>
              <span class="text-xs text-muted-foreground">Nhập câu trả lời bằng bàn phím</span>
            </div>
            <ChevronRight size={18} class="ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
          </button>
        </div>
      </section>

      <!-- Grammar Quiz -->
      {#if lesson.grammar.length > 0}
        <section>
          <h2 class="text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-6 flex items-center gap-1.5">
            <PenLine size={12} aria-hidden="true" /> Grammar
          </h2>
          <button
            class="group flex items-center gap-4 w-full px-5 py-5 bg-card border border-border/50 rounded-2xl shadow-sm text-left transition-all duration-200 hover:border-success/50 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
            on:click={() => goto(`${base}/course/${courseId}/lesson/${lessonId}/grammar-quiz/mixed`)}
          >
            <div class="flex-shrink-0 w-11 h-11 rounded-xl bg-success/10 flex items-center justify-center group-hover:bg-success/20 transition-colors">
              <PenLine size={22} class="text-success" aria-hidden="true" />
            </div>
            <div class="flex-1 min-w-0">
              <span class="font-semibold block">Grammar Quiz</span>
              <span class="text-xs text-muted-foreground">{lesson.grammar.length} patterns</span>
            </div>
            <ChevronRight size={18} class="ml-auto text-muted-foreground group-hover:text-success group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
          </button>
        </section>
      {/if}

      <!-- Study Materials -->
      <section>
        <h2 class="text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-6 flex items-center gap-1.5">
          <BookOpen size={12} aria-hidden="true" /> Study Materials
        </h2>
        <div class="flex flex-col gap-3">
          <button
            class="group flex items-center gap-4 w-full px-5 py-5 bg-card border border-border/50 rounded-2xl shadow-sm text-left transition-all duration-200 hover:border-warning/50 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
            on:click={() => goto(buildVocabularyUrl(courseId, lessonId))}
          >
            <div class="flex-shrink-0 w-11 h-11 rounded-xl bg-warning/10 flex items-center justify-center group-hover:bg-warning/20 transition-colors">
              <BookOpen size={22} class="text-warning" aria-hidden="true" />
            </div>
            <span class="flex-1 font-semibold">Vocabulary</span>
            <span class="px-2 py-0.5 rounded-lg bg-muted text-xs text-muted-foreground font-medium">{lesson.vocabulary.length} từ</span>
            <ChevronRight size={18} class="text-muted-foreground group-hover:text-warning group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
          </button>
          <button
            class="group flex items-center gap-4 w-full px-5 py-5 bg-card border border-border/50 rounded-2xl shadow-sm text-left transition-all duration-200 hover:border-warning/50 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
            on:click={() => goto(buildGrammarUrl(courseId, lessonId))}
          >
            <div class="flex-shrink-0 w-11 h-11 rounded-xl bg-warning/10 flex items-center justify-center group-hover:bg-warning/20 transition-colors">
              <Book size={22} class="text-warning" aria-hidden="true" />
            </div>
            <span class="flex-1 font-semibold">Grammar</span>
            <span class="px-2 py-0.5 rounded-lg bg-muted text-xs text-muted-foreground font-medium">{lesson.grammar.length} mẫu</span>
            <ChevronRight size={18} class="text-muted-foreground group-hover:text-warning group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
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
