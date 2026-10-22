import { DescriptiveQuestion, McqQuestion } from '../types/question';

export class QuestionGeneratorService {
  /**
   * Generates an infinite stream of brand-new, high-quality ICAI MCQs.
   */
  public static generateDynamicMcq(subjectId?: string): McqQuestion {
    const subjects = ['p1_adv_acc', 'p2_law', 'p3_tax', 'p4_costing', 'p5_audit', 'p6_fm_sm'];
    const chosenSubject = subjectId && subjectId !== 'all' ? subjectId : subjects[Math.floor(Math.random() * subjects.length)];

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

  // --- ACCOUNTS MCQs ---
  private static generateAccountsMcq(): McqQuestion {
    const loanLakhs = [40, 50, 60, 80, 100][Math.floor(Math.random() * 5)];
    const rate = [9, 10, 11, 12][Math.floor(Math.random() * 4)];
    const activeMonths = [6, 7, 8, 9][Math.floor(Math.random() * 4)];
    const suspendedMonths = [1, 2, 3][Math.floor(Math.random() * 3)];
    const tempIncome = [20000, 30000, 45000, 50000][Math.floor(Math.random() * 4)];

    const activeInterest = Math.round((loanLakhs * 100000 * (rate / 100) * (activeMonths / 12)));
    const netCapitalized = activeInterest - tempIncome;
    const wrongFullInterest = Math.round((loanLakhs * 100000 * (rate / 100) * ((activeMonths + suspendedMonths) / 12)));

    const id = `dyn_mcq_acc_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    return {
      id,
      subjectId: 'p1_adv_acc',
      chapterId: 'as_ppe_dep',
      type: 'mcq',
      importance: 'HIGH',
      source: `Dynamic ICAI Variant (AS 16 Borrowing Costs)`,
      marks: 2,
      difficulty: 'Examiner Favorite',
      icaiReference: 'AS 16 Borrowing Costs - Para 6, 14 & 17',
      questionText: `An entity obtained a specific bank borrowing of ₹ ${loanLakhs} Lakhs at ${rate}% p.a. for construction of a qualifying plant. Construction was active for ${activeMonths} months during the financial year, but abnormal flood halt occurred for ${suspendedMonths} months during which work was fully interrupted. Prior to deployment, temporary placement of funds generated interest income of ₹ ${tempIncome.toLocaleString('en-IN')}. What is the exact borrowing cost to be capitalized to the qualifying asset as per AS 16?`,
      options: [
        { id: 'a', text: `₹ ${netCapitalized.toLocaleString('en-IN')} (Capitalized for ${activeMonths} active months less temporary income)` },
        { id: 'b', text: `₹ ${wrongFullInterest.toLocaleString('en-IN')} (Gross interest for all ${activeMonths + suspendedMonths} months without suspension)` },
        { id: 'c', text: `₹ ${activeInterest.toLocaleString('en-IN')} (Active period interest without deducting temporary income)` },
        { id: 'd', text: `NIL (AS 16 requires entire interest to be charged to Profit and Loss)` }
      ],
      correctOptionId: 'a',
      trapNote: 'Trap: AS 16 mandates that capitalization of borrowing costs must be suspended during extended periods in which active development is interrupted. Also, temporary investment income earned on specific borrowings must be deducted.',
      explanation: `Under AS 16, interest during the ${suspendedMonths} months of abnormal stoppage is charged directly to Statement of Profit & Loss. Interest for ${activeMonths} active months = ₹ ${loanLakhs}L × ${rate}% × (${activeMonths}/12) = ₹ ${activeInterest.toLocaleString('en-IN')}. Less temporary interest income of ₹ ${tempIncome.toLocaleString('en-IN')} = Net capitalizable borrowing cost of ₹ ${netCapitalized.toLocaleString('en-IN')}.`
    };
  }

  // --- LAW MCQs ---
  private static generateLawMcq(): McqQuestion {
    const netWorth = [450, 520, 600, 380][Math.floor(Math.random() * 4)];
    const turnover = [850, 920, 1050, 1200][Math.floor(Math.random() * 4)];
    const netProfit = [4.2, 5.5, 6.8, 3.8][Math.floor(Math.random() * 4)];

    const satisfies = netWorth >= 500 || turnover >= 1000 || netProfit >= 5;
    const correctReason = satisfies
      ? `Yes, because company meets the statutory criterion (${netWorth >= 500 ? 'Net Worth >= 500 Cr' : turnover >= 1000 ? 'Turnover >= 1000 Cr' : 'Net Profit >= 5 Cr'}) in the preceding financial year.`
      : `No, because none of the three thresholds (Net Worth >= 500 Cr, Turnover >= 1000 Cr, Net Profit >= 5 Cr) are breached.`;

    const id = `dyn_mcq_law_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    return {
      id,
      subjectId: 'p2_law',
      chapterId: 'accounts_csr',
      type: 'mcq',
      importance: 'HIGH',
      source: `Dynamic ICAI Variant (Section 135 CSR Applicability)`,
      marks: 2,
      difficulty: 'Examiner Favorite',
      icaiReference: 'Section 135(1) Companies Act, 2013',
      questionText: `A public company reports the following financial figures for the immediately preceding financial year:
- Net Worth: ₹ ${netWorth} Crores
- Turnover: ₹ ${turnover} Crores
- Net Profit (u/s 198): ₹ ${netProfit} Crores

Is the company required to constitute a Corporate Social Responsibility (CSR) Committee for the current financial year?`,
      options: [
        { id: 'a', text: satisfies ? `Yes, company is mandatorily required to constitute a CSR Committee` : `No, company is NOT required to constitute a CSR Committee` },
        { id: 'b', text: satisfies ? `No, CSR is only applicable if both Turnover AND Net Profit thresholds are met simultaneously` : `Yes, CSR is compulsory for all public companies regardless of turnover or net profit` },
        { id: 'c', text: `CSR applies only if paid-up equity share capital exceeds ₹ 100 Crores` },
        { id: 'd', text: `CSR Committee is optional if company has less than 50 shareholders` }
      ],
      correctOptionId: 'a',
      trapNote: 'The 3 thresholds of Section 135(1) are connected with "OR", not "AND". Meeting any single one of Net Worth >= 500 Cr, Turnover >= 1000 Cr, or Net Profit >= 5 Cr triggers mandatory CSR.',
      explanation: `As per Section 135(1) of the Companies Act, 2013, CSR provisions are attracted if a company has: Net Worth >= ₹ 500 Cr, OR Turnover >= ₹ 1,000 Cr, OR Net Profit >= ₹ 5 Cr in the preceding financial year. ${correctReason}`
    };
  }

  // --- TAXATION MCQs ---
  private static generateTaxMcq(): McqQuestion {
    const grossSalary = [1400000, 1600000, 1800000, 2000000][Math.floor(Math.random() * 4)];
    const stdDed = 75000;
    const ppf = 150000;
    const mediclaim = 25000;

    const netTaxableNew = grossSalary - stdDed;
    const wrongNetWith80C = grossSalary - stdDed - ppf - mediclaim;

    const id = `dyn_mcq_tax_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    return {
      id,
      subjectId: 'p3_tax',
      chapterId: 'total_income_comp',
      type: 'mcq',
      importance: 'HIGH',
      source: `Dynamic ICAI Variant (Section 115BAC Default Regime)`,
      marks: 2,
      difficulty: 'Examiner Favorite',
      icaiReference: 'Section 115BAC(1A) & Section 16(ia)',
      questionText: `Mr. Rohan (aged 35 years) has Gross Salary of ₹ ${grossSalary.toLocaleString('en-IN')}. He paid PPF of ₹ ${ppf.toLocaleString('en-IN')} and Mediclaim premium of ₹ ${mediclaim.toLocaleString('en-IN')}. He opts for the default tax regime under Section 115BAC(1A). What is his Net Taxable Income under the Income Tax Act?`,
      options: [
        { id: 'a', text: `₹ ${netTaxableNew.toLocaleString('en-IN')} (Only Standard Deduction of ₹ 75,000 allowable; Chapter VI-A 80C/80D disallowed)` },
        { id: 'b', text: `₹ ${wrongNetWith80C.toLocaleString('en-IN')} (After deducting ₹ 75,000 standard deduction + PPF + Mediclaim)` },
        { id: 'c', text: `₹ ${grossSalary.toLocaleString('en-IN')} (No deductions allowed under Section 115BAC)` },
        { id: 'd', text: `₹ ${(grossSalary - 50000).toLocaleString('en-IN')} (Only ₹ 50,000 standard deduction allowable)` }
      ],
      correctOptionId: 'a',
      trapNote: 'Trap: Under Section 115BAC, Chapter VI-A deductions (80C, 80D) are strictly inadmissible, but Standard Deduction from salary u/s 16(ia) is allowable (updated limit ₹ 75,000).',
      explanation: `Under Section 115BAC(1A), Standard Deduction of ₹ 75,000 under Section 16(ia) is eligible for salary earners. Deductions under Chapter VI-A (Section 80C for PPF and Section 80D for Mediclaim) are not allowed under the default new tax regime. Net Taxable Income = ₹ ${grossSalary.toLocaleString('en-IN')} - ₹ 75,000 = ₹ ${netTaxableNew.toLocaleString('en-IN')}.`
    };
  }

  // --- COSTING MCQs ---
  private static generateCostingMcq(): McqQuestion {
    const annualDemand = [10000, 12000, 16000, 20000][Math.floor(Math.random() * 4)];
    const orderCost = [100, 150, 200][Math.floor(Math.random() * 3)];
    const carryCost = [2, 3, 4, 5][Math.floor(Math.random() * 4)];

    // EOQ = sqrt(2 * A * O / C)
    const eoqRaw = Math.sqrt((2 * annualDemand * orderCost) / carryCost);
    const eoq = Math.round(eoqRaw);

    const id = `dyn_mcq_cost_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    return {
      id,
      subjectId: 'p4_costing',
      chapterId: 'material_cost',
      type: 'mcq',
      importance: 'HIGH',
      source: `Dynamic ICAI Variant (Economic Order Quantity)`,
      marks: 2,
      difficulty: 'Standard ICAI',
      icaiReference: 'EOQ Formula: sqrt(2 * A * O / C)',
      questionText: `A manufacturing concern has Annual Consumption of raw material = ${annualDemand.toLocaleString('en-IN')} units. Cost of placing and processing an order = ₹ ${orderCost}. Cost of carrying one unit of inventory for one year = ₹ ${carryCost}. What is the Economic Order Quantity (EOQ)?`,
      options: [
        { id: 'a', text: `${eoq} units` },
        { id: 'b', text: `${Math.round(eoq * 1.414)} units` },
        { id: 'c', text: `${Math.round(eoq * 0.707)} units` },
        { id: 'd', text: `${Math.round(eoq * 0.5)} units` }
      ],
      correctOptionId: 'a',
      trapNote: 'Remember EOQ formula is Square Root of [(2 * Annual Consumption * Ordering Cost) / Carrying Cost per unit per annum].',
      explanation: `EOQ = √[(2 × Annual Demand × Ordering Cost) / Carrying Cost] = √[(2 × ${annualDemand} × ${orderCost}) / ${carryCost}] = √${Math.round((2 * annualDemand * orderCost) / carryCost)} = ${eoq} units.`
    };
  }

  // --- AUDITING MCQs ---
  private static generateAuditMcq(): McqQuestion {
    const scenarios = [
      {
        text: 'The auditor obtains sufficient appropriate audit evidence that financial misstatements are both Material AND Pervasive to the financial statements.',
        ans: 'Adverse Opinion',
        trap: 'Qualified Opinion is for material but NOT pervasive. Adverse is for material AND pervasive when evidence is obtained.',
        ref: 'SA 705 Para 8'
      },
      {
        text: 'The auditor is unable to obtain sufficient appropriate audit evidence, and concludes that the possible undetected misstatements could be both Material AND Pervasive.',
        ans: 'Disclaimer of Opinion',
        trap: 'When evidence CANNOT be obtained and effect is pervasive, SA 705 requires a Disclaimer of Opinion.',
        ref: 'SA 705 Para 9'
      },
      {
        text: 'The auditor finds a misstatement of ₹ 25 Lakhs (materiality is ₹ 15 Lakhs), but the misstatement is isolated to valuation of a specific obsolete inventory lot and not pervasive to the statements as a whole.',
        ans: 'Qualified Opinion ("Except for...")',
        trap: 'Material but NOT pervasive misstatement warrants a Qualified Opinion.',
        ref: 'SA 705 Para 7'
      }
    ];

    const pick = scenarios[Math.floor(Math.random() * scenarios.length)];
    const id = `dyn_mcq_audit_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    return {
      id,
      subjectId: 'p5_audit',
      chapterId: 'audit_report',
      type: 'mcq',
      importance: 'HIGH',
      source: `Dynamic ICAI Variant (SA 705 Audit Opinions)`,
      marks: 2,
      difficulty: 'Examiner Favorite',
      icaiReference: pick.ref,
      questionText: `In an external statutory audit: ${pick.text} Which form of audit opinion must the auditor issue under SA 705 (Revised)?`,
      options: [
        { id: 'a', text: pick.ans },
        { id: 'b', text: pick.ans.includes('Adverse') ? 'Qualified Opinion' : 'Adverse Opinion' },
        { id: 'c', text: 'Unmodified Opinion with Emphasis of Matter paragraph' },
        { id: 'd', text: pick.ans.includes('Disclaimer') ? 'Adverse Opinion' : 'Disclaimer of Opinion' }
      ],
      correctOptionId: 'a',
      trapNote: pick.trap,
      explanation: `As per SA 705 (Revised): 
- Qualified Opinion: Misstatements are material but NOT pervasive.
- Adverse Opinion: Having obtained SAAE, misstatements are BOTH material and pervasive.
- Disclaimer of Opinion: Unable to obtain SAAE and possible effects are BOTH material and pervasive.`
    };
  }

  // --- FM & SM MCQs ---
  private static generateFmSmMcq(): McqQuestion {
    const dol = [1.5, 2.0, 2.5, 3.0][Math.floor(Math.random() * 4)];
    const dfl = [1.2, 1.4, 1.6, 2.0][Math.floor(Math.random() * 4)];
    const salesChange = [5, 8, 10, 15][Math.floor(Math.random() * 4)];

    const dcl = Math.round((dol * dfl) * 100) / 100;
    const epsChange = Math.round((dcl * salesChange) * 10) / 10;
    const wrongSumChange = Math.round(((dol + dfl) * salesChange) * 10) / 10;

    const id = `dyn_mcq_fmsm_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    return {
      id,
      subjectId: 'p6_fm_sm',
      chapterId: 'fm_leverages',
      type: 'mcq',
      importance: 'HIGH',
      source: `Dynamic ICAI Variant (Combined Leverage)`,
      marks: 2,
      difficulty: 'Examiner Favorite',
      icaiReference: 'Leverages: DCL = DOL * DFL',
      questionText: `A firm has Degree of Operating Leverage (DOL) = ${dol} and Degree of Financial Leverage (DFL) = ${dfl}. If the company’s sales increase by ${salesChange}%, what will be the percentage increase in Earnings Per Share (EPS)?`,
      options: [
        { id: 'a', text: `${epsChange}% (DCL = ${dol} × ${dfl} = ${dcl}; ${dcl} × ${salesChange}%)` },
        { id: 'b', text: `${wrongSumChange}% (Calculated by adding DOL + DFL)` },
        { id: 'c', text: `${Math.round(dol * salesChange)}% (Based on DOL only)` },
        { id: 'd', text: `${Math.round(dfl * salesChange)}% (Based on DFL only)` }
      ],
      correctOptionId: 'a',
      trapNote: 'Degree of Combined Leverage is the MULTIPLIER (DOL × DFL), not the sum (DOL + DFL).',
      explanation: `Degree of Combined Leverage (DCL) = DOL × DFL = ${dol} × ${dfl} = ${dcl}. Percentage change in EPS = DCL × Percentage change in Sales = ${dcl} × ${salesChange}% = ${epsChange}%.`
    };
  }

  // --- DESCRIPTIVE QUESTIONS GENERATOR ---
  public static generateDynamicDescriptiveQuestion(topicKey?: string): DescriptiveQuestion {
    const generatorList = [
      this.generateCostingVarianceQuestion,
      this.generateIncomeTax115BACQuestion,
      this.generateLawCSRQuestion,
      this.generateAuditingSA705Question,
      this.generateFmCapitalBudgetingQuestion,
      this.generateAs16BorrowingCostQuestion
    ];

    if (topicKey === 'costing' || topicKey === 'p4_costing') return this.generateCostingVarianceQuestion();
    if (topicKey === 'tax' || topicKey === 'p3_tax') return this.generateIncomeTax115BACQuestion();
    if (topicKey === 'law' || topicKey === 'p2_law') return this.generateLawCSRQuestion();
    if (topicKey === 'audit' || topicKey === 'p5_audit') return this.generateAuditingSA705Question();
    if (topicKey === 'fm' || topicKey === 'p6_fm_sm') return this.generateFmCapitalBudgetingQuestion();
    if (topicKey === 'accounts' || topicKey === 'p1_adv_acc') return this.generateAs16BorrowingCostQuestion();

    const randomIndex = Math.floor(Math.random() * generatorList.length);
    return generatorList[randomIndex]();
  }

  // Costing Variance Generator
  private static generateCostingVarianceQuestion(): DescriptiveQuestion {
    const stdKgA = 3;
    const stdRateA = 40;
    const stdKgB = 5;
    const stdRateB = 25;
    const stdOutput = 7;
    const actualUnits = 1400 + Math.floor(Math.random() * 5) * 70;
    const factor = actualUnits / stdOutput;
    const sqA = factor * stdKgA;
    const sqB = factor * stdKgB;

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
      id: `dyn_cost_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p4_costing',
      chapterId: 'standard_costing',
      type: 'descriptive',
      importance: 'HIGH',
      source: `Dynamic ICAI Variant (Standard Costing - ${actualUnits} Units)`,
      marks: 10,
      difficulty: 'Examiner Favorite',
      icaiReference: 'Standard Costing Material Variance Rules',
      questionText: `Global Synthetics Ltd. manufactures a chemical compound "Poly-Z". The standard mix to produce 7 kg of Poly-Z requires:
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
   Standard Cost = (${sqA} × ₹ ${stdRateA}) + (${sqB} × ₹ ${stdRateB}) = ₹ ${(sqA * stdRateA) + (sqB * stdRateB)}
   Actual Cost = (${actKgA} × ₹ ${actRateA}) + (${actKgB} × ₹ ${actRateB}) = ₹ ${(actKgA * actRateA) + (actKgB * actRateB)}
   Total MCV = Standard Cost - Actual Cost = ₹ ${Math.abs(totalMcv)} (${totalMcv >= 0 ? 'Favourable' : 'Adverse'})

RECONCILIATION:
MCV = MPV + MUV
₹ ${Math.abs(totalMcv)} (${totalMcv >= 0 ? 'F' : 'A'}) = ₹ ${Math.abs(totalMpv)} (${totalMpv >= 0 ? 'F' : 'A'}) + ₹ ${Math.abs(totalMuv)} (${totalMuv >= 0 ? 'F' : 'A'}) [Reconciled Successfully].`
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
      id: `dyn_tax_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
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
      suggestedAnswer: `COMPUTATION OF TOTAL INCOME & TAX LIABILITY OF MR. SIDDHARTH (AY 2024-25)
[Opting for Default Tax Regime under Section 115BAC(1A)]

1. Income from Salaries:
   - Gross Salary = ₹ ${grossSalary.toLocaleString('en-IN')}
   - Less: Standard Deduction under Section 16(ia) = ₹ ${stdDed.toLocaleString('en-IN')}
   Net Taxable Salary = ₹ ${netSalary.toLocaleString('en-IN')}

2. Income from Other Sources:
   - Savings Bank Interest = ₹ ${interestSavings.toLocaleString('en-IN')}
   Gross Total Income = ₹ ${grossTotalIncome.toLocaleString('en-IN')}

3. Deductions under Chapter VI-A:
   - Section 80C (PPF): NIL (Disallowed under Section 115BAC)
   - Section 80D (Mediclaim): NIL (Disallowed under Section 115BAC)
   Total Taxable Income = ₹ ${grossTotalIncome.toLocaleString('en-IN')}

4. Tax on Total Income under Section 115BAC(1A):
   - First ₹ 15,00,000 = ₹ 1,50,000
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
      id: `dyn_law_csr_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p2_law',
      chapterId: 'accounts_csr',
      type: 'descriptive',
      importance: 'HIGH',
      source: `Dynamic ICAI Variant (CSR Section 135 & Unspent Rules)`,
      marks: 6,
      difficulty: 'Examiner Favorite',
      icaiReference: 'Section 135 Companies Act, 2013',
      questionText: `Vardhman Textiles Ltd. had Net Profits calculated under Section 198 for the preceding three financial years:
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
Vardhman Textiles Ltd. has Turnover of ₹ 1,100 Crores (exceeding ₹ 1,000 Cr) and Net Profit of Year 3 of ₹ ${netProfits[2]} Crores (exceeding ₹ 5 Cr). Hence, CSR applies mandatorily.

2. Statutory CSR Expenditure [Section 135(5)]:
- Total Net Profit of preceding 3 years = ₹ ${netProfits[0] + netProfits[1] + netProfits[2]} Crores.
- Average Net Profit = ₹ ${avgProfit} Crores.
- Minimum CSR Spend = 2% of ₹ ${avgProfit} Crores = ₹ ${csrAmountLakhs} Lakhs.

3. Treatment of Unspent Ongoing Project [Section 135(6)]:
The unspent amount of ₹ 5 Lakhs must be transferred to a special bank account called "Unspent Corporate Social Responsibility Account" within 30 days from the end of the financial year (i.e., by 30th April). It must be spent on the ongoing project within 3 financial years, failing which it must be transferred to a Fund specified in Schedule VII.`
    };
  }

  // Auditing SA 705 Generator
  private static generateAuditingSA705Question(): DescriptiveQuestion {
    return {
      id: `dyn_audit_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
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
      id: `dyn_fm_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
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
      id: `dyn_acc_as16_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subjectId: 'p1_adv_acc',
      chapterId: 'as_ppe_dep',
      type: 'descriptive',
      importance: 'HIGH',
      source: `Dynamic ICAI Variant (AS 16 Borrowing Costs Capitalization)`,
      marks: 5,
      difficulty: 'Examiner Favorite',
      icaiReference: 'AS 16 Borrowing Costs - Para 6 & 10',
      questionText: `Kiran Refineries Ltd. obtained a specific loan of ₹ ${loan.toLocaleString('en-IN')} at ${rate}% p.a. for construction of a chemical cracking unit (a qualifying asset). Construction began on 1st August and was completed on 31st March (${activeMonths} months).
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
}
