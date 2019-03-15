const proxy = require('./proxy');

const development = {
  assetsPublicPath: 'http://localhost:8888/',
  URL: '',
};

const production = {
  assetsPublicPath: '/',
  URL: '',
};

const test = {};

const common = {
  port: 8888,
  proxy,
};
const env = process.env.NODE_ENV || 'development';

const collections = {
  development: Object.assign({}, development, common),
  test: Object.assign({}, test, common),
  production: Object.assign({}, production, common)
};


module.exports = collections[env];
