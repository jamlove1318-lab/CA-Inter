import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Bookmark, 
  ChevronRight, 
  AlertCircle, 
  Sparkles, 
  RefreshCw, 
  BookOpen, 
  Award,
  Flame,
  Check,
  Zap
} from 'lucide-react';
import { CA_INTER_SUBJECTS } from '../data/subjectsData';
import { MCQS_DATABASE } from '../data/questionsData';
import { McqQuestion } from '../types/question';
import { SpacedRepetitionService } from '../services/spacedRepetitionService';
import { QuestionGeneratorService } from '../services/questionGeneratorService';
import { AudioService } from '../services/audioService';
import { shuffleMcqOptions } from '../utils/mcqUtils';

interface McqPracticeProps {
  initialSubjectId?: string;
  onOpenGenerator: () => void;
}

export const McqPractice: React.FC<McqPracticeProps> = ({
  initialSubjectId,
  onOpenGenerator
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = React.useState<string>(
    initialSubjectId || 'all'
  );
  const [selectedChapterId, setSelectedChapterId] = React.useState<string>('all');
  const [onlyHighYield, setOnlyHighYield] = React.useState<boolean>(false);

  // Sync selectedSubjectId if initialSubjectId prop changes
  React.useEffect(() => {
    if (initialSubjectId && initialSubjectId !== selectedSubjectId) {
      setSelectedSubjectId(initialSubjectId);
      setSelectedChapterId('all');
    }
  }, [initialSubjectId]);

  // Infinite Question Queue
  const [questionQueue, setQuestionQueue] = React.useState<McqQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = React.useState<string | null>(null);
  const [showExplanation, setShowExplanation] = React.useState<boolean>(false);
  const [bookmarked, setBookmarked] = React.useState<boolean>(false);

  // Session stats
  const [sessionCorrect, setSessionCorrect] = React.useState<number>(0);
  const [sessionTotal, setSessionTotal] = React.useState<number>(0);
  const [currentStreak, setCurrentStreak] = React.useState<number>(0);

  // Initialize or re-populate queue when subject/filter changes
  React.useEffect(() => {
    const curated = SpacedRepetitionService.filterQuestions(MCQS_DATABASE, {
      subjectId: selectedSubjectId,
      chapterId: selectedChapterId,
      onlyHighYield
    });

    // Populate with curated questions (options shuffled) + guaranteed dynamic questions
    const initialList: McqQuestion[] = curated.map(q => shuffleMcqOptions(q));
    
    // Always add fresh dynamic questions to guarantee infinite flow
    for (let i = 0; i < 8; i++) {
      initialList.push(QuestionGeneratorService.generateDynamicMcq(selectedSubjectId));
    }

    setQuestionQueue(initialList);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setShowExplanation(false);
  }, [selectedSubjectId, selectedChapterId, onlyHighYield]);

  const currentQuestion: McqQuestion = questionQueue[currentIndex] || QuestionGeneratorService.generateDynamicMcq(selectedSubjectId);

  React.useEffect(() => {
    if (currentQuestion) {
      setBookmarked(SpacedRepetitionService.isBookmarked(currentQuestion.id));
      setSelectedOptionId(null);
      setShowExplanation(false);
    }
  }, [currentIndex, currentQuestion]);

  // Ensure queue never runs dry: auto-append questions as user progresses
  const handleNextQuestion = () => {
    // If approaching end of queue, append 3 more fresh questions immediately
    if (currentIndex >= questionQueue.length - 2) {
      const moreQuestions = [
        QuestionGeneratorService.generateDynamicMcq(selectedSubjectId),
        QuestionGeneratorService.generateDynamicMcq(selectedSubjectId),
        QuestionGeneratorService.generateDynamicMcq(selectedSubjectId)
      ];
      setQuestionQueue(prev => [...prev, ...moreQuestions]);
    }

    setCurrentIndex(prev => prev + 1);
    setSelectedOptionId(null);
    setShowExplanation(false);
  };

  const handleSelectOption = (optId: string) => {
    if (selectedOptionId !== null || !currentQuestion) return; // already answered
    setSelectedOptionId(optId);
    setShowExplanation(true);

    const isCorrect = optId === currentQuestion.correctOptionId;
    setSessionTotal(prev => prev + 1);

    if (isCorrect) {
      AudioService.playCorrect();
      setSessionCorrect(prev => prev + 1);
      setCurrentStreak(prev => {
        const next = prev + 1;
        if (next % 3 === 0) AudioService.playCombo();
        return next;
      });
    } else {
      AudioService.playWrong();
      setCurrentStreak(0);
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
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      
      {/* Top Header & Filter Bar (Clean & Simple) */}
      <div className="bg-slate-800/90 rounded-2xl border border-slate-700/80 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        
        {/* Subject & Chapter Filter */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-400">Paper:</label>
            <select
              value={selectedSubjectId}
              onChange={(e) => {
                setSelectedSubjectId(e.target.value);
                setSelectedChapterId('all');
              }}
              className="bg-slate-900 border border-slate-700 text-slate-100 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-blue-500"
            >
              <option value="all">All 6 Papers (Infinite Mix)</option>
              {CA_INTER_SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code}: {s.title}
                </option>
              ))}
            </select>
          </div>

          {currentSubject && (
            <div className="hidden sm:flex items-center gap-2">
              <label className="text-xs font-semibold text-slate-400">Chapter:</label>
              <select
                value={selectedChapterId}
                onChange={(e) => setSelectedChapterId(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-slate-100 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-blue-500 max-w-xs truncate"
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

        {/* Live Session Counter & Streak */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold font-mono">
            <span className="text-slate-400">Score:</span>
            <span className="text-emerald-400">{sessionCorrect}</span>
            <span className="text-slate-500">/</span>
            <span className="text-white">{sessionTotal}</span>
          </div>

          <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-700/60 text-amber-400 text-xs font-bold font-mono">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>{currentStreak} Streak</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-950/60 border border-blue-700/60 text-blue-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span>Unlimited Mode Active</span>
          </div>
        </div>
      </div>

      {/* Main MCQ Card (High Contrast, Tactile, Beautiful) */}
      {currentQuestion && (
        <div className="bg-slate-800 rounded-3xl border border-slate-700/90 p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* Card Top Metadata */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-700/70">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-950 text-blue-300 border border-blue-800">
                {currentQuestion.source}
              </span>
              <span className="px-2 py-0.5 rounded-lg text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-700">
                {currentQuestion.marks} Marks
              </span>
              <span className="px-2 py-0.5 rounded-lg text-xs font-semibold bg-slate-900 text-amber-300 border border-slate-700">
                {currentQuestion.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-mono font-bold">
                Question #{currentIndex + 1}
              </span>
              <button
                onClick={handleToggleBookmark}
                className={`p-1.5 rounded-lg border transition-all ${
                  bookmarked
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/60'
                    : 'text-slate-400 border-slate-700 hover:text-white'
                }`}
                title="Bookmark Question"
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div className="text-base sm:text-lg font-semibold text-slate-100 font-serif leading-relaxed">
            {currentQuestion.questionText}
          </div>

          {/* Options Grid */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isSelected = selectedOptionId === opt.id;
              const isCorrectOption = opt.id === currentQuestion.correctOptionId;

              let style = 'border-slate-700/80 bg-slate-900/70 hover:bg-slate-700/60 text-slate-200';
              if (selectedOptionId !== null) {
                if (isCorrectOption) {
                  style = 'border-emerald-500 bg-emerald-950/60 text-emerald-100 shadow-lg shadow-emerald-950/40 font-medium';
                } else if (isSelected) {
                  style = 'border-rose-500 bg-rose-950/60 text-rose-200 font-medium';
                } else {
                  style = 'border-slate-800 bg-slate-900/30 text-slate-500 opacity-50';
                }
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={selectedOptionId !== null}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 text-sm sm:text-base ${style}`}
                >
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border ${
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

          {/* Explanation & Solution Card (Reveals immediately on selection) */}
          {showExplanation && (
            <div className="pt-4 border-t border-slate-700/80 space-y-3 animate-in fade-in duration-200">
              {currentQuestion.icaiReference && (
                <div className="p-3 bg-blue-950/40 border border-blue-800/60 rounded-xl text-blue-200 text-xs font-semibold flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Statutory Provision: {currentQuestion.icaiReference}</span>
                </div>
              )}

              {currentQuestion.trapNote && (
                <div className="p-3.5 bg-amber-950/40 border border-amber-800/60 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>ICAI Student Trap Analysis</span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                    {currentQuestion.trapNote}
                  </p>
                </div>
              )}

              {currentQuestion.explanation && (
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-1.5">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    ICAI Examiner Explanation:
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Next Question Navigation Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-700/80">
            <span className="text-xs text-slate-400 font-mono">
              Continuous Flow • Question #{currentIndex + 1}
            </span>

            <button
              onClick={handleNextQuestion}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-600 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-xl shadow-blue-600/30 transition-all hover:scale-105"
            >
              <span>Next Question</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
