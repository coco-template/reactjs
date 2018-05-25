/**
 * @description - development configuration
 * @author - yang.yuncai <383235388@qq.com>
 */

// dependency
const presets = require('@coco-platform/webpack-preset');
const convert = require('koa-connect');
const history = require('connect-history-api-fallback');
const proxy = require('http-proxy-middleware');

// scope
const options = {
  entry: 'src/main.jsx',
};

module.exports = presets.development(options);
module.exports.serve = {
  add: (app) => {
    app.use(
      convert(proxy('/story', { target: 'https://story.babycherry.cn' }))
    );
    app.use(convert(history()));
  },
};
