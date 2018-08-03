const CDP = require('chrome-remote-interface');
const BuildServer = require('../lib/build-server');
const openChrome = require('../lib/open-chrome');
const webpackConfig = require('../webpack.config.js');

async function test() {
  openChrome();
  await new BuildServer().start(webpackConfig);

	try {
		// connect to endpoint
		const client = await CDP();

		// extract domains
		const {Network, Page} = client;

		// setup handlers
		Network.requestWillBeSent((params) => {
      console.log(params.request.url);
		});

		// enable events then start!
		await Network.enable();
		await Page.enable();
		await Page.navigate({url: 'http://localhost:8081'});
		await Page.loadEventFired();
	} catch (err) {
    console.error(err);
	} finally {
		if (client) {
			await client.close();
		}
	}
}

module.exports = test;
