<script lang="ts">
  /**
   * /exams/[paperId] — the exam runner for one paper.
   * CSR-only (served via the SPA fallback, like /quiz/[mode]).
   */
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { loadPaper } from '$lib/data/exams';
  import ExamRunner from '$lib/components/exam/ExamRunner.svelte';

  const paperId = $derived($page.params.paperId);
  const paper = $derived(loadPaper(paperId));
</script>

<svelte:head>
  <title>{paper ? `${paper.title} - Smart Quiz` : 'Đề không tồn tại - Smart Quiz'}</title>
</svelte:head>

<div class="mx-auto max-w-2xl p-4   duration-300">
  {#if paper}
    {#key paper.id}
      <ExamRunner {paper} />
    {/key}
  {:else}
    <div class="rounded-2xl border border-border/50 bg-card p-8 text-center">
      <div class="text-3xl mb-2">🔍</div>
      <p class="text-sm font-bold mb-1">Không tìm thấy đề thi</p>
      <p class="text-xs text-muted-foreground mb-4">
        Đề <code>{paperId}</code> không tồn tại hoặc đã bị gỡ.
      </p>
      <a
        href="{base}/exams"
        class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground no-underline hover:bg-primary/90"
      >
        Về danh sách đề
      </a>
    </div>
  {/if}
</div>
