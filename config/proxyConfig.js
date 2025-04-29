const { createProxyMiddleware } = require("http-proxy-middleware");

// Configure proxies for different services
const setupProxies = (app) => {
  // External API proxy (e.g., a third-party service)
  app.use(
    "/api/external",
    createProxyMiddleware({
      target:
        process.env.EXTERNAL_API_URL || "https://wh3d7769365c8ee24de8.free.beeceptor.com/",
      changeOrigin: true,
      pathRewrite: {
        "^/api/external": "/api",
      },
      onProxyReq: (proxyReq, req, res) => {
        // Hide API keys from client by adding them here
        if (process.env.EXTERNAL_API_KEY) {
          proxyReq.setHeader(
            "Authorization",
            `Bearer ${process.env.EXTERNAL_API_KEY}`
          );
        }
      },
      // Handle errors from the proxy target
      onError: (err, req, res) => {
        console.error("External API proxy error:", err);
        res.status(503).json({
          error: "External service temporarily unavailable",
          message:
            process.env.NODE_ENV === "development" ? err.message : undefined,
        });
      },
    })
  );

  // Internal service proxy (e.g., another Azure service in your architecture)
  app.use(
    "/api/internal-service",
    createProxyMiddleware({
      target:
        process.env.INTERNAL_SERVICE_URL ||
        "https://internal-service.azurewebsites.net",
      changeOrigin: true,
      onProxyReq: (proxyReq, req, res) => {
        // You might want to add internal authentication headers
        if (process.env.INTERNAL_SERVICE_KEY) {
          proxyReq.setHeader(
            "X-Internal-Key",
            process.env.INTERNAL_SERVICE_KEY
          );
        }

        // Forward user context if available
        if (req.user) {
          proxyReq.setHeader("X-User-ID", req.user.id);
        }
      },
    })
  );

};

module.exports = setupProxies;
