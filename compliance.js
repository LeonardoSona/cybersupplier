const TODAY = new Date("2026-05-07T00:00:00Z");

const complianceRecords = [
  {
    supplier_id: "SUP-001",
    supplier_name: "CloudOps Partner A",
    tier: "Tier 1",
    geography: "North America",
    gxp_critical: true,
    security_clause_status: "Covered",
    audit_rights_status: "Gap",
    breach_notification_sla: 24,
    breach_notification_compliant: true,
    quality_agreement_status: "Signed",
    validation_evidence_status: "Complete",
    open_capa_count: 2,
    audit_type: "GxP Supplier Audit",
    open_findings: 3,
    finding_age_days: 102,
    validation_status: "In Progress",
    contract_expiry_date: "2026-08-15",
    compliance_area: "Contractual",
    capa_status: "Open",
    audit_status: "Open",
    previous_security_clause_status: "Covered",
    previous_audit_rights_status: "Gap",
    previous_breach_notification_compliant: true,
    previous_validation_evidence_status: "Partial",
    previous_quality_agreement_status: "Signed",
    previous_open_capa_count: 3,
    previous_finding_age_days: 95,
    required_action: "Close audit rights gap before renewal"
  },
  {
    supplier_id: "SUP-002",
    supplier_name: "Clinical Data Vendor B",
    tier: "Tier 1",
    geography: "Europe",
    gxp_critical: true,
    security_clause_status: "Covered",
    audit_rights_status: "Covered",
    breach_notification_sla: 24,
    breach_notification_compliant: true,
    quality_agreement_status: "Signed",
    validation_evidence_status: "Complete",
    open_capa_count: 1,
    audit_type: "GxP Supplier Audit",
    open_findings: 1,
    finding_age_days: 42,
    validation_status: "Complete",
    contract_expiry_date: "2027-01-20",
    compliance_area: "Regulated Assurance",
    capa_status: "Open",
    audit_status: "Open",
    previous_security_clause_status: "Covered",
    previous_audit_rights_status: "Covered",
    previous_breach_notification_compliant: true,
    previous_validation_evidence_status: "Complete",
    previous_quality_agreement_status: "Signed",
    previous_open_capa_count: 2,
    previous_finding_age_days: 58,
    required_action: "Close residual CAPA and finalize validation"
  },
  {
    supplier_id: "SUP-003",
    supplier_name: "Logistics Provider C",
    tier: "Tier 2",
    geography: "Asia Pacific",
    gxp_critical: false,
    security_clause_status: "Covered",
    audit_rights_status: "Gap",
    breach_notification_sla: 72,
    breach_notification_compliant: false,
    quality_agreement_status: "Missing",
    validation_evidence_status: "Missing",
    open_capa_count: 4,
    audit_type: "Operational Audit",
    open_findings: 5,
    finding_age_days: 128,
    validation_status: "Missing",
    contract_expiry_date: "2026-06-30",
    compliance_area: "Contractual",
    capa_status: "Open",
    audit_status: "Overdue",
    previous_security_clause_status: "Gap",
    previous_audit_rights_status: "Gap",
    previous_breach_notification_compliant: false,
    previous_validation_evidence_status: "Missing",
    previous_quality_agreement_status: "Missing",
    previous_open_capa_count: 4,
    previous_finding_age_days: 120,
    required_action: "Escalate contractual and quality gaps"
  },
  {
    supplier_id: "SUP-004",
    supplier_name: "Manufacturing SaaS D",
    tier: "Tier 1",
    geography: "North America",
    gxp_critical: true,
    security_clause_status: "Covered",
    audit_rights_status: "Covered",
    breach_notification_sla: 48,
    breach_notification_compliant: false,
    quality_agreement_status: "Signed",
    validation_evidence_status: "Partial",
    open_capa_count: 2,
    audit_type: "GxP Supplier Audit",
    open_findings: 3,
    finding_age_days: 76,
    validation_status: "In Progress",
    contract_expiry_date: "2026-10-01",
    compliance_area: "Operational",
    capa_status: "Open",
    audit_status: "Open",
    previous_security_clause_status: "Covered",
    previous_audit_rights_status: "Covered",
    previous_breach_notification_compliant: true,
    previous_validation_evidence_status: "Partial",
    previous_quality_agreement_status: "Signed",
    previous_open_capa_count: 2,
    previous_finding_age_days: 88,
    required_action: "Update breach notification process controls"
  },
  {
    supplier_id: "SUP-005",
    supplier_name: "Procurement Platform E",
    tier: "Tier 2",
    geography: "Europe",
    gxp_critical: false,
    security_clause_status: "Gap",
    audit_rights_status: "Gap",
    breach_notification_sla: 72,
    breach_notification_compliant: false,
    quality_agreement_status: "Missing",
    validation_evidence_status: "Missing",
    open_capa_count: 3,
    audit_type: "Contract Compliance Audit",
    open_findings: 4,
    finding_age_days: 111,
    validation_status: "Missing",
    contract_expiry_date: "2026-05-28",
    compliance_area: "Contractual",
    capa_status: "Open",
    audit_status: "Overdue",
    previous_security_clause_status: "Gap",
    previous_audit_rights_status: "Gap",
    previous_breach_notification_compliant: false,
    previous_validation_evidence_status: "Missing",
    previous_quality_agreement_status: "Missing",
    previous_open_capa_count: 3,
    previous_finding_age_days: 104,
    required_action: "Negotiate clauses before contract extension"
  },
  {
    supplier_id: "SUP-006",
    supplier_name: "Identity Services F",
    tier: "Tier 1",
    geography: "North America",
    gxp_critical: true,
    security_clause_status: "Covered",
    audit_rights_status: "Covered",
    breach_notification_sla: 24,
    breach_notification_compliant: true,
    quality_agreement_status: "Signed",
    validation_evidence_status: "Complete",
    open_capa_count: 1,
    audit_type: "Cyber Assurance Audit",
    open_findings: 1,
    finding_age_days: 34,
    validation_status: "Complete",
    contract_expiry_date: "2027-03-30",
    compliance_area: "Cyber Governance",
    capa_status: "Open",
    audit_status: "Open",
    previous_security_clause_status: "Covered",
    previous_audit_rights_status: "Covered",
    previous_breach_notification_compliant: true,
    previous_validation_evidence_status: "Complete",
    previous_quality_agreement_status: "Signed",
    previous_open_capa_count: 2,
    previous_finding_age_days: 49,
    required_action: "Close final CAPA and maintain evidence cadence"
  },
  {
    supplier_id: "SUP-007",
    supplier_name: "Marketing Platform G",
    tier: "Tier 3",
    geography: "Europe",
    gxp_critical: false,
    security_clause_status: "Covered",
    audit_rights_status: "Gap",
    breach_notification_sla: 72,
    breach_notification_compliant: false,
    quality_agreement_status: "Not Required",
    validation_evidence_status: "Partial",
    open_capa_count: 1,
    audit_type: "Operational Audit",
    open_findings: 2,
    finding_age_days: 67,
    validation_status: "In Progress",
    contract_expiry_date: "2026-11-15",
    compliance_area: "Operational",
    capa_status: "Open",
    audit_status: "Open",
    previous_security_clause_status: "Covered",
    previous_audit_rights_status: "Gap",
    previous_breach_notification_compliant: false,
    previous_validation_evidence_status: "Partial",
    previous_quality_agreement_status: "Not Required",
    previous_open_capa_count: 1,
    previous_finding_age_days: 73,
    required_action: "Complete validation package and audit rights addendum"
  },
  {
    supplier_id: "SUP-008",
    supplier_name: "Data Processing H",
    tier: "Tier 1",
    geography: "North America",
    gxp_critical: true,
    security_clause_status: "Covered",
    audit_rights_status: "Covered",
    breach_notification_sla: 24,
    breach_notification_compliant: true,
    quality_agreement_status: "Signed",
    validation_evidence_status: "Complete",
    open_capa_count: 0,
    audit_type: "GxP Supplier Audit",
    open_findings: 0,
    finding_age_days: 0,
    validation_status: "Complete",
    contract_expiry_date: "2027-02-12",
    compliance_area: "Regulated Assurance",
    capa_status: "Closed",
    audit_status: "Closed",
    previous_security_clause_status: "Covered",
    previous_audit_rights_status: "Covered",
    previous_breach_notification_compliant: true,
    previous_validation_evidence_status: "Complete",
    previous_quality_agreement_status: "Signed",
    previous_open_capa_count: 1,
    previous_finding_age_days: 28,
    required_action: "Maintain audit-ready posture"
  }
];

let complianceCoverageChart = null;
let auditFindingsAgingChart = null;

function setSelectOptions(select, values) {
  const options = ["All", ...new Set(values)].filter(Boolean);
  select.innerHTML = options.map((value) => `<option value="${value}">${value}</option>`).join("");
}

function parseDate(value) {
  if (!value) return null;
  return new Date(`${value}T00:00:00Z`);
}

function getPillClass(value) {
  if (["High", "Gap", "Missing", "Overdue", "Open", "Failed"].includes(value)) {
    return "pill pill-red";
  }
  if (["Medium", "Partial", "In Progress"].includes(value)) {
    return "pill pill-amber";
  }
  return "pill pill-green";
}

function setTrend(id, currentValue, previousValue, preferredDirection, suffix = "") {
  const node = document.getElementById(id);
  if (!node || previousValue == null || Number.isNaN(previousValue)) return;

  const delta = currentValue - previousValue;

  if (preferredDirection === "contextual") {
    const direction = delta > 0 ? "up" : delta < 0 ? "down" : "flat";
    node.className = "kpi-trend trend-warn";
    node.textContent = `${direction} ${Math.abs(delta).toFixed(1)}${suffix} trend`;
    return;
  }

  if (delta === 0) {
    node.className = "kpi-trend trend-warn";
    node.textContent = `flat 0${suffix} vs prior period`;
    return;
  }

  const isIncrease = delta > 0;
  const direction = isIncrease ? "up" : "down";
  const isGood = preferredDirection === "higher" ? isIncrease : !isIncrease;

  node.className = `kpi-trend ${isGood ? "trend-good" : "trend-bad"}`;
  node.textContent = `${direction} ${Math.abs(delta).toFixed(1)}${suffix} vs prior period`;
}

function coverage(records, predicate) {
  if (!records.length) return 0;
  return Math.round((records.filter(predicate).length / records.length) * 100);
}

function filterComplianceData(state) {
  return complianceRecords.filter((record) => {
    const areaMatch = state.complianceArea === "All" || record.compliance_area === state.complianceArea;
    const tierMatch = state.tier === "All" || record.tier === state.tier;
    const gxpMatch =
      state.gxpCriticality === "All" ||
      (state.gxpCriticality === "GxP Critical" && record.gxp_critical) ||
      (state.gxpCriticality === "Non-GxP" && !record.gxp_critical);
    const auditMatch = state.auditStatus === "All" || record.audit_status === state.auditStatus;
    const capaMatch = state.capaStatus === "All" || record.capa_status === state.capaStatus;
    const validationMatch = state.validationStatus === "All" || record.validation_status === state.validationStatus;
    const geographyMatch = state.geography === "All" || record.geography === state.geography;

    return areaMatch && tierMatch && gxpMatch && auditMatch && capaMatch && validationMatch && geographyMatch;
  });
}

function riskLevelFor(record) {
  if (record.gxp_critical && (record.validation_evidence_status === "Missing" || record.open_capa_count >= 3)) {
    return "High";
  }
  if (record.open_capa_count >= 2 || record.validation_evidence_status === "Partial") {
    return "Medium";
  }
  return "Low";
}

function renderKpis(filtered) {
  const previous = filtered.map((r) => ({
    ...r,
    security_clause_status: r.previous_security_clause_status,
    audit_rights_status: r.previous_audit_rights_status,
    breach_notification_compliant: r.previous_breach_notification_compliant,
    validation_evidence_status: r.previous_validation_evidence_status,
    quality_agreement_status: r.previous_quality_agreement_status,
    open_capa_count: r.previous_open_capa_count,
    finding_age_days: r.previous_finding_age_days
  }));

  const securityClauseCoverage = coverage(filtered, (r) => r.security_clause_status === "Covered");
  const prevSecurityClauseCoverage = coverage(previous, (r) => r.security_clause_status === "Covered");

  const auditRightsCoverage = coverage(filtered, (r) => r.audit_rights_status === "Covered");
  const prevAuditRightsCoverage = coverage(previous, (r) => r.audit_rights_status === "Covered");

  const breachNotificationCompliance = coverage(filtered, (r) => r.breach_notification_compliant);
  const prevBreachNotificationCompliance = coverage(previous, (r) => r.breach_notification_compliant);

  const gxpCriticalSuppliers = filtered.filter((r) => r.gxp_critical).length;
  const prevGxpCriticalSuppliers = gxpCriticalSuppliers;

  const openCapaExposure = filtered.reduce((sum, r) => sum + r.open_capa_count, 0);
  const prevOpenCapaExposure = previous.reduce((sum, r) => sum + r.open_capa_count, 0);

  const validationEvidenceCoverage = coverage(filtered, (r) => r.validation_evidence_status === "Complete");
  const prevValidationEvidenceCoverage = coverage(previous, (r) => r.validation_evidence_status === "Complete");

  const qualityAgreementCoverage = coverage(filtered, (r) => r.quality_agreement_status === "Signed" || r.quality_agreement_status === "Not Required");
  const prevQualityAgreementCoverage = coverage(previous, (r) => r.quality_agreement_status === "Signed" || r.quality_agreement_status === "Not Required");

  const auditFindings90Days = filtered.filter((r) => r.finding_age_days > 90).length;
  const prevAuditFindings90Days = previous.filter((r) => r.finding_age_days > 90).length;

  document.getElementById("securityClauseCoverage").textContent = `${securityClauseCoverage}%`;
  document.getElementById("auditRightsCoverage").textContent = `${auditRightsCoverage}%`;
  document.getElementById("breachNotificationCompliance").textContent = `${breachNotificationCompliance}%`;
  document.getElementById("gxpCriticalSuppliers").textContent = gxpCriticalSuppliers;
  document.getElementById("openCapaExposure").textContent = openCapaExposure;
  document.getElementById("validationEvidenceCoverage").textContent = `${validationEvidenceCoverage}%`;
  document.getElementById("qualityAgreementCoverage").textContent = `${qualityAgreementCoverage}%`;
  document.getElementById("auditFindings90Days").textContent = auditFindings90Days;

  setTrend("securityClauseCoverageTrend", securityClauseCoverage, prevSecurityClauseCoverage, "higher", "%");
  setTrend("auditRightsCoverageTrend", auditRightsCoverage, prevAuditRightsCoverage, "higher", "%");
  setTrend("breachNotificationComplianceTrend", breachNotificationCompliance, prevBreachNotificationCompliance, "higher", "%");
  setTrend("gxpCriticalSuppliersTrend", gxpCriticalSuppliers, prevGxpCriticalSuppliers, "contextual");
  setTrend("openCapaExposureTrend", openCapaExposure, prevOpenCapaExposure, "lower");
  setTrend("validationEvidenceCoverageTrend", validationEvidenceCoverage, prevValidationEvidenceCoverage, "higher", "%");
  setTrend("qualityAgreementCoverageTrend", qualityAgreementCoverage, prevQualityAgreementCoverage, "higher", "%");
  setTrend("auditFindings90DaysTrend", auditFindings90Days, prevAuditFindings90Days, "lower");
}

function renderRegulatedQueue(filtered) {
  const tbody = document.querySelector("#regulatedAssuranceQueueTable tbody");
  tbody.innerHTML = "";

  filtered
    .filter((r) => r.gxp_critical || r.open_capa_count > 0 || r.validation_evidence_status !== "Complete")
    .sort((a, b) => b.finding_age_days - a.finding_age_days)
    .forEach((r) => {
      const requiredAction = r.gxp_critical && r.validation_evidence_status !== "Complete"
        ? "Escalate validation closure with quality"
        : r.open_capa_count > 0
          ? "Close CAPA actions and evidence"
          : r.required_action;

      tbody.innerHTML += `
        <tr>
          <td>${r.supplier_name}</td>
          <td><span class="${getPillClass(r.gxp_critical ? "High" : "Low")}">${r.gxp_critical ? "Yes" : "No"}</span></td>
          <td><span class="${getPillClass(r.validation_evidence_status)}">${r.validation_evidence_status}</span></td>
          <td>${r.open_capa_count}</td>
          <td>${r.finding_age_days}d</td>
          <td><span class="${getPillClass(r.quality_agreement_status)}">${r.quality_agreement_status}</span></td>
          <td>${requiredAction}</td>
        </tr>
      `;
    });
}

function renderContractualGaps(filtered) {
  const tbody = document.querySelector("#contractualGapsTable tbody");
  tbody.innerHTML = "";

  filtered
    .filter((r) => r.security_clause_status === "Gap" || r.audit_rights_status === "Gap" || !r.breach_notification_compliant)
    .forEach((r) => {
      const missing = [];
      if (r.security_clause_status === "Gap") missing.push("Security Clause");
      if (r.audit_rights_status === "Gap") missing.push("Audit Rights");
      if (!r.breach_notification_compliant) missing.push("Breach Notification SLA");

      const risk = riskLevelFor(r);
      const requiredAction = risk === "High"
        ? "Escalate contract addendum before renewal"
        : "Track legal/compliance remediation";

      tbody.innerHTML += `
        <tr>
          <td>${r.supplier_name}</td>
          <td>${missing.join(", ")}</td>
          <td>${r.compliance_area}</td>
          <td><span class="${getPillClass(risk)}">${risk}</span></td>
          <td>${r.contract_expiry_date}</td>
          <td>${requiredAction}</td>
        </tr>
      `;
    });
}

function renderAuditCapaTracking(filtered) {
  const tbody = document.querySelector("#auditCapaTrackingTable tbody");
  tbody.innerHTML = "";

  filtered.forEach((r) => {
    const requiredAction = r.finding_age_days > 90 || r.capa_status === "Open"
      ? "Escalate in audit and governance forum"
      : "Maintain closure tracking";

    tbody.innerHTML += `
      <tr>
        <td>${r.supplier_name}</td>
        <td>${r.audit_type}</td>
        <td>${r.open_findings}</td>
        <td>${r.finding_age_days}d</td>
        <td><span class="${getPillClass(r.capa_status)}">${r.capa_status}</span></td>
        <td><span class="${getPillClass(r.validation_status)}">${r.validation_status}</span></td>
        <td>${requiredAction}</td>
      </tr>
    `;
  });
}

function renderCharts(filtered) {
  if (complianceCoverageChart) complianceCoverageChart.destroy();
  if (auditFindingsAgingChart) auditFindingsAgingChart.destroy();

  const areas = ["Security Clause", "Audit Rights", "Breach Notification", "Validation Evidence", "Quality Agreement"];
  const values = [
    coverage(filtered, (r) => r.security_clause_status === "Covered"),
    coverage(filtered, (r) => r.audit_rights_status === "Covered"),
    coverage(filtered, (r) => r.breach_notification_compliant),
    coverage(filtered, (r) => r.validation_evidence_status === "Complete"),
    coverage(filtered, (r) => r.quality_agreement_status === "Signed" || r.quality_agreement_status === "Not Required")
  ];

  complianceCoverageChart = new Chart(document.getElementById("complianceCoverageChart"), {
    type: "bar",
    data: {
      labels: areas,
      datasets: [
        {
          label: "Coverage %",
          data: values
        }
      ]
    },
    options: { maintainAspectRatio: false }
  });

  const agingBuckets = [
    filtered.filter((r) => r.finding_age_days <= 30).length,
    filtered.filter((r) => r.finding_age_days > 30 && r.finding_age_days <= 90).length,
    filtered.filter((r) => r.finding_age_days > 90).length
  ];

  auditFindingsAgingChart = new Chart(document.getElementById("auditFindingsAgingChart"), {
    type: "doughnut",
    data: {
      labels: ["0-30 Days", "31-90 Days", ">90 Days"],
      datasets: [{ data: agingBuckets }]
    },
    options: { maintainAspectRatio: false }
  });
}

function applyFilters(state) {
  const filtered = filterComplianceData(state);

  renderKpis(filtered);
  renderRegulatedQueue(filtered);
  renderContractualGaps(filtered);
  renderAuditCapaTracking(filtered);
  renderCharts(filtered);

  document.getElementById("filterSummary").textContent =
    `Showing ${filtered.length} of ${complianceRecords.length} suppliers`;
}

function addCardHoverEffect() {
  const cards = document.querySelectorAll(".kpi-card, .card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-3px)";
      card.style.transition = "0.2s ease";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });
}

function initComplianceFilters() {
  const complianceAreaSelect = document.getElementById("filterComplianceArea");
  const tierSelect = document.getElementById("filterTier");
  const gxpCriticalitySelect = document.getElementById("filterGxpCriticality");
  const auditStatusSelect = document.getElementById("filterAuditStatus");
  const capaStatusSelect = document.getElementById("filterCapaStatus");
  const validationStatusSelect = document.getElementById("filterValidationStatus");
  const geographySelect = document.getElementById("filterGeography");
  const clearButton = document.getElementById("clearFilters");

  setSelectOptions(complianceAreaSelect, complianceRecords.map((r) => r.compliance_area));
  setSelectOptions(tierSelect, complianceRecords.map((r) => r.tier));
  setSelectOptions(gxpCriticalitySelect, ["GxP Critical", "Non-GxP"]);
  setSelectOptions(auditStatusSelect, complianceRecords.map((r) => r.audit_status));
  setSelectOptions(capaStatusSelect, complianceRecords.map((r) => r.capa_status));
  setSelectOptions(validationStatusSelect, complianceRecords.map((r) => r.validation_status));
  setSelectOptions(geographySelect, complianceRecords.map((r) => r.geography));

  function applyFromUi() {
    applyFilters({
      complianceArea: complianceAreaSelect.value,
      tier: tierSelect.value,
      gxpCriticality: gxpCriticalitySelect.value,
      auditStatus: auditStatusSelect.value,
      capaStatus: capaStatusSelect.value,
      validationStatus: validationStatusSelect.value,
      geography: geographySelect.value
    });
  }

  complianceAreaSelect.addEventListener("change", applyFromUi);
  tierSelect.addEventListener("change", applyFromUi);
  gxpCriticalitySelect.addEventListener("change", applyFromUi);
  auditStatusSelect.addEventListener("change", applyFromUi);
  capaStatusSelect.addEventListener("change", applyFromUi);
  validationStatusSelect.addEventListener("change", applyFromUi);
  geographySelect.addEventListener("change", applyFromUi);

  clearButton.addEventListener("click", () => {
    complianceAreaSelect.value = "All";
    tierSelect.value = "All";
    gxpCriticalitySelect.value = "All";
    auditStatusSelect.value = "All";
    capaStatusSelect.value = "All";
    validationStatusSelect.value = "All";
    geographySelect.value = "All";
    applyFromUi();
  });

  applyFromUi();
}

addCardHoverEffect();
initComplianceFilters();
