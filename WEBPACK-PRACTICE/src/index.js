import "normalize.css";
import styles from "./index.css";
import $ from "jquery";
import ryan from "./assets/ryan.jpg";

function component() {
  const el = document.createElement("div");
  el.innerHTML = "Hi, WEBPACK";

  const imgEl = document.createElement("img");
  imgEl.src = ryan;

  console.log(ryan);
  console.log(styles);

  el.appendChild(imgEl);
  el.classList = styles.helloWebpack;

  return el;
}

document.body.appendChild(component());
console.log($(`.${styles.helloWebpack}`).length);
console.log(`IS_PRODUCTION MODE: ${IS_PRODUCTION}`);
