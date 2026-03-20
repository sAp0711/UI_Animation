const slider = document.getElementById("slider");
const value = document.getElementById("value");

value.textContent = slider.value;

slider.addEventListener("input", () => {
  setSnowflakeCount(Number(slider.value));
});

let snowflakeCount = Number(slider.value);

function setSnowflakeCount(count) {
  snowflakeCount = count;
  const currentCount = snowflakes.length;

  if (snowflakeCount > currentCount) {
    // Add snowflakes
    for (let i = 0; i < snowflakeCount - currentCount; i++) {
      snowflakes.push(createSnowflake());
    }
  } else if (snowflakeCount < currentCount) {
    // Remove snowflakes
    snowflakes.length = snowflakeCount;
  }

  value.textContent = count;
  slider.value = count;
}

const maxSize = 4;
const maxSpeed = 2;
const color = "#ddd";
const snowflakes = [];

const canvas = document.createElement("canvas");
canvas.style.position = "absolute";
canvas.style.top = "0px";
canvas.style.pointerEvents = "none";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

const createSnowflake = () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  radius: Math.floor(Math.random() * maxSize) + 1,
  color: color,
  speed: Math.random() * maxSpeed + 0.5,
  sway: Math.random() - 0.5,
});

const drawSnowflake = (snowflake) => {
  ctx.beginPath();
  ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
  ctx.fillStyle = snowflake.color;
  ctx.fill();
  ctx.closePath();
};

for (let i = 0; i < snowflakeCount; i++) {
  snowflakes.push(createSnowflake());
}

const updateSnowflake = (snowflake) => {
  snowflake.y += snowflake.speed;
  snowflake.x += snowflake.sway;
  if (snowflake.y > canvas.height) {
    Object.assign(snowflake, createSnowflake());
  }
};

let rafID;
const animate = () => {
  if (!running) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snowflakes.forEach((snowflake) => {
    updateSnowflake(snowflake);
    drawSnowflake(snowflake);
  });

  rafID = requestAnimationFrame(animate);
};

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let running = false;
export function startSnow() {
  if (running) return;
  running = true;
  animate();
}

export function stopSnow() {
  running = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  cancelAnimationFrame(rafID);
  setSnowflakeCount(200);
}
