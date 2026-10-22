import React from 'react';
import { 
  Calculator, 
  Scale, 
  Receipt, 
  PieChart, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight, 
  Sparkles, 
  PenTool, 
  HelpCircle, 
  FileText, 
  Gamepad2, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle,
  Search,
  BookOpen
} from 'lucide-react';
import { CA_INTER_SUBJECTS } from '../data/subjectsData';
import { ActiveTab } from './Navbar';
import { SpacedRepetitionService } from '../services/spacedRepetitionService';

interface DashboardProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectSubject: (subjectId: string, mode: 'mcqs' | 'descriptive') => void;
  openSearchModal: () => void;
  openGeneratorModal: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  setActiveTab,
  onSelectSubject,
  openSearchModal,
  openGeneratorModal
}) => {
  const [stats, setStats] = React.useState(SpacedRepetitionService.getRepetitionStats());
  const [selectedGroup, setSelectedGroup] = React.useState<'All' | 'Group 1' | 'Group 2'>('All');

  React.useEffect(() => {
    setStats(SpacedRepetitionService.getRepetitionStats());
  }, []);

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator': return <Calculator className="w-5 h-5" />;
      case 'Scale': return <Scale className="w-5 h-5" />;
      case 'Receipt': return <Receipt className="w-5 h-5" />;
      case 'PieChart': return <PieChart className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const filteredSubjects = CA_INTER_SUBJECTS.filter(s => {
    if (selectedGroup === 'All') return true;
    return s.group === selectedGroup;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Action Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-blue-900/50 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/40 border border-blue-700/60 text-blue-300 text-xs font-semibold">
            <span>⚡ ICAI Inter Study Engine</span>
            <span>•</span>
            <span>No Trends Fluff • 100% Practical Tools</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Master Every ICAI Paper with Past Papers, Case Scenarios & AI Evaluation
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Pick a subject to practice MCQs, write answers for instant step-marking evaluation, or play learning games in the Game Zone.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('mcqs')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Start MCQs Practice</span>
            </button>

            <button
              onClick={() => setActiveTab('descriptive')}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold rounded-xl border border-slate-700 transition-all hover:scale-[1.02]"
            >
              <PenTool className="w-4 h-4 text-emerald-400" />
              <span>Write & Evaluate Answer</span>
            </button>

            <button
              onClick={openGeneratorModal}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate New Question</span>
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Smart Repetition Status Panel (Strict User Rule Applied) */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span>Smart Repetition Engine Active</span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-medium bg-emerald-950 text-emerald-300 border border-emerald-800 rounded">
                  ICAI High-Yield Spaced Filter
                </span>
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              <strong className="text-slate-300">Rule Enforced:</strong> High-importance / ICAI core questions repeat on spaced intervals or when answered incorrectly. Less important / one-off questions are <em>permanently retired</em> once attempted.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-3.5 py-2 bg-slate-900 rounded-lg border border-slate-800 text-center">
              <div className="text-base font-bold text-amber-400">{stats.activeHighYieldLoopCount}</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">In Revision Loop</div>
            </div>

            <div className="px-3.5 py-2 bg-slate-900 rounded-lg border border-slate-800 text-center">
              <div className="text-base font-bold text-emerald-400">{stats.retiredLowImportanceCount}</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Permanently Retired</div>
            </div>

            <button
              onClick={() => setActiveTab('mcqs')}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-900/50 hover:bg-blue-800/60 text-blue-200 text-xs font-semibold rounded-lg border border-blue-700/60 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
              <span>Practice Queue</span>
            </button>
          </div>
        </div>
      </div>

      {/* Action Tools Quick Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <button
          onClick={() => setActiveTab('exam')}
          className="flex flex-col items-center justify-center p-4 bg-slate-800/60 hover:bg-slate-800 rounded-xl border border-slate-700/80 transition-all hover:-translate-y-0.5 text-center group"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-950 flex items-center justify-center text-blue-400 mb-2 border border-blue-800/60 group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-white">100M Exam Sim</span>
          <span className="text-[10px] text-slate-400">3 Hrs + 15m Reading</span>
        </button>

        <button
          onClick={() => setActiveTab('casestudies')}
          className="flex flex-col items-center justify-center p-4 bg-slate-800/60 hover:bg-slate-800 rounded-xl border border-slate-700/80 transition-all hover:-translate-y-0.5 text-center group"
        >
          <div className="w-10 h-10 rounded-lg bg-amber-950 flex items-center justify-center text-amber-400 mb-2 border border-amber-800/60 group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-white">Case Study Lab</span>
          <span className="text-[10px] text-slate-400">Integrated Scenarios</span>
        </button>

        <button
          onClick={() => setActiveTab('pastpapers')}
          className="flex flex-col items-center justify-center p-4 bg-slate-800/60 hover:bg-slate-800 rounded-xl border border-slate-700/80 transition-all hover:-translate-y-0.5 text-center group"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-950 flex items-center justify-center text-emerald-400 mb-2 border border-emerald-800/60 group-hover:scale-110 transition-transform">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-white">PYQs & RTPs</span>
          <span className="text-[10px] text-slate-400">May 24, Nov 23 Vault</span>
        </button>

        <button
          onClick={openGeneratorModal}
          className="flex flex-col items-center justify-center p-4 bg-slate-800/60 hover:bg-slate-800 rounded-xl border border-slate-700/80 transition-all hover:-translate-y-0.5 text-center group"
        >
          <div className="w-10 h-10 rounded-lg bg-yellow-950 flex items-center justify-center text-yellow-400 mb-2 border border-yellow-800/60 group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-white">Unlimited Qs</span>
          <span className="text-[10px] text-slate-400">Dynamic ICAI Variants</span>
        </button>

        <button
          onClick={openSearchModal}
          className="flex flex-col items-center justify-center p-4 bg-slate-800/60 hover:bg-slate-800 rounded-xl border border-slate-700/80 transition-all hover:-translate-y-0.5 text-center group"
        >
          <div className="w-10 h-10 rounded-lg bg-cyan-950 flex items-center justify-center text-cyan-400 mb-2 border border-cyan-800/60 group-hover:scale-110 transition-transform">
            <Search className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-white">Section Directory</span>
          <span className="text-[10px] text-slate-400">All SAs, AS & Sections</span>
        </button>

        <button
          onClick={() => setActiveTab('gamezone')}
          className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-purple-900/40 to-pink-900/40 hover:from-purple-900/60 hover:to-pink-900/60 rounded-xl border border-purple-500/40 transition-all hover:-translate-y-0.5 text-center group"
        >
          <div className="w-10 h-10 rounded-lg bg-purple-950 flex items-center justify-center text-purple-300 mb-2 border border-purple-800/60 group-hover:scale-110 transition-transform">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-purple-200">CA Game Zone</span>
          <span className="text-[10px] text-purple-300">Play & Learn</span>
        </button>
      </div>

      {/* All 6 ICAI Papers Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>ICAI Intermediate Subjects</span>
              <span className="text-xs font-normal text-slate-400">Select any paper to solve</span>
            </h2>
          </div>

          {/* Group Filter Tabs */}
          <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700">
            {(['All', 'Group 1', 'Group 2'] as const).map((group) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  selectedGroup === group
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>

        {/* Paper Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSubjects.map((subject) => (
            <div
              key={subject.id}
              className="bg-slate-800/90 rounded-2xl border border-slate-700/80 p-5 hover:border-slate-600 transition-all shadow-md flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 shadow-inner">
                      {getSubjectIcon(subject.icon)}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-amber-400 tracking-wider">
                        {subject.code} • {subject.group}
                      </span>
                      <h3 className="font-bold text-slate-100 text-base leading-snug">
                        {subject.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Info tags */}
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800">
                    {subject.chapters.length} Chapters
                  </span>
                  {subject.mcqMarks > 0 ? (
                    <span className="px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/60 text-blue-300">
                      30M MCQ + 70M Descriptive
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-300">
                      100M Practical & Descriptive
                    </span>
                  )}
                  {subject.standardsCount && (
                    <span className="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800">
                      {subject.standardsCount} Standards
                    </span>
                  )}
                </div>

                {/* Chapter breakdown preview */}
                <div className="pt-2 border-t border-slate-700/60">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Key Chapters:
                  </span>
                  <div className="space-y-1">
                    {subject.chapters.slice(0, 3).map((ch) => (
                      <div key={ch.id} className="flex items-center justify-between text-xs text-slate-300">
                        <span className="truncate pr-2">{ch.name}</span>
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-950/60 text-amber-300 border border-amber-800/40 whitespace-nowrap">
                          {ch.weightageMarks}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons for this Subject */}
              <div className="pt-4 mt-4 border-t border-slate-700/60 grid grid-cols-2 gap-2">
                <button
                  onClick={() => onSelectSubject(subject.id, 'mcqs')}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white rounded-lg text-xs font-semibold border border-blue-500/30 transition-all"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Practice MCQs</span>
                </button>

                <button
                  onClick={() => onSelectSubject(subject.id, 'descriptive')}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-lg text-xs font-semibold border border-emerald-500/30 transition-all"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Write Answer</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
