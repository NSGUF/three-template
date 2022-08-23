import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import glsl from 'rollup-plugin-glsl';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        glsl({
            include: '**/*.glsl',
            exclude: ['**/index.html'],
        }),
        vue(),
        eslintPlugin()
    ],
});
