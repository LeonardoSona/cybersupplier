const TODAY = new Date("2026-05-07T00:00:00Z");

const LIFECYCLE_STAGES = [
  "Intake",
  "Due Diligence",
  "Assessment",
  "Risk Decision",
  "Conditional Approval",
  "Monitoring",
  "Reassessment",
  "Offboarding"
];

const assessments = [
  {
    assessment_id: "ASM-001",
    supplier_id: "SUP-001",
    supplier_name: "CloudOps Partner A",
    tier: "Tier 1",
    lifecycle_stage: "Monitoring",
    assessment_type: "Annual Review",
    assessment_status: "Complete",
    owner: "Cyber Assurance",
    intake_date: "2026-01-03",
    start_date: "2026-01-08",
    due_date: "2026-02-05",
    risk_decision_date: "2026-02-02",
    due_diligence_required: true,
    due_diligence_complete: true,
    required_evidence_count: 10,
    submitted_evidence_count: 10,
    assessed_controls: 24,
    passed_controls: 20,
    partial_controls: 3,
    failed_controls: 1,
    conditional_approval: false,
    conditional_approval_expiry: "",
    access_revoked: false,
    data_destruction_confirmed: false,
    previous_assessment_status: "In Progress",
    previous_due_diligence_complete: true,
    previous_submitted_evidence_count: 9,
    previous_passed_controls: 19,
    previous_assessed_controls: 24,
    previous_lifecycle_stage: "Assessment",
    previous_access_revoked: false,
    previous_data_destruction_confirmed: false
  },
  {
    assessment_id: "ASM-002",
    supplier_id: "SUP-002",
    supplier_name: "Clinical Data Vendor B",
    tier: "Tier 1",
    lifecycle_stage: "Risk Decision",
    assessment_type: "Onboarding",
    assessment_status: "In Progress",
    owner: "TPRM Operations",
    intake_date: "2026-03-01",
    start_date: "2026-03-08",
    due_date: "2026-05-20",
    risk_decision_date: "",
    due_diligence_required: true,
    due_diligence_complete: true,
    required_evidence_count: 14,
    submitted_evidence_count: 12,
    assessed_controls: 30,
    passed_controls: 22,
    partial_controls: 6,
    failed_controls: 2,
    conditional_approval: false,
    conditional_approval_expiry: "",
    access_revoked: false,
    data_destruction_confirmed: false,
    previous_assessment_status: "In Progress",
    previous_due_diligence_complete: true,
    previous_submitted_evidence_count: 10,
    previous_passed_controls: 20,
    previous_assessed_controls: 30,
    previous_lifecycle_stage: "Assessment",
    previous_access_revoked: false,
    previous_data_destruction_confirmed: false
  },
  {
    assessment_id: "ASM-003",
    supplier_id: "SUP-003",
    supplier_name: "Logistics Provider C",
    tier: "Tier 2",
    lifecycle_stage: "Reassessment",
    assessment_type: "Reassessment",
    assessment_status: "Overdue",
    owner: "Procurement Risk",
    intake_date: "2026-01-15",
    start_date: "2026-01-18",
    due_date: "2026-04-20",
    risk_decision_date: "",
    due_diligence_required: true,
    due_diligence_complete: false,
    required_evidence_count: 11,
    submitted_evidence_count: 7,
    assessed_controls: 26,
    passed_controls: 15,
    partial_controls: 7,
    failed_controls: 4,
    conditional_approval: true,
    conditional_approval_expiry: "2026-06-01",
    access_revoked: false,
    data_destruction_confirmed: false,
    previous_assessment_status: "In Progress",
    previous_due_diligence_complete: false,
    previous_submitted_evidence_count: 6,
    previous_passed_controls: 14,
    previous_assessed_controls: 26,
    previous_lifecycle_stage: "Monitoring",
    previous_access_revoked: false,
    previous_data_destruction_confirmed: false
  },
  {
    assessment_id: "ASM-004",
    supplier_id: "SUP-004",
    supplier_name: "Manufacturing SaaS D",
    tier: "Tier 1",
    lifecycle_stage: "Assessment",
    assessment_type: "Onboarding",
    assessment_status: "In Progress",
    owner: "Supplier Cyber Assurance",
    intake_date: "2026-02-10",
    start_date: "2026-02-14",
    due_date: "2026-05-17",
    risk_decision_date: "",
    due_diligence_required: true,
    due_diligence_complete: true,
    required_evidence_count: 13,
    submitted_evidence_count: 9,
    assessed_controls: 28,
    passed_controls: 17,
    partial_controls: 8,
    failed_controls: 3,
    conditional_approval: false,
    conditional_approval_expiry: "",
    access_revoked: false,
    data_destruction_confirmed: false,
    previous_assessment_status: "In Progress",
    previous_due_diligence_complete: true,
    previous_submitted_evidence_count: 8,
    previous_passed_controls: 16,
    previous_assessed_controls: 28,
    previous_lifecycle_stage: "Due Diligence",
    previous_access_revoked: false,
    previous_data_destruction_confirmed: false
  },
  {
    assessment_id: "ASM-005",
    supplier_id: "SUP-005",
    supplier_name: "Procurement Platform E",
    tier: "Tier 2",
    lifecycle_stage: "Monitoring",
    assessment_type: "Annual Review",
    assessment_status: "Complete",
    owner: "Compliance & Audit",
    intake_date: "2026-01-07",
    start_date: "2026-01-09",
    due_date: "2026-02-04",
    risk_decision_date: "2026-01-30",
    due_diligence_required: false,
    due_diligence_complete: false,
    required_evidence_count: 8,
    submitted_evidence_count: 8,
    assessed_controls: 20,
    passed_controls: 18,
    partial_controls: 2,
    failed_controls: 0,
    conditional_approval: false,
    conditional_approval_expiry: "",
    access_revoked: false,
    data_destruction_confirmed: false,
    previous_assessment_status: "Complete",
    previous_due_diligence_complete: false,
    previous_submitted_evidence_count: 8,
    previous_passed_controls: 17,
    previous_assessed_controls: 20,
    previous_lifecycle_stage: "Monitoring",
    previous_access_revoked: false,
    previous_data_destruction_confirmed: false
  },
  {
    assessment_id: "ASM-006",
    supplier_id: "SUP-006",
    supplier_name: "Identity Services F",
    tier: "Tier 1",
    lifecycle_stage: "Conditional Approval",
    assessment_type: "Reassessment",
    assessment_status: "Overdue",
    owner: "TPRM Operations",
    intake_date: "2026-02-01",
    start_date: "2026-02-05",
    due_date: "2026-04-28",
    risk_decision_date: "2026-04-26",
    due_diligence_required: true,
    due_diligence_complete: false,
    required_evidence_count: 15,
    submitted_evidence_count: 10,
    assessed_controls: 32,
    passed_controls: 19,
    partial_controls: 8,
    failed_controls: 5,
    conditional_approval: true,
    conditional_approval_expiry: "2026-05-31",
    access_revoked: false,
    data_destruction_confirmed: false,
    previous_assessment_status: "In Progress",
    previous_due_diligence_complete: false,
    previous_submitted_evidence_count: 9,
    previous_passed_controls: 18,
    previous_assessed_controls: 32,
    previous_lifecycle_stage: "Risk Decision",
    previous_access_revoked: false,
    previous_data_destruction_confirmed: false
  },
  {
    assessment_id: "ASM-007",
    supplier_id: "SUP-007",
    supplier_name: "Marketing Platform G",
    tier: "Tier 3",
    lifecycle_stage: "Intake",
    assessment_type: "Onboarding",
    assessment_status: "Not Started",
    owner: "Procurement Risk",
    intake_date: "2026-04-20",
    start_date: "",
    due_date: "2026-06-10",
    risk_decision_date: "",
    due_diligence_required: true,
    due_diligence_complete: false,
    required_evidence_count: 7,
    submitted_evidence_count: 1,
    assessed_controls: 12,
    passed_controls: 2,
    partial_controls: 3,
    failed_controls: 7,
    conditional_approval: false,
    conditional_approval_expiry: "",
    access_revoked: false,
    data_destruction_confirmed: false,
    previous_assessment_status: "Not Started",
    previous_due_diligence_complete: false,
    previous_submitted_evidence_count: 0,
    previous_passed_controls: 1,
    previous_assessed_controls: 12,
    previous_lifecycle_stage: "Intake",
    previous_access_revoked: false,
    previous_data_destruction_confirmed: false
  },
  {
    assessment_id: "ASM-008",
    supplier_id: "SUP-008",
    supplier_name: "Data Processing H",
    tier: "Tier 1",
    lifecycle_stage: "Due Diligence",
    assessment_type: "Annual Review",
    assessment_status: "In Progress",
    owner: "Supplier Cyber Assurance",
    intake_date: "2026-03-12",
    start_date: "2026-03-14",
    due_date: "2026-05-25",
    risk_decision_date: "",
    due_diligence_required: true,
    due_diligence_complete: true,
    required_evidence_count: 12,
    submitted_evidence_count: 10,
    assessed_controls: 27,
    passed_controls: 20,
    partial_controls: 6,
    failed_controls: 1,
    conditional_approval: false,
    conditional_approval_expiry: "",
    access_revoked: false,
    data_destruction_confirmed: false,
    previous_assessment_status: "In Progress",
    previous_due_diligence_complete: true,
    previous_submitted_evidence_count: 9,
    previous_passed_controls: 19,
    previous_assessed_controls: 27,
    previous_lifecycle_stage: "Due Diligence",
    previous_access_revoked: false,
    previous_data_destruction_confirmed: false
  },
  {
    assessment_id: "ASM-009",
    supplier_id: "SUP-009",
    supplier_name: "Endpoint Security I",
    tier: "Tier 2",
    lifecycle_stage: "Offboarding",
    assessment_type: "Offboarding Assurance",
    assessment_status: "In Progress",
    owner: "Compliance & Audit",
    intake_date: "2026-03-20",
    start_date: "2026-03-22",
    due_date: "2026-05-10",
    risk_decision_date: "",
    due_diligence_required: false,
    due_diligence_complete: false,
    required_evidence_count: 6,
    submitted_evidence_count: 4,
    assessed_controls: 10,
    passed_controls: 6,
    partial_controls: 3,
    failed_controls: 1,
    conditional_approval: false,
    conditional_approval_expiry: "",
    access_revoked: false,
    data_destruction_confirmed: true,
    previous_assessment_status: "In Progress",
    previous_due_diligence_complete: false,
    previous_submitted_evidence_count: 3,
    previous_passed_controls: 5,
    previous_assessed_controls: 10,
    previous_lifecycle_stage: "Monitoring",
    previous_access_revoked: false,
    previous_data_destruction_confirmed: true
  },
  {
    assessment_id: "ASM-010",
    supplier_id: "SUP-010",
    supplier_name: "Legacy Hosting J",
    tier: "Tier 1",
    lifecycle_stage: "Offboarding",
    assessment_type: "Offboarding Assurance",
    assessment_status: "Overdue",
    owner: "TPRM Operations",
    intake_date: "2026-02-18",
    start_date: "2026-02-20",
    due_date: "2026-04-30",
    risk_decision_date: "",
    due_diligence_required: false,
    due_diligence_complete: false,
    required_evidence_count: 5,
    submitted_evidence_count: 2,
    assessed_controls: 9,
    passed_controls: 3,
    partial_controls: 3,
    failed_controls: 3,
    conditional_approval: false,
    conditional_approval_expiry: "",
    access_revoked: false,
    data_destruction_confirmed: false,
    previous_assessment_status: "In Progress",
    previous_due_diligence_complete: false,
    previous_submitted_evidence_count: 2,
    previous_passed_controls: 3,
    previous_assessed_controls: 9,
    previous_lifecycle_stage: "Offboarding",
    previous_access_revoked: false,
    previous_data_destruction_confirmed: false
  }
];

const evidenceGaps = [
  {
    supplier_id: "SUP-003",
    supplier_name: "Logistics Provider C",
    tier: "Tier 2",
    missing_evidence: "SOC 2 Type II",
    control_area: "Third-Party Governance",
    risk_level: "High",
    due_date: "2026-04-20"
  },
  {
    supplier_id: "SUP-004",
    supplier_name: "Manufacturing SaaS D",
    tier: "Tier 1",
    missing_evidence: "MFA Attestation",
    control_area: "Identity & Access",
    risk_level: "High",
    due_date: "2026-05-17"
  },
  {
    supplier_id: "SUP-006",
    supplier_name: "Identity Services F",
    tier: "Tier 1",
    missing_evidence: "Incident Response Test",
    control_area: "Incident Response",
    risk_level: "Critical",
    due_date: "2026-04-28"
  },
  {
    supplier_id: "SUP-010",
    supplier_name: "Legacy Hosting J",
    tier: "Tier 1",
    missing_evidence: "Data Destruction Certificate",
    control_area: "Data Lifecycle",
    risk_level: "Critical",
    due_date: "2026-04-30"
  }
];

const controlAssuranceSummary = [
  {
    control_area: "Identity & Access",
    assessed_controls: 38,
    passed: 27,
    partial: 8,
    failed: 3,
    priority_gap: "Privileged access MFA evidence"
  },
  {
    control_area: "Data Protection",
    assessed_controls: 34,
    passed: 24,
    partial: 7,
    failed: 3,
    priority_gap: "Encryption key rotation evidence"
  },
  {
    control_area: "Incident Response",
    assessed_controls: 29,
    passed: 18,
    partial: 8,
    failed: 3,
    priority_gap: "Joint breach simulation testing"
  },
  {
    control_area: "Resilience & Continuity",
    assessed_controls: 26,
    passed: 17,
    partial: 6,
    failed: 3,
    priority_gap: "Recovery test attestation"
  }
];

let assessmentStatusChart = null;
let lifecycleStageChart = null;

function setSelectOptions(select, values) {
  const options = ["All", ...new Set(values)].filter(Boolean);
  select.innerHTML = options.map((value) => `<option value="${value}">${value}</option>`).join("");
}

function parseDate(dateString) {
  if (!dateString) return null;
  return new Date(`${dateString}T00:00:00Z`);
}

function daysBetween(startDateString, endDateString) {
  const start = parseDate(startDateString);
  const end = parseDate(endDateString);
  if (!start || !end) return 0;
  return Math.max(0, Math.round((end - start) / 86400000));
}

function daysToDue(dateString) {
  const due = parseDate(dateString);
  if (!due) return 9999;
  return Math.round((due - TODAY) / 86400000);
}

function getDueDateWindow(item) {
  const days = daysToDue(item.due_date);
  if (days < 0) return "Overdue";
  if (days <= 30) return "0-30 Days";
  if (days <= 60) return "31-60 Days";
  return "61+ Days";
}

function getEvidenceStatus(item) {
  if (item.submitted_evidence_count >= item.required_evidence_count) return "Complete";
  if (item.submitted_evidence_count === 0) return "Missing";
  return "Partial";
}

function getPillClass(value) {
  if (["Critical", "High", "Overdue", "Failed"].includes(value)) return "pill pill-red";
  if (["Medium", "In Progress", "Partial", "At Risk"].includes(value)) return "pill pill-amber";
  return "pill pill-green";
}

function setTrend(id, currentValue, previousValue, preferredDirection, valueSuffix = "") {
  const node = document.getElementById(id);
  if (!node || previousValue == null || Number.isNaN(previousValue)) {
    return;
  }

  const delta = currentValue - previousValue;
  if (delta === 0) {
    node.className = "kpi-trend trend-warn";
    node.textContent = `→ 0${valueSuffix} vs past month`;
    return;
  }

  const isIncrease = delta > 0;
  const arrow = isIncrease ? "▲" : "▼";
  const isGood = preferredDirection === "higher" ? isIncrease : !isIncrease;

  node.className = `kpi-trend ${isGood ? "trend-good" : "trend-bad"}`;
  node.textContent = `${arrow} ${Math.abs(delta).toFixed(1)}${valueSuffix} vs past month`;
}

function filterAssessments(state) {
  const filteredAssessments = assessments.filter((item) => {
    const lifecycleMatch = state.lifecycleStage === "All" || item.lifecycle_stage === state.lifecycleStage;
    const statusMatch = state.status === "All" || item.assessment_status === state.status;
    const typeMatch = state.type === "All" || item.assessment_type === state.type;
    const tierMatch = state.tier === "All" || item.tier === state.tier;
    const ownerMatch = state.owner === "All" || item.owner === state.owner;
    const dueWindowMatch = state.dueDateWindow === "All" || getDueDateWindow(item) === state.dueDateWindow;
    const evidenceStatusMatch = state.evidenceStatus === "All" || getEvidenceStatus(item) === state.evidenceStatus;

    return lifecycleMatch && statusMatch && typeMatch && tierMatch && ownerMatch && dueWindowMatch && evidenceStatusMatch;
  });

  const supplierIds = new Set(filteredAssessments.map((item) => item.supplier_id));
  const filteredEvidence = evidenceGaps.filter((item) => supplierIds.has(item.supplier_id));

  return { filteredAssessments, filteredEvidence };
}

function calculateKpis(filteredAssessments) {
  const total = filteredAssessments.length;

  if (!total) {
    return {
      assessmentCompletion: 0,
      previousAssessmentCompletion: 0,
      tierOneCompletion: 0,
      previousTierOneCompletion: 0,
      avgOnboardingCycle: 0,
      previousAvgOnboardingCycle: 0,
      dueDiligenceCompletion: 0,
      previousDueDiligenceCompletion: 0,
      evidenceCompletion: 0,
      previousEvidenceCompletion: 0,
      controlPassRate: 0,
      previousControlPassRate: 0,
      overdueAssessments: 0,
      previousOverdueAssessments: 0,
      offboardingAssuranceGaps: 0,
      previousOffboardingAssuranceGaps: 0
    };
  }

  const completedCount = filteredAssessments.filter((a) => a.assessment_status === "Complete").length;
  const previousCompletedCount = filteredAssessments.filter((a) => a.previous_assessment_status === "Complete").length;
  const assessmentCompletion = Math.round((completedCount / total) * 100);
  const previousAssessmentCompletion = Math.round((previousCompletedCount / total) * 100);

  const tierOne = filteredAssessments.filter((a) => a.tier === "Tier 1");
  const tierOneComplete = tierOne.filter((a) => a.assessment_status === "Complete").length;
  const previousTierOneComplete = tierOne.filter((a) => a.previous_assessment_status === "Complete").length;
  const tierOneCompletion = tierOne.length ? Math.round((tierOneComplete / tierOne.length) * 100) : 0;
  const previousTierOneCompletion = tierOne.length ? Math.round((previousTierOneComplete / tierOne.length) * 100) : 0;

  const onboarding = filteredAssessments.filter((a) => a.assessment_type === "Onboarding");
  const previousOnboarding = onboarding;
  const avgOnboardingCycle = onboarding.length
    ? Math.round(
        onboarding.reduce((sum, a) => {
          const cycleEnd = a.risk_decision_date || a.due_date;
          return sum + daysBetween(a.intake_date, cycleEnd);
        }, 0) / onboarding.length
      )
    : 0;
  const previousAvgOnboardingCycle = previousOnboarding.length
    ? Math.round(
        previousOnboarding.reduce((sum, a) => {
          const cycleEnd = a.risk_decision_date || a.due_date;
          return sum + Math.max(0, daysBetween(a.intake_date, cycleEnd) - 3);
        }, 0) / previousOnboarding.length
      )
    : 0;

  const dueDiligenceRequired = filteredAssessments.filter((a) => a.due_diligence_required);
  const dueDiligenceDone = dueDiligenceRequired.filter((a) => a.due_diligence_complete).length;
  const previousDueDiligenceDone = dueDiligenceRequired.filter((a) => a.previous_due_diligence_complete).length;
  const dueDiligenceCompletion = dueDiligenceRequired.length
    ? Math.round((dueDiligenceDone / dueDiligenceRequired.length) * 100)
    : 100;
  const previousDueDiligenceCompletion = dueDiligenceRequired.length
    ? Math.round((previousDueDiligenceDone / dueDiligenceRequired.length) * 100)
    : 100;

  const totalRequiredEvidence = filteredAssessments.reduce((sum, a) => sum + a.required_evidence_count, 0);
  const totalSubmittedEvidence = filteredAssessments.reduce((sum, a) => sum + a.submitted_evidence_count, 0);
  const previousSubmittedEvidence = filteredAssessments.reduce((sum, a) => sum + a.previous_submitted_evidence_count, 0);
  const evidenceCompletion = totalRequiredEvidence
    ? Math.round((totalSubmittedEvidence / totalRequiredEvidence) * 100)
    : 0;
  const previousEvidenceCompletion = totalRequiredEvidence
    ? Math.round((previousSubmittedEvidence / totalRequiredEvidence) * 100)
    : 0;

  const assessedControls = filteredAssessments.reduce((sum, a) => sum + a.assessed_controls, 0);
  const passedControls = filteredAssessments.reduce((sum, a) => sum + a.passed_controls, 0);
  const previousAssessedControls = filteredAssessments.reduce((sum, a) => sum + a.previous_assessed_controls, 0);
  const previousPassedControls = filteredAssessments.reduce((sum, a) => sum + a.previous_passed_controls, 0);
  const controlPassRate = assessedControls ? Math.round((passedControls / assessedControls) * 100) : 0;
  const previousControlPassRate = previousAssessedControls
    ? Math.round((previousPassedControls / previousAssessedControls) * 100)
    : 0;

  const overdueAssessments = filteredAssessments.filter(
    (a) => a.assessment_status !== "Complete" && daysToDue(a.due_date) < 0
  ).length;
  const previousOverdueAssessments = filteredAssessments.filter(
    (a) => a.previous_assessment_status !== "Complete" && a.previous_lifecycle_stage !== "Monitoring" && daysToDue(a.due_date) <= -3
  ).length;

  const offboarding = filteredAssessments.filter((a) => a.lifecycle_stage === "Offboarding");
  const offboardingAssuranceGaps = offboarding.filter(
    (a) => !a.access_revoked || !a.data_destruction_confirmed
  ).length;
  const previousOffboardingAssuranceGaps = offboarding.filter(
    (a) => !a.previous_access_revoked || !a.previous_data_destruction_confirmed
  ).length;

  return {
    assessmentCompletion,
    previousAssessmentCompletion,
    tierOneCompletion,
    previousTierOneCompletion,
    avgOnboardingCycle,
    previousAvgOnboardingCycle,
    dueDiligenceCompletion,
    previousDueDiligenceCompletion,
    evidenceCompletion,
    previousEvidenceCompletion,
    controlPassRate,
    previousControlPassRate,
    overdueAssessments,
    previousOverdueAssessments,
    offboardingAssuranceGaps,
    previousOffboardingAssuranceGaps
  };
}

function renderAssessmentKpis(filteredAssessments) {
  const kpis = calculateKpis(filteredAssessments);

  document.getElementById("assessmentCompletion").textContent = `${kpis.assessmentCompletion}%`;
  document.getElementById("tierOneCompletion").textContent = `${kpis.tierOneCompletion}%`;
  document.getElementById("avgOnboardingCycle").textContent = `${kpis.avgOnboardingCycle}d`;
  document.getElementById("dueDiligenceCompletion").textContent = `${kpis.dueDiligenceCompletion}%`;
  document.getElementById("evidenceCompletion").textContent = `${kpis.evidenceCompletion}%`;
  document.getElementById("controlPassRate").textContent = `${kpis.controlPassRate}%`;
  document.getElementById("overdueAssessments").textContent = kpis.overdueAssessments;
  document.getElementById("offboardingAssuranceGaps").textContent = kpis.offboardingAssuranceGaps;

  setTrend("assessmentCompletionTrend", kpis.assessmentCompletion, kpis.previousAssessmentCompletion, "higher", "%");
  setTrend("tierOneCompletionTrend", kpis.tierOneCompletion, kpis.previousTierOneCompletion, "higher", "%");
  setTrend("avgOnboardingCycleTrend", kpis.avgOnboardingCycle, kpis.previousAvgOnboardingCycle, "lower", "d");
  setTrend("dueDiligenceCompletionTrend", kpis.dueDiligenceCompletion, kpis.previousDueDiligenceCompletion, "higher", "%");
  setTrend("evidenceCompletionTrend", kpis.evidenceCompletion, kpis.previousEvidenceCompletion, "higher", "%");
  setTrend("controlPassRateTrend", kpis.controlPassRate, kpis.previousControlPassRate, "higher", "%");
  setTrend("overdueAssessmentsTrend", kpis.overdueAssessments, kpis.previousOverdueAssessments, "lower");
  setTrend("offboardingAssuranceGapsTrend", kpis.offboardingAssuranceGaps, kpis.previousOffboardingAssuranceGaps, "lower");
}

function getBacklogAction(item) {
  if (item.assessment_status === "Overdue") return "Escalate: close within 7 days";
  if (getEvidenceStatus(item) !== "Complete") return "Collect evidence and revalidate";
  if (item.lifecycle_stage === "Risk Decision") return "Issue risk decision package";
  return "Track in weekly assurance cadence";
}

function renderAssessmentBacklog(filteredAssessments) {
  const tbody = document.querySelector("#assessmentBacklogTable tbody");
  tbody.innerHTML = "";

  filteredAssessments
    .filter((a) => a.assessment_status !== "Complete")
    .sort((a, b) => daysToDue(a.due_date) - daysToDue(b.due_date))
    .forEach((a) => {
      const ageDays = a.start_date ? daysBetween(a.start_date, TODAY.toISOString().slice(0, 10)) : daysBetween(a.intake_date, TODAY.toISOString().slice(0, 10));
      tbody.innerHTML += `
        <tr>
          <td>${a.supplier_name}</td>
          <td>${a.tier}</td>
          <td>${a.lifecycle_stage}</td>
          <td>${a.assessment_type}</td>
          <td><span class="${getPillClass(a.assessment_status)}">${a.assessment_status}</span></td>
          <td>${ageDays}d</td>
          <td>${a.due_date}</td>
          <td>${a.owner}</td>
          <td>${getBacklogAction(a)}</td>
        </tr>
      `;
    });
}

function getEvidenceAction(gap) {
  if (daysToDue(gap.due_date) < 0) return "Escalate: evidence overdue";
  if (gap.risk_level === "Critical") return "Priority: submit within 5 days";
  return "Collect and validate evidence";
}

function renderEvidenceGaps(filteredEvidence) {
  const tbody = document.querySelector("#evidenceGapTable tbody");
  tbody.innerHTML = "";

  filteredEvidence.forEach((gap) => {
    tbody.innerHTML += `
      <tr>
        <td>${gap.supplier_name}</td>
        <td>${gap.tier}</td>
        <td>${gap.missing_evidence}</td>
        <td>${gap.control_area}</td>
        <td><span class="${getPillClass(gap.risk_level)}">${gap.risk_level}</span></td>
        <td>${gap.due_date}</td>
        <td>${getEvidenceAction(gap)}</td>
      </tr>
    `;
  });
}

function getControlAction(control) {
  if (control.failed >= 3) return "Launch targeted control uplift";
  if (control.partial >= 7) return "Drive evidence and design closure";
  return "Maintain control assurance cadence";
}

function renderControlSummary() {
  const tbody = document.querySelector("#controlSummaryTable tbody");
  tbody.innerHTML = "";

  controlAssuranceSummary.forEach((control) => {
    tbody.innerHTML += `
      <tr>
        <td>${control.control_area}</td>
        <td>${control.assessed_controls}</td>
        <td>${control.passed}</td>
        <td>${control.partial}</td>
        <td>${control.failed}</td>
        <td>${control.priority_gap}</td>
        <td>${getControlAction(control)}</td>
      </tr>
    `;
  });
}

function renderAssessmentCharts(filteredAssessments) {
  if (assessmentStatusChart) assessmentStatusChart.destroy();
  if (lifecycleStageChart) lifecycleStageChart.destroy();

  const statusLabels = ["Complete", "In Progress", "Overdue", "Not Started"];

  assessmentStatusChart = new Chart(document.getElementById("assessmentStatusChart"), {
    type: "doughnut",
    data: {
      labels: statusLabels,
      datasets: [
        {
          data: statusLabels.map((status) =>
            filteredAssessments.filter((a) => a.assessment_status === status).length
          )
        }
      ]
    },
    options: { maintainAspectRatio: false }
  });

  lifecycleStageChart = new Chart(document.getElementById("lifecycleStageChart"), {
    type: "bar",
    data: {
      labels: LIFECYCLE_STAGES,
      datasets: [
        {
          label: "Assessments",
          data: LIFECYCLE_STAGES.map((stage) =>
            filteredAssessments.filter((a) => a.lifecycle_stage === stage).length
          )
        }
      ]
    },
    options: { maintainAspectRatio: false }
  });
}

function applyFilters(state) {
  const { filteredAssessments, filteredEvidence } = filterAssessments(state);

  renderAssessmentKpis(filteredAssessments);
  renderAssessmentBacklog(filteredAssessments);
  renderEvidenceGaps(filteredEvidence);
  renderControlSummary();
  renderAssessmentCharts(filteredAssessments);

  document.getElementById("filterSummary").textContent =
    `Showing ${filteredAssessments.length} of ${assessments.length} assessments`;
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

function initAssessmentFilters() {
  const lifecycleSelect = document.getElementById("filterLifecycleStage");
  const statusSelect = document.getElementById("filterStatus");
  const typeSelect = document.getElementById("filterType");
  const tierSelect = document.getElementById("filterTier");
  const ownerSelect = document.getElementById("filterOwner");
  const dueDateWindowSelect = document.getElementById("filterDueDateWindow");
  const evidenceStatusSelect = document.getElementById("filterEvidenceStatus");
  const clearButton = document.getElementById("clearFilters");

  setSelectOptions(lifecycleSelect, assessments.map((item) => item.lifecycle_stage));
  setSelectOptions(statusSelect, assessments.map((item) => item.assessment_status));
  setSelectOptions(typeSelect, assessments.map((item) => item.assessment_type));
  setSelectOptions(tierSelect, assessments.map((item) => item.tier));
  setSelectOptions(ownerSelect, assessments.map((item) => item.owner));
  setSelectOptions(dueDateWindowSelect, ["Overdue", "0-30 Days", "31-60 Days", "61+ Days"]);
  setSelectOptions(evidenceStatusSelect, ["Complete", "Partial", "Missing"]);

  function applyFromUi() {
    applyFilters({
      lifecycleStage: lifecycleSelect.value,
      status: statusSelect.value,
      type: typeSelect.value,
      tier: tierSelect.value,
      owner: ownerSelect.value,
      dueDateWindow: dueDateWindowSelect.value,
      evidenceStatus: evidenceStatusSelect.value
    });
  }

  lifecycleSelect.addEventListener("change", applyFromUi);
  statusSelect.addEventListener("change", applyFromUi);
  typeSelect.addEventListener("change", applyFromUi);
  tierSelect.addEventListener("change", applyFromUi);
  ownerSelect.addEventListener("change", applyFromUi);
  dueDateWindowSelect.addEventListener("change", applyFromUi);
  evidenceStatusSelect.addEventListener("change", applyFromUi);

  clearButton.addEventListener("click", () => {
    lifecycleSelect.value = "All";
    statusSelect.value = "All";
    typeSelect.value = "All";
    tierSelect.value = "All";
    ownerSelect.value = "All";
    dueDateWindowSelect.value = "All";
    evidenceStatusSelect.value = "All";
    applyFromUi();
  });

  applyFromUi();
}

addCardHoverEffect();
initAssessmentFilters();
