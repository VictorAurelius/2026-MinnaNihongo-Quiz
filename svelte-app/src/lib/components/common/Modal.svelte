<script lang="ts">
  /**
   * Reusable Modal Component
   * Full-screen overlay with centered content
   */

  import { closeModal } from '$lib/stores';
  import { onMount } from 'svelte';

  export let isOpen = false;
  export let title = '';
  export let maxWidth: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  export let showCloseButton = true;

  let modalContentEl: HTMLDivElement;
  let previouslyFocused: HTMLElement | null = null;

  function handleClose() {
    isOpen = false;
    closeModal();
    previouslyFocused?.focus();
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
    // Focus trap
    if (e.key === 'Tab' && isOpen && modalContentEl) {
      const focusable = modalContentEl.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  $: maxWidthClass = {
    sm: 'modal-content-sm',
    md: 'modal-content-md',
    lg: 'modal-content-lg',
    xl: 'modal-content-xl'
  }[maxWidth];

  $: if (isOpen && modalContentEl) {
    previouslyFocused = document.activeElement as HTMLElement;
    // Focus first focusable element in modal
    requestAnimationFrame(() => {
      const first = modalContentEl?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      first?.focus();
    });
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
  <div class="modal active">
    <!-- svelte-ignore a11y_no_static_element_interactions a11y_click_events_have_key_events -->
    <div class="modal-overlay" on:click={handleOverlayClick}></div>

    <div
      class="modal-content {maxWidthClass}"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      bind:this={modalContentEl}
      on:click={handleContentClick}
      on:keydown
    >
      {#if title || showCloseButton}
        <div class="modal-header">
          <h2 class="modal-title" id="modal-title">{title}</h2>
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
    background: var(--color-card);
    border-radius: var(--radius);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
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
    border-bottom: 1px solid var(--color-border);
    background: var(--color-primary);
    color: var(--color-primary-foreground);
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
    color: var(--color-primary-foreground);
    font-size: 1.5rem;
    cursor: pointer;
    transition: background 0.2s ease;
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
    border-top: 1px solid var(--color-border);
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
