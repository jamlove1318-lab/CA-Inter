export interface PastPaperMetadata {
  id: string;
  subjectId: string;
  title: string;
  session: string;
  year: number;
  type: 'Past Exam' | 'RTP' | 'MTP';
  totalMarks: number;
  durationMinutes: number;
  difficultyRating: 'Moderate' | 'Hard' | 'Very Tricky';
  keyTopicsTested: string[];
  examinerObservations: string;
  recommendedForRevision: boolean;
  questionIds: string[];
}

export const PAST_PAPERS_VAULT: PastPaperMetadata[] = [
  {
    id: 'pp_p2_may24',
    subjectId: 'p2_law',
    title: 'ICAI May 2024 Question Paper - Corporate and Other Laws',
    session: 'May 2024',
    year: 2024,
    type: 'Past Exam',
    totalMarks: 100,
    durationMinutes: 180,
    difficultyRating: 'Hard',
    keyTopicsTested: [
      'CSR Section 135(5) Ongoing Projects',
      'Auditor Disqualification under Section 141(3)(d)',
      'Shorter Notice for AGM (95% rule)',
      'FEMA Current Account vs Capital Account Transactions',
      'Interpretation of Statutes - Rule of Harmonious Construction'
    ],
    examinerObservations: 'Students generally faltered in the calculation of average net profits for CSR under Section 198 and confused the shorter notice consent percentages between AGM (95%) and EGM.',
    recommendedForRevision: true,
    questionIds: ['desc_p2_csr_01', 'mcq_p2_01', 'mcq_p2_02']
  },
  {
    id: 'pp_p4_nov23',
    subjectId: 'p4_costing',
    title: 'ICAI Nov 2023 Question Paper - Cost and Management Accounting',
    session: 'Nov 2023',
    year: 2023,
    type: 'Past Exam',
    totalMarks: 100,
    durationMinutes: 180,
    difficultyRating: 'Very Tricky',
    keyTopicsTested: [
      'Standard Costing 5-Way Material Variance with Loss & Yield',
      'Activity Based Costing Cost Driver Rates for Setup & Inspection',
      'Process Costing with FIFO Method Equivalent Production',
      'Marginal Costing Key Factor (Limiting Factor) Allocation'
    ],
    examinerObservations: 'Substantial errors noted in Standard Costing where students took standard quantity based on input rather than actual output. Working notes presentation was suboptimal in many scripts.',
    recommendedForRevision: true,
    questionIds: ['desc_p4_variance_01']
  },
  {
    id: 'pp_p5_may24',
    subjectId: 'p5_audit',
    title: 'ICAI May 2024 Question Paper - Auditing and Ethics',
    session: 'May 2024',
    year: 2024,
    type: 'Past Exam',
    totalMarks: 100,
    durationMinutes: 180,
    difficultyRating: 'Hard',
    keyTopicsTested: [
      'SA 705 Adverse Opinion vs Qualified Opinion Pervasiveness',
      'SA 501 Physical Inventory Verification on Alternative Date',
      'CARO 2020 Clause (i) PP&E & Clause (ii) Working Capital limits > 5 Cr',
      'SQC 1 Retention of Audit Documentation (7 years)'
    ],
    examinerObservations: 'Common pitfall was answering general theory without citing specific Standard on Auditing numbers (SA 705, SA 501, SA 505) and failing to address whether misstatement is pervasive.',
    recommendedForRevision: true,
    questionIds: ['desc_p5_sa705_01', 'mcq_p5_01']
  },
  {
    id: 'pp_p3_may24',
    subjectId: 'p3_tax',
    title: 'ICAI May 2024 Question Paper - Taxation (Income Tax & GST)',
    session: 'May 2024',
    year: 2024,
    type: 'Past Exam',
    totalMarks: 100,
    durationMinutes: 180,
    difficultyRating: 'Hard',
    keyTopicsTested: [
      'Section 115BAC Default Tax Regime Computation & Rebate 87A',
      'Capital Gains Section 50C SDV Deeming & Section 54 Exemption',
      'GST Input Tax Credit Blocked under Section 17(5)',
      'Reverse Charge on Independent Director Remuneration'
    ],
    examinerObservations: 'Candidates lost marks by applying old Chapter VI-A deductions (80C/80D) under the default 115BAC regime, which are disallowed. GST blocked credit limits on motor vehicles were well handled.',
    recommendedForRevision: true,
    questionIds: ['desc_p3_capgains_01', 'mcq_p3_01', 'mcq_p3_02']
  },
  {
    id: 'rtp_nov24_p1',
    subjectId: 'p1_adv_acc',
    title: 'ICAI RTP Nov 2024 - Advanced Accounting',
    session: 'Nov 2024',
    year: 2024,
    type: 'RTP',
    totalMarks: 100,
    durationMinutes: 180,
    difficultyRating: 'Moderate',
    keyTopicsTested: [
      'AS 16 Borrowing Costs Suspension during flood vs curing delay',
      'Section 68 Buyback 10% Board Resolution limit calculation',
      'AS 14 Amalgamation in the Nature of Purchase vs Merger',
      'AS 19 Finance Lease vs Operating Lease Criteria'
    ],
    examinerObservations: 'RTP focuses heavily on newly added AS problems and practical Schedule III balance sheet disclosures.',
    recommendedForRevision: true,
    questionIds: ['desc_p1_as16_01', 'mcq_p1_01', 'mcq_p1_02']
  },
  {
    id: 'mtp_ser1_24_p6',
    subjectId: 'p6_fm_sm',
    title: 'ICAI MTP Series 1 (March 2024) - FM & SM',
    session: 'March 2024',
    year: 2024,
    type: 'MTP',
    totalMarks: 100,
    durationMinutes: 180,
    difficultyRating: 'Moderate',
    keyTopicsTested: [
      'Capital Budgeting NPV with Working Capital release & Salvage',
      'Degree of Combined Leverage (DCL = DOL * DFL) EPS impact',
      'Ansoff Product-Market Growth Matrix',
      'Porter Generic Strategies (Cost Leadership vs Differentiation)'
    ],
    examinerObservations: 'Students often missed discounting the terminal recovery of working capital in Year 5. SM theory answers lacked contemporary examples.',
    recommendedForRevision: true,
    questionIds: ['desc_p6_capbudg_01', 'mcq_p6_01', 'mcq_p6_02']
  }
];
