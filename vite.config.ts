import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import styleX from "vite-plugin-stylex"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), styleX()],
  build: {
    outDir: "dist/frontend",
  },
  server: {
    // proxy /trpc requests
    proxy: {
      "/trpc": {
        target: "http://localhost:4000", // Your Express server
        changeOrigin: true,
        // cookieDomainRewrite: "", // ?? do i need it? Allows cookies to be written
      },
    },
  },
})
