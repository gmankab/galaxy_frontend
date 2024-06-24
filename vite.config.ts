import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

import React from '@vitejs/plugin-react-swc';
import { optimizeCssModules as OptimizeCssModules } from 'vite-plugin-optimize-css-modules';

export default defineConfig({
  // base: '/galaxy_frontend/',
  build: {
    sourcemap: true,
    target: 'esnext',
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      output: {
        format: 'esm',
        entryFileNames: '[hash:22].js',
        chunkFileNames: '[hash:22].js',
        assetFileNames: '[hash:22].[ext]',
        hashCharacters: 'hex',
      },
    },
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
  },
  esbuild: {
    legalComments: 'none',
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  plugins: [
    React(),
    OptimizeCssModules(),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  },
});
