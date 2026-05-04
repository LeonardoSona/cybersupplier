(function () {
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
      const tooltipText = findTooltipText(labelText, tooltipMap);
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

  async function initKpiTooltips() {
    try {
      const response = await fetch("tooltip.json", { cache: "no-store" });
      if (!response.ok) {
        return;
      }

      const payload = await response.json();
      const dashboardKpis = Array.isArray(payload.dashboard_kpis) ? payload.dashboard_kpis : [];
      const pageData = findPageData(dashboardKpis);
      if (!pageData) {
        return;
      }

      const tooltipMap = buildTooltipMap(pageData);
      if (!tooltipMap.size) {
        return;
      }

      addTooltipIconsForPage(tooltipMap);
    } catch (error) {
      // Keep dashboards working even if tooltip metadata is unavailable.
      console.debug("Tooltip metadata could not be loaded", error);
    }
  }

  document.addEventListener("DOMContentLoaded", initKpiTooltips);
})();
