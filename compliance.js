const contractControls = [
  { control: "Security Clauses", covered: 82, target: 95 },
  { control: "Breach Notification SLA", covered: 76, target: 95 },
  { control: "Audit Rights", covered: 71, target: 90 },
  { control: "MFA Requirement", covered: 69, target: 90 },
  { control: "Encryption Requirement", covered: 84, target: 95 },
  { control: "Subcontractor Approval", covered: 63, target: 85 }
];

const supplierCompliance = [
  {
    supplier: "CloudOps Partner A",
    tier: "Tier 1",
    security_clause: true,
    breach_sla: true,
    audit_rights: false,
    mfa_required: true,
    encryption_required: true,
    framework: "SOC 2 Type II",
    evidence: "Current",
    validity_days: 220,
    status: "Partial",
    renewal_days: 85,
    missing_clauses: "Audit rights"
  },
  {
    supplier: "Clinical Data Vendor B",
    tier: "Tier 1",
    security_clause: true,
    breach_sla: true,
    audit_rights: true,
    mfa_required: true,
    encryption_required: true,
    framework: "ISO 27001",
    evidence: "Current",
    validity_days: 300,
    status: "Compliant",
    renewal_days: 140,
    missing_clauses: "None"
  },
  {
    supplier: "Logistics Provider C",
    tier: "Tier 2",
    security_clause: true,
    breach_sla: false,
    audit_rights: false,
    mfa_required: false,
    encryption_required: true,
    framework: "SOC 2 Type II",
    evidence: "Missing",
    validity_days: 0,
    status: "Non-Compliant",
    renewal_days: 42,
    missing_clauses: "Breach SLA, audit rights, MFA"
  },
  {
    supplier: "Manufacturing SaaS D",
    tier: "Tier 1",
    security_clause: true,
    breach_sla: false,
    audit_rights: true,
    mfa_required: true,
    encryption_required: true,
    framework: "ISO 27001",
    evidence: "Expired",
    validity_days: -30,
    status: "Partial",
    renewal_days: 65,
    missing_clauses: "Breach SLA"
  },
  {
    supplier: "Procurement Platform E",
    tier: "Tier 2",
    security_clause: false,
    breach_sla: false,
    audit_rights: false,
    mfa_required: false,
    encryption_required: true,
    framework: "None",
    evidence: "Missing",
    validity_days: 0,
    status: "Non-Compliant",
    renewal_days: 25,
    missing_clauses: "Security clauses, breach SLA, audit rights, MFA"
  },
  {
    supplier: "Identity Services F",
    tier: "Tier 1",
    security_clause: true,
    breach_sla: true,
    audit_rights: true,
    mfa_required: true,
    encryption_required: true,
    framework: "SOC 2 Type II",
    evidence: "Current",
    validity_days: 180,
    status: "Compliant",
    renewal_days: 210,
    missing_clauses: "None"
  },
  {
    supplier: "Marketing Platform G",
    tier: "Tier 3",
    security_clause: true,
    breach_sla: false,
    audit_rights: false,
    mfa_required: false,
    encryption_required: false,
    framework: "None",
    evidence: "Missing",
    validity_days: 0,
    status: "Partial",
    renewal_days: 95,
    missing_clauses: "Breach SLA, audit rights, MFA, encryption"
  },
  {
    supplier: "Data Processing H",
    tier: "Tier 1",
    security_clause: true,
    breach_sla: true,
    audit_rights: true,
    mfa_required: true,
    encryption_required: true,
    framework: "ISO 27001",
    evidence: "Current",
    validity_days: 275,
    status: "Compliant",
    renewal_days: 160,
    missing_clauses: "None"
  }
];

const complianceAiAlerts = [
  {
    value: "Vendor E",
    detail: "Highest contract remediation priority before renewal"
  },
  {
    value: "Breach SLA",
    detail: "Most common missing cyber clause across active contracts"
  },
  {
    value: "3 contracts",
    detail: "Predicted to renew with unresolved cyber gaps"
  }
];

let contractCoverageChart = null;
let frameworkAlignmentChart = null;

function setSelectOptions(select, values) {
  const options = ["All", ...new Set(values)].filter(Boolean);
  select.innerHTML = options.map(value => `<option value="${value}">${value}</option>`).join("");
}

function normalizeFramework(framework) {
  if (framework === "SOC 2 Type II") return "SOC2";
  if (framework === "ISO 27001") return "ISO";
  return "None";
}

function matchesClauseType(item, clauseType) {
  if (clauseType === "All") return true;
  const missing = item.missing_clauses.toLowerCase();
  if (clauseType === "MFA") return missing.includes("mfa");
  if (clauseType === "Audit") return missing.includes("audit");
  if (clauseType === "SLA") return missing.includes("sla");
  return false;
}

function matchesRenewalWindow(days, renewalWindow) {
  if (renewalWindow === "All") return true;
  if (renewalWindow === "0-30d") return days <= 30;
  if (renewalWindow === "31-90d") return days >= 31 && days <= 90;
  if (renewalWindow === "90d+") return days > 90;
  return true;
}

function getPillClass(value) {
  if (["High", "Critical", "Non-Compliant", "Expired", "Missing"].includes(value)) {
    return "pill pill-red";
  }

  if (["Medium", "Partial", "At Risk"].includes(value)) {
    return "pill pill-amber";
  }

  return "pill pill-green";
}

function complianceRisk(item) {
  if (item.status === "Non-Compliant") return "High";
  if (item.status === "Partial") return "Medium";
  return "Low";
}

function filterComplianceData(state) {
  return supplierCompliance.filter(item => {
    const frameworkMatch = state.framework === "All" || normalizeFramework(item.framework) === state.framework;
    const contractStatusMatch = state.contractStatus === "All" || item.status === state.contractStatus;
    const clauseTypeMatch = matchesClauseType(item, state.clauseType);
    const renewalWindowMatch = matchesRenewalWindow(item.renewal_days, state.renewalWindow);
    return frameworkMatch && contractStatusMatch && clauseTypeMatch && renewalWindowMatch;
  });
}

function renderComplianceKpis(filteredCompliance) {
  if (!filteredCompliance.length) {
    document.getElementById("securityClauseCoverage").textContent = "0%";
    document.getElementById("breachSlaCoverage").textContent = "0%";
    document.getElementById("auditRightsCoverage").textContent = "0%";
    document.getElementById("mfaCoverage").textContent = "0%";
    document.getElementById("encryptionCoverage").textContent = "0%";
    document.getElementById("frameworkCoverage").textContent = "0%";
    document.getElementById("renewalReviews").textContent = "0";
    document.getElementById("nonCompliantSuppliers").textContent = "0";
    return;
  }

  const frameworkCovered = filteredCompliance.filter(
    s => s.framework !== "None" && s.evidence === "Current"
  ).length;

  const renewalReviews = filteredCompliance.filter(
    s => s.renewal_days <= 90
  ).length;

  const nonCompliant = filteredCompliance.filter(
    s => s.status === "Non-Compliant"
  ).length;

  const percent = field => Math.round((filteredCompliance.filter(s => s[field]).length / filteredCompliance.length) * 100);

  document.getElementById("securityClauseCoverage").textContent =
    `${percent("security_clause")}%`;

  document.getElementById("breachSlaCoverage").textContent =
    `${percent("breach_sla")}%`;

  document.getElementById("auditRightsCoverage").textContent =
    `${percent("audit_rights")}%`;

  document.getElementById("mfaCoverage").textContent =
    `${percent("mfa_required")}%`;

  document.getElementById("encryptionCoverage").textContent =
    `${percent("encryption_required")}%`;

  document.getElementById("frameworkCoverage").textContent =
    `${Math.round((frameworkCovered / filteredCompliance.length) * 100)}%`;

  document.getElementById("renewalReviews").textContent = renewalReviews;

  document.getElementById("nonCompliantSuppliers").textContent = nonCompliant;
}

function renderComplianceGaps(filteredCompliance) {
  const tbody = document.querySelector("#complianceGapTable tbody");
  tbody.innerHTML = "";

  filteredCompliance
    .filter(s => s.status !== "Compliant")
    .forEach(s => {
      const risk = s.tier === "Tier 1" || s.status === "Non-Compliant" ? "High" : "Medium";

      tbody.innerHTML += `
        <tr>
          <td>${s.supplier}</td>
          <td>${s.tier}</td>
          <td>${s.missing_clauses}</td>
          <td><span class="${getPillClass(risk)}">${risk}</span></td>
          <td><span class="${getPillClass(s.status)}">${s.status}</span></td>
        </tr>
      `;
    });
}

function renderFrameworkEvidence(filteredCompliance) {
  const tbody = document.querySelector("#frameworkEvidenceTable tbody");
  tbody.innerHTML = "";

  filteredCompliance.forEach(s => {
    const validity =
      s.validity_days > 0
        ? `${s.validity_days}d`
        : s.validity_days < 0
          ? `${Math.abs(s.validity_days)}d expired`
          : "N/A";

    tbody.innerHTML += `
      <tr>
        <td>${s.supplier}</td>
        <td>${s.framework}</td>
        <td><span class="${getPillClass(s.evidence)}">${s.evidence}</span></td>
        <td>${validity}</td>
        <td><span class="${getPillClass(s.status)}">${s.status}</span></td>
      </tr>
    `;
  });
}

function renderRenewalRisk(filteredCompliance) {
  const tbody = document.querySelector("#renewalRiskTable tbody");
  tbody.innerHTML = "";

  filteredCompliance
    .filter(s => s.renewal_days <= 100 && s.missing_clauses !== "None")
    .sort((a, b) => a.renewal_days - b.renewal_days)
    .forEach(s => {
      const risk = s.status === "Non-Compliant" || s.tier === "Tier 1" ? "High" : "Medium";

      tbody.innerHTML += `
        <tr>
          <td>${s.supplier}</td>
          <td>${s.renewal_days}d</td>
          <td>${s.missing_clauses}</td>
          <td><span class="${getPillClass(risk)}">${risk}</span></td>
          <td>Review before renewal</td>
        </tr>
      `;
    });
}

function renderComplianceAiAlerts() {
  const container = document.getElementById("complianceAiAlerts");
  container.innerHTML = "";

  complianceAiAlerts.forEach(alert => {
    container.innerHTML += `
      <div class="ai-item">
        <strong>${alert.value}</strong>
        <span>${alert.detail}</span>
      </div>
    `;
  });
}

function renderComplianceCharts(filteredCompliance) {
  if (contractCoverageChart) contractCoverageChart.destroy();
  if (frameworkAlignmentChart) frameworkAlignmentChart.destroy();

  const coverage = field => Math.round((filteredCompliance.filter(s => s[field]).length / filteredCompliance.length) * 100) || 0;

  contractCoverageChart = new Chart(document.getElementById("contractCoverageChart"), {
    type: "bar",
    data: {
      labels: contractControls.map(c => c.control),
      datasets: [
        {
          label: "Current Coverage",
          data: [
            coverage("security_clause"),
            coverage("breach_sla"),
            coverage("audit_rights"),
            coverage("mfa_required"),
            coverage("encryption_required"),
            Math.round((filteredCompliance.filter(s => s.framework !== "None").length / filteredCompliance.length) * 100) || 0
          ]
        },
        {
          label: "Target",
          data: contractControls.map(c => c.target)
        }
      ]
    },
    options: { maintainAspectRatio: false }
    });

  const frameworks = ["SOC 2 Type II", "ISO 27001", "None"];

  frameworkAlignmentChart = new Chart(document.getElementById("frameworkAlignmentChart"), {
    type: "doughnut",
    data: {
      labels: frameworks,
      datasets: [
        {
          data: frameworks.map(framework =>
            filteredCompliance.filter(s => s.framework === framework).length
          )
        }
      ]
    },
    options: { maintainAspectRatio: false }
    });
}

function applyFilters(state) {
  const filteredCompliance = filterComplianceData(state);

  renderComplianceKpis(filteredCompliance);
  renderComplianceGaps(filteredCompliance);
  renderFrameworkEvidence(filteredCompliance);
  renderRenewalRisk(filteredCompliance);
  renderComplianceCharts(filteredCompliance);

  document.getElementById("filterSummary").textContent =
    `Showing ${filteredCompliance.length} of ${supplierCompliance.length} suppliers`;
}

function addCardHoverEffect() {
  const cards = document.querySelectorAll(".kpi-card, .card, .ai-item");

  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-3px)";
      card.style.transition = "0.2s ease";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });
}

renderComplianceAiAlerts();
addCardHoverEffect();

function initComplianceFilters() {
  const frameworkSelect = document.getElementById("filterFramework");
  const contractStatusSelect = document.getElementById("filterContractStatus");
  const clauseTypeSelect = document.getElementById("filterClauseType");
  const renewalWindowSelect = document.getElementById("filterRenewalWindow");
  const clearButton = document.getElementById("clearFilters");

  setSelectOptions(frameworkSelect, supplierCompliance.map(item => normalizeFramework(item.framework)));
  setSelectOptions(contractStatusSelect, supplierCompliance.map(item => item.status));
  setSelectOptions(clauseTypeSelect, ["MFA", "Audit", "SLA"]);
  renewalWindowSelect.innerHTML = ["All", "0-30d", "31-90d", "90d+"].map(value => `<option value="${value}">${value}</option>`).join("");

  function applyFromUi() {
    applyFilters({
      framework: frameworkSelect.value,
      contractStatus: contractStatusSelect.value,
      clauseType: clauseTypeSelect.value,
      renewalWindow: renewalWindowSelect.value
    });
  }

  frameworkSelect.addEventListener("change", applyFromUi);
  contractStatusSelect.addEventListener("change", applyFromUi);
  clauseTypeSelect.addEventListener("change", applyFromUi);
  renewalWindowSelect.addEventListener("change", applyFromUi);

  clearButton.addEventListener("click", () => {
    frameworkSelect.value = "All";
    contractStatusSelect.value = "All";
    clauseTypeSelect.value = "All";
    renewalWindowSelect.value = "All";
    applyFromUi();
  });

  applyFromUi();
}

initComplianceFilters();