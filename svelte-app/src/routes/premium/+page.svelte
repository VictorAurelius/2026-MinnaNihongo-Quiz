<script lang="ts">
  import { base } from '$app/paths';
  import { getPremiumFeatures, isPremium, setPremium } from '$lib/utils/premiumUtils';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import Badge from '$lib/components/ui/badge/badge.svelte';
  import UiButton from '$lib/components/ui/button/button.svelte';

  $: premium = isPremium();
  $: features = getPremiumFeatures();
  $: freeFeatures = features.filter(f => f.free);
  $: premiumFeatures = features.filter(f => !f.free);

  function togglePremium() {
    setPremium(!premium);
    premium = isPremium();
  }
</script>

<svelte:head>
  <title>Premium - Smart Quiz</title>
</svelte:head>

<div class="mx-auto max-w-xl p-4 ">
  <header class="text-center mb-6">
    <h1 class="text-2xl font-bold mb-1">Smart Quiz Premium</h1>
    <p class="text-sm text-muted-foreground">Không có thanh toán trong phiên bản hiện tại. Chế độ beta chỉ mở các tính năng đã có sẵn trên thiết bị.</p>
  </header>

  <div class="text-center mb-6">
    {#if premium}
      <Badge class="bg-success text-white px-4 py-1.5 text-sm">Premium Active</Badge>
    {:else}
      <Badge variant="secondary" class="px-4 py-1.5 text-sm">Free Plan</Badge>
    {/if}
  </div>

  <Card class="mb-3">
    <CardHeader class="pb-2"><CardTitle class="text-sm">Free Features</CardTitle></CardHeader>
    <CardContent class="flex flex-col gap-2">
      {#each freeFeatures as feature}
        <div class="flex items-center gap-3 py-1">
          <span class="text-lg">✅</span>
          <div>
            <strong class="text-sm block">{feature.name}</strong>
            <span class="text-xs text-muted-foreground">{feature.description}</span>
          </div>
        </div>
      {/each}
    </CardContent>
  </Card>

  <Card class="mb-3">
    <CardHeader class="pb-2"><CardTitle class="text-sm">Tính năng thử nghiệm</CardTitle></CardHeader>
    <CardContent class="flex flex-col gap-2">
      {#each premiumFeatures as feature}
        <div class="flex items-center gap-3 py-1 {premium ? '' : 'opacity-60'}">
          <span class="text-lg">{premium ? '✅' : '🔒'}</span>
          <div>
            <strong class="text-sm block">{feature.name}</strong>
            <span class="text-xs text-muted-foreground">{feature.description}</span>
          </div>
        </div>
      {/each}
    </CardContent>
  </Card>

  <Card class="mb-3">
    <CardHeader class="pb-2"><CardTitle class="text-sm">Activation</CardTitle></CardHeader>
    <CardContent>
      <p class="text-sm text-muted-foreground mb-3">Kích hoạt miễn phí và được lưu cục bộ. Không tạo tài khoản, không gửi dữ liệu và không cam kết đây là gói thương mại tương lai.</p>
      <UiButton
        variant={premium ? 'destructive' : 'default'}
        onclick={togglePremium}
      >
        {premium ? 'Deactivate Premium' : 'Activate Premium (Free Beta)'}
      </UiButton>
    </CardContent>
  </Card>

  <a href="{base}/" class="inline-block mt-3 text-primary text-sm no-underline hover:underline">← Back to Home</a>
</div>
