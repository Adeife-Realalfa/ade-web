export function mapRange(value, ranges) {
    for (const { max, score } of ranges) {
      if (value <= max) return score;
    }
    return 0;
  }
  
  export function parseRangeValue(label) {
    if (typeof label === "number") return label;
    if (!label) return 0;
    if (label.includes("to")) return Number(label.split("to")[1].trim());
    if (label.startsWith(">")) return Number(label.replace(/[^\d]/g, "")) + 1;
    return Number(label);
  }
  
  export const toNumber = (v) => (typeof v === "string" ? Number(v) : v);