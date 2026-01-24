import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    // Em dev: "/", em build (GitHub Pages): "/Senha_online/"
    base: command === "build" ? "/Senha_online/" : "/",
  };
});
