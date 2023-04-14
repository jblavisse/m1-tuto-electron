const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  sayHello: () => ipcRenderer.send("msg", "Hello from preload.js!"),
});
