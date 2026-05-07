const suppliers = [
  {
    supplier_id: "SUP-001",
    supplier_name: "CloudOps Partner A",
    period: "Q1",
    tier: "Tier 1",
    business_unit: "Technology",
    cyber_rating: 612,
    risk_score: 91,
    previous_risk_score: 94,
    residual_risk: "High",
    annual_loss_exposure_m: 3.4,
    previous_annual_loss_exposure_m: 3.8,
    two_months_ago_annual_loss_exposure_m: 3.6,
    continuously_monitored: true,
    previous_continuously_monitored: true,
    assessment_status: "Complete",
    previous_assessment_status: "In Progress"
  },
  {
    supplier_id: "SUP-002",
    supplier_name: "Clinical Data Vendor B",
    period: "Q1",
    tier: "Tier 1",
    business_unit: "R&D",
    cyber_rating: 640,
    risk_score: 88,
    previous_risk_score: 90,
    residual_risk: "High",
    annual_loss_exposure_m: 2.8,
    previous_annual_loss_exposure_m: 3.1,
    two_months_ago_annual_loss_exposure_m: 3.0,
    continuously_monitored: true,
    previous_continuously_monitored: true,
    assessment_status: "Complete",
    previous_assessment_status: "Complete"
  },
  {
    supplier_id: "SUP-003",
    supplier_name: "Logistics Provider C",
    period: "Q2",
    tier: "Tier 2",
    business_unit: "Supply Chain",
    cyber_rating: 681,
    risk_score: 79,
    previous_risk_score: 82,
    residual_risk: "High",
    annual_loss_exposure_m: 1.6,
    previous_annual_loss_exposure_m: 1.9,
    two_months_ago_annual_loss_exposure_m: 2.0,
    continuously_monitored: true,
    previous_continuously_monitored: false,
    assessment_status: "Overdue",
    previous_assessment_status: "Overdue"
  },
  {
    supplier_id: "SUP-004",
    supplier_name: "Manufacturing SaaS D",
    period: "Q2",
    tier: "Tier 1",
    business_unit: "Manufacturing",
    cyber_rating: 702,
    risk_score: 76,
    previous_risk_score: 75,
    residual_risk: "Medium",
    annual_loss_exposure_m: 1.2,
    previous_annual_loss_exposure_m: 1.1,
    two_months_ago_annual_loss_exposure_m: 1.2,
    continuously_monitored: false,
    previous_continuously_monitored: false,
    assessment_status: "In Progress",
    previous_assessment_status: "In Progress"
  },
  {
    supplier_id: "SUP-005",
    supplier_name: "Procurement Platform E",
    period: "Q1",
    tier: "Tier 2",
    business_unit: "Procurement",
    cyber_rating: 728,
    risk_score: 68,
    previous_risk_score: 70,
    residual_risk: "Medium",
    annual_loss_exposure_m: 0.9,
    previous_annual_loss_exposure_m: 1.0,
    two_months_ago_annual_loss_exposure_m: 1.1,
    continuously_monitored: false,
    previous_continuously_monitored: false,
    assessment_status: "Complete",
    previous_assessment_status: "In Progress"
  }
];

const findings = [
  {
    supplier_id: "SUP-001",
    finding_title: "Exposed admin portal",
    severity: "Critical",
    age_days: 41,
    sla_status: "Breached",
    previous_period: true
  },
  {
    supplier_id: "SUP-002",
    finding_title: "Leaked credentials detected",
    severity: "Critical",
    age_days: 19,
    sla_status: "At Risk",
    previous_period: true
  },
  {
    supplier_id: "SUP-003",
    finding_title: "Missing SOC 2 evidence",
    severity: "High",
    age_days: 58,
    sla_status: "Breached",
    previous_period: false
  }
];

const riskTrend = [
  { quarter: "Q1", risk_score: 76 },
  { quarter: "Q2", risk_score: 73 },
  { quarter: "Q3", risk_score: 71 },
  { quarter: "Q4", risk_score: 68 }
];

const supplierNameById = Object.fromEntries(
  suppliers.map(s => [s.supplier_id, s.supplier_name])
);

let riskTrendChart = null;
let riskDistributionChart = null;

function filterData(state) {
  const filteredSuppliers = suppliers.filter(s => {
    const periodMatch = state.period === "All" || s.period === state.period;
    const businessUnitMatch = state.businessUnit === "All" || s.business_unit === state.businessUnit;
    const tierMatch = state.tier === "All" || s.tier === state.tier;
    return periodMatch && businessUnitMatch && tierMatch;
  });

  const ids = new Set(filteredSuppliers.map(s => s.supplier_id));
  const filteredFindings = findings.filter(f => ids.has(f.supplier_id));

  return { filteredSuppliers, filteredFindings };
}

function renderKpis(filteredSuppliers, filteredFindings) {
  const totalSuppliers = filteredSuppliers.length;

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
    let improvement = false;

    if (preferredDirection === "lower") {
      improvement = !isIncrease;
    } else if (preferredDirection === "higher") {
      improvement = isIncrease;
    } else if (preferredDirection === "negative") {
      improvement = currentValue < previousValue;
    }

    node.className = `kpi-trend ${improvement ? "trend-good" : "trend-bad"}`;
    node.textContent = `${arrow} ${Math.abs(delta).toFixed(1)}${valueSuffix} vs past month`;
  }

  if (!totalSuppliers) {
    document.getElementById("riskScore").textContent = "-";
    document.getElementById("highRiskSuppliers").textContent = "0";
    document.getElementById("criticalSuppliersAtRisk").textContent = "0";
    document.getElementById("lossExposure").textContent = "$0.0M";
    document.getElementById("exposureTrendPercent").textContent = "0.0%";
    document.getElementById("assessedPercent").textContent = "0%";
    document.getElementById("monitoredPercent").textContent = "0%";
    document.getElementById("criticalFindings").textContent = "0";
    [
      "riskScoreTrend",
      "highRiskSuppliersTrend",
      "criticalSuppliersAtRiskTrend",
      "lossExposureTrend",
      "exposureTrendPercentTrend",
      "assessedPercentTrend",
      "monitoredPercentTrend",
      "criticalFindingsTrend"
    ].forEach((id) => {
      const node = document.getElementById(id);
      if (node) {
        node.className = "kpi-trend trend-warn";
        node.textContent = "→ no prior month";
      }
    });
    return;
  }

  const averageRiskScore = Math.round(
    filteredSuppliers.reduce((sum, s) => sum + s.risk_score, 0) / totalSuppliers
  );

  const highRiskSuppliers = filteredSuppliers.filter(
    s => s.residual_risk === "High"
  ).length;

  const criticalSuppliersAtRisk = filteredSuppliers.filter(
    s => s.tier === "Tier 1" && s.residual_risk === "High"
  ).length;

  const annualLossExposure = filteredSuppliers.reduce(
    (sum, s) => sum + s.annual_loss_exposure_m,
    0
  );

  const previousAnnualLossExposure = filteredSuppliers.reduce(
    (sum, s) => sum + s.previous_annual_loss_exposure_m,
    0
  );

  const twoMonthsAgoAnnualLossExposure = filteredSuppliers.reduce(
    (sum, s) => sum + s.two_months_ago_annual_loss_exposure_m,
    0
  );

  const exposureTrendPercent = previousAnnualLossExposure
    ? ((annualLossExposure - previousAnnualLossExposure) / previousAnnualLossExposure) * 100
    : 0;

  const previousExposureTrendPercent = twoMonthsAgoAnnualLossExposure
    ? ((previousAnnualLossExposure - twoMonthsAgoAnnualLossExposure) / twoMonthsAgoAnnualLossExposure) * 100
    : 0;

  const assessedPercent = Math.round(
    (filteredSuppliers.filter(s => s.assessment_status === "Complete").length / totalSuppliers) * 100
  );

  const previousAssessedPercent = Math.round(
    (filteredSuppliers.filter(s => s.previous_assessment_status === "Complete").length / totalSuppliers) * 100
  );

  const monitoredPercent = Math.round(
    (filteredSuppliers.filter(s => s.continuously_monitored).length / totalSuppliers) * 100
  );

  const previousMonitoredPercent = Math.round(
    (filteredSuppliers.filter(s => s.previous_continuously_monitored).length / totalSuppliers) * 100
  );

  const criticalFindings = filteredFindings.filter(
    f => f.severity === "Critical"
  ).length;

  const previousCriticalFindings = filteredFindings.filter(
    f => f.severity === "Critical" && f.previous_period
  ).length;

  const previousAverageRiskScore = Math.round(
    filteredSuppliers.reduce((sum, s) => sum + s.previous_risk_score, 0) / totalSuppliers
  );

  const previousHighRiskSuppliers = filteredSuppliers.filter(
    s => s.previous_risk_score >= 80
  ).length;

  const previousCriticalSuppliersAtRisk = filteredSuppliers.filter(
    s => s.tier === "Tier 1" && s.previous_risk_score >= 80
  ).length;

  document.getElementById("riskScore").textContent = averageRiskScore;
  document.getElementById("highRiskSuppliers").textContent = highRiskSuppliers;
  document.getElementById("criticalSuppliersAtRisk").textContent = criticalSuppliersAtRisk;
  document.getElementById("lossExposure").textContent = `$${annualLossExposure.toFixed(1)}M`;
  document.getElementById("exposureTrendPercent").textContent = `${exposureTrendPercent.toFixed(1)}%`;
  document.getElementById("assessedPercent").textContent = `${assessedPercent}%`;
  document.getElementById("monitoredPercent").textContent = `${monitoredPercent}%`;
  document.getElementById("criticalFindings").textContent = criticalFindings;

  setTrend("riskScoreTrend", averageRiskScore, previousAverageRiskScore, "lower");
  setTrend("highRiskSuppliersTrend", highRiskSuppliers, previousHighRiskSuppliers, "lower");
  setTrend("criticalSuppliersAtRiskTrend", criticalSuppliersAtRisk, previousCriticalSuppliersAtRisk, "lower");
  setTrend("lossExposureTrend", annualLossExposure, previousAnnualLossExposure, "lower", "M");
  setTrend("exposureTrendPercentTrend", exposureTrendPercent, previousExposureTrendPercent, "negative", "%");
  setTrend("assessedPercentTrend", assessedPercent, previousAssessedPercent, "higher", "%");
  setTrend("monitoredPercentTrend", monitoredPercent, previousMonitoredPercent, "higher", "%");
  setTrend("criticalFindingsTrend", criticalFindings, previousCriticalFindings, "lower");
}

function renderTopSuppliers(filteredSuppliers) {
  const tbody = document.querySelector("#topSuppliers tbody");
  tbody.innerHTML = "";

  function getSupplierAction(supplier) {
    if (supplier.residual_risk === "High" && supplier.risk_score >= 85) {
      return "Escalate: 30-day risk reduction plan";
    }
    if (supplier.residual_risk === "High") {
      return "Track: weekly control validation";
    }
    if (supplier.residual_risk === "Medium") {
      return "Mitigate: close top control gaps";
    }
    return "Maintain: monitor and reassess";
  }

  filteredSuppliers
    .slice()
    .sort((a, b) => b.risk_score - a.risk_score)
    .slice(0, 5)
    .forEach(s => {
      tbody.innerHTML += `
        <tr>
          <td>${s.supplier_name}</td>
          <td>${s.tier}</td>
          <td>${s.business_unit}</td>
          <td>${s.risk_score}</td>
          <td>${s.residual_risk}</td>
          <td>$${s.annual_loss_exposure_m.toFixed(1)}M</td>
          <td>${getSupplierAction(s)}</td>
        </tr>
      `;
    });
}

function renderFindings(filteredFindings) {
  const tbody = document.querySelector("#criticalFindingsTable tbody");
  tbody.innerHTML = "";

  function getFindingAction(finding) {
    if (finding.severity === "Critical" && finding.sla_status === "Breached") {
      return "Escalate: executive closure in 7d";
    }
    if (finding.severity === "Critical") {
      return "Assign owner: close in 14d";
    }
    if (finding.sla_status === "Breached") {
      return "Remediate: close control gap";
    }
    return "Track to SLA";
  }

  filteredFindings.forEach(f => {
    tbody.innerHTML += `
      <tr>
        <td>${f.finding_title}</td>
        <td>${supplierNameById[f.supplier_id]}</td>
        <td>${f.severity}</td>
        <td>${f.age_days}d</td>
        <td>${f.sla_status}</td>
        <td>${getFindingAction(f)}</td>
      </tr>
    `;
  });
}

function renderCharts(filteredSuppliers) {
  if (riskTrendChart) riskTrendChart.destroy();
  if (riskDistributionChart) riskDistributionChart.destroy();

  riskTrendChart = new Chart(document.getElementById("riskTrend"), {
    type: "line",
    data: {
      labels: riskTrend.map(r => r.quarter),
      datasets: [
        {
          label: "Risk Score",
          data: riskTrend.map(r => r.risk_score),
          tension: 0.35
        }
      ]
    },
    options: { maintainAspectRatio: false }
  });

  riskDistributionChart = new Chart(document.getElementById("riskDistribution"), {
    type: "doughnut",
    data: {
      labels: ["High", "Medium", "Low"],
      datasets: [
        {
          data: [
            filteredSuppliers.filter(s => s.residual_risk === "High").length,
            filteredSuppliers.filter(s => s.residual_risk === "Medium").length,
            filteredSuppliers.filter(s => s.residual_risk === "Low").length
          ]
        }
      ]
    },
    options: { maintainAspectRatio: false }
  });
}

function applyFilters(state) {
  const { filteredSuppliers, filteredFindings } = filterData(state);

  renderKpis(filteredSuppliers, filteredFindings);
  renderTopSuppliers(filteredSuppliers);
  renderFindings(filteredFindings);
  renderCharts(filteredSuppliers);

  document.getElementById("filterSummary").textContent =
    `Showing ${filteredSuppliers.length} of ${suppliers.length} suppliers`;
}

function initExecutiveFilters() {
  const periodSelect = document.getElementById("filterPeriod");
  const businessUnitSelect = document.getElementById("filterBusinessUnit");
  const tierSelect = document.getElementById("filterTier");
  const clearButton = document.getElementById("clearFilters");

  const periods = ["All", ...new Set(suppliers.map(s => s.period))];
  const businessUnits = ["All", ...new Set(suppliers.map(s => s.business_unit))];
  const tiers = ["All", ...new Set(suppliers.map(s => s.tier))];

  periodSelect.innerHTML = periods.map(v => `<option value="${v}">${v}</option>`).join("");
  businessUnitSelect.innerHTML = businessUnits.map(v => `<option value="${v}">${v}</option>`).join("");
  tierSelect.innerHTML = tiers.map(v => `<option value="${v}">${v}</option>`).join("");

  function applyFromUi() {
    applyFilters({
      period: periodSelect.value,
      businessUnit: businessUnitSelect.value,
      tier: tierSelect.value
    });
  }

  periodSelect.addEventListener("change", applyFromUi);
  businessUnitSelect.addEventListener("change", applyFromUi);
  tierSelect.addEventListener("change", applyFromUi);

  clearButton.addEventListener("click", () => {
    periodSelect.value = "All";
    businessUnitSelect.value = "All";
    tierSelect.value = "All";
    applyFromUi();
  });

  applyFromUi();
}

function addCardHoverEffect() {
  const cards = document.querySelectorAll(".kpi-card, .card");

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

addCardHoverEffect();
initExecutiveFilters();
