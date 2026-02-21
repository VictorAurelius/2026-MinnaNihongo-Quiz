/**
 * screens/vocab-list.js — Vocabulary list screen
 * Depends on: state, utils (kanaToRomaji), nav (showScreen), audio (speak, isSupported)
 */
window.QuizApp = window.QuizApp || {};
window.QuizApp.screens = window.QuizApp.screens || {};

window.QuizApp.screens.openVocabList = function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const state  = window.QuizApp.state;
  const utils  = window.QuizApp.utils;
  const nav    = window.QuizApp.nav;
  const audio  = window.QuizApp.audio;
  const hasAudio = audio.isSupported();

  $("#vocab-list-title").textContent =
    `Bài ${state.currentLesson.lessonNumber} — Danh sách từ vựng`;

  const tbody = $("#vocab-table-body");
  tbody.innerHTML = "";

  state.currentLesson.vocabulary.forEach((v, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${v.japanese}</td>
      <td>${v.kana}</td>
      <td>${utils.kanaToRomaji(v.kana)}</td>
      <td>${v.vietnamese}</td>
      <td>${v.english || ""}</td>
      <td>${hasAudio
        ? `<button class="btn-speak" data-speak="${v.japanese}" title="Phát âm">🔊</button>`
        : ""}</td>
    `;
    tbody.appendChild(tr);
  });

  // Event delegation — one listener for all speak buttons
  if (hasAudio) {
    tbody.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-speak");
      if (btn) audio.speak(btn.dataset.speak);
    });
  }

  nav.showScreen("vocabList");
};
