export default function SearchResultsTable({ results, loading, error }) {
  if (loading) {
    return <p>Loading Records...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!results || results.length === 0) {
    return <p>No Records To Display</p>;
  }

  const headers = Object.keys(results[0]);

  return (
    <table className="table table-bordered mt-3">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} style={{ textAlign: "left" }}>
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {results.map((record, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, colIndex) => (
              <td key={colIndex} style={{ textAlign: "left" }}>
                {record[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
