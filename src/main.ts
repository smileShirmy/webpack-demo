import Vue from 'vue';
import App from './App.vue';
// @ts-ignore
import { router } from './router/index.ts'
import components from '@/components/base/index.ts';
import demos from '@/demo/index.ts';

import {
  Button,
  Notification
} from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import './assets/styles/index.scss';

// ElementUI 组件
;[
  Button
].forEach((component) => Vue.use(component));

Vue.prototype.$notify = Notification;

// 全局注册文档 Demo 组件
Object.keys(demos).forEach((key) =>
  Vue.component(key, demos[key])
);

Object.keys(components).forEach((key) => Vue.component(key, components[key]));

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')