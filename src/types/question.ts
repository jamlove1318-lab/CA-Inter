export type QuestionType = 'mcq' | 'descriptive' | 'case_study';
export type ImportanceLevel = 'HIGH' | 'LOW';
export type MasteryTier = 'beginner' | 'intermediate' | 'hard';

export interface EvaluationRubric {
  step: string;
  marks: number;
  expectedKeywords: string[];
  mandatoryCitations?: string[]; // e.g. "Section 135", "SA 500", "AS 16"
  description: string;
}

export interface BaseQuestion {
  id: string;
  subjectId: string;
  chapterId: string;
  type: QuestionType;
  importance: ImportanceLevel; // Rule: HIGH repeats, LOW never repeats once answered
  source: string; // e.g. "May 2024 Exam - 6 Marks", "RTP Nov 2023", "MTP Series 1 2024"
  sourceYear?: string;
  marks: number;
  questionText: string;
  explanation?: string;
  difficulty: 'Beginner / Foundation' | 'Standard ICAI' | 'Tough / Tricky' | 'Examiner Favorite';
  masteryTier?: MasteryTier;
  icaiReference?: string; // e.g. "Sec 135(1) Companies Act, 2013", "AS 10 PPE Para 14"
}

export interface McqQuestion extends BaseQuestion {
  type: 'mcq';
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  trapNote?: string; // Common trap student makes
  caseScenarioId?: string; // Linked case study if any
}

export interface DescriptiveQuestion extends BaseQuestion {
  type: 'descriptive';
  subQuestions?: {
    id: string;
    subText: string;
    marks: number;
    suggestedAnswer: string;
    rubrics: EvaluationRubric[];
  }[];
  suggestedAnswer: string;
  workingNotes?: string[];
  rubrics: EvaluationRubric[];
}

export interface CaseStudyQuestion {
  id: string;
  subjectId: string;
  chapterId: string;
  title: string;
  source: string;
  importance: ImportanceLevel;
  scenarioText: string;
  totalMarks: number;
  mcqs: McqQuestion[];
  descriptiveQuestions: DescriptiveQuestion[];
}

export interface EvaluationResult {
  score: number;
  maxMarks: number;
  percentage: number;
  grade: 'Excellent' | 'Good - Safe Pass' | 'Borderline' | 'Needs Improvement';
  stepMarks: {
    step: string;
    awarded: number;
    max: number;
    feedback: string;
    matchedKeywords: string[];
    missingKeywords: string[];
  }[];
  citationsDetected: string[];
  citationsMissing: string[];
  workingNotesFeedback: string;
  examinerTips: string[];
  modelAnswer: string;
}

export interface UserQuestionProgress {
  questionId: string;
  subjectId: string;
  attemptsCount: number;
  lastAttemptDate: string;
  lastScore?: number;
  lastSelectedOption?: string;
  lastUserAnswerText?: string;
  isCorrect?: boolean;
  bookmarked?: boolean;
}
