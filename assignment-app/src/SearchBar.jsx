import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [filterType, setFilterType] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filterType, keyword);
  };

  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-md-4">
        <select
          className="form-select"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">Select Filter</option>

          <option value="gender">Gender</option>
          <option value="operatingsystem">Operating System</option>
          <option value="model">Model</option>
          <option value="behaviorclass">Behavior Class</option>
        </select>
      </div>

      <div className="col-md-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <div className="col-md-4">
        <button className="btn btn-primary w-100" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}
