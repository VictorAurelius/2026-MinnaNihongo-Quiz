<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    value?: number;
    max?: number;
    class?: string;
  }

  let { value = 0, max = 100, class: className, ...props }: Props = $props();

  let percentage = $derived(Math.min(Math.max((value / max) * 100, 0), 100));
</script>

<div
  role="progressbar"
  aria-valuemin={0}
  aria-valuemax={max}
  aria-valuenow={value}
  class={cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', className)}
  {...props}
>
  <div
    class="h-full bg-primary transition-all"
    style="width: {percentage}%"
  ></div>
</div>
