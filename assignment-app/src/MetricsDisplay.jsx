export default function MetricsDisplay({ results }) {
  // If no results, show zeroed-out cards
  if (!results || results.length === 0) {
    return (
      <div className="row g-3">
        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h6>App Usage Time</h6>
            <p>Average = 0 Minutes</p>
            <p>Median = 0 Minutes</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h6>Screen On Time</h6>
            <p>Average = 0 Hours</p>
            <p>Median = 0 Hours</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h6>Apps Installed</h6>
            <p>Average = 0 Apps</p>
            <p>Median = 0 Apps</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h6>Age</h6>
            <p>Average = 0 Years</p>
            <p>Median = 0 Years</p>
          </div>
        </div>
      </div>
    );
  }

  // Helper functions
  const avg = (arr) =>
    (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2);

  const median = (arr) => {
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0
      ? sorted[mid]
      : ((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2);
  };

  // Extract correct fields from dataset
  const usage = results.map((r) =>
    Number(r["App Usage Time (min/day)"])
  );

  const screen = results.map((r) =>
    Number(r["Screen On Time (hours/day)"])
  );

  const apps = results.map((r) =>
    Number(r["Number of Apps Installed"])
  );

  const ages = results.map((r) =>
    Number(r["Age"])
  );

  return (
    <div className="row g-3">

      <div className="col-md-3">
        <div className="card p-3 shadow-sm">
          <h6>App Usage Time</h6>
          <p>Average = {avg(usage)} Minutes</p>
          <p>Median = {median(usage)} Minutes</p>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card p-3 shadow-sm">
          <h6>Screen On Time</h6>
          <p>Average = {avg(screen)} Hours</p>
          <p>Median = {median(screen)} Hours</p>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card p-3 shadow-sm">
          <h6>Apps Installed</h6>
          <p>Average = {avg(apps)} Apps</p>
          <p>Median = {median(apps)} Apps</p>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card p-3 shadow-sm">
          <h6>Age</h6>
          <p>Average = {avg(ages)} Years</p>
          <p>Median = {median(ages)} Years</p>
        </div>
      </div>

    </div>
  );
}
