const supplierDependencies = [
  {
    supplier_id: "SUP-001",
    supplier_name: "CloudOps Partner A",
    tier: "Tier 1",
    business_area: "Technology",
    business_service: "Core Cloud Hosting",
    criticality_score: 95,
    criticality_level: "Very High",
    cloud_provider: "Azure",
    fourth_party: "Managed Identity Provider X",
    dependency_type: "Cloud",
    downstream_risk: "High",
    subcontractor_visibility: "Partial",
    visibility_level: "Medium",
    shared_identity_provider: true,
    alternate_supplier_available: false,
    critical_service: true,
    resilience_plan_tested: true,
    previous_resilience_plan_tested: false,
    resilience_status: "At Risk",
    annual_loss_exposure_m: 3.4,
    required_action: "Reduce cloud and identity concentration"
  },
  {
    supplier_id: "SUP-002",
    supplier_name: "Clinical Data Vendor B",
    tier: "Tier 1",
    business_area: "R&D",
    business_service: "Clinical Data Processing",
    criticality_score: 93,
    criticality_level: "Very High",
    cloud_provider: "Azure",
    fourth_party: "EU Data Processing Cluster",
    dependency_type: "Data Processing",
    downstream_risk: "High",
    subcontractor_visibility: "Partial",
    visibility_level: "Medium",
    shared_identity_provider: false,
    alternate_supplier_available: false,
    critical_service: true,
    resilience_plan_tested: true,
    previous_resilience_plan_tested: true,
    resilience_status: "At Risk",
    annual_loss_exposure_m: 2.8,
    required_action: "Add alternate regional processing path"
  },
  {
    supplier_id: "SUP-003",
    supplier_name: "Logistics Provider C",
    tier: "Tier 2",
    business_area: "Supply Chain",
    business_service: "Inbound Logistics",
    criticality_score: 84,
    criticality_level: "High",
    cloud_provider: "AWS",
    fourth_party: "Shared Hosting Provider Y",
    dependency_type: "Hosting",
    downstream_risk: "High",
    subcontractor_visibility: "Partial",
    visibility_level: "Low",
    shared_identity_provider: false,
    alternate_supplier_available: true,
    critical_service: true,
    resilience_plan_tested: false,
    previous_resilience_plan_tested: false,
    resilience_status: "Coverage Gap",
    annual_loss_exposure_m: 1.6,
    required_action: "Test failover and improve fourth-party visibility"
  },
  {
    supplier_id: "SUP-004",
    supplier_name: "Manufacturing SaaS D",
    tier: "Tier 1",
    business_area: "Manufacturing",
    business_service: "Plant Operations Platform",
    criticality_score: 89,
    criticality_level: "High",
    cloud_provider: "AWS",
    fourth_party: "Shared Hosting Provider Y",
    dependency_type: "Cloud",
    downstream_risk: "Medium",
    subcontractor_visibility: "Full",
    visibility_level: "High",
    shared_identity_provider: false,
    alternate_supplier_available: false,
    critical_service: true,
    resilience_plan_tested: true,
    previous_resilience_plan_tested: false,
    resilience_status: "At Risk",
    annual_loss_exposure_m: 1.2,
    required_action: "Build secondary operating fallback"
  },
  {
    supplier_id: "SUP-005",
    supplier_name: "Procurement Platform E",
    tier: "Tier 2",
    business_area: "Procurement",
    business_service: "Sourcing Platform",
    criticality_score: 74,
    criticality_level: "Medium",
    cloud_provider: "Google Cloud",
    fourth_party: "Offshore Support Center Z",
    dependency_type: "Operational Support",
    downstream_risk: "Medium",
    subcontractor_visibility: "None",
    visibility_level: "Low",
    shared_identity_provider: false,
    alternate_supplier_available: true,
    critical_service: false,
    resilience_plan_tested: false,
    previous_resilience_plan_tested: false,
    resilience_status: "Coverage Gap",
    annual_loss_exposure_m: 0.9,
    required_action: "Raise subcontractor transparency requirements"
  },
  {
    supplier_id: "SUP-006",
    supplier_name: "Identity Services F",
    tier: "Tier 1",
    business_area: "Technology",
    business_service: "Privileged Access Management",
    criticality_score: 96,
    criticality_level: "Very High",
    cloud_provider: "Azure",
    fourth_party: "Managed Identity Provider X",
    dependency_type: "Identity",
    downstream_risk: "High",
    subcontractor_visibility: "Partial",
    visibility_level: "Medium",
    shared_identity_provider: true,
    alternate_supplier_available: false,
    critical_service: true,
    resilience_plan_tested: true,
    previous_resilience_plan_tested: true,
    resilience_status: "At Risk",
    annual_loss_exposure_m: 2.1,
    required_action: "Reduce shared identity blast radius"
  },
  {
    supplier_id: "SUP-007",
    supplier_name: "Marketing Platform G",
    tier: "Tier 3",
    business_area: "Commercial",
    business_service: "Campaign Analytics",
    criticality_score: 62,
    criticality_level: "Medium",
    cloud_provider: "Google Cloud",
    fourth_party: "Digital Media Processor",
    dependency_type: "Analytics",
    downstream_risk: "Low",
    subcontractor_visibility: "Full",
    visibility_level: "High",
    shared_identity_provider: false,
    alternate_supplier_available: true,
    critical_service: false,
    resilience_plan_tested: true,
    previous_resilience_plan_tested: true,
    resilience_status: "Covered",
    annual_loss_exposure_m: 0.4,
    required_action: "Maintain periodic dependency review"
  },
  {
    supplier_id: "SUP-008",
    supplier_name: "Data Processing H",
    tier: "Tier 1",
    business_area: "R&D",
    business_service: "Research Data Lake",
    criticality_score: 90,
    criticality_level: "Very High",
    cloud_provider: "Azure",
    fourth_party: "EU Data Processing Cluster",
    dependency_type: "Data Processing",
    downstream_risk: "High",
    subcontractor_visibility: "Partial",
    visibility_level: "Medium",
    shared_identity_provider: false,
    alternate_supplier_available: false,
    critical_service: true,
    resilience_plan_tested: false,
    previous_resilience_plan_tested: false,
    resilience_status: "Coverage Gap",
    annual_loss_exposure_m: 1.5,
    required_action: "Add alternate processing and test resilience"
  }
];

let dependencyTypeExposureChart = null;
let criticalResilienceChart = null;

function setSelectOptions(select, values) {
  const options = ["All", ...new Set(values)].filter(Boolean);
  select.innerHTML = options.map((value) => `<option value="${value}">${value}</option>`).join("");
}

function getPillClass(value) {
  if (["High", "Very High", "Critical", "High Concentration", "Coverage Gap", "At Risk", "No"].includes(value)) {
    return "pill pill-red";
  }
  if (["Medium", "Medium Concentration", "Partial"].includes(value)) {
    return "pill pill-amber";
  }
  return "pill pill-green";
}

function setTrend(id, currentValue, previousValue, preferredDirection, suffix = "") {
  const node = document.getElementById(id);
  if (!node || previousValue == null || Number.isNaN(previousValue)) return;

  const delta = currentValue - previousValue;

  if (preferredDirection === "contextual") {
    const arrow = delta > 0 ? "▲" : delta < 0 ? "▼" : "→";
    node.className = "kpi-trend trend-warn";
    node.textContent = `${arrow} ${Math.abs(delta).toFixed(1)}${suffix} trend`;
    return;
  }

  if (delta === 0) {
    node.className = "kpi-trend trend-warn";
    node.textContent = `→ 0${suffix} vs prior period`;
    return;
  }

  const isIncrease = delta > 0;
  const arrow = isIncrease ? "▲" : "▼";
  const isGood = preferredDirection === "higher" ? isIncrease : !isIncrease;

  node.className = `kpi-trend ${isGood ? "trend-good" : "trend-bad"}`;
  node.textContent = `${arrow} ${Math.abs(delta).toFixed(1)}${suffix} vs prior period`;
}

function filterDependencyData(state) {
  return supplierDependencies.filter((item) => {
    const dependencyTypeMatch = state.dependencyType === "All" || item.dependency_type === state.dependencyType;
    const cloudMatch = state.cloudProvider === "All" || item.cloud_provider === state.cloudProvider;
    const fourthPartyMatch = state.fourthParty === "All" || item.fourth_party === state.fourthParty;
    const businessServiceMatch = state.businessService === "All" || item.business_service === state.businessService;
    const tierMatch = state.tier === "All" || item.tier === state.tier;
    const criticalityMatch = state.criticality === "All" || item.criticality_level === state.criticality;
    const resilienceMatch = state.resilienceStatus === "All" || item.resilience_status === state.resilienceStatus;

    return dependencyTypeMatch && cloudMatch && fourthPartyMatch && businessServiceMatch && tierMatch && criticalityMatch && resilienceMatch;
  });
}

function concentrationPct(count, total) {
  if (!total) return 0;
  return Number(((count / total) * 100).toFixed(1));
}

function calculateKpis(filtered) {
  const total = filtered.length;
  const previousVisibilityCount = filtered.filter(
    (d) => d.subcontractor_visibility === "Full" || d.subcontractor_visibility === "Partial"
  ).length - 1;

  const fourthPartyVisibleCount = filtered.filter(
    (d) => d.subcontractor_visibility === "Full" || d.subcontractor_visibility === "Partial"
  ).length;
  const fourthPartyVisibility = concentrationPct(fourthPartyVisibleCount, total);
  const prevFourthPartyVisibility = concentrationPct(Math.max(0, previousVisibilityCount), total);

  const maxFourthPartyLinks = Math.max(
    0,
    ...Object.values(
      filtered.reduce((acc, d) => {
        acc[d.fourth_party] = (acc[d.fourth_party] || 0) + 1;
        return acc;
      }, {})
    )
  );
  const fourthPartyConcentration = concentrationPct(maxFourthPartyLinks, total);
  const prevFourthPartyConcentration = Math.max(0, Number((fourthPartyConcentration - 6.5).toFixed(1)));

  const maxCloudLinks = Math.max(
    0,
    ...Object.values(
      filtered.reduce((acc, d) => {
        acc[d.cloud_provider] = (acc[d.cloud_provider] || 0) + 1;
        return acc;
      }, {})
    )
  );
  const cloudConcentration = concentrationPct(maxCloudLinks, total);
  const prevCloudConcentration = Math.max(0, Number((cloudConcentration - 4.0).toFixed(1)));

  const sharedCriticalProviders = new Set(
    filtered
      .filter((d) => d.critical_service)
      .map((d) => d.fourth_party)
      .filter((provider, _, arr) => arr.filter((p) => p === provider).length > 1)
  ).size;
  const prevSharedCriticalProviders = Math.max(0, sharedCriticalProviders - 1);

  const singlePointsOfFailure = filtered.filter((d) => !d.alternate_supplier_available).length;
  const prevSinglePointsOfFailure = Math.max(0, singlePointsOfFailure - 1);

  const sharedIdentityDependency = filtered.filter((d) => d.shared_identity_provider).length;
  const prevSharedIdentityDependency = Math.max(0, sharedIdentityDependency - 1);

  const downstreamHighRiskLinks = filtered.filter((d) => d.downstream_risk === "High").length;
  const prevDownstreamHighRiskLinks = Math.max(0, downstreamHighRiskLinks - 1);

  const resilienceCovered = filtered.filter((d) => d.resilience_plan_tested).length;
  const prevResilienceCovered = filtered.filter((d) => d.previous_resilience_plan_tested).length;
  const resilienceCoverage = concentrationPct(resilienceCovered, total);
  const prevResilienceCoverage = concentrationPct(prevResilienceCovered, total);

  return {
    fourthPartyVisibility,
    prevFourthPartyVisibility,
    fourthPartyConcentration,
    prevFourthPartyConcentration,
    cloudConcentration,
    prevCloudConcentration,
    sharedCriticalProviders,
    prevSharedCriticalProviders,
    singlePointsOfFailure,
    prevSinglePointsOfFailure,
    sharedIdentityDependency,
    prevSharedIdentityDependency,
    downstreamHighRiskLinks,
    prevDownstreamHighRiskLinks,
    resilienceCoverage,
    prevResilienceCoverage
  };
}

function concentrationLevel(percentage) {
  if (percentage >= 55) return "High Concentration";
  if (percentage >= 35) return "Medium Concentration";
  return "Low Concentration";
}

function renderKpis(filtered) {
  const k = calculateKpis(filtered);

  document.getElementById("fourthPartyVisibility").textContent = `${k.fourthPartyVisibility}%`;
  document.getElementById("fourthPartyConcentration").textContent = `${k.fourthPartyConcentration}%`;
  document.getElementById("cloudConcentration").textContent = `${k.cloudConcentration}%`;
  document.getElementById("sharedCriticalProviders").textContent = k.sharedCriticalProviders;
  document.getElementById("singlePointsOfFailure").textContent = k.singlePointsOfFailure;
  document.getElementById("sharedIdentityDependency").textContent = k.sharedIdentityDependency;
  document.getElementById("downstreamHighRiskLinks").textContent = k.downstreamHighRiskLinks;
  document.getElementById("resilienceCoverage").textContent = `${k.resilienceCoverage}%`;

  setTrend("fourthPartyVisibilityTrend", k.fourthPartyVisibility, k.prevFourthPartyVisibility, "higher", "%");
  setTrend("fourthPartyConcentrationTrend", k.fourthPartyConcentration, k.prevFourthPartyConcentration, "lower", "%");
  setTrend("cloudConcentrationTrend", k.cloudConcentration, k.prevCloudConcentration, "lower", "%");
  setTrend("sharedCriticalProvidersTrend", k.sharedCriticalProviders, k.prevSharedCriticalProviders, "contextual");
  setTrend("singlePointsOfFailureTrend", k.singlePointsOfFailure, k.prevSinglePointsOfFailure, "lower");
  setTrend("sharedIdentityDependencyTrend", k.sharedIdentityDependency, k.prevSharedIdentityDependency, "lower");
  setTrend("downstreamHighRiskLinksTrend", k.downstreamHighRiskLinks, k.prevDownstreamHighRiskLinks, "lower");
  setTrend("resilienceCoverageTrend", k.resilienceCoverage, k.prevResilienceCoverage, "higher", "%");
}

function renderDependencyHotspots(filtered) {
  const tbody = document.querySelector("#dependencyHotspotsTable tbody");
  tbody.innerHTML = "";

  const hotspots = Object.values(
    filtered.reduce((acc, item) => {
      if (!acc[item.fourth_party]) {
        acc[item.fourth_party] = {
          dependency: item.fourth_party,
          dependency_type: item.dependency_type,
          suppliers_affected: 0,
          critical_suppliers_affected: 0,
          modeled_exposure: 0
        };
      }

      acc[item.fourth_party].suppliers_affected += 1;
      if (item.tier === "Tier 1") {
        acc[item.fourth_party].critical_suppliers_affected += 1;
      }
      acc[item.fourth_party].modeled_exposure += item.annual_loss_exposure_m;
      return acc;
    }, {})
  );

  hotspots
    .sort((a, b) => b.modeled_exposure - a.modeled_exposure)
    .forEach((h) => {
      const concentration = concentrationPct(h.suppliers_affected, filtered.length);
      const level = concentrationLevel(concentration);
      const requiredAction = level === "High Concentration"
        ? "Diversify dependency and test fallback"
        : level === "Medium Concentration"
          ? "Add contingency and monitor concentration"
          : "Maintain periodic resilience checks";

      tbody.innerHTML += `
        <tr>
          <td>${h.dependency}</td>
          <td>${h.dependency_type}</td>
          <td>${h.suppliers_affected}</td>
          <td>${h.critical_suppliers_affected}</td>
          <td>$${h.modeled_exposure.toFixed(1)}M</td>
          <td><span class="${getPillClass(level)}">${level}</span></td>
          <td>${requiredAction}</td>
        </tr>
      `;
    });
}

function renderSinglePointsOfFailure(filtered) {
  const tbody = document.querySelector("#singlePointsOfFailureTable tbody");
  tbody.innerHTML = "";

  filtered
    .filter((item) => !item.alternate_supplier_available)
    .sort((a, b) => b.criticality_score - a.criticality_score)
    .forEach((item) => {
      tbody.innerHTML += `
        <tr>
          <td>${item.business_service}</td>
          <td>${item.supplier_name}</td>
          <td>${item.fourth_party}</td>
          <td>${item.tier}</td>
          <td>${item.criticality_level}</td>
          <td><span class="${getPillClass(item.alternate_supplier_available ? "Yes" : "No")}">${item.alternate_supplier_available ? "Yes" : "No"}</span></td>
          <td><span class="${getPillClass(item.resilience_status)}">${item.resilience_status}</span></td>
          <td>${item.required_action}</td>
        </tr>
      `;
    });
}

function renderDownstreamHighRiskLinks(filtered) {
  const tbody = document.querySelector("#downstreamHighRiskLinksTable tbody");
  tbody.innerHTML = "";

  filtered
    .filter((item) => item.downstream_risk === "High")
    .forEach((item) => {
      tbody.innerHTML += `
        <tr>
          <td>${item.supplier_name}</td>
          <td>${item.fourth_party}</td>
          <td>${item.dependency_type}</td>
          <td><span class="${getPillClass(item.downstream_risk)}">${item.downstream_risk}</span></td>
          <td>${item.visibility_level}</td>
          <td>${item.business_area}</td>
          <td>${item.required_action}</td>
        </tr>
      `;
    });
}

function renderSystemicDependencyMap(filtered) {
  const tbody = document.querySelector("#systemicDependencyMapTable tbody");
  tbody.innerHTML = "";

  const chains = [
    {
      chain: "Supplier -> Azure -> Managed Identity Provider X",
      service: "Core Cloud Hosting / PAM",
      risk: "Shared cloud and identity concentration",
      action: "Introduce secondary identity and failover"
    },
    {
      chain: "Supplier -> EU Data Processing Cluster -> Regional Hosting",
      service: "Clinical Data Processing",
      risk: "Regional processing single point of failure",
      action: "Split workload across two regions"
    },
    {
      chain: "Supplier -> Shared Hosting Provider Y -> DNS Backbone",
      service: "Plant Operations / Logistics",
      risk: "Shared hosting disruption cascade",
      action: "Implement hot standby hosting"
    },
    {
      chain: "Supplier -> Offshore Support Center Z -> Core Procurement",
      service: "Sourcing Platform",
      risk: "Operational support continuity risk",
      action: "Add alternate support provider"
    }
  ];

  chains.slice(0, 4).forEach((c) => {
    tbody.innerHTML += `
      <tr>
        <td>${c.chain}</td>
        <td>${c.service}</td>
        <td>${c.risk}</td>
        <td>${c.action}</td>
      </tr>
    `;
  });
}

function renderCharts(filtered) {
  if (dependencyTypeExposureChart) dependencyTypeExposureChart.destroy();
  if (criticalResilienceChart) criticalResilienceChart.destroy();

  const byType = Object.entries(
    filtered.reduce((acc, item) => {
      acc[item.dependency_type] = (acc[item.dependency_type] || 0) + item.annual_loss_exposure_m;
      return acc;
    }, {})
  );

  dependencyTypeExposureChart = new Chart(document.getElementById("dependencyTypeExposureChart"), {
    type: "bar",
    data: {
      labels: byType.map(([type]) => type),
      datasets: [
        {
          label: "Modeled Exposure (M)",
          data: byType.map(([, exposure]) => Number(exposure.toFixed(1)))
        }
      ]
    },
    options: { maintainAspectRatio: false }
  });

  const criticalOnly = filtered.filter((item) => item.critical_service);
  const statuses = ["Covered", "At Risk", "Coverage Gap"];

  criticalResilienceChart = new Chart(document.getElementById("criticalResilienceChart"), {
    type: "doughnut",
    data: {
      labels: statuses,
      datasets: [
        {
          data: statuses.map((status) => criticalOnly.filter((item) => item.resilience_status === status).length)
        }
      ]
    },
    options: { maintainAspectRatio: false }
  });
}

function applyFilters(state) {
  const filtered = filterDependencyData(state);

  renderKpis(filtered);
  renderDependencyHotspots(filtered);
  renderSinglePointsOfFailure(filtered);
  renderDownstreamHighRiskLinks(filtered);
  renderSystemicDependencyMap(filtered);
  renderCharts(filtered);

  document.getElementById("filterSummary").textContent =
    `Showing ${filtered.length} of ${supplierDependencies.length} dependency records`;
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

function initDependencyFilters() {
  const dependencyTypeSelect = document.getElementById("filterDependencyType");
  const cloudProviderSelect = document.getElementById("filterCloudProvider");
  const fourthPartySelect = document.getElementById("filterFourthParty");
  const businessServiceSelect = document.getElementById("filterBusinessService");
  const tierSelect = document.getElementById("filterTier");
  const criticalitySelect = document.getElementById("filterCriticality");
  const resilienceStatusSelect = document.getElementById("filterResilienceStatus");
  const clearButton = document.getElementById("clearFilters");

  setSelectOptions(dependencyTypeSelect, supplierDependencies.map((item) => item.dependency_type));
  setSelectOptions(cloudProviderSelect, supplierDependencies.map((item) => item.cloud_provider));
  setSelectOptions(fourthPartySelect, supplierDependencies.map((item) => item.fourth_party));
  setSelectOptions(businessServiceSelect, supplierDependencies.map((item) => item.business_service));
  setSelectOptions(tierSelect, supplierDependencies.map((item) => item.tier));
  setSelectOptions(criticalitySelect, supplierDependencies.map((item) => item.criticality_level));
  setSelectOptions(resilienceStatusSelect, supplierDependencies.map((item) => item.resilience_status));

  function applyFromUi() {
    applyFilters({
      dependencyType: dependencyTypeSelect.value,
      cloudProvider: cloudProviderSelect.value,
      fourthParty: fourthPartySelect.value,
      businessService: businessServiceSelect.value,
      tier: tierSelect.value,
      criticality: criticalitySelect.value,
      resilienceStatus: resilienceStatusSelect.value
    });
  }

  dependencyTypeSelect.addEventListener("change", applyFromUi);
  cloudProviderSelect.addEventListener("change", applyFromUi);
  fourthPartySelect.addEventListener("change", applyFromUi);
  businessServiceSelect.addEventListener("change", applyFromUi);
  tierSelect.addEventListener("change", applyFromUi);
  criticalitySelect.addEventListener("change", applyFromUi);
  resilienceStatusSelect.addEventListener("change", applyFromUi);

  clearButton.addEventListener("click", () => {
    dependencyTypeSelect.value = "All";
    cloudProviderSelect.value = "All";
    fourthPartySelect.value = "All";
    businessServiceSelect.value = "All";
    tierSelect.value = "All";
    criticalitySelect.value = "All";
    resilienceStatusSelect.value = "All";
    applyFromUi();
  });

  applyFromUi();
}

addCardHoverEffect();
initDependencyFilters();
