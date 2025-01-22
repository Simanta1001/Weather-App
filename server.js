import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://api.weatherapi.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '', // Remove "/api" prefix when forwarding requests
    },
  })
);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
