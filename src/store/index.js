import Vue from 'vue';
import Vuex from 'vuex';
import * as Types from './mutations-types';
import home from './moudle/home';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: [],
  },
  mutations: {
    // 存放取消请求令牌
    [Types.PUSH_TOKEN](state, c) {
      // 发布订阅
      state.token = [...state.token, c];
    },
    [Types.CANCEL_TOKEN](state) {
      // 取消请求的函数拿出来依次执行
      state.token.forEach(fn => fn());
    },
  },
  actions: {},
  modules: {
    home,
  },
});
