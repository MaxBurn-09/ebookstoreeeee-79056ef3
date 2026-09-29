// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import path from "path";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    resolve: {
      alias: [
        { find: /^entities$/, replacement: path.resolve(__dirname, "node_modules/entities/lib/index.js") },
        { find: /^entities\/lib\/(decode|encode|escape|decode_codepoint)\.js$/, replacement: path.resolve(__dirname, "node_modules/entities/lib/$1.js") },
        { find: /^entities\/(decode|encode|escape|decode_codepoint)$/, replacement: path.resolve(__dirname, "node_modules/entities/lib/$1.js") },
      ],
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
