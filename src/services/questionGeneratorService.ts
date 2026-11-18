import { DescriptiveQuestion, McqQuestion, CaseStudyQuestion } from '../types/question';
import { shuffleMcqOptions } from '../utils/mcqUtils';

export class QuestionGeneratorService {
  /**
   * Helper: Builds an MCQ and immediately shuffles options randomly,
   * guaranteeing that correct answers are evenly distributed among A, B, C, and D.
   */
  private static buildShuffledMcq(
    qBase: Omit<McqQuestion, 'options' | 'correctOptionId'>,
    correctText: string,
    distractors: string[]
  ): McqQuestion {
    const rawOptions = [
      { id: 'correct', text: correctText },
      ...distractors.slice(0, 3).map((text, idx) => ({ id: `wrong_${idx}`, text }))
    ];

    const unshuffledQuestion: McqQuestion = {
      ...qBase,
      options: rawOptions,
      correctOptionId: 'correct'
    };

    return shuffleMcqOptions(unshuffledQuestion);
  }

  /**
   * Generates an infinite stream of brand-new, high-quality ICAI MCQs across the ENTIRE syllabus.
   * Supports 'beginner' (foundation/scratch concepts), 'intermediate' (standard ICAI), and 'hard' (examiner favorites/traps).
   */
  public static generateDynamicMcq(
    subjectId?: string,
    tier?: 'beginner' | 'intermediate' | 'hard'
  ): McqQuestion {
    const subjects = ['p1_adv_acc', 'p2_law', 'p3_tax', 'p4_costing', 'p5_audit', 'p6_fm_sm'];
    const chosenSubject = subjectId && subjectId !== 'all' ? subjectId : subjects[Math.floor(Math.random() * subjects.length)];

    if (tier === 'beginner') {
      switch (chosenSubject) {
        case 'p1_adv_acc': return this.generateAccountsBeginnerMcq();
        case 'p2_law': return this.generateLawBeginnerMcq();
        case 'p3_tax': return this.generateTaxBeginnerMcq();
        case 'p4_costing': return this.generateCostingBeginnerMcq();
        case 'p5_audit': return this.generateAuditBeginnerMcq();
        case 'p6_fm_sm':
        default: return this.generateFmSmBeginnerMcq();
      }
    }

    switch (chosenSubject) {
      case 'p1_adv_acc':
        return this.generateAccountsMcq();
      case 'p2_law':
        return this.generateLawMcq();
      case 'p3_tax':
        return this.generateTaxMcq();
      case 'p4_costing':
        return this.generateCostingMcq();
      case 'p5_audit':
        return this.generateAuditMcq();
      case 'p6_fm_sm':
      default:
        return this.generateFmSmMcq();
    }
  }

  // =========================================================================
  // PAPER 1: ADVANCED ACCOUNTING (WHOLE SYLLABUS)
  // =========================================================================
  private static generateAccountsMcq(): McqQuestion {
    const generators = [
      this.generateAccountsAs16,
      this.generateAccountsAs2,
      this.generateAccountsAs10,
      this.generateAccountsAs19,
      this.generateAccountsAs20,
      this.generateAccountsBuyback,
      this.generateAccountsInternalRecon,
      this.generateAccountsAmalgamation,
      this.generateAccountsBranch,
      this.generateAccountsAs12
    ];
    const pick = generators[Math.floor(Math.random() * generators.length)];
    return pick();
  }

  // AS 16 Borrowing Costs
  private static generateAccountsAs16(): McqQuestion {
    const loanLakhs = [40, 50, 60, 80, 100][Math.floor(Math.random() * 5)];
    const rate = [9, 10, 11, 12][Math.floor(Math.random() * 4)];
    const activeMonths = [6, 7, 8, 9][Math.floor(Math.random() * 4)];
    const suspendedMonths = [1, 2, 3][Math.floor(Math.random() * 3)];
    const tempIncome = [20000, 30000, 45000, 50000][Math.floor(Math.random() * 4)];

    const activeInterest = Math.round((loanLakhs * 100000 * (rate / 100) * (activeMonths / 12)));
    const netCapitalized = activeInterest - tempIncome;
    const wrongFullInterest = Math.round((loanLakhs * 100000 * (rate / 100) * ((activeMonths + suspendedMonths) / 12)));

    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_acc_as16_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p1_adv_acc',
        chapterId: 'as_ppe_dep',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (AS 16 Borrowing Costs)`,
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'AS 16 Borrowing Costs - Para 6, 14 & 17',
        questionText: `An entity obtained a specific bank borrowing of ₹ ${loanLakhs} Lakhs at ${rate}% p.a. for construction of a qualifying asset. Construction was active for ${activeMonths} months during the financial year, but an abnormal flood halt occurred for ${suspendedMonths} months during which development was suspended. Prior to deployment, temporary placement of funds in bank deposits generated interest income of ₹ ${tempIncome.toLocaleString('en-IN')}. What is the exact borrowing cost to be capitalized as per AS 16?`,
        trapNote: 'AS 16 mandates that capitalization of borrowing costs must be suspended during extended periods of abnormal stoppage. Temporary investment income must also be deducted.',
        explanation: `Under AS 16, interest during the ${suspendedMonths} months of abnormal stoppage is charged directly to Statement of Profit & Loss. Active interest = ₹ ${loanLakhs}L × ${rate}% × (${activeMonths}/12) = ₹ ${activeInterest.toLocaleString('en-IN')}. Less temporary interest income of ₹ ${tempIncome.toLocaleString('en-IN')} = Net capitalizable borrowing cost of ₹ ${netCapitalized.toLocaleString('en-IN')}.`
      },
      `₹ ${netCapitalized.toLocaleString('en-IN')} (Capitalized for ${activeMonths} active months less temporary income)`,
      [
        `₹ ${wrongFullInterest.toLocaleString('en-IN')} (Gross interest for all ${activeMonths + suspendedMonths} months without suspension)`,
        `₹ ${activeInterest.toLocaleString('en-IN')} (Active period interest without deducting temporary income)`,
        `NIL (AS 16 requires entire interest to be expensed to Profit and Loss)`
      ]
    );
  }

  // AS 2 Valuation of Inventories
  private static generateAccountsAs2(): McqQuestion {
    const cost = [5000, 8000, 10000, 12000][Math.floor(Math.random() * 4)];
    const sellingPrice = cost - [400, 600, 800][Math.floor(Math.random() * 3)];
    const sellingExpenses = [100, 150, 200][Math.floor(Math.random() * 3)];
    const nrv = sellingPrice - sellingExpenses;
    const writeDownPerUnit = cost - nrv;
    const units = [1000, 2000, 5000][Math.floor(Math.random() * 3)];
    const totalWriteDown = writeDownPerUnit * units;

    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_acc_as2_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p1_adv_acc',
        chapterId: 'as_revenue_inv',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (AS 2 Valuation of Inventories)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'AS 2 Valuation of Inventories - Para 5 & 13',
        questionText: `An enterprise holds ${units.toLocaleString('en-IN')} units of finished goods at a cost of ₹ ${cost.toLocaleString('en-IN')} each. Due to market changes, the estimated selling price is ₹ ${sellingPrice.toLocaleString('en-IN')} each, with estimated selling costs of ₹ ${sellingExpenses.toLocaleString('en-IN')} per unit. As per AS 2, what should be the inventory valuation and write-down in Profit & Loss?`,
        trapNote: 'NRV is Estimated Selling Price LESS Estimated Costs necessary to make the sale. Never ignore selling expenses when computing NRV.',
        explanation: `Under AS 2, inventories must be valued at Lower of Cost (₹ ${cost}) or NRV (₹ ${sellingPrice} - ₹ ${sellingExpenses} = ₹ ${nrv}). Since NRV is lower, inventory is valued at ₹ ${nrv} per unit, and write-down loss of ₹ ${totalWriteDown.toLocaleString('en-IN')} is recognized in P&L.`
      },
      `Value at NRV ₹ ${nrv.toLocaleString('en-IN')} per unit; Write-down of ₹ ${totalWriteDown.toLocaleString('en-IN')} charged to P&L`,
      [
        `Value at Cost ₹ ${cost.toLocaleString('en-IN')} per unit with NIL write-down`,
        `Value at Gross Selling Price ₹ ${sellingPrice.toLocaleString('en-IN')} per unit ignoring selling expenses`,
        `Value at Average of Cost and Selling Price`
      ]
    );
  }

  // AS 10 Property, Plant and Equipment
  private static generateAccountsAs10(): McqQuestion {
    const cost = [5000000, 8000000, 10000000][Math.floor(Math.random() * 3)];
    const inspectionCost = [400000, 600000, 800000][Math.floor(Math.random() * 3)];

    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_acc_as10_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p1_adv_acc',
        chapterId: 'as_ppe_dep',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (AS 10 Major Overhauls & Inspection)`,
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'AS 10 (Revised) Property, Plant and Equipment - Para 14',
        questionText: `A shipping company incurs ₹ ${inspectionCost.toLocaleString('en-IN')} on a major safety inspection of an ocean liner necessary for continuing operations. The inspection satisfies the recognition criteria. The carrying amount of the previous major inspection was ₹ 1,00,000. How should this expenditure be treated under AS 10 (Revised)?`,
        trapNote: 'Under AS 10 (Revised), major inspection costs are capitalized into the asset carrying amount, and the remaining carrying amount of the prior inspection is derecognized.',
        explanation: `As per AS 10 Para 14, when a major inspection is performed, its cost is recognized in the carrying amount of the item of PPE as a replacement if recognition criteria are satisfied. Any remaining carrying amount of the cost of the previous inspection is derecognized.`
      },
      `Capitalize ₹ ${inspectionCost.toLocaleString('en-IN')} in ship's carrying amount and derecognize the remaining ₹ 1,00,000 of prior inspection`,
      [
        `Charge the entire ₹ ${inspectionCost.toLocaleString('en-IN')} immediately as revenue repair expense in P&L`,
        `Amortize ₹ ${inspectionCost.toLocaleString('en-IN')} as deferred revenue expenditure over 10 years without capitalizing`,
        `Deduct ₹ ${inspectionCost.toLocaleString('en-IN')} from Revaluation Reserve`
      ]
    );
  }

  // AS 19 Leases
  private static generateAccountsAs19(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_acc_as19_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p1_adv_acc',
        chapterId: 'as_leases_eps',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (AS 19 Classification of Leases)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'AS 19 Leases - Para 8',
        questionText: `Under AS 19 "Leases", which of the following situations would normally lead to a lease being classified as a FINANCE LEASE?`,
        trapNote: 'A finance lease transfers substantially all risks and rewards incident to ownership. If PV of minimum lease payments substantially covers fair value (usually >= 90%), it is a finance lease.',
        explanation: `Under AS 19 Para 8, indicators of a finance lease include: (a) transfer of ownership by end of lease term, (b) bargain purchase option, (c) lease term is for major part of asset economic life (>=75%), (d) at inception, PV of MLP amounts to substantially all of fair value (>=90%).`
      },
      `At inception of the lease, the present value of minimum lease payments (MLP) amounts to substantially all (>= 90%) of the fair value of the leased asset`,
      [
        `The lease term covers only 20% of the estimated economic life of the asset`,
        `The lessee has no option to purchase the asset and ownership remains with lessor permanently without substantial payment coverage`,
        `The lessor bears all operational risks and normal maintenance repairs throughout the term`
      ]
    );
  }

  // AS 20 Earnings Per Share
  private static generateAccountsAs20(): McqQuestion {
    const netProfit = [1200000, 1500000, 2000000][Math.floor(Math.random() * 3)];
    const originalShares = 100000;
    const bonusRatio = 1; // 1:1 bonus
    const totalSharesAfterBonus = originalShares * 2;
    const eps = Math.round((netProfit / totalSharesAfterBonus) * 100) / 100;
    const wrongEpsWithoutBonus = Math.round((netProfit / originalShares) * 100) / 100;

    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_acc_as20_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p1_adv_acc',
        chapterId: 'as_leases_eps',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (AS 20 Bonus Shares EPS Restatement)`,
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'AS 20 Earnings Per Share - Para 22',
        questionText: `A company had ${originalShares.toLocaleString('en-IN')} equity shares on 1st April. Net profit for the year is ₹ ${netProfit.toLocaleString('en-IN')}. On 1st December, the company issued 1 bonus share for every 1 share held (100% bonus issue). What is the Basic Earnings Per Share for the year as per AS 20?`,
        trapNote: 'Bonus shares are treated as if they were issued at the BEGINNING of the earliest reporting period without any time-weighting, because no new resources were received.',
        explanation: `Under AS 20 Para 22, bonus shares are issued without consideration. Hence, the number of equity shares outstanding is adjusted as if the bonus issue had occurred at the beginning of the period. Total shares = 2,00,000. Basic EPS = ₹ ${netProfit.toLocaleString('en-IN')} / 2,00,000 = ₹ ${eps.toFixed(2)}.`
      },
      `₹ ${eps.toFixed(2)} (Bonus shares are treated as outstanding from the beginning of the period without time-weighting)`,
      [
        `₹ ${wrongEpsWithoutBonus.toFixed(2)} (Computed only on original shares ignoring bonus shares)`,
        `₹ ${(netProfit / (originalShares + originalShares * 4 / 12)).toFixed(2)} (Time-weighting bonus shares for 4 months)`,
        `NIL until bonus shares are fully registered with ROC`
      ]
    );
  }

  // Buy-back of Shares (Section 68)
  private static generateAccountsBuyback(): McqQuestion {
    const paidUpCapital = 100; // Crores
    const freeReserves = 60; // Crores
    const total = paidUpCapital + freeReserves;
    const maxBuyback = total * 0.25;

    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_acc_buyback_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p1_adv_acc',
        chapterId: 'buyback',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Section 68 Buy-back Limits)`,
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'Section 68(2) Companies Act, 2013',
        questionText: `Surya Ltd has Paid-up Equity Share Capital of ₹ ${paidUpCapital} Crores and Free Reserves (including Securities Premium) of ₹ ${freeReserves} Crores. What is the statutory maximum monetary amount the company can deploy for buy-back of shares in any financial year under Section 68(2)(c)?`,
        trapNote: 'Under Section 68(2)(c), the buyback of equity shares in any financial year cannot exceed 25% of the aggregate of paid-up capital and free reserves.',
        explanation: `Under Section 68(2)(c), buyback is limited to 25% of aggregate paid-up capital and free reserves = 25% of (₹ ${paidUpCapital} Cr + ₹ ${freeReserves} Cr) = 25% of ₹ ${total} Cr = ₹ ${maxBuyback} Crores.`
      },
      `₹ ${maxBuyback} Crores (25% of aggregate Paid-up Capital + Free Reserves)`,
      [
        `₹ ${(paidUpCapital * 0.25)} Crores (25% of Paid-up Capital only)`,
        `₹ ${(freeReserves * 0.25)} Crores (25% of Free Reserves only)`,
        `₹ ${total} Crores (100% of Free Reserves with special resolution)`
      ]
    );
  }

  // Internal Reconstruction
  private static generateAccountsInternalRecon(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_acc_recon_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p1_adv_acc',
        chapterId: 'internal_reconstruction',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Capital Reduction Account)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'Internal Reconstruction Accounting Practice',
        questionText: `In an approved scheme of Internal Reconstruction, after writing off accumulated losses, fictitious assets, and overvalued assets, any remaining credit balance in the "Capital Reduction Account" must be transferred to:`,
        trapNote: 'The surplus arising from reduction of share capital is a capital profit and must be transferred to Capital Reserve, not General Reserve.',
        explanation: `The Capital Reduction Account is a temporary memorandum account opened to record sacrifices by stakeholders. Any final credit surplus remaining represents a capital gain and must be transferred to Capital Reserve Account.`
      },
      `Capital Reserve Account`,
      [
        `General Reserve Account`,
        `Securities Premium Account`,
        `Profit and Loss Statement as Other Operating Income`
      ]
    );
  }

  // Amalgamation AS 14
  private static generateAccountsAmalgamation(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_acc_amal_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p1_adv_acc',
        chapterId: 'amalgamation',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (AS 14 Amalgamation Accounting)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'AS 14 Accounting for Amalgamations - Para 13 & 39',
        questionText: `Under AS 14, when an amalgamation is accounted for under the "Purchase Method", how is the statutory reserve (such as Export Profit Reserve or Investment Allowance Reserve) of the transferor company maintained in the transferee company's books?`,
        trapNote: 'Under Purchase Method, statutory reserves are recorded by debiting "Amalgamation Adjustment Deficit/Account" and crediting the statutory reserve.',
        explanation: `Under AS 14, in the purchase method, to comply with legal requirements, statutory reserves are recorded by debiting Amalgamation Adjustment Deficit / Account and crediting Statutory Reserve Account. It is shown under Reserves and Surplus.`
      },
      `Debit "Amalgamation Adjustment Deficit / Account" and Credit "Statutory Reserve Account"`,
      [
        `Debit "Goodwill Account" and Credit "General Reserve Account"`,
        `Statutory reserves can never be carried forward under the purchase method`,
        `Directly debit "Capital Reserve" and credit "Profit & Loss Account"`
      ]
    );
  }

  // Branch Accounting
  private static generateAccountsBranch(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_acc_branch_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p1_adv_acc',
        chapterId: 'branch_accounts',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (AS 11 Foreign Branch Translation)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'AS 11 Effects of Changes in Foreign Exchange Rates',
        questionText: `Under AS 11, in translating the financial statements of an INTEGRAL foreign operation into the reporting currency of the reporting enterprise, which rate should be applied to translate monetary items (such as debtors, creditors, bank balances)?`,
        trapNote: 'For integral foreign operations: Monetary items are translated at CLOSING RATE. Non-monetary items at HISTORICAL RATE. Revenue/expense at AVERAGE RATE.',
        explanation: `Under AS 11 Para 24, for an integral foreign operation: Monetary items are translated using the closing rate at the balance sheet date. Non-monetary items are translated using the exchange rate at the date of the transaction.`
      },
      `Closing rate at the balance sheet date`,
      [
        `Historical rate on the date of transaction`,
        `Average exchange rate for the entire year`,
        `Opening exchange rate on 1st April`
      ]
    );
  }

  // AS 12 Government Grants
  private static generateAccountsAs12(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_acc_as12_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p1_adv_acc',
        chapterId: 'as_gov_fx',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (AS 12 Government Grants)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'AS 12 Accounting for Government Grants - Para 11',
        questionText: `Under AS 12, a government grant received towards the cost of a depreciable specific fixed asset can be presented in financial statements by which of the following recognized methods?`,
        trapNote: 'AS 12 allows two alternatives for grants related to specific assets: (1) deduct from gross asset value, or (2) treat as deferred income recognized in P&L over asset life in proportion to depreciation.',
        explanation: `Under AS 12 Para 14, two methods are permitted: Method 1: Deduct grant from gross book value of asset (depreciation on net value). Method 2: Treat grant as deferred income credited to P&L on a systematic basis over the useful life of the asset.`
      },
      `Either deducted from the gross book value of the asset OR treated as deferred income recognized in P&L over the useful life`,
      [
        `Only credited directly to General Reserve on receipt`,
        `Only recognized as immediate revenue turnover in Profit & Loss in the year of receipt`,
        `Must mandatorily be kept in a separate escrow bank account for 10 years`
      ]
    );
  }

  // =========================================================================
  // PAPER 2: CORPORATE AND OTHER LAWS (WHOLE SYLLABUS)
  // =========================================================================
  private static generateLawMcq(): McqQuestion {
    const generators = [
      this.generateLawCsr,
      this.generateLawDeposits,
      this.generateLawGeneralMeeting,
      this.generateLawQuorum,
      this.generateLawDividend,
      this.generateLawBonus,
      this.generateLawAuditDisqual,
      this.generateLawGca,
      this.generateLawInterpretation,
      this.generateLawFema
    ];
    const pick = generators[Math.floor(Math.random() * generators.length)];
    return pick();
  }

  private static generateLawCsr(): McqQuestion {
    const netWorth = [450, 520, 600, 380][Math.floor(Math.random() * 4)];
    const turnover = [850, 920, 1050, 1200][Math.floor(Math.random() * 4)];
    const netProfit = [4.2, 5.5, 6.8, 3.8][Math.floor(Math.random() * 4)];
    const satisfies = netWorth >= 500 || turnover >= 1000 || netProfit >= 5;

    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_law_csr_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p2_law',
        chapterId: 'accounts_csr',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Section 135 CSR Applicability)`,
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'Section 135(1) Companies Act, 2013',
        questionText: `A public company reports the following financial figures for the immediately preceding financial year:
- Net Worth: ₹ ${netWorth} Crores
- Turnover: ₹ ${turnover} Crores
- Net Profit (calculated u/s 198): ₹ ${netProfit} Crores

Is the company required to constitute a Corporate Social Responsibility (CSR) Committee for the current financial year?`,
        trapNote: 'The 3 thresholds of Section 135(1) are connected with "OR", not "AND". Meeting any single one of Net Worth >= 500 Cr, Turnover >= 1000 Cr, or Net Profit >= 5 Cr triggers mandatory CSR.',
        explanation: `Under Section 135(1), CSR applies if ANY ONE threshold is met: Net Worth >= ₹ 500 Cr, Turnover >= ₹ 1,000 Cr, or Net Profit >= ₹ 5 Cr in the preceding financial year. ${satisfies ? 'The company meets the threshold criteria and MUST constitute a CSR Committee.' : 'None of the 3 thresholds are met, hence CSR is NOT mandatory.'}`
      },
      satisfies ? `Yes, company is mandatorily required to constitute a CSR Committee` : `No, company is NOT required to constitute a CSR Committee`,
      [
        satisfies ? `No, CSR is only applicable if both Turnover AND Net Profit thresholds are met simultaneously` : `Yes, CSR is compulsory for all public companies regardless of turnover or net profit`,
        `CSR applies only if paid-up equity share capital exceeds ₹ 100 Crores`,
        `CSR Committee is optional if company has less than 50 shareholders`
      ]
    );
  }

  private static generateLawDeposits(): McqQuestion {
    const netWorth = [80, 120, 150][Math.floor(Math.random() * 3)];
    const turnover = [400, 550, 600][Math.floor(Math.random() * 3)];
    const isEligible = netWorth >= 100 || turnover >= 500;

    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_law_dep_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p2_law',
        chapterId: 'deposits',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Section 76 Eligible Company Deposits)`,
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'Section 76 Companies Act, 2013 & Companies (Acceptance of Deposits) Rules',
        questionText: `A public company has Net Worth of ₹ ${netWorth} Crores and Turnover of ₹ ${turnover} Crores. Can this public company accept deposits from persons other than its members (i.e. from the public) under Section 76?`,
        trapNote: 'An "Eligible Company" under Section 76 is a public company having Net Worth of not less than ₹ 100 Crores OR Turnover of not less than ₹ 500 Crores.',
        explanation: `Under Section 76, a public company can accept deposits from public only if it is an "Eligible Company" (Net Worth >= ₹ 100 Cr OR Turnover >= ₹ 500 Cr) and has obtained prior consent via special resolution.`
      },
      isEligible ? `Yes, it is an Eligible Company under Section 76 as it meets the threshold criteria` : `No, it does not meet the minimum threshold (Net Worth >= ₹ 100 Cr or Turnover >= ₹ 500 Cr)`,
      [
        isEligible ? `No, public deposits can never be accepted by unlisted companies` : `Yes, any public company can accept public deposits up to 50% of capital without restrictions`,
        `Only banking companies are allowed to accept deposits from the public`,
        `Yes, provided it obtains prior approval from RBI and SEBI`
      ]
    );
  }

  private static generateLawGeneralMeeting(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_law_agm_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p2_law',
        chapterId: 'mgmt_admin',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Section 101 Shorter Notice for AGM)`,
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'Section 101(1) Companies Act, 2013',
        questionText: `Under Section 101(1) of the Companies Act, 2013, an Annual General Meeting (AGM) may be called after giving shorter notice than 21 clear days if consent is given in writing or electronic mode by:`,
        trapNote: 'For an AGM: consent of not less than 95% of members ENTITLED TO VOTE thereat. For an EGM: majority in number + 95% of paid-up capital.',
        explanation: `Under Section 101(1), in the case of an Annual General Meeting, shorter notice requires consent from not less than 95% of the members entitled to vote thereat.`
      },
      `Not less than 95% of the members entitled to vote thereat`,
      [
        `Majority in number representing not less than 75% of paid-up share capital`,
        `100% of the shareholders unanimously`,
        `More than 50% of the members present in person`
      ]
    );
  }

  private static generateLawQuorum(): McqQuestion {
    const membersCount = [800, 3500, 6000][Math.floor(Math.random() * 3)];
    let quorum = 5;
    if (membersCount > 5000) quorum = 30;
    else if (membersCount > 1000) quorum = 15;

    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_law_quorum_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p2_law',
        chapterId: 'mgmt_admin',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Section 103 Quorum for General Meeting)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'Section 103(1) Companies Act, 2013',
        questionText: `A public company has ${membersCount.toLocaleString('en-IN')} members as on the date of the meeting. Unless the articles provide for a larger number, what is the statutory quorum for the general meeting personally present under Section 103?`,
        trapNote: 'Quorum for Public Company: <= 1000 members = 5 members; > 1000 up to 5000 = 15 members; > 5000 = 30 members.',
        explanation: `Under Section 103(1)(a), quorum for a public company is: 5 members if total members <= 1,000; 15 members if total members > 1,000 but <= 5,000; 30 members if total members > 5,000. For ${membersCount} members, quorum is ${quorum} members personally present.`
      },
      `${quorum} members personally present`,
      [
        `${quorum === 5 ? 15 : quorum === 15 ? 30 : 5} members personally present`,
        `2 members personally present`,
        `At least 1/3rd of total voting power`
      ]
    );
  }

  private static generateLawDividend(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_law_div_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p2_law',
        chapterId: 'dividend',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Section 124 Unpaid Dividend Account)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'Section 124(1) & 124(5) Companies Act, 2013',
        questionText: `Where a dividend has been declared by a company but has not been paid or claimed within 30 days from the date of declaration, within how many days must the company transfer the unpaid amount to the "Unpaid Dividend Account"?`,
        trapNote: 'Declaration to payment: 30 days. Unpaid amount transfer to Unpaid Dividend Account: within 7 days from expiry of 30 days.',
        explanation: `Under Section 124(1), where a dividend has not been paid or claimed within 30 days from declaration, the company shall within 7 days from the expiry of the said period of 30 days, transfer the unpaid dividend to a special account called Unpaid Dividend Account.`
      },
      `Within 7 days from the expiry of the 30-day period`,
      [
        `Within 30 days from the date of Annual General Meeting`,
        `Within 15 days from the end of the financial year`,
        `Immediately on the 31st day without any grace period`
      ]
    );
  }

  private static generateLawBonus(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_law_bonus_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p2_law',
        chapterId: 'share_capital',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Section 63 Bonus Shares)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'Section 63(1) Companies Act, 2013',
        questionText: `Under Section 63 of the Companies Act, 2013, which of the following reserves CANNOT be utilized for issuing fully paid bonus shares to members?`,
        trapNote: 'Section 63(1) proviso: Bonus shares SHALL NOT be issued by capitalizing reserves created by the revaluation of assets!',
        explanation: `Under Section 63(1), bonus shares may be issued out of: Free Reserves, Securities Premium, Capital Redemption Reserve (CRR). But proviso explicitly states: no issue of bonus shares shall be made by capitalizing reserves created by the revaluation of assets.`
      },
      `Revaluation Reserve created by revaluing fixed assets`,
      [
        `Securities Premium Account realized in cash`,
        `Capital Redemption Reserve Account (CRR)`,
        `Free Reserves created out of genuine operational profits`
      ]
    );
  }

  private static generateLawAuditDisqual(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_law_audit_dis_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p2_law',
        chapterId: 'audit_auditors',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Section 141 Auditor Disqualification)`,
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'Section 141(3)(d) Companies Act, 2013',
        questionText: `Under Section 141(3)(d)(ii) of the Companies Act, 2013, a person or his partner or relative is disqualified to be appointed as an auditor of a company if indebted to the company, its subsidiary, or holding company in excess of:`,
        trapNote: 'Indebtedness threshold is ₹ 5,00,000. For holding securities, relative can hold up to ₹ 1,00,000 face value. For guarantee, threshold is ₹ 1,00,000.',
        explanation: `Under Section 141(3)(d)(ii), a person who, or his relative or partner, is indebted to the company, or its subsidiary, or its holding or associate company, or a subsidiary of such holding company, in excess of ₹ 5,00,000 is disqualified.`
      },
      `₹ 5,00,000`,
      [
        `₹ 1,00,000`,
        `₹ 10,00,000`,
        `₹ 50,000`
      ]
    );
  }

  private static generateLawGca(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_law_gca_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p2_law',
        chapterId: 'general_clauses',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (General Clauses Act Section 10)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'Section 10 of The General Clauses Act, 1897',
        questionText: `Under Section 10 of the General Clauses Act, 1897, where any act or proceeding is directed to be done in an office or court within a prescribed period, and that office is closed on the last day, when is the act considered to be done in due time?`,
        trapNote: 'Section 10 provides that if the office is closed on the last day of limitation, the act shall be considered as done in due time if done on the NEXT DAY on which the office is open.',
        explanation: `Under Section 10(1), where any act is directed or allowed to be done on a day the court or office is closed, it shall be considered done in due time if it is done on the next day on which the court or office is open.`
      },
      `If done on the next day on which the office or court is open`,
      [
        `The act becomes barred by limitation and can never be accepted`,
        `It must have been done on the preceding working day prior to the holiday`,
        `Only if a special condonation application with fine is filed within 30 days`
      ]
    );
  }

  private static generateLawInterpretation(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_law_interp_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p2_law',
        chapterId: 'interpretation',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Interpretation of Statutes)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'Rule of Ejusdem Generis',
        questionText: `Under the rules of statutory interpretation, which doctrine states that where particular words belonging to a specific class, genus or category are followed by general words, the general words must be construed as limited to things of the same kind?`,
        trapNote: 'Ejusdem Generis = "of the same kind". Noscitur a Sociis = "known by its associates".',
        explanation: `The rule of Ejusdem Generis (meaning "of the same kind or species") provides that where general words follow specific words belonging to a distinct class or genus, the general words are restricted to matters of the same genus.`
      },
      `Rule of Ejusdem Generis`,
      [
        `Rule of Noscitur a Sociis`,
        `Mischief Rule (Heydon's Case)`,
        `Golden Rule of Interpretation`
      ]
    );
  }

  private static generateLawFema(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_law_fema_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p2_law',
        chapterId: 'fema',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (FEMA 1999 Residential Status)`,
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'Section 2(v) of Foreign Exchange Management Act, 1999',
        questionText: `Under Section 2(v) of FEMA 1999, to qualify as a "Person Resident in India" (PRII), an individual must have resided in India during the preceding financial year for a period of:`,
        trapNote: 'Under FEMA, the threshold is MORE than 182 days (>= 183 days) in the PRECEDING financial year, subject to intention exceptions.',
        explanation: `Under Section 2(v) of FEMA 1999, a Person Resident in India means a person residing in India for more than 182 days during the course of the preceding financial year, but does not include a person who has gone abroad for employment or business.`
      },
      `More than 182 days (at least 183 days) during the preceding financial year`,
      [
        `Exactly 182 days or more during the current financial year`,
        `120 days if taxable income exceeds ₹ 15 Lakhs`,
        `365 days over the preceding four financial years`
      ]
    );
  }

  // =========================================================================
  // PAPER 3: TAXATION (WHOLE SYLLABUS - INCOME TAX & GST)
  // =========================================================================
  private static generateTaxMcq(): McqQuestion {
    const generators = [
      this.generateTax115Bac,
      this.generateTaxHra,
      this.generateTaxHouseProp,
      this.generateTaxPgbpPresumptive,
      this.generateTaxCapGains50c,
      this.generateTaxTds,
      this.generateTaxGstRcm,
      this.generateTaxGstItcBlocked,
      this.generateTaxGstDiscount,
      this.generateTaxGstEway
    ];
    const pick = generators[Math.floor(Math.random() * generators.length)];
    return pick();
  }

  private static generateTax115Bac(): McqQuestion {
    const grossSalary = [1400000, 1600000, 1800000, 2000000][Math.floor(Math.random() * 4)];
    const stdDed = 75000;
    const ppf = 150000;
    const netTaxableNew = grossSalary - stdDed;

    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_tax_115bac_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p3_tax',
        chapterId: 'total_income_comp',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Section 115BAC Default Regime)`,
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'Section 115BAC(1A) & Section 16(ia)',
        questionText: `Mr. Rohan has Gross Salary of ₹ ${grossSalary.toLocaleString('en-IN')}. He paid PPF of ₹ ${ppf.toLocaleString('en-IN')}. He opts for the default tax regime under Section 115BAC(1A). What is his Net Taxable Income?`,
        trapNote: 'Under Section 115BAC, Chapter VI-A deductions (80C, 80D) are strictly inadmissible, but Standard Deduction from salary u/s 16(ia) is allowable (updated limit ₹ 75,000).',
        explanation: `Under Section 115BAC(1A), Standard Deduction of ₹ 75,000 u/s 16(ia) is allowable. Section 80C is disallowed. Net Taxable Income = ₹ ${grossSalary.toLocaleString('en-IN')} - ₹ 75,000 = ₹ ${netTaxableNew.toLocaleString('en-IN')}.`
      },
      `₹ ${netTaxableNew.toLocaleString('en-IN')} (Standard Deduction ₹ 75,000 allowable; 80C disallowed)`,
      [
        `₹ ${(netTaxableNew - ppf).toLocaleString('en-IN')} (Deducting both Standard Deduction and PPF 80C)`,
        `₹ ${grossSalary.toLocaleString('en-IN')} (No deduction allowed under Section 115BAC)`,
        `₹ ${(grossSalary - 50000).toLocaleString('en-IN')} (Only ₹ 50,000 standard deduction allowable)`
      ]
    );
  }

  private static generateTaxHra(): McqQuestion {
    const basicSalary = 600000;
    const hraReceived = 180000;
    const rentPaid = 200000; // in non-metro
    const tenPercentSalary = basicSalary * 0.10; // 60,000
    const rentMinusTenPercent = rentPaid - tenPercentSalary; // 140,000
    const fortyPercentSalary = basicSalary * 0.40; // 240,000
    const exemptHra = Math.min(hraReceived, rentMinusTenPercent, fortyPercentSalary);

    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_tax_hra_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p3_tax',
        chapterId: 'salaries',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (HRA Exemption Section 10(13A))`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'Section 10(13A) & Rule 2A',
        questionText: `An assessee living in a rented accommodation in Jaipur pays annual rent of ₹ ${rentPaid.toLocaleString('en-IN')}. His annual Basic Salary is ₹ ${basicSalary.toLocaleString('en-IN')} and HRA received is ₹ ${hraReceived.toLocaleString('en-IN')}. Under the old tax regime, what is the exempt amount of HRA under Section 10(13A)?`,
        trapNote: 'Exempt HRA is least of: (1) Actual HRA received (₹ 1,80,000), (2) Rent paid - 10% of salary (₹ 2,00,000 - ₹ 60,000 = ₹ 1,40,000), (3) 40% of salary (non-metro = ₹ 2,40,000).',
        explanation: `HRA exemption under Rule 2A is the least of: (a) Actual HRA ₹ 1,80,000; (b) Rent paid minus 10% salary = ₹ 2,00,000 - ₹ 60,000 = ₹ 1,40,000; (c) 40% of salary = ₹ 2,40,000. Least amount is ₹ ${exemptHra.toLocaleString('en-IN')}.`
      },
      `₹ ${exemptHra.toLocaleString('en-IN')} (Least of actual HRA, rent minus 10% salary, or 40% salary)`,
      [
        `₹ ${hraReceived.toLocaleString('en-IN')} (Entire HRA received is exempt)`,
        `₹ ${rentMinusTenPercent + 40000} Lakhs`,
        `₹ 60,000 (10% of basic salary)`
      ]
    );
  }

  private static generateTaxHouseProp(): McqQuestion {
    const interestPaid = [240000, 260000, 300000][Math.floor(Math.random() * 3)];
    const maxLimit = 200000;

    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_tax_hp_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p3_tax',
        chapterId: 'house_prop',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Section 24(b) House Property Interest)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'Section 24(b) Income Tax Act, 1961',
        questionText: `Mr. Vikas paid home loan interest of ₹ ${interestPaid.toLocaleString('en-IN')} on housing loan borrowed in 2020 for acquiring a self-occupied residential property. What is the maximum deduction allowable under Section 24(b) under the regular tax provisions?`,
        trapNote: 'For a self-occupied house property acquired/constructed with capital borrowed on or after 1-4-1999, maximum interest deduction under Section 24(b) is capped at ₹ 2,00,000.',
        explanation: `Under Section 24(b), for self-occupied residential property, the deduction for interest on housing loan borrowed for acquisition/construction is subject to a statutory maximum ceiling of ₹ 2,00,000.`
      },
      `₹ ${maxLimit.toLocaleString('en-IN')} (Statutory cap for self-occupied property)`,
      [
        `₹ ${interestPaid.toLocaleString('en-IN')} (Full actual interest paid without any ceiling limit)`,
        `₹ 1,50,000`,
        `₹ 30,000`
      ]
    );
  }

  private static generateTaxPgbpPresumptive(): McqQuestion {
    const turnover = 15000000; // 1.5 Cr
    const digitalTurnover = 12000000; // 1.2 Cr (digital)
    const cashTurnover = 3000000; // 30 Lakh (cash)
    const presumptiveProfit = (digitalTurnover * 0.06) + (cashTurnover * 0.08); // 720000 + 240000 = 960000

    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_tax_44ad_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p3_tax',
        chapterId: 'pgbp',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Section 44AD Presumptive Taxation)`,
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'Section 44AD of Income Tax Act, 1961',
        questionText: `An eligible resident individual carrying on trading business has total turnover of ₹ 1.5 Crores, out of which ₹ 1.2 Crores was received by account payee bank draft and electronic clearing system, and ₹ 30 Lakhs was received in cash. What is the minimum presumptive income to be declared under Section 44AD?`,
        trapNote: 'Section 44AD rate is 6% for turnover received via banking channels/digital modes and 8% for cash turnover.',
        explanation: `Under Section 44AD, presumptive profit is 6% on digital turnover (6% of ₹ 1.2 Cr = ₹ 7,20,000) PLUS 8% on non-digital/cash turnover (8% of ₹ 30 Lakhs = ₹ 2,40,000). Total minimum presumptive income = ₹ 9,60,000.`
      },
      `₹ ${presumptiveProfit.toLocaleString('en-IN')} (6% on digital turnover + 8% on cash turnover)`,
      [
        `₹ ${(turnover * 0.08).toLocaleString('en-IN')} (Flat 8% on total turnover)`,
        `₹ ${(turnover * 0.06).toLocaleString('en-IN')} (Flat 6% on total turnover)`,
        `₹ ${(turnover * 0.50).toLocaleString('en-IN')} (50% presumptive rate)`
      ]
    );
  }

  private static generateTaxCapGains50c(): McqQuestion {
    const agreedPrice = 8000000; // 80 Lakhs
    const sdv = 8600000; // 86 Lakhs (107.5% of agreed)
    const tolerance = agreedPrice * 1.10; // 88 Lakhs

    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_tax_50c_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p3_tax',
        chapterId: 'capital_gains',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Section 50C Safe Harbor 110%)`,
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'Section 50C(1) 3rd Proviso',
        questionText: `Mr. Naresh sold a plot of commercial land for an agreed consideration of ₹ 80 Lakhs. The Stamp Duty Value (SDV) on the date of registration was ₹ 86 Lakhs. What is the Full Value of Consideration for computing capital gains under Section 50C?`,
        trapNote: 'Under the 3rd proviso to Section 50C, if SDV does not exceed 110% of declared consideration (₹ 80L × 110% = ₹ 88L), the actual agreed consideration (₹ 80L) is adopted!',
        explanation: `Under Section 50C, 110% of agreed consideration = ₹ 80,00,000 × 110% = ₹ 88,00,000. Since SDV (₹ 86,00,000) does not exceed ₹ 88,00,000, the safe harbor tolerance applies, and actual consideration of ₹ 80,00,000 is taken as Full Value of Consideration.`
      },
      `₹ 80,00,000 (Because Stamp Duty Value does not exceed 110% of agreed consideration)`,
      [
        `₹ 86,00,000 (Stamp Duty Value must always replace consideration if higher)`,
        `₹ 83,00,000 (Average of consideration and Stamp Duty Value)`,
        `₹ 88,00,000 (110% threshold amount)`
      ]
    );
  }

  private static generateTaxTds(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_tax_tds_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p3_tax',
        chapterId: 'tds_tcs_advance',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (TDS Section 194J Rates)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'Section 194J Income Tax Act, 1961',
        questionText: `Under Section 194J of the Income Tax Act, 1961, what is the statutory rate of TDS on fees paid for technical services (other than professional services) to a resident payee?`,
        trapNote: 'Fees for technical services (FTS) under 194J attracts 2% TDS, whereas professional services attract 10% TDS.',
        explanation: `Under Section 194J, the rate of TDS is 2% in the case of fees for technical services (not being professional services) or royalty for sale, distribution or exhibition of cinematographic films, and 10% for professional services.`
      },
      `2% (Fees for technical services)`,
      [
        `10% (Flat rate for all services under Section 194J)`,
        `1%`,
        `5%`
      ]
    );
  }

  private static generateTaxGstRcm(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_tax_rcm_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p3_tax',
        chapterId: 'gst_supply_charge',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (GST Reverse Charge Section 9(3))`,
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'Notification No. 13/2017 - Central Tax (Rate)',
        questionText: `Under Section 9(3) of the CGST Act, which of the following supplies of services is subject to GST under Reverse Charge Mechanism (RCM) where the recipient company is liable to pay tax?`,
        trapNote: 'Services supplied by a director (in independent/non-employee capacity) to a company are taxable under RCM paid by the company.',
        explanation: `Under Notification No. 13/2017-CT(Rate), services supplied by a director of a company or body corporate to the company/body corporate are covered under Reverse Charge Mechanism, and the company is liable to pay GST.`
      },
      `Sitting fees and advisory fees paid by a company to its Independent Non-Executive Director`,
      [
        `Salaries and allowances paid to a Whole-time Managing Director covered under Schedule III`,
        `Audit fees paid to statutory auditor of the company`,
        `Rent paid by a company to a municipal authority for commercial office`
      ]
    );
  }

  private static generateTaxGstItcBlocked(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_tax_itc_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p3_tax',
        chapterId: 'gst_itc',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Section 17(5) Blocked ITC)`,
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'Section 17(5)(a) CGST Act, 2017',
        questionText: `Under Section 17(5) of the CGST Act, 2017, input tax credit (ITC) is BLOCKED in which of the following cases?`,
        trapNote: 'ITC on motor vehicles for transportation of persons having approved seating capacity of not more than 13 persons (including driver) is blocked, unless used for taxable supply of vehicles, passenger transport, or driving school.',
        explanation: `Under Section 17(5)(a), ITC is blocked on motor vehicles for transportation of persons with approved seating capacity <= 13 persons (including driver), unless used for making further taxable supply of such vehicles, transportation of passengers, or imparting driving skills.`
      },
      `Purchase of a 5-seater luxury car by a software company for transportation of its senior executives`,
      [
        `Purchase of a delivery truck used exclusively for transporting finished manufactured goods`,
        `Purchase of commercial vehicles having approved seating capacity of 25 persons`,
        `Purchase of plant and machinery installed in factory premises`
      ]
    );
  }

  private static generateTaxGstDiscount(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_tax_discount_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p3_tax',
        chapterId: 'gst_time_value',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Section 15(3) Post-Supply Discount)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'Section 15(3)(b) CGST Act, 2017',
        questionText: `Under Section 15(3)(b) of the CGST Act, when can a discount offered AFTER the supply has been effected be excluded from the taxable value of supply?`,
        trapNote: 'Two conditions are mandatory: (1) agreement entered into at or before supply linked to invoices, and (2) proportionate ITC reversed by recipient.',
        explanation: `Under Section 15(3)(b), post-supply discount is excluded from value of supply only if: (i) it is established in terms of an agreement entered into at or before supply and specifically linked to relevant invoices; and (ii) input tax credit attributable to the discount has been reversed by the recipient.`
      },
      `If established in terms of an agreement entered at or before supply and proportionate ITC is reversed by recipient`,
      [
        `Post-supply discounts can never be deducted under GST under any circumstance`,
        `If the discount is approved verbally by jurisdictional tax commissioner`,
        `If discount is less than 5% of invoice value without requiring any ITC reversal`
      ]
    );
  }

  private static generateTaxGstEway(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_tax_eway_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p3_tax',
        chapterId: 'gst_invoice_reg',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Rule 138 E-Way Bill)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'Rule 138(10) CGST Rules, 2017',
        questionText: `Under Rule 138(10) of CGST Rules, 2017, what is the standard validity period of an e-way bill for general cargo (other than Over Dimensional Cargo)?`,
        trapNote: 'The distance was amended to 1 day for every 200 km (or part thereof). Prior to amendment it was 100 km.',
        explanation: `Under Rule 138(10), the validity of an e-way bill is 1 day for every 200 km or part thereof for general cargo. For Over Dimensional Cargo, it is 1 day for every 20 km or part thereof.`
      },
      `One day for every 200 km or part thereof`,
      [
        `One day for every 100 km or part thereof`,
        `One day for every 300 km or part thereof`,
        `Fixed 3 days irrespective of distance`
      ]
    );
  }

  // =========================================================================
  // PAPER 4: COST AND MANAGEMENT ACCOUNTING (WHOLE SYLLABUS)
  // =========================================================================
  private static generateCostingMcq(): McqQuestion {
    const generators = [
      this.generateCostingEoq,
      this.generateCostingStockLevels,
      this.generateCostingLabourBonus,
      this.generateCostingOverheads,
      this.generateCostingAbc,
      this.generateCostingProcessEquiv,
      this.generateCostingJointProducts,
      this.generateCostingStandardCosting,
      this.generateCostingMarginalBep,
      this.generateCostingMarginOfSafety
    ];
    const pick = generators[Math.floor(Math.random() * generators.length)];
    return pick();
  }

  private static generateCostingEoq(): McqQuestion {
    const annualDemand = [10000, 12000, 16000, 20000][Math.floor(Math.random() * 4)];
    const orderCost = [100, 150, 200][Math.floor(Math.random() * 3)];
    const carryCost = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
    const eoq = Math.round(Math.sqrt((2 * annualDemand * orderCost) / carryCost));

    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_cost_eoq_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p4_costing',
        chapterId: 'material_cost',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (EOQ Formula)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'Economic Order Quantity = sqrt(2AO/C)',
        questionText: `An entity has annual demand of ${annualDemand.toLocaleString('en-IN')} units. Cost per order is ₹ ${orderCost} and annual inventory carrying cost per unit is ₹ ${carryCost}. What is the Economic Order Quantity (EOQ)?`,
        trapNote: 'EOQ formula is sqrt((2 × Annual Demand × Order Cost) / Carrying Cost per unit per annum).',
        explanation: `EOQ = √[(2 × ${annualDemand} × ${orderCost}) / ${carryCost}] = √[${(2 * annualDemand * orderCost) / carryCost}] = ${eoq.toLocaleString('en-IN')} units.`
      },
      `${eoq.toLocaleString('en-IN')} units`,
      [
        `${Math.round(eoq * 1.2).toLocaleString('en-IN')} units`,
        `${Math.round(eoq * 0.8).toLocaleString('en-IN')} units`,
        `${Math.round(eoq * 1.5).toLocaleString('en-IN')} units`
      ]
    );
  }

  private static generateCostingStockLevels(): McqQuestion {
    const maxUsage = 400; // units/day
    const maxLead = 6; // days
    const minUsage = 200;
    const minLead = 4;
    const rol = maxUsage * maxLead; // 2400 units
    const normalUsage = 300;
    const normalLead = 5;
    const minLevel = rol - (normalUsage * normalLead); // 2400 - 1500 = 900 units

    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_cost_stock_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p4_costing',
        chapterId: 'material_cost',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Reorder Level & Minimum Level)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'Stock Level Formulas',
        questionText: `Maximum consumption: ${maxUsage} units/day; Maximum lead time: ${maxLead} days; Normal consumption: ${normalUsage} units/day; Normal lead time: ${normalLead} days. What is the Reorder Level (ROL) and Minimum Stock Level?`,
        trapNote: 'Reorder Level = Maximum Usage × Maximum Lead Time. Minimum Level = ROL - (Normal Usage × Normal Lead Time).',
        explanation: `ROL = ${maxUsage} × ${maxLead} = ${rol} units. Minimum Level = ${rol} - (${normalUsage} × ${normalLead}) = ${rol} - 1,500 = ${minLevel} units.`
      },
      `Reorder Level = ${rol} units; Minimum Level = ${minLevel} units`,
      [
        `Reorder Level = 1,500 units; Minimum Level = 600 units`,
        `Reorder Level = 2,000 units; Minimum Level = 1,000 units`,
        `Reorder Level = 3,000 units; Minimum Level = 1,200 units`
      ]
    );
  }

  private static generateCostingLabourBonus(): McqQuestion {
    const timeAllowed = 10; // hours
    const timeTaken = 6; // hours
    const ratePerHour = 50; // ₹
    const timeSaved = timeAllowed - timeTaken; // 4 hours
    const basicWage = timeTaken * ratePerHour; // 300
    const halseyBonus = (timeSaved * ratePerHour) * 0.50; // 100
    const totalHalsey = basicWage + halseyBonus; // 400

    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_cost_halsey_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p4_costing',
        chapterId: 'employee_cost',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Halsey Premium Bonus Scheme)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'Halsey 50% Bonus Scheme',
        questionText: `Standard time allowed for a job is ${timeAllowed} hours. An operative completed it in ${timeTaken} hours. The hourly wage rate is ₹ ${ratePerHour}. Under the Halsey Scheme (50% sharing), what are the total earnings of the operative?`,
        trapNote: 'Halsey Total Earnings = (Hours Taken × Hourly Rate) + 50% of (Time Saved × Hourly Rate).',
        explanation: `Time Saved = 10 - 6 = 4 hours. Basic Wage = 6 × ₹ 50 = ₹ 300. Halsey Bonus = 50% × (4 × ₹ 50) = ₹ 100. Total Earnings = ₹ 300 + ₹ 100 = ₹ ${totalHalsey}.`
      },
      `₹ ${totalHalsey} (Basic ₹ ${basicWage} + Bonus ₹ ${halseyBonus})`,
      [
        `₹ 500 (Payment for 10 hours full standard time)`,
        `₹ 300 (Basic wage only without bonus)`,
        `₹ 450`
      ]
    );
  }

  private static generateCostingOverheads(): McqQuestion {
    const budgetOverhead = 500000;
    const actualOverhead = 540000;
    const absorbedOverhead = 510000;
    const underAbsorption = actualOverhead - absorbedOverhead; // 30,000 Under-absorbed

    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_cost_oh_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p4_costing',
        chapterId: 'overheads',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Under/Over Absorption of Overheads)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'Overhead Absorption Principles',
        questionText: `During a production period, Actual Production Overheads incurred were ₹ ${actualOverhead.toLocaleString('en-IN')}, whereas Overheads Absorbed into production based on predetermined rate were ₹ ${absorbedOverhead.toLocaleString('en-IN')}. What is the under/over absorption of overheads?`,
        trapNote: 'If Actual Overheads > Absorbed Overheads, it is UNDER-ABSORPTION. If Absorbed > Actual, it is OVER-ABSORPTION.',
        explanation: `Under-absorption = Actual Overhead (₹ ${actualOverhead.toLocaleString('en-IN')}) - Absorbed Overhead (₹ ${absorbedOverhead.toLocaleString('en-IN')}) = ₹ ${underAbsorption.toLocaleString('en-IN')} (Under-absorbed).`
      },
      `Under-absorption of ₹ ${underAbsorption.toLocaleString('en-IN')}`,
      [
        `Over-absorption of ₹ ${underAbsorption.toLocaleString('en-IN')}`,
        `Under-absorption of ₹ ${(actualOverhead - budgetOverhead).toLocaleString('en-IN')}`,
        `NIL variance as overheads are absorbed at predetermined rates`
      ]
    );
  }

  private static generateCostingAbc(): McqQuestion {
    const costPool = 600000;
    const totalDrivers = 1200; // setups
    const rate = costPool / totalDrivers; // ₹ 500 per setup
    const productSetups = 40;
    const allocated = productSetups * rate; // 20,000

    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_cost_abc_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p4_costing',
        chapterId: 'abc_costing',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Activity Based Costing Driver Rate)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'Cost Driver Rate = Cost Pool / Total Cost Drivers',
        questionText: `Under Activity Based Costing (ABC), machine setup cost pool is ₹ ${costPool.toLocaleString('en-IN')}. Total machine setups for the year are ${totalDrivers}. Product Alpha consumed ${productSetups} setups. What is the Cost Driver Rate and overhead allocated to Product Alpha?`,
        trapNote: 'Cost Driver Rate = Activity Cost Pool / Total Driver Quantity. Allocated Cost = Driver Rate × Drivers consumed by product.',
        explanation: `Cost Driver Rate = ₹ ${costPool.toLocaleString('en-IN')} / ${totalDrivers} setups = ₹ ${rate} per setup. Overhead allocated to Alpha = ${productSetups} × ₹ ${rate} = ₹ ${allocated.toLocaleString('en-IN')}.`
      },
      `Cost Driver Rate = ₹ ${rate} per setup; Allocated to Alpha = ₹ ${allocated.toLocaleString('en-IN')}`,
      [
        `Cost Driver Rate = ₹ 600 per setup; Allocated to Alpha = ₹ 24,000`,
        `Cost Driver Rate = ₹ 400 per setup; Allocated to Alpha = ₹ 16,000`,
        `Allocated based on direct labour hours only`
      ]
    );
  }

  private static generateCostingProcessEquiv(): McqQuestion {
    const unitsStarted = 10000;
    const completed = 8000;
    const closingWip = 2000;
    const wipStage = 0.60; // 60%
    const equivWip = closingWip * wipStage; // 1200
    const totalEquiv = completed + equivWip; // 9200

    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_cost_proc_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p4_costing',
        chapterId: 'process_costing',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Process Costing Equivalent Units)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'Equivalent Production Units Computation',
        questionText: `In a manufacturing process with no opening WIP, ${unitsStarted.toLocaleString('en-IN')} units were introduced. ${completed.toLocaleString('en-IN')} units were completed and transferred. ${closingWip.toLocaleString('en-IN')} units remained in closing WIP, 60% complete as to conversion costs. What are the Equivalent Production Units for conversion costs?`,
        trapNote: 'Equivalent Units = Completed Units (100%) + Closing WIP Units × Degree of Completion.',
        explanation: `Equivalent Units = ${completed} units (100%) + [${closingWip} × 60%] = ${completed} + ${equivWip} = ${totalEquiv.toLocaleString('en-IN')} equivalent units.`
      },
      `${totalEquiv.toLocaleString('en-IN')} equivalent units`,
      [
        `${unitsStarted.toLocaleString('en-IN')} units`,
        `${completed.toLocaleString('en-IN')} units`,
        `10,800 units`
      ]
    );
  }

  private static generateCostingJointProducts(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_cost_joint_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p4_costing',
        chapterId: 'job_contract',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Joint Products Apportionment)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'Net Realizable Value Method',
        questionText: `Which of the following methods for apportioning joint processing costs to joint products is considered the most economically sound when products require further processing after the split-off point?`,
        trapNote: 'Net Realizable Value (NRV) at split-off method (Final Sales Value less further processing costs and selling expenses) is the most rational method.',
        explanation: `The Net Realizable Value (NRV) method reflects the true revenue-generating capability of each joint product by deducting further processing costs from final sales value, matching joint costs to net revenue potential.`
      },
      `Net Realizable Value (NRV) at split-off point method`,
      [
        `Physical units method`,
        `Average unit cost method`,
        `Direct labour hours proportion method`
      ]
    );
  }

  private static generateCostingStandardCosting(): McqQuestion {
    const stdRate = 50;
    const actRate = 54;
    const actQty = 1000;
    const mpv = actQty * (stdRate - actRate); // -4000 Adverse

    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_cost_var_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p4_costing',
        chapterId: 'standard_costing',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Material Price Variance MPV)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'MPV = Actual Quantity * (Standard Price - Actual Price)',
        questionText: `Standard price of Material X is ₹ ${stdRate} per kg. During the month, ${actQty.toLocaleString('en-IN')} kg of Material X was purchased and consumed at an actual rate of ₹ ${actRate} per kg. What is the Material Price Variance (MPV)?`,
        trapNote: 'MPV = Actual Quantity × (Standard Price - Actual Price). When Actual Price > Standard Price, the variance is Adverse (Unfavourable).',
        explanation: `MPV = AQ × (SP - AP) = ${actQty} kg × (₹ ${stdRate} - ₹ ${actRate}) = ${actQty} × (-₹ 4) = ₹ 4,000 (Adverse).`
      },
      `₹ 4,000 (Adverse)`,
      [
        `₹ 4,000 (Favourable)`,
        `₹ 5,400 (Adverse)`,
        `₹ 5,000 (Favourable)`
      ]
    );
  }

  private static generateCostingMarginalBep(): McqQuestion {
    const sp = 100;
    const vc = 60;
    const fc = 400000;
    const contr = sp - vc; // 40
    const bepUnits = fc / contr; // 10,000 units
    const bepValue = bepUnits * sp; // 10,00,000

    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_cost_bep_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p4_costing',
        chapterId: 'marginal_costing',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Break-Even Point BEP)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'BEP = Fixed Cost / Contribution per unit',
        questionText: `A company manufactures product Beta with Selling Price ₹ ${sp} per unit, Variable Cost ₹ ${vc} per unit, and Total Fixed Overheads ₹ ${fc.toLocaleString('en-IN')}. What is the Break-Even Point in units and Break-Even Sales value?`,
        trapNote: 'Contribution = Selling Price - Variable Cost = ₹ 40. BEP Units = Fixed Costs / Contribution = 10,000 units. BEP Sales = 10,000 × ₹ 100 = ₹ 10,00,000.',
        explanation: `Contribution per unit = ₹ ${sp} - ₹ ${vc} = ₹ ${contr}. BEP (units) = ₹ ${fc.toLocaleString('en-IN')} / ₹ ${contr} = ${bepUnits.toLocaleString('en-IN')} units. BEP (value) = ${bepUnits.toLocaleString('en-IN')} × ₹ ${sp} = ₹ ${bepValue.toLocaleString('en-IN')}.`
      },
      `BEP = ${bepUnits.toLocaleString('en-IN')} units (₹ ${bepValue.toLocaleString('en-IN')})`,
      [
        `BEP = 6,667 units (₹ 6,66,700)`,
        `BEP = 15,000 units (₹ 15,00,000)`,
        `BEP = 4,000 units (₹ 4,00,000)`
      ]
    );
  }

  private static generateCostingMarginOfSafety(): McqQuestion {
    const actualSales = 2000000;
    const bepSales = 1200000;
    const mosValue = actualSales - bepSales; // 8,00,000
    const mosPct = (mosValue / actualSales) * 100; // 40%

    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_cost_mos_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p4_costing',
        chapterId: 'marginal_costing',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Margin of Safety % Computation)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'Margin of Safety % = (Actual Sales - BEP Sales) / Actual Sales',
        questionText: `A business has Actual Sales of ₹ ${actualSales.toLocaleString('en-IN')} and Break-Even Sales of ₹ ${bepSales.toLocaleString('en-IN')}. What is the Margin of Safety in value and as a percentage of actual sales?`,
        trapNote: 'Margin of Safety = Actual Sales - Break-Even Sales. Margin of Safety % is always calculated with respect to ACTUAL SALES as denominator.',
        explanation: `Margin of Safety (value) = ₹ ${actualSales.toLocaleString('en-IN')} - ₹ ${bepSales.toLocaleString('en-IN')} = ₹ ${mosValue.toLocaleString('en-IN')}. Margin of Safety % = (₹ ${mosValue.toLocaleString('en-IN')} / ₹ ${actualSales.toLocaleString('en-IN')}) × 100 = ${mosPct}%.`
      },
      `Margin of Safety = ₹ ${mosValue.toLocaleString('en-IN')} (${mosPct}%)`,
      [
        `Margin of Safety = ₹ 12,00,000 (60%)`,
        `Margin of Safety = ₹ 8,00,000 (66.67% of BEP)`,
        `Margin of Safety = ₹ 4,00,000 (20%)`
      ]
    );
  }

  // =========================================================================
  // PAPER 5: AUDITING AND ETHICS (WHOLE SYLLABUS)
  // =========================================================================
  private static generateAuditMcq(): McqQuestion {
    const generators = [
      this.generateAuditSa705,
      this.generateAuditSa505,
      this.generateAuditSa501,
      this.generateAuditSa320,
      this.generateAuditSa230,
      this.generateAuditCompanyFraud,
      this.generateAuditRotation,
      this.generateAuditSqc1,
      this.generateAuditCaro2020,
      this.generateAuditKamSa701
    ];
    const pick = generators[Math.floor(Math.random() * generators.length)];
    return pick();
  }

  private static generateAuditSa705(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_audit_705_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p5_audit',
        chapterId: 'audit_report',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (SA 705 Revised Audit Opinions)`,
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'SA 705 (Revised) - Para 7, 8 & 9',
        questionText: `An auditor, having obtained sufficient appropriate audit evidence, concludes that misstatements, individually or in the aggregate, are BOTH material and pervasive to the financial statements. Which form of audit opinion must be expressed as per SA 705 (Revised)?`,
        trapNote: 'Adverse Opinion is expressed when evidence IS obtained and misstatements are BOTH material and pervasive. Disclaimer of Opinion is when evidence CANNOT be obtained and potential effects are material and pervasive.',
        explanation: `Under SA 705 (Revised) Para 8, the auditor shall express an Adverse Opinion when the auditor, having obtained sufficient appropriate audit evidence, concludes that misstatements are both material and pervasive to the financial statements.`
      },
      `Adverse Opinion`,
      [
        `Disclaimer of Opinion`,
        `Qualified Opinion ("Except for...")`,
        `Unmodified Opinion with Key Audit Matter (KAM) paragraph`
      ]
    );
  }

  private static generateAuditSa505(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_audit_505_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p5_audit',
        chapterId: 'audit_evidence',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (SA 505 External Confirmations)`,
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'SA 505 External Confirmations - Para 8',
        questionText: `During a statutory audit, management refuses to allow the auditor to send an external confirmation request to a major trade debtor. Under SA 505, what is the auditor's required immediate procedural duty?`,
        trapNote: 'The auditor must NOT immediately qualify or disclaim; the auditor must first inquire into reasons, seek evidence for validity, evaluate fraud risk, and perform alternative procedures.',
        explanation: `Under SA 505 Para 8, if management refuses, the auditor shall: (a) Inquire as to management reasons and seek audit evidence as to validity; (b) Evaluate implications on fraud risk assessment; and (c) Perform alternative audit procedures to obtain relevant and reliable audit evidence.`
      },
      `Inquire as to management's reasons, evaluate validity and fraud risk, and perform alternative audit procedures`,
      [
        `Immediately issue a Disclaimer of Opinion without any inquiry`,
        `Accept management's oral explanation and verify subsequent recovery only`,
        `Report the management refusal immediately to Central Government under Section 143(12)`
      ]
    );
  }

  private static generateAuditSa501(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_audit_501_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p5_audit',
        chapterId: 'audit_evidence',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (SA 501 Physical Inventory Count)`,
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'SA 501 - Para 7',
        questionText: `When attendance at physical inventory counting is impracticable due to unforeseen factors (such as civil unrest or safety quarantine on the balance sheet date), what does SA 501 require the auditor to do?`,
        trapNote: 'SA 501 specifically requires alternative procedures, or observing counts on an alternative date and auditing intervening transactions between count date and balance sheet date.',
        explanation: `Under SA 501 Para 7, if attendance at physical inventory counting is impracticable, the auditor shall perform alternative audit procedures. If feasible, observe physical counts on an alternative date and perform audit procedures on intervening transactions.`
      },
      `Perform alternative audit procedures, or observe counts on an alternative date and test intervening transactions`,
      [
        `Immediately modify the audit report with an Adverse Opinion`,
        `Rely solely on management written representation without further testing`,
        `Mandatorily resign from the audit engagement within 24 hours`
      ]
    );
  }

  private static generateAuditSa320(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_audit_320_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p5_audit',
        chapterId: 'audit_strategy',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (SA 320 Performance Materiality)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'SA 320 Materiality in Planning and Performing an Audit',
        questionText: `Under SA 320, how is "Performance Materiality" defined and why is it established by the auditor?`,
        trapNote: 'Performance materiality is set at an amount LESS than overall materiality to reduce the probability that aggregate uncorrected and undetected misstatements exceed overall materiality.',
        explanation: `Under SA 320 Para 9, performance materiality means the amount set by the auditor at less than materiality for the financial statements as a whole to reduce to an appropriately low level the probability that aggregate uncorrected misstatements exceed materiality.`
      },
      `Set at an amount less than overall financial statement materiality to absorb undetected and uncorrected misstatements`,
      [
        `Set at an amount higher than overall materiality to reduce audit testing sample size`,
        `The exact numerical profit figure shown in the audited profit and loss account`,
        `A fixed 10% threshold of paid-up share capital mandated by Companies Act`
      ]
    );
  }

  private static generateAuditSa230(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_audit_230_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p5_audit',
        chapterId: 'audit_nature_sqc',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (SA 230 Assembly of Audit Documentation)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'SA 230 Audit Documentation - Para 14',
        questionText: `Under SA 230 "Audit Documentation", what is the ordinary statutory time limit for the auditor to complete the assembly of the final audit file after the date of the auditor's report?`,
        trapNote: 'Assembly of final audit file: Ordinarily not more than 60 days after the date of the auditor\'s report. Minimum retention period: 7 years under SQC 1.',
        explanation: `Under SA 230 Para A21, an appropriate time limit within which to complete the assembly of the final audit file is ordinarily not more than 60 days after the date of the auditor\'s report.`
      },
      `Not more than 60 days after the date of the auditor's report`,
      [
        `Within 30 days from the date of the Annual General Meeting`,
        `Within 7 days of signing the audit report`,
        `Not more than 180 days from the close of the financial year`
      ]
    );
  }

  private static generateAuditCompanyFraud(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_audit_fraud_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p5_audit',
        chapterId: 'company_audit',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Section 143(12) Fraud Reporting)`,
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'Section 143(12) Companies Act, 2013 & Rule 13',
        questionText: `Under Section 143(12) of the Companies Act, 2013 read with Rule 13, an auditor is required to report an identified fraud directly to the Central Government (Ministry of Corporate Affairs) if the fraud amount involves:`,
        trapNote: 'Fraud involving ₹ 1 Crore or above is reported to Central Government. Fraud involving less than ₹ 1 Crore is reported to Audit Committee / Board within 2 days.',
        explanation: `Under Section 143(12) and Rule 13 of Companies (Audit and Auditors) Rules, 2014, if the auditor has reason to believe that an offence of fraud involving an amount of ₹ 1 Crore or above has been committed against the company by its officers/employees, the auditor shall report the matter to the Central Government.`
      },
      `₹ 1 Crore or above`,
      [
        `₹ 10 Lakhs or above`,
        `₹ 50 Lakhs or above`,
        `Any fraud regardless of amount`
      ]
    );
  }

  private static generateAuditRotation(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_audit_rotation_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p5_audit',
        chapterId: 'company_audit',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Section 139(2) Auditor Rotation)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'Section 139(2) Companies Act, 2013',
        questionText: `Under Section 139(2) of the Companies Act, 2013, what is the mandatory rotation period and cooling-off period for an AUDIT FIRM in applicable companies?`,
        trapNote: 'An audit firm can hold office for maximum TWO terms of 5 consecutive years (total 10 years), followed by a mandatory cooling-off period of 5 consecutive years.',
        explanation: `Under Section 139(2), no listed company or specified unlisted company shall appoint or re-appoint: (a) an individual as auditor for more than 1 term of 5 consecutive years; and (b) an audit firm as auditor for more than 2 terms of 5 consecutive years. Cooling-off period is 5 years.`
      },
      `Maximum two terms of 5 consecutive years, followed by 5 years mandatory cooling-off period`,
      [
        `Maximum one term of 5 consecutive years, followed by 3 years cooling-off period`,
        `Maximum three terms of 3 consecutive years with no cooling-off period`,
        `Maximum two terms of 3 consecutive years, followed by 1 year cooling-off period`
      ]
    );
  }

  private static generateAuditSqc1(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_audit_sqc1_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p5_audit',
        chapterId: 'audit_nature_sqc',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (SQC 1 Quality Control)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'SQC 1 Retention of Working Papers',
        questionText: `Under SQC 1 (Quality Control for Firms that Perform Audits and Reviews), what is the minimum mandatory retention period for engagement documentation / audit working papers from the date of the auditor's report?`,
        trapNote: 'Companies Act mandates 8 years for company books of accounts, but SQC 1 mandates NO SHORTER THAN 7 YEARS for audit working paper documentation.',
        explanation: `Under SQC 1 Para 83, the retention period for audit documentation ordinarily is no shorter than seven years from the date of the auditor's report.`
      },
      `No shorter than 7 years from the date of the auditor's report`,
      [
        `Exactly 8 years from the close of the financial year`,
        `5 years from the date of the Annual General Meeting`,
        `3 years from the filing of income tax return`
      ]
    );
  }

  private static generateAuditCaro2020(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_audit_caro_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p5_audit',
        chapterId: 'company_audit',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (CARO 2020 Physical Inventory Clause)`,
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'CARO 2020 Clause 3(ii)(a)',
        questionText: `Under Clause 3(ii)(a) of CARO 2020, the auditor is required to state whether any discrepancies of ________ or more in the aggregate for each class of inventory were noticed during physical verification and whether they have been properly dealt with in books:`,
        trapNote: 'CARO 2020 specifies discrepancies of 10% or more in the aggregate for each class of inventory.',
        explanation: `Under CARO 2020 Clause 3(ii)(a), the auditor must report whether physical verification of inventory has been conducted at reasonable intervals by management, and whether any discrepancies of 10% or more in the aggregate for each class of inventory were noticed and properly dealt with.`
      },
      `10% or more in the aggregate for each class of inventory`,
      [
        `5% or more of total turnover`,
        `20% or more in aggregate`,
        `₹ 50 Lakhs regardless of percentage`
      ]
    );
  }

  private static generateAuditKamSa701(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_audit_kam_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p5_audit',
        chapterId: 'audit_report',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (SA 701 Key Audit Matters)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'SA 701 Communicating Key Audit Matters in Independent Auditor Report',
        questionText: `Under SA 701, the communication of "Key Audit Matters" (KAM) in the independent auditor's report is mandatorily applicable to:`,
        trapNote: 'SA 701 is mandatory for audits of complete sets of general purpose financial statements of LISTED entities, or when required by law/regulation.',
        explanation: `Under SA 701 Para 5, communicating Key Audit Matters is mandatory for audits of complete sets of general purpose financial statements of listed entities and in circumstances when the auditor otherwise decides to communicate key audit matters.`
      },
      `Audits of financial statements of all LISTED entities`,
      [
        `All private limited companies with turnover exceeding ₹ 10 Crores`,
        `Only Government companies audited by C&AG`,
        `Only banking and insurance companies`
      ]
    );
  }

  // =========================================================================
  // PAPER 6: FINANCIAL MANAGEMENT & STRATEGIC MANAGEMENT (WHOLE SYLLABUS)
  // =========================================================================
  private static generateFmSmMcq(): McqQuestion {
    const generators = [
      this.generateFmLeverages,
      this.generateFmCostOfCapital,
      this.generateFmCapitalBudgeting,
      this.generateFmRatios,
      this.generateFmWorkingCapital,
      this.generateFmDividendWalter,
      this.generateSmAnsoff,
      this.generateSmPorterGeneric,
      this.generateSmBcgMatrix,
      this.generateSmStrategicControl
    ];
    const pick = generators[Math.floor(Math.random() * generators.length)];
    return pick();
  }

  private static generateFmLeverages(): McqQuestion {
    const dol = [2, 2.5, 3][Math.floor(Math.random() * 3)];
    const dfl = [1.5, 1.6, 2][Math.floor(Math.random() * 3)];
    const dcl = Math.round(dol * dfl * 100) / 100;
    const salesChange = [5, 10, 15][Math.floor(Math.random() * 3)];
    const epsChange = Math.round(dcl * salesChange);

    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_fm_lev_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p6_fm_sm',
        chapterId: 'fm_leverages',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Combined Leverage DCL Multiplier)`,
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'DCL = DOL * DFL',
        questionText: `A firm has Degree of Operating Leverage (DOL) = ${dol} and Degree of Financial Leverage (DFL) = ${dfl}. If sales increase by ${salesChange}%, what will be the percentage change in Earnings Per Share (EPS)?`,
        trapNote: 'Combined Leverage is the product (DOL × DFL), not the sum (DOL + DFL).',
        explanation: `DCL = DOL × DFL = ${dol} × ${dfl} = ${dcl}. Percentage change in EPS = DCL × Percentage change in Sales = ${dcl} × ${salesChange}% = ${epsChange}%.`
      },
      `${epsChange}% increase in EPS (DCL = ${dcl})`,
      [
        `${Math.round((dol + dfl) * salesChange)}% increase (using sum DOL + DFL)`,
        `${Math.round(dol * salesChange)}% increase (using DOL only)`,
        `${Math.round(dfl * salesChange)}% increase (using DFL only)`
      ]
    );
  }

  private static generateFmCostOfCapital(): McqQuestion {
    const rf = 7; // %
    const beta = 1.2;
    const rm = 15; // %
    const rmMinusRf = rm - rf; // 8%
    const ke = rf + (beta * rmMinusRf); // 7 + 1.2*8 = 16.6%

    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_fm_ke_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p6_fm_sm',
        chapterId: 'fm_cost_capital',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (CAPM Cost of Equity)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'Ke = Rf + Beta * (Rm - Rf)',
        questionText: `Under the Capital Asset Pricing Model (CAPM), risk-free rate of return (Rf) is ${rf}%, market rate of return (Rm) is ${rm}%, and the company's equity beta is ${beta}. What is the Cost of Equity (Ke)?`,
        trapNote: 'Market Risk Premium is (Rm - Rf). Do not multiply Beta directly by Rm.',
        explanation: `Ke = Rf + Beta × (Rm - Rf) = ${rf}% + [${beta} × (${rm}% - ${rf}%)] = ${rf}% + [${beta} × ${rmMinusRf}%] = ${rf}% + ${(beta * rmMinusRf).toFixed(1)}% = ${ke.toFixed(1)}%.`
      },
      `${ke.toFixed(1)}%`,
      [
        `${(rf + beta * rm).toFixed(1)}% (Multiplying beta directly by Rm)`,
        `15.0% (Market return Rm)`,
        `12.5%`
      ]
    );
  }

  private static generateFmCapitalBudgeting(): McqQuestion {
    const pvInflows = 3600000;
    const initialOutflow = 3000000;
    const npv = pvInflows - initialOutflow; // 6,00,000
    const pi = Math.round((pvInflows / initialOutflow) * 100) / 100; // 1.20

    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_fm_npv_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p6_fm_sm',
        chapterId: 'fm_cap_budgeting',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (NPV and Profitability Index PI)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'PI = PV of Inflows / Initial Outlay',
        questionText: `A capital investment proposal requires an initial cash outlay of ₹ ${initialOutflow.toLocaleString('en-IN')}. The present value of future operating cash inflows discounted at the company's cost of capital is ₹ ${pvInflows.toLocaleString('en-IN')}. What is the Net Present Value (NPV) and Profitability Index (PI)?`,
        trapNote: 'NPV = PV of Inflows - Initial Outlay. PI = PV of Inflows / Initial Outlay. A project is acceptable if NPV > 0 and PI > 1.',
        explanation: `NPV = ₹ ${pvInflows.toLocaleString('en-IN')} - ₹ ${initialOutflow.toLocaleString('en-IN')} = + ₹ ${npv.toLocaleString('en-IN')}. PI = ₹ ${pvInflows.toLocaleString('en-IN')} / ₹ ${initialOutflow.toLocaleString('en-IN')} = ${pi.toFixed(2)}.`
      },
      `NPV = + ₹ ${npv.toLocaleString('en-IN')}; Profitability Index (PI) = ${pi.toFixed(2)}`,
      [
        `NPV = - ₹ ${npv.toLocaleString('en-IN')}; Profitability Index (PI) = 0.83`,
        `NPV = ₹ 66,00,000; Profitability Index = 2.20`,
        `NPV = ₹ 0; Profitability Index = 1.00`
      ]
    );
  }

  private static generateFmRatios(): McqQuestion {
    const ca = 800000;
    const cl = 400000;
    const inv = 200000;
    const cr = ca / cl; // 2.0
    const qr = (ca - inv) / cl; // 1.5

    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_fm_ratios_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p6_fm_sm',
        chapterId: 'fm_ratios',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Current & Quick Ratio)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'Quick Ratio = (Current Assets - Inventory - Prepaid) / Current Liabilities',
        questionText: `Current Assets of a firm are ₹ ${ca.toLocaleString('en-IN')}, Current Liabilities are ₹ ${cl.toLocaleString('en-IN')}, and Inventory is ₹ ${inv.toLocaleString('en-IN')}. What are the Current Ratio and Quick (Acid-Test) Ratio?`,
        trapNote: 'Quick Assets exclude Inventory and Prepaid expenses from Current Assets.',
        explanation: `Current Ratio = CA / CL = ₹ 8,00,000 / ₹ 4,00,000 = ${cr.toFixed(1)}:1. Quick Ratio = (CA - Inventory) / CL = (₹ 8,00,000 - ₹ 2,00,000) / ₹ 4,00,000 = ₹ 6,00,000 / ₹ 4,00,000 = ${qr.toFixed(1)}:1.`
      },
      `Current Ratio = ${cr.toFixed(1)}:1; Quick Ratio = ${qr.toFixed(1)}:1`,
      [
        `Current Ratio = 1.5:1; Quick Ratio = 2.0:1`,
        `Current Ratio = 2.5:1; Quick Ratio = 1.0:1`,
        `Current Ratio = 3.0:1; Quick Ratio = 2.5:1`
      ]
    );
  }

  private static generateFmWorkingCapital(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_fm_wc_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p6_fm_sm',
        chapterId: 'fm_working_capital',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Net Operating Cycle)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'Operating Cycle = Raw Material + WIP + Finished Goods + Debtors - Creditors',
        questionText: `A manufacturing firm has Raw Material Holding Period = 45 days, WIP Conversion Period = 15 days, Finished Goods Storage Period = 30 days, Debtors Collection Period = 40 days, and Creditors Payment Period = 50 days. What is the Net Operating Cycle?`,
        trapNote: 'Net Operating Cycle = Gross Operating Cycle (45 + 15 + 30 + 40 = 130 days) LESS Creditors Payment Period (50 days) = 80 days.',
        explanation: `Gross Operating Cycle = 45 + 15 + 30 + 40 = 130 days. Net Operating Cycle = Gross Operating Cycle - Creditors Payment Period = 130 - 50 = 80 days.`
      },
      `80 days`,
      [
        `130 days (Gross Operating Cycle)`,
        `180 days (Adding creditors instead of deducting)`,
        `60 days`
      ]
    );
  }

  private static generateFmDividendWalter(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_fm_walter_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p6_fm_sm',
        chapterId: 'fm_dividend',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Walter's Model Dividend Policy)`,
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'Walter Model Optimum Payout',
        questionText: `Under Walter's Dividend Model, for a GROWTH FIRM where internal rate of return exceeds cost of capital (r > Ke), what is the optimum dividend payout ratio to maximize market price of share?`,
        trapNote: 'For a Growth firm (r > Ke): optimum payout is ZERO (0%). For a Declining firm (r < Ke): optimum payout is 100%. For Normal firm (r = Ke): payout is indifferent.',
        explanation: `Under Walter's model, if r > Ke, the firm can earn higher returns than shareholders could earn elsewhere. Therefore, retention is maximized and the optimum dividend payout ratio is 0% (zero payout).`
      },
      `0% (Zero dividend payout, 100% retention)`,
      [
        `100% (Full dividend distribution)`,
        `50% (Balanced payout)`,
        `Dividend policy has no effect on share price (MM Model)`
      ]
    );
  }

  private static generateSmAnsoff(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_sm_ansoff_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p6_fm_sm',
        chapterId: 'sm_choices',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Ansoff Product-Market Growth Matrix)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'Ansoff Matrix',
        questionText: `Under the Ansoff Growth Matrix, which strategic growth quadrant involves selling EXISTING products into entirely NEW geographical or demographic markets?`,
        trapNote: 'Market Penetration = Existing product in Existing market; Market Development = Existing product in New market; Product Development = New product in Existing market; Diversification = New product in New market.',
        explanation: `Market Development consists of marketing present/existing products in new markets (such as expanding geographically or targeting new consumer segments).`
      },
      `Market Development`,
      [
        `Market Penetration`,
        `Product Development`,
        `Conglomerate Diversification`
      ]
    );
  }

  private static generateSmPorterGeneric(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_sm_porter_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p6_fm_sm',
        chapterId: 'sm_choices',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Porter's Generic Strategies)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'Michael Porter Generic Competitive Strategies',
        questionText: `According to Michael Porter, a strategy that seeks to achieve competitive advantage by offering unique features that are widely valued by customers across an entire industry is known as:`,
        trapNote: 'Cost Leadership aims for low cost broad market; Differentiation aims for uniqueness broad market; Focus aims for narrow segment.',
        explanation: `Differentiation strategy involves creating products or services that are perceived throughout the industry as unique, allowing the firm to command premium prices.`
      },
      `Differentiation Strategy`,
      [
        `Cost Leadership Strategy`,
        `Cost Focus Strategy`,
        `Differentiation Focus Strategy`
      ]
    );
  }

  private static generateSmBcgMatrix(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_sm_bcg_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p6_fm_sm',
        chapterId: 'sm_choices',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (BCG Growth-Share Matrix)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'BCG Growth-Share Matrix Quadrants',
        questionText: `In the Boston Consulting Group (BCG) Matrix, strategic business units (SBUs) that have a HIGH market share in a LOW-growth, mature industry are classified as:`,
        trapNote: 'Cash Cows: High market share, Low market growth. Stars: High share, High growth. Question Marks: Low share, High growth. Dogs: Low share, Low growth.',
        explanation: `Cash Cows are business units that have high relative market share in a slow-growth industry. They generate substantial cash surplus beyond what is needed for reinvestment, funding other SBUs.`
      },
      `Cash Cows`,
      [
        `Stars`,
        `Question Marks (Problem Children)`,
        `Dogs`
      ]
    );
  }

  private static generateSmStrategicControl(): McqQuestion {
    return QuestionGeneratorService.buildShuffledMcq(
      {
        id: `dyn_sm_control_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p6_fm_sm',
        chapterId: 'sm_exec',
        type: 'mcq',
        importance: 'HIGH',
        source: `ICAI Dynamic Variant (Types of Strategic Control)`,
        marks: 2,
        difficulty: 'Standard ICAI',
        icaiReference: 'Strategic Control Mechanisms',
        questionText: `Which type of strategic control is designed to systematically and continuously check whether the fundamental assumptions and premises on which the strategy was formulated remain valid over time?`,
        trapNote: 'Premise Control checks foundational planning assumptions (environmental and industry factors). Implementation Control checks milestone progress. Special Alert is for unexpected sudden crises.',
        explanation: `Premise Control is established to systematically and continuously check whether the assumptions and premises (e.g. GDP growth, inflation, competitor actions) established during strategy formulation remain valid.`
      },
      `Premise Control`,
      [
        `Implementation Control`,
        `Special Alert Control`,
        `Strategic Surveillance`
      ]
    );
  }

  // =========================================================================
  // DYNAMIC DESCRIPTIVE QUESTIONS GENERATOR (WHOLE SYLLABUS - 24+ TEMPLATES)
  // =========================================================================
  public static generateDynamicDescriptiveQuestion(topicKey?: string): DescriptiveQuestion {
    const generatorMap: Record<string, (() => DescriptiveQuestion)[]> = {
      accounts: [
        this.generateAs16BorrowingCostQuestion,
        this.generateAccountsAs10PPEQuestion,
        this.generateAccountsBuybackQuestion,
        this.generateAccountsAs20EpsQuestion
      ],
      p1_adv_acc: [
        this.generateAs16BorrowingCostQuestion,
        this.generateAccountsAs10PPEQuestion,
        this.generateAccountsBuybackQuestion,
        this.generateAccountsAs20EpsQuestion
      ],
      law: [
        this.generateLawCSRQuestion,
        this.generateLawQuorumQuestion,
        this.generateLawAuditorDisqualificationQuestion,
        this.generateLawPrivatePlacementQuestion
      ],
      p2_law: [
        this.generateLawCSRQuestion,
        this.generateLawQuorumQuestion,
        this.generateLawAuditorDisqualificationQuestion,
        this.generateLawPrivatePlacementQuestion
      ],
      tax: [
        this.generateIncomeTax115BACQuestion,
        this.generateTaxSection50CQuestion,
        this.generateTaxGstBlockedItcQuestion,
        this.generateTaxTdsDisallowanceQuestion
      ],
      p3_tax: [
        this.generateIncomeTax115BACQuestion,
        this.generateTaxSection50CQuestion,
        this.generateTaxGstBlockedItcQuestion,
        this.generateTaxTdsDisallowanceQuestion
      ],
      costing: [
        this.generateCostingVarianceQuestion,
        this.generateCostingMarginalCostingQuestion,
        this.generateCostingProcessQuestion,
        this.generateCostingAbcQuestion
      ],
      p4_costing: [
        this.generateCostingVarianceQuestion,
        this.generateCostingMarginalCostingQuestion,
        this.generateCostingProcessQuestion,
        this.generateCostingAbcQuestion
      ],
      audit: [
        this.generateAuditingSA705Question,
        this.generateAuditExternalConfirmationQuestion,
        this.generateAuditPhysicalInventoryQuestion,
        this.generateAuditFraudRiskQuestion
      ],
      p5_audit: [
        this.generateAuditingSA705Question,
        this.generateAuditExternalConfirmationQuestion,
        this.generateAuditPhysicalInventoryQuestion,
        this.generateAuditFraudRiskQuestion
      ],
      fm: [
        this.generateFmCapitalBudgetingQuestion,
        this.generateFmLeverageEbitEpsQuestion,
        this.generateFmWorkingCapitalQuestion,
        this.generateSmStrategicModelQuestion
      ],
      p6_fm_sm: [
        this.generateFmCapitalBudgetingQuestion,
        this.generateFmLeverageEbitEpsQuestion,
        this.generateFmWorkingCapitalQuestion,
        this.generateSmStrategicModelQuestion
      ]
    };

    if (topicKey && generatorMap[topicKey] && generatorMap[topicKey].length > 0) {
      const list = generatorMap[topicKey];
      return list[Math.floor(Math.random() * list.length)]();
    }

    // Pick from whole syllabus across all generators
    const allGenerators = [
      this.generateAs16BorrowingCostQuestion,
      this.generateAccountsAs10PPEQuestion,
      this.generateAccountsBuybackQuestion,
      this.generateAccountsAs20EpsQuestion,
      this.generateLawCSRQuestion,
      this.generateLawQuorumQuestion,
      this.generateLawAuditorDisqualificationQuestion,
      this.generateLawPrivatePlacementQuestion,
      this.generateIncomeTax115BACQuestion,
      this.generateTaxSection50CQuestion,
      this.generateTaxGstBlockedItcQuestion,
      this.generateTaxTdsDisallowanceQuestion,
      this.generateCostingVarianceQuestion,
      this.generateCostingMarginalCostingQuestion,
      this.generateCostingProcessQuestion,
      this.generateCostingAbcQuestion,
      this.generateAuditingSA705Question,
      this.generateAuditExternalConfirmationQuestion,
      this.generateAuditPhysicalInventoryQuestion,
      this.generateAuditFraudRiskQuestion,
      this.generateFmCapitalBudgetingQuestion,
      this.generateFmLeverageEbitEpsQuestion,
      this.generateFmWorkingCapitalQuestion,
      this.generateSmStrategicModelQuestion
    ];
    const randomIndex = Math.floor(Math.random() * allGenerators.length);
    return allGenerators[randomIndex]();
  }

  // Costing Variance Generator
  private static generateCostingVarianceQuestion(): DescriptiveQuestion {
    const stdRateA = 40;
    const stdRateB = 25;
    const actualUnits = 1400 + Math.floor(Math.random() * 5) * 70;
    const factor = actualUnits / 7;
    const sqA = factor * 3;
    const sqB = factor * 5;

    const actKgA = sqA + (Math.floor(Math.random() * 5) - 2) * 20;
    const actRateA = stdRateA + (Math.random() > 0.5 ? 2 : -2);
    const actKgB = sqB + (Math.floor(Math.random() * 5) - 1) * 30;
    const actRateB = stdRateB + (Math.random() > 0.5 ? 1 : -1);

    const mpvA = actKgA * (stdRateA - actRateA);
    const mpvB = actKgB * (stdRateB - actRateB);
    const totalMpv = mpvA + mpvB;

    const muvA = stdRateA * (sqA - actKgA);
    const muvB = stdRateB * (sqB - actKgB);
    const totalMuv = muvA + muvB;
    const totalMcv = totalMpv + totalMuv;

    return {
      id: `dyn_desc_cost_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p4_costing',
      chapterId: 'standard_costing',
      type: 'descriptive',
      importance: 'HIGH',
      source: `Dynamic ICAI Variant (Standard Costing - ${actualUnits} Units)`,
      marks: 10,
      difficulty: 'Examiner Favorite',
      icaiReference: 'Standard Costing Material Variance Rules',
      questionText: `Global Synthetics Ltd manufactures a chemical compound "Poly-Z". The standard mix to produce 7 kg of Poly-Z requires:
- Material Alpha: 3 kg @ ₹ ${stdRateA} per kg
- Material Beta: 5 kg @ ₹ ${stdRateB} per kg
Standard Input = 8 kg; Standard Loss = 1 kg (12.5%); Standard Output = 7 kg.

During the month, actual production was ${actualUnits} kg of Poly-Z.
Actual consumption of raw materials was:
- Material Alpha: ${actKgA} kg @ ₹ ${actRateA} per kg
- Material Beta: ${actKgB} kg @ ₹ ${actRateB} per kg

Required:
(i) Compute the Standard Quantity (SQ) of Material Alpha and Beta required for actual output.
(ii) Calculate Material Price Variance (MPV) for both materials.
(iii) Calculate Material Usage Variance (MUV) for both materials.
(iv) Calculate Material Cost Variance (MCV) and verify that MCV = MPV + MUV.`,
      rubrics: [
        {
          step: 'Standard Quantity Calculation for Actual Output',
          marks: 2,
          expectedKeywords: ['SQ Alpha', `${sqA} kg`, 'SQ Beta', `${sqB} kg`],
          description: `SQ = (Actual Output / 7) * Standard Input. SQ(Alpha) = ${sqA} kg, SQ(Beta) = ${sqB} kg.`
        },
        {
          step: 'Calculation of Material Price Variance',
          marks: 3,
          expectedKeywords: ['MPV = AQ * (SP - AP)', `Alpha: ₹ ${Math.abs(mpvA)}`, `Beta: ₹ ${Math.abs(mpvB)}`, totalMpv >= 0 ? 'Favourable' : 'Adverse'],
          description: `Calculate MPV for Alpha (₹ ${Math.abs(mpvA)}) and Beta (₹ ${Math.abs(mpvB)}).`
        },
        {
          step: 'Calculation of Material Usage Variance & Total MCV',
          marks: 5,
          expectedKeywords: ['MUV = SP * (SQ - AQ)', `Total MUV: ₹ ${Math.abs(totalMuv)}`, `Total MCV: ₹ ${Math.abs(totalMcv)}`, 'Verification MCV = MPV + MUV'],
          description: `Calculate MUV. Verify MCV = MPV + MUV. Total MCV = ₹ ${Math.abs(totalMcv)}.`
        }
      ],
      suggestedAnswer: `WORKING NOTES:
1. Standard Quantity for Actual Production of ${actualUnits} kg:
   - SQ for Alpha = (${actualUnits} / 7) × 3 = ${sqA} kg
   - SQ for Beta = (${actualUnits} / 7) × 5 = ${sqB} kg

2. Material Price Variance (MPV) = AQ × (SP - AP):
   - Alpha = ${actKgA} kg × (₹ ${stdRateA} - ₹ ${actRateA}) = ₹ ${Math.abs(mpvA)} (${mpvA >= 0 ? 'Favourable' : 'Adverse'})
   - Beta = ${actKgB} kg × (₹ ${stdRateB} - ₹ ${actRateB}) = ₹ ${Math.abs(mpvB)} (${mpvB >= 0 ? 'Favourable' : 'Adverse'})
   Total MPV = ₹ ${Math.abs(totalMpv)} (${totalMpv >= 0 ? 'Favourable' : 'Adverse'})

3. Material Usage Variance (MUV) = SP × (SQ - AQ):
   - Alpha = ₹ ${stdRateA} × (${sqA} - ${actKgA}) = ₹ ${Math.abs(muvA)} (${muvA >= 0 ? 'Favourable' : 'Adverse'})
   - Beta = ₹ ${stdRateB} × (${sqB} - ${actKgB}) = ₹ ${Math.abs(muvB)} (${muvB >= 0 ? 'Favourable' : 'Adverse'})
   Total MUV = ₹ ${Math.abs(totalMuv)} (${totalMuv >= 0 ? 'Favourable' : 'Adverse'})

4. Material Cost Variance (MCV) = Standard Cost - Actual Cost:
   Total MCV = MPV + MUV = ₹ ${Math.abs(totalMcv)} (${totalMcv >= 0 ? 'Favourable' : 'Adverse'}) [Reconciled Successfully].`
    };
  }

  // Tax 115BAC Generator
  private static generateIncomeTax115BACQuestion(): DescriptiveQuestion {
    const grossSalary = 1800000 + Math.floor(Math.random() * 6) * 100000;
    const stdDed = 75000;
    const netSalary = grossSalary - stdDed;
    const interestSavings = 30000;
    const grossTotalIncome = netSalary + interestSavings;

    const incomeAbove15L = Math.max(0, grossTotalIncome - 1500000);
    const taxAbove15L = incomeAbove15L * 0.30;
    const baseTax = 150000 + taxAbove15L;
    const cess = Math.round(baseTax * 0.04);
    const totalTax = baseTax + cess;

    return {
      id: `dyn_desc_tax_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p3_tax',
      chapterId: 'total_income_comp',
      type: 'descriptive',
      importance: 'HIGH',
      source: `Dynamic ICAI Variant (Section 115BAC Tax Computation)`,
      marks: 8,
      difficulty: 'Examiner Favorite',
      icaiReference: 'Section 115BAC(1A) & Section 16(ia)',
      questionText: `Mr. Siddharth (aged 42 years, resident) is employed as a Senior Finance Manager. For Assessment Year 2024-25, his particulars are:
- Gross Salary: ₹ ${grossSalary.toLocaleString('en-IN')}
- Savings Bank Interest from SBI: ₹ ${interestSavings.toLocaleString('en-IN')}
- Contribution to PPF: ₹ 1,50,000
- Mediclaim premium paid by cheque: ₹ 32,000

He opts for the default new tax regime under Section 115BAC(1A).
Required:
(i) Compute his Total Taxable Income for AY 2024-25.
(ii) Compute the Net Tax Liability payable including Health and Education Cess.
(iii) State which deductions (PPF, Mediclaim) are admissible or inadmissible under Section 115BAC.`,
      rubrics: [
        {
          step: 'Computation of Gross Total Income under Section 115BAC',
          marks: 3,
          expectedKeywords: ['Standard Deduction Section 16(ia)', '₹ 75,000', `Net Salary: ₹ ${netSalary.toLocaleString('en-IN')}`, 'Income from Other Sources', `GTI: ₹ ${grossTotalIncome.toLocaleString('en-IN')}`],
          mandatoryCitations: ['Section 115BAC', 'Section 16(ia)'],
          description: `Allow standard deduction ₹ 75,000. Add bank interest. Total Income = ₹ ${grossTotalIncome.toLocaleString('en-IN')}.`
        },
        {
          step: 'Disallowance of Chapter VI-A Deductions',
          marks: 2,
          expectedKeywords: ['Section 80C disallowed', 'Section 80D disallowed', 'inadmissible under 115BAC'],
          description: 'Explicitly state that 80C (PPF) and 80D (Mediclaim) are not allowable under default regime.'
        },
        {
          step: 'Calculation of Tax Liability & 4% Cess',
          marks: 3,
          expectedKeywords: ['Slab Rates', 'Tax up to ₹ 15 Lakhs = ₹ 1,50,000', `30% on excess: ₹ ${taxAbove15L.toLocaleString('en-IN')}`, 'Health and Education Cess 4%', `Total Tax: ₹ ${totalTax.toLocaleString('en-IN')}`],
          description: `Calculate slab tax + 4% cess. Total Tax Payable = ₹ ${totalTax.toLocaleString('en-IN')}.`
        }
      ],
      suggestedAnswer: `COMPUTATION OF TOTAL INCOME & TAX LIABILITY (AY 2024-25)
[Opting for Default Tax Regime under Section 115BAC(1A)]

1. Income from Salaries:
   - Gross Salary = ₹ ${grossSalary.toLocaleString('en-IN')}
   - Less: Standard Deduction u/s 16(ia) = ₹ ${stdDed.toLocaleString('en-IN')}
   Net Taxable Salary = ₹ ${netSalary.toLocaleString('en-IN')}

2. Income from Other Sources:
   - Savings Bank Interest = ₹ ${interestSavings.toLocaleString('en-IN')}
   Gross Total Income = ₹ ${grossTotalIncome.toLocaleString('en-IN')}

3. Deductions under Chapter VI-A:
   - Section 80C (PPF): NIL (Disallowed under Section 115BAC)
   - Section 80D (Mediclaim): NIL (Disallowed under Section 115BAC)
   Total Taxable Income = ₹ ${grossTotalIncome.toLocaleString('en-IN')}

4. Tax on Total Income under Section 115BAC(1A):
   - Up to ₹ 15,00,000 = ₹ 1,50,000
   - Balance above ₹ 15,00,000 @ 30% = ₹ ${taxAbove15L.toLocaleString('en-IN')}
   Base Tax = ₹ ${baseTax.toLocaleString('en-IN')}
   Add: Health and Education Cess @ 4% = ₹ ${cess.toLocaleString('en-IN')}
   Total Tax Liability = ₹ ${totalTax.toLocaleString('en-IN')}.`
    };
  }

  // Law CSR Generator
  private static generateLawCSRQuestion(): DescriptiveQuestion {
    const netProfits = [Math.floor(Math.random() * 4) + 4, Math.floor(Math.random() * 4) + 6, Math.floor(Math.random() * 4) + 8];
    const avgProfit = Math.round(((netProfits[0] + netProfits[1] + netProfits[2]) / 3) * 100) / 100;
    const csrAmountLakhs = Math.round((avgProfit * 0.02 * 100) * 100) / 100;

    return {
      id: `dyn_desc_law_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p2_law',
      chapterId: 'accounts_csr',
      type: 'descriptive',
      importance: 'HIGH',
      source: `Dynamic ICAI Variant (CSR Section 135 & Unspent Rules)`,
      marks: 6,
      difficulty: 'Examiner Favorite',
      icaiReference: 'Section 135 Companies Act, 2013',
      questionText: `Vardhman Textiles Ltd had Net Profits calculated under Section 198 for the preceding three financial years:
- Year 1: ₹ ${netProfits[0]} Crores
- Year 2: ₹ ${netProfits[1]} Crores
- Year 3: ₹ ${netProfits[2]} Crores
Turnover is ₹ 1,100 Crores.

Required:
(i) Examine if Section 135 applies to the company.
(ii) Calculate the statutory CSR expenditure required for the current financial year.
(iii) If ₹ 5 Lakhs remains unspent at the end of the year relating to an ongoing project, explain the statutory mechanism under Section 135(6).`,
      rubrics: [
        {
          step: 'Applicability Test under Section 135(1)',
          marks: 2,
          expectedKeywords: ['Section 135(1)', 'Turnover >= 1000 Cr', 'Net profit >= 5 Cr', 'Applicable'],
          mandatoryCitations: ['Section 135(1)'],
          description: 'Company satisfies both Turnover (>1000 Cr) and Net Profit (>5 Cr) thresholds.'
        },
        {
          step: 'CSR Expenditure Computation',
          marks: 2,
          expectedKeywords: [`Average Net Profit = ₹ ${avgProfit} Crores`, `2% = ₹ ${csrAmountLakhs} Lakhs`],
          description: `Average profit = ₹ ${avgProfit} Cr. 2% = ₹ ${csrAmountLakhs} Lakhs.`
        },
        {
          step: 'Unspent Ongoing Project Compliance',
          marks: 2,
          expectedKeywords: ['Section 135(6)', '30 days from FY end', 'Unspent CSR Account', '3 financial years', 'Schedule VII Fund'],
          mandatoryCitations: ['Section 135(6)'],
          description: 'Transfer unspent balance to Unspent CSR account within 30 days and spend within 3 FYs.'
        }
      ],
      suggestedAnswer: `1. Applicability under Section 135(1):
Section 135(1) applies to every company having Net Worth >= ₹ 500 Cr, Turnover >= ₹ 1,000 Cr, or Net Profit >= ₹ 5 Cr in the immediately preceding financial year.
Vardhman Textiles Ltd has Turnover of ₹ 1,100 Crores (exceeding ₹ 1,000 Cr) and Net Profit of Year 3 of ₹ ${netProfits[2]} Crores (exceeding ₹ 5 Cr). Hence, CSR applies mandatorily.

2. Statutory CSR Expenditure [Section 135(5)]:
- Total Net Profit of preceding 3 years = ₹ ${netProfits[0] + netProfits[1] + netProfits[2]} Crores.
- Average Net Profit = ₹ ${avgProfit} Crores.
- Minimum CSR Spend = 2% of ₹ ${avgProfit} Crores = ₹ ${csrAmountLakhs} Lakhs.

3. Treatment of Unspent Ongoing Project [Section 135(6)]:
The unspent amount of ₹ 5 Lakhs must be transferred to a special bank account called "Unspent Corporate Social Responsibility Account" within 30 days from the end of the financial year (i.e. by 30th April). It must be spent on the ongoing project within 3 financial years, failing which it must be transferred to a Fund specified in Schedule VII.`
    };
  }

  // Auditing SA 705 Generator
  private static generateAuditingSA705Question(): DescriptiveQuestion {
    return {
      id: `dyn_desc_audit_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p5_audit',
      chapterId: 'audit_report',
      type: 'descriptive',
      importance: 'HIGH',
      source: `Dynamic ICAI Variant (SA 705 Modification of Opinion)`,
      marks: 5,
      difficulty: 'Examiner Favorite',
      icaiReference: 'SA 705 (Revised)',
      questionText: `During the statutory audit of Horizon Infotech Ltd, the auditor noted an unrecorded liability on an arbitral dispute amounting to ₹ 85 Lakhs. The company's Profit Before Tax is ₹ 60 Lakhs. Audit materiality was established at ₹ 15 Lakhs. Management declines to record any adjustment.
Examine the nature of the misstatement and determine the specific type of audit opinion to be issued under SA 705 (Revised), detailing the reasons and report structure.`,
      rubrics: [
        {
          step: 'Evaluation of Materiality and Pervasiveness',
          marks: 2,
          expectedKeywords: ['Materiality', 'Exceeds ₹ 15 Lakhs', 'Pervasive', 'SA 705'],
          mandatoryCitations: ['SA 705'],
          description: 'Misstatement ₹ 85L > Materiality ₹ 15L and turns profit into loss (pervasive).'
        },
        {
          step: 'Determination of Audit Opinion',
          marks: 2,
          expectedKeywords: ['Adverse Opinion', 'sufficient appropriate audit evidence'],
          description: 'Express Adverse Opinion.'
        },
        {
          step: 'Reporting Requirements & Heading',
          marks: 1,
          expectedKeywords: ['Basis for Adverse Opinion', 'quantification of financial effect'],
          description: 'Include Basis for Adverse Opinion section immediately following opinion.'
        }
      ],
      suggestedAnswer: `1. Assessment of Misstatement under SA 705 (Revised):
- Audit Planning Materiality = ₹ 15 Lakhs.
- Identified Misstatement = ₹ 85 Lakhs.
- Since ₹ 85 Lakhs exceeds the entire Profit Before Tax of ₹ 60 Lakhs, it fundamentally distorts the financial statements from a profit into a substantial net loss. Hence, the misstatement is BOTH MATERIAL AND PERVASIVE.

2. Audit Opinion to be Formulated:
The auditor must issue an ADVERSE OPINION.

3. Structure of Audit Report:
- Use heading: "Adverse Opinion".
- State that the financial statements do not give a true and fair view.
- Include a "Basis for Adverse Opinion" section immediately after the opinion, quantifying the exact impact.`
    };
  }

  // FM Capital Budgeting Generator
  private static generateFmCapitalBudgetingQuestion(): DescriptiveQuestion {
    const cost = 2000000;
    const scrap = 200000;
    const life = 4;
    const dep = (cost - scrap) / life;
    const ebdt = 750000;
    const pbt = ebdt - dep;
    const pat = pbt * 0.75;
    const cfat = pat + dep;

    return {
      id: `dyn_desc_fm_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p6_fm_sm',
      chapterId: 'fm_cap_budgeting',
      type: 'descriptive',
      importance: 'HIGH',
      source: `Dynamic ICAI Variant (Cash Flow After Tax & Capital Budgeting)`,
      marks: 6,
      difficulty: 'Standard ICAI',
      icaiReference: 'Capital Budgeting Cash Flow Estimation',
      questionText: `A manufacturing firm plans to install an automated packaging system costing ₹ ${cost.toLocaleString('en-IN')}. Useful life is ${life} years with estimated salvage value of ₹ ${scrap.toLocaleString('en-IN')}. Straight Line Depreciation is followed.
Annual Earnings Before Depreciation and Tax (EBDT) generated will be ₹ ${ebdt.toLocaleString('en-IN')}. The corporate tax rate is 25%.
Required:
(i) Calculate annual depreciation.
(ii) Compute the annual Operating Cash Flow After Tax (CFAT).
(iii) Compute the Terminal Cash Inflow at the end of Year ${life}.`,
      rubrics: [
        {
          step: 'Annual Depreciation Calculation',
          marks: 2,
          expectedKeywords: ['SLM Depreciation', `₹ ${dep.toLocaleString('en-IN')}`],
          description: `Depreciation = (${cost} - ${scrap}) / ${life} = ₹ ${dep.toLocaleString('en-IN')} p.a.`
        },
        {
          step: 'Operating CFAT Computation',
          marks: 3,
          expectedKeywords: ['PBT', 'Tax 25%', `PAT: ₹ ${pat.toLocaleString('en-IN')}`, `CFAT = PAT + Dep = ₹ ${cfat.toLocaleString('en-IN')}`],
          description: `CFAT = (EBDT - Dep)*(1 - t) + Dep = ₹ ${cfat.toLocaleString('en-IN')}.`
        },
        {
          step: 'Terminal Year Inflow',
          marks: 1,
          expectedKeywords: ['Salvage Value', `Total Terminal = ₹ ${(cfat + scrap).toLocaleString('en-IN')}`],
          description: `Add salvage value to final year CFAT.`
        }
      ],
      suggestedAnswer: `1. Annual Depreciation (SLM Method):
- Initial Cost = ₹ ${cost.toLocaleString('en-IN')}; Less: Salvage = ₹ ${scrap.toLocaleString('en-IN')}
- Annual Depreciation = ₹ ${(cost - scrap).toLocaleString('en-IN')} / ${life} = ₹ ${dep.toLocaleString('en-IN')} p.a.

2. Annual Operating Cash Flow After Tax (CFAT):
- EBDT = ₹ ${ebdt.toLocaleString('en-IN')}
- Less: Depreciation = ₹ ${dep.toLocaleString('en-IN')} ➔ PBT = ₹ ${pbt.toLocaleString('en-IN')}
- Less: Tax @ 25% = ₹ ${pbt * 0.25} ➔ PAT = ₹ ${pat.toLocaleString('en-IN')}
- Add: Non-Cash Depreciation = ₹ ${dep.toLocaleString('en-IN')}
Annual Operating CFAT = ₹ ${cfat.toLocaleString('en-IN')}

3. Terminal Cash Inflow at End of Year ${life}:
- Operating CFAT + Scrap Value (₹ ${scrap.toLocaleString('en-IN')}) = ₹ ${(cfat + scrap).toLocaleString('en-IN')}.`
    };
  }

  // Accounts AS 16 Generator
  private static generateAs16BorrowingCostQuestion(): DescriptiveQuestion {
    const loan = 8000000;
    const rate = 12;
    const interestIncome = 65000;
    const activeMonths = 8;
    const interestTotal = (loan * (rate / 100) * activeMonths) / 12;
    const netCapitalized = interestTotal - interestIncome;

    return {
      id: `dyn_desc_acc_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p1_adv_acc',
      chapterId: 'as_ppe_dep',
      type: 'descriptive',
      importance: 'HIGH',
      source: `Dynamic ICAI Variant (AS 16 Borrowing Costs Capitalization)`,
      marks: 5,
      difficulty: 'Examiner Favorite',
      icaiReference: 'AS 16 Borrowing Costs - Para 6 & 10',
      questionText: `Kiran Refineries Ltd obtained a specific loan of ₹ ${loan.toLocaleString('en-IN')} at ${rate}% p.a. for construction of a chemical cracking unit (a qualifying asset). Construction began on 1st August and was completed on 31st March (${activeMonths} months).
During construction, temporarily surplus loan funds placed in short-term deposits earned ₹ ${interestIncome.toLocaleString('en-IN')}.
Compute the borrowing cost to be capitalized to the cracking unit as per AS 16 and explain the accounting principle.`,
      rubrics: [
        {
          step: 'AS 16 Principle for Specific Borrowings',
          marks: 2,
          expectedKeywords: ['AS 16', 'Specific Borrowing', 'Less any investment income on temporary investment'],
          mandatoryCitations: ['AS 16'],
          description: 'State that borrowing cost capitalized is actual interest less temporary income.'
        },
        {
          step: 'Numerical Calculation of Capitalizable Borrowing Cost',
          marks: 3,
          expectedKeywords: [`Interest for ${activeMonths} months = ₹ ${interestTotal.toLocaleString('en-IN')}`, `Net Capitalized = ₹ ${netCapitalized.toLocaleString('en-IN')}`],
          description: `Capitalized = ₹ ${interestTotal.toLocaleString('en-IN')} - ₹ ${interestIncome.toLocaleString('en-IN')} = ₹ ${netCapitalized.toLocaleString('en-IN')}.`
        }
      ],
      suggestedAnswer: `1. Principle as per AS 16 "Borrowing Costs":
Under AS 16, borrowing costs eligible for capitalization on a specific borrowing should be determined as actual borrowing costs incurred during the period less any investment income on temporary investment of those borrowings.

2. Calculation of Borrowing Cost to be Capitalized:
- Specific Loan Principal = ₹ ${loan.toLocaleString('en-IN')} @ ${rate}% p.a.
- Gross Interest for ${activeMonths} months = ₹ ${interestTotal.toLocaleString('en-IN')}
- Less: Temporary investment income = ₹ ${interestIncome.toLocaleString('en-IN')}
- Net Borrowing Cost to be Capitalized = ₹ ${netCapitalized.toLocaleString('en-IN')}.`
    };
  }

  // Accounts AS 10 Revaluation & Impairment
  private static generateAccountsAs10PPEQuestion(): DescriptiveQuestion {
    const cost = 3000000;
    const life = 10;
    const depYear1 = cost / life;
    const depYear2 = cost / life;
    const wdvEndYear2 = cost - depYear1 - depYear2;
    const revaluedAmt = 2800000;
    const revalReserve = revaluedAmt - wdvEndYear2;
    const remLife = 8;
    const revDepYear3 = revaluedAmt / remLife;
    const wdvEndYear3 = revaluedAmt - revDepYear3;
    const recoverableAmt = 2100000;
    const impairmentLoss = wdvEndYear3 - recoverableAmt;
    const adjustedRevalReserve = Math.min(impairmentLoss, revalReserve);
    const chargedToPL = impairmentLoss - adjustedRevalReserve;

    return {
      id: `dyn_desc_as10_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p1_adv_acc',
      chapterId: 'as_ppe_dep',
      type: 'descriptive',
      importance: 'HIGH',
      source: 'ICAI Exam Style: AS 10 (PPE) Revaluation & Impairment',
      marks: 8,
      difficulty: 'Examiner Favorite',
      icaiReference: 'AS 10 (Revised) Property, Plant and Equipment - Paras 34 to 42',
      questionText: `Zenith Heavy Industries Ltd purchased a plant on 1st April 2021 for ₹ ${cost.toLocaleString('en-IN')}. The expected useful life is ${life} years with NIL residual value under SLM.
On 31st March 2023 (after 2 years), the company revalued the plant upwards to ₹ ${revaluedAmt.toLocaleString('en-IN')}.
On 31st March 2024 (end of Year 3), an impairment test indicated the plant's recoverable amount is ₹ ${recoverableAmt.toLocaleString('en-IN')}.
Required:
(i) Calculate the Revaluation Surplus credited to Revaluation Reserve on 31st March 2023.
(ii) Compute revised depreciation for the year ended 31st March 2024.
(iii) Compute the impairment loss and state its accounting treatment in Revaluation Reserve and Profit & Loss Account.`,
      rubrics: [
        {
          step: 'Revaluation Surplus Calculation (31st March 2023)',
          marks: 2,
          expectedKeywords: [`WDV before revaluation: ₹ ${wdvEndYear2.toLocaleString('en-IN')}`, `Revaluation Reserve = ₹ ${revalReserve.toLocaleString('en-IN')}`],
          mandatoryCitations: ['AS 10'],
          description: `WDV = ₹ ${cost} - ₹ ${depYear1 + depYear2} = ₹ ${wdvEndYear2}. Surplus = ₹ ${revaluedAmt} - ₹ ${wdvEndYear2} = ₹ ${revalReserve}.`
        },
        {
          step: 'Revised Depreciation for Year 3',
          marks: 3,
          expectedKeywords: [`Remaining useful life = ${remLife} years`, `Depreciation = ₹ ${revDepYear3.toLocaleString('en-IN')}`, `Carrying amount before impairment = ₹ ${wdvEndYear3.toLocaleString('en-IN')}`],
          description: `Revised depreciation = ₹ ${revaluedAmt} / ${remLife} = ₹ ${revDepYear3}. Carrying Amount = ₹ ${wdvEndYear3}.`
        },
        {
          step: 'Accounting for Impairment under AS 10 & AS 28',
          marks: 3,
          expectedKeywords: [`Total Impairment Loss = ₹ ${impairmentLoss.toLocaleString('en-IN')}`, `Debited to Revaluation Reserve = ₹ ${adjustedRevalReserve.toLocaleString('en-IN')}`, `Charged to P&L = ₹ ${chargedToPL.toLocaleString('en-IN')}`],
          description: `Impairment loss of ₹ ${impairmentLoss} first offsets Revaluation Reserve of ₹ ${adjustedRevalReserve}, balance ₹ ${chargedToPL} charged to P&L.`
        }
      ],
      suggestedAnswer: `1. Revaluation on 31st March 2023:
- Initial Cost (1st April 2021) = ₹ ${cost.toLocaleString('en-IN')}
- Accumulated SLM Depreciation for 2 Years = 2 × ₹ ${depYear1.toLocaleString('en-IN')} = ₹ ${(depYear1 + depYear2).toLocaleString('en-IN')}
- Carrying Amount (WDV) = ₹ ${wdvEndYear2.toLocaleString('en-IN')}
- Upward Revalued Amount = ₹ ${revaluedAmt.toLocaleString('en-IN')}
- Upward Revaluation Surplus credited to Revaluation Reserve = ₹ ${revalReserve.toLocaleString('en-IN')}.

2. Revised Depreciation for FY 2023-24:
- Remaining Useful Life = ${life} - 2 = ${remLife} years
- Revised Annual Depreciation = ₹ ${revaluedAmt.toLocaleString('en-IN')} / ${remLife} = ₹ ${revDepYear3.toLocaleString('en-IN')}
- Carrying Amount as on 31st March 2024 before Impairment = ₹ ${wdvEndYear3.toLocaleString('en-IN')}.

3. Impairment Loss & Accounting Treatment:
- Recoverable Amount = ₹ ${recoverableAmt.toLocaleString('en-IN')}
- Impairment Loss = Carrying Amount (₹ ${wdvEndYear3.toLocaleString('en-IN')}) - Recoverable Amount (₹ ${recoverableAmt.toLocaleString('en-IN')}) = ₹ ${impairmentLoss.toLocaleString('en-IN')}
- As per AS 10 (Revised), any downward revaluation/impairment must first be debited to Revaluation Reserve to the extent of credit balance existing for that asset (₹ ${adjustedRevalReserve.toLocaleString('en-IN')}).
- The excess impairment loss of ₹ ${chargedToPL.toLocaleString('en-IN')} must be charged to the Statement of Profit and Loss.`
    };
  }

  // Accounts Section 68 Buy-Back 3-Tier Limits
  private static generateAccountsBuybackQuestion(): DescriptiveQuestion {
    return {
      id: `dyn_desc_buyback_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p1_adv_acc',
      chapterId: 'company_accounts_buyback',
      type: 'descriptive',
      importance: 'HIGH',
      source: 'ICAI Exam Style: Section 68 Buy-Back of Shares Tests',
      marks: 10,
      difficulty: 'Examiner Favorite',
      icaiReference: 'Section 68, Companies Act, 2013 & Rule 17 of Companies (Share Capital & Debentures) Rules',
      questionText: `The Balance Sheet of Pragati Ltd as on 31st March shows:
- Paid-up Equity Share Capital (10,00,000 shares of ₹ 10 each): ₹ 1,00,00,000
- Securities Premium: ₹ 40,00,000
- General Reserve: ₹ 60,00,000
- Profit and Loss Account (Credit): ₹ 20,00,000
- 12% Secured Debentures (Long-term debt): ₹ 2,00,00,000
- Current Liabilities: ₹ 50,00,000

The company decides to buy back maximum possible equity shares at ₹ 30 per share (including ₹ 20 premium per share).
Required:
(i) Compute the maximum number of equity shares that can be bought back applying the three statutory tests under Section 68:
    1. Share Limit Test (25% rule)
    2. Resource Test (25% rule)
    3. Debt-Equity Ratio Test (Post-buyback debt <= 2 * equity)
(ii) State the statutory journal entry for creation of Capital Redemption Reserve (CRR).`,
      rubrics: [
        {
          step: 'Share Limit Test (25% of Total Shares)',
          marks: 2,
          expectedKeywords: ['25% of 10,00,000 shares = 2,50,000 shares'],
          mandatoryCitations: ['Section 68(2)(c)'],
          description: 'Share limit is 25% of existing equity shares = 2,50,000 shares.'
        },
        {
          step: 'Resource Test (25% of Paid-up Capital + Free Reserves)',
          marks: 3,
          expectedKeywords: ['Total Owned Funds = ₹ 2,20,00,000', '25% limit = ₹ 55,00,000', 'Shares = 55,00,000 / 30 = 1,83,333 shares'],
          mandatoryCitations: ['Section 68(2)(b)'],
          description: 'Resource limit = 25% of (100L + 40L + 60L + 20L) = ₹ 55 Lakhs. Max shares at ₹ 30 = 1,83,333 shares.'
        },
        {
          step: 'Debt-Equity Ratio Test (2:1 Post Buy-Back)',
          marks: 3,
          expectedKeywords: ['Minimum Equity Required = Debt / 2', 'Debt = ₹ 2,00,00,000', 'Minimum Equity = ₹ 1,00,00,000', 'Maximum Buy-Back Permitted'],
          mandatoryCitations: ['Section 68(2)(d)'],
          description: 'Post-buyback debt/equity cannot exceed 2:1. Maximum shares permissible under Debt-Equity test.'
        },
        {
          step: 'Capital Redemption Reserve (CRR) Principle',
          marks: 2,
          expectedKeywords: ['Section 69', 'Capital Redemption Reserve', 'Nominal value of shares bought back out of free reserves'],
          mandatoryCitations: ['Section 69'],
          description: 'Transfer sum equal to nominal value of shares bought back out of free reserves to CRR.'
        }
      ],
      suggestedAnswer: `1. Three Statutory Tests under Section 68 of the Companies Act, 2013:

(a) Share Limit Test [Section 68(2)(c)]:
- 25% of total paid-up equity shares = 25% of 10,00,000 shares = 2,50,000 Shares.

(b) Resource Test [Section 68(2)(b)]:
- Paid-up Equity Capital = ₹ 1,00,00,000
- Free Reserves (Securities Premium ₹ 40L + General Reserve ₹ 60L + P&L ₹ 20L) = ₹ 1,20,00,000
- Total Owned Funds = ₹ 2,20,00,000
- Maximum allowable outlay = 25% of ₹ 2,20,00,000 = ₹ 55,00,000
- Maximum shares at ₹ 30 offer price = ₹ 55,00,000 / ₹ 30 = 1,83,333 Shares.

(c) Debt-Equity Ratio Test [Section 68(2)(d)]:
- Post-buyback Debt / Equity must not exceed 2:1.
- Total Debt (Secured Debentures) = ₹ 2,00,00,000.
- Minimum Equity required post buy-back = ₹ 2,00,00,000 / 2 = ₹ 1,00,00,000.
- Present Equity Funds = ₹ 2,20,00,000.
- Maximum permissible reduction in equity = ₹ 2,20,00,000 - ₹ 1,00,00,000 = ₹ 1,20,00,000.
- Let N be number of shares. Total reduction = N × (Offer Price + Nominal Value for CRR if out of free reserves).
- Max shares = ₹ 1,20,00,000 / (₹ 30 + ₹ 10) = 3,00,000 shares.

(d) Conclusion:
The least of the three tests is the Resource Test = 1,83,333 Equity Shares.

2. Capital Redemption Reserve under Section 69:
Nominal value of 1,83,333 shares @ ₹ 10 = ₹ 18,33,330 must be transferred to CRR Account from General Reserve/P&L Account.`
    };
  }

  // Accounts AS 20 Basic & Diluted EPS
  private static generateAccountsAs20EpsQuestion(): DescriptiveQuestion {
    return {
      id: `dyn_desc_as20_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p1_adv_acc',
      chapterId: 'as_revenue_eps',
      type: 'descriptive',
      importance: 'HIGH',
      source: 'ICAI Exam Style: AS 20 Basic & Diluted EPS with Bonus Issue',
      marks: 8,
      difficulty: 'Examiner Favorite',
      icaiReference: 'AS 20 Earnings Per Share - Paras 15, 26, 31',
      questionText: `Supreme Biotech Ltd reports Net Profit attributable to equity shareholders of ₹ 60,00,000 for the year ended 31st March 2024.
Information regarding shares and debentures:
- Opening equity shares on 1st April 2023: 10,00,000 shares of ₹ 10 each.
- Bonus issue of 1 share for every 5 shares held was made on 1st November 2023.
- The company had issued 20,000 10% Convertible Debentures of ₹ 100 each on 1st April 2023, each convertible into 4 equity shares.
- Applicable Corporate Tax rate is 25%.

Required:
(i) Calculate Basic EPS for the year ended 31st March 2024 as per AS 20.
(ii) Calculate Diluted EPS for the year ended 31st March 2024.`,
      rubrics: [
        {
          step: 'Weighted Average Number of Shares for Basic EPS',
          marks: 3,
          expectedKeywords: ['Bonus shares treated retrospectively from beginning', '12,00,000 shares', 'WANES = 12,00,000'],
          mandatoryCitations: ['AS 20'],
          description: 'Bonus shares (2,00,000) are included as if issued on 1st April 2023. WANES = 12,00,000 shares.'
        },
        {
          step: 'Basic EPS Computation',
          marks: 2,
          expectedKeywords: ['Basic EPS = ₹ 5.00 per share', '₹ 60,00,000 / 12,00,000'],
          description: 'Basic EPS = 60,00,000 / 12,00,000 = ₹ 5.00 per share.'
        },
        {
          step: 'Diluted EPS Adjustment & Computation',
          marks: 3,
          expectedKeywords: ['Interest saved on conversion: ₹ 2,00,000', 'After-tax interest saving: ₹ 1,50,000', 'Adjusted Net Profit: ₹ 61,50,000', 'Incremental shares = 80,000', 'Diluted EPS = ₹ 4.80 per share'],
          description: 'Add after-tax interest saved (₹ 1.5L) to numerator, add 80,000 potential equity shares to denominator. Diluted EPS = ₹ 4.80.'
        }
      ],
      suggestedAnswer: `1. Computation of Basic EPS as per AS 20:
- Opening Equity Shares = 10,00,000
- Bonus Issue (1 for 5) = 10,00,000 / 5 = 2,00,000 shares.
- Principle: As per AS 20, bonus shares do not bring any inflow of cash resources, hence they are treated as if they were in issue from the earliest reporting period (i.e. retrospectively from 1st April 2023).
- Weighted Average Number of Equity Shares (WANES) = 10,00,000 + 2,00,000 = 12,00,000 Shares.
- Basic EPS = Net Profit attributable to Equity Shareholders / WANES
  Basic EPS = ₹ 60,00,000 / 12,00,000 = ₹ 5.00 per share.

2. Computation of Diluted EPS:
- Potential Equity Shares from Debentures = 20,000 Debentures × 4 = 80,000 shares.
- Total Diluted WANES = 12,00,000 + 80,000 = 12,80,000 shares.
- Debenture Interest saved if converted = 20,000 × ₹ 100 × 10% = ₹ 2,00,000.
- Net of Tax Interest Saved = ₹ 2,00,000 × (1 - 0.25) = ₹ 1,50,000.
- Adjusted Earnings attributable to Equity Shareholders = ₹ 60,00,000 + ₹ 1,50,000 = ₹ 61,50,000.
- Diluted EPS = ₹ 61,50,000 / 12,80,000 shares = ₹ 4.80 per share.
Since Diluted EPS (₹ 4.80) is less than Basic EPS (₹ 5.00), the debentures are dilutive.`
    };
  }

  // Law Section 103 Quorum for General Meetings
  private static generateLawQuorumQuestion(): DescriptiveQuestion {
    return {
      id: `dyn_desc_quorum_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p2_law',
      chapterId: 'mgmt_admin',
      type: 'descriptive',
      importance: 'HIGH',
      source: 'ICAI Exam Style: Section 103 Quorum & Consequences of Absence',
      marks: 6,
      difficulty: 'Examiner Favorite',
      icaiReference: 'Section 103, Companies Act, 2013',
      questionText: `Royal Lifestyle Ltd is a public limited company having 3,200 members as of the date of the meeting. The Annual General Meeting was called at 11:00 AM on 25th September.
At 11:30 AM, only 11 members were personally present.
Required:
(i) State the quorum required for a general meeting of a public company under Section 103.
(ii) What is the consequence if the required quorum is not present within half an hour from the appointed time?
(iii) State what happens if the meeting was called upon the requisition of members under Section 100 instead of by the Board.
(iv) What is the legal quorum rule at the adjourned meeting if quorum is still not present within half an hour?`,
      rubrics: [
        {
          step: 'Statutory Quorum Thresholds for Public Company',
          marks: 2,
          expectedKeywords: ['Section 103', '5 members if <= 1000', '15 members if 1001 to 5000', '30 members if > 5000', 'Quorum required = 15 members'],
          mandatoryCitations: ['Section 103(1)(a)'],
          description: 'For 3,200 members, the required quorum is 15 members personally present.'
        },
        {
          step: 'Consequences of Quorum Absence within 30 Minutes',
          marks: 2,
          expectedKeywords: ['Adjourned to same day in next week', 'Same time and place', 'Board may determine other day/time'],
          mandatoryCitations: ['Section 103(2)(a)'],
          description: 'Meeting stands adjourned to the same day in next week at same time and place.'
        },
        {
          step: 'Requisitioned Meeting vs Board Called Meeting',
          marks: 1,
          expectedKeywords: ['Meeting called by requisitionists shall stand cancelled / dissolved'],
          mandatoryCitations: ['Section 103(2)(b)'],
          description: 'If called upon requisition, the meeting stands cancelled.'
        },
        {
          step: 'Quorum Rule at Adjourned Meeting',
          marks: 1,
          expectedKeywords: ['Members present shall be the quorum', 'Section 103(3)'],
          mandatoryCitations: ['Section 103(3)'],
          description: 'At adjourned meeting, members present personally shall be the quorum.'
        }
      ],
      suggestedAnswer: `1. Statutory Quorum for Public Company [Section 103(1)(a)]:
Under Section 103 of the Companies Act, 2013, the quorum personally present for a public company is:
- 5 members if total members <= 1,000;
- 15 members if total members exceed 1,000 but up to 5,000;
- 30 members if total members exceed 5,000.
Since Royal Lifestyle Ltd has 3,200 members, the mandatory quorum is 15 members personally present. With only 11 members present, quorum is not formed.

2. Consequence of Absence of Quorum [Section 103(2)]:
If quorum is not present within half an hour from the appointed time:
- The meeting shall stand adjourned to the same day in the next week at the same time and place, or to such other date, time, and place as the Board may determine.

3. Exception for Requisitioned Meeting [Section 103(2)(b)]:
If the meeting was called upon the requisition of members under Section 100, the meeting shall stand cancelled/dissolved and cannot be adjourned.

4. Quorum at Adjourned Meeting [Section 103(3)]:
If at the adjourned meeting also, a quorum is not present within half an hour from the appointed time, the members present shall be the quorum.`
    };
  }

  // Law Section 141 Auditor Disqualification
  private static generateLawAuditorDisqualificationQuestion(): DescriptiveQuestion {
    return {
      id: `dyn_desc_sec141_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p2_law',
      chapterId: 'audit_auditors',
      type: 'descriptive',
      importance: 'HIGH',
      source: 'ICAI Exam Style: Section 141(3)(d) Auditor Disqualification & Grace Period',
      marks: 6,
      difficulty: 'Examiner Favorite',
      icaiReference: 'Section 141(3)(d), Companies Act, 2013',
      questionText: `CA Alok is proposed to be appointed as the statutory auditor of Surya Metals Ltd at its AGM. Examine his eligibility/disqualification under Section 141(3)(d) of the Companies Act, 2013 in the following independent situations:
Case 1: CA Alok's brother holds equity shares of face value ₹ 80,000 in Surya Metals Ltd (Current Market Value: ₹ 4,50,000).
Case 2: CA Alok's father is indebted to Surya Metals Ltd for an amount of ₹ 6,20,000 for raw materials purchased on credit.
Case 3: If in Case 1, the brother held shares of face value ₹ 1,20,000, state whether any corrective grace period is available to save the appointment.`,
      rubrics: [
        {
          step: 'Evaluation of Case 1 (Relative Holding Securities)',
          marks: 2,
          expectedKeywords: ['Face value does not exceed ₹ 1,00,000', 'Relative may hold securities up to ₹ 1,00,000 face value', 'Market value is irrelevant', 'CA Alok is eligible'],
          mandatoryCitations: ['Section 141(3)(d)(i)'],
          description: 'Relative may hold shares up to face value of ₹ 1 Lakh. Market value is irrelevant. Eligible.'
        },
        {
          step: 'Evaluation of Case 2 (Indebtedness of Relative)',
          marks: 2,
          expectedKeywords: ['Indebtedness exceeds ₹ 5,00,000', 'Father is a relative', 'CA Alok is DISQUALIFIED'],
          mandatoryCitations: ['Section 141(3)(d)(ii)'],
          description: 'Indebtedness > ₹ 5 Lakhs disqualifies the auditor. CA Alok is disqualified.'
        },
        {
          step: 'Evaluation of Case 3 (60-Day Grace Period Proviso)',
          marks: 2,
          expectedKeywords: ['Proviso to Section 141(3)(d)(i)', '60 days corrective action', 'Trim holding below ₹ 1,00,000 face value within 60 days'],
          mandatoryCitations: ['Section 141(3)(d)(i) Proviso'],
          description: 'A relative may acquire shares exceeding ₹ 1 Lakh face value subject to 60 days corrective window.'
        }
      ],
      suggestedAnswer: `1. Case 1 - Brother holding shares of Face Value ₹ 80,000:
- Provision: Under Section 141(3)(d)(i) read with Rule 10 of Companies (Audit and Auditors) Rules, 2014, a person is disqualified if he, his partner, or his relative holds any security in the company.
- Proviso: A relative may hold security in the company of FACE VALUE not exceeding ₹ 1,00,000.
- Analysis: The threshold applies strictly to FACE VALUE, not market value. Since the brother (a relative under Section 2(77)) holds shares of face value ₹ 80,000 (which is within ₹ 1,00,000), CA Alok is ELIGIBLE and NOT DISQUALIFIED.

2. Case 2 - Father indebted for ₹ 6,20,000:
- Provision: Under Section 141(3)(d)(ii), a person is disqualified if he, his partner, or his relative is indebted to the company in excess of ₹ 5,00,000.
- Analysis: Father is a relative, and indebtedness of ₹ 6,20,000 exceeds the statutory limit of ₹ 5,00,000. Hence, CA Alok is DISQUALIFIED.

3. Case 3 - 60-Day Grace Period [Proviso to Section 141(3)(d)(i)]:
- If a relative acquires shares of face value exceeding ₹ 1,00,000, the auditor shall not be disqualified if the relative takes corrective action to bring the face value within ₹ 1,00,000 within 60 DAYS from the date of such acquisition.`
    };
  }

  // Law Section 42 Private Placement
  private static generateLawPrivatePlacementQuestion(): DescriptiveQuestion {
    return {
      id: `dyn_desc_sec42_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p2_law',
      chapterId: 'prospectus_allotment',
      type: 'descriptive',
      importance: 'HIGH',
      source: 'ICAI Exam Style: Section 42 Private Placement Norms',
      marks: 6,
      difficulty: 'Standard ICAI',
      icaiReference: 'Section 42, Companies Act, 2013 & Rule 14 of PAS Rules',
      questionText: `Epsilon Tech Ltd proposes to issue convertible preference shares on a private placement basis.
Explain the following statutory requirements under Section 42 of the Companies Act, 2013:
(i) Maximum number of persons to whom an offer or invitation can be made in a financial year, and which persons are excluded from this limit.
(ii) Time limit for allotment of securities from the date of receipt of application money.
(iii) Consequences if the company fails to allot securities within the prescribed time limit.
(iv) Requirement of maintaining application money in a separate bank account and filing of Return of Allotment (Form PAS-3).`,
      rubrics: [
        {
          step: 'Maximum Persons Limit & Exclusions',
          marks: 2,
          expectedKeywords: ['Not more than 200 persons in a financial year', 'Excluding Qualified Institutional Buyers (QIBs)', 'Excluding employees under ESOP'],
          mandatoryCitations: ['Section 42(2)'],
          description: 'Limit is 200 persons in aggregate in a financial year excluding QIBs and ESOP employees.'
        },
        {
          step: 'Allotment Period (60 Days Rule)',
          marks: 1,
          expectedKeywords: ['Allot securities within 60 days', 'From receipt of application money'],
          mandatoryCitations: ['Section 42(6)'],
          description: 'Allotment must be completed within 60 days from date of receipt of application money.'
        },
        {
          step: 'Consequences of Default in Allotment',
          marks: 2,
          expectedKeywords: ['Repay application money within 15 days', 'From expiry of 60 days', 'Interest @ 12% per annum from 60th day'],
          mandatoryCitations: ['Section 42(6)'],
          description: 'Repay within 15 days, otherwise 12% p.a. interest from the expiry of the 60th day.'
        },
        {
          step: 'Separate Bank Account & Form PAS-3',
          marks: 1,
          expectedKeywords: ['Separate bank account in a Scheduled Bank', 'Return of allotment in Form PAS-3 within 15 days'],
          mandatoryCitations: ['Section 42(8)'],
          description: 'Keep funds in separate scheduled bank account. File PAS-3 within 15 days of allotment.'
        }
      ],
      suggestedAnswer: `1. Maximum Persons Limit [Section 42(2)]:
- An offer or invitation to subscribe securities shall not be made to more than 200 persons in the aggregate in a financial year.
- Exclusions: Qualified Institutional Buyers (QIBs) and employees offered securities under employee stock option (ESOP) are excluded from calculating this 200-person ceiling.

2. Allotment Timeline [Section 42(6)]:
- A company making an offer under Section 42 shall allot its securities within 60 DAYS from the date of receipt of the application money.

3. Failure to Allot within 60 Days:
- If the company is unable to allot the securities within 60 days, it shall repay the application money to the subscribers within 15 DAYS from the expiry of the 60 days.
- If failed to repay within 15 days, the company and every officer in default shall be liable to repay that money with interest @ 12% per annum from the expiry of the 60th day.

4. Bank Account & Return of Allotment [Section 42(6) & 42(8)]:
- Monies received must be kept in a separate bank account in a Scheduled Bank and shall not be utilised for any purpose other than for adjustment against allotment or repayment.
- The company must file a Return of Allotment in Form PAS-3 with the Registrar within 15 DAYS of allotment.`
    };
  }

  // Tax Section 50C Capital Gains Immovable Property
  private static generateTaxSection50CQuestion(): DescriptiveQuestion {
    return {
      id: `dyn_desc_sec50c_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p3_tax',
      chapterId: 'cap_gains',
      type: 'descriptive',
      importance: 'HIGH',
      source: 'ICAI Exam Style: Section 50C Full Value of Consideration & 110% Tolerance Limit',
      marks: 6,
      difficulty: 'Examiner Favorite',
      icaiReference: 'Section 50C, Income-tax Act, 1961',
      questionText: `Mr. Rajesh entered into an agreement to sell a commercial plot on 12th August 2023 for a total consideration of ₹ 80,00,000. He received an advance token of ₹ 8,00,000 by an account payee cheque on the date of agreement.
The sale deed was executed and registered on 15th February 2024.
The Stamp Duty Values (SDV) assessed by the state stamp authority were:
- SDV as on date of agreement (12th August 2023): ₹ 87,00,000
- SDV as on date of registration (15th February 2024): ₹ 95,00,000

Required:
(i) Which date's Stamp Duty Value should be adopted for the purpose of Section 50C, and why?
(ii) Determine the Full Value of Consideration (FVOC) for calculating capital gains under Section 50C, explaining the 110% safe harbour tolerance limit.
(iii) How would your answer change if the advance token of ₹ 8,00,000 was received in cash?`,
      rubrics: [
        {
          step: 'Relevant Date for Stamp Duty Value (Agreement Date vs Registration Date)',
          marks: 2,
          expectedKeywords: ['Section 50C First Proviso', 'Token money received by account payee cheque', 'SDV on date of agreement is adopted (₹ 87,00,000)'],
          mandatoryCitations: ['Section 50C'],
          description: 'Agreement date SDV applies since advance received by account payee cheque on or before agreement date.'
        },
        {
          step: 'Application of 110% Safe Harbour Tolerance Limit',
          marks: 3,
          expectedKeywords: ['110% of Consideration = ₹ 88,00,000', 'SDV ₹ 87,00,000 does not exceed 110%', 'FVOC = Actual Consideration = ₹ 80,00,000'],
          mandatoryCitations: ['Section 50C(1) Proviso 3'],
          description: '110% of ₹ 80L = ₹ 88L. Since SDV (₹ 87L) <= ₹ 88L, actual consideration (₹ 80L) is adopted as FVOC.'
        },
        {
          step: 'Scenario if Advance was in Cash',
          marks: 1,
          expectedKeywords: ['Cash advance invalidates agreement date SDV', 'SDV on date of registration (₹ 95,00,000) applies', 'FVOC = ₹ 95,00,000'],
          description: 'If cash advance, registration date SDV (₹ 95L) applies, exceeding 110% (₹ 88L), so FVOC = ₹ 95 Lakhs.'
        }
      ],
      suggestedAnswer: `1. Relevant Date for Stamp Duty Value [First Proviso to Section 50C(1)]:
- Principle: Where the date of agreement fixing the amount of consideration and the date of registration are not the same, the Stamp Duty Value on the DATE OF AGREEMENT may be taken, provided the consideration or part thereof has been received by way of an account payee cheque/draft or ECS on or before the date of agreement.
- Application: Since Mr. Rajesh received ₹ 8,00,000 by account payee cheque on the agreement date, the SDV on the date of agreement (₹ 87,00,000) shall be taken instead of registration date SDV (₹ 95,00,000).

2. 110% Safe Harbour Tolerance Limit [Third Proviso to Section 50C(1)]:
- Principle: If the Stamp Duty Value does not exceed 110% of the actual consideration received, the actual consideration shall be deemed to be the Full Value of Consideration (FVOC).
- 110% of Actual Consideration = 110% × ₹ 80,00,000 = ₹ 88,00,000.
- Since Agreement Date SDV (₹ 87,00,000) does NOT exceed ₹ 88,00,000, the safe harbour applies.
- Deemed Full Value of Consideration (FVOC) = ₹ 80,00,000 (Actual Consideration).

3. Variation if Advance was Received in Cash:
- If the advance of ₹ 8,00,000 was received in cash, the benefit of adopting agreement date SDV is NOT available.
- SDV on date of registration (₹ 95,00,000) must be compared with 110% of consideration (₹ 88,00,000).
- Since ₹ 95,00,000 exceeds ₹ 88,00,000, the Full Value of Consideration (FVOC) would be ₹ 95,00,000.`
    };
  }

  // Tax Section 17(5) Blocked ITC
  private static generateTaxGstBlockedItcQuestion(): DescriptiveQuestion {
    return {
      id: `dyn_desc_blocked_itc_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p3_tax',
      chapterId: 'gst_itc',
      type: 'descriptive',
      importance: 'HIGH',
      source: 'ICAI Exam Style: Section 17(5) Blocked Input Tax Credit',
      marks: 6,
      difficulty: 'Examiner Favorite',
      icaiReference: 'Section 17(5), CGST Act, 2017',
      questionText: `Shakti Cements Ltd (a registered manufacturer under GST) incurred the following input taxes during the month:
1. Purchase of a 7-seater passenger motor car (GST ₹ 3,60,000) used exclusively by the Managing Director for visiting factory units.
2. Premium paid for group health insurance for all factory workers (GST ₹ 72,000) under mandatory statutory obligation under the Factories Act, 1948.
3. Raw materials purchased for ₹ 5,00,000 (GST ₹ 90,000) which were totally destroyed due to accidental fire in the raw material yard.
4. Finished cement bags given away as free commercial gifts to retail dealers achieving annual sales targets (GST ₹ 45,000).

Determine the admissibility or inadmissibility of Input Tax Credit (ITC) for each of the above transactions with statutory reasoning under Section 17(5).`,
      rubrics: [
        {
          step: 'Motor Vehicle for Managing Director',
          marks: 1.5,
          expectedKeywords: ['Section 17(5)(a)', 'Seating capacity <= 13 persons', 'Blocked / Inadmissible'],
          mandatoryCitations: ['Section 17(5)(a)'],
          description: 'Motor vehicles for transportation of persons having approved seating capacity <= 13 are blocked.'
        },
        {
          step: 'Mandatory Health Insurance for Workers',
          marks: 1.5,
          expectedKeywords: ['Section 17(5)(b) Proviso', 'Mandatory under law / Factories Act', 'Eligible / Admissible'],
          mandatoryCitations: ['Section 17(5)(b) Proviso'],
          description: 'ITC on health insurance is eligible where obligatorily provided by employer under any law.'
        },
        {
          step: 'Raw Materials Destroyed by Fire',
          marks: 1.5,
          expectedKeywords: ['Section 17(5)(h)', 'Goods lost, stolen, destroyed', 'Blocked / Inadmissible'],
          mandatoryCitations: ['Section 17(5)(h)'],
          description: 'ITC is blocked on goods lost, stolen, destroyed, written off or disposed of by way of gift.'
        },
        {
          step: 'Free Gifts to Dealers',
          marks: 1.5,
          expectedKeywords: ['Section 17(5)(h)', 'Disposed of by way of gift or free samples', 'Blocked / Inadmissible'],
          mandatoryCitations: ['Section 17(5)(h)'],
          description: 'ITC is blocked on goods given as gifts or free samples under Section 17(5)(h).'
        }
      ],
      suggestedAnswer: `1. Motor Car for Managing Director (GST ₹ 3,60,000):
- Provision: Under Section 17(5)(a) of the CGST Act, ITC is blocked on motor vehicles for transportation of persons having approved seating capacity up to 13 persons (including driver), unless used for further taxable supply of such vehicles, transportation of passengers, or imparting driving training.
- Conclusion: INADMISSIBLE / BLOCKED. Official usage does not lift the block.

2. Group Health Insurance under Factories Act (GST ₹ 72,000):
- Provision: Under the Proviso to Section 17(5)(b), ITC in respect of life and health insurance is ADMISSIBLE where it is obligatory for an employer to provide the same to its employees under any law for the time being in force.
- Conclusion: ADMISSIBLE / ELIGIBLE (₹ 72,000).

3. Raw Materials Destroyed by Fire (GST ₹ 90,000):
- Provision: Under Section 17(5)(h), input tax credit is blocked in respect of goods lost, stolen, destroyed, written off, or disposed of by way of gift or free samples.
- Conclusion: INADMISSIBLE / BLOCKED. If already availed, it must be reversed.

4. Free Gifts to Retail Dealers (GST ₹ 45,000):
- Provision: Under Section 17(5)(h), goods disposed of by way of gift or free samples are blocked from ITC.
- Conclusion: INADMISSIBLE / BLOCKED.`
    };
  }

  // Tax Section 40(a)(ia) & TDS Disallowance
  private static generateTaxTdsDisallowanceQuestion(): DescriptiveQuestion {
    return {
      id: `dyn_desc_sec40a_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p3_tax',
      chapterId: 'pgbp_deductions',
      type: 'descriptive',
      importance: 'HIGH',
      source: 'ICAI Exam Style: Section 40(a)(ia) 30% Disallowance for TDS Default',
      marks: 6,
      difficulty: 'Standard ICAI',
      icaiReference: 'Section 40(a)(ia), Section 194C, Section 194J',
      questionText: `Kaveri Associates (a partnership firm) debited the following expenses to its Profit and Loss Account for the financial year 2023-24:
1. Contractor charges paid to Mr. Raman (resident individual) of ₹ 8,00,000 without deducting TDS under Section 194C.
2. Technical consultancy fee of ₹ 5,00,000 paid to a resident software engineer on which TDS under Section 194J was deducted on 15th March 2024, but deposited with the Central Government only on 15th November 2024 (Due date of filing ITR u/s 139(1) was 31st October 2024).

Required:
(i) Compute the amount of disallowance to be made under Section 40(a)(ia) in computing profits and gains of business for Assessment Year 2024-25.
(ii) In which assessment year(s) can the disallowed expenditure be claimed as a deduction?`,
      rubrics: [
        {
          step: 'Disallowance on Contractor Payments (Section 194C)',
          marks: 2.5,
          expectedKeywords: ['30% disallowance under Section 40(a)(ia)', '30% of ₹ 8,00,000 = ₹ 2,40,000 disallowed'],
          mandatoryCitations: ['Section 40(a)(ia)', 'Section 194C'],
          description: '30% of sum payable to resident is disallowed for non-deduction of TDS.'
        },
        {
          step: 'Disallowance on Late Deposit of TDS (Section 194J)',
          marks: 2.5,
          expectedKeywords: ['Deposited after due date of filing ITR (31st October)', '30% of ₹ 5,00,000 = ₹ 1,50,000 disallowed'],
          mandatoryCitations: ['Section 40(a)(ia)', 'Section 139(1)'],
          description: 'TDS deposited after ITR due date triggers 30% disallowance in current AY.'
        },
        {
          step: 'Year of Subsequent Claim',
          marks: 1,
          expectedKeywords: ['Deductible in the previous year in which TDS is paid', 'Claimable in AY 2025-26'],
          description: 'Disallowed 30% is allowed in the year in which such tax has been paid.'
        }
      ],
      suggestedAnswer: `1. Principle under Section 40(a)(ia):
Under Section 40(a)(ia) of the Income-tax Act, 1961, 30% of any sum payable to a resident on which tax is deductible at source shall be disallowed in computing business income if:
(a) tax has not been deducted, or
(b) after deduction, tax has not been paid on or before the due date specified in Section 139(1).

2. Computation of Disallowance for AY 2024-25:
(i) Contractor Charges to Mr. Raman (₹ 8,00,000):
- Tax was not deducted at all.
- Disallowance u/s 40(a)(ia) = 30% of ₹ 8,00,000 = ₹ 2,40,000.

(ii) Technical Consultancy Fee (₹ 5,00,000):
- Tax was deducted in FY 2023-24, but deposited on 15th November 2024, which is AFTER the ITR filing due date of 31st October 2024.
- Disallowance u/s 40(a)(ia) = 30% of ₹ 5,00,000 = ₹ 1,50,000.

Total Business Expense Disallowed in AY 2024-25 = ₹ 2,40,000 + ₹ 1,50,000 = ₹ 3,90,000.

3. Subsequent Deduction:
Under the Proviso to Section 40(a)(ia), where tax has been deducted in any subsequent year or paid after the due date under Section 139(1), the 30% disallowed sum shall be allowed as a deduction in the previous year in which such tax has been paid (i.e. in AY 2025-26 for the consultancy fee).`
    };
  }

  // Costing Marginal Costing Special Order
  private static generateCostingMarginalCostingQuestion(): DescriptiveQuestion {
    return {
      id: `dyn_desc_marginal_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p4_costing',
      chapterId: 'marginal_costing',
      type: 'descriptive',
      importance: 'HIGH',
      source: 'ICAI Exam Style: Marginal Costing Special Export Order Evaluation',
      marks: 8,
      difficulty: 'Examiner Favorite',
      icaiReference: 'Marginal Costing Principles & Decision Making',
      questionText: `Falcon Plastics Ltd operates at 70% capacity producing 14,000 industrial containers per month. Present financial data:
- Selling Price: ₹ 250 per container
- Direct Materials: ₹ 110 per container
- Direct Labour: ₹ 40 per container
- Variable Overheads: ₹ 20 per container
- Fixed Overheads: ₹ 7,00,000 per month (absorbed at ₹ 50 per container on 14,000 units)
- Total Cost per unit: ₹ 220; Profit per unit: ₹ 30.

An overseas buyer offers to purchase 4,000 containers per month at an export price of ₹ 190 per container.
To fulfill the export order, special export packing costing ₹ 5 per container and freight charges of ₹ 3 per container will be incurred.
Existing domestic sales and prices will remain unaffected.
Required:
(i) Compute the present P/V Ratio, Break-Even Point (in units and value), and Margin of Safety.
(ii) Advise whether Falcon Plastics Ltd should accept or reject the special export order, supporting your recommendation with a differential cost-benefit statement.`,
      rubrics: [
        {
          step: 'P/V Ratio and Break-Even Point Calculation',
          marks: 3,
          expectedKeywords: ['Marginal Cost = ₹ 170', 'Contribution = ₹ 80 per unit', 'P/V Ratio = 32%', 'BEP = 8,750 units', 'BEP Value = ₹ 21,87,500'],
          description: 'Variable cost = 110 + 40 + 20 = ₹ 170. Contribution = ₹ 80. BEP = 7,00,000 / 80 = 8,750 units.'
        },
        {
          step: 'Differential Cost Analysis for Export Order',
          marks: 3,
          expectedKeywords: ['Export Marginal Cost = ₹ 178', 'Export Contribution = ₹ 12 per unit', 'Total Differential Profit = ₹ 48,000'],
          description: 'Export variable cost = 170 + 5 + 3 = ₹ 178. Export contribution = 190 - 178 = ₹ 12. Profit = 4,000 * 12 = ₹ 48,000.'
        },
        {
          step: 'Strategic Decision & Recommendation',
          marks: 2,
          expectedKeywords: ['Accept the order', 'Idle capacity available', 'Fixed costs are already recovered'],
          description: 'Recommend acceptance as spare capacity exists (up to 20,000 units) and export generates positive contribution.'
        }
      ],
      suggestedAnswer: `1. Present Operational Analysis:
- Selling Price (SP) = ₹ 250 per container
- Variable Cost (VC) = Direct Materials (₹ 110) + Direct Labour (₹ 40) + Variable Overheads (₹ 20) = ₹ 170 per container
- Unit Contribution = SP (₹ 250) - VC (₹ 170) = ₹ 80 per container
- P/V Ratio = (₹ 80 / ₹ 250) × 100 = 32%
- Break-Even Point (units) = Fixed Cost / Unit Contribution = ₹ 7,00,000 / ₹ 80 = 8,750 Containers
- Break-Even Value = 8,750 × ₹ 250 = ₹ 21,87,500
- Margin of Safety (units) = Actual Sales (14,000) - BEP (8,750) = 5,250 Containers (37.5%).

2. Evaluation of Special Export Order (4,000 units):
- Total Capacity at 100% = 14,000 / 0.70 = 20,000 containers per month.
- Spare Capacity Available = 20,000 - 14,000 = 6,000 containers.
- The order of 4,000 units can be produced entirely utilizing idle capacity without reducing domestic sales.

Export Order Cost Statement per unit:
- Export Selling Price: ₹ 190
- Variable Manufacturing Cost: ₹ 170
- Additional Export Packing: ₹ 5
- Additional Freight: ₹ 3
- Total Relevant Marginal Cost: ₹ 178 per container
- Net Contribution per export container: ₹ 190 - ₹ 178 = ₹ 12 per container.

3. Recommendation:
Total Additional Net Profit = 4,000 containers × ₹ 12 = ₹ 48,000 per month.
Falcon Plastics Ltd SHOULD ACCEPT the special export order because it generates an additional positive contribution of ₹ 48,000 per month, utilizing spare capacity, without incurring any additional fixed cost.`
    };
  }

  // Costing Process Costing FIFO Equivalent Units
  private static generateCostingProcessQuestion(): DescriptiveQuestion {
    return {
      id: `dyn_desc_process_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p4_costing',
      chapterId: 'process_costing',
      type: 'descriptive',
      importance: 'HIGH',
      source: 'ICAI Exam Style: Process Costing Equivalent Units (FIFO Method)',
      marks: 8,
      difficulty: 'Examiner Favorite',
      icaiReference: 'Process Costing Statement of Equivalent Production',
      questionText: `The following information relates to Process II of Radiant Chemicals Ltd for the month of January:
- Opening Work-in-Progress: 1,500 units (Degree of completion: Material 100%, Labour 60%, Overheads 60%) valued at ₹ 45,000.
- Units introduced from Process I: 18,500 units @ ₹ 10 per unit (Total ₹ 1,85,000).
- Direct Materials added in Process II: ₹ 90,000.
- Direct Labour incurred: ₹ 61,600.
- Production Overheads incurred: ₹ 92,400.
- Units completed and transferred to Process III: 17,000 units.
- Closing Work-in-Progress: 3,000 units (Degree of completion: Material 100%, Labour 40%, Overheads 40%).
- Normal loss is NIL.

Required:
Prepare the Statement of Equivalent Production under the FIFO Method, showing equivalent units for Material and Conversion costs (Labour & Overheads).`,
      rubrics: [
        {
          step: 'Physical Flow Reconciliation',
          marks: 2,
          expectedKeywords: ['Input = 1,500 + 18,500 = 20,000 units', 'Output = 17,000 completed + 3,000 closing WIP = 20,000 units'],
          description: 'Input (20,000) matches Output (20,000).'
        },
        {
          step: 'Material Equivalent Units under FIFO',
          marks: 3,
          expectedKeywords: ['Opening WIP completed: 0%', 'Fresh units started & completed: 15,500 units', 'Closing WIP (100%): 3,000 units', 'Total Material Equivalent Units = 18,500 units'],
          description: 'FIFO Material units = 0 (Op WIP) + 15,500 (Started & completed) + 3,000 (Closing WIP) = 18,500 units.'
        },
        {
          step: 'Conversion Cost Equivalent Units under FIFO',
          marks: 3,
          expectedKeywords: ['Opening WIP work needed: 40% of 1,500 = 600 units', 'Started & completed: 15,500 units', 'Closing WIP: 40% of 3,000 = 1,200 units', 'Total Conversion Equivalent Units = 17,300 units'],
          description: 'Conversion units = 600 + 15,500 + 1,200 = 17,300 units.'
        }
      ],
      suggestedAnswer: `STATEMENT OF EQUIVALENT PRODUCTION (FIFO METHOD)

1. Input / Output Reconciliation:
- Total Input = Opening WIP (1,500) + Units Introduced (18,500) = 20,000 Units.
- Total Output = Completed (17,000) + Closing WIP (3,000) = 20,000 Units.

2. FIFO Equivalent Production Breakdown:

(a) Units Completed (17,000 Units):
- From Opening WIP (1,500 units):
  * Material: Already 100% in previous month ➔ 0% needed = 0 Equivalent Units.
  * Conversion: 60% done previously ➔ (100% - 60%) = 40% needed = 600 Equivalent Units.
- Fresh Units Started & Finished during month (17,000 - 1,500 = 15,500 units):
  * Material: 100% = 15,500 Equivalent Units.
  * Conversion: 100% = 15,500 Equivalent Units.

(b) Closing Work-in-Progress (3,000 Units):
- Material: 100% complete = 3,000 Equivalent Units.
- Conversion: 40% complete = 3,000 × 40% = 1,200 Equivalent Units.

3. Total Equivalent Units:
- Material Equivalent Units = 0 + 15,500 + 3,000 = 18,500 Units.
- Conversion Equivalent Units = 600 + 15,500 + 1,200 = 17,300 Units.`
    };
  }

  // Costing Activity Based Costing vs Absorption
  private static generateCostingAbcQuestion(): DescriptiveQuestion {
    return {
      id: `dyn_desc_abc_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p4_costing',
      chapterId: 'activity_based_costing',
      type: 'descriptive',
      importance: 'HIGH',
      source: 'ICAI Exam Style: Activity-Based Costing vs Traditional Costing',
      marks: 8,
      difficulty: 'Examiner Favorite',
      icaiReference: 'Activity Based Costing System Cost Pools & Drivers',
      questionText: `Pioneer Electronics manufactures two models of audio components: Model Standard (high volume) and Model Deluxe (low volume).
Annual production and cost data:
- Model Standard: 20,000 units; Machine hours per unit = 2 hrs; Direct material = ₹ 150; Direct labour = ₹ 50.
- Model Deluxe: 5,000 units; Machine hours per unit = 4 hrs; Direct material = ₹ 280; Direct labour = ₹ 90.

Overhead Cost Pools:
1. Machine setups: ₹ 6,00,000 (Total setups: 60; Standard: 15 setups, Deluxe: 45 setups).
2. Quality Inspections: ₹ 4,80,000 (Total inspections: 120; Standard: 30, Deluxe: 90).
3. Machine Running Overheads: ₹ 9,00,000 (Total machine hours: 60,000 hrs).
Total Overheads = ₹ 19,80,000.

Required:
(i) Calculate the traditional overhead rate per machine hour and unit cost for both models under traditional absorption costing.
(ii) Compute the activity cost driver rates for each pool and unit cost under Activity-Based Costing (ABC).
(iii) Explain why traditional costing causes cross-subsidization (under-costing/over-costing).`,
      rubrics: [
        {
          step: 'Traditional Overhead Absorption & Unit Cost',
          marks: 3,
          expectedKeywords: ['Overhead Rate = ₹ 33 per machine hour', 'Standard Cost = ₹ 266', 'Deluxe Cost = ₹ 502'],
          description: 'Rate = 19,80,000 / 60,000 = ₹ 33/hr. Standard = 200 + 66 = ₹ 266. Deluxe = 370 + 132 = ₹ 502.'
        },
        {
          step: 'ABC Cost Driver Rates & Unit Cost',
          marks: 3,
          expectedKeywords: ['Setup rate = ₹ 10,000 per setup', 'Inspection rate = ₹ 4,000 per inspection', 'Machine rate = ₹ 15 per hr', 'Standard ABC Cost = ₹ 243.50', 'Deluxe ABC Cost = ₹ 592.00'],
          description: 'Compute driver rates. Standard cost = ₹ 243.50, Deluxe cost = ₹ 592.00.'
        },
        {
          step: 'Cross-Subsidization Analysis',
          marks: 2,
          expectedKeywords: ['Standard is over-costed', 'Deluxe is under-costed', 'Volume-based distortion'],
          description: 'High volume standard subsidizes low volume deluxe which consumes disproportionate setups/inspections.'
        }
      ],
      suggestedAnswer: `1. Traditional Absorption Costing:
- Total Machine Hours = (20,000 × 2) + (5,000 × 4) = 40,000 + 20,000 = 60,000 hours.
- Blanket Overhead Rate = ₹ 19,80,000 / 60,000 hrs = ₹ 33 per machine hour.
- Model Standard Unit Cost:
  Prime Cost (150 + 50) = ₹ 200 + Overheads (2 hrs × ₹ 33 = ₹ 66) = ₹ 266.00.
- Model Deluxe Unit Cost:
  Prime Cost (280 + 90) = ₹ 370 + Overheads (4 hrs × ₹ 33 = ₹ 132) = ₹ 502.00.

2. Activity Based Costing (ABC):
- Setup Cost Driver Rate = ₹ 6,00,000 / 60 setups = ₹ 10,000 per setup.
- Inspection Cost Driver Rate = ₹ 4,80,000 / 120 inspections = ₹ 4,00,000 per inspection = ₹ 4,000 per inspection.
- Machine Running Rate = ₹ 9,00,000 / 60,000 hrs = ₹ 15 per machine hour.

Overhead Allocation under ABC:
- Model Standard:
  * Setups (15 × ₹ 10,000) = ₹ 1,50,000
  * Inspections (30 × ₹ 4,000) = ₹ 1,20,000
  * Running (40,000 hrs × ₹ 15) = ₹ 6,00,000
  Total Overheads = ₹ 8,70,000 / 20,000 units = ₹ 43.50 per unit.
  Total Unit Cost = Prime Cost (₹ 200) + ₹ 43.50 = ₹ 243.50.

- Model Deluxe:
  * Setups (45 × ₹ 10,000) = ₹ 4,50,000
  * Inspections (90 × ₹ 4,000) = ₹ 3,60,000
  * Running (20,000 hrs × ₹ 15) = ₹ 3,00,000
  Total Overheads = ₹ 11,10,000 / 5,00,0 units = ₹ 222.00 per unit.
  Total Unit Cost = Prime Cost (₹ 370) + ₹ 222 = ₹ 592.00.

3. Cross-Subsidization Analysis:
Traditional costing severely over-costs Model Standard (₹ 266 vs ₹ 243.50) and under-costs Model Deluxe (₹ 502 vs ₹ 592). The low-volume Deluxe model consumes 75% of setups and inspections despite having only 20% of unit production.`
    };
  }

  // Audit SA 505 External Confirmations
  private static generateAuditExternalConfirmationQuestion(): DescriptiveQuestion {
    return {
      id: `dyn_desc_sa505_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p5_audit',
      chapterId: 'audit_evidence',
      type: 'descriptive',
      importance: 'HIGH',
      source: 'ICAI Exam Style: SA 505 Management Refusal of Confirmation',
      marks: 5,
      difficulty: 'Examiner Favorite',
      icaiReference: 'SA 505 External Confirmations - Para 8 & 9',
      questionText: `During the statutory audit of Prime Logistics Ltd, the engagement team selected 5 major trade receivables for external direct confirmation under SA 505.
Management requested the auditor not to send the confirmation request to "Fast Cargo Ltd" (balance ₹ 65 Lakhs, representing 28% of total debtors), contending that a commercial dispute regarding transit damages is currently under private mediation and an audit letter would disrupt amicable settlement.

Required:
Explain the procedures the auditor must perform under SA 505 when management refuses to allow the auditor to send a confirmation request, and state the reporting implications if the refusal is found to be unreasonable.`,
      rubrics: [
        {
          step: 'Inquiry and Evaluation of Management Grounds',
          marks: 2,
          expectedKeywords: ['Inquire as to management reasons', 'Seek audit evidence for validity and reasonableness', 'Professional skepticism'],
          mandatoryCitations: ['SA 505'],
          description: 'Inquire reasons, evaluate reasonableness, and maintain skepticism.'
        },
        {
          step: 'Risk Assessment & Alternative Audit Procedures',
          marks: 2,
          expectedKeywords: ['Evaluate implications on assessed RMM', 'Perform alternative audit procedures', 'Subsequent cash receipts', 'Shipping docs / invoices'],
          mandatoryCitations: ['SA 505'],
          description: 'Assess RMM of fraud, perform alternative procedures (vouching cash receipts, delivery challans).'
        },
        {
          step: 'Reporting Implications under SA 705',
          marks: 1,
          expectedKeywords: ['Communicate with TCWG', 'Modify opinion under SA 705 (Qualified or Disclaimer)'],
          mandatoryCitations: ['SA 705'],
          description: 'If unreasonable or evidence not obtained, modify opinion for scope limitation.'
        }
      ],
      suggestedAnswer: `1. Auditor's Action under SA 505 upon Management Refusal:
If management refuses to allow the auditor to send a confirmation request, the auditor shall:
(a) Inquire as to management's reasons for the refusal, and seek audit evidence as to their validity and reasonableness.
(b) Evaluate the implications of management's refusal on the auditor's assessment of the relevant risks of material misstatement, including the risk of fraud, and on the nature, timing, and extent of other audit procedures.
(c) Perform alternative audit procedures designed to obtain relevant and reliable audit evidence (e.g., examining subsequent cash collections, verifiable dispatch documents, signed delivery notes, and sales agreements).

2. Reporting Implications:
- If the auditor concludes that management's refusal is UNREASONABLE, or the auditor is UNABLE TO OBTAIN sufficient appropriate audit evidence from alternative procedures, the auditor shall communicate with Those Charged with Governance (TCWG).
- The auditor shall determine the implications for the audit and the auditor's opinion in accordance with SA 705 (Revised), issuing either a QUALIFIED OPINION or a DISCLAIMER OF OPINION due to a management-imposed limitation on the scope of the audit.`
    };
  }

  // Audit SA 501 Physical Inventory Attendance Impracticable
  private static generateAuditPhysicalInventoryQuestion(): DescriptiveQuestion {
    return {
      id: `dyn_desc_sa501_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p5_audit',
      chapterId: 'audit_evidence',
      type: 'descriptive',
      importance: 'HIGH',
      source: 'ICAI Exam Style: SA 501 Inventory Count Attendance Impracticable',
      marks: 5,
      difficulty: 'Standard ICAI',
      icaiReference: 'SA 501 Audit Evidence - Specific Considerations for Selected Items',
      questionText: `The statutory auditor of National Agrochem Ltd was unable to attend the year-end physical inventory count at the company's regional godown at Siliguri on 31st March due to sudden railway blockades and flash flooding. Inventory at this location represents ₹ 1.2 Crores out of total company inventory of ₹ 8 Crores.
Examine the duties of the auditor under SA 501 and state whether the auditor can directly modify the audit report without performing alternative procedures.`,
      rubrics: [
        {
          step: 'General Rule & Alternative Date Count',
          marks: 2,
          expectedKeywords: ['Impracticable due to unforeseen circumstances', 'Perform count on an alternative date', 'Test intervening transactions'],
          mandatoryCitations: ['SA 501'],
          description: 'Auditor must perform physical counts on an alternative date and audit intervening transactions.'
        },
        {
          step: 'Alternative Audit Procedures',
          marks: 2,
          expectedKeywords: ['Perform alternative audit procedures', 'Inspection of documentation of subsequent sale of inventory', 'Purchase invoices & GRNs'],
          mandatoryCitations: ['SA 501'],
          description: 'Cannot modify report immediately; must try alternative procedures like subsequent sales verification.'
        },
        {
          step: 'Audit Report Modification Principle',
          marks: 1,
          expectedKeywords: ['Modify opinion only if alternative procedures not feasible', 'SA 705', 'Qualified opinion'],
          mandatoryCitations: ['SA 705'],
          description: 'Modify opinion under SA 705 only if impossible to obtain sufficient evidence through alternatives.'
        }
      ],
      suggestedAnswer: `1. Guidance under SA 501:
Under SA 501 "Audit Evidence - Specific Considerations for Selected Items":
- If attendance at physical inventory counting is IMPRACTICABLE due to unforeseen factors (such as natural disaster or civil unrest), the auditor CANNOT directly modify the audit report without attempting alternative procedures.
- The auditor shall perform physical inventory counts on an ALTERNATIVE DATE (once access is restored), and perform audit procedures on intervening transactions between the count date and year-end balance sheet date.

2. Performing Alternative Audit Procedures:
If it is not possible to perform counts on an alternative date, the auditor shall perform alternative procedures, such as:
- Inspecting documentation of subsequent sales of specific inventory items acquired or purchased prior to the physical inventory counting.
- Verifying Goods Received Notes (GRNs), gate entry passes, and warehouse inspection registers.

3. Modification of Opinion:
Only if it is not possible to obtain sufficient appropriate audit evidence by performing alternative procedures, the auditor shall modify the opinion in the auditor's report in accordance with SA 705 (Revised) on account of limitation on scope (Qualified or Disclaimer).`
    };
  }

  // Audit SA 240 Fraud Responsibilities & Management Override
  private static generateAuditFraudRiskQuestion(): DescriptiveQuestion {
    return {
      id: `dyn_desc_sa240_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p5_audit',
      chapterId: 'fraud_responsibilities',
      type: 'descriptive',
      importance: 'HIGH',
      source: "ICAI Exam Style: SA 240 Fraud Triangle & Management Override of Controls",
      marks: 6,
      difficulty: 'Examiner Favorite',
      icaiReference: "SA 240 The Auditor's Responsibilities Relating to Fraud in an Audit of Financial Statements",
      questionText: `Under SA 240, management is in a unique position to perpetrate fraud because of management's ability to manipulate accounting records and prepare fraudulent financial statements by overriding controls that otherwise appear to be operating effectively.
Required:
(i) Name and briefly explain the three conditions present when fraud occurs (The Fraud Triangle).
(ii) State the mandatory audit procedures an auditor must perform to address the risk of management override of controls regardless of the auditor's assessment of the risks.`,
      rubrics: [
        {
          step: 'The Fraud Triangle Components',
          marks: 3,
          expectedKeywords: ['Incentive or Pressure', 'Opportunity', 'Attitude or Rationalization'],
          mandatoryCitations: ['SA 240'],
          description: 'Explain Incentive/Pressure, Opportunity, and Attitude/Rationalization with brief examples.'
        },
        {
          step: 'Mandatory Procedures for Management Override',
          marks: 3,
          expectedKeywords: ['Test the appropriateness of journal entries', 'Review accounting estimates for bias', 'Evaluate business rationale for significant unusual transactions'],
          mandatoryCitations: ['SA 240 Para 32'],
          description: 'Test JEs recorded in general ledger, review management estimates, and evaluate unusual transactions.'
        }
      ],
      suggestedAnswer: `1. The Fraud Triangle [SA 240]:
Fraudulent financial reporting or misappropriation of assets typically involves three conditions:
(a) Incentive or Pressure: Management or employees have an incentive or are under pressure (e.g. meeting ambitious analyst earnings targets, debt covenants, or bonus benchmarks).
(b) Opportunity: Circumstances exist that provide an opportunity to commit fraud (e.g. ineffective internal controls, complex transactions, lack of segregation of duties).
(c) Attitude or Rationalization: Individuals possess an attitude, character, or set of ethical values that allow them to consciously and knowingly rationalize committing a dishonest act.

2. Mandatory Procedures to Address Management Override of Controls [SA 240 Para 32]:
Irrespective of the auditor's assessment of risks, the auditor must design and perform:
(a) Journal Entry Testing: Test the appropriateness of journal entries recorded in the general ledger and other adjustments made in the preparation of the financial statements (especially year-end post-closing adjustments).
(b) Review of Accounting Estimates: Review accounting estimates (e.g. provisions, impairment, depreciation) for biases and evaluate whether circumstances producing the bias represent a risk of material misstatement due to fraud.
(c) Significant Unusual Transactions: Evaluate the business rationale (or lack thereof) for significant transactions that are outside the normal course of business for the entity.`
    };
  }

  // FM Leverages & EBIT-EPS Indifference Point
  private static generateFmLeverageEbitEpsQuestion(): DescriptiveQuestion {
    return {
      id: `dyn_desc_fm_lev_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p6_fm_sm',
      chapterId: 'fm_leverages',
      type: 'descriptive',
      importance: 'HIGH',
      source: 'ICAI Exam Style: EBIT-EPS Indifference Point & Leverage Analysis',
      marks: 8,
      difficulty: 'Examiner Favorite',
      icaiReference: 'Capital Structure & Indifference Point Analysis',
      questionText: `Kavya Ltd requires ₹ 50,00,000 to finance a new plant expansion project. The company is evaluating two financing alternatives:
Plan 1 (All Equity): Issue 5,00,000 Equity Shares of ₹ 10 each.
Plan 2 (Debt-Equity Mix): Issue 2,50,000 Equity Shares of ₹ 10 each and raise ₹ 25,00,000 through 12% Debentures.

The applicable corporate income tax rate is 25%.
Required:
(i) Calculate the EBIT-EPS Indifference Point between Plan 1 and Plan 2.
(ii) Verify your answer by computing the EPS under both plans at the indifference EBIT level.
(iii) If expected future EBIT is ₹ 8,00,000, which plan should the financial manager recommend to maximize shareholder wealth?`,
      rubrics: [
        {
          step: 'Indifference Point Equation Formulation',
          marks: 3,
          expectedKeywords: ['(EBIT * (1 - t)) / N1 = ((EBIT - I) * (1 - t)) / N2', 'Interest = ₹ 3,00,000', 'EBIT = ₹ 6,00,000'],
          description: 'EBIT * 0.75 / 5,00,000 = (EBIT - 3,00,000) * 0.75 / 2,50,000. Indifference EBIT = ₹ 6,00,000.'
        },
        {
          step: 'Verification of EPS at Indifference Level',
          marks: 3,
          expectedKeywords: ['EPS under Plan 1 = ₹ 0.90', 'EPS under Plan 2 = ₹ 0.90', 'Verified identical EPS'],
          description: 'At EBIT ₹ 6,00,000: Plan 1 EPS = 4.5L / 5L = ₹ 0.90; Plan 2 EPS = 2.25L / 2.5L = ₹ 0.90.'
        },
        {
          step: 'Recommendation at ₹ 8,00,000 EBIT',
          marks: 2,
          expectedKeywords: ['EBIT ₹ 8,00,000 > Indifference EBIT ₹ 6,00,000', 'Plan 2 generates higher EPS', 'Recommend Plan 2 (Debt Financing)'],
          description: 'Since expected EBIT > Indifference level, Plan 2 (financial leverage) yields higher EPS.'
        }
      ],
      suggestedAnswer: `1. Computation of EBIT-EPS Indifference Point:
- Plan 1: N1 = 5,00,000 Equity Shares; Interest (I1) = 0.
- Plan 2: N2 = 2,50,000 Equity Shares; Interest (I2) = 12% of ₹ 25,00,000 = ₹ 3,00,000.
- Tax rate (t) = 0.25; (1 - t) = 0.75.

Indifference Point Formula:
[(EBIT - I1) × (1 - t)] / N1 = [(EBIT - I2) × (1 - t)] / N2
[EBIT × 0.75] / 5,00,000 = [(EBIT - ₹ 3,00,000) × 0.75] / 2,50,000
EBIT / 2 = EBIT - ₹ 3,00,000
EBIT = 2 × EBIT - ₹ 6,00,000
➔ EBIT = ₹ 6,00,000.
The EBIT-EPS Indifference Point is ₹ 6,00,000.

2. Verification at EBIT = ₹ 6,00,000:
- Plan 1:
  EBIT = ₹ 6,00,000; Tax (25%) = ₹ 1,50,000; EAT = ₹ 4,50,000.
  EPS = ₹ 4,50,000 / 5,00,000 shares = ₹ 0.90.
- Plan 2:
  EBIT = ₹ 6,00,000; Less Interest = ₹ 3,00,000 ➔ EBT = ₹ 3,00,000.
  Tax (25%) = ₹ 75,000 ➔ EAT = ₹ 2,25,000.
  EPS = ₹ 2,25,000 / 2,50,000 shares = ₹ 0.90.
  (Verified identical EPS of ₹ 0.90).

3. Recommendation for Expected EBIT of ₹ 8,00,000:
- When operating EBIT (₹ 8,00,000) EXCEEDS the indifference level (₹ 6,00,000), the leveraged plan (Plan 2) produces a higher EPS due to positive financial leverage.
- At ₹ 8,00,000 EBIT:
  * Plan 1 EPS = (₹ 8,00,000 × 0.75) / 5,00,000 = ₹ 1.20 per share.
  * Plan 2 EPS = [(₹ 8,00,000 - ₹ 3,00,000) × 0.75] / 2,50,000 = ₹ 1.50 per share.
- Recommendation: Recommend PLAN 2 (Debt-Equity Mix) as it maximizes EPS for shareholders.`
    };
  }

  // FM Working Capital Operating Cycle Method
  private static generateFmWorkingCapitalQuestion(): DescriptiveQuestion {
    return {
      id: `dyn_desc_fm_wc_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p6_fm_sm',
      chapterId: 'fm_working_capital',
      type: 'descriptive',
      importance: 'HIGH',
      source: 'ICAI Exam Style: Working Capital Requirement (Cash Cost Approach)',
      marks: 8,
      difficulty: 'Standard ICAI',
      icaiReference: 'Working Capital Management Estimation',
      questionText: `Trident Engineering Ltd manufactures auto parts. Projected annual production and sales is 24,000 units. Cost structure per unit:
- Raw Materials: ₹ 100
- Direct Labour: ₹ 40
- Manufacturing Overheads (including depreciation ₹ 10): ₹ 50
- Total Cost per unit: ₹ 190
- Selling Price: ₹ 240 per unit

Holding periods and trade terms:
- Raw material stock in stores: 1 month
- Work-in-Progress (100% material, 50% labour & overheads): 0.5 month
- Finished Goods in godown: 1 month
- Credit allowed to debtors: 2 months
- Credit allowed by suppliers: 1 month
- Cash and bank balance required to be maintained: ₹ 1,00,000.

Required:
Calculate the Net Working Capital requirement on a CASH COST BASIS (excluding non-cash depreciation). Assume 12 months in a year.`,
      rubrics: [
        {
          step: 'Cash Cost per unit computation',
          marks: 2,
          expectedKeywords: ['Excluding depreciation ₹ 10', 'Cash Overhead = ₹ 40', 'Cash Cost = ₹ 180 per unit'],
          description: 'Cash cost per unit = 100 + 40 + (50 - 10) = ₹ 180.'
        },
        {
          step: 'Current Assets Valuation on Cash Cost Basis',
          marks: 4,
          expectedKeywords: ['Raw Material Stock = ₹ 2,00,000', 'WIP Cash Cost = ₹ 1,40,000', 'Finished Goods = ₹ 3,60,000', 'Debtors on Cash Cost = ₹ 7,20,000', 'Cash Balance = ₹ 1,00,000'],
          description: 'Calculate Raw material, WIP, FG, Debtors at cash cost, and Cash balance.'
        },
        {
          step: 'Current Liabilities and Net Working Capital',
          marks: 2,
          expectedKeywords: ['Creditors = ₹ 2,00,000', 'Net Working Capital = ₹ 13,20,000'],
          description: 'Creditors = 24,000 * 100 / 12 = ₹ 2,00,000. Net WC = Total CA - CL = ₹ 13,20,000.'
        }
      ],
      suggestedAnswer: `WORKING NOTES:
1. Cash Cost Structure per unit:
- Raw Material = ₹ 100
- Direct Labour = ₹ 40
- Cash Overheads (₹ 50 - ₹ 10 depreciation) = ₹ 40
Total Cash Cost per unit = ₹ 180.
Annual Output = 24,000 units.

2. Estimation of Current Assets:
(a) Raw Material Stock (1 month):
    = (24,000 × ₹ 100) × (1 / 12) = ₹ 2,00,000.

(b) Work-in-Progress (0.5 month):
    - Raw Material (100%): 24,000 × ₹ 100 × (0.5 / 12) = ₹ 1,00,000
    - Direct Labour (50%): 24,000 × (50% of ₹ 40) × (0.5 / 12) = ₹ 20,000
    - Cash Overheads (50%): 24,000 × (50% of ₹ 40) × (0.5 / 12) = ₹ 20,000
    Total WIP = ₹ 1,40,000.

(c) Finished Goods Stock (1 month at cash cost of ₹ 180):
    = (24,000 × ₹ 180) × (1 / 12) = ₹ 3,60,000.

(d) Debtors (2 months at Cash Cost):
    = (24,000 × ₹ 180) × (2 / 12) = ₹ 7,20,000.

(e) Minimum Cash Balance = ₹ 1,00,000.
Total Current Assets (A) = ₹ 2,00,000 + ₹ 1,40,000 + ₹ 3,60,000 + ₹ 7,20,000 + ₹ 1,00,000 = ₹ 15,20,000.

3. Estimation of Current Liabilities:
(a) Creditors for Raw Materials (1 month):
    = (24,000 × ₹ 100) × (1 / 12) = ₹ 2,00,000.
Total Current Liabilities (B) = ₹ 2,00,000.

4. Net Working Capital Requirement:
Net Working Capital = Total Current Assets (A) - Total Current Liabilities (B)
= ₹ 15,20,000 - ₹ 2,00,000 = ₹ 13,20,000.`
    };
  }

  // SM Strategic Management Ansoff Matrix
  private static generateSmStrategicModelQuestion(): DescriptiveQuestion {
    return {
      id: `dyn_desc_sm_ansoff_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p6_fm_sm',
      chapterId: 'sm_strategic_mgmt',
      type: 'descriptive',
      importance: 'HIGH',
      source: "ICAI Exam Style: Ansoff's Product-Market Growth Matrix",
      marks: 6,
      difficulty: 'Examiner Favorite',
      icaiReference: "Ansoff's Product-Market Growth Matrix Framework",
      questionText: `Nourish Dairy Ltd is an established brand in packaged milk and curd with an extensive distribution network across northern India.
The Board is evaluating three strategic growth proposals:
Proposal A: Launching aggressive promotional campaigns, loyalty discounts, and bundle pricing for its existing milk and curd to increase market share in its current geographic territories.
Proposal B: Expanding into southern and eastern Indian states with its existing milk and curd product lines.
Proposal C: Venturing into packaged plant-based vegan almond milk and ready-to-eat dairy snacks.

Required:
(i) Identify and explain the specific strategic growth quadrants under Ansoff's Product-Market Matrix for each of the three proposals.
(ii) State which proposal carries the highest business risk and explain why.`,
      rubrics: [
        {
          step: 'Identification of Ansoff Matrix Quadrants',
          marks: 4,
          expectedKeywords: ['Proposal A: Market Penetration (Existing Product, Existing Market)', 'Proposal B: Market Development (Existing Product, New Market)', 'Proposal C: Diversification / Product Development'],
          description: 'Identify Market Penetration for A, Market Development for B, and Product Development/Diversification for C.'
        },
        {
          step: 'Risk Assessment of Growth Strategies',
          marks: 2,
          expectedKeywords: ['Proposal C (Diversification) has highest risk', 'Unfamiliar product technology and customer preferences'],
          description: 'Explain that Diversification carries the highest risk due to departures from current competencies.'
        }
      ],
      suggestedAnswer: `1. Identification under Ansoff's Product-Market Growth Matrix:

(a) Proposal A (Aggressive promotion of existing milk/curd in existing markets):
- Quadrant: MARKET PENETRATION.
- Concept: The firm seeks to sell more of its current products to existing customers. It focuses on gaining market share from competitors, increasing frequency of purchase, and loyalty programs without altering the product or entering new regions.

(b) Proposal B (Existing milk/curd into southern and eastern India):
- Quadrant: MARKET DEVELOPMENT.
- Concept: The firm targets new geographical markets or customer segments with its existing proven products.

(c) Proposal C (Plant-based vegan almond milk and dairy snacks):
- Quadrant: PRODUCT DEVELOPMENT / DIVERSIFICATION.
- Concept: Introducing new product lines (vegan milk/snacks) to existing/adjacent health-conscious markets is Product Development; if sold to completely new customer categories, it represents Related Diversification.

2. Risk Analysis:
- Proposal C carries the HIGHEST BUSINESS RISK.
- Reason: As per Igor Ansoff, Market Penetration has the lowest risk because the firm knows both the product and the market. Diversification/New Product lines carry the highest risk because the company departs from its established core competencies, requiring new supply chains, unknown consumer taste acceptance, and competition against established vegan brand incumbents.`
    };
  }

  // =========================================================================
  // DYNAMIC CASE STUDY GENERATOR (WHOLE SYLLABUS - 15 MARKS INTEGRATED)
  // =========================================================================

  public static generateDynamicCaseStudy(subjectId?: string): CaseStudyQuestion {
    const caseTemplates = [
      this.generateCaseStudyCorporateTaxLaw,
      this.generateCaseStudyAccountsAudit,
      this.generateCaseStudyCostingFm
    ];
    const pick = caseTemplates[Math.floor(Math.random() * caseTemplates.length)];
    return pick();
  }

  // Case Study 1: Corporate Governance, Tax TDS & GST
  private static generateCaseStudyCorporateTaxLaw(): CaseStudyQuestion {
    const turnover = 1200 + Math.floor(Math.random() * 5) * 100;
    const profit = 12 + Math.floor(Math.random() * 4) * 2;
    const csrObligation = Math.round((profit * 0.02) * 100) / 100;
    const sittingFees = 15;
    const landPrice = 4.0;
    const sdvPrice = 4.8;

    const mcq1 = QuestionGeneratorService.buildShuffledMcq(
      {
        id: `cs_dyn_mcq1_${Date.now()}`,
        subjectId: 'p2_law',
        chapterId: 'mgmt_admin',
        type: 'mcq',
        importance: 'HIGH',
        source: 'Case Scenario Q1',
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'Section 101(1) Companies Act, 2013',
        questionText: 'The company issued AGM notice 18 clear days prior to the meeting. Written consent was obtained from 93% of members entitled to vote. Is the shorter notice legally valid?',
      },
      'No, because for an AGM, consent of not less than 95% of members entitled to vote is mandatory',
      [
        'Yes, because consent of more than 90% is legally sufficient',
        'Yes, because unlisted companies need only 14 days notice',
        'No, an AGM cannot be held at shorter notice under any circumstances'
      ]
    );

    const mcq2 = QuestionGeneratorService.buildShuffledMcq(
      {
        id: `cs_dyn_mcq2_${Date.now()}`,
        subjectId: 'p3_tax',
        chapterId: 'gst_supply_charge',
        type: 'mcq',
        importance: 'HIGH',
        source: 'Case Scenario Q2',
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'Notification No. 13/2017 - Central Tax (Rate)',
        questionText: `Regarding sitting fees of ₹ ${sittingFees} Lakhs paid to independent directors, what is the GST mechanism?`,
      },
      'The company is liable to discharge GST under Reverse Charge Mechanism (RCM)',
      [
        'Exempt from GST as it is an employer-employee transaction under Schedule III',
        'Independent directors must collect and pay GST under forward charge',
        'No GST if directors total annual income is below ₹ 20 Lakhs'
      ]
    );

    return {
      id: `case_dyn_corp_tax_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p2_law',
      chapterId: 'accounts_csr',
      title: `Integrated Case Scenario: Bharat Agro-Tech Ltd (Turnover ₹ ${turnover} Cr)`,
      source: 'ICAI Integrated Case Study (15 Marks New Scheme Pattern)',
      importance: 'HIGH',
      totalMarks: 15,
      scenarioText: `Bharat Agro-Tech Ltd is an unlisted public company with registered office in Indore, Madhya Pradesh. The company manufactures micro-irrigation systems.
For the financial year 2023-24, the following transactions and corporate events took place:

1. Financial Parameters:
   - Turnover for the year: ₹ ${turnover} Crores.
   - Preceding 3-year average Net Profit under Section 198: ₹ ${profit} Crores.
   - Net Worth: ₹ 650 Crores.

2. Corporate Meetings & CSR:
   - The company scheduled its AGM on 26th September. Notice was emailed on 7th September (18 clear days). Consent for shorter notice was received from 93% of members entitled to vote.
   - Statutory CSR spend computed at 2% is ₹ ${csrObligation} Crores. The company disbursed ₹ 10 Lakhs towards an ongoing 3-year rural water conservation project, leaving ₹ ${((csrObligation * 100) - 10).toFixed(2)} Lakhs unspent as of 31st March 2024.

3. Taxation & GST:
   - Sitting fees and commission of ₹ ${sittingFees} Lakhs was paid to independent directors.
   - An industrial shed was purchased for ₹ ${landPrice} Crores, whereas the stamp duty circle rate valuation was ₹ ${sdvPrice} Crores. Advance of ₹ 40 Lakhs was paid by NEFT on the agreement date when circle rate was ₹ 4.2 Crores.`,
      mcqs: [mcq1, mcq2],
      descriptiveQuestions: [
        {
          id: `cs_dyn_desc1_${Date.now()}`,
          subjectId: 'p2_law',
          chapterId: 'accounts_csr',
          type: 'descriptive',
          importance: 'HIGH',
          source: 'Case Scenario Q3 (6 Marks Descriptive)',
          marks: 6,
          difficulty: 'Examiner Favorite',
          icaiReference: 'Section 135(5) & 135(6), Companies Act, 2013',
          questionText: `With reference to the ongoing rural water conservation project:
(i) Compute the exact CSR liability under Section 135(5).
(ii) State the statutory procedure and timeline under Section 135(6) for transferring the unspent amount to a special bank account.
(iii) What are the legal penalties if the company fails to comply with Section 135(6)?`,
          rubrics: [
            {
              step: 'Computation of CSR Obligation',
              marks: 2,
              expectedKeywords: [`2% of ₹ ${profit} Crores = ₹ ${csrObligation} Crores`],
              description: `CSR liability = 2% of ₹ ${profit} Cr = ₹ ${csrObligation} Cr.`
            },
            {
              step: 'Section 135(6) Unspent Account Compliance',
              marks: 2,
              expectedKeywords: ['Transfer within 30 days of FY end', 'Unspent CSR Account', 'Spend within 3 financial years'],
              mandatoryCitations: ['Section 135(6)'],
              description: 'Transfer unspent balance to Unspent CSR Account in a scheduled bank within 30 days.'
            },
            {
              step: 'Penalties under Section 135(7)',
              marks: 2,
              expectedKeywords: ['Company penalty: twice the unspent amount or ₹ 1 Crore', 'Officer in default: 1/10th or ₹ 2 Lakhs'],
              mandatoryCitations: ['Section 135(7)'],
              description: 'Explain monetary penalties on company and officers in default.'
            }
          ],
          suggestedAnswer: `1. CSR Obligation:
- Statutory liability = 2% of ₹ ${profit} Crores = ₹ ${csrObligation} Crores (₹ ${(csrObligation * 100).toFixed(2)} Lakhs).

2. Procedure under Section 135(6) for Ongoing Project:
- The unspent CSR amount relating to an ongoing project must be transferred within 30 DAYS from the end of the financial year (i.e. on or before 30th April 2024) to a special account opened in a scheduled bank called "Unspent Corporate Social Responsibility Account".
- Such funds must be spent within a period of 3 financial years from the date of transfer. If still unspent, it must be transferred to a Schedule VII Fund within 30 days from completion of the third financial year.

3. Penalty under Section 135(7):
- Company: Liable to a penalty of twice the amount required to be transferred to the Fund or Unspent CSR Account, or ₹ 1 Crore, whichever is less.
- Every Officer in Default: Liable to a penalty of 1/10th of the amount required to be transferred, or ₹ 2 Lakhs, whichever is less.`
        },
        {
          id: `cs_dyn_desc2_${Date.now()}`,
          subjectId: 'p3_tax',
          chapterId: 'cap_gains',
          type: 'descriptive',
          importance: 'HIGH',
          source: 'Case Scenario Q4 (5 Marks Descriptive)',
          marks: 5,
          difficulty: 'Examiner Favorite',
          icaiReference: 'Section 50C & Section 56(2)(x)',
          questionText: `Examine the tax consequences in the hands of Bharat Agro-Tech Ltd (buyer) and the seller regarding the purchase of the industrial shed for ₹ ${landPrice} Crores against the circle rate of ₹ 4.2 Crores (agreement date) and ₹ ${sdvPrice} Crores (registration date).`,
          rubrics: [
            {
              step: 'Seller Tax Impact under Section 50C',
              marks: 2.5,
              expectedKeywords: ['Agreement date SDV applies (₹ 4.2 Cr)', '110% of ₹ 4.0 Cr = ₹ 4.4 Cr', 'FVOC = ₹ 4.0 Cr'],
              mandatoryCitations: ['Section 50C'],
              description: 'Agreement SDV applies. Since ₹ 4.2 Cr <= 110% of ₹ 4.0 Cr (₹ 4.4 Cr), FVOC is actual ₹ 4.0 Cr.'
            },
            {
              step: 'Buyer Tax Impact under Section 56(2)(x)',
              marks: 2.5,
              expectedKeywords: ['Section 56(2)(x)', 'Difference does not exceed 10%', 'NIL taxable under IFOS'],
              mandatoryCitations: ['Section 56(2)(x)'],
              description: 'Difference of ₹ 0.2 Cr does not exceed 10% tolerance limit; NIL taxable under Section 56(2)(x).'
            }
          ],
          suggestedAnswer: `1. In the Hands of Seller [Section 50C]:
- Since part of the consideration (₹ 40 Lakhs) was paid by NEFT on or before the agreement date, the Stamp Duty Value on the agreement date (₹ 4.2 Crores) is adopted.
- 110% of Actual Consideration = 110% of ₹ 4.0 Crores = ₹ 4.4 Crores.
- Since Agreement SDV (₹ 4.2 Cr) does not exceed 110% of actual consideration (₹ 4.4 Cr), the actual consideration of ₹ 4.0 Crores will be deemed to be Full Value of Consideration.

2. In the Hands of Bharat Agro-Tech Ltd (Buyer) [Section 56(2)(x)]:
- Under Section 56(2)(x), where immovable property is received for inadequate consideration, the excess of SDV over consideration is taxable if it exceeds higher of ₹ 50,000 or 10% of consideration.
- 10% of Consideration = ₹ 40 Lakhs. The difference is ₹ 4.2 Cr - ₹ 4.0 Cr = ₹ 20 Lakhs.
- Since ₹ 20 Lakhs does not exceed ₹ 40 Lakhs, NIL is taxable under Section 56(2)(x).`
        }
      ]
    };
  }

  // Case Study 2: Accounts AS 10 & Audit SA 705
  private static generateCaseStudyAccountsAudit(): CaseStudyQuestion {
    const loan = 100;
    const interest = 11;
    const unrecordedLiability = 85;

    const mcq1 = QuestionGeneratorService.buildShuffledMcq(
      {
        id: `cs_dyn2_mcq1_${Date.now()}`,
        subjectId: 'p1_adv_acc',
        chapterId: 'as_ppe_dep',
        type: 'mcq',
        importance: 'HIGH',
        source: 'Case Scenario Q1',
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'AS 16 Para 10',
        questionText: 'Under AS 16, how should interest earned on temporary investment of specific borrowing during construction be treated?',
      },
      'Deducted from borrowing costs eligible for capitalization to the asset',
      [
        'Credited directly to Statement of Profit and Loss as other income',
        'Transferred to Capital Reserve Account',
        'Added to cost of borrowing to increase asset value'
      ]
    );

    const mcq2 = QuestionGeneratorService.buildShuffledMcq(
      {
        id: `cs_dyn2_mcq2_${Date.now()}`,
        subjectId: 'p5_audit',
        chapterId: 'audit_report',
        type: 'mcq',
        importance: 'HIGH',
        source: 'Case Scenario Q2',
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'SA 705 (Revised)',
        questionText: `An unrecorded liability of ₹ ${unrecordedLiability} Lakhs turns an entity profit of ₹ 60 Lakhs into a net loss. Management refuses adjustment. What audit opinion must be expressed?`,
      },
      'Adverse Opinion (misstatement is both material and pervasive)',
      [
        'Qualified Opinion (material but not pervasive)',
        'Disclaimer of Opinion',
        'Unmodified Opinion with Emphasis of Matter paragraph'
      ]
    );

    return {
      id: `case_dyn_acc_audit_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p1_adv_acc',
      chapterId: 'as_ppe_dep',
      title: 'Integrated Case Scenario: Apex Infra Projects Ltd (AS 10, AS 16 & Audit SA 705)',
      source: 'ICAI Integrated Case Study (15 Marks New Scheme Pattern)',
      importance: 'HIGH',
      totalMarks: 15,
      scenarioText: `Apex Infra Projects Ltd is a road and highway construction company.
During FY 2023-24, the following issues arose:

1. Bridge Construction & Borrowing Costs:
   - The company raised a specific bank loan of ₹ ${loan} Lakhs @ ${interest}% p.a. on 1st June for building a dedicated toll flyover (qualifying asset).
   - Construction was suspended for 2 months during monsoon floods (an abnormal stoppage).
   - Temporary surplus funds earned ₹ 1.2 Lakhs in short term bank deposits.

2. Audit Findings:
   - The statutory auditor discovered an unrecorded arbitration liability of ₹ ${unrecordedLiability} Lakhs arising from a subcontractor dispute.
   - Company reported Profit Before Tax of ₹ 60 Lakhs. The planning materiality is ₹ 12 Lakhs.
   - Management argues that the dispute is subject to appeal and refuses to create a provision or adjust the books.`,
      mcqs: [mcq1, mcq2],
      descriptiveQuestions: [
        {
          id: `cs_dyn2_desc1_${Date.now()}`,
          subjectId: 'p1_adv_acc',
          chapterId: 'as_ppe_dep',
          type: 'descriptive',
          importance: 'HIGH',
          source: 'Case Scenario Q3 (6 Marks Descriptive)',
          marks: 6,
          difficulty: 'Examiner Favorite',
          icaiReference: 'AS 16 Borrowing Costs - Suspension & Capitalization',
          questionText: `Compute the borrowing cost to be capitalized to the toll flyover under AS 16, explaining the treatment of:
(i) Active construction months vs 2 months suspension during flood.
(ii) Temporary deposit income of ₹ 1.2 Lakhs.`,
          rubrics: [
            {
              step: 'Suspension Rule under AS 16',
              marks: 3,
              expectedKeywords: ['Capitalization suspended during extended periods', 'Interest during 2 months charged to P&L', 'Active months only'],
              mandatoryCitations: ['AS 16 Para 17'],
              description: 'Borrowing costs incurred during abnormal suspension must be expensed to P&L.'
            },
            {
              step: 'Capitalization Computation',
              marks: 3,
              expectedKeywords: ['Interest for active months', 'Less temporary deposit income ₹ 1.2 Lakhs', 'Net borrowing cost capitalized'],
              description: 'Compute gross interest for active period less temporary income.'
            }
          ],
          suggestedAnswer: `1. Principle under AS 16:
- Under AS 16 Para 17, capitalization of borrowing costs should be suspended during extended periods in which active development is interrupted. However, capitalization is not normally suspended during a period when substantial technical and administrative work is being carried out or when a temporary delay is a necessary part of the process.
- Stoppage due to abnormal monsoon flood is an abnormal interruption, so borrowing cost for the 2 months must be CHARGED TO PROFIT AND LOSS.

2. Calculation:
- Active construction period = 10 months total - 2 months suspended = 8 months.
- Gross interest for 8 active months = (₹ ${loan} Lakhs × ${interest}% × 8 / 12) = ₹ ${(loan * (interest / 100) * 8 / 12).toFixed(2)} Lakhs.
- Less: Temporary investment income = ₹ 1.20 Lakhs.
- Net Borrowing Cost to be Capitalized = ₹ ${(loan * (interest / 100) * 8 / 12 - 1.2).toFixed(2)} Lakhs.`
        },
        {
          id: `cs_dyn2_desc2_${Date.now()}`,
          subjectId: 'p5_audit',
          chapterId: 'audit_report',
          type: 'descriptive',
          importance: 'HIGH',
          source: 'Case Scenario Q4 (5 Marks Descriptive)',
          marks: 5,
          difficulty: 'Examiner Favorite',
          icaiReference: 'SA 705 (Revised) Modifications to the Opinion',
          questionText: `Draft the "Basis for Adverse Opinion" section for the auditor's report of Apex Infra Projects Ltd under SA 705 (Revised).`,
          rubrics: [
            {
              step: 'Drafting Header and Reason',
              marks: 2.5,
              expectedKeywords: ['Basis for Adverse Opinion heading', 'Unrecorded arbitration liability of ₹ 85 Lakhs', 'Quantification of impact'],
              mandatoryCitations: ['SA 705'],
              description: 'Clear heading and quantification of ₹ 85 Lakhs liability.'
            },
            {
              step: 'True and Fair Distortion Explanation',
              marks: 2.5,
              expectedKeywords: ['Profit converted into net loss', 'Pervasive misstatement', 'Financial statements do not give true and fair view'],
              description: 'Explain that the omission converts profit into net loss, making it pervasive.'
            }
          ],
          suggestedAnswer: `DRAFT AUDIT REPORT SECTION:

Basis for Adverse Opinion:
"As discussed in Note X to the financial statements, the company has not recognized a provision for an arbitration award liability amounting to ₹ ${unrecordedLiability} Lakhs awarded against the company in favour of a subcontractor, which in our opinion should be recognized in accordance with AS 29 'Provisions, Contingent Liabilities and Contingent Assets'.

The company's records indicate that had this provision been recognized, liabilities would have been increased by ₹ ${unrecordedLiability} Lakhs, Profit Before Tax of ₹ 60 Lakhs would have turned into a Net Loss Before Tax of ₹ ${unrecordedLiability - 60} Lakhs, and shareholders' funds would have been reduced by ₹ ${unrecordedLiability} Lakhs.

We conducted our audit in accordance with Standards on Auditing (SAs) specified under Section 143(10) of the Act. We believe that the audit evidence we have obtained is sufficient and appropriate to provide a basis for our adverse opinion."`
        }
      ]
    };
  }

  // Case Study 3: Costing & Financial Management
  private static generateCaseStudyCostingFm(): CaseStudyQuestion {
    const mcq1 = QuestionGeneratorService.buildShuffledMcq(
      {
        id: `cs_dyn3_mcq1_${Date.now()}`,
        subjectId: 'p4_costing',
        chapterId: 'marginal_costing',
        type: 'mcq',
        importance: 'HIGH',
        source: 'Case Scenario Q1',
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'Marginal Costing Decision Rule',
        questionText: 'When surplus plant capacity exists, what is the minimum acceptable price for a special export order that does not increase fixed overheads?',
      },
      'Any price that exceeds the marginal (variable) cost of producing the export units',
      [
        'Total cost of production including standard fixed overhead absorption',
        'Normal domestic selling price plus foreign shipping costs',
        'Direct material cost only'
      ]
    );

    const mcq2 = QuestionGeneratorService.buildShuffledMcq(
      {
        id: `cs_dyn3_mcq2_${Date.now()}`,
        subjectId: 'p6_fm_sm',
        chapterId: 'fm_leverages',
        type: 'mcq',
        importance: 'HIGH',
        source: 'Case Scenario Q2',
        marks: 2,
        difficulty: 'Examiner Favorite',
        icaiReference: 'Combined Leverage Rule',
        questionText: 'If Degree of Operating Leverage (DOL) is 2.5 and Degree of Financial Leverage (DFL) is 1.6, what is the Degree of Combined Leverage (DCL)?',
      },
      '4.0 (DCL = DOL × DFL)',
      [
        '4.1 (DCL = DOL + DFL)',
        '1.56 (DCL = DOL / DFL)',
        '0.9 (DCL = DOL - DFL)'
      ]
    );

    return {
      id: `case_dyn_cost_fm_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p4_costing',
      chapterId: 'marginal_costing',
      title: 'Integrated Case Scenario: Solis Solar Power Ltd (Marginal Costing & Capital Budgeting)',
      source: 'ICAI Integrated Case Study (15 Marks New Scheme Pattern)',
      importance: 'HIGH',
      totalMarks: 15,
      scenarioText: `Solis Solar Power Ltd manufactures commercial solar inverters.
The company is evaluating plant expansion and cost structure optimization:

1. Operational Metrics:
   - Installed capacity: 10,000 inverters per year; Current production & sales: 7,000 units.
   - Domestic Selling Price: ₹ 40,000 per inverter.
   - Variable Cost: ₹ 26,000 per unit (Materials ₹ 18,000, Labour ₹ 5,000, Variable Overheads ₹ 3,000).
   - Fixed Overheads: ₹ 5,60,00,000 per annum.

2. Special Export Inquiry:
   - A German distributor offers to buy 2,500 inverters at ₹ 31,000 per unit.
   - Special EU certification and shockproof packaging costs ₹ 1,500 per unit.

3. Capital Investment Proposal:
   - The company plans to acquire robotic assembly machinery costing ₹ 1,20,00,000 to automate wiring.
   - Estimated life is 4 years with NIL salvage value. Corporate tax rate is 25%.
   - Annual labor cost savings (before depreciation and tax) will be ₹ 45,00,000.`,
      mcqs: [mcq1, mcq2],
      descriptiveQuestions: [
        {
          id: `cs_dyn3_desc1_${Date.now()}`,
          subjectId: 'p4_costing',
          chapterId: 'marginal_costing',
          type: 'descriptive',
          importance: 'HIGH',
          source: 'Case Scenario Q3 (6 Marks Descriptive)',
          marks: 6,
          difficulty: 'Examiner Favorite',
          icaiReference: 'Marginal Costing Differential Decision Statement',
          questionText: `(i) Compute the existing Break-Even Point (in units and value) and Margin of Safety.
(ii) Prepare a differential statement and advise whether Solis Solar Power Ltd should accept the German export order for 2,500 inverters.`,
          rubrics: [
            {
              step: 'Break-Even & Margin of Safety Computation',
              marks: 3,
              expectedKeywords: ['Contribution = ₹ 14,000 per unit', 'BEP = 4,000 units', 'BEP Value = ₹ 16 Crores', 'Margin of Safety = 3,000 units (42.86%)'],
              description: 'Contribution = 40,000 - 26,000 = ₹ 14,000. BEP = 5,60,00,000 / 14,000 = 4,000 units.'
            },
            {
              step: 'Export Order Differential Analysis & Advice',
              marks: 3,
              expectedKeywords: ['Export Variable Cost = ₹ 27,500', 'Unit Contribution = ₹ 3,500', 'Total Profit Increase = ₹ 87,50,000', 'Accept the order'],
              description: 'Export VC = 26,000 + 1,500 = ₹ 27,500. Contribution = ₹ 3,500 * 2,500 = ₹ 87.5 Lakhs.'
            }
          ],
          suggestedAnswer: `1. Domestic Operational Analysis:
- Unit Contribution = SP (₹ 40,000) - VC (₹ 26,000) = ₹ 14,000 per inverter.
- Break-Even Point (Units) = Fixed Costs (₹ 5,60,00,000) / Unit Contribution (₹ 14,000) = 4,000 Inverters.
- Break-Even Sales Value = 4,000 × ₹ 40,000 = ₹ 16,00,00,000 (₹ 16 Crores).
- Margin of Safety (Units) = Actual Sales (7,000) - BEP (4,000) = 3,000 Inverters (42.86%).

2. Evaluation of German Export Order:
- Spare Capacity = 10,000 - 7,000 = 3,000 inverters. The 2,500 order can be fully produced within spare capacity.
- Export Price = ₹ 31,000
- Less: Standard Variable Cost = ₹ 26,000
- Less: EU Certification & Packaging = ₹ 1,500
- Total Relevant Cost = ₹ 27,500 per unit
- Net Contribution per inverter = ₹ 31,000 - ₹ 27,500 = ₹ 3,500 per inverter.
- Total Additional Operating Profit = 2,500 × ₹ 3,500 = ₹ 87,50,000.

Recommendation:
The company should ACCEPT the export order as it generates an incremental profit of ₹ 87.50 Lakhs without affecting domestic sales or fixed costs.`
        },
        {
          id: `cs_dyn3_desc2_${Date.now()}`,
          subjectId: 'p6_fm_sm',
          chapterId: 'fm_cap_budgeting',
          type: 'descriptive',
          importance: 'HIGH',
          source: 'Case Scenario Q4 (5 Marks Descriptive)',
          marks: 5,
          difficulty: 'Examiner Favorite',
          icaiReference: 'Capital Budgeting Cash Flow After Tax & Payback Period',
          questionText: `For the robotic assembly investment of ₹ 1,20,00,000:
(i) Compute the annual Cash Flow After Tax (CFAT).
(ii) Compute the simple Payback Period of the investment.`,
          rubrics: [
            {
              step: 'Annual SLM Depreciation & CFAT',
              marks: 3,
              expectedKeywords: ['Annual Depreciation = ₹ 30,00,000', 'PBT = ₹ 15,00,000', 'Tax @ 25% = ₹ 3,75,000', 'CFAT = ₹ 41,25,000'],
              description: 'Dep = 1.2 Cr / 4 = ₹ 30L. PBT = 45L - 30L = 15L. PAT = 11.25L. CFAT = 11.25 + 30 = ₹ 41.25 Lakhs.'
            },
            {
              step: 'Payback Period',
              marks: 2,
              expectedKeywords: ['Payback Period = Initial Cost / Annual CFAT', '1,20,00,000 / 41,25,000 = 2.91 Years'],
              description: 'Payback Period = 1.20 Cr / 41.25 Lakhs = 2.91 Years.'
            }
          ],
          suggestedAnswer: `1. Computation of Annual Operating CFAT:
- Initial Capital Outlay = ₹ 1,20,00,000; Useful Life = 4 years; Salvage = NIL.
- Annual Straight Line Depreciation = ₹ 1,20,00,000 / 4 = ₹ 30,00,000 p.a.
- Annual Pre-tax Savings = ₹ 45,00,000
- Less: Depreciation = ₹ 30,00,000
- Profit Before Tax (PBT) = ₹ 15,00,000
- Less: Tax @ 25% = ₹ 3,75,000
- Profit After Tax (PAT) = ₹ 11,25,000
- Add: Non-Cash Depreciation = ₹ 30,00,000
Annual Operating Cash Flow After Tax (CFAT) = ₹ 41,25,000.

2. Simple Payback Period:
Payback Period = Initial Outlay / Annual CFAT
= ₹ 1,20,00,000 / ₹ 41,25,000 = 2.909 Years (approx. 2 Years and 11 Months).`
        }
      ]
    };
  }

  // =========================================================================
  // ZERO TO HERO: BEGINNER / FOUNDATION GENERATORS (WHOLE SYLLABUS)
  // =========================================================================

  public static generateAccountsBeginnerMcq(): McqQuestion {
    const variants = [
      {
        q: 'Under AS 2 (Valuation of Inventories), what is the golden valuation principle for finished goods and raw materials in the balance sheet?',
        correct: 'Lower of historical Cost and Net Realisable Value (NRV)',
        wrong: ['Higher of Cost and Selling Price', 'Always at original Purchase Invoice Cost without write-down', 'At Replacement Market Cost']
      },
      {
        q: 'As per AS 16 Borrowing Costs, what qualifies an asset as a "Qualifying Asset" for interest capitalization?',
        correct: 'An asset that necessarily takes a substantial period of time to get ready for its intended use or sale',
        wrong: ['Any asset bought using bank loan funds regardless of time taken', 'Only financial assets like listed equity shares and bonds', 'Inventories purchased and sold within ordinary daily business']
      },
      {
        q: 'In the vertical format of a Company Balance Sheet prescribed under Schedule III of the Companies Act 2013, under which major head is "Securities Premium" presented?',
        correct: 'Shareholders’ Funds ➔ Reserves & Surplus',
        wrong: ['Non-Current Liabilities ➔ Long Term Borrowings', 'Current Liabilities ➔ Other Financial Liabilities', 'Current Assets ➔ Cash & Cash Equivalents']
      }
    ];
    const pick = variants[Math.floor(Math.random() * variants.length)];
    return this.buildShuffledMcq(
      {
        id: `dyn_beg_acc_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p1_adv_acc',
        chapterId: 'as_framework',
        type: 'mcq',
        importance: 'HIGH',
        source: 'Beginner Foundation (Learn from Scratch)',
        marks: 2,
        difficulty: 'Beginner / Foundation',
        masteryTier: 'beginner',
        icaiReference: 'ICAI Foundation & AS Core Concepts',
        questionText: pick.q,
        explanation: 'Foundation Concept: Understanding the core standard prevents confusion. Always remember statutory prudence and vertical Schedule III classifications.'
      },
      pick.correct,
      pick.wrong
    );
  }

  public static generateLawBeginnerMcq(): McqQuestion {
    const variants = [
      {
        q: 'As per Section 101 of the Companies Act 2013, what is the statutory minimum notice required for calling an Annual General Meeting (AGM)?',
        correct: 'Not less than 21 clear days notice in writing or by electronic mode',
        wrong: ['7 days notice', '14 days notice', '30 days notice']
      },
      {
        q: 'Under the Companies Act 2013, what is the required majority to pass a "Special Resolution" in a general meeting?',
        correct: 'Votes cast in favor must be at least 3 times the votes cast against (75% or more)',
        wrong: ['Simple majority of votes (> 50%)', '100% unanimous consent of all registered members', 'Consent of Board of Directors alone without members']
      },
      {
        q: 'Under Section 103, what is the statutory quorum for an AGM of a Public Company having less than or equal to 1,000 members?',
        correct: '5 members personally present',
        wrong: ['2 members personally present', '15 members personally present', '30 members personally present']
      }
    ];
    const pick = variants[Math.floor(Math.random() * variants.length)];
    return this.buildShuffledMcq(
      {
        id: `dyn_beg_law_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p2_law',
        chapterId: 'mgmt_admin',
        type: 'mcq',
        importance: 'HIGH',
        source: 'Beginner Foundation (Learn from Scratch)',
        marks: 2,
        difficulty: 'Beginner / Foundation',
        masteryTier: 'beginner',
        icaiReference: 'Companies Act 2013 Core Provisions',
        questionText: pick.q,
        explanation: 'Foundation Law Concept: Clear days exclude day of sending and meeting. Quorum counts only members personally present, not proxies.'
      },
      pick.correct,
      pick.wrong
    );
  }

  public static generateTaxBeginnerMcq(): McqQuestion {
    const variants = [
      {
        q: 'In Income Tax terminology, what is the fundamental difference between Previous Year (PY) and Assessment Year (AY)?',
        correct: 'Income earned during the Previous Year is evaluated and taxed in the following Assessment Year',
        wrong: ['Previous Year is when you pay tax, Assessment Year is when you earn money', 'Both terms mean the exact same 12-month period', 'Previous Year applies only to companies, Assessment Year applies only to individuals']
      },
      {
        q: 'Under Section 14 of the Income Tax Act 1961, all taxable income is categorized into how many Heads of Income?',
        correct: '5 Heads (Salaries, House Property, PGBP, Capital Gains, Other Sources)',
        wrong: ['3 Heads (Salaries, Business, Capital Gains)', '7 Heads (including Agriculture and Dividends)', 'Only 2 Heads (Direct Income and Indirect Income)']
      },
      {
        q: 'When goods are supplied between two different States (e.g. from Gujarat to Karnataka), which type of GST is levied?',
        correct: 'Integrated GST (IGST) levied by the Central Government',
        wrong: ['Central GST (CGST) and State GST (SGST) equally', 'Only Gujarat SGST', 'Customs Import Duty']
      }
    ];
    const pick = variants[Math.floor(Math.random() * variants.length)];
    return this.buildShuffledMcq(
      {
        id: `dyn_beg_tax_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p3_tax',
        chapterId: 'res_status',
        type: 'mcq',
        importance: 'HIGH',
        source: 'Beginner Foundation (Learn from Scratch)',
        marks: 2,
        difficulty: 'Beginner / Foundation',
        masteryTier: 'beginner',
        icaiReference: 'Income Tax & GST Basic Architecture',
        questionText: pick.q,
        explanation: 'Foundation Tax Concept: PY is the earning year, AY is assessment year. Inter-state supply is governed by the IGST Act.'
      },
      pick.correct,
      pick.wrong
    );
  }

  public static generateCostingBeginnerMcq(): McqQuestion {
    const variants = [
      {
        q: 'In Cost Accounting, what comprises "Prime Cost" in the Cost Sheet?',
        correct: 'Direct Materials Consumed + Direct Labour + Direct Expenses',
        wrong: ['Factory Cost + Administrative Overheads', 'Total Sales minus Net Profit', 'Direct Materials + Factory Rent']
      },
      {
        q: 'When the volume of factory production increases, how does Fixed Cost behave?',
        correct: 'Total Fixed Cost remains constant, while Fixed Cost per unit decreases',
        wrong: ['Total Fixed Cost increases in direct proportion to units produced', 'Fixed Cost per unit remains constant', 'Both total and per unit fixed costs increase']
      },
      {
        q: 'What does the "Break-Even Point (BEP)" represent in Marginal Costing?',
        correct: 'The sales volume where Total Revenue equals Total Costs (Zero Profit and Zero Loss)',
        wrong: ['The point of maximum possible profit', 'The sales volume where Variable Costs are zero', 'The point where only income tax is paid']
      }
    ];
    const pick = variants[Math.floor(Math.random() * variants.length)];
    return this.buildShuffledMcq(
      {
        id: `dyn_beg_cost_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p4_costing',
        chapterId: 'marginal_costing',
        type: 'mcq',
        importance: 'HIGH',
        source: 'Beginner Foundation (Learn from Scratch)',
        marks: 2,
        difficulty: 'Beginner / Foundation',
        masteryTier: 'beginner',
        icaiReference: 'Cost Accounting Fundamentals',
        questionText: pick.q,
        explanation: 'Foundation Costing Concept: Prime cost represents direct production costs. Break-even occurs when Contribution equals Fixed Cost.'
      },
      pick.correct,
      pick.wrong
    );
  }

  public static generateAuditBeginnerMcq(): McqQuestion {
    const variants = [
      {
        q: 'What is the primary objective of an independent statutory audit of financial statements as per SA 200?',
        correct: 'To express an independent professional opinion on whether the financial statements give a True and Fair View',
        wrong: ['To guarantee 100% mathematical accuracy with zero risk of error', 'To prepare and write the company books of accounts', 'To act as an insurance policy against company bankruptcy']
      },
      {
        q: 'In SA 500 "Audit Evidence", what do the terms "Sufficiency" and "Appropriateness" signify?',
        correct: 'Sufficiency is the measure of the quantity of evidence; Appropriateness is the measure of the quality (relevance and reliability)',
        wrong: ['Sufficiency refers to quality while Appropriateness refers to quantity', 'Both terms mean the exact number of physical invoices inspected', 'Sufficiency applies to management while Appropriateness applies to auditors']
      },
      {
        q: 'When an auditor concludes that financial statements give a true and fair view in accordance with accounting standards without any material reservation, which report is issued?',
        correct: 'Unmodified (Clean) Audit Opinion',
        wrong: ['Qualified Opinion', 'Adverse Opinion', 'Disclaimer of Opinion']
      }
    ];
    const pick = variants[Math.floor(Math.random() * variants.length)];
    return this.buildShuffledMcq(
      {
        id: `dyn_beg_aud_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p5_audit',
        chapterId: 'audit_report',
        type: 'mcq',
        importance: 'HIGH',
        source: 'Beginner Foundation (Learn from Scratch)',
        marks: 2,
        difficulty: 'Beginner / Foundation',
        masteryTier: 'beginner',
        icaiReference: 'SA 200, 500 & 700 Core Concepts',
        questionText: pick.q,
        explanation: 'Foundation Auditing Concept: Auditors provide reasonable assurance (not absolute), expressing an opinion on True and Fair view.'
      },
      pick.correct,
      pick.wrong
    );
  }

  public static generateFmSmBeginnerMcq(): McqQuestion {
    const variants = [
      {
        q: 'Why is ₹ 1,00,000 received today worth more than ₹ 1,00,000 to be received three years from now?',
        correct: 'Because money today can earn interest, and future purchasing power is eroded by inflation and risk',
        wrong: ['Because the face value of currency notes expires in 3 years', 'Because taxes are never paid on money received today', 'Because accounting standards prohibit receiving money in the future']
      },
      {
        q: 'In Financial Management, how is the Degree of Combined Leverage (DCL) mathematically determined?',
        correct: 'Degree of Operating Leverage × Degree of Financial Leverage (DOL × DFL)',
        wrong: ['Degree of Operating Leverage + Degree of Financial Leverage (DOL + DFL)', 'Operating Profit divided by Sales', 'Net Profit divided by Total Assets']
      },
      {
        q: 'In Strategic Management, which elements of the SWOT framework represent INTERNAL factors of the organization?',
        correct: 'Strengths and Weaknesses',
        wrong: ['Opportunities and Threats', 'Strengths and Opportunities', 'Weaknesses and Threats']
      }
    ];
    const pick = variants[Math.floor(Math.random() * variants.length)];
    return this.buildShuffledMcq(
      {
        id: `dyn_beg_fmsm_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        subjectId: 'p6_fm_sm',
        chapterId: 'fm_leverages',
        type: 'mcq',
        importance: 'HIGH',
        source: 'Beginner Foundation (Learn from Scratch)',
        marks: 2,
        difficulty: 'Beginner / Foundation',
        masteryTier: 'beginner',
        icaiReference: 'FM & SM Core Principles',
        questionText: pick.q,
        explanation: 'Foundation FM-SM Concept: Time value of money reflects earning power & inflation. Strengths and Weaknesses are internal factors in SWOT.'
      },
      pick.correct,
      pick.wrong
    );
  }
}
