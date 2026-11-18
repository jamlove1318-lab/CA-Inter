import React from 'react';
import { AdjustmentItem } from '../../types/game';
import { CheckCircle2, XCircle, Clock, Award, Flame, Search } from 'lucide-react';
import { AudioService } from '../../services/audioService';

const ADJUSTMENTS_DATA: AdjustmentItem[] = [
  {
    id: 'adj_1',
    category: 'PGBP',
    description: 'Income Tax penalty of ₹ 15,000 paid for late filing of return, debited to P&L account.',
    correctAction: 'ADD',
    reason: 'Fines and penalties for infringement of law are inadmissible expenses and must be added back to Net Profit.',
    sectionOrStandard: 'Section 37(1) Explanation 1'
  },
  {
    id: 'adj_2',
    category: 'PGBP',
    description: 'Dividend received of ₹ 40,000 from domestic shares, credited to P&L Account.',
    correctAction: 'DEDUCT',
    reason: 'Dividend is taxable under Income from Other Sources (IFOS), so it must be deducted from Business Profit.',
    sectionOrStandard: 'Section 56(2)(i)'
  },
  {
    id: 'adj_3',
    category: 'PGBP',
    description: 'Payment of ₹ 28,000 made in cash to a raw material supplier in a single day.',
    correctAction: 'ADD',
    reason: 'Cash payments exceeding ₹ 10,000 in a day to a single person are 100% disallowed under Section 40A(3).',
    sectionOrStandard: 'Section 40A(3)'
  },
  {
    id: 'adj_4',
    category: 'PGBP',
    description: 'Depreciation allowable under Income Tax Rules computed at ₹ 62,000 (Books depreciation is ₹ 50,000).',
    correctAction: 'DEDUCT',
    reason: 'Allowable tax depreciation is deducted from profits after adding back accounting depreciation.',
    sectionOrStandard: 'Section 32(1)'
  },
  {
    id: 'adj_5',
    category: 'Cash Flow',
    description: 'Profit on sale of Plant and Machinery ₹ 35,000 credited to Statement of Profit and Loss.',
    correctAction: 'DEDUCT',
    reason: 'Non-operating gain must be deducted from Net Profit to arrive at Cash Flow from Operating Activities.',
    sectionOrStandard: 'AS 3 Cash Flow Statements'
  },
  {
    id: 'adj_6',
    category: 'Cost Sheet',
    description: 'Interest on Debentures paid ₹ 50,000.',
    correctAction: 'IGNORE',
    reason: 'Pure financial charges like debenture interest are strictly excluded from Cost Sheet.',
    sectionOrStandard: 'CAS-1 / Cost Sheet Principles'
  },
  {
    id: 'adj_7',
    category: 'PGBP',
    description: 'Interest on Capital paid to working partner @ 15% p.a. (authorized by partnership deed).',
    correctAction: 'ADD',
    reason: 'Interest to partners is allowed up to maximum 12% p.a. under Section 40(b). Excess 3% must be added back.',
    sectionOrStandard: 'Section 40(b)(iv)'
  },
  {
    id: 'adj_8',
    category: 'PGBP',
    description: 'General Reserve transfer of ₹ 1,00,000 debited to Profit and Loss Account.',
    correctAction: 'ADD',
    reason: 'Transfer to reserves is an appropriation of profit, not an allowable business expenditure.',
    sectionOrStandard: 'Section 28 / Section 37'
  },
  {
    id: 'adj_9',
    category: 'PGBP',
    description: 'Income Tax refund of ₹ 18,000 (including ₹ 2,000 interest) credited to P&L account.',
    correctAction: 'DEDUCT',
    reason: 'Income tax refund is not business income (tax refund is non-taxable, interest on refund is taxable under IFOS).',
    sectionOrStandard: 'Section 56(2)'
  },
  {
    id: 'adj_10',
    category: 'Cash Flow',
    description: 'Loss on sale of old motor car ₹ 25,000 debited to Profit and Loss statement.',
    correctAction: 'ADD',
    reason: 'Non-operating loss must be added back to Net Profit to determine Operating Cash Flow before working capital changes.',
    sectionOrStandard: 'AS 3 Cash Flow Statements'
  },
  {
    id: 'adj_11',
    category: 'Cash Flow',
    description: 'Increase in Trade Debtors during the year by ₹ 75,000.',
    correctAction: 'DEDUCT',
    reason: 'Increase in current assets indicates cash tied up in working capital and must be deducted from operating cash flow.',
    sectionOrStandard: 'AS 3 Indirect Method'
  },
  {
    id: 'adj_12',
    category: 'Cost Sheet',
    description: 'Primary packing cost of ₹ 8 per unit necessary to preserve the pharmaceutical product.',
    correctAction: 'ADD',
    reason: 'Primary packing is an integral part of Prime Cost and direct production cost.',
    sectionOrStandard: 'CAS-9 / Cost Accounting Standards'
  },
  {
    id: 'adj_13',
    category: 'PGBP',
    description: 'Donation of ₹ 50,000 paid to National Children Fund debited to Profit & Loss.',
    correctAction: 'ADD',
    reason: 'Charitable donations are not incurred wholly and exclusively for business; disallowed under Section 37(1).',
    sectionOrStandard: 'Section 37(1)'
  },
  {
    id: 'adj_14',
    category: 'PGBP',
    description: 'Under-valuation of closing stock in financial accounts by ₹ 40,000.',
    correctAction: 'ADD',
    reason: 'Under-valuation of closing stock artificially depresses Gross Profit and must be added back.',
    sectionOrStandard: 'Section 145A'
  },
  {
    id: 'adj_15',
    category: 'PGBP',
    description: 'Over-valuation of opening stock in financial accounts by ₹ 25,000.',
    correctAction: 'ADD',
    reason: 'Over-valuation of opening stock inflates debit side of P&L, understating profit. Must be added back.',
    sectionOrStandard: 'Section 145A'
  },
  {
    id: 'adj_16',
    category: 'Cash Flow',
    description: 'Depreciation on Plant and Machinery ₹ 1,20,000 charged to Profit and Loss.',
    correctAction: 'ADD',
    reason: 'Depreciation is a non-cash expense and must be added back to Net Profit under indirect method.',
    sectionOrStandard: 'AS 3 Cash Flow Statements'
  },
  {
    id: 'adj_17',
    category: 'PGBP',
    description: 'Municipal taxes of ₹ 12,000 on let-out commercial property debited to P&L account.',
    correctAction: 'ADD',
    reason: 'Expenses on let-out house property are deductible under Income from House Property, not PGBP.',
    sectionOrStandard: 'Section 24(a)'
  },
  {
    id: 'adj_18',
    category: 'Cost Sheet',
    description: 'Donation to political party of ₹ 20,000.',
    correctAction: 'IGNORE',
    reason: 'Purely political and non-manufacturing financial appropriations are strictly excluded from Cost Sheet.',
    sectionOrStandard: 'CAS-1 Cost Sheet'
  },
  {
    id: 'adj_19',
    category: 'PGBP',
    description: 'Provision for doubtful debts of ₹ 35,000 created during the year.',
    correctAction: 'ADD',
    reason: 'Only actual bad debts written off as irrecoverable u/s 36(1)(vii) are allowed. General provisions are disallowed.',
    sectionOrStandard: 'Section 36(1)(vii)'
  },
  {
    id: 'adj_20',
    category: 'Cash Flow',
    description: 'Decrease in Trade Creditors during the year by ₹ 30,000.',
    correctAction: 'DEDUCT',
    reason: 'Decrease in current liabilities represents cash outflow to pay suppliers.',
    sectionOrStandard: 'AS 3 Cash Flow Statements'
  }
];

interface AdjustmentDetectiveGameProps {
  onAddXp: (xp: number) => void;
}

export const AdjustmentDetectiveGame: React.FC<AdjustmentDetectiveGameProps> = ({ onAddXp }) => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [score, setScore] = React.useState<number>(0);
  const [streak, setStreak] = React.useState<number>(0);
  const [feedback, setFeedback] = React.useState<{ action: 'ADD' | 'DEDUCT' | 'IGNORE'; isCorrect: boolean } | null>(null);

  const currentItem = ADJUSTMENTS_DATA[currentIndex % ADJUSTMENTS_DATA.length];

  const handleAction = (action: 'ADD' | 'DEDUCT' | 'IGNORE') => {
    if (feedback !== null) return;
    const isCorrect = action === currentItem.correctAction;

    setFeedback({ action, isCorrect });
    if (isCorrect) {
      AudioService.playCorrect();
      setScore(prev => prev + 150);
      setStreak(prev => prev + 1);
      onAddXp(50);
    } else {
      AudioService.playWrong();
      setStreak(0);
    }

    setTimeout(() => {
      setFeedback(null);
      setCurrentIndex(prev => prev + 1);
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-5 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-700 flex items-center justify-center text-white shadow-md text-xl">
            🕵️
          </div>
          <div>
            <h3 className="font-extrabold text-white text-lg">Adjustment Detective</h3>
            <p className="text-xs text-slate-400">Classify adjustments for PGBP, Cash Flow & Cost Sheet!</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Score</span>
            <span className="text-sm font-extrabold text-cyan-400 font-mono">{score} pts</span>
          </div>

          <div className="flex items-center gap-1 px-3 py-1 bg-slate-900 rounded-xl border border-slate-700 text-xs font-bold text-amber-400 font-mono">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>{streak}x</span>
          </div>
        </div>
      </div>

      {/* Adjustment Card */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 space-y-6 shadow-2xl relative">
        <div className="flex items-center justify-between pb-3 border-b border-slate-700">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
            {currentItem.category} Adjustment
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Item #{currentIndex + 1}
          </span>
        </div>

        <div className="text-base sm:text-lg font-semibold text-slate-100 font-serif leading-relaxed text-center py-4">
          "{currentItem.description}"
        </div>

        {/* 3 Action Buttons */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <button
            onClick={() => handleAction('ADD')}
            disabled={feedback !== null}
            className="p-4 bg-emerald-950/60 hover:bg-emerald-800/80 border border-emerald-700/80 rounded-2xl text-emerald-300 font-black text-sm flex flex-col items-center justify-center gap-1 shadow-md transition-all hover:scale-105"
          >
            <span className="text-xl">➕</span>
            <span>ADD BACK</span>
          </button>

          <button
            onClick={() => handleAction('DEDUCT')}
            disabled={feedback !== null}
            className="p-4 bg-rose-950/60 hover:bg-rose-800/80 border border-rose-700/80 rounded-2xl text-rose-300 font-black text-sm flex flex-col items-center justify-center gap-1 shadow-md transition-all hover:scale-105"
          >
            <span className="text-xl">➖</span>
            <span>DEDUCT</span>
          </button>

          <button
            onClick={() => handleAction('IGNORE')}
            disabled={feedback !== null}
            className="p-4 bg-slate-900 hover:bg-slate-700 border border-slate-700 rounded-2xl text-slate-300 font-black text-sm flex flex-col items-center justify-center gap-1 shadow-md transition-all hover:scale-105"
          >
            <span className="text-xl">⚪</span>
            <span>IGNORE</span>
          </button>
        </div>

        {/* Instant Feedback Overlay */}
        {feedback && (
          <div className={`p-4 rounded-xl border space-y-1 animate-in fade-in duration-200 ${
            feedback.isCorrect ? 'bg-emerald-950/80 border-emerald-700 text-emerald-200' : 'bg-rose-950/80 border-rose-700 text-rose-200'
          }`}>
            <div className="flex items-center gap-2 font-bold text-xs">
              {feedback.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
              <span>{feedback.isCorrect ? 'Correct Adjustment!' : `Incorrect! Correct Action was: ${currentItem.correctAction}`}</span>
            </div>
            <p className="text-xs">{currentItem.reason}</p>
            <span className="text-[10px] font-mono text-cyan-300 block">Citation: {currentItem.sectionOrStandard}</span>
          </div>
        )}
      </div>
    </div>
  );
};
