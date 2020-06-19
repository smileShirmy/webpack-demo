import Vue from 'vue';
import App from './App.vue';
// @ts-ignore
import router from './router/index.ts'
import components from '@/components/base/index.ts';

import './assets/styles/index.scss';

Object.keys(components).forEach((key) => Vue.component(key, components[key]));

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')