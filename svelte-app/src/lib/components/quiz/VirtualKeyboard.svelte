<script lang="ts">
  /**
   * Virtual Keyboard Component
   * Hiragana and Katakana input with dakuten conversion
   */

  import { createEventDispatcher } from 'svelte';

  export let visible = true;

  const dispatch = createEventDispatcher();

  type ScriptType = 'hiragana' | 'katakana';
  let activeScript: ScriptType = 'hiragana';

  // Hiragana characters (main grid)
  const HIRAGANA_CHARS = [
    ['あ', 'い', 'う', 'え', 'お'],
    ['か', 'き', 'く', 'け', 'こ'],
    ['さ', 'し', 'す', 'せ', 'そ'],
    ['た', 'ち', 'つ', 'て', 'と'],
    ['な', 'に', 'ぬ', 'ね', 'の'],
    ['は', 'ひ', 'ふ', 'へ', 'ほ'],
    ['ま', 'み', 'む', 'め', 'も'],
    ['や', '', 'ゆ', '', 'よ'],
    ['ら', 'り', 'る', 'れ', 'ろ'],
    ['わ', '', '', '', 'を'],
    ['ん', '', '', '', '']
  ];

  // Katakana characters
  const KATAKANA_CHARS = [
    ['ア', 'イ', 'ウ', 'エ', 'オ'],
    ['カ', 'キ', 'ク', 'ケ', 'コ'],
    ['サ', 'シ', 'ス', 'セ', 'ソ'],
    ['タ', 'チ', 'ツ', 'テ', 'ト'],
    ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'],
    ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'],
    ['マ', 'ミ', 'ム', 'メ', 'モ'],
    ['ヤ', '', 'ユ', '', 'ヨ'],
    ['ラ', 'リ', 'ル', 'レ', 'ロ'],
    ['ワ', '', '', '', 'ヲ'],
    ['ン', '', '', '', '']
  ];

  // Special characters (sidebar)
  const SPECIAL_CHARS = [
    '゛', '゜', 'ー', 'っ', 'ゃ', 'ゅ', 'ょ', '、', '。'
  ];

  $: activeChars = activeScript === 'hiragana' ? HIRAGANA_CHARS : KATAKANA_CHARS;

  function insertChar(char: string) {
    if (!char) return;
    dispatch('insert', { char });
  }

  function deleteChar() {
    dispatch('delete');
  }

  function clearAll() {
    dispatch('clear');
  }

  function switchScript(script: ScriptType) {
    activeScript = script;
  }
</script>

{#if visible}
  <div class="virtual-keyboard">
    <div class="keyboard-header">
      <div class="keyboard-tabs">
        <button
          class="keyboard-tab"
          class:active={activeScript === 'hiragana'}
          on:click={() => switchScript('hiragana')}
        >
          あ Hiragana
        </button>
        <button
          class="keyboard-tab"
          class:active={activeScript === 'katakana'}
          on:click={() => switchScript('katakana')}
        >
          ア Katakana
        </button>
      </div>
    </div>

    <div class="keyboard-grid">
      <!-- Main character grid -->
      <div class="keyboard-main">
        {#each activeChars as row}
          {#each row as char}
            {#if char}
              <button class="keyboard-key" on:click={() => insertChar(char)}>
                {char}
              </button>
            {:else}
              <div class="keyboard-key empty"></div>
            {/if}
          {/each}
        {/each}
      </div>

      <!-- Sidebar with special characters -->
      <div class="keyboard-sidebar">
        {#each SPECIAL_CHARS as char}
          <button
            class="keyboard-key small"
            class:accent={char === '゛' || char === '゜'}
            on:click={() => insertChar(char)}
          >
            {char}
          </button>
        {/each}
        <button class="keyboard-key special" on:click={deleteChar}>
          ⌫
        </button>
        <button class="keyboard-key special" on:click={clearAll}>
          Clear
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .virtual-keyboard {
    margin: 0.5rem 0;
    padding: 0.5rem;
    background: var(--bg-card);
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow);
    animation: slideDown 0.25s ease;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .keyboard-header {
    margin-bottom: 0.4rem;
    border-bottom: 1px solid var(--border);
    padding-bottom: 0.35rem;
  }

  .keyboard-tabs {
    display: flex;
    gap: 0.3rem;
    justify-content: center;
  }

  .keyboard-tab {
    padding: 0.3rem 0.6rem;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 4px;
    font-family: var(--font-jp);
    font-size: 0.7rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    color: var(--text-muted);
  }

  .keyboard-tab:hover {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
  }

  .keyboard-tab.active {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
  }

  .keyboard-grid {
    display: flex;
    gap: 0.5rem;
  }

  .keyboard-main {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.15rem;
    flex: 1;
  }

  .keyboard-sidebar {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.25rem;
    width: 110px;
  }

  .keyboard-key {
    aspect-ratio: 1;
    padding: 0;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    font-family: var(--font-jp);
    font-size: 1.2rem;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    min-height: 42px;
    max-height: 60px;
  }

  .keyboard-key:hover:not(.empty) {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
    transform: scale(1.05);
  }

  .keyboard-key:active {
    transform: scale(0.92);
  }

  .keyboard-key.empty {
    background: transparent;
    border: none;
    cursor: default;
    pointer-events: none;
  }

  .keyboard-key.small {
    font-size: 0.95rem;
    background: var(--bg-card);
  }

  .keyboard-key.accent {
    background: var(--warning);
    color: white;
    border-color: var(--warning);
    font-size: 1.35rem;
  }

  .keyboard-key.accent:hover {
    background: #e68a00;
    border-color: #e68a00;
  }

  .keyboard-key.special {
    background: var(--accent);
    color: white;
    border-color: var(--accent);
    font-size: 0.8rem;
    font-weight: 600;
  }

  .keyboard-key.special:hover {
    background: var(--accent-hover);
    border-color: var(--accent-hover);
  }

  /* Mobile optimization */
  @media (max-width: 600px) {
    .keyboard-grid {
      gap: 0.35rem;
    }

    .keyboard-main {
      gap: 0.2rem;
    }

    .keyboard-sidebar {
      gap: 0.2rem;
      width: 95px;
    }

    .keyboard-key {
      font-size: 1.05rem;
      min-height: 38px;
      max-height: 52px;
    }

    .keyboard-key.small {
      font-size: 0.85rem;
    }

    .keyboard-key.accent {
      font-size: 1.2rem;
    }

    .keyboard-key.special {
      font-size: 0.7rem;
    }

    .virtual-keyboard {
      padding: 0.4rem;
    }
  }
</style>
