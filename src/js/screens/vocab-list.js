/**
 * screens/vocab-list.js — Vocabulary list screen
 * Depends on: state, utils (kanaToRomaji), nav (showScreen), audio (speak, isSupported)
 */
window.QuizApp = window.QuizApp || {};
window.QuizApp.screens = window.QuizApp.screens || {};

window.QuizApp.screens.openVocabList = function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);
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
      <td><input type="checkbox" class="vocab-checkbox" data-index="${i}"></td>
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

  // Update selected count
  function updateSelectedCount() {
    const checked = $$(".vocab-checkbox:checked").length;
    $("#vocab-selected-count").textContent = `${checked} từ được chọn`;
    $("#vocab-quiz-buttons").style.display = checked > 0 ? "flex" : "none";
  }

  // Handle checkbox changes
  tbody.addEventListener("change", (e) => {
    if (e.target.classList.contains("vocab-checkbox")) {
      updateSelectedCount();
    }
  });

  // Handle "Select All" checkboxes (both in controls and table header)
  const selectAllCheckboxes = [$("#vocab-select-all"), $("#vocab-select-all-th")];
  selectAllCheckboxes.forEach(cb => {
    if (cb) {
      cb.checked = false;
      cb.addEventListener("change", (e) => {
        const checked = e.target.checked;
        $$(".vocab-checkbox").forEach(vcb => vcb.checked = checked);
        // Sync both select-all checkboxes
        selectAllCheckboxes.forEach(scb => scb.checked = checked);
        updateSelectedCount();
      });
    }
  });

  // Handle custom quiz buttons
  $$(".vocab-quiz-buttons [data-custom-mode]").forEach(btn => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.customMode;
      const selectedIndices = Array.from($$(".vocab-checkbox:checked"))
        .map(cb => parseInt(cb.dataset.index));

      if (selectedIndices.length === 0) {
        alert("Vui lòng chọn ít nhất 1 từ");
        return;
      }

      // Filter vocabulary based on selection
      const selectedVocab = selectedIndices.map(i => state.currentLesson.vocabulary[i]);

      // Create custom quiz with selected words
      console.log(`[vocab-list] Starting custom quiz: ${mode}, ${selectedVocab.length} words`);
      state.questions = utils.shuffle([...selectedVocab]);
      state.questionIndex = 0;
      state.score = 0;
      state.wrongItems = [];
      state.fcKnownCount = 0;

      // Map mode to screen
      if (mode === "fc") {
        state.currentMode = "flashcard";
        window.QuizApp.quiz.flashcard.renderFlashcard();
        nav.showScreen("flashcard");
      } else if (mode === "typing-kana") {
        state.currentMode = "typing-kana";
        window.QuizApp.quiz.typing.renderTyping();
        nav.showScreen("typing");
      } else if (mode === "typing-romaji") {
        state.currentMode = "typing-romaji";
        window.QuizApp.quiz.typing.renderTyping();
        nav.showScreen("typing");
      } else if (mode === "mc") {
        state.currentMode = "mc";
        window.QuizApp.quiz.mc.renderMultipleChoice();
        nav.showScreen("multipleChoice");
      }
    });
  });

  // Event delegation — one listener for all speak buttons
  if (hasAudio) {
    tbody.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-speak");
      if (btn) audio.speak(btn.dataset.speak);
    });
  }

  // Initialize
  updateSelectedCount();
  nav.showScreen("vocabList");
};
