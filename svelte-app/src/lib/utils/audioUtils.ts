/**
 * Audio utility for Japanese speech synthesis
 */

export function playJapaneseAudio(text: string): void {
  if (!text || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  utterance.rate = 0.8;
  window.speechSynthesis.speak(utterance);
}
