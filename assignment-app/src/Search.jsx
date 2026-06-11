import { useState } from "react";
import SearchBar from "./SearchBar";
import MetricsDisplay from "./MetricsDisplay";
import SearchResultsTable from "./SearchResultsTable";

export default function Search() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("No Records To Display");
  const [error, setError] = useState(null);

  const handleSearch = async (filterType, keyword) => {
    setLoading(true);
    setError(null);
    setMessage("Loading...");

    try {
      const url = `http://localhost:3000/api/data/search?filterType=${filterType}&keyword=${keyword}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      setResults(data);

      setMessage(
        data.length === 0
          ? "No Records To Display"
          : `Displaying ${data.length} Records`
      );
    } catch (err) {
      setError(err.message);
      setResults([]);
      setMessage("Error fetching data");
    }

    setLoading(false);
  };

  return (
    <div className="container mt-4">

      <h2 className="fw-bold mb-1">User Behavior Data</h2>
      <p className="text-muted mb-4">Search Through Dataset</p>

      <div className="card p-3 mb-4 shadow-sm">
        <SearchBar onSearch={handleSearch} />
      </div>

      <p className="mt-2">{message}</p>

      <h4 className="fw-bold mb-3">Metrics</h4>
      <MetricsDisplay results={results} />

      <h4 className="fw-bold mt-4 mb-3">Search Results</h4>
      <SearchResultsTable results={results} loading={loading} error={error} />
    </div>
  );
}
