<script lang="ts">
  /**
   * Results Page
   * Shows quiz results with score ring, stats, retry options
   */

  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { quizStore, startQuiz, resetQuiz } from '$lib/stores';
  import { calculateStats, formatDuration, generateQuestions } from '$lib/utils/quizUtils';
  import { getCourse } from '$lib/data/courses';
  import { showToast } from '$lib/stores/toast';
  import type { CourseId } from '$lib/types/course';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import UiButton from '$lib/components/ui/button/button.svelte';
  import { PartyPopper, ThumbsUp, Zap, BookOpen, PenLine, RefreshCw, ArrowLeft, Home } from 'lucide-svelte';

  // Guard: redirect if no quiz data
  onMount(() => {
    if ($quizStore.questions.length === 0) {
      showToast('No quiz results to show', 'error');
      goto(`${base}/`);
    }
  });

  $: stats = calculateStats($quizStore.score, $quizStore.questions.length);
  $: duration = $quizStore.endTime
    ? formatDuration($quizStore.endTime - $quizStore.startTime)
    : '0:00';
  $: wrongCount = $quizStore.wrongItems.length;
  $: courseId = $quizStore.courseId as CourseId;
  $: strokeDasharray = `${stats.percentage}, 100`;

  $: gradeColor = stats.percentage >= 80
    ? 'text-success'
    : stats.percentage >= 60
      ? 'text-warning'
      : 'text-destructive';

  function retryAll() {
    const course = getCourse(courseId);
    const lessonData = course?.getLessonData($quizStore.lessonNumber);
    if (!lessonData) return;
    const questions = generateQuestions(lessonData.vocabulary, $quizStore.direction);
    startQuiz($quizStore.mode, $quizStore.direction, courseId, $quizStore.lessonNumber, questions);
    goto(`${base}/quiz/${$quizStore.mode}?course=${courseId}&lesson=${$quizStore.lessonNumber}&direction=${$quizStore.direction}`);
  }

  function retryWrong() {
    const wrongVocabItems = $quizStore.wrongItems.map(q => q.item);
    if (wrongVocabItems.length === 0) return;
    const questions = generateQuestions(wrongVocabItems as any, $quizStore.direction);
    startQuiz($quizStore.mode, $quizStore.direction, courseId, $quizStore.lessonNumber, questions);
    goto(`${base}/quiz/${$quizStore.mode}?course=${courseId}&lesson=${$quizStore.lessonNumber}&direction=${$quizStore.direction}`);
  }

  function backToLesson() {
    const cid = courseId;
    const lid = $quizStore.lessonNumber;
    resetQuiz();
    goto(`${base}/course/${cid}/lesson/${lid}`);
  }

  function backToHome() {
    resetQuiz();
    goto(`${base}/`);
  }
</script>

<svelte:head>
  <title>Quiz Results - Smart Quiz</title>
</svelte:head>

{#if $quizStore.questions.length > 0}
<div class="mx-auto max-w-md animate-in px-4">
  <Card>
    <CardHeader class="text-center pb-2">
      <CardTitle class="text-xl">Quiz Complete!</CardTitle>
    </CardHeader>
    <CardContent class="flex flex-col items-center gap-4">
      <!-- Score Circle -->
      <div class="relative w-32 h-32">
        <svg class="w-full h-full -rotate-90" viewBox="0 0 36 36" role="img" aria-label="Score: {stats.percentage}%">
          <title>Quiz score: {stats.percentage}%</title>
          <circle
            class="fill-none stroke-border"
            cx="18" cy="18" r="15.915"
            stroke-width="3"
          />
          <circle
            class="fill-none stroke-success transition-all duration-700"
            cx="18" cy="18" r="15.915"
            stroke-width="3"
            stroke-linecap="round"
            stroke-dasharray={strokeDasharray}
          />
        </svg>
        <div class="absolute inset-0 flex items-center justify-center text-3xl font-extrabold text-foreground">
          {stats.percentage}%
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-3 gap-4 w-full text-center text-sm">
        <div>
          <div class="font-bold text-foreground">{stats.correct}/{stats.total}</div>
          <div class="text-xs text-muted-foreground">Score</div>
        </div>
        <div>
          <div class="font-bold {gradeColor}">{stats.grade}</div>
          <div class="text-xs text-muted-foreground">Grade</div>
        </div>
        <div>
          <div class="font-bold text-foreground">{duration}</div>
          <div class="text-xs text-muted-foreground">Time</div>
        </div>
      </div>

      {#if wrongCount > 0}
        <div class="text-sm text-destructive font-medium">
          {wrongCount} wrong {wrongCount === 1 ? 'answer' : 'answers'}
        </div>
      {/if}

      <!-- Feedback -->
      <div class="w-full rounded-lg bg-muted p-3 text-center text-sm font-semibold text-primary">
        {#if stats.percentage === 100}
          <PartyPopper size={16} aria-hidden="true" /> Perfect score! Excellent work!
        {:else if stats.percentage >= 80}
          <ThumbsUp size={16} aria-hidden="true" /> Great job! Keep it up!
        {:else if stats.percentage >= 60}
          <Zap size={16} aria-hidden="true" /> Good effort! Practice makes perfect.
        {:else}
          <BookOpen size={16} aria-hidden="true" /> Keep practicing! You'll get better.
        {/if}
      </div>

      <!-- Actions -->
      <div class="flex flex-col gap-2.5 w-full">
        {#if wrongCount > 0}
          <UiButton variant="default" size="lg" class="w-full" onclick={retryWrong}>
            <PenLine size={16} aria-hidden="true" /> Retry {wrongCount} Wrong Items
          </UiButton>
        {/if}
        <UiButton variant="secondary" size="lg" class="w-full" onclick={retryAll}>
          <RefreshCw size={16} aria-hidden="true" /> Retry All
        </UiButton>
        <UiButton variant="outline" class="w-full" onclick={backToLesson}>
          <ArrowLeft size={16} aria-hidden="true" /> Back to Lesson
        </UiButton>
        <UiButton variant="ghost" class="w-full" onclick={backToHome}>
          <Home size={16} aria-hidden="true" /> Home
        </UiButton>
      </div>
    </CardContent>
  </Card>
</div>
{/if}
