const TODAY = new Date("2026-05-07T00:00:00Z");

const suppliers = [
  {
    supplier_id: "SUP-001",
    supplier_name: "CloudOps Partner A",
    tier: "Tier 1",
    business_area: "Technology",
    continuous_monitoring_enabled: true,
    previous_continuous_monitoring_enabled: true,
    previous_cyber_rating: 654,
    current_cyber_rating: 612,
    rating_change_points: -42,
    previous_rating_change_points: -35,
    rating_change_reason: "External attack surface expansion",
    monitoring_status: "Active",
    monitoring_gap_reason: ""
  },
  {
    supplier_id: "SUP-002",
    supplier_name: "Clinical Data Vendor B",
    tier: "Tier 1",
    business_area: "R&D",
    continuous_monitoring_enabled: true,
    previous_continuous_monitoring_enabled: true,
    previous_cyber_rating: 671,
    current_cyber_rating: 640,
    rating_change_points: -31,
    previous_rating_change_points: -18,
    rating_change_reason: "Credential leakage and exposed hosts",
    monitoring_status: "Active",
    monitoring_gap_reason: ""
  },
  {
    supplier_id: "SUP-003",
    supplier_name: "Logistics Provider C",
    tier: "Tier 2",
    business_area: "Supply Chain",
    continuous_monitoring_enabled: true,
    previous_continuous_monitoring_enabled: true,
    previous_cyber_rating: 705,
    current_cyber_rating: 681,
    rating_change_points: -24,
    previous_rating_change_points: -10,
    rating_change_reason: "New exposed remote access services",
    monitoring_status: "Active",
    monitoring_gap_reason: ""
  },
  {
    supplier_id: "SUP-004",
    supplier_name: "Manufacturing SaaS D",
    tier: "Tier 1",
    business_area: "Manufacturing",
    continuous_monitoring_enabled: false,
    previous_continuous_monitoring_enabled: false,
    previous_cyber_rating: 720,
    current_cyber_rating: 702,
    rating_change_points: -18,
    previous_rating_change_points: -7,
    rating_change_reason: "Cloud misconfiguration signals",
    monitoring_status: "Coverage Gap",
    monitoring_gap_reason: "Connector onboarding pending"
  },
  {
    supplier_id: "SUP-005",
    supplier_name: "Procurement Platform E",
    tier: "Tier 2",
    business_area: "Procurement",
    continuous_monitoring_enabled: false,
    previous_continuous_monitoring_enabled: true,
    previous_cyber_rating: 737,
    current_cyber_rating: 728,
    rating_change_points: -9,
    previous_rating_change_points: -4,
    rating_change_reason: "Email security hygiene decline",
    monitoring_status: "Partial",
    monitoring_gap_reason: "Limited domain telemetry"
  },
  {
    supplier_id: "SUP-006",
    supplier_name: "Identity Services F",
    tier: "Tier 1",
    business_area: "Technology",
    continuous_monitoring_enabled: true,
    previous_continuous_monitoring_enabled: true,
    previous_cyber_rating: 702,
    current_cyber_rating: 655,
    rating_change_points: -47,
    previous_rating_change_points: -29,
    rating_change_reason: "Critical vulnerability and leaked credentials",
    monitoring_status: "Active",
    monitoring_gap_reason: ""
  },
  {
    supplier_id: "SUP-007",
    supplier_name: "Marketing Platform G",
    tier: "Tier 3",
    business_area: "Commercial",
    continuous_monitoring_enabled: true,
    previous_continuous_monitoring_enabled: true,
    previous_cyber_rating: 790,
    current_cyber_rating: 781,
    rating_change_points: -9,
    previous_rating_change_points: -3,
    rating_change_reason: "Low severity external findings",
    monitoring_status: "Active",
    monitoring_gap_reason: ""
  },
  {
    supplier_id: "SUP-008",
    supplier_name: "Data Processing H",
    tier: "Tier 1",
    business_area: "R&D",
    continuous_monitoring_enabled: true,
    previous_continuous_monitoring_enabled: false,
    previous_cyber_rating: 712,
    current_cyber_rating: 698,
    rating_change_points: -14,
    previous_rating_change_points: -11,
    rating_change_reason: "Increased threat signal frequency",
    monitoring_status: "Active",
    monitoring_gap_reason: ""
  }
];

const signals = [
  {
    signal_id: "SIG-001",
    supplier_id: "SUP-001",
    supplier_name: "CloudOps Partner A",
    tier: "Tier 1",
    business_area: "Technology",
    signal_type: "External Exposure",
    severity: "Critical",
    first_observed_date: "2026-05-02",
    detected_date: "2026-05-04",
    current_period: true,
    previous_period: false,
    escalated: true,
    escalation_status: "Escalated",
    required_action: "Immediate perimeter closure and retest"
  },
  {
    signal_id: "SIG-002",
    supplier_id: "SUP-002",
    supplier_name: "Clinical Data Vendor B",
    tier: "Tier 1",
    business_area: "R&D",
    signal_type: "Leaked Credentials",
    severity: "Critical",
    first_observed_date: "2026-05-05",
    detected_date: "2026-05-06",
    current_period: true,
    previous_period: false,
    escalated: true,
    escalation_status: "Escalated",
    required_action: "Reset credentials and enforce MFA"
  },
  {
    signal_id: "SIG-003",
    supplier_id: "SUP-006",
    supplier_name: "Identity Services F",
    tier: "Tier 1",
    business_area: "Technology",
    signal_type: "Vulnerability",
    severity: "Critical",
    first_observed_date: "2026-05-01",
    detected_date: "2026-05-03",
    current_period: true,
    previous_period: false,
    escalated: true,
    escalation_status: "Escalated",
    required_action: "Patch critical endpoint and validate"
  },
  {
    signal_id: "SIG-004",
    supplier_id: "SUP-003",
    supplier_name: "Logistics Provider C",
    tier: "Tier 2",
    business_area: "Supply Chain",
    signal_type: "External Exposure",
    severity: "High",
    first_observed_date: "2026-04-28",
    detected_date: "2026-05-01",
    current_period: true,
    previous_period: false,
    escalated: true,
    escalation_status: "Escalated",
    required_action: "Close exposed service and monitor"
  },
  {
    signal_id: "SIG-005",
    supplier_id: "SUP-004",
    supplier_name: "Manufacturing SaaS D",
    tier: "Tier 1",
    business_area: "Manufacturing",
    signal_type: "Cloud Misconfiguration",
    severity: "High",
    first_observed_date: "2026-04-26",
    detected_date: "2026-04-30",
    current_period: true,
    previous_period: false,
    escalated: false,
    escalation_status: "At Risk",
    required_action: "Harden cloud controls and rescan"
  },
  {
    signal_id: "SIG-006",
    supplier_id: "SUP-005",
    supplier_name: "Procurement Platform E",
    tier: "Tier 2",
    business_area: "Procurement",
    signal_type: "Email Security",
    severity: "Medium",
    first_observed_date: "2026-04-22",
    detected_date: "2026-04-27",
    current_period: true,
    previous_period: false,
    escalated: false,
    escalation_status: "Open",
    required_action: "Update DMARC policy to enforce"
  },
  {
    signal_id: "SIG-007",
    supplier_id: "SUP-001",
    supplier_name: "CloudOps Partner A",
    tier: "Tier 1",
    business_area: "Technology",
    signal_type: "Email Security",
    severity: "Medium",
    first_observed_date: "2026-04-24",
    detected_date: "2026-04-29",
    current_period: true,
    previous_period: false,
    escalated: false,
    escalation_status: "Open",
    required_action: "Renew certificate and verify trust path"
  },
  {
    signal_id: "SIG-008",
    supplier_id: "SUP-002",
    supplier_name: "Clinical Data Vendor B",
    tier: "Tier 1",
    business_area: "R&D",
    signal_type: "Threat Signal",
    severity: "High",
    first_observed_date: "2026-05-03",
    detected_date: "2026-05-04",
    current_period: true,
    previous_period: false,
    escalated: true,
    escalation_status: "Escalated",
    required_action: "Run compromise assessment with supplier"
  },
  {
    signal_id: "SIG-009",
    supplier_id: "SUP-006",
    supplier_name: "Identity Services F",
    tier: "Tier 1",
    business_area: "Technology",
    signal_type: "Leaked Credentials",
    severity: "High",
    first_observed_date: "2026-04-15",
    detected_date: "2026-04-20",
    current_period: false,
    previous_period: true,
    escalated: true,
    escalation_status: "Closed",
    required_action: "Maintain enhanced credential monitoring"
  },
  {
    signal_id: "SIG-010",
    supplier_id: "SUP-003",
    supplier_name: "Logistics Provider C",
    tier: "Tier 2",
    business_area: "Supply Chain",
    signal_type: "Vulnerability",
    severity: "High",
    first_observed_date: "2026-04-10",
    detected_date: "2026-04-14",
    current_period: false,
    previous_period: true,
    escalated: false,
    escalation_status: "Closed",
    required_action: "Continue monthly patch evidence checks"
  },
  {
    signal_id: "SIG-011",
    supplier_id: "SUP-008",
    supplier_name: "Data Processing H",
    tier: "Tier 1",
    business_area: "R&D",
    signal_type: "Threat Signal",
    severity: "Medium",
    first_observed_date: "2026-04-12",
    detected_date: "2026-04-16",
    current_period: false,
    previous_period: true,
    escalated: false,
    escalation_status: "Open",
    required_action: "Expand IOC monitoring coverage"
  },
  {
    signal_id: "SIG-012",
    supplier_id: "SUP-004",
    supplier_name: "Manufacturing SaaS D",
    tier: "Tier 1",
    business_area: "Manufacturing",
    signal_type: "External Exposure",
    severity: "High",
    first_observed_date: "2026-04-08",
    detected_date: "2026-04-12",
    current_period: false,
    previous_period: true,
    escalated: true,
    escalation_status: "Closed",
    required_action: "Maintain attack-surface hardening cadence"
  }
];

let signalsByTypeChart = null;
let severityTrendChart = null;

function setSelectOptions(select, values) {
  const options = ["All", ...new Set(values)].filter(Boolean);
  select.innerHTML = options.map((value) => `<option value="${value}">${value}</option>`).join("");
}

function parseDate(dateString) {
  if (!dateString) return null;
  return new Date(`${dateString}T00:00:00Z`);
}

function detectionDelayDays(signal) {
  const observed = parseDate(signal.first_observed_date);
  const detected = parseDate(signal.detected_date);
  if (!observed || !detected) return 0;
  return Math.max(0, Math.round((detected - observed) / 86400000));
}

function signalDateFilter(signal, period) {
  if (period === "Current Period") return signal.current_period;
  if (period === "Previous Period") return signal.previous_period;
  if (period === "Last 30 Days") {
    const observed = parseDate(signal.first_observed_date);
    if (!observed) return false;
    const days = Math.round((TODAY - observed) / 86400000);
    return days <= 30;
  }
  return true;
}

function getPillClass(value) {
  if (["Critical", "High", "Escalated", "Coverage Gap"].includes(value)) return "pill pill-red";
  if (["Medium", "At Risk", "Partial"].includes(value)) return "pill pill-amber";
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

function getSupplierById(supplierId) {
  return suppliers.find((s) => s.supplier_id === supplierId);
}

function filterMonitoringData(state) {
  const filteredSuppliers = suppliers.filter((supplier) => {
    const tierMatch = state.tier === "All" || supplier.tier === state.tier;
    const businessAreaMatch = state.businessArea === "All" || supplier.business_area === state.businessArea;
    const monitoringStatusMatch = state.monitoringStatus === "All" || supplier.monitoring_status === state.monitoringStatus;
    return tierMatch && businessAreaMatch && monitoringStatusMatch;
  });

  const supplierIds = new Set(filteredSuppliers.map((supplier) => supplier.supplier_id));

  const filteredSignals = signals.filter((signal) => {
    const signalTypeMatch = state.signalType === "All" || signal.signal_type === state.signalType;
    const severityMatch = state.severity === "All" || signal.severity === state.severity;
    const tierMatch = state.tier === "All" || signal.tier === state.tier;
    const businessAreaMatch = state.businessArea === "All" || signal.business_area === state.businessArea;
    const escalationMatch = state.escalationStatus === "All" || signal.escalation_status === state.escalationStatus;
    const periodMatch = signalDateFilter(signal, state.period);

    return signalTypeMatch && severityMatch && tierMatch && businessAreaMatch && escalationMatch && periodMatch && supplierIds.has(signal.supplier_id);
  });

  return { filteredSignals, filteredSuppliers };
}

function renderMonitoringKpis(filteredSuppliers, filteredSignals) {
  const totalSuppliers = filteredSuppliers.length;
  const tierOneSuppliers = filteredSuppliers.filter((s) => s.tier === "Tier 1");

  const monitoringCoverage = totalSuppliers
    ? Math.round((filteredSuppliers.filter((s) => s.continuous_monitoring_enabled).length / totalSuppliers) * 100)
    : 0;
  const previousMonitoringCoverage = totalSuppliers
    ? Math.round((filteredSuppliers.filter((s) => s.previous_continuous_monitoring_enabled).length / totalSuppliers) * 100)
    : 0;

  const tierOneMonitoringCoverage = tierOneSuppliers.length
    ? Math.round((tierOneSuppliers.filter((s) => s.continuous_monitoring_enabled).length / tierOneSuppliers.length) * 100)
    : 0;
  const previousTierOneMonitoringCoverage = tierOneSuppliers.length
    ? Math.round((tierOneSuppliers.filter((s) => s.previous_continuous_monitoring_enabled).length / tierOneSuppliers.length) * 100)
    : 0;

  const criticalExternalExposures = filteredSignals.filter(
    (s) => s.signal_type === "External Exposure" && s.severity === "Critical"
  ).length;
  const previousCriticalExternalExposures = signals.filter(
    (s) => s.previous_period && s.signal_type === "External Exposure" && s.severity === "Critical"
  ).length;

  const leakedCredentials = filteredSignals.filter((s) => s.signal_type === "Leaked Credentials").length;
  const previousLeakedCredentials = signals.filter(
    (s) => s.previous_period && s.signal_type === "Leaked Credentials"
  ).length;

  const suppliersWithRatingDrop = filteredSuppliers.filter((s) => s.rating_change_points < 0).length;
  const previousSuppliersWithRatingDrop = filteredSuppliers.filter((s) => s.previous_rating_change_points < 0).length;

  const newHighRiskSignals = filteredSignals.filter(
    (s) => s.current_period && ["Critical", "High"].includes(s.severity)
  ).length;
  const previousHighRiskSignals = signals.filter(
    (s) => s.previous_period && ["Critical", "High"].includes(s.severity)
  ).length;

  const escalatedSignals = filteredSignals.filter((s) => s.escalated).length;
  const previousEscalatedSignals = signals.filter((s) => s.previous_period && s.escalated).length;

  const avgDetectionDelay = filteredSignals.length
    ? Number(
        (
          filteredSignals.reduce((sum, s) => sum + detectionDelayDays(s), 0) /
          filteredSignals.length
        ).toFixed(1)
      )
    : 0;

  const previousPeriodSignals = signals.filter((s) => s.previous_period);
  const previousAvgDetectionDelay = previousPeriodSignals.length
    ? Number(
        (
          previousPeriodSignals.reduce((sum, s) => sum + detectionDelayDays(s), 0) /
          previousPeriodSignals.length
        ).toFixed(1)
      )
    : 0;

  document.getElementById("monitoringCoverage").textContent = `${monitoringCoverage}%`;
  document.getElementById("tierOneMonitoringCoverage").textContent = `${tierOneMonitoringCoverage}%`;
  document.getElementById("criticalExternalExposures").textContent = criticalExternalExposures;
  document.getElementById("leakedCredentials").textContent = leakedCredentials;
  document.getElementById("suppliersWithRatingDrop").textContent = suppliersWithRatingDrop;
  document.getElementById("newHighRiskSignals").textContent = newHighRiskSignals;
  document.getElementById("escalatedSignals").textContent = escalatedSignals;
  document.getElementById("avgDetectionDelay").textContent = `${avgDetectionDelay}d`;

  setTrend("monitoringCoverageTrend", monitoringCoverage, previousMonitoringCoverage, "higher", "%");
  setTrend("tierOneMonitoringCoverageTrend", tierOneMonitoringCoverage, previousTierOneMonitoringCoverage, "higher", "%");
  setTrend("criticalExternalExposuresTrend", criticalExternalExposures, previousCriticalExternalExposures, "lower");
  setTrend("leakedCredentialsTrend", leakedCredentials, previousLeakedCredentials, "lower");
  setTrend("suppliersWithRatingDropTrend", suppliersWithRatingDrop, previousSuppliersWithRatingDrop, "lower");
  setTrend("newHighRiskSignalsTrend", newHighRiskSignals, previousHighRiskSignals, "lower");
  setTrend("escalatedSignalsTrend", escalatedSignals, previousEscalatedSignals, "contextual");
  setTrend("avgDetectionDelayTrend", avgDetectionDelay, previousAvgDetectionDelay, "lower", "d");
}

function renderActiveSignalsTable(filteredSignals) {
  const tbody = document.querySelector("#activeSignalsTable tbody");
  tbody.innerHTML = "";

  filteredSignals
    .filter((s) => s.escalation_status !== "Closed")
    .sort((a, b) => parseDate(b.first_observed_date) - parseDate(a.first_observed_date))
    .forEach((signal) => {
      const delay = detectionDelayDays(signal);
      tbody.innerHTML += `
        <tr>
          <td>${signal.supplier_name}</td>
          <td>${signal.tier}</td>
          <td>${signal.business_area}</td>
          <td>${signal.signal_type}</td>
          <td><span class="${getPillClass(signal.severity)}">${signal.severity}</span></td>
          <td>${signal.first_observed_date}</td>
          <td>${delay}d</td>
          <td><span class="${getPillClass(signal.escalation_status)}">${signal.escalation_status}</span></td>
          <td>${signal.required_action}</td>
        </tr>
      `;
    });
}

function renderRatingDeteriorationTable(filteredSuppliers) {
  const tbody = document.querySelector("#ratingDeteriorationTable tbody");
  tbody.innerHTML = "";

  filteredSuppliers
    .filter((s) => s.rating_change_points < 0)
    .sort((a, b) => a.rating_change_points - b.rating_change_points)
    .forEach((supplier) => {
      const requiredAction = supplier.rating_change_points <= -30
        ? "Escalate to supplier risk operations"
        : "Increase monitoring cadence";

      tbody.innerHTML += `
        <tr>
          <td>${supplier.supplier_name}</td>
          <td>${supplier.tier}</td>
          <td>${supplier.previous_cyber_rating}</td>
          <td>${supplier.current_cyber_rating}</td>
          <td>${supplier.rating_change_points}</td>
          <td>${supplier.rating_change_reason}</td>
          <td>${requiredAction}</td>
        </tr>
      `;
    });
}

function renderBlindSpotsTable(filteredSuppliers) {
  const tbody = document.querySelector("#blindSpotsTable tbody");
  tbody.innerHTML = "";

  filteredSuppliers
    .filter((s) => s.monitoring_status !== "Active")
    .forEach((supplier) => {
      const riskLevel = supplier.tier === "Tier 1" ? "High" : "Medium";
      const requiredAction = supplier.monitoring_status === "Coverage Gap"
        ? "Close telemetry gap in 10 days"
        : "Expand monitoring scope";

      tbody.innerHTML += `
        <tr>
          <td>${supplier.supplier_name}</td>
          <td>${supplier.tier}</td>
          <td>${supplier.business_area}</td>
          <td><span class="${getPillClass(supplier.monitoring_status)}">${supplier.monitoring_status}</span></td>
          <td>${supplier.monitoring_gap_reason || "Limited visibility"}</td>
          <td><span class="${getPillClass(riskLevel)}">${riskLevel}</span></td>
          <td>${requiredAction}</td>
        </tr>
      `;
    });
}

function renderMonitoringCharts(filteredSignals) {
  if (signalsByTypeChart) signalsByTypeChart.destroy();
  if (severityTrendChart) severityTrendChart.destroy();

  const signalTypes = [...new Set(filteredSignals.map((s) => s.signal_type))];
  signalsByTypeChart = new Chart(document.getElementById("signalsByTypeChart"), {
    type: "bar",
    data: {
      labels: signalTypes,
      datasets: [
        {
          label: "Signals",
          data: signalTypes.map((type) => filteredSignals.filter((s) => s.signal_type === type).length)
        }
      ]
    },
    options: { maintainAspectRatio: false }
  });

  const trendBuckets = ["Previous", "Current"];
  const criticalCounts = [
    signals.filter((s) => s.previous_period && s.severity === "Critical").length,
    filteredSignals.filter((s) => s.current_period && s.severity === "Critical").length
  ];
  const highCounts = [
    signals.filter((s) => s.previous_period && s.severity === "High").length,
    filteredSignals.filter((s) => s.current_period && s.severity === "High").length
  ];
  const mediumCounts = [
    signals.filter((s) => s.previous_period && s.severity === "Medium").length,
    filteredSignals.filter((s) => s.current_period && s.severity === "Medium").length
  ];

  severityTrendChart = new Chart(document.getElementById("severityTrendChart"), {
    type: "line",
    data: {
      labels: trendBuckets,
      datasets: [
        { label: "Critical", data: criticalCounts, tension: 0.3 },
        { label: "High", data: highCounts, tension: 0.3 },
        { label: "Medium", data: mediumCounts, tension: 0.3 }
      ]
    },
    options: { maintainAspectRatio: false }
  });
}

function applyFilters(state) {
  const { filteredSignals, filteredSuppliers } = filterMonitoringData(state);

  renderMonitoringKpis(filteredSuppliers, filteredSignals);
  renderActiveSignalsTable(filteredSignals);
  renderRatingDeteriorationTable(filteredSuppliers);
  renderBlindSpotsTable(filteredSuppliers);
  renderMonitoringCharts(filteredSignals);

  document.getElementById("filterSummary").textContent =
    `Showing ${filteredSignals.length} of ${signals.length} signals`;
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

function initMonitoringFilters() {
  const signalTypeSelect = document.getElementById("filterSignalType");
  const severitySelect = document.getElementById("filterSeverity");
  const tierSelect = document.getElementById("filterTier");
  const businessAreaSelect = document.getElementById("filterBusinessArea");
  const monitoringStatusSelect = document.getElementById("filterMonitoringStatus");
  const escalationStatusSelect = document.getElementById("filterEscalationStatus");
  const periodSelect = document.getElementById("filterPeriod");
  const clearButton = document.getElementById("clearFilters");

  setSelectOptions(signalTypeSelect, signals.map((s) => s.signal_type));
  setSelectOptions(severitySelect, signals.map((s) => s.severity));
  setSelectOptions(tierSelect, suppliers.map((s) => s.tier));
  setSelectOptions(businessAreaSelect, suppliers.map((s) => s.business_area));
  setSelectOptions(monitoringStatusSelect, suppliers.map((s) => s.monitoring_status));
  setSelectOptions(escalationStatusSelect, signals.map((s) => s.escalation_status));
  setSelectOptions(periodSelect, ["Current Period", "Previous Period", "Last 30 Days"]);

  periodSelect.value = "Current Period";

  function applyFromUi() {
    applyFilters({
      signalType: signalTypeSelect.value,
      severity: severitySelect.value,
      tier: tierSelect.value,
      businessArea: businessAreaSelect.value,
      monitoringStatus: monitoringStatusSelect.value,
      escalationStatus: escalationStatusSelect.value,
      period: periodSelect.value
    });
  }

  signalTypeSelect.addEventListener("change", applyFromUi);
  severitySelect.addEventListener("change", applyFromUi);
  tierSelect.addEventListener("change", applyFromUi);
  businessAreaSelect.addEventListener("change", applyFromUi);
  monitoringStatusSelect.addEventListener("change", applyFromUi);
  escalationStatusSelect.addEventListener("change", applyFromUi);
  periodSelect.addEventListener("change", applyFromUi);

  clearButton.addEventListener("click", () => {
    signalTypeSelect.value = "All";
    severitySelect.value = "All";
    tierSelect.value = "All";
    businessAreaSelect.value = "All";
    monitoringStatusSelect.value = "All";
    escalationStatusSelect.value = "All";
    periodSelect.value = "Current Period";
    applyFromUi();
  });

  applyFromUi();
}

addCardHoverEffect();
initMonitoringFilters();
