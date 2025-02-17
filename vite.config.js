import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    svgr(),
  ],
  resolve: {
    alias: {
      '@icons': path.resolve('src/assets/icons'),
      '@images': path.resolve('src/assets/images'),
      '@components': path.resolve('src/components'),
      '@hooks': path.resolve('src/hooks'),
      '@layouts': path.resolve('src/layouts'),
      '@pages': path.resolve('src/pages'),
      '@store': path.resolve('src/store'),
      '@services': path.resolve('src/services'),
      '@utils': path.resolve('src/utils'),
    },
  },
});
