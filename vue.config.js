const autoprefixer = require('autoprefixer');
const pxtoviewport = require('postcss-px-to-viewport');
// PORT=8081 npm run serve  手动指定端口号
const port = process.env.PORT || '8080';
module.exports = {
  productionSourceMap: false, // 生产环境不产生sourcemap文件
  // devServer 开发服务器
  devServer: {
    port,
    // 代理配置 主要用来跨域
    proxy: {
      // process.env.VUE_APP_BASE_API 来自.env系列文件
      [process.env.VUE_APP_BASE_API]: {
        // target 要代理到哪个服务器地址
        target: 'http://127.0.0.1:3000',
        // changeOrigin 是否修改域名 true的话请求地址会变成项目启动地址例如：http://localhost:8080
        changeOrigin: true,
        // VUE_APP_BASE_API 重写成 /
        pathRewrite: {
          [`^${process.env.VUE_APP_BASE_API}`]: '',
        },
      },
    },
  },
  css: {
    // 移动端配置viewport配置 参考文档https://ruanye.github.io/vue/vuem.html
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 750,
            unitPrecision: 2,
          }),
        ],
      },
    },
  },
};
