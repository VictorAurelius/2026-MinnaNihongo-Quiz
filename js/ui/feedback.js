/**
 * ui/feedback.js — In-quiz feedback helpers
 * showFeedback: shows correct/wrong banner
 * updateProgress: updates progress bar + counter text
 */
window.QuizApp = window.QuizApp || {};

window.QuizApp.ui = (function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);

  function showFeedback(prefix, isCorrect, detail) {
    const el = $(`#${prefix}-feedback`);
    const textEl = $(`#${prefix}-feedback-text`);
    el.classList.remove("hidden", "correct", "wrong");
    el.classList.add(isCorrect ? "correct" : "wrong");
    textEl.textContent = isCorrect ? "Chính xác!" : detail;
  }

  function updateProgress(prefix, idx, total) {
    $(`#${prefix}-progress-text`).textContent = `${idx + 1} / ${total}`;
    $(`#${prefix}-progress-fill`).style.width = `${((idx + 1) / total) * 100}%`;
  }

  return { showFeedback, updateProgress };
})();
