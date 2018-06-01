/**
 * @description - development configuration
 * @author - yang.yuncai <383235388@qq.com>
 */

// dependency
const path = require('path');
const fs = require('fs');
const presets = require('@coco-platform/webpack-preset');
const _ = require('lodash');

// scope
const options = {
  development: {
    entry: 'src/main.jsx',
  },
  production: {
    entry: 'src/main.jsx',
  },
};
const externals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};
const env = process.env.NODE_ENV || 'development';
const definition = fs.readFileSync(
  path.resolve(__dirname, 'bootcdn.stable.yml'),
  { encoding: 'utf8' }
);
const argument = _.assign({ definition }, Reflect.get(options, env));
const preset = Reflect.get(presets, env);
const configuration = _.assign({ externals }, preset(argument));

module.exports = configuration;
