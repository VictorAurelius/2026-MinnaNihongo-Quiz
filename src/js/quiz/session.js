/**
 * quiz/session.js — Quiz session initializer (startSession)
 * Depends on: state, utils (shuffle), nav (showScreen)
 *             quiz.flashcard, quiz.mc, quiz.typing (runtime)
 *             quiz.alpha, quiz.counter (runtime)
 */
window.QuizApp = window.QuizApp || {};
window.QuizApp.quiz = window.QuizApp.quiz || {};

window.QuizApp.quiz.startSession = function (vocabSubset) {
  "use strict";

  const state = window.QuizApp.state;
  const utils = window.QuizApp.utils;
  const nav   = window.QuizApp.nav;

  state.currentItems  = vocabSubset;          // keep unshuffled for retry-all
  state.questions     = utils.shuffle(vocabSubset);
  state.questionIndex = 0;
  state.score         = 0;
  state.wrongItems    = [];

  const mode = state.currentMode;

  if (mode === "flashcard" || mode === "grammar-flashcard") {
    state.fcKnownCount = 0;
    nav.showScreen("flashcard");
    window.QuizApp.quiz.flashcard.renderFlashcard();

  } else if (mode.startsWith("mc") || mode.startsWith("grammar-mc")) {
    nav.showScreen("mc");
    window.QuizApp.quiz.mc.renderMC();

  } else if (mode === "typing" || mode === "typing-romaji") {
    nav.showScreen("typing");
    window.QuizApp.quiz.typing.renderTyping();

  } else if (mode === "alpha-fc") {
    state.fcKnownCount = 0;
    nav.showScreen("flashcard");
    window.QuizApp.quiz.alpha.renderFlashcard();

  } else if (mode === "alpha-mc-kr" || mode === "alpha-mc-rk") {
    nav.showScreen("mc");
    window.QuizApp.quiz.alpha.renderMC();

  } else if (mode === "alpha-typing") {
    nav.showScreen("typing");
    window.QuizApp.quiz.alpha.renderTyping();

  } else if (mode === "counter-fc") {
    state.fcKnownCount = 0;
    nav.showScreen("flashcard");
    window.QuizApp.quiz.counter.renderFlashcard();

  } else if (mode === "counter-mc") {
    nav.showScreen("mc");
    window.QuizApp.quiz.counter.renderMC();

  } else if (mode === "hsk-fc") {
    state.fcKnownCount = 0;
    nav.showScreen("flashcard");
    window.QuizApp.quiz.flashcard.renderFlashcard(); // _currentRender() dispatches to renderHSKFlashcard

  } else if (mode === "hsk-mc-cn-vi" || mode === "hsk-mc-vi-cn") {
    nav.showScreen("mc");
    window.QuizApp.quiz.mc.renderMC();
  }
};
