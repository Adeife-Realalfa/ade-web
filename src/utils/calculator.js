// src/utils/calculator.js
export default function calculateResults(inputs) {
    // mock logic
    const { loanAmount = 100000, interestRate = 5 } = inputs;
    const monthlyPayment = ((loanAmount * (interestRate / 100)) / 12).toFixed(2);
    return {
      monthlyPayment,
      affordabilityScore: "Good",
      ...inputs,
    };
  }
  