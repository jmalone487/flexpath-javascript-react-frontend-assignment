import { useState } from "react";
import SearchBar from "./SearchBar";

export default function Search() {
  const [results, setResults] = useState([]);

  const handleSearch = async (filterType, keyword) => {
    if (!filterType || !keyword) {
      alert("Please select a filter and enter a keyword.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/data/search?filterType=${filterType}&keyword=${keyword}`
      );

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Search Through Dataset</h1>

      <SearchBar onSearch={handleSearch} />

      <div className="mt-4">
        <h3>Results</h3>

        {results.length === 0 ? (
          <p>No results yet.</p>
        ) : (
          <ul className="list-group">
            {results.map((item, index) => (
              <li key={index} className="list-group-item">
                <strong>Model:</strong> {item["Device Model"]} <br />
                <strong>Gender:</strong> {item["Gender"]} <br />
                <strong>OS:</strong> {item["Operating System"]} <br />
                <strong>Behavior Class:</strong> {item["User Behavior Class"]}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
