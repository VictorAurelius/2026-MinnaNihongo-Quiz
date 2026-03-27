<script lang="ts">
  /**
   * Course Selection Page — compact horizontal cards
   */

  import { base } from '$app/paths';
  import { getAllCourses } from '$lib/data/courses';
  import Badge from '$lib/components/ui/badge/badge.svelte';

  const courses = getAllCourses();
</script>

<svelte:head>
  <title>Courses - Smart Quiz</title>
</svelte:head>

<div class="mx-auto max-w-2xl p-4 animate-in">
  <div class="text-center mb-6">
    <h1 class="text-2xl font-bold text-foreground mb-1">Japanese Courses</h1>
    <p class="text-muted-foreground text-sm">Select a course to begin studying</p>
  </div>

  {#if courses.length === 0}
    <div class="text-center py-12 text-muted-foreground">
      <p>No courses available. Please check back later.</p>
    </div>
  {/if}

  <div class="flex flex-col gap-3">
    {#each courses as course}
      <a
        href="{base}/course/{course.metadata.id}"
        class="flex items-center gap-4 w-full p-4 bg-card border border-border rounded-xl text-left no-underline transition-all duration-200 hover:border-primary hover:-translate-y-0.5 hover:shadow-lg cursor-pointer group relative overflow-hidden"
      >
        <!-- Color accent -->
        <div class="absolute left-0 inset-y-0 w-1 rounded-l-xl" style="background: {course.metadata.color}"></div>

        <span class="text-3xl pl-2 flex-shrink-0">{course.metadata.icon}</span>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-0.5">
            <h2 class="text-base font-bold text-foreground">{course.metadata.title}</h2>
            <Badge class="text-[0.6rem] px-1.5 py-0" style="background: {course.metadata.color}; color: white">{course.metadata.level}</Badge>
          </div>
          <p class="text-xs text-muted-foreground leading-snug">{course.metadata.description}</p>
        </div>
        <span class="flex-shrink-0 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-transform">→</span>
      </a>
    {/each}
  </div>
</div>
