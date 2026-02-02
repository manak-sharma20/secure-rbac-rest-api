const express = require("express");
const cors = require("cors");
const authRoutes = require("./modules/auth/auth.routes");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
