const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  sayHello: () => ipcRenderer.send("msg", "Hello from preload.js!"),
  saveFile: () => ipcRenderer.send("save-file"),
  stuff: () => ipcRenderer.on("stuff", (event, arg) => console.log(arg)),
});
