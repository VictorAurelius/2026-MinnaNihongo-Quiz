/**
 * core/storage.js — localStorage progress helpers
 * Depends on: nothing (self-contained)
 */
window.QuizApp = window.QuizApp || {};

window.QuizApp.storage = (function () {
  "use strict";

  const STORAGE_KEY     = "minna_vocab_progress";
  const HSK_STORAGE_KEY = "hsk_vocab_progress";

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

  function loadHSKProgress() {
    try {
      return JSON.parse(localStorage.getItem(HSK_STORAGE_KEY)) || {};
    } catch { return {}; }
  }

  function saveHSKProgress(groupId, mode, scoreVal, total) {
    const prog = loadHSKProgress();
    if (!prog[groupId]) prog[groupId] = {};
    const prev = prog[groupId][mode] || { best: 0, total: 0 };
    if (total > 0 && scoreVal / total > (prev.best / (prev.total || 1))) {
      prog[groupId][mode] = { best: scoreVal, total };
    }
    localStorage.setItem(HSK_STORAGE_KEY, JSON.stringify(prog));
  }

  function getHSKGroupBestPercent(groupId) {
    const prog = loadHSKProgress();
    const data = prog[groupId];
    if (!data) return 0;
    let maxPct = 0;
    for (const mode of Object.keys(data)) {
      const { best, total } = data[mode];
      if (total > 0) maxPct = Math.max(maxPct, best / total);
    }
    return Math.round(maxPct * 100);
  }

  return { loadProgress, saveProgress, getLessonBestPercent,
           loadHSKProgress, saveHSKProgress, getHSKGroupBestPercent };
})();
