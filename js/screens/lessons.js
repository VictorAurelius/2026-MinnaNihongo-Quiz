/**
 * screens/lessons.js — Lesson grid + lesson menu screen
 * Depends on: state, storage (getLessonBestPercent), nav (showScreen)
 * Calls at runtime: quiz.startSession, screens.openVocabList, screens.openGrammarList
 */
window.QuizApp = window.QuizApp || {};
window.QuizApp.screens = window.QuizApp.screens || {};

(function () {
  "use strict";

  const $  = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  function renderLessonGrid() {
    const storage = window.QuizApp.storage;
    const grid    = $("#lesson-grid");
    grid.innerHTML = "";

    const maxLesson = 25;
    for (let n = 1; n <= maxLesson; n++) {
      const lessonData = VOCABULARY_DATA.find((l) => l.lessonNumber === n);
      const card = document.createElement("div");
      card.className = "lesson-card";
      const bestPct = storage.getLessonBestPercent(n);

      if (lessonData) {
        card.innerHTML = `
          <span class="lesson-number">Bài ${n}</span>
          <span class="lesson-title">${lessonData.title}</span>
          <span class="lesson-meta">${lessonData.vocabulary.length} từ vựng</span>
          <div class="lesson-progress-bar"><div class="fill" style="width:${bestPct}%"></div></div>
        `;
        card.addEventListener("click", () => openLessonMenu(lessonData));
      } else {
        card.innerHTML = `
          <span class="lesson-number">Bài ${n}</span>
          <span class="lesson-title" style="color:var(--text-muted)">Sắp có...</span>
          <span class="lesson-meta">-</span>
          <div class="lesson-progress-bar"><div class="fill" style="width:0%"></div></div>
        `;
        card.style.opacity = "0.5";
        card.style.cursor = "default";
      }

      grid.appendChild(card);
    }
  }

  function openLessonMenu(lesson) {
    const state = window.QuizApp.state;
    const nav   = window.QuizApp.nav;
    state.currentLesson = lesson;
    $("#menu-lesson-title").textContent = `Bài ${lesson.lessonNumber}: ${lesson.title}`;
    $("#menu-vocab-count").textContent  = `${lesson.vocabulary.length} từ vựng`;
    $("#header-title").textContent      = `Bài ${lesson.lessonNumber}`;
    nav.showScreen("menu");
  }

  // Menu button clicks
  $$(".menu-actions .btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const state = window.QuizApp.state;
      const mode  = btn.dataset.mode;
      if (!mode || !state.currentLesson) return;

      if (mode === "vocab-list") {
        window.QuizApp.screens.openVocabList();
        return;
      }
      if (mode === "grammar-list") {
        window.QuizApp.screens.openGrammarList();
        return;
      }

      state.currentMode = mode;
      state.isRetryMode = false;
      state.wrongItems  = [];

      if (mode.startsWith("grammar-")) {
        window.QuizApp.quiz.startSession(state.currentLesson.grammar || []);
      } else {
        window.QuizApp.quiz.startSession(state.currentLesson.vocabulary);
      }
    });
  });

  window.QuizApp.screens.renderLessonGrid = renderLessonGrid;
  window.QuizApp.screens.openLessonMenu   = openLessonMenu;
})();
