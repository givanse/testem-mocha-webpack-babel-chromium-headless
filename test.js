const port = 8081;
const host = 'localhost';
const webpack = require('webpack');
const Testem = require('testem');
const webpackConfig = require('./webpack.config.js');
const testemConfig = require('./testem.config.js');
const WebpackDevServer = require('webpack-dev-server');

/**
 * Webpack dev-server start
 * @return {[type]} [description]
 */
function startDevServer(webpackConfig) {
  const compiler = webpack(webpackConfig);

  compiler.plugin('done', function(stat) {
    console.log('first build complete');
  });

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
  
  return new Promise(function(resolve, reject) {
		const net = wdServer.listen(port, host, function() {
		  console.log(`dev server listening`);
		  resolve();
		});
    net.on('error', reject);
  });
};

async function start() {
  await startDevServer(webpackConfig);

  const testem = new Testem();
	testem.startDev(testemConfig, function() {
		process.exit(0);
	});
}

start();
