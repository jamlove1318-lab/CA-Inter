import React from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  PenTool, 
  FileText, 
  Layers, 
  Gamepad2, 
  Archive, 
  Search, 
  Sparkles, 
  Volume2, 
  VolumeX,
  Flame,
  WifiOff,
  Smartphone,
  RotateCw,
  Compass
} from 'lucide-react';
import { AudioService } from '../services/audioService';

export type ActiveTab = 'dashboard' | 'mcqs' | 'descriptive' | 'casestudies' | 'exam' | 'pastpapers' | 'gamezone';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  openSearchModal: () => void;
  openGeneratorModal: () => void;
  openOfflineModal: () => void;
  openBeginnerGuide: () => void;
  streakCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openSearchModal,
  openGeneratorModal,
  openOfflineModal,
  openBeginnerGuide,
  streakCount
}) => {
  const [soundOn, setSoundOn] = React.useState(AudioService.isEnabled());

  const handleToggleSound = () => {
    const newState = AudioService.toggleSound();
    setSoundOn(newState);
  };

  const handleForceUpdate = async () => {
    try {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const reg of registrations) {
          await reg.unregister();
        }
      }
      if ('caches' in window) {
        const keys = await caches.keys();
        for (const key of keys) {
          await caches.delete(key);
        }
      }
    } catch (e) {
      console.error('Error clearing cache:', e);
    }
    const url = new URL(window.location.href);
    url.searchParams.set('v', Date.now().toString());
    window.location.href = url.toString();
  };

  const handleInstallApp = async () => {
    const promptEvent = (window as any).deferredInstallPrompt;
    if (promptEvent) {
      try {
        promptEvent.prompt();
        const choice = await promptEvent.userChoice;
        console.log('Install prompt result:', choice);
        (window as any).deferredInstallPrompt = null;
      } catch (e) {
        console.error('Error invoking install prompt:', e);
        openOfflineModal();
      }
    } else {
      openOfflineModal();
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Layers },
    { id: 'mcqs', label: 'MCQs Practice', icon: HelpCircle },
    { id: 'descriptive', label: 'Descriptive & Evaluator', icon: PenTool },
    { id: 'casestudies', label: 'Case Study Lab', icon: BookOpen },
    { id: 'exam', label: 'ICAI Exam Sim', icon: FileText },
    { id: 'pastpapers', label: 'PYQ / RTP / MTP Vault', icon: Archive },
    { id: 'gamezone', label: '🎮 CA Game Zone', icon: Gamepad2, highlight: true }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
              <span className="text-base sm:text-xl">⚖️</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-amber-400 bg-clip-text text-transparent">
                  CA INTER PRO
                </span>
                <span className="hidden xs:inline px-1.5 py-0.2 text-[9px] sm:text-[10px] font-semibold bg-blue-950 text-blue-300 border border-blue-800 rounded-full">
                  ICAI NEW SCHEME
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-slate-400 font-medium">All 6 Papers • PYQs • RTPs • AI Evaluator</p>
            </div>
          </div>

          {/* Quick Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Sync / Refresh from Server */}
            <button
              onClick={handleForceUpdate}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-amber-300 bg-amber-950/60 hover:bg-amber-900/60 rounded-lg border border-amber-700/60 transition-all shadow-sm"
              title="Refresh and Sync Latest Questions from Online Server"
            >
              <RotateCw className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="text-[11px] font-bold">Live Sync</span>
            </button>

            {/* Beginner Foundation Guide */}
            <button
              onClick={openBeginnerGuide}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-700/70 rounded-lg transition-all shadow-sm"
              title="Learn all subjects from scratch"
            >
              <Compass className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="hidden sm:inline">Learn from Scratch</span>
              <span className="sm:hidden">Scratch</span>
            </button>

            {/* Search Sections / Standards Directory */}
            <button
              onClick={openSearchModal}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg border border-slate-700 transition-all shadow-sm"
              title="Quick Search Sections, SAs, and AS"
            >
              <Search className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="hidden md:inline">Sections</span>
            </button>

            {/* Unlimited Generator Button */}
            <button
              onClick={openGeneratorModal}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-amber-200 bg-gradient-to-r from-amber-600/30 to-yellow-600/30 hover:from-amber-600/40 rounded-lg border border-amber-500/40 transition-all shadow-sm group"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">Unlimited Qs</span>
              <span className="sm:hidden font-bold text-[11px]">+ Qs</span>
            </button>

            {/* Streak Counter */}
            <div className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 bg-amber-950/40 border border-amber-700/50 rounded-lg text-amber-400 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse" />
              <span>{streakCount}d</span>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={handleToggleSound}
              className="p-1.5 sm:p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title={soundOn ? 'Mute Sounds' : 'Unmute Sounds'}
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as ActiveTab)}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? item.highlight
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/30 font-semibold'
                      : 'bg-blue-600 text-white shadow-md shadow-blue-600/20 font-semibold'
                    : item.highlight
                    ? 'text-purple-300 hover:bg-purple-950/40 hover:text-purple-200 border border-purple-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/70'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : item.highlight ? 'text-purple-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
