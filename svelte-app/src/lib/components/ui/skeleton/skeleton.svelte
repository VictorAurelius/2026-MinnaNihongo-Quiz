<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    class?: string;
  }

  let { class: className, ...props }: Props = $props();
</script>

<div class={cn('animate-pulse rounded-md bg-muted', className)} {...props}></div>
