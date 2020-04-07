const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
  mode: 'development',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    publicPath: '/',
    chunkFilename: 'js/[name].js'
  },

  module: {
    rules: [
      // ts
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader'
        }
      },
      // js
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime']
            }
          }
        ]
      },
      // less
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, './release'),
    open: true,
    port: 9000
  }
});
