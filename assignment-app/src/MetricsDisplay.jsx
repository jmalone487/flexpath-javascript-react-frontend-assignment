import React from "react";

// Helper: convert strings to numbers safely
const toNumber = (value) => Number(value);

// Helper: calculate average
const calculateAverage = (arr) => {
  if (!arr.length) return 0;
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return sum / arr.length;
};

// Helper: calculate median
const calculateMedian = (arr) => {
  if (!arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
};

// Helper: format numbers in en-US
const formatNumber = (num) =>
  num.toLocaleString("en-US", { maximumFractionDigits: 2 });

export default function MetricsDisplay({ results }) {
  if (!results || results.length === 0) {
    return null; // No metrics if no results
  }

  // Extract numeric arrays
  const appUsage = results.map((r) =>
    toNumber(r["App Usage Time (min/day)"])
  );
  const screenOn = results.map((r) =>
    toNumber(r["Screen On Time (hours/day)"])
  );
  const appsInstalled = results.map((r) =>
    toNumber(r["Number of Apps Installed"])
  );
  const ages = results.map((r) => toNumber(r["Age"]));

  // Calculate metrics
  const metrics = [
    {
      title: "App Usage Time",
      avg: formatNumber(calculateAverage(appUsage)),
      med: formatNumber(calculateMedian(appUsage)),
      unit: "Minutes",
    },
    {
      title: "Screen On Time",
      avg: formatNumber(calculateAverage(screenOn)),
      med: formatNumber(calculateMedian(screenOn)),
      unit: "Hours",
    },
    {
      title: "Apps Installed",
      avg: formatNumber(calculateAverage(appsInstalled)),
      med: formatNumber(calculateMedian(appsInstalled)),
      unit: "Apps",
    },
    {
      title: "Age",
      avg: formatNumber(calculateAverage(ages)),
      med: formatNumber(calculateMedian(ages)),
      unit: "Years",
    },
  ];

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Metrics</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {metrics.map((m) => (
          <div
            key={m.title}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
              width: "220px",
              background: "#f9f9f9",
            }}
          >
            <h3>{m.title}</h3>
            <p>
              <strong>Average:</strong> {m.avg} {m.unit}
            </p>
            <p>
              <strong>Median:</strong> {m.med} {m.unit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
