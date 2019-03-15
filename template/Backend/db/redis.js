
const redis = require('redis');

const config = require('../config').redis;

const client = redis.createClient(config);


client.on('connect', function () {
  console.log('redis connect success');
});


client.on('error', function (err) {
  console.error(err);
});

client.on('ready', function () {
  console.log('ready');
});

const {promisify} = require('util');

client.getAsync = promisify(client.get).bind(client);
client.setAsync = promisify(client.set).bind(client);

module.exports = client;