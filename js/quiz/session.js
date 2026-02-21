/**
 * quiz/session.js — Quiz session initializer (startSession)
 * Depends on: state, utils (shuffle), nav (showScreen)
 *             quiz.flashcard, quiz.mc, quiz.typing (runtime)
 */
window.QuizApp = window.QuizApp || {};
window.QuizApp.quiz = window.QuizApp.quiz || {};

window.QuizApp.quiz.startSession = function (vocabSubset) {
  "use strict";

  const state = window.QuizApp.state;
  const utils = window.QuizApp.utils;
  const nav   = window.QuizApp.nav;

  state.questions     = utils.shuffle(vocabSubset);
  state.questionIndex = 0;
  state.score         = 0;
  state.wrongItems    = [];

  if (state.currentMode === "flashcard" || state.currentMode === "grammar-flashcard") {
    state.fcKnownCount = 0;
    nav.showScreen("flashcard");
    window.QuizApp.quiz.flashcard.renderFlashcard();
  } else if (state.currentMode.startsWith("mc") || state.currentMode.startsWith("grammar-mc")) {
    nav.showScreen("mc");
    window.QuizApp.quiz.mc.renderMC();
  } else if (state.currentMode === "typing" || state.currentMode === "typing-romaji") {
    nav.showScreen("typing");
    window.QuizApp.quiz.typing.renderTyping();
  }
};
