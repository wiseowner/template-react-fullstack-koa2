const { ValidatedError, DbError, AuthError } = require('../common/error');

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const { errmsg, errno, status = 500, redirect } = err;
    
    if (err instanceof ValidatedError || err instanceof DbError || err instanceof AuthError) {
      ctx.status = 200;
      ctx.body = {
        errmsg,
        errno,
      };
      return;
    }
    ctx.status = status;
    if (status === 302 && redirect) {
      console.log(redirect);
      ctx.redirect(redirect);
    }
    if (status === 500) {
      ctx.body = {
        errmsg: err.message,
        errno: 90001,
      };
      ctx.app.emit('error', err, ctx);
    }
  }
};
