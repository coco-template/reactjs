/**
 * @description - development configuration
 * @author - yang.yuncai <383235388@qq.com>
 */

// dependency
const path = require('path');
const fs = require('fs');
const presets = require('@coco-platform/webpack-preset');
// scope
const bootcdn = path.resolve(__dirname, 'bootcdn.stable.yml');
const readFileOptions = {
  encoding: 'utf8',
};
const options = {
  entry: 'src/main.jsx',
  definition: fs.readFileSync(bootcdn, readFileOptions),
};
const externals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};
const devServer = {
  host: '0.0.0.0',
  port: 8100,
  historyApiFallback: true,
  proxy: {},
};
const configuration = { ...presets.development(options), externals, devServer };

module.exports = configuration;
