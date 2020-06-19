import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/home.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: (r) => r(require('../docs/test.md'))
  },
  {
    path: '/test',
    component: (r) => r(require('../docs/test.md'))
  }
]

const router = new VueRouter({
  routes
})

export default router;