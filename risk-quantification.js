const riskQuantificationData = [
  {
    scenario_id: "SCN-001",
    scenario_name: "Cloud Control Plane Compromise",
    scenario_type: "Cyber Attack",
    supplier_id: "SUP-001",
    supplier_name: "CloudOps Partner A",
    supplier_tier: "Tier 1",
    business_area: "Core Operations",
    risk_domain: "Confidentiality",
    likelihood: "Medium",
    impact: "Very High",
    annual_loss_exposure_m: 4.6,
    previous_annual_loss_exposure_m: 5.1,
    risk_reduction_m: 1.8,
    mitigation_cost_m: 0.7,
    residual_exposure_m: 2.5,
    accepted_risk_m: 0.6,
    implementation_effort: "High",
    mitigation_status: "In Progress",
    exposure_range: ">$4M",
    time_period: "Q1 2026",
    mitigation_action: "Segment privileged admin paths",
    required_decision: "Fund privileged segmentation program",
    acceptance_owner: "CISO",
    expiry_date: "2026-12-31",
    review_status: "Quarterly Review",
    required_action: "Reconfirm acceptance after control rollout",
    fair_lef: 2.4,
    fair_plm_m: 1.9
  },
  {
    scenario_id: "SCN-002",
    scenario_name: "Supplier Credential Abuse",
    scenario_type: "Cyber Attack",
    supplier_id: "SUP-006",
    supplier_name: "Identity Services F",
    supplier_tier: "Tier 1",
    business_area: "Digital Channels",
    risk_domain: "Integrity",
    likelihood: "High",
    impact: "High",
    annual_loss_exposure_m: 3.9,
    previous_annual_loss_exposure_m: 4.2,
    risk_reduction_m: 1.6,
    mitigation_cost_m: 0.5,
    residual_exposure_m: 2.0,
    accepted_risk_m: 0.4,
    implementation_effort: "Medium",
    mitigation_status: "Planned",
    exposure_range: "$2M-$4M",
    time_period: "Q1 2026",
    mitigation_action: "Deploy supplier session analytics",
    required_decision: "Approve identity hardening backlog",
    acceptance_owner: "Enterprise Risk",
    expiry_date: "2026-10-15",
    review_status: "Monthly Review",
    required_action: "Document owner sign-off and trigger date",
    fair_lef: 3.0,
    fair_plm_m: 1.3
  },
  {
    scenario_id: "SCN-003",
    scenario_name: "Clinical Data Exfiltration",
    scenario_type: "Data Breach",
    supplier_id: "SUP-002",
    supplier_name: "Clinical Data Vendor B",
    supplier_tier: "Tier 1",
    business_area: "Clinical Research",
    risk_domain: "Confidentiality",
    likelihood: "Medium",
    impact: "Very High",
    annual_loss_exposure_m: 3.5,
    previous_annual_loss_exposure_m: 3.8,
    risk_reduction_m: 1.3,
    mitigation_cost_m: 0.6,
    residual_exposure_m: 1.9,
    accepted_risk_m: 0.5,
    implementation_effort: "High",
    mitigation_status: "In Progress",
    exposure_range: "$2M-$4M",
    time_period: "Q1 2026",
    mitigation_action: "Expand tokenization and data zoning",
    required_decision: "Prioritize data protection funding",
    acceptance_owner: "CFO",
    expiry_date: "2026-09-30",
    review_status: "Quarterly Review",
    required_action: "Re-evaluate accepted exposure after go-live",
    fair_lef: 2.1,
    fair_plm_m: 1.7
  },
  {
    scenario_id: "SCN-004",
    scenario_name: "Regional Fulfillment Disruption",
    scenario_type: "Operational Outage",
    supplier_id: "SUP-003",
    supplier_name: "Logistics Provider C",
    supplier_tier: "Tier 2",
    business_area: "Supply Chain",
    risk_domain: "Availability",
    likelihood: "Medium",
    impact: "High",
    annual_loss_exposure_m: 2.4,
    previous_annual_loss_exposure_m: 2.2,
    risk_reduction_m: 0.9,
    mitigation_cost_m: 0.4,
    residual_exposure_m: 1.5,
    accepted_risk_m: 0.3,
    implementation_effort: "Medium",
    mitigation_status: "Planned",
    exposure_range: "$2M-$4M",
    time_period: "Q1 2026",
    mitigation_action: "Add alternate routing resilience",
    required_decision: "Approve dual-route resilience budget",
    acceptance_owner: "COO",
    expiry_date: "2026-11-30",
    review_status: "Monthly Review",
    required_action: "Track milestones in governance forum",
    fair_lef: 1.8,
    fair_plm_m: 1.3
  },
  {
    scenario_id: "SCN-005",
    scenario_name: "Manufacturing SaaS Ransom Event",
    scenario_type: "Cyber Attack",
    supplier_id: "SUP-004",
    supplier_name: "Manufacturing SaaS D",
    supplier_tier: "Tier 1",
    business_area: "Manufacturing",
    risk_domain: "Availability",
    likelihood: "Medium",
    impact: "High",
    annual_loss_exposure_m: 2.7,
    previous_annual_loss_exposure_m: 3.0,
    risk_reduction_m: 1.0,
    mitigation_cost_m: 0.45,
    residual_exposure_m: 1.6,
    accepted_risk_m: 0.2,
    implementation_effort: "Medium",
    mitigation_status: "Implemented",
    exposure_range: "$2M-$4M",
    time_period: "Q1 2026",
    mitigation_action: "Isolate critical production workloads",
    required_decision: "Maintain funded recovery drills",
    acceptance_owner: "CISO",
    expiry_date: "2027-01-31",
    review_status: "Annual Review",
    required_action: "Keep residual acceptance under threshold",
    fair_lef: 2.0,
    fair_plm_m: 1.4
  },
  {
    scenario_id: "SCN-006",
    scenario_name: "Procurement Workflow Tampering",
    scenario_type: "Fraud",
    supplier_id: "SUP-005",
    supplier_name: "Procurement Platform E",
    supplier_tier: "Tier 2",
    business_area: "Procurement",
    risk_domain: "Integrity",
    likelihood: "Low",
    impact: "Medium",
    annual_loss_exposure_m: 1.2,
    previous_annual_loss_exposure_m: 1.4,
    risk_reduction_m: 0.5,
    mitigation_cost_m: 0.2,
    residual_exposure_m: 0.7,
    accepted_risk_m: 0.25,
    implementation_effort: "Low",
    mitigation_status: "Implemented",
    exposure_range: "$1M-$2M",
    time_period: "Q1 2026",
    mitigation_action: "Add approval anomaly detection",
    required_decision: "Retain controls and monitor variance",
    acceptance_owner: "Finance Risk",
    expiry_date: "2026-08-31",
    review_status: "Quarterly Review",
    required_action: "Confirm acceptance owner at next review",
    fair_lef: 1.4,
    fair_plm_m: 0.9
  },
  {
    scenario_id: "SCN-007",
    scenario_name: "Payment Processing Outage",
    scenario_type: "Operational Outage",
    supplier_id: "SUP-009",
    supplier_name: "Payments Gateway I",
    supplier_tier: "Tier 1",
    business_area: "Revenue Operations",
    risk_domain: "Availability",
    likelihood: "Medium",
    impact: "Very High",
    annual_loss_exposure_m: 4.1,
    previous_annual_loss_exposure_m: 3.7,
    risk_reduction_m: 1.5,
    mitigation_cost_m: 0.9,
    residual_exposure_m: 2.6,
    accepted_risk_m: 0.7,
    implementation_effort: "High",
    mitigation_status: "Planned",
    exposure_range: ">$4M",
    time_period: "Q1 2026",
    mitigation_action: "Implement active-active failover",
    required_decision: "Authorize high-cost resilience uplift",
    acceptance_owner: "COO",
    expiry_date: "2026-07-31",
    review_status: "Monthly Review",
    required_action: "Escalate delayed investment decision",
    fair_lef: 2.6,
    fair_plm_m: 1.6
  },
  {
    scenario_id: "SCN-008",
    scenario_name: "Data Residency Non-Compliance",
    scenario_type: "Regulatory",
    supplier_id: "SUP-010",
    supplier_name: "Data Hosting J",
    supplier_tier: "Tier 2",
    business_area: "Legal & Compliance",
    risk_domain: "Regulatory",
    likelihood: "Low",
    impact: "High",
    annual_loss_exposure_m: 1.8,
    previous_annual_loss_exposure_m: 2.0,
    risk_reduction_m: 0.8,
    mitigation_cost_m: 0.25,
    residual_exposure_m: 0.9,
    accepted_risk_m: 0.3,
    implementation_effort: "Low",
    mitigation_status: "In Progress",
    exposure_range: "$1M-$2M",
    time_period: "Q1 2026",
    mitigation_action: "Migrate regulated datasets",
    required_decision: "Keep migration priority at governance forum",
    acceptance_owner: "General Counsel",
    expiry_date: "2026-10-31",
    review_status: "Quarterly Review",
    required_action: "Renew acceptance only with migration evidence",
    fair_lef: 1.2,
    fair_plm_m: 1.5
  }
];

let exposureByScenarioChart = null;
let riskReductionVsCostChart = null;

function setSelectOptions(select, values) {
  const options = ["All", ...new Set(values)].filter(Boolean);
  select.innerHTML = options.map((value) => `<option value="${value}">${value}</option>`).join("");
}

function formatMoneyM(value) {
  return `$${value.toFixed(1)}M`;
}

function getPillClass(value) {
  if (["High", "Very High", "Open", "Overdue"].includes(value)) return "pill pill-red";
  if (["Medium", "In Progress", "Planned"].includes(value)) return "pill pill-amber";
  return "pill pill-green";
}

function setTrend(id, currentValue, previousValue, preferredDirection, suffix = "") {
  const node = document.getElementById(id);
  if (!node || previousValue == null || Number.isNaN(previousValue)) return;

  const delta = currentValue - previousValue;

  if (delta === 0) {
    node.className = "kpi-trend trend-warn";
    node.textContent = `flat 0${suffix} vs prior period`;
    return;
  }

  const isIncrease = delta > 0;
  const direction = isIncrease ? "up" : "down";
  let isGood;

  if (preferredDirection === "higher") {
    isGood = isIncrease;
  } else if (preferredDirection === "lower") {
    isGood = !isIncrease;
  } else if (preferredDirection === "negative") {
    isGood = delta < 0;
  } else {
    node.className = "kpi-trend trend-warn";
    node.textContent = `${direction} ${Math.abs(delta).toFixed(1)}${suffix} contextual`;
    return;
  }

  node.className = `kpi-trend ${isGood ? "trend-good" : "trend-bad"}`;
  node.textContent = `${direction} ${Math.abs(delta).toFixed(1)}${suffix} vs prior period`;
}

function filterData(state) {
  return riskQuantificationData.filter((record) => {
    const scenarioTypeMatch = state.scenarioType === "All" || record.scenario_type === state.scenarioType;
    const businessAreaMatch = state.businessArea === "All" || record.business_area === state.businessArea;
    const supplierTierMatch = state.supplierTier === "All" || record.supplier_tier === state.supplierTier;
    const riskDomainMatch = state.riskDomain === "All" || record.risk_domain === state.riskDomain;
    const mitigationStatusMatch = state.mitigationStatus === "All" || record.mitigation_status === state.mitigationStatus;
    const exposureRangeMatch = state.exposureRange === "All" || record.exposure_range === state.exposureRange;
    const timePeriodMatch = state.timePeriod === "All" || record.time_period === state.timePeriod;

    return scenarioTypeMatch && businessAreaMatch && supplierTierMatch && riskDomainMatch && mitigationStatusMatch && exposureRangeMatch && timePeriodMatch;
  });
}

function renderKpis(filtered) {
  const annualLossExposure = filtered.reduce((sum, record) => sum + record.annual_loss_exposure_m, 0);
  const previousAnnualLossExposure = filtered.reduce((sum, record) => sum + record.previous_annual_loss_exposure_m, 0);

  const exposureTrendPercent = previousAnnualLossExposure > 0
    ? ((annualLossExposure - previousAnnualLossExposure) / previousAnnualLossExposure) * 100
    : 0;

  const topScenarioExposure = filtered.length
    ? Math.max(...filtered.map((record) => record.annual_loss_exposure_m))
    : 0;
  const previousTopScenarioExposure = filtered.length
    ? Math.max(...filtered.map((record) => record.previous_annual_loss_exposure_m))
    : 0;

  const riskReductionOpportunity = filtered.reduce((sum, record) => sum + record.risk_reduction_m, 0);
  const previousRiskReductionOpportunity = Math.max(riskReductionOpportunity - 0.7, 0);

  const mitigationCost = filtered.reduce((sum, record) => sum + record.mitigation_cost_m, 0);
  const previousMitigationCost = Math.max(mitigationCost - 0.3, 0);

  const controlRoi = mitigationCost > 0 ? riskReductionOpportunity / mitigationCost : 0;
  const previousControlRoi = previousMitigationCost > 0
    ? previousRiskReductionOpportunity / previousMitigationCost
    : controlRoi;

  const residualExposure = filtered.reduce((sum, record) => sum + record.residual_exposure_m, 0);
  const previousResidualExposure = Math.max(residualExposure + 0.4, 0);

  const acceptedRiskExposure = filtered.reduce((sum, record) => sum + record.accepted_risk_m, 0);
  const previousAcceptedRiskExposure = Math.max(acceptedRiskExposure + 0.2, 0);

  document.getElementById("annualLossExposure").textContent = formatMoneyM(annualLossExposure);
  document.getElementById("exposureTrend").textContent = `${exposureTrendPercent.toFixed(1)}%`;
  document.getElementById("topScenarioExposure").textContent = formatMoneyM(topScenarioExposure);
  document.getElementById("riskReductionOpportunity").textContent = formatMoneyM(riskReductionOpportunity);
  document.getElementById("mitigationCost").textContent = formatMoneyM(mitigationCost);
  document.getElementById("controlRoi").textContent = `${controlRoi.toFixed(1)}x`;
  document.getElementById("residualExposure").textContent = formatMoneyM(residualExposure);
  document.getElementById("acceptedRiskExposure").textContent = formatMoneyM(acceptedRiskExposure);

  setTrend("annualLossExposureTrend", annualLossExposure, previousAnnualLossExposure, "lower", "M");
  setTrend("exposureTrendTrend", exposureTrendPercent, 0, "negative", "%");
  setTrend("topScenarioExposureTrend", topScenarioExposure, previousTopScenarioExposure, "lower", "M");
  setTrend("riskReductionOpportunityTrend", riskReductionOpportunity, previousRiskReductionOpportunity, "higher", "M");

  const mitigationNode = document.getElementById("mitigationCostTrend");
  mitigationNode.className = "kpi-trend trend-warn";
  const mitigationDelta = mitigationCost - previousMitigationCost;
  const reductionDelta = riskReductionOpportunity - previousRiskReductionOpportunity;
  const mitigationDirection = mitigationDelta > 0 ? "up" : mitigationDelta < 0 ? "down" : "flat";
  mitigationNode.textContent = `${mitigationDirection} ${Math.abs(mitigationDelta).toFixed(1)}M contextual, paired reduction ${reductionDelta >= 0 ? "+" : ""}${reductionDelta.toFixed(1)}M`;

  setTrend("controlRoiTrend", controlRoi, previousControlRoi, "higher", "x");
  setTrend("residualExposureTrend", residualExposure, previousResidualExposure, "lower", "M");
  setTrend("acceptedRiskExposureTrend", acceptedRiskExposure, previousAcceptedRiskExposure, "lower", "M");
}

function renderTopSupplierRiskScenarios(filtered) {
  const tbody = document.querySelector("#topSupplierRiskScenariosTable tbody");
  tbody.innerHTML = "";

  filtered
    .slice()
    .sort((a, b) => b.annual_loss_exposure_m - a.annual_loss_exposure_m)
    .forEach((record) => {
      tbody.innerHTML += `
        <tr>
          <td>${record.scenario_name}</td>
          <td>${record.supplier_name}</td>
          <td>${record.business_area}</td>
          <td>${formatMoneyM(record.annual_loss_exposure_m)}</td>
          <td><span class="${getPillClass(record.likelihood)}">${record.likelihood}</span></td>
          <td><span class="${getPillClass(record.impact)}">${record.impact}</span></td>
          <td>${formatMoneyM(record.residual_exposure_m)}</td>
          <td>${record.required_decision}</td>
        </tr>
      `;
    });
}

function renderMitigationInvestment(filtered) {
  const tbody = document.querySelector("#mitigationInvestmentTable tbody");
  tbody.innerHTML = "";

  filtered
    .slice()
    .sort((a, b) => (b.risk_reduction_m / b.mitigation_cost_m) - (a.risk_reduction_m / a.mitigation_cost_m))
    .forEach((record) => {
      const roi = record.mitigation_cost_m > 0 ? record.risk_reduction_m / record.mitigation_cost_m : 0;

      tbody.innerHTML += `
        <tr>
          <td>${record.mitigation_action}</td>
          <td>${record.scenario_name}</td>
          <td>${formatMoneyM(record.mitigation_cost_m)}</td>
          <td>${formatMoneyM(record.risk_reduction_m)}</td>
          <td>${roi.toFixed(1)}x</td>
          <td><span class="${getPillClass(record.implementation_effort)}">${record.implementation_effort}</span></td>
          <td>${record.required_decision}</td>
        </tr>
      `;
    });
}

function renderAcceptedRiskRegister(filtered) {
  const tbody = document.querySelector("#acceptedRiskRegisterTable tbody");
  tbody.innerHTML = "";

  filtered
    .filter((record) => record.accepted_risk_m > 0)
    .forEach((record) => {
      tbody.innerHTML += `
        <tr>
          <td>${record.scenario_name}</td>
          <td>${record.supplier_name}</td>
          <td>${formatMoneyM(record.accepted_risk_m)}</td>
          <td>${record.acceptance_owner}</td>
          <td>${record.expiry_date}</td>
          <td><span class="${getPillClass(record.review_status)}">${record.review_status}</span></td>
          <td>${record.required_action}</td>
        </tr>
      `;
    });
}

function renderFairInputs(filtered) {
  const tbody = document.querySelector("#fairInputsTable tbody");
  tbody.innerHTML = "";

  filtered
    .slice()
    .sort((a, b) => b.annual_loss_exposure_m - a.annual_loss_exposure_m)
    .slice(0, 4)
    .forEach((record) => {
      const expectedLoss = record.fair_lef * record.fair_plm_m;
      tbody.innerHTML += `
        <tr>
          <td>${record.scenario_name}</td>
          <td>${record.fair_lef.toFixed(1)}</td>
          <td>${formatMoneyM(record.fair_plm_m)}</td>
          <td>${formatMoneyM(expectedLoss)}</td>
        </tr>
      `;
    });
}

function renderCharts(filtered) {
  if (exposureByScenarioChart) exposureByScenarioChart.destroy();
  if (riskReductionVsCostChart) riskReductionVsCostChart.destroy();

  const scenarioTotals = filtered.reduce((accumulator, record) => {
    accumulator[record.scenario_name] = (accumulator[record.scenario_name] || 0) + record.annual_loss_exposure_m;
    return accumulator;
  }, {});

  const scenarioLabels = Object.keys(scenarioTotals);
  const scenarioValues = Object.values(scenarioTotals);

  exposureByScenarioChart = new Chart(document.getElementById("exposureByScenarioChart"), {
    type: "bar",
    data: {
      labels: scenarioLabels,
      datasets: [
        {
          label: "Annual Loss Exposure ($M)",
          data: scenarioValues
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      }
    }
  });

  riskReductionVsCostChart = new Chart(document.getElementById("riskReductionVsCostChart"), {
    type: "scatter",
    data: {
      datasets: [
        {
          label: "Mitigation Portfolio",
          data: filtered.map((record) => ({ x: record.mitigation_cost_m, y: record.risk_reduction_m })),
          pointRadius: 6
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        x: {
          title: { display: true, text: "Mitigation Cost ($M)" }
        },
        y: {
          title: { display: true, text: "Risk Reduction ($M)" }
        }
      }
    }
  });
}

function applyFilters(state) {
  const filtered = filterData(state);

  renderKpis(filtered);
  renderTopSupplierRiskScenarios(filtered);
  renderMitigationInvestment(filtered);
  renderAcceptedRiskRegister(filtered);
  renderFairInputs(filtered);
  renderCharts(filtered);

  document.getElementById("filterSummary").textContent =
    `Showing ${filtered.length} of ${riskQuantificationData.length} scenarios`;
}

function initFilters() {
  const scenarioTypeSelect = document.getElementById("filterScenarioType");
  const businessAreaSelect = document.getElementById("filterBusinessArea");
  const supplierTierSelect = document.getElementById("filterSupplierTier");
  const riskDomainSelect = document.getElementById("filterRiskDomain");
  const mitigationStatusSelect = document.getElementById("filterMitigationStatus");
  const exposureRangeSelect = document.getElementById("filterExposureRange");
  const timePeriodSelect = document.getElementById("filterTimePeriod");
  const clearButton = document.getElementById("clearFilters");

  setSelectOptions(scenarioTypeSelect, riskQuantificationData.map((record) => record.scenario_type));
  setSelectOptions(businessAreaSelect, riskQuantificationData.map((record) => record.business_area));
  setSelectOptions(supplierTierSelect, riskQuantificationData.map((record) => record.supplier_tier));
  setSelectOptions(riskDomainSelect, riskQuantificationData.map((record) => record.risk_domain));
  setSelectOptions(mitigationStatusSelect, riskQuantificationData.map((record) => record.mitigation_status));
  setSelectOptions(exposureRangeSelect, riskQuantificationData.map((record) => record.exposure_range));
  setSelectOptions(timePeriodSelect, riskQuantificationData.map((record) => record.time_period));

  function applyFromUi() {
    applyFilters({
      scenarioType: scenarioTypeSelect.value,
      businessArea: businessAreaSelect.value,
      supplierTier: supplierTierSelect.value,
      riskDomain: riskDomainSelect.value,
      mitigationStatus: mitigationStatusSelect.value,
      exposureRange: exposureRangeSelect.value,
      timePeriod: timePeriodSelect.value
    });
  }

  scenarioTypeSelect.addEventListener("change", applyFromUi);
  businessAreaSelect.addEventListener("change", applyFromUi);
  supplierTierSelect.addEventListener("change", applyFromUi);
  riskDomainSelect.addEventListener("change", applyFromUi);
  mitigationStatusSelect.addEventListener("change", applyFromUi);
  exposureRangeSelect.addEventListener("change", applyFromUi);
  timePeriodSelect.addEventListener("change", applyFromUi);

  clearButton.addEventListener("click", () => {
    scenarioTypeSelect.value = "All";
    businessAreaSelect.value = "All";
    supplierTierSelect.value = "All";
    riskDomainSelect.value = "All";
    mitigationStatusSelect.value = "All";
    exposureRangeSelect.value = "All";
    timePeriodSelect.value = "All";
    applyFromUi();
  });

  applyFromUi();
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

addCardHoverEffect();
initFilters();
