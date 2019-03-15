// 转发的统一前缀
const router = require('koa-router')();
const compose = require('koa-compose');
const portalApiController = require('../controller/portalApi');

// 转发到后端真实提供的接口
router.all('/apiA/*', portalApiController.proxy);
// router.all('/apiB/*', portalApiController.proxyB);

router.all('/download/*', portalApiController.downLoad);

module.exports = router.routes();
