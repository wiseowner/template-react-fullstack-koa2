const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('@koa/cors');
const locale = require('koa-locale');<%if(i18n){%>
const i18n = require('koa-i18n');<%}%>
const path = require('path');

const router = require('./routes');
const resWrapper = require('./middleware/res_wrapper');
const errorCatch = require('./middleware/error');
const extendCtx = require('./middleware/extend_ctx');
const proxy = require('koa2-proxy-middleware');

<%if(i18n){%>
// 国际化
locale(app);<%}%>

// error handler
onerror(app);

app.use(logger());

<%if(i18n){%>app.use(i18n(app, {
  directory: './Backend/config/locales',
  locales: ['zh-CN', 'en-US', 'pt-BR', 'ja-JP'], //  `zh-CN` defualtLocale, must match the locales to the filenames
  modes: [
    'query',                //  optional detect querystring - `/?locale=en-US`
    'cookie',               //  optional detect cookie      - `Cookie: locale=zh-TW`
  ]
}));<%}%>

// 必须在 body parser 之前，不然 post 请求 timeout
app.use(proxy(require('./config/proxy.config')));

// 在中间件的最后捕获错误，并处理错误信息
app.use(errorCatch);

//cors
app.use(cors({
  credentials: true,
}));

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());

app.use(require('koa-static')(path.join(__dirname, '../public'), {
  // index: 'none' // index.html
}));

// API 文档
if(process.env.NODE_ENV === 'development') app.use(require('koa-static')(__dirname + '/doc'));

// 模板引擎
// path.join(__dirname, '../../build/srv';

app.use(views(path.join(__dirname, '../public'), {
  extension: 'html'
}));
// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${Date.now()} - ${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 拓展 ctx 上下文
app.use(extendCtx);

// routes
app.use(router.routes());

// wrap res.data
app.use(resWrapper);

// 最后捕获，并 log
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
