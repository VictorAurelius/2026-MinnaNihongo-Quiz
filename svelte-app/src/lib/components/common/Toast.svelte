<script lang="ts">
  export let message: string;
  export let type: 'success' | 'error' | 'info' = 'success';
  export let visible: boolean = true;
</script>

{#if visible}
  <div class="toast toast-{type}" role="alert" aria-live="polite">
    <span class="toast-message">{message}</span>
  </div>
{/if}

<style>
  .toast {
    position: fixed;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.75rem 1.25rem;
    border-radius: var(--radius-sm, 0.375rem);
    font-size: 0.9rem;
    font-weight: 500;
    z-index: 9999;
    animation: slideInFromTop 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    max-width: 90vw;
    text-align: center;
  }

  .toast-success {
    background: var(--success, #22c55e);
    color: white;
  }

  .toast-error {
    background: var(--danger, #ef4444);
    color: white;
  }

  .toast-info {
    background: var(--primary, #6366f1);
    color: white;
  }

  @keyframes slideInFromTop {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-100%);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
</style>
