/**
 * screens/alphabet.js — Hiragana & Katakana reference grid
 * Depends on: nav (showScreen), audio (speak, isSupported)
 * Data: ALPHABET_DATA (global from js/data/minna/alphabet.js)
 */
window.QuizApp = window.QuizApp || {};
window.QuizApp.screens = window.QuizApp.screens || {};

(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);

  // Row label display names
  const ROW_LABELS = {
    vowel:'あ行', k:'か行', g:'が行', s:'さ行', z:'ざ行',
    t:'た行', d:'だ行', n:'な行', h:'は行', b:'ば行',
    p:'ぱ行', m:'ま行', y:'や行', r:'ら行', w:'わ行', nn:'ん',
  };
  const COL_HEADERS = ['a', 'i', 'u', 'e', 'o'];

  function renderGrid(script) {
    const data  = ALPHABET_DATA[script]; // hiragana | katakana
    const audio = window.QuizApp.audio;
    const hasAudio = audio.isSupported();
    const wrap = $(`#alpha-grid-${script}`);
    if (!wrap) return;
    wrap.innerHTML = '';

    // ── Main table ────────────────────────────────────
    const table = document.createElement('table');
    table.className = 'alpha-table';

    // Header row
    const thead = document.createElement('thead');
    thead.innerHTML = `<tr><th></th>${COL_HEADERS.map(c=>`<th>${c}</th>`).join('')}</tr>`;
    table.appendChild(thead);

    // Body rows
    const tbody = document.createElement('tbody');
    data.rows.forEach(row => {
      if (!row.some(Boolean)) return; // skip fully-empty rows
      const firstCell = row.find(Boolean);
      const rowLabel = ROW_LABELS[firstCell.row] || firstCell.row;

      const tr = document.createElement('tr');
      tr.innerHTML = `<th class="alpha-row-label">${rowLabel}</th>`;
      row.forEach(cell => {
        const td = document.createElement('td');
        if (cell) {
          td.className = 'alpha-cell';
          td.innerHTML = `<span class="alpha-kana">${cell.kana}</span><span class="alpha-romaji">${cell.romaji}</span>`;
          if (hasAudio) {
            td.classList.add('alpha-cell--audio');
            td.title = `Phát âm: ${cell.romaji}`;
            td.addEventListener('click', () => audio.speak(cell.kana));
          }
        } else {
          td.className = 'alpha-cell alpha-cell--empty';
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    wrap.appendChild(table);

    // ── Combo table ────────────────────────────────────
    if (data.combo.length === 0) return;

    const comboHeading = document.createElement('h3');
    comboHeading.className = 'alpha-section-heading';
    comboHeading.textContent = script === 'hiragana' ? '拗音 (Youon)' : '拗音 Katakana';
    wrap.appendChild(comboHeading);

    const comboGrid = document.createElement('div');
    comboGrid.className = 'alpha-combo-grid';
    data.combo.forEach(cell => {
      const div = document.createElement('div');
      div.className = 'alpha-cell alpha-combo-cell';
      div.innerHTML = `<span class="alpha-kana">${cell.kana}</span><span class="alpha-romaji">${cell.romaji}</span>`;
      if (hasAudio) {
        div.classList.add('alpha-cell--audio');
        div.title = `Phát âm: ${cell.romaji}`;
        div.addEventListener('click', () => audio.speak(cell.kana));
      }
      comboGrid.appendChild(div);
    });
    wrap.appendChild(comboGrid);
  }

  function openAlphabetScreen() {
    const nav = window.QuizApp.nav;
    $('#alpha-tab-hiragana').classList.add('active');
    $('#alpha-tab-katakana').classList.remove('active');
    $('#alpha-grid-hiragana').classList.remove('hidden');
    $('#alpha-grid-katakana').classList.add('hidden');

    // Lazy render — only once
    if (!$('#alpha-grid-hiragana').dataset.rendered) {
      renderGrid('hiragana');
      renderGrid('katakana');
      $('#alpha-grid-hiragana').dataset.rendered = '1';
    }

    nav.showScreen('alphabet');
  }

  // Tab switching
  document.addEventListener('DOMContentLoaded', () => {
    const tabH = $('#alpha-tab-hiragana');
    const tabK = $('#alpha-tab-katakana');
    if (!tabH || !tabK) return;

    tabH.addEventListener('click', () => {
      tabH.classList.add('active');
      tabK.classList.remove('active');
      $('#alpha-grid-hiragana').classList.remove('hidden');
      $('#alpha-grid-katakana').classList.add('hidden');
    });

    tabK.addEventListener('click', () => {
      tabK.classList.add('active');
      tabH.classList.remove('active');
      $('#alpha-grid-katakana').classList.remove('hidden');
      $('#alpha-grid-hiragana').classList.add('hidden');
    });
  });

  window.QuizApp.screens.openAlphabetScreen = openAlphabetScreen;
})();
