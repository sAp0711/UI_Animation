import { startSnow, stopSnow } from "./snow.js";
const checkbox = document.getElementById("toggle");

checkbox.addEventListener("change", toggleSnow);

const body = document.body;
body.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    checkbox.checked = !checkbox.checked;
    toggleSnow();
  }
});
function toggleSnow() {
  if (checkbox.checked) {
    startSnow();
  } else {
    stopSnow();
  }
}
