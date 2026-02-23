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

    // Save progress — HSK groups use separate storage key
    if (state.currentLesson) {
      if (state.currentLesson.hskGroup) {
        storage.saveHSKProgress(state.currentLesson.hskGroup, state.currentMode, state.score, total);
      } else if (state.currentLesson.lessonNumber) {
        const modeKey = state.currentMode === "flashcard" ? "flashcard" : state.currentMode;
        storage.saveProgress(state.currentLesson.lessonNumber, modeKey, state.score, total);
      }
    }

    $("#score-ring-fill").style.strokeDasharray = `${pct}, 100`;
    $("#results-percent").textContent = `${pct}%`;

    const isFcMode = state.currentMode === "flashcard"
                  || state.currentMode === "alpha-fc"
                  || state.currentMode === "counter-fc"
                  || state.currentMode === "grammar-flashcard"
                  || state.currentMode === "hsk-fc";
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

    // Show "Back to vocab list" button if quiz was started from vocab list
    if (state.previousScreen === "vocabList") {
      $("#btn-back-to-vocab").classList.remove("hidden");
    } else {
      $("#btn-back-to-vocab").classList.add("hidden");
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
    $("#header-title").textContent =
      window.QuizApp.screens.getCourseHeaderTitle(window.QuizApp.screens.getActiveCourse());
  });

  $("#btn-back-to-vocab").addEventListener("click", () => {
    const state = window.QuizApp.state;
    state.previousScreen = null; // Clear it
    window.QuizApp.screens.openVocabList();
  });

  window.QuizApp.screens.showResults = showResults;
})();
