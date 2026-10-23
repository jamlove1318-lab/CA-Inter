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
  BookOpen,
  Search,
  CheckCircle2,
  RefreshCw
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
      case 'Calculator': return <Calculator className="w-5 h-5 text-blue-400" />;
      case 'Scale': return <Scale className="w-5 h-5 text-amber-400" />;
      case 'Receipt': return <Receipt className="w-5 h-5 text-emerald-400" />;
      case 'PieChart': return <PieChart className="w-5 h-5 text-indigo-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-purple-400" />;
      default: return <BookOpen className="w-5 h-5 text-blue-400" />;
    }
  };

  const filteredSubjects = CA_INTER_SUBJECTS.filter(s => {
    if (selectedGroup === 'All') return true;
    return s.group === selectedGroup;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      
      {/* Clean Minimalist Hero Header */}
      <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/80 text-blue-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ICAI New Scheme • All 6 Papers</span>
              <span>•</span>
              <span className="text-emerald-300 font-bold">100% Unlimited Practice</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              CA Intermediate Preparation Platform
            </h1>
            
            <p className="text-sm text-slate-300 leading-relaxed">
              Solve unlimited high-yield MCQs, write descriptive answers with instant ICAI step-marking feedback, and master integrated case scenarios across the entire syllabus.
            </p>
          </div>

          {/* Quick Primary Actions */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 min-w-[210px]">
            <button
              onClick={() => setActiveTab('mcqs')}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl shadow-md shadow-blue-600/30 transition-all active:scale-95"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Unlimited MCQs</span>
            </button>

            <button
              onClick={() => setActiveTab('descriptive')}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-700 text-slate-100 text-sm font-bold rounded-xl border border-slate-700 transition-all active:scale-95"
            >
              <PenTool className="w-4 h-4 text-emerald-400" />
              <span>Descriptive Evaluator</span>
            </button>
          </div>
        </div>
      </div>

      {/* Smart Repetition Status - Simple & Non-intrusive */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>
            <strong className="text-white">Smart Repetition Filter:</strong> High-importance ICAI questions repeat on spaced review. Low-importance questions never repeat once attempted.
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px] self-end sm:self-auto">
          <span>Active in Revision: <strong className="text-amber-400">{stats.activeHighYieldLoopCount}</strong></span>
          <span>•</span>
          <span>Retired: <strong className="text-emerald-400">{stats.retiredLowImportanceCount}</strong></span>
        </div>
      </div>

      {/* Fast Navigation Utility Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveTab('casestudies')}
          className="flex items-center gap-3 p-3.5 bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700 transition-all text-left group"
        >
          <div className="w-9 h-9 rounded-lg bg-amber-950/80 flex items-center justify-center text-amber-400 border border-amber-800/60 shrink-0 group-hover:scale-105 transition-transform">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Case Study Lab</div>
            <div className="text-[11px] text-slate-400">15-30M Integrated Cases</div>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('exam')}
          className="flex items-center gap-3 p-3.5 bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700 transition-all text-left group"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-950/80 flex items-center justify-center text-blue-400 border border-blue-800/60 shrink-0 group-hover:scale-105 transition-transform">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">100M Simulator</div>
            <div className="text-[11px] text-slate-400">3h Exam + 15m Reading</div>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('pastpapers')}
          className="flex items-center gap-3 p-3.5 bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700 transition-all text-left group"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-950/80 flex items-center justify-center text-emerald-400 border border-emerald-800/60 shrink-0 group-hover:scale-105 transition-transform">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Past Papers & RTPs</div>
            <div className="text-[11px] text-slate-400">May 24, Nov 23 Vault</div>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('gamezone')}
          className="flex items-center gap-3 p-3.5 bg-purple-950/30 hover:bg-purple-950/50 rounded-xl border border-purple-800/50 transition-all text-left group"
        >
          <div className="w-9 h-9 rounded-lg bg-purple-900/60 flex items-center justify-center text-purple-300 border border-purple-700/60 shrink-0 group-hover:scale-105 transition-transform">
            <Gamepad2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-purple-200">CA Game Zone</div>
            <div className="text-[11px] text-purple-300">Play & Learn Tab</div>
          </div>
        </button>
      </div>

      {/* ICAI Papers Grid */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span>Choose a Paper to Practice</span>
          </h2>

          {/* Group Filter */}
          <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
            {(['All', 'Group 1', 'Group 2'] as const).map((group) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`px-3 py-1 font-semibold rounded-lg transition-all ${
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

        {/* Paper Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSubjects.map((subject) => (
            <div
              key={subject.id}
              className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5 hover:border-slate-600 transition-all shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                      {getSubjectIcon(subject.icon)}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-amber-400 tracking-wider">
                        {subject.code} • {subject.group}
                      </span>
                      <h3 className="font-bold text-slate-100 text-sm leading-snug">
                        {subject.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400 pt-1">
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700">
                    {subject.chapters.length} Chapters
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/60">
                    {subject.mcqMarks > 0 ? '30M MCQ + 70M Descriptive' : '100M Descriptive'}
                  </span>
                </div>
              </div>

              {/* Direct Practice Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700/60">
                <button
                  onClick={() => onSelectSubject(subject.id, 'mcqs')}
                  className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white rounded-xl text-xs font-semibold border border-blue-500/30 transition-all active:scale-95"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Practice MCQs</span>
                </button>

                <button
                  onClick={() => onSelectSubject(subject.id, 'descriptive')}
                  className="flex items-center justify-center gap-1 px-3 py-2 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-xl text-xs font-semibold border border-emerald-500/30 transition-all active:scale-95"
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
