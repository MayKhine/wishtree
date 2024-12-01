import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import styleX from "vite-plugin-stylex"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), styleX()],
  build: {
    outDir: "dist/frontend",
  },
})
