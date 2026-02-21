/**
 * ui/darkmode.js — Dark mode init + toggle
 * Depends on: nothing (self-contained)
 */
window.QuizApp = window.QuizApp || {};

window.QuizApp.darkmode = (function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);

  function toggleDarkIcons(isDark) {
    $("#icon-moon").style.display = isDark ? "none"  : "block";
    $("#icon-sun").style.display  = isDark ? "block" : "none";
  }

  function initDarkMode() {
    const saved = localStorage.getItem("minna_dark");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "true" || (!saved && prefersDark)) {
      document.documentElement.setAttribute("data-theme", "dark");
      toggleDarkIcons(true);
    }
  }

  // ── Event listener ───────────────────────────────────────────
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

  return { initDarkMode, toggleDarkIcons };
})();
