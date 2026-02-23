/**
 * quiz/typing.js — Typing quiz mode (kana + romaji)
 * Depends on: state, utils (kanaToRomaji, normalizeKana, normalizeRomaji), ui
 * Calls at runtime: screens.showResults
 */
window.QuizApp = window.QuizApp || {};
window.QuizApp.quiz = window.QuizApp.quiz || {};

window.QuizApp.quiz.typing = (function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);

  function renderTyping() {
    const state = window.QuizApp.state;
    const utils = window.QuizApp.utils;
    const item  = state.questions[state.questionIndex];
    const isRomajiMode = state.currentMode === "typing-romaji";

    $("#tp-question").textContent = item.vietnamese;

    const labelEl = $("#screen-typing .question-label");
    labelEl.textContent = isRomajiMode
      ? "Nhập từ tiếng Nhật (romaji):"
      : "Nhập từ tiếng Nhật (kana):";

    const input = $("#tp-input");
    input.value = "";
    input.className = "typing-input";
    input.disabled = false;
    input.placeholder = isRomajiMode ? "Nhập romaji..." : "Nhập kana...";
    input.focus();

    if (isRomajiMode) {
      $("#tp-romaji-hint-wrapper").classList.add("hidden");
      // Hide virtual keyboard for romaji mode
      if (window.QuizApp.ui.virtualKeyboard) {
        window.QuizApp.ui.virtualKeyboard.hide();
        window.QuizApp.ui.virtualKeyboard.hideToggleButton();
      }
    } else {
      $("#tp-romaji-hint-wrapper").classList.remove("hidden");
      $("#tp-romaji").textContent = utils.kanaToRomaji(item.kana);
      $("#tp-romaji").classList.add("hidden");
      $("#tp-show-romaji").classList.remove("hidden");
      $("#tp-show-romaji").textContent = "Hiện romaji";
      // Show toggle button and init virtual keyboard for kana mode
      if (window.QuizApp.ui.virtualKeyboard) {
        window.QuizApp.ui.virtualKeyboard.init(input);
        window.QuizApp.ui.virtualKeyboard.showToggleButton();
        // Auto-hide keyboard by default, user can toggle
        window.QuizApp.ui.virtualKeyboard.hide();
      }
    }

    $("#tp-feedback").classList.add("hidden");
    $("#tp-feedback").classList.remove("correct", "wrong");
    $("#tp-next").classList.add("hidden");
    $("#tp-submit").classList.remove("hidden");
    $("#tp-submit").disabled = false;

    window.QuizApp.ui.updateProgress("tp", state.questionIndex, state.questions.length);
  }

  function handleTypingSubmit() {
    const state = window.QuizApp.state;
    const utils = window.QuizApp.utils;
    const ui    = window.QuizApp.ui;
    const audio = window.QuizApp.audio;
    const item  = state.questions[state.questionIndex];
    const input = $("#tp-input");
    const isRomajiMode = state.currentMode === "typing-romaji";

    let userAnswer, correctAnswer;
    if (isRomajiMode) {
      userAnswer    = utils.normalizeRomaji(input.value);
      correctAnswer = utils.normalizeRomaji(utils.kanaToRomaji(item.kana));
    } else {
      userAnswer    = utils.normalizeKana(input.value);
      correctAnswer = utils.normalizeKana(item.kana);
    }

    input.disabled = true;
    $("#tp-submit").disabled = true;
    $("#tp-show-romaji").classList.add("hidden");

    if (userAnswer === correctAnswer) {
      state.score++;
      input.classList.add("correct");
      ui.showFeedback("tp", true, "");
    } else {
      state.wrongItems.push(item);
      input.classList.add("wrong");
      if (isRomajiMode) {
        const r = utils.kanaToRomaji(item.kana);
        ui.showFeedback("tp", false, `Đáp án: ${r} — ${item.kana} — ${item.japanese}`);
      } else {
        const r = utils.kanaToRomaji(item.kana);
        ui.showFeedback("tp", false, `Đáp án: ${item.kana} (${r}) — ${item.japanese}`);
      }
    }

    // Auto-play pronunciation after submit
    audio.speak(item.japanese);

    $("#tp-next").classList.remove("hidden");
    $("#tp-submit").classList.add("hidden");
  }

  $("#tp-show-romaji").addEventListener("click", () => {
    const romajiEl = $("#tp-romaji");
    const btnEl    = $("#tp-show-romaji");
    if (romajiEl.classList.contains("hidden")) {
      romajiEl.classList.remove("hidden");
      btnEl.textContent = "Ẩn romaji";
    } else {
      romajiEl.classList.add("hidden");
      btnEl.textContent = "Hiện romaji";
    }
  });

  function _dispatch(submitFn, renderFn) {
    const mode = window.QuizApp.state.currentMode;
    if (mode === "alpha-typing") {
      return { submit: window.QuizApp.quiz.alpha.handleTypingSubmit,
               render: window.QuizApp.quiz.alpha.renderTyping };
    }
    return { submit: submitFn, render: renderFn };
  }

  $("#tp-submit").addEventListener("click", () =>
    _dispatch(handleTypingSubmit, renderTyping).submit());

  $("#tp-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !$("#tp-submit").disabled) {
      console.log("[typing.js] Enter pressed on input → submitting");
      e.stopPropagation(); // Prevent document listener from firing
      _dispatch(handleTypingSubmit, renderTyping).submit();
    }
  });

  // Global Enter key handler for typing screen (works even when input is disabled)
  document.addEventListener("keydown", (e) => {
    const screen = $("#screen-typing");
    if (!screen || screen.classList.contains("hidden")) return;
    if (e.key === "Enter") {
      const nextBtn = $("#tp-next");
      const submitBtn = $("#tp-submit");
      console.log("[typing.js] Enter pressed on document", {
        nextHidden: nextBtn.classList.contains("hidden"),
        submitHidden: submitBtn.classList.contains("hidden"),
        inputDisabled: $("#tp-input").disabled
      });
      // Only advance if Next button is visible AND Submit button is hidden
      if (!nextBtn.classList.contains("hidden") && submitBtn.classList.contains("hidden")) {
        console.log("[typing.js] Clicking next button");
        e.preventDefault();
        nextBtn.click();
      }
    }
  });

  $("#tp-next").addEventListener("click", () => {
    const state = window.QuizApp.state;
    state.questionIndex++;
    if (state.questionIndex >= state.questions.length) {
      window.QuizApp.screens.showResults();
    } else {
      _dispatch(handleTypingSubmit, renderTyping).render();
    }
  });

  return { renderTyping, handleTypingSubmit };
})();
