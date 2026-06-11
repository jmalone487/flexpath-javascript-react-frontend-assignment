export default function SearchResultsTable({ results, loading, error }) {
  if (loading) return <p>Loading Records...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!results || results.length === 0) return <p>No Records To Display</p>;

  const headers = Object.keys(results[0]);

  return (
    <table className="table table-bordered table-striped table-hover">
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th key={i} style={{ textTransform: "capitalize" }}>
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {results.map((row, i) => (
          <tr key={i}>
            {headers.map((header, j) => (
              <td key={j}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
