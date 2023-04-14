const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile("index.html");
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
