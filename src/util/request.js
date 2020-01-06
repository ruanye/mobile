/* eslint-disable arrow-parens */
/* eslint-disable no-param-reassign */
// util/request.js 封装请求
import axios from 'axios';

import store from '../store';
import * as Types from '../store/mutations-types';

class Ajax {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    // 定义一些公共参数
    this.baseURL = process.env.NODE_ENV === 'prodution' ? 'www.baidu.com' : '/';
    this.timeout = 5000;
    this.queue = {}; // 创建一点队列
  }

  // eslint-disable-next-line class-methods-use-this
  setInterceptors(instance) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        this.queue.url = config.url;
        // 如果队列的长度大于0 就显示正在加载
        if (Object.keys(this.queue).length > 0) {
          // 显示正在加载
        }

        // 每次请求时候拿到一个终止请求的令牌
        const Cancel = axios.CancelToken;
        config.CancelToken = new Cancel(c => {
          store.commit(Types.PUSH_TOKEN, c);
        });
        return config;
      },
      err => err,
    );
    // 响应拦截
    instance.interceptors.response.use(
      res => {
        // 每次响应之后就从队列里面删除
        delete this.queue.url;
        if (Object.keys(this.queue).length === 0) {
          // 队列里面没有请求了 隐藏loading
          // 隐藏正在加载
        }
        return res.data;
      },
      err => {
        delete this.queue.url;
        if (Object.keys(this.queue).length === 0) {
          // 队列里面没有请求了 隐藏loading
          // 隐藏正在加载
        }
        Promise.reject(err);
      },
    );
  }

  // eslint-disable-next-line class-methods-use-this
  request(options) {
    const instance = axios.create();
    // 设置拦截器
    this.setInterceptors(instance);
    // 合并一下用户传的参数和默认参数
    const conig = {
      baseURL: this.baseURL,
      timeout: this.timeout,
      ...options,
    };
    return instance(conig);
  }
}
export default new Ajax();
