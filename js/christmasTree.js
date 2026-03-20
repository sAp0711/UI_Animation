const colors = [
  "#FCEED3",
  "#DBBDAB",
  "#7C0403",
  "#A60B08",
  "#fb4242",
  "#490200",
  "#734E30",
  "#0A5C36",
  "#0F5132",
  "#14452F",
];

function randomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

function Colors() {
  const toggleColor = randomColor();
  let switchColor;
  do {
    switchColor = randomColor();
  } while (switchColor === toggleColor);
  return { toggleColor, switchColor };
}

const container = document.querySelector(".container");

createTree();

function createTree() {
  for (let i = 2; i <= 12; i++) {
    const unit = document.createElement("div");
    unit.classList.add("unit");

    unit.style.width = `${24 * i}px`;

    container.appendChild(unit);

    for (let j = 0; j < i; j++) {
      const toggle = document.createElement("div");
      //creates a DOM div element
      toggle.classList.add("toggle");
      //adds 'toggle' class to that div

      const { toggleColor, switchColor } = Colors();
      toggle.style.backgroundColor = toggleColor;
      toggle.dataset.switchColor = switchColor;
      //dataset adds the data attribute to the toggle div.
      //this IDs each toggle with it own diff switch color
      //<div class="toggle" data-switch-color=switchColor></div>

      const random = 100 * Math.random();
      toggle.style.width = `${random}px`;

      unit.appendChild(toggle);

      /*if (unit.scrollWidth > unit.clientWidth) {
      unit.removeChild(toggle); // undo last
      break;
    }*/
    }
  }
  document.querySelectorAll(".toggle").forEach((toggle) => {
    const toggleSwitch = document.createElement("div");
    toggleSwitch.classList.add("toggleSwitch");

    const toggleWidth = toggle.clientWidth;
    const toggleHeight = toggle.clientHeight;
    const moveX = toggleWidth - toggleHeight - 4;
    toggleSwitch.style.setProperty("--move-x", `${moveX}px`);

    const time = 1.5 * Math.random() + 0.5;
    toggleSwitch.style.setProperty("--time", `${time}s`);

    toggleSwitch.style.backgroundColor = toggle.dataset.switchColor;

    toggle.appendChild(toggleSwitch);
  });
}

const starHolder = document.querySelector(".star-holder");
starHolder.addEventListener("click", () => {
  container.innerHTML = "";
  createTree();
});

const body = document.body;
body.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    container.innerHTML = "";
    createTree();
  }
});
