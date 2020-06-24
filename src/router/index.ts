import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import hljs from 'highlight.js';

Vue.use(VueRouter)

const sidebar: Array<RouteConfig> = [
  {
    path: '/home',
    component: (r) => r(require('../docs/home.md')),
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
  },
  {
    path: '/upload',
    component: (r) => r(require('../docs/upload.md')),
    meta: {
      title: 'Upload'
    }
  }
]

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/home'
  },
  ...sidebar
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

export {
  sidebar,
  router
};