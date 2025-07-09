/// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,      // para poder usar expect, describe, it sem importar
    environment: 'jsdom',  // importante: simula o DOM para testes React
  },
});
