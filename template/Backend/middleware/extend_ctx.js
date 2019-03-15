const ErrorCollections = require('../common/error');
const _ = require('lodash');
const Validator = require('../common/validator');
const sConstants = require('../common/constant');

// 其实也可以放到 global 上，就不用 ctx.xx.xx 获取了。这个看个人喜好

module.exports = async (ctx, next) => {
  ctx.sCommon = _.assign({// 存放一些 class，或者 common 信息
    // validatorjs class
    Validator,
  }, ErrorCollections);

  // 常量
  ctx.sConstants = sConstants;

  ctx.sUtils = {// 存放一些公共方法

  };
  global.i18n = ctx.i18n;

  for(const key in ErrorCollections) {
    global[key] = ErrorCollections[key];
  }

  await next();
};
