import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  plugins: [
    react(),
    commonjs()
  ],
    resolve: {
        alias: {
        'react-use-face-detection': 'react-use-face-detection/build/index.js',
        },
    },
});
