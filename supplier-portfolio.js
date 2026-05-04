const portfolioSummary = {
  inventoryCompleteness: 92,
  classifiedVendors: 88,
  concentrationIndex: "High",
  fourthParties: 248,
  singleSupplierServices: 11
};

const portfolioSuppliers = [
  { supplier: "CloudOps Partner A", tier: "Tier 1", segment: "Cloud & Infrastructure", business_area: "Tech", geography: "North America", service_category: "Cloud", cyber_rating: 612, risk_level: "High", criticality: "Very High", exposure_m: 3.4 },
  { supplier: "Clinical Data Vendor B", tier: "Tier 1", segment: "Clinical / R&D Data", business_area: "R&D", geography: "Europe", service_category: "Data", cyber_rating: 640, risk_level: "High", criticality: "Very High", exposure_m: 2.8 },
  { supplier: "Logistics Provider C", tier: "Tier 2", segment: "Manufacturing & Supply Chain", business_area: "Supply Chain", geography: "Asia Pacific", service_category: "Logistics", cyber_rating: 681, risk_level: "High", criticality: "High", exposure_m: 1.6 },
  { supplier: "Manufacturing SaaS D", tier: "Tier 1", segment: "Manufacturing & Supply Chain", business_area: "Supply Chain", geography: "North America", service_category: "Cloud", cyber_rating: 702, risk_level: "Medium", criticality: "High", exposure_m: 1.2 },
  { supplier: "Procurement Platform E", tier: "Tier 2", segment: "Corporate Services", business_area: "Supply Chain", geography: "Europe", service_category: "Data", cyber_rating: 728, risk_level: "Medium", criticality: "Medium", exposure_m: 0.9 },
  { supplier: "Identity Services F", tier: "Tier 1", segment: "Cloud & Infrastructure", business_area: "Tech", geography: "North America", service_category: "Cloud", cyber_rating: 655, risk_level: "High", criticality: "Very High", exposure_m: 2.1 },
  { supplier: "Marketing Platform G", tier: "Tier 3", segment: "Corporate Services", business_area: "R&D", geography: "Europe", service_category: "Data", cyber_rating: 781, risk_level: "Low", criticality: "Medium", exposure_m: 0.4 },
  { supplier: "Data Processing H", tier: "Tier 1", segment: "Clinical / R&D Data", business_area: "R&D", geography: "North America", service_category: "Data", cyber_rating: 698, risk_level: "Medium", criticality: "Very High", exposure_m: 1.5 }
];

const concentrationHotspots = [
  { type: "Cloud Provider", dependency: "Azure", critical_suppliers: 18, risk_level: "High", exposure_m: 5.8 },
  { type: "Cloud Provider", dependency: "AWS", critical_suppliers: 14, risk_level: "Medium", exposure_m: 3.1 },
  { type: "Service Provider", dependency: "Managed Identity Provider", critical_suppliers: 9, risk_level: "High", exposure_m: 4.4 },
  { type: "Geography", dependency: "EU Data Processing Cluster", critical_suppliers: 11, risk_level: "Medium", exposure_m: 2.7 },
  { type: "Fourth Party", dependency: "Shared Hosting Provider", critical_suppliers: 7, risk_level: "High", exposure_m: 3.6 }
];

const portfolioAiAlerts = [
  {
    value: "12 vendors",
    detail: "Recommended for Tier 1 reclassification based on access and data sensitivity"
  },
  {
    value: "Azure cluster",
    detail: "Highest concentration exposure across critical suppliers"
  },
  {
    value: "3 supplier groups",
    detail: "Clustered for targeted assurance campaigns"
  }
];

let segmentRiskChart = null;
let criticalityChart = null;

function getRiskPill(risk) {
  if (risk === "High" || risk === "Very High") return "pill pill-red";
  if (risk === "Medium") return "pill pill-amber";
  return "pill pill-green";
}

function setSelectOptions(select, values) {
  const options = ["All", ...new Set(values)].filter(Boolean);
  select.innerHTML = options.map(v => `<option value="${v}">${v}</option>`).join("");
}

function groupBy(items, key) {
  return items.reduce((acc, item) => {
    const group = item[key];
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});
}

function filterPortfolioSuppliers(state) {
  return portfolioSuppliers.filter(s => {
    const tierMatch = state.tier === "All" || s.tier === state.tier;
    const businessAreaMatch = state.businessArea === "All" || s.business_area === state.businessArea;
    const geographyMatch = state.geography === "All" || s.geography === state.geography;
    const serviceCategoryMatch = state.serviceCategory === "All" || s.service_category === state.serviceCategory;
    return tierMatch && businessAreaMatch && geographyMatch && serviceCategoryMatch;
  });
}

function renderPortfolioKpis(filteredSuppliers) {
  const total = filteredSuppliers.length;

  if (!total) {
    document.getElementById("inventoryCompleteness").textContent = "0%";
    document.getElementById("classifiedVendors").textContent = "0%";
    document.getElementById("highRiskVendorPercent").textContent = "0%";
    document.getElementById("avgCyberRating").textContent = "-";
    document.getElementById("tierOneVendors").textContent = "0";
    document.getElementById("concentrationIndex").textContent = "-";
    document.getElementById("fourthParties").textContent = portfolioSummary.fourthParties;
    document.getElementById("singleSupplierServices").textContent = portfolioSummary.singleSupplierServices;
    return;
  }

  const highRisk = filteredSuppliers.filter(s => s.risk_level === "High").length;

  const highRiskPercent = Math.round((highRisk / total) * 100);

  const avgRating = Math.round(
    filteredSuppliers.reduce((sum, s) => sum + s.cyber_rating, 0) / total
  );

  const tierOne = filteredSuppliers.filter(s => s.tier === "Tier 1").length;

  document.getElementById("inventoryCompleteness").textContent =
    `${portfolioSummary.inventoryCompleteness}%`;

  document.getElementById("classifiedVendors").textContent =
    `${portfolioSummary.classifiedVendors}%`;

  document.getElementById("highRiskVendorPercent").textContent =
    `${highRiskPercent}%`;

  document.getElementById("avgCyberRating").textContent = avgRating;

  document.getElementById("tierOneVendors").textContent = tierOne;

  document.getElementById("concentrationIndex").textContent =
    portfolioSummary.concentrationIndex;

  document.getElementById("fourthParties").textContent =
    portfolioSummary.fourthParties;

  document.getElementById("singleSupplierServices").textContent =
    portfolioSummary.singleSupplierServices;
}

function renderHeatmap() {
  const ext = calculateMissingKpis();
  const tbody = document.querySelector("#heatmapTable tbody");
  tbody.innerHTML = "";

  const criticalities = ["High Criticality", "Medium Criticality", "Low Criticality"];
  const risks = ["High Risk", "Medium Risk", "Low Risk"];

  criticalities.forEach(crit => {
    const cells = risks.map(risk => {
      const key = `${crit} / ${risk}`;
      const count = ext.heatmap[key] || 0;
      const cellClass = crit === "High Criticality" && risk === "High Risk" ? "style=\"background:rgba(220,38,38,0.15);font-weight:600\"" : "";
      return `<td ${cellClass}>${count}</td>`;
    }).join("");
    tbody.innerHTML += `<tr><td><strong>${crit}</strong></td>${cells}</tr>`;
  });
}

function renderExtendedPortfolioKpis() {
  const ext = calculateMissingKpis();
  document.getElementById("highCriticalityHighRisk").textContent = ext.highCriticalityHighRisk;
  document.getElementById("topVendorConcentrationRatio").textContent = ext.topVendorConcentrationRatio;
}

function renderSegmentTable(filteredSuppliers) {
  const tbody = document.querySelector("#segmentTable tbody");
  tbody.innerHTML = "";

  const grouped = groupBy(filteredSuppliers, "segment");

  Object.entries(grouped).forEach(([segment, vendors]) => {
    const highRisk = vendors.filter(v => v.risk_level === "High").length;
    const avgRating = Math.round(
      vendors.reduce((sum, v) => sum + v.cyber_rating, 0) / vendors.length
    );

    const riskLevel = highRisk >= 2 ? "High" : highRisk === 1 ? "Medium" : "Low";

    tbody.innerHTML += `
      <tr>
        <td>${segment}</td>
        <td>${vendors.length}</td>
        <td>${highRisk}</td>
        <td>${avgRating}</td>
        <td><span class="${getRiskPill(riskLevel)}">${riskLevel}</span></td>
      </tr>
    `;
  });
}

function renderBusinessAreaTable(filteredSuppliers) {
  const tbody = document.querySelector("#businessAreaTable tbody");
  tbody.innerHTML = "";

  const grouped = groupBy(filteredSuppliers, "business_area");

  Object.entries(grouped).forEach(([area, vendors]) => {
    const highRisk = vendors.filter(v => v.risk_level === "High").length;
    const exposure = vendors.reduce((sum, v) => sum + v.exposure_m, 0);

    const criticality = vendors.some(v => v.criticality === "Very High")
      ? "Very High"
      : vendors.some(v => v.criticality === "High")
        ? "High"
        : "Medium";

    tbody.innerHTML += `
      <tr>
        <td>${area}</td>
        <td>${vendors.length}</td>
        <td>${highRisk}</td>
        <td><span class="${getRiskPill(criticality)}">${criticality}</span></td>
        <td>$${exposure.toFixed(1)}M</td>
      </tr>
    `;
  });
}

function renderConcentrationTable(filteredSuppliers) {
  const tbody = document.querySelector("#concentrationTable tbody");
  tbody.innerHTML = "";

  const suppliersByName = new Set(filteredSuppliers.map(s => s.supplier));
  const relatedSegments = new Set(filteredSuppliers.map(s => s.segment.toLowerCase()));

  concentrationHotspots
    .filter(item => {
      if (!filteredSuppliers.length) return false;
      if (item.dependency === "Azure" || item.dependency === "Managed Identity Provider") {
        return [...suppliersByName].some(name => name.includes("CloudOps") || name.includes("Identity"));
      }
      if (item.dependency === "EU Data Processing Cluster") {
        return [...relatedSegments].some(segment => segment.includes("clinical"));
      }
      if (item.dependency === "Shared Hosting Provider") {
        return [...relatedSegments].some(segment => segment.includes("manufacturing") || segment.includes("supply chain"));
      }
      return true;
    })
    .forEach(item => {
    tbody.innerHTML += `
      <tr>
        <td>${item.type}</td>
        <td>${item.dependency}</td>
        <td>${item.critical_suppliers}</td>
        <td><span class="${getRiskPill(item.risk_level)}">${item.risk_level}</span></td>
        <td>$${item.exposure_m.toFixed(1)}M</td>
      </tr>
    `;
  });
}

function renderPortfolioAiAlerts() {
  const container = document.getElementById("portfolioAiAlerts");
  container.innerHTML = "";

  portfolioAiAlerts.forEach(alert => {
    container.innerHTML += `
      <div class="ai-item">
        <strong>${alert.value}</strong>
        <span>${alert.detail}</span>
      </div>
    `;
  });
}

function renderPortfolioCharts(filteredSuppliers) {
  if (segmentRiskChart) segmentRiskChart.destroy();
  if (criticalityChart) criticalityChart.destroy();

  const segmentGroups = groupBy(filteredSuppliers, "segment");

  segmentRiskChart = new Chart(document.getElementById("segmentRiskChart"), {
    type: "bar",
    data: {
      labels: Object.keys(segmentGroups),
      datasets: [
        {
          label: "High-Risk Vendors",
          data: Object.values(segmentGroups).map(group =>
            group.filter(s => s.risk_level === "High").length
          )
        }
      ]
    },
    options: { maintainAspectRatio: false }
    });

  const tierGroups = groupBy(filteredSuppliers, "tier");

  criticalityChart = new Chart(document.getElementById("criticalityChart"), {
    type: "doughnut",
    data: {
      labels: Object.keys(tierGroups),
      datasets: [
        {
          data: Object.values(tierGroups).map(group => group.length)
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
  renderConcentrationTable(filteredSuppliers);
  renderPortfolioCharts(filteredSuppliers);

  document.getElementById("filterSummary").textContent =
    `Showing ${filteredSuppliers.length} of ${portfolioSuppliers.length} suppliers`;
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

renderPortfolioAiAlerts();
addCardHoverEffect();
renderHeatmap();
renderExtendedPortfolioKpis();

function initPortfolioFilters() {
  const tierSelect = document.getElementById("filterTier");
  const businessAreaSelect = document.getElementById("filterBusinessArea");
  const geographySelect = document.getElementById("filterGeography");
  const serviceCategorySelect = document.getElementById("filterServiceCategory");
  const clearButton = document.getElementById("clearFilters");

  setSelectOptions(tierSelect, portfolioSuppliers.map(s => s.tier));
  setSelectOptions(businessAreaSelect, portfolioSuppliers.map(s => s.business_area));
  setSelectOptions(geographySelect, portfolioSuppliers.map(s => s.geography));
  setSelectOptions(serviceCategorySelect, portfolioSuppliers.map(s => s.service_category));

  function applyFromUi() {
    applyFilters({
      tier: tierSelect.value,
      businessArea: businessAreaSelect.value,
      geography: geographySelect.value,
      serviceCategory: serviceCategorySelect.value
    });
  }

  tierSelect.addEventListener("change", applyFromUi);
  businessAreaSelect.addEventListener("change", applyFromUi);
  geographySelect.addEventListener("change", applyFromUi);
  serviceCategorySelect.addEventListener("change", applyFromUi);

  clearButton.addEventListener("click", () => {
    tierSelect.value = "All";
    businessAreaSelect.value = "All";
    geographySelect.value = "All";
    serviceCategorySelect.value = "All";
    applyFromUi();
  });

  applyFromUi();
}

initPortfolioFilters();