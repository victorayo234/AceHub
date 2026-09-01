// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Hard-pin Nitro to the Vercel preset so `npm run build` always outputs a
  // Vercel-compatible serverless bundle. NITRO_PRESET env var on Vercel also
  // overrides this automatically, but this makes local CI predictable.
  nitro: {
    preset: "vercel",
  } as any,
  vite: {
    define: {
      "import.meta.env.VITE_SUPABASE_URL": JSON.stringify("https://eiuqjjjkhcvphpgegqko.supabase.co"),
      "import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY": JSON.stringify(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpdXFqampraGN2cGhwZ2VncWtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2NDYwMDUsImV4cCI6MjEwMzIyMjAwNX0.Tl88bgPTEfDSS5DPYb9Uc1tKz9TJ3dp0CdAVSHc4Kb4"
      ),
      "import.meta.env.VITE_SUPABASE_PROJECT_ID": JSON.stringify("eiuqjjjkhcvphpgegqko"),
    },
    ssr: {
      noExternal: true,
    },
  },
});