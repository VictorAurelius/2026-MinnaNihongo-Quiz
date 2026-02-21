/**
 * quiz/mc.js — Multiple choice quiz mode
 * Depends on: state, utils (kanaToRomaji, shuffle), ui (showFeedback, updateProgress)
 * Calls at runtime: screens.showResults
 */
window.QuizApp = window.QuizApp || {};
window.QuizApp.quiz = window.QuizApp.quiz || {};

window.QuizApp.quiz.mc = (function () {
  "use strict";

  const $  = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  function renderMC() {
    const state = window.QuizApp.state;
    const utils = window.QuizApp.utils;
    const ui    = window.QuizApp.ui;
    const item  = state.questions[state.questionIndex];
    const isGrammarMode = state.currentMode.startsWith("grammar-mc");
    const isJpToVi = state.currentMode === "mc-jp-vi" || state.currentMode === "grammar-mc-jp-vi";

    if (isJpToVi) {
      $("#mc-question-label").textContent =
        isGrammarMode ? "Mẫu ngữ pháp này nghĩa là gì?" : "Từ này nghĩa là gì?";
      $("#mc-question").textContent =
        isGrammarMode ? item.pattern : item.japanese;
      $("#mc-question").style.fontFamily = "var(--font-jp)";
      if (!isGrammarMode) {
        $("#mc-romaji").textContent = `(${utils.kanaToRomaji(item.kana)})`;
        $("#mc-romaji").classList.remove("hidden");
      } else {
        $("#mc-romaji").classList.add("hidden");
      }
    } else {
      $("#mc-question-label").textContent =
        isGrammarMode ? "Mẫu ngữ pháp nào đúng?" : "Từ nào đúng?";
      $("#mc-question").textContent = item.vietnamese;
      $("#mc-question").style.fontFamily = "inherit";
      $("#mc-romaji").classList.add("hidden");
    }

    const contentArray = isGrammarMode
      ? state.currentLesson.grammar
      : state.currentLesson.vocabulary;
    const pool = contentArray.filter((v) => v !== item);
    const options = utils.shuffle([item, ...utils.shuffle(pool).slice(0, 3)]);

    const optionsContainer = $("#mc-options");
    optionsContainer.innerHTML = "";

    options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "mc-option";

      if (isGrammarMode) {
        btn.textContent = isJpToVi ? opt.vietnamese : opt.pattern;
      } else if (isJpToVi) {
        btn.textContent = opt.vietnamese;
      } else {
        const japaneseSpan = document.createElement("span");
        japaneseSpan.className = "mc-option-main";
        japaneseSpan.textContent = opt.japanese;
        const romajiSpan = document.createElement("span");
        romajiSpan.className = "mc-option-romaji";
        romajiSpan.textContent = `(${utils.kanaToRomaji(opt.kana)})`;
        btn.appendChild(japaneseSpan);
        btn.appendChild(romajiSpan);
      }

      btn.dataset.correct = (opt === item) ? "true" : "false";
      btn.addEventListener("click", () => handleMCAnswer(btn, item, isJpToVi, isGrammarMode));
      optionsContainer.appendChild(btn);
    });

    $("#mc-feedback").classList.add("hidden");
    $("#mc-feedback").classList.remove("correct", "wrong");
    $("#mc-next").classList.add("hidden");
    ui.updateProgress("mc", state.questionIndex, state.questions.length);
  }

  function handleMCAnswer(btn, correctItem, isJpToVi, isGrammarMode = false) {
    const state = window.QuizApp.state;
    const utils = window.QuizApp.utils;
    const ui    = window.QuizApp.ui;
    const allBtns = $$(".mc-option");
    allBtns.forEach((b) => b.classList.add("disabled"));

    const isCorrect = btn.dataset.correct === "true";

    if (isCorrect) {
      btn.classList.add("correct");
      state.score++;
      ui.showFeedback("mc", true, "");
    } else {
      btn.classList.add("wrong");
      state.wrongItems.push(correctItem);
      allBtns.forEach((b) => {
        if (b.dataset.correct === "true") b.classList.add("correct");
      });
      let correctText;
      if (isGrammarMode) {
        correctText = isJpToVi
          ? `${correctItem.pattern} = ${correctItem.vietnamese}`
          : `${correctItem.vietnamese} = ${correctItem.pattern}`;
      } else {
        const r = utils.kanaToRomaji(correctItem.kana);
        correctText = isJpToVi
          ? `${correctItem.japanese} (${r}) = ${correctItem.vietnamese}`
          : `${correctItem.vietnamese} = ${correctItem.japanese} (${r})`;
      }
      ui.showFeedback("mc", false, `Đáp án: ${correctText}`);
    }

    $("#mc-next").classList.remove("hidden");
  }

  $("#mc-next").addEventListener("click", () => {
    const state = window.QuizApp.state;
    state.questionIndex++;
    if (state.questionIndex >= state.questions.length) {
      window.QuizApp.screens.showResults();
    } else {
      const mode = state.currentMode;
      if (mode.startsWith("alpha-mc"))   window.QuizApp.quiz.alpha.renderMC();
      else if (mode.startsWith("counter-mc")) window.QuizApp.quiz.counter.renderMC();
      else renderMC();
    }
  });

  return { renderMC, handleMCAnswer };
})();
