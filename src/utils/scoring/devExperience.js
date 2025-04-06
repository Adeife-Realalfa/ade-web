import { mapRange, parseRangeValue } from "./range.js";

export function developerExperienceScore({
  yearsOfExperience,
  projectsCompleted,
  hasCompletedProjectType,
  // currentProjectUnitCount,   // ← hook this in when available
}) {
  const years = mapRange(parseRangeValue(yearsOfExperience), [
    { max: 0, score: 0 },
    { max: 1, score: 2 },
    { max: 5, score: 4 },
    { max: 10, score: 6 },
    { max: 15, score: 8 },
    { max: Infinity, score: 10 },
  ]);

  const projects = mapRange(parseRangeValue(projectsCompleted), [
    { max: 0, score: 0 },
    { max: 1, score: 2 },
    { max: 5, score: 4 },
    { max: 10, score: 6 },
    { max: 15, score: 8 },
    { max: Infinity, score: 10 },
  ]);

  const similar = hasCompletedProjectType === "Yes" ? 5 : 0;
  const projectSize = 0; // TODO when unit‑count comparison is wired‑in

  // raw out of 30, normalised to /10
  return Math.round(((years + projects + similar + projectSize) / 30) * 10);
}
