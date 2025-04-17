import * as path from 'path';
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgr from 'vite-plugin-svgr';

// Derive __dirname in an ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read package.json to get module name and version
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const moduleName = "TenderCashAgentSdkVue";

export default defineConfig(({ mode }) => {
    const isProduction = mode === 'production';
    return {
        plugins: [
            vue(),
            svgr(),
            dts({
                // Specify entry root and output directory for declaration files
                entryRoot: resolve(__dirname, 'src'),
                outDir: resolve(__dirname, 'dist/types'),
                // Optional: Insert additional imports or references in generated d.ts files
                insertTypesEntry: true, 
            }),
            viteStaticCopy({
                targets: [
                    {
                    src: 'src/assets/*', // Copy everything from src/assets
                    dest: 'assets'     // Destination relative to each outDir
                    }
                ]
            })
        ],
        // Define global constants like process.env.NODE_ENV
        define: {
          'process.env.NODE_ENV': JSON.stringify(mode),
        },
        // Add resolve alias
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                'vue': 'vue/dist/vue.esm-bundler.js' // Use the build with the runtime compiler
            }
        },
        build: {
            // Library mode configuration
            lib: {
                // Entry point for the library
                entry: resolve(__dirname, 'src/index.ts'),
                // Name for the global variable (if using UMD format)
                name: moduleName,
                // Output file name formats
                fileName: (format) => `tender-cash-agent-sdk-vue.${format}.js`,
                // Output formats (e.g., esm, cjs, umd, iife)
                formats: ['es', 'umd'], // Adjusted to esm and umd as common choices
            },
            // Rollup options for more control (optional)
            rollupOptions: {
                // Externalize dependencies that shouldn't be bundled
                external: ['vue'],
                output: {
                    // Global variables for external dependencies (for UMD format)
                    globals: {
                        vue: 'Vue'
                    },
                    banner: `/**
    * ${moduleName}.js
    * @summary ${pkg.description}
    * @version v${pkg.version}
    * @author ${pkg.author}
    * @license Released under the ${pkg.license} license.
    * @copyright Tender Cash
    */`,
                    // Preserve modules for ESM format to allow tree-shaking
                    // Note: This might conflict with single file output for UMD
                    // Consider separate builds or omit if single file is required
                    // preserveModules: true, 
                    // preserveModulesRoot: 'src',
                }
            },
            // Minify production build
            minify: isProduction ? 'esbuild' : false,
            // Generate sourcemaps
            sourcemap: true,
            // Empty output directory before build
            emptyOutDir: true, // Usually desired for library builds
        },
        // Optional: Configure development server if needed
        server: {
            host: '0.0.0.0', // Allow access from network
            port: 4234
        }
    }
}) 
