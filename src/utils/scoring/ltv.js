import { mapRange } from "./range.js";

export function ltvScore(loanPurpose, ltv) {
  const table = {
    "Land Purchase": [
      { max: 0.3, score: 6 },
      { max: 0.5, score: 4 },
      { max: 0.6, score: 2 },
      { max: Infinity, score: 0 },
    ],
    "Pre-Construction": [
      { max: 0.3, score: 10 },
      { max: 0.5, score: 8 },
      { max: 0.6, score: 6 },
      { max: 0.7, score: 4 },
      { max: Infinity, score: 0 },
    ],
    Servicing: [
      { max: 0.3, score: 10 },
      { max: 0.5, score: 9 },
      { max: 0.6, score: 8 },
      { max: 0.7, score: 6 },
      { max: 0.8, score: 4 },
      { max: Infinity, score: 0 },
    ],
    Construction: [
      { max: 0.3, score: 10 },
      { max: 0.5, score: 10 },
      { max: 0.6, score: 10 },
      { max: 0.7, score: 8 },
      { max: 0.8, score: 6 },
      { max: 0.9, score: 2 },
      { max: Infinity, score: 0 },
    ],
    Mezzanine: [
      { max: 0.3, score: 10 },
      { max: 0.5, score: 9 },
      { max: 0.6, score: 8 },
      { max: 0.7, score: 6 },
      { max: 0.8, score: 4 },
      { max: 0.9, score: 2 },
      { max: Infinity, score: 0 },
    ],
  };
  return mapRange(ltv, table[loanPurpose] || table.Construction);
}
