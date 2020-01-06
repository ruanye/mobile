import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import hooks from './hooks';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
    meta: {
      keepAlive: true,
    },
  },
];

const router = new VueRouter({
  routes,
});
// hooks里面路由的钩子拿出来依次执行 this需要指向router
Object.values(hooks).forEach((hook) => {
  router.beforeEach(hook.bind(router));
});

export default router;
