import { DescriptiveQuestion, McqQuestion } from '../types/question';

export class QuestionGeneratorService {
  /**
   * Generates a dynamic, brand-new ICAI Descriptive Question with full model answer,
   * working notes, and step-marking rubrics.
   */
  public static generateDynamicDescriptiveQuestion(topicKey?: string): DescriptiveQuestion {
    const generatorList = [
      this.generateCostingVarianceQuestion,
      this.generateIncomeTax115BACQuestion,
      this.generateLawCSRQuestion,
      this.generateAuditingSA705Question,
      this.generateFmCapitalBudgetingQuestion,
      this.generateAs16BorrowingCostQuestion
    ];

    if (topicKey === 'costing') return this.generateCostingVarianceQuestion();
    if (topicKey === 'tax') return this.generateIncomeTax115BACQuestion();
    if (topicKey === 'law') return this.generateLawCSRQuestion();
    if (topicKey === 'audit') return this.generateAuditingSA705Question();
    if (topicKey === 'fm') return this.generateFmCapitalBudgetingQuestion();
    if (topicKey === 'accounts') return this.generateAs16BorrowingCostQuestion();

    // Default: pick random
    const randomIndex = Math.floor(Math.random() * generatorList.length);
    return generatorList[randomIndex]();
  }

  // 1. Costing Variance Generator
  private static generateCostingVarianceQuestion(): DescriptiveQuestion {
    const seed = Math.floor(Math.random() * 900) + 100;
    const stdKgA = 3;
    const stdRateA = 40;
    const stdKgB = 5;
    const stdRateB = 25;
    const stdOutput = 7; // 8 kg input gives 7 kg output (1 kg normal loss)
    
    const actualUnits = 1400 + Math.floor(Math.random() * 5) * 70; // e.g. 1400, 1470, 1540
    const factor = actualUnits / stdOutput; // exact integer
    const sqA = factor * stdKgA;
    const sqB = factor * stdKgB;

    // Actuals with slight variance
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

    const qId = `dyn_cost_${Date.now()}_${seed}`;
    return {
      id: qId,
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
          description: `Calculate MPV for Alpha (₹ ${Math.abs(mpvA)} ${mpvA >= 0 ? 'F' : 'A'}) and Beta (₹ ${Math.abs(mpvB)} ${mpvB >= 0 ? 'F' : 'A'}).`
        },
        {
          step: 'Calculation of Material Usage Variance & Total MCV',
          marks: 5,
          expectedKeywords: ['MUV = SP * (SQ - AQ)', `Total MUV: ₹ ${Math.abs(totalMuv)}`, `Total MCV: ₹ ${Math.abs(totalMcv)}`, 'Verification MCV = MPV + MUV'],
          description: `Calculate MUV. Verify MCV = MPV + MUV. Total MCV = ₹ ${Math.abs(totalMcv)} ${totalMcv >= 0 ? 'F' : 'A'}.`
        }
      ],
      suggestedAnswer: `WORKING NOTES:
1. Standard Quantity for Actual Production of ${actualUnits} kg:
   - For 7 kg output: Alpha = 3 kg, Beta = 5 kg.
   - SQ for Alpha = (${actualUnits} / 7) × 3 = ${sqA} kg
   - SQ for Beta = (${actualUnits} / 7) × 5 = ${sqB} kg

2. Calculation of Material Price Variance (MPV) = AQ × (SP - AP):
   - Alpha = ${actKgA} kg × (₹ ${stdRateA} - ₹ ${actRateA}) = ₹ ${Math.abs(mpvA)} (${mpvA >= 0 ? 'Favourable' : 'Adverse'})
   - Beta = ${actKgB} kg × (₹ ${stdRateB} - ₹ ${actRateB}) = ₹ ${Math.abs(mpvB)} (${mpvB >= 0 ? 'Favourable' : 'Adverse'})
   Total MPV = ₹ ${Math.abs(totalMpv)} (${totalMpv >= 0 ? 'Favourable' : 'Adverse'})

3. Calculation of Material Usage Variance (MUV) = SP × (SQ - AQ):
   - Alpha = ₹ ${stdRateA} × (${sqA} - ${actKgA}) = ₹ ${Math.abs(muvA)} (${muvA >= 0 ? 'Favourable' : 'Adverse'})
   - Beta = ₹ ${stdRateB} × (${sqB} - ${actKgB}) = ₹ ${Math.abs(muvB)} (${muvB >= 0 ? 'Favourable' : 'Adverse'})
   Total MUV = ₹ ${Math.abs(totalMuv)} (${totalMuv >= 0 ? 'Favourable' : 'Adverse'})

4. Calculation of Material Cost Variance (MCV) = Standard Cost - Actual Cost:
   Standard Cost = (${sqA} × ₹ ${stdRateA}) + (${sqB} × ₹ ${stdRateB}) = ₹ ${(sqA * stdRateA) + (sqB * stdRateB)}
   Actual Cost = (${actKgA} × ₹ ${actRateA}) + (${actKgB} × ₹ ${actRateB}) = ₹ ${(actKgA * actRateA) + (actKgB * actRateB)}
   Total MCV = Standard Cost - Actual Cost = ₹ ${Math.abs(totalMcv)} (${totalMcv >= 0 ? 'Favourable' : 'Adverse'})

RECONCILIATION:
MCV = MPV + MUV
₹ ${Math.abs(totalMcv)} (${totalMcv >= 0 ? 'F' : 'A'}) = ₹ ${Math.abs(totalMpv)} (${totalMpv >= 0 ? 'F' : 'A'}) + ₹ ${Math.abs(totalMuv)} (${totalMuv >= 0 ? 'F' : 'A'}) [Reconciled Successfully].`
    };
  }

  // 2. Income Tax 115BAC Generator
  private static generateIncomeTax115BACQuestion(): DescriptiveQuestion {
    const grossSalary = 1800000 + Math.floor(Math.random() * 6) * 100000; // e.g. 18L, 19L, 20L
    const stdDed = 75000;
    const netSalary = grossSalary - stdDed;
    const interestSavings = 30000;
    const grossTotalIncome = netSalary + interestSavings;

    // Slabs under new regime: 0-3L Nil, 3-6L 5%, 6-9L 10%, 9-12L 15%, 12-15L 20%, above 15L 30%
    // Tax up to 15L = 0 + 15,000 + 30,000 + 45,000 + 60,000 = 1,50,000
    const incomeAbove15L = Math.max(0, grossTotalIncome - 1500000);
    const taxAbove15L = incomeAbove15L * 0.30;
    const baseTax = 150000 + taxAbove15L;
    const cess = Math.round(baseTax * 0.04);
    const totalTax = baseTax + cess;

    const qId = `dyn_tax_${Date.now()}`;
    return {
      id: qId,
      subjectId: 'p3_tax',
      chapterId: 'total_income_comp',
      type: 'descriptive',
      importance: 'HIGH',
      source: `Dynamic ICAI Variant (Section 115BAC Tax Computation)`,
      marks: 8,
      difficulty: 'Examiner Favorite',
      icaiReference: 'Section 115BAC(1A) & Section 16(ia)',
      questionText: `Mr. Siddharth (aged 42 years, resident) is employed as a Senior Finance Manager with an IT company. For Assessment Year 2024-25, his particulars are:
- Gross Salary: ₹ ${grossSalary.toLocaleString('en-IN')}
- Savings Bank Interest from SBI: ₹ ${interestSavings.toLocaleString('en-IN')}
- Contribution to Public Provident Fund (PPF): ₹ 1,50,000
- Mediclaim premium paid by cheque for self & spouse: ₹ 32,000

He opts for the default new tax regime under Section 115BAC(1A).
Required:
(i) Compute his Total Taxable Income for AY 2024-25.
(ii) Compute the Net Tax Liability payable including Health and Education Cess.
(iii) State which of the deductions claimed (PPF, Mediclaim) are admissible or inadmissible under Section 115BAC.`,
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
   - Section 80TTA (Savings Interest): NIL (Disallowed under Section 115BAC)
   Total Taxable Income = ₹ ${grossTotalIncome.toLocaleString('en-IN')}

4. Computation of Tax Liability under Section 115BAC(1A) Slabs:
   - Up to ₹ 3,00,000: NIL
   - ₹ 3,00,001 to ₹ 6,00,000 @ 5%: ₹ 15,000
   - ₹ 6,00,001 to ₹ 9,00,000 @ 10%: ₹ 30,000
   - ₹ 9,00,001 to ₹ 12,00,000 @ 15%: ₹ 45,000
   - ₹ 12,00,001 to ₹ 15,00,000 @ 20%: ₹ 60,000
   Tax on first ₹ 15,00,000 = ₹ 1,50,000
   - Above ₹ 15,00,000 (₹ ${incomeAbove15L.toLocaleString('en-IN')}) @ 30% = ₹ ${taxAbove15L.toLocaleString('en-IN')}
   Base Tax = ₹ ${baseTax.toLocaleString('en-IN')}

5. Health and Education Cess @ 4%:
   - 4% on ₹ ${baseTax.toLocaleString('en-IN')} = ₹ ${cess.toLocaleString('en-IN')}

6. Total Tax Liability Payable:
   Total Tax Payable = ₹ ${totalTax.toLocaleString('en-IN')}.`
    };
  }

  // 3. Law CSR Generator
  private static generateLawCSRQuestion(): DescriptiveQuestion {
    const netProfits = [
      Math.floor(Math.random() * 4) + 4, // e.g. 4, 5, 6, 7
      Math.floor(Math.random() * 4) + 6, // e.g. 6, 7, 8, 9
      Math.floor(Math.random() * 4) + 8  // e.g. 8, 9, 10, 11
    ];
    const avgProfit = Math.round(((netProfits[0] + netProfits[1] + netProfits[2]) / 3) * 100) / 100;
    const csrAmountLakhs = Math.round((avgProfit * 0.02 * 100) * 100) / 100;

    const qId = `dyn_law_csr_${Date.now()}`;
    return {
      id: qId,
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
(ii) Calculate the exact statutory CSR expenditure required for the current financial year.
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
Vardhman Textiles Ltd. has Turnover of ₹ 1,100 Crores (exceeding ₹ 1,000 Cr) and Net Profit of Year 3 of ₹ ${netProfits[2]} Crores (exceeding ₹ 5 Cr). Hence, CSR provisions apply mandatorily.

2. Statutory CSR Expenditure [Section 135(5)]:
- Total Net Profit of preceding 3 years = ₹ ${netProfits[0]} + ₹ ${netProfits[1]} + ₹ ${netProfits[2]} = ₹ ${netProfits[0] + netProfits[1] + netProfits[2]} Crores.
- Average Net Profit = ₹ ${avgProfit} Crores.
- Minimum CSR Spend = 2% of ₹ ${avgProfit} Crores = ₹ ${csrAmountLakhs} Lakhs.

3. Treatment of Unspent Ongoing Project [Section 135(6)]:
The unspent amount of ₹ 5 Lakhs must be transferred to a special bank account called "Unspent Corporate Social Responsibility Account" within 30 days from the end of the financial year (i.e., by 30th April). It must be spent on the ongoing project within 3 financial years, failing which it must be transferred to a Fund specified in Schedule VII within 30 days of the end of the 3rd year.`
    };
  }

  // 4. Auditing SA 705 Generator
  private static generateAuditingSA705Question(): DescriptiveQuestion {
    const misstatements = [
      { item: 'Unrecorded liability on pending arbitral award', amount: 85, pbt: 60, pervasive: true, opinion: 'Adverse Opinion' },
      { item: 'Non-provision of obsolete slow-moving spare parts', amount: 25, pbt: 120, pervasive: false, opinion: 'Qualified Opinion' }
    ];
    const picked = misstatements[Math.floor(Math.random() * misstatements.length)];

    const qId = `dyn_audit_${Date.now()}`;
    return {
      id: qId,
      subjectId: 'p5_audit',
      chapterId: 'audit_report',
      type: 'descriptive',
      importance: 'HIGH',
      source: `Dynamic ICAI Variant (SA 705 Modification of Opinion)`,
      marks: 5,
      difficulty: 'Examiner Favorite',
      icaiReference: 'SA 705 (Revised)',
      questionText: `During the statutory audit of Horizon Infotech Ltd, the auditor noted ${picked.item} amounting to ₹ ${picked.amount} Lakhs. The company's Profit Before Tax is ₹ ${picked.pbt} Lakhs. Audit materiality was established at ₹ 15 Lakhs. Management declines to record any adjustment.
Examine the nature of the misstatement and determine the specific type of audit opinion to be issued under SA 705 (Revised), detailing the reasons and report structure.`,
      rubrics: [
        {
          step: 'Evaluation of Materiality and Pervasiveness',
          marks: 2,
          expectedKeywords: ['Materiality', `Exceeds ₹ 15 Lakhs`, picked.pervasive ? 'Pervasive' : 'Not Pervasive', 'SA 705'],
          mandatoryCitations: ['SA 705'],
          description: `Misstatement ₹ ${picked.amount}L > Materiality ₹ 15L. Evaluated as ${picked.pervasive ? 'material and pervasive' : 'material but not pervasive'}.`
        },
        {
          step: 'Determination of Audit Opinion',
          marks: 2,
          expectedKeywords: [picked.opinion, 'sufficient appropriate audit evidence'],
          description: `Express ${picked.opinion}.`
        },
        {
          step: 'Reporting Requirements & Heading',
          marks: 1,
          expectedKeywords: [`Basis for ${picked.opinion}`, 'quantification of financial effect'],
          description: `Include Basis for ${picked.opinion} section immediately following opinion.`
        }
      ],
      suggestedAnswer: `1. Assessment of Misstatement under SA 705 (Revised):
- Audit Planning Materiality = ₹ 15 Lakhs.
- Identified Misstatement (${picked.item}) = ₹ ${picked.amount} Lakhs.
- Since ₹ ${picked.amount} Lakhs substantially exceeds ₹ 15 Lakhs, the misstatement is MATERIAL.
${picked.pervasive 
  ? `- Because the misstatement of ₹ ${picked.amount} Lakhs exceeds the entire Profit Before Tax of ₹ ${picked.pbt} Lakhs, it fundamentally distorts the financial statements from a profit into a substantial net loss. Hence, the misstatement is BOTH MATERIAL AND PERVASIVE.`
  : `- The misstatement of ₹ ${picked.amount} Lakhs affects a specific item and does not turn the overall profit of ₹ ${picked.pbt} Lakhs into a loss. Therefore, it is MATERIAL BUT NOT PERVASIVE.`
}

2. Audit Opinion to be Formulated:
The auditor must issue a ${picked.opinion.toUpperCase()}.

3. Structure of Audit Report:
- Use heading: "${picked.opinion}".
- State that ${picked.pervasive ? 'the financial statements do not give a true and fair view' : 'except for the effects of the matter described, the financial statements give a true and fair view'}.
- Include a "Basis for ${picked.opinion}" section immediately after the opinion, quantifying the exact impact on liabilities, profits, and reserves.`
    };
  }

  // 5. FM Capital Budgeting Generator
  private static generateFmCapitalBudgetingQuestion(): DescriptiveQuestion {
    const cost = 2000000;
    const scrap = 200000;
    const life = 4;
    const dep = (cost - scrap) / life; // 4,50,000
    const ebdt = 750000;
    const taxRate = 0.25;
    const pbt = ebdt - dep; // 3,00,000
    const tax = pbt * taxRate; // 75,000
    const pat = pbt - tax; // 2,25,000
    const cfat = pat + dep; // 6,75,000

    const qId = `dyn_fm_${Date.now()}`;
    return {
      id: qId,
      subjectId: 'p6_fm_sm',
      chapterId: 'fm_cap_budgeting',
      type: 'descriptive',
      importance: 'HIGH',
      source: `Dynamic ICAI Variant (Cash Flow After Tax & Capital Budgeting)`,
      marks: 6,
      difficulty: 'Standard ICAI',
      icaiReference: 'Capital Budgeting Cash Flow Estimation',
      questionText: `A manufacturing firm plans to install an automated packaging system costing ₹ ${cost.toLocaleString('en-IN')}. Useful life is ${life} years with estimated salvage value of ₹ ${scrap.toLocaleString('en-IN')}. Straight Line Depreciation is followed.
Annual Earnings Before Depreciation and Tax (EBDT) generated by the system will be ₹ ${ebdt.toLocaleString('en-IN')}. The corporate tax rate is 25%.
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
          expectedKeywords: ['PBT', `₹ ${pbt.toLocaleString('en-IN')}`, 'Tax 25%', `PAT: ₹ ${pat.toLocaleString('en-IN')}`, `CFAT = PAT + Dep = ₹ ${cfat.toLocaleString('en-IN')}`],
          description: `CFAT = (EBDT - Dep)*(1 - t) + Dep = ₹ ${cfat.toLocaleString('en-IN')}.`
        },
        {
          step: 'Terminal Year Inflow',
          marks: 1,
          expectedKeywords: ['Salvage Value', `₹ ${scrap.toLocaleString('en-IN')}`, `Total Terminal = ₹ ${(cfat + scrap).toLocaleString('en-IN')}`],
          description: `Add salvage value ₹ ${scrap.toLocaleString('en-IN')} to final year CFAT.`
        }
      ],
      suggestedAnswer: `1. Annual Depreciation (SLM Method):
- Initial Cost of Asset = ₹ ${cost.toLocaleString('en-IN')}
- Less: Salvage Value = ₹ ${scrap.toLocaleString('en-IN')}
- Depreciable Amount = ₹ ${(cost - scrap).toLocaleString('en-IN')}
- Useful Life = ${life} Years
Annual Depreciation = ₹ ${(cost - scrap).toLocaleString('en-IN')} / ${life} = ₹ ${dep.toLocaleString('en-IN')} p.a.

2. Annual Operating Cash Flow After Tax (CFAT):
- Earnings Before Depreciation & Tax (EBDT) = ₹ ${ebdt.toLocaleString('en-IN')}
- Less: Depreciation = ₹ ${dep.toLocaleString('en-IN')}
- Profit Before Tax (PBT) = ₹ ${pbt.toLocaleString('en-IN')}
- Less: Tax @ 25% = ₹ ${tax.toLocaleString('en-IN')}
- Profit After Tax (PAT) = ₹ ${pat.toLocaleString('en-IN')}
- Add: Non-Cash Depreciation = ₹ ${dep.toLocaleString('en-IN')}
Annual Operating CFAT = ₹ ${cfat.toLocaleString('en-IN')}

3. Terminal Cash Inflow at End of Year ${life}:
- Operating CFAT of Year ${life} = ₹ ${cfat.toLocaleString('en-IN')}
- Add: Scrap / Salvage Value recovered = ₹ ${scrap.toLocaleString('en-IN')}
Total Terminal Inflow in Year ${life} = ₹ ${(cfat + scrap).toLocaleString('en-IN')}.`
    };
  }

  // 6. Accounts AS 16 Generator
  private static generateAs16BorrowingCostQuestion(): DescriptiveQuestion {
    const loan = 8000000;
    const rate = 12;
    const interestIncome = 65000;
    const activeMonths = 8;
    const interestTotal = (loan * (rate / 100) * activeMonths) / 12; // 6,40,000
    const netCapitalized = interestTotal - interestIncome; // 5,75,000

    const qId = `dyn_acc_as16_${Date.now()}`;
    return {
      id: qId,
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
          expectedKeywords: [`Interest for ${activeMonths} months = ₹ ${interestTotal.toLocaleString('en-IN')}`, `Less income ₹ ${interestIncome.toLocaleString('en-IN')}`, `Net Capitalized = ₹ ${netCapitalized.toLocaleString('en-IN')}`],
          description: `Capitalized = ₹ ${interestTotal.toLocaleString('en-IN')} - ₹ ${interestIncome.toLocaleString('en-IN')} = ₹ ${netCapitalized.toLocaleString('en-IN')}.`
        }
      ],
      suggestedAnswer: `1. Principle as per AS 16 "Borrowing Costs":
Under AS 16, to the extent that funds are borrowed specifically for the purpose of obtaining a qualifying asset, the amount of borrowing costs eligible for capitalization on that asset should be determined as the actual borrowing costs incurred on that borrowing during the period less any investment income on the temporary investment of those borrowings.

2. Calculation of Borrowing Cost to be Capitalized:
- Specific Loan Principal = ₹ ${loan.toLocaleString('en-IN')}
- Interest Rate = ${rate}% p.a.
- Active Construction Period = ${activeMonths} months (1st August to 31st March)
- Gross Interest Incurred = ₹ ${loan.toLocaleString('en-IN')} × ${rate}% × (${activeMonths} / 12) = ₹ ${interestTotal.toLocaleString('en-IN')}
- Less: Investment income earned on temporary placement = ₹ ${interestIncome.toLocaleString('en-IN')}
- Net Borrowing Cost to be Capitalized = ₹ ${netCapitalized.toLocaleString('en-IN')}

3. Balance Sheet Presentation:
The cracking unit asset will be capitalized by adding ₹ ${netCapitalized.toLocaleString('en-IN')} to the asset cost under Property, Plant and Equipment.`
    };
  }
}
