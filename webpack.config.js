/**
 * @description - webpack development configuration
 * @author - huang.jian
 */

// packages
const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const {
  InjectExternalPlugin,
} = require('@coco-platform/webpack-plugin-inject-external');

module.exports = {
  mode: 'development',
  target: 'web',
  amd: false,
  node: false,
  // force single entry within single-spa
  entry: './src/main.tsx',
  output: {
    path: path.resolve(process.cwd(), './dist/client'),
    publicPath: '/',
    filename: 'static/script/[name].bundle.js',
    chunkFilename: 'static/script/[id]_[name].chunk.js',
    crossOriginLoading: 'anonymous',
  },
  // react-refresh need compile time react
  externals: {},
  resolve: {
    extensions: ['.js', '.jsx', '.mjs', '.json', '.ts', '.tsx'],
    alias: {},
  },
  module: {
    noParse: [/\.min\.js/],
    rules: [
      {
        test: /\.(js|jsx|mjs|mjsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
              plugins: ['react-refresh/babel'],
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
          require.resolve('style-loader'),
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
        include: /node_modules/,
        use: [
          { loader: require.resolve('style-loader') },
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
    new CaseSensitivePathsPlugin(),
    new ReactRefreshWebpackPlugin(),
    new webpack.WatchIgnorePlugin({
      paths: [/\.js$/, /\.d\.ts$/],
    }),
    new webpack.ContextReplacementPlugin(/moment\/locale$/, /zh-cn/),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(process.cwd(), './public/index.html'),
      favicon: path.join(process.cwd(), './public/favicon.ico'),
    }),
    new InjectExternalPlugin({
      env: 'development',
      definition: 'bootcdn.stable.yml',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      openAnalyzer: false,
      reportFilename: '../analyzer/index.html',
    }),
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    proxy: [
      {
        context: ['/data_analyze'],
        target: 'https://github.com',
        changeOrigin: true,
        secure: false,
      },
    ],
  },
};
