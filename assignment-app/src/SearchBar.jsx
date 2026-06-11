import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [filterType, setFilterType] = useState("model");
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filterType, keyword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">

        <div className="col-md-4">
          <label className="form-label fw-bold">Select data point</label>
          <select
            className="form-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="model">Model</option>
            <option value="gender">Gender</option>
            <option value="operatingSystem">Operating System</option>
            <option value="behaviorClass">Behavior Class</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label fw-bold">Search by Keyword</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter keyword..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div className="col-md-2 d-flex align-items-end">
          <button className="btn btn-primary w-100">Search</button>
        </div>

      </div>
    </form>
  );
}
