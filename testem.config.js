const path = require('path');

module.exports = {
  browser_args: {
    Chrome: [
      '--auto-open-devtools-for-tabs'
    ]
  },
  launch_in_dev: ['Chrome'],
  launch_in_ci: ['Chrome'],
  serve_files: '/dist/bundle.js',
  test_page: 'test.html',
}
