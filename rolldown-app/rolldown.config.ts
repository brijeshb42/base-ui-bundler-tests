import { defineConfig } from 'rolldown';

export default defineConfig({
  input: 'index.tsx',
  output: {
    dir: 'dist',
    format: 'esm',
    minify: true,
    entryFileNames: 'index.min.js',
    chunkFileNames: '[name].min.js',
    manualChunks: (id) => {
      if (id.includes('@base-ui')) {
        return 'vendor-base-ui';
      }
      if (id.includes('node_modules')) {
        return 'vendor';
      }
    },
  },
});
