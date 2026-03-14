/**
 * quiz/grammar-category-quiz.js — Grammar Category Quiz Launcher
 * Enables quizzes for custom grammar pattern sets (by category, function, or selection)
 */
window.QuizApp = window.QuizApp || {};
window.QuizApp.quiz = window.QuizApp.quiz || {};

window.QuizApp.quiz.grammarCategoryQuiz = (function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);

  /**
   * Launch grammar quiz with custom pattern set
   * @param {Array} patterns - Array of grammar patterns
   * @param {Object} options - Quiz options { mode, title, category, function }
   */
  function launchGrammarQuiz(patterns, options = {}) {
    const state = window.QuizApp.state;

    // Validate input
    if (!patterns || patterns.length === 0) {
      alert("Không có ngữ pháp nào để quiz. Vui lòng chọn ít nhất 1 pattern.");
      return;
    }

    // Store quiz context
    state.grammarQuizContext = {
      title: options.title || "Grammar Quiz",
      category: options.category || null,
      function: options.function || null,
      totalPatterns: patterns.length,
      isCustomSet: true
    };

    // Create a temporary lesson-like object for compatibility with existing quiz system
    const tempLesson = {
      lessonNumber: 0,
      title: options.title || "Grammar Quiz",
      grammar: patterns,
      vocabulary: [] // Empty vocabulary for grammar-only quiz
    };

    // Set current lesson
    state.currentLesson = tempLesson;

    // Determine quiz mode
    const mode = options.mode || 'grammar-flashcard';
    state.currentMode = mode;

    // Launch quiz
    window.QuizApp.quiz.startSession(patterns);
  }

  /**
   * Launch quiz with selected patterns
   * @param {Set} selectedPatternStrings - Set of pattern strings
   * @param {Array} allPatterns - All available patterns
   */
  function launchQuizWithSelected(selectedPatternStrings, allPatterns) {
    if (selectedPatternStrings.size === 0) {
      alert("Vui lòng chọn ít nhất 1 pattern để quiz.");
      return;
    }

    // Filter patterns
    const selectedPatterns = allPatterns.filter(p =>
      selectedPatternStrings.has(p.pattern)
    );

    // Show mode selection modal
    showModeSelectionModal(selectedPatterns, {
      title: `Quiz ${selectedPatterns.length} pattern đã chọn`
    });
  }

  /**
   * Launch quiz for a specific category
   * @param {string} categoryId - Category ID
   * @param {Array} allPatterns - All available patterns
   */
  function launchQuizByCategory(categoryId, allPatterns) {
    const grammarMetadata = window.QuizApp.grammarMetadata;
    const grammarUtils = window.QuizApp.grammarUtils;

    // Filter patterns by category
    const categoryPatterns = grammarUtils.filterByCategory(allPatterns, categoryId);

    if (categoryPatterns.length === 0) {
      alert("Không có ngữ pháp nào trong category này.");
      return;
    }

    // Get category info
    const categoryInfo = grammarMetadata.GRAMMAR_CATEGORIES[categoryId];
    const title = categoryInfo
      ? `Quiz ${categoryInfo.icon} ${categoryInfo.name}`
      : `Quiz Category ${categoryId}`;

    // Show mode selection modal
    showModeSelectionModal(categoryPatterns, {
      title: title,
      category: categoryId
    });
  }

  /**
   * Launch quiz for a specific function
   * @param {string} functionId - Function ID
   * @param {Array} allPatterns - All available patterns
   */
  function launchQuizByFunction(functionId, allPatterns) {
    const grammarMetadata = window.QuizApp.grammarMetadata;
    const grammarUtils = window.QuizApp.grammarUtils;

    // Filter patterns by function
    const functionPatterns = grammarUtils.filterByFunction(allPatterns, functionId);

    if (functionPatterns.length === 0) {
      alert("Không có ngữ pháp nào trong function này.");
      return;
    }

    // Get function info
    const functionInfo = grammarMetadata.GRAMMAR_FUNCTIONS[functionId];
    const title = functionInfo
      ? `Quiz ${functionInfo.name}`
      : `Quiz Function ${functionId}`;

    // Show mode selection modal
    showModeSelectionModal(functionPatterns, {
      title: title,
      function: functionId
    });
  }

  /**
   * Show mode selection modal
   * @param {Array} patterns - Patterns to quiz
   * @param {Object} options - Quiz options
   */
  function showModeSelectionModal(patterns, options) {
    const modal = createModeSelectionModal(patterns, options);
    document.body.appendChild(modal);
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  /**
   * Create mode selection modal
   * @param {Array} patterns - Patterns to quiz
   * @param {Object} options - Quiz options
   * @returns {HTMLElement} Modal element
   */
  function createModeSelectionModal(patterns, options) {
    const modal = document.createElement("div");
    modal.className = "modal quiz-mode-modal";
    modal.id = "quiz-mode-modal";

    modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content quiz-mode-content">
        <div class="modal-header">
          <h2 class="modal-title">Chọn chế độ Quiz</h2>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="quiz-mode-info">
            <p><strong>${options.title}</strong></p>
            <p>${patterns.length} mẫu ngữ pháp</p>
          </div>

          <div class="quiz-mode-options">
            <button class="quiz-mode-btn" data-mode="grammar-flashcard">
              <span class="quiz-mode-icon">📋</span>
              <div class="quiz-mode-text">
                <div class="quiz-mode-name">Flashcard</div>
                <div class="quiz-mode-desc">Xem pattern, nhớ nghĩa</div>
              </div>
            </button>

            <button class="quiz-mode-btn" data-mode="grammar-mc-jp-vi">
              <span class="quiz-mode-icon">🎯</span>
              <div class="quiz-mode-text">
                <div class="quiz-mode-name">Trắc nghiệm: Pattern → Nghĩa</div>
                <div class="quiz-mode-desc">Chọn nghĩa đúng cho pattern</div>
              </div>
            </button>

            <button class="quiz-mode-btn" data-mode="grammar-mc-vi-jp">
              <span class="quiz-mode-icon">🎲</span>
              <div class="quiz-mode-text">
                <div class="quiz-mode-name">Trắc nghiệm: Nghĩa → Pattern</div>
                <div class="quiz-mode-desc">Chọn pattern đúng cho nghĩa</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    `;

    // Event listeners
    const overlay = modal.querySelector(".modal-overlay");
    const closeBtn = modal.querySelector(".modal-close");
    const modeButtons = modal.querySelectorAll(".quiz-mode-btn");

    const closeModal = () => {
      modal.classList.remove("active");
      document.body.style.overflow = "";
      setTimeout(() => modal.remove(), 300);
    };

    overlay.addEventListener("click", closeModal);
    closeBtn.addEventListener("click", closeModal);

    modeButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const mode = btn.dataset.mode;
        closeModal();
        launchGrammarQuiz(patterns, { ...options, mode });
      });
    });

    // ESC to close
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeModal();
        document.removeEventListener("keydown", handleEscape);
      }
    };
    document.addEventListener("keydown", handleEscape);

    return modal;
  }

  /**
   * Get quiz context title for display
   * @returns {string} Context title or null
   */
  function getQuizContextTitle() {
    const state = window.QuizApp.state;
    if (state.grammarQuizContext && state.grammarQuizContext.isCustomSet) {
      return state.grammarQuizContext.title;
    }
    return null;
  }

  /**
   * Clear quiz context
   */
  function clearQuizContext() {
    const state = window.QuizApp.state;
    state.grammarQuizContext = null;
  }

  // Public API
  return {
    launchGrammarQuiz,
    launchQuizWithSelected,
    launchQuizByCategory,
    launchQuizByFunction,
    getQuizContextTitle,
    clearQuizContext
  };
})();
