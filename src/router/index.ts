import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import hljs from 'highlight.js';


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: (r) => r(require('../docs/test.md')),
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/test',
    component: (r) => r(require('../docs/test.md')),
    meta: {
      title: 'Test'
    }
  }
]

const router = new VueRouter({
  routes
})

router.afterEach(route => {
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  })
  if (route.meta && route.meta.title) {
    document.title = route.meta.title
  }
})

export default router;