let btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  window.electron.sayHello();
});
