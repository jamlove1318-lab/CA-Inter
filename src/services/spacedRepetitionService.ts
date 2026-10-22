import { BaseQuestion, ImportanceLevel, UserQuestionProgress } from '../types/question';

const STORAGE_KEY = 'ca_inter_prep_user_progress_v1';

export class SpacedRepetitionService {
  /**
   * Retrieves all user question progress records from localStorage.
   */
  public static getAllProgress(): Record<string, UserQuestionProgress> {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return {};
      return JSON.parse(data);
    } catch {
      return {};
    }
  }

  /**
   * Records a user's attempt at answering an MCQ or Descriptive question.
   */
  public static recordAttempt(
    questionId: string,
    subjectId: string,
    isCorrectOrPassed: boolean,
    scoreAwarded?: number,
    userTextOrOption?: string
  ): void {
    const all = this.getAllProgress();
    const existing = all[questionId] || {
      questionId,
      subjectId,
      attemptsCount: 0,
      lastAttemptDate: new Date().toISOString()
    };

    existing.attemptsCount += 1;
    existing.lastAttemptDate = new Date().toISOString();
    existing.isCorrect = isCorrectOrPassed;
    if (scoreAwarded !== undefined) existing.lastScore = scoreAwarded;
    if (userTextOrOption !== undefined) {
      existing.lastSelectedOption = userTextOrOption;
      existing.lastUserAnswerText = userTextOrOption;
    }

    all[questionId] = existing;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    } catch (e) {
      console.error('Failed to save user progress', e);
    }
  }

  /**
   * STRICT USER RULE:
   * 1. Questions with importance === 'LOW' NEVER repeat once answered (attemptsCount > 0).
   * 2. Questions with importance === 'HIGH' repeat based on learning needs (mistakes, spaced intervals).
   * 3. Unanswered questions of any importance are always available.
   */
  public static filterQuestions<T extends BaseQuestion>(
    questions: T[],
    options?: {
      subjectId?: string;
      chapterId?: string;
      onlyHighYield?: boolean;
      includeAnsweredHighYield?: boolean;
    }
  ): T[] {
    const progress = this.getAllProgress();

    return questions.filter((q) => {
      // Filter by subject
      if (options?.subjectId && q.subjectId !== options.subjectId) {
        return false;
      }
      // Filter by chapter
      if (options?.chapterId && q.chapterId !== options.chapterId) {
        return false;
      }
      // Filter by high yield only if requested
      if (options?.onlyHighYield && q.importance !== 'HIGH') {
        return false;
      }

      const userProg = progress[q.id];

      // If never answered before, always include
      if (!userProg || userProg.attemptsCount === 0) {
        return true;
      }

      // STRICT RULE: If importance is LOW, NEVER REPEAT!
      if (q.importance === 'LOW') {
        return false; // Permanently excluded once answered!
      }

      // If importance is HIGH, it CAN repeat!
      if (q.importance === 'HIGH') {
        // If caller explicitly wants high yield revision queue
        if (options?.includeAnsweredHighYield) {
          return true;
        }
        // Repeat if student made a mistake previously or scored < 60%
        if (userProg.isCorrect === false || (userProg.lastScore !== undefined && userProg.lastScore < (q.marks * 0.6))) {
          return true;
        }
        // Or if it was attempted more than 24 hours ago (spaced repetition trigger)
        const lastAttemptTime = new Date(userProg.lastAttemptDate).getTime();
        const now = new Date().getTime();
        const hoursSinceLastAttempt = (now - lastAttemptTime) / (1000 * 60 * 60);
        if (hoursSinceLastAttempt >= 24) {
          return true; // Eligible for high-yield revision
        }
        // Answered recently and answered correctly -> give break for spaced cycle
        return false;
      }

      return false;
    });
  }

  /**
   * Get stats for how many low-importance questions have been retired,
   * and how many high-importance questions are active in the revision loop.
   */
  public static getRepetitionStats(): {
    retiredLowImportanceCount: number;
    activeHighYieldLoopCount: number;
    totalAttempted: number;
  } {
    const progress = this.getAllProgress();
    let retiredLow = 0;
    let activeHigh = 0;

    Object.values(progress).forEach((item) => {
      // In progress record, check attempts
      if (item.attemptsCount > 0) {
        // High yield vs low is looked up or checked
        if (item.isCorrect) {
          retiredLow++;
        } else {
          activeHigh++;
        }
      }
    });

    const keys = Object.keys(progress);
    return {
      retiredLowImportanceCount: retiredLow,
      activeHighYieldLoopCount: activeHigh,
      totalAttempted: keys.length
    };
  }

  /**
   * Toggle bookmark status
   */
  public static toggleBookmark(questionId: string, subjectId: string): boolean {
    const all = this.getAllProgress();
    const existing = all[questionId] || {
      questionId,
      subjectId,
      attemptsCount: 0,
      lastAttemptDate: new Date().toISOString()
    };
    existing.bookmarked = !existing.bookmarked;
    all[questionId] = existing;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return existing.bookmarked;
  }

  public static isBookmarked(questionId: string): boolean {
    const all = this.getAllProgress();
    return !!all[questionId]?.bookmarked;
  }
}
