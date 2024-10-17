import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@pages": "/src/pages",
      "@routes": "/src/routes",
      "@components": "/src/components",
      "@constants": "/src/constants",
      "@providers": "/src/providers",
      "@types": "/src/types",
    },
  },
});
