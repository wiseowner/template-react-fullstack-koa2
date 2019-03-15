const qs = require('query-string');
const i18n = global.i18n;

class BaseError extends Error {
  constructor(msg, code) {
    super(msg, code);
    this.errmsg = msg;
    this.errno = code;
  }
}
/**
 * 参数校验错误，一般是前端提交的数据格式有问题。
 */
class ValidatedError extends Error {
  constructor(msg, code) {
    super(msg, code);
    this.errmsg = msg || i18n.__('validated_error_msg');
    this.errno = code || 10010;
  }
}

/**
 * 数据库操作错误。
 */
class DbError extends BaseError {
  constructor(msg, code) {
    super(msg, code);
    this.errmsg = msg || i18n.__('db_error_msg');
    this.errno = code || 20010;
  }
}

class AuthError extends Error {
  constructor(msg, code) {
    super(msg, code);
    console.log(msg, 'msg');
    this.errmsg = msg || i18n.__('auth_error_msg');
    this.errno = code || 30010;
  }
}



module.exports = {
  ValidatedError,
  DbError,
  AuthError,
};
