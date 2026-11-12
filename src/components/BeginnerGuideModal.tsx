import React from 'react';
import { 
  X, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  Lightbulb, 
  GraduationCap, 
  ArrowRight, 
  Flame, 
  Check, 
  XCircle,
  Compass,
  Zap,
  Target
} from 'lucide-react';
import { BEGINNER_GUIDES_DATA, BeginnerGuideSubject, BeginnerCheckpoint } from '../data/beginnerGuidesData';
import { AudioService } from '../services/audioService';

interface BeginnerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartBeginnerPractice: (subjectId: string, mode: 'mcqs' | 'descriptive') => void;
  initialSubjectId?: string;
}

export const BeginnerGuideModal: React.FC<BeginnerGuideModalProps> = ({
  isOpen,
  onClose,
  onStartBeginnerPractice,
  initialSubjectId
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = React.useState<string>(
    initialSubjectId || BEGINNER_GUIDES_DATA[0].subjectId
  );
  const [activeSection, setActiveSection] = React.useState<'primer' | 'pillars' | 'jargon' | 'goldenRules' | 'quiz'>('primer');
  const [quizAnswers, setQuizAnswers] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (initialSubjectId) {
      setSelectedSubjectId(initialSubjectId);
    }
  }, [initialSubjectId]);

  if (!isOpen) return null;

  const currentSubject: BeginnerGuideSubject = 
    BEGINNER_GUIDES_DATA.find(s => s.subjectId === selectedSubjectId) || BEGINNER_GUIDES_DATA[0];

  const handleSelectQuizOption = (chkId: string, optId: string, correctId: string) => {
    if (quizAnswers[chkId]) return;
    setQuizAnswers(prev => ({ ...prev, [chkId]: optId }));
    if (optId === correctId) {
      AudioService.playCorrect();
    } else {
      AudioService.playWrong();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Top Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg text-2xl shrink-0">
              🌱
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800/80 mb-1">
                <Compass className="w-3.5 h-3.5" />
                <span>Zero to Hero • Beginner Foundation Guide</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                Learn CA Intermediate from Scratch
              </h2>
              <p className="text-xs text-slate-400 hidden sm:block">
                For freshers who have never studied these subjects. Clear concepts, simple analogies & golden exam rules.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Paper Selector Tabs */}
        <div className="p-3 bg-slate-950 border-b border-slate-800 overflow-x-auto flex items-center gap-2 scrollbar-none">
          {BEGINNER_GUIDES_DATA.map((guide) => (
            <button
              key={guide.subjectId}
              onClick={() => {
                setSelectedSubjectId(guide.subjectId);
                setQuizAnswers({});
                setActiveSection('primer');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${
                selectedSubjectId === guide.subjectId
                  ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{guide.emoji}</span>
              <span>{guide.paperCode}: {guide.title}</span>
            </button>
          ))}
        </div>

        {/* Sub-Navigation: Sections */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between overflow-x-auto gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            {[
              { id: 'primer', label: '1. Overview & Analogy', icon: Lightbulb },
              { id: 'pillars', label: '2. Core Pillars', icon: BookOpen },
              { id: 'jargon', label: '3. Jargon Buster', icon: GraduationCap },
              { id: 'goldenRules', label: '4. Golden Rules', icon: Flame },
              { id: 'quiz', label: '5. Quick Checkpoint', icon: HelpCircle }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-slate-800 text-white font-bold border border-slate-700 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Practice CTA */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                onStartBeginnerPractice(currentSubject.subjectId, 'mcqs');
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-lg shadow-sm transition-all"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Beginner MCQs</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-slate-200">
          
          {/* Section 1: Overview & Real-World Analogy */}
          {activeSection === 'primer' && (
            <div className="space-y-5 animate-in fade-in-50 duration-150">
              <div className="p-5 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-850 border border-slate-700 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <span>{currentSubject.paperCode} • What is this subject about?</span>
                </div>
                <h3 className="text-xl font-bold text-white leading-snug">
                  {currentSubject.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {currentSubject.whatIsIt}
                </p>
              </div>

              {/* Real World Analogy Box */}
              <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-800/60 space-y-3 shadow-inner">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Real-World Analogy (Explain Like I'm 5):</span>
                </div>
                <p className="text-sm text-amber-100/90 leading-relaxed font-serif italic">
                  "{currentSubject.realWorldAnalogy}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-3">
                <span className="text-xs text-slate-400">Step 1 of 5</span>
                <button
                  onClick={() => setActiveSection('pillars')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all"
                >
                  <span>Explore Core Pillars</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Section 2: Core Pillars */}
          {activeSection === 'pillars' && (
            <div className="space-y-4 animate-in fade-in-50 duration-150">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                The 3 Foundational Pillars of {currentSubject.title}
              </div>

              {currentSubject.corePillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-850 border border-slate-700/80 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-blue-900/60 text-blue-300 border border-blue-700/60 text-xs flex items-center justify-center font-mono">
                        {idx + 1}
                      </span>
                      <span>{pillar.title}</span>
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {pillar.description}
                  </p>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-emerald-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Fundamental Rule:</strong> {pillar.keyRule}</span>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between pt-3">
                <button
                  onClick={() => setActiveSection('primer')}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  ← Back to Overview
                </button>
                <button
                  onClick={() => setActiveSection('jargon')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all"
                >
                  <span>Jargon Buster</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Section 3: Jargon Buster */}
          {activeSection === 'jargon' && (
            <div className="space-y-4 animate-in fade-in-50 duration-150">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Plain-English Glossary (No Intimidating Jargon)
                </div>
                <span className="text-xs text-slate-500">{currentSubject.jargonBuster.length} Terms Defined</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentSubject.jargonBuster.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-850 border border-slate-700/80 space-y-1.5"
                  >
                    <div className="text-xs font-extrabold text-amber-400 font-mono">
                      {item.term}
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed">
                      {item.meaning}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3">
                <button
                  onClick={() => setActiveSection('pillars')}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  ← Back to Pillars
                </button>
                <button
                  onClick={() => setActiveSection('goldenRules')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all"
                >
                  <span>Golden Exam Rules</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Section 4: Golden Rules */}
          {activeSection === 'goldenRules' && (
            <div className="space-y-4 animate-in fade-in-50 duration-150">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>The 5 Golden Exam Rules for {currentSubject.title}</span>
              </div>

              <div className="space-y-2.5">
                {currentSubject.goldenRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-850 border border-slate-700/80 flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                      {rule}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3">
                <button
                  onClick={() => setActiveSection('jargon')}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  ← Back to Glossary
                </button>
                <button
                  onClick={() => setActiveSection('quiz')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all"
                >
                  <span>Take Quick Checkpoint</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Section 5: Checkpoints Quiz */}
          {activeSection === 'quiz' && (
            <div className="space-y-5 animate-in fade-in-50 duration-150">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Test Your Understanding ({currentSubject.checkpoints.length} Concept Checks)
                </div>
                <span className="text-xs text-emerald-400 font-medium">Safe Practice • Instant Explanations</span>
              </div>

              {currentSubject.checkpoints.map((chk, qIdx) => {
                const userChoice = quizAnswers[chk.id];
                const isAnswered = userChoice !== undefined;

                return (
                  <div
                    key={chk.id}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-850 border border-slate-700 space-y-3"
                  >
                    <div className="text-xs font-bold text-amber-400 font-mono">
                      Checkpoint {qIdx + 1}
                    </div>

                    <p className="text-sm font-semibold text-slate-100 font-sans">
                      {chk.question}
                    </p>

                    <div className="space-y-2 pt-1">
                      {chk.options.map((opt) => {
                        const isChosen = userChoice === opt.id;
                        const isCorrect = opt.id === chk.correctId;

                        let style = 'bg-slate-900/80 border-slate-700 hover:bg-slate-800 text-slate-200';
                        if (isAnswered) {
                          if (isCorrect) {
                            style = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                          } else if (isChosen) {
                            style = 'bg-rose-950/60 border-rose-500 text-rose-200';
                          } else {
                            style = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
                          }
                        }

                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectQuizOption(chk.id, opt.id, chk.correctId)}
                            disabled={isAnswered}
                            className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between transition-all ${style}`}
                          >
                            <span>{opt.text}</span>
                            {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                            {isAnswered && isChosen && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                        <strong className="text-amber-400 block">Concept Note:</strong>
                        <p>{chk.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border border-blue-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white">Ready for Beginner MCQs & Writing?</h4>
                  <p className="text-xs text-slate-300">Start practicing with foundational questions designed to build confidence.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onStartBeginnerPractice(currentSubject.subjectId, 'mcqs');
                      onClose();
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
                  >
                    Start Beginner MCQs
                  </button>
                  <button
                    onClick={() => {
                      onStartBeginnerPractice(currentSubject.subjectId, 'descriptive');
                      onClose();
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
                  >
                    Start Writing
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Switch to Intermediate or Hard level anytime in Practice tab as you grow!</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold transition-colors"
            >
              Close Guide
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
