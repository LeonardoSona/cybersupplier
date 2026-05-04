const dependencySummary = {
  fourth_parties_identified: 248,
  tier_one_dependencies_mapped_percent: 61,
  cloud_concentration: "High",
  single_points_failure: 11,
  country_concentration: "Medium",
  dependency_change_events: 23
};

const dependencyConcentrations = [
  {
    dependency: "Microsoft Azure",
    type: "Cloud Provider",
    critical_suppliers: 18,
    risk: "High",
    exposure_m: 5.8
  },
  {
    dependency: "AWS",
    type: "Cloud Provider",
    critical_suppliers: 14,
    risk: "Medium",
    exposure_m: 3.1
  },
  {
    dependency: "Managed Identity Provider X",
    type: "Identity Service",
    critical_suppliers: 9,
    risk: "High",
    exposure_m: 4.4
  },
  {
    dependency: "Shared Hosting Provider Y",
    type: "Hosting",
    critical_suppliers: 7,
    risk: "High",
    exposure_m: 3.6
  },
  {
    dependency: "EU Data Processing Cluster",
    type: "Geography",
    critical_suppliers: 11,
    risk: "Medium",
    exposure_m: 2.7
  },
  {
    dependency: "Offshore Support Center Z",
    type: "Operational Support",
    critical_suppliers: 6,
    risk: "Medium",
    exposure_m: 1.9
  }
];

const supplierDependencies = [
  {
    supplier: "CloudOps Partner A",
    tier: "Tier 1",
    dependency: "Microsoft Azure",
    dependency_risk: "High",
    service_impact: "Cloud operations"
  },
  {
    supplier: "Clinical Data Vendor B",
    tier: "Tier 1",
    dependency: "EU Data Processing Cluster",
    dependency_risk: "Medium",
    service_impact: "Clinical data processing"
  },
  {
    supplier: "Identity Services F",
    tier: "Tier 1",
    dependency: "Managed Identity Provider X",
    dependency_risk: "High",
    service_impact: "Authentication services"
  },
  {
    supplier: "Logistics Provider C",
    tier: "Tier 2",
    dependency: "Shared Hosting Provider Y",
    dependency_risk: "High",
    service_impact: "Logistics scheduling"
  },
  {
    supplier: "Manufacturing SaaS D",
    tier: "Tier 1",
    dependency: "AWS",
    dependency_risk: "Medium",
    service_impact: "Manufacturing workflows"
  },
  {
    supplier: "Procurement Platform E",
    tier: "Tier 2",
    dependency: "Offshore Support Center Z",
    dependency_risk: "Medium",
    service_impact: "Procurement support"
  }
];

const cascadingScenarios = [
  {
    scenario: "Azure regional outage affecting critical suppliers",
    affected_suppliers: 18,
    business_area: "Technology / R&D / Supply Chain",
    exposure_m: 5.8,
    priority: "High"
  },
  {
    scenario: "Identity provider compromise across supplier ecosystem",
    affected_suppliers: 9,
    business_area: "Technology",
    exposure_m: 4.4,
    priority: "High"
  },
  {
    scenario: "Shared hosting provider breach",
    affected_suppliers: 7,
    business_area: "Supply Chain / Commercial",
    exposure_m: 3.6,
    priority: "High"
  },
  {
    scenario: "EU data processing disruption",
    affected_suppliers: 11,
    business_area: "R&D / Clinical",
    exposure_m: 2.7,
    priority: "Medium"
  }
];

const dependencyAiAlerts = [
  {
    value: "Azure cluster",
    detail: "Highest dependency concentration across Tier 1 suppliers"
  },
  {
    value: "9 suppliers",
    detail: "Potential cascading impact from identity provider compromise"
  },
  {
    value: "11 services",
    detail: "Detected as single-supplier resilience exposure"
  }
];

let dependencyConcentrationChart = null;
let fourthPartyRiskChart = null;

function setSelectOptions(select, values) {
  const options = ["All", ...new Set(values)].filter(Boolean);
  select.innerHTML = options.map(value => `<option value="${value}">${value}</option>`).join("");
}

function normalizeDependencyType(type) {
  if (type === "Cloud Provider") return "Cloud";
  if (type === "Identity Service") return "Identity";
  if (type === "Geography") return "Geography";
  return "Fourth-party";
}

function scenarioMatchesDependency(scenario, concentration) {
  const text = scenario.scenario.toLowerCase();
  const dependencyType = normalizeDependencyType(concentration.type);

  if (dependencyType === "Cloud") {
    return text.includes("azure") || text.includes("cloud");
  }

  if (dependencyType === "Identity") {
    return text.includes("identity provider") || text.includes("identity");
  }

  if (dependencyType === "Geography") {
    return text.includes("eu data") || text.includes("data processing");
  }

  return text.includes("hosting") || text.includes("shared") || text.includes("support");
}

function getPillClass(value) {
  if (["High", "Critical"].includes(value)) return "pill pill-red";
  if (["Medium", "At Risk"].includes(value)) return "pill pill-amber";
  return "pill pill-green";
}

function filterDependencyData(state) {
  const filteredSupplierDependencies = supplierDependencies.filter(item => {
    const concentration = dependencyConcentrations.find(entry => entry.dependency === item.dependency);
    const dependencyType = concentration ? normalizeDependencyType(concentration.type) : "Fourth-party";
    const tierMatch = state.tier === "All" || item.tier === state.tier;
    const riskMatch = state.risk === "All" || item.dependency_risk === state.risk;
    const dependencyTypeMatch = state.dependencyType === "All" || dependencyType === state.dependencyType;
    const criticalOnlyMatch = state.criticalOnly === "All" || item.tier === "Tier 1";
    return tierMatch && riskMatch && dependencyTypeMatch && criticalOnlyMatch;
  });

  const dependencies = new Set(filteredSupplierDependencies.map(item => item.dependency));
  const filteredConcentrations = dependencyConcentrations.filter(item => {
    const dependencyTypeMatch = state.dependencyType === "All" || normalizeDependencyType(item.type) === state.dependencyType;
    const riskMatch = state.risk === "All" || item.risk === state.risk;
    const criticalOnlyMatch = state.criticalOnly === "All" || item.critical_suppliers >= 8;
    return dependencies.has(item.dependency) && dependencyTypeMatch && riskMatch && criticalOnlyMatch;
  });

  const filteredScenarios = cascadingScenarios.filter(item => {
    if (!filteredConcentrations.length) return false;
    return filteredConcentrations.some(concentration => scenarioMatchesDependency(item, concentration));
  });

  return { filteredSupplierDependencies, filteredConcentrations, filteredScenarios };
}

function renderDependencyKpis(filteredConcentrations, filteredScenarios) {
  const highRisk = filteredConcentrations.filter(d => d.risk === "High").length;

  const cascadingExposure = filteredScenarios.reduce(
    (sum, s) => sum + s.exposure_m,
    0
  );

  document.getElementById("fourthPartiesIdentified").textContent =
    dependencySummary.fourth_parties_identified;

  document.getElementById("tierOneMapped").textContent =
    `${dependencySummary.tier_one_dependencies_mapped_percent}%`;

  document.getElementById("highRiskDependencies").textContent = highRisk;

  document.getElementById("cloudConcentration").textContent =
    dependencySummary.cloud_concentration;

  document.getElementById("singlePointsFailure").textContent =
    dependencySummary.single_points_failure;

  document.getElementById("countryConcentration").textContent =
    dependencySummary.country_concentration;

  document.getElementById("cascadingExposure").textContent =
    `$${cascadingExposure.toFixed(1)}M`;

  document.getElementById("dependencyChanges").textContent =
    dependencySummary.dependency_change_events;
}

function renderDependencyConcentrationTable(filteredConcentrations) {
  const tbody = document.querySelector("#dependencyConcentrationTable tbody");
  tbody.innerHTML = "";

  filteredConcentrations
    .sort((a, b) => b.exposure_m - a.exposure_m)
    .forEach(item => {
      tbody.innerHTML += `
        <tr>
          <td>${item.dependency}</td>
          <td>${item.type}</td>
          <td>${item.critical_suppliers}</td>
          <td><span class="${getPillClass(item.risk)}">${item.risk}</span></td>
          <td>$${item.exposure_m.toFixed(1)}M</td>
        </tr>
      `;
    });
}

function renderSupplierDependencyTable(filteredSupplierDependencies) {
  const tbody = document.querySelector("#supplierDependencyTable tbody");
  tbody.innerHTML = "";

  filteredSupplierDependencies.forEach(item => {
    tbody.innerHTML += `
      <tr>
        <td>${item.supplier}</td>
        <td>${item.tier}</td>
        <td>${item.dependency}</td>
        <td><span class="${getPillClass(item.dependency_risk)}">${item.dependency_risk}</span></td>
        <td>${item.service_impact}</td>
      </tr>
    `;
  });
}

function renderCascadingScenarioTable(filteredScenarios) {
  const tbody = document.querySelector("#cascadingScenarioTable tbody");
  tbody.innerHTML = "";

  filteredScenarios
    .sort((a, b) => b.exposure_m - a.exposure_m)
    .forEach(item => {
      tbody.innerHTML += `
        <tr>
          <td>${item.scenario}</td>
          <td>${item.affected_suppliers}</td>
          <td>${item.business_area}</td>
          <td>$${item.exposure_m.toFixed(1)}M</td>
          <td><span class="${getPillClass(item.priority)}">${item.priority}</span></td>
        </tr>
      `;
    });
}

function renderDependencyAiAlerts() {
  const container = document.getElementById("dependencyAiAlerts");
  container.innerHTML = "";

  dependencyAiAlerts.forEach(alert => {
    container.innerHTML += `
      <div class="ai-item">
        <strong>${alert.value}</strong>
        <span>${alert.detail}</span>
      </div>
    `;
  });
}

function renderDependencyCharts(filteredConcentrations) {
  if (dependencyConcentrationChart) dependencyConcentrationChart.destroy();
  if (fourthPartyRiskChart) fourthPartyRiskChart.destroy();

  dependencyConcentrationChart = new Chart(document.getElementById("dependencyConcentrationChart"), {
    type: "bar",
    data: {
      labels: filteredConcentrations.map(d => d.dependency),
      datasets: [
        {
          label: "Critical Suppliers",
          data: filteredConcentrations.map(d => d.critical_suppliers)
        }
      ]
    },
    options: { maintainAspectRatio: false }
    });

  const riskLevels = ["High", "Medium", "Low"];

  fourthPartyRiskChart = new Chart(document.getElementById("fourthPartyRiskChart"), {
    type: "doughnut",
    data: {
      labels: riskLevels,
      datasets: [
        {
          data: riskLevels.map(level =>
            filteredConcentrations.filter(d => d.risk === level).length
          )
        }
      ]
    },
    options: { maintainAspectRatio: false }
    });
}

function applyFilters(state) {
  const { filteredSupplierDependencies, filteredConcentrations, filteredScenarios } = filterDependencyData(state);

  renderDependencyKpis(filteredConcentrations, filteredScenarios);
  renderDependencyConcentrationTable(filteredConcentrations);
  renderSupplierDependencyTable(filteredSupplierDependencies);
  renderCascadingScenarioTable(filteredScenarios);
  renderDependencyCharts(filteredConcentrations);

  document.getElementById("filterSummary").textContent =
    `Showing ${filteredSupplierDependencies.length} of ${supplierDependencies.length} supplier dependencies`;
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

renderDependencyAiAlerts();
addCardHoverEffect();

function renderExtendedDependencyKpis() {
  const ext = calculateMissingKpis();
  document.getElementById("cloudConcentrationRatio").textContent = ext.cloudConcentrationRatio;
  document.getElementById("fourthPartyConcentrationRatio").textContent = ext.fourthPartyConcentrationRatio;
}

renderExtendedDependencyKpis();

function initDependencyFilters() {
  const dependencyTypeSelect = document.getElementById("filterDependencyType");
  const tierSelect = document.getElementById("filterTier");
  const riskSelect = document.getElementById("filterRisk");
  const criticalOnlySelect = document.getElementById("filterCriticalOnly");
  const clearButton = document.getElementById("clearFilters");

  setSelectOptions(dependencyTypeSelect, dependencyConcentrations.map(item => normalizeDependencyType(item.type)));
  setSelectOptions(tierSelect, supplierDependencies.map(item => item.tier));
  setSelectOptions(riskSelect, dependencyConcentrations.map(item => item.risk));

  function applyFromUi() {
    applyFilters({
      dependencyType: dependencyTypeSelect.value,
      tier: tierSelect.value,
      risk: riskSelect.value,
      criticalOnly: criticalOnlySelect.value
    });
  }

  dependencyTypeSelect.addEventListener("change", applyFromUi);
  tierSelect.addEventListener("change", applyFromUi);
  riskSelect.addEventListener("change", applyFromUi);
  criticalOnlySelect.addEventListener("change", applyFromUi);

  clearButton.addEventListener("click", () => {
    dependencyTypeSelect.value = "All";
    tierSelect.value = "All";
    riskSelect.value = "All";
    criticalOnlySelect.value = "All";
    applyFromUi();
  });

  applyFromUi();
}

initDependencyFilters();