import React from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  PenTool, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  FileText
} from 'lucide-react';
import { CASE_STUDIES_DATABASE } from '../data/caseStudiesData';
import { CaseStudyQuestion, McqQuestion, DescriptiveQuestion } from '../types/question';
import { EvaluatorService } from '../services/evaluatorService';
import { AudioService } from '../services/audioService';
import { shuffleMcqOptions } from '../utils/mcqUtils';

export const CaseStudyLab: React.FC = () => {
  const [selectedCaseIndex, setSelectedCaseIndex] = React.useState<number>(0);
  const [selectedSubTab, setSelectedSubTab] = React.useState<'mcqs' | 'descriptive'>('mcqs');
  const [userMcqAnswers, setUserMcqAnswers] = React.useState<Record<string, string>>({});
  const [userDescAnswers, setUserDescAnswers] = React.useState<Record<string, string>>({});
  const [descEvaluation, setDescEvaluation] = React.useState<Record<string, ReturnType<typeof EvaluatorService.evaluateAnswer>>>({});

  const currentCase: CaseStudyQuestion = CASE_STUDIES_DATABASE[selectedCaseIndex] || CASE_STUDIES_DATABASE[0];
  const caseMcqs = React.useMemo(() => {
    return currentCase.mcqs.map(q => shuffleMcqOptions(q));
  }, [currentCase]);

  const handleSelectOption = (questionId: string, optId: string, correctId: string) => {
    if (userMcqAnswers[questionId]) return; // already answered
    setUserMcqAnswers(prev => ({ ...prev, [questionId]: optId }));
    if (optId === correctId) {
      AudioService.playCorrect();
    } else {
      AudioService.playWrong();
    }
  };

  const handleEvaluateDesc = (q: DescriptiveQuestion) => {
    const text = userDescAnswers[q.id] || '';
    if (text.length < 10) return;
    const result = EvaluatorService.evaluateAnswer(q, text);
    setDescEvaluation(prev => ({ ...prev, [q.id]: result }));
    if (result.percentage >= 60) {
      AudioService.playVictory();
    } else {
      AudioService.playWrong();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Case Selector Header */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Integrated Case Scenario Lab (15-30 Marks ICAI Pattern)</span>
          </div>
          <h2 className="text-xl font-bold text-white leading-tight">
            {currentCase.title}
          </h2>
          <span className="text-xs text-slate-400 font-medium">Source: {currentCase.source}</span>
        </div>

        {/* Case Switcher Buttons */}
        <div className="flex items-center gap-2">
          {CASE_STUDIES_DATABASE.map((cs, idx) => (
            <button
              key={cs.id}
              onClick={() => {
                setSelectedCaseIndex(idx);
                setUserMcqAnswers({});
                setDescEvaluation({});
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                selectedCaseIndex === idx
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              Case #{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Layout: Left = Scenario, Right = Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Case Scenario Narrative */}
        <div className="lg:col-span-6 bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-xl space-y-4 max-h-[800px] overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Comprehensive Business Scenario</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 text-xs font-bold border border-blue-800">
              Total: {currentCase.totalMarks} Marks
            </span>
          </div>

          <div className="text-sm text-slate-200 leading-relaxed font-serif whitespace-pre-line bg-slate-900/60 p-5 rounded-xl border border-slate-800">
            {currentCase.scenarioText}
          </div>
        </div>

        {/* Right Side: Linked Questions (MCQs + Descriptive) */}
        <div className="lg:col-span-6 bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-xl space-y-5 max-h-[800px] overflow-y-auto">
          
          {/* Sub-Tabs: MCQs vs Descriptive */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedSubTab('mcqs')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedSubTab === 'mcqs'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Linked MCQs ({currentCase.mcqs.length})</span>
              </button>

              <button
                onClick={() => setSelectedSubTab('descriptive')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedSubTab === 'descriptive'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Descriptive Problems ({currentCase.descriptiveQuestions.length})</span>
              </button>
            </div>
          </div>

          {/* Sub-Tab Content: MCQs */}
          {selectedSubTab === 'mcqs' && (
            <div className="space-y-6">
              {caseMcqs.map((mcq, qIdx) => {
                const selectedOpt = userMcqAnswers[mcq.id];
                const isAnswered = selectedOpt !== undefined;

                return (
                  <div key={mcq.id} className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400 font-mono">
                        Question {qIdx + 1} ({mcq.marks} Marks)
                      </span>
                      {mcq.icaiReference && (
                        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                          {mcq.icaiReference}
                        </span>
                      )}
                    </div>

                    <div className="text-sm font-medium text-slate-100 font-serif">
                      {mcq.questionText}
                    </div>

                    {/* Options */}
                    <div className="space-y-2 pt-1">
                      {mcq.options.map((opt, oIdx) => {
                        const letter = String.fromCharCode(65 + oIdx);
                        const isChosen = selectedOpt === opt.id;
                        const isCorrect = opt.id === mcq.correctOptionId;

                        let style = 'border-slate-700/60 bg-slate-800/60 hover:bg-slate-700/60 text-slate-200';
                        if (isAnswered) {
                          if (isCorrect) {
                            style = 'border-emerald-500 bg-emerald-950/40 text-emerald-200';
                          } else if (isChosen) {
                            style = 'border-rose-500 bg-rose-950/40 text-rose-200';
                          } else {
                            style = 'border-slate-800 bg-slate-900/40 text-slate-500 opacity-60';
                          }
                        }

                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectOption(mcq.id, opt.id, mcq.correctOptionId)}
                            disabled={isAnswered}
                            className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm flex items-start gap-2.5 transition-all ${style}`}
                          >
                            <span className="w-5 h-5 rounded bg-slate-900 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                              {letter}
                            </span>
                            <span className="flex-1">{opt.text}</span>
                            {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                            {isAnswered && isChosen && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {isAnswered && (
                      <div className="mt-3 p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1">
                        <span className="font-bold text-amber-400 block">Explanation:</span>
                        <p>{mcq.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Sub-Tab Content: Descriptive */}
          {selectedSubTab === 'descriptive' && (
            <div className="space-y-6">
              {currentCase.descriptiveQuestions.map((desc, dIdx) => {
                const text = userDescAnswers[desc.id] || '';
                const evalResult = descEvaluation[desc.id];

                return (
                  <div key={desc.id} className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400 font-mono">
                        Descriptive Part {dIdx + 1} ({desc.marks} Marks)
                      </span>
                      {desc.icaiReference && (
                        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                          {desc.icaiReference}
                        </span>
                      )}
                    </div>

                    <div className="text-sm font-medium text-slate-100 font-serif leading-relaxed whitespace-pre-line">
                      {desc.questionText}
                    </div>

                    {/* Answer area */}
                    <div className="space-y-2 pt-2">
                      <textarea
                        value={text}
                        onChange={(e) => setUserDescAnswers({ ...userDescAnswers, [desc.id]: e.target.value })}
                        placeholder="Write your answer citing relevant sections, standards, and calculations..."
                        rows={6}
                        className="w-full bg-slate-950 text-slate-100 rounded-lg p-3 text-xs font-mono border border-slate-700 focus:border-blue-500 focus:outline-none leading-relaxed"
                      />

                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-slate-400 font-mono">
                          {text.trim().split(/\s+/).filter(Boolean).length} words
                        </span>

                        <button
                          onClick={() => handleEvaluateDesc(desc)}
                          disabled={text.trim().length < 10}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold rounded-lg shadow-sm transition-all"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Evaluate Part</span>
                        </button>
                      </div>
                    </div>

                    {/* Evaluation Feedback */}
                    {evalResult && (
                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 animate-in fade-in duration-200">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">
                            Awarded: {evalResult.score} / {evalResult.maxMarks} Marks ({evalResult.percentage}%)
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                            {evalResult.grade}
                          </span>
                        </div>
                        <ul className="text-xs text-slate-300 space-y-1">
                          {evalResult.stepMarks.map((s, si) => (
                            <li key={si} className="flex items-start gap-1">
                              <span className="text-emerald-400">•</span>
                              <span><strong>{s.step}:</strong> {s.awarded}/{s.max}M — {s.feedback}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
