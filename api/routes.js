const express = require("express");
const _ = require("lodash");
const router = express.Router();
const json = require("./files/user-behavior-data.json");

// Return full dataset
router.get("/data", (req, res) => {
  res.send(json);
});

// Search route
router.get("/data/search", (req, res) => {
  const filterType = req.query.filterType || null;
  const keyword = req.query.keyword || "";

  // Debug log so we can see what the backend receives
  console.log("FILTER:", filterType, "KEYWORD:", keyword);

  let searchType;
  if (filterType) {
    const lower = filterType.toLowerCase();
    searchType =
      lower === "model"
        ? "m"
        : lower === "gender"
        ? "g"
        : lower === "operatingsystem"
        ? "op"
        : lower === "behaviorclass"
        ? "bc"
        : "unfiltered";
  }

  // FIXED: keyword.trim() instead of !keyword
  if (searchType === "unfiltered" || keyword.trim() === "") {
    return res.send(json);
  }

  const lowerKeyword = keyword.toLowerCase().trim();

  const filteredData = _.filter(json, (record) => {
    switch (searchType) {
      case "m":
        return record["Device Model"]
          .toLowerCase()
          .includes(lowerKeyword);

      case "g":
        return record["Gender"].toLowerCase() === lowerKeyword;

      case "op":
        return record["Operating System"]
          .toLowerCase()
          .includes(lowerKeyword);

      case "bc":
        return record["User Behavior Class"]
          .toString()
          .toLowerCase() === lowerKeyword;

      default:
        return false;
    }
  });

  return res.send(filteredData);
});

module.exports = router;
