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
import { DescriptiveQuestion } from './types/question';

export function App() {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>('dashboard');
  const [selectedSubjectId, setSelectedSubjectId] = React.useState<string>('p2_law');
  const [activeDescriptiveQuestion, setActiveDescriptiveQuestion] = React.useState<DescriptiveQuestion | undefined>(undefined);
  const [isSearchModalOpen, setIsSearchModalOpen] = React.useState<boolean>(false);
  const [isGeneratorModalOpen, setIsGeneratorModalOpen] = React.useState<boolean>(false);
  const [isOfflineModalOpen, setIsOfflineModalOpen] = React.useState<boolean>(false);
  const [streakCount, setStreakCount] = React.useState<number>(4);

  const handleSelectSubjectFromDashboard = (subjectId: string, mode: 'mcqs' | 'descriptive') => {
    setSelectedSubjectId(subjectId);
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
          />
        )}

        {activeTab === 'mcqs' && (
          <McqPractice
            initialSubjectId={selectedSubjectId}
            onOpenGenerator={() => setIsGeneratorModalOpen(true)}
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
    </div>
  );
}

export default App;
