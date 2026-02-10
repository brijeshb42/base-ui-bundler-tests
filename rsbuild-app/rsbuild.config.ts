import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  performance: {
    chunkSplit: {
      strategy: 'custom',
      splitChunks: {
        cacheGroups: {
          'vendor-base-ui': {
            test: /@base-ui/,
            name: 'vendor-base-ui',
            chunks: 'all',
            priority: 20,
          },
          vendor: {
            test: /node_modules/,
            name: 'vendor',
            chunks: 'all',
            priority: 10,
          },
        },
      },
    },
  },
});
