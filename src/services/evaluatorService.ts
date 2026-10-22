import { DescriptiveQuestion, EvaluationResult } from '../types/question';

export class EvaluatorService {
  /**
   * Evaluates student's descriptive answer against ICAI rubrics, statutory citations,
   * technical keywords, numerical calculations, and working notes.
   */
  public static evaluateAnswer(question: DescriptiveQuestion, userAnswerText: string): EvaluationResult {
    const cleanUserText = userAnswerText.trim().toLowerCase();
    
    // Check if empty
    if (!cleanUserText || cleanUserText.length < 15) {
      return {
        score: 0,
        maxMarks: question.marks,
        percentage: 0,
        grade: 'Needs Improvement',
        stepMarks: question.rubrics.map(r => ({
          step: r.step,
          awarded: 0,
          max: r.marks,
          feedback: 'No substantial content provided for this step.',
          matchedKeywords: [],
          missingKeywords: r.expectedKeywords
        })),
        citationsDetected: [],
        citationsMissing: question.rubrics.flatMap(r => r.mandatoryCitations || []),
        workingNotesFeedback: 'Working notes were not provided or too brief.',
        examinerTips: [
          'ICAI requires detailed answers with proper headings, step-by-step working notes, and relevant legal/accounting citations.',
          'Start with the applicable Section or Standard (e.g., As per Section... / In accordance with AS...).'
        ],
        modelAnswer: question.suggestedAnswer
      };
    }

    let totalAwarded = 0;
    const allDetectedCitations: string[] = [];
    const allMissingCitations: string[] = [];

    const stepMarks = question.rubrics.map((rubric) => {
      let stepScore = 0;
      const matchedKeywords: string[] = [];
      const missingKeywords: string[] = [];

      // Check keywords
      rubric.expectedKeywords.forEach((kw) => {
        const kwLower = kw.toLowerCase();
        // check partial or exact token match
        if (cleanUserText.includes(kwLower) || this.fuzzyContains(cleanUserText, kwLower)) {
          matchedKeywords.push(kw);
        } else {
          missingKeywords.push(kw);
        }
      });

      // Check mandatory citations if any
      let citationBonus = 0;
      let citationMissingFlag = false;
      if (rubric.mandatoryCitations && rubric.mandatoryCitations.length > 0) {
        rubric.mandatoryCitations.forEach((cit) => {
          const citClean = cit.toLowerCase().replace(/[^a-z0-9]/g, '');
          const textClean = cleanUserText.replace(/[^a-z0-9]/g, '');
          if (textClean.includes(citClean)) {
            allDetectedCitations.push(cit);
            citationBonus += 0.5;
          } else {
            allMissingCitations.push(cit);
            citationMissingFlag = true;
          }
        });
      }

      // Keyword match ratio
      const matchRatio = matchedKeywords.length / Math.max(rubric.expectedKeywords.length, 1);

      // Scoring rubric
      if (matchRatio >= 0.7) {
        stepScore = rubric.marks;
      } else if (matchRatio >= 0.45) {
        stepScore = Math.round((rubric.marks * 0.75) * 2) / 2;
      } else if (matchRatio >= 0.25) {
        stepScore = Math.round((rubric.marks * 0.45) * 2) / 2;
      } else if (matchedKeywords.length > 0) {
        stepScore = Math.max(0.5, Math.round((rubric.marks * 0.25) * 2) / 2);
      } else {
        stepScore = 0;
      }

      // If citation was mandatory and missing, cap at 75% for this step
      if (citationMissingFlag && stepScore > rubric.marks * 0.75) {
        stepScore = Math.round((rubric.marks * 0.75) * 2) / 2;
      }

      // Ensure does not exceed max for step
      stepScore = Math.min(rubric.marks, stepScore);
      totalAwarded += stepScore;

      let feedback = '';
      if (stepScore === rubric.marks) {
        feedback = 'Full marks! Accurate technical presentation and thorough coverage.';
      } else if (stepScore >= rubric.marks * 0.6) {
        feedback = 'Good coverage. Could be improved by including specific statutory terms and exact numbers.';
      } else if (stepScore > 0) {
        feedback = 'Partially correct. Lacks critical ICAI technical keywords or computation steps.';
      } else {
        feedback = 'Key concept omitted or not adequately addressed in this section.';
      }

      return {
        step: rubric.step,
        awarded: stepScore,
        max: rubric.marks,
        feedback,
        matchedKeywords,
        missingKeywords
      };
    });

    // Formatting & Working Notes analysis
    const hasWorkingNotes = cleanUserText.includes('working note') || cleanUserText.includes('working:') || cleanUserText.includes('wn');
    let workingNotesFeedback = '';
    if (question.subjectId === 'p4_costing' || question.subjectId === 'p6_fm_sm' || question.subjectId === 'p1_adv_acc') {
      if (hasWorkingNotes) {
        workingNotesFeedback = 'Excellent! You explicitly structured your calculations with Working Notes. ICAI evaluators award up to 20-30% of question marks specifically for Working Notes.';
      } else {
        workingNotesFeedback = 'ICAI Examiner Tip: Always label your calculations clearly as "Working Note 1", "Working Note 2". Showing intermediate formulas carries step marks even if the final calculation has arithmetic errors.';
      }
    } else {
      workingNotesFeedback = 'Answer contains relevant factual application and legal argumentation.';
    }

    const percentage = Math.round((totalAwarded / question.marks) * 100);
    let grade: 'Excellent' | 'Good - Safe Pass' | 'Borderline' | 'Needs Improvement' = 'Needs Improvement';
    if (percentage >= 75) grade = 'Excellent';
    else if (percentage >= 60) grade = 'Good - Safe Pass';
    else if (percentage >= 40) grade = 'Borderline';

    // Examiner Tips tailored to student's answer
    const examinerTips: string[] = [];
    if (allMissingCitations.length > 0) {
      examinerTips.push(`You missed citing key statutory sections/standards: ${Array.from(new Set(allMissingCitations)).join(', ')}. Citing the exact Section or SA in the first sentence immediately secures examiner goodwill.`);
    }
    if (percentage < 60) {
      examinerTips.push('Underline or bullet point key conclusions, figures, and legal doctrines to assist the evaluator in fast step-marking.');
    }
    if (userAnswerText.length < 250) {
      examinerTips.push('Your answer is on the shorter side for this weightage. In ICAI exams, elaborate on the statutory principle, apply it to the scenario, and state a definite conclusion.');
    } else {
      examinerTips.push('Good answer length and depth. Ensure handwriting is legible and calculations are cleanly boxed in actual ICAI answer sheets.');
    }

    return {
      score: totalAwarded,
      maxMarks: question.marks,
      percentage,
      grade,
      stepMarks,
      citationsDetected: Array.from(new Set(allDetectedCitations)),
      citationsMissing: Array.from(new Set(allMissingCitations)),
      workingNotesFeedback,
      examinerTips,
      modelAnswer: question.suggestedAnswer
    };
  }

  private static fuzzyContains(text: string, keyword: string): boolean {
    const words = keyword.split(' ');
    if (words.length <= 1) return false;
    // If at least 70% of words in the phrase are found in text in close proximity
    const matchedCount = words.filter(w => text.includes(w)).length;
    return (matchedCount / words.length) >= 0.7;
  }
}
