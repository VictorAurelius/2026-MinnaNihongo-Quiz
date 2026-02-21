/**
 * app.js — Entry point (slim)
 *
 * All logic lives in:
 *   js/core/   — state, storage, navigation, utils
 *   js/ui/     — darkmode, feedback
 *   js/screens/ — lessons, vocab-list, grammar-list, results
 *   js/quiz/   — flashcard, mc, typing, session
 */
(function () {
  "use strict";

  const $  = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ── Keyboard shortcuts ──────────────────────────────────────
  document.addEventListener("keydown", (e) => {
    const nav = window.QuizApp.nav;

    // MC: press 1-4 to select option
    if (nav.screens.mc.classList.contains("active") &&
        !$("#mc-next").classList.contains("hidden") === false) {
      const num = parseInt(e.key);
      if (num >= 1 && num <= 4) {
        const btns = $$(".mc-option");
        if (btns[num - 1] && !btns[num - 1].classList.contains("disabled")) {
          btns[num - 1].click();
        }
      }
    }

    // Flashcard: arrow keys
    if (nav.screens.flashcard.classList.contains("active")) {
      if (e.key === "ArrowLeft")  $("#fc-prev").click();
      if (e.key === "ArrowRight") $("#fc-next").click();
    }
  });

  // ── Init ────────────────────────────────────────────────────
  window.QuizApp.darkmode.initDarkMode();
  window.QuizApp.audio.init();
  window.QuizApp.screens.renderLessonGrid();
})();
