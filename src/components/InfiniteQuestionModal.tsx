import React from 'react';
import { Sparkles, X, ArrowRight, RefreshCw, PenTool, BookOpen } from 'lucide-react';
import { QuestionGeneratorService } from '../services/questionGeneratorService';
import { DescriptiveQuestion } from '../types/question';

interface InfiniteQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadIntoWriter: (q: DescriptiveQuestion) => void;
}

export const InfiniteQuestionModal: React.FC<InfiniteQuestionModalProps> = ({
  isOpen,
  onClose,
  onLoadIntoWriter
}) => {
  const [selectedTopic, setSelectedTopic] = React.useState<string>('costing');
  const [generatedQuestion, setGeneratedQuestion] = React.useState<DescriptiveQuestion | null>(null);
  const [isGenerating, setIsGenerating] = React.useState<boolean>(false);

  if (!isOpen) return null;

  const topics = [
    { key: 'costing', label: 'Costing: Standard Costing Variances (10M)', icon: '📊' },
    { key: 'tax', label: 'Taxation: Section 115BAC Income & Tax (8M)', icon: '🧾' },
    { key: 'law', label: 'Law: CSR Sec 135 & Ongoing Projects (6M)', icon: '⚖️' },
    { key: 'audit', label: 'Audit: SA 705 Materiality & Opinions (5M)', icon: '🛡️' },
    { key: 'fm', label: 'FM: Capital Budgeting CFAT & Salvage (6M)', icon: '📈' },
    { key: 'accounts', label: 'Accounts: AS 16 Borrowing Cost (5M)', icon: '🧮' }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const q = QuestionGeneratorService.generateDynamicDescriptiveQuestion(selectedTopic);
      setGeneratedQuestion(q);
      setIsGenerating(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-yellow-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-lg">Unlimited Dynamic ICAI Question Generator</h3>
              <p className="text-xs text-slate-400">Algorithmic question synthesis with unique values, model solutions & rubrics</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Topic Selector */}
        <div className="p-4 bg-slate-900 border-b border-slate-700 space-y-3">
          <label className="text-xs font-bold text-slate-300 block">Select Target Blueprint / Topic:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {topics.map((t) => (
              <button
                key={t.key}
                onClick={() => setSelectedTopic(t.key)}
                className={`p-2.5 rounded-xl border text-xs font-semibold text-left flex items-center gap-2 transition-all ${
                  selectedTopic === t.key
                    ? 'bg-amber-600/30 border-amber-500 text-white shadow-sm'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <span>{t.icon}</span>
                <span className="truncate">{t.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-amber-600/20 transition-all hover:scale-105"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Question...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Brand New Question</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Generated Preview */}
        <div className="p-6 overflow-y-auto space-y-4">
          {generatedQuestion ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-950 text-amber-300 border border-amber-800">
                  {generatedQuestion.source} • {generatedQuestion.marks} Marks
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {generatedQuestion.difficulty}
                </span>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 text-sm text-slate-100 font-serif leading-relaxed whitespace-pre-line">
                {generatedQuestion.questionText}
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    onLoadIntoWriter(generatedQuestion);
                    onClose();
                  }}
                  className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                >
                  <PenTool className="w-4 h-4" />
                  <span>Solve in Answer Evaluator</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center mx-auto text-amber-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-slate-300">
                Click "Generate Brand New Question" to create an infinite supply of fresh ICAI variations!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
