/**
 * Spaced Repetition System (SM-2 based)
 * Schedules review intervals based on performance
 */

import type { ProgressState, ItemProgress } from '$lib/types';
import { browser } from '$app/environment';

const SRS_KEY = 'smart_quiz_srs';

export interface SRSItem {
  itemId: string;
  lessonNumber: number;
  interval: number;      // days until next review
  easeFactor: number;    // 1.3 - 2.5
  nextReview: number;    // timestamp
  repetitions: number;
}

export interface SRSState {
  items: Record<string, SRSItem>;
}

export function loadSRS(): SRSState {
  if (!browser) return { items: {} };
  try {
    const stored = localStorage.getItem(SRS_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return { items: {} };
}

function saveSRS(state: SRSState) {
  if (!browser) return;
  localStorage.setItem(SRS_KEY, JSON.stringify(state));
}

/**
 * SM-2 algorithm: update item after review
 * quality: 0-5 (0-2 = fail, 3-5 = pass)
 */
export function reviewItem(itemId: string, lessonNumber: number, quality: number): SRSItem {
  const srs = loadSRS();
  const existing = srs.items[itemId] || {
    itemId,
    lessonNumber,
    interval: 0,
    easeFactor: 2.5,
    nextReview: Date.now(),
    repetitions: 0
  };

  let { interval, easeFactor, repetitions } = existing;

  if (quality >= 3) {
    // Correct
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions++;
  } else {
    // Incorrect — reset
    repetitions = 0;
    interval = 1;
  }

  // Update ease factor
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  easeFactor = Math.max(1.3, easeFactor);

  const updated: SRSItem = {
    itemId,
    lessonNumber,
    interval,
    easeFactor,
    nextReview: Date.now() + interval * 86400000,
    repetitions
  };

  srs.items[itemId] = updated;
  saveSRS(srs);
  return updated;
}

/**
 * Get items due for review (nextReview <= now)
 */
export function getDueItems(progressState: ProgressState): { itemId: string; lessonNumber: number }[] {
  const srs = loadSRS();
  const now = Date.now();
  const due: { itemId: string; lessonNumber: number }[] = [];

  for (const item of Object.values(srs.items)) {
    if (item.nextReview <= now) {
      due.push({ itemId: item.itemId, lessonNumber: item.lessonNumber });
    }
  }

  // Also add items from progress that haven't been added to SRS yet
  for (const [lessonKey, lesson] of Object.entries(progressState.lessons)) {
    for (const vocabId of Object.keys(lesson.vocabProgress)) {
      if (!srs.items[vocabId]) {
        due.push({ itemId: vocabId, lessonNumber: parseInt(lessonKey) });
      }
    }
  }

  return due;
}

/**
 * Count items due for review
 */
export function getDueCount(progressState: ProgressState): number {
  return getDueItems(progressState).length;
}
