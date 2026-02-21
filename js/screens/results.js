/**
 * screens/results.js — Results screen + retry buttons
 * Depends on: state, storage (saveProgress), nav (showScreen, clearNavigationHistory)
 * Calls at runtime: quiz.startSession, screens.renderLessonGrid
 */
window.QuizApp = window.QuizApp || {};
window.QuizApp.screens = window.QuizApp.screens || {};

(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);

  function showResults() {
    const state   = window.QuizApp.state;
    const storage = window.QuizApp.storage;
    const nav     = window.QuizApp.nav;
    const total   = state.questions.length;
    const pct     = total > 0 ? Math.round((state.score / total) * 100) : 0;

    // Save progress only for lesson-based modes (alpha/counter have no lessonNumber)
    if (state.currentLesson) {
      const modeKey = state.currentMode === "flashcard" ? "flashcard" : state.currentMode;
      storage.saveProgress(state.currentLesson.lessonNumber, modeKey, state.score, total);
    }

    $("#score-ring-fill").style.strokeDasharray = `${pct}, 100`;
    $("#results-percent").textContent = `${pct}%`;

    const isFcMode = state.currentMode === "flashcard"
                  || state.currentMode === "alpha-fc"
                  || state.currentMode === "counter-fc"
                  || state.currentMode === "grammar-flashcard";
    const unit = state.currentMode.startsWith("alpha") ? "chữ"
               : state.currentMode.startsWith("counter") ? "câu"
               : "từ";

    if (isFcMode) {
      $("#results-detail").textContent = `Biết: ${state.score} / ${total} ${unit}`;
    } else {
      $("#results-detail").textContent = `Đúng: ${state.score} / ${total} câu`;
    }

    if (state.wrongItems.length > 0) {
      $("#btn-retry-wrong").classList.remove("hidden");
      $("#btn-retry-wrong").textContent = `Làm lại ${state.wrongItems.length} câu sai`;
    } else {
      $("#btn-retry-wrong").classList.add("hidden");
    }

    nav.showScreen("results");
  }

  $("#btn-retry-wrong").addEventListener("click", () => {
    const state = window.QuizApp.state;
    if (state.wrongItems.length === 0) return;
    state.isRetryMode = true;
    window.QuizApp.nav.clearNavigationHistory();
    window.QuizApp.quiz.startSession(state.wrongItems);
  });

  $("#btn-retry-all").addEventListener("click", () => {
    const state = window.QuizApp.state;
    state.isRetryMode = false;
    window.QuizApp.nav.clearNavigationHistory();
    // Use currentItems for alpha/counter; fall back to lesson vocabulary
    const items = state.currentItems.length > 0
      ? state.currentItems
      : (state.currentLesson ? state.currentLesson.vocabulary : []);
    window.QuizApp.quiz.startSession(items);
  });

  $("#btn-results-home").addEventListener("click", () => {
    window.QuizApp.screens.renderLessonGrid();
    window.QuizApp.nav.clearNavigationHistory();
    window.QuizApp.nav.showScreen("lessons", false);
    $("#header-title").textContent = "Minna no Nihongo 1";
  });

  window.QuizApp.screens.showResults = showResults;
})();
