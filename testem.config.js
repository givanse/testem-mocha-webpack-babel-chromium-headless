const path = require('path');

module.exports = {
  browser_args: {
    // https://developers.google.com/web/updates/2017/04/headless-chrome
    Chrome: [
      '--headless',
      '--disable-gpu',
      '--remote-debugging-port=9222',
    ]
  },
  launch_in_dev: ['Chrome'],
  launch_in_ci: ['Chrome'],
  serve_files: '/dist/bundle.js',
  test_page: 'test.html',
}
