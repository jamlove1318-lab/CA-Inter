export interface StatutoryItem {
  id: string;
  category: 'Company Law' | 'Income Tax' | 'GST' | 'Standards on Auditing (SA)' | 'Accounting Standards (AS)';
  code: string;
  title: string;
  keyRule: string;
  subjectId: string;
}

export const SECTIONS_AND_STANDARDS: StatutoryItem[] = [
  // Companies Act
  {
    id: 'ca_sec_68',
    category: 'Company Law',
    code: 'Section 68',
    title: 'Buyback of Securities',
    keyRule: 'Max 25% of paid-up capital & free reserves; Debt-equity ratio after buyback cannot exceed 2:1; Special Resolution needed if > 10%.',
    subjectId: 'p2_law'
  },
  {
    id: 'ca_sec_135',
    category: 'Company Law',
    code: 'Section 135',
    title: 'Corporate Social Responsibility (CSR)',
    keyRule: 'Applicable if Net worth >= 500 Cr, Turnover >= 1000 Cr, or Net profit >= 5 Cr. Must spend min 2% of average net profits of preceding 3 financial years.',
    subjectId: 'p2_law'
  },
  {
    id: 'ca_sec_139',
    category: 'Company Law',
    code: 'Section 139',
    title: 'Appointment of Statutory Auditors',
    keyRule: 'First auditor appointed within 30 days of registration by Board; otherwise by members in EGM in 90 days. Subsequent auditor holds office from 1st AGM till 6th AGM.',
    subjectId: 'p2_law'
  },
  {
    id: 'ca_sec_141',
    category: 'Company Law',
    code: 'Section 141',
    title: 'Eligibility & Disqualifications of Auditor',
    keyRule: 'CA in practice; Officer/employee disqualified; Partner/relative holding securities > Rs. 1 lakh face value in company disqualified; Indebted > Rs. 5 lakhs.',
    subjectId: 'p2_law'
  },
  {
    id: 'ca_sec_123',
    category: 'Company Law',
    code: 'Section 123',
    title: 'Declaration and Payment of Dividend',
    keyRule: 'Declared out of current year profits after depreciation, or past reserves subject to Rule 3 (Max rate <= avg of 3 yrs; Max withdrawal <= 10% of capital+free reserves).',
    subjectId: 'p2_law'
  },
  {
    id: 'ca_sec_73',
    category: 'Company Law',
    code: 'Section 73',
    title: 'Acceptance of Deposits from Members',
    keyRule: 'Requires circular to members, deposit repayment reserve (min 20% maturing in year), credit rating, and special resolution.',
    subjectId: 'p2_law'
  },
  {
    id: 'ca_sec_77',
    category: 'Company Law',
    code: 'Section 77',
    title: 'Registration of Charges with ROC',
    keyRule: 'Duty to register within 30 days of creation. Condonation by Registrar up to additional 30 days, or further 60 days on ad-valorem fees.',
    subjectId: 'p2_law'
  },
  {
    id: 'ca_sec_103',
    category: 'Company Law',
    code: 'Section 103',
    title: 'Quorum for General Meetings',
    keyRule: 'Public Co: 5 members if <= 1000; 15 members if 1000 to 5000; 30 members if > 5000 personally present. Private Co: 2 members.',
    subjectId: 'p2_law'
  },
  {
    id: 'ca_sec_138',
    category: 'Company Law',
    code: 'Section 138',
    title: 'Internal Audit',
    keyRule: 'Mandatory for every listed company; unlisted public with turnover >= 200 Cr or deposits >= 25 Cr or loans >= 100 Cr or capital >= 50 Cr; private with turnover >= 200 Cr or loans >= 100 Cr.',
    subjectId: 'p2_law'
  },

  // Income Tax
  {
    id: 'it_sec_6',
    category: 'Income Tax',
    code: 'Section 6(1)',
    title: 'Residential Status of an Individual',
    keyRule: 'Resident if in India >= 182 days in PY, OR >= 60 days in PY and >= 365 days in 4 preceding PYs (subject to Indian crew/citizen abroad relaxation to 120/182 days).',
    subjectId: 'p3_tax'
  },
  {
    id: 'it_sec_115bac',
    category: 'Income Tax',
    code: 'Section 115BAC',
    title: 'Default Concessional Tax Regime',
    keyRule: 'Default tax slab from AY 2024-25. Standard deduction Rs. 75,000 in salary; Family pension deduction Rs. 25,000. Forgoes HRA, 80C, 80D, 24(b) self-occupied interest.',
    subjectId: 'p3_tax'
  },
  {
    id: 'it_sec_40a3',
    category: 'Income Tax',
    code: 'Section 40A(3)',
    title: 'Disallowance of Cash Payments > Rs. 10,000',
    keyRule: 'Payment to a person in a single day exceeding Rs. 10,000 otherwise than by account payee cheque/draft/ECS is 100% disallowed (Rs. 35,000 for goods carriage plying).',
    subjectId: 'p3_tax'
  },
  {
    id: 'it_sec_44ab',
    category: 'Income Tax',
    code: 'Section 44AB',
    title: 'Mandatory Tax Audit Limits',
    keyRule: 'Business turnover > Rs. 1 Crore (enhanced to Rs. 10 Crores if cash receipts & cash payments do not exceed 5%). Profession gross receipts > Rs. 50 Lakhs.',
    subjectId: 'p3_tax'
  },
  {
    id: 'it_sec_54',
    category: 'Income Tax',
    code: 'Section 54',
    title: 'Capital Gain Exemption on Residential House',
    keyRule: 'Transfer of Long-Term Residential House; purchase 1 year before or 2 years after, or construct within 3 years. Exemption capped at Rs. 10 Crores.',
    subjectId: 'p3_tax'
  },
  {
    id: 'it_sec_194c',
    category: 'Income Tax',
    code: 'Section 194C',
    title: 'TDS on Payments to Contractors',
    keyRule: '1% for Individual/HUF contractors, 2% for other contractors. Threshold: Single contract > Rs. 30,000 or aggregate > Rs. 1,00,000 in FY.',
    subjectId: 'p3_tax'
  },
  {
    id: 'it_sec_194j',
    category: 'Income Tax',
    code: 'Section 194J',
    title: 'TDS on Professional & Technical Services',
    keyRule: '10% on professional fees/royalty; 2% for FTS/call center operators. Threshold: Rs. 30,000 per category per annum.',
    subjectId: 'p3_tax'
  },
  {
    id: 'it_sec_50c',
    category: 'Income Tax',
    code: 'Section 50C',
    title: 'Stamp Duty Value as Full Value of Consideration',
    keyRule: 'If Stamp Duty Value (SDV) exceeds 110% of declared consideration of land/building, the SDV is deemed full value of consideration for Capital Gains.',
    subjectId: 'p3_tax'
  },

  // GST
  {
    id: 'gst_sec_16',
    category: 'GST',
    code: 'Section 16(2)',
    title: 'Conditions for Claiming Input Tax Credit (ITC)',
    keyRule: 'Must possess Tax Invoice; tax communicated in GSTR-2B; received goods/services; supplier paid tax to Govt; recipient filed GSTR-3B; payment within 180 days.',
    subjectId: 'p3_tax'
  },
  {
    id: 'gst_sec_17_5',
    category: 'GST',
    code: 'Section 17(5)',
    title: 'Blocked Input Tax Credit',
    keyRule: 'Motor vehicles for seating <= 13 persons (unless in business of supply/training); Food and beverages, outdoor catering, beauty treatment; Goods lost, stolen, or gifted.',
    subjectId: 'p3_tax'
  },
  {
    id: 'gst_sec_9_3',
    category: 'GST',
    code: 'Section 9(3) & 9(4)',
    title: 'Reverse Charge Mechanism (RCM)',
    keyRule: 'Recipient liable to pay GST directly for GTA services (unless forward charge elected), legal services by advocate, sponsorship, director services to company.',
    subjectId: 'p3_tax'
  },
  {
    id: 'gst_sec_12',
    category: 'GST',
    code: 'Section 12 & 13',
    title: 'Time of Supply of Goods & Services',
    keyRule: 'Goods: Date of invoice or last date invoice required to be issued (earliest). Services: Date of invoice or date of payment, whichever earlier.',
    subjectId: 'p3_tax'
  },

  // Standards on Auditing (SA)
  {
    id: 'sa_200',
    category: 'Standards on Auditing (SA)',
    code: 'SA 200',
    title: 'Overall Objectives of the Independent Auditor',
    keyRule: 'Obtain reasonable assurance whether financial statements as a whole are free from material misstatement; conduct audit in accordance with SAs, professional skepticism.',
    subjectId: 'p5_audit'
  },
  {
    id: 'sa_315',
    category: 'Standards on Auditing (SA)',
    code: 'SA 315',
    title: 'Identifying and Assessing the Risks of Material Misstatement',
    keyRule: 'Through understanding the entity and its environment, internal controls, IT environment; assess risk at Financial Statement level and Assertion level.',
    subjectId: 'p5_audit'
  },
  {
    id: 'sa_500',
    category: 'Standards on Auditing (SA)',
    code: 'SA 500',
    title: 'Audit Evidence',
    keyRule: 'Auditor must obtain Sufficient Appropriate Audit Evidence (SAAE). Sufficiency = quantity; Appropriateness = quality (relevance & reliability).',
    subjectId: 'p5_audit'
  },
  {
    id: 'sa_505',
    category: 'Standards on Auditing (SA)',
    code: 'SA 505',
    title: 'External Confirmations',
    keyRule: 'Auditor maintains control over confirmation requests (selecting items, preparing and sending directly to confirming parties, receiving responses).',
    subjectId: 'p5_audit'
  },
  {
    id: 'sa_570',
    category: 'Standards on Auditing (SA)',
    code: 'SA 570',
    title: 'Going Concern Assumption',
    keyRule: 'Evaluate appropriateness of management use of going concern; assess material uncertainty. If adequate disclosure given: Material Uncertainty Related to Going Concern paragraph.',
    subjectId: 'p5_audit'
  },
  {
    id: 'sa_705',
    category: 'Standards on Auditing (SA)',
    code: 'SA 705',
    title: 'Modifications to the Opinion in the Independent Auditor Report',
    keyRule: 'Qualified Opinion: Material but NOT pervasive. Adverse Opinion: Misstatement is Material AND Pervasive. Disclaimer of Opinion: Inability to obtain SAAE is Material AND Pervasive.',
    subjectId: 'p5_audit'
  },
  {
    id: 'sa_701',
    category: 'Standards on Auditing (SA)',
    code: 'SA 701',
    title: 'Communicating Key Audit Matters (KAM)',
    keyRule: 'Mandatory for listed entities. Matters communicated with TCWG that in auditor judgment were of most significance in audit of current period financial statements.',
    subjectId: 'p5_audit'
  },

  // Accounting Standards (AS)
  {
    id: 'as_2',
    category: 'Accounting Standards (AS)',
    code: 'AS 2',
    title: 'Valuation of Inventories',
    keyRule: 'Valued at Lower of Cost or Net Realisable Value (NRV). Cost excludes abnormal waste, storage costs unless necessary, and administrative overheads.',
    subjectId: 'p1_adv_acc'
  },
  {
    id: 'as_10',
    category: 'Accounting Standards (AS)',
    code: 'AS 10',
    title: 'Property, Plant and Equipment (PPE)',
    keyRule: 'Cost includes purchase price, import duties, directly attributable site prep/delivery costs, and initial estimate of dismantling/restoration obligations.',
    subjectId: 'p1_adv_acc'
  },
  {
    id: 'as_16',
    category: 'Accounting Standards (AS)',
    code: 'AS 16',
    title: 'Borrowing Costs',
    keyRule: 'Capitalise borrowing costs directly attributable to acquisition, construction or production of Qualifying Asset (takes substantial period to get ready for intended use).',
    subjectId: 'p1_adv_acc'
  },
  {
    id: 'as_14',
    category: 'Accounting Standards (AS)',
    code: 'AS 14',
    title: 'Accounting for Amalgamations',
    keyRule: 'Amalgamation in nature of Merger (Pooling of Interests method) vs Amalgamation in nature of Purchase (Purchase method). Differences go to General Reserve or Goodwill/Capital Reserve.',
    subjectId: 'p1_adv_acc'
  },
  {
    id: 'as_20',
    category: 'Accounting Standards (AS)',
    code: 'AS 20',
    title: 'Earnings Per Share (EPS)',
    keyRule: 'Basic EPS = Net Profit attributable to Equity Shareholders / Weighted Average Number of Equity Shares. Diluted EPS adjusts for potential dilutive equity shares.',
    subjectId: 'p1_adv_acc'
  },
  {
    id: 'as_29',
    category: 'Accounting Standards (AS)',
    code: 'AS 29',
    title: 'Provisions, Contingent Liabilities & Contingent Assets',
    keyRule: 'Provision recognized when present obligation from past event, probable outflow (>50%), and reliable estimate. Contingent liability disclosed in notes unless remote.',
    subjectId: 'p1_adv_acc'
  }
];
