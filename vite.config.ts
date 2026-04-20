import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr({
      esbuildOptions: {
        loader: "jsx",
        jsx: "automatic",
      },
    }),
    react(),
  ],

  css: {
    modules: {
      scopeBehaviour: "local",
      generateScopedName: "[name]__[local]__[hash:base64:5]",
    },
  },
});
