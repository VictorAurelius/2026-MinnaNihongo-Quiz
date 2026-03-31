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
</script>

<svelte:head>
  <title>{course?.metadata.title || 'Course'} - Smart Quiz</title>
</svelte:head>

{#if course}
  <div class="animate-in">
    <!-- Course Header -->
    <div
      class="text-white pt-3 pb-5 px-4"
      style="background: linear-gradient(135deg, {course.metadata.color}, var(--color-primary))"
    >
      <div class="mb-3">
        <BackButton href="/courses" variant="overlay" />
      </div>
      <div class="text-center">
        <h1 class="text-xl font-bold mb-1">{course.metadata.title}</h1>
        <p class="text-xs font-medium text-white drop-shadow-sm">{course.metadata.description}</p>
        <p class="text-xs font-medium text-white/90 drop-shadow-sm mt-1">
          {courseProgress.completed}/{courseProgress.total} lessons mastered ({courseProgress.percentage}%)
        </p>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-2xl mx-auto px-4 py-4">
      <Breadcrumb items={[
        { label: 'Courses', href: '/courses' },
        { label: course.metadata.title }
      ]} />
      <!-- Continue Button -->
      <UiButton
        size="lg"
        class="w-full mb-5 py-3.5 text-base font-bold shadow-md"
        onclick={() => goto(buildLessonUrl(courseId, nextLesson))}
      >
        {#if courseProgress.completed === 0}
          Bắt đầu bài đầu tiên →
        {:else}
          Tiếp tục — Bài {nextLesson} →
        {/if}
      </UiButton>

      <div class="flex items-center gap-3 mb-3">
        <h2 class="text-base font-bold">Lessons ({allLessons.length})</h2>
      </div>
      {#if allLessons.length > 10}
        <div class="mb-3">
          <SearchInput bind:value={searchQuery} placeholder="Tìm bài học... (số hoặc tên)" />
        </div>
      {/if}

      <!-- Lesson rows — compact, readable on all screen sizes -->
      <div class="flex flex-col gap-3.5">
        {#each lessons as lesson}
          {@const mastery = getLessonMastery($progressStore, courseId, lesson.lessonNumber)}
          <a
            href={buildLessonUrl(courseId, lesson.lessonNumber)}
            class="flex items-center gap-4 w-full px-5 py-5 bg-card border rounded-xl shadow-sm text-left no-underline transition-all duration-150 hover:border-primary hover:shadow-md hover:bg-accent/50 active:scale-[0.98] cursor-pointer group
              {lesson.lessonNumber === nextLesson ? 'border-primary/50 ring-1 ring-primary/20' : 'border-border'}"
          >
            <!-- Lesson number -->
            <span class="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
              {lesson.lessonNumber}
            </span>

            <!-- Title + stats -->
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-semibold text-foreground leading-snug truncate" style="font-family: var(--font-jp)">{lesson.title}</h3>
              <div class="flex gap-2 text-[0.7rem] text-muted-foreground mt-0.5">
                <span>{lesson.vocabCount} từ</span>
                <span>·</span>
                <span>{lesson.grammarCount} ngữ pháp</span>
              </div>
            </div>

            <!-- Mastery + arrow -->
            <div class="flex items-center gap-2 flex-shrink-0">
              <MasteryRing percentage={mastery} size={32} />
              <ChevronRight size={16} class="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
            </div>
          </a>
        {/each}
      </div>
    </div>
  </div>
{:else}
  <PageEmpty
    title="Course Not Found"
    description="The course you're looking for doesn't exist."
    action={{ label: 'View All Courses', href: '/courses' }}
  />
{/if}
