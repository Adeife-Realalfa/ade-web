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

  // ----- financial ratios -----
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

  // ----- location score -----
  const city = (payload.location || "").split(",")[0].trim();
  const derivedTier = tierByCity[city];
  const effectiveTier = derivedTier ?? tier;
  const locationScore = { 1: 10, 2: 6, 3: 3, 4: 0 }[effectiveTier] ?? 0;

  // ----- presales combined score (50/50) -----
  const presalesCoverageScore = ratioScore.presalesCoverage(presalesCoverageRatio);
  const presalesRatioScore = ratioScore.presales(presalesRatio);
  const presalesScore = Math.round((presalesCoverageScore + presalesRatioScore) / 2);

  // ----- other scores -----
  const scores = {
    priorityScore: { "1st priority": 10, "2nd priority": 6, "3rd priority": 3, "4th priority": 0, "4th priority or more": 0 }[loanPriority] ?? 0,
    experienceScore: developerExperienceScore(payload),
    pnwScore: ratioScore.liquidPnw(liquidPnwRatio),
    locationScore,
    presalesScore,
    ltvScore: ltvScore(loanPurpose, ltv),
    ltcScore: ratioScore.ltc(ltc),
    equityScore: ratioScore.equity(equityRatio),
    profitScore: ratioScore.profitMargin(profitMarginRatio), 
    stageScore: stageScore(payload.projectStage),
    termScore: ratioScore.loanTerm(loanTerm),
  };

  // ----- predicted interest rate -----
  const scoreValues = Object.values(scores);
  const averageScore = scoreValues.reduce((sum, v) => sum + v, 0) / scoreValues.length;

  // base premium: 10% minus the average of the 11 scores
  const basePremiumPct = 10 - averageScore;

  // add 300 bps (3%) for each step below 1st priority
  const priorityStepsMap = {
    "1st priority": 0,
    "2nd priority": 1,
    "3rd priority": 2,
    "4th priority": 3,
    "4th priority or more": 3,
  };
  const prioritySteps = priorityStepsMap[loanPriority] ?? 3;
  const priorityPremiumPct = prioritySteps * 3; // 3 % per step

  const totalPremiumPct = +(basePremiumPct + priorityPremiumPct).toFixed(2);
  const predictedInterestRate = totalPremiumPct/100

  return {
    predictedInterestRate,
    ...scores,
  };
}