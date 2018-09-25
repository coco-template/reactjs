/**
 * @description - production configuration
 * @author - yang.yuncai <383235388@qq.com>
 */

/* eslint-disable import/no-extraneous-dependencies */
// package
const path = require('path');
const fs = require('fs');
const presets = require('@coco-platform/webpack-preset');
const PWAManifestPlugin = require('webpack-pwa-manifest');
const InlinePlugin = require('@coco-platform/webpack-plugin-inline');
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
const configuration = { ...presets.production(options), externals };
const productionPlugins = [
  new InlinePlugin({
    files: ['public/preload.css', 'public/register-sw.js'],
  }),
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

configuration.plugins = [...configuration.plugins, ...productionPlugins];

module.exports = configuration;
