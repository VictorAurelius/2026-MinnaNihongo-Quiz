<script lang="ts">
  /**
   * Course Lesson Grid
   * Displays all lessons for a specific course with mastery rings
   */

  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { getCourse } from '$lib/data/courses';
  import { buildLessonUrl } from '$lib/utils/courseUtils';
  import { progressStore } from '$lib/stores';
  import { getLessonMastery, getNextLesson, getCourseProgress } from '$lib/utils/progressUtils';
  import MasteryRing from '$lib/components/common/MasteryRing.svelte';
  import BackButton from '$lib/components/common/BackButton.svelte';
  import PageEmpty from '$lib/components/common/PageEmpty.svelte';
  import UiButton from '$lib/components/ui/button/button.svelte';
  import { ChevronRight } from 'lucide-svelte';
  import SearchInput from '$lib/components/common/SearchInput.svelte';
  import Breadcrumb from '$lib/components/common/Breadcrumb.svelte';
  import type { CourseId } from '$lib/types/course';

  let searchQuery = '';

  $: courseId = $page.params.courseId as CourseId;
  $: course = getCourse(courseId);
  $: allLessons = course?.getLessonMetadata() ?? [];
  $: courseProgress = getCourseProgress($progressStore, courseId);
  $: nextLesson = getNextLesson($progressStore, courseId);

  $: lessons = searchQuery
    ? allLessons.filter(l =>
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(l.lessonNumber).includes(searchQuery)
      )
    : allLessons;

  // Group lessons by 5s for visual sections
  function groupLessons(items: typeof lessons) {
    const groups: { label: string; items: typeof lessons }[] = [];
    for (let i = 0; i < items.length; i += 5) {
      const chunk = items.slice(i, i + 5);
      const start = chunk[0]?.lessonNumber ?? i + 1;
      const end = chunk[chunk.length - 1]?.lessonNumber ?? i + 5;
      groups.push({ label: `Bài ${start}–${end}`, items: chunk });
    }
    return groups;
  }

  $: lessonGroups = searchQuery ? [{ label: 'Kết quả', items: lessons }] : groupLessons(lessons);
</script>

<svelte:head>
  <title>{course?.metadata.title || 'Course'} - Smart Quiz</title>
</svelte:head>

{#if course}
  <div class="animate-in">
    <!-- Course Header — left-aligned -->
    <div
      class="relative text-white pt-3 pb-6 px-4 overflow-hidden"
      style="background: linear-gradient(135deg, color-mix(in srgb, {course.metadata.color} 30%, hsl(245 58% 35%)), hsl(262 60% 45%))"
    >
      <div class="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
      <div class="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/5 blur-xl pointer-events-none"></div>
      <div class="relative z-10">
        <div class="mb-3">
          <BackButton href="/courses" variant="overlay" />
        </div>
        <div>
          <h1 class="text-[22px] font-extrabold tracking-tight drop-shadow-sm">{course.metadata.title}</h1>
          <p class="text-sm font-medium text-white/80 mt-1 drop-shadow-sm">{course.metadata.description}</p>
          <p class="text-xs font-medium text-white/70 mt-1">
            {courseProgress.completed}/{courseProgress.total} bài đã hoàn thành
          </p>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-2xl mx-auto px-4 py-5 flex flex-col gap-5">
      <Breadcrumb items={[
        { label: 'Courses', href: '/courses' },
        { label: course.metadata.title }
      ]} />

      <!-- Continue Button -->
      <UiButton
        size="lg"
        class="w-full py-3.5 text-base font-bold shadow-md"
        onclick={() => goto(buildLessonUrl(courseId, nextLesson))}
      >
        {#if courseProgress.completed === 0}
          Bắt đầu bài đầu tiên →
        {:else}
          Tiếp tục — Bài {nextLesson} →
        {/if}
      </UiButton>

      <SearchInput bind:value={searchQuery} placeholder="Tìm bài học... (số hoặc tên)" />

      <!-- Lesson groups -->
      {#each lessonGroups as group}
        <div>
          <h2 class="text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-3">{group.label}</h2>
          <div class="flex flex-col gap-3">
            {#each group.items as lesson, i}
              {@const mastery = getLessonMastery($progressStore, courseId, lesson.lessonNumber)}
              <a
                href={buildLessonUrl(courseId, lesson.lessonNumber)}
                class="stagger-item group flex items-center gap-4 w-full px-5 py-5 bg-card border border-border/50 rounded-2xl shadow-sm text-left no-underline transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:bg-accent/30 active:scale-[0.98] cursor-pointer
                  {lesson.lessonNumber === nextLesson ? 'ring-1 ring-primary/30 border-primary/50' : ''}"
                style="animation-delay: {Math.min(i * 30, 150)}ms"
              >
                <div class="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <span class="text-sm font-bold text-primary">{lesson.lessonNumber}</span>
                </div>

                <div class="flex-1 min-w-0">
                  <h3 class="text-sm font-semibold text-foreground leading-snug" style="font-family: var(--font-jp)">{lesson.title}</h3>
                  <div class="flex gap-2 text-xs text-muted-foreground mt-0.5">
                    <span>{lesson.vocabCount} từ</span>
                    <span>·</span>
                    <span>{lesson.grammarCount} ngữ pháp</span>
                  </div>
                </div>

                <div class="flex items-center gap-2 flex-shrink-0">
                  {#if mastery > 0}
                    <MasteryRing percentage={mastery} size={32} />
                  {:else if lesson.lessonNumber === nextLesson}
                    <span class="px-2 py-0.5 rounded-lg bg-primary/15 text-[0.6rem] font-bold text-primary">Tiếp</span>
                  {/if}
                  <ChevronRight size={18} class="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
                </div>
              </a>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
{:else}
  <PageEmpty
    title="Course Not Found"
    description="The course you're looking for doesn't exist."
    action={{ label: 'View All Courses', href: '/courses' }}
  />
{/if}
