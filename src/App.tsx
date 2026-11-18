import React from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { McqPractice } from './components/McqPractice';
import { DescriptiveWriter } from './components/DescriptiveWriter';
import { CaseStudyLab } from './components/CaseStudyLab';
import { ExamSimulator } from './components/ExamSimulator';
import { PastPapersVault } from './components/PastPapersVault';
import { GameZone } from './components/GameZone/GameZone';
import { BeginnerGuideModal } from './components/BeginnerGuideModal';
import { DescriptiveQuestion } from './types/question';
import { Layers, HelpCircle, PenTool, FileText, Gamepad2, BookOpen } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>('dashboard');
  const [selectedSubjectId, setSelectedSubjectId] = React.useState<string>('p2_law');
  const [activeMasteryTier, setActiveMasteryTier] = React.useState<'all' | 'beginner' | 'intermediate' | 'hard'>('all');
  const [activeDescriptiveQuestion, setActiveDescriptiveQuestion] = React.useState<DescriptiveQuestion | undefined>(undefined);
  const [isBeginnerGuideOpen, setIsBeginnerGuideOpen] = React.useState<boolean>(false);
  const [beginnerGuideSubjectId, setBeginnerGuideSubjectId] = React.useState<string | undefined>(undefined);
  const [streakCount, setStreakCount] = React.useState<number>(4);

  const handleSelectSubjectFromDashboard = (
    subjectId: string, 
    mode: 'mcqs' | 'descriptive',
    tier?: 'all' | 'beginner' | 'intermediate' | 'hard'
  ) => {
    setSelectedSubjectId(subjectId);
    if (tier) setActiveMasteryTier(tier);
    setActiveTab(mode);
  };

  const handleOpenBeginnerGuide = (subjectId?: string) => {
    setBeginnerGuideSubjectId(subjectId);
    setIsBeginnerGuideOpen(true);
  };

  const handleStartBeginnerPractice = (subjectId: string, mode: 'mcqs' | 'descriptive') => {
    setSelectedSubjectId(subjectId);
    setActiveMasteryTier('beginner');
    setActiveTab(mode);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar (Clean & Minimalist) */}
      <Navbar
        onGoHome={() => setActiveTab('dashboard')}
        streakCount={streakCount}
      />

      {/* Main Content View */}
      <main className="flex-1 pb-24">
        {activeTab === 'dashboard' && (
          <Dashboard
            setActiveTab={setActiveTab}
            onSelectSubject={handleSelectSubjectFromDashboard}
            openBeginnerGuide={handleOpenBeginnerGuide}
          />
        )}

        {activeTab === 'mcqs' && (
          <McqPractice
            initialSubjectId={selectedSubjectId}
            initialMasteryTier={activeMasteryTier}
            onOpenBeginnerGuide={handleOpenBeginnerGuide}
          />
        )}

        {activeTab === 'descriptive' && (
          <DescriptiveWriter
            initialSubjectId={selectedSubjectId}
            initialQuestion={activeDescriptiveQuestion}
          />
        )}

        {activeTab === 'casestudies' && (
          <CaseStudyLab />
        )}

        {activeTab === 'exam' && (
          <ExamSimulator />
        )}

        {activeTab === 'pastpapers' && (
          <PastPapersVault
            setActiveTab={setActiveTab}
            onSelectSubject={handleSelectSubjectFromDashboard}
          />
        )}

        {activeTab === 'gamezone' && (
          <GameZone />
        )}
      </main>

      {/* Universal Bottom Navigation Bar (Persistent & 1-Tap Access for Mobile & Desktop) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 shadow-2xl">
        <div className="max-w-2xl mx-auto flex items-center justify-around py-1.5 px-2">
          {[
            { id: 'dashboard', label: 'Home', icon: Layers },
            { id: 'mcqs', label: 'MCQs', icon: HelpCircle },
            { id: 'casestudies', label: 'Case Study', icon: BookOpen },
            { id: 'descriptive', label: 'Evaluator', icon: PenTool },
            { id: 'exam', label: 'Exam', icon: FileText },
            { id: 'gamezone', label: 'Arcade', icon: Gamepad2, highlight: true }
          ].map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as ActiveTab)}
                className={`flex flex-col items-center justify-center py-1 px-2.5 sm:px-4 rounded-xl transition-all ${
                  isActive
                    ? item.highlight
                      ? 'text-purple-400 font-bold scale-105 bg-purple-950/40'
                      : 'text-blue-400 font-bold scale-105 bg-blue-950/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? (item.highlight ? 'text-purple-400' : 'text-blue-400') : 'text-slate-400'}`} />
                <span className="text-[10px] sm:text-xs mt-0.5 whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Primer Guide Modal for Freshers */}
      <BeginnerGuideModal
        isOpen={isBeginnerGuideOpen}
        onClose={() => setIsBeginnerGuideOpen(false)}
        initialSubjectId={beginnerGuideSubjectId}
        onStartBeginnerPractice={handleStartBeginnerPractice}
      />
    </div>
  );
}

export default App;
