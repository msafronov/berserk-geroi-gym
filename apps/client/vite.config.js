import * as path from 'path';
import { defineConfig } from 'vite'
import preact from "@preact/preset-vite";

const packageJSON = require('./package.json');
const defaultUserDatabaseJSON = require('./databases/default_user_database.json');

export default defineConfig({
  define: {
    _BUILD_INFO_: JSON.stringify({ version: packageJSON.version }),
    _DEFAULT_USER_DATABASE_: JSON.stringify(defaultUserDatabaseJSON),
  },
  resolve: {
    alias: {
      '@/features': path.resolve(__dirname, 'src/features'),
      '@/ui': path.resolve(__dirname, 'src/ui'),
    },
  },
  plugins: [preact()],
})