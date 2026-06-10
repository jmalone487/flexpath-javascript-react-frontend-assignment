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

      if (data.length === 0) {
        setMessage("No Records To Display");
      } else {
        setMessage(`Displaying ${data.length} Records`);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
      setResults([]);
      setMessage("Error fetching data");
    }

    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h2>User Behavior Data</h2>

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Status Message */}
      <p className="mt-3">{message}</p>

      {/* Metrics */}
      <MetricsDisplay results={results} />

      {/* Results Table */}
      <SearchResultsTable
        results={results}
        loading={loading}
        error={error}
      />
    </div>
  );
}
