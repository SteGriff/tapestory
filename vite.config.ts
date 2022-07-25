import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin({ fix: true })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "build",
  },
  server: {
    strictPort: true,
    hmr: {
      //port: 443 // Glitch only - Comment this out on local PC
    },
  },
});
