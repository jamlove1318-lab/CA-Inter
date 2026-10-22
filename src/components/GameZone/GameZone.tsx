import React from 'react';
import { GameMode, GameState } from '../../types/game';
import { SectionBlitzGame } from './SectionBlitzGame';
import { BossFightGame } from './BossFightGame';
import { AdjustmentDetectiveGame } from './AdjustmentDetectiveGame';
import { Gamepad2, Award, Zap, Trophy, Shield, ArrowLeft } from 'lucide-react';

export const GameZone: React.FC = () => {
  const [activeGame, setActiveGame] = React.useState<GameMode | null>(null);

  const [gameState, setGameState] = React.useState<GameState>(() => {
    const saved = localStorage.getItem('ca_game_state_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      xp: 250,
      level: 2,
      rankTitle: 'Articleship Trainee',
      streakDays: 3,
      bossWins: 1,
      sectionBlitzHighScore: 800,
      badgesUnlocked: ['First MCQ Cleared', 'Section Detective']
    };
  });

  const saveState = (newState: GameState) => {
    setGameState(newState);
    localStorage.setItem('ca_game_state_v1', JSON.stringify(newState));
  };

  const handleAddXp = (amount: number) => {
    const newXp = gameState.xp + amount;
    const newLevel = Math.floor(newXp / 500) + 1;

    let newRank = 'Articleship Trainee';
    if (newLevel >= 8) newRank = 'CA Inter AIR Rankholder 🌟';
    else if (newLevel >= 5) newRank = 'Senior Audit Incharge';
    else if (newLevel >= 3) newRank = 'Semi-Qualified CA';

    saveState({
      ...gameState,
      xp: newXp,
      level: newLevel,
      rankTitle: newRank
    });
  };

  const handleBossDefeated = () => {
    const badges = [...gameState.badgesUnlocked];
    if (!badges.includes('Boss Conqueror')) {
      badges.push('Boss Conqueror');
    }
    saveState({
      ...gameState,
      bossWins: gameState.bossWins + 1,
      badgesUnlocked: badges
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Gamification Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 border border-purple-800/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-600 text-purple-300 text-xs font-bold">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Dedicated Gamified Learning Arena</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              CA Inter Arcade & Practice Arena
            </h1>
            <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
              Master sections, standards, tax provisions, and audit opinions through interactive games!
            </p>
          </div>

          {/* Player Rank Card */}
          <div className="bg-slate-950/80 border border-purple-700/60 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shrink-0 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-600 flex items-center justify-center text-white text-2xl font-black shadow-lg">
              {gameState.level}
            </div>
            <div>
              <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider block">
                Current Title & Rank
              </span>
              <div className="font-extrabold text-white text-base">
                {gameState.rankTitle}
              </div>
              <div className="text-xs text-amber-400 font-mono font-bold">
                {gameState.xp} Total XP • Level {gameState.level}
              </div>
            </div>
          </div>
        </div>

        {/* Glow */}
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Back Button if inside a game */}
      {activeGame !== null && (
        <button
          onClick={() => setActiveGame(null)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Game Selection</span>
        </button>
      )}

      {/* Main Content Area */}
      {activeGame === null ? (
        /* Game Selection Cards Grid */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Section Blitz */}
            <div 
              onClick={() => setActiveGame('section_blitz')}
              className="bg-slate-800 rounded-3xl border border-slate-700 hover:border-amber-500/60 p-6 shadow-xl transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-600 flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Speed Matching</span>
                  <h3 className="text-xl font-extrabold text-white">Section & SA Speed Blitz</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Fast 60-second card-matching challenge. Match Companies Act Sections, SAs, and AS to their core legal rule!
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-700/60 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400">
                  Record: {gameState.sectionBlitzHighScore} pts
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md transition-colors">
                  Play Blitz
                </span>
              </div>
            </div>

            {/* Card 2: Boss Battle */}
            <div 
              onClick={() => setActiveGame('boss_battle')}
              className="bg-slate-800 rounded-3xl border border-slate-700 hover:border-rose-500/60 p-6 shadow-xl transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-800 flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform">
                  👹
                </div>
                <div>
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">Boss Battle</span>
                  <h3 className="text-xl font-extrabold text-white">ICAI Examiner Boss Battle</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Defeat the Chief Examiner by answering tough questions! Use lifelines (50:50, Hint) and protect your 3 hearts.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-700/60 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-400">
                  {gameState.bossWins} Boss Defeats
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md transition-colors">
                  Fight Boss
                </span>
              </div>
            </div>

            {/* Card 3: Adjustment Detective */}
            <div 
              onClick={() => setActiveGame('adjustment_detective')}
              className="bg-slate-800 rounded-3xl border border-slate-700 hover:border-cyan-500/60 p-6 shadow-xl transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-700 flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform">
                  🕵️
                </div>
                <div>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Rapid Classification</span>
                  <h3 className="text-xl font-extrabold text-white">Adjustment Detective</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Add back, deduct, or ignore? Rapidly classify tricky tax, cash flow, and cost sheet adjustments to rack up combos!
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-700/60 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400">
                  PGBP & Cash Flow
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md transition-colors">
                  Start Detective
                </span>
              </div>
            </div>
          </div>

          {/* Badges Shelf */}
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Unlocked Achievement Badges</span>
            </div>

            <div className="flex flex-wrap gap-3">
              {gameState.badgesUnlocked.map((badge, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl flex items-center gap-2 text-xs font-bold text-amber-300 shadow-sm"
                >
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>{badge}</span>
                </div>
              ))}
              <div className="px-4 py-2 bg-slate-900/40 border border-dashed border-slate-700 rounded-xl flex items-center gap-2 text-xs text-slate-500 font-medium">
                <Shield className="w-4 h-4" />
                <span>Next: All-India Rankholder (Level 8)</span>
              </div>
            </div>
          </div>
        </div>
      ) : activeGame === 'section_blitz' ? (
        <SectionBlitzGame onAddXp={handleAddXp} />
      ) : activeGame === 'boss_battle' ? (
        <BossFightGame onAddXp={handleAddXp} onBossDefeated={handleBossDefeated} />
      ) : (
        <AdjustmentDetectiveGame onAddXp={handleAddXp} />
      )}
    </div>
  );
};
