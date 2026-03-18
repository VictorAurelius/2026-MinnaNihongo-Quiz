/**
 * Unit tests for quiz utilities
 */

import { describe, it, expect } from 'vitest';
import { shuffleArray, calculateStats, normalizeString } from '$lib/utils/quizUtils';

describe('Quiz Utilities', () => {
  describe('shuffleArray', () => {
    it('should return an array of the same length', () => {
      const input = [1, 2, 3, 4, 5];
      const result = shuffleArray(input);
      expect(result).toHaveLength(input.length);
    });

    it('should contain all original elements', () => {
      const input = [1, 2, 3, 4, 5];
      const result = shuffleArray(input);
      expect(result.sort()).toEqual(input.sort());
    });

    it('should not mutate the original array', () => {
      const input = [1, 2, 3, 4, 5];
      const original = [...input];
      shuffleArray(input);
      expect(input).toEqual(original);
    });

    it('should handle empty array', () => {
      const result = shuffleArray([]);
      expect(result).toEqual([]);
    });

    it('should handle single element array', () => {
      const result = shuffleArray([1]);
      expect(result).toEqual([1]);
    });
  });

  describe('calculateStats', () => {
    it('should return A for 90-100%', () => {
      expect(calculateStats(100, 100).grade).toBe('A');
      expect(calculateStats(95, 100).grade).toBe('A');
      expect(calculateStats(90, 100).grade).toBe('A');
    });

    it('should return B for 80-89%', () => {
      expect(calculateStats(89, 100).grade).toBe('B');
      expect(calculateStats(85, 100).grade).toBe('B');
      expect(calculateStats(80, 100).grade).toBe('B');
    });

    it('should return C for 70-79%', () => {
      expect(calculateStats(79, 100).grade).toBe('C');
      expect(calculateStats(75, 100).grade).toBe('C');
      expect(calculateStats(70, 100).grade).toBe('C');
    });

    it('should return D for 60-69%', () => {
      expect(calculateStats(69, 100).grade).toBe('D');
      expect(calculateStats(65, 100).grade).toBe('D');
      expect(calculateStats(60, 100).grade).toBe('D');
    });

    it('should return F for below 60%', () => {
      expect(calculateStats(59, 100).grade).toBe('F');
      expect(calculateStats(30, 100).grade).toBe('F');
      expect(calculateStats(0, 100).grade).toBe('F');
    });

    it('should handle edge cases', () => {
      expect(calculateStats(0, 0).grade).toBe('F');
      expect(calculateStats(10, 10).grade).toBe('A');
    });

    it('should calculate percentage correctly', () => {
      expect(calculateStats(8, 10).percentage).toBe(80);
      expect(calculateStats(7, 10).percentage).toBe(70);
    });

    it('should calculate wrong count correctly', () => {
      expect(calculateStats(8, 10).wrong).toBe(2);
      expect(calculateStats(7, 10).wrong).toBe(3);
    });
  });

  describe('normalizeString', () => {
    it('should trim whitespace', () => {
      expect(normalizeString('  hello  ')).toBe('hello');
    });

    it('should convert to lowercase', () => {
      expect(normalizeString('HELLO')).toBe('hello');
      expect(normalizeString('HeLLo')).toBe('hello');
    });

    it('should handle empty strings', () => {
      expect(normalizeString('')).toBe('');
      expect(normalizeString('   ')).toBe('');
    });

    it('should preserve Japanese characters', () => {
      expect(normalizeString('こんにちは')).toBe('こんにちは');
      expect(normalizeString(' こんにちは ')).toBe('こんにちは');
    });

    it('should remove spaces from content', () => {
      expect(normalizeString('  Hello World  ')).toBe('helloworld');
    });
  });
});
