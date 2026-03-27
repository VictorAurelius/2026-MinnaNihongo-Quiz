# PR #29 — Page States + Navigation UX

> **Type:** feat(ux)
> **Scope:** Add loading, error, empty states to all pages. Fix navigation patterns.
> **Depends on:** PR #26 (component migration)
> **Risk:** LOW — additive improvements, no breaking changes

## Problem

- 0/10 pages use `Skeleton` component for loading states
- Most pages have no error boundary or user-facing error state
- Several pages have no empty state or just show blank space
- Quiz page shows plain text "Loading quiz..." instead of skeleton
- No guard for direct navigation to Results without quiz data

## Tasks

### 1. Create reusable page state components

**PageLoading.svelte** — standardized loading skeleton:
```svelte
<script>
  import { Skeleton } from '$lib/components/ui/skeleton';
  export let lines = 3;
  export let cards = 0;
</script>

<div class="space-y-4 animate-in">
  {#each Array(lines) as _}
    <Skeleton class="h-4 w-full" />
  {/each}
  {#if cards > 0}
    <div class="grid grid-cols-2 gap-4">
      {#each Array(cards) as _}
        <Skeleton class="h-24 w-full rounded-lg" />
      {/each}
    </div>
  {/if}
</div>
```

**PageError.svelte** — standardized error state:
```svelte
<script>
  export let message = 'Something went wrong';
  export let retry: (() => void) | undefined = undefined;
</script>

<div class="text-center py-12 space-y-4">
  <AlertCircle class="mx-auto text-destructive" size={48} />
  <p class="text-muted-foreground">{message}</p>
  {#if retry}
    <Button onclick={retry}>Try again</Button>
  {/if}
</div>
```

**PageEmpty.svelte** — standardized empty state:
```svelte
<script>
  export let title = 'Nothing here yet';
  export let description = '';
  export let action: { label: string; href: string } | undefined = undefined;
</script>

<div class="text-center py-12 space-y-4">
  <Inbox class="mx-auto text-muted-foreground" size={48} />
  <h3 class="text-lg font-medium">{title}</h3>
  {#if description}
    <p class="text-muted-foreground">{description}</p>
  {/if}
  {#if action}
    <a href="{base}{action.href}" class="...">
      {action.label}
    </a>
  {/if}
</div>
```

### 2. Add states to each page

| Page | Loading | Error | Empty |
|------|---------|-------|-------|
| Home | Skeleton for course cards + stats | Error message if courses fail | "No courses available" |
| Courses | Skeleton grid | Error fallback | "No courses found" |
| Course Detail | Skeleton for lesson list | "Course not found" (exists) | "No lessons yet" |
| Lesson Menu | Skeleton for sections | "Lesson not found" (exists) | N/A |
| Vocabulary | Skeleton for vocab list | Error fallback | "No vocabulary" (search exists) |
| Quiz Player | Skeleton card + progress bar | Redirect with toast message | N/A |
| Results | Skeleton score ring | Guard: redirect if no data | N/A |
| Kanji | Skeleton grid | Error fallback | "No kanji for this level" |
| HSK | Skeleton list | Error fallback | "No groups for this level" |
| Settings | Skeleton for stats | Error on import | N/A |

### 3. Results page guard

Add guard for direct navigation to `/results` without quiz data:
```svelte
onMount(() => {
  if (!$quizResults || $quizResults.total === 0) {
    toast.error('No quiz results to show');
    goto(`${base}/`);
    return;
  }
});
```

### 4. Quiz loading improvement

Replace "Loading quiz..." text with proper skeleton:
```svelte
{#if loading}
  <div class="space-y-4 max-w-xl mx-auto px-4">
    <Skeleton class="h-2 w-full" /> <!-- progress bar -->
    <Skeleton class="h-64 w-full rounded-lg" /> <!-- quiz card -->
    <div class="flex gap-2">
      <Skeleton class="h-10 flex-1" /> <!-- buttons -->
      <Skeleton class="h-10 flex-1" />
    </div>
  </div>
{/if}
```

## Tests

- Each page renders loading skeleton before data arrives
- Each page shows error state on data failure
- Each page shows empty state when data is empty array
- Results page redirects without quiz data
- Quiz page shows skeleton during loading
- Toast appears on error/redirect scenarios

## Files Changed

- New: `svelte-app/src/lib/components/common/PageLoading.svelte`
- New: `svelte-app/src/lib/components/common/PageError.svelte`
- New: `svelte-app/src/lib/components/common/PageEmpty.svelte`
- All 10 route pages (add state handling)
- ~13 files total
