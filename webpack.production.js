/**
 * @description - declare webpack production configuration
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

/* eslint-disable import/no-extraneous-dependencies */
// packages
const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const InjectExternalPlugin = require('@coco-platform/webpack-plugin-inject-external');
const HtmlMinifyPlugin = require('@coco-platform/webpack-plugin-html-minify');
const InlinePlugin = require('@coco-platform/webpack-plugin-inline');
const PWAManifestPlugin = require('webpack-pwa-manifest');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    main: path.resolve(process.cwd(), './src/main.jsx'),
  },
  output: {
    path: path.resolve(process.cwd(), 'dist', 'client'),
    publicPath: '/',
    filename: 'static/script/[name].[chunkhash:8].js',
    chunkFilename: 'static/script/[id]_[name]_[chunkhash:8].chunk.js',
    crossOriginLoading: 'anonymous',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.mjs',
      '.json',
      '.ts',
      '.tsx',
      '.web.js',
      '.web.jsx',
    ],
    alias: {},
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs|mjsx|ts|tsx)$/,
        include: path.resolve(process.cwd(), 'src'),
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.p?css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              root: path.resolve(process.cwd(), 'src'),
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: [
          path.resolve(process.cwd(), 'src'),
          path.resolve(process.cwd(), 'public'),
        ],
        use: [
          MiniCssExtractPlugin.loader,
          { loader: require.resolve('css-loader') },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|bmp|mp3|woff|woff2|ttf|eot|svg)(\?.*)?$/,
        use: [
          {
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ProgressBarPlugin(),
    new CaseSensitivePathsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/stylesheet/[name].[hash].css',
      chunkFilename: 'static/stylesheet/[id].[hash].chunk.css',
    }),
    new webpack.ContextReplacementPlugin(/moment\/locale$/, /zh-cn/),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(process.cwd(), 'public', 'index.html'),
      favicon: path.join(process.cwd(), 'public', 'favicon.ico'),
    }),
    new CompressionPlugin({
      test: /\.(js|css|html)$/,
      threshold: 1024,
      minRatio: 0.85,
    }),
    new InjectExternalPlugin({
      env: 'production',
      definition: 'bootcdn.stable.yml',
    }),
    new PWAManifestPlugin({
      short_name: '紫苑花开',
      name: 'The First Web APP',
      description: '🤗抱抱我家智障宝宝🤗',
      display: 'standalone',
      background_color: '#2196F3',
      theme_color: '#2196F3',
      start_url: '/pwa/history',
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
    new InjectManifest({
      swSrc: 'public/sw.js',
      swDest: 'sw.js',
      importWorkboxFrom: 'local',
      importsDirectory: 'workbox',
      exclude: [/\.gz$/, /\.map$/],
      globPatterns: ['**/*.{png,ico,html,json,jpg,js,css}'],
    }),
    new HtmlMinifyPlugin(),
    new InlinePlugin({
      files: ['public/register-sw.js'],
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../analyzer/index.html',
      openAnalyzer: false,
    }),
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  devtool: 'source-map',
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    crypto: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};
