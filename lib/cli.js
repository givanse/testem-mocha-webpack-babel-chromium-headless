const program = require('commander');
const build = require('./build');
const test = require('./test');
const BuildServer = require('./build-server');
const openChrome = require('./open-chrome');
const webpackConfig = require('../webpack.config.js');

program
  .version('1.0.0')
  .description('');

program
  .command('build')
  .description('build and emit the bundle with assets to `dist`')
  .action(function() {
    build();
  });

program
  .command('test')
  .description('run the tests')
  .action(function() {
    test();
  });

program
  .command('start-build-server')
  .description('')
  .action(function() {
    new BuildServer().start(webpackConfig);
  });

program
  .command('open-chrome')
  .description('')
  .action(function() {
    openChrome();
  });

program.on('command:*', function () {
  program.help();
  process.exit(1);
});

if (process.argv.length > 2) {
  program.parse(process.argv);
} else {
  program.help();
}