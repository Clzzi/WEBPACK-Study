function component() {
  const el = document.createElement("div");
  el.innerHTML = "Hi, WEBPACK";

  return el;
}

document.body.appendChild(component());
