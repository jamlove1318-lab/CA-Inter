import React from 'react';
import { Clock, Zap, Award, RotateCcw, Volume2, Flame } from 'lucide-react';
import { SECTIONS_AND_STANDARDS, StatutoryItem } from '../../data/sectionsAndStandardsData';
import { AudioService } from '../../services/audioService';

interface SectionBlitzGameProps {
  onAddXp: (xp: number) => void;
}

export const SectionBlitzGame: React.FC<SectionBlitzGameProps> = ({ onAddXp }) => {
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [timeLeft, setTimeLeft] = React.useState<number>(60);
  const [score, setScore] = React.useState<number>(0);
  const [combo, setCombo] = React.useState<number>(1);
  const [currentPrompt, setCurrentPrompt] = React.useState<StatutoryItem | null>(null);
  const [options, setOptions] = React.useState<StatutoryItem[]>([]);
  const [feedback, setFeedback] = React.useState<'correct' | 'wrong' | null>(null);
  const [highScore, setHighScore] = React.useState<number>(() => {
    return parseInt(localStorage.getItem('ca_section_blitz_highscore') || '0', 10);
  });

  const nextRound = () => {
    if (SECTIONS_AND_STANDARDS.length < 4) return;
    const shuffled = [...SECTIONS_AND_STANDARDS].sort(() => Math.random() - 0.5);
    const target = shuffled[0];
    const choices = shuffled.slice(0, 4).sort(() => Math.random() - 0.5);
    setCurrentPrompt(target);
    setOptions(choices);
    setFeedback(null);
  };

  const startGame = () => {
    setIsPlaying(true);
    setTimeLeft(60);
    setScore(0);
    setCombo(1);
    nextRound();
  };

  React.useEffect(() => {
    let timer: any;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleGameOver();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const handleGameOver = () => {
    setIsPlaying(false);
    AudioService.playVictory();
    onAddXp(score);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('ca_section_blitz_highscore', score.toString());
    }
  };

  const handleChoose = (chosenItem: StatutoryItem) => {
    if (!currentPrompt || feedback !== null) return;

    if (chosenItem.id === currentPrompt.id) {
      // Correct!
      AudioService.playCorrect();
      if (combo >= 3) AudioService.playCombo();

      const earned = 100 * combo;
      setScore(prev => prev + earned);
      setCombo(prev => Math.min(prev + 1, 5));
      setFeedback('correct');

      setTimeout(() => {
        nextRound();
      }, 400);
    } else {
      // Wrong
      AudioService.playWrong();
      setCombo(1);
      setFeedback('wrong');

      setTimeout(() => {
        nextRound();
      }, 600);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Game Dashboard Header */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-5 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-600 flex items-center justify-center text-white shadow-md font-bold text-xl">
            ⚡
          </div>
          <div>
            <h3 className="font-extrabold text-white text-lg">Section & SA Speed Blitz</h3>
            <p className="text-xs text-slate-400">Match the Section / Standard to its legal principle before time runs out!</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">High Score</span>
            <span className="text-sm font-extrabold text-amber-400 font-mono">{highScore} pts</span>
          </div>

          {isPlaying && (
            <div className="px-3.5 py-1.5 rounded-xl bg-amber-950/80 border border-amber-600 flex items-center gap-2 text-amber-300 font-mono font-bold text-sm">
              <Clock className="w-4 h-4 text-amber-400 animate-spin" />
              <span>{timeLeft}s</span>
            </div>
          )}
        </div>
      </div>

      {!isPlaying ? (
        /* Welcome / Start Screen */
        <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-10 text-center space-y-6 shadow-xl">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-800">
              60-Second Rapid Fire Challenge
            </span>
            <h2 className="text-2xl font-black text-white">
              Test Your Mastery of Companies Act, Tax & Standards on Auditing!
            </h2>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Get streak combos up to 5x multiplier for consecutive correct matches. Earn XP and level up your CA rank!
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={startGame}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-orange-600/30 transition-all hover:scale-105"
            >
              Start Speed Blitz (60s)
            </button>
          </div>
        </div>
      ) : (
        /* Active Game Arena */
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          
          {/* Combo & Score Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-white font-mono">{score}</span>
              <span className="text-xs text-slate-400">points</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700">
              <Flame className="w-4 h-4 text-orange-400 fill-orange-400 animate-pulse" />
              <span className="text-xs font-bold text-orange-400 font-mono">{combo}x Combo!</span>
            </div>
          </div>

          {/* Prompt Card */}
          {currentPrompt && (
            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-700 text-center space-y-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-950 text-blue-300 border border-blue-800">
                {currentPrompt.category}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                {currentPrompt.code}
              </div>
              <p className="text-xs text-slate-400">Which provision belongs to this Section or Standard?</p>
            </div>
          )}

          {/* 4 Choices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {options.map((opt) => {
              const isTarget = currentPrompt?.id === opt.id;
              let btnStyle = 'bg-slate-900/70 border-slate-700 hover:bg-slate-700 text-slate-200';

              if (feedback === 'correct' && isTarget) {
                btnStyle = 'bg-emerald-600 border-emerald-500 text-white font-bold scale-[1.02] shadow-lg shadow-emerald-600/30';
              } else if (feedback === 'wrong') {
                if (isTarget) btnStyle = 'bg-emerald-600/70 border-emerald-500 text-white font-bold';
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleChoose(opt)}
                  disabled={feedback !== null}
                  className={`p-4 rounded-xl border text-left transition-all text-xs sm:text-sm font-medium flex flex-col justify-between min-h-[90px] ${btnStyle}`}
                >
                  <span className="font-bold text-slate-100">{opt.title}</span>
                  <span className="text-[11px] text-slate-400 line-clamp-2 mt-1">{opt.keyRule}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
