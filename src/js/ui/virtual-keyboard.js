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

  // Compact layout - 10 columns instead of 5 to reduce height
  const HIRAGANA_CHARS = [
    ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ"],
    ["さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と"],
    ["な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ"],
    ["ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り"],
    ["る", "れ", "ろ", "わ", "を", "ん", "ー", "ゃ", "ゅ", "ょ"],
    ["っ", "　", "　", "　", "　", "　", "　", "　", "　", "　"]
  ];

  const KATAKANA_CHARS = [
    ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ"],
    ["サ", "シ", "ス", "セ", "ソ", "タ", "チ", "ツ", "テ", "ト"],
    ["ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "ヒ", "フ", "ヘ", "ホ"],
    ["マ", "ミ", "ム", "メ", "モ", "ヤ", "ユ", "ヨ", "ラ", "リ"],
    ["ル", "レ", "ロ", "ワ", "ヲ", "ン", "ー", "ャ", "ュ", "ョ"],
    ["ッ", "　", "　", "　", "　", "　", "　", "　", "　", "　"]
  ];

  // Dakuten conversion maps
  const DAKUTEN_MAP = {
    "か": "が", "き": "ぎ", "く": "ぐ", "け": "げ", "こ": "ご",
    "さ": "ざ", "し": "じ", "す": "ず", "せ": "ぜ", "そ": "ぞ",
    "た": "だ", "ち": "ぢ", "つ": "づ", "て": "で", "と": "ど",
    "は": "ば", "ひ": "び", "ふ": "ぶ", "へ": "べ", "ほ": "ぼ",
    "カ": "ガ", "キ": "ギ", "ク": "グ", "ケ": "ゲ", "コ": "ゴ",
    "サ": "ザ", "シ": "ジ", "ス": "ズ", "セ": "ゼ", "ソ": "ゾ",
    "タ": "ダ", "チ": "ヂ", "ツ": "ヅ", "テ": "デ", "ト": "ド",
    "ハ": "バ", "ヒ": "ビ", "フ": "ブ", "ヘ": "ベ", "ホ": "ボ"
  };

  const HANDAKUTEN_MAP = {
    "は": "ぱ", "ひ": "ぴ", "ふ": "ぷ", "へ": "ぺ", "ほ": "ぽ",
    "ハ": "パ", "ヒ": "ピ", "フ": "プ", "ヘ": "ペ", "ホ": "ポ"
  };

  let currentScript = "hiragana";
  let targetInput = null;

  function addDakuten() {
    if (!targetInput || !targetInput.value) return;
    const lastChar = targetInput.value.slice(-1);
    const converted = DAKUTEN_MAP[lastChar];
    if (converted) {
      targetInput.value = targetInput.value.slice(0, -1) + converted;
      targetInput.focus();
    }
  }

  function addHandakuten() {
    if (!targetInput || !targetInput.value) return;
    const lastChar = targetInput.value.slice(-1);
    const converted = HANDAKUTEN_MAP[lastChar];
    if (converted) {
      targetInput.value = targetInput.value.slice(0, -1) + converted;
      targetInput.focus();
    }
  }

  function renderKeyboard(script) {
    const grid = $("#keyboard-grid");
    if (!grid) return;

    const chars = script === "hiragana" ? HIRAGANA_CHARS : KATAKANA_CHARS;
    grid.innerHTML = "";

    // Render character grid
    chars.forEach(row => {
      row.forEach(char => {
        if (char === "　") {
          // Empty space
          const empty = document.createElement("div");
          empty.className = "keyboard-key empty";
          grid.appendChild(empty);
        } else {
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
        }
      });
    });

    // Add dakuten button (゛)
    const dakuten = document.createElement("button");
    dakuten.className = "keyboard-key accent";
    dakuten.textContent = "゛";
    dakuten.title = "Thêm dakuten (゛)";
    dakuten.type = "button";
    dakuten.addEventListener("click", addDakuten);
    grid.appendChild(dakuten);

    // Add handakuten button (゜)
    const handakuten = document.createElement("button");
    handakuten.className = "keyboard-key accent";
    handakuten.textContent = "゜";
    handakuten.title = "Thêm handakuten (゜)";
    handakuten.type = "button";
    handakuten.addEventListener("click", addHandakuten);
    grid.appendChild(handakuten);

    // Add backspace button
    const backspace = document.createElement("button");
    backspace.className = "keyboard-key special";
    backspace.innerHTML = "⌫";
    backspace.title = "Xóa";
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
    space.innerHTML = "Space";
    space.title = "Dấu cách";
    space.type = "button";
    space.addEventListener("click", () => {
      if (targetInput) {
        targetInput.value += " ";
        targetInput.focus();
      }
    });
    grid.appendChild(space);
  }

  let isVisible = false;

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

    // Setup toggle button
    const toggleBtn = $("#keyboard-toggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        if (isVisible) {
          hide();
        } else {
          show();
        }
      });
    }

    // Initial render
    renderKeyboard(currentScript);
  }

  function show() {
    const keyboard = $("#virtual-keyboard");
    const toggleBtn = $("#keyboard-toggle");
    const toggleText = $("#keyboard-toggle-text");

    if (keyboard) {
      keyboard.classList.remove("hidden");
      isVisible = true;
    }
    if (toggleText) toggleText.textContent = "Ẩn bàn phím";
  }

  function hide() {
    const keyboard = $("#virtual-keyboard");
    const toggleBtn = $("#keyboard-toggle");
    const toggleText = $("#keyboard-toggle-text");

    if (keyboard) {
      keyboard.classList.add("hidden");
      isVisible = false;
    }
    if (toggleText) toggleText.textContent = "Hiện bàn phím";
  }

  function showToggleButton() {
    const toggleBtn = $("#keyboard-toggle");
    if (toggleBtn) toggleBtn.classList.remove("hidden");
  }

  function hideToggleButton() {
    const toggleBtn = $("#keyboard-toggle");
    if (toggleBtn) toggleBtn.classList.add("hidden");
  }

  window.QuizApp.ui.virtualKeyboard = { init, show, hide, showToggleButton, hideToggleButton };
})();
