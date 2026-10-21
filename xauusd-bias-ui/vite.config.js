import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// During development, any request to /api/... is forwarded to your C# backend.
// Change the port to match your ASP.NET Core launchSettings.json.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
