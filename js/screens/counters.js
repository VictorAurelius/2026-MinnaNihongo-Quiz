/**
 * screens/counters.js — Numbers & Counters reference screen
 * Depends on: nav (showScreen), audio (speak, isSupported)
 * Data: NUMBERS_DATA, COUNTERS_DATA (globals from js/data/minna/counters.js)
 */
window.QuizApp = window.QuizApp || {};
window.QuizApp.screens = window.QuizApp.screens || {};

(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);

  function renderNumbers(audio, hasAudio) {
    const wrap = $('#counters-numbers-body');
    if (!wrap) return;
    wrap.innerHTML = '';

    NUMBERS_DATA.forEach(n => {
      const tr = document.createElement('tr');
      const irregular = n.note === 'irregular' ? ' class="counter-irregular"' : '';
      const alt = n.alt ? `<span class="counter-alt"> / ${n.alt.kana} (${n.alt.romaji})</span>` : '';
      tr.innerHTML = `
        <td>${n.number.toLocaleString()}</td>
        <td class="jp-text">${n.kanji}</td>
        <td class="jp-text"${irregular}>${n.kana}${alt}</td>
        <td>${n.romaji}${n.alt ? ` / ${n.alt.romaji}` : ''}</td>
        <td>${hasAudio ? `<button class="btn-speak" data-speak="${n.kanji}">🔊</button>` : ''}</td>
      `;
      wrap.appendChild(tr);
    });

    if (hasAudio) {
      wrap.addEventListener('click', e => {
        const btn = e.target.closest('.btn-speak');
        if (btn) audio.speak(btn.dataset.speak);
      });
    }
  }

  function renderCounters(audio, hasAudio) {
    const wrap = $('#counters-list');
    if (!wrap) return;
    wrap.innerHTML = '';

    COUNTERS_DATA.forEach(c => {
      const card = document.createElement('div');
      card.className = 'counter-card';

      const lessonBadge = c.lesson
        ? `<span class="counter-lesson-badge">Bài ${c.lesson}</span>` : '';

      const readingsHTML = c.readings.map(r => {
        const cls = r.irregular ? 'counter-reading counter-reading--irregular' : 'counter-reading';
        const speakBtn = hasAudio
          ? `<button class="btn-speak btn-speak--sm" data-speak="${r.form}" title="Phát âm">🔊</button>` : '';
        return `<div class="${cls}">
          <span class="cr-number">${r.number}</span>
          <span class="cr-form jp-text">${r.form}</span>
          <span class="cr-kana">${r.kana}</span>
          <span class="cr-romaji">(${r.romaji})</span>
          ${speakBtn}
        </div>`;
      }).join('');

      card.innerHTML = `
        <div class="counter-card-header">
          <span class="counter-kanji jp-text">${c.counter}</span>
          <div class="counter-info">
            <span class="counter-reading-main">${c.kana} (${c.romaji})</span>
            <span class="counter-usage">${c.vietnamese}</span>
          </div>
          ${lessonBadge}
          ${hasAudio ? `<button class="btn-speak" data-speak="${c.counter}" title="Phát âm">🔊</button>` : ''}
        </div>
        <div class="counter-readings">${readingsHTML}</div>
        <div class="counter-example">
          <span class="jp-text">${c.example.japanese}</span>
          <span class="counter-example-vi">${c.example.vietnamese}</span>
        </div>
      `;

      if (hasAudio) {
        card.addEventListener('click', e => {
          const btn = e.target.closest('.btn-speak');
          if (btn) audio.speak(btn.dataset.speak);
        });
      }
      wrap.appendChild(card);
    });
  }

  function openCountersScreen() {
    const nav = window.QuizApp.nav;
    const audio = window.QuizApp.audio;
    const hasAudio = audio.isSupported();

    if (!$('#counters-numbers-body').dataset.rendered) {
      renderNumbers(audio, hasAudio);
      renderCounters(audio, hasAudio);
      $('#counters-numbers-body').dataset.rendered = '1';
    }

    nav.showScreen('counters');
  }

  // Tab switching between numbers and counters
  document.addEventListener('DOMContentLoaded', () => {
    const tabN = $('#counters-tab-numbers');
    const tabC = $('#counters-tab-counters');
    const secN = $('#counters-section-numbers');
    const secC = $('#counters-section-counters');
    if (!tabN || !tabC) return;

    tabN.addEventListener('click', () => {
      tabN.classList.add('active'); tabC.classList.remove('active');
      secN.classList.remove('hidden'); secC.classList.add('hidden');
    });
    tabC.addEventListener('click', () => {
      tabC.classList.add('active'); tabN.classList.remove('active');
      secC.classList.remove('hidden'); secN.classList.add('hidden');
    });
  });

  window.QuizApp.screens.openCountersScreen = openCountersScreen;
})();
