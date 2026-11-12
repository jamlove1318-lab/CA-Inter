import React from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { McqPractice } from './components/McqPractice';
import { DescriptiveWriter } from './components/DescriptiveWriter';
import { CaseStudyLab } from './components/CaseStudyLab';
import { ExamSimulator } from './components/ExamSimulator';
import { PastPapersVault } from './components/PastPapersVault';
import { GameZone } from './components/GameZone/GameZone';
import { SectionDirectoryModal } from './components/SectionDirectoryModal';
import { InfiniteQuestionModal } from './components/InfiniteQuestionModal';
import { OfflineModal } from './components/OfflineModal';
import { BeginnerGuideModal } from './components/BeginnerGuideModal';
import { DescriptiveQuestion } from './types/question';
import { Layers, HelpCircle, PenTool, FileText, Gamepad2, BookOpen } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>('dashboard');
  const [selectedSubjectId, setSelectedSubjectId] = React.useState<string>('p2_law');
  const [activeMasteryTier, setActiveMasteryTier] = React.useState<'all' | 'beginner' | 'intermediate' | 'hard'>('all');
  const [activeDescriptiveQuestion, setActiveDescriptiveQuestion] = React.useState<DescriptiveQuestion | undefined>(undefined);
  const [isSearchModalOpen, setIsSearchModalOpen] = React.useState<boolean>(false);
  const [isGeneratorModalOpen, setIsGeneratorModalOpen] = React.useState<boolean>(false);
  const [isOfflineModalOpen, setIsOfflineModalOpen] = React.useState<boolean>(false);
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

  const handleLoadGeneratedQuestion = (q: DescriptiveQuestion) => {
    setActiveDescriptiveQuestion(q);
    setSelectedSubjectId(q.subjectId);
    setActiveTab('descriptive');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openSearchModal={() => setIsSearchModalOpen(true)}
        openGeneratorModal={() => setIsGeneratorModalOpen(true)}
        openOfflineModal={() => setIsOfflineModalOpen(true)}
        openBeginnerGuide={() => handleOpenBeginnerGuide()}
        streakCount={streakCount}
      />

      {/* Main Content View */}
      <main className="flex-1 pb-16">
        {activeTab === 'dashboard' && (
          <Dashboard
            setActiveTab={setActiveTab}
            onSelectSubject={handleSelectSubjectFromDashboard}
            openSearchModal={() => setIsSearchModalOpen(true)}
            openGeneratorModal={() => setIsGeneratorModalOpen(true)}
            openBeginnerGuide={handleOpenBeginnerGuide}
          />
        )}

        {activeTab === 'mcqs' && (
          <McqPractice
            initialSubjectId={selectedSubjectId}
            initialMasteryTier={activeMasteryTier}
            onOpenGenerator={() => setIsGeneratorModalOpen(true)}
            onOpenBeginnerGuide={handleOpenBeginnerGuide}
          />
        )}

        {activeTab === 'descriptive' && (
          <DescriptiveWriter
            initialSubjectId={selectedSubjectId}
            initialQuestion={activeDescriptiveQuestion}
            onOpenGenerator={() => setIsGeneratorModalOpen(true)}
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

      {/* Mobile Bottom Navigation Bar for Instant 1-Tap Mobile Access */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 flex items-center justify-around py-1.5 px-1 shadow-2xl">
        {[
          { id: 'dashboard', label: 'Home', icon: Layers },
          { id: 'mcqs', label: 'MCQs', icon: HelpCircle },
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
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                isActive
                  ? item.highlight
                    ? 'text-purple-400 font-bold scale-105'
                    : 'text-blue-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? (item.highlight ? 'text-purple-400' : 'text-blue-400') : 'text-slate-400'}`} />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Quick Lookup Modals */}
      <SectionDirectoryModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />

      <InfiniteQuestionModal
        isOpen={isGeneratorModalOpen}
        onClose={() => setIsGeneratorModalOpen(false)}
        onLoadIntoWriter={handleLoadGeneratedQuestion}
      />

      <OfflineModal
        isOpen={isOfflineModalOpen}
        onClose={() => setIsOfflineModalOpen(false)}
      />

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
