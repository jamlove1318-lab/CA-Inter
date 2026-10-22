import React from 'react';
import { 
  PenTool, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Clock, 
  Sparkles, 
  RefreshCw, 
  BookOpen, 
  Award, 
  ChevronRight, 
  ChevronLeft,
  Columns,
  Eye,
  Hash
} from 'lucide-react';
import { CA_INTER_SUBJECTS } from '../data/subjectsData';
import { DESCRIPTIVE_DATABASE } from '../data/questionsData';
import { DescriptiveQuestion, EvaluationResult } from '../types/question';
import { EvaluatorService } from '../services/evaluatorService';
import { SpacedRepetitionService } from '../services/spacedRepetitionService';
import { AudioService } from '../services/audioService';

interface DescriptiveWriterProps {
  initialSubjectId?: string;
  initialQuestion?: DescriptiveQuestion;
  onOpenGenerator: () => void;
}

export const DescriptiveWriter: React.FC<DescriptiveWriterProps> = ({
  initialSubjectId,
  initialQuestion,
  onOpenGenerator
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = React.useState<string>(
    initialSubjectId || CA_INTER_SUBJECTS[1].id // Default to Law (P2)
  );
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [userAnswer, setUserAnswer] = React.useState<string>('');
  const [evaluation, setEvaluation] = React.useState<EvaluationResult | null>(null);
  const [isEvaluating, setIsEvaluating] = React.useState<boolean>(false);
  const [showModelAnswer, setShowModelAnswer] = React.useState<boolean>(false);
  const [viewMode, setViewMode] = React.useState<'single' | 'split'>('single');

  // Filter available descriptive questions
  const availableQuestions = React.useMemo(() => {
    return SpacedRepetitionService.filterQuestions(DESCRIPTIVE_DATABASE, {
      subjectId: selectedSubjectId === 'all' ? undefined : selectedSubjectId
    });
  }, [selectedSubjectId]);

  const currentQuestion: DescriptiveQuestion | undefined = initialQuestion || availableQuestions[currentIndex];

  React.useEffect(() => {
    setUserAnswer('');
    setEvaluation(null);
    setShowModelAnswer(false);
  }, [currentIndex, selectedSubjectId]);

  const handleEvaluate = () => {
    if (!currentQuestion) return;
    setIsEvaluating(true);
    
    // Simulate slight analysis delay for rich UX
    setTimeout(() => {
      const result = EvaluatorService.evaluateAnswer(currentQuestion, userAnswer);
      setEvaluation(result);
      setIsEvaluating(false);

      if (result.percentage >= 60) {
        AudioService.playVictory();
      } else {
        AudioService.playWrong();
      }

      // Record progress in spaced repetition system
      const passed = result.percentage >= 50;
      SpacedRepetitionService.recordAttempt(
        currentQuestion.id,
        currentQuestion.subjectId,
        passed,
        result.score,
        userAnswer
      );
    }, 600);
  };

  const insertTemplateHeading = (heading: string) => {
    setUserAnswer(prev => {
      const prefix = prev ? prev + '\n\n' : '';
      return `${prefix}${heading}\n`;
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Subject Filter & Switcher Bar */}
      <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-xs font-semibold text-slate-400">Subject:</label>
          <select
            value={selectedSubjectId}
            onChange={(e) => {
              setSelectedSubjectId(e.target.value);
              setCurrentIndex(0);
            }}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500 font-medium"
          >
            <option value="all">All Subjects</option>
            {CA_INTER_SUBJECTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.code}: {s.title}
              </option>
            ))}
          </select>

          <span className="text-xs text-slate-400">
            {availableQuestions.length} descriptive questions available
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenGenerator}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white text-xs font-semibold rounded-lg shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate New ICAI Question</span>
          </button>
        </div>
      </div>

      {currentQuestion ? (
        <div className="space-y-6">
          
          {/* Question Card */}
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-700/80">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-950 text-blue-300 border border-blue-800">
                  {currentQuestion.source}
                </span>
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {currentQuestion.marks} Marks
                </span>
                <span className="px-2.5 py-1 text-xs rounded-lg bg-slate-900 text-slate-300 border border-slate-700">
                  Suggested Time: ~{Math.round(currentQuestion.marks * 1.8)} Mins
                </span>
                {currentQuestion.icaiReference && (
                  <span className="px-2.5 py-1 text-xs rounded-lg bg-amber-950/40 text-amber-300 border border-amber-800/40">
                    Ref: {currentQuestion.icaiReference}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span>Q {currentIndex + 1} of {availableQuestions.length}</span>
              </div>
            </div>

            <div className="text-sm sm:text-base text-slate-100 font-medium whitespace-pre-line leading-relaxed font-serif bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              {currentQuestion.questionText}
            </div>
          </div>

          {/* Answer Writing Area & Evaluator */}
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <PenTool className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Your Answer Writing Canvas
                </h3>
              </div>

              {/* Formatting Quick Inserts */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-400 font-medium mr-1 hidden sm:inline">Insert Headings:</span>
                <button
                  type="button"
                  onClick={() => insertTemplateHeading('1. APPLICABLE STATUTORY PROVISIONS:')}
                  className="px-2 py-1 text-[11px] bg-slate-900 hover:bg-slate-700 text-slate-300 rounded border border-slate-700"
                >
                  + Statutory Provisions
                </button>
                <button
                  type="button"
                  onClick={() => insertTemplateHeading('2. APPLICATION TO THE CASE:')}
                  className="px-2 py-1 text-[11px] bg-slate-900 hover:bg-slate-700 text-slate-300 rounded border border-slate-700"
                >
                  + Case Application
                </button>
                <button
                  type="button"
                  onClick={() => insertTemplateHeading('WORKING NOTE 1: Computation of ...')}
                  className="px-2 py-1 text-[11px] bg-slate-900 hover:bg-slate-700 text-slate-300 rounded border border-slate-700"
                >
                  + Working Note
                </button>
                <button
                  type="button"
                  onClick={() => insertTemplateHeading('3. CONCLUSION:')}
                  className="px-2 py-1 text-[11px] bg-slate-900 hover:bg-slate-700 text-slate-300 rounded border border-slate-700"
                >
                  + Conclusion
                </button>
              </div>
            </div>

            {/* Answer Textarea */}
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your complete ICAI exam answer here. Quote statutory sections, standard on auditing, calculation steps, and working notes..."
              rows={12}
              className="w-full bg-slate-900 text-slate-100 rounded-xl p-4 text-sm font-mono border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all leading-relaxed"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
                <span>Words: {userAnswer.trim().split(/\s+/).filter(Boolean).length}</span>
                <span>Characters: {userAnswer.length}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowModelAnswer(!showModelAnswer)}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition-all"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  <span>{showModelAnswer ? 'Hide Model Answer' : 'Peek Model Answer'}</span>
                </button>

                <button
                  onClick={handleEvaluate}
                  disabled={isEvaluating || userAnswer.trim().length < 10}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-40 disabled:hover:from-emerald-600 disabled:hover:to-teal-600 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02]"
                >
                  {isEvaluating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Evaluating Answer...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Evaluate with ICAI AI Engine</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Model Answer Preview if toggled */}
          {showModelAnswer && (
            <div className="bg-slate-900/90 rounded-2xl border border-blue-900/60 p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-blue-800/40">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span>ICAI Official Suggested Model Answer</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">Reference Benchmark</span>
              </div>
              <pre className="text-xs sm:text-sm text-slate-200 whitespace-pre-wrap font-mono leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800 max-h-96 overflow-y-auto">
                {currentQuestion.suggestedAnswer}
              </pre>
            </div>
          )}

          {/* Detailed Evaluation Report */}
          {evaluation && (
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in duration-300">
              
              {/* Header Score Banner */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl bg-slate-900 border border-slate-700/80">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    ICAI Step-Marking Evaluation Result
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white">
                      {evaluation.score} <span className="text-lg text-slate-400">/ {evaluation.maxMarks}</span>
                    </span>
                    <span className="text-lg font-bold text-amber-400">
                      ({evaluation.percentage}%)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border ${
                    evaluation.percentage >= 75
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                      : evaluation.percentage >= 60
                      ? 'bg-blue-950 text-blue-300 border-blue-700'
                      : evaluation.percentage >= 40
                      ? 'bg-amber-950 text-amber-300 border-amber-700'
                      : 'bg-rose-950 text-rose-300 border-rose-700'
                  }`}>
                    Grade: {evaluation.grade}
                  </span>
                </div>
              </div>

              {/* Citations Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Statutory Citations Detected:</span>
                  </div>
                  {evaluation.citationsDetected.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {evaluation.citationsDetected.map((c, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 text-xs border border-emerald-800 font-mono">
                          {c}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No specific sections/standards detected in answer.</p>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Missing Key Citations:</span>
                  </div>
                  {evaluation.citationsMissing.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {evaluation.citationsMissing.map((c, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 text-xs border border-amber-800 font-mono">
                          {c}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-emerald-400">All mandatory statutory citations were cited!</p>
                  )}
                </div>
              </div>

              {/* Step Marking Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Step-by-Step Marking Rubric:
                </h4>
                <div className="space-y-3">
                  {evaluation.stepMarks.map((step, idx) => (
                    <div key={idx} className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-slate-200">
                          {idx + 1}. {step.step}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold font-mono ${
                          step.awarded === step.max
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : step.awarded > 0
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}>
                          {step.awarded} / {step.max} Marks
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{step.feedback}</p>

                      {/* Keywords breakdown */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                        {step.matchedKeywords.length > 0 && (
                          <div className="flex items-center gap-1 text-emerald-400">
                            <span className="font-semibold">Found:</span>
                            <span>{step.matchedKeywords.join(', ')}</span>
                          </div>
                        )}
                        {step.missingKeywords.length > 0 && (
                          <div className="flex items-center gap-1 text-rose-400">
                            <span className="font-semibold">Missed:</span>
                            <span>{step.missingKeywords.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Working Notes & Presentation Advice */}
              <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-800/40 space-y-2">
                <div className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                  Working Notes & Presentation Assessment:
                </div>
                <p className="text-xs sm:text-sm text-blue-200/90 leading-relaxed">
                  {evaluation.workingNotesFeedback}
                </p>
              </div>

              {/* Examiner Tips */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  ICAI Examiner Specific Tips:
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                  {evaluation.examinerTips.map((tip, idx) => (
                    <li key={idx} className="leading-relaxed">{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="flex items-center gap-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Question</span>
            </button>

            <button
              onClick={() => setCurrentIndex(prev => Math.min(availableQuestions.length - 1, prev + 1))}
              disabled={currentIndex >= availableQuestions.length - 1}
              className="flex items-center gap-1 px-5 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-semibold rounded-xl shadow-md transition-all"
            >
              <span>Next Question</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-12 text-center space-y-4">
          <Award className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="text-xl font-bold text-white">No Questions in this Selection</h3>
          <p className="text-sm text-slate-400">Generate a custom ICAI question or pick another subject.</p>
          <button
            onClick={onOpenGenerator}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl"
          >
            Generate Unlimited Qs
          </button>
        </div>
      )}
    </div>
  );
};
