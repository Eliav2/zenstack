import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import * as path from 'path';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), TanStackRouterVite()],
    optimizeDeps: {
        include: ['zod-models', 'prisma-models'],
        // force: true,
    },
    resolve: {
        alias: {
            'zod-models': path.resolve(__dirname, '../../../node_modules/@zenstackhq/runtime/zod/models'),
            // trick(that i wrote) to get prisma models to work in the browser, when built from pnpm workspaces
            'prisma-models': path.resolve(
                fs.realpathSync(path.resolve(__dirname, '../backend/node_modules/@prisma/client')),
                '../../.prisma/client/index-browser.js',
            ),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
