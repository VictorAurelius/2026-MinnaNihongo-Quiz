/**
 * quiz/flashcard.js — Flashcard quiz mode
 * Depends on: state, utils (kanaToRomaji), ui (showFeedback, updateProgress), audio (speak)
 * Calls at runtime: screens.showResults
 */
window.QuizApp = window.QuizApp || {};
window.QuizApp.quiz = window.QuizApp.quiz || {};

window.QuizApp.quiz.flashcard = (function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const flashcardEl = $("#flashcard");
  const speakBtn    = $("#fc-speak");

  // Show speak button only when audio is supported
  if (window.QuizApp.audio.isSupported() && speakBtn) {
    speakBtn.classList.remove("hidden");
    speakBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent card flip
      const state = window.QuizApp.state;
      const item  = state.questions[state.questionIndex];
      if (!item) return;
      const mode = state.currentMode;
      if (mode === "hsk-fc") {
        window.QuizApp.audio.speak(item.chinese, "zh-CN");
      } else if (mode === "grammar-flashcard") {
        window.QuizApp.audio.speak(item.pattern);
      } else {
        window.QuizApp.audio.speak(item.japanese);
      }
    });
  }

  flashcardEl.addEventListener("click", () => {
    flashcardEl.classList.toggle("flipped");
  });
  flashcardEl.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      flashcardEl.classList.toggle("flipped");
    }
  });

  function renderFlashcard() {
    const state = window.QuizApp.state;
    const utils = window.QuizApp.utils;
    const ui    = window.QuizApp.ui;
    const item  = state.questions[state.questionIndex];
    const isGrammarMode = state.currentMode === "grammar-flashcard";

    flashcardEl.classList.remove("flipped");

    if (isGrammarMode) {
      $("#fc-front-word").textContent = item.pattern;
      $("#fc-back-kana").textContent  = item.vietnamese;
      $("#fc-back-romaji").textContent = item.english || "";
      $("#fc-back-meaning").textContent = item.explanation;
      if (item.examples && item.examples.length > 0) {
        const ex = item.examples[0];
        $("#fc-back-example").textContent = `${ex.japanese}\n${ex.vietnamese}`;
      } else {
        $("#fc-back-example").textContent = "";
      }
      $("#fc-back-english").textContent = "";
    } else {
      $("#fc-front-word").textContent  = item.japanese;
      $("#fc-back-kana").textContent   = item.kana;
      $("#fc-back-romaji").textContent = utils.kanaToRomaji(item.kana);
      $("#fc-back-meaning").textContent = item.vietnamese;
      $("#fc-back-english").textContent = item.english || "";
      $("#fc-back-example").textContent = item.example || "";
    }

    ui.updateProgress("fc", state.questionIndex, state.questions.length);
    $("#fc-prev").disabled = state.questionIndex === 0;

    // Auto-play pronunciation
    const speakText = isGrammarMode ? item.pattern : item.japanese;
    window.QuizApp.audio.speak(speakText);
  }

  function renderHSKFlashcard() {
    const state = window.QuizApp.state;
    const ui    = window.QuizApp.ui;
    const item  = state.questions[state.questionIndex];

    flashcardEl.classList.remove("flipped");

    $("#fc-front-word").textContent  = item.chinese;
    $("#fc-back-kana").textContent   = item.pinyin;
    $("#fc-back-romaji").textContent = "";
    $("#fc-back-meaning").textContent = item.vietnamese;
    $("#fc-back-english").textContent = "";
    $("#fc-back-example").textContent = "";

    ui.updateProgress("fc", state.questionIndex, state.questions.length);
    $("#fc-prev").disabled = state.questionIndex === 0;

    window.QuizApp.audio.speak(item.chinese, "zh-CN");
  }

  function _currentRender() {
    const mode = window.QuizApp.state.currentMode;
    if (mode === "alpha-fc")   return window.QuizApp.quiz.alpha.renderFlashcard;
    if (mode === "counter-fc") return window.QuizApp.quiz.counter.renderFlashcard;
    if (mode === "hsk-fc")     return renderHSKFlashcard;
    return renderFlashcard;
  }

  function advanceFlashcard() {
    const state = window.QuizApp.state;
    state.questionIndex++;
    if (state.questionIndex >= state.questions.length) {
      state.score = state.fcKnownCount;
      window.QuizApp.screens.showResults();
    } else {
      _currentRender()();
    }
  }

  $("#fc-prev").addEventListener("click", () => {
    const state = window.QuizApp.state;
    if (state.questionIndex > 0) {
      state.questionIndex--;
      _currentRender()();
    }
  });

  $("#fc-next").addEventListener("click", () => advanceFlashcard());

  $("#fc-know").addEventListener("click", () => {
    window.QuizApp.state.fcKnownCount++;
    advanceFlashcard();
  });

  $("#fc-dont-know").addEventListener("click", () => {
    const state = window.QuizApp.state;
    state.wrongItems.push(state.questions[state.questionIndex]);
    advanceFlashcard();
  });

  return { renderFlashcard, advanceFlashcard };
})();
