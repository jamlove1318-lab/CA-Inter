import { MCQS_DATABASE, DESCRIPTIVE_DATABASE } from '../src/data/questionsData';
import { CASE_STUDIES_DATABASE } from '../src/data/caseStudiesData';
import { CA_INTER_SUBJECTS } from '../src/data/subjectsData';
import { SECTIONS_AND_STANDARDS } from '../src/data/sectionsAndStandardsData';
import { QuestionGeneratorService } from '../src/services/questionGeneratorService';
import { EvaluatorService } from '../src/services/evaluatorService';
import { shuffleMcqOptions } from '../src/utils/mcqUtils';

console.log('=== STARTING AUTOMATED QUALITY & BUG DETECTION AUDIT ===\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, msg: string) {
  totalTests++;
  if (condition) {
    passedTests++;
  } else {
    failedTests++;
    console.error(`❌ FAILED: ${msg}`);
  }
}

// 1. Audit MCQS_DATABASE
console.log('1. Auditing MCQS_DATABASE (Static Questions)...');
assert(MCQS_DATABASE.length > 0, `MCQS_DATABASE has questions (count=${MCQS_DATABASE.length})`);

const mcqIds = new Set<string>();
for (const q of MCQS_DATABASE) {
  assert(!mcqIds.has(q.id), `Unique MCQ ID: ${q.id}`);
  mcqIds.add(q.id);

  assert(Boolean(q.questionText && q.questionText.trim().length > 10), `MCQ ${q.id} has valid questionText`);
  assert(Boolean(q.options && q.options.length >= 3), `MCQ ${q.id} has >= 3 options`);
  assert(Boolean(q.correctOptionId), `MCQ ${q.id} has correctOptionId`);

  const correctOption = q.options?.find(o => o.id === q.correctOptionId);
  assert(Boolean(correctOption), `MCQ ${q.id} correctOptionId matches an option in options array`);

  // Test shuffleMcqOptions on this MCQ
  const shuffled = shuffleMcqOptions(q);
  const shuffledCorrect = shuffled.options.find(o => o.id === shuffled.correctOptionId);
  assert(Boolean(shuffledCorrect), `MCQ ${q.id} shuffle preserves valid correctOptionId`);
  assert(shuffledCorrect?.text === correctOption?.text, `MCQ ${q.id} shuffled correct option text matches original`);
}

// 2. Audit DESCRIPTIVE_DATABASE
console.log('\n2. Auditing DESCRIPTIVE_DATABASE...');
assert(DESCRIPTIVE_DATABASE.length > 0, `DESCRIPTIVE_DATABASE has items (count=${DESCRIPTIVE_DATABASE.length})`);
const descIds = new Set<string>();
for (const d of DESCRIPTIVE_DATABASE) {
  assert(!descIds.has(d.id), `Unique Descriptive ID: ${d.id}`);
  descIds.add(d.id);
  assert(Boolean(d.questionText && d.questionText.length > 15), `Descriptive ${d.id} has questionText`);
  assert(Boolean(d.suggestedAnswer && d.suggestedAnswer.length > 20), `Descriptive ${d.id} has suggestedAnswer`);
  assert(Boolean(d.rubrics && d.rubrics.length > 0), `Descriptive ${d.id} has rubrics`);
}

// 3. Audit CASE_STUDIES_DATABASE
console.log('\n3. Auditing CASE_STUDIES_DATABASE...');
assert(CASE_STUDIES_DATABASE.length > 0, `CASE_STUDIES_DATABASE has items (count=${CASE_STUDIES_DATABASE.length})`);
for (const cs of CASE_STUDIES_DATABASE) {
  assert(Boolean(cs.id && cs.title), `Case study has ID and title (${cs.id})`);
  assert(Boolean(cs.scenarioText && cs.scenarioText.length > 50), `Case study ${cs.id} has detailed scenarioText`);
  assert(Boolean(cs.mcqs && cs.mcqs.length > 0), `Case study ${cs.id} has MCQs`);
  for (const q of cs.mcqs) {
    const correct = q.options.find(o => o.id === q.correctOptionId);
    assert(Boolean(correct), `Case study MCQ ${q.id} has valid correctOptionId`);
  }
}

// 4. Audit SECTIONS_AND_STANDARDS
console.log('\n4. Auditing SECTIONS_AND_STANDARDS...');
assert(SECTIONS_AND_STANDARDS.length >= 20, `SECTIONS_AND_STANDARDS has comprehensive entries (${SECTIONS_AND_STANDARDS.length})`);
for (const sec of SECTIONS_AND_STANDARDS) {
  assert(Boolean(sec.code && sec.title && sec.keyRule), `Section ${sec.code} has code, title, and keyRule`);
}

// 5. Audit QuestionGeneratorService across all 6 subjects
console.log('\n5. Auditing Dynamic Question Generator (Anti-Repetition & Randomization)...');
const subjects = ['all', 'p1_adv_acc', 'p2_law', 'p3_tax', 'p4_costing', 'p5_audit', 'p6_fm_sm'];
const optionDistribution: Record<string, number> = { a: 0, b: 0, c: 0, d: 0 };
const generatedIds = new Set<string>();

for (const sub of subjects) {
  for (let i = 0; i < 25; i++) {
    const q = QuestionGeneratorService.generateDynamicMcq(sub);
    assert(!generatedIds.has(q.id), `Generated unique ID for ${sub} (${q.id})`);
    generatedIds.add(q.id);

    assert(Boolean(q.questionText && q.questionText.length > 15), `Generated question has rich questionText`);
    assert(q.options.length === 4, `Generated question has exactly 4 options`);

    const correct = q.options.find(o => o.id === q.correctOptionId);
    assert(Boolean(correct), `Generated question has valid correctOptionId: ${q.correctOptionId}`);

    if (q.correctOptionId in optionDistribution) {
      optionDistribution[q.correctOptionId]++;
    }

    assert(Boolean(q.explanation && q.explanation.length > 10), `Generated question has explanation`);
  }
}

console.log('Generated Option Distribution (out of 175 samples):', optionDistribution);
// Check that option 'a' is NOT the only answer!
assert(optionDistribution.b > 0, `Option B is chosen (${optionDistribution.b} times)`);
assert(optionDistribution.c > 0, `Option C is chosen (${optionDistribution.c} times)`);
assert(optionDistribution.d > 0, `Option D is chosen (${optionDistribution.d} times)`);
const aPercentage = (optionDistribution.a / 175) * 100;
console.log(`Option A occurrence: ${aPercentage.toFixed(1)}% (Balanced expectation: ~25%)`);
assert(aPercentage < 50, `Option A is not overly dominant (${aPercentage.toFixed(1)}% < 50%)`);

// 6. Audit Dynamic Descriptive Questions Generator
console.log('\n6. Auditing Dynamic Descriptive Generator...');
for (const sub of subjects) {
  for (let i = 0; i < 5; i++) {
    const desc = QuestionGeneratorService.generateDynamicDescriptiveQuestion(sub);
    assert(Boolean(desc.id && desc.questionText && desc.suggestedAnswer), `Dynamic descriptive valid for ${sub}`);
    assert(Boolean(desc.rubrics && desc.rubrics.length > 0), `Dynamic descriptive rubric valid for ${sub}`);
  }
}

// 7. Audit EvaluatorService
console.log('\n7. Auditing EvaluatorService (ICAI Step Marking Engine)...');
const sampleQ = DESCRIPTIVE_DATABASE[0];
const mockEvalGood = EvaluatorService.evaluateAnswer(sampleQ, sampleQ.suggestedAnswer);
assert(mockEvalGood.percentage >= 70, `Model answer evaluates to high score (${mockEvalGood.percentage}%)`);
assert(mockEvalGood.stepMarks.length > 0, `Evaluator generated step feedback`);

const mockEvalEmpty = EvaluatorService.evaluateAnswer(sampleQ, '');
assert(mockEvalEmpty.percentage === 0, `Empty answer evaluates to 0% (${mockEvalEmpty.percentage}%)`);

const mockEvalShort = EvaluatorService.evaluateAnswer(sampleQ, 'Section 135 requires 2 percent profit');
assert(mockEvalShort.percentage > 0 && mockEvalShort.percentage < 100, `Partial answer gets partial credit (${mockEvalShort.percentage}%)`);

console.log('\n=== AUDIT RESULTS ===');
console.log(`Total Assertions Run: ${totalTests}`);
console.log(`Passed: ${passedTests}`);
console.log(`Failed: ${failedTests}`);

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('\n🎉 ALL TESTS PASSED WITH 0 ERRORS!');
  process.exit(0);
}
