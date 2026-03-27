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
  import UiButton from '$lib/components/ui/button/button.svelte';
  import type { CourseId } from '$lib/types/course';

  $: courseId = $page.params.courseId as CourseId;
  $: course = getCourse(courseId);
  $: lessons = course?.getLessonMetadata() ?? [];
  $: courseProgress = getCourseProgress($progressStore, courseId);
  $: nextLesson = getNextLesson($progressStore, courseId);
</script>

<svelte:head>
  <title>{course?.metadata.title || 'Course'} - Smart Quiz</title>
</svelte:head>

{#if course}
  <div class="animate-in">
    <!-- Course Header -->
    <div
      class="text-white py-6 px-4 text-center relative"
      style="background: linear-gradient(135deg, {course.metadata.color}, var(--color-primary))"
    >
      <button
        class="absolute top-3 left-3 bg-white/20 hover:bg-white/30 text-white border-none px-3 py-1.5 rounded-lg text-sm cursor-pointer transition-colors"
        on:click={() => goto(`${base}/courses`)}
      >
        ← Back
      </button>
      <h1 class="text-xl font-bold mb-1">{course.metadata.title}</h1>
      <p class="text-xs opacity-90">{course.metadata.description}</p>
      <p class="text-xs opacity-75 mt-1">
        {courseProgress.completed}/{courseProgress.total} lessons mastered ({courseProgress.percentage}%)
      </p>
    </div>

    <!-- Content -->
    <div class="max-w-4xl mx-auto px-3 sm:px-4 py-4">
      <!-- Continue Button -->
      <UiButton
        size="lg"
        class="w-full mb-4"
        onclick={() => goto(buildLessonUrl(courseId, nextLesson))}
      >
        Continue — Bài {nextLesson} →
      </UiButton>

      <h2 class="text-base font-bold mb-3">Lessons ({lessons.length})</h2>

      <!-- Lesson rows — compact, readable on all screen sizes -->
      <div class="flex flex-col gap-1.5">
        {#each lessons as lesson}
          {@const mastery = getLessonMastery($progressStore, courseId, lesson.lessonNumber)}
          <button
            class="flex items-center gap-3 w-full px-3 py-2.5 bg-card border border-border rounded-lg text-left transition-all duration-150 hover:border-primary hover:shadow-sm cursor-pointer group"
            on:click={() => goto(buildLessonUrl(courseId, lesson.lessonNumber))}
          >
            <!-- Lesson number -->
            <span class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
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
              <span class="text-muted-foreground text-xs group-hover:text-primary group-hover:translate-x-0.5 transition-all">→</span>
            </div>
          </button>
        {/each}
      </div>
    </div>
  </div>
{:else}
  <div class="text-center py-12 px-6">
    <h2 class="text-xl font-bold mb-3 text-foreground">Course Not Found</h2>
    <p class="text-muted-foreground mb-4">The course you're looking for doesn't exist.</p>
    <UiButton onclick={() => goto(`${base}/courses`)}>View All Courses</UiButton>
  </div>
{/if}

<style>
  @keyframes fade-in { from { opacity: 0; transform: translateY(0.5rem); } to { opacity: 1; transform: translateY(0); } }
  .animate-in { animation: fade-in 0.25s ease; }
</style>
