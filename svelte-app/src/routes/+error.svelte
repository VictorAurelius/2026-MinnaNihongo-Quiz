<script lang="ts">
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import BackButton from '$lib/components/common/BackButton.svelte';

  $: error = $page.error;
  $: status = $page.status;
  $: console.error('[SmartQuiz] Error page rendered:', status, error?.message);
</script>

<div class="error-container">
  <div class="error-card">
    <h1>{status}</h1>
    <h2>
      {#if status === 404}
        Không tìm thấy trang
      {:else if status === 500}
        Lỗi server
      {:else}
        Có lỗi xảy ra
      {/if}
    </h2>

    <p class="error-message">
      {error?.message || 'Đã xảy ra lỗi không xác định'}
    </p>

    <div class="actions">
      <BackButton />
      <a href="{base}/" class="btn-primary">Về trang chủ</a>
    </div>
  </div>
</div>

<style>
  .error-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 2rem;
    background: var(--background-color);
  }

  .error-card {
    text-align: center;
    max-width: 500px;
    padding: 2rem;
    background: var(--card-background);
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  h1 {
    font-size: 4rem;
    color: var(--primary-color);
    margin: 0;
    font-weight: 700;
  }

  h2 {
    font-size: 1.5rem;
    margin: 1rem 0;
    color: var(--text-primary);
  }

  .error-message {
    color: var(--text-secondary);
    margin: 2rem 0;
    line-height: 1.6;
  }

  .actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-primary {
    padding: 0.75rem 1.5rem;
    background: var(--primary-color);
    color: white;
    text-decoration: none;
    border-radius: 0.5rem;
    font-weight: 500;
    transition: all 0.2s;
  }

  .btn-primary:hover {
    background: var(--primary-hover);
    transform: translateY(-2px);
  }

  @media (max-width: 640px) {
    h1 {
      font-size: 3rem;
    }

    h2 {
      font-size: 1.25rem;
    }

    .error-card {
      padding: 1.5rem;
    }
  }
</style>
