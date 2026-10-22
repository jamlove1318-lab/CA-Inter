import React from 'react';
import { 
  Archive, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  ArrowRight,
  Filter,
  Calendar,
  Layers,
  PenTool
} from 'lucide-react';
import { PAST_PAPERS_VAULT, PastPaperMetadata } from '../data/pastPapersData';
import { CA_INTER_SUBJECTS } from '../data/subjectsData';
import { ActiveTab } from './Navbar';

interface PastPapersVaultProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectSubject: (subjectId: string, mode: 'mcqs' | 'descriptive') => void;
}

export const PastPapersVault: React.FC<PastPapersVaultProps> = ({
  setActiveTab,
  onSelectSubject
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = React.useState<string>('all');
  const [selectedType, setSelectedType] = React.useState<'All' | 'Past Exam' | 'RTP' | 'MTP'>('All');

  const filteredPapers = PAST_PAPERS_VAULT.filter(p => {
    if (selectedSubjectId !== 'all' && p.subjectId !== selectedSubjectId) return false;
    if (selectedType !== 'All' && p.type !== selectedType) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Archive className="w-4 h-4" />
            <span>ICAI Past Papers, RTPs & MTPs Vault</span>
          </div>
          <h1 className="text-2xl font-bold text-white">
            Evaluated Past Year Exam Papers & Official Revision Test Papers
          </h1>
          <p className="text-xs text-slate-400">
            All questions extracted with ICAI Examiner Observations, marking traps, and model answers.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {(['All', 'Past Exam', 'RTP', 'MTP'] as const).map(t => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                selectedType === t
                  ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedSubjectId('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            selectedSubjectId === 'all'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
          }`}
        >
          All Subjects ({PAST_PAPERS_VAULT.length} Papers)
        </button>
        {CA_INTER_SUBJECTS.map(s => (
          <button
            key={s.id}
            onClick={() => setSelectedSubjectId(s.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedSubjectId === s.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
            }`}
          >
            {s.code}: {s.title}
          </button>
        ))}
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPapers.map(paper => {
          const subject = CA_INTER_SUBJECTS.find(s => s.id === paper.subjectId);

          return (
            <div
              key={paper.id}
              className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-md hover:border-slate-600 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                
                {/* Session & Type Badges */}
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                    paper.type === 'Past Exam'
                      ? 'bg-blue-950 text-blue-300 border-blue-800'
                      : paper.type === 'RTP'
                      ? 'bg-amber-950 text-amber-300 border-amber-800'
                      : 'bg-purple-950 text-purple-300 border-purple-800'
                  }`}>
                    {paper.type} • {paper.session}
                  </span>

                  <span className="text-xs font-bold text-amber-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    ICAI Toughness: {paper.difficultyRating}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  {paper.title}
                </h3>

                <div className="text-xs text-slate-400 font-medium">
                  {subject?.code} • {subject?.group} • 100 Marks (3 Hours)
                </div>

                {/* Key Topics Tested */}
                <div className="space-y-1.5 pt-2 border-t border-slate-700/60">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Core Topics Tested in this Session:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {paper.keyTopicsTested.map((topic, ti) => (
                      <span key={ti} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[11px] border border-slate-700/80">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Examiner Observations */}
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>ICAI Examiner Feedback & Common Mistakes:</span>
                  </span>
                  <p className="text-xs text-slate-300/90 leading-relaxed font-sans">
                    {paper.examinerObservations}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-700/60 flex items-center gap-3">
                <button
                  onClick={() => {
                    onSelectSubject(paper.subjectId, 'descriptive');
                    setActiveTab('descriptive');
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md transition-all"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Solve Descriptive Problems</span>
                </button>

                <button
                  onClick={() => {
                    onSelectSubject(paper.subjectId, 'mcqs');
                    setActiveTab('mcqs');
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition-all"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  <span>Practice MCQs</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
