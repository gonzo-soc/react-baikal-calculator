/** webpack-dev.config.js */
const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  watch: true,
  mode: 'development',
  stats: {
    errorDetails: true,
  },
});