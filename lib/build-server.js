const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');

const PORT = 8081;
const HOST = 'localhost';

class BuildServer {

  initialCompilationPromise(compiler) {
    return new Promise(function(resolve) {
      compiler.hooks.done.tap('it is done', function(stat) {
        resolve();
      });
    });
  }
  
  async start(webpackConfig) {

    const compiler = webpack(webpackConfig);

    const options = {
      watchOptions: {
        poll: true
      },
      headers: {
        'X-Dev-Server': 'served by dev server'
      },
      hot: true,
      inline: false,
      //noInfo: true, // no webpack bundle info on bootstrap
      //open: false, // open a web browser
      proxy: {},
      stats: {
        colors: true
      },
    };
    const wdServer = new WebpackDevServer(compiler, options);
    
    await this.initialCompilationPromise(compiler);

    console.log('compilation has completed');

    return new Promise(function(resolve, reject) {
      const net = wdServer.listen(PORT, HOST, function() {
        resolve(net);
      });
      net.on('error', reject);
    })
    .then(function() {
      console.log(`dev server listening http://${HOST}:${PORT}`);
    });
  }

}

module.exports = BuildServer;
