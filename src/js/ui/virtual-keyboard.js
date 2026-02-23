/**
 * ui/virtual-keyboard.js — Virtual keyboard for typing kana
 * Depends on: nothing (self-contained)
 */
window.QuizApp = window.QuizApp || {};
window.QuizApp.ui = window.QuizApp.ui || {};

(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const HIRAGANA_CHARS = [
    "あ", "い", "う", "え", "お",
    "か", "き", "く", "け", "こ",
    "さ", "し", "す", "せ", "そ",
    "た", "ち", "つ", "て", "と",
    "な", "に", "ぬ", "ね", "の",
    "は", "ひ", "ふ", "へ", "ほ",
    "ま", "み", "む", "め", "も",
    "や", "ゆ", "よ",
    "ら", "り", "る", "れ", "ろ",
    "わ", "を", "ん",
    "が", "ぎ", "ぐ", "げ", "ご",
    "ざ", "じ", "ず", "ぜ", "ぞ",
    "だ", "ぢ", "づ", "で", "ど",
    "ば", "び", "ぶ", "べ", "ぼ",
    "ぱ", "ぴ", "ぷ", "ぺ", "ぽ",
    "きゃ", "きゅ", "きょ",
    "しゃ", "しゅ", "しょ",
    "ちゃ", "ちゅ", "ちょ",
    "にゃ", "にゅ", "にょ",
    "ひゃ", "ひゅ", "ひょ",
    "みゃ", "みゅ", "みょ",
    "りゃ", "りゅ", "りょ",
    "ぎゃ", "ぎゅ", "ぎょ",
    "じゃ", "じゅ", "じょ",
    "びゃ", "びゅ", "びょ",
    "ぴゃ", "ぴゅ", "ぴょ",
    "っ", "ー"
  ];

  const KATAKANA_CHARS = [
    "ア", "イ", "ウ", "エ", "オ",
    "カ", "キ", "ク", "ケ", "コ",
    "サ", "シ", "ス", "セ", "ソ",
    "タ", "チ", "ツ", "テ", "ト",
    "ナ", "ニ", "ヌ", "ネ", "ノ",
    "ハ", "ヒ", "フ", "ヘ", "ホ",
    "マ", "ミ", "ム", "メ", "モ",
    "ヤ", "ユ", "ヨ",
    "ラ", "リ", "ル", "レ", "ロ",
    "ワ", "ヲ", "ン",
    "ガ", "ギ", "グ", "ゲ", "ゴ",
    "ザ", "ジ", "ズ", "ゼ", "ゾ",
    "ダ", "ヂ", "ヅ", "デ", "ド",
    "バ", "ビ", "ブ", "ベ", "ボ",
    "パ", "ピ", "プ", "ペ", "ポ",
    "キャ", "キュ", "キョ",
    "シャ", "シュ", "ショ",
    "チャ", "チュ", "チョ",
    "ニャ", "ニュ", "ニョ",
    "ヒャ", "ヒュ", "ヒョ",
    "ミャ", "ミュ", "ミョ",
    "リャ", "リュ", "リョ",
    "ギャ", "ギュ", "ギョ",
    "ジャ", "ジュ", "ジョ",
    "ビャ", "ビュ", "ビョ",
    "ピャ", "ピュ", "ピョ",
    "ッ", "ー"
  ];

  let currentScript = "hiragana";
  let targetInput = null;

  function renderKeyboard(script) {
    const grid = $("#keyboard-grid");
    if (!grid) return;

    const chars = script === "hiragana" ? HIRAGANA_CHARS : KATAKANA_CHARS;
    grid.innerHTML = "";

    chars.forEach(char => {
      const btn = document.createElement("button");
      btn.className = "keyboard-key";
      btn.textContent = char;
      btn.type = "button";
      btn.addEventListener("click", () => {
        if (targetInput) {
          targetInput.value += char;
          targetInput.focus();
        }
      });
      grid.appendChild(btn);
    });

    // Add backspace button
    const backspace = document.createElement("button");
    backspace.className = "keyboard-key special";
    backspace.textContent = "⌫ Xóa";
    backspace.type = "button";
    backspace.addEventListener("click", () => {
      if (targetInput) {
        targetInput.value = targetInput.value.slice(0, -1);
        targetInput.focus();
      }
    });
    grid.appendChild(backspace);

    // Add space button
    const space = document.createElement("button");
    space.className = "keyboard-key special";
    space.textContent = "Dấu cách";
    space.type = "button";
    space.addEventListener("click", () => {
      if (targetInput) {
        targetInput.value += " ";
        targetInput.focus();
      }
    });
    grid.appendChild(space);
  }

  function init(inputElement) {
    targetInput = inputElement;

    // Setup tab switching
    $$(".keyboard-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        const script = tab.dataset.script;
        currentScript = script;
        $$(".keyboard-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        renderKeyboard(script);
      });
    });

    // Initial render
    renderKeyboard(currentScript);
  }

  function show() {
    const keyboard = $("#virtual-keyboard");
    if (keyboard) keyboard.classList.remove("hidden");
  }

  function hide() {
    const keyboard = $("#virtual-keyboard");
    if (keyboard) keyboard.classList.add("hidden");
  }

  window.QuizApp.ui.virtualKeyboard = { init, show, hide };
})();
