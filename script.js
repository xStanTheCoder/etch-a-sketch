// VARIABLES
const container = document.querySelector(".container");
const reset = document.querySelector(".reset");
const rainbow = document.querySelector(".rainbow");
const gray = document.querySelector(".gray");
const shade = document.querySelector(".shade");
const erase = document.querySelector(".erase");
const range = document.querySelector(".range");
const rangeValue = document.querySelector(".range-value");
let colorMode = "default";

// EVENT LISTENERS
window.addEventListener("load", () => {
  rangeValue.textContent = `${range.value} x ${range.value}`;
  container.style.gridTemplateRows = `repeat(${range.value}, 1fr)`;
  container.style.gridTemplateColumns = `repeat(${range.value}, 1fr)`;
});

reset.addEventListener("click", handleResetClick);
rainbow.addEventListener("click", handleRainbowClick);
gray.addEventListener("click", handleGrayClick);
shade.addEventListener("click", handleShadeClick);
erase.addEventListener("click", handleEraseClick);
range.addEventListener("input", handleRangeInput);

createGrid(range.value);

// FUNCTIONS
function handleResetClick() {
  const cells = document.querySelectorAll(".item");
  cells.forEach((cell) => {
    cell.removeAttribute("style");
  });
  range.value = 16;
  rangeValue.textContent = `${range.value} x ${range.value}`;
  container.style.gridTemplateRows = `repeat(${range.value}, 1fr)`;
  container.style.gridTemplateColumns = `repeat(${range.value}, 1fr)`;
  colorMode = "default";
}

function createGrid(gridSize) {
  container.innerHTML = "";
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cell = document.createElement("div");
      cell.classList.add("item");
      container.appendChild(cell);
    }
  }
  setCellHoverEffect();
}

function setCellHoverEffect() {
  const cells = document.querySelectorAll(".item");
  cells.forEach((cell) => {
    cell.addEventListener("mouseover", handleCellMouseOver);
  });
}

function handleCellMouseOver(e) {
  const cell = e.target;
  switch (colorMode) {
    case "rainbow":
      const rgbColors = getRandomRGBColors();
      cell.style.backgroundColor = `rgba(${rgbColors[0]}, ${rgbColors[1]}, ${rgbColors[2]}, 0.99)`;
      break;
    case "shade":
      darkenBackground(e);
      break;
    case "erase":
      cell.removeAttribute("style");
      break;
    default:
      cell.style.backgroundColor = "rgba(128, 128, 128, 0.99)";
      break;
  }
}

function handleRainbowClick() {
  colorMode = "rainbow";
}

function handleGrayClick() {
  colorMode = "default";
}

function handleEraseClick() {
  colorMode = "erase";
}

function handleShadeClick() {
  colorMode = "shade";
}

function getRandomRGBColors() {
  const colors = [];
  for (let i = 0; i < 3; i++) {
    colors.push(getRandomColorValue());
  }
  return colors;
}

function getRandomColorValue() {
  return Math.floor(Math.random() * 256);
}

function darkenBackground(e) {
  let currentColor = e.target.getAttribute("style");
  if (currentColor === null) {
    e.target.style.backgroundColor = "rgba(128, 128, 128, 0.1)";
  } else {
    let currentOpacity = getOpacity(currentColor);
    if (currentOpacity < 0.99) {
      let newOpacity = currentOpacity + 0.1;
      e.target.style.backgroundColor = `rgba(128, 128, 128, ${newOpacity})`;
    }
  }
}

function getOpacity(color) {
  if (color.indexOf("rgba") !== -1) {
    let opacity = color
      .substring(color.lastIndexOf(",") + 1, color.lastIndexOf(")"))
      .trim();
    return parseFloat(opacity);
  }
}

function handleRangeInput() {
  rangeValue.textContent = `${range.value} x ${range.value}`;
  container.style.gridTemplateRows = `repeat(${range.value}, 1fr)`;
  container.style.gridTemplateColumns = `repeat(${range.value}, 1fr)`;
  createGrid(range.value);
}
