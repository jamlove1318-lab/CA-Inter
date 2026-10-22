import { CaseStudyQuestion } from '../types/question';

export const CASE_STUDIES_DATABASE: CaseStudyQuestion[] = [
  {
    id: 'case_01_law_tax',
    subjectId: 'p2_law',
    chapterId: 'accounts_csr',
    title: 'Integrated Case Scenario: Apex Agrochem Ltd (Corporate Governance, CSR & Taxation)',
    source: 'ICAI Integrated Case Study (RTP Nov 2024 Pattern)',
    importance: 'HIGH',
    totalMarks: 15,
    scenarioText: `Apex Agrochem Ltd. is an unlisted public company incorporated in 2018 with its registered office in Pune, Maharashtra. The company manufactures agro-chemicals and organic pesticides. 

During the Financial Year 2023-24, the following transactions and corporate events occurred:

1. Financial Position as of 31st March 2023:
   - Paid-up Equity Share Capital: ₹ 20 Crores (2 Crore shares of ₹ 10 each)
   - Free Reserves & Securities Premium: ₹ 85 Crores
   - Borrowings from Scheduled Banks: ₹ 110 Crores
   - Turnover for FY 2022-23: ₹ 1,020 Crores
   - Net Profit for FY 2022-23: ₹ 8.5 Crores (preceding FY 2021-22: ₹ 6.5 Cr; FY 2020-21: ₹ 4.0 Cr)

2. Corporate Actions & Meetings:
   - The company held its Annual General Meeting (AGM) on 28th September 2023. Notice of AGM was emailed on 8th September 2023 (19 clear days before meeting). 92% of the members entitled to vote gave consent in writing for calling AGM at shorter notice.
   - The Board approved a CSR policy and earmarked funds for setting up an organic farming skill center (an ongoing project with a 3-year execution timeline). The amount budgeted was ₹ 15 Lakhs, but by 31st March 2024, only ₹ 6 Lakhs was actually disbursed.

3. Tax & GST Matters:
   - The company paid ₹ 12 Lakhs as sitting fees and commission to its independent non-executive directors. The company accountant was uncertain whether GST is applicable under Reverse Charge Mechanism (RCM) or Forward Charge.
   - In December 2023, the company purchased an industrial land parcel for ₹ 2.5 Crores; however, the Stamp Duty Authority determined the circle rate value at ₹ 3.2 Crores.`,
    mcqs: [
      {
        id: 'case_01_mcq_1',
        subjectId: 'p2_law',
        chapterId: 'mgmt_admin',
        type: 'mcq',
        importance: 'HIGH',
        source: 'Case Scenario Q1',
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'Section 101(1) Companies Act, 2013',
        questionText: 'Regarding the calling of the Annual General Meeting at shorter notice with consent of 92% of members, is the meeting legally valid under Section 101 of the Companies Act, 2013?',
        options: [
          { id: 'a', text: 'No, because for an AGM, consent of not less than 95% of members entitled to vote is mandatory' },
          { id: 'b', text: 'Yes, because consent of more than 90% of members is sufficient for any general meeting' },
          { id: 'c', text: 'Yes, because 21 days notice rule does not apply to unlisted public companies' },
          { id: 'd', text: 'No, because an AGM cannot be held at shorter notice under any circumstance' }
        ],
        correctOptionId: 'a',
        trapNote: 'For an AGM, the shorter notice threshold is strictly not less than 95% of members entitled to vote. For an EGM, it is majority in number + 95% of paid-up capital.',
        explanation: 'Under Section 101(1) of the Companies Act, 2013, a general meeting may be called after giving shorter notice if consent, in writing or by electronic mode, is accorded in the case of an AGM, by not less than 95% of the members entitled to vote thereat. Since only 92% consented, the shorter notice was invalid.'
      },
      {
        id: 'case_01_mcq_2',
        subjectId: 'p3_tax',
        chapterId: 'gst_supply_charge',
        type: 'mcq',
        importance: 'HIGH',
        source: 'Case Scenario Q2',
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'Notification No. 13/2017 - Central Tax (Rate) - Reverse Charge',
        questionText: 'Regarding the sitting fees and commission of ₹ 12 Lakhs paid to independent directors, what is the GST liability and mechanism?',
        options: [
          { id: 'a', text: 'Apex Agrochem Ltd. is liable to pay GST under Reverse Charge Mechanism (RCM) under Section 9(3)' },
          { id: 'b', text: 'The independent directors must register and pay GST under forward charge' },
          { id: 'c', text: 'It is an employer-employee transaction covered in Schedule III, hence outside GST' },
          { id: 'd', text: 'Exempt from GST if director income is below ₹ 20 Lakhs' }
        ],
        correctOptionId: 'a',
        trapNote: 'Whole-time directors drawing salary subject to TDS u/s 192 are Schedule III (exempt). Non-executive / independent directors receiving sitting fees are taxable under RCM paid by company!',
        explanation: 'As per Notification No. 13/2017-CT(Rate), services supplied by a director of a company or a body corporate to the said company/body corporate are subject to GST under Reverse Charge Mechanism (RCM), where the company is liable to discharge GST.'
      }
    ],
    descriptiveQuestions: [
      {
        id: 'case_01_desc_1',
        subjectId: 'p2_law',
        chapterId: 'accounts_csr',
        type: 'descriptive',
        importance: 'HIGH',
        source: 'Case Scenario Q3 (Descriptive - 6 Marks)',
        marks: 6,
        difficulty: 'Examiner Favorite',
        icaiReference: 'Section 135(5) & 135(6) Companies Act, 2013',
        questionText: `With reference to the organic farming ongoing project:
(i) Compute the exact statutory CSR liability of Apex Agrochem Ltd for FY 2023-24 based on its 3-year net profits.
(ii) Explain the statutory procedure and timeline the company must follow for the unspent CSR amount of ₹ 9 Lakhs (budgeted ₹ 15 Lakhs minus ₹ 6 Lakhs spent) as of 31st March 2024 under Section 135(6).`,
        rubrics: [
          {
            step: 'Computation of Statutory CSR Obligation',
            marks: 2,
            expectedKeywords: ['Average Net Profit: (8.5 + 6.5 + 4.0)/3 = ₹ 6.33 Crores', '2% of ₹ 6.33 Cr = ₹ 12.67 Lakhs'],
            description: 'Average profit = 19.0 / 3 = ₹ 6.333 Crores. 2% = ₹ 12.67 Lakhs.'
          },
          {
            step: 'Statutory Procedure under Section 135(6) for Ongoing Project',
            marks: 3,
            expectedKeywords: ['Section 135(6)', '30 days from end of FY (by 30th April 2024)', 'Unspent CSR Account', 'Scheduled Bank', 'spend within 3 financial years'],
            mandatoryCitations: ['Section 135(6)'],
            description: 'Explain transfer of unspent balance relating to ongoing project to Unspent CSR Account within 30 days.'
          },
          {
            step: 'Failure to spend within 3 years consequences',
            marks: 1,
            expectedKeywords: ['transfer to Fund specified in Schedule VII', 'within 30 days of 3rd FY end', 'PM CARES or Clean Ganga'],
            description: 'State that if not spent in 3 FYs, balance must be transferred to Schedule VII fund.'
          }
        ],
        suggestedAnswer: `(i) Statutory CSR Liability for FY 2023-24:
Average Net Profit of preceding 3 financial years:
- FY 2022-23: ₹ 8.50 Crores
- FY 2021-22: ₹ 6.50 Crores
- FY 2020-21: ₹ 4.00 Crores
Total Net Profit = ₹ 19.00 Crores
Average Net Profit = ₹ 19.00 Cr / 3 = ₹ 6.333 Crores.

Minimum Statutory CSR Obligation (2% of Average Net Profit) = 2% × ₹ 6.333 Crores = ₹ 0.1267 Crores = ₹ 12.67 Lakhs.
(The company budgeted ₹ 15 Lakhs, which is higher than the statutory minimum of ₹ 12.67 Lakhs).

(ii) Statutory Compliance for Unspent Amount [Section 135(6)]:
As the organic farming skill center is an "ongoing project":
1. The unspent amount (Statutory unspent = ₹ 12.67L - ₹ 6L = ₹ 6.67 Lakhs, or budgeted unspent ₹ 9 Lakhs) must be transferred to a special bank account opened in any scheduled bank called "Unspent Corporate Social Responsibility Account".
2. Time limit: Within 30 days from the closure of the financial year (i.e., on or before 30th April 2024).
3. Utilization: The funds in this account must be utilized exclusively for the ongoing project within a period of 3 financial years from the date of transfer (i.e., by 31st March 2027).
4. Failure to spend: If the company fails to spend the amount within the said 3 financial years, the remaining unspent balance must be transferred to a Fund specified in Schedule VII (such as Prime Minister's National Relief Fund or PM CARES Fund) within 30 days from the date of completion of the third financial year.`
      }
    ]
  },
  {
    id: 'case_02_audit_cost',
    subjectId: 'p5_audit',
    chapterId: 'audit_evidence',
    title: 'Integrated Case Scenario: Starlight Electronics Ltd (Physical Inventory, AS 2 & SA 501)',
    source: 'ICAI Integrated Case Study (May 2024 Pattern)',
    importance: 'HIGH',
    totalMarks: 15,
    scenarioText: `Starlight Electronics Ltd. manufactures smart LED panels and semiconductors in Noida. The company's inventory as on 31st March 2024 is valued at ₹ 42 Crores, which represents 38% of total assets.

During the year-end statutory audit, the engagement team headed by CA. Vikram encountered the following issues:

1. Inventory Verification & Access:
   - The company conducted physical inventory verification at its primary warehouse on 31st March 2024. However, due to unexpected toxic gas leakage in the specialized semiconductor clean-room, CA. Vikram and his team were physically barred from attending the inventory count on that date.
   - Management conducted the physical count on 12th April 2024 after decontamination and provided CA. Vikram with their count sheets.

2. Valuation Discrepancies under AS 2:
   - 10,000 finished OLED display units had a manufacturing cost of ₹ 8,000 each (Total ₹ 8 Crores). Due to technological obsolescence from a new 4K model, the current market selling price had fallen to ₹ 7,200 each, with selling expenses estimated at ₹ 400 per unit. Management valued these at original cost ₹ 8,000 per unit arguing that technology markets will rebound.
   - Normal spoilage in semiconductor manufacturing is 2%, but in FY 2023-24, abnormal spoilage was 7% due to power grid voltage fluctuations. Management capitalized the ₹ 1.2 Crore abnormal loss into product cost.`,
    mcqs: [
      {
        id: 'case_02_mcq_1',
        subjectId: 'p5_audit',
        chapterId: 'audit_evidence',
        type: 'mcq',
        importance: 'HIGH',
        source: 'Case Scenario Q1',
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'SA 501 Audit Evidence - Specific Considerations for Selected Items',
        questionText: 'When physical inventory count attendance is impracticable due to unforeseen safety issues on the balance sheet date, what is the auditor’s duty under SA 501?',
        options: [
          { id: 'a', text: 'Perform alternative audit procedures, or observe count on an alternative date and perform audit procedures on intervening transactions' },
          { id: 'b', text: 'Immediately issue an adverse audit report without testing' },
          { id: 'c', text: 'Accept management representation letter as sole conclusive evidence' },
          { id: 'd', text: 'Resign from the audit engagement immediately' }
        ],
        correctOptionId: 'a',
        trapNote: 'SA 501 specifically provides for alternative date counts + roll-back/roll-forward procedures on intervening transactions.',
        explanation: 'Under SA 501 Para 7, if attendance at physical inventory counting is impracticable, the auditor shall perform alternative audit procedures to obtain sufficient appropriate audit evidence regarding the existence and condition of inventory. If possible, perform or observe physical counts on an alternative date, and perform audit procedures on intervening transactions.'
      },
      {
        id: 'case_02_mcq_2',
        subjectId: 'p1_adv_acc',
        chapterId: 'as_revenue_inv',
        type: 'mcq',
        importance: 'HIGH',
        source: 'Case Scenario Q2',
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'AS 2 Valuation of Inventories - Para 5 & 13',
        questionText: 'What is the correct valuation per unit of the 10,000 finished OLED display units as per AS 2?',
        options: [
          { id: 'a', text: '₹ 6,800 per unit (Net Realisable Value = ₹ 7,200 - ₹ 400)' },
          { id: 'b', text: '₹ 8,000 per unit (Original Cost)' },
          { id: 'c', text: '₹ 7,200 per unit (Gross Selling Price)' },
          { id: 'd', text: '₹ 7,600 per unit (Average of Cost and Selling Price)' }
        ],
        correctOptionId: 'a',
        trapNote: 'Net Realisable Value is Estimated Selling Price LESS Estimated Costs necessary to make the sale. 7,200 - 400 = 6,800. Since 6,800 < Cost of 8,000, value at 6,800.',
        explanation: 'As per AS 2, inventories should be valued at the lower of cost and Net Realisable Value (NRV). NRV = Estimated selling price in ordinary course of business less estimated costs of completion and estimated costs necessary to make the sale = ₹ 7,200 - ₹ 400 = ₹ 6,800. Since NRV (₹ 6,800) is lower than Cost (₹ 8,000), inventory must be written down to ₹ 6,800, creating an inventory write-down loss of ₹ 1,200 per unit (Total ₹ 1.2 Crores).'
      }
    ],
    descriptiveQuestions: [
      {
        id: 'case_02_desc_1',
        subjectId: 'p5_audit',
        chapterId: 'audit_fs_items',
        type: 'descriptive',
        importance: 'HIGH',
        source: 'Case Scenario Q3 (Descriptive - 6 Marks)',
        marks: 6,
        difficulty: 'Examiner Favorite',
        icaiReference: 'SA 501, AS 2 & SA 705',
        questionText: `Analyze the auditor's course of action and reporting obligations if management refuses to write down the finished OLED inventory to NRV (overstatement of ₹ 1.2 Crores) and insists on capitalizing abnormal spoilage of ₹ 1.2 Crores (total misstatement ₹ 2.4 Crores against materiality of ₹ 1.5 Crores).`,
        rubrics: [
          {
            step: 'Assessment of Material Misstatement',
            marks: 2,
            expectedKeywords: ['Total Misstatement: ₹ 2.4 Crores', 'Exceeds materiality of ₹ 1.5 Crores', 'Violation of AS 2 Para 5 and Para 13'],
            description: 'Evaluate that ₹ 1.2 Cr inventory write-down + ₹ 1.2 Cr abnormal spoilage = ₹ 2.4 Cr total misstatement exceeds materiality.'
          },
          {
            step: 'Communication with TCWG',
            marks: 2,
            expectedKeywords: ['Communicate with TCWG', 'Request correction in Financial Statements', 'SA 450 Evaluation of Misstatements'],
            description: 'Auditor must request management and TCWG to adjust financial statements.'
          },
          {
            step: 'Audit Opinion Modification under SA 705',
            marks: 2,
            expectedKeywords: ['Qualified Opinion', 'Material but not pervasive', 'Basis for Qualified Opinion'],
            mandatoryCitations: ['SA 705'],
            description: 'If management refuses, issue Qualified Opinion ("Except for the effects of...") as the misstatement is material but not pervasive to the statements as a whole.'
          }
        ],
        suggestedAnswer: `1. Evaluation of Misstatements:
- Finished Goods Valuation: AS 2 mandates valuation at Lower of Cost (₹ 8,000) or NRV (₹ 6,800). Failure to write down leads to inventory overstatement of (10,000 units × ₹ 1,200) = ₹ 1.20 Crores.
- Abnormal Spoilage: AS 2 explicitly requires abnormal amounts of wasted materials to be excluded from product cost and charged to P&L. Capitalizing ₹ 1.20 Crores into inventory violates AS 2.
- Total Cumulative Misstatement = ₹ 1.20 Cr + ₹ 1.20 Cr = ₹ 2.40 Crores.
- Since ₹ 2.40 Crores exceeds the audit planning materiality of ₹ 1.50 Crores, the misstatement is MATERIAL.

2. Auditor's Action under SA 450:
- CA. Vikram must formally communicate these uncorrected misstatements to those charged with governance (TCWG) and request management to adjust the financial statements.

3. Audit Reporting Implications under SA 705 (Revised):
- If management refuses to make the adjustments:
  - Misstatements are material (₹ 2.40 Cr > ₹ 1.50 Cr) but are confined to inventory and related cost of sales (not pervasive to the whole financial statements).
  - Therefore, CA. Vikram must express a QUALIFIED OPINION.
- Reporting Requirements:
  - Heading: "Qualified Opinion".
  - Opinion wording: State that "Except for the effects of the matter described in the Basis for Qualified Opinion section, the financial statements give a true and fair view...".
  - Include "Basis for Qualified Opinion" quantifying the overstatement of inventory by ₹ 2.40 Crores and overstatement of Profit Before Tax by ₹ 2.40 Crores.`
      }
    ]
  },
  {
    id: 'case_03_cost_fm',
    subjectId: 'p4_costing',
    chapterId: 'marginal_costing',
    title: 'Integrated Case Scenario: Nova Automotive Ltd (Marginal Costing, Make or Buy & Leverages)',
    source: 'ICAI Integrated Case Study (RTP May 2024 Pattern)',
    importance: 'HIGH',
    totalMarks: 15,
    scenarioText: `Nova Automotive Ltd. manufactures electric two-wheeler motors in Chennai. The installed capacity is 50,000 motors per annum, and the current operating capacity utilization is 70% (35,000 units).

Cost and financial structure for the current year are as follows:
1. Per Unit Cost Structure (at 35,000 units):
   - Direct Materials: ₹ 1,200
   - Direct Labour: ₹ 600
   - Variable Manufacturing Overheads: ₹ 400
   - Fixed Manufacturing Overheads: ₹ 500 (Total Fixed OH = ₹ 1,75,00,000)
   - Total Manufacturing Cost: ₹ 2,700
   - Selling Price per unit: ₹ 3,600

2. Special Export Order Proposal:
   - A multinational fleet operator from Vietnam offers to purchase 10,000 units at a special export offer price of ₹ 2,500 per unit.
   - Additional export packaging and sea freight will cost ₹ 100 per unit.
   - No additional fixed costs will be incurred, and domestic sales price and volume will not be impacted.

3. Capital Structure & Financing:
   - Nova Automotive Ltd has an existing 12% Bank Term Loan of ₹ 2.5 Crores (Annual Interest = ₹ 30 Lakhs).
   - Equity Share Capital: ₹ 5 Crores (50 Lakh shares of ₹ 10 each).
   - Corporate Tax rate is 25%.`,
    mcqs: [
      {
        id: 'case_03_mcq_1',
        subjectId: 'p4_costing',
        chapterId: 'marginal_costing',
        type: 'mcq',
        importance: 'HIGH',
        source: 'Case Scenario Q1',
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'Marginal Costing - Export Order & Relevant Costing',
        questionText: 'What is the incremental contribution per unit from accepting the special export order of 10,000 units from Vietnam?',
        options: [
          { id: 'a', text: '₹ 200 per unit (Profit of ₹ 20,00,000)' },
          { id: 'b', text: '- ₹ 200 per unit (Loss of ₹ 20,00,000 against total cost)' },
          { id: 'c', text: '₹ 100 per unit (Profit of ₹ 10,00,000)' },
          { id: 'd', text: '₹ 300 per unit (Profit of ₹ 30,00,000)' }
        ],
        correctOptionId: 'a',
        trapNote: 'Fixed overheads are SUNK and irrelevant for spare capacity export order! Relevant variable cost = 1200 + 600 + 400 + 100 (special packaging) = ₹ 2,300.',
        explanation: 'Relevant Variable Cost per unit for export = Direct Material (₹ 1,200) + Direct Labour (₹ 600) + Variable OH (₹ 400) + Export Packaging (₹ 100) = ₹ 2,300. Incremental Contribution per unit = Export Selling Price (₹ 2,500) - Relevant Cost (₹ 2,300) = ₹ 200 per unit. Total incremental profit = 10,000 × ₹ 200 = ₹ 20,00,000. Since capacity exists (15,000 idle units), the order should be accepted.'
      },
      {
        id: 'case_03_mcq_2',
        subjectId: 'p6_fm_sm',
        chapterId: 'fm_leverages',
        type: 'mcq',
        importance: 'HIGH',
        source: 'Case Scenario Q2',
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'Degree of Financial Leverage (DFL = EBIT / EBT)',
        questionText: 'Assuming current domestic operations generate EBIT of ₹ 3,15,00,000, what is the Degree of Financial Leverage (DFL)?',
        options: [
          { id: 'a', text: '1.105 (EBIT ₹ 3.15 Cr / EBT ₹ 2.85 Cr)' },
          { id: 'b', text: '1.250' },
          { id: 'c', text: '1.000' },
          { id: 'd', text: '1.420' }
        ],
        correctOptionId: 'a',
        trapNote: 'DFL = EBIT / (EBIT - Interest) = ₹ 3,15,00,000 / (₹ 3,15,00,000 - ₹ 30,00,000) = 315 / 285 = 1.105.',
        explanation: 'EBIT = ₹ 3,15,00,000. Interest = ₹ 30,00,000. EBT = ₹ 3,15,00,000 - ₹ 30,00,000 = ₹ 2,85,00,000. Degree of Financial Leverage (DFL) = EBIT / EBT = 3,15,00,000 / 2,85,00,000 = 1.105.'
      }
    ],
    descriptiveQuestions: [
      {
        id: 'case_03_desc_1',
        subjectId: 'p4_costing',
        chapterId: 'marginal_costing',
        type: 'descriptive',
        importance: 'HIGH',
        source: 'Case Scenario Q3 (Descriptive - 6 Marks)',
        marks: 6,
        difficulty: 'Examiner Favorite',
        icaiReference: 'Break-Even Analysis, Margin of Safety & Export Order Decision',
        questionText: `Based on the domestic operating parameters of Nova Automotive Ltd:
(i) Calculate the domestic Break-Even Point (in units and value) and the Margin of Safety percentage.
(ii) Advise management with detailed calculations whether the Vietnam export order should be accepted and show the overall revised profit of the company after accepting the order.`,
        rubrics: [
          {
            step: 'Break-Even Point and Margin of Safety Computation',
            marks: 3,
            expectedKeywords: ['Contribution per unit = ₹ 1,400', 'BEP units = 12,500 units', 'BEP Value = ₹ 4,50,00,000', 'Margin of Safety % = 64.29%'],
            description: 'Contribution = 3,600 - 2,200 = ₹ 1,400/unit. BEP = 1,75,00,000 / 1,400 = 12,500 units. MOS % = (35,000 - 12,500)/35,000 = 64.29%.'
          },
          {
            step: 'Evaluation of Export Order and Revised Profitability',
            marks: 3,
            expectedKeywords: ['Idle capacity = 15,000 units', 'Accept export order', 'Incremental contribution = ₹ 20,00,000', 'Revised Total EBIT = ₹ 3,35,00,000'],
            description: 'State that since 15,000 units capacity is idle and incremental contribution is positive (₹ 20 Lakhs), accept order. Revised EBIT = ₹ 3.15 Cr + ₹ 0.20 Cr = ₹ 3.35 Crores.'
          }
        ],
        suggestedAnswer: `1. Domestic Break-Even Point & Margin of Safety:
- Selling Price per unit = ₹ 3,600
- Variable Cost per unit = Direct Material (₹ 1,200) + Direct Labour (₹ 600) + Variable OH (₹ 400) = ₹ 2,200
- Contribution per unit = ₹ 3,600 - ₹ 2,200 = ₹ 1,400 per unit
- P/V Ratio = (₹ 1,400 / ₹ 3,600) × 100 = 38.89%
- Total Fixed Overheads = ₹ 1,75,00,000
- Break-Even Point (in units) = Fixed Costs / Contribution per unit = ₹ 1,75,00,000 / ₹ 1,400 = 12,500 units
- Break-Even Point (in value) = 12,500 units × ₹ 3,600 = ₹ 4,50,00,000
- Margin of Safety (in units) = Actual Sales (35,000) - BEP Sales (12,500) = 22,500 units
- Margin of Safety (%) = (22,500 / 35,000) × 100 = 64.29%

2. Evaluation and Advice on Special Export Order:
- Available Idle Capacity = Installed Capacity (50,000) - Current Domestic (35,000) = 15,000 units.
- The export order requires 10,000 units, which is well within the idle capacity of 15,000 units.
- Export Selling Price = ₹ 2,500 per unit
- Relevant Variable Cost = Domestic Variable Cost (₹ 2,200) + Special Packaging (₹ 100) = ₹ 2,300 per unit
- Incremental Contribution = ₹ 2,500 - ₹ 2,300 = ₹ 200 per unit
- Total Incremental Profit from Export = 10,000 units × ₹ 200 = ₹ 20,00,000.
Recommendation: The company should accept the export order as it utilizes idle capacity and contributes ₹ 20,00,000 directly to net profit without increasing fixed overheads.
Revised Operating Profit (EBIT) = Current Domestic EBIT (₹ 3,15,00,000) + Export Profit (₹ 20,00,000) = ₹ 3,35,00,000.`
      }
    ]
  },
  {
    id: 'case_04_tax_law',
    subjectId: 'p3_tax',
    chapterId: 'capital_gains',
    title: 'Integrated Case Scenario: Zenith Infotech & Director Disqualifications (Taxation & Corporate Law)',
    source: 'ICAI Integrated Case Study (Nov 2024 Pattern)',
    importance: 'HIGH',
    totalMarks: 15,
    scenarioText: `Zenith Infotech Pvt Ltd is an Indian software consultancy company headquartered in Bengaluru.

Key events during the financial year 2023-24 (AY 2024-25):
1. Transfer of Commercial Property & Section 50C:
   - On 15th October 2023, Zenith Infotech sold an office building in Whitefield for ₹ 3.5 Crores.
   - The agreement to sell was entered on 1st March 2023 with an advance of ₹ 30 Lakhs received via account payee bank draft.
   - Stamp Duty Value (SDV) on 1st March 2023 was ₹ 3.7 Crores.
   - SDV on registration date (15th October 2023) was ₹ 4.1 Crores.
   - The company's tax consultant is debating whether SDV of March 2023 or October 2023 applies.

2. Director Meetings & Compliance under Companies Act:
   - The company has 4 directors. A Board meeting was convened on 20th November 2023. Notice of meeting was given only 3 days prior. 
   - Director Mr. Alok was in the US and attended via video-conferencing.
   - Another director, Mr. Raman, has not filed his annual financial returns and statements for 3 consecutive financial years in another private company where he is also a director.`,
    mcqs: [
      {
        id: 'case_04_mcq_1',
        subjectId: 'p3_tax',
        chapterId: 'capital_gains',
        type: 'mcq',
        importance: 'HIGH',
        source: 'Case Scenario Q1',
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'Section 50C Provisos - Agreement Date SDV vs Registration Date SDV',
        questionText: 'For computing capital gains under Section 50C, which Stamp Duty Value should be taken as the benchmark, and is any full value of consideration adjustment required?',
        options: [
          { id: 'a', text: 'SDV on agreement date (₹ 3.7 Cr) is considered, and since it is within 110% of agreed consideration (₹ 3.85 Cr), actual consideration ₹ 3.5 Cr is taken' },
          { id: 'b', text: 'SDV on registration date (₹ 4.1 Cr) must mandatorily be taken in all circumstances' },
          { id: 'c', text: '₹ 4.1 Crores is deemed consideration because advance was not paid in cash' },
          { id: 'd', text: 'The average of ₹ 3.7 Cr and ₹ 4.1 Cr must be taken' }
        ],
        correctOptionId: 'a',
        trapNote: 'First proviso to Section 50C: If consideration or part thereof is received by account payee cheque/draft/ECS on or before the date of agreement, SDV on the date of agreement (₹ 3.7 Cr) applies! 110% of ₹ 3.5 Cr = ₹ 3.85 Cr. Since ₹ 3.7 Cr <= ₹ 3.85 Cr, no addition is made under Section 50C!',
        explanation: 'Under the first proviso to Section 50C, where the date of agreement and registration are not the same, the SDV on the date of agreement can be taken provided part consideration was received by banking channels on or before agreement date. Here ₹ 30 Lakhs was received via bank draft. Therefore, agreement date SDV (₹ 3.7 Cr) applies. Furthermore, under the third proviso, if SDV does not exceed 110% of agreed consideration (₹ 3.5 Cr × 110% = ₹ 3.85 Cr), the actual consideration of ₹ 3.5 Crores is treated as Full Value of Consideration.'
      },
      {
        id: 'case_04_mcq_2',
        subjectId: 'p2_law',
        chapterId: 'mgmt_admin',
        type: 'mcq',
        importance: 'HIGH',
        source: 'Case Scenario Q2',
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'Section 164(2) Disqualification of Directors',
        questionText: 'What is the legal consequence for Mr. Raman regarding his directorship under Section 164(2) of the Companies Act, 2013 for non-filing of financial statements for 3 consecutive years?',
        options: [
          { id: 'a', text: 'Disqualified from being re-appointed in that company or appointed in any other company for 5 years, and must vacate office under Section 167(1)(a)' },
          { id: 'b', text: 'Only a monetary penalty of ₹ 50,000 with no disqualification' },
          { id: 'c', text: 'Disqualified for only 1 year provided fine is paid' },
          { id: 'd', text: 'No impact on directorship in other companies' }
        ],
        correctOptionId: 'a',
        trapNote: 'Section 164(2)(a) imposes 5-year disqualification across all companies and triggers vacation of office under Section 167(1)(a).',
        explanation: 'Under Section 164(2)(a) of the Companies Act, 2013, no person who is or has been a director of a company which has not filed financial statements or annual returns for any continuous period of three financial years shall be eligible to be re-appointed as a director of that company or appointed in other company for a period of five years. Under Section 167(1)(a), the office of director becomes vacant in all companies other than the defaulting company.'
      }
    ],
    descriptiveQuestions: [
      {
        id: 'case_04_desc_1',
        subjectId: 'p2_law',
        chapterId: 'mgmt_admin',
        type: 'descriptive',
        importance: 'HIGH',
        source: 'Case Scenario Q3 (Descriptive - 6 Marks)',
        marks: 6,
        difficulty: 'Examiner Favorite',
        icaiReference: 'Section 173(3) Board Meeting at Shorter Notice & Video Conferencing Rules',
        questionText: `Examine the legal validity of the Board Meeting of Zenith Infotech Pvt Ltd held on 20th November 2023 with reference to:
(i) Calling the Board meeting with only 3 days notice under Section 173(3).
(ii) Attendance of Director Mr. Alok via video conferencing and requirements for valid quorum under Section 174 and Rule 3 of Companies (Meetings of Board and its Powers) Rules, 2014.`,
        rubrics: [
          {
            step: 'Provisions regarding Notice of Board Meeting under Section 173(3)',
            marks: 3,
            expectedKeywords: ['Section 173(3)', 'Not less than 7 days notice in writing', 'Shorter notice valid if at least one Independent Director is present', 'Private company or ratification by majority'],
            mandatoryCitations: ['Section 173(3)'],
            description: 'State that statutory notice is 7 days. Shorter notice is permissible to transact urgent business if at least 1 independent director is present, or if ratified by majority of directors.'
          },
          {
            step: 'Participation via Video Conferencing & Quorum Validity',
            marks: 3,
            expectedKeywords: ['Section 173(2)', 'Rule 3 Video Conferencing', 'counted for quorum under Section 174', 'roll call and integrity of proceedings'],
            mandatoryCitations: ['Section 173(2)', 'Section 174'],
            description: 'Confirm that participation via video-conferencing is legally recognized for both attendance and quorum under Section 174.'
          }
        ],
        suggestedAnswer: `(i) Validity of Shorter Notice for Board Meeting [Section 173(3)]:
1. General Statutory Rule: As per Section 173(3) of the Companies Act, 2013, a meeting of the Board shall be called by giving not less than seven (7) days notice in writing to every director at his registered address by hand delivery, post, or electronic means.
2. Shorter Notice Exception: A Board meeting may be called at shorter notice to transact urgent business subject to the condition that at least one independent director, if any, shall be present at the meeting.
3. In the case of a private company (which does not require independent directors), or where no independent director is present, decisions taken at such a shorter notice meeting shall be circulated to all directors and shall be final only on ratification by at least one independent director or majority of directors.
Hence, the meeting called at 3 days notice is valid subject to ratification by majority of directors.

(ii) Participation via Video Conferencing and Quorum [Section 173(2) & 174]:
1. Under Section 173(2) read with Rule 3 of Companies (Meetings of Board and its Powers) Rules, 2014, directors may participate in Board meetings in person or through video conferencing or other audio-visual means capable of recording and recognizing the participation.
2. Quorum under Section 174: Directors participating through video conferencing or other audio-visual means are validly counted for the purpose of quorum under Section 174.
3. Necessary safeguards (storing recordings, roll call identifying director and location, ensuring secrecy) must be followed by the chairperson.
Conclusion: Mr. Alok's participation through video conferencing from the US is legally valid and counts toward the statutory quorum.`
      }
    ]
  }
];
