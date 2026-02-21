/**
 * screens/grammar-list.js — Grammar list screen
 * Depends on: state, nav (showScreen)
 */
window.QuizApp = window.QuizApp || {};
window.QuizApp.screens = window.QuizApp.screens || {};

window.QuizApp.screens.openGrammarList = function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const state = window.QuizApp.state;
  const nav   = window.QuizApp.nav;

  if (!state.currentLesson.grammar || state.currentLesson.grammar.length === 0) {
    alert("Ngữ pháp cho bài này chưa có. Vui lòng quay lại sau!");
    return;
  }

  $("#grammar-list-title").textContent =
    `Bài ${state.currentLesson.lessonNumber} — Ngữ pháp`;

  const container = $("#grammar-list-container");
  container.innerHTML = "";

  state.currentLesson.grammar.forEach((g, i) => {
    const card = document.createElement("div");
    card.className = "grammar-card";

    const examplesHTML = g.examples.map(ex => `
      <div class="grammar-example">
        <p class="grammar-example-jp">${ex.japanese}</p>
        <p class="grammar-example-vi">${ex.vietnamese}</p>
        ${ex.english ? `<p class="grammar-example-en">${ex.english}</p>` : ''}
      </div>
    `).join('');

    card.innerHTML = `
      <div class="grammar-card-header">
        <span class="grammar-number">${i + 1}</span>
        <h3 class="grammar-pattern">${g.pattern}</h3>
      </div>
      <div class="grammar-card-body">
        <p class="grammar-meaning">
          <strong>Nghĩa:</strong> ${g.vietnamese}
          ${g.english ? `<span class="grammar-meaning-en"> (${g.english})</span>` : ''}
        </p>
        <p class="grammar-explanation">${g.explanation}</p>
        <div class="grammar-examples">
          <strong>Ví dụ:</strong>
          ${examplesHTML}
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  nav.showScreen("grammarList");
};
