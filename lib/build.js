const fs = require('fs-extra')
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

const DIST_PATH = path.resolve(__dirname + '/../dist');

function build() {
  console.log('deleteing ' + DIST_PATH);
  fs.removeSync(DIST_PATH);

  console.log('output ' + webpackConfig.output.path);
  const compiler = webpack(webpackConfig);

  compiler.run(function(err, stats) {
    if (err) console.log(err);

    const options = {
      colors: true,
      env: true,
      performance: true,
      timings: true,
    };
    console.log(stats.toString(options));
  });
}

module.exports = build;
