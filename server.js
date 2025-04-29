const express = require("express");
const path = require("path");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const setupProxies = require("./config/proxyConfig");

const app = express();

// Middleware
app.use(cors());
app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false, // Adjust as needed for your React app
  })
);
app.use(express.json());

// API Routes
//app.use("/api/example", require("./server/routes/example"));

// Setup proxy routes from our configuration module
setupProxies(app);

// Serve static website files from the React app

app.use(express.static("frontend/dist"));

// Any route that doesn't match the API routes will serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// Define PORT (Azure App Service uses process.env.PORT)
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
