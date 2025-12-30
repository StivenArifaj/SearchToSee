import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    // Multi-page app configuration
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                search: resolve(__dirname, 'main.html'),
            },
        },
    },
    // Ensure proper base path for Vercel
    base: './',
});
