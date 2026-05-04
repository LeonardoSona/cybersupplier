const monitoredSuppliers = [
  {
    supplier: "CloudOps Partner A",
    tier: "Tier 1",
    owner: "Technology",
    previous_rating: 654,
    current_rating: 612,
    monitored: true,
    open_signals: 7,
    risk_level: "High"
  },
  {
    supplier: "Clinical Data Vendor B",
    tier: "Tier 1",
    owner: "R&D",
    previous_rating: 671,
    current_rating: 640,
    monitored: true,
    open_signals: 5,
    risk_level: "High"
  },
  {
    supplier: "Logistics Provider C",
    tier: "Tier 2",
    owner: "Supply Chain",
    previous_rating: 705,
    current_rating: 681,
    monitored: true,
    open_signals: 4,
    risk_level: "High"
  },
  {
    supplier: "Manufacturing SaaS D",
    tier: "Tier 1",
    owner: "Manufacturing",
    previous_rating: 720,
    current_rating: 702,
    monitored: false,
    open_signals: 3,
    risk_level: "Medium"
  },
  {
    supplier: "Procurement Platform E",
    tier: "Tier 2",
    owner: "Procurement",
    previous_rating: 737,
    current_rating: 728,
    monitored: false,
    open_signals: 2,
    risk_level: "Medium"
  },
  {
    supplier: "Identity Services F",
    tier: "Tier 1",
    owner: "Technology",
    previous_rating: 702,
    current_rating: 655,
    monitored: true,
    open_signals: 8,
    risk_level: "High"
  },
  {
    supplier: "Marketing Platform G",
    tier: "Tier 3",
    owner: "Commercial",
    previous_rating: 790,
    current_rating: 781,
    monitored: true,
    open_signals: 1,
    risk_level: "Low"
  },
  {
    supplier: "Data Processing H",
    tier: "Tier 1",
    owner: "R&D",
    previous_rating: 712,
    current_rating: 698,
    monitored: true,
    open_signals: 3,
    risk_level: "Medium"
  }
];

const monitoringSignals = [
  {
    supplier: "CloudOps Partner A",
    signal: "Exposed admin portal",
    type: "Attack Surface",
    severity: "Critical",
    age_days: 4,
    impact: "Privileged access exposure"
  },
  {
    supplier: "Clinical Data Vendor B",
    signal: "Leaked credentials",
    type: "Credential Leak",
    severity: "Critical",
    age_days: 2,
    impact: "Account takeover risk"
  },
  {
    supplier: "Identity Services F",
    signal: "Critical vulnerability on identity endpoint",
    type: "Vulnerability",
    severity: "Critical",
    age_days: 6,
    impact: "Identity compromise path"
  },
  {
    supplier: "Logistics Provider C",
    signal: "New exposed remote access service",
    type: "Attack Surface",
    severity: "High",
    age_days: 8,
    impact: "Operational disruption risk"
  },
  {
    supplier: "Manufacturing SaaS D",
    signal: "Cloud storage misconfiguration",
    type: "Cloud Exposure",
    severity: "High",
    age_days: 11,
    impact: "Sensitive data exposure"
  },
  {
    supplier: "Procurement Platform E",
    signal: "Weak DMARC policy",
    type: "DNS / Email",
    severity: "Medium",
    age_days: 14,
    impact: "Phishing impersonation risk"
  },
  {
    supplier: "CloudOps Partner A",
    signal: "Expired TLS certificate",
    type: "DNS / Email",
    severity: "Medium",
    age_days: 10,
    impact: "Service trust issue"
  },
  {
    supplier: "Clinical Data Vendor B",
    signal: "Malware chatter linked to domain",
    type: "Threat Signal",
    severity: "High",
    age_days: 3,
    impact: "Potential compromise indicator"
  }
];

const signalTrend = [
  { week: "W1", attack_surface: 7, vulnerabilities: 5, credentials: 2, cloud: 3 },
  { week: "W2", attack_surface: 9, vulnerabilities: 7, credentials: 3, cloud: 4 },
  { week: "W3", attack_surface: 12, vulnerabilities: 9, credentials: 5, cloud: 6 },
  { week: "W4", attack_surface: 10, vulnerabilities: 8, credentials: 4, cloud: 5 }
];

const monitoringAiAlerts = [
  {
    value: "4 vendors",
    detail: "Predicted to experience rating deterioration in the next 30 days"
  },
  {
    value: "Vendor F",
    detail: "Highest likelihood of critical exposure escalation"
  },
  {
    value: "Credential leaks",
    detail: "Fastest-growing signal category across Tier 1 suppliers"
  }
];

let signalTrendChart = null;
let signalDistributionChart = null;

function setSelectOptions(select, values) {
  const options = ["All", ...new Set(values)].filter(Boolean);
  select.innerHTML = options.map(value => `<option value="${value}">${value}</option>`).join("");
}

function normalizeSignalType(type) {
  if (type === "Vulnerability" || type === "Attack Surface" || type === "Threat Signal") {
    return "Vulnerability";
  }

  if (type === "Credential Leak") {
    return "Credentials";
  }

  if (type === "Cloud Exposure") {
    return "Cloud";
  }

  if (type === "DNS / Email") {
    return "DNS";
  }

  return type;
}

function getTimeWindowDays(windowValue) {
  if (windowValue === "7d") return 7;
  if (windowValue === "30d") return 30;
  return 90;
}

function getPillClass(value) {
  if (["Critical", "High"].includes(value)) return "pill pill-red";
  if (["Medium", "At Risk"].includes(value)) return "pill pill-amber";
  return "pill pill-green";
}

function filterMonitoringData(state) {
  const maxAgeDays = getTimeWindowDays(state.timeWindow);

  const filteredSignals = monitoringSignals.filter(item => {
    const signalTypeMatch = state.signalType === "All" || normalizeSignalType(item.type) === state.signalType;
    const severityMatch = state.severity === "All" || item.severity === state.severity;
    const timeWindowMatch = item.age_days <= maxAgeDays;
    const supplierMatch = state.supplier === "All" || item.supplier === state.supplier;
    return signalTypeMatch && severityMatch && timeWindowMatch && supplierMatch;
  });

  const names = new Set(filteredSignals.map(item => item.supplier));
  const filteredSuppliers = monitoredSuppliers.filter(item => names.has(item.supplier));

  return { filteredSuppliers, filteredSignals };
}

function renderMonitoringKpis(filteredSuppliers, filteredSignals) {
  const total = filteredSuppliers.length;

  if (!total) {
    document.getElementById("monitoredVendors").textContent = "0%";
    document.getElementById("scoreDrops").textContent = "0";
    document.getElementById("criticalVulnerabilities").textContent = "0";
    document.getElementById("leakedCredentials").textContent = "0";
    document.getElementById("newExposedAssets").textContent = "0";
    document.getElementById("cloudExposure").textContent = "0";
    document.getElementById("dnsEmailIssues").textContent = "0";
    document.getElementById("criticalAlerts").textContent = "0";
    return;
  }

  const monitoredCount = filteredSuppliers.filter(s => s.monitored).length;
  const monitoredPercent = Math.round((monitoredCount / total) * 100);

  const scoreDrops = filteredSuppliers.filter(
    s => s.current_rating < s.previous_rating
  ).length;

  const criticalVulnerabilities = filteredSignals.filter(
    s => s.type === "Vulnerability" && s.severity === "Critical"
  ).length;

  const leakedCredentials = filteredSignals.filter(
    s => s.type === "Credential Leak"
  ).length;

  const newExposedAssets = filteredSignals.filter(
    s => s.type === "Attack Surface"
  ).length;

  const cloudExposure = filteredSignals.filter(
    s => s.type === "Cloud Exposure"
  ).length;

  const dnsEmailIssues = filteredSignals.filter(
    s => s.type === "DNS / Email"
  ).length;

  const criticalAlerts = filteredSignals.filter(
    s => s.severity === "Critical"
  ).length;

  document.getElementById("monitoredVendors").textContent = `${monitoredPercent}%`;
  document.getElementById("scoreDrops").textContent = scoreDrops;
  document.getElementById("criticalVulnerabilities").textContent = criticalVulnerabilities;
  document.getElementById("leakedCredentials").textContent = leakedCredentials;
  document.getElementById("newExposedAssets").textContent = newExposedAssets;
  document.getElementById("cloudExposure").textContent = cloudExposure;
  document.getElementById("dnsEmailIssues").textContent = dnsEmailIssues;
  document.getElementById("criticalAlerts").textContent = criticalAlerts;
}

function renderCriticalSignals(filteredSignals) {
  const tbody = document.querySelector("#criticalSignalsTable tbody");
  tbody.innerHTML = "";

  filteredSignals
    .filter(s => ["Critical", "High"].includes(s.severity))
    .sort((a, b) => a.age_days - b.age_days)
    .forEach(signal => {
      tbody.innerHTML += `
        <tr>
          <td>${signal.supplier}</td>
          <td>${signal.signal}</td>
          <td><span class="${getPillClass(signal.severity)}">${signal.severity}</span></td>
          <td>${signal.age_days}d</td>
          <td>${signal.impact}</td>
        </tr>
      `;
    });
}

function renderScoreDrops(filteredSuppliers) {
  const tbody = document.querySelector("#scoreDropTable tbody");
  tbody.innerHTML = "";

  filteredSuppliers
    .map(s => ({
      ...s,
      change: s.current_rating - s.previous_rating
    }))
    .sort((a, b) => a.change - b.change)
    .forEach(s => {
      tbody.innerHTML += `
        <tr>
          <td>${s.supplier}</td>
          <td>${s.previous_rating}</td>
          <td>${s.current_rating}</td>
          <td>${s.change}</td>
          <td>${s.tier}</td>
        </tr>
      `;
    });
}

function renderWatchlist(filteredSuppliers) {
  const tbody = document.querySelector("#watchlistTable tbody");
  tbody.innerHTML = "";

  filteredSuppliers
    .filter(s => s.open_signals >= 3)
    .sort((a, b) => b.open_signals - a.open_signals)
    .forEach(s => {
      const exposureType =
        s.owner === "Technology"
          ? "Identity / Cloud"
          : s.owner === "R&D"
            ? "Sensitive Data"
            : s.owner === "Supply Chain"
              ? "Operational Continuity"
              : "SaaS Exposure";

      tbody.innerHTML += `
        <tr>
          <td>${s.supplier}</td>
          <td>${s.tier}</td>
          <td>${exposureType}</td>
          <td>${s.open_signals}</td>
          <td><span class="${getPillClass(s.risk_level)}">${s.risk_level}</span></td>
          <td>${s.owner}</td>
        </tr>
      `;
    });
}

function renderMonitoringAiAlerts() {
  const container = document.getElementById("monitoringAiAlerts");
  container.innerHTML = "";

  monitoringAiAlerts.forEach(alert => {
    container.innerHTML += `
      <div class="ai-item">
        <strong>${alert.value}</strong>
        <span>${alert.detail}</span>
      </div>
    `;
  });
}

function renderMonitoringCharts(filteredSignals) {
  if (signalTrendChart) signalTrendChart.destroy();
  if (signalDistributionChart) signalDistributionChart.destroy();

  const buckets = ["W1", "W2", "W3", "W4"];
  const trend = {
    Vulnerability: [0, 0, 0, 0],
    Credentials: [0, 0, 0, 0],
    Cloud: [0, 0, 0, 0],
    DNS: [0, 0, 0, 0]
  };

  filteredSignals.forEach(item => {
    const bucket = item.age_days <= 3 ? 0 : item.age_days <= 7 ? 1 : item.age_days <= 12 ? 2 : 3;
    const normalizedType = normalizeSignalType(item.type);
    if (trend[normalizedType]) trend[normalizedType][bucket] += 1;
  });

  signalTrendChart = new Chart(document.getElementById("signalTrendChart"), {
    type: "line",
    data: {
      labels: buckets,
      datasets: [
        {
          label: "Vulnerability",
          data: trend.Vulnerability,
          tension: 0.35
        },
        {
          label: "Credentials",
          data: trend.Credentials,
          tension: 0.35
        },
        {
          label: "Cloud",
          data: trend.Cloud,
          tension: 0.35
        },
        {
          label: "DNS",
          data: trend.DNS,
          tension: 0.35
        }
      ]
    },
    options: { maintainAspectRatio: false }
    });

  const signalTypes = [...new Set(filteredSignals.map(s => normalizeSignalType(s.type)))];

  signalDistributionChart = new Chart(document.getElementById("signalDistributionChart"), {
    type: "doughnut",
    data: {
      labels: signalTypes,
      datasets: [
        {
          data: signalTypes.map(type =>
            filteredSignals.filter(s => normalizeSignalType(s.type) === type).length
          )
        }
      ]
    },
    options: { maintainAspectRatio: false }
    });
}

function applyFilters(state) {
  const { filteredSuppliers, filteredSignals } = filterMonitoringData(state);

  renderMonitoringKpis(filteredSuppliers, filteredSignals);
  renderCriticalSignals(filteredSignals);
  renderScoreDrops(filteredSuppliers);
  renderWatchlist(filteredSuppliers);
  renderMonitoringCharts(filteredSignals);

  document.getElementById("filterSummary").textContent =
    `Showing ${filteredSignals.length} of ${monitoringSignals.length} signals`;
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

renderMonitoringAiAlerts();
addCardHoverEffect();

function renderExtendedMonitoringKpis() {
  const ext = calculateMissingKpis();
  document.getElementById("newVulnerabilityTrend").textContent = ext.newVulnerabilityTrend;
  document.getElementById("breachSignalCount").textContent = ext.breachSignalCount;
}

renderExtendedMonitoringKpis();

function initMonitoringFilters() {
  const signalTypeSelect = document.getElementById("filterSignalType");
  const severitySelect = document.getElementById("filterSeverity");
  const timeWindowSelect = document.getElementById("filterTimeWindow");
  const supplierSelect = document.getElementById("filterSupplier");
  const clearButton = document.getElementById("clearFilters");

  setSelectOptions(signalTypeSelect, ["Vulnerability", "Credentials", "Cloud", "DNS"]);
  setSelectOptions(severitySelect, ["Critical", "High"]);
  timeWindowSelect.innerHTML = ["7d", "30d", "90d"].map(value => `<option value="${value}">${value}</option>`).join("");
  supplierSelect.innerHTML = ["All", ...monitoredSuppliers.map(item => item.supplier)]
    .filter((value, index, array) => array.indexOf(value) === index)
    .map(value => `<option value="${value}">${value}</option>`)
    .join("");

  timeWindowSelect.value = "30d";

  function applyFromUi() {
    applyFilters({
      signalType: signalTypeSelect.value,
      severity: severitySelect.value,
      timeWindow: timeWindowSelect.value,
      supplier: supplierSelect.value
    });
  }

  signalTypeSelect.addEventListener("change", applyFromUi);
  severitySelect.addEventListener("change", applyFromUi);
  timeWindowSelect.addEventListener("change", applyFromUi);
  supplierSelect.addEventListener("change", applyFromUi);

  clearButton.addEventListener("click", () => {
    signalTypeSelect.value = "All";
    severitySelect.value = "All";
    timeWindowSelect.value = "30d";
    supplierSelect.value = "All";
    applyFromUi();
  });

  applyFromUi();
}

initMonitoringFilters();