/**
 * Minna no Nihongo 1 — Vocabulary Quiz App
 *
 * All quiz logic, flashcard interaction, score tracking,
 * localStorage progress, and screen navigation.
 */

(function () {
  "use strict";

  // ──────────────────────────────────────────
  // DOM references
  // ──────────────────────────────────────────
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const screens = {
    lessons:     $("#screen-lessons"),
    menu:        $("#screen-menu"),
    vocabList:   $("#screen-vocab-list"),
    grammarList: $("#screen-grammar-list"),
    flashcard:   $("#screen-flashcard"),
    mc:          $("#screen-mc"),
    typing:      $("#screen-typing"),
    results:     $("#screen-results"),
  };

  // ──────────────────────────────────────────
  // App state
  // ──────────────────────────────────────────
  let currentLesson  = null;   // lesson data object
  let currentMode    = null;   // "flashcard" | "mc-jp-vi" | "mc-vi-jp" | "typing"
  let questions       = [];    // shuffled vocabulary for quiz
  let questionIndex   = 0;
  let score           = 0;
  let wrongItems      = [];    // items answered incorrectly
  let isRetryMode     = false;

  // Navigation history
  let navigationHistory = [];  // Stack to track screen navigation
  const MAX_HISTORY = 20;      // Prevent memory issues

  // Flashcard state
  let fcKnownCount = 0;

  // ──────────────────────────────────────────
  // localStorage helpers
  // ──────────────────────────────────────────
  const STORAGE_KEY = "minna_vocab_progress";

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch { return {}; }
  }

  function saveProgress(lessonNum, mode, scoreVal, total) {
    const prog = loadProgress();
    const key = `L${lessonNum}`;
    if (!prog[key]) prog[key] = {};
    const prev = prog[key][mode] || { best: 0, total: 0 };
    if (total > 0 && scoreVal / total > (prev.best / (prev.total || 1))) {
      prog[key][mode] = { best: scoreVal, total };
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prog));
  }

  function getLessonBestPercent(lessonNum) {
    const prog = loadProgress();
    const data = prog[`L${lessonNum}`];
    if (!data) return 0;
    let maxPct = 0;
    for (const mode of Object.keys(data)) {
      const { best, total } = data[mode];
      if (total > 0) maxPct = Math.max(maxPct, best / total);
    }
    return Math.round(maxPct * 100);
  }

  // ──────────────────────────────────────────
  // Dark mode
  // ──────────────────────────────────────────
  function initDarkMode() {
    const saved = localStorage.getItem("minna_dark");
    if (saved === "true" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.setAttribute("data-theme", "dark");
      toggleDarkIcons(true);
    }
  }

  function toggleDarkIcons(isDark) {
    $("#icon-moon").style.display = isDark ? "none" : "block";
    $("#icon-sun").style.display  = isDark ? "block" : "none";
  }

  $("#btn-dark-mode").addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("minna_dark", "false");
      toggleDarkIcons(false);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("minna_dark", "true");
      toggleDarkIcons(true);
    }
  });

  // ──────────────────────────────────────────
  // Navigation helpers
  // ──────────────────────────────────────────
  function showScreen(name, addToHistory = true) {
    // Add current screen to history before navigating
    if (addToHistory) {
      const currentScreen = Object.keys(screens).find(key =>
        screens[key].classList.contains("active")
      );
      if (currentScreen && currentScreen !== name) {
        navigationHistory.push(currentScreen);
        // Limit history size
        if (navigationHistory.length > MAX_HISTORY) {
          navigationHistory.shift();
        }
      }
    }

    // Show new screen
    for (const s of Object.values(screens)) s.classList.remove("active");
    screens[name].classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Update back button visibility
    updateBackButton();
  }

  function goBack() {
    if (navigationHistory.length > 0) {
      const previousScreen = navigationHistory.pop();
      showScreen(previousScreen, false); // Don't add to history when going back
    } else {
      // Fallback: go to lessons if no history
      renderLessonGrid();
      showScreen("lessons", false);
      $("#header-title").textContent = "Minna no Nihongo 1";
    }
  }

  function updateBackButton() {
    const backBtn = $("#btn-back");
    if (navigationHistory.length > 0) {
      backBtn.classList.remove("hidden");
    } else {
      backBtn.classList.add("hidden");
    }
  }

  function clearNavigationHistory() {
    navigationHistory = [];
    updateBackButton();
  }

  $("#btn-home").addEventListener("click", () => {
    renderLessonGrid();
    clearNavigationHistory();  // Clear history when going home
    showScreen("lessons", false);  // Don't add home to history
    $("#header-title").textContent = "Minna no Nihongo 1";
  });

  $("#btn-back").addEventListener("click", () => {
    goBack();
  });

  // ──────────────────────────────────────────
  // Utility
  // ──────────────────────────────────────────
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /** Normalize kana string for comparison: full-width → half, strip spaces */
  function normalizeKana(str) {
    return str
      .replace(/\s/g, "")
      .normalize("NFKC")
      .toLowerCase();
  }

  /** Normalize romaji string for comparison: handle variations */
  function normalizeRomaji(str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '') // Remove all spaces
      // Handle common variations (normalize to one form)
      .replace(/shi/g, 'si')     // し can be shi or si
      .replace(/chi/g, 'ti')     // ち can be chi or ti
      .replace(/tsu/g, 'tu')     // つ can be tsu or tu
      .replace(/fu/g, 'hu')      // ふ can be fu or hu
      .replace(/ji/g, 'zi')      // じ can be ji or zi
      // Handle long vowels (standardize to ou, uu, etc.)
      .replace(/ō/g, 'ou')
      .replace(/ū/g, 'uu')
      .replace(/ē/g, 'ei')
      .replace(/ā/g, 'aa')
      .replace(/n(?=[^aiueoyn]|$)/g, 'n');
  }

  /** Convert kana (hiragana/katakana) to romaji */
  function kanaToRomaji(kana) {
    if (!kana) return "";

    const hiraganaMap = {
      'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
      'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
      'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
      'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
      'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
      'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
      'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
      'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
      'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
      'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
      'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
      'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
      'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
      'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
      'わ': 'wa', 'ゐ': 'wi', 'ゑ': 'we', 'を': 'wo', 'ん': 'n',
      'ゃ': 'ya', 'ゅ': 'yu', 'ょ': 'yo',
      'ぁ': 'a', 'ぃ': 'i', 'ぅ': 'u', 'ぇ': 'e', 'ぉ': 'o',
      'ゎ': 'wa', 'っ': '', 'ー': '-'
    };

    const katakanaMap = {
      'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
      'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
      'ガ': 'ga', 'ギ': 'gi', 'グ': 'gu', 'ゲ': 'ge', 'ゴ': 'go',
      'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so',
      'ザ': 'za', 'ジ': 'ji', 'ズ': 'zu', 'ゼ': 'ze', 'ゾ': 'zo',
      'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
      'ダ': 'da', 'ヂ': 'ji', 'ヅ': 'zu', 'デ': 'de', 'ド': 'do',
      'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no',
      'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho',
      'バ': 'ba', 'ビ': 'bi', 'ブ': 'bu', 'ベ': 'be', 'ボ': 'bo',
      'パ': 'pa', 'ピ': 'pi', 'プ': 'pu', 'ペ': 'pe', 'ポ': 'po',
      'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo',
      'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo',
      'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro',
      'ワ': 'wa', 'ヰ': 'wi', 'ヱ': 'we', 'ヲ': 'wo', 'ン': 'n',
      'ャ': 'ya', 'ュ': 'yu', 'ョ': 'yo',
      'ァ': 'a', 'ィ': 'i', 'ゥ': 'u', 'ェ': 'e', 'ォ': 'o',
      'ヮ': 'wa', 'ッ': '', 'ー': '-'
    };

    const kanaMap = { ...hiraganaMap, ...katakanaMap };

    let result = '';
    let i = 0;

    while (i < kana.length) {
      const char = kana[i];
      const nextChar = kana[i + 1];

      // Xử lý small tsu (っ/ッ) - double consonant
      if (char === 'っ' || char === 'ッ') {
        if (nextChar && kanaMap[nextChar]) {
          const nextRomaji = kanaMap[nextChar];
          if (nextRomaji && nextRomaji.length > 0) {
            result += nextRomaji[0]; // Double first consonant
          }
        }
        i++;
        continue;
      }

      // Xử lý combinations (きゃ = kya, しゅ = shu, etc.)
      if (nextChar && (nextChar === 'ゃ' || nextChar === 'ゅ' || nextChar === 'ょ' ||
                        nextChar === 'ャ' || nextChar === 'ュ' || nextChar === 'ョ')) {
        const base = kanaMap[char];
        const combo = kanaMap[nextChar];
        if (base && combo) {
          result += base.slice(0, -1) + combo;
          i += 2;
          continue;
        }
      }

      // Regular character
      if (kanaMap[char]) {
        result += kanaMap[char];
      } else {
        result += char; // Giữ nguyên non-kana
      }

      i++;
    }

    return result;
  }

  // ──────────────────────────────────────────
  // SCREEN: Lesson Grid
  // ──────────────────────────────────────────
  function renderLessonGrid() {
    const grid = $("#lesson-grid");
    grid.innerHTML = "";

    // Build cards for lessons with data + placeholders for 6-25
    const maxLesson = 25;
    for (let n = 1; n <= maxLesson; n++) {
      const lessonData = VOCABULARY_DATA.find((l) => l.lessonNumber === n);
      const card = document.createElement("div");
      card.className = "lesson-card";

      const bestPct = getLessonBestPercent(n);

      if (lessonData) {
        card.innerHTML = `
          <span class="lesson-number">Bài ${n}</span>
          <span class="lesson-title">${lessonData.title}</span>
          <span class="lesson-meta">${lessonData.vocabulary.length} từ vựng</span>
          <div class="lesson-progress-bar"><div class="fill" style="width:${bestPct}%"></div></div>
        `;
        card.addEventListener("click", () => openLessonMenu(lessonData));
      } else {
        card.innerHTML = `
          <span class="lesson-number">Bài ${n}</span>
          <span class="lesson-title" style="color:var(--text-muted)">Sắp có...</span>
          <span class="lesson-meta">-</span>
          <div class="lesson-progress-bar"><div class="fill" style="width:0%"></div></div>
        `;
        card.style.opacity = "0.5";
        card.style.cursor = "default";
      }

      grid.appendChild(card);
    }
  }

  // ──────────────────────────────────────────
  // SCREEN: Lesson Menu
  // ──────────────────────────────────────────
  function openLessonMenu(lesson) {
    currentLesson = lesson;
    $("#menu-lesson-title").textContent = `Bài ${lesson.lessonNumber}: ${lesson.title}`;
    $("#menu-vocab-count").textContent = `${lesson.vocabulary.length} từ vựng`;
    $("#header-title").textContent = `Bài ${lesson.lessonNumber}`;
    showScreen("menu");
  }

  // Menu button clicks
  $$(".menu-actions .btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.mode;
      if (!mode || !currentLesson) return;

      // Handle list views
      if (mode === "vocab-list") {
        openVocabList();
        return;
      }
      if (mode === "grammar-list") {
        openGrammarList();
        return;
      }

      // Handle quiz modes
      currentMode   = mode;
      isRetryMode   = false;
      wrongItems    = [];

      // Determine content type and start session
      if (mode.startsWith("grammar-")) {
        startSession(currentLesson.grammar || []);
      } else {
        startSession(currentLesson.vocabulary);
      }
    });
  });

  // ──────────────────────────────────────────
  // SCREEN: Vocabulary List
  // ──────────────────────────────────────────
  function openVocabList() {
    $("#vocab-list-title").textContent = `Bài ${currentLesson.lessonNumber} — Danh sách từ vựng`;
    const tbody = $("#vocab-table-body");
    tbody.innerHTML = "";
    currentLesson.vocabulary.forEach((v, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${i + 1}</td>
        <td>${v.japanese}</td>
        <td>${v.kana}</td>
        <td>${kanaToRomaji(v.kana)}</td>
        <td>${v.vietnamese}</td>
        <td>${v.english || ""}</td>
      `;
      tbody.appendChild(tr);
    });
    showScreen("vocabList");
  }

  // ──────────────────────────────────────────
  // SCREEN: Grammar List
  // ──────────────────────────────────────────
  function openGrammarList() {
    if (!currentLesson.grammar || currentLesson.grammar.length === 0) {
      alert("Ngữ pháp cho bài này chưa có. Vui lòng quay lại sau!");
      return;
    }

    $("#grammar-list-title").textContent =
      `Bài ${currentLesson.lessonNumber} — Ngữ pháp`;

    const container = $("#grammar-list-container");
    container.innerHTML = "";

    currentLesson.grammar.forEach((g, i) => {
      const card = document.createElement("div");
      card.className = "grammar-card";

      // Build examples HTML
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

    showScreen("grammarList");
  }

  // ──────────────────────────────────────────
  // Start a quiz/flashcard session
  // ──────────────────────────────────────────
  function startSession(vocabSubset) {
    questions     = shuffle(vocabSubset);
    questionIndex = 0;
    score         = 0;
    wrongItems    = [];

    if (currentMode === "flashcard" || currentMode === "grammar-flashcard") {
      fcKnownCount = 0;
      showScreen("flashcard");
      renderFlashcard();
    } else if (currentMode.startsWith("mc") || currentMode.startsWith("grammar-mc")) {
      showScreen("mc");
      renderMC();
    } else if (currentMode === "typing" || currentMode === "typing-romaji") {
      showScreen("typing");
      renderTyping();
    }
  }

  // ──────────────────────────────────────────
  // FLASHCARD mode
  // ──────────────────────────────────────────
  const flashcardEl = $("#flashcard");

  flashcardEl.addEventListener("click", () => {
    flashcardEl.classList.toggle("flipped");
  });
  flashcardEl.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      flashcardEl.classList.toggle("flipped");
    }
  });

  function renderFlashcard() {
    const item = questions[questionIndex];
    const isGrammarMode = currentMode === "grammar-flashcard";

    flashcardEl.classList.remove("flipped");

    if (isGrammarMode) {
      // Grammar flashcard: Front = Pattern, Back = Meaning + Examples
      $("#fc-front-word").textContent = item.pattern;

      $("#fc-back-kana").textContent = item.vietnamese;
      $("#fc-back-romaji").textContent = item.english || "";
      $("#fc-back-meaning").textContent = item.explanation;

      // Show first example
      if (item.examples && item.examples.length > 0) {
        const ex = item.examples[0];
        $("#fc-back-example").textContent =
          `${ex.japanese}\n${ex.vietnamese}`;
      } else {
        $("#fc-back-example").textContent = "";
      }
      $("#fc-back-english").textContent = "";
    } else {
      // Vocabulary flashcard: existing logic
      $("#fc-front-word").textContent = item.japanese;
      $("#fc-back-kana").textContent = item.kana;
      $("#fc-back-romaji").textContent = kanaToRomaji(item.kana);
      $("#fc-back-meaning").textContent = item.vietnamese;
      $("#fc-back-english").textContent = item.english || "";
      $("#fc-back-example").textContent = item.example || "";
    }

    updateProgress("fc", questionIndex, questions.length);
    $("#fc-prev").disabled = questionIndex === 0;
  }

  $("#fc-prev").addEventListener("click", () => {
    if (questionIndex > 0) {
      questionIndex--;
      renderFlashcard();
    }
  });

  $("#fc-next").addEventListener("click", () => {
    advanceFlashcard();
  });

  $("#fc-know").addEventListener("click", () => {
    fcKnownCount++;
    advanceFlashcard();
  });

  $("#fc-dont-know").addEventListener("click", () => {
    wrongItems.push(questions[questionIndex]);
    advanceFlashcard();
  });

  function advanceFlashcard() {
    questionIndex++;
    if (questionIndex >= questions.length) {
      // Finished — show results
      score = fcKnownCount;
      showResults();
    } else {
      renderFlashcard();
    }
  }

  // ──────────────────────────────────────────
  // MULTIPLE CHOICE mode
  // ──────────────────────────────────────────
  function renderMC() {
    const item = questions[questionIndex];
    const isGrammarMode = currentMode.startsWith("grammar-mc");
    const isJpToVi = currentMode === "mc-jp-vi" || currentMode === "grammar-mc-jp-vi";

    // Question
    if (isJpToVi) {
      $("#mc-question-label").textContent =
        isGrammarMode ? "Mẫu ngữ pháp này nghĩa là gì?" : "Từ này nghĩa là gì?";
      $("#mc-question").textContent =
        isGrammarMode ? item.pattern : item.japanese;
      $("#mc-question").style.fontFamily = "var(--font-jp)";

      // Show hint for vocabulary, hide for grammar
      if (!isGrammarMode) {
        $("#mc-romaji").textContent = `(${kanaToRomaji(item.kana)})`;
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

    // Build 4 options (1 correct + 3 distractors)
    const contentArray = isGrammarMode ? currentLesson.grammar : currentLesson.vocabulary;
    const pool = contentArray.filter((v) => v !== item);
    const distractors = shuffle(pool).slice(0, 3);
    const options = shuffle([item, ...distractors]);

    const optionsContainer = $("#mc-options");
    optionsContainer.innerHTML = "";

    options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "mc-option";

      if (isGrammarMode) {
        // Grammar mode: No romaji (pattern or vietnamese text only)
        btn.textContent = isJpToVi ? opt.vietnamese : opt.pattern;
      } else {
        // Vocabulary mode
        if (isJpToVi) {
          // JP→VN: Show Vietnamese only (no romaji needed)
          btn.textContent = opt.vietnamese;
        } else {
          // VN→JP: Show Japanese with romaji hint
          const japaneseSpan = document.createElement("span");
          japaneseSpan.className = "mc-option-main";
          japaneseSpan.textContent = opt.japanese;

          const romajiSpan = document.createElement("span");
          romajiSpan.className = "mc-option-romaji";
          romajiSpan.textContent = `(${kanaToRomaji(opt.kana)})`;

          btn.innerHTML = "";
          btn.appendChild(japaneseSpan);
          btn.appendChild(romajiSpan);
        }
      }

      btn.dataset.correct = (opt === item) ? "true" : "false";
      btn.addEventListener("click", () =>
        handleMCAnswer(btn, item, isJpToVi, isGrammarMode));
      optionsContainer.appendChild(btn);
    });

    // Hide feedback / next
    $("#mc-feedback").classList.add("hidden");
    $("#mc-feedback").classList.remove("correct", "wrong");
    $("#mc-next").classList.add("hidden");

    updateProgress("mc", questionIndex, questions.length);
  }

  function handleMCAnswer(btn, correctItem, isJpToVi, isGrammarMode = false) {
    // Prevent double-click
    const allBtns = $$(".mc-option");
    allBtns.forEach((b) => b.classList.add("disabled"));

    const isCorrect = btn.dataset.correct === "true";

    if (isCorrect) {
      btn.classList.add("correct");
      score++;
      showFeedback("mc", true, "");
    } else {
      btn.classList.add("wrong");
      wrongItems.push(correctItem);

      // Highlight the correct answer
      allBtns.forEach((b) => {
        if (b.dataset.correct === "true") b.classList.add("correct");
      });

      // Build feedback based on content type
      let correctText;
      if (isGrammarMode) {
        correctText = isJpToVi
          ? `${correctItem.pattern} = ${correctItem.vietnamese}`
          : `${correctItem.vietnamese} = ${correctItem.pattern}`;
      } else {
        const romajiText = kanaToRomaji(correctItem.kana);
        correctText = isJpToVi
          ? `${correctItem.japanese} (${romajiText}) = ${correctItem.vietnamese}`
          : `${correctItem.vietnamese} = ${correctItem.japanese} (${romajiText})`;
      }

      showFeedback("mc", false, `Đáp án: ${correctText}`);
    }

    $("#mc-next").classList.remove("hidden");
  }

  $("#mc-next").addEventListener("click", () => {
    questionIndex++;
    if (questionIndex >= questions.length) {
      showResults();
    } else {
      renderMC();
    }
  });

  // ──────────────────────────────────────────
  // TYPING QUIZ mode
  // ──────────────────────────────────────────
  function renderTyping() {
    const item = questions[questionIndex];
    const isRomajiMode = currentMode === "typing-romaji";

    $("#tp-question").textContent = item.vietnamese;

    // Update label based on mode
    const labelEl = $("#screen-typing .question-label");
    if (isRomajiMode) {
      labelEl.textContent = "Nhập từ tiếng Nhật (romaji):";
    } else {
      labelEl.textContent = "Nhập từ tiếng Nhật (kana):";
    }

    const input = $("#tp-input");
    input.value = "";
    input.className = "typing-input";
    input.disabled = false;
    input.placeholder = isRomajiMode ? "Nhập romaji..." : "Nhập kana...";
    input.focus();

    // For romaji mode: hide hint wrapper completely
    // For kana mode: show romaji hint
    if (isRomajiMode) {
      $("#tp-romaji-hint-wrapper").classList.add("hidden");
    } else {
      $("#tp-romaji-hint-wrapper").classList.remove("hidden");
      $("#tp-romaji").textContent = kanaToRomaji(item.kana);
      $("#tp-romaji").classList.add("hidden");
      $("#tp-show-romaji").classList.remove("hidden");
      $("#tp-show-romaji").textContent = "Hiện romaji";
    }

    $("#tp-feedback").classList.add("hidden");
    $("#tp-feedback").classList.remove("correct", "wrong");
    $("#tp-next").classList.add("hidden");
    $("#tp-submit").classList.remove("hidden");
    $("#tp-submit").disabled = false;

    updateProgress("tp", questionIndex, questions.length);
  }

  $("#tp-show-romaji").addEventListener("click", () => {
    const romajiEl = $("#tp-romaji");
    const btnEl = $("#tp-show-romaji");

    if (romajiEl.classList.contains("hidden")) {
      romajiEl.classList.remove("hidden");
      btnEl.textContent = "Ẩn romaji";
    } else {
      romajiEl.classList.add("hidden");
      btnEl.textContent = "Hiện romaji";
    }
  });

  function handleTypingSubmit() {
    const item = questions[questionIndex];
    const input = $("#tp-input");
    const isRomajiMode = currentMode === "typing-romaji";

    let userAnswer, correctAnswer;

    if (isRomajiMode) {
      // Romaji mode: compare romaji
      userAnswer = normalizeRomaji(input.value);
      correctAnswer = normalizeRomaji(kanaToRomaji(item.kana));
    } else {
      // Kana mode: compare kana
      userAnswer = normalizeKana(input.value);
      correctAnswer = normalizeKana(item.kana);
    }

    input.disabled = true;
    $("#tp-submit").disabled = true;
    $("#tp-show-romaji").classList.add("hidden");

    if (userAnswer === correctAnswer) {
      score++;
      input.classList.add("correct");
      showFeedback("tp", true, "");
    } else {
      wrongItems.push(item);
      input.classList.add("wrong");

      // Enhanced feedback based on mode
      if (isRomajiMode) {
        const correctRomaji = kanaToRomaji(item.kana);
        showFeedback("tp", false, `Đáp án: ${correctRomaji} — ${item.kana} — ${item.japanese}`);
      } else {
        const romajiText = kanaToRomaji(item.kana);
        showFeedback("tp", false, `Đáp án: ${item.kana} (${romajiText}) — ${item.japanese}`);
      }
    }

    $("#tp-next").classList.remove("hidden");
    $("#tp-submit").classList.add("hidden");
  }

  $("#tp-submit").addEventListener("click", handleTypingSubmit);
  $("#tp-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !$("#tp-submit").disabled) {
      handleTypingSubmit();
    }
  });

  $("#tp-next").addEventListener("click", () => {
    questionIndex++;
    if (questionIndex >= questions.length) {
      showResults();
    } else {
      renderTyping();
    }
  });

  // ──────────────────────────────────────────
  // Feedback helper
  // ──────────────────────────────────────────
  function showFeedback(prefix, isCorrect, detail) {
    const el = $(`#${prefix}-feedback`);
    const textEl = $(`#${prefix}-feedback-text`);
    el.classList.remove("hidden", "correct", "wrong");
    el.classList.add(isCorrect ? "correct" : "wrong");
    textEl.textContent = isCorrect ? "Chính xác!" : detail;
  }

  // ──────────────────────────────────────────
  // Progress bar helper
  // ──────────────────────────────────────────
  function updateProgress(prefix, idx, total) {
    $(`#${prefix}-progress-text`).textContent = `${idx + 1} / ${total}`;
    $(`#${prefix}-progress-fill`).style.width = `${((idx + 1) / total) * 100}%`;
  }

  // ──────────────────────────────────────────
  // SCREEN: Results
  // ──────────────────────────────────────────
  function showResults() {
    const total = questions.length;
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;

    // Save best score
    if (currentMode !== "flashcard") {
      saveProgress(currentLesson.lessonNumber, currentMode, score, total);
    } else {
      saveProgress(currentLesson.lessonNumber, "flashcard", score, total);
    }

    // Ring animation
    $("#score-ring-fill").style.strokeDasharray = `${pct}, 100`;
    $("#results-percent").textContent = `${pct}%`;

    if (currentMode === "flashcard") {
      $("#results-detail").textContent = `Biết: ${score} / ${total} từ`;
    } else {
      $("#results-detail").textContent = `Đúng: ${score} / ${total} câu`;
    }

    // Toggle retry-wrong button
    if (wrongItems.length > 0) {
      $("#btn-retry-wrong").classList.remove("hidden");
      $("#btn-retry-wrong").textContent = `Làm lại ${wrongItems.length} câu sai`;
    } else {
      $("#btn-retry-wrong").classList.add("hidden");
    }

    showScreen("results");
  }

  // Results buttons
  $("#btn-retry-wrong").addEventListener("click", () => {
    if (wrongItems.length === 0) return;
    isRetryMode = true;
    clearNavigationHistory();  // Clear history when starting new quiz
    startSession(wrongItems);
  });

  $("#btn-retry-all").addEventListener("click", () => {
    isRetryMode = false;
    clearNavigationHistory();  // Clear history when starting new quiz
    startSession(currentLesson.vocabulary);
  });

  $("#btn-results-home").addEventListener("click", () => {
    renderLessonGrid();
    clearNavigationHistory();  // Clear history when going home
    showScreen("lessons", false);  // Don't add home to history
    $("#header-title").textContent = "Minna no Nihongo 1";
  });

  // ──────────────────────────────────────────
  // Keyboard shortcuts
  // ──────────────────────────────────────────
  document.addEventListener("keydown", (e) => {
    // MC: press 1-4 to select option
    if (screens.mc.classList.contains("active") && !$("#mc-next").classList.contains("hidden") === false) {
      const num = parseInt(e.key);
      if (num >= 1 && num <= 4) {
        const btns = $$(".mc-option");
        if (btns[num - 1] && !btns[num - 1].classList.contains("disabled")) {
          btns[num - 1].click();
        }
      }
    }

    // Flashcard: arrow keys
    if (screens.flashcard.classList.contains("active")) {
      if (e.key === "ArrowLeft") $("#fc-prev").click();
      if (e.key === "ArrowRight") $("#fc-next").click();
    }
  });

  // ──────────────────────────────────────────
  // Init
  // ──────────────────────────────────────────
  initDarkMode();
  renderLessonGrid();
})();
