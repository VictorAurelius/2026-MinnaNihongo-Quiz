<script lang="ts">
  /**
   * Course Selection Page
   */

  import { base } from '$app/paths';
  import { getAllCourses } from '$lib/data/courses';
  import Badge from '$lib/components/ui/badge/badge.svelte';
  import PageEmpty from '$lib/components/common/PageEmpty.svelte';
  import { ChevronRight } from 'lucide-svelte';
  import Breadcrumb from '$lib/components/common/Breadcrumb.svelte';

  const courses = getAllCourses();
</script>

<svelte:head>
  <title>Courses - Smart Quiz</title>
</svelte:head>

<div class="mx-auto max-w-2xl ">
  <!-- Hero -->
  <div class="relative text-white pt-3 pb-6 px-4 overflow-hidden" style="background: var(--color-shell)">
    <div class="relative z-10">
      <h1 class="text-[22px] font-extrabold tracking-tight drop-shadow-sm">Japanese Courses</h1>
      <p class="text-sm font-medium text-white/80 mt-1">Chọn khóa học để bắt đầu</p>
    </div>
  </div>

  <div class="px-4 py-5 flex flex-col gap-5">
    <Breadcrumb items={[
      { label: 'Home', href: '/' },
      { label: 'Courses' }
    ]} />

    {#if courses.length === 0}
      <PageEmpty title="No courses available" description="Please check back later." />
    {/if}

    <div class="flex flex-col gap-3">
      {#each courses as course, i}
        <a
          href="{base}/course/{course.metadata.id}"
          class=" group flex items-center gap-4 w-full px-5 py-5 bg-card border border-border/50 rounded-2xl shadow-sm text-left no-underline transition-colors duration-200 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-lg hover:bg-accent/30 active:scale-[0.98] cursor-pointer relative overflow-hidden"
          style="animation-delay: {i * 50}ms"
        >
          <div class="absolute left-0 inset-y-0 w-1 rounded-l-2xl" style="background: {course.metadata.color}"></div>
          <div class="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-2xl" style="background: color-mix(in srgb, {course.metadata.color} 12%, transparent)">
            {course.metadata.icon}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-0.5">
              <h2 class="text-sm font-bold text-foreground">{course.metadata.title}</h2>
              <Badge class="text-[0.55rem] px-1.5 py-0" style="background: {course.metadata.color}; color: white">{course.metadata.level}</Badge>
            </div>
            <p class="text-xs text-muted-foreground leading-snug">{course.metadata.description}</p>
          </div>
          <ChevronRight size={20} class="flex-shrink-0 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-transform" aria-hidden="true" />
        </a>
      {/each}
    </div>
  </div>
</div>
