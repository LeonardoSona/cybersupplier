const portfolioSuppliers = [
  {
    supplier_id: "SUP-001",
    supplier_name: "CloudOps Partner A",
    tier: "Tier 1",
    business_area: "Technology",
    geography: "North America",
    service_category: "Cloud Infrastructure",
    business_service: "Core Cloud Hosting",
    supplier_owner: "Technology Risk",
    profile_complete: true,
    previous_profile_complete: true,
    criticality_score: 95,
    previous_criticality_score: 94,
    criticality_level: "Very High",
    risk_score: 91,
    previous_risk_score: 94,
    residual_risk: "High",
    cyber_rating: 612,
    previous_cyber_rating: 602,
    annual_loss_exposure_m: 3.4,
    previous_annual_loss_exposure_m: 3.8,
    subcontractor_visibility: "Full",
    previous_subcontractor_visibility: "Partial",
    fourth_party: "Managed Identity Provider X",
    alternate_supplier_available: false,
    previous_alternate_supplier_available: false
  },
  {
    supplier_id: "SUP-002",
    supplier_name: "Clinical Data Vendor B",
    tier: "Tier 1",
    business_area: "R&D",
    geography: "Europe",
    service_category: "Clinical Data",
    business_service: "Trial Data Processing",
    supplier_owner: "Clinical Operations",
    profile_complete: true,
    previous_profile_complete: true,
    criticality_score: 93,
    previous_criticality_score: 92,
    criticality_level: "Very High",
    risk_score: 88,
    previous_risk_score: 90,
    residual_risk: "High",
    cyber_rating: 640,
    previous_cyber_rating: 631,
    annual_loss_exposure_m: 2.8,
    previous_annual_loss_exposure_m: 3.1,
    subcontractor_visibility: "Partial",
    previous_subcontractor_visibility: "Partial",
    fourth_party: "EU Data Processing Cluster",
    alternate_supplier_available: false,
    previous_alternate_supplier_available: false
  },
  {
    supplier_id: "SUP-003",
    supplier_name: "Logistics Provider C",
    tier: "Tier 2",
    business_area: "Supply Chain",
    geography: "Asia Pacific",
    service_category: "Logistics",
    business_service: "Inbound Logistics",
    supplier_owner: "Procurement Risk",
    profile_complete: true,
    previous_profile_complete: false,
    criticality_score: 84,
    previous_criticality_score: 82,
    criticality_level: "High",
    risk_score: 79,
    previous_risk_score: 82,
    residual_risk: "High",
    cyber_rating: 681,
    previous_cyber_rating: 668,
    annual_loss_exposure_m: 1.6,
    previous_annual_loss_exposure_m: 1.9,
    subcontractor_visibility: "Partial",
    previous_subcontractor_visibility: "None",
    fourth_party: "Regional Freight Consolidator",
    alternate_supplier_available: true,
    previous_alternate_supplier_available: true
  },
  {
    supplier_id: "SUP-004",
    supplier_name: "Manufacturing SaaS D",
    tier: "Tier 1",
    business_area: "Manufacturing",
    geography: "North America",
    service_category: "Manufacturing Systems",
    business_service: "Plant Operations Platform",
    supplier_owner: "Manufacturing IT",
    profile_complete: true,
    previous_profile_complete: true,
    criticality_score: 89,
    previous_criticality_score: 88,
    criticality_level: "High",
    risk_score: 76,
    previous_risk_score: 75,
    residual_risk: "Medium",
    cyber_rating: 702,
    previous_cyber_rating: 695,
    annual_loss_exposure_m: 1.2,
    previous_annual_loss_exposure_m: 1.1,
    subcontractor_visibility: "Full",
    previous_subcontractor_visibility: "Full",
    fourth_party: "Shared Hosting Provider Y",
    alternate_supplier_available: false,
    previous_alternate_supplier_available: false
  },
  {
    supplier_id: "SUP-005",
    supplier_name: "Procurement Platform E",
    tier: "Tier 2",
    business_area: "Procurement",
    geography: "Europe",
    service_category: "Procurement SaaS",
    business_service: "Sourcing Platform",
    supplier_owner: "Procurement Excellence",
    profile_complete: false,
    previous_profile_complete: false,
    criticality_score: 74,
    previous_criticality_score: 74,
    criticality_level: "Medium",
    risk_score: 68,
    previous_risk_score: 70,
    residual_risk: "Medium",
    cyber_rating: 728,
    previous_cyber_rating: 716,
    annual_loss_exposure_m: 0.9,
    previous_annual_loss_exposure_m: 1.0,
    subcontractor_visibility: "None",
    previous_subcontractor_visibility: "None",
    fourth_party: "Offshore Support Center Z",
    alternate_supplier_available: true,
    previous_alternate_supplier_available: true
  },
  {
    supplier_id: "SUP-006",
    supplier_name: "Identity Services F",
    tier: "Tier 1",
    business_area: "Technology",
    geography: "North America",
    service_category: "Identity Services",
    business_service: "Privileged Access Management",
    supplier_owner: "Cyber Assurance",
    profile_complete: true,
    previous_profile_complete: true,
    criticality_score: 96,
    previous_criticality_score: 95,
    criticality_level: "Very High",
    risk_score: 86,
    previous_risk_score: 88,
    residual_risk: "High",
    cyber_rating: 655,
    previous_cyber_rating: 648,
    annual_loss_exposure_m: 2.1,
    previous_annual_loss_exposure_m: 2.4,
    subcontractor_visibility: "Full",
    previous_subcontractor_visibility: "Partial",
    fourth_party: "Managed Identity Provider X",
    alternate_supplier_available: false,
    previous_alternate_supplier_available: false
  },
  {
    supplier_id: "SUP-007",
    supplier_name: "Marketing Platform G",
    tier: "Tier 3",
    business_area: "Commercial",
    geography: "Europe",
    service_category: "Marketing SaaS",
    business_service: "Campaign Analytics",
    supplier_owner: "Commercial Operations",
    profile_complete: true,
    previous_profile_complete: true,
    criticality_score: 62,
    previous_criticality_score: 61,
    criticality_level: "Medium",
    risk_score: 51,
    previous_risk_score: 54,
    residual_risk: "Low",
    cyber_rating: 781,
    previous_cyber_rating: 770,
    annual_loss_exposure_m: 0.4,
    previous_annual_loss_exposure_m: 0.5,
    subcontractor_visibility: "Partial",
    previous_subcontractor_visibility: "Partial",
    fourth_party: "Digital Media Processor",
    alternate_supplier_available: true,
    previous_alternate_supplier_available: true
  },
  {
    supplier_id: "SUP-008",
    supplier_name: "Data Processing H",
    tier: "Tier 1",
    business_area: "R&D",
    geography: "North America",
    service_category: "Data Processing",
    business_service: "Research Data Lake",
    supplier_owner: "Data Governance",
    profile_complete: true,
    previous_profile_complete: false,
    criticality_score: 90,
    previous_criticality_score: 89,
    criticality_level: "Very High",
    risk_score: 77,
    previous_risk_score: 80,
    residual_risk: "Medium",
    cyber_rating: 698,
    previous_cyber_rating: 688,
    annual_loss_exposure_m: 1.5,
    previous_annual_loss_exposure_m: 1.7,
    subcontractor_visibility: "Full",
    previous_subcontractor_visibility: "Partial",
    fourth_party: "EU Data Processing Cluster",
    alternate_supplier_available: false,
    previous_alternate_supplier_available: false
  }
];

let segmentRiskChart = null;
let criticalityChart = null;

function setSelectOptions(select, values) {
  const options = ["All", ...new Set(values)].filter(Boolean);
  select.innerHTML = options.map((v) => `<option value="${v}">${v}</option>`).join("");
}

function groupBy(items, key) {
  return items.reduce((acc, item) => {
    const group = item[key];
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});
}

function getSegment(supplier) {
  if (supplier.service_category.includes("Cloud") || supplier.service_category.includes("Identity")) {
    return "Cloud & Infrastructure";
  }
  if (supplier.business_area === "R&D") {
    return "Clinical / R&D Data";
  }
  if (supplier.business_area === "Supply Chain" || supplier.business_area === "Manufacturing") {
    return "Manufacturing & Supply Chain";
  }
  return "Corporate Services";
}

function getRequiredActionByRiskAndCriticality(item) {
  if (item.residual_risk === "High" && item.criticality_score >= 90) {
    return "Escalate: executive mitigation plan";
  }
  if (item.residual_risk === "High") {
    return "Contain: 30-day control uplift";
  }
  if (item.residual_risk === "Medium" && item.criticality_score >= 85) {
    return "Prioritize: assurance deep-dive";
  }
  if (item.residual_risk === "Medium") {
    return "Track: quarterly control closure";
  }
  return "Maintain: monitor and reassess";
}

function getMode(values) {
  if (!values.length) return "-";
  const counts = values.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

function setTrend(id, currentValue, previousValue, preferredDirection, valueSuffix = "") {
  const node = document.getElementById(id);
  if (!node || previousValue == null || Number.isNaN(previousValue)) {
    return;
  }

  const delta = currentValue - previousValue;
  if (delta === 0 || preferredDirection === "neutral") {
    node.className = "kpi-trend trend-warn";
    node.textContent = `→ ${preferredDirection === "neutral" ? "contextual" : `0${valueSuffix} vs past month`}`;
    return;
  }

  const isIncrease = delta > 0;
  const arrow = isIncrease ? "▲" : "▼";
  const isGood = preferredDirection === "higher" ? isIncrease : !isIncrease;

  node.className = `kpi-trend ${isGood ? "trend-good" : "trend-bad"}`;
  node.textContent = `${arrow} ${Math.abs(delta).toFixed(1)}${valueSuffix} vs past month`;
}

function filterPortfolioSuppliers(state) {
  return portfolioSuppliers.filter((s) => {
    const tierMatch = state.tier === "All" || s.tier === state.tier;
    const businessAreaMatch = state.businessArea === "All" || s.business_area === state.businessArea;
    const geographyMatch = state.geography === "All" || s.geography === state.geography;
    const serviceCategoryMatch = state.serviceCategory === "All" || s.service_category === state.serviceCategory;
    const criticalityMatch = state.criticality === "All" || s.criticality_level === state.criticality;
    const residualRiskMatch = state.residualRisk === "All" || s.residual_risk === state.residualRisk;

    return tierMatch && businessAreaMatch && geographyMatch && serviceCategoryMatch && criticalityMatch && residualRiskMatch;
  });
}

function calculatePortfolioKpis(filteredSuppliers) {
  const total = filteredSuppliers.length;

  if (!total) {
    return {
      inventoryCompleteness: 0,
      previousInventoryCompleteness: 0,
      classifiedSuppliers: 0,
      previousClassifiedSuppliers: 0,
      tierOneSuppliers: 0,
      previousTierOneSuppliers: 0,
      highCriticalityHighRisk: 0,
      previousHighCriticalityHighRisk: 0,
      avgCyberRating: 0,
      previousAvgCyberRating: 0,
      topVendorConcentration: 0,
      previousTopVendorConcentration: 0,
      fourthPartyVisibility: 0,
      previousFourthPartyVisibility: 0,
      singleSupplierServices: 0,
      previousSingleSupplierServices: 0
    };
  }

  const inventoryCompleteness = Math.round(
    (filteredSuppliers.filter((s) => s.profile_complete).length / total) * 100
  );

  const previousInventoryCompleteness = Math.round(
    (filteredSuppliers.filter((s) => s.previous_profile_complete).length / total) * 100
  );

  const classifiedSuppliers = Math.round(
    (filteredSuppliers.filter((s) => s.profile_complete && s.criticality_level && s.residual_risk).length / total) * 100
  );

  const previousClassifiedSuppliers = Math.round(
    (filteredSuppliers.filter((s) => s.previous_profile_complete && s.previous_risk_score != null && s.previous_criticality_score != null).length / total) * 100
  );

  const tierOneSuppliers = filteredSuppliers.filter((s) => s.tier === "Tier 1").length;
  const previousTierOneSuppliers = tierOneSuppliers;

  const highCriticalityHighRisk = filteredSuppliers.filter(
    (s) => (s.criticality_level === "Very High" || s.criticality_level === "High") && s.residual_risk === "High"
  ).length;

  const previousHighCriticalityHighRisk = filteredSuppliers.filter(
    (s) => s.previous_criticality_score >= 85 && s.previous_risk_score >= 80
  ).length;

  const avgCyberRating = Math.round(
    filteredSuppliers.reduce((sum, s) => sum + s.cyber_rating, 0) / total
  );

  const previousAvgCyberRating = Math.round(
    filteredSuppliers.reduce((sum, s) => sum + s.previous_cyber_rating, 0) / total
  );

  const totalExposure = filteredSuppliers.reduce((sum, s) => sum + s.annual_loss_exposure_m, 0);
  const previousTotalExposure = filteredSuppliers.reduce((sum, s) => sum + s.previous_annual_loss_exposure_m, 0);

  const topExposure = Math.max(...filteredSuppliers.map((s) => s.annual_loss_exposure_m));
  const previousTopExposure = Math.max(...filteredSuppliers.map((s) => s.previous_annual_loss_exposure_m));

  const topVendorConcentration = totalExposure ? (topExposure / totalExposure) * 100 : 0;
  const previousTopVendorConcentration = previousTotalExposure ? (previousTopExposure / previousTotalExposure) * 100 : 0;

  const fourthPartyVisibility = Math.round(
    (filteredSuppliers.filter((s) => s.subcontractor_visibility === "Full" || s.subcontractor_visibility === "Partial").length / total) * 100
  );

  const previousFourthPartyVisibility = Math.round(
    (filteredSuppliers.filter((s) => s.previous_subcontractor_visibility === "Full" || s.previous_subcontractor_visibility === "Partial").length / total) * 100
  );

  const singleSupplierServices = filteredSuppliers.filter((s) => !s.alternate_supplier_available).length;

  const previousSingleSupplierServices = filteredSuppliers.filter((s) => !s.previous_alternate_supplier_available).length;

  return {
    inventoryCompleteness,
    previousInventoryCompleteness,
    classifiedSuppliers,
    previousClassifiedSuppliers,
    tierOneSuppliers,
    previousTierOneSuppliers,
    highCriticalityHighRisk,
    previousHighCriticalityHighRisk,
    avgCyberRating,
    previousAvgCyberRating,
    topVendorConcentration,
    previousTopVendorConcentration,
    fourthPartyVisibility,
    previousFourthPartyVisibility,
    singleSupplierServices,
    previousSingleSupplierServices
  };
}

function renderPortfolioKpis(filteredSuppliers) {
  const kpis = calculatePortfolioKpis(filteredSuppliers);

  document.getElementById("inventoryCompleteness").textContent = `${kpis.inventoryCompleteness}%`;
  document.getElementById("classifiedSuppliers").textContent = `${kpis.classifiedSuppliers}%`;
  document.getElementById("tierOneSuppliers").textContent = kpis.tierOneSuppliers;
  document.getElementById("highCriticalityHighRisk").textContent = kpis.highCriticalityHighRisk;
  document.getElementById("avgCyberRating").textContent = kpis.avgCyberRating || "-";
  document.getElementById("topVendorConcentration").textContent = `${kpis.topVendorConcentration.toFixed(1)}%`;
  document.getElementById("fourthPartyVisibility").textContent = `${kpis.fourthPartyVisibility}%`;
  document.getElementById("singleSupplierServices").textContent = kpis.singleSupplierServices;

  setTrend("inventoryCompletenessTrend", kpis.inventoryCompleteness, kpis.previousInventoryCompleteness, "higher", "%");
  setTrend("classifiedSuppliersTrend", kpis.classifiedSuppliers, kpis.previousClassifiedSuppliers, "higher", "%");
  setTrend("tierOneSuppliersTrend", kpis.tierOneSuppliers, kpis.previousTierOneSuppliers, "neutral");
  setTrend("highCriticalityHighRiskTrend", kpis.highCriticalityHighRisk, kpis.previousHighCriticalityHighRisk, "lower");
  setTrend("avgCyberRatingTrend", kpis.avgCyberRating, kpis.previousAvgCyberRating, "higher");
  setTrend("topVendorConcentrationTrend", kpis.topVendorConcentration, kpis.previousTopVendorConcentration, "lower", "%");
  setTrend("fourthPartyVisibilityTrend", kpis.fourthPartyVisibility, kpis.previousFourthPartyVisibility, "higher", "%");
  setTrend("singleSupplierServicesTrend", kpis.singleSupplierServices, kpis.previousSingleSupplierServices, "lower");
}

function renderSegmentTable(filteredSuppliers) {
  const tbody = document.querySelector("#segmentTable tbody");
  tbody.innerHTML = "";

  const enriched = filteredSuppliers.map((s) => ({ ...s, segment: getSegment(s) }));
  const grouped = groupBy(enriched, "segment");

  Object.entries(grouped).forEach(([segment, suppliers]) => {
    const highRisk = suppliers.filter((s) => s.residual_risk === "High").length;
    const avgCyberRating = Math.round(
      suppliers.reduce((sum, s) => sum + s.cyber_rating, 0) / suppliers.length
    );

    const criticality = getMode(suppliers.map((s) => s.criticality_level));

    const requiredAction =
      highRisk >= 2
        ? "Prioritize: segment risk reduction sprint"
        : highRisk === 1
          ? "Targeted: focused assurance review"
          : "Maintain: routine monitoring";

    tbody.innerHTML += `
      <tr>
        <td>${segment}</td>
        <td>${suppliers.length}</td>
        <td>${highRisk}</td>
        <td>${avgCyberRating}</td>
        <td>${criticality}</td>
        <td>${requiredAction}</td>
      </tr>
    `;
  });
}

function renderBusinessAreaTable(filteredSuppliers) {
  const tbody = document.querySelector("#businessAreaTable tbody");
  tbody.innerHTML = "";

  const grouped = groupBy(filteredSuppliers, "business_area");

  Object.entries(grouped).forEach(([businessArea, suppliers]) => {
    const tierOneSuppliers = suppliers.filter((s) => s.tier === "Tier 1").length;
    const highRisk = suppliers.filter((s) => s.residual_risk === "High").length;
    const annualLossExposure = suppliers.reduce((sum, s) => sum + s.annual_loss_exposure_m, 0);

    const requiredAction =
      annualLossExposure >= 4
        ? "Escalate: portfolio concentration review"
        : highRisk >= 2
          ? "Contain: cross-functional mitigation plan"
          : "Track: monthly risk governance";

    tbody.innerHTML += `
      <tr>
        <td>${businessArea}</td>
        <td>${suppliers.length}</td>
        <td>${tierOneSuppliers}</td>
        <td>${highRisk}</td>
        <td>$${annualLossExposure.toFixed(1)}M</td>
        <td>${requiredAction}</td>
      </tr>
    `;
  });
}

function renderHighCriticalityHighRiskTable(filteredSuppliers) {
  const tbody = document.querySelector("#highCriticalityHighRiskTable tbody");
  tbody.innerHTML = "";

  filteredSuppliers
    .filter((s) => (s.criticality_level === "Very High" || s.criticality_level === "High") && s.residual_risk === "High")
    .sort((a, b) => b.risk_score - a.risk_score)
    .forEach((s) => {
      tbody.innerHTML += `
        <tr>
          <td>${s.supplier_name}</td>
          <td>${s.tier}</td>
          <td>${s.business_area}</td>
          <td>${s.service_category}</td>
          <td>${s.criticality_score}</td>
          <td>${s.risk_score}</td>
          <td>$${s.annual_loss_exposure_m.toFixed(1)}M</td>
          <td>${getRequiredActionByRiskAndCriticality(s)}</td>
        </tr>
      `;
    });
}

function renderPortfolioCharts(filteredSuppliers) {
  if (segmentRiskChart) segmentRiskChart.destroy();
  if (criticalityChart) criticalityChart.destroy();

  const enriched = filteredSuppliers.map((s) => ({ ...s, segment: getSegment(s) }));
  const segmentGroups = groupBy(enriched, "segment");

  segmentRiskChart = new Chart(document.getElementById("segmentRiskChart"), {
    type: "bar",
    data: {
      labels: Object.keys(segmentGroups),
      datasets: [
        {
          label: "High Risk Suppliers",
          data: Object.values(segmentGroups).map(
            (group) => group.filter((s) => s.residual_risk === "High").length
          )
        }
      ]
    },
    options: { maintainAspectRatio: false }
  });

  const criticalityGroups = groupBy(filteredSuppliers, "criticality_level");

  criticalityChart = new Chart(document.getElementById("criticalityChart"), {
    type: "doughnut",
    data: {
      labels: Object.keys(criticalityGroups),
      datasets: [
        {
          data: Object.values(criticalityGroups).map((group) => group.length)
        }
      ]
    },
    options: { maintainAspectRatio: false }
  });
}

function applyFilters(state) {
  const filteredSuppliers = filterPortfolioSuppliers(state);

  renderPortfolioKpis(filteredSuppliers);
  renderSegmentTable(filteredSuppliers);
  renderBusinessAreaTable(filteredSuppliers);
  renderHighCriticalityHighRiskTable(filteredSuppliers);
  renderPortfolioCharts(filteredSuppliers);

  document.getElementById("filterSummary").textContent =
    `Showing ${filteredSuppliers.length} of ${portfolioSuppliers.length} suppliers`;
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

function initPortfolioFilters() {
  const tierSelect = document.getElementById("filterTier");
  const businessAreaSelect = document.getElementById("filterBusinessArea");
  const geographySelect = document.getElementById("filterGeography");
  const serviceCategorySelect = document.getElementById("filterServiceCategory");
  const criticalitySelect = document.getElementById("filterCriticality");
  const residualRiskSelect = document.getElementById("filterResidualRisk");
  const clearButton = document.getElementById("clearFilters");

  setSelectOptions(tierSelect, portfolioSuppliers.map((s) => s.tier));
  setSelectOptions(businessAreaSelect, portfolioSuppliers.map((s) => s.business_area));
  setSelectOptions(geographySelect, portfolioSuppliers.map((s) => s.geography));
  setSelectOptions(serviceCategorySelect, portfolioSuppliers.map((s) => s.service_category));
  setSelectOptions(criticalitySelect, portfolioSuppliers.map((s) => s.criticality_level));
  setSelectOptions(residualRiskSelect, portfolioSuppliers.map((s) => s.residual_risk));

  function applyFromUi() {
    applyFilters({
      tier: tierSelect.value,
      businessArea: businessAreaSelect.value,
      geography: geographySelect.value,
      serviceCategory: serviceCategorySelect.value,
      criticality: criticalitySelect.value,
      residualRisk: residualRiskSelect.value
    });
  }

  tierSelect.addEventListener("change", applyFromUi);
  businessAreaSelect.addEventListener("change", applyFromUi);
  geographySelect.addEventListener("change", applyFromUi);
  serviceCategorySelect.addEventListener("change", applyFromUi);
  criticalitySelect.addEventListener("change", applyFromUi);
  residualRiskSelect.addEventListener("change", applyFromUi);

  clearButton.addEventListener("click", () => {
    tierSelect.value = "All";
    businessAreaSelect.value = "All";
    geographySelect.value = "All";
    serviceCategorySelect.value = "All";
    criticalitySelect.value = "All";
    residualRiskSelect.value = "All";
    applyFromUi();
  });

  applyFromUi();
}

addCardHoverEffect();
initPortfolioFilters();
