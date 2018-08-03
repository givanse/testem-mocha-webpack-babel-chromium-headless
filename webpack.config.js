const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  //entry: path.resolve(__dirname, 'test', 'index.js'),
  mode: 'development',
  node: {
    fs: 'empty'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      }
    ]
  },
	plugins: [
		new CopyWebpackPlugin([
      {
        from: './src/*.html',
        //from: './test/*.html',
        flatten: true
      }
		])
  ]
};
