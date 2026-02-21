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
    const mode  = state.currentMode;
    const isHSK       = mode.startsWith("hsk-mc");
    const isHSKCnToVi = mode === "hsk-mc-cn-vi";
    const isGrammarMode = mode.startsWith("grammar-mc");
    const isJpToVi = mode === "mc-jp-vi" || mode === "grammar-mc-jp-vi";

    if (isHSK) {
      $("#mc-question-label").textContent = isHSKCnToVi
        ? "T\u1EEB n\xE0y ngh\u0129a l\xE0 g\xEC?"
        : "Ch\u1EEF H\xE1n n\xE0o \u0111\xFAng?";
      $("#mc-question").textContent = isHSKCnToVi ? item.chinese : item.vietnamese;
      $("#mc-question").style.fontFamily = isHSKCnToVi ? "var(--font-cn, var(--font-jp))" : "inherit";
      $("#mc-romaji").classList.add("hidden");
    } else if (isJpToVi) {
      $("#mc-question-label").textContent =
        isGrammarMode ? "M\u1EABu ng\u1EEF ph\xE1p n\xE0y ngh\u0129a l\xE0 g\xEC?" : "T\u1EEB n\xE0y ngh\u0129a l\xE0 g\xEC?";
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
        isGrammarMode ? "M\u1EABu ng\u1EEF ph\xE1p n\xE0o \u0111\xFAng?" : "T\u1EEB n\xE0o \u0111\xFAng?";
      $("#mc-question").textContent = item.vietnamese;
      $("#mc-question").style.fontFamily = "inherit";
      $("#mc-romaji").classList.add("hidden");
    }

    const pool = state.currentLesson.vocabulary.filter((v) => v !== item);
    const contentArray = !isHSK && isGrammarMode
      ? state.currentLesson.grammar.filter((v) => v !== item)
      : pool;
    const options = utils.shuffle([item, ...utils.shuffle(contentArray).slice(0, 3)]);

    const optionsContainer = $("#mc-options");
    optionsContainer.innerHTML = "";

    options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "mc-option";

      if (isHSK) {
        if (isHSKCnToVi) {
          btn.textContent = opt.vietnamese;
        } else {
          const cnSpan = document.createElement("span");
          cnSpan.className = "mc-option-main";
          cnSpan.style.fontFamily = "var(--font-cn, var(--font-jp))";
          cnSpan.textContent = opt.chinese;
          const pySpan = document.createElement("span");
          pySpan.className = "mc-option-romaji";
          pySpan.textContent = `(${opt.pinyin})`;
          btn.appendChild(cnSpan);
          btn.appendChild(pySpan);
        }
      } else if (isGrammarMode) {
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
      btn.addEventListener("click", () => handleMCAnswer(btn, item, isJpToVi, isGrammarMode, isHSK, isHSKCnToVi));
      optionsContainer.appendChild(btn);
    });

    $("#mc-feedback").classList.add("hidden");
    $("#mc-feedback").classList.remove("correct", "wrong");
    $("#mc-next").classList.add("hidden");
    ui.updateProgress("mc", state.questionIndex, state.questions.length);
  }

  function handleMCAnswer(btn, correctItem, isJpToVi, isGrammarMode = false, isHSK = false, isHSKCnToVi = false) {
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
      if (isHSK) {
        correctText = isHSKCnToVi
          ? `${correctItem.chinese} (${correctItem.pinyin}) = ${correctItem.vietnamese}`
          : `${correctItem.vietnamese} = ${correctItem.chinese} (${correctItem.pinyin})`;
      } else if (isGrammarMode) {
        correctText = isJpToVi
          ? `${correctItem.pattern} = ${correctItem.vietnamese}`
          : `${correctItem.vietnamese} = ${correctItem.pattern}`;
      } else {
        const r = utils.kanaToRomaji(correctItem.kana);
        correctText = isJpToVi
          ? `${correctItem.japanese} (${r}) = ${correctItem.vietnamese}`
          : `${correctItem.vietnamese} = ${correctItem.japanese} (${r})`;
      }
      ui.showFeedback("mc", false, `\u0110\xE1p \xE1n: ${correctText}`);
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
      if (mode.startsWith("alpha-mc"))       window.QuizApp.quiz.alpha.renderMC();
      else if (mode.startsWith("counter-mc")) window.QuizApp.quiz.counter.renderMC();
      else renderMC(); // handles hsk-mc, mc-jp-vi, mc-vi-jp, grammar-mc
    }
  });

  return { renderMC, handleMCAnswer };
})();
