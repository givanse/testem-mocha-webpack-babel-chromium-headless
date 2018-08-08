const net = require('net');

function getPort(port, cb) {
  const server = net.createServer()
  server.listen(port, function (err) {
    server.once('close', function () {
      cb(port);
    });
    server.close();
  });
  server.on('error', function (err) {
    getPort(port+1, cb);
  });
}

module.exports = async function findPorts(total, port = 8080) {
  let ports = [];
  for (let i = 0; i < total; i++) {
    const foundPort = await new Promise(function(resolve) {
      getPort(port, function(foundPort) {
        resolve(foundPort);
      });
    });
    port = foundPort + 1; // continue looking from the last one found + 1
    ports = ports.concat([foundPort]); // to keep them in ascending order
  }

  return ports;
}