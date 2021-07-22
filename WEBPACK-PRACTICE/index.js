import "normalize.css";
import styles from "./index.css";
import $ from "jquery";

function component() {
  const el = document.createElement("div");
  el.innerHTML = "Hi, WEBPACK";
  el.classList = styles.helloWebpack;

  return el;
}

document.body.appendChild(component());
console.log($(`.${styles.helloWebpack}`).length);
