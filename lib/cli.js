const program = require('commander');
const build = require('./build');
const BuildServer = require('./build-server');
const openChrome = require('./open-chrome');
const findPorts = require('./find-ports');
const Testem = require('testem');
const testemConfig = require('../testem.config.js');
const webpackConfigProduction = require('../webpack-production.config.js');
const webpackConfigTest = require('../webpack-test.config.js');

program
  .version('1.0.0')
  .description('');

program
  .command('build')
  .description('build and emit the bundle with assets to `dist`')
  .option('--env <environment>', 'production|test')
  .action(function(options) {
    let webpackConfig;
    switch(options.env) {
      case 'test': webpackConfig = webpackConfigTest; break;
      default:
        webpackConfig = webpackConfigProduction;
    }

    build(webpackConfig);
  });

program
  .command('test')
  .description('')
  .action(async function() {
    const ports = await findPorts(2);
    const testsPort = ports[0];
    const sTest = await new BuildServer().start(webpackConfigTest, testsPort);
    const sProd = await new BuildServer().start(webpackConfigProduction, ports[1]);

    testemConfig.test_page += `?buildPort=${testsPort}`;

    const testem = new Testem();
    testem.startDev(testemConfig, function() {
      process.exit(0);
    });
  });

program
  .command('start-server-production')
  .description('this is not a deploy to production server!!!')
  .action(async function() {
    const ports = await findPorts(1);
    new BuildServer().start(webpackConfigProduction, ports[0]);
  });

program
  .command('start-server-test')
  .description('')
  .action(async function() {
    const ports = await findPorts(1);
    new BuildServer().start(webpackConfigTest, ports[0]);
  });

program
  .command('open-chrome')
  .description('')
  .action(function() {
    openChrome();
  });

program.on('command:*', function () {
  console.log(arguments);
  program.help();
  process.exit(1);
});

if (process.argv.length > 2) {
  program.parse(process.argv);
} else {
  program.help();
}
