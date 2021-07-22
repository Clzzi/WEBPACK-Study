import "normalize.css";
import styles from "./index.css";

function component() {
  const el = document.createElement("div");
  el.innerHTML = "Hi, WEBPACK";

  console.log(styles);

  el.classList = styles.helloWebpack;

  return el;
}

document.body.appendChild(component());
