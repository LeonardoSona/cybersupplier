const DashboardFilters = (() => {
  const STORAGE_KEY = `dashboardFilters:${window.location.pathname}`;
  let controls = null;
  let onChangeHandler = null;

  function readSavedState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return {
        tier: saved.tier || "All",
        risk: saved.risk || "All",
        search: saved.search || ""
      };
    } catch {
      return { tier: "All", risk: "All", search: "" };
    }
  }

  function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function setSelectOptions(select, options) {
    if (!select) return;

    const current = select.value;
    const unique = ["All", ...options.filter(Boolean).filter((v, i, arr) => arr.indexOf(v) === i).sort()];

    select.innerHTML = unique.map(option => `<option value="${option}">${option}</option>`).join("");

    if (unique.includes(current)) {
      select.value = current;
    }
  }

  function getControls() {
    if (controls) return controls;

    const tierSelect = document.getElementById("filterTier");
    const riskSelect = document.getElementById("filterRisk");
    const searchInput = document.getElementById("filterSearch");
    const clearButton = document.getElementById("clearFilters");

    if (!tierSelect || !riskSelect || !searchInput || !clearButton) {
      return null;
    }

    controls = { tierSelect, riskSelect, searchInput, clearButton };
    return controls;
  }

  function updateSummary({ shown, total, label }) {
    const summary = document.getElementById("filterSummary");
    if (!summary) return;

    if (total === 0) {
      summary.textContent = `No ${label} available`;
      return;
    }

    summary.textContent = `Showing ${shown} of ${total} ${label}`;
  }

  function applyBasicDomFiltering(state) {
    const rows = [...document.querySelectorAll("tbody tr")];

    if (!rows.length) {
      updateSummary({ shown: 0, total: 0, label: "rows" });
      return;
    }

    const tierNeedle = state.tier.toLowerCase();
    const riskNeedle = state.risk.toLowerCase();
    const searchNeedle = state.search.toLowerCase();

    let shown = 0;

    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      const rowHasTier = /tier\s+[123]/i.test(text);
      const rowHasRisk = /(critical|very high|high|medium|low)/i.test(text);

      const tierMatch = state.tier === "All" || !rowHasTier || text.includes(tierNeedle);
      const riskMatch = state.risk === "All" || !rowHasRisk || text.includes(riskNeedle);
      const searchMatch = !searchNeedle || text.includes(searchNeedle);

      const visible = tierMatch && riskMatch && searchMatch;
      row.style.display = visible ? "" : "none";
      if (visible) shown += 1;
    });

    updateSummary({ shown, total: rows.length, label: "rows" });
  }

  function emitChange() {
    const ui = getControls();
    if (!ui) return;

    const nextState = {
      tier: ui.tierSelect.value,
      risk: ui.riskSelect.value,
      search: ui.searchInput.value.trim()
    };

    saveState(nextState);
    (onChangeHandler || applyBasicDomFiltering)(nextState);
  }

  function init({ tiers = [], risks = [], onChange } = {}) {
    const ui = getControls();

    if (!ui) {
      return false;
    }

    onChangeHandler = typeof onChange === "function" ? onChange : onChangeHandler || applyBasicDomFiltering;

    setSelectOptions(ui.tierSelect, tiers.length ? tiers : ["Tier 1", "Tier 2", "Tier 3"]);
    setSelectOptions(ui.riskSelect, risks.length ? risks : ["Critical", "High", "Medium", "Low", "Very High"]);

    const state = readSavedState();

    if ([...ui.tierSelect.options].some(option => option.value === state.tier)) {
      ui.tierSelect.value = state.tier;
    }

    if ([...ui.riskSelect.options].some(option => option.value === state.risk)) {
      ui.riskSelect.value = state.risk;
    }

    ui.searchInput.value = state.search;

    if (!ui.tierSelect.dataset.filterBound) {
      ui.tierSelect.addEventListener("change", emitChange);
      ui.riskSelect.addEventListener("change", emitChange);
      ui.searchInput.addEventListener("input", emitChange);

      ui.clearButton.addEventListener("click", () => {
        ui.tierSelect.value = "All";
        ui.riskSelect.value = "All";
        ui.searchInput.value = "";
        emitChange();
      });

      ui.tierSelect.dataset.filterBound = "true";
    }

    emitChange();
    return true;
  }

  return { init, updateSummary };
})();

document.addEventListener("DOMContentLoaded", () => {
  DashboardFilters.init();
});
