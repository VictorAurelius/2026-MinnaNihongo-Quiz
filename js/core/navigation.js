/**
 * core/navigation.js — Screen switching + back-button stack
 * Depends on: state (window.QuizApp.state)
 * Note: goBack calls window.QuizApp.screens.renderLessonGrid() at runtime — OK
 *       because all scripts are loaded before any user interaction.
 */
window.QuizApp = window.QuizApp || {};

window.QuizApp.nav = (function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);

  const screens = {
    lessons:     $("#screen-lessons"),
    menu:        $("#screen-menu"),
    vocabList:   $("#screen-vocab-list"),
    grammarList: $("#screen-grammar-list"),
    flashcard:   $("#screen-flashcard"),
    mc:          $("#screen-mc"),
    typing:      $("#screen-typing"),
    results:     $("#screen-results"),
  };

  const state = window.QuizApp.state;

  function showScreen(name, addToHistory = true) {
    if (addToHistory) {
      const current = Object.keys(screens).find(k =>
        screens[k].classList.contains("active")
      );
      if (current && current !== name) {
        state.navigationHistory.push(current);
        if (state.navigationHistory.length > state.MAX_HISTORY) {
          state.navigationHistory.shift();
        }
      }
    }

    for (const s of Object.values(screens)) s.classList.remove("active");
    screens[name].classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });

    updateBackButton();
  }

  function goBack() {
    if (state.navigationHistory.length > 0) {
      const prev = state.navigationHistory.pop();
      showScreen(prev, false);
    } else {
      window.QuizApp.screens.renderLessonGrid();
      showScreen("lessons", false);
      $("#header-title").textContent = "Minna no Nihongo 1";
    }
  }

  function updateBackButton() {
    const btn = $("#btn-back");
    if (state.navigationHistory.length > 0) {
      btn.classList.remove("hidden");
    } else {
      btn.classList.add("hidden");
    }
  }

  function clearNavigationHistory() {
    state.navigationHistory = [];
    updateBackButton();
  }

  // ── Event listeners ──────────────────────────────────────────
  $("#btn-home").addEventListener("click", () => {
    window.QuizApp.screens.renderLessonGrid();
    clearNavigationHistory();
    showScreen("lessons", false);
    $("#header-title").textContent = "Minna no Nihongo 1";
  });

  $("#btn-back").addEventListener("click", () => {
    goBack();
  });

  return { screens, showScreen, goBack, updateBackButton, clearNavigationHistory };
})();
