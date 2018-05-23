const webpack = require('webpack');
const path = require('path');

const commonConfig = require('./webpack.common.js');

module.exports = {
  devtool: 'eval',
  mode: process.env.NODE_ENV,
  entry: [
    path.resolve(__dirname, './src/app.js'),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        include: path.resolve(__dirname, 'src'),
        use: [
          'babel-loader',
        ],
      },
      ...commonConfig
    ],
  },
  target: 'electron-renderer',
  externals: 'commonjs2',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: true,
        NODE_ENV: JSON.stringify('development'),
        PORT: 3005,
      },
      '__DEV__': true,
    }),
  ],
  output: {
    filename: './[name].bundle.js',
    path: __dirname,
    publicPath: 'http://localhost:3005/',
  },
};
