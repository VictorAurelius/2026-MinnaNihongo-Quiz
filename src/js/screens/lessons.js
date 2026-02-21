/**
 * screens/lessons.js — Lesson grid + lesson menu screen + course selector (JLPT / HSK)
 * Depends on: state, storage (getLessonBestPercent), nav (showScreen)
 * Calls at runtime: quiz.startSession, screens.openVocabList, screens.openGrammarList
 */
window.QuizApp = window.QuizApp || {};
window.QuizApp.screens = window.QuizApp.screens || {};

(function () {
  "use strict";

  const $  = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ── Course selector ──────────────────────────────────────────
  const COURSE_KEY = "quiz_active_course";

  function getActiveCourse() {
    return localStorage.getItem(COURSE_KEY) || "jlpt";
  }

  function setActiveCourse(course) {
    localStorage.setItem(COURSE_KEY, course);
    window.QuizApp.state.activeCourse = course;
  }

  function updateCourseTabs(course) {
    $$(".course-tab").forEach(tab => {
      const isActive = tab.dataset.course === course;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  function getCourseHeaderTitle(course) {
    return course === "hsk" ? "HSK 5" : "Minna no Nihongo 1";
  }

  // ── JLPT lesson grid ─────────────────────────────────────────
  function renderJLPTGrid(grid) {
    const storage = window.QuizApp.storage;

    // Special section cards
    const specials = [
      {
        id: "card-alphabet",
        icon: "&#x1F524;",
        title: "B&#x1EA3;ng ch&#x1EEF; c&#xE1;i",
        meta: "Hiragana &amp; Katakana",
        onclick: () => {
          $("#header-title").textContent = "B\u1EA3ng ch\u1EEF c\xE1i";
          window.QuizApp.screens.openAlphabetScreen();
        },
      },
      {
        id: "card-counters",
        icon: "&#x1F522;",
        title: "&#x110;&#x1EBF;m s&#x1ED1; &amp; Tr&#x1EE3; s&#x1ED1; t&#x1EEB;",
        meta: "17 tr&#x1EE3; s&#x1ED1; t&#x1EEB;",
        onclick: () => {
          $("#header-title").textContent = "\u0110\u1EBFm s\u1ED1 & Tr\u1EE3 s\u1ED1 t\u1EEB";
          window.QuizApp.screens.openCountersScreen();
        },
      },
    ];

    specials.forEach(s => {
      const card = document.createElement("div");
      card.id = s.id;
      card.className = "lesson-card lesson-card--special";
      card.innerHTML = `
        <span class="lesson-special-icon">${s.icon}</span>
        <span class="lesson-title">${s.title}</span>
        <span class="lesson-meta">${s.meta}</span>
      `;
      card.addEventListener("click", s.onclick);
      grid.appendChild(card);
    });

    const maxLesson = 25;
    for (let n = 1; n <= maxLesson; n++) {
      const lessonData = VOCABULARY_DATA.find((l) => l.lessonNumber === n);
      const card = document.createElement("div");
      card.className = "lesson-card";
      const bestPct = storage.getLessonBestPercent(n);

      if (lessonData) {
        card.innerHTML = `
          <span class="lesson-number">B\xE0i ${n}</span>
          <span class="lesson-title">${lessonData.title}</span>
          <span class="lesson-meta">${lessonData.vocabulary.length} t\u1EEB v\u1EF1ng</span>
          <div class="lesson-progress-bar"><div class="fill" style="width:${bestPct}%"></div></div>
        `;
        card.addEventListener("click", () => openLessonMenu(lessonData));
      } else {
        card.innerHTML = `
          <span class="lesson-number">B\xE0i ${n}</span>
          <span class="lesson-title" style="color:var(--text-muted)">S\u1EAFp c\xF3...</span>
          <span class="lesson-meta">-</span>
          <div class="lesson-progress-bar"><div class="fill" style="width:0%"></div></div>
        `;
        card.style.opacity = "0.5";
        card.style.cursor = "default";
      }

      grid.appendChild(card);
    }
  }

  // ── HSK grid ─────────────────────────────────────────────────
  function renderHSKGrid(grid) {
    // Placeholder until HSK5 data is entered (Phase 2)
    const placeholder = document.createElement("div");
    placeholder.className = "hsk-coming-soon";
    placeholder.innerHTML = `
      <span class="hsk-coming-soon-icon">&#x1F4DA;</span>
      <h3>HSK 5 — S&#x1EAFp ra m&#x1EAFt</h3>
      <p>D&#x1EEF; li&#x1EC7;u HSK 5 &#x111;ang &#x111;&#x01B0;&#x1EE3;c nh&#x1EAD;p li&#x1EC7;u.<br>2500 t&#x1EEB; v&#x1EF1;ng ti&#x1EBF;ng Trung theo chu&#x1EA9;n HSK 5 (C1).</p>
    `;
    grid.appendChild(placeholder);
  }

  // ── Main render ───────────────────────────────────────────────
  function renderLessonGrid() {
    const course = getActiveCourse();
    setActiveCourse(course);
    updateCourseTabs(course);

    const grid = $("#lesson-grid");
    grid.innerHTML = "";

    if (course === "hsk") {
      renderHSKGrid(grid);
    } else {
      renderJLPTGrid(grid);
    }
  }

  // ── Tab click handlers ────────────────────────────────────────
  $$(".course-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      const course = tab.dataset.course;
      setActiveCourse(course);
      updateCourseTabs(course);

      const grid = $("#lesson-grid");
      grid.innerHTML = "";
      if (course === "hsk") {
        renderHSKGrid(grid);
      } else {
        renderJLPTGrid(grid);
      }

      $("#header-title").textContent = getCourseHeaderTitle(course);
    });
  });

  // ── Lesson menu ───────────────────────────────────────────────
  function openLessonMenu(lesson) {
    const state = window.QuizApp.state;
    const nav   = window.QuizApp.nav;
    state.currentLesson = lesson;
    $("#menu-lesson-title").textContent = `B\xE0i ${lesson.lessonNumber}: ${lesson.title}`;
    $("#menu-vocab-count").textContent  = `${lesson.vocabulary.length} t\u1EEB v\u1EF1ng`;
    $("#header-title").textContent      = `B\xE0i ${lesson.lessonNumber}`;
    nav.showScreen("menu");
  }

  // Menu button clicks
  $$(".menu-actions .btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const state = window.QuizApp.state;
      const mode  = btn.dataset.mode;
      if (!mode || !state.currentLesson) return;

      if (mode === "vocab-list") {
        window.QuizApp.screens.openVocabList();
        return;
      }
      if (mode === "grammar-list") {
        window.QuizApp.screens.openGrammarList();
        return;
      }

      state.currentMode = mode;
      state.isRetryMode = false;
      state.wrongItems  = [];

      if (mode.startsWith("grammar-")) {
        window.QuizApp.quiz.startSession(state.currentLesson.grammar || []);
      } else {
        window.QuizApp.quiz.startSession(state.currentLesson.vocabulary);
      }
    });
  });

  window.QuizApp.screens.renderLessonGrid     = renderLessonGrid;
  window.QuizApp.screens.openLessonMenu       = openLessonMenu;
  window.QuizApp.screens.getActiveCourse      = getActiveCourse;
  window.QuizApp.screens.getCourseHeaderTitle = getCourseHeaderTitle;
})();
