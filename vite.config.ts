import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    base: './',
    plugins: [react()],
    server: {
        host: true,
        port: Number(process.env.PORT) || 3000,
        strictPort: true,
    },
    preview: {
        port: 3000,
    },
    build: {
        outDir: 'build',
    },
})
