const autoprefixer = require('autoprefixer');

module.exports = [
  {
    test: /\.(png|svg|jpg|gif)$/,
    use: [
      'file-loader',
    ],
  },
  {
    test: /\.css$/,
    use: [
      'style-loader',
      { loader: 'css-loader', options: { modules: true, importLoaders: 1, localIdentName: '[name]__[local]--[hash:base64:5]' } },
      { loader: 'postcss-loader', options: { plugins: [autoprefixer] } },
    ],
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: [
      'file-loader',
    ],
  }
];
