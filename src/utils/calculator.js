// src/utils/calculator.js
import { calculateMetricScores } from "./scoring/index.js";

export default function calculateResults(inputs) {
  // Simply return the metric scores expected by the Dashboard
  return calculateMetricScores(inputs);
}
