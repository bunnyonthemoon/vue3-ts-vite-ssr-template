import { fileURLToPath, URL } from 'url'
import { distPath } from './env'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteSSR from 'vite-ssr/plugin'

export default defineConfig({
    plugins: [vue(), viteSSR()],
    root: './core',
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./', import.meta.url)),
        },
    },
    css: {
        preprocessorOptions: {
            sass: {
                additionalData:
                    "@use '@/styles/mixins.sass'\n@use '@/styles/vars.sass'\n@import '@/styles/mixins.sass'\n",
            },
        },
    },
    build: {
        outDir: fileURLToPath(new URL('./dist/client', import.meta.url)),
        emptyOutDir: true,
        manifest: true,
    },
})
