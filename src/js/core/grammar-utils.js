/**
 * grammar-utils.js — Grammar Utility Functions
 * Functions for filtering, searching, and processing grammar data
 */
window.QuizApp = window.QuizApp || {};
window.QuizApp.grammarUtils = (function () {
  "use strict";

  /**
   * Merge grammar patterns with their metadata
   * @param {Array} patterns - Array of grammar patterns
   * @returns {Array} Patterns with metadata merged
   */
  function mergeGrammarWithMetadata(patterns) {
    const metadata = window.QuizApp.grammarMetadata;

    return patterns.map(pattern => {
      const meta = metadata.getMetadata(pattern.pattern);
      return {
        ...pattern,
        meta: meta || null
      };
    });
  }

  /**
   * Filter patterns by category
   * @param {Array} patterns - Array of grammar patterns (with meta)
   * @param {string} categoryId - Category ID
   * @returns {Array} Filtered patterns
   */
  function filterByCategory(patterns, categoryId) {
    if (!categoryId || categoryId === 'all') {
      return patterns;
    }

    return patterns.filter(p => {
      if (!p.meta || !p.meta.categories) return false;
      return p.meta.categories.includes(categoryId);
    });
  }

  /**
   * Filter patterns by function
   * @param {Array} patterns - Array of grammar patterns (with meta)
   * @param {string} functionId - Function ID
   * @returns {Array} Filtered patterns
   */
  function filterByFunction(patterns, functionId) {
    if (!functionId || functionId === 'all') {
      return patterns;
    }

    return patterns.filter(p => {
      if (!p.meta || !p.meta.functions) return false;
      return p.meta.functions.includes(functionId);
    });
  }

  /**
   * Filter patterns by JLPT level
   * @param {Array} patterns - Array of grammar patterns (with meta)
   * @param {string} level - JLPT level (N5, N4, etc.)
   * @returns {Array} Filtered patterns
   */
  function filterByJLPT(patterns, level) {
    if (!level || level === 'all') {
      return patterns;
    }

    return patterns.filter(p => {
      if (!p.meta || !p.meta.jlptLevel) return false;
      return p.meta.jlptLevel === level;
    });
  }

  /**
   * Filter patterns by lesson number
   * @param {Array} patterns - Array of grammar patterns
   * @param {number} lessonNumber - Lesson number
   * @returns {Array} Filtered patterns
   */
  function filterByLesson(patterns, lessonNumber) {
    if (!lessonNumber || lessonNumber === 'all') {
      return patterns;
    }

    return patterns.filter(p => p.lessonNumber === lessonNumber);
  }

  /**
   * Search patterns by query string
   * Searches in: pattern, vietnamese, english, explanation
   * @param {Array} patterns - Array of grammar patterns
   * @param {string} query - Search query
   * @returns {Array} Matching patterns
   */
  function searchGrammar(patterns, query) {
    if (!query || query.trim() === '') {
      return patterns;
    }

    const lowerQuery = query.toLowerCase().trim();

    return patterns.filter(p => {
      const searchableText = [
        p.pattern,
        p.vietnamese,
        p.english || '',
        p.explanation || ''
      ].join(' ').toLowerCase();

      return searchableText.includes(lowerQuery);
    });
  }

  /**
   * Get related patterns for a given pattern
   * @param {Object} pattern - Grammar pattern object (with meta)
   * @param {Array} allPatterns - All available patterns
   * @returns {Array} Related patterns
   */
  function getRelatedPatterns(pattern, allPatterns) {
    if (!pattern.meta || !pattern.meta.relatedPatterns) {
      return [];
    }

    return allPatterns.filter(p =>
      pattern.meta.relatedPatterns.includes(p.pattern)
    );
  }

  /**
   * Group patterns by lesson
   * @param {Array} patterns - Array of grammar patterns
   * @returns {Object} Object with lessonNumber as keys
   */
  function groupByLesson(patterns) {
    const grouped = {};

    patterns.forEach(pattern => {
      const lessonNum = pattern.lessonNumber;
      if (!grouped[lessonNum]) {
        grouped[lessonNum] = {
          lessonNumber: lessonNum,
          lessonTitle: pattern.lessonTitle,
          patterns: []
        };
      }
      grouped[lessonNum].patterns.push(pattern);
    });

    return grouped;
  }

  /**
   * Group patterns by category
   * @param {Array} patterns - Array of grammar patterns (with meta)
   * @returns {Object} Object with categoryId as keys
   */
  function groupByCategory(patterns) {
    const metadata = window.QuizApp.grammarMetadata;
    const grouped = {};

    // Initialize with all categories
    Object.keys(metadata.GRAMMAR_CATEGORIES).forEach(catId => {
      grouped[catId] = {
        category: metadata.GRAMMAR_CATEGORIES[catId],
        patterns: []
      };
    });

    // Add "uncategorized" for patterns without metadata
    grouped.uncategorized = {
      category: {
        id: "uncategorized",
        name: "Chưa phân loại",
        nameEn: "Uncategorized",
        icon: "❓"
      },
      patterns: []
    };

    // Group patterns
    patterns.forEach(pattern => {
      if (pattern.meta && pattern.meta.categories) {
        pattern.meta.categories.forEach(catId => {
          if (grouped[catId]) {
            grouped[catId].patterns.push(pattern);
          }
        });
      } else {
        grouped.uncategorized.patterns.push(pattern);
      }
    });

    // Remove empty categories
    Object.keys(grouped).forEach(key => {
      if (grouped[key].patterns.length === 0) {
        delete grouped[key];
      }
    });

    return grouped;
  }

  /**
   * Group patterns by function
   * @param {Array} patterns - Array of grammar patterns (with meta)
   * @returns {Object} Object with functionId as keys
   */
  function groupByFunction(patterns) {
    const metadata = window.QuizApp.grammarMetadata;
    const grouped = {};

    // Initialize with all functions
    Object.keys(metadata.GRAMMAR_FUNCTIONS).forEach(funcId => {
      grouped[funcId] = {
        function: {
          id: funcId,
          ...metadata.GRAMMAR_FUNCTIONS[funcId]
        },
        patterns: []
      };
    });

    // Add "uncategorized"
    grouped.uncategorized = {
      function: {
        id: "uncategorized",
        name: "Chưa phân loại",
        nameEn: "Uncategorized"
      },
      patterns: []
    };

    // Group patterns
    patterns.forEach(pattern => {
      if (pattern.meta && pattern.meta.functions) {
        pattern.meta.functions.forEach(funcId => {
          if (grouped[funcId]) {
            grouped[funcId].patterns.push(pattern);
          }
        });
      } else {
        grouped.uncategorized.patterns.push(pattern);
      }
    });

    // Remove empty functions
    Object.keys(grouped).forEach(key => {
      if (grouped[key].patterns.length === 0) {
        delete grouped[key];
      }
    });

    return grouped;
  }

  /**
   * Sort patterns by a specific field
   * @param {Array} patterns - Array of grammar patterns
   * @param {string} sortBy - Field to sort by (lessonNumber, pattern, etc.)
   * @param {string} order - Sort order (asc, desc)
   * @returns {Array} Sorted patterns
   */
  function sortPatterns(patterns, sortBy = 'lessonNumber', order = 'asc') {
    const sorted = [...patterns];

    sorted.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      // Handle undefined values
      if (aVal === undefined) return 1;
      if (bVal === undefined) return -1;

      // Compare
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }

  /**
   * Apply multiple filters at once
   * @param {Array} patterns - Array of grammar patterns
   * @param {Object} filters - Filter object { category, function, jlpt, lesson, search }
   * @returns {Array} Filtered patterns
   */
  function applyFilters(patterns, filters) {
    let filtered = patterns;

    if (filters.search) {
      filtered = searchGrammar(filtered, filters.search);
    }

    if (filters.category) {
      filtered = filterByCategory(filtered, filters.category);
    }

    if (filters.function) {
      filtered = filterByFunction(filtered, filters.function);
    }

    if (filters.jlpt) {
      filtered = filterByJLPT(filtered, filters.jlpt);
    }

    if (filters.lesson) {
      filtered = filterByLesson(filtered, filters.lesson);
    }

    return filtered;
  }

  /**
   * Get pattern statistics
   * @param {Array} patterns - Array of grammar patterns
   * @returns {Object} Statistics object
   */
  function getPatternStats(patterns) {
    const stats = {
      total: patterns.length,
      withMetadata: 0,
      withoutMetadata: 0,
      byJLPT: {},
      byCategory: {},
      byFunction: {},
      byLesson: {}
    };

    patterns.forEach(pattern => {
      // Metadata count
      if (pattern.meta) {
        stats.withMetadata++;

        // JLPT
        if (pattern.meta.jlptLevel) {
          stats.byJLPT[pattern.meta.jlptLevel] =
            (stats.byJLPT[pattern.meta.jlptLevel] || 0) + 1;
        }

        // Categories
        if (pattern.meta.categories) {
          pattern.meta.categories.forEach(cat => {
            stats.byCategory[cat] = (stats.byCategory[cat] || 0) + 1;
          });
        }

        // Functions
        if (pattern.meta.functions) {
          pattern.meta.functions.forEach(func => {
            stats.byFunction[func] = (stats.byFunction[func] || 0) + 1;
          });
        }
      } else {
        stats.withoutMetadata++;
      }

      // Lesson
      if (pattern.lessonNumber) {
        stats.byLesson[pattern.lessonNumber] =
          (stats.byLesson[pattern.lessonNumber] || 0) + 1;
      }
    });

    return stats;
  }

  // Public API
  return {
    mergeGrammarWithMetadata,
    filterByCategory,
    filterByFunction,
    filterByJLPT,
    filterByLesson,
    searchGrammar,
    getRelatedPatterns,
    groupByLesson,
    groupByCategory,
    groupByFunction,
    sortPatterns,
    applyFilters,
    getPatternStats
  };
})();
