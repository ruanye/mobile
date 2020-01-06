/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';
import 'amfe-flexible';
import filers from './util/filters';
// 创建了一个vue实例
Vue.prototype.$bus = new Vue();

// 定义全局过滤器
for (const key in filers) {
  Vue.filter(key, filers[key]);
}
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
