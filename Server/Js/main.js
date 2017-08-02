const {ipcRenderer} = require('electron');
window.onload = () => {
    setInterval(function () {
        ipcRenderer.send("ConnectedDevices");
    }, 2000);

};


ipcRenderer.on("ConnectedDevices", (e, arg) => {
    console.log(arg);
    let object = arg;
    for (var variable in object) {
        if (object.hasOwnProperty(variable)) {
            document.getElementById("pre").innerHTML = object[variable]+ "\n";
        }
    }


});
