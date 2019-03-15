
const { api } = require('../config');
const { simpleRequest, isMutliPart, compose } = require('../common/util');
const request = require('request');
const crypto = require('crypto');
const qs = require('qs');
const lodash = require('lodash');
const url = require('url');

// 中间层转发
class PortalApi {
  static handleResponseData(res) {
    const { text, body, resType } = res;
    let parseData;
    if(resType.indexOf('text') !== -1) {// 判断 content-type
      try {
        parseData = JSON.parse(text);// 转成对象
      } catch(e) {// 如果 data 不是严格 json 字符串，直接把 text 返回
        return text;
      }
      return parseData;
    } else if (resType.indexOf('octet-stream') !== -1) {  // maindata 接口返回的是octet-stream类型
      try {
        parseData = JSON.parse(new Buffer(body));// 转成对象
      } catch(e) {// 强制转换失败时，返回text
        return text;
      }
      return parseData;
    }
    return body;
  }

  static checkTicketError(data) {
    if(typeof data === 'object' && data.errmsg === 'ticket error') {// 是对象，则拦截 ticket error，msg 文案修改。
      data.errmsg = i18n.__('auth_ticket_error_msg');
    }
    return data;
  }

  async titanProxy(ctx) {
    let path = ctx.path;

    const uri = path.replace('/nodeApi/apiA', '');
    const headers = ctx.request.headers;
    const urlPath = api.host + uri;
    const { querystring: querystring } = ctx;
    const postUrl = `${urlPath}?${querystring}`;
    if(isMutliPart(headers)) {//文件上传的处理

      ctx.body = ctx.req.pipe(request.post(postUrl).on('response', (res) => {
        console.log(res.statusCode, 'upload res statusCode');
        ctx.response.set(res.headers);
        console.log(res.headers, 'upload res headers');
      })).on('error', (err) => {
        throw new Error('file upload fail'+ err.message);
      });
      return;
    }
    const response = await simpleRequest(ctx, {
      url : urlPath,
      headers
    });
    const { text, body, err, resHeaders = {}, status = 200, type: resType = 'text/plain; charset=utf-8' } = response;
    if(err) {
      throw new RequestError(err.message);
    }
    // 处理 response Data
    const data = compose(PortalApi.checkTicketError, PortalApi.handleResponseData)({
      text,
      body,
      resType,
    });
    //Set Ctx Response
    console.log(status, 'status');
    ctx.type = resType;
    ctx.status = status;
    ctx.response.set(resHeaders);

    console.log('get-apiA-bk-data:', data);
    ctx.body = data;
  }

  async downLoad(ctx) {
    const { querystring: qs, path, method } = ctx;
    const headers = ctx.request.headers;
    const urlPath = api.host + path.replace('/nodeApi', '');
    const postUrl = `${urlPath}?${qs}`;
    ctx.body = request({
      method,
      url: postUrl,
      headers
    }).on('response', function(response) {
      console.log(response.statusCode);
      ctx.response.set(response.headers);
      console.log(response.headers, 'xxxx');
    });
  }
}

module.exports = new PortalApi();
