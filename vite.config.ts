import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const isCI = process.env.CI === "true";

export default mergeConfig(
  defineConfig({
    base: isCI ? "" : "/front_5th_chapter2-2/",
    plugins: [react()],
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "index.refactoring.html"),
          origin: path.resolve(__dirname, "index.origin.html"),
        },
      },
    },
  }),
  defineTestConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
    },
  }),
);
