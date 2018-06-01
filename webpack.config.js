/**
 * @description - development configuration
 * @author - yang.yuncai <383235388@qq.com>
 */

// dependency
const path = require('path');
const fs = require('fs');
const presets = require('@coco-platform/webpack-preset');
const _ = require('lodash');
const PWAManifestPlugin = require('webpack-pwa-manifest');

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

// configuration.mode = 'none';
configuration.plugins = [
  ...configuration.plugins,
  new PWAManifestPlugin({
    short_name: '么么哒',
    name: 'A lovely carries baby',
    description: '抱抱我家智障宝宝',
    display: 'standalone',
    background_color: '#2196F3',
    theme_color: '#2196F3',
    start_url: '/index.html',
    ios: true,
    icons: [
      {
        src: path.resolve('public/android.png'),
        sizes: [256, 512, 768, 1025],
        destination: 'android',
      },
      {
        src: path.resolve('public/ios.png'),
        sizes: [256, 512, 768, 1025],
        ios: true,
        destination: 'ios',
      },
    ],
  }),
];

module.exports = configuration;
