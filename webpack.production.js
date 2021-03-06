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
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const InjectExternalPlugin = require('@coco-platform/webpack-plugin-inject-external')
  .default;

module.exports = {
  mode: 'production',
  target: 'web',
  amd: false,
  node: false,
  entry: {
    main: path.resolve(process.cwd(), './src/main.tsx'),
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
    extensions: ['.js', '.jsx', '.mjs', '.json', '.ts', '.tsx'],
    alias: {},
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs|mjsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
            },
          },
          {
            loader: require.resolve('@linaria/webpack-loader'),
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.p?css$/,
        exclude: /node_modules/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
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
        use: [
          { loader: MiniCssExtractPlugin.loader },
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
      filename: 'static/stylesheet/[name].[contenthash:8].css',
      chunkFilename: 'static/stylesheet/[id].[contenthash:8].chunk.css',
    }),
    new webpack.ContextReplacementPlugin(/moment\/locale$/, /zh-cn/),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(process.cwd(), 'public', 'index.html'),
      favicon: path.join(process.cwd(), 'public', 'favicon.ico'),
    }),
    new InjectExternalPlugin({
      env: 'production',
      definition: 'bootcdn.stable.yml',
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
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin({}),
      new CompressionPlugin({
        test: /\.(js|css|html)$/,
        threshold: 1024,
        minRatio: 0.85,
      }),
    ],
  },
  // generate source map without referer
  devtool: 'hidden-source-map',
};
