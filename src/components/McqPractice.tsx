import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Bookmark, 
  ChevronRight, 
  ChevronLeft, 
  Filter, 
  AlertCircle, 
  Sparkles, 
  RefreshCw,
  Clock,
  BookOpen,
  Award
} from 'lucide-react';
import { CA_INTER_SUBJECTS } from '../data/subjectsData';
import { MCQS_DATABASE } from '../data/questionsData';
import { McqQuestion } from '../types/question';
import { SpacedRepetitionService } from '../services/spacedRepetitionService';
import { AudioService } from '../services/audioService';

interface McqPracticeProps {
  initialSubjectId?: string;
  onOpenGenerator: () => void;
}

export const McqPractice: React.FC<McqPracticeProps> = ({
  initialSubjectId,
  onOpenGenerator
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = React.useState<string>(
    initialSubjectId || CA_INTER_SUBJECTS[0].id
  );
  const [selectedChapterId, setSelectedChapterId] = React.useState<string>('all');
  const [onlyHighYield, setOnlyHighYield] = React.useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = React.useState<string | null>(null);
  const [showExplanation, setShowExplanation] = React.useState<boolean>(false);
  const [bookmarked, setBookmarked] = React.useState<boolean>(false);

  // Filter questions using the STRICT user repetition rule:
  // Low importance never repeats once answered; High importance repeats based on review needs
  const availableQuestions = React.useMemo(() => {
    return SpacedRepetitionService.filterQuestions(MCQS_DATABASE, {
      subjectId: selectedSubjectId === 'all' ? undefined : selectedSubjectId,
      chapterId: selectedChapterId === 'all' ? undefined : selectedChapterId,
      onlyHighYield
    });
  }, [selectedSubjectId, selectedChapterId, onlyHighYield]);

  const currentQuestion: McqQuestion | undefined = availableQuestions[currentIndex];

  React.useEffect(() => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setShowExplanation(false);
  }, [selectedSubjectId, selectedChapterId, onlyHighYield]);

  React.useEffect(() => {
    if (currentQuestion) {
      setBookmarked(SpacedRepetitionService.isBookmarked(currentQuestion.id));
      setSelectedOptionId(null);
      setShowExplanation(false);
    }
  }, [currentQuestion]);

  const handleSelectOption = (optId: string) => {
    if (selectedOptionId !== null || !currentQuestion) return; // already answered
    setSelectedOptionId(optId);
    setShowExplanation(true);

    const isCorrect = optId === currentQuestion.correctOptionId;
    if (isCorrect) {
      AudioService.playCorrect();
    } else {
      AudioService.playWrong();
    }

    // Record attempt in Spaced Repetition engine
    SpacedRepetitionService.recordAttempt(
      currentQuestion.id,
      currentQuestion.subjectId,
      isCorrect,
      isCorrect ? currentQuestion.marks : 0,
      optId
    );
  };

  const handleToggleBookmark = () => {
    if (!currentQuestion) return;
    const newState = SpacedRepetitionService.toggleBookmark(currentQuestion.id, currentQuestion.subjectId);
    setBookmarked(newState);
  };

  const currentSubject = CA_INTER_SUBJECTS.find(s => s.id === selectedSubjectId);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      
      {/* Control Filters Bar */}
      <div className="bg-slate-800/90 rounded-2xl border border-slate-700/80 p-4 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Subject Selector */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">Subject:</label>
              <select
                value={selectedSubjectId}
                onChange={(e) => {
                  setSelectedSubjectId(e.target.value);
                  setSelectedChapterId('all');
                }}
                className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500 font-medium"
              >
                <option value="all">All Subjects (6 Papers)</option>
                {CA_INTER_SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.code}: {s.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Chapter Selector */}
            {currentSubject && (
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Chapter:</label>
                <select
                  value={selectedChapterId}
                  onChange={(e) => setSelectedChapterId(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500 font-medium max-w-xs"
                >
                  <option value="all">All Chapters</option>
                  {currentSubject.chapters.map((ch) => (
                    <option key={ch.id} value={ch.id}>
                      [{ch.category}] {ch.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Repetition Rule Indicator & Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOnlyHighYield(!onlyHighYield)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                onlyHighYield
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>High-Yield Only</span>
            </button>

            <button
              onClick={onOpenGenerator}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
            >
              <span>+ Generate Unlimited Qs</span>
            </button>
          </div>
        </div>

        {/* Repetition Engine Active Notice */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-700/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>
              <strong>Rule Active:</strong> Important questions repeat in your revision loop; less important questions are retired permanently.
            </span>
          </div>
          <div>
            Showing <strong>{availableQuestions.length}</strong> available questions
          </div>
        </div>
      </div>

      {/* Main MCQ Card */}
      {currentQuestion ? (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-700/70">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-950 text-blue-300 border border-blue-800/70">
                {currentQuestion.source}
              </span>
              <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-900 text-slate-300 border border-slate-700">
                {currentQuestion.marks} Marks
              </span>
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg border ${
                currentQuestion.importance === 'HIGH'
                  ? 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}>
                {currentQuestion.importance === 'HIGH' ? '⭐ High Yield (Repeats)' : 'One-Off (Retires once answered)'}
              </span>
              <span className="px-2.5 py-1 text-xs rounded-lg bg-slate-900 text-slate-400 border border-slate-800">
                {currentQuestion.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-mono">
                Q {currentIndex + 1} of {availableQuestions.length}
              </span>
              <button
                onClick={handleToggleBookmark}
                className={`p-1.5 rounded-lg border transition-colors ${
                  bookmarked
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/60'
                    : 'text-slate-400 border-slate-700 hover:text-white'
                }`}
                title="Bookmark for Quick Revision"
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed font-serif">
            {currentQuestion.questionText}
          </div>

          {/* Options List */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isSelected = selectedOptionId === opt.id;
              const isCorrectOption = opt.id === currentQuestion.correctOptionId;
              
              let optionStyle = 'border-slate-700/80 bg-slate-900/60 hover:bg-slate-700/60 text-slate-200';
              if (selectedOptionId !== null) {
                if (isCorrectOption) {
                  optionStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 shadow-md shadow-emerald-900/20';
                } else if (isSelected) {
                  optionStyle = 'border-rose-500 bg-rose-950/40 text-rose-200';
                } else {
                  optionStyle = 'border-slate-800 bg-slate-900/30 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={selectedOptionId !== null}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 text-sm sm:text-base ${optionStyle}`}
                >
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border ${
                    selectedOptionId !== null && isCorrectOption
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : selectedOptionId !== null && isSelected
                      ? 'bg-rose-600 text-white border-rose-500'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}>
                    {letter}
                  </span>
                  <span className="flex-1 pt-0.5">{opt.text}</span>
                  {selectedOptionId !== null && isCorrectOption && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {selectedOptionId !== null && isSelected && !isCorrectOption && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Detailed ICAI Solution & Trap Note */}
          {showExplanation && (
            <div className="pt-6 border-t border-slate-700/80 space-y-4 animate-in fade-in duration-300">
              {/* Reference Banner */}
              {currentQuestion.icaiReference && (
                <div className="flex items-center gap-2 p-3 bg-blue-950/40 border border-blue-800/60 rounded-xl text-blue-200 text-xs font-semibold">
                  <BookOpen className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Statutory Reference: {currentQuestion.icaiReference}</span>
                </div>
              )}

              {/* Trap Note */}
              {currentQuestion.trapNote && (
                <div className="p-4 bg-amber-950/30 border border-amber-800/50 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>ICAI Student Trap Analysis</span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                    {currentQuestion.trapNote}
                  </p>
                </div>
              )}

              {/* Explanation */}
              {currentQuestion.explanation && (
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-700/70 space-y-2">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    ICAI Examiner Explanation:
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Navigation Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-700/80">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="flex items-center gap-1 px-4 py-2 bg-slate-900 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-900 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => setCurrentIndex(prev => Math.min(availableQuestions.length - 1, prev + 1))}
              disabled={currentIndex >= availableQuestions.length - 1}
              className="flex items-center gap-1 px-5 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white text-xs font-semibold rounded-xl shadow-md transition-all"
            >
              <span>Next Question</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center mx-auto text-emerald-400">
            <Award className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">All Questions Mastered in this Section!</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            You have completed all available questions. Low-importance questions have been retired per your rule, and high-importance questions will re-appear during your spaced review cycle.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenGenerator}
              className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white text-xs font-semibold rounded-xl"
            >
              Generate Unlimited New Questions
            </button>
            <button
              onClick={() => {
                setSelectedSubjectId('all');
                setSelectedChapterId('all');
                setOnlyHighYield(false);
              }}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold rounded-xl"
            >
              View All Subjects
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
