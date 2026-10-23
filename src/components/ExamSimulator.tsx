import React from 'react';
import { 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  PenTool, 
  Flag, 
  ChevronRight, 
  ChevronLeft, 
  Send,
  Eye,
  Award,
  BookOpen
} from 'lucide-react';
import { CA_INTER_SUBJECTS } from '../data/subjectsData';
import { MCQS_DATABASE, DESCRIPTIVE_DATABASE } from '../data/questionsData';
import { QuestionGeneratorService } from '../services/questionGeneratorService';
import { EvaluatorService } from '../services/evaluatorService';
import { AudioService } from '../services/audioService';
import { shuffleMcqOptions } from '../utils/mcqUtils';

export const ExamSimulator: React.FC = () => {
  const [selectedSubjectId, setSelectedSubjectId] = React.useState<string>(CA_INTER_SUBJECTS[1].id); // Law
  const [examStarted, setExamStarted] = React.useState<boolean>(false);
  const [isReadingTime, setIsReadingTime] = React.useState<boolean>(false);
  const [readingSecondsLeft, setReadingSecondsLeft] = React.useState<number>(15 * 60); // 15 mins
  const [examSecondsLeft, setExamSecondsLeft] = React.useState<number>(180 * 60); // 3 hours
  const [currentQIndex, setCurrentQIndex] = React.useState<number>(0);
  const [studentRollNo, setStudentRollNo] = React.useState<string>('482910');

  // Answers state
  const [mcqAnswers, setMcqAnswers] = React.useState<Record<string, string>>({});
  const [descAnswers, setDescAnswers] = React.useState<Record<string, string>>({});
  const [markedForReview, setMarkedForReview] = React.useState<Record<number, boolean>>({});
  const [examSubmitted, setExamSubmitted] = React.useState<boolean>(false);
  const [finalScore, setFinalScore] = React.useState<{ totalAwarded: number; maxMarks: number; passed: boolean } | null>(null);

  // Filter paper questions with guaranteed full sets
  const paperSubject = CA_INTER_SUBJECTS.find(s => s.id === selectedSubjectId) || CA_INTER_SUBJECTS[0];
  const paperMcqs = React.useMemo(() => {
    const list = MCQS_DATABASE.filter(q => q.subjectId === selectedSubjectId).map(q => shuffleMcqOptions(q));
    while (list.length < 5) {
      list.push(QuestionGeneratorService.generateDynamicMcq(selectedSubjectId));
    }
    return list.slice(0, 5);
  }, [selectedSubjectId]);

  const paperDesc = React.useMemo(() => {
    const list = [...DESCRIPTIVE_DATABASE.filter(q => q.subjectId === selectedSubjectId)];
    while (list.length < 3) {
      list.push(QuestionGeneratorService.generateDynamicDescriptiveQuestion(selectedSubjectId));
    }
    return list.slice(0, 3);
  }, [selectedSubjectId]);
  const totalQuestions = paperMcqs.length + paperDesc.length;

  // Timers
  React.useEffect(() => {
    let timer: any;
    if (examStarted && !examSubmitted) {
      if (isReadingTime) {
        timer = setInterval(() => {
          setReadingSecondsLeft(prev => {
            if (prev <= 1) {
              setIsReadingTime(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        timer = setInterval(() => {
          setExamSecondsLeft(prev => {
            if (prev <= 1) {
              handleSubmitExam();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    }
    return () => clearInterval(timer);
  }, [examStarted, isReadingTime, examSubmitted]);

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartExam = (withReadingTime: boolean) => {
    setExamStarted(true);
    setIsReadingTime(withReadingTime);
    setExamSubmitted(false);
    setFinalScore(null);
  };

  const handleSubmitExam = () => {
    setExamSubmitted(true);
    let totalMarksAwarded = 0;
    let max = 0;

    // Score MCQs
    paperMcqs.forEach(mcq => {
      max += mcq.marks;
      if (mcqAnswers[mcq.id] === mcq.correctOptionId) {
        totalMarksAwarded += mcq.marks;
      }
    });

    // Score Descriptive
    paperDesc.forEach(desc => {
      max += desc.marks;
      const text = descAnswers[desc.id] || '';
      const evalRes = EvaluatorService.evaluateAnswer(desc, text);
      totalMarksAwarded += evalRes.score;
    });

    const passed = (totalMarksAwarded / Math.max(max, 1)) >= 0.40;
    setFinalScore({ totalAwarded: totalMarksAwarded, maxMarks: max, passed });
    if (passed) {
      AudioService.playVictory();
    } else {
      AudioService.playWrong();
    }
  };

  // Determine current active question
  const isMcq = currentQIndex < paperMcqs.length;
  const currentMcq = isMcq ? paperMcqs[currentQIndex] : null;
  const currentDesc = !isMcq ? paperDesc[currentQIndex - paperMcqs.length] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {!examStarted ? (
        /* Pre-Exam Instructions & Roll Number Screen */
        <div className="max-w-3xl mx-auto bg-slate-800 rounded-2xl border border-slate-700 p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2 border-b border-slate-700 pb-5">
            <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">
              The Institute of Chartered Accountants of India
            </span>
            <h1 className="text-2xl font-extrabold text-white">
              ICAI INTERMEDIATE EXAMINATION SIMULATION
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Strict ICAI Standard Paper Layout • 100 Marks • 3 Hours
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Select Paper:</label>
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-sm rounded-xl p-3 focus:outline-none focus:border-blue-500 font-medium"
              >
                {CA_INTER_SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.code}: {s.title} ({s.group})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">ICAI Candidate Roll Number:</label>
              <input
                type="text"
                value={studentRollNo}
                onChange={(e) => setStudentRollNo(e.target.value)}
                maxLength={6}
                className="w-48 bg-slate-900 border border-slate-700 text-slate-100 text-sm font-mono tracking-widest rounded-xl p-3 text-center focus:outline-none focus:border-blue-500 font-bold"
              />
            </div>

            {/* ICAI Exam Hall Instructions */}
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-700/80 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Official ICAI Instructions for Candidates:
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
                <li>Question No. 1 is compulsory. Candidates are required to answer any four questions from the remaining five questions.</li>
                <li>Working notes must form part of the answer. Citing relevant Sections of the Companies Act / Income Tax Act or Standards on Auditing carries specific step marks.</li>
                <li>An optional 15-minute ICAI Reading Time is provided before writing starts to analyze the paper without writing.</li>
              </ul>
            </div>
          </div>

          {/* Launch Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3 justify-center">
            <button
              onClick={() => handleStartExam(true)}
              className="w-full sm:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg transition-all"
            >
              Start Exam with 15-Min ICAI Reading Time
            </button>

            <button
              onClick={() => handleStartExam(false)}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg transition-all"
            >
              Start 3-Hour Writing Mode Directly
            </button>
          </div>
        </div>
      ) : (
        /* Live Exam Environment */
        <div className="space-y-6">
          
          {/* ICAI Live Exam Header */}
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-4 shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-xs font-mono text-slate-300">
                Roll No: <strong className="text-amber-400 tracking-widest">{studentRollNo}</strong>
              </div>
              <span className="text-slate-600">|</span>
              <div className="text-xs font-bold text-white">
                {paperSubject.code}: {paperSubject.title}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {isReadingTime ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-950/80 border border-amber-600 text-amber-300 text-xs font-bold animate-pulse">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Reading Time Left: {formatTimer(readingSecondsLeft)}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm font-mono font-bold">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>Time Remaining: {formatTimer(examSecondsLeft)}</span>
                </div>
              )}

              {isReadingTime && (
                <button
                  onClick={() => setIsReadingTime(false)}
                  className="px-3 py-1 bg-amber-700 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg"
                >
                  Skip to Writing
                </button>
              )}

              <button
                onClick={handleSubmitExam}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
              >
                Submit Paper
              </button>
            </div>
          </div>

          {/* Exam Body: Split View with Question Palette */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 9 Columns: Question and Answer Area */}
            <div className="lg:col-span-9 bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-xl space-y-6">
              
              {/* Question Navigation Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-blue-950 text-blue-300 text-xs font-bold border border-blue-800">
                    Question {currentQIndex + 1} of {totalQuestions}
                  </span>
                  <span className="text-xs text-slate-400">
                    ({isMcq ? `Part I: MCQ • ${currentMcq?.marks} Marks` : `Part II: Descriptive • ${currentDesc?.marks} Marks`})
                  </span>
                </div>

                <button
                  onClick={() => setMarkedForReview(prev => ({ ...prev, [currentQIndex]: !prev[currentQIndex] }))}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                    markedForReview[currentQIndex]
                      ? 'bg-purple-950 text-purple-300 border-purple-700'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>{markedForReview[currentQIndex] ? 'Marked for Review' : 'Mark for Review'}</span>
                </button>
              </div>

              {/* Reading Time Notice if active */}
              {isReadingTime && (
                <div className="p-3 bg-amber-950/40 border border-amber-800/60 rounded-xl text-xs text-amber-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>15-Minute Reading Time active. You can read questions and plan working notes. Writing is unlocked when timer ends or upon clicking "Skip to Writing".</span>
                </div>
              )}

              {/* Question Text */}
              <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 text-sm sm:text-base text-slate-100 font-medium font-serif leading-relaxed whitespace-pre-line">
                {isMcq ? currentMcq?.questionText : currentDesc?.questionText}
              </div>

              {/* Answer Interaction Area */}
              {isMcq && currentMcq && (
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Select Your Answer:
                  </span>
                  {currentMcq.options.map((opt, idx) => {
                    const letter = String.fromCharCode(65 + idx);
                    const isSelected = mcqAnswers[currentMcq.id] === opt.id;

                    return (
                      <button
                        key={opt.id}
                        onClick={() => !isReadingTime && setMcqAnswers(prev => ({ ...prev, [currentMcq.id]: opt.id }))}
                        disabled={isReadingTime}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition-all ${
                          isSelected
                            ? 'bg-blue-600/30 border-blue-500 text-white font-medium shadow-md'
                            : 'bg-slate-900/60 hover:bg-slate-700/40 text-slate-300 border-slate-700/80'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {letter}
                        </span>
                        <span className="flex-1">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {!isMcq && currentDesc && (
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Write Your Detailed Answer (with Working Notes):
                  </span>
                  <textarea
                    value={descAnswers[currentDesc.id] || ''}
                    onChange={(e) => !isReadingTime && setDescAnswers(prev => ({ ...prev, [currentDesc.id]: e.target.value }))}
                    disabled={isReadingTime}
                    placeholder={isReadingTime ? "Writing is locked during 15-minute reading period..." : "Type your answer step-by-step..."}
                    rows={12}
                    className="w-full bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono border border-slate-700 focus:border-blue-500 focus:outline-none leading-relaxed"
                  />
                </div>
              )}

              {/* Prev / Next Bottom Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <button
                  onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentQIndex === 0}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-700 disabled:opacity-30 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700"
                >
                  Previous
                </button>

                <button
                  onClick={() => setCurrentQIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
                  disabled={currentQIndex >= totalQuestions - 1}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Save & Next
                </button>
              </div>
            </div>

            {/* Right 3 Columns: ICAI Question Status Palette */}
            <div className="lg:col-span-3 bg-slate-800 rounded-2xl border border-slate-700 p-5 shadow-xl space-y-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider pb-2 border-b border-slate-700">
                Question Palette
              </h4>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span>Not Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-purple-500" />
                  <span>Review</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-slate-600" />
                  <span>Not Visited</span>
                </div>
              </div>

              {/* Grid of Question Numbers */}
              <div className="grid grid-cols-4 gap-2 pt-2">
                {Array.from({ length: totalQuestions }).map((_, idx) => {
                  const isCurrent = currentQIndex === idx;
                  const isMcqQ = idx < paperMcqs.length;
                  const isAnswered = isMcqQ 
                    ? !!mcqAnswers[paperMcqs[idx]?.id] 
                    : !!descAnswers[paperDesc[idx - paperMcqs.length]?.id];
                  const isMarked = markedForReview[idx];

                  let color = 'bg-slate-700 text-slate-300';
                  if (isMarked) color = 'bg-purple-600 text-white';
                  else if (isAnswered) color = 'bg-emerald-600 text-white';
                  else color = 'bg-rose-900/60 text-rose-300 border border-rose-700';

                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentQIndex(idx)}
                      className={`h-9 rounded-lg font-bold text-xs flex items-center justify-center transition-all ${color} ${
                        isCurrent ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-800' : ''
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Final Submit in Palette */}
              <div className="pt-4 border-t border-slate-700">
                <button
                  onClick={handleSubmitExam}
                  className="w-full py-2.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all"
                >
                  Finish & Submit Paper
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submission Result Modal / Summary */}
      {finalScore && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-2">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto ${
                finalScore.passed ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
              }`}>
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {finalScore.passed ? 'PASSED (ICAI Standard)' : 'Needs Revision to Pass'}
              </h3>
              <p className="text-xs text-slate-400">
                Minimum passing marks in ICAI is 40% individual paper / 50% aggregate.
              </p>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Total Marks Awarded</span>
              <div className="text-3xl font-extrabold text-white">
                {finalScore.totalAwarded} <span className="text-sm text-slate-400">/ {finalScore.maxMarks}</span>
              </div>
              <span className="text-xs text-amber-400 font-bold">
                ({Math.round((finalScore.totalAwarded / Math.max(finalScore.maxMarks, 1)) * 100)}%)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setFinalScore(null)}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl"
              >
                Review Answers & Working Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
