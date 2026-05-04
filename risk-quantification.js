const supplierRisk = [
  {
    supplier: "CloudOps Partner A",
    exposure: 3.4,
    risk: "High",
    scenario_type: "Outage",
    risk_driver: "Cloud",
    investment_level: "High"
  },
  {
    supplier: "Clinical Data Vendor B",
    exposure: 2.8,
    risk: "High",
    scenario_type: "Data breach",
    risk_driver: "Access",
    investment_level: "Medium"
  },
  {
    supplier: "Identity Services F",
    exposure: 2.1,
    risk: "High",
    scenario_type: "Ransomware",
    risk_driver: "Identity",
    investment_level: "High"
  },
  {
    supplier: "Logistics Provider C",
    exposure: 1.6,
    risk: "Medium",
    scenario_type: "Outage",
    risk_driver: "Cloud",
    investment_level: "Medium"
  },
  {
    supplier: "Manufacturing SaaS D",
    exposure: 1.2,
    risk: "Medium",
    scenario_type: "Ransomware",
    risk_driver: "Access",
    investment_level: "Low"
  },
  {
    supplier: "Procurement Platform E",
    exposure: 0.9,
    risk: "Low",
    scenario_type: "Data breach",
    risk_driver: "Identity",
    investment_level: "Low"
  }
];

const scenarios = [
  {
    scenario: "Credential compromise via supplier",
    supplier: "Identity Services F",
    scenario_type: "Ransomware",
    risk_driver: "Identity",
    likelihood: "High",
    impact: "Very High",
    exposure: 2.1
  },
  {
    scenario: "Cloud misconfiguration breach",
    supplier: "CloudOps Partner A",
    scenario_type: "Outage",
    risk_driver: "Cloud",
    likelihood: "Medium",
    impact: "Very High",
    exposure: 3.4
  },
  {
    scenario: "Clinical data leak",
    supplier: "Clinical Data Vendor B",
    scenario_type: "Data breach",
    risk_driver: "Access",
    likelihood: "Medium",
    impact: "Very High",
    exposure: 2.8
  },
  {
    scenario: "Regional logistics disruption",
    supplier: "Logistics Provider C",
    scenario_type: "Outage",
    risk_driver: "Cloud",
    likelihood: "Medium",
    impact: "High",
    exposure: 1.6
  },
  {
    scenario: "Privileged account hijack",
    supplier: "Manufacturing SaaS D",
    scenario_type: "Ransomware",
    risk_driver: "Access",
    likelihood: "Medium",
    impact: "High",
    exposure: 1.2
  },
  {
    scenario: "Supplier-held PII disclosure",
    supplier: "Procurement Platform E",
    scenario_type: "Data breach",
    risk_driver: "Identity",
    likelihood: "Low",
    impact: "High",
    exposure: 0.9
  }
];

const roiActions = [
  {
    supplier: "CloudOps Partner A",
    action: "Fix exposed admin interface",
    cost: 0.2,
    reduction: 1.5,
    scenario_type: "Outage",
    risk_driver: "Cloud",
    investment_level: "High"
  },
  {
    supplier: "Identity Services F",
    action: "Patch identity vulnerability",
    cost: 0.15,
    reduction: 1.2,
    scenario_type: "Ransomware",
    risk_driver: "Identity",
    investment_level: "High"
  },
  {
    supplier: "Clinical Data Vendor B",
    action: "Enforce MFA",
    cost: 0.1,
    reduction: 1.0,
    scenario_type: "Data breach",
    risk_driver: "Access",
    investment_level: "Medium"
  },
  {
    supplier: "Logistics Provider C",
    action: "Add secondary routing provider",
    cost: 0.12,
    reduction: 0.7,
    scenario_type: "Outage",
    risk_driver: "Cloud",
    investment_level: "Medium"
  },
  {
    supplier: "Manufacturing SaaS D",
    action: "Harden privileged access reviews",
    cost: 0.08,
    reduction: 0.5,
    scenario_type: "Ransomware",
    risk_driver: "Access",
    investment_level: "Low"
  },
  {
    supplier: "Procurement Platform E",
    action: "Roll out federated identity controls",
    cost: 0.05,
    reduction: 0.3,
    scenario_type: "Data breach",
    risk_driver: "Identity",
    investment_level: "Low"
  }
];

const aiInsights = [
  {
    value: "$3.7M",
    detail: "Top 3 remediation actions reduce 44% of total risk"
  },
  {
    value: "Identity layer",
    detail: "Highest systemic risk across suppliers"
  },
  {
    value: "Cloud concentration",
    detail: "Biggest exposure multiplier across Tier 1 vendors"
  }
];

let exposureChart = null;
let driversChart = null;

function setSelectOptions(select, values) {
  const options = ["All", ...new Set(values)].filter(Boolean);
  select.innerHTML = options.map(value => `<option value="${value}">${value}</option>`).join("");
}

function filterRiskData(state) {
  const filteredSupplierRisk = supplierRisk.filter(item => {
    const scenarioMatch = state.scenarioType === "All" || item.scenario_type === state.scenarioType;
    const supplierMatch = state.supplier === "All" || item.supplier === state.supplier;
    const driverMatch = state.riskDriver === "All" || item.risk_driver === state.riskDriver;
    const investmentMatch = state.investmentLevel === "All" || item.investment_level === state.investmentLevel;
    return scenarioMatch && supplierMatch && driverMatch && investmentMatch;
  });

  const names = new Set(filteredSupplierRisk.map(item => item.supplier));

  const filteredScenarios = scenarios.filter(item => {
    const scenarioMatch = state.scenarioType === "All" || item.scenario_type === state.scenarioType;
    const supplierMatch = state.supplier === "All" || item.supplier === state.supplier;
    const driverMatch = state.riskDriver === "All" || item.risk_driver === state.riskDriver;
    return names.has(item.supplier) && scenarioMatch && supplierMatch && driverMatch;
  });

  const filteredRoi = roiActions.filter(item => {
    const scenarioMatch = state.scenarioType === "All" || item.scenario_type === state.scenarioType;
    const supplierMatch = state.supplier === "All" || item.supplier === state.supplier;
    const driverMatch = state.riskDriver === "All" || item.risk_driver === state.riskDriver;
    const investmentMatch = state.investmentLevel === "All" || item.investment_level === state.investmentLevel;
    return names.has(item.supplier) && scenarioMatch && supplierMatch && driverMatch && investmentMatch;
  });

  return { filteredSupplierRisk, filteredScenarios, filteredRoi };
}

function renderKpis(filteredSupplierRisk, filteredRoi) {
  const total = filteredSupplierRisk.reduce((sum, s) => sum + s.exposure, 0);
  const highRisk = filteredSupplierRisk.filter(s => s.risk === "High")
    .reduce((sum, s) => sum + s.exposure, 0);

  const topExposure = filteredSupplierRisk.length
    ? Math.max(...filteredSupplierRisk.map(item => item.exposure))
    : 0;

  const reduction = filteredRoi.reduce((sum, item) => sum + item.reduction, 0);
  const driverTotals = filteredSupplierRisk.reduce((accumulator, item) => {
    accumulator[item.risk_driver] = (accumulator[item.risk_driver] || 0) + item.exposure;
    return accumulator;
  }, {});

  const topDrivers = Object.entries(driverTotals)
    .sort((left, right) => right[1] - left[1])
    .slice(0, 3)
    .map(([driver]) => driver)
    .join(" / ");

  const concentration = Object.values(driverTotals).length
    ? Math.max(...Object.values(driverTotals))
    : 0;

  document.getElementById("totalExposure").textContent = `$${total.toFixed(1)}M`;
  document.getElementById("topSupplierExposure").textContent = `$${topExposure.toFixed(1)}M`;
  document.getElementById("highRiskExposure").textContent = `$${highRisk.toFixed(1)}M`;
  document.getElementById("reductionOpportunity").textContent = `$${reduction.toFixed(1)}M`;
  document.getElementById("topRiskDrivers").textContent = topDrivers || "No material drivers";
  document.getElementById("concentrationExposure").textContent = `$${concentration.toFixed(1)}M`;
  document.getElementById("acceptedRisk").textContent = `$${(total * 0.13).toFixed(1)}M`;
  document.getElementById("residualTrend").textContent = `${filteredSupplierRisk.length ? "-" : ""}${Math.min(12, Math.max(2, filteredSupplierRisk.length * 2))}%`;
}

function renderScenarioTable(filteredScenarios) {
  const tbody = document.querySelector("#scenarioTable tbody");
  tbody.innerHTML = "";

  filteredScenarios.forEach(s => {
    tbody.innerHTML += `
      <tr>
        <td>${s.scenario}</td>
        <td>${s.supplier}</td>
        <td>${s.likelihood}</td>
        <td>${s.impact}</td>
        <td>$${s.exposure}M</td>
      </tr>
    `;
  });
}

function renderRoiTable(filteredRoi) {
  const tbody = document.querySelector("#roiTable tbody");
  tbody.innerHTML = "";

  filteredRoi.forEach(r => {
    const roi = (r.reduction / r.cost).toFixed(1);
    tbody.innerHTML += `
      <tr>
        <td>${r.supplier}</td>
        <td>${r.action}</td>
        <td>$${r.cost}M</td>
        <td>$${r.reduction}M</td>
        <td>${roi}x</td>
      </tr>
    `;
  });
}

function renderCharts(filteredSupplierRisk) {
  if (exposureChart) exposureChart.destroy();
  if (driversChart) driversChart.destroy();

  exposureChart = new Chart(document.getElementById("supplierExposureChart"), {
    type: "bar",
    data: {
      labels: filteredSupplierRisk.map(s => s.supplier),
      datasets: [{
        label: "Exposure ($M)",
        data: filteredSupplierRisk.map(s => s.exposure)
      }]
    },
    options: { maintainAspectRatio: false }
    });

  const driverOrder = ["Identity", "Cloud", "Access"];
  const driverCounts = driverOrder.map(driver =>
    filteredSupplierRisk.filter(s => s.risk_driver === driver).length
  );

  driversChart = new Chart(document.getElementById("riskDriversChart"), {
    type: "doughnut",
    data: {
      labels: driverOrder,
      datasets: [{
        data: driverCounts
      }]
    },
    options: { maintainAspectRatio: false }
    });
}

function renderAI() {
  const container = document.getElementById("crqAiInsights");
  aiInsights.forEach(a => {
    container.innerHTML += `
      <div class="ai-item">
        <strong>${a.value}</strong>
        <span>${a.detail}</span>
      </div>
    `;
  });
}

function renderExtendedRiskKpis() {
  const ext = calculateMissingKpis();
  document.getElementById("forecastedExposure").textContent = ext.forecastedExposure;
  document.getElementById("topVendorConcentration").textContent = ext.topVendorConcentrationRatio;
  document.getElementById("crqCloudConcentration").textContent = ext.cloudConcentrationRatio;
  document.getElementById("crqFourthPartyConcentration").textContent = ext.fourthPartyConcentrationRatio;
}

function renderBusinessImpactTable() {
  const ext = calculateMissingKpis();
  const tbody = document.querySelector("#businessImpactTable tbody");
  tbody.innerHTML = "";

  ext.topRisksByBusinessImpact.forEach((item, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${item.businessUnit}</td>
        <td>$${item.exposure.toFixed(1)}M</td>
        <td>#${index + 1}</td>
      </tr>
    `;
  });
}

renderAI();

function applyFilters(state) {
  const { filteredSupplierRisk, filteredScenarios, filteredRoi } = filterRiskData(state);

  renderKpis(filteredSupplierRisk, filteredRoi);
  renderScenarioTable(filteredScenarios);
  renderRoiTable(filteredRoi);
  renderCharts(filteredSupplierRisk);

  document.getElementById("filterSummary").textContent =
    `Showing ${filteredSupplierRisk.length} of ${supplierRisk.length} suppliers`;
}

function initRiskFilters() {
  const scenarioTypeSelect = document.getElementById("filterScenarioType");
  const supplierSelect = document.getElementById("filterSupplier");
  const riskDriverSelect = document.getElementById("filterRiskDriver");
  const investmentLevelSelect = document.getElementById("filterInvestmentLevel");
  const clearButton = document.getElementById("clearFilters");

  setSelectOptions(scenarioTypeSelect, supplierRisk.map(item => item.scenario_type));
  setSelectOptions(supplierSelect, supplierRisk.map(item => item.supplier));
  setSelectOptions(riskDriverSelect, supplierRisk.map(item => item.risk_driver));
  setSelectOptions(investmentLevelSelect, supplierRisk.map(item => item.investment_level));

  function applyFromUi() {
    applyFilters({
      scenarioType: scenarioTypeSelect.value,
      supplier: supplierSelect.value,
      riskDriver: riskDriverSelect.value,
      investmentLevel: investmentLevelSelect.value
    });
  }

  scenarioTypeSelect.addEventListener("change", applyFromUi);
  supplierSelect.addEventListener("change", applyFromUi);
  riskDriverSelect.addEventListener("change", applyFromUi);
  investmentLevelSelect.addEventListener("change", applyFromUi);

  clearButton.addEventListener("click", () => {
    scenarioTypeSelect.value = "All";
    supplierSelect.value = "All";
    riskDriverSelect.value = "All";
    investmentLevelSelect.value = "All";
    applyFromUi();
  });

  applyFromUi();
}

initRiskFilters();
renderExtendedRiskKpis();
renderBusinessImpactTable();