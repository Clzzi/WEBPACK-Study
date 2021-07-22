import "normalize.css";
import styles from "./index.module.css";
import $ from "jquery";
import ryan from "./assets/ryan.jpg";
import github from "./assets/github.svg";

function component() {
  const el = document.createElement("div");
  el.innerHTML = "Hi, WEBPACK";

  const imgEl = document.createElement("img");
  imgEl.src = github;

  console.log(github);
  console.log(styles);

  el.appendChild(imgEl);
  el.classList = styles.helloWebpack;

  return el;
}

document.body.appendChild(component());
console.log($(`.${styles.helloWebpack}`).length);
console.log(`IS_PRODUCTION MODE: ${IS_PRODUCTION}`);
