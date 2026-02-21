/**
 * core/state.js — Shared mutable app state
 * All other modules read/write via window.QuizApp.state
 */
window.QuizApp = window.QuizApp || {};

window.QuizApp.state = {
  currentLesson:     null,   // lesson data object
  currentMode:       null,   // "flashcard" | "mc-jp-vi" | "mc-vi-jp" | "typing" | ...
  questions:         [],     // shuffled vocabulary for current quiz
  questionIndex:     0,
  score:             0,
  wrongItems:        [],     // items answered incorrectly
  currentItems:      [],     // full unshuffled item set for current session (retry-all)
  isRetryMode:       false,
  fcKnownCount:      0,      // flashcard "known" counter
  navigationHistory: [],     // stack for back-button support
};

window.QuizApp.state.MAX_HISTORY = 20;
