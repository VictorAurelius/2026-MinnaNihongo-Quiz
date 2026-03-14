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
        <div class="grammar-card-footer">
          <button class="btn-link view-in-reference" data-pattern="${g.pattern.replace(/"/g, '&quot;')}">
            📚 Xem trong Grammar Reference
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Add event listeners to "View in Reference" buttons
  container.querySelectorAll(".view-in-reference").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const patternString = btn.dataset.pattern;
      viewPatternInReference(patternString);
    });
  });

  /**
   * View pattern in Grammar Reference
   * @param {string} patternString - The pattern to view
   */
  function viewPatternInReference(patternString) {
    // Store return context
    state.grammarReferenceReturnContext = {
      screen: "grammarList",
      lessonNumber: state.currentLesson.lessonNumber
    };

    // Open Grammar Reference
    $("#header-title").textContent = "Grammar Reference";
    window.QuizApp.screens.openGrammarReference();

    // After a brief delay (to allow screen to render), show the pattern detail
    setTimeout(() => {
      if (window.QuizApp.screens.grammarReference) {
        window.QuizApp.screens.grammarReference.showPatternByString(patternString);
      }
    }, 100);
  }

  nav.showScreen("grammarList");
};
