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
  import { getLessonMastery, isLessonUnlocked, getNextLesson, getCourseProgress } from '$lib/utils/progressUtils';
  import MasteryRing from '$lib/components/common/MasteryRing.svelte';
  import { Card, CardContent } from '$lib/components/ui/card';
  import Badge from '$lib/components/ui/badge/badge.svelte';
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
      class="text-white py-8 px-4 text-center relative"
      style="background: linear-gradient(135deg, {course.metadata.color}, var(--color-primary))"
    >
      <button
        class="absolute top-4 left-4 bg-white/20 hover:bg-white/30 text-white border-none px-3 py-1.5 rounded-lg text-sm cursor-pointer transition-colors"
        on:click={() => goto(`${base}/courses`)}
      >
        ← Back
      </button>
      <div class="text-5xl mb-2">{course.metadata.icon}</div>
      <h1 class="text-2xl font-bold mb-1">{course.metadata.title}</h1>
      <p class="text-sm opacity-90">{course.metadata.description}</p>
      <p class="text-xs opacity-75 mt-2">
        {courseProgress.completed}/{courseProgress.total} lessons mastered ({courseProgress.percentage}%)
      </p>
    </div>

    <!-- Content -->
    <div class="max-w-5xl mx-auto px-4 py-6">
      <!-- Continue Button -->
      <UiButton
        size="lg"
        class="w-full mb-6"
        onclick={() => goto(buildLessonUrl(courseId, nextLesson))}
      >
        Continue — Bài {nextLesson} →
      </UiButton>

      <h2 class="text-lg font-bold mb-4">Lessons</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each lessons as lesson}
          {@const mastery = getLessonMastery($progressStore, courseId, lesson.lessonNumber)}
          {@const unlocked = isLessonUnlocked($progressStore, courseId, lesson.lessonNumber)}
          <button
            class="text-left w-full transition-all duration-200 {unlocked ? 'hover:-translate-y-0.5 hover:shadow-lg cursor-pointer' : 'opacity-50 cursor-not-allowed'}"
            disabled={!unlocked}
            on:click={() => unlocked && goto(buildLessonUrl(courseId, lesson.lessonNumber))}
            title={unlocked ? '' : `Complete Bài ${lesson.lessonNumber - 1} first (need 70% mastery)`}
          >
            <Card class="h-full {unlocked ? 'hover:border-primary' : ''}">
              <CardContent class="p-4">
                <div class="flex items-center justify-between mb-2">
                  <Badge variant="default" class="text-xs">Bài {lesson.lessonNumber}</Badge>
                  <MasteryRing percentage={mastery} size={36} locked={!unlocked} />
                </div>
                <h3 class="text-sm font-semibold text-foreground mb-2 leading-snug">{lesson.title}</h3>
                <div class="flex gap-3 text-xs text-muted-foreground">
                  <span>📚 {lesson.vocabCount} từ</span>
                  <span>📖 {lesson.grammarCount} ngữ pháp</span>
                </div>
              </CardContent>
            </Card>
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
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(0.5rem); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-in {
    animation: fade-in 0.25s ease;
  }
</style>
