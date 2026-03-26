<script lang="ts">
  /**
   * Course Selection Page
   * Displays all available Japanese courses with shadcn Cards
   */

  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { getAllCourses } from '$lib/data/courses';
  import { Card, CardContent } from '$lib/components/ui/card';
  import Badge from '$lib/components/ui/badge/badge.svelte';

  const courses = getAllCourses();
</script>

<svelte:head>
  <title>Courses - Smart Quiz</title>
</svelte:head>

<div class="mx-auto max-w-3xl p-4 animate-in">
  <div class="text-center mb-8">
    <h1 class="text-2xl font-bold text-foreground mb-2">Japanese Courses</h1>
    <p class="text-muted-foreground text-sm">Select a course to begin studying</p>
  </div>

  {#if courses.length === 0}
    <div class="text-center py-12 text-muted-foreground">
      <p>No courses available. Please check back later.</p>
    </div>
  {/if}

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {#each courses as course}
      <button
        class="group text-left"
        on:click={() => goto(`${base}/course/${course.metadata.id}`)}
      >
        <Card class="relative overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary cursor-pointer h-full">
          <!-- Color accent bar -->
          <div class="absolute top-0 inset-x-0 h-1 opacity-80" style="background: {course.metadata.color}"></div>
          <CardContent class="pt-8 pb-6 px-6 text-center flex flex-col items-center gap-3">
            <span class="text-5xl">{course.metadata.icon}</span>
            <h2 class="text-xl font-bold text-foreground">{course.metadata.title}</h2>
            <p class="text-sm text-muted-foreground leading-relaxed">{course.metadata.description}</p>
            <Badge class="mt-1" style="background: {course.metadata.color}; color: white">
              {course.metadata.level}
            </Badge>
          </CardContent>
        </Card>
      </button>
    {/each}
  </div>
</div>

<style>
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(0.5rem); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-in {
    animation: fade-in 0.25s ease;
  }
</style>
