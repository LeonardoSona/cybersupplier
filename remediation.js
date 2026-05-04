const remediationFindings = [
  {
    finding: "Exposed admin portal",
    supplier: "CloudOps Partner A",
    severity: "Critical",
    age_days: 41,
    sla_status: "Breached",
    owner: "Cyber Assurance",
    status: "Open",
    acknowledged_days: 3,
    remediation_days: 41,
    reopened: false,
    accepted_risk: false
  },
  {
    finding: "Leaked credentials detected",
    supplier: "Clinical Data Vendor B",
    severity: "Critical",
    age_days: 19,
    sla_status: "At Risk",
    owner: "Supplier Owner",
    status: "Open",
    acknowledged_days: 2,
    remediation_days: 19,
    reopened: false,
    accepted_risk: false
  },
  {
    finding: "Critical vulnerability on identity endpoint",
    supplier: "Identity Services F",
    severity: "Critical",
    age_days: 28,
    sla_status: "Breached",
    owner: "Technology Owner",
    status: "Open",
    acknowledged_days: 4,
    remediation_days: 28,
    reopened: true,
    accepted_risk: false
  },
  {
    finding: "Missing SOC 2 evidence",
    supplier: "Logistics Provider C",
    severity: "High",
    age_days: 58,
    sla_status: "Breached",
    owner: "TPRM Analyst",
    status: "Open",
    acknowledged_days: 7,
    remediation_days: 58,
    reopened: false,
    accepted_risk: true
  },
  {
    finding: "Incomplete MFA attestation",
    supplier: "Manufacturing SaaS D",
    severity: "High",
    age_days: 27,
    sla_status: "At Risk",
    owner: "Supplier Owner",
    status: "Open",
    acknowledged_days: 5,
    remediation_days: 27,
    reopened: false,
    accepted_risk: false
  },
  {
    finding: "Weak DMARC policy",
    supplier: "Procurement Platform E",
    severity: "Medium",
    age_days: 14,
    sla_status: "On Track",
    owner: "Procurement Owner",
    status: "Closed",
    acknowledged_days: 2,
    remediation_days: 14,
    reopened: false,
    accepted_risk: false
  },
  {
    finding: "Expired TLS certificate",
    supplier: "CloudOps Partner A",
    severity: "Medium",
    age_days: 10,
    sla_status: "On Track",
    owner: "Cyber Assurance",
    status: "Closed",
    acknowledged_days: 1,
    remediation_days: 10,
    reopened: false,
    accepted_risk: false
  },
  {
    finding: "Cloud storage misconfiguration",
    supplier: "Manufacturing SaaS D",
    severity: "High",
    age_days: 33,
    sla_status: "Breached",
    owner: "Manufacturing IT",
    status: "Open",
    acknowledged_days: 6,
    remediation_days: 33,
    reopened: true,
    accepted_risk: false
  }
];

const remediationTrend = [
  { month: "Jan", opened: 21, closed: 14, breached: 5 },
  { month: "Feb", opened: 25, closed: 18, breached: 7 },
  { month: "Mar", opened: 19, closed: 22, breached: 4 }
];

const decisionQueue = [
  {
    supplier: "CloudOps Partner A",
    decision_type: "Executive Escalation",
    risk: "Critical",
    exposure_m: 3.4,
    due_days: -11,
    action: "Escalate remediation plan"
  },
  {
    supplier: "Identity Services F",
    decision_type: "Remediation Funding",
    risk: "Critical",
    exposure_m: 2.1,
    due_days: -3,
    action: "Accelerate identity endpoint fix"
  },
  {
    supplier: "Logistics Provider C",
    decision_type: "Risk Acceptance Review",
    risk: "High",
    exposure_m: 1.6,
    due_days: -20,
    action: "Review accepted risk expiry"
  },
  {
    supplier: "Manufacturing SaaS D",
    decision_type: "Supplier Owner Action",
    risk: "High",
    exposure_m: 1.2,
    due_days: 5,
    action: "Confirm MFA and cloud remediation evidence"
  }
];

const remediationAiAlerts = [
  {
    value: "Vendor F",
    detail: "Highest likelihood of missing critical remediation SLA"
  },
  {
    value: "18 days",
    detail: "Predicted delay for breached findings without escalation"
  },
  {
    value: "$2.9M",
    detail: "Estimated exposure reduction from closing top 3 findings"
  }
];

const remediationTierBySupplier = {
  "CloudOps Partner A": "Tier 1",
  "Clinical Data Vendor B": "Tier 1",
  "Identity Services F": "Tier 1",
  "Logistics Provider C": "Tier 2",
  "Manufacturing SaaS D": "Tier 1",
  "Procurement Platform E": "Tier 2"
};

let remediationTrendChart = null;
let findingsSeverityChart = null;

function setSelectOptions(select, values) {
  const options = ["All", ...new Set(values)].filter(Boolean);
  select.innerHTML = options.map(value => `<option value="${value}">${value}</option>`).join("");
}

function inAgeBucket(ageDays, bucket) {
  if (bucket === "0-30") return ageDays >= 0 && ageDays < 30;
  if (bucket === "30-60") return ageDays >= 30 && ageDays < 60;
  if (bucket === "60+") return ageDays >= 60;
  return true;
}

function getPillClass(value) {
  if (["Critical", "High", "Breached"].includes(value)) return "pill pill-red";
  if (["Medium", "At Risk"].includes(value)) return "pill pill-amber";
  return "pill pill-green";
}

function groupBy(items, key) {
  return items.reduce((acc, item) => {
    const group = item[key];
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});
}

function filterRemediationData(state) {
  const filteredFindings = remediationFindings.filter(item => {
    const severityMatch = state.severity === "All" || item.severity === state.severity;
    const slaMatch = state.slaStatus === "All" || item.sla_status === state.slaStatus;
    const ownerMatch = state.owner === "All" || item.owner === state.owner;
    const supplierMatch = state.supplier === "All" || item.supplier === state.supplier;
    const ageBucketMatch = state.ageBucket === "All" || inAgeBucket(item.age_days, state.ageBucket);
    return severityMatch && slaMatch && ownerMatch && supplierMatch && ageBucketMatch;
  });

  const suppliers = new Set(filteredFindings.map(item => item.supplier));
  const filteredDecisionQueue = decisionQueue.filter(item => suppliers.has(item.supplier));

  return { filteredFindings, filteredDecisionQueue };
}

function renderRemediationKpis(filteredFindings) {
  const total = filteredFindings.length;

  if (!total) {
    document.getElementById("openFindings").textContent = "0";
    document.getElementById("criticalFindings").textContent = "0";
    document.getElementById("slaBreaches").textContent = "0";
    document.getElementById("mtta").textContent = "0d";
    document.getElementById("mttr").textContent = "0d";
    document.getElementById("closureRate").textContent = "0%";
    document.getElementById("reopenedFindings").textContent = "0";
    document.getElementById("acceptedRisks").textContent = "0";
    return;
  }

  const open = filteredFindings.filter(f => f.status === "Open");
  const closed = filteredFindings.filter(f => f.status === "Closed");

  const critical = open.filter(f => f.severity === "Critical").length;
  const breached = open.filter(f => f.sla_status === "Breached").length;

  const mtta = Math.round(
    open.length ? open.reduce((sum, f) => sum + f.acknowledged_days, 0) / open.length : 0
  );

  const mttr = Math.round(
    filteredFindings.reduce((sum, f) => sum + f.remediation_days, 0) / total
  );

  const closureRate = Math.round((closed.length / total) * 100);

  const reopened = filteredFindings.filter(f => f.reopened).length;
  const accepted = filteredFindings.filter(f => f.accepted_risk).length;

  document.getElementById("openFindings").textContent = open.length;
  document.getElementById("criticalFindings").textContent = critical;
  document.getElementById("slaBreaches").textContent = breached;
  document.getElementById("mtta").textContent = `${mtta}d`;
  document.getElementById("mttr").textContent = `${mttr}d`;
  document.getElementById("closureRate").textContent = `${closureRate}%`;
  document.getElementById("reopenedFindings").textContent = reopened;
  document.getElementById("acceptedRisks").textContent = accepted;
}

function renderRemediationBacklog(filteredFindings) {
  const tbody = document.querySelector("#remediationBacklogTable tbody");
  tbody.innerHTML = "";

  filteredFindings
    .filter(f => f.status === "Open")
    .sort((a, b) => b.age_days - a.age_days)
    .forEach(f => {
      tbody.innerHTML += `
        <tr>
          <td>${f.finding}</td>
          <td>${f.supplier}</td>
          <td><span class="${getPillClass(f.severity)}">${f.severity}</span></td>
          <td>${f.age_days}d</td>
          <td><span class="${getPillClass(f.sla_status)}">${f.sla_status}</span></td>
          <td>${f.owner}</td>
        </tr>
      `;
    });
}

function renderOwnerWorkload(filteredFindings) {
  const tbody = document.querySelector("#ownerWorkloadTable tbody");
  tbody.innerHTML = "";

  const openFindings = filteredFindings.filter(f => f.status === "Open");
  const grouped = groupBy(openFindings, "owner");

  Object.entries(grouped).forEach(([owner, findings]) => {
    const breached = findings.filter(f => f.sla_status === "Breached").length;
    const critical = findings.filter(f => f.severity === "Critical").length;
    const oldest = Math.max(...findings.map(f => f.age_days));

    tbody.innerHTML += `
      <tr>
        <td>${owner}</td>
        <td>${findings.length}</td>
        <td>${breached}</td>
        <td>${critical}</td>
        <td>${oldest}d</td>
      </tr>
    `;
  });
}

function renderDecisionQueue(filteredDecisionQueue) {
  const tbody = document.querySelector("#decisionQueueTable tbody");
  tbody.innerHTML = "";

  filteredDecisionQueue.forEach(item => {
    const dueLabel =
      item.due_days < 0
        ? `${Math.abs(item.due_days)}d overdue`
        : `${item.due_days}d`;

    tbody.innerHTML += `
      <tr>
        <td>${item.supplier}</td>
        <td>${item.decision_type}</td>
        <td><span class="${getPillClass(item.risk)}">${item.risk}</span></td>
        <td>$${item.exposure_m.toFixed(1)}M</td>
        <td>${dueLabel}</td>
        <td>${item.action}</td>
      </tr>
    `;
  });
}

function renderRemediationAiAlerts() {
  const container = document.getElementById("remediationAiAlerts");
  container.innerHTML = "";

  remediationAiAlerts.forEach(alert => {
    container.innerHTML += `
      <div class="ai-item">
        <strong>${alert.value}</strong>
        <span>${alert.detail}</span>
      </div>
    `;
  });
}

function renderRemediationCharts(filteredFindings) {
  if (remediationTrendChart) remediationTrendChart.destroy();
  if (findingsSeverityChart) findingsSeverityChart.destroy();

  const ratio = remediationFindings.length ? filteredFindings.length / remediationFindings.length : 0;

  remediationTrendChart = new Chart(document.getElementById("remediationTrendChart"), {
    type: "line",
    data: {
      labels: remediationTrend.map(r => r.month),
      datasets: [
        {
          label: "Opened",
          data: remediationTrend.map(r => Math.round(r.opened * ratio)),
          tension: 0.35
        },
        {
          label: "Closed",
          data: remediationTrend.map(r => Math.round(r.closed * ratio)),
          tension: 0.35
        },
        {
          label: "Breached",
          data: remediationTrend.map(r => Math.round(r.breached * ratio)),
          tension: 0.35
        }
      ]
    },
    options: { maintainAspectRatio: false }
    });

  const severities = ["Critical", "High", "Medium"];

  findingsSeverityChart = new Chart(document.getElementById("findingsSeverityChart"), {
    type: "doughnut",
    data: {
      labels: severities,
      datasets: [
        {
          data: severities.map(severity =>
            filteredFindings.filter(f => f.severity === severity).length
          )
        }
      ]
    },
    options: { maintainAspectRatio: false }
    });
}

function applyFilters(state) {
  const { filteredFindings, filteredDecisionQueue } = filterRemediationData(state);

  renderRemediationKpis(filteredFindings);
  renderRemediationBacklog(filteredFindings);
  renderOwnerWorkload(filteredFindings);
  renderDecisionQueue(filteredDecisionQueue);
  renderRemediationCharts(filteredFindings);

  document.getElementById("filterSummary").textContent =
    `Showing ${filteredFindings.length} of ${remediationFindings.length} findings`;
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

renderRemediationAiAlerts();
addCardHoverEffect();

function renderExtendedRemediationKpis() {
  const ext = calculateMissingKpis();
  document.getElementById("backlogGrowthPercent").textContent = ext.backlogGrowthPercent;
  document.getElementById("findingsPerAnalyst").textContent = ext.findingsPerAnalyst;
}

renderExtendedRemediationKpis();

function initRemediationFilters() {
  const severitySelect = document.getElementById("filterSeverity");
  const slaStatusSelect = document.getElementById("filterSlaStatus");
  const ownerSelect = document.getElementById("filterOwner");
  const supplierSelect = document.getElementById("filterSupplier");
  const ageBucketSelect = document.getElementById("filterAgeBucket");
  const clearButton = document.getElementById("clearFilters");

  setSelectOptions(severitySelect, remediationFindings.map(item => item.severity));
  setSelectOptions(slaStatusSelect, ["Breached", "At Risk"]);
  setSelectOptions(ownerSelect, remediationFindings.map(item => item.owner));
  setSelectOptions(supplierSelect, remediationFindings.map(item => item.supplier));
  ageBucketSelect.innerHTML = ["All", "0-30", "30-60", "60+"].map(value => `<option value="${value}">${value}</option>`).join("");

  function applyFromUi() {
    applyFilters({
      severity: severitySelect.value,
      slaStatus: slaStatusSelect.value,
      owner: ownerSelect.value,
      supplier: supplierSelect.value,
      ageBucket: ageBucketSelect.value
    });
  }

  severitySelect.addEventListener("change", applyFromUi);
  slaStatusSelect.addEventListener("change", applyFromUi);
  ownerSelect.addEventListener("change", applyFromUi);
  supplierSelect.addEventListener("change", applyFromUi);
  ageBucketSelect.addEventListener("change", applyFromUi);

  clearButton.addEventListener("click", () => {
    severitySelect.value = "All";
    slaStatusSelect.value = "All";
    ownerSelect.value = "All";
    supplierSelect.value = "All";
    ageBucketSelect.value = "All";
    applyFromUi();
  });

  applyFromUi();
}

initRemediationFilters();