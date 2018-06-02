/**
 * @description - development configuration
 * @author - yang.yuncai <383235388@qq.com>
 */

// dependency
const path = require('path');
const fs = require('fs');
const presets = require('@coco-platform/webpack-preset');

// scope
const options = {
  entry: 'src/main.jsx',
};
const externals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};
const definition = fs.readFileSync(
  path.resolve(__dirname, 'bootcdn.stable.yml'),
  { encoding: 'utf8' }
);
const argument = { definition, ...options };
const configuration = { externals, ...presets.development(argument) };

module.exports = configuration;
