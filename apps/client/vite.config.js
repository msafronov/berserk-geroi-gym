import * as path from 'path';
import { defineConfig } from 'vite'
import preact from "@preact/preset-vite";

const packageJSON = require('./package.json');
const defaultUserDatabaseJSON = require('./databases/default_user_database.json');

const configJSON = process.env.NODE_ENV === 'development'
  ? require('./config/development.json')
  : require('./config/production.json');

export default defineConfig({
  define: {
    _CONFIG_: JSON.stringify({
      ...configJSON,
      version: packageJSON.version,
    }),
    _DEFAULT_USER_DATABASE_: JSON.stringify(defaultUserDatabaseJSON),
  },
  resolve: {
    alias: {
      '@/features': path.resolve(__dirname, 'src/features'),
      '@/ui': path.resolve(__dirname, 'src/ui'),
    },
  },
  plugins: [preact()],
  build: {
  rollupOptions: {
    output: {
      assetFileNames: () => {
        return `assets/${packageJSON.version}[extname]`;
      },
      chunkFileNames: `assets/${packageJSON.version}.js`,
      entryFileNames: `assets/${packageJSON.version}.js`,
    },
  },
},
})