import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        vue(),
        dts({
            // Specify entry root and output directory for declaration files
            entryRoot: resolve(__dirname, 'src'),
            outDir: resolve(__dirname, 'dist/types'),
            // Optional: Insert additional imports or references in generated d.ts files
            // insertTypesEntry: true, 
        }),
    ],
    // Add resolve alias
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.esm-bundler.js' // Use the build with the runtime compiler
        }
    },
    build: {
        // Library mode configuration
        lib: {
            // Entry point for the library
            entry: resolve(__dirname, 'src/index.ts'),
            // Name for the global variable (if using UMD format)
            name: 'TenderCashAgentSdkVue',
            // Output file name formats
            fileName: (format) => `tender-cash-agent-sdk-vue.${format}.js`,
            // Output formats (e.g., esm, cjs, umd, iife)
            formats: ['es', 'umd'] // Adjusted to esm and umd as common choices
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
                // Preserve modules for ESM format to allow tree-shaking
                // Note: This might conflict with single file output for UMD
                // Consider separate builds or omit if single file is required
                // preserveModules: true, 
                // preserveModulesRoot: 'src',
            }
        },
        // Generate sourcemaps
        sourcemap: true,
        // Empty output directory before build
        emptyOutDir: true, // Usually desired for library builds
    },
    // Optional: Configure development server if needed
    // server: {
    //   port: 3000
    // }
}) 