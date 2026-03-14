/**
 * screens/grammar-reference.js — Grammar Reference screen
 * Comprehensive grammar reference with search, filter, and categorization
 */
window.QuizApp = window.QuizApp || {};
window.QuizApp.screens = window.QuizApp.screens || {};

window.QuizApp.screens.openGrammarReference = function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);
  const nav = window.QuizApp.nav;
  const grammarIndex = window.QuizApp.grammarIndex;
  const grammarMetadata = window.QuizApp.grammarMetadata;
  const grammarUtils = window.QuizApp.grammarUtils;
  const grammarComparisons = window.QuizApp.grammarComparisons;

  // State
  let allPatterns = [];
  let filteredPatterns = [];
  let selectedPatterns = new Set();
  let currentView = 'lesson';
  let currentFilters = {
    search: '',
    jlpt: 'all',
    category: 'all',
    function: 'all'
  };

  /**
   * Update breadcrumb based on return context
   */
  function updateBreadcrumb() {
    const breadcrumb = $("#grammar-breadcrumb");
    const returnContext = state.grammarReferenceReturnContext;

    if (returnContext && returnContext.screen === "grammarList") {
      breadcrumb.innerHTML = `
        <button class="breadcrumb-link" id="breadcrumb-back-to-lesson">
          ◀️ Quay lại Bài ${returnContext.lessonNumber}
        </button>
      `;
      breadcrumb.classList.remove("hidden");

      // Add event listener
      $("#breadcrumb-back-to-lesson").addEventListener("click", () => {
        // Clear return context
        state.grammarReferenceReturnContext = null;
        // Return to lesson grammar
        const lessonKey = `LESSON_${String(returnContext.lessonNumber).padStart(2, '0')}_DATA`;
        const lessonData = window[lessonKey];
        if (lessonData) {
          state.currentLesson = lessonData;
          window.QuizApp.screens.openGrammarList();
        }
      });
    } else {
      breadcrumb.classList.add("hidden");
    }
  }

  /**
   * Initialize the grammar reference screen
   */
  function init() {
    // Get all grammar patterns and merge with metadata
    const rawPatterns = grammarIndex.getAllGrammar();
    allPatterns = grammarUtils.mergeGrammarWithMetadata(rawPatterns);
    filteredPatterns = allPatterns;

    // Update breadcrumb if coming from lesson
    updateBreadcrumb();

    // Populate filter dropdowns
    populateFilterDropdowns();

    // Setup event listeners
    setupEventListeners();

    // Render initial view
    renderGrammarList();

    // Show screen
    nav.showScreen("grammarReference");
  }

  /**
   * Populate filter dropdown options
   */
  function populateFilterDropdowns() {
    // Category filter
    const categorySelect = $("#filter-category");
    const categories = grammarMetadata.GRAMMAR_CATEGORIES;
    Object.keys(categories).forEach(catId => {
      const cat = categories[catId];
      const option = document.createElement("option");
      option.value = catId;
      option.textContent = `${cat.icon} ${cat.name}`;
      categorySelect.appendChild(option);
    });

    // Function filter
    const functionSelect = $("#filter-function");
    const functions = grammarMetadata.GRAMMAR_FUNCTIONS;
    Object.keys(functions).forEach(funcId => {
      const func = functions[funcId];
      const option = document.createElement("option");
      option.value = funcId;
      option.textContent = func.name;
      functionSelect.appendChild(option);
    });
  }

  /**
   * Setup event listeners
   */
  function setupEventListeners() {
    // Search input
    const searchInput = $("#grammar-search-input");
    let searchTimeout;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        currentFilters.search = e.target.value;
        applyFiltersAndRender();
      }, 300); // Debounce 300ms
    });

    // Filter selects
    $("#filter-jlpt").addEventListener("change", (e) => {
      currentFilters.jlpt = e.target.value;
      applyFiltersAndRender();
    });

    $("#filter-category").addEventListener("change", (e) => {
      currentFilters.category = e.target.value;
      applyFiltersAndRender();
    });

    $("#filter-function").addEventListener("change", (e) => {
      currentFilters.function = e.target.value;
      applyFiltersAndRender();
    });

    // View tabs
    $$(".view-tab").forEach(tab => {
      tab.addEventListener("click", (e) => {
        const view = e.currentTarget.dataset.view;
        handleViewChange(view);
      });
    });

    // Quiz selected button
    $("#btn-quiz-selected").addEventListener("click", () => {
      launchQuizWithSelected();
    });
  }

  /**
   * Apply current filters and re-render
   */
  function applyFiltersAndRender() {
    filteredPatterns = grammarUtils.applyFilters(allPatterns, currentFilters);
    renderGrammarList();
  }

  /**
   * Handle view mode change
   */
  function handleViewChange(view) {
    currentView = view;

    // Update active tab
    $$(".view-tab").forEach(tab => {
      tab.classList.toggle("active", tab.dataset.view === view);
    });

    // Scroll to top smoothly
    const screen = $("#screen-grammar-reference");
    if (screen) {
      screen.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

    renderGrammarList();
  }

  /**
   * Render the grammar list based on current view mode
   */
  function renderGrammarList() {
    const container = $("#grammar-reference-container");

    if (currentView === 'comparisons') {
      renderComparisons(container);
      return;
    }

    if (filteredPatterns.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <p>Không tìm thấy ngữ pháp nào.</p>
          <p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.</p>
        </div>
      `;
      return;
    }

    switch (currentView) {
      case 'lesson':
        renderByLesson(container);
        break;
      case 'category':
        renderByCategory(container);
        break;
      case 'function':
        renderByFunction(container);
        break;
    }
  }

  /**
   * Render patterns grouped by lesson
   */
  function renderByLesson(container) {
    const grouped = grammarUtils.groupByLesson(filteredPatterns);
    const lessonNumbers = Object.keys(grouped).sort((a, b) => a - b);

    container.innerHTML = '';

    lessonNumbers.forEach(lessonNum => {
      const lessonData = grouped[lessonNum];

      // Lesson header
      const lessonHeader = document.createElement("div");
      lessonHeader.className = "grammar-group-header";
      lessonHeader.innerHTML = `
        <h3>📖 Bài ${lessonData.lessonNumber}</h3>
        <span class="pattern-count">${lessonData.patterns.length} patterns</span>
      `;
      container.appendChild(lessonHeader);

      // Patterns
      lessonData.patterns.forEach(pattern => {
        container.appendChild(createPatternCard(pattern));
      });
    });
  }

  /**
   * Render patterns grouped by category
   */
  function renderByCategory(container) {
    const grouped = grammarUtils.groupByCategory(filteredPatterns);

    container.innerHTML = '';

    Object.keys(grouped).forEach(catId => {
      const catData = grouped[catId];

      // Category header
      const catHeader = document.createElement("div");
      catHeader.className = "grammar-group-header";
      catHeader.innerHTML = `
        <div>
          <h3>${catData.category.icon} ${catData.category.name}</h3>
          <span class="pattern-count">${catData.patterns.length} patterns</span>
        </div>
        ${catId !== 'uncategorized' && catData.patterns.length >= 3 ? `
          <button class="btn btn-sm btn-primary quiz-category-btn" data-category="${catId}">
            🎯 Quiz Category
          </button>
        ` : ''}
      `;
      container.appendChild(catHeader);

      // Patterns
      catData.patterns.forEach(pattern => {
        container.appendChild(createPatternCard(pattern));
      });
    });

    // Add event listeners to quiz buttons
    container.querySelectorAll(".quiz-category-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const categoryId = btn.dataset.category;
        launchQuizByCategory(categoryId);
      });
    });
  }

  /**
   * Render patterns grouped by function
   */
  function renderByFunction(container) {
    const grouped = grammarUtils.groupByFunction(filteredPatterns);

    container.innerHTML = '';

    Object.keys(grouped).forEach(funcId => {
      const funcData = grouped[funcId];

      // Function header
      const funcHeader = document.createElement("div");
      funcHeader.className = "grammar-group-header";
      funcHeader.innerHTML = `
        <div>
          <h3>${funcData.function.name}</h3>
          <span class="pattern-count">${funcData.patterns.length} patterns</span>
        </div>
        ${funcId !== 'uncategorized' && funcData.patterns.length >= 3 ? `
          <button class="btn btn-sm btn-primary quiz-function-btn" data-function="${funcId}">
            🎯 Quiz Function
          </button>
        ` : ''}
      `;
      container.appendChild(funcHeader);

      // Patterns
      funcData.patterns.forEach(pattern => {
        container.appendChild(createPatternCard(pattern));
      });
    });

    // Add event listeners to quiz buttons
    container.querySelectorAll(".quiz-function-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const functionId = btn.dataset.function;
        launchQuizByFunction(functionId);
      });
    });
  }

  /**
   * Render comparisons view
   */
  function renderComparisons(container) {
    const comparisons = grammarComparisons.getAllComparisons();

    container.innerHTML = `
      <div class="grammar-group-header">
        <h3>📊 So sánh ngữ pháp</h3>
        <span class="pattern-count">${comparisons.length} so sánh</span>
      </div>
      <div class="comparison-list"></div>
    `;

    const listContainer = container.querySelector(".comparison-list");

    comparisons.forEach(comparison => {
      const card = createComparisonCard(comparison);
      listContainer.appendChild(card);
    });
  }

  /**
   * Create a comparison card element
   */
  function createComparisonCard(comparison) {
    const card = document.createElement("div");
    card.className = "comparison-card";

    // Build pattern badges
    const patternBadges = comparison.patterns.map(p =>
      `<span class="comparison-pattern-badge">${p}</span>`
    ).join('');

    // Build meta tags
    const metaTags = [];
    if (comparison.jlptLevel) {
      metaTags.push(`<span class="tag tag-jlpt">${comparison.jlptLevel}</span>`);
    }
    if (comparison.difficulty) {
      metaTags.push(`<span class="tag tag-lesson">${comparison.difficulty}</span>`);
    }

    card.innerHTML = `
      <div class="comparison-card-header">
        <h3 class="comparison-card-title">${comparison.title}</h3>
      </div>
      <div class="comparison-card-patterns">
        ${patternBadges}
      </div>
      <p class="comparison-card-description">${comparison.vietnamese}</p>
      ${comparison.english ? `<p class="comparison-card-description" style="font-style: italic; color: var(--text-muted);">${comparison.english}</p>` : ''}
      <div class="comparison-card-meta">
        ${metaTags.join('')}
      </div>
    `;

    // Click to view comparison
    card.addEventListener("click", () => {
      showComparisonModal(comparison);
    });

    return card;
  }

  /**
   * Show comparison modal
   */
  function showComparisonModal(comparison) {
    const modal = $("#comparison-modal");
    const title = $("#comparison-title");
    const body = $("#comparison-body");

    // Set title
    title.textContent = comparison.title;

    // Build modal content
    let html = '';

    // Introduction/Tips section
    if (comparison.tips) {
      html += `
        <div class="comparison-intro">
          <div class="comparison-intro-title">💡 Mẹo phân biệt</div>
          <div class="comparison-intro-text">${comparison.tips}</div>
        </div>
      `;
    }

    // Comparison table
    if (comparison.table) {
      html += `
        <div class="comparison-table-wrapper">
          <table class="comparison-table">
            <thead>
              <tr>
      `;

      // Table headers
      comparison.table.headers.forEach(header => {
        html += `<th>${header}</th>`;
      });

      html += `
              </tr>
            </thead>
            <tbody>
      `;

      // Table rows
      comparison.table.rows.forEach(row => {
        html += '<tr>';

        // First column (aspect/label)
        html += `<td>${row.aspect || row.meaning || ''}</td>`;

        // Remaining columns (dynamic based on headers)
        const headers = comparison.table.headers;
        for (let i = 1; i < headers.length; i++) {
          const key = headers[i].toLowerCase().replace(/[^a-z]/g, '');
          const value = row[key] || row.wa || row.ga || row.ni || row.de || row.wo || row.tai || row.hoshii || row.mashou || row.masenka || row.ta || row.teiru || row.meaning || row.example || '';
          html += `<td>${value}</td>`;
        }

        html += '</tr>';
      });

      html += `
            </tbody>
          </table>
        </div>
      `;
    }

    // Examples section
    if (comparison.examples && comparison.examples.length > 0) {
      html += `
        <div class="comparison-examples-section">
          <div class="comparison-examples-title">✍️ Ví dụ minh họa</div>
          <div class="comparison-examples-grid">
      `;

      comparison.examples.forEach(ex => {
        html += `
          <div class="comparison-example-card">
            <div class="comparison-example-pattern">${ex.pattern}</div>
            <div class="comparison-example-jp">${ex.japanese}</div>
            <div class="comparison-example-vi">${ex.vietnamese}</div>
            ${ex.explanation ? `<div class="comparison-example-explanation">${ex.explanation}</div>` : ''}
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    }

    // Common mistakes section
    if (comparison.commonMistakes && comparison.commonMistakes.length > 0) {
      html += `
        <div class="comparison-mistakes">
          <div class="comparison-mistakes-title">⚠️ Lỗi thường gặp</div>
          <ul class="comparison-mistakes-list">
      `;

      comparison.commonMistakes.forEach(mistake => {
        html += `<li>${mistake}</li>`;
      });

      html += `
          </ul>
        </div>
      `;
    }

    body.innerHTML = html;

    // Setup modal event listeners
    setupComparisonModalEventListeners();

    // Show modal
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  /**
   * Setup comparison modal event listeners
   */
  function setupComparisonModalEventListeners() {
    // Close button
    $("#comparison-modal-close").addEventListener("click", closeComparisonModal);

    // Overlay click to close
    $("#comparison-modal-overlay").addEventListener("click", closeComparisonModal);

    // ESC key to close
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeComparisonModal();
        document.removeEventListener("keydown", handleEscape);
      }
    };
    document.addEventListener("keydown", handleEscape);
  }

  /**
   * Close the comparison modal
   */
  function closeComparisonModal() {
    const modal = $("#comparison-modal");
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  /**
   * Create a pattern card element
   */
  function createPatternCard(pattern) {
    const card = document.createElement("div");
    card.className = "grammar-card-compact";
    if (selectedPatterns.has(pattern.pattern)) {
      card.classList.add("selected");
    }

    // Build tags
    const tagsHTML = [];
    if (pattern.meta) {
      if (pattern.meta.jlptLevel) {
        tagsHTML.push(`<span class="tag tag-jlpt">${pattern.meta.jlptLevel}</span>`);
      }
    }
    tagsHTML.push(`<span class="tag tag-lesson">Bài ${pattern.lessonNumber}</span>`);

    card.innerHTML = `
      <div class="pattern-card-header">
        <div class="pattern-select">
          <input
            type="checkbox"
            class="pattern-checkbox"
            ${selectedPatterns.has(pattern.pattern) ? 'checked' : ''}
            data-pattern="${escapeHtml(pattern.pattern)}"
          />
        </div>
        <div class="pattern-main">
          <h4 class="pattern-text">${pattern.pattern}</h4>
          <p class="pattern-meaning">${pattern.vietnamese}</p>
          ${pattern.english ? `<p class="pattern-meaning-en">${pattern.english}</p>` : ''}
        </div>
        <div class="pattern-tags">
          ${tagsHTML.join('')}
        </div>
      </div>
      <div class="pattern-card-actions">
        <button class="btn-text btn-view-detail" data-pattern="${escapeHtml(pattern.pattern)}">
          💡 Chi tiết
        </button>
        ${pattern.meta && pattern.meta.tips ? `
          <button class="btn-text btn-show-tips" data-pattern="${escapeHtml(pattern.pattern)}">
            🧠 Tips
          </button>
        ` : ''}
      </div>
    `;

    // Event: Checkbox
    const checkbox = card.querySelector(".pattern-checkbox");
    checkbox.addEventListener("change", (e) => {
      e.stopPropagation();
      togglePatternSelection(pattern.pattern);
    });

    // Event: View detail
    const btnDetail = card.querySelector(".btn-view-detail");
    btnDetail.addEventListener("click", (e) => {
      e.stopPropagation();
      showPatternDetail(pattern);
    });

    // Event: Show tips
    const btnTips = card.querySelector(".btn-show-tips");
    if (btnTips) {
      btnTips.addEventListener("click", (e) => {
        e.stopPropagation();
        showQuickTips(pattern);
      });
    }

    return card;
  }

  /**
   * Toggle pattern selection
   */
  function togglePatternSelection(patternString) {
    if (selectedPatterns.has(patternString)) {
      selectedPatterns.delete(patternString);
    } else {
      selectedPatterns.add(patternString);
    }

    // Update UI
    updateSelectedCount();
    updateCardSelection(patternString);
  }

  /**
   * Update card selection visual state
   */
  function updateCardSelection(patternString) {
    const cards = $$(".grammar-card-compact");
    cards.forEach(card => {
      const checkbox = card.querySelector(".pattern-checkbox");
      if (checkbox.dataset.pattern === patternString) {
        checkbox.checked = selectedPatterns.has(patternString);
        card.classList.toggle("selected", selectedPatterns.has(patternString));
      }
    });
  }

  /**
   * Update selected count display
   */
  function updateSelectedCount() {
    const count = selectedPatterns.size;
    $("#selected-count").textContent = count;

    // Show/hide footer
    const footer = $("#grammar-footer");
    if (count > 0) {
      footer.style.display = "flex";
    } else {
      footer.style.display = "none";
    }
  }

  /**
   * Show pattern detail modal
   */
  function showPatternDetail(pattern) {
    const modal = $("#grammar-detail-modal");
    const title = $("#grammar-detail-title");
    const body = $("#grammar-detail-body");
    const state = window.QuizApp.state;

    // Set title
    title.textContent = pattern.pattern;

    // Build modal content
    let html = '';

    // Meaning section
    html += `
      <div class="detail-section">
        <div class="detail-meaning">${pattern.vietnamese}</div>
        ${pattern.english ? `<div class="detail-meaning-en">${pattern.english}</div>` : ''}
      </div>
    `;

    // Meta tags
    const metaTags = [];
    if (pattern.meta) {
      if (pattern.meta.jlptLevel) {
        metaTags.push(`<span class="tag tag-jlpt">${pattern.meta.jlptLevel}</span>`);
      }
      if (pattern.meta.difficulty) {
        metaTags.push(`<span class="tag tag-lesson">${pattern.meta.difficulty}</span>`);
      }
    }
    metaTags.push(`<span class="tag tag-lesson">Bài ${pattern.lessonNumber}</span>`);

    if (metaTags.length > 0) {
      html += `
        <div class="detail-section">
          <div class="detail-meta-tags">${metaTags.join('')}</div>
        </div>
      `;
    }

    // Explanation
    if (pattern.explanation) {
      html += `
        <div class="detail-section">
          <div class="detail-section-title">📖 Giải thích</div>
          <div class="detail-explanation">${pattern.explanation}</div>
        </div>
      `;
    }

    // Tips, mnemonics, mistakes (if metadata exists)
    if (pattern.meta) {
      if (pattern.meta.tips) {
        html += `
          <div class="detail-section">
            <div class="detail-section-title">💡 Mẹo ghi nhớ</div>
            <div class="detail-tip">${pattern.meta.tips}</div>
          </div>
        `;
      }

      if (pattern.meta.mnemonics) {
        html += `
          <div class="detail-section">
            <div class="detail-section-title">🧠 Cách nhớ</div>
            <div class="detail-mnemonic">${pattern.meta.mnemonics}</div>
          </div>
        `;
      }

      if (pattern.meta.commonMistakes) {
        html += `
          <div class="detail-section">
            <div class="detail-section-title">⚠️ Lỗi thường gặp</div>
            <div class="detail-mistake">${pattern.meta.commonMistakes}</div>
          </div>
        `;
      }

      if (pattern.meta.usageNotes) {
        html += `
          <div class="detail-section">
            <div class="detail-section-title">📝 Ghi chú sử dụng</div>
            <div class="detail-explanation">${pattern.meta.usageNotes}</div>
          </div>
        `;
      }
    }

    // Examples
    if (pattern.examples && pattern.examples.length > 0) {
      html += `
        <div class="detail-section">
          <div class="detail-section-title">✍️ Ví dụ</div>
          <div class="detail-examples">
      `;

      pattern.examples.forEach(ex => {
        html += `
          <div class="detail-example">
            <div class="detail-example-jp">${ex.japanese}</div>
            <div class="detail-example-vi">${ex.vietnamese}</div>
            ${ex.english ? `<div class="detail-example-en">${ex.english}</div>` : ''}
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    }

    // Related patterns
    if (pattern.meta && pattern.meta.relatedPatterns && pattern.meta.relatedPatterns.length > 0) {
      html += `
        <div class="detail-section">
          <div class="detail-section-title">🔗 Ngữ pháp liên quan</div>
          <div class="detail-related-patterns">
      `;

      pattern.meta.relatedPatterns.forEach(relatedPattern => {
        html += `
          <a class="related-pattern-link" data-pattern="${escapeHtml(relatedPattern)}">
            ${relatedPattern}
          </a>
        `;
      });

      html += `
          </div>
        </div>
      `;
    }

    // Check if we came from a lesson
    const returnContext = state.grammarReferenceReturnContext;
    const showBackToLesson = returnContext && returnContext.screen === "grammarList";

    // Actions
    html += `
      <div class="detail-actions">
        ${showBackToLesson ? `
          <button class="btn btn-primary" id="btn-back-to-lesson">
            ◀️ Quay lại Bài ${returnContext.lessonNumber}
          </button>
        ` : `
          <button class="btn btn-outline" id="btn-view-in-lesson">
            📖 Xem trong Bài ${pattern.lessonNumber}
          </button>
        `}
        <button class="btn btn-success" id="btn-add-to-quiz-detail">
          ➕ Thêm vào Quiz
        </button>
      </div>
    `;

    body.innerHTML = html;

    // Setup modal event listeners
    setupModalEventListeners(pattern);

    // Show modal
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  /**
   * Show quick tips for a pattern
   */
  function showQuickTips(pattern) {
    if (!pattern.meta || !pattern.meta.tips) return;

    const tipsText = [
      `💡 ${pattern.meta.tips}`,
      pattern.meta.mnemonics ? `🧠 ${pattern.meta.mnemonics}` : '',
      pattern.meta.commonMistakes ? `⚠️ ${pattern.meta.commonMistakes}` : ''
    ].filter(Boolean).join('\n\n');

    alert(tipsText);
  }

  /**
   * Setup modal event listeners
   */
  function setupModalEventListeners(pattern) {
    // Close button
    $("#grammar-modal-close").addEventListener("click", closeModal);

    // Overlay click to close
    $("#grammar-modal-overlay").addEventListener("click", closeModal);

    // Related pattern links
    $$(".related-pattern-link").forEach(link => {
      link.addEventListener("click", (e) => {
        const relatedPatternString = e.currentTarget.dataset.pattern;
        const relatedPattern = allPatterns.find(p => p.pattern === relatedPatternString);
        if (relatedPattern) {
          closeModal();
          setTimeout(() => showPatternDetail(relatedPattern), 100);
        }
      });
    });

    // View in lesson button
    const btnViewInLesson = $("#btn-view-in-lesson");
    if (btnViewInLesson) {
      btnViewInLesson.addEventListener("click", () => {
        closeModal();
        viewPatternInLesson(pattern.lessonNumber);
      });
    }

    // Back to lesson button (when coming from lesson grammar)
    const btnBackToLesson = $("#btn-back-to-lesson");
    if (btnBackToLesson) {
      btnBackToLesson.addEventListener("click", () => {
        const state = window.QuizApp.state;
        const returnContext = state.grammarReferenceReturnContext;
        closeModal();
        // Clear return context
        state.grammarReferenceReturnContext = null;
        // Return to lesson grammar
        if (returnContext && returnContext.lessonNumber) {
          const lessonKey = `LESSON_${String(returnContext.lessonNumber).padStart(2, '0')}_DATA`;
          const lessonData = window[lessonKey];
          if (lessonData) {
            state.currentLesson = lessonData;
            window.QuizApp.screens.openGrammarList();
          }
        }
      });
    }

    // Add to quiz button
    const btnAddToQuiz = $("#btn-add-to-quiz-detail");
    if (btnAddToQuiz) {
      btnAddToQuiz.addEventListener("click", () => {
        if (!selectedPatterns.has(pattern.pattern)) {
          togglePatternSelection(pattern.pattern);
        }
        closeModal();
      });
    }

    // ESC key to close
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeModal();
        document.removeEventListener("keydown", handleEscape);
      }
    };
    document.addEventListener("keydown", handleEscape);
  }

  /**
   * Close the modal
   */
  function closeModal() {
    const modal = $("#grammar-detail-modal");
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  /**
   * View pattern in lesson context
   */
  function viewPatternInLesson(lessonNumber) {
    const lessonKey = `LESSON_${String(lessonNumber).padStart(2, '0')}_DATA`;
    const lessonData = window[lessonKey];

    if (lessonData) {
      window.QuizApp.state.currentLesson = lessonData;
      window.QuizApp.screens.openGrammarList();
    } else {
      alert(`Bài ${lessonNumber} chưa có dữ liệu.`);
    }
  }

  /**
   * Launch quiz with selected patterns
   */
  function launchQuizWithSelected() {
    if (selectedPatterns.size === 0) {
      alert("Vui lòng chọn ít nhất 1 pattern để quiz.");
      return;
    }

    // Launch quiz with selected patterns
    const grammarCategoryQuiz = window.QuizApp.quiz.grammarCategoryQuiz;
    grammarCategoryQuiz.launchQuizWithSelected(selectedPatterns, allPatterns);
  }

  /**
   * Launch quiz by category
   */
  function launchQuizByCategory(categoryId) {
    const grammarCategoryQuiz = window.QuizApp.quiz.grammarCategoryQuiz;
    grammarCategoryQuiz.launchQuizByCategory(categoryId, allPatterns);
  }

  /**
   * Launch quiz by function
   */
  function launchQuizByFunction(functionId) {
    const grammarCategoryQuiz = window.QuizApp.quiz.grammarCategoryQuiz;
    grammarCategoryQuiz.launchQuizByFunction(functionId, allPatterns);
  }

  /**
   * Escape HTML to prevent XSS
   */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Show pattern detail by pattern string (for external access)
   * @param {string} patternString - The pattern to show
   */
  function showPatternByString(patternString) {
    const pattern = allPatterns.find(p => p.pattern === patternString);
    if (pattern) {
      showPatternDetail(pattern);
    } else {
      alert(`Không tìm thấy pattern: ${patternString}`);
    }
  }

  // Expose public functions for external access
  window.QuizApp.screens.grammarReference = {
    showPatternByString: showPatternByString
  };

  // Initialize when called
  init();
};
