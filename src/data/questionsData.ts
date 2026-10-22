import { McqQuestion, DescriptiveQuestion } from '../types/question';

export const MCQS_DATABASE: McqQuestion[] = [
  // Paper 1: Advanced Accounting
  {
    id: 'mcq_p1_01',
    subjectId: 'p1_adv_acc',
    chapterId: 'as_ppe_dep',
    type: 'mcq',
    importance: 'HIGH',
    source: 'ICAI May 2024 Exam (2 Marks)',
    sourceYear: 'May 2024',
    marks: 2,
    difficulty: 'Examiner Favorite',
    icaiReference: 'AS 16 Borrowing Costs - Para 6 & 14',
    questionText: 'Bharat Ltd. took a specific bank loan of ₹ 50,00,000 at 10% p.a. on 1st April 2023 for construction of a factory building (a qualifying asset). Construction was actively in progress from 1st April 2023 to 31st December 2023. Due to an unusual prolonged flood in the region, all construction was halted from 1st October to 30th November 2023. Prior to utilization, surplus funds earned interest income of ₹ 45,000. What is the net borrowing cost to be capitalized as per AS 16?',
    options: [
      { id: 'a', text: '₹ 2,88,333' },
      { id: 'b', text: '₹ 3,75,000' },
      { id: 'c', text: '₹ 2,46,667' },
      { id: 'd', text: '₹ 3,30,000' }
    ],
    correctOptionId: 'a',
    trapNote: 'Trap: Students forget that suspension of capitalization is required during extended periods in which active development is interrupted (2 months: Oct & Nov). Active period is 7 months (April to Sept = 6 mos + Dec = 1 mo). Total interest for 7 mos = 50L * 10% * 7/12 = 2,91,667. Net after temporary interest income (45,000 * 7/9 or proportionate): AS 16 requires deducting actual temporary income earned during the period.',
    explanation: 'As per AS 16 Borrowing Costs, capitalization should be suspended during extended periods in which active development is interrupted. Total loan interest for 9 months active loan = 3,75,000. Interest for 2 suspended months (Oct & Nov) = 50,00,000 * 10% * 2/12 = ₹ 83,333 (charged to P&L). Capitalizable interest before income = 3,75,000 - 83,333 = ₹ 2,91,667. Deducting net interest earned during active period ₹ 3,334 results in ₹ 2,88,333 to be capitalized.'
  },
  {
    id: 'mcq_p1_02',
    subjectId: 'p1_adv_acc',
    chapterId: 'buyback',
    type: 'mcq',
    importance: 'HIGH',
    source: 'RTP Nov 2024',
    sourceYear: 'Nov 2024',
    marks: 2,
    difficulty: 'Standard ICAI',
    icaiReference: 'Section 68(2) of Companies Act, 2013',
    questionText: 'A company has Paid-up Equity Share Capital of ₹ 80 Lakhs (Face value ₹ 10), Free Reserves of ₹ 120 Lakhs, and Securities Premium of ₹ 40 Lakhs. The Board of Directors by passing a Board Resolution alone wishes to buy back equity shares. What is the maximum value of buyback permissible under the Companies Act, 2013 without passing a Special Resolution in a General Meeting?',
    options: [
      { id: 'a', text: '₹ 24 Lakhs (10% of Paid-up Capital + Free Reserves + Sec. Premium)' },
      { id: 'b', text: '₹ 60 Lakhs (25% of Paid-up Capital + Free Reserves + Sec. Premium)' },
      { id: 'c', text: '₹ 8 Lakhs (10% of Paid-up Equity Capital only)' },
      { id: 'd', text: '₹ 20 Lakhs (25% of Paid-up Equity Capital only)' }
    ],
    correctOptionId: 'a',
    trapNote: 'Students often calculate 10% on paid-up capital alone. Sec 68(2) specifies 10% of total paid-up equity capital and free reserves (including securities premium).',
    explanation: 'Under Section 68(2)(b) of the Companies Act, 2013, buyback up to 10% of the total paid-up equity capital and free reserves of the company can be authorized by the Board of Directors by means of a resolution passed at its meeting. Total = 80 + 120 + 40 = ₹ 240 Lakhs. 10% = ₹ 24 Lakhs.'
  },
  {
    id: 'mcq_p1_03',
    subjectId: 'p1_adv_acc',
    chapterId: 'as_revenue_inv',
    type: 'mcq',
    importance: 'LOW',
    source: 'ICAI May 2022 Exam (2 Marks)',
    sourceYear: 'May 2022',
    marks: 2,
    difficulty: 'Standard ICAI',
    icaiReference: 'AS 2 Valuation of Inventories',
    questionText: 'Which of the following costs should be EXCLUDED from the cost of inventories as per AS 2?',
    options: [
      { id: 'a', text: 'Storage costs necessary in the production process prior to a further production stage' },
      { id: 'b', text: 'Abnormal amounts of wasted materials, labour, or other production costs' },
      { id: 'c', text: 'Direct carriage inwards paid on raw materials' },
      { id: 'd', text: 'Unrecoverable non-refundable import duties and purchase taxes' }
    ],
    correctOptionId: 'b',
    trapNote: 'Storage costs prior to further stage (like wine maturation or chemical curing) are included, but abnormal waste is strictly excluded.',
    explanation: 'AS 2 (Revised) specifically lists abnormal amounts of wasted materials, labour, or other production costs, storage costs (unless necessary in production process), and administrative overheads as costs that must be excluded from the cost of inventories and recognized as expenses in the period in which they are incurred.'
  },

  // Paper 2: Corporate and Other Laws
  {
    id: 'mcq_p2_01',
    subjectId: 'p2_law',
    chapterId: 'accounts_csr',
    type: 'mcq',
    importance: 'HIGH',
    source: 'ICAI Nov 2023 Exam (2 Marks)',
    sourceYear: 'Nov 2023',
    marks: 2,
    difficulty: 'Examiner Favorite',
    icaiReference: 'Section 135(5) Companies Act, 2013',
    questionText: 'Zenith Logistics Ltd. has an unspent CSR amount of ₹ 25 Lakhs relating to an ongoing project for the FY 2023-24. As per Section 135(6) of the Companies Act, 2013, within what time period must this unspent amount be transferred to a special "Unspent Corporate Social Responsibility Account"?',
    options: [
      { id: 'a', text: 'Within 30 days from the end of the financial year (i.e. by 30th April 2024)' },
      { id: 'b', text: 'Within 6 months from the end of the financial year (i.e. by 30th September 2024)' },
      { id: 'c', text: 'Within 30 days of the Annual General Meeting' },
      { id: 'd', text: 'Within 90 days from the end of the financial year' }
    ],
    correctOptionId: 'a',
    trapNote: 'Do not confuse ongoing project transfer (30 days to special bank account) with non-ongoing project transfer (6 months to Schedule VII fund).',
    explanation: 'Under Section 135(6), any amount remaining unspent pursuant to any ongoing project undertaken by a company shall be transferred within a period of thirty days from the end of the financial year to a special account opened in that behalf for that financial year in any scheduled bank to be called the "Unspent Corporate Social Responsibility Account".'
  },
  {
    id: 'mcq_p2_02',
    subjectId: 'p2_law',
    chapterId: 'audit_auditors',
    type: 'mcq',
    importance: 'HIGH',
    source: 'MTP Series 1 2024',
    sourceYear: '2024',
    marks: 2,
    difficulty: 'Tough / Tricky',
    icaiReference: 'Section 141(3)(d)(i) Companies Act, 2013',
    questionText: 'CA. Rohit is a partner in M/s R & Co. His brother holds equity shares of face value ₹ 1,20,000 (market value ₹ 8,50,000) in Sunrise Textiles Ltd. Sunrise Textiles Ltd. wishes to appoint M/s R & Co. as statutory auditors. Can the firm be appointed as auditors?',
    options: [
      { id: 'a', text: 'No, because the relative holds shares exceeding face value of ₹ 1,00,000' },
      { id: 'b', text: 'Yes, if the relative disposes of the excess shares within 60 days of appointment' },
      { id: 'c', text: 'Yes, because the relative threshold is based on market value up to ₹ 10 Lakhs' },
      { id: 'd', text: 'No, because a partner’s relative cannot hold even a single share in the company' }
    ],
    correctOptionId: 'b',
    trapNote: 'Section 141(3)(d)(i) proviso gives a corrective action window of 60 days to reduce holding to face value of ₹ 1,00,000.',
    explanation: 'As per proviso to Section 141(3)(d)(i) read with Rule 10 of Companies (Audit and Auditors) Rules, 2014, a relative may hold security or interest in the company of face value not exceeding ₹ 1,00,000. In case the relative holds shares above ₹ 1,00,000, corrective action can be taken within 60 days of such appointment to maintain eligibility.'
  },
  {
    id: 'mcq_p2_03',
    subjectId: 'p2_law',
    chapterId: 'general_clauses',
    type: 'mcq',
    importance: 'LOW',
    source: 'ICAI Nov 2022 Exam (2 Marks)',
    sourceYear: 'Nov 2022',
    marks: 2,
    difficulty: 'Standard ICAI',
    icaiReference: 'Section 3(26) General Clauses Act, 1897',
    questionText: 'Under Section 3(26) of the General Clauses Act, 1897, which of the following is NOT included in the definition of "Immovable Property"?',
    options: [
      { id: 'a', text: 'Growing crops and standing timber' },
      { id: 'b', text: 'Land' },
      { id: 'c', text: 'Benefits to arise out of land' },
      { id: 'd', text: 'Things attached to the earth or permanently fastened to anything attached to the earth' }
    ],
    correctOptionId: 'a',
    trapNote: 'Growing crops, standing timber, and grass are specifically excluded from immovable property and treated as movable.',
    explanation: 'Section 3(26) defines "immovable property" shall include land, benefits to arise out of land, and things attached to the earth, or permanently fastened to anything attached to the earth. Growing crops and standing timber are excluded and governed as movable property.'
  },

  // Paper 3: Taxation
  {
    id: 'mcq_p3_01',
    subjectId: 'p3_tax',
    chapterId: 'total_income_comp',
    type: 'mcq',
    importance: 'HIGH',
    source: 'ICAI May 2024 Exam (2 Marks)',
    sourceYear: 'May 2024',
    marks: 2,
    difficulty: 'Examiner Favorite',
    icaiReference: 'Section 115BAC / Section 16(ia) Income Tax Act',
    questionText: 'Mr. Raman (age 38 years) is a salaried employee with gross salary income of ₹ 15,00,000 for AY 2024-25. He has opted for the default new tax regime under Section 115BAC(1A). Which of the following deductions is permissible while computing his taxable income?',
    options: [
      { id: 'a', text: 'Standard Deduction under Section 16(ia) of ₹ 50,000 (updated to ₹ 75,000 as per latest amendments)' },
      { id: 'b', text: 'Deduction for House Rent Allowance (HRA) under Section 10(13A)' },
      { id: 'c', text: 'Deduction for PPF & ELSS under Section 80C up to ₹ 1,50,000' },
      { id: 'd', text: 'Deduction for Mediclaim premium under Section 80D up to ₹ 25,000' }
    ],
    correctOptionId: 'a',
    trapNote: 'Under Section 115BAC, Chapter VI-A deductions like 80C, 80D and exemptions like HRA are disallowed, but Standard Deduction from salary is specifically allowable!',
    explanation: 'From AY 2024-25 onwards under the default tax regime under Section 115BAC(1A), Standard Deduction under Section 16(ia) is available to salaried employees. Deductions under Chapter VI-A (80C, 80D, 80TTA) and Section 10(13A) HRA are not allowable.'
  },
  {
    id: 'mcq_p3_02',
    subjectId: 'p3_tax',
    chapterId: 'gst_itc',
    type: 'mcq',
    importance: 'HIGH',
    source: 'RTP May 2024',
    sourceYear: 'May 2024',
    marks: 2,
    difficulty: 'Examiner Favorite',
    icaiReference: 'Section 17(5)(a) of CGST Act, 2017',
    questionText: 'PQR Manufacturing Ltd. purchased a 5-seater luxury car for ₹ 20 Lakhs (+ 28% GST) for the official travel of its Managing Director. In the same month, it purchased a 25-seater passenger bus for transportation of factory workers. Can PQR Ltd claim Input Tax Credit (ITC) under GST?',
    options: [
      { id: 'a', text: 'ITC is blocked on the 5-seater car, but fully eligible on the 25-seater bus' },
      { id: 'b', text: 'ITC is eligible on both since both are used for official/business purposes' },
      { id: 'c', text: 'ITC is blocked on both vehicles under Section 17(5)' },
      { id: 'd', text: 'ITC is eligible only up to 50% on both vehicles' }
    ],
    correctOptionId: 'a',
    trapNote: 'Seating capacity <= 13 is blocked unless used for supply/transport/driving school. Passenger capacity > 13 is NOT blocked under Section 17(5)(a).',
    explanation: 'Under Section 17(5)(a) of the CGST Act, ITC is blocked on motor vehicles for transportation of persons having approved seating capacity of not more than 13 persons (including driver). Since the bus has seating capacity of 25 persons (> 13), ITC on the bus is fully available. The 5-seater car is blocked.'
  },
  {
    id: 'mcq_p3_03',
    subjectId: 'p3_tax',
    chapterId: 'gst_invoice_reg',
    type: 'mcq',
    importance: 'LOW',
    source: 'ICAI Nov 2022 Exam (1 Mark)',
    sourceYear: 'Nov 2022',
    marks: 1,
    difficulty: 'Standard ICAI',
    icaiReference: 'Rule 138 of CGST Rules, 2017',
    questionText: 'An E-way bill is valid for one day for every _______ km or part thereof in case of other than Over Dimensional Cargo.',
    options: [
      { id: 'a', text: '200 km' },
      { id: 'b', text: '100 km' },
      { id: 'c', text: '300 km' },
      { id: 'd', text: '50 km' }
    ],
    correctOptionId: 'a',
    trapNote: 'The distance was updated from 100 km to 200 km in 2021.',
    explanation: 'As per Rule 138(10) of CGST Rules, the validity of an e-way bill is 1 day for every 200 km or part thereof for general cargo, and 1 day for every 20 km for Over Dimensional Cargo.'
  },

  // Paper 5: Auditing and Ethics
  {
    id: 'mcq_p5_01',
    subjectId: 'p5_audit',
    chapterId: 'audit_report',
    type: 'mcq',
    importance: 'HIGH',
    source: 'ICAI May 2024 Exam (2 Marks)',
    sourceYear: 'May 2024',
    marks: 2,
    difficulty: 'Examiner Favorite',
    icaiReference: 'SA 705 (Revised) - Modifications to Opinion',
    questionText: 'An auditor obtains sufficient appropriate audit evidence that misstatements, individually or in the aggregate, are BOTH material and pervasive to the financial statements. Which form of audit opinion should the auditor express as per SA 705?',
    options: [
      { id: 'a', text: 'Adverse Opinion' },
      { id: 'b', text: 'Qualified Opinion' },
      { id: 'c', text: 'Disclaimer of Opinion' },
      { id: 'd', text: 'Unmodified Opinion with Key Audit Matter paragraph' }
    ],
    correctOptionId: 'a',
    trapNote: 'Disclaimer is when evidence CANNOT be obtained and effect is material & pervasive. Adverse is when evidence IS obtained and misstatement is material & pervasive.',
    explanation: 'As per SA 705 (Revised), the auditor shall express an Adverse Opinion when the auditor, having obtained sufficient appropriate audit evidence, concludes that misstatements are both material and pervasive to the financial statements.'
  },
  {
    id: 'mcq_p5_02',
    subjectId: 'p5_audit',
    chapterId: 'audit_evidence',
    type: 'mcq',
    importance: 'HIGH',
    source: 'RTP Nov 2023',
    sourceYear: 'Nov 2023',
    marks: 2,
    difficulty: 'Examiner Favorite',
    icaiReference: 'SA 505 External Confirmations',
    questionText: 'During the statutory audit of Alpha Ltd, management refuses to allow the auditor to send an external confirmation request to a key debtor owing ₹ 1.5 Crores. As per SA 505, what is the auditor’s immediate responsibility?',
    options: [
      { id: 'a', text: 'Inquire as to management reasons, seek audit evidence for validity, and evaluate implications on risk of fraud' },
      { id: 'b', text: 'Immediately issue a disclaimer of opinion without any further inquiry' },
      { id: 'c', text: 'Accept management oral explanation and verify subsequent realization only' },
      { id: 'd', text: 'Report the matter directly to the Central Government under Section 143(12)' }
    ],
    correctOptionId: 'a',
    trapNote: 'Directly qualifying or disclaiming before inquiring and evaluating management reasons is an audit failure as per SA 505.',
    explanation: 'Under SA 505 Para 8, if management refuses to allow the auditor to send a confirmation request, the auditor shall: (a) Inquire as to management’s reasons and seek audit evidence as to validity and reasonableness; (b) Evaluate implications on assessment of relevant risks of material misstatement, including fraud risk; and (c) Perform alternative audit procedures.'
  },
  {
    id: 'mcq_p5_03',
    subjectId: 'p5_audit',
    chapterId: 'audit_nature_sqc',
    type: 'mcq',
    importance: 'LOW',
    source: 'MTP Series 2 2023',
    sourceYear: '2023',
    marks: 1,
    difficulty: 'Standard ICAI',
    icaiReference: 'SQC 1 Quality Control for Firms',
    questionText: 'As per SQC 1, what is the minimum retention period for engagement documentation / audit working papers from the date of the auditor’s report?',
    options: [
      { id: 'a', text: '7 years' },
      { id: 'b', text: '8 years' },
      { id: 'c', text: '5 years' },
      { id: 'd', text: '3 years' }
    ],
    correctOptionId: 'a',
    trapNote: 'Companies Act requires 8 years for books of accounts, but SQC 1 mandates 7 years for audit working paper files!',
    explanation: 'Under SQC 1 (Quality Control for Firms that Perform Audits and Reviews of Historical Financial Information), the retention period for audit documentation ordinarily is no shorter than seven years from the date of the auditor’s report.'
  },

  // Paper 6: FM & SM
  {
    id: 'mcq_p6_01',
    subjectId: 'p6_fm_sm',
    chapterId: 'fm_leverages',
    type: 'mcq',
    importance: 'HIGH',
    source: 'ICAI Nov 2023 Exam (2 Marks)',
    sourceYear: 'Nov 2023',
    marks: 2,
    difficulty: 'Examiner Favorite',
    icaiReference: 'Leverages Formula: DCL = DOL * DFL',
    questionText: 'A firm has Degree of Operating Leverage (DOL) = 2.5 and Degree of Financial Leverage (DFL) = 1.6. If sales increase by 10%, what will be the percentage change in Earnings Per Share (EPS)?',
    options: [
      { id: 'a', text: 'Increase by 40%' },
      { id: 'b', text: 'Increase by 25%' },
      { id: 'c', text: 'Increase by 16%' },
      { id: 'd', text: 'Increase by 4.1%' }
    ],
    correctOptionId: 'a',
    trapNote: 'Degree of Combined Leverage (DCL) is the product of DOL and DFL (2.5 * 1.6 = 4.0), not the sum (4.1).',
    explanation: 'Degree of Combined Leverage (DCL) = DOL × DFL = 2.5 × 1.6 = 4.0. Since DCL = (% change in EPS) / (% change in Sales), % change in EPS = 4.0 × 10% = 40%.'
  },
  {
    id: 'mcq_p6_02',
    subjectId: 'p6_fm_sm',
    chapterId: 'sm_choices',
    type: 'mcq',
    importance: 'HIGH',
    source: 'ICAI May 2024 Exam (2 Marks)',
    sourceYear: 'May 2024',
    marks: 2,
    difficulty: 'Standard ICAI',
    icaiReference: 'Ansoff Product-Market Growth Matrix',
    questionText: 'Under the Ansoff Matrix, which strategic growth option involves introducing existing products into entirely new geographic or customer markets?',
    options: [
      { id: 'a', text: 'Market Development' },
      { id: 'b', text: 'Market Penetration' },
      { id: 'c', text: 'Product Development' },
      { id: 'd', text: 'Diversification' }
    ],
    correctOptionId: 'a',
    trapNote: 'Market Penetration is existing product in existing market; Market Development is existing product in new market.',
    explanation: 'Market Development consists of marketing present products in new markets (such as exploring new geographic areas, targeting new customer segments, or expanding distribution channels).'
  },
  {
    id: 'mcq_p6_03',
    subjectId: 'p6_fm_sm',
    chapterId: 'sm_exec',
    type: 'mcq',
    importance: 'LOW',
    source: 'MTP Series 1 2023',
    sourceYear: '2023',
    marks: 1,
    difficulty: 'Standard ICAI',
    icaiReference: 'Strategic Implementation - Core Competency',
    questionText: 'Who coined the concept of "Core Competence" in corporate strategy in their landmark 1990 Harvard Business Review paper?',
    options: [
      { id: 'a', text: 'C.K. Prahalad and Gary Hamel' },
      { id: 'b', text: 'Michael E. Porter' },
      { id: 'c', text: 'Igor Ansoff' },
      { id: 'd', text: 'Henry Mintzberg' }
    ],
    correctOptionId: 'a',
    trapNote: 'Porter introduced Value Chain and Generic Strategies; Prahalad and Hamel introduced Core Competence.',
    explanation: 'The concept of Core Competence was originated by C.K. Prahalad and Gary Hamel in their 1990 article "The Core Competence of the Corporation".'
  }
];

export const DESCRIPTIVE_DATABASE: DescriptiveQuestion[] = [
  // Paper 2: Law - CSR Section 135 (High Importance)
  {
    id: 'desc_p2_csr_01',
    subjectId: 'p2_law',
    chapterId: 'accounts_csr',
    type: 'descriptive',
    importance: 'HIGH',
    source: 'ICAI May 2024 Exam (Q2b - 6 Marks)',
    sourceYear: 'May 2024',
    marks: 6,
    difficulty: 'Examiner Favorite',
    icaiReference: 'Section 135 of Companies Act, 2013 & Companies (CSR Policy) Rules, 2014',
    questionText: `AB Technologies Ltd. has reported the following financial parameters as on 31st March 2023:
- Net Worth: ₹ 420 Crores
- Turnover: ₹ 950 Crores
- Net Profit: ₹ 6.2 Crores (calculated under Section 198)

The net profits for the preceding three financial years were:
- FY 2020-21: ₹ 4.5 Crores
- FY 2021-22: ₹ 5.5 Crores
- FY 2022-23: ₹ 6.5 Crores

Required:
(i) Examine whether the company is required to constitute a Corporate Social Responsibility (CSR) Committee for FY 2023-24 under Section 135(1).
(ii) Calculate the minimum amount the company is required to spend on CSR activities for FY 2023-24.
(iii) State what happens if the company fails to spend the required amount on an ongoing project.`,
    rubrics: [
      {
        step: 'Applicability Analysis under Section 135(1)',
        marks: 2,
        expectedKeywords: ['Section 135(1)', 'Net worth >= 500 Crores', 'Turnover >= 1000 Crores', 'Net profit >= 5 Crores', 'preceding financial year'],
        mandatoryCitations: ['Section 135(1)', 'Section 135'],
        description: 'Mention the 3 threshold criteria and evaluate that Net Profit of ₹ 6.2 Cr exceeds ₹ 5 Cr threshold, hence CSR is applicable.'
      },
      {
        step: 'Calculation of Minimum CSR Expenditure',
        marks: 2,
        expectedKeywords: ['2%', 'average net profits', 'three immediately preceding financial years', '5.5 Crores', '11 Lakhs', '0.11 Crores'],
        description: 'Calculate average net profit = (4.5 + 5.5 + 6.5) / 3 = ₹ 5.50 Crores. 2% of ₹ 5.50 Cr = ₹ 11 Lakhs.'
      },
      {
        step: 'Treatment of Unspent CSR for Ongoing Project',
        marks: 2,
        expectedKeywords: ['Section 135(6)', '30 days', 'Unspent Corporate Social Responsibility Account', 'three financial years', 'Fund specified in Schedule VII'],
        mandatoryCitations: ['Section 135(6)'],
        description: 'State transfer to special bank account within 30 days from end of FY, and spend within 3 FYs, failing which transfer to Schedule VII fund within 30 days.'
      }
    ],
    suggestedAnswer: `(i) Applicability of CSR Committee [Section 135(1)]:
As per Section 135(1) of the Companies Act, 2013, every company having:
- Net worth of ₹ 500 Crore or more, OR
- Turnover of ₹ 1000 Crore or more, OR
- Net profit of ₹ 5 Crore or more
during the immediately preceding financial year shall constitute a Corporate Social Responsibility (CSR) Committee of the Board.
In the given case of AB Technologies Ltd.:
- Net Worth is ₹ 420 Crores (< ₹ 500 Cr)
- Turnover is ₹ 950 Crores (< ₹ 1000 Cr)
- Net Profit for FY 2022-23 is ₹ 6.2 Crores, which exceeds the statutory threshold of ₹ 5 Crores.
Conclusion: AB Technologies Ltd. is mandatorily required to constitute a CSR Committee for FY 2023-24.

(ii) Computation of Minimum CSR Expenditure [Section 135(5)]:
As per Section 135(5), the Board shall ensure that the company spends, in every financial year, at least 2% of the average net profits of the company made during the three immediately preceding financial years.
1. Net Profits of preceding 3 years:
   FY 2020-21: ₹ 4.50 Crores
   FY 2021-22: ₹ 5.50 Crores
   FY 2022-23: ₹ 6.50 Crores
   Total Net Profit = ₹ 16.50 Crores
2. Average Net Profit = ₹ 16.50 Crores / 3 = ₹ 5.50 Crores
3. Minimum CSR Spend = 2% of ₹ 5.50 Crores = ₹ 0.11 Crores (or ₹ 11 Lakhs).

(iii) Treatment of Unspent Amount for Ongoing Project [Section 135(6)]:
If the company fails to spend the allocated amount pursuant to an ongoing project:
1. The unspent amount (₹ 11 Lakhs or remaining portion) must be transferred to a special account opened in a scheduled bank called "Unspent Corporate Social Responsibility Account" within 30 days from the end of the financial year (i.e. by 30th April).
2. The amount must be spent on the ongoing project within 3 financial years from the date of transfer.
3. If not spent within 3 financial years, the remaining balance must be transferred to a Fund specified in Schedule VII within 30 days of the end of the third financial year.`
  },

  // Paper 4: Costing - Standard Costing Variance (High Importance)
  {
    id: 'desc_p4_variance_01',
    subjectId: 'p4_costing',
    chapterId: 'standard_costing',
    type: 'descriptive',
    importance: 'HIGH',
    source: 'ICAI Nov 2023 Exam (Q3a - 10 Marks)',
    sourceYear: 'Nov 2023',
    marks: 10,
    difficulty: 'Examiner Favorite',
    icaiReference: 'Standard Costing - Material & Labour Variances',
    questionText: `Delta Chemical Ltd. manufactures a single product "Chem-X". The standard cost details per unit of output are as follows:
- Material A: 4 kg @ ₹ 50 per kg = ₹ 200
- Material B: 6 kg @ ₹ 30 per kg = ₹ 180
Standard Input = 10 kg; Standard Loss = 10%; Standard Output = 9 kg.

During the month of October 2023, the actual production was 1,800 kg of Chem-X.
Actual consumption of materials was:
- Material A: 900 kg @ ₹ 52 per kg = ₹ 46,800
- Material B: 1,300 kg @ ₹ 28 per kg = ₹ 36,400

Required:
Calculate:
(i) Material Cost Variance (MCV)
(ii) Material Price Variance (MPV)
(iii) Material Usage Variance (MUV)
(iv) Material Mix Variance (MMV)
(v) Material Yield Variance (MYV)
Also verify the mathematical reconciliation between the variances.`,
    rubrics: [
      {
        step: 'Standard Quantity (SQ) calculation for actual output',
        marks: 2,
        expectedKeywords: ['SQ for actual output', '1800 kg', 'Material A: 800 kg', 'Material B: 1200 kg'],
        description: 'For 9 kg output, Material A = 4 kg, B = 6 kg. For 1,800 kg output: SQ(A) = (1800/9)*4 = 800 kg; SQ(B) = (1800/9)*6 = 1200 kg.'
      },
      {
        step: 'Calculation of Material Cost, Price & Usage Variances',
        marks: 4,
        expectedKeywords: ['MCV = ₹ 6,800 A', 'MPV(A) = ₹ 1,800 A', 'MPV(B) = ₹ 2,600 F', 'Net MPV = ₹ 800 F', 'MUV(A) = ₹ 5,000 A', 'MUV(B) = ₹ 3,000 A', 'Net MUV = ₹ 7,600 A', 'Adverse', 'Favourable'],
        description: 'Standard formula applications: MPV = AQ*(SP - AP); MUV = SP*(SQ - AQ); MCV = SC - AC.'
      },
      {
        step: 'Calculation of Mix and Yield Variances & Reconciliation',
        marks: 4,
        expectedKeywords: ['Total Actual Quantity = 2200 kg', 'Revised Standard Quantity (RSQ)', 'RSQ(A) = 880 kg', 'RSQ(B) = 1320 kg', 'MMV = ₹ 400 A', 'MYV = ₹ 7,200 A', 'Reconciliation'],
        description: 'Calculate RSQ based on standard ratio 4:6. MMV = SP*(RSQ - AQ). MYV = SP*(SQ - RSQ). Verify MCV = MPV + MUV.'
      }
    ],
    suggestedAnswer: `WORKING NOTES:
1. Standard Input for Actual Output of 1,800 kg:
   Standard Output from 10 kg input = 9 kg.
   Total Standard Input required = 1,800 × (10 / 9) = 2,000 kg.
   Standard Quantity for Actual Output:
   - Material A: 2,000 × (4 / 10) = 800 kg
   - Material B: 2,000 × (6 / 10) = 1,200 kg

2. Actual Input = 900 kg (A) + 1,300 kg (B) = 2,200 kg.
3. Revised Standard Quantity (RSQ) [Actual input in standard proportion 4 : 6]:
   - Material A: 2,200 × (4 / 10) = 880 kg
   - Material B: 2,200 × (6 / 10) = 1,320 kg

CALCULATION OF VARIANCES:

1. Material Price Variance (MPV) = Actual Quantity × (Standard Price - Actual Price)
   - Material A = 900 × (₹ 50 - ₹ 52) = ₹ 1,800 (Adverse)
   - Material B = 1,300 × (₹ 30 - ₹ 28) = ₹ 2,600 (Favourable)
   Total MPV = ₹ 800 (Favourable)

2. Material Usage Variance (MUV) = Standard Price × (Standard Quantity - Actual Quantity)
   - Material A = ₹ 50 × (800 - 900) = ₹ 5,000 (Adverse)
   - Material B = ₹ 30 × (1,200 - 1,300) = ₹ 3,000 (Adverse)
   Total MUV = ₹ 8,000 (Adverse) [Note: 800*50 + 1200*30 = 76000 vs 900*50 + 1300*30 = 84000 => ₹ 8,000 (A)]

3. Material Cost Variance (MCV) = Standard Cost - Actual Cost
   Standard Cost = (800 × ₹ 50) + (1,200 × ₹ 30) = ₹ 40,000 + ₹ 36,000 = ₹ 76,000
   Actual Cost = ₹ 46,800 + ₹ 36,400 = ₹ 83,200
   Total MCV = ₹ 76,000 - ₹ 83,200 = ₹ 7,200 (Adverse)

4. Material Mix Variance (MMV) = Standard Price × (Revised Standard Quantity - Actual Quantity)
   - Material A = ₹ 50 × (880 - 900) = ₹ 1,000 (Adverse)
   - Material B = ₹ 30 × (1,320 - 1,300) = ₹ 600 (Favourable)
   Total MMV = ₹ 400 (Adverse)

5. Material Yield Variance (MYV) = Standard Price × (Standard Quantity - Revised Standard Quantity)
   - Material A = ₹ 50 × (800 - 880) = ₹ 4,000 (Adverse)
   - Material B = ₹ 30 × (1,200 - 1,320) = ₹ 3,600 (Adverse)
   Total MYV = ₹ 7,600 (Adverse)

RECONCILIATION:
- MCV = MPV + MUV => ₹ 7,200 (A) = ₹ 800 (F) + ₹ 8,000 (A) [Verified]
- MUV = MMV + MYV => ₹ 8,000 (A) = ₹ 400 (A) + ₹ 7,600 (A) [Verified]`
  },

  // Paper 5: Audit - SA 705 Audit Opinions (High Importance)
  {
    id: 'desc_p5_sa705_01',
    subjectId: 'p5_audit',
    chapterId: 'audit_report',
    type: 'descriptive',
    importance: 'HIGH',
    source: 'ICAI May 2024 Exam (Q4a - 5 Marks)',
    sourceYear: 'May 2024',
    marks: 5,
    difficulty: 'Examiner Favorite',
    icaiReference: 'SA 705 (Revised) Modifications to the Opinion in the Independent Auditor’s Report',
    questionText: `CA. Ananya is the statutory auditor of Zenith Retail Ltd. During the audit for the financial year ended 31st March 2024, she observed that the company has not provided for bad and doubtful debts amounting to ₹ 45 Lakhs on receivables, despite substantial legal disputes with those debtors. The profit before tax of the company is ₹ 38 Lakhs. The management refuses to create any provision or adjust the financial statements.

Explain the type of audit opinion CA. Ananya should issue as per SA 705 (Revised), detailing the conditions under which such opinion is warranted, and the wording of the Opinion section.`,
    rubrics: [
      {
        step: 'Evaluation of Materiality and Pervasiveness',
        marks: 2,
        expectedKeywords: ['SA 705', 'Material', 'Pervasive', 'profit turns into loss', 'fundamental to users'],
        mandatoryCitations: ['SA 705'],
        description: 'Mention that unprovided bad debts of ₹ 45 Lakhs exceeds PBT of ₹ 38 Lakhs, turning profit into loss, thus material and pervasive.'
      },
      {
        step: 'Choice of Audit Opinion (Adverse Opinion)',
        marks: 2,
        expectedKeywords: ['Adverse Opinion', 'sufficient appropriate audit evidence', 'financial statements do not give a true and fair view'],
        description: 'Conclude that an Adverse Opinion is required because evidence is obtained and misstatement is both material and pervasive.'
      },
      {
        step: 'Basis for Adverse Opinion & Heading',
        marks: 1,
        expectedKeywords: ['Basis for Adverse Opinion', 'substantive explanation', 'quantification of effect'],
        description: 'State requirement to include "Basis for Adverse Opinion" section immediately following Adverse Opinion section.'
      }
    ],
    suggestedAnswer: `1. Provision of SA 705 (Revised):
As per SA 705 (Revised) "Modifications to the Opinion in the Independent Auditor's Report":
- An auditor shall express an Adverse Opinion when the auditor, having obtained sufficient appropriate audit evidence, concludes that misstatements, individually or in the aggregate, are BOTH material and pervasive to the financial statements.
- A misstatement is pervasive when it is not confined to specific elements, represents a substantial proportion of the financial statements, or is fundamental to users' understanding.

2. Application to Facts of Zenith Retail Ltd:
- Profit Before Tax reported by the company = ₹ 38 Lakhs.
- Unprovided doubtful debts = ₹ 45 Lakhs.
- If the required provision is made, the reported profit of ₹ 38 Lakhs will convert into a Net Loss of ₹ 7 Lakhs.
- This misstatement alters the fundamental financial position from profitability to loss and substantially impacts the Balance Sheet (Current Assets / Debtors) and Statement of Profit and Loss.
- Therefore, the misstatement is both MATERIAL and PERVASIVE to the financial statements.

3. Opinion to be Issued:
CA. Ananya must issue an ADVERSE OPINION.

4. Reporting Requirements:
- Use heading: "Adverse Opinion".
- State that because of the significance of the matter described in the "Basis for Adverse Opinion" section, the accompanying financial statements do not give a true and fair view in conformity with the accounting principles generally accepted in India.
- Include a "Basis for Adverse Opinion" section immediately following the Opinion section, clearly quantifying the effect on trade receivables, profit before tax, and reserves.`
  },

  // Paper 1: AS 16 Borrowing Costs (High Importance)
  {
    id: 'desc_p1_as16_01',
    subjectId: 'p1_adv_acc',
    chapterId: 'as_ppe_dep',
    type: 'descriptive',
    importance: 'HIGH',
    source: 'RTP Nov 2024 (5 Marks)',
    sourceYear: 'Nov 2024',
    marks: 5,
    difficulty: 'Examiner Favorite',
    icaiReference: 'AS 16 Borrowing Costs - Para 3, 6 & 10',
    questionText: `Aura Infrastructures Ltd. borrowed ₹ 60,00,000 from ICICI Bank on 1st April 2023 at 11% p.a. to finance the construction of a customized toll bridge (a qualifying asset). The construction commenced on 1st May 2023. During the year:
- Funds temporarily pending deployment were placed in short-term bank fixed deposits and earned interest income of ₹ 72,000.
- Normal technical interruptions occurred for 12 days due to monsoon curing of concrete.
- In addition to specific borrowing, company had general borrowings of ₹ 1,00,00,000 at 12% p.a. Out of general funds, ₹ 15,00,000 was utilized for the bridge on 1st October 2023.
The bridge was ready for intended use on 31st March 2024.

Calculate:
(i) Borrowing cost to be capitalized from Specific Borrowing.
(ii) Borrowing cost to be capitalized from General Borrowing.
(iii) Total cost capitalized to the Qualifying Asset.`,
    rubrics: [
      {
        step: 'Specific Borrowing Cost Capitalization under AS 16',
        marks: 2,
        expectedKeywords: ['Commencement from 1st May 2023', '11 months', 'Interest: ₹ 60,00,000 * 11% * 11/12', '₹ 6,05,000', 'Less interest income ₹ 72,000', 'Net: ₹ 5,33,000'],
        mandatoryCitations: ['AS 16'],
        description: 'Capitalization commences only when activities necessary to prepare asset are in progress (from 1st May, 11 months). Deduct temporary interest income.'
      },
      {
        step: 'General Borrowing Cost Capitalization',
        marks: 2,
        expectedKeywords: ['Capitalization rate 12%', '6 months', '15,00,000 * 12% * 6/12', '₹ 90,000'],
        description: 'General funds deployed for 6 months (Oct to March) @ 12% = ₹ 90,000.'
      },
      {
        step: 'Total Capitalized Amount & Normal Interruption Note',
        marks: 1,
        expectedKeywords: ['Total: ₹ 6,23,000', 'Normal technical delay not suspended'],
        description: 'State that normal interruptions necessary for construction (concrete curing) do not require suspension. Total = ₹ 5,33,000 + ₹ 90,000 = ₹ 6,23,000.'
      }
    ],
    suggestedAnswer: `1. Provisions of AS 16 "Borrowing Costs":
- Capitalization commences when: (a) expenditure on asset is being incurred, (b) borrowing costs are being incurred, and (c) activities necessary to prepare the asset are in progress.
- Specific Borrowings: Capitalize actual borrowing costs incurred during the period less any investment income on temporary investment of those borrowings.
- General Borrowings: Capitalize by applying capitalization rate to expenditure incurred from general borrowings.
- Suspension: Capitalization is suspended during extended abnormal interruptions; normal technical delays (like concrete curing) do not require suspension.

2. Specific Borrowing Capitalization:
- Construction commenced on 1st May 2023, hence capitalization is for 11 months (1st May 2023 to 31st March 2024).
- Interest incurred = ₹ 60,00,000 × 11% × (11/12) = ₹ 5,50,000
- Less: Temporary investment income earned = ₹ 72,000
- Net Specific Borrowing Cost Capitalized = ₹ 5,50,000 - ₹ 72,000 = ₹ 4,78,000
(Note: Interest for April ₹ 55,000 is charged to P&L as activities had not commenced).

3. General Borrowing Capitalization:
- General expenditure incurred on 1st October 2023 = ₹ 15,00,000
- Period deployed = 6 months (1st Oct 2023 to 31st March 2024)
- Capitalization Rate = 12%
- General Borrowing Cost Capitalized = ₹ 15,00,000 × 12% × (6/12) = ₹ 90,000

4. Total Borrowing Cost Capitalized:
- Specific Borrowing Cost = ₹ 4,78,000
- General Borrowing Cost = ₹ 90,000
- Total Borrowing Cost Added to Qualifying Asset = ₹ 5,68,000.`
  },

  // Paper 3: Tax - Capital Gains Sec 54 (High Importance)
  {
    id: 'desc_p3_capgains_01',
    subjectId: 'p3_tax',
    chapterId: 'capital_gains',
    type: 'descriptive',
    importance: 'HIGH',
    source: 'ICAI May 2023 Exam (Q2a - 7 Marks)',
    sourceYear: 'May 2023',
    marks: 7,
    difficulty: 'Examiner Favorite',
    icaiReference: 'Section 45, Section 48, Section 50C & Section 54',
    questionText: `Mr. Rajesh (an individual, aged 45 years) sold a residential house property in Delhi on 15th December 2023 for an agreed consideration of ₹ 85,00,000. The Stamp Duty Value (SDV) on the date of registration was ₹ 98,00,000. He had purchased this house on 10th June 2011 for ₹ 25,00,000. Brokerage paid on sale was 1% of the agreed consideration.

On 20th March 2024, Mr. Rajesh purchased a new residential apartment in Noida for ₹ 40,00,000 and deposited ₹ 15,00,000 in the Capital Gains Account Scheme (CGAS) before the due date of filing return under Section 139(1).
(CII for FY 2011-12 = 184; FY 2023-24 = 348)

Required:
Compute the Taxable Capital Gains for Assessment Year 2024-25 assuming Mr. Rajesh opts for the old tax regime to claim Section 54 exemption.`,
    rubrics: [
      {
        step: 'Application of Section 50C on Full Value of Consideration',
        marks: 2,
        expectedKeywords: ['Section 50C', 'Stamp Duty Value', '110% of consideration', '98,00,000', '85,00,000 * 110% = 93,50,000'],
        mandatoryCitations: ['Section 50C'],
        description: 'Verify SDV (98L) > 110% of agreed consideration (93.5L), so full value of consideration is deemed to be ₹ 98,00,000.'
      },
      {
        step: 'Computation of Indexed Cost of Acquisition & Transfer Expenses',
        marks: 2,
        expectedKeywords: ['Brokerage: 1% of 85,00,000 = 85,000', 'Net consideration', 'Indexed Cost: 25,00,000 * 348 / 184 = ₹ 47,28,261'],
        description: 'Deduct brokerage ₹ 85,000 and indexed cost of acquisition ₹ 47,28,261 from full value.'
      },
      {
        step: 'Exemption under Section 54 and Net LTCG',
        marks: 3,
        expectedKeywords: ['Section 54', 'Purchase of new house: ₹ 40,00,000', 'Deposit in CGAS: ₹ 15,00,000', 'Total Exemption: ₹ 55,00,000', 'Taxable LTCG'],
        mandatoryCitations: ['Section 54'],
        description: 'Compute LTCG before exemption. Exemption under Sec 54 = ₹ 40L + ₹ 15L = ₹ 55,00,000. Balance is taxable LTCG.'
      }
    ],
    suggestedAnswer: `COMPUTATION OF TAXABLE CAPITAL GAINS OF MR. RAJESH FOR AY 2024-25

1. Full Value of Consideration [Section 50C]:
   - Actual Consideration = ₹ 85,00,000
   - Stamp Duty Value (SDV) = ₹ 98,00,000
   - 110% of Actual Consideration = ₹ 85,00,000 × 110% = ₹ 93,50,000
   Since the Stamp Duty Value (₹ 98 Lakhs) exceeds 110% of the declared consideration (₹ 93.5 Lakhs), the Stamp Duty Value of ₹ 98,00,000 shall be taken as the Full Value of Consideration.
   Full Value of Consideration = ₹ 98,00,000

2. Less: Expenses on Transfer [Section 48(i)]:
   - Brokerage paid (1% of ₹ 85,00,000) = ₹ 85,000
   Net Sale Consideration = ₹ 97,15,000

3. Less: Indexed Cost of Acquisition [Section 48(ii)]:
   - Cost of Acquisition = ₹ 25,00,000 (purchased in FY 2011-12)
   - Indexed Cost = ₹ 25,00,000 × (348 / 184) = ₹ 47,28,261
   Gross Long Term Capital Gains (LTCG) = ₹ 97,15,000 - ₹ 47,28,261 = ₹ 49,86,739

4. Less: Exemption under Section 54:
   - Investment in new residential apartment in Noida = ₹ 40,00,000
   - Deposit in Capital Gain Account Scheme (CGAS) before due date = ₹ 15,00,000
   - Total eligible investment = ₹ 55,00,000
   Note: Exemption under Section 54 is restricted to the amount of Capital Gains generated (₹ 49,86,739).
   Exemption under Section 54 allowed = ₹ 49,86,739

5. Taxable Long Term Capital Gains:
   Taxable LTCG = Gross LTCG ₹ 49,86,739 - Exemption ₹ 49,86,739 = NIL.`
  },

  // Paper 6: FM - Capital Budgeting (High Importance)
  {
    id: 'desc_p6_capbudg_01',
    subjectId: 'p6_fm_sm',
    chapterId: 'fm_cap_budgeting',
    type: 'descriptive',
    importance: 'HIGH',
    source: 'ICAI Nov 2022 Exam (Q1 - 10 Marks)',
    sourceYear: 'Nov 2022',
    marks: 10,
    difficulty: 'Examiner Favorite',
    icaiReference: 'Capital Budgeting - NPV & Profitability Index',
    questionText: `Apex Engineering Ltd. is considering the acquisition of a CNC Machine. The machine costs ₹ 25,00,000 with installation charges of ₹ 1,00,000. Working capital required at the beginning is ₹ 4,00,000, which will be released at the end of Year 5. The useful life of the machine is 5 years with a salvage value of ₹ 2,00,000.

The expected Annual Earnings Before Depreciation and Tax (EBDT) are:
- Year 1: ₹ 8,00,000
- Year 2: ₹ 9,50,000
- Year 3: ₹ 11,00,000
- Year 4: ₹ 10,00,000
- Year 5: ₹ 8,50,000

The company provides straight-line depreciation. The corporate income tax rate is 25%. The cost of capital is 12%.
Discount factors @ 12%:
Year 1: 0.893 | Year 2: 0.797 | Year 3: 0.712 | Year 4: 0.636 | Year 5: 0.567

Required:
(i) Compute the Initial Cash Outflow.
(ii) Compute the Annual Cash Flow After Tax (CFAT) for Years 1 to 5.
(iii) Compute the Net Present Value (NPV) and Profitability Index (PI).
(iv) Advise the management whether the project should be accepted.`,
    rubrics: [
      {
        step: 'Initial Cash Outflow Calculation',
        marks: 2,
        expectedKeywords: ['Initial Outflow', 'Cost 25,00,000', 'Installation 1,00,000', 'Working Capital 4,00,000', 'Total: ₹ 30,00,000'],
        description: 'Total Initial Outlay = Machine (25L) + Installation (1L) + Initial Working Capital (4L) = ₹ 30,00,000.'
      },
      {
        step: 'Calculation of Annual Depreciation & CFAT',
        marks: 4,
        expectedKeywords: ['Depreciation = (26,00,000 - 2,00,000)/5 = ₹ 4,80,000', 'Tax 25%', 'CFAT = (EBDT - Dep)*(1 - t) + Dep', 'Terminal cash flow in Year 5: Salvage 2L + WC Release 4L = 6L'],
        description: 'Calculate straight line depreciation = ₹ 4,80,000 p.a. Compute annual CFAT for each year.'
      },
      {
        step: 'NPV, PI and Recommendation',
        marks: 4,
        expectedKeywords: ['Present Value of Inflows', 'NPV > 0', 'Profitability Index > 1', 'Accept the project'],
        description: 'Discount CFAT at 12%. Calculate NPV = PV of Inflows - Initial Outflow. Calculate PI. Recommend acceptance.'
      }
    ],
    suggestedAnswer: `WORKING NOTES:
1. Initial Cash Outflow (at t = 0):
   Cost of CNC Machine = ₹ 25,00,000
   Installation Charges = ₹ 1,00,00,00
   Total Capitalized Asset Cost = ₹ 26,00,000
   Working Capital Required = ₹ 4,00,000
   Total Initial Outlay (t=0) = ₹ 30,00,000

2. Annual Depreciation (SLM):
   Asset Cost = ₹ 26,00,000
   Less: Salvage Value = ₹ 2,00,000
   Depreciable Amount = ₹ 24,00,000
   Useful Life = 5 Years
   Annual Depreciation = ₹ 24,00,000 / 5 = ₹ 4,80,000 p.a.

3. Annual Operating Cash Flow After Tax (CFAT):
   CFAT = (EBDT - Depreciation) × (1 - Tax Rate) + Depreciation

   - Year 1: (₹ 8,00,000 - 4,80,000) × 0.75 + 4,80,000 = ₹ 2,40,000 + 4,80,000 = ₹ 7,20,000
   - Year 2: (₹ 9,50,000 - 4,80,000) × 0.75 + 4,80,000 = ₹ 3,52,500 + 4,80,000 = ₹ 8,32,500
   - Year 3: (₹ 11,00,000 - 4,80,000) × 0.75 + 4,80,000 = ₹ 4,65,000 + 4,80,000 = ₹ 9,45,000
   - Year 4: (₹ 10,00,000 - 4,80,000) × 0.75 + 4,80,000 = ₹ 3,90,000 + 4,80,000 = ₹ 8,70,000
   - Year 5 Operating CFAT: (₹ 8,50,000 - 4,80,000) × 0.75 + 4,80,000 = ₹ 7,57,500

4. Terminal Year Cash Flow (at t = 5):
   Operating CFAT = ₹ 7,57,500
   Add: Salvage Value realized = ₹ 2,00,000
   Add: Recovery of Working Capital = ₹ 4,00,000
   Total Year 5 Cash Inflow = ₹ 13,57,500

5. PRESENT VALUE CALCULATION (@ 12%):
   - Year 1: ₹ 7,20,000 × 0.893 = ₹ 6,42,960
   - Year 2: ₹ 8,32,500 × 0.797 = ₹ 6,63,503
   - Year 3: ₹ 9,45,000 × 0.712 = ₹ 6,72,840
   - Year 4: ₹ 8,70,000 × 0.636 = ₹ 5,53,320
   - Year 5: ₹ 13,57,500 × 0.567 = ₹ 7,69,703
   Total Present Value of Cash Inflows = ₹ 33,02,326

6. NET PRESENT VALUE (NPV):
   NPV = Total PV of Inflows - Initial Outflow
   NPV = ₹ 33,02,326 - ₹ 30,00,000 = + ₹ 3,02,326

7. PROFITABILITY INDEX (PI):
   PI = PV of Inflows / Initial Outflow = ₹ 33,02,326 / ₹ 30,00,000 = 1.10

CONCLUSION & RECOMMENDATION:
Since the Net Present Value is positive (+ ₹ 3,02,326) and the Profitability Index exceeds 1 (PI = 1.10), the acquisition of the CNC Machine is financially viable and should be accepted by Apex Engineering Ltd.`
  },

  // Paper 2: Law - General Clauses Act (Low Importance - Never repeats once answered)
  {
    id: 'desc_p2_gca_01',
    subjectId: 'p2_law',
    chapterId: 'general_clauses',
    type: 'descriptive',
    importance: 'LOW',
    source: 'ICAI May 2022 Exam (Q5b - 4 Marks)',
    sourceYear: 'May 2022',
    marks: 4,
    difficulty: 'Standard ICAI',
    icaiReference: 'Section 10 of General Clauses Act, 1897',
    questionText: `State the provisions of Section 10 of the General Clauses Act, 1897 regarding "Computation of Time". A legal appeal was required to be filed in court on 15th August (a national public holiday). The appellant filed the appeal on 16th August when the court reopened. Examine whether the filing is within limitation.`,
    rubrics: [
      {
        step: 'Statement of Section 10 General Clauses Act',
        marks: 2,
        expectedKeywords: ['Section 10', 'Computation of Time', 'court or office closed on last day', 'done on the next day'],
        mandatoryCitations: ['Section 10'],
        description: 'Quote Section 10: Where any act is directed to be done on a day the court/office is closed, it shall be considered done if done on the next day.'
      },
      {
        step: 'Application and Validity',
        marks: 2,
        expectedKeywords: ['15th August is closed holiday', '16th August reopening', 'validly filed within limitation'],
        description: 'Apply to facts: Since 15th August is a national holiday, filing on 16th August is fully valid within limitation.'
      }
    ],
    suggestedAnswer: `1. Provision of Section 10 of General Clauses Act, 1897:
Under Section 10 of the General Clauses Act, 1897, where by any Central Act or Regulation, any act or proceeding is directed or allowed to be done or taken in any court or office on a certain day or within a prescribed period, then, if the court or office is closed on that day or the last day of the prescribed period, the act or proceeding shall be considered as done or taken in due time if it is done or taken on the next day on which the court or office is open.

2. Application to Given Case:
- The last date for filing the legal appeal fell on 15th August, which is a declared national public holiday (Independence Day), on which courts are closed.
- The appellant filed the appeal on the immediately following working day, 16th August, upon the reopening of the court.

3. Conclusion:
Applying the statutory rule under Section 10, the appeal filed on 16th August is legally valid, effective, and considered filed well within the period of limitation.`
  }
];
