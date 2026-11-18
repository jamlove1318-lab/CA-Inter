import React from 'react';
import { Volume2, VolumeX, Flame } from 'lucide-react';
import { AudioService } from '../services/audioService';

export type ActiveTab = 'dashboard' | 'mcqs' | 'casestudies' | 'descriptive' | 'exam' | 'pastpapers' | 'gamezone';

interface NavbarProps {
  onGoHome: () => void;
  streakCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onGoHome,
  streakCount
}) => {
  const [soundOn, setSoundOn] = React.useState(AudioService.isEnabled());

  const handleToggleSound = () => {
    const newState = AudioService.toggleSound();
    setSoundOn(newState);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo & Branding */}
          <div 
            onClick={onGoHome}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
              <span className="text-base sm:text-xl">⚖️</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-amber-400 bg-clip-text text-transparent">
                  CA INTER PRO
                </span>
                <span className="px-1.5 py-0.2 text-[9px] sm:text-[10px] font-semibold bg-blue-950 text-blue-300 border border-blue-800 rounded-full">
                  ICAI NEW SCHEME
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-slate-400 font-medium">All 6 Papers • Unlimited Practice • AI Evaluator</p>
            </div>
          </div>

          {/* Clean Controls (Streak & Audio Only) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Streak Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-950/40 border border-amber-700/50 rounded-xl text-amber-400 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse" />
              <span>{streakCount}d Streak</span>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={handleToggleSound}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors border border-slate-700/60"
              title={soundOn ? 'Mute Sounds' : 'Unmute Sounds'}
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
