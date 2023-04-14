const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");

// const dialogOptions = {
//   type: "warning",
//   title: "Mer il et fou!",
//   message: "Wow, attention c'est dangereux!",
//   buttons: ["Oui, je suis fou", "Non, je ne suis pas fou"],
// };

// const dialogFileOptions = {
//   title: "Sélectionner un fichier",
//   buttonLabel: "Ouvrir",
//   filters: [{ name: "Images", extensions: ["jpg", "png", "gif"] }],
// };

const dialogSaveOptions = {
  title: "Sélectionner un fichier",
  buttonLabel: "Enregistrer",
  filters: [{ name: "Textes", extensions: ["txt"] }],
  defaultPath: "C:\\Users\\jb\\Desktop\\hello.txt",
};

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("src/index.html");
  //   dialog.showMessageBox(win, dialogOptions).then((result) => {
  //     console.log(result);
  //   });

  //   dialog.showOpenDialog(win, dialogFileOptions).then((result) => {
  //     console.log(result);
  //   });
  ipcMain.on("msg", (event, arg) => {
    console.log(arg);
    win.webContents.send("stuff", "Kikou!");
  });

  ipcMain.on("save-file", (event, arg) => {
    dialog.showSaveDialog(win, dialogSaveOptions).then((result) => {
      fs.writeFile(result.filePath, "Coucou!", (err) => {
        if (err) console.log(err);
        console.log("The file has been saved!");
      });
    });
  });
}

app.whenReady().then(() => {
  // do something
  console.log("app is ready");

  createWindow();

  // Sur Mac, quand on clique sur l'icône de l'app dans le dock
  // et que l'app est déjà ouverte, on veut que la fenêtre soit
  // réaffichée
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Windows et linux
// Faire en sorte que si toutes les fenêtres de l'app sont fermées, l'app se ferme
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
