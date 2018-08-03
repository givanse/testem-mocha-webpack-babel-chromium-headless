
const MACOS_COMMAND = '/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --remote-debugging-port=9222';

function exec(cmd) {
  const exec = require('child_process').exec;

  return new Promise(function(resolve, reject) {
    console.log('exe: ' + cmd);
    exec(cmd, function(error, stdout, stderr) {
      if (error) {
        reject(error);
      }

      resolve({stdout, stderr});
    });
  })
  .catch(function(err) {
    throw new Error(err);
  });
}

function openChrome() {
  switch (process.platform) {
    case 'darwin':
      return exec(MACOS_COMMAND);
  }
}

module.exports = openChrome;
