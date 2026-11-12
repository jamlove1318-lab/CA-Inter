export interface BeginnerCheckpoint {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctId: string;
  explanation: string;
}

export interface BeginnerGuideSubject {
  subjectId: string;
  paperCode: string;
  title: string;
  emoji: string;
  color: string;
  tagline: string;
  whatIsIt: string;
  realWorldAnalogy: string;
  corePillars: {
    title: string;
    description: string;
    keyRule: string;
  }[];
  jargonBuster: {
    term: string;
    meaning: string;
  }[];
  goldenRules: string[];
  checkpoints: BeginnerCheckpoint[];
}

export const BEGINNER_GUIDES_DATA: BeginnerGuideSubject[] = [
  {
    subjectId: 'p1_adv_acc',
    paperCode: 'P-1',
    title: 'Advanced Accounting',
    emoji: '🧮',
    color: 'from-blue-600 to-indigo-700',
    tagline: 'Master Accounting Standards, Schedule III & Corporate Restructuring from absolute scratch.',
    whatIsIt: 'In CA Foundation, you learned basic bookkeeping (Debit/Credit, Trial Balance, Sole Proprietor accounts). In CA Intermediate Paper 1, you step into the corporate world: how companies report their accounts under ICAI Accounting Standards (AS) and the Companies Act 2013 (Schedule III).',
    realWorldAnalogy: 'Think of Accounting Standards as the "Grammar Rules of Business". If every company wrote their financial reports using their own invented rules, investors could never compare Apple and Microsoft, or Reliance and Tata. Standards force everyone to speak the exact same financial language.',
    corePillars: [
      {
        title: 'Pillar 1: Accounting Standards (AS Framework)',
        description: 'ICAI issues mandatory rules for specific topics: AS 2 (Inventory), AS 10 (Property, Plant & Equipment), AS 16 (Borrowing Costs), AS 19 (Leases), AS 20 (Earnings Per Share), and AS 22 (Taxes on Income).',
        keyRule: 'Always start AS questions by quoting the Standard number, its principle, and whether the company followed it.'
      },
      {
        title: 'Pillar 2: Schedule III Financial Statements',
        description: 'Companies cannot make the old T-shaped Profit & Loss or Balance Sheet. They must use the modern vertical format: Equity & Liabilities at the top, followed by Assets at the bottom.',
        keyRule: 'Assets = Equity + Non-Current Liabilities + Current Liabilities. Both sides must balance precisely!'
      },
      {
        title: 'Pillar 3: Corporate Restructuring (Buyback & Amalgamation)',
        description: 'When companies buy back their own shares (Sec 68), merge together (AS 14 Amalgamation), or restructure sick companies (Internal Reconstruction with a Capital Reduction Account).',
        keyRule: 'In Internal Reconstruction, sacrifices by shareholders/lenders credit the Capital Reduction Account to wipe out accumulated losses.'
      }
    ],
    jargonBuster: [
      { term: 'Accounting Standard (AS)', meaning: 'Authoritative rules issued by ICAI on how to recognize, measure, and disclose financial transactions.' },
      { term: 'Schedule III', meaning: 'The mandatory statutory format under the Companies Act 2013 for presenting company Balance Sheets and P&L.' },
      { term: 'Qualifying Asset (AS 16)', meaning: 'An asset that necessarily takes a substantial period of time (ordinarily 12+ months) to get ready for its intended use or sale.' },
      { term: 'NRV (Net Realisable Value)', meaning: 'Estimated selling price minus any estimated completion or selling expenses (AS 2).' }
    ],
    goldenRules: [
      'Golden Rule 1: AS 2 Inventory is valued at the LOWER of Cost or Net Realisable Value (NRV). Never at market price if it exceeds cost!',
      'Golden Rule 2: AS 16 allows interest on loans to be added to asset cost ONLY during active construction, not during abnormal flood/strike halts.',
      'Golden Rule 3: Abnormal spoilage or idle labor waste is NEVER added to inventory cost; it goes directly to the P&L account as a loss.',
      'Golden Rule 4: Buyback under Sec 68 is capped at 10% of (Paid-up Capital + Free Reserves + Securities Premium) by Board Resolution, or 25% by Special Resolution.',
      'Golden Rule 5: Always prepare clear Working Notes. ICAI awards up to 30% marks for Working Notes even if your final answer has arithmetic errors.'
    ],
    checkpoints: [
      {
        id: 'acc_chk_1',
        question: 'Under AS 2, if inventory cost is ₹ 1,00,000 and estimated Net Realisable Value is ₹ 85,000, what value should be shown in the Balance Sheet?',
        options: [
          { id: 'a', text: '₹ 85,000 (Lower of Cost or NRV)' },
          { id: 'b', text: '₹ 1,00,000 (Historical Cost)' },
          { id: 'c', text: '₹ 1,85,000 (Sum of both)' },
          { id: 'd', text: '₹ 92,500 (Average)' }
        ],
        correctId: 'a',
        explanation: 'Correct! AS 2 mandates valuation at the lower of Cost and Net Realisable Value. Prudence requires recognizing the ₹ 15,000 write-down immediately.'
      },
      {
        id: 'acc_chk_2',
        question: 'What is a "Qualifying Asset" under AS 16 Borrowing Costs?',
        options: [
          { id: 'a', text: 'Any asset purchased for cash in 1 day' },
          { id: 'b', text: 'An asset that necessarily takes a substantial period of time to get ready for its intended use or sale' },
          { id: 'c', text: 'Any listed company equity share' },
          { id: 'd', text: 'Inventory meant for immediate daily retail sale' }
        ],
        correctId: 'b',
        explanation: 'Spot on! AS 16 defines a qualifying asset as one requiring a substantial period (ordinarily 12+ months) to construct, such as a factory plant or building.'
      }
    ]
  },
  {
    subjectId: 'p2_law',
    paperCode: 'P-2',
    title: 'Corporate & Other Laws',
    emoji: '⚖️',
    color: 'from-amber-600 to-rose-700',
    tagline: 'Understand the Companies Act 2013, Meetings, CSR, and Business Regulations without legal overwhelm.',
    whatIsIt: 'This paper teaches you the legal framework governing companies in India (Companies Act 2013 Sections 1 to 148), along with the Limited Liability Partnership (LLP) Act, the Foreign Exchange Management Act (FEMA), and the General Clauses Act.',
    realWorldAnalogy: 'Think of Company Law as the "Rulebook of a Football Match". The Shareholders are the fans who own the club; the Directors are the team captains and coach who run the match; the Companies Act is the referee ensuring fair play, protecting minority fans, and preventing fraud.',
    corePillars: [
      {
        title: 'Pillar 1: Incorporation & Capital (Sec 1 to 72)',
        description: 'How a company is born (ROC registration), how it issues shares (Prospectus, Private Placement, Bonus Shares, Rights Issue), and the difference between Equity and Preference shares.',
        keyRule: 'A company is an artificial legal person with perpetual succession, separate from its shareholders (Salomon v. Salomon doctrine).'
      },
      {
        title: 'Pillar 2: Management & Meetings (Sec 88 to 122)',
        description: 'Annual General Meetings (AGM), Extra-Ordinary General Meetings (EGM), Notice requirements (21 clear days), Quorum rules, and voting procedures (Show of hands, Poll, Postal ballot).',
        keyRule: 'For public company AGMs, statutory quorum depends on member count: <=1000: 5 members; 1001-5000: 15 members; >5000: 30 members personally present.'
      },
      {
        title: 'Pillar 3: CSR & Accounts of Companies (Sec 128 to 137)',
        description: 'Books of accounts must be kept on accrual basis for 8 years. Corporate Social Responsibility (CSR Sec 135) mandates companies with Net Profit >= 5 Cr (or Turnover >= 1000 Cr / Net Worth >= 500 Cr) to spend 2% of average net profits on social causes.',
        keyRule: 'Unspent ongoing CSR funds must be moved to an "Unspent CSR Account" within 30 days of financial year end.'
      }
    ],
    jargonBuster: [
      { term: 'Ordinary Resolution (OR)', meaning: 'Passed when votes cast in favor exceed votes cast against (> 50%).' },
      { term: 'Special Resolution (SR)', meaning: 'Passed when votes cast in favor are at least 3 times the votes cast against (>= 75%).' },
      { term: 'Quorum', meaning: 'The minimum number of members legally required to be personally present to conduct a valid meeting.' },
      { term: 'ROC (Registrar of Companies)', meaning: 'The government office under the Ministry of Corporate Affairs (MCA) where company records and filings are registered.' }
    ],
    goldenRules: [
      'Golden Rule 1: Notice of General Meeting requires 21 CLEAR days (exclude day of sending and day of meeting + 48 hours for post).',
      'Golden Rule 2: Shorter notice for an AGM requires consent of not less than 95% of members entitled to vote thereat.',
      'Golden Rule 3: For public company quorum under Sec 103: proxies are NOT counted; members must be personally present.',
      'Golden Rule 4: Dividend must be deposited in a scheduled bank within 5 days of declaration, and paid within 30 days.',
      'Golden Rule 5: State the Law first ("As per Section..."), apply it to the facts given, and end with a crisp final conclusion.'
    ],
    checkpoints: [
      {
        id: 'law_chk_1',
        question: 'Under Section 103 of Companies Act 2013, what is the quorum for an AGM of a public company having 6,000 members?',
        options: [
          { id: 'a', text: '30 members personally present' },
          { id: 'b', text: '5 members personally present' },
          { id: 'c', text: '15 members personally present' },
          { id: 'd', text: '50 members including proxies' }
        ],
        correctId: 'a',
        explanation: 'Correct! When member count exceeds 5,000 in a public company, the statutory quorum is 30 members personally present.'
      },
      {
        id: 'law_chk_2',
        question: 'What percentage of 3-year average net profit must a qualifying company spend on CSR under Section 135?',
        options: [
          { id: 'a', text: '2%' },
          { id: 'b', text: '5%' },
          { id: 'c', text: '1%' },
          { id: 'd', text: '10%' }
        ],
        correctId: 'a',
        explanation: 'Exactly! Section 135(5) requires spending at least 2% of the average net profits made during the 3 immediately preceding financial years.'
      }
    ]
  },
  {
    subjectId: 'p3_tax',
    paperCode: 'P-3',
    title: 'Taxation (Direct Tax & GST)',
    emoji: '🧾',
    color: 'from-emerald-600 to-teal-800',
    tagline: 'Learn how Income Tax and GST work in the Indian economy from fundamentals to exam mastery.',
    whatIsIt: 'Taxation is split into two halves: Direct Tax (Income Tax Act 1961 - 50 Marks) where you calculate tax on personal and business income; and Indirect Tax (GST - 50 Marks) where you learn how Goods and Services Tax is levied across the supply chain.',
    realWorldAnalogy: 'Think of Income Tax as "Paying toll based on how much treasure you collected this year", while GST is "Paying a small toll at each stage of a factory pipeline, but getting a refund for tolls paid earlier (Input Tax Credit)".',
    corePillars: [
      {
        title: 'Pillar 1: Previous Year (PY) vs Assessment Year (AY)',
        description: 'The year in which you earn money is the Previous Year (e.g. FY 2023-24). The following year in which your income is evaluated and taxed is the Assessment Year (AY 2024-25).',
        keyRule: 'You earn in the PY, and pay tax assessed in the AY.'
      },
      {
        title: 'Pillar 2: The 5 Heads of Income',
        description: 'All taxable earnings fit into 5 buckets: 1. Salaries; 2. House Property (rental value); 3. PGBP (Business & Profession profit); 4. Capital Gains (selling property, shares); 5. Income from Other Sources (interest, dividend, lottery).',
        keyRule: 'Gross Total Income (GTI) = Sum of all 5 Heads. Total Income = GTI minus Chapter VI-A deductions.'
      },
      {
        title: 'Pillar 3: GST Mechanics & Input Tax Credit (ITC)',
        description: 'GST is a destination-based consumption tax. Intra-state supply (within same state) attracts CGST + SGST. Inter-state supply (between two states) attracts IGST. A registered business pays tax only on the value added because it claims ITC on purchases.',
        keyRule: 'Under Section 17(5), ITC is blocked on motor vehicles for passenger transport with capacity <= 13 seats.'
      }
    ],
    jargonBuster: [
      { term: 'Section 115BAC', meaning: 'The default concessional income tax regime for individuals with lower tax slabs but no traditional deductions (like 80C, 80D).' },
      { term: 'Standard Deduction (Sec 16(ia))', meaning: 'A flat deduction allowable from salary income (available under both old and new default tax regimes).' },
      { term: 'Reverse Charge Mechanism (RCM)', meaning: 'A GST mechanism where the buyer/recipient of goods/services is legally liable to pay GST instead of the seller.' },
      { term: 'Input Tax Credit (ITC)', meaning: 'The credit of GST paid on purchases of goods/services that can be set off against GST liability on sales.' }
    ],
    goldenRules: [
      'Golden Rule 1: Always check whether the question specifies the Default Tax Regime (Sec 115BAC) or the Old Optional Regime.',
      'Golden Rule 2: In Salary, Standard Deduction under Section 16(ia) is available under Section 115BAC as well.',
      'Golden Rule 3: For residential status under Sec 6(1): Resident if in India >= 182 days in the PY, or (60 days in PY + 365 days in 4 preceding years).',
      'Golden Rule 4: In GST, intra-state = CGST + SGST (split 50:50). Inter-state = full IGST.',
      'Golden Rule 5: Always calculate taxable income under each Head separately and show computation steps clearly.'
    ],
    checkpoints: [
      {
        id: 'tax_chk_1',
        question: 'Under the default new tax regime under Section 115BAC, which of the following deductions is permissible to a salaried employee?',
        options: [
          { id: 'a', text: 'Standard Deduction under Section 16(ia)' },
          { id: 'b', text: 'Deduction for PPF under Section 80C' },
          { id: 'c', text: 'Mediclaim insurance under Section 80D' },
          { id: 'd', text: 'House Rent Allowance (HRA) exemption' }
        ],
        correctId: 'a',
        explanation: 'Correct! From AY 2024-25, Standard Deduction under Section 16(ia) is specifically allowable under Section 115BAC default regime.'
      },
      {
        id: 'tax_chk_2',
        question: 'When a supplier in Mumbai (Maharashtra) sells goods to a buyer in Pune (Maharashtra), which GST is charged?',
        options: [
          { id: 'a', text: 'CGST and SGST (Intra-state)' },
          { id: 'b', text: 'IGST only' },
          { id: 'c', text: 'Customs Duty' },
          { id: 'd', text: 'No GST is charged within the same state' }
        ],
        correctId: 'a',
        explanation: 'Bingo! Supplies within the same state are Intra-State supplies, attracting both Central GST (CGST) and State GST (SGST) in equal proportion.'
      }
    ]
  },
  {
    subjectId: 'p4_costing',
    paperCode: 'P-4',
    title: 'Cost & Management Accounting',
    emoji: '📊',
    color: 'from-indigo-600 to-blue-800',
    tagline: 'Understand how products are priced, costs are controlled, and management decisions are made.',
    whatIsIt: 'While financial accountants report historical profits to external tax authorities and shareholders, cost accountants help factory managers calculate the exact cost to produce one unit, eliminate waste, and make decisions like pricing and make-or-buy.',
    realWorldAnalogy: 'Think of running a coffee stall. If your shop rent is ₹ 10,000/month (Fixed Cost) and milk/coffee beans cost ₹ 20 per cup (Variable Cost), selling at ₹ 50 per cup leaves ₹ 30 per cup (Contribution). You need to sell 334 cups just to pay the rent (Break-Even Point). Every cup after that is pure profit!',
    corePillars: [
      {
        title: 'Pillar 1: Cost Classifications & Cost Sheet',
        description: 'Direct Material + Direct Labour + Direct Expenses = Prime Cost. Adding Factory Overheads gives Factory Cost. Adding Office & Selling Overheads gives Total Cost of Sales.',
        keyRule: 'Direct costs trace directly to the product. Indirect costs (overheads) must be absorbed or allocated.'
      },
      {
        title: 'Pillar 2: Marginal Costing & Decision Making',
        description: 'Separating costs into Fixed and Variable. Contribution = Sales - Variable Cost. Profit = Contribution - Fixed Cost. Used for decisions like accepting special export orders and key limiting factors.',
        keyRule: 'Fixed costs are sunk in the short term. Any order offering a price higher than incremental variable cost increases total profit.'
      },
      {
        title: 'Pillar 3: Standard Costing & Variances',
        description: 'Comparing predetermined benchmark costs (Standard) with actual costs to spot inefficiencies. Material Cost Variance = Price Variance + Usage Variance. Labor Cost Variance = Rate Variance + Efficiency Variance.',
        keyRule: 'Variance = Standard Cost - Actual Cost. Positive is Favourable (F); Negative is Adverse (A).'
      }
    ],
    jargonBuster: [
      { term: 'Break-Even Point (BEP)', meaning: 'The sales volume (in units or value) at which total revenue equals total cost, resulting in zero profit and zero loss.' },
      { term: 'Contribution', meaning: 'The surplus generated from sales after deducting all variable costs (Sales - Variable Cost = Fixed Cost + Profit).' },
      { term: 'P/V Ratio (Profit Volume Ratio)', meaning: 'The ratio of contribution to sales: (Contribution / Sales) × 100.' },
      { term: 'Margin of Safety (MOS)', meaning: 'The excess of actual sales over break-even sales: Actual Sales - Break-Even Sales.' }
    ],
    goldenRules: [
      'Golden Rule 1: Break-Even Point (in units) = Fixed Cost / Contribution per unit.',
      'Golden Rule 2: Break-Even Point (in value) = Fixed Cost / P/V Ratio.',
      'Golden Rule 3: Margin of Safety = Actual Sales - Break Even Sales, or Profit / P/V Ratio.',
      'Golden Rule 4: P/V Ratio is also equal to: (Change in Profit / Change in Sales) × 100.',
      'Golden Rule 5: Pure financial charges (like interest on debentures, income tax, dividends) are NEVER included in a Cost Sheet.'
    ],
    checkpoints: [
      {
        id: 'cost_chk_1',
        question: 'If Selling Price is ₹ 100, Variable Cost is ₹ 60, and Fixed Cost is ₹ 2,00,000, what is the Break-Even Point in units?',
        options: [
          { id: 'a', text: '5,000 units (₹ 2,00,000 / ₹ 40)' },
          { id: 'b', text: '2,000 units' },
          { id: 'c', text: '3,333 units' },
          { id: 'd', text: '10,000 units' }
        ],
        correctId: 'a',
        explanation: 'Spot on! Contribution per unit = ₹ 100 - ₹ 60 = ₹ 40. BEP (units) = Fixed Cost / Contribution = 2,00,000 / 40 = 5,000 units.'
      },
      {
        id: 'cost_chk_2',
        question: 'Which of the following items is strictly EXCLUDED from the Cost Sheet?',
        options: [
          { id: 'a', text: 'Debenture Interest and Income Tax' },
          { id: 'b', text: 'Direct Factory Wages' },
          { id: 'c', text: 'Factory Electricity' },
          { id: 'd', text: 'Raw Material Freight' }
        ],
        correctId: 'a',
        explanation: 'Correct! Pure financial items like debenture interest, dividends, and income tax are appropriations of profit and never part of product cost.'
      }
    ]
  },
  {
    subjectId: 'p5_audit',
    paperCode: 'P-5',
    title: 'Auditing and Ethics',
    emoji: '🛡️',
    color: 'from-cyan-600 to-teal-800',
    tagline: 'Learn the auditor’s role as an independent watchdog, verifying financial truth with professional skepticism.',
    whatIsIt: 'Auditing is the independent examination of financial statements by a qualified Chartered Accountant to express an opinion on whether they reflect a "True and Fair View" in accordance with the law and accounting standards.',
    realWorldAnalogy: 'Think of an Auditor as an "Independent Food Safety Inspector". The chef (company management) cooked the dish (financial statements). The inspector does not cook the food, but tests samples, checks the kitchen hygiene, and issues a certificate so customers can eat with confidence.',
    corePillars: [
      {
        title: 'Pillar 1: Professional Skepticism & Independence',
        description: 'An auditor must maintain an attitude of professional skepticism: being alert to conditions that may indicate possible misstatement due to error or fraud, and critically questioning audit evidence.',
        keyRule: 'The auditor is a watchdog, not a bloodhound (Kingston Cotton Mill case), but cannot turn a blind eye to red flags.'
      },
      {
        title: 'Pillar 2: Standards on Auditing (SA Series)',
        description: 'Mandatory standards issued by ICAI: SA 200 (Overall Objectives), SA 210 (Agreed Terms), SA 500 (Audit Evidence), SA 501 (Inventory Verification), SA 505 (External Confirmations), SA 700/705 (Audit Opinions).',
        keyRule: 'Audit evidence must be SUFFICIENT (quantity) and APPROPRIATE (quality: relevance & reliability).'
      },
      {
        title: 'Pillar 3: The 4 Types of Audit Opinions (SA 700/705)',
        description: '1. Unmodified (Clean): Financial statements give true and fair view. 2. Qualified ("Except for"): Material but not pervasive. 3. Adverse: Material AND pervasive misstatement. 4. Disclaimer: Unable to obtain evidence and effect is material and pervasive.',
        keyRule: 'Pervasive means misstatements affect substantially the whole financial statements, not just an isolated item.'
      }
    ],
    jargonBuster: [
      { term: 'True and Fair View', meaning: 'The financial statements are free from material misstatements and accurately reflect the company financial reality.' },
      { term: 'Materiality (SA 320)', meaning: 'Misstatements are material if they could reasonably be expected to influence economic decisions of users.' },
      { term: 'SQC 1 (Quality Control)', meaning: 'Requires audit firms to retain audit documentation (working paper files) for a minimum of 7 years.' },
      { term: 'TCWG', meaning: 'Those Charged With Governance (e.g. Board of Directors / Audit Committee).' }
    ],
    goldenRules: [
      'Golden Rule 1: External audit evidence (from independent 3rd parties like bank statements or debtor letters) is more reliable than internal evidence.',
      'Golden Rule 2: Oral representations from management alone are never a substitute for sufficient appropriate audit evidence.',
      'Golden Rule 3: If management refuses permission to send external debtor confirmation, investigate reasons first under SA 505 before modifying opinion.',
      'Golden Rule 4: Retention period of audit working papers under SQC 1 is 7 years (Companies Act requires 8 years for company books).',
      'Golden Rule 5: State the Standard on Auditing (SA) number in the first line of your answer to secure maximum marks.'
    ],
    checkpoints: [
      {
        id: 'aud_chk_1',
        question: 'When the auditor has obtained sufficient evidence that misstatements are BOTH material and pervasive, which opinion is issued under SA 705?',
        options: [
          { id: 'a', text: 'Adverse Opinion' },
          { id: 'b', text: 'Qualified Opinion' },
          { id: 'c', text: 'Disclaimer of Opinion' },
          { id: 'd', text: 'Unmodified Opinion' }
        ],
        correctId: 'a',
        explanation: 'Correct! When evidence IS obtained and misstatements are both material and pervasive, an Adverse Opinion is issued.'
      },
      {
        id: 'aud_chk_2',
        question: 'As per SQC 1, what is the minimum retention period for audit documentation working papers?',
        options: [
          { id: 'a', text: '7 years from the date of the audit report' },
          { id: 'b', text: '3 years' },
          { id: 'c', text: '5 years' },
          { id: 'd', text: '10 years' }
        ],
        correctId: 'a',
        explanation: 'Spot on! SQC 1 mandates retaining audit documentation for no shorter than seven years from the date of the auditor’s report.'
      }
    ]
  },
  {
    subjectId: 'p6_fm_sm',
    paperCode: 'P-6',
    title: 'Financial Management & Strategic Management',
    emoji: '📈',
    color: 'from-purple-600 to-indigo-900',
    tagline: 'Master corporate financing decisions, capital budgeting, and strategic growth matrices.',
    whatIsIt: 'Paper 6 combines the financial engine of a business with its long-term strategic brain: Financial Management (50 Marks) focuses on raising and investing capital to maximize shareholder wealth; Strategic Management (50 Marks) focuses on competitive advantage and growth.',
    realWorldAnalogy: 'Think of FM as "The Fuel & Engine of an Airplane" (making sure you have enough cash to fly without running out or paying too much for fuel). Think of SM as "The Flight Navigation & Destination" (choosing which route to fly to beat rival airlines and avoid storms).',
    corePillars: [
      {
        title: 'Pillar 1: Time Value of Money & Capital Budgeting',
        description: 'Money received today is worth more than money received in the future due to inflation, risk, and earning capacity. Capital budgeting techniques (NPV, IRR, Payback) help choose long-term projects.',
        keyRule: 'Net Present Value (NPV) = Present Value of Cash Inflows - Initial Investment. Accept projects where NPV > 0!'
      },
      {
        title: 'Pillar 2: Leverages (Operating & Financial)',
        description: 'Operating Leverage (DOL) measures the presence of fixed operating costs. Financial Leverage (DFL) measures the presence of fixed interest charges on debt.',
        keyRule: 'Degree of Combined Leverage (DCL) = DOL × DFL = (% change in EPS) / (% change in Sales).'
      },
      {
        title: 'Pillar 3: Strategic Tools (SWOT & Ansoff Matrix)',
        description: 'Strategic Management tools: SWOT (internal Strengths/Weaknesses vs external Opportunities/Threats), Porter 5 Forces, and the Ansoff Matrix (Market Penetration, Market Development, Product Development, Diversification).',
        keyRule: 'Market Development = Selling existing products in NEW markets. Diversification = NEW products in NEW markets.'
      }
    ],
    jargonBuster: [
      { term: 'WACC (Weighted Average Cost of Capital)', meaning: 'The average rate of return a company must pay to all its security holders (debt, preference, equity).' },
      { term: 'EBIT-EPS Analysis', meaning: 'Analyzing how different capital structures (debt vs equity) impact earnings per share at various operating profit levels.' },
      { term: 'Core Competence', meaning: 'A unique collective learning or capability in an organization that provides a sustainable competitive edge (Prahalad & Hamel 1990).' },
      { term: 'Value Chain (Michael Porter)', meaning: 'The series of internal business activities (inbound logistics, operations, marketing, service) that create customer value.' }
    ],
    goldenRules: [
      'Golden Rule 1: DCL is the product of DOL and DFL ($DCL = DOL \times DFL$), never the sum!',
      'Golden Rule 2: DFL = EBIT / (EBIT - Interest - Preference Dividend/(1-t)).',
      'Golden Rule 3: In Capital Budgeting, depreciation is a non-cash expense; add back depreciation to profit after tax to find Cash Flow After Tax (CFAT).',
      'Golden Rule 4: In Ansoff Matrix: Existing Product + Existing Market = Market Penetration; Existing Product + New Market = Market Development.',
      'Golden Rule 5: Always state the business objective: FM aims for Shareholder Wealth Maximization (not just profit maximization).'
    ],
    checkpoints: [
      {
        id: 'fm_chk_1',
        question: 'If a company has DOL = 2.0 and DFL = 1.5, what is the Degree of Combined Leverage (DCL)?',
        options: [
          { id: 'a', text: '3.0 (2.0 × 1.5)' },
          { id: 'b', text: '3.5' },
          { id: 'c', text: '0.5' },
          { id: 'd', text: '2.5' }
        ],
        correctId: 'a',
        explanation: 'Correct! Degree of Combined Leverage is the product of Operating Leverage and Financial Leverage: 2.0 × 1.5 = 3.0.'
      },
      {
        id: 'fm_chk_2',
        question: 'According to the Ansoff Matrix, introducing an existing product into a brand new geographic country is called:',
        options: [
          { id: 'a', text: 'Market Development' },
          { id: 'b', text: 'Market Penetration' },
          { id: 'c', text: 'Product Development' },
          { id: 'd', text: 'Diversification' }
        ],
        correctId: 'a',
        explanation: 'Spot on! Selling existing products in new geographic or demographic markets is Market Development.'
      }
    ]
  }
];
