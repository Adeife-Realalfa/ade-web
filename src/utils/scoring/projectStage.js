export const stageScore = (stage) =>
    (
      {
        "Pre-APS": 0,
        "Approval-OPA": 1,
        "Approval-ZBA": 2,
        "Approval-SPA-DPA": 4,
        "Firm Presales": 6,
        "Servicing Began": 8,
        "Development Permit Pulled": 10,
        "Building Permit Pulled": 10,
        "Construction Began": 9,
      }[stage] ?? 0
    );
  