const assessments = [
  {
    supplier: "CloudOps Partner A",
    tier: "Tier 1",
    type: "Annual Review",
    status: "Complete",
    age_days: 12,
    owner: "Cyber Assurance",
    onboarding_cycle_days: 28,
    evidence_complete: true,
    control_result: "Partial",
    conditional_approval: true,
    reassessment_due_days: 260
  },
  {
    supplier: "Clinical Data Vendor B",
    tier: "Tier 1",
    type: "Annual Review",
    status: "Complete",
    age_days: 16,
    owner: "R&D Supplier Owner",
    onboarding_cycle_days: 32,
    evidence_complete: true,
    control_result: "Pass",
    conditional_approval: false,
    reassessment_due_days: 290
  },
  {
    supplier: "Logistics Provider C",
    tier: "Tier 2",
    type: "Reassessment",
    status: "Overdue",
    age_days: 58,
    owner: "TPRM Analyst",
    onboarding_cycle_days: 44,
    evidence_complete: false,
    control_result: "Fail",
    conditional_approval: true,
    reassessment_due_days: -12
  },
  {
    supplier: "Manufacturing SaaS D",
    tier: "Tier 1",
    type: "Onboarding",
    status: "In Progress",
    age_days: 27,
    owner: "Manufacturing IT",
    onboarding_cycle_days: 37,
    evidence_complete: false,
    control_result: "Partial",
    conditional_approval: false,
    reassessment_due_days: 45
  },
  {
    supplier: "Procurement Platform E",
    tier: "Tier 2",
    type: "Annual Review",
    status: "Complete",
    age_days: 9,
    owner: "Procurement Owner",
    onboarding_cycle_days: 21,
    evidence_complete: true,
    control_result: "Pass",
    conditional_approval: false,
    reassessment_due_days: 330
  },
  {
    supplier: "Identity Services F",
    tier: "Tier 1",
    type: "Reassessment",
    status: "Overdue",
    age_days: 46,
    owner: "Technology Owner",
    onboarding_cycle_days: 41,
    evidence_complete: false,
    control_result: "Fail",
    conditional_approval: true,
    reassessment_due_days: -5
  },
  {
    supplier: "Marketing Platform G",
    tier: "Tier 3",
    type: "Onboarding",
    status: "In Progress",
    age_days: 18,
    owner: "Commercial Owner",
    onboarding_cycle_days: 25,
    evidence_complete: true,
    control_result: "Partial",
    conditional_approval: false,
    reassessment_due_days: 120
  },
  {
    supplier: "Data Processing H",
    tier: "Tier 1",
    type: "Annual Review",
    status: "Complete",
    age_days: 11,
    owner: "R&D Data Owner",
    onboarding_cycle_days: 30,
    evidence_complete: true,
    control_result: "Pass",
    conditional_approval: false,
    reassessment_due_days: 270
  }
];

const evidenceGaps = [
  {
    supplier: "Logistics Provider C",
    evidence: "SOC 2 Type II",
    risk: "High",
    due_days: -12
  },
  {
    supplier: "Manufacturing SaaS D",
    evidence: "MFA attestation",
    risk: "High",
    due_days: 6
  },
  {
    supplier: "Identity Services F",
    evidence: "Incident response plan",
    risk: "Critical",
    due_days: -5
  },
  {
    supplier: "CloudOps Partner A",
    evidence: "Penetration test summary",
    risk: "Medium",
    due_days: 18
  }
];

const controlSummary = [
  {
    area: "Identity & Access Management",
    pass: 5,
    partial: 2,
    fail: 1,
    gap: "MFA attestation"
  },
  {
    area: "Data Protection",
    pass: 6,
    partial: 1,
    fail: 1,
    gap: "Encryption evidence"
  },
  {
    area: "Incident Response",
    pass: 4,
    partial: 3,
    fail: 1,
    gap: "Breach notification testing"
  },
  {
    area: "Vulnerability Management",
    pass: 3,
    partial: 3,
    fail: 2,
    gap: "Critical patch SLA"
  },
  {
    area: "Business Continuity",
    pass: 4,
    partial: 2,
    fail: 2,
    gap: "Recovery test evidence"
  }
];

const assessmentAiAlerts = [
  {
    value: "4 suppliers",
    detail: "Predicted to miss assessment SLA based on current cycle time"
  },
  {
    value: "SOC 2 gap",
    detail: "Most frequent missing evidence across Tier 1 and Tier 2 suppliers"
  },
  {
    value: "Vendor F",
    detail: "Highest reassessment urgency due to overdue status and failed controls"
  }
];

let assessmentStatusChart = null;
let completionByTierChart = null;

function setSelectOptions(select, values) {
  const options = ["All", ...new Set(values)].filter(Boolean);
  select.innerHTML = options.map(value => `<option value="${value}">${value}</option>`).join("");
}

function getPillClass(value) {
  if (["Critical", "High", "Overdue", "Fail"].includes(value)) return "pill pill-red";
  if (["Medium", "In Progress", "Partial", "At Risk"].includes(value)) return "pill pill-amber";
  return "pill pill-green";
}

function filterAssessments(state) {
  const filteredAssessments = assessments.filter(item => {
    const statusMatch = state.status === "All" || item.status === state.status;
    const typeMatch = state.type === "All" || item.type === state.type;
    const tierMatch = state.tier === "All" || item.tier === state.tier;
    const ownerMatch = state.owner === "All" || item.owner === state.owner;
    return statusMatch && typeMatch && tierMatch && ownerMatch;
  });

  const suppliers = new Set(filteredAssessments.map(item => item.supplier));

  const filteredEvidence = evidenceGaps.filter(item => suppliers.has(item.supplier));

  return { filteredAssessments, filteredEvidence };
}

function renderAssessmentKpis(filteredAssessments) {
  const total = filteredAssessments.length;

  if (!total) {
    document.getElementById("assessmentCompletion").textContent = "0%";
    document.getElementById("tierOneCompletion").textContent = "0%";
    document.getElementById("avgOnboardingCycle").textContent = "0d";
    document.getElementById("overdueAssessments").textContent = "0";
    document.getElementById("evidenceCompletion").textContent = "0%";
    document.getElementById("controlPassRate").textContent = "0%";
    document.getElementById("conditionalApprovals").textContent = "0";
    document.getElementById("reassessmentsDue").textContent = "0";
    return;
  }

  const completed = filteredAssessments.filter(a => a.status === "Complete").length;
  const completion = Math.round((completed / total) * 100);

  const tierOne = filteredAssessments.filter(a => a.tier === "Tier 1");
  const tierOneCompleted = tierOne.filter(a => a.status === "Complete").length;
  const tierOneCompletion = tierOne.length ? Math.round((tierOneCompleted / tierOne.length) * 100) : 0;

  const avgCycle = Math.round(
    filteredAssessments.reduce((sum, a) => sum + a.onboarding_cycle_days, 0) / total
  );

  const overdue = filteredAssessments.filter(a => a.status === "Overdue").length;

  const evidenceComplete = filteredAssessments.filter(a => a.evidence_complete).length;
  const evidenceCompletion = Math.round((evidenceComplete / total) * 100);

  const passed = filteredAssessments.filter(a => a.control_result === "Pass").length;
  const controlPassRate = Math.round((passed / total) * 100);

  const conditional = filteredAssessments.filter(a => a.conditional_approval).length;

  const dueSoon = filteredAssessments.filter(
    a => a.reassessment_due_days <= 90
  ).length;

  document.getElementById("assessmentCompletion").textContent = `${completion}%`;
  document.getElementById("tierOneCompletion").textContent = `${tierOneCompletion}%`;
  document.getElementById("avgOnboardingCycle").textContent = `${avgCycle}d`;
  document.getElementById("overdueAssessments").textContent = overdue;
  document.getElementById("evidenceCompletion").textContent = `${evidenceCompletion}%`;
  document.getElementById("controlPassRate").textContent = `${controlPassRate}%`;
  document.getElementById("conditionalApprovals").textContent = conditional;
  document.getElementById("reassessmentsDue").textContent = dueSoon;
}

function renderAssessmentBacklog(filteredAssessments) {
  const tbody = document.querySelector("#assessmentBacklogTable tbody");
  tbody.innerHTML = "";

  filteredAssessments
    .filter(a => a.status !== "Complete")
    .sort((a, b) => b.age_days - a.age_days)
    .forEach(a => {
      tbody.innerHTML += `
        <tr>
          <td>${a.supplier}</td>
          <td>${a.tier}</td>
          <td>${a.type}</td>
          <td><span class="${getPillClass(a.status)}">${a.status}</span></td>
          <td>${a.age_days}d</td>
          <td>${a.owner}</td>
        </tr>
      `;
    });
}

function renderEvidenceGaps(filteredEvidence) {
  const tbody = document.querySelector("#evidenceGapTable tbody");
  tbody.innerHTML = "";

  filteredEvidence.forEach(gap => {
    const dueLabel = gap.due_days < 0 ? `${Math.abs(gap.due_days)}d overdue` : `${gap.due_days}d`;

    tbody.innerHTML += `
      <tr>
        <td>${gap.supplier}</td>
        <td>${gap.evidence}</td>
        <td><span class="${getPillClass(gap.risk)}">${gap.risk}</span></td>
        <td>${dueLabel}</td>
      </tr>
    `;
  });
}

function renderControlSummary() {
  const tbody = document.querySelector("#controlSummaryTable tbody");
  tbody.innerHTML = "";

  controlSummary.forEach(control => {
    tbody.innerHTML += `
      <tr>
        <td>${control.area}</td>
        <td>${control.pass}</td>
        <td>${control.partial}</td>
        <td>${control.fail}</td>
        <td>${control.gap}</td>
      </tr>
    `;
  });
}

function renderAssessmentAiAlerts() {
  const container = document.getElementById("assessmentAiAlerts");
  container.innerHTML = "";

  assessmentAiAlerts.forEach(alert => {
    container.innerHTML += `
      <div class="ai-item">
        <strong>${alert.value}</strong>
        <span>${alert.detail}</span>
      </div>
    `;
  });
}

function renderAssessmentCharts(filteredAssessments) {
  if (assessmentStatusChart) assessmentStatusChart.destroy();
  if (completionByTierChart) completionByTierChart.destroy();

  const statusLabels = ["Complete", "In Progress", "Overdue"];

  assessmentStatusChart = new Chart(document.getElementById("assessmentStatusChart"), {
    type: "doughnut",
    data: {
      labels: statusLabels,
      datasets: [
        {
          data: statusLabels.map(status =>
            filteredAssessments.filter(a => a.status === status).length
          )
        }
      ]
    },
    options: { maintainAspectRatio: false }
    });

  const tiers = ["Tier 1", "Tier 2", "Tier 3"];

  completionByTierChart = new Chart(document.getElementById("completionByTierChart"), {
    type: "bar",
    data: {
      labels: tiers,
      datasets: [
        {
          label: "Completed",
          data: tiers.map(tier =>
            filteredAssessments.filter(a => a.tier === tier && a.status === "Complete").length
          )
        },
        {
          label: "Not Complete",
          data: tiers.map(tier =>
            filteredAssessments.filter(a => a.tier === tier && a.status !== "Complete").length
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

renderControlSummary();
renderAssessmentAiAlerts();
addCardHoverEffect();

function initAssessmentFilters() {
  const statusSelect = document.getElementById("filterStatus");
  const typeSelect = document.getElementById("filterType");
  const tierSelect = document.getElementById("filterTier");
  const ownerSelect = document.getElementById("filterOwner");
  const clearButton = document.getElementById("clearFilters");

  setSelectOptions(statusSelect, assessments.map(item => item.status));
  setSelectOptions(typeSelect, assessments.map(item => item.type));
  setSelectOptions(tierSelect, assessments.map(item => item.tier));
  setSelectOptions(ownerSelect, assessments.map(item => item.owner));

  function applyFromUi() {
    applyFilters({
      status: statusSelect.value,
      type: typeSelect.value,
      tier: tierSelect.value,
      owner: ownerSelect.value
    });
  }

  statusSelect.addEventListener("change", applyFromUi);
  typeSelect.addEventListener("change", applyFromUi);
  tierSelect.addEventListener("change", applyFromUi);
  ownerSelect.addEventListener("change", applyFromUi);

  clearButton.addEventListener("click", () => {
    statusSelect.value = "All";
    typeSelect.value = "All";
    tierSelect.value = "All";
    ownerSelect.value = "All";
    applyFromUi();
  });

  applyFromUi();
}

initAssessmentFilters();