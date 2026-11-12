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
  Eye,
  Hash,
  Bookmark,
  Check,
  RotateCcw
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
    initialSubjectId || 'p2_law'
  );

  // History stack for infinite questions navigation
  const [history, setHistory] = React.useState<DescriptiveQuestion[]>(() => {
    if (initialQuestion) return [initialQuestion];
    const firstQ = SpacedRepetitionService.getNextInfiniteDescriptive(
      DESCRIPTIVE_DATABASE,
      initialSubjectId || 'p2_law'
    );
    return [firstQ];
  });
  const [historyIndex, setHistoryIndex] = React.useState<number>(0);

  // Synchronize when initialQuestion is provided externally (e.g. from modal or dashboard)
  React.useEffect(() => {
    if (initialQuestion) {
      setHistory([initialQuestion]);
      setHistoryIndex(0);
      setSelectedSubjectId(initialQuestion.subjectId);
    }
  }, [initialQuestion]);

  // Synchronize when subject is changed externally from dashboard
  React.useEffect(() => {
    if (initialSubjectId && initialSubjectId !== selectedSubjectId && !initialQuestion) {
      setSelectedSubjectId(initialSubjectId);
      const nextQ = SpacedRepetitionService.getNextInfiniteDescriptive(
        DESCRIPTIVE_DATABASE,
        initialSubjectId === 'all' ? undefined : initialSubjectId
      );
      setHistory([nextQ]);
      setHistoryIndex(0);
    }
  }, [initialSubjectId]);

  const [userAnswer, setUserAnswer] = React.useState<string>('');
  const [evaluation, setEvaluation] = React.useState<EvaluationResult | null>(null);
  const [isEvaluating, setIsEvaluating] = React.useState<boolean>(false);
  const [showModelAnswer, setShowModelAnswer] = React.useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = React.useState<boolean>(false);
  const [questionsSolvedCount, setQuestionsSolvedCount] = React.useState<number>(0);

  const currentQuestion = history[historyIndex];

  // Update bookmark status when current question changes
  React.useEffect(() => {
    if (currentQuestion) {
      setIsBookmarked(SpacedRepetitionService.isBookmarked(currentQuestion.id));
    }
    setUserAnswer('');
    setEvaluation(null);
    setShowModelAnswer(false);
  }, [currentQuestion?.id]);

  // When subject changes, fetch fresh infinite question for that subject
  const handleSubjectChange = (newSubjectId: string) => {
    setSelectedSubjectId(newSubjectId);
    const nextQ = SpacedRepetitionService.getNextInfiniteDescriptive(
      DESCRIPTIVE_DATABASE,
      newSubjectId === 'all' ? undefined : newSubjectId
    );
    setHistory([nextQ]);
    setHistoryIndex(0);
  };

  // Move to next infinite question
  const handleNextQuestion = () => {
    if (historyIndex < history.length - 1) {
      // Navigate forward in existing history
      setHistoryIndex(prev => prev + 1);
    } else {
      // Generate/fetch brand new infinite question
      const nextQ = SpacedRepetitionService.getNextInfiniteDescriptive(
        DESCRIPTIVE_DATABASE,
        selectedSubjectId === 'all' ? undefined : selectedSubjectId
      );
      setHistory(prev => [...prev, nextQ]);
      setHistoryIndex(prev => prev + 1);
    }
  };

  // Move to previous question in history
  const handlePreviousQuestion = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
    }
  };

  // Evaluate the answer using EvaluatorService
  const handleEvaluate = () => {
    if (!currentQuestion || userAnswer.trim().length < 10) return;
    setIsEvaluating(true);
    
    setTimeout(() => {
      const result = EvaluatorService.evaluateAnswer(currentQuestion, userAnswer);
      setEvaluation(result);
      setIsEvaluating(false);
      setQuestionsSolvedCount(prev => prev + 1);

      if (result.percentage >= 60) {
        AudioService.playVictory();
      } else {
        AudioService.playWrong();
      }

      // Record in spaced repetition engine
      const passed = result.percentage >= 50;
      SpacedRepetitionService.recordAttempt(
        currentQuestion.id,
        currentQuestion.subjectId,
        passed,
        result.score,
        userAnswer
      );
    }, 500);
  };

  const insertTemplateHeading = (heading: string) => {
    setUserAnswer(prev => {
      const prefix = prev ? prev.trim() + '\n\n' : '';
      return `${prefix}${heading}\n`;
    });
  };

  const toggleBookmark = () => {
    if (!currentQuestion) return;
    const newState = SpacedRepetitionService.toggleBookmark(currentQuestion.id, currentQuestion.subjectId);
    setIsBookmarked(newState);
  };

  const wordCount = userAnswer.trim().split(/\s+/).filter(Boolean).length;
  const currentSubjectObj = CA_INTER_SUBJECTS.find(s => s.id === selectedSubjectId);

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      
      {/* Subject Filter Bar - Clean, Minimal Pills */}
      <div className="bg-slate-800/90 rounded-2xl border border-slate-700/80 p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-400 mr-1">Paper:</span>
          <select
            value={selectedSubjectId}
            onChange={(e) => handleSubjectChange(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs sm:text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 font-medium"
          >
            <option value="all">All 6 Papers (Mixed Practice)</option>
            {CA_INTER_SUBJECTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.code}: {s.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 font-mono text-[11px]">
              Question #{historyIndex + 1}
            </span>
            <span className="text-emerald-400 font-semibold text-[11px] hidden sm:inline">
              ⚡ Unlimited Practice
            </span>
          </div>

          <button
            onClick={onOpenGenerator}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Q</span>
          </button>
        </div>
      </div>

      {currentQuestion && (
        <div className="space-y-5">
          
          {/* Question Card */}
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-5 sm:p-6 shadow-xl space-y-4">
            
            {/* Question Meta Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-700/80">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-950 text-blue-300 border border-blue-800">
                  {currentQuestion.source}
                </span>
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {currentQuestion.marks} Marks
                </span>
                <span className="px-2.5 py-1 text-xs rounded-lg bg-slate-900 text-slate-300 border border-slate-700 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>~{Math.round(currentQuestion.marks * 1.8)} mins</span>
                </span>
                {currentQuestion.icaiReference && (
                  <span className="px-2.5 py-1 text-xs rounded-lg bg-amber-950/40 text-amber-300 border border-amber-800/40">
                    {currentQuestion.icaiReference}
                  </span>
                )}
                {currentQuestion.importance === 'HIGH' ? (
                  <span className="px-2 py-0.5 text-[10px] rounded font-bold bg-purple-950 text-purple-300 border border-purple-800">
                    High Yield (Repeats on Spaced Interval)
                  </span>
                ) : (
                  <span className="px-2 py-0.5 text-[10px] rounded font-semibold bg-slate-900 text-slate-400 border border-slate-700">
                    Low Importance (Retires once answered)
                  </span>
                )}
              </div>

              <button
                onClick={toggleBookmark}
                className={`p-2 rounded-xl border transition-all ${
                  isBookmarked
                    ? 'bg-amber-950 text-amber-400 border-amber-700'
                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                }`}
                title={isBookmarked ? 'Bookmarked' : 'Bookmark this question'}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
              </button>
            </div>

            {/* Question Text */}
            <div className="text-sm sm:text-base text-slate-100 font-medium whitespace-pre-line leading-relaxed bg-slate-900/70 p-4 sm:p-5 rounded-xl border border-slate-700/80 font-sans">
              {currentQuestion.questionText}
            </div>
          </div>

          {/* Answer Writing Canvas */}
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-5 sm:p-6 shadow-xl space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <PenTool className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                  Your Answer Writing Canvas
                </h3>
              </div>

              {/* ICAI Structured Headings Quick Inserts */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-400 font-medium mr-1 hidden md:inline">ICAI Headings:</span>
                <button
                  type="button"
                  onClick={() => insertTemplateHeading('1. APPLICABLE STATUTORY PROVISIONS / ACCOUNTING PRINCIPLES:')}
                  className="px-2 py-1 text-[11px] bg-slate-900 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 active:scale-95 transition-all"
                >
                  + Statutory Provisions
                </button>
                <button
                  type="button"
                  onClick={() => insertTemplateHeading('2. APPLICATION TO THE CASE FACTS:')}
                  className="px-2 py-1 text-[11px] bg-slate-900 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 active:scale-95 transition-all"
                >
                  + Case Application
                </button>
                <button
                  type="button"
                  onClick={() => insertTemplateHeading('WORKING NOTE 1: Detailed Calculations')}
                  className="px-2 py-1 text-[11px] bg-slate-900 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 active:scale-95 transition-all"
                >
                  + Working Note
                </button>
                <button
                  type="button"
                  onClick={() => insertTemplateHeading('3. CONCLUSION / AUDITOR OPINION:')}
                  className="px-2 py-1 text-[11px] bg-slate-900 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 active:scale-95 transition-all"
                >
                  + Conclusion
                </button>
              </div>
            </div>

            {/* Answer Textarea */}
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your complete answer here. Quote statutory sections, standard on auditing, calculation steps, and working notes..."
              rows={11}
              className="w-full bg-slate-900 text-slate-100 rounded-xl p-4 text-sm font-mono border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all leading-relaxed placeholder:text-slate-500"
            />

            {/* Footer with Stats & Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
                <span>Words: {wordCount}</span>
                <span>Characters: {userAnswer.length}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 justify-end">
                <button
                  onClick={() => setShowModelAnswer(!showModelAnswer)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition-all"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  <span>{showModelAnswer ? 'Hide Model Answer' : 'Peek Model Answer'}</span>
                </button>

                <button
                  onClick={handleEvaluate}
                  disabled={isEvaluating || userAnswer.trim().length < 10}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-40 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
                >
                  {isEvaluating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Evaluating Answer...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Evaluate with ICAI AI</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Model Answer Preview */}
          {showModelAnswer && (
            <div className="bg-slate-900 rounded-2xl border border-blue-900/60 p-5 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-blue-800/40">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span>ICAI Official Suggested Model Answer</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">Standard Benchmark</span>
              </div>
              <pre className="text-xs sm:text-sm text-slate-200 whitespace-pre-wrap font-mono leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800 max-h-96 overflow-y-auto">
                {currentQuestion.suggestedAnswer}
              </pre>
            </div>
          )}

          {/* Evaluation Report */}
          {evaluation && (
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-5 sm:p-7 shadow-2xl space-y-6">
              
              {/* Score Banner */}
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
                    <p className="text-xs text-slate-400 italic">No specific sections or accounting standards detected in answer.</p>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Missing Mandatory Citations:</span>
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
                    <p className="text-xs text-emerald-400">All required statutory citations were present!</p>
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
                        <span className="font-semibold text-xs sm:text-sm text-slate-200">
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

              {/* Working Notes Assessment */}
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

          {/* Navigation Controls - Truly Unlimited (Never disabled!) */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handlePreviousQuestion}
              disabled={historyIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs sm:text-sm font-semibold rounded-xl border border-slate-700 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Question</span>
            </button>

            <button
              onClick={handleNextQuestion}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all active:scale-95"
            >
              <span>Next Infinite Question</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
