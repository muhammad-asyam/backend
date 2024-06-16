require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const biodataRoutes = require("./routes/biodataRoutes");

const app = express();
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/biodata", biodataRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port http://0.0.0.0:${PORT}/`);
});
