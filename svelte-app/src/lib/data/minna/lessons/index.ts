/**
 * Central export for all lesson data
 * Allows tree-shaking and code splitting per lesson
 */

export { LESSON_01_DATA } from './lesson-01';
export { LESSON_02_DATA } from './lesson-02';
export { LESSON_03_DATA } from './lesson-03';
export { LESSON_04_DATA } from './lesson-04';
export { LESSON_05_DATA } from './lesson-05';
export { LESSON_06_DATA } from './lesson-06';
export { LESSON_07_DATA } from './lesson-07';
export { LESSON_08_DATA } from './lesson-08';
export { LESSON_09_DATA } from './lesson-09';
export { LESSON_10_DATA } from './lesson-10';
export { LESSON_11_DATA } from './lesson-11';
export { LESSON_12_DATA } from './lesson-12';
export { LESSON_13_DATA } from './lesson-13';
export { LESSON_14_DATA } from './lesson-14';
export { LESSON_15_DATA } from './lesson-15';
export { LESSON_16_DATA } from './lesson-16';
export { LESSON_17_DATA } from './lesson-17';
export { LESSON_18_DATA } from './lesson-18';
export { LESSON_19_DATA } from './lesson-19';
export { LESSON_20_DATA } from './lesson-20';
export { LESSON_21_DATA } from './lesson-21';
export { LESSON_22_DATA } from './lesson-22';
export { LESSON_23_DATA } from './lesson-23';
export { LESSON_24_DATA } from './lesson-25';
export { LESSON_25_DATA } from './lesson-25';

import type { LessonData } from '$lib/types';

// Helper function to get lesson by number
export function getLessonData(lessonNumber: number): LessonData | null {
  const lessons = getAllLessons();
  return lessons.find(lesson => lesson.lessonNumber === lessonNumber) || null;
}

// Get all lessons as array (use sparingly - loads all data)
export function getAllLessons(): LessonData[] {
  return [
    LESSON_01_DATA,
    LESSON_02_DATA,
    LESSON_03_DATA,
    LESSON_04_DATA,
    LESSON_05_DATA,
    LESSON_06_DATA,
    LESSON_07_DATA,
    LESSON_08_DATA,
    LESSON_09_DATA,
    LESSON_10_DATA,
    LESSON_11_DATA,
    LESSON_12_DATA,
    LESSON_13_DATA,
    LESSON_14_DATA,
    LESSON_15_DATA,
    LESSON_16_DATA,
    LESSON_17_DATA,
    LESSON_18_DATA,
    LESSON_19_DATA,
    LESSON_20_DATA,
    LESSON_21_DATA,
    LESSON_22_DATA,
    LESSON_23_DATA,
    LESSON_24_DATA,
    LESSON_25_DATA
  ];
}

// Get lesson metadata (lightweight - no vocab/grammar)
export function getLessonMetadata() {
  return getAllLessons().map(lesson => ({
    lessonNumber: lesson.lessonNumber,
    title: lesson.title,
    vocabCount: lesson.vocabulary.length,
    grammarCount: lesson.grammar.length
  }));
}
