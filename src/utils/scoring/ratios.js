import { mapRange } from "./range.js";

export const ratioScore = {
  ltc: (ltc) =>
    mapRange(ltc, [
      { max: 0, score: 10 },
      { max: 0.3, score: 9 },
      { max: 0.5, score: 8 },
      { max: 0.6, score: 6 },
      { max: 0.7, score: 4 },
      { max: 0.8, score: 2 },
      { max: Infinity, score: 0 },
    ]),

  presalesCoverage: (pc) =>
    mapRange(pc, [
      { max: 0, score: 0 },
      { max: 0.1, score: 2 },
      { max: 0.2, score: 4 },
      { max: 0.3, score: 6 },
      { max: 0.4, score: 8 },
      { max: 0.5, score: 10 },
      { max: Infinity, score: 10 },
    ]),

  presales: (pr) =>
    mapRange(pr, [
      { max: 0, score: 0 },
      { max: 0.2, score: 4 },
      { max: 0.4, score: 6 },
      { max: 0.6, score: 8 },
      { max: 0.8, score: 6 },
      { max: 1, score: 4 },
      { max: Infinity, score: 4 },
    ]),

  loanTerm: (months) =>
    mapRange(months, [
      { max: 0, score: 10 },
      { max: 3, score: 9 },
      { max: 6, score: 8 },
      { max: 12, score: 6 },
      { max: 24, score: 4 },
      { max: 36, score: 0 },
      { max: Infinity, score: 0 },
    ]),

  liquidPnw: (ratio) =>
    mapRange(ratio, [
      { max: 0, score: 0 },
      { max: 0.2, score: 1 },
      { max: 0.4, score: 2 },
      { max: 0.6, score: 3 },
      { max: 0.8, score: 4 },
      { max: 1, score: 6 },
      { max: 1.5, score: 8 },
      { max: 2, score: 10 },
      { max: Infinity, score: 10 },
    ]),

  equity: (ratio) =>
    mapRange(ratio, [
      { max: 0, score: 0 },
      { max: 0.02, score: 1 },
      { max: 0.04, score: 2 },
      { max: 0.06, score: 3 },
      { max: 0.08, score: 4 },
      { max: 0.1, score: 5 },
      { max: 0.15, score: 6 },
      { max: 0.2, score: 7 },
      { max: 0.25, score: 8 },
      { max: 0.3, score: 10 },
      { max: Infinity, score: 10 },
    ]),

  profitMargin: (ratio) =>
    mapRange(ratio, [
      { max: 0, score: 0 },
      { max: 0.02, score: 1 },
      { max: 0.04, score: 2 },
      { max: 0.06, score: 3 },
      { max: 0.08, score: 4 },
      { max: 0.1, score: 5 },
      { max: 0.15, score: 6 },
      { max: 0.2, score: 7 },
      { max: 0.25, score: 8 },
      { max: 0.3, score: 10 },
      { max: Infinity, score: 10 },
    ]),
};
