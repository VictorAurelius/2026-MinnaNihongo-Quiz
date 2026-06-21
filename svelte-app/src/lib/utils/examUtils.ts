/**
 * Exam (mock JLPT) scoring + attempt persistence.
 *
 * Pure scoring (`computeExamResult`) is fully testable without a DOM.
 * Attempt persistence mirrors the `progressUtils`/`srsUtils` localStorage
 * pattern: `browser` guard + try/catch so it is a no-op (and never throws)
 * during SSR/prerender or when storage is unavailable.
 */

import { browser } from '$app/environment';
import type {
  ExamPaper,
  ExamAttempt,
  ExamResult,
  ExamSectionResult,
  ExamSectionType
} from '$lib/types/exam';

/** localStorage key for saved exam attempts. */
const ATTEMPTS_KEY = 'smart_quiz_exam_attempts';

/** JLPT-style overall pass threshold (percentage). */
export const PASS_PERCENT = 60;

/** Short Vietnamese label for each section type (used by list + result UIs). */
const SECTION_TYPE_LABELS: Record<ExamSectionType, string> = {
  vocab: 'Từ vựng',
  grammar: 'Ngữ pháp',
  reading: 'Đọc hiểu',
  listening: 'Nghe'
};

/** Human-readable section-type label, falling back to the raw key. */
export function sectionTypeLabel(type: ExamSectionType): string {
  return SECTION_TYPE_LABELS[type] ?? type;
}

/**
 * Score a finished paper against the user's answers.
 *
 * @param paper            the full exam paper
 * @param answers          map of questionId -> chosen option index
 * @param durationSeconds  optional time spent, stored on the result
 *
 * Per-section correct/total are preserved in paper order. A missing answer
 * (no entry in `answers`) counts as incorrect. Overall pass is `>= 60%`.
 */
export function computeExamResult(
  paper: ExamPaper,
  answers: Record<string, number>,
  durationSeconds?: number
): ExamResult {
  const sections: ExamSectionResult[] = paper.sections.map((section) => {
    const total = section.questions.length;
    const correct = section.questions.reduce(
      (n, q) => (answers[q.id] === q.answerIndex ? n + 1 : n),
      0
    );
    return { type: section.type, correct, total };
  });

  const total = sections.reduce((n, s) => n + s.total, 0);
  const correct = sections.reduce((n, s) => n + s.correct, 0);
  const scorePercent = total > 0 ? Math.round((correct / total) * 100) : 0;

  return {
    correct,
    total,
    scorePercent,
    passed: scorePercent >= PASS_PERCENT,
    sections,
    ...(durationSeconds !== undefined ? { durationSeconds } : {})
  };
}

/** All saved attempts (newest first), or `[]` when unavailable. */
export function getAttempts(): ExamAttempt[] {
  if (!browser) return [];
  try {
    const stored = localStorage.getItem(ATTEMPTS_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? (parsed as ExamAttempt[]) : [];
  } catch {
    return [];
  }
}

/** Persist one attempt (prepended so newest is first). No-op off-browser. */
export function saveAttempt(attempt: ExamAttempt): void {
  if (!browser) return;
  try {
    const attempts = getAttempts();
    attempts.unshift(attempt);
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
  } catch {
    /* ignore — storage full / disabled */
  }
}

/** Saved attempts for a single paper (newest first). */
export function getAttemptsForPaper(paperId: string): ExamAttempt[] {
  return getAttempts().filter((a) => a.paperId === paperId);
}
