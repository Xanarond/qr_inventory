/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory, Router } from 'vue-router/auto';
import { setupLayouts } from 'virtual:generated-layouts';

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: setupLayouts,
});

export default router;
