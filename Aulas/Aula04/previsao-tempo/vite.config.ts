import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/cptec": {
        target: "http://servicos.cptec.inpe.br",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cptec/, "")
      }
    }
  }
});