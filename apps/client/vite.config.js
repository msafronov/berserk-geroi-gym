import * as path from 'path';
import { defineConfig } from 'vite'
import preact from "@preact/preset-vite";

export default defineConfig({
  resolve: {
    alias: {
      '@/features': path.resolve(__dirname, 'src/features'),
      '@/ui': path.resolve(__dirname, 'src/ui'),
    },
  },
  plugins: [preact()],
})