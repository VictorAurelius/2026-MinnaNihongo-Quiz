/**
 * screens/hsk-vocab-list.js — HSK vocabulary list screen
 * Depends on: state, nav (showScreen), audio (speak)
 */
window.QuizApp = window.QuizApp || {};
window.QuizApp.screens = window.QuizApp.screens || {};

window.QuizApp.screens.openHSKVocabList = function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const state  = window.QuizApp.state;
  const nav    = window.QuizApp.nav;
  const audio  = window.QuizApp.audio;
  const group  = state.currentLesson;

  $("#hsk-vocab-list-title").textContent =
    "HSK 5 \u2014 Nh\xF3m " + group.title + " \u2014 Danh s\xE1ch t\u1EEB v\u1EF1ng";

  const tbody = $("#hsk-vocab-table-body");
  tbody.innerHTML = "";
  const hasAudio = audio.isSupported();

  group.vocabulary.forEach(function (v, i) {
    const tr = document.createElement("tr");
    tr.innerHTML =
      "<td>" + (i + 1) + "</td>" +
      "<td class=\"cn-text\">" + v.chinese + "</td>" +
      "<td class=\"hsk-pinyin\">" + v.pinyin + "</td>" +
      "<td>" + v.vietnamese + "</td>" +
      "<td>" + (hasAudio
        ? "<button class=\"btn-speak\" data-speak=\"" + v.chinese + "\">\uD83D\uDD0A</button>"
        : "") + "</td>";
    tbody.appendChild(tr);
  });

  if (hasAudio) {
    tbody.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-speak");
      if (btn) audio.speak(btn.dataset.speak, "zh-CN");
    });
  }

  nav.showScreen("hskVocabList");
};
