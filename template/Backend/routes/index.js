
const router = require('koa-router')();
const compose = require('koa-compose');
const path = require('path');
const fs = require('mz/fs');
const portal = require('./portal');

const check = async(ctx, next) => {
  if(1) { // 比如权限校验通过
    await next();
  }
}
router.get('/', compose([check, async (ctx) => {
  // 从前端 public 下渲染页面
  const data = await fs.readFile(path.join(__dirname, '../../public/index.html'));
  ctx.body = data.toString();
}]));

// 接口转发前缀
router.use('/nodeApi', portal);

module.exports = router;
