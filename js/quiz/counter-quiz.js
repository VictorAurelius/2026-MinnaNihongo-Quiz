/**
 * quiz/counter-quiz.js — Quiz render functions for counter modes
 * Modes: counter-fc | counter-mc
 * Reuses #screen-flashcard, #screen-mc DOM elements.
 * Depends on: state, utils, ui, audio (runtime)
 * Calls at runtime: screens.showResults
 */
window.QuizApp = window.QuizApp || {};
window.QuizApp.quiz = window.QuizApp.quiz || {};

window.QuizApp.quiz.counter = (function () {
  "use strict";

  const $  = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ── Flashcard ───────────────────────────────────────────────
  function renderFlashcard() {
    const state = window.QuizApp.state;
    const ui    = window.QuizApp.ui;
    const audio = window.QuizApp.audio;
    const item  = state.questions[state.questionIndex];

    $("#flashcard").classList.remove("flipped");
    $("#fc-front-word").textContent   = item.japanese;             // e.g. 三本
    $("#fc-back-kana").textContent    = item.kana;                 // さんぼん
    $("#fc-back-romaji").textContent  = item.romaji;               // sanbon
    $("#fc-back-meaning").textContent = item.english || "";        // 3 (本)
    $("#fc-back-english").textContent = item._irregular ? "⚠️ Bất quy tắc" : "";
    $("#fc-back-example").textContent = item.example || "";

    ui.updateProgress("fc", state.questionIndex, state.questions.length);
    $("#fc-prev").disabled = state.questionIndex === 0;
    audio.speak(item.japanese);
  }

  // ── MC ──────────────────────────────────────────────────────
  function renderMC() {
    const state = window.QuizApp.state;
    const utils = window.QuizApp.utils;
    const ui    = window.QuizApp.ui;
    const item  = state.questions[state.questionIndex];

    $("#mc-question-label").textContent = "Cách đọc của form này là gì?";
    const qEl = $("#mc-question");
    qEl.textContent      = item.japanese;
    qEl.style.fontFamily = "var(--font-jp)";
    $("#mc-romaji").classList.add("hidden");

    const pool = state.questions.filter(v => v !== item);
    const distractors = utils.shuffle(pool).slice(0, 3);
    const options = utils.shuffle([item, ...distractors]);

    const optionsContainer = $("#mc-options");
    optionsContainer.innerHTML = "";

    options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "mc-option";
      // Show kana + romaji in option
      btn.innerHTML = `<span style="font-family:var(--font-jp)">${opt.kana}</span>` +
                      `<span class="mc-option-romaji">(${opt.romaji})</span>`;
      btn.dataset.correct = (opt === item) ? "true" : "false";
      btn.addEventListener("click", () => handleMCAnswer(btn, item));
      optionsContainer.appendChild(btn);
    });

    $("#mc-feedback").classList.add("hidden");
    $("#mc-feedback").classList.remove("correct", "wrong");
    $("#mc-next").classList.add("hidden");
    ui.updateProgress("mc", state.questionIndex, state.questions.length);
  }

  function handleMCAnswer(btn, correctItem) {
    const state = window.QuizApp.state;
    const ui    = window.QuizApp.ui;
    const allBtns = $$(".mc-option");
    allBtns.forEach(b => b.classList.add("disabled"));

    const isCorrect = btn.dataset.correct === "true";
    if (isCorrect) {
      btn.classList.add("correct");
      state.score++;
      ui.showFeedback("mc", true, "");
    } else {
      btn.classList.add("wrong");
      state.wrongItems.push(correctItem);
      allBtns.forEach(b => { if (b.dataset.correct === "true") b.classList.add("correct"); });
      ui.showFeedback("mc", false,
        `Đáp án: ${correctItem.japanese} → ${correctItem.kana} (${correctItem.romaji})`);
    }
    $("#mc-next").classList.remove("hidden");
  }

  return { renderFlashcard, renderMC, handleMCAnswer };
})();
