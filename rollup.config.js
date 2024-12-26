import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import resolve from "@rollup/plugin-node-resolve"
// import replace from "@rollup/plugin-replace"
import { defineConfig } from "rollup"
import typescript from "rollup-plugin-typescript2"
// import dotenv from "dotenv"
// import fs from "fs"
import { builtinModules } from "module"
// import path from "path"
import replace from "@rollup/plugin-replace"
import autoNamedExports from "rollup-plugin-auto-named-exports"
import polyfillNode from "rollup-plugin-polyfill-node"

export default defineConfig({
  input: "src/backend/main.ts", // Entry point of your application
  output: {
    file: "dist/backend/main.cjs", // Output bundle file
    format: "cjs", // CommonJS format for Node.js
    sourcemap: true, // Include sourcemaps for debugging
  },
  plugins: [
    typescript({
      tsconfig: "./tsconfig-backend.json", // Path to your tsconfig file
    }),
    resolve({ preferBuiltins: true }),
    commonjs(), // Convert CommonJS to ES modules
    polyfillNode(),

    // autoNamedExports(),
    // globals(),
    // builtin(),
    json(), // Support importing JSON files
    // terser(), // Minify the output bundle
    replace({
      preventAssignment: true,
      // "import.meta.env": JSON.stringify({
      //   ...getEnv(),
      // }),
    }),
  ],
  external: [
    "sqlite3",
    // Specify modules that should remain external (Node.js built-ins)
    ...builtinModules,
  ],
})

// console.log("builtinModules", builtinModules)
