/**
 * ui/audio.js — Web Speech API wrapper for Japanese TTS
 * Depends on: nothing (self-contained)
 * Gracefully no-ops if browser doesn't support window.speechSynthesis.
 */
window.QuizApp = window.QuizApp || {};

window.QuizApp.audio = (function () {
  "use strict";

  let _voices = [];

  function _loadVoices() {
    _voices = window.speechSynthesis.getVoices();
  }

  function init() {
    if (!isSupported()) return;
    _loadVoices();
    // Voices load async on first call in some browsers
    window.speechSynthesis.addEventListener("voiceschanged", _loadVoices);
  }

  function _getBestVoice() {
    // Prefer local (OS) Japanese voice — better quality, works offline
    return _voices.find(v => v.lang === "ja-JP" && v.localService)
        || _voices.find(v => v.lang === "ja-JP")
        || _voices.find(v => v.lang.startsWith("ja"))
        || null;
  }

  function isSupported() {
    return "speechSynthesis" in window;
  }

  /** Speak Japanese text. Silently no-ops if unsupported or empty. */
  function speak(text) {
    if (!isSupported() || !text) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang  = "ja-JP";
    utter.rate  = 0.85;   // slightly slower for learning
    utter.pitch = 1.0;
    const voice = _getBestVoice();
    if (voice) utter.voice = voice;
    window.speechSynthesis.cancel();   // stop any currently playing speech
    window.speechSynthesis.speak(utter);
  }

  return { init, speak, isSupported };
})();
