const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const server = require('./server');
let win;

function createWindow () {
      win = new BrowserWindow({width: 800, height: 600, show : false})
      win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.on("ready-to-show", () => {
        win.show();
    });

    win.on('closed', () => {
          win = null
    });
}

app.on('ready', createWindow);


app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null)
        createWindow();
})

app.on('ready', () => {
    let SERVER = new server({ port : 1528 });
    SERVER.init();
    ipcMain.on("ConnectedDevices", (e) => {
        e.sender.send("ConnectedDevices", SERVER.ConnectedDevices());
    });
});
