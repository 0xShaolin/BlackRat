const net = require('net');

class server {
    constructor(config = {}) {
        let server = net.createServer();
        server.listen(config.port, (socket) => {
            console.log("listeing on port %s", config.port);
        });
    }
}

module.exports = server;
