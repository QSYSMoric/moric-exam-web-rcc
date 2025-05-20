/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import * as path from 'path';
import Unocss from 'unocss/vite';
import pages from 'vite-plugin-pages';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    build: {
        target: 'es2015',
        cssTarget: 'chrome80',
        rollupOptions: {
            output: {
                // 入口文件名（不能变，否则所有打包的 js hash 值全变了）
                entryFileNames: 'index.js',
                manualChunks: {
                    vue: ['vue', 'pinia', 'vue-router'],
                    elementplus: ['element-plus', '@element-plus/icons-vue'],
                },
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/assets/styles/element/index.scss" as *;`,
            },
        },
    },
    plugins: [
        vue(),
        pages({
            exclude: ['**/components/*.vue'],
        }),
        AutoImport({
            imports: [
                'vue',
                'vue-router',
                'vue-i18n',
                'vue/macros',
                '@vueuse/head',
                '@vueuse/core',
            ],
            resolvers: [ElementPlusResolver()],
            dts: 'auto-imports.d.ts',
            vueTemplate: true,
        }),
        Components({
            dts: 'components.d.ts',
            resolvers: [ElementPlusResolver()],
        }),
        Unocss(),
    ],
    server: {
        port: 8080,
        host: '127.0.0.1',
    },
});
