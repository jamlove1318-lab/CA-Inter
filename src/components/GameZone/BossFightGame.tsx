import React from 'react';
import { Heart, Shield, Sparkles, HelpCircle, Flame, Award, Skull, AlertCircle } from 'lucide-react';
import { MCQS_DATABASE } from '../../data/questionsData';
import { McqQuestion } from '../../types/question';
import { AudioService } from '../../services/audioService';
import { QuestionGeneratorService } from '../../services/questionGeneratorService';
import { shuffleMcqOptions } from '../../utils/mcqUtils';

interface BossFightGameProps {
  onAddXp: (xp: number) => void;
  onBossDefeated: () => void;
}

export const BossFightGame: React.FC<BossFightGameProps> = ({ onAddXp, onBossDefeated }) => {
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [bossHp, setBossHp] = React.useState<number>(1000);
  const [playerHearts, setPlayerHearts] = React.useState<number>(3);
  const [currentQIndex, setCurrentQIndex] = React.useState<number>(0);
  const [eliminatedOptions, setEliminatedOptions] = React.useState<string[]>([]);
  const [usedLifelines, setUsedLifelines] = React.useState<{ fiftyFifty: boolean; hint: boolean }>({
    fiftyFifty: false,
    hint: false
  });
  const [showHint, setShowHint] = React.useState<boolean>(false);
  const [gameResult, setGameResult] = React.useState<'win' | 'lose' | null>(null);

  // Dynamic & randomized high-importance questions for boss fight with shuffled options
  const [bossQuestions, setBossQuestions] = React.useState<McqQuestion[]>(() => {
    const highYield = MCQS_DATABASE.filter(q => q.importance === 'HIGH');
    const shuffled = [...highYield].sort(() => Math.random() - 0.5);
    const questions = shuffled.slice(0, 8).map(q => shuffleMcqOptions(q));
    while (questions.length < 6) {
      questions.push(shuffleMcqOptions(QuestionGeneratorService.generateDynamicMcq('all')));
    }
    return questions;
  });

  const currentQuestion: McqQuestion = bossQuestions[currentQIndex] || bossQuestions[0];

  const startBattle = () => {
    const highYield = MCQS_DATABASE.filter(q => q.importance === 'HIGH');
    const shuffled = [...highYield].sort(() => Math.random() - 0.5);
    const questions = shuffled.slice(0, 8).map(q => shuffleMcqOptions(q));
    while (questions.length < 6) {
      questions.push(shuffleMcqOptions(QuestionGeneratorService.generateDynamicMcq('all')));
    }
    setBossQuestions(questions);
    setIsPlaying(true);
    setBossHp(1000);
    setPlayerHearts(3);
    setCurrentQIndex(0);
    setEliminatedOptions([]);
    setUsedLifelines({ fiftyFifty: false, hint: false });
    setShowHint(false);
    setGameResult(null);
  };

  const handleChoose = (optId: string) => {
    if (!currentQuestion || gameResult) return;

    if (optId === currentQuestion.correctOptionId) {
      // Hit Boss!
      AudioService.playBossHit();
      const newHp = Math.max(0, bossHp - 250);
      setBossHp(newHp);

      if (newHp <= 0) {
        // Victory!
        AudioService.playVictory();
        setGameResult('win');
        onAddXp(500);
        onBossDefeated();
        return;
      }

      // Next question
      setTimeout(() => {
        if (currentQIndex >= bossQuestions.length - 2) {
          setBossQuestions(prev => [
            ...prev,
            shuffleMcqOptions(QuestionGeneratorService.generateDynamicMcq('all'))
          ]);
        }
        setCurrentQIndex(prev => prev + 1);
        setEliminatedOptions([]);
        setShowHint(false);
      }, 500);
    } else {
      // Take damage!
      AudioService.playWrong();
      const newHearts = playerHearts - 1;
      setPlayerHearts(newHearts);

      if (newHearts <= 0) {
        // Player defeated
        setGameResult('lose');
        return;
      }
    }
  };

  const useFiftyFifty = () => {
    if (usedLifelines.fiftyFifty || !currentQuestion) return;
    const wrongOptions = currentQuestion.options.filter(o => o.id !== currentQuestion.correctOptionId);
    const toEliminate = wrongOptions.slice(0, 2).map(o => o.id);
    setEliminatedOptions(toEliminate);
    setUsedLifelines(prev => ({ ...prev, fiftyFifty: true }));
    AudioService.playCorrect();
  };

  const useHint = () => {
    if (usedLifelines.hint || !currentQuestion) return;
    setShowHint(true);
    setUsedLifelines(prev => ({ ...prev, hint: true }));
  };

  const bossHpPercentage = Math.round((bossHp / 1000) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Header Arena */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-5 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-600 to-red-800 flex items-center justify-center text-white shadow-md font-bold text-xl">
            👹
          </div>
          <div>
            <h3 className="font-extrabold text-white text-lg">ICAI Chief Examiner Boss Battle</h3>
            <p className="text-xs text-slate-400">Defeat the Examiner with correct statutory analysis!</p>
          </div>
        </div>

        {/* Player Hearts */}
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700">
          <span className="text-xs font-bold text-slate-400 mr-1">Player:</span>
          {Array.from({ length: 3 }).map((_, i) => (
            <Heart
              key={i}
              className={`w-5 h-5 ${
                i < playerHearts ? 'text-rose-500 fill-rose-500' : 'text-slate-600'
              }`}
            />
          ))}
        </div>
      </div>

      {!isPlaying ? (
        /* Welcome Screen */
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-10 text-center space-y-6 shadow-xl">
          <div className="w-20 h-20 rounded-full bg-rose-950/60 border border-rose-800/80 flex items-center justify-center text-4xl mx-auto shadow-inner">
            👹
          </div>
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-950 text-rose-300 border border-rose-800">
              High-Stakes Boss Arena
            </span>
            <h2 className="text-2xl font-black text-white">
              Face the Stern ICAI Chief Examiner!
            </h2>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Answer the examiner's trickiest questions correctly to deal damage. Lose all 3 hearts and the examiner fails your paper!
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={startBattle}
              className="px-8 py-3.5 bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-rose-900/30 transition-all hover:scale-105"
            >
              Enter Boss Arena
            </button>
          </div>
        </div>
      ) : (
        /* Active Boss Arena */
        <div className="space-y-5">
          
          {/* Boss HP Bar */}
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-5 shadow-xl space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-rose-400 flex items-center gap-1.5">
                <Skull className="w-4 h-4" />
                <span>Chief Examiner HP</span>
              </span>
              <span className="text-white font-mono">{bossHp} / 1000 HP ({bossHpPercentage}%)</span>
            </div>

            <div className="w-full bg-slate-900 rounded-full h-4 overflow-hidden border border-slate-700">
              <div
                className="bg-gradient-to-r from-red-600 to-rose-500 h-full transition-all duration-300 rounded-full shadow-inner"
                style={{ width: `${bossHpPercentage}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-blue-950 text-blue-300 border border-blue-800">
                {currentQuestion.source}
              </span>

              {/* Lifelines Bar */}
              <div className="flex items-center gap-2">
                <button
                  onClick={useFiftyFifty}
                  disabled={usedLifelines.fiftyFifty}
                  className="px-2.5 py-1 text-xs font-bold bg-slate-900 hover:bg-slate-700 disabled:opacity-30 text-amber-400 rounded-lg border border-slate-700"
                >
                  50:50 Lifeline
                </button>
                <button
                  onClick={useHint}
                  disabled={usedLifelines.hint}
                  className="px-2.5 py-1 text-xs font-bold bg-slate-900 hover:bg-slate-700 disabled:opacity-30 text-blue-400 rounded-lg border border-slate-700"
                >
                  ICAI Hint
                </button>
              </div>
            </div>

            {/* Hint Box */}
            {showHint && currentQuestion.trapNote && (
              <div className="p-3 bg-blue-950/40 border border-blue-800/60 rounded-xl text-xs text-blue-200">
                <strong>Study Material Clue:</strong> {currentQuestion.trapNote}
              </div>
            )}

            <div className="text-sm sm:text-base font-semibold text-slate-100 font-serif leading-relaxed">
              {currentQuestion.questionText}
            </div>

            {/* Options */}
            <div className="space-y-2.5 pt-2">
              {currentQuestion.options.map((opt, idx) => {
                const isEliminated = eliminatedOptions.includes(opt.id);
                if (isEliminated) return null; // 50:50 removed

                const letter = String.fromCharCode(65 + idx);
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleChoose(opt.id)}
                    className="w-full text-left p-3.5 bg-slate-900/80 hover:bg-slate-700/60 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-200 flex items-start gap-3 transition-all"
                  >
                    <span className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {letter}
                    </span>
                    <span className="flex-1">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Win/Lose Modal */}
      {gameResult && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="text-4xl">
              {gameResult === 'win' ? '🏆' : '💀'}
            </div>
            <h3 className="text-2xl font-black text-white">
              {gameResult === 'win' ? 'Examiner Defeated!' : 'Paper Handed Back!'}
            </h3>
            <p className="text-xs text-slate-300">
              {gameResult === 'win'
                ? 'Outstanding! You answered correctly and earned +500 XP! The Examiner grants you Exemption!'
                : 'The Examiner caught you in tricky distractors. Review your high-yield provisions and try again!'}
            </p>
            <div className="pt-2">
              <button
                onClick={startBattle}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
