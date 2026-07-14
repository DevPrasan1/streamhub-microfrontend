import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  envDir: '../../',
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        video_browser: 'http://localhost:5001/assets/remoteEntry.js',
        player: 'http://localhost:5002/assets/remoteEntry.js',
        community: 'http://localhost:5003/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'zustand'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
