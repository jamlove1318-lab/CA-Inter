import React from 'react';
import { 
  RotateCcw, 
  CheckCircle2, 
  Bookmark, 
  BookOpen, 
  Flame, 
  HelpCircle, 
  PenTool, 
  AlertTriangle, 
  Check, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Award,
  Layers,
  GraduationCap,
  Filter
} from 'lucide-react';
import { CA_INTER_SUBJECTS } from '../data/subjectsData';
import { MCQS_DATABASE, DESCRIPTIVE_DATABASE } from '../data/questionsData';
import { SECTIONS_AND_STANDARDS } from '../data/sectionsAndStandardsData';
import { SpacedRepetitionService } from '../services/spacedRepetitionService';
import { AudioService } from '../services/audioService';
import { McqQuestion, DescriptiveQuestion } from '../types/question';
import { shuffleMcqOptions } from '../utils/mcqUtils';

export const RevisionHub: React.FC = () => {
  const [selectedSubjectId, setSelectedSubjectId] = React.useState<string>('all');
  const [revisionCategory, setRevisionCategory] = React.useState<'all' | 'mcq' | 'descriptive' | 'sections'>('all');
  const [activeDrillIndex, setActiveDrillIndex] = React.useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = React.useState<string | null>(null);
  const [showAnswer, setShowAnswer] = React.useState<boolean>(false);
  const [stats, setStats] = React.useState(SpacedRepetitionService.getRepetitionStats());
  const [masteredIds, setMasteredIds] = React.useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('ca_revision_mastered_ids');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const progress = SpacedRepetitionService.getAllProgress();

  // High Importance Questions Filtered for Revision
  // STRICT ICAI RULE: Only HIGH importance questions are included in Revision.
  // Low-importance questions are permanently retired and never repeat here.
  const highImportanceMcqs: McqQuestion[] = React.useMemo(() => {
    return MCQS_DATABASE.filter(q => {
      if (q.importance !== 'HIGH') return false;
      if (selectedSubjectId !== 'all' && q.subjectId !== selectedSubjectId) return false;
      if (masteredIds.has(q.id)) return false;
      return true;
    }).map(q => shuffleMcqOptions(q));
  }, [selectedSubjectId, masteredIds]);

  const highImportanceDescriptive: DescriptiveQuestion[] = React.useMemo(() => {
    return DESCRIPTIVE_DATABASE.filter(q => {
      if (q.importance !== 'HIGH') return false;
      if (selectedSubjectId !== 'all' && q.subjectId !== selectedSubjectId) return false;
      if (masteredIds.has(q.id)) return false;
      return true;
    });
  }, [selectedSubjectId, masteredIds]);

  const statutoryItems = React.useMemo(() => {
    return SECTIONS_AND_STANDARDS.filter(s => {
      if (selectedSubjectId !== 'all' && s.subjectId !== selectedSubjectId) return false;
      return true;
    });
  }, [selectedSubjectId]);

  // Combined Active Items for Revision Drill
  const activeRevisionItems = React.useMemo(() => {
    if (revisionCategory === 'mcq') return highImportanceMcqs;
    if (revisionCategory === 'descriptive') return highImportanceDescriptive;
    return highImportanceMcqs;
  }, [revisionCategory, highImportanceMcqs, highImportanceDescriptive]);

  const currentItem = activeRevisionItems[activeDrillIndex] || activeRevisionItems[0];

  const handleMarkMastered = (id: string) => {
    AudioService.playVictory();
    const updated = new Set(masteredIds);
    updated.add(id);
    setMasteredIds(updated);
    try {
      localStorage.setItem('ca_revision_mastered_ids', JSON.stringify(Array.from(updated)));
    } catch (e) {
      console.error('Error saving mastered IDs:', e);
    }
    // Advance to next
    setSelectedOptionId(null);
    setShowAnswer(false);
    if (activeDrillIndex >= activeRevisionItems.length - 1) {
      setActiveDrillIndex(0);
    }
  };

  const handleResetMastery = () => {
    if (window.confirm('Reset your revision mastery list? All high-importance questions will return to the revision queue.')) {
      setMasteredIds(new Set());
      localStorage.removeItem('ca_revision_mastered_ids');
    }
  };

  const handleNextDrill = () => {
    setSelectedOptionId(null);
    setShowAnswer(false);
    setActiveDrillIndex(prev => (prev + 1) % Math.max(1, activeRevisionItems.length));
  };

  const handlePrevDrill = () => {
    setSelectedOptionId(null);
    setShowAnswer(false);
    setActiveDrillIndex(prev => (prev - 1 + activeRevisionItems.length) % Math.max(1, activeRevisionItems.length));
  };

  const handleSelectOption = (optId: string) => {
    if (selectedOptionId !== null || !currentItem) return;
    setSelectedOptionId(optId);
    setShowAnswer(true);
    if ('correctOptionId' in currentItem && optId === currentItem.correctOptionId) {
      AudioService.playCorrect();
    } else {
      AudioService.playWrong();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      
      {/* Revision Hub Header */}
      <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800/80 text-amber-300 text-xs font-semibold">
              <RotateCcw className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>Dedicated ICAI Revision Hub</span>
              <span>•</span>
              <span className="text-amber-200 font-bold">High-Importance Only</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Spaced Revision & High-Yield Master Vault
            </h1>
            
            <p className="text-sm text-slate-300 leading-relaxed">
              Revise critical statutory sections, examiner favorites, and high-weightage ICAI case problems without clutter. Low-importance questions are permanently retired so you focus only on what brings 60+ marks.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex flex-row md:flex-col gap-3 min-w-[200px] justify-between">
            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-700/80 text-center">
              <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Due for Revision</span>
              <span className="text-2xl font-black text-amber-400">{highImportanceMcqs.length + highImportanceDescriptive.length}</span>
              <span className="text-[10px] text-slate-500 block">High-Importance Qs</span>
            </div>

            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-700/80 text-center">
              <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Mastered & Cleared</span>
              <span className="text-2xl font-black text-emerald-400">{masteredIds.size}</span>
              <span className="text-[10px] text-slate-500 block">Saved to Memory</span>
            </div>
          </div>
        </div>
      </div>

      {/* Revision Filters Bar */}
      <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        
        {/* Paper Selector */}
        <div className="flex flex-wrap items-center gap-2.5">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span>Select Paper:</span>
          </label>
          <select
            value={selectedSubjectId}
            onChange={(e) => {
              setSelectedSubjectId(e.target.value);
              setActiveDrillIndex(0);
              setSelectedOptionId(null);
              setShowAnswer(false);
            }}
            className="bg-slate-900 border border-slate-700 text-slate-100 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-amber-500 max-w-xs"
          >
            <option value="all">All 6 Papers (Universal Vault)</option>
            {CA_INTER_SUBJECTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.code}: {s.title}
              </option>
            ))}
          </select>
        </div>

        {/* Category Switcher */}
        <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-700 text-xs">
          {[
            { id: 'all', label: 'All Important' },
            { id: 'mcq', label: `MCQs (${highImportanceMcqs.length})` },
            { id: 'descriptive', label: `Descriptive (${highImportanceDescriptive.length})` },
            { id: 'sections', label: `Statutory Vault (${statutoryItems.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setRevisionCategory(tab.id as any);
                setActiveDrillIndex(0);
                setSelectedOptionId(null);
                setShowAnswer(false);
              }}
              className={`px-3 py-1.5 font-bold rounded-lg transition-all ${
                revisionCategory === tab.id
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {masteredIds.size > 0 && (
          <button
            onClick={handleResetMastery}
            className="text-[11px] text-slate-400 hover:text-rose-400 underline transition-colors"
          >
            Reset Mastered List
          </button>
        )}
      </div>

      {/* Main Revision View: Statutory Vault vs Question Drill */}
      {revisionCategory === 'sections' ? (
        /* Statutory Sections & Standards Directory */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>High-Yield Statutory Sections, AS & SA Quick Reference</span>
            </h3>
            <span className="text-xs text-slate-400">{statutoryItems.length} Key Provisions</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {statutoryItems.map(item => (
              <div 
                key={item.id}
                className="bg-slate-800/90 rounded-2xl border border-slate-700/80 p-4 space-y-2 hover:border-amber-500/50 transition-all shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-amber-950 text-amber-300 border border-amber-800">
                    {item.code}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {item.category}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white leading-snug">{item.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">{item.keyRule}</p>
              </div>
            ))}
          </div>
        </div>
      ) : activeRevisionItems.length === 0 ? (
        /* Empty State */
        <div className="bg-slate-800 rounded-3xl border border-slate-700 p-8 sm:p-12 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl">
            🎉
          </div>
          <h3 className="text-xl font-bold text-white">All High-Importance Items Mastered!</h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            You have revised and mastered all high-importance questions for this paper. As per the strict ICAI strategy, low-importance questions are permanently retired and never clutter your revision vault.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setSelectedSubjectId('all')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-600/30"
            >
              View All 6 Papers
            </button>
            {masteredIds.size > 0 && (
              <button
                onClick={handleResetMastery}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-700 transition-all"
              >
                Reset Mastered List
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Interactive Revision Drill Card */
        <div className="bg-slate-800 rounded-3xl border border-amber-500/30 p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

          {/* Drill Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-700/80">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-950 text-amber-300 border border-amber-800 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>HIGH YIELD REVISION</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-slate-900 text-slate-300 border border-slate-700">
                {currentItem.source}
              </span>
              <span className="px-2 py-0.5 rounded-lg text-xs font-semibold bg-blue-950/80 text-blue-300 border border-blue-800/80">
                {currentItem.marks} Marks
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-mono font-bold">
                Item {activeDrillIndex + 1} of {activeRevisionItems.length}
              </span>

              <button
                onClick={() => handleMarkMastered(currentItem.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs font-bold transition-all active:scale-95"
                title="Mark as Mastered (Remove from active revision queue)"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark Mastered</span>
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div className="text-base sm:text-lg font-semibold text-white font-serif leading-relaxed">
            {currentItem.questionText}
          </div>

          {/* MCQ Options (if item is MCQ) */}
          {'options' in currentItem && (
            <div className="space-y-3 pt-1">
              {currentItem.options.map((opt, idx) => {
                const letter = String.fromCharCode(65 + idx);
                const isSelected = selectedOptionId === opt.id;
                const isCorrect = opt.id === (currentItem as McqQuestion).correctOptionId;

                let style = 'border-slate-700/80 bg-slate-900/70 hover:bg-slate-700/60 text-slate-200';
                if (showAnswer) {
                  if (isCorrect) {
                    style = 'border-emerald-500 bg-emerald-950/60 text-emerald-100 shadow-md shadow-emerald-950/40 font-semibold';
                  } else if (isSelected) {
                    style = 'border-rose-500 bg-rose-950/60 text-rose-200';
                  } else {
                    style = 'border-slate-800 bg-slate-900/30 text-slate-500 opacity-50';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 text-sm sm:text-base ${style}`}
                  >
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border ${
                      showAnswer && isCorrect
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : showAnswer && isSelected
                        ? 'bg-rose-600 text-white border-rose-500'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {letter}
                    </span>
                    <span className="flex-1 pt-0.5">{opt.text}</span>
                    {showAnswer && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Descriptive Model Solution (if item is Descriptive) */}
          {'suggestedAnswer' in currentItem && (
            <div className="space-y-3">
              <button
                onClick={() => setShowAnswer(prev => !prev)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                <BookOpen className="w-4 h-4" />
                <span>{showAnswer ? 'Hide Step-by-Step Model Answer' : 'Show ICAI Suggested Answer & Rubrics'}</span>
              </button>

              {showAnswer && (
                <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-700 space-y-4 animate-in fade-in duration-200">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    ICAI Suggested Answer & Working Notes:
                  </div>
                  <div className="text-xs sm:text-sm text-slate-200 font-mono whitespace-pre-line leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                    {currentItem.suggestedAnswer}
                  </div>
                  {currentItem.rubrics && (
                    <div className="pt-2 border-t border-slate-800 space-y-2">
                      <div className="text-xs font-bold text-amber-400 uppercase">
                        ICAI Step-Marking Scheme:
                      </div>
                      <div className="space-y-1.5">
                        {currentItem.rubrics.map((r, idx) => (
                          <div key={idx} className="flex items-start justify-between gap-3 text-xs p-2 bg-slate-900 rounded-lg border border-slate-800">
                            <span className="text-slate-300 font-medium">{r.step}</span>
                            <span className="text-amber-400 font-bold font-mono shrink-0">{r.marks} Marks</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Explanation & Trap Analysis */}
          {showAnswer && 'explanation' in currentItem && currentItem.explanation && (
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 space-y-3 animate-in fade-in duration-200">
              {currentItem.icaiReference && (
                <div className="text-xs font-semibold text-blue-300 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                  <span>Statutory Reference: {currentItem.icaiReference}</span>
                </div>
              )}
              {'trapNote' in currentItem && currentItem.trapNote && (
                <div className="p-3 bg-amber-950/40 border border-amber-800/60 rounded-xl space-y-1">
                  <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>ICAI Student Trap Analysis</span>
                  </div>
                  <p className="text-xs text-amber-200/90 leading-relaxed font-sans">
                    {currentItem.trapNote}
                  </p>
                </div>
              )}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentItem.explanation}
              </p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-700/80">
            <button
              onClick={handlePrevDrill}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Item</span>
            </button>

            <button
              onClick={handleNextDrill}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-amber-950/40 transition-all active:scale-95"
            >
              <span>Next Revision Item</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};