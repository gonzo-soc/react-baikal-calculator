/** webpack-prod.config.js */
const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  watch: false,
  mode: 'production',
  performance: {
    hints: "warning",
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
});