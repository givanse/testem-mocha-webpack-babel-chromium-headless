const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const HOST = 'localhost';

class BuildServer {

  initialCompilationPromise(compiler) {
    return new Promise(function(resolve) {
      compiler.hooks.done.tap('it is done', function(stat) {
        resolve();
      });
    });
  }

  async start(webpackConfig, port) {

    const compiler = webpack(webpackConfig);

    const options = {
      watchOptions: {
        poll: true
      },
      headers: {
        'X-Dev-Server': 'Served by BuildServer'
      },
      hot: true,
      inline: false,
      //noInfo: true, // no webpack bundle info on bootstrap
      //open: true, // open a web browser
      proxy: {},
      stats: {
        colors: true
      },
    };
    const wdServer = new WebpackDevServer(compiler, options);
    
    await this.initialCompilationPromise(compiler);

    console.log('compilation has completed');

    return new Promise(function(resolve, reject) {
      const net = wdServer.listen(port, HOST, function() {
        resolve(net);
      });
      net.on('error', reject);
    })
    .then(function() {
      const url = `http://${HOST}:${port}`;
      const mode = webpackConfig.mode;
      console.log(`server listening at ${url}`);
      return {
        url,
        mode
      };
    });
  }

}

module.exports = BuildServer;
