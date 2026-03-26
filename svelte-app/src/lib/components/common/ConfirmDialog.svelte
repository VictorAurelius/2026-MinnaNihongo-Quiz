<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let open = false;
  export let title = 'Confirm';
  export let message = 'Are you sure?';
  export let confirmText = 'Confirm';
  export let cancelText = 'Cancel';
  export let destructive = false;

  const dispatch = createEventDispatcher<{ confirm: void; cancel: void }>();

  function handleConfirm() {
    dispatch('confirm');
    open = false;
  }

  function handleCancel() {
    dispatch('cancel');
    open = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') handleCancel();
  }
</script>

{#if open}
  <div class="overlay" on:click={handleCancel} on:keydown={handleKeydown} role="presentation">
    <div class="dialog" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" on:click|stopPropagation>
      <h3 id="confirm-title">{title}</h3>
      <p>{message}</p>
      <div class="actions">
        <button class="btn btn-cancel" on:click={handleCancel}>{cancelText}</button>
        <button
          class="btn"
          class:btn-danger={destructive}
          class:btn-primary={!destructive}
          on:click={handleConfirm}
        >
          {confirmText}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.15s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .dialog {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.5rem;
    max-width: 400px;
    width: 90%;
    box-shadow: var(--shadow-lg);
  }

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
  }

  p {
    color: var(--text-muted);
    font-size: 0.9rem;
    margin: 0 0 1.25rem;
    line-height: 1.5;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: var(--radius-sm);
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-cancel {
    background: var(--bg);
    color: var(--text-muted);
    border: 1px solid var(--border);
  }

  .btn-primary {
    background: var(--primary);
    color: white;
  }

  .btn-danger {
    background: var(--danger);
    color: white;
  }
</style>
