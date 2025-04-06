import { developerExperienceScore } from "./devExperience.js";
import { stageScore } from "./projectStage.js";
import { ltvScore } from "./ltv.js";
import { ratioScore } from "./ratios.js";
import { toNumber } from "./range.js";
import { tierByCity } from "./locationTiers.js";

export function calculateMetricScores(payload) {
  const {
    requestedLoanAmount,
    priorLoansSum = 0,
    expectedProjectValue,
    totalProjectCost,
    expectedRevenue,
    presales,
    loanPriority,
    loanPurpose,
    loanTerm,
    guarantorPnw,
    cashEquity,
    tier, // optional manual override
  } = payload;

  // Basic figures
  const debtStack = requestedLoanAmount + priorLoansSum;
  const ltv = requestedLoanAmount / toNumber(expectedProjectValue);
  const ltc = requestedLoanAmount / totalProjectCost;
  const presalesCoverageRatio = presales / debtStack;
  const presalesRatio = presales / expectedRevenue;
  const liquidPnwRatio = guarantorPnw / debtStack;
  const equityRatio = cashEquity / totalProjectCost;
  const profitMarginRatio =
    loanPurpose === "Construction" || loanPurpose === "Mezzanine"
      ? (expectedRevenue - totalProjectCost) / expectedRevenue
      : toNumber(expectedProjectValue) / totalProjectCost;

  // ----- Location tier lookup -----
  const city = (payload.location || "").split(",")[0].trim();
  const derivedTier = tierByCity[city];
  const effectiveTier = derivedTier ?? tier; // fallback to provided tier field

  const locationScore = { 1: 10, 2: 6, 3: 3, 4: 0 }[effectiveTier] ?? 0;

  // ----- Individual presales scores -----
  const presalesCoverageScore = ratioScore.presalesCoverage(presalesCoverageRatio);
  const presalesRatioScore = ratioScore.presales(presalesRatio);

  // 50/50 weighted average → single presalesScore
  const presalesScore = Math.round(
    (presalesCoverageScore + presalesRatioScore) / 2,
  );

  // ----- Aggregate scores -----
  const scores = {
    developerExperience: developerExperienceScore(payload),
    stageScore: stageScore(payload.projectStage),
    ltvScore: ltvScore(loanPurpose, ltv),
    ltcScore: ratioScore.ltc(ltc),
    presalesScore, // combined value
    loanTermScore: ratioScore.loanTerm(loanTerm),
    priorityScore:
      {
        "1st priority": 10,
        "2nd priority": 6,
        "3rd priority": 3,
        "4th priority": 0,
        "4th priority or more": 0,
      }[loanPriority] ?? 0,
    liquidPnwScore: ratioScore.liquidPnw(liquidPnwRatio),
    equityScore: ratioScore.equity(equityRatio),
    profitMarginScore: ratioScore.profitMargin(profitMarginRatio),
    locationScore,
  };

  return scores;
}
