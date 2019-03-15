const request = require('superagent');

const o = {
  // proxy 使用，根据请求信息，去返回不同的 request 对象
  async wrapAgent(ctx, pathMap) {
    const { method, query, req: { body: reqBody }, path } = ctx;
    console.log(path, 'path');
    const reqPath = pathMap[path];
    switch (method) {
    case 'GET':
      return request.get(reqPath).query(query);
    case 'POST':
      return request.post(reqPath).send(reqBody);
    default:
      return request;
    }
  },

  // return data;  数据在 response 的 text
  async proxyWithParams(ctx, pathMap) {
    const agent = o.wrapAgent(ctx, pathMap);
    const { text } = await agent;
    ctx.body = {
      text: JSON.parse(text),
    };
  }
};

module.exports = o;