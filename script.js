const suppliers = [
  {
    supplier_id: "SUP-001",
    supplier_name: "CloudOps Partner A",
    period: "Q1",
    tier: "Tier 1",
    business_unit: "Technology",
    cyber_rating: 612,
    risk_score: 91,
    residual_risk: "High",
    annual_loss_exposure_m: 3.4,
    continuously_monitored: true,
    assessment_status: "Complete"
  },
  {
    supplier_id: "SUP-002",
    supplier_name: "Clinical Data Vendor B",
    period: "Q1",
    tier: "Tier 1",
    business_unit: "R&D",
    cyber_rating: 640,
    risk_score: 88,
    residual_risk: "High",
    annual_loss_exposure_m: 2.8,
    continuously_monitored: true,
    assessment_status: "Complete"
  },
  {
    supplier_id: "SUP-003",
    supplier_name: "Logistics Provider C",
    period: "Q2",
    tier: "Tier 2",
    business_unit: "Supply Chain",
    cyber_rating: 681,
    risk_score: 79,
    residual_risk: "High",
    annual_loss_exposure_m: 1.6,
    continuously_monitored: true,
    assessment_status: "Overdue"
  },
  {
    supplier_id: "SUP-004",
    supplier_name: "Manufacturing SaaS D",
    period: "Q2",
    tier: "Tier 1",
    business_unit: "Manufacturing",
    cyber_rating: 702,
    risk_score: 76,
    residual_risk: "Medium",
    annual_loss_exposure_m: 1.2,
    continuously_monitored: false,
    assessment_status: "In Progress"
  },
  {
    supplier_id: "SUP-005",
    supplier_name: "Procurement Platform E",
    period: "Q1",
    tier: "Tier 2",
    business_unit: "Procurement",
    cyber_rating: 728,
    risk_score: 68,
    residual_risk: "Medium",
    annual_loss_exposure_m: 0.9,
    continuously_monitored: false,
    assessment_status: "Complete"
  }
];

const findings = [
  {
    supplier_id: "SUP-001",
    finding_title: "Exposed admin portal",
    severity: "Critical",
    age_days: 41,
    sla_status: "Breached"
  },
  {
    supplier_id: "SUP-002",
    finding_title: "Leaked credentials detected",
    severity: "Critical",
    age_days: 19,
    sla_status: "At Risk"
  },
  {
    supplier_id: "SUP-003",
    finding_title: "Missing SOC 2 evidence",
    severity: "High",
    age_days: 58,
    sla_status: "Breached"
  }
];

const riskTrend = [
  { month: "Jan", risk_score: 75 },
  { month: "Feb", risk_score: 73 },
  { month: "Mar", risk_score: 71 }
];

const aiAlerts = [
  {
    value: "6 suppliers",
    detail: "Predicted to exceed risk threshold in 30 days"
  },
  {
    value: "$4.2M",
    detail: "Simulated exposure from top 3 vendors"
  },
  {
    value: "Vendor A",
    detail: "Highest ROI remediation target"
  }
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

  if (!totalSuppliers) {
    document.getElementById("riskScore").textContent = "-";
    document.getElementById("highRiskSuppliers").textContent = "0";
    document.getElementById("lossExposure").textContent = "$0.0M";
    document.getElementById("assessedPercent").textContent = "0%";
    document.getElementById("monitoredPercent").textContent = "0%";
    document.getElementById("criticalFindings").textContent = "0";
    return;
  }

  const averageRiskScore = Math.round(
    filteredSuppliers.reduce((sum, s) => sum + s.risk_score, 0) / totalSuppliers
  );

  const highRiskSuppliers = filteredSuppliers.filter(
    s => s.residual_risk === "High"
  ).length;

  const annualLossExposure = filteredSuppliers.reduce(
    (sum, s) => sum + s.annual_loss_exposure_m,
    0
  );

  const assessedPercent = Math.round(
    (filteredSuppliers.filter(s => s.assessment_status === "Complete").length / totalSuppliers) * 100
  );

  const monitoredPercent = Math.round(
    (filteredSuppliers.filter(s => s.continuously_monitored).length / totalSuppliers) * 100
  );

  const criticalFindings = filteredFindings.filter(
    f => f.severity === "Critical"
  ).length;

  document.getElementById("riskScore").textContent = averageRiskScore;
  document.getElementById("highRiskSuppliers").textContent = highRiskSuppliers;
  document.getElementById("lossExposure").textContent = `$${annualLossExposure.toFixed(1)}M`;
  document.getElementById("assessedPercent").textContent = `${assessedPercent}%`;
  document.getElementById("monitoredPercent").textContent = `${monitoredPercent}%`;
  document.getElementById("criticalFindings").textContent = criticalFindings;
}

function renderTopSuppliers(filteredSuppliers) {
  const tbody = document.querySelector("#topSuppliers tbody");
  tbody.innerHTML = "";

  filteredSuppliers
    .slice()
    .sort((a, b) => b.risk_score - a.risk_score)
    .slice(0, 5)
    .forEach(s => {
      tbody.innerHTML += `
        <tr>
          <td>${s.supplier_name}</td>
          <td>${s.tier}</td>
          <td>${s.risk_score}</td>
          <td>${s.cyber_rating}</td>
          <td>$${s.annual_loss_exposure_m.toFixed(1)}M</td>
          <td>${s.business_unit}</td>
        </tr>
      `;
    });
}

function renderFindings(filteredFindings) {
  const tbody = document.querySelector("#criticalFindingsTable tbody");
  tbody.innerHTML = "";

  filteredFindings.forEach(f => {
    tbody.innerHTML += `
      <tr>
        <td>${f.finding_title}</td>
        <td>${supplierNameById[f.supplier_id]}</td>
        <td>${f.severity}</td>
        <td>${f.age_days}d</td>
        <td>${f.sla_status}</td>
      </tr>
    `;
  });
}

function renderAiAlerts() {
  const container = document.getElementById("aiAlerts");
  container.innerHTML = "";

  aiAlerts.forEach(alert => {
    container.innerHTML += `
      <div class="ai-item">
        <strong>${alert.value}</strong>
        <span>${alert.detail}</span>
      </div>
    `;
  });
}

function renderCharts(filteredSuppliers) {
  if (riskTrendChart) riskTrendChart.destroy();
  if (riskDistributionChart) riskDistributionChart.destroy();

  riskTrendChart = new Chart(document.getElementById("riskTrend"), {
    type: "line",
    data: {
      labels: filteredSuppliers.map(r => r.supplier_name),
      datasets: [
        {
          label: "Risk Score",
          data: filteredSuppliers.map(r => r.risk_score),
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

function renderExtendedKpis() {
  const ext = calculateMissingKpis();
  document.getElementById("criticalSuppliersAtRisk").textContent = ext.criticalSuppliersAtRisk;
  document.getElementById("exposureTrendPercent").textContent = ext.exposureTrendPercent;
  document.getElementById("topBusinessImpactArea").textContent = ext.topBusinessImpactArea;
  document.getElementById("predictedRiskBreaches").textContent = ext.predictedRiskBreaches;
  document.getElementById("forecastedExposure").textContent = ext.forecastedExposure;
}

renderAiAlerts();
addCardHoverEffect();
initExecutiveFilters();
renderExtendedKpis();
