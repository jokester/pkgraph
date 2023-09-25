import { defineConfig } from 'tsup';
import path from 'node:path';

export default defineConfig({
  entry: ['src/ui/index.tsx'],
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: process.env.NODE_ENV === 'production',
  inject: ['src/ui/react-import.ts'], // to not import React in each file
  env: {
    NODE_ENV: 'development',
  },
  outDir: path.join(__dirname, 'public/dist'),
});
