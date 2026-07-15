import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  envDir: '../../',
  plugins: [
    react(),
    federation({
      name: 'community',
      filename: 'remoteEntry.js',
      exposes: {
        './CommunityApp': './src/App.tsx',
      },
      shared: ['react', 'react-dom', 'zustand', 'react-router-dom', '@mfe/shared-store'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
