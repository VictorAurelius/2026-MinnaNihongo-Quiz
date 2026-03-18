/**
 * Unit tests for quiz utilities
 */

import { describe, it, expect } from 'vitest';
import { shuffleArray, calculateGrade, normalizeAnswer } from './quizUtils';

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

  describe('calculateGrade', () => {
    it('should return A for 90-100%', () => {
      expect(calculateGrade(100, 100)).toBe('A');
      expect(calculateGrade(95, 100)).toBe('A');
      expect(calculateGrade(90, 100)).toBe('A');
    });

    it('should return B for 80-89%', () => {
      expect(calculateGrade(89, 100)).toBe('B');
      expect(calculateGrade(85, 100)).toBe('B');
      expect(calculateGrade(80, 100)).toBe('B');
    });

    it('should return C for 70-79%', () => {
      expect(calculateGrade(79, 100)).toBe('C');
      expect(calculateGrade(75, 100)).toBe('C');
      expect(calculateGrade(70, 100)).toBe('C');
    });

    it('should return D for 60-69%', () => {
      expect(calculateGrade(69, 100)).toBe('D');
      expect(calculateGrade(65, 100)).toBe('D');
      expect(calculateGrade(60, 100)).toBe('D');
    });

    it('should return F for below 60%', () => {
      expect(calculateGrade(59, 100)).toBe('F');
      expect(calculateGrade(30, 100)).toBe('F');
      expect(calculateGrade(0, 100)).toBe('F');
    });

    it('should handle edge cases', () => {
      expect(calculateGrade(0, 0)).toBe('F');
      expect(calculateGrade(10, 10)).toBe('A');
    });
  });

  describe('normalizeAnswer', () => {
    it('should trim whitespace', () => {
      expect(normalizeAnswer('  hello  ')).toBe('hello');
    });

    it('should convert to lowercase', () => {
      expect(normalizeAnswer('HELLO')).toBe('hello');
      expect(normalizeAnswer('HeLLo')).toBe('hello');
    });

    it('should handle empty strings', () => {
      expect(normalizeAnswer('')).toBe('');
      expect(normalizeAnswer('   ')).toBe('');
    });

    it('should preserve Japanese characters', () => {
      expect(normalizeAnswer('こんにちは')).toBe('こんにちは');
      expect(normalizeAnswer(' こんにちは ')).toBe('こんにちは');
    });

    it('should normalize mixed content', () => {
      expect(normalizeAnswer('  Hello World  ')).toBe('hello world');
    });
  });
});
