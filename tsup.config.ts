import { defineConfig } from 'tsup';
import path from 'node:path';

export default defineConfig({
  entry: ['src/ui/index.tsx'],
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: process.env.NODE_ENV === 'production',
  outDir: path.join(__dirname, 'public/dist'),
});
