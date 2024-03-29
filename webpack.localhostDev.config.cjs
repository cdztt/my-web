const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const sharedConfig = require('./webpack.shared.config.cjs');
const { getTls } = require('./global.cjs');

const defaultMinifyOptions = {
  collapseWhitespace: true,
  keepClosingSlash: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
};

const config = {
  devServer: {
    static: './dev',
    //the port of corresponding data server is 444(another node process)
    // npm script: "serve": "node ./localServer.js"
    port: 4444,
    server: {
      type: 'https',
      options: {
        ...getTls(),
      },
    },
  },
  entry: './localhostDev/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dev'),
    clean: true,
  },
  resolve: {
    fallback: {
      path: false,
      fs: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]ss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.woff$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './localhostDev/index.html',
      minify: {
        ...defaultMinifyOptions,
        removeComments: false,
      },
    }),
    new MiniCssExtractPlugin(),
  ],
};

module.exports = (env) => merge(sharedConfig(env), config);
