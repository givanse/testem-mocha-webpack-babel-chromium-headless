const path = require('path');

module.exports = {
  entry: './test/index.js',
  mode: 'development',
  node: {
    fs: 'empty'
  },
  output: {
    filename: 'bundle.js',
    //path: __dirname + 'dist',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
            ],
            plugins: [
            ]
          }
        }
      }
    ]
  },
};
