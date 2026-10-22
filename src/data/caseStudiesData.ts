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
  }
];
