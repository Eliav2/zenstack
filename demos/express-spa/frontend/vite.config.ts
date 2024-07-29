import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            'prisma-models': path.resolve(
                fs.realpathSync(path.resolve(__dirname, '../backend/node_modules/@prisma/client')),
                '../../.prisma/client/index-browser.js'
            ),
        },
    },
    optimizeDeps: {
        force: true,
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
