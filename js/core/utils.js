/**
 * core/utils.js — Pure utility functions
 * shuffle, normalizeKana, normalizeRomaji, kanaToRomaji
 * Depends on: nothing (self-contained)
 */
window.QuizApp = window.QuizApp || {};

window.QuizApp.utils = (function () {
  "use strict";

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function normalizeKana(str) {
    return str
      .replace(/\s/g, "")
      .normalize("NFKC")
      .toLowerCase();
  }

  function normalizeRomaji(str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '')
      .replace(/shi/g, 'si')
      .replace(/chi/g, 'ti')
      .replace(/tsu/g, 'tu')
      .replace(/fu/g, 'hu')
      .replace(/ji/g, 'zi')
      .replace(/\u014d/g, 'ou')
      .replace(/\u016b/g, 'uu')
      .replace(/\u0113/g, 'ei')
      .replace(/\u0101/g, 'aa')
      .replace(/n(?=[^aiueoyn]|$)/g, 'n');
  }

  // kanaToRomaji injected by build step — do not edit this placeholder
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

  return { shuffle, normalizeKana, normalizeRomaji, kanaToRomaji };
})();
