const path = require('path');
const webpack = require('webpack');

const config = {
  resolve: {
    modules: [
      path.resolve('./lib'),
      path.resolve('./node_modules'),
    ]
  },
  entry: {
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      'axios',
      'prop-types',
      'lodash.debounce',
      'lodash.pickby'
    ],
    app: ['renderers/dom.js']
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env', 'stage-2']
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    })
  ]
};

module.exports = config;
