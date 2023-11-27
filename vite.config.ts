import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/components/index.ts"),
      name: "TrnrUI",
      fileName: "trnr-ui",
    },
    rollupOptions: {
      input: { main: resolve(__dirname, "index.html") },
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
