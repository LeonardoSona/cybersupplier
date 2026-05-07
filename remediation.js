const TODAY = new Date("2026-05-07T00:00:00Z");

const remediationActions = [
  {
    action_id: "ACT-001",
    supplier_id: "SUP-001",
    supplier_name: "CloudOps Partner A",
    tier: "Tier 1",
    business_area: "Technology",
    finding_name: "Exposed admin portal",
    severity: "Critical",
    status: "Open",
    opened_date: "2026-03-27",
    due_date: "2026-04-20",
    closed_date: "",
    owner: "Cyber Assurance",
    owner_type: "Risk Owner",
    remediation_type: "Control Hardening",
    current_period: true,
    previous_period: false,
    sla_met: false,
    exposure_reduction_m: 1.1,
    reopened: false,
    validation_result: "Pending",
    reopen_reason: "",
    required_action: "Escalate to supplier CTO and close exposure"
  },
  {
    action_id: "ACT-002",
    supplier_id: "SUP-002",
    supplier_name: "Clinical Data Vendor B",
    tier: "Tier 1",
    business_area: "R&D",
    finding_name: "Leaked credentials detected",
    severity: "Critical",
    status: "In Progress",
    opened_date: "2026-04-12",
    due_date: "2026-05-10",
    closed_date: "",
    owner: "Supplier Security Owner",
    owner_type: "Supplier Owner",
    remediation_type: "Credential Reset",
    current_period: true,
    previous_period: false,
    sla_met: false,
    exposure_reduction_m: 0.9,
    reopened: false,
    validation_result: "Pending",
    reopen_reason: "",
    required_action: "Force reset and enforce MFA across privileged users"
  },
  {
    action_id: "ACT-003",
    supplier_id: "SUP-006",
    supplier_name: "Identity Services F",
    tier: "Tier 1",
    business_area: "Technology",
    finding_name: "Critical vulnerability on identity endpoint",
    severity: "Critical",
    status: "Open",
    opened_date: "2026-03-30",
    due_date: "2026-04-25",
    closed_date: "",
    owner: "Technology Risk Owner",
    owner_type: "Risk Owner",
    remediation_type: "Patching",
    current_period: true,
    previous_period: false,
    sla_met: false,
    exposure_reduction_m: 1.3,
    reopened: true,
    validation_result: "Failed",
    reopen_reason: "Patch rollback due to service outage",
    required_action: "Escalate emergency patch window"
  },
  {
    action_id: "ACT-004",
    supplier_id: "SUP-003",
    supplier_name: "Logistics Provider C",
    tier: "Tier 2",
    business_area: "Supply Chain",
    finding_name: "Missing SOC 2 evidence",
    severity: "High",
    status: "Open",
    opened_date: "2026-03-10",
    due_date: "2026-04-15",
    closed_date: "",
    owner: "TPRM Remediation Lead",
    owner_type: "TPRM",
    remediation_type: "Evidence Submission",
    current_period: true,
    previous_period: false,
    sla_met: false,
    exposure_reduction_m: 0.6,
    reopened: false,
    validation_result: "Pending",
    reopen_reason: "",
    required_action: "Issue formal notice and set escalation checkpoint"
  },
  {
    action_id: "ACT-005",
    supplier_id: "SUP-004",
    supplier_name: "Manufacturing SaaS D",
    tier: "Tier 1",
    business_area: "Manufacturing",
    finding_name: "Incomplete MFA attestation",
    severity: "High",
    status: "In Progress",
    opened_date: "2026-04-02",
    due_date: "2026-05-18",
    closed_date: "",
    owner: "Supplier Security Owner",
    owner_type: "Supplier Owner",
    remediation_type: "Access Control",
    current_period: true,
    previous_period: false,
    sla_met: true,
    exposure_reduction_m: 0.5,
    reopened: false,
    validation_result: "Pending",
    reopen_reason: "",
    required_action: "Complete attestation package and validate"
  },
  {
    action_id: "ACT-006",
    supplier_id: "SUP-005",
    supplier_name: "Procurement Platform E",
    tier: "Tier 2",
    business_area: "Procurement",
    finding_name: "Weak DMARC policy",
    severity: "Medium",
    status: "Closed",
    opened_date: "2026-03-25",
    due_date: "2026-04-28",
    closed_date: "2026-04-23",
    owner: "Procurement Owner",
    owner_type: "Supplier Owner",
    remediation_type: "Configuration",
    current_period: true,
    previous_period: false,
    sla_met: true,
    exposure_reduction_m: 0.2,
    reopened: false,
    validation_result: "Passed",
    reopen_reason: "",
    required_action: "Maintain quarterly email control review"
  },
  {
    action_id: "ACT-007",
    supplier_id: "SUP-001",
    supplier_name: "CloudOps Partner A",
    tier: "Tier 1",
    business_area: "Technology",
    finding_name: "Expired TLS certificate",
    severity: "Medium",
    status: "Closed",
    opened_date: "2026-03-18",
    due_date: "2026-04-09",
    closed_date: "2026-04-04",
    owner: "Cyber Assurance",
    owner_type: "Risk Owner",
    remediation_type: "Configuration",
    current_period: false,
    previous_period: true,
    sla_met: true,
    exposure_reduction_m: 0.15,
    reopened: false,
    validation_result: "Passed",
    reopen_reason: "",
    required_action: "Continue certificate rotation control"
  },
  {
    action_id: "ACT-008",
    supplier_id: "SUP-004",
    supplier_name: "Manufacturing SaaS D",
    tier: "Tier 1",
    business_area: "Manufacturing",
    finding_name: "Cloud storage misconfiguration",
    severity: "High",
    status: "Open",
    opened_date: "2026-03-28",
    due_date: "2026-04-30",
    closed_date: "",
    owner: "Manufacturing IT Risk",
    owner_type: "Risk Owner",
    remediation_type: "Cloud Hardening",
    current_period: true,
    previous_period: false,
    sla_met: false,
    exposure_reduction_m: 0.7,
    reopened: true,
    validation_result: "Failed",
    reopen_reason: "Access policy drift detected",
    required_action: "Escalate cloud policy remediation in governance forum"
  },
  {
    action_id: "ACT-009",
    supplier_id: "SUP-008",
    supplier_name: "Data Processing H",
    tier: "Tier 1",
    business_area: "R&D",
    finding_name: "Unresolved threat indicator triage",
    severity: "High",
    status: "Open",
    opened_date: "2026-04-08",
    due_date: "2026-05-12",
    closed_date: "",
    owner: "Cyber Governance Lead",
    owner_type: "Governance",
    remediation_type: "Threat Response",
    current_period: true,
    previous_period: false,
    sla_met: true,
    exposure_reduction_m: 0.4,
    reopened: false,
    validation_result: "Pending",
    reopen_reason: "",
    required_action: "Complete triage and close action owners"
  },
  {
    action_id: "ACT-010",
    supplier_id: "SUP-006",
    supplier_name: "Identity Services F",
    tier: "Tier 1",
    business_area: "Technology",
    finding_name: "Identity endpoint legacy protocol enabled",
    severity: "High",
    status: "Closed",
    opened_date: "2026-03-14",
    due_date: "2026-04-10",
    closed_date: "2026-04-26",
    owner: "Technology Risk Owner",
    owner_type: "Risk Owner",
    remediation_type: "Protocol Hardening",
    current_period: false,
    previous_period: true,
    sla_met: false,
    exposure_reduction_m: 0.5,
    reopened: true,
    validation_result: "Reopened",
    reopen_reason: "Control regression after release",
    required_action: "Re-test control and enforce release gate"
  }
];

let statusBySeverityChart = null;
let slaTrendChart = null;

function setSelectOptions(select, values) {
  const options = ["All", ...new Set(values)].filter(Boolean);
  select.innerHTML = options.map((value) => `<option value="${value}">${value}</option>`).join("");
}

function parseDate(value) {
  if (!value) return null;
  return new Date(`${value}T00:00:00Z`);
}

function daysSince(dateValue) {
  const date = parseDate(dateValue);
  if (!date) return 0;
  return Math.max(0, Math.round((TODAY - date) / 86400000));
}

function daysToDue(dateValue) {
  const date = parseDate(dateValue);
  if (!date) return 9999;
  return Math.round((date - TODAY) / 86400000);
}

function dueDateWindowFor(action) {
  const days = daysToDue(action.due_date);
  if (days < 0) return "Overdue";
  if (days <= 15) return "0-15 Days";
  if (days <= 30) return "16-30 Days";
  return "31+ Days";
}

function getPillClass(value) {
  if (["Critical", "High", "Open", "Overdue", "Breached", "Failed", "Reopened"].includes(value)) {
    return "pill pill-red";
  }
  if (["Medium", "In Progress", "At Risk", "Pending"].includes(value)) {
    return "pill pill-amber";
  }
  return "pill pill-green";
}

function setTrend(id, currentValue, previousValue, preferredDirection, valueSuffix = "") {
  const node = document.getElementById(id);
  if (!node || previousValue == null || Number.isNaN(previousValue)) {
    return;
  }

  const delta = currentValue - previousValue;

  if (preferredDirection === "contextual") {
    const arrow = delta > 0 ? "▲" : delta < 0 ? "▼" : "→";
    node.className = "kpi-trend trend-warn";
    node.textContent = `${arrow} ${Math.abs(delta).toFixed(1)}${valueSuffix} trend`;
    return;
  }

  if (delta === 0) {
    node.className = "kpi-trend trend-warn";
    node.textContent = `→ 0${valueSuffix} vs prior period`;
    return;
  }

  const isIncrease = delta > 0;
  const arrow = isIncrease ? "▲" : "▼";
  const isGood = preferredDirection === "higher" ? isIncrease : !isIncrease;

  node.className = `kpi-trend ${isGood ? "trend-good" : "trend-bad"}`;
  node.textContent = `${arrow} ${Math.abs(delta).toFixed(1)}${valueSuffix} vs prior period`;
}

function filterRemediationData(state) {
  return remediationActions.filter((action) => {
    const severityMatch = state.severity === "All" || action.severity === state.severity;
    const statusMatch = state.status === "All" || action.status === state.status;
    const tierMatch = state.tier === "All" || action.tier === state.tier;
    const ownerMatch = state.owner === "All" || action.owner === state.owner;
    const ownerTypeMatch = state.ownerType === "All" || action.owner_type === state.ownerType;
    const slaStatus = action.sla_met ? "Met" : (daysToDue(action.due_date) < 0 && action.status !== "Closed" ? "Breached" : "At Risk");
    const slaMatch = state.slaStatus === "All" || slaStatus === state.slaStatus;
    const dueWindowMatch = state.dueDateWindow === "All" || dueDateWindowFor(action) === state.dueDateWindow;
    const remediationTypeMatch = state.remediationType === "All" || action.remediation_type === state.remediationType;

    return severityMatch && statusMatch && tierMatch && ownerMatch && ownerTypeMatch && slaMatch && dueWindowMatch && remediationTypeMatch;
  });
}

function calculateKpis(filteredActions) {
  const openActions = filteredActions.filter((a) => a.status !== "Closed");
  const prevActions = remediationActions.filter((a) => a.previous_period);
  const prevOpenActions = prevActions.filter((a) => a.status !== "Closed");

  const openRemediationActions = openActions.length;
  const prevOpenRemediationActions = prevOpenActions.length;

  const criticalActionsOverdue = openActions.filter(
    (a) => a.severity === "Critical" && daysToDue(a.due_date) < 0
  ).length;
  const prevCriticalActionsOverdue = prevActions.filter(
    (a) => a.severity === "Critical" && a.status !== "Closed" && daysToDue(a.due_date) < 0
  ).length;

  const slaCompliance = filteredActions.length
    ? Math.round((filteredActions.filter((a) => a.sla_met).length / filteredActions.length) * 100)
    : 0;
  const prevSlaCompliance = prevActions.length
    ? Math.round((prevActions.filter((a) => a.sla_met).length / prevActions.length) * 100)
    : 0;

  const mttr = filteredActions.length
    ? Math.round(
        filteredActions.reduce((sum, a) => {
          const endDate = a.closed_date || TODAY.toISOString().slice(0, 10);
          return sum + Math.max(1, Math.round((parseDate(endDate) - parseDate(a.opened_date)) / 86400000));
        }, 0) / filteredActions.length
      )
    : 0;
  const prevMttr = prevActions.length
    ? Math.round(
        prevActions.reduce((sum, a) => {
          const endDate = a.closed_date || TODAY.toISOString().slice(0, 10);
          return sum + Math.max(1, Math.round((parseDate(endDate) - parseDate(a.opened_date)) / 86400000));
        }, 0) / prevActions.length
      )
    : 0;

  const riskReductionDelivered = Number(
    filteredActions.reduce((sum, a) => sum + (a.status === "Closed" ? a.exposure_reduction_m : 0), 0).toFixed(1)
  );
  const prevRiskReductionDelivered = Number(
    prevActions.reduce((sum, a) => sum + (a.status === "Closed" ? a.exposure_reduction_m : 0), 0).toFixed(1)
  );

  const backlogGrowth = prevOpenActions.length
    ? Number((((openActions.length - prevOpenActions.length) / prevOpenActions.length) * 100).toFixed(1))
    : 0;

  const reopenedFindings = filteredActions.filter((a) => a.reopened).length;
  const prevReopenedFindings = prevActions.filter((a) => a.reopened).length;

  const supplierOwnerOverdueActions = openActions.filter(
    (a) => a.owner_type === "Supplier Owner" && daysToDue(a.due_date) < 0
  ).length;
  const prevSupplierOwnerOverdueActions = prevActions.filter(
    (a) => a.owner_type === "Supplier Owner" && a.status !== "Closed" && daysToDue(a.due_date) < 0
  ).length;

  return {
    openRemediationActions,
    prevOpenRemediationActions,
    criticalActionsOverdue,
    prevCriticalActionsOverdue,
    slaCompliance,
    prevSlaCompliance,
    mttr,
    prevMttr,
    riskReductionDelivered,
    prevRiskReductionDelivered,
    backlogGrowth,
    reopenedFindings,
    prevReopenedFindings,
    supplierOwnerOverdueActions,
    prevSupplierOwnerOverdueActions
  };
}

function renderKpis(filteredActions) {
  const kpis = calculateKpis(filteredActions);

  document.getElementById("openRemediationActions").textContent = kpis.openRemediationActions;
  document.getElementById("criticalActionsOverdue").textContent = kpis.criticalActionsOverdue;
  document.getElementById("slaCompliance").textContent = `${kpis.slaCompliance}%`;
  document.getElementById("mttr").textContent = `${kpis.mttr}d`;
  document.getElementById("riskReductionDelivered").textContent = `$${kpis.riskReductionDelivered}M`;
  document.getElementById("backlogGrowth").textContent = `${kpis.backlogGrowth}%`;
  document.getElementById("reopenedFindings").textContent = kpis.reopenedFindings;
  document.getElementById("supplierOwnerOverdueActions").textContent = kpis.supplierOwnerOverdueActions;

  setTrend("openRemediationActionsTrend", kpis.openRemediationActions, kpis.prevOpenRemediationActions, "contextual");
  setTrend("criticalActionsOverdueTrend", kpis.criticalActionsOverdue, kpis.prevCriticalActionsOverdue, "lower");
  setTrend("slaComplianceTrend", kpis.slaCompliance, kpis.prevSlaCompliance, "higher", "%");
  setTrend("mttrTrend", kpis.mttr, kpis.prevMttr, "lower", "d");
  setTrend("riskReductionDeliveredTrend", kpis.riskReductionDelivered, kpis.prevRiskReductionDelivered, "higher", "M");
  setTrend("backlogGrowthTrend", kpis.backlogGrowth, 0, "lower", "%");
  setTrend("reopenedFindingsTrend", kpis.reopenedFindings, kpis.prevReopenedFindings, "lower");
  setTrend("supplierOwnerOverdueActionsTrend", kpis.supplierOwnerOverdueActions, kpis.prevSupplierOwnerOverdueActions, "lower");
}

function activeRequiredAction(action) {
  if (action.severity === "Critical" && daysToDue(action.due_date) < 0) return "Escalate now in governance forum";
  if (daysToDue(action.due_date) < 0) return "Execute expedited remediation plan";
  if (action.status === "In Progress") return "Track weekly and confirm closure evidence";
  return action.required_action;
}

function renderActiveQueue(filteredActions) {
  const tbody = document.querySelector("#activeRemediationQueueTable tbody");
  tbody.innerHTML = "";

  filteredActions
    .filter((a) => a.status !== "Closed")
    .sort((a, b) => daysToDue(a.due_date) - daysToDue(b.due_date))
    .forEach((a) => {
      tbody.innerHTML += `
        <tr>
          <td>${a.supplier_name}</td>
          <td>${a.tier}</td>
          <td>${a.finding_name}</td>
          <td><span class="${getPillClass(a.severity)}">${a.severity}</span></td>
          <td><span class="${getPillClass(a.status)}">${a.status}</span></td>
          <td>${daysSince(a.opened_date)}d</td>
          <td>${a.due_date}</td>
          <td>${a.owner}</td>
          <td>${activeRequiredAction(a)}</td>
        </tr>
      `;
    });
}

function renderOverdueCriticalActions(filteredActions) {
  const tbody = document.querySelector("#overdueCriticalActionsTable tbody");
  tbody.innerHTML = "";

  filteredActions
    .filter((a) => a.status !== "Closed" && a.severity === "Critical" && daysToDue(a.due_date) < 0)
    .sort((a, b) => daysToDue(a.due_date) - daysToDue(b.due_date))
    .forEach((a) => {
      const daysOverdue = Math.abs(daysToDue(a.due_date));
      const escalationOwner = a.owner_type === "Supplier Owner" ? "Supplier Risk Owner" : "Cyber Governance Lead";

      tbody.innerHTML += `
        <tr>
          <td>${a.supplier_name}</td>
          <td>${a.business_area}</td>
          <td>${a.finding_name}</td>
          <td>${daysOverdue}</td>
          <td>$${a.exposure_reduction_m.toFixed(1)}M</td>
          <td>${escalationOwner}</td>
          <td>Escalate and close within 7 days</td>
        </tr>
      `;
    });
}

function renderValidationReopened(filteredActions) {
  const tbody = document.querySelector("#validationReopenedTable tbody");
  tbody.innerHTML = "";

  filteredActions
    .filter((a) => a.status === "Closed" || a.reopened)
    .sort((a, b) => {
      const aDate = parseDate(a.closed_date || a.opened_date);
      const bDate = parseDate(b.closed_date || b.opened_date);
      return bDate - aDate;
    })
    .forEach((a) => {
      const requiredAction = a.reopened
        ? "Re-open remediation plan and governance review"
        : a.validation_result === "Passed"
          ? "Maintain control validation cadence"
          : "Complete validation evidence";

      tbody.innerHTML += `
        <tr>
          <td>${a.supplier_name}</td>
          <td>${a.finding_name}</td>
          <td>${a.closed_date || "-"}</td>
          <td><span class="${getPillClass(a.validation_result)}">${a.validation_result}</span></td>
          <td>${a.reopen_reason || "-"}</td>
          <td>${requiredAction}</td>
        </tr>
      `;
    });
}

function renderCharts(filteredActions) {
  if (statusBySeverityChart) statusBySeverityChart.destroy();
  if (slaTrendChart) slaTrendChart.destroy();

  const severities = ["Critical", "High", "Medium"];
  const statuses = ["Open", "In Progress", "Closed"];

  statusBySeverityChart = new Chart(document.getElementById("statusBySeverityChart"), {
    type: "bar",
    data: {
      labels: severities,
      datasets: statuses.map((status) => ({
        label: status,
        data: severities.map(
          (severity) => filteredActions.filter((a) => a.severity === severity && a.status === status).length
        )
      }))
    },
    options: { maintainAspectRatio: false }
  });

  const periods = ["Previous", "Current"];
  const previous = remediationActions.filter((a) => a.previous_period);
  const current = remediationActions.filter((a) => a.current_period);

  slaTrendChart = new Chart(document.getElementById("slaTrendChart"), {
    type: "line",
    data: {
      labels: periods,
      datasets: [
        {
          label: "SLA Met",
          data: [
            previous.filter((a) => a.sla_met).length,
            current.filter((a) => a.sla_met).length
          ],
          tension: 0.3
        },
        {
          label: "SLA Breached",
          data: [
            previous.filter((a) => !a.sla_met && a.status !== "Closed").length,
            current.filter((a) => !a.sla_met && a.status !== "Closed").length
          ],
          tension: 0.3
        }
      ]
    },
    options: { maintainAspectRatio: false }
  });
}

function applyFilters(state) {
  const filteredActions = filterRemediationData(state);

  renderKpis(filteredActions);
  renderActiveQueue(filteredActions);
  renderOverdueCriticalActions(filteredActions);
  renderValidationReopened(filteredActions);
  renderCharts(filteredActions);

  document.getElementById("filterSummary").textContent =
    `Showing ${filteredActions.length} of ${remediationActions.length} remediation actions`;
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

function initRemediationFilters() {
  const severitySelect = document.getElementById("filterSeverity");
  const statusSelect = document.getElementById("filterStatus");
  const tierSelect = document.getElementById("filterTier");
  const ownerSelect = document.getElementById("filterOwner");
  const ownerTypeSelect = document.getElementById("filterOwnerType");
  const slaStatusSelect = document.getElementById("filterSlaStatus");
  const dueDateWindowSelect = document.getElementById("filterDueDateWindow");
  const remediationTypeSelect = document.getElementById("filterRemediationType");
  const clearButton = document.getElementById("clearFilters");

  setSelectOptions(severitySelect, remediationActions.map((a) => a.severity));
  setSelectOptions(statusSelect, remediationActions.map((a) => a.status));
  setSelectOptions(tierSelect, remediationActions.map((a) => a.tier));
  setSelectOptions(ownerSelect, remediationActions.map((a) => a.owner));
  setSelectOptions(ownerTypeSelect, remediationActions.map((a) => a.owner_type));
  setSelectOptions(slaStatusSelect, ["Met", "At Risk", "Breached"]);
  setSelectOptions(dueDateWindowSelect, ["Overdue", "0-15 Days", "16-30 Days", "31+ Days"]);
  setSelectOptions(remediationTypeSelect, remediationActions.map((a) => a.remediation_type));

  function applyFromUi() {
    applyFilters({
      severity: severitySelect.value,
      status: statusSelect.value,
      tier: tierSelect.value,
      owner: ownerSelect.value,
      ownerType: ownerTypeSelect.value,
      slaStatus: slaStatusSelect.value,
      dueDateWindow: dueDateWindowSelect.value,
      remediationType: remediationTypeSelect.value
    });
  }

  severitySelect.addEventListener("change", applyFromUi);
  statusSelect.addEventListener("change", applyFromUi);
  tierSelect.addEventListener("change", applyFromUi);
  ownerSelect.addEventListener("change", applyFromUi);
  ownerTypeSelect.addEventListener("change", applyFromUi);
  slaStatusSelect.addEventListener("change", applyFromUi);
  dueDateWindowSelect.addEventListener("change", applyFromUi);
  remediationTypeSelect.addEventListener("change", applyFromUi);

  clearButton.addEventListener("click", () => {
    severitySelect.value = "All";
    statusSelect.value = "All";
    tierSelect.value = "All";
    ownerSelect.value = "All";
    ownerTypeSelect.value = "All";
    slaStatusSelect.value = "All";
    dueDateWindowSelect.value = "All";
    remediationTypeSelect.value = "All";
    applyFromUi();
  });

  applyFromUi();
}

addCardHoverEffect();
initRemediationFilters();
