/**
 * ui/audio.js — Web Speech API wrapper for TTS (Japanese + Chinese)
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

  function _getBestVoiceForLang(lang) {
    const prefix = lang.split("-")[0]; // "ja" from "ja-JP", "zh" from "zh-CN"
    return _voices.find(v => v.lang === lang && v.localService)
        || _voices.find(v => v.lang === lang)
        || _voices.find(v => v.lang.startsWith(prefix))
        || null;
  }

  function isSupported() {
    return "speechSynthesis" in window;
  }

  /**
   * Speak text via TTS.
   * @param {string} text  — text to speak
   * @param {string} [lang] — BCP-47 language tag, defaults to "ja-JP"
   */
  function speak(text, lang) {
    if (!isSupported() || !text) return;
    const resolvedLang = lang || "ja-JP";
    // Remove furigana annotations in parentheses (e.g., "開（あ）けます" -> "開けます")
    const cleanText = text.replace(/[（(][^）)]*[）)]/g, "");
    const utter = new SpeechSynthesisUtterance(cleanText);
    utter.lang  = resolvedLang;
    utter.rate  = 0.85;
    utter.pitch = 1.0;
    const voice = _getBestVoiceForLang(resolvedLang);
    if (voice) utter.voice = voice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }

  return { init, speak, isSupported };
})();
