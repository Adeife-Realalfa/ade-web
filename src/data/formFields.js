// src/pages/CRElens/formFields.js

export const formFields = [
  {
    name: "projectType",
    label: "Project Type",
    type: "select",
    options: [
      "Sub-division",
      "Low rise condominium",
      "Mid rise condominium",
      "High rise condominium"
    ],
    helpText: "Select the real estate development type."
  },
  {
    name: "requestedLoanAmount",
    label: "Requested Loan",
    type: "number",
    helpText: "Enter the loan amount requested."
  },
  {
    name: "loanPurpose",
    label: "Loan Purpose",
    type: "select",
    options: [
      "Land Purchase",
      "Pre-Construction",
      "Servicing",
      "Construction",
      "Mezzanine"
    ],
    helpText: "Select the purpose of the loan."
  },
  {
    name: "yearsOfExperience",
    label: "Years of Experience",
    type: "select",
    options: ["0", "1", "2 to 5", "6 to 10", "11 to 15", "more than 15"],
    helpText: "Select your years of experience."
  },
  {
    name: "projectsCompleted",
    label: "Projects Completed",
    type: "select",
    options: ["0", "1", "2 to 5", "6 to 10", "11 to 15", "more than 15"],
    helpText: "Select how many projects you've completed."
  },
  {
    name: "largestProjectUnitCount",
    label: "Largest Project Completed by Unit count",
    type: "number",
    helpText: "Enter unit count of your largest completed project."
  },
  {
    name: "hasCompletedProjectType",
    label: "Have you ever completed a similar Development?",
    type: "select",
    options: ["Yes", "No"],
    helpText: "Have you developed a similar project before?"
  },
  {
    name: "location",
    label: "Location",
    type: "text",
    helpText: "Enter the project location."
  },
  {
    name: "priorLoansSum",
    label: "Other loans in priority to requested loan",
    type: "number",
    helpText: "Sum of loans that have priority over this one."
  },
  {
    name: "projectStage",
    label: "Project Stage",
    type: "select",
    options: [
      "Pre-APS",
      "Approval-OPA",
      "Approval-ZBA",
      "Approval-SPA-DPA",
      "Presales",
      "Servicing",
      "Development Permit",
      "Building Permit",
      "Construction",
      "Operational"
    ],
    helpText: "Select the current stage of the project."
  },
  {
    name: "totalProjectCost",
    label: "Total Project Cost",
    type: "number",
    helpText: "Enter total estimated cost of the project."
  },
  {
    name: "expectedProjectValue",
    label: "Expected Project Value",
    type: "text",
    helpText:
      "Enter the as-is or as-complete value after financing or approvals."
  },
  {
    name: "expectedRevenue",
    label: "Expected Revenue",
    type: "number",
    helpText:
      "If requesting a servicing loan, enter the revenue expected at end of servicing."
  },
  {
    name: "presales",
    label: "Presales",
    type: "number",
    helpText:
      "If requesting a loan to complete construction, enter the presale amount."
  },
  {
    name: "loanTerm",
    label: "Loan Term (months)",
    type: "number",
    helpText: "Enter the requested loan term in months."
  },
  {
    name: "loanPriority",
    label: "Loan Priority",
    type: "select",
    options: ["1st priority", "2nd priority", "3rd priority", "4th priority or more"],
    helpText: "Select the loan's repayment priority."
  },
  {
    name: "guarantorPnw",
    label: "Guarantor PNW",
    type: "number",
    helpText: "Enter the net worth of the guarantor."
  },
  {
    name: "cashEquity",
    label: "Equity",
    type: "number",
    helpText: "Enter the cash equity being contributed."
  }
];
