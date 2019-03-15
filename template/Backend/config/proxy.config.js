
// 代理中间件，用法去搜 koa2-proxy-middleware. 不推荐线上使用，因为没有 logs

module.exports = {
  targets: {
    '/xxx/(.*)': {
      target: 'www.didi.com/xxx',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        //passenger
        '/xx/x/x': '/x/api/list',
      }
    },
  }
};