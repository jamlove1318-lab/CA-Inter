import { BaseQuestion, ImportanceLevel, UserQuestionProgress, McqQuestion, DescriptiveQuestion } from '../types/question';
import { QuestionGeneratorService } from './questionGeneratorService';

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
   * STRICT USER RULE ENFORCED:
   * 1. Questions with importance === 'LOW' NEVER repeat once answered (attemptsCount > 0).
   * 2. Questions with importance === 'HIGH' repeat in revision.
   * 3. Unanswered questions of any importance are always available.
   */
  public static filterQuestions<T extends BaseQuestion>(
    questions: T[],
    options?: {
      subjectId?: string;
      chapterId?: string;
      onlyHighYield?: boolean;
    }
  ): T[] {
    const progress = this.getAllProgress();

    return questions.filter((q) => {
      // Filter by subject
      if (options?.subjectId && options.subjectId !== 'all' && q.subjectId !== options.subjectId) {
        return false;
      }
      // Filter by chapter
      if (options?.chapterId && options.chapterId !== 'all' && q.chapterId !== options.chapterId) {
        return false;
      }
      // Filter by high yield only if requested
      if (options?.onlyHighYield && q.importance !== 'HIGH') {
        return false;
      }

      const userProg = progress[q.id];

      // If never answered, always include!
      if (!userProg || userProg.attemptsCount === 0) {
        return true;
      }

      // STRICT RULE: If importance is LOW, NEVER REPEAT!
      if (q.importance === 'LOW') {
        return false; // Permanently excluded once answered!
      }

      // If importance is HIGH, it CAN repeat!
      return true;
    });
  }

  /**
   * Retrieves the next MCQ or automatically generates a fresh dynamic ICAI MCQ
   * so questions NEVER run out!
   */
  public static getNextInfiniteMcq(
    existingList: McqQuestion[],
    subjectId?: string,
    chapterId?: string
  ): McqQuestion {
    const filtered = this.filterQuestions(existingList, { subjectId, chapterId });
    if (filtered.length > 0) {
      // Prioritize unattempted, then high yield
      const progress = this.getAllProgress();
      const unattempted = filtered.filter(q => !progress[q.id] || progress[q.id].attemptsCount === 0);
      if (unattempted.length > 0) {
        return unattempted[Math.floor(Math.random() * unattempted.length)];
      }
      // If all filtered are attempted high yield, return one of them or generate a fresh variant
      if (Math.random() > 0.4) {
        return filtered[Math.floor(Math.random() * filtered.length)];
      }
    }
    // Generate fresh algorithmic question!
    return QuestionGeneratorService.generateDynamicMcq(subjectId);
  }

  /**
   * Retrieves the next Descriptive problem or automatically generates a fresh one
   * so descriptive problems NEVER run out!
   */
  public static getNextInfiniteDescriptive(
    existingList: DescriptiveQuestion[],
    subjectId?: string
  ): DescriptiveQuestion {
    const filtered = this.filterQuestions(existingList, { subjectId });
    if (filtered.length > 0) {
      const progress = this.getAllProgress();
      const unattempted = filtered.filter(q => !progress[q.id] || progress[q.id].attemptsCount === 0);
      if (unattempted.length > 0) {
        return unattempted[Math.floor(Math.random() * unattempted.length)];
      }
      if (Math.random() > 0.5) {
        return filtered[Math.floor(Math.random() * filtered.length)];
      }
    }
    // Generate fresh algorithmic descriptive problem!
    return QuestionGeneratorService.generateDynamicDescriptiveQuestion(subjectId);
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
      if (item.attemptsCount > 0) {
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
