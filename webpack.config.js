const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: [path.join(__dirname, 'src'), path.join(__dirname, 'dist')],
    compress: true,
    port: 3000,
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: 'style-loader', // creates style nodes from JS strings
      }, {
        loader: 'css-loader', // translates CSS into CommonJS
      }, {
        loader: 'sass-loader', // compiles Sass to CSS
      }],
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Cavern 3D',
      filename: path.join(__dirname, 'src/index.html'),
    }),
  ],
}
