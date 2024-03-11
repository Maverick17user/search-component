import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "./static",
  build: {
    rollupOptions: {
      input: "/index.html",
    },
  },
  server: {
    host: true,
    open: true,
    proxy: {
      "/search": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
