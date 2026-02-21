/**
 * quiz/alpha-quiz.js — Quiz render functions for alphabet modes
 * Modes: alpha-fc | alpha-mc-kr | alpha-mc-rk | alpha-typing
 * Reuses #screen-flashcard, #screen-mc, #screen-typing DOM elements.
 * Depends on: state, utils, ui, audio, nav (runtime)
 * Calls at runtime: screens.showResults
 */
window.QuizApp = window.QuizApp || {};
window.QuizApp.quiz = window.QuizApp.quiz || {};

window.QuizApp.quiz.alpha = (function () {
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
    $("#fc-front-word").textContent   = item.japanese;   // the kana char
    $("#fc-back-kana").textContent    = "";              // hidden (same as front)
    $("#fc-back-romaji").textContent  = item.romaji;     // THE answer
    $("#fc-back-meaning").textContent = item.romaji;     // repeat for prominence
    $("#fc-back-english").textContent = item.english || "";
    $("#fc-back-example").textContent = "";

    ui.updateProgress("fc", state.questionIndex, state.questions.length);
    $("#fc-prev").disabled = state.questionIndex === 0;
    audio.speak(item.japanese);
  }

  function advanceFlashcard() {
    const state = window.QuizApp.state;
    state.questionIndex++;
    if (state.questionIndex >= state.questions.length) {
      state.score = state.fcKnownCount;
      window.QuizApp.screens.showResults();
    } else {
      renderFlashcard();
    }
  }

  // fc-know / fc-dont-know listeners are shared with the main flashcard module.
  // We override via renderFlashcard being called from session.js routing.
  // The btn listeners in flashcard.js already call advanceFlashcard() but from
  // window.QuizApp.quiz.flashcard — we need them to call OUR advanceFlashcard.
  // Solution: patch the advance fn when alpha mode is active (see below).

  // ── MC ──────────────────────────────────────────────────────
  function renderMC() {
    const state = window.QuizApp.state;
    const utils = window.QuizApp.utils;
    const ui    = window.QuizApp.ui;
    const item  = state.questions[state.questionIndex];
    const isKR  = state.currentMode === "alpha-mc-kr"; // kana → romaji

    $("#mc-question-label").textContent = isKR
      ? "Romaji của kana này là gì?"
      : "Kana nào tương ứng với romaji này?";

    const qEl = $("#mc-question");
    qEl.textContent   = isKR ? item.japanese : item.romaji;
    qEl.style.fontFamily = isKR ? "var(--font-jp)" : "inherit";
    $("#mc-romaji").classList.add("hidden"); // never show hint — it IS the answer

    // Build 4 options from full question pool
    const pool = state.questions.filter(v => v !== item);
    const distractors = utils.shuffle(pool).slice(0, 3);
    const options = utils.shuffle([item, ...distractors]);

    const optionsContainer = $("#mc-options");
    optionsContainer.innerHTML = "";

    options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "mc-option";
      btn.textContent = isKR ? opt.romaji : opt.japanese;
      btn.style.fontFamily = isKR ? "inherit" : "var(--font-jp)";
      btn.dataset.correct = (opt === item) ? "true" : "false";
      btn.addEventListener("click", () => handleMCAnswer(btn, item, isKR));
      optionsContainer.appendChild(btn);
    });

    $("#mc-feedback").classList.add("hidden");
    $("#mc-feedback").classList.remove("correct", "wrong");
    $("#mc-next").classList.add("hidden");
    ui.updateProgress("mc", state.questionIndex, state.questions.length);
  }

  function handleMCAnswer(btn, correctItem, isKR) {
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
        `Đáp án: ${correctItem.japanese} → ${correctItem.romaji}`);
    }
    $("#mc-next").classList.remove("hidden");
  }

  // ── Typing ──────────────────────────────────────────────────
  function renderTyping() {
    const state = window.QuizApp.state;
    const ui    = window.QuizApp.ui;
    const audio = window.QuizApp.audio;
    const item  = state.questions[state.questionIndex];

    $("#tp-question").textContent = item.japanese;   // show the kana
    $("#screen-typing .question-label").textContent = "Nhập romaji:";

    const input = $("#tp-input");
    input.value       = "";
    input.className   = "typing-input";
    input.disabled    = false;
    input.placeholder = "Nhập romaji...";
    input.focus();

    $("#tp-romaji-hint-wrapper").classList.add("hidden");
    $("#tp-feedback").classList.add("hidden");
    $("#tp-feedback").classList.remove("correct", "wrong");
    $("#tp-next").classList.add("hidden");
    $("#tp-submit").classList.remove("hidden");
    $("#tp-submit").disabled = false;

    ui.updateProgress("tp", state.questionIndex, state.questions.length);
    audio.speak(item.japanese);
  }

  function handleTypingSubmit() {
    const state = window.QuizApp.state;
    const utils = window.QuizApp.utils;
    const ui    = window.QuizApp.ui;
    const item  = state.questions[state.questionIndex];
    const input = $("#tp-input");

    const userAnswer    = utils.normalizeRomaji(input.value);
    const correctAnswer = utils.normalizeRomaji(item.romaji);

    input.disabled = true;
    $("#tp-submit").disabled = true;

    if (userAnswer === correctAnswer) {
      state.score++;
      input.classList.add("correct");
      ui.showFeedback("tp", true, "");
    } else {
      state.wrongItems.push(item);
      input.classList.add("wrong");
      ui.showFeedback("tp", false, `Đáp án: ${item.romaji}`);
    }

    $("#tp-next").classList.remove("hidden");
    $("#tp-submit").classList.add("hidden");
  }

  // ── mc-next and tp-next advance logic ───────────────────────
  // These listeners are registered in mc.js and typing.js but call
  // showResults / renderMC / renderTyping from those modules.
  // We need them to call OUR render functions when in alpha mode.
  // Handled via session.js routing — session picks the right renderFn,
  // and mc-next / tp-next check currentMode to dispatch correctly.

  return {
    renderFlashcard,
    advanceFlashcard,
    renderMC,
    handleMCAnswer,
    renderTyping,
    handleTypingSubmit,
  };
})();
