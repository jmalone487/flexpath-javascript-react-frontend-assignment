const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const apiRoutes = require("./routes");

app.use(cors());

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the api",
  });
});

// All API routes
app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
