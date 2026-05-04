const suppliersExtended = [
  {
    supplier_id: "SUP-001",
    supplier_name: "CloudOps Partner A",
    tier: "Tier 1",
    business_unit: "Technology",
    region: "Global",
    service_category: "Cloud Infrastructure",
    cloud_provider: "Azure",
    fourth_party: "Managed Identity Provider X",
    criticality_score: 95,
    risk_score: 91,
    residual_risk: "High",
    annual_loss_exposure_m: 3.4,
    previous_annual_loss_exposure_m: 3.0,
    predicted_risk_score: 94
  },
  {
    supplier_id: "SUP-002",
    supplier_name: "Clinical Data Vendor B",
    tier: "Tier 1",
    business_unit: "R&D",
    region: "Europe",
    service_category: "Clinical Data Services",
    cloud_provider: "Azure",
    fourth_party: "EU Data Processing Cluster",
    criticality_score: 92,
    risk_score: 88,
    residual_risk: "High",
    annual_loss_exposure_m: 2.8,
    previous_annual_loss_exposure_m: 2.5,
    predicted_risk_score: 90
  },
  {
    supplier_id: "SUP-003",
    supplier_name: "Logistics Provider C",
    tier: "Tier 2",
    business_unit: "Supply Chain",
    region: "Global",
    service_category: "Logistics",
    cloud_provider: "AWS",
    fourth_party: "Shared Hosting Provider Y",
    criticality_score: 81,
    risk_score: 79,
    residual_risk: "High",
    annual_loss_exposure_m: 1.6,
    previous_annual_loss_exposure_m: 1.7,
    predicted_risk_score: 82
  },
  {
    supplier_id: "SUP-004",
    supplier_name: "Manufacturing SaaS D",
    tier: "Tier 1",
    business_unit: "Manufacturing",
    region: "North America",
    service_category: "Manufacturing Systems",
    cloud_provider: "AWS",
    fourth_party: "Shared Hosting Provider Y",
    criticality_score: 89,
    risk_score: 76,
    residual_risk: "Medium",
    annual_loss_exposure_m: 1.2,
    previous_annual_loss_exposure_m: 1.3,
    predicted_risk_score: 80
  },
  {
    supplier_id: "SUP-005",
    supplier_name: "Procurement Platform E",
    tier: "Tier 2",
    business_unit: "Procurement",
    region: "Europe",
    service_category: "SaaS",
    cloud_provider: "Google Cloud",
    fourth_party: "Offshore Support Center Z",
    criticality_score: 74,
    risk_score: 68,
    residual_risk: "Medium",
    annual_loss_exposure_m: 0.9,
    previous_annual_loss_exposure_m: 0.8,
    predicted_risk_score: 72
  }
];

const findingsExtended = [
  {
    finding_id: "FND-001",
    supplier_id: "SUP-001",
    severity: "Critical",
    status: "Open",
    owner: "Cyber Assurance",
    analyst: "Analyst A",
    current_period: true,
    previous_period: false
  },
  {
    finding_id: "FND-002",
    supplier_id: "SUP-002",
    severity: "Critical",
    status: "Open",
    owner: "Supplier Owner",
    analyst: "Analyst B",
    current_period: true,
    previous_period: true
  },
  {
    finding_id: "FND-003",
    supplier_id: "SUP-003",
    severity: "High",
    status: "Open",
    owner: "TPRM Analyst",
    analyst: "Analyst A",
    current_period: true,
    previous_period: true
  },
  {
    finding_id: "FND-004",
    supplier_id: "SUP-004",
    severity: "High",
    status: "Closed",
    owner: "Manufacturing IT",
    analyst: "Analyst C",
    current_period: false,
    previous_period: true
  }
];

const monitoringSignalsExtended = [
  {
    signal_id: "SIG-001",
    supplier_id: "SUP-001",
    type: "Vulnerability",
    severity: "Critical",
    current_period: true,
    previous_period: false
  },
  {
    signal_id: "SIG-002",
    supplier_id: "SUP-002",
    type: "Credential Leak",
    severity: "Critical",
    current_period: true,
    previous_period: true
  },
  {
    signal_id: "SIG-003",
    supplier_id: "SUP-002",
    type: "Threat Signal",
    severity: "High",
    current_period: true,
    previous_period: false
  },
  {
    signal_id: "SIG-004",
    supplier_id: "SUP-003",
    type: "Vulnerability",
    severity: "High",
    current_period: true,
    previous_period: true
  },
  {
    signal_id: "SIG-005",
    supplier_id: "SUP-004",
    type: "Ransomware",
    severity: "High",
    current_period: true,
    previous_period: false
  }
];

function bucketCriticality(score) {
  if (score >= 85) return "High Criticality";
  if (score >= 70) return "Medium Criticality";
  return "Low Criticality";
}

function bucketRisk(score) {
  if (score >= 80) return "High Risk";
  if (score >= 60) return "Medium Risk";
  return "Low Risk";
}

function groupSum(items, key, valueField) {
  return items.reduce((acc, item) => {
    const group = item[key];
    acc[group] = (acc[group] || 0) + item[valueField];
    return acc;
  }, {});
}

function groupCount(items, key) {
  return items.reduce((acc, item) => {
    const group = item[key];
    acc[group] = (acc[group] || 0) + 1;
    return acc;
  }, {});
}

function calculateMissingKpis() {
  const totalExposure = suppliersExtended.reduce(
    (sum, s) => sum + s.annual_loss_exposure_m,
    0
  );

  const previousExposure = suppliersExtended.reduce(
    (sum, s) => sum + s.previous_annual_loss_exposure_m,
    0
  );

  const criticalSuppliersAtRisk = suppliersExtended.filter(
    s => s.tier === "Tier 1" && s.residual_risk === "High"
  ).length;

  const exposureTrendPercent =
    ((totalExposure - previousExposure) / previousExposure) * 100;

  const exposureByBusinessUnit = groupSum(
    suppliersExtended,
    "business_unit",
    "annual_loss_exposure_m"
  );

  const topBusinessImpactArea = Object.entries(exposureByBusinessUnit)
    .sort((a, b) => b[1] - a[1])[0];

  const heatmap = suppliersExtended.reduce((acc, s) => {
    const quadrant = `${bucketCriticality(s.criticality_score)} / ${bucketRisk(s.risk_score)}`;
    acc[quadrant] = (acc[quadrant] || 0) + 1;
    return acc;
  }, {});

  const highCriticalityHighRisk = suppliersExtended.filter(
    s => bucketCriticality(s.criticality_score) === "High Criticality" &&
         bucketRisk(s.risk_score) === "High Risk"
  ).length;

  const topVendorExposure = Math.max(
    ...suppliersExtended.map(s => s.annual_loss_exposure_m)
  );

  const topVendorConcentrationRatio =
    (topVendorExposure / totalExposure) * 100;

  const exposureByCloud = groupSum(
    suppliersExtended,
    "cloud_provider",
    "annual_loss_exposure_m"
  );

  const topCloudExposure = Math.max(...Object.values(exposureByCloud));
  const totalCloudExposure = Object.values(exposureByCloud).reduce(
    (sum, value) => sum + value,
    0
  );

  const cloudConcentrationRatio =
    (topCloudExposure / totalCloudExposure) * 100;

  const exposureByFourthParty = groupSum(
    suppliersExtended,
    "fourth_party",
    "annual_loss_exposure_m"
  );

  const topFourthPartyExposure = Math.max(...Object.values(exposureByFourthParty));
  const totalFourthPartyExposure = Object.values(exposureByFourthParty).reduce(
    (sum, value) => sum + value,
    0
  );

  const fourthPartyConcentrationRatio =
    (topFourthPartyExposure / totalFourthPartyExposure) * 100;

  const currentOpenFindings = findingsExtended.filter(
    f => f.status === "Open" && f.current_period
  ).length;

  const previousOpenFindings = findingsExtended.filter(
    f => f.status === "Open" && f.previous_period
  ).length;

  const backlogGrowthPercent =
    previousOpenFindings === 0
      ? 0
      : ((currentOpenFindings - previousOpenFindings) / previousOpenFindings) * 100;

  const analysts = [...new Set(findingsExtended.map(f => f.analyst))];
  const findingsPerAnalyst =
    currentOpenFindings / analysts.length;

  const currentVulnerabilities = monitoringSignalsExtended.filter(
    s => s.type === "Vulnerability" && s.current_period
  ).length;

  const previousVulnerabilities = monitoringSignalsExtended.filter(
    s => s.type === "Vulnerability" && s.previous_period
  ).length;

  const newVulnerabilityTrend =
    previousVulnerabilities === 0
      ? 0
      : ((currentVulnerabilities - previousVulnerabilities) / previousVulnerabilities) * 100;

  const breachSignalCount = monitoringSignalsExtended.filter(
    s => ["Threat Signal", "Malware", "Breach", "Ransomware"].includes(s.type)
  ).length;

  const topRisksByBusinessImpact = Object.entries(exposureByBusinessUnit)
    .map(([businessUnit, exposure]) => ({ businessUnit, exposure }))
    .sort((a, b) => b.exposure - a.exposure);

  const forecastedExposure =
    totalExposure * 1.08;

  const predictedRiskBreaches = suppliersExtended.filter(
    s => s.predicted_risk_score >= 85
  ).length;

  return {
    criticalSuppliersAtRisk,
    exposureTrendPercent: `${exposureTrendPercent.toFixed(1)}%`,
    topBusinessImpactArea: `${topBusinessImpactArea[0]} ($${topBusinessImpactArea[1].toFixed(1)}M)`,
    heatmap,
    highCriticalityHighRisk,
    topVendorConcentrationRatio: `${topVendorConcentrationRatio.toFixed(1)}%`,
    cloudConcentrationRatio: `${cloudConcentrationRatio.toFixed(1)}%`,
    fourthPartyConcentrationRatio: `${fourthPartyConcentrationRatio.toFixed(1)}%`,
    backlogGrowthPercent: `${backlogGrowthPercent.toFixed(1)}%`,
    findingsPerAnalyst: findingsPerAnalyst.toFixed(1),
    newVulnerabilityTrend: `${newVulnerabilityTrend.toFixed(1)}%`,
    breachSignalCount,
    topRisksByBusinessImpact,
    forecastedExposure: `$${forecastedExposure.toFixed(1)}M`,
    predictedRiskBreaches
  };
}

console.log(calculateMissingKpis());