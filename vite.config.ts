import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: '**/*.tsx'
    }),
    tsConfigPaths()
  ],
  server: {
    port: 3000
  },
  base: '/',
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: [ 'mixed-decls', 'color-functions', 'global-builtin', 'import' ]
      }
    }
  }
});
