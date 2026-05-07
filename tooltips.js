(function () {
  const PAGEINFO_FILE_MAP = {
    index: "executive summary",
    "supplier-portfolio": "supplier portfolio",
    assessments: "supplier lifecycle assessments",
    monitoring: "monitoring",
    remediation: "remediation",
    dependencies: "dependencies",
    compliance: "compliance contracts regulated assurance",
    "risk-quantification": "risk quantification prioritization"
  };

  const FALLBACK_KPI_TOOLTIPS = {
    "overall supplier cyber risk score": "Average supplier cyber risk score across the filtered supplier set.",
    "high risk supplier": "Count of filtered suppliers where residual risk is High.",
    "critical supplier at risk": "Count of Tier 1 filtered suppliers where residual risk is High.",
    "annual loss exposure": "Sum of annual_loss_exposure_m across filtered records.",
    "exposure trend": "(Current filtered annual loss exposure - previous filtered annual loss exposure) / previous exposure * 100.",
    "supplier assessed": "Filtered assessed suppliers / filtered total suppliers * 100.",
    "continuously monitored": "Filtered monitored suppliers / filtered total suppliers * 100.",
    "critical finding": "Count of filtered findings where severity is Critical and status is not Closed.",

    "inventory completeness": "Known filtered suppliers / expected filtered suppliers * 100.",
    "classified supplier": "Filtered suppliers with classification complete / filtered total suppliers * 100.",
    "tier 1 supplier": "Count of filtered suppliers where tier is Tier 1.",
    "high criticality high risk": "Count of filtered suppliers where criticality is High and residual risk is High.",
    "average cyber rating": "Average external cyber rating across filtered suppliers.",
    "top vendor concentration": "Largest single-supplier filtered exposure / total filtered exposure * 100.",
    "fourth party visibility": "Filtered suppliers with identified fourth-party dependencies / filtered total suppliers * 100.",
    "single supplier service": "Count of filtered services with only one supporting supplier.",

    "assessment completion": "Completed filtered assessments / total filtered assessments * 100.",
    "due diligence completion": "Filtered assessments with due diligence status Complete / total filtered assessments * 100.",
    "evidence completion": "Filtered assessments with evidence status Complete / total filtered assessments * 100.",
    "control pass rate": "Passed controls / assessed controls for filtered assessment set * 100.",
    "overdue assessment": "Count of filtered assessments past due date and not complete.",
    "offboarding assurance gap": "Count of filtered offboarding assessments with unresolved assurance gaps.",
    "avg onboarding cycle": "Average onboarding_cycle_days across filtered assessments.",
    "tier 1 completion": "Completed filtered Tier 1 assessments / filtered Tier 1 assessments * 100.",

    "monitoring coverage": "Filtered suppliers with active monitoring / filtered total suppliers * 100.",
    "tier 1 monitoring coverage": "Filtered Tier 1 suppliers with active monitoring / filtered Tier 1 suppliers * 100.",
    "critical external exposure": "Count of filtered signals with critical external exposure indicators.",
    "leaked credential": "Count of filtered monitoring signals classified as leaked credentials.",
    "suppliers with rating drop": "Count of filtered suppliers whose current rating is lower than prior rating.",
    "new high risk signal": "Count of filtered signals first observed in period with High or Critical severity.",
    "escalated signal": "Count of filtered signals with escalation status Escalated.",
    "avg detection delay": "Average days between signal first observed and detection/triage across filtered signals.",

    "open remediation action": "Count of filtered remediation items with status Open or In Progress.",
    "critical actions overdue": "Count of filtered critical remediation actions overdue against due date.",
    "sla compliance": "Filtered remediation actions within SLA / filtered total remediation actions * 100.",
    "mttr": "Average days to close filtered remediation actions.",
    "risk reduction delivered": "Sum of risk reduction value from filtered implemented remediation actions.",
    "backlog growth": "(Current filtered open backlog - prior filtered open backlog) / prior open backlog * 100.",
    "reopened finding": "Count of filtered remediation findings reopened after prior closure.",
    "supplier owner overdue action": "Count of filtered overdue actions where owner type is Supplier.",

    "fourth party concentration": "Largest fourth-party filtered exposure / total fourth-party filtered exposure * 100.",
    "cloud concentration": "Largest cloud provider filtered exposure / total cloud filtered exposure * 100.",
    "shared critical provider": "Count of providers supporting multiple filtered critical suppliers.",
    "single points of failure": "Count of filtered services with a single supporting dependency path.",
    "shared identity dependency": "Count of filtered suppliers relying on the same identity dependency.",
    "downstream high risk link": "Count of filtered dependency links classified as High risk downstream.",
    "resilience coverage": "Filtered critical services with tested resilience controls / filtered critical services * 100.",

    "security clause coverage": "Filtered suppliers with contractual security clauses / filtered total suppliers * 100.",
    "audit rights coverage": "Filtered suppliers with audit rights covered / filtered total suppliers * 100.",
    "breach notification compliance": "Filtered suppliers meeting breach notification SLA terms / filtered total suppliers * 100.",
    "gxp critical supplier": "Count of filtered suppliers marked GxP critical.",
    "open capa exposure": "Sum of open CAPA count across filtered suppliers.",
    "validation evidence coverage": "Filtered suppliers with complete validation evidence / filtered total suppliers * 100.",
    "quality agreement coverage": "Filtered suppliers with signed or not-required quality agreement / filtered total suppliers * 100.",
    "audit findings 90 days": "Count of filtered suppliers with oldest open finding age greater than 90 days.",

    "top scenario exposure": "Highest single-scenario annual_loss_exposure_m value in the filtered set.",
    "risk reduction opportunity": "Sum of risk_reduction_m across filtered scenarios.",
    "mitigation cost": "Sum of mitigation_cost_m across filtered scenarios.",
    "control roi": "Sum(filtered risk_reduction_m) / Sum(filtered mitigation_cost_m).",
    "residual exposure": "Sum of residual_exposure_m across filtered scenarios.",
    "accepted risk exposure": "Sum of accepted_risk_m across filtered scenarios."
  };

  function normalizeLabel(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/\bavg\b/g, "average")
      .replace(/\bvendors\b/g, "vendor")
      .replace(/\bsuppliers\b/g, "supplier")
      .replace(/\(.*?\)/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function findFallbackTooltip(labelText) {
    const normalizedLabel = normalizeLabel(labelText);
    if (!normalizedLabel) {
      return null;
    }

    if (FALLBACK_KPI_TOOLTIPS[normalizedLabel]) {
      return FALLBACK_KPI_TOOLTIPS[normalizedLabel];
    }

    for (const [key, tooltip] of Object.entries(FALLBACK_KPI_TOOLTIPS)) {
      if (key.includes(normalizedLabel) || normalizedLabel.includes(key)) {
        return tooltip;
      }
    }

    return null;
  }

  function normalizePageName(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function tokenOverlapScore(left, right) {
    const leftTokens = new Set(left.split(" ").filter(Boolean));
    const rightTokens = new Set(right.split(" ").filter(Boolean));
    if (!leftTokens.size || !rightTokens.size) {
      return 0;
    }

    let shared = 0;
    leftTokens.forEach((token) => {
      if (rightTokens.has(token)) {
        shared += 1;
      }
    });

    return shared / Math.min(leftTokens.size, rightTokens.size);
  }

  function buildTooltipMap(pageData) {
    const map = new Map();
    if (!pageData || !Array.isArray(pageData.kpis)) {
      return map;
    }

    pageData.kpis.forEach((kpi) => {
      if (!kpi || !kpi.name || !kpi.tooltip) {
        return;
      }

      const key = normalizeLabel(kpi.name);
      if (key) {
        map.set(key, kpi.tooltip);
      }
    });

    return map;
  }

  function findTooltipText(labelText, tooltipMap) {
    const normalizedLabel = normalizeLabel(labelText);
    if (!normalizedLabel) {
      return null;
    }

    if (tooltipMap.has(normalizedLabel)) {
      return tooltipMap.get(normalizedLabel);
    }

    for (const [kpiKey, tooltip] of tooltipMap.entries()) {
      if (kpiKey.includes(normalizedLabel) || normalizedLabel.includes(kpiKey)) {
        return tooltip;
      }
    }

    let bestMatch = null;
    let bestScore = 0;
    for (const [kpiKey, tooltip] of tooltipMap.entries()) {
      const score = tokenOverlapScore(normalizedLabel, kpiKey);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = tooltip;
      }
    }

    if (bestScore >= 0.75) {
      return bestMatch;
    }

    return null;
  }

  function addTooltipIconsForPage(tooltipMap) {
    const kpiLabels = document.querySelectorAll(".kpi-card .kpi-label");

    kpiLabels.forEach((labelNode) => {
      if (labelNode.querySelector(".kpi-info-icon")) {
        return;
      }

      const labelText = (labelNode.textContent || "").trim();
      const tooltipText = findTooltipText(labelText, tooltipMap) || findFallbackTooltip(labelText);
      if (!tooltipText) {
        return;
      }

      const icon = document.createElement("span");
      icon.className = "kpi-info-icon";
      icon.textContent = "i";
      icon.setAttribute("aria-label", `${labelText} definition`);
      icon.setAttribute("title", tooltipText);
      icon.setAttribute("tabindex", "0");
      icon.dataset.tooltip = tooltipText;

      labelNode.appendChild(document.createTextNode(" "));
      labelNode.appendChild(icon);
    });
  }

  function findPageData(dashboardKpis) {
    const fileName = (window.location.pathname.split("/").pop() || "").replace(".html", "");
    const titleText = document.title || "";
    const h1Text = document.querySelector("h1") ? document.querySelector("h1").textContent : "";

    const candidates = [
      normalizePageName(fileName.replace(/-/g, " ")),
      normalizePageName(titleText),
      normalizePageName(h1Text)
    ].filter(Boolean);

    for (const pageEntry of dashboardKpis) {
      if (!pageEntry || !pageEntry.page) {
        continue;
      }

      const pageName = normalizePageName(pageEntry.page);
      if (!pageName) {
        continue;
      }

      if (candidates.some((candidate) => candidate.includes(pageName) || pageName.includes(candidate))) {
        return pageEntry;
      }
    }

    return null;
  }

  function findPageInfoData(pages) {
    if (!Array.isArray(pages) || !pages.length) {
      return null;
    }

    const fileName = (window.location.pathname.split("/").pop() || "").replace(".html", "");
    const titleText = document.title || "";
    const h1Text = document.querySelector("h1") ? document.querySelector("h1").textContent : "";

    const mapped = PAGEINFO_FILE_MAP[fileName] || "";
    const normalizedMapped = normalizePageName(mapped);

    if (normalizedMapped) {
      const mappedMatch = pages.find((entry) => {
        const entryName = normalizePageName(entry && entry.pageName);
        return entryName && (entryName.includes(normalizedMapped) || normalizedMapped.includes(entryName));
      });

      if (mappedMatch) {
        return mappedMatch;
      }
    }

    const candidates = [
      normalizePageName(fileName.replace(/-/g, " ")),
      normalizePageName(titleText),
      normalizePageName(h1Text)
    ].filter(Boolean);

    for (const pageEntry of pages) {
      if (!pageEntry || !pageEntry.pageName) {
        continue;
      }

      const pageName = normalizePageName(pageEntry.pageName);
      if (!pageName) {
        continue;
      }

      if (candidates.some((candidate) => candidate.includes(pageName) || pageName.includes(candidate))) {
        return pageEntry;
      }
    }

    return null;
  }

  function buildPageInfoList(items) {
    if (!Array.isArray(items) || !items.length) {
      return "<p class=\"page-info-empty\">Not provided</p>";
    }

    return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
  }

  function createPageInfoModal(pageInfo) {
    const h1 = document.querySelector(".brand-block h1") || document.querySelector("h1");
    if (!h1 || h1.querySelector(".page-info-trigger")) {
      return;
    }

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "page-info-trigger";
    trigger.setAttribute("aria-label", "Open page information");
    trigger.textContent = "i";

    h1.appendChild(document.createTextNode(" "));
    h1.appendChild(trigger);

    const modal = document.createElement("div");
    modal.className = "page-info-modal";
    modal.hidden = true;
    modal.innerHTML = `
      <div class="page-info-backdrop" data-close="true"></div>
      <section class="page-info-dialog" role="dialog" aria-modal="true" aria-label="Page information">
        <header class="page-info-header">
          <h2>${pageInfo.pageName || "Page Information"}</h2>
          <button type="button" class="page-info-close" aria-label="Close page information">x</button>
        </header>
        <div class="page-info-content">
          <h4>Primary Audience</h4>
          ${buildPageInfoList(pageInfo.primaryAudience)}
          <h4>This page should answer</h4>
          <p>${pageInfo.thisPageShouldAnswer || "Not provided"}</p>
          <h4>This page should focus only on</h4>
          ${buildPageInfoList(pageInfo.thisPageShouldFocusOnlyOn)}
        </div>
      </section>
    `;

    document.body.appendChild(modal);

    function openModal() {
      modal.hidden = false;
      document.body.classList.add("page-info-open");
    }

    function closeModal() {
      modal.hidden = true;
      document.body.classList.remove("page-info-open");
    }

    trigger.addEventListener("click", openModal);
    modal.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && (target.dataset.close === "true" || target.classList.contains("page-info-close"))) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !modal.hidden) {
        closeModal();
      }
    });
  }

  async function initKpiTooltips() {
    try {
      const response = await fetch("tooltip.json", { cache: "no-store" });
      if (!response.ok) {
        return;
      }

      const payload = await response.json();
      const dashboardKpis = Array.isArray(payload.dashboard_kpis) ? payload.dashboard_kpis : [];
      const pageData = findPageData(dashboardKpis);
      const tooltipMap = buildTooltipMap(pageData);

      addTooltipIconsForPage(tooltipMap);
    } catch (error) {
      // Keep dashboards working even if tooltip metadata is unavailable.
      console.debug("Tooltip metadata could not be loaded", error);
    }
  }

  async function initPageInfoModal() {
    try {
      const response = await fetch("pageinfo.json", { cache: "no-store" });
      if (!response.ok) {
        return;
      }

      const payload = await response.json();
      const pages = Array.isArray(payload.pages) ? payload.pages : [];
      const pageInfo = findPageInfoData(pages);

      if (!pageInfo) {
        return;
      }

      createPageInfoModal(pageInfo);
    } catch (error) {
      console.debug("Page info metadata could not be loaded", error);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    initKpiTooltips();
    initPageInfoModal();
  });
})();
