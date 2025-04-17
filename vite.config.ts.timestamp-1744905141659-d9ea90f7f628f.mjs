// vite.config.ts
import * as path from "path";
import { resolve as resolve2 } from "path";
import { defineConfig } from "file:///Users/beardkoda/Documents/projects/tenderCash/tender/agent-sdk-vue/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/beardkoda/Documents/projects/tenderCash/tender/agent-sdk-vue/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import dts from "file:///Users/beardkoda/Documents/projects/tenderCash/tender/agent-sdk-vue/node_modules/vite-plugin-dts/dist/index.mjs";
import * as fs from "fs";
import { fileURLToPath } from "url";
import { viteStaticCopy } from "file:///Users/beardkoda/Documents/projects/tenderCash/tender/agent-sdk-vue/node_modules/vite-plugin-static-copy/dist/index.js";
import svgr from "file:///Users/beardkoda/Documents/projects/tenderCash/tender/agent-sdk-vue/node_modules/vite-plugin-svgr/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///Users/beardkoda/Documents/projects/tenderCash/tender/agent-sdk-vue/vite.config.ts";
var __filename = fileURLToPath(__vite_injected_original_import_meta_url);
var __dirname = path.dirname(__filename);
var pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
var moduleName = "TenderCashAgentSdkVue";
var vite_config_default = defineConfig(({ mode }) => {
  const isProduction = mode === "production";
  return {
    plugins: [
      vue(),
      svgr(),
      dts({
        // Specify entry root and output directory for declaration files
        entryRoot: resolve2(__dirname, "src"),
        outDir: resolve2(__dirname, "dist/types"),
        // Optional: Insert additional imports or references in generated d.ts files
        insertTypesEntry: true
      }),
      viteStaticCopy({
        targets: [
          {
            src: "src/assets/*",
            // Copy everything from src/assets
            dest: "assets"
            // Destination relative to each outDir
          }
        ]
      })
    ],
    // Define global constants like process.env.NODE_ENV
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode)
    },
    // Add resolve alias
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "vue": "vue/dist/vue.esm-bundler.js"
        // Use the build with the runtime compiler
      }
    },
    build: {
      // Library mode configuration
      lib: {
        // Entry point for the library
        entry: resolve2(__dirname, "src/index.ts"),
        // Name for the global variable (if using UMD format)
        name: moduleName,
        // Output file name formats
        fileName: (format) => `tender-cash-agent-sdk-vue.${format}.js`,
        // Output formats (e.g., esm, cjs, umd, iife)
        formats: ["es", "umd"]
        // Adjusted to esm and umd as common choices
      },
      // Rollup options for more control (optional)
      rollupOptions: {
        // Externalize dependencies that shouldn't be bundled
        external: ["vue"],
        output: {
          // Global variables for external dependencies (for UMD format)
          globals: {
            vue: "Vue"
          },
          banner: `/**
    * ${moduleName}.js
    * @summary ${pkg.description}
    * @version v${pkg.version}
    * @author ${pkg.author}
    * @license Released under the ${pkg.license} license.
    * @copyright Tender Cash
    */`
          // Preserve modules for ESM format to allow tree-shaking
          // Note: This might conflict with single file output for UMD
          // Consider separate builds or omit if single file is required
          // preserveModules: true, 
          // preserveModulesRoot: 'src',
        }
      },
      // Minify production build
      minify: isProduction ? "esbuild" : false,
      // Generate sourcemaps
      sourcemap: true,
      // Empty output directory before build
      emptyOutDir: true
      // Usually desired for library builds
    },
    // Optional: Configure development server if needed
    server: {
      host: "0.0.0.0",
      // Allow access from network
      port: 4234
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYmVhcmRrb2RhL0RvY3VtZW50cy9wcm9qZWN0cy90ZW5kZXJDYXNoL3RlbmRlci9hZ2VudC1zZGstdnVlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYmVhcmRrb2RhL0RvY3VtZW50cy9wcm9qZWN0cy90ZW5kZXJDYXNoL3RlbmRlci9hZ2VudC1zZGstdnVlL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9iZWFyZGtvZGEvRG9jdW1lbnRzL3Byb2plY3RzL3RlbmRlckNhc2gvdGVuZGVyL2FnZW50LXNkay12dWUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnO1xuaW1wb3J0IHsgdml0ZVN0YXRpY0NvcHkgfSBmcm9tICd2aXRlLXBsdWdpbi1zdGF0aWMtY29weSc7XG5pbXBvcnQgc3ZnciBmcm9tICd2aXRlLXBsdWdpbi1zdmdyJztcblxuLy8gRGVyaXZlIF9fZGlybmFtZSBpbiBhbiBFUyBtb2R1bGUgY29udGV4dFxuY29uc3QgX19maWxlbmFtZSA9IGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKTtcbmNvbnN0IF9fZGlybmFtZSA9IHBhdGguZGlybmFtZShfX2ZpbGVuYW1lKTtcblxuLy8gUmVhZCBwYWNrYWdlLmpzb24gdG8gZ2V0IG1vZHVsZSBuYW1lIGFuZCB2ZXJzaW9uXG5jb25zdCBwa2cgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYygnLi9wYWNrYWdlLmpzb24nLCAndXRmLTgnKSk7XG5jb25zdCBtb2R1bGVOYW1lID0gXCJUZW5kZXJDYXNoQWdlbnRTZGtWdWVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICAgIGNvbnN0IGlzUHJvZHVjdGlvbiA9IG1vZGUgPT09ICdwcm9kdWN0aW9uJztcbiAgICByZXR1cm4ge1xuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICB2dWUoKSxcbiAgICAgICAgICAgIHN2Z3IoKSxcbiAgICAgICAgICAgIGR0cyh7XG4gICAgICAgICAgICAgICAgLy8gU3BlY2lmeSBlbnRyeSByb290IGFuZCBvdXRwdXQgZGlyZWN0b3J5IGZvciBkZWNsYXJhdGlvbiBmaWxlc1xuICAgICAgICAgICAgICAgIGVudHJ5Um9vdDogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcbiAgICAgICAgICAgICAgICBvdXREaXI6IHJlc29sdmUoX19kaXJuYW1lLCAnZGlzdC90eXBlcycpLFxuICAgICAgICAgICAgICAgIC8vIE9wdGlvbmFsOiBJbnNlcnQgYWRkaXRpb25hbCBpbXBvcnRzIG9yIHJlZmVyZW5jZXMgaW4gZ2VuZXJhdGVkIGQudHMgZmlsZXNcbiAgICAgICAgICAgICAgICBpbnNlcnRUeXBlc0VudHJ5OiB0cnVlLCBcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdml0ZVN0YXRpY0NvcHkoe1xuICAgICAgICAgICAgICAgIHRhcmdldHM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzcmM6ICdzcmMvYXNzZXRzLyonLCAvLyBDb3B5IGV2ZXJ5dGhpbmcgZnJvbSBzcmMvYXNzZXRzXG4gICAgICAgICAgICAgICAgICAgIGRlc3Q6ICdhc3NldHMnICAgICAvLyBEZXN0aW5hdGlvbiByZWxhdGl2ZSB0byBlYWNoIG91dERpclxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSlcbiAgICAgICAgXSxcbiAgICAgICAgLy8gRGVmaW5lIGdsb2JhbCBjb25zdGFudHMgbGlrZSBwcm9jZXNzLmVudi5OT0RFX0VOVlxuICAgICAgICBkZWZpbmU6IHtcbiAgICAgICAgICAncHJvY2Vzcy5lbnYuTk9ERV9FTlYnOiBKU09OLnN0cmluZ2lmeShtb2RlKSxcbiAgICAgICAgfSxcbiAgICAgICAgLy8gQWRkIHJlc29sdmUgYWxpYXNcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgICAgICAgICAgICAgICd2dWUnOiAndnVlL2Rpc3QvdnVlLmVzbS1idW5kbGVyLmpzJyAvLyBVc2UgdGhlIGJ1aWxkIHdpdGggdGhlIHJ1bnRpbWUgY29tcGlsZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYnVpbGQ6IHtcbiAgICAgICAgICAgIC8vIExpYnJhcnkgbW9kZSBjb25maWd1cmF0aW9uXG4gICAgICAgICAgICBsaWI6IHtcbiAgICAgICAgICAgICAgICAvLyBFbnRyeSBwb2ludCBmb3IgdGhlIGxpYnJhcnlcbiAgICAgICAgICAgICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5kZXgudHMnKSxcbiAgICAgICAgICAgICAgICAvLyBOYW1lIGZvciB0aGUgZ2xvYmFsIHZhcmlhYmxlIChpZiB1c2luZyBVTUQgZm9ybWF0KVxuICAgICAgICAgICAgICAgIG5hbWU6IG1vZHVsZU5hbWUsXG4gICAgICAgICAgICAgICAgLy8gT3V0cHV0IGZpbGUgbmFtZSBmb3JtYXRzXG4gICAgICAgICAgICAgICAgZmlsZU5hbWU6IChmb3JtYXQpID0+IGB0ZW5kZXItY2FzaC1hZ2VudC1zZGstdnVlLiR7Zm9ybWF0fS5qc2AsXG4gICAgICAgICAgICAgICAgLy8gT3V0cHV0IGZvcm1hdHMgKGUuZy4sIGVzbSwgY2pzLCB1bWQsIGlpZmUpXG4gICAgICAgICAgICAgICAgZm9ybWF0czogWydlcycsICd1bWQnXSwgLy8gQWRqdXN0ZWQgdG8gZXNtIGFuZCB1bWQgYXMgY29tbW9uIGNob2ljZXNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBSb2xsdXAgb3B0aW9ucyBmb3IgbW9yZSBjb250cm9sIChvcHRpb25hbClcbiAgICAgICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAvLyBFeHRlcm5hbGl6ZSBkZXBlbmRlbmNpZXMgdGhhdCBzaG91bGRuJ3QgYmUgYnVuZGxlZFxuICAgICAgICAgICAgICAgIGV4dGVybmFsOiBbJ3Z1ZSddLFxuICAgICAgICAgICAgICAgIG91dHB1dDoge1xuICAgICAgICAgICAgICAgICAgICAvLyBHbG9iYWwgdmFyaWFibGVzIGZvciBleHRlcm5hbCBkZXBlbmRlbmNpZXMgKGZvciBVTUQgZm9ybWF0KVxuICAgICAgICAgICAgICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2dWU6ICdWdWUnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGJhbm5lcjogYC8qKlxuICAgICogJHttb2R1bGVOYW1lfS5qc1xuICAgICogQHN1bW1hcnkgJHtwa2cuZGVzY3JpcHRpb259XG4gICAgKiBAdmVyc2lvbiB2JHtwa2cudmVyc2lvbn1cbiAgICAqIEBhdXRob3IgJHtwa2cuYXV0aG9yfVxuICAgICogQGxpY2Vuc2UgUmVsZWFzZWQgdW5kZXIgdGhlICR7cGtnLmxpY2Vuc2V9IGxpY2Vuc2UuXG4gICAgKiBAY29weXJpZ2h0IFRlbmRlciBDYXNoXG4gICAgKi9gLFxuICAgICAgICAgICAgICAgICAgICAvLyBQcmVzZXJ2ZSBtb2R1bGVzIGZvciBFU00gZm9ybWF0IHRvIGFsbG93IHRyZWUtc2hha2luZ1xuICAgICAgICAgICAgICAgICAgICAvLyBOb3RlOiBUaGlzIG1pZ2h0IGNvbmZsaWN0IHdpdGggc2luZ2xlIGZpbGUgb3V0cHV0IGZvciBVTURcbiAgICAgICAgICAgICAgICAgICAgLy8gQ29uc2lkZXIgc2VwYXJhdGUgYnVpbGRzIG9yIG9taXQgaWYgc2luZ2xlIGZpbGUgaXMgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJlc2VydmVNb2R1bGVzOiB0cnVlLCBcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJlc2VydmVNb2R1bGVzUm9vdDogJ3NyYycsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIE1pbmlmeSBwcm9kdWN0aW9uIGJ1aWxkXG4gICAgICAgICAgICBtaW5pZnk6IGlzUHJvZHVjdGlvbiA/ICdlc2J1aWxkJyA6IGZhbHNlLFxuICAgICAgICAgICAgLy8gR2VuZXJhdGUgc291cmNlbWFwc1xuICAgICAgICAgICAgc291cmNlbWFwOiB0cnVlLFxuICAgICAgICAgICAgLy8gRW1wdHkgb3V0cHV0IGRpcmVjdG9yeSBiZWZvcmUgYnVpbGRcbiAgICAgICAgICAgIGVtcHR5T3V0RGlyOiB0cnVlLCAvLyBVc3VhbGx5IGRlc2lyZWQgZm9yIGxpYnJhcnkgYnVpbGRzXG4gICAgICAgIH0sXG4gICAgICAgIC8vIE9wdGlvbmFsOiBDb25maWd1cmUgZGV2ZWxvcG1lbnQgc2VydmVyIGlmIG5lZWRlZFxuICAgICAgICBzZXJ2ZXI6IHtcbiAgICAgICAgICAgIGhvc3Q6ICcwLjAuMC4wJywgLy8gQWxsb3cgYWNjZXNzIGZyb20gbmV0d29ya1xuICAgICAgICAgICAgcG9ydDogNDIzNFxuICAgICAgICB9XG4gICAgfVxufSkgXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJYLFlBQVksVUFBVTtBQUNqWixTQUFTLFdBQUFBLGdCQUFlO0FBQ3hCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFNBQVM7QUFDaEIsWUFBWSxRQUFRO0FBQ3BCLFNBQVMscUJBQXFCO0FBQzlCLFNBQVMsc0JBQXNCO0FBQy9CLE9BQU8sVUFBVTtBQVI2TixJQUFNLDJDQUEyQztBQVcvUixJQUFNLGFBQWEsY0FBYyx3Q0FBZTtBQUNoRCxJQUFNLFlBQWlCLGFBQVEsVUFBVTtBQUd6QyxJQUFNLE1BQU0sS0FBSyxNQUFTLGdCQUFhLGtCQUFrQixPQUFPLENBQUM7QUFDakUsSUFBTSxhQUFhO0FBRW5CLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3RDLFFBQU0sZUFBZSxTQUFTO0FBQzlCLFNBQU87QUFBQSxJQUNILFNBQVM7QUFBQSxNQUNMLElBQUk7QUFBQSxNQUNKLEtBQUs7QUFBQSxNQUNMLElBQUk7QUFBQTtBQUFBLFFBRUEsV0FBV0MsU0FBUSxXQUFXLEtBQUs7QUFBQSxRQUNuQyxRQUFRQSxTQUFRLFdBQVcsWUFBWTtBQUFBO0FBQUEsUUFFdkMsa0JBQWtCO0FBQUEsTUFDdEIsQ0FBQztBQUFBLE1BQ0QsZUFBZTtBQUFBLFFBQ1gsU0FBUztBQUFBLFVBQ0w7QUFBQSxZQUNBLEtBQUs7QUFBQTtBQUFBLFlBQ0wsTUFBTTtBQUFBO0FBQUEsVUFDTjtBQUFBLFFBQ0o7QUFBQSxNQUNKLENBQUM7QUFBQSxJQUNMO0FBQUE7QUFBQSxJQUVBLFFBQVE7QUFBQSxNQUNOLHdCQUF3QixLQUFLLFVBQVUsSUFBSTtBQUFBLElBQzdDO0FBQUE7QUFBQSxJQUVBLFNBQVM7QUFBQSxNQUNMLE9BQU87QUFBQSxRQUNILEtBQVUsYUFBUSxXQUFXLE9BQU87QUFBQSxRQUNwQyxPQUFPO0FBQUE7QUFBQSxNQUNYO0FBQUEsSUFDSjtBQUFBLElBQ0EsT0FBTztBQUFBO0FBQUEsTUFFSCxLQUFLO0FBQUE7QUFBQSxRQUVELE9BQU9BLFNBQVEsV0FBVyxjQUFjO0FBQUE7QUFBQSxRQUV4QyxNQUFNO0FBQUE7QUFBQSxRQUVOLFVBQVUsQ0FBQyxXQUFXLDZCQUE2QixNQUFNO0FBQUE7QUFBQSxRQUV6RCxTQUFTLENBQUMsTUFBTSxLQUFLO0FBQUE7QUFBQSxNQUN6QjtBQUFBO0FBQUEsTUFFQSxlQUFlO0FBQUE7QUFBQSxRQUVYLFVBQVUsQ0FBQyxLQUFLO0FBQUEsUUFDaEIsUUFBUTtBQUFBO0FBQUEsVUFFSixTQUFTO0FBQUEsWUFDTCxLQUFLO0FBQUEsVUFDVDtBQUFBLFVBQ0EsUUFBUTtBQUFBLFFBQ3BCLFVBQVU7QUFBQSxpQkFDRCxJQUFJLFdBQVc7QUFBQSxrQkFDZCxJQUFJLE9BQU87QUFBQSxnQkFDYixJQUFJLE1BQU07QUFBQSxvQ0FDVSxJQUFJLE9BQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBUS9CO0FBQUEsTUFDSjtBQUFBO0FBQUEsTUFFQSxRQUFRLGVBQWUsWUFBWTtBQUFBO0FBQUEsTUFFbkMsV0FBVztBQUFBO0FBQUEsTUFFWCxhQUFhO0FBQUE7QUFBQSxJQUNqQjtBQUFBO0FBQUEsSUFFQSxRQUFRO0FBQUEsTUFDSixNQUFNO0FBQUE7QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNWO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbInJlc29sdmUiLCAicmVzb2x2ZSJdCn0K
