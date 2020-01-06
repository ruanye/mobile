// hooks.js 路由钩子
import store from '../store';
import * as Types from '../store/mutations-types';
// router.beforeEach 里面执行的
export default {
  // 取消请求
  CancelToken(to, from, next) {
    console.log('取消请求的hook');
    store.commit(Types.CANCEL_TOKEN);
    next();
  },
  // 权限验证
  fn1(to, from, next) {
    console.log('其他hook');
    next();
  },
};
