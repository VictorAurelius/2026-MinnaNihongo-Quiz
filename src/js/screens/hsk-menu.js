/**
 * screens/hsk-menu.js — HSK group menu screen
 * Depends on: state, nav (showScreen), quiz.startSession
 * Pattern mirrors openLessonMenu in lessons.js
 */
window.QuizApp = window.QuizApp || {};
window.QuizApp.screens = window.QuizApp.screens || {};

(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);

  function openHSKGroupMenu(group) {
    const state = window.QuizApp.state;
    const nav   = window.QuizApp.nav;

    // Reuse currentLesson slot — hskGroup flag distinguishes it from Minna lessons
    state.currentLesson = {
      hskGroup:   group.id,
      title:      group.title,
      vocabulary: group.words,  // { chinese, pinyin, vietnamese }
      grammar:    [],
    };

    $("#hsk-menu-group-title").textContent =
      "HSK 5 \u2014 Nh\xF3m " + group.title;
    $("#hsk-menu-word-count").textContent =
      group.words.length + " t\u1EEB v\u1EF1ng";
    $("#header-title").textContent = "HSK 5";

    nav.showScreen("hskMenu");
  }

  // HSK menu button clicks
  document.querySelectorAll(".hsk-menu-actions .btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const state = window.QuizApp.state;
      const mode  = btn.dataset.mode;
      if (!mode || !state.currentLesson) return;

      if (mode === "hsk-vocab-list") {
        window.QuizApp.screens.openHSKVocabList();
        return;
      }

      state.currentMode = mode;
      state.isRetryMode = false;
      state.wrongItems  = [];
      window.QuizApp.quiz.startSession(state.currentLesson.vocabulary);
    });
  });

  window.QuizApp.screens.openHSKGroupMenu = openHSKGroupMenu;
})();
