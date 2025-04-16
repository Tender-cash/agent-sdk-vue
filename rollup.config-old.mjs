/* eslint-disable @typescript-eslint/no-unused-vars */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */

import * as path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
// import { babel } from "@rollup/plugin-babel"; // Removed Babel
import json from "@rollup/plugin-json";
import tailwindcss from "tailwindcss";
// import pluginTypescript from "@rollup/plugin-typescript";
import pluginTypescript from "rollup-plugin-typescript2";
import pluginCommonjs from "@rollup/plugin-commonjs";
import pluginNodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import postcss from "rollup-plugin-postcss";
import postcssImport from "postcss-import";
import terser from "@rollup/plugin-terser";
import autoprefixer from "autoprefixer";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import analyze from "rollup-plugin-analyzer";
import copy from "rollup-plugin-copy";
import image from "@rollup/plugin-image";
import vue from 'rollup-plugin-vue';
import { defineConfig } from 'rollup';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { visualizer } from 'rollup-plugin-visualizer';
// import multiEntry from '@rollup/plugin-multi-entry'; // Removed multiEntry

/* -------------------------------------------------------------------------- */
/*                            Internal Dependencies                           */
/* -------------------------------------------------------------------------- */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pkgConfigPath = path.resolve("package.json");
const tsconfigPath = path.resolve("tsconfig.json");
// const defaultTsConfig = JSON.parse(readFileSync(tsconfigPath, "utf-8")); // Not needed if tsconfig path is passed directly
const pkg = JSON.parse(readFileSync(pkgConfigPath, "utf-8"));

const isProductionEnvironment = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === 'dev';

const moduleName = pkg.name.replace(/^@.*\//, "");
const author = pkg.author;

// Simplified input - rely on index.ts to export everything
const input = "src/index.ts";

// Define output formats - adjust as needed for your SDK targets
const outputFormats = [
    {
        dir: 'dist/es',
        format: 'es',
        preserveModules: true, // Keep separate files for tree-shaking
        preserveModulesRoot: 'src',
        sourcemap: !isProductionEnvironment,
        entryFileNames: '[name].mjs', // Use .mjs for ES modules
    },
    {
        dir: 'dist/cjs',
        format: 'cjs',
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: !isProductionEnvironment,
        entryFileNames: '[name].cjs', // Use .cjs for CommonJS
    }
];

const banner = `
  /**
   * ${moduleName}.js 
   * @summary ${pkg.description}
   * @version v${pkg.version}
   * @author  ${author}
   * @license Released under the ${pkg.license} license.
   * @copyright Pakt
   */
`;

// Remove unused pluginsSetup function
export default defineConfig({
    input: input,
    output: outputFormats.map(format => ({ ...format, banner })),
    plugins: [
        peerDepsExternal(),
        pluginNodeResolve({
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.json'],
        }),
        pluginCommonjs(),

        // THEN Process TypeScript files (including within <script lang="ts"> extracted by vue plugin)
        pluginTypescript({
            tsconfig: tsconfigPath,
            // declaration: true,
            // declarationDir: 'dist/types',
            // emitDeclarationOnly: false,
            // noEmit: false,
            // allowImportingTsExtensions: false,
            // useTsconfigDeclarationDir: true,
        }),

        // Process Vue SFCs FIRST
        vue({
            preprocessStyles: true, // Important for PostCSS integration
        }),

        // Process CSS with PostCSS, Tailwind, etc.
        postcss({
            plugins: [
                postcssImport(),
                tailwindcss(), // Ensure tailwind.config.js is present
                autoprefixer(),
            ],
            extract: 'styles.css', // Extract CSS to a single file (adjust name if needed)
            minimize: isProductionEnvironment,
        }),

        // Handle JSON imports
        json(),

        // Handle image imports
        image(),

        // Replace environment variables
        replace({
            'process.env.NODE_ENV': JSON.stringify(isProductionEnvironment ? 'production' : 'development'),
            preventAssignment: true,
        }),

        // Copy static assets (like fonts) and the demo HTML/CSS
        copy({
            targets: [
                // SDK assets (if any, besides CSS which is extracted)
                { src: 'src/assets/fonts/*', dest: 'dist/assets/fonts' }, 
                // Demo files (only copied in dev mode?)
                { src: 'src/index.html', dest: 'dist/demo' },
                { src: 'src/module/_components/styles.css', dest: 'dist/demo/styles' }, // Adjust demo path
                // Remove transforms for .vue files - Vue plugin handles compilation
            ],
            // Optionally run copy only in dev mode
            // copyOnce: isProductionEnvironment, 
        }),

        // Minify in production
        isProductionEnvironment && terser({
             output: { comments: /@license|@copyright/i } // Keep banner comments
        }),

        // Development server & livereload
        isDev && serve({
            open: true,
            contentBase: ['dist/demo', 'dist/es'], // Serve demo and built files
            port: 4234,
            historyApiFallback: 'dist/demo/index.html'
        }),
        isDev && livereload({
            watch: ['dist/es', 'dist/demo'], // Watch relevant directories
        }),

        // Analysis and Visualization (optional)
        analyze({
            summaryOnly: true,
        }),
        visualizer({
            filename: 'dist/stats.html',
            open: false // Don't open automatically
        }),
    ],
    // Add external if peerDepsExternal doesn't catch everything
    // external: ['vue'],
});
