import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["m66963-5173.csb.app"],
  },
  css: {
    modules: {
      scopeBehaviour: "local",
      generateScopedName: "[name]__[local]__[hash:base64:5]",
    },
  },
});
