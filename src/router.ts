import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import Noise from './views/Noise.vue';
import NoiseImg from './views/NoiseImg.vue';
import About from './views/About.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/noise',
    component: Noise,
  },
  {
    path: '/noise-img',
    component: NoiseImg,
  },
  {
    path: '/about',
    component: About,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
