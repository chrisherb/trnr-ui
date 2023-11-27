import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import * as fs from "fs";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/trnr-ui",
  plugins: [
    // explicitly emit an index.html file for demo purposes
    {
      name: "emit-index",
      generateBundle() {
        this.emitFile({
          type: "asset",
          fileName: "index.html",
          source: fs.readFileSync(
            path.resolve(__dirname, "index.html"),
            "utf-8"
          ),
        });
      },
    },
    react(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/components/index.ts"),
      name: "TrnrUI",
      fileName: "trnr-ui",
    },
    rollupOptions: {
      external: ["react"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "React",
        },
      },
    },
  },
});
