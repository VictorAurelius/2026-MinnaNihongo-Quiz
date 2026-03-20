<script lang="ts">
  /**
   * Reusable Modal Component
   * Full-screen overlay with centered content
   */

  import { closeModal } from '$lib/stores';

  export let isOpen = false;
  export let title = '';
  export let maxWidth: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  export let showCloseButton = true;

  function handleClose() {
    isOpen = false;
    closeModal();
  }

  function handleOverlayClick() {
    handleClose();
  }

  function handleContentClick(e: MouseEvent) {
    e.stopPropagation();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && isOpen) {
      handleClose();
    }
  }

  $: maxWidthClass = {
    sm: 'modal-content-sm',
    md: 'modal-content-md',
    lg: 'modal-content-lg',
    xl: 'modal-content-xl'
  }[maxWidth];
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
  <div class="modal active">
    <!-- svelte-ignore a11y_no_static_element_interactions a11y_click_events_have_key_events -->
    <div class="modal-overlay" on:click={handleOverlayClick}></div>

    <!-- svelte-ignore a11y_no_static_element_interactions a11y_click_events_have_key_events -->
    <div class="modal-content {maxWidthClass}" on:click={handleContentClick}>
      {#if title || showCloseButton}
        <div class="modal-header">
          <h2 class="modal-title">{title}</h2>
          {#if showCloseButton}
            <button class="modal-close" on:click={handleClose} aria-label="Close modal">
              ×
            </button>
          {/if}
        </div>
      {/if}

      <div class="modal-body">
        <slot />
      </div>

      {#if $$slots.footer}
        <div class="modal-footer">
          <slot name="footer" />
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    align-items: center;
    justify-content: center;
  }

  .modal.active {
    display: flex;
  }

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
  }

  .modal-content {
    position: relative;
    background: var(--bg-card);
    border-radius: var(--radius);
    box-shadow: var(--shadow-lg);
    max-height: 85vh;
    width: 90%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    animation: modalSlideUp 0.3s ease;
  }

  .modal-content-sm {
    max-width: 400px;
  }

  .modal-content-md {
    max-width: 600px;
  }

  .modal-content-lg {
    max-width: 800px;
  }

  .modal-content-xl {
    max-width: 1000px;
  }

  @keyframes modalSlideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--border);
    background: linear-gradient(135deg, var(--primary), var(--accent));
    color: #fff;
  }

  .modal-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }

  .modal-close {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    color: #fff;
    font-size: 1.5rem;
    cursor: pointer;
    transition: background var(--transition);
  }

  .modal-close:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .modal-body {
    padding: 1.5rem;
    overflow-y: auto;
    flex: 1;
  }

  .modal-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid var(--border);
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
  }

  @media (max-width: 768px) {
    .modal-content {
      width: 95%;
      max-height: 90vh;
    }

    .modal-header {
      padding: 1rem 1.25rem;
    }

    .modal-title {
      font-size: 1.25rem;
    }

    .modal-body {
      padding: 1.25rem;
    }
  }
</style>
