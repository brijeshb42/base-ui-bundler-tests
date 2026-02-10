import * as esbuild from 'esbuild';
import { writeFileSync } from 'fs';

const result = await esbuild.build({
  entryPoints: ['index.tsx'],
  bundle: true,
  minify: true,
  sourcemap: true,
  outdir: 'dist',
  splitting: true,
  format: 'esm',
  metafile: true,
  chunkNames: 'chunks/[name]-[hash]',
  entryNames: 'index.min',
});

// Write metafile for analysis
writeFileSync('dist/meta.json', JSON.stringify(result.metafile, null, 2));

console.log('Build complete with code splitting!');
