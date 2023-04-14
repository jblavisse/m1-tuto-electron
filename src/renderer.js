let btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  window.electron.sayHello();
});

let btnSave = document.getElementById("btn-save");

btnSave.addEventListener("click", () => {
  window.electron.saveFile();
});

window.electron.something();
