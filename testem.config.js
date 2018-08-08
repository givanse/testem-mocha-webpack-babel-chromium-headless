const path = require('path');

module.exports = {
  launchers: {
    Acceptance: {
      command: 'mocha test/acceptance/setup.js test/acceptance/**/*.test.js',
    }
  },
  browser_args: {
    // https://developers.google.com/web/updates/2017/04/headless-chrome
    Chrome: {
      dev: [
        '--remote-debugging-port=9222',
        '--auto-open-devtools-for-tabs',
      ],
      ci: [
        // --no-sandbox is needed when running Chrome inside a container
        process.env.CI ? '--no-sandbox' : null,
        '--headless',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--mute-audio',
        '--remote-debugging-port=0',
        '--window-size=1440,900'
      ].filter(Boolean)
    }
  },
  disable_watching: true,
  launch_in_dev: ['Chrome', 'Acceptance'],
  launch_in_ci: ['Chrome', 'Acceptance'],
  serve_files: '/dist/bundle.js',
  test_page: 'test/index.html', // a query string is appended
}
