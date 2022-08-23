# vite-vue3-essential-typescript-eslint-starter

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

# 组件库
这里用了idux
`yarn add -D  @idux/cdk @idux/components @idux/pro`

# 安装three和noise包
`yarn add three glsl-noise`   

`yarn add -D @types/three`
 
# 安装glsl相关插件
`yarn add -D rollup-plugin-glsl`

配置vite配置
```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';

// 添加这个
import glsl from 'rollup-plugin-glsl';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        // 还有这个
        glsl({
            include: '**/*.glsl',
            exclude: ['**/index.html'],
        }),
        vue(),
        eslintPlugin()
    ],
});

```

# 添加threejs基本参数
