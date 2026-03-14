/**
 * grammar-index.js — Grammar Reference Index
 * Aggregates all grammar patterns from lessons 1-25
 */
window.QuizApp = window.QuizApp || {};
window.QuizApp.grammarIndex = (function () {
  "use strict";

  /**
   * Aggregate all grammar patterns from all lessons
   * @returns {Array} Array of all grammar patterns with lessonNumber added
   */
  function getAllGrammar() {
    const allGrammar = [];

    // Iterate through lessons 1-25
    for (let i = 1; i <= 25; i++) {
      const lessonKey = `LESSON_${String(i).padStart(2, '0')}_DATA`;
      const lessonData = window[lessonKey];

      if (lessonData && lessonData.grammar && Array.isArray(lessonData.grammar)) {
        // Add lessonNumber to each pattern
        lessonData.grammar.forEach(pattern => {
          allGrammar.push({
            ...pattern,
            lessonNumber: i,
            lessonTitle: lessonData.title
          });
        });
      }
    }

    return allGrammar;
  }

  /**
   * Get grammar patterns for a specific lesson
   * @param {number} lessonNumber - Lesson number (1-25)
   * @returns {Array} Grammar patterns for that lesson
   */
  function getGrammarByLesson(lessonNumber) {
    const lessonKey = `LESSON_${String(lessonNumber).padStart(2, '0')}_DATA`;
    const lessonData = window[lessonKey];

    if (lessonData && lessonData.grammar) {
      return lessonData.grammar.map(pattern => ({
        ...pattern,
        lessonNumber: lessonNumber,
        lessonTitle: lessonData.title
      }));
    }

    return [];
  }

  /**
   * Get grammar patterns by lesson range
   * @param {number} startLesson - Starting lesson number
   * @param {number} endLesson - Ending lesson number
   * @returns {Array} Grammar patterns in that range
   */
  function getGrammarByLessonRange(startLesson, endLesson) {
    const allGrammar = [];

    for (let i = startLesson; i <= endLesson; i++) {
      allGrammar.push(...getGrammarByLesson(i));
    }

    return allGrammar;
  }

  /**
   * Get unique grammar pattern by pattern string
   * @param {string} patternString - The pattern to find
   * @returns {Object|null} Grammar pattern object or null
   */
  function getGrammarByPattern(patternString) {
    const allGrammar = getAllGrammar();
    return allGrammar.find(g => g.pattern === patternString) || null;
  }

  /**
   * Get statistics about grammar data
   * @returns {Object} Statistics object
   */
  function getStatistics() {
    const allGrammar = getAllGrammar();
    const stats = {
      totalPatterns: allGrammar.length,
      patternsByLesson: {},
      patternsWithExamples: 0,
      totalExamples: 0
    };

    allGrammar.forEach(pattern => {
      // Count by lesson
      if (!stats.patternsByLesson[pattern.lessonNumber]) {
        stats.patternsByLesson[pattern.lessonNumber] = 0;
      }
      stats.patternsByLesson[pattern.lessonNumber]++;

      // Count examples
      if (pattern.examples && pattern.examples.length > 0) {
        stats.patternsWithExamples++;
        stats.totalExamples += pattern.examples.length;
      }
    });

    stats.averageExamplesPerPattern =
      (stats.totalExamples / stats.totalPatterns).toFixed(2);

    return stats;
  }

  // Public API
  return {
    getAllGrammar,
    getGrammarByLesson,
    getGrammarByLessonRange,
    getGrammarByPattern,
    getStatistics
  };
})();
