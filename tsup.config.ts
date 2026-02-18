import { defineConfig } from "tsup";

export default defineConfig([
  /**
   * ============================
   * Browser build
   * ============================
   *
   * Produces individual component builds:
   *   ... (etc for each component)
   */
  {
    entry: [
      "src/index.ts", // Main entry point for browser build
    ],

    // Output directory for browser bundle
    outDir: "dist/browser",

    tsconfig: ".conf/tsconfig.browser.json",

    bundle: true, // Keep individual modules for better tree-shaking

    // Browser consumers expect ESM
    format: ["esm"],

    // Tells esbuild this is browser-safe code
    platform: "browser",

    // Reasonable baseline for modern browsers
    target: "es2020",

    // Smaller bundles
    treeshake: true,

    // Useful for debugging in bundlers
    sourcemap: true,

    // Emit .d.ts files
    dts: true,
  },

  /**
   * ============================
   * Node build
   * ============================
   *
   */
  {
    entry: [
      "src/**/*.ts"
    ],

    // Output directory for node bundle
    outDir: "dist/node",

    tsconfig: ".conf/tsconfig.node.json",

    bundle: false, // Don't bundle node build, keep imports as-is

    clean: true,

    // Support both module systems
    format: ["cjs", "esm"],

    // Enables Node globals and resolution
    platform: "node",

    // Node 16+ safe baseline
    target: "es2020",

    treeshake: true,
    sourcemap: true,

    // Emit .d.ts files (shared shape)
    dts: true,
  },
]);
