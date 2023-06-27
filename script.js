const container = document.querySelector(".container");
const clear = document.querySelector(".clear");
const controls = document.querySelectorAll(".control");
let size = 16;
let cellSize = "big-cell";

controls.forEach((control) => {
  control.addEventListener("click", handleControlClick);
});

clear.addEventListener("click", handleClearClick);

createGrid(size, cellSize);
setCellHoverEffect(cellSize);

function handleControlClick(e) {
  const size = e.target.value;
  switch (size) {
    case "16":
      cellSize = "big-cell";
      break;
    case "32":
      cellSize = "medium-cell";
      break;
    case "64":
      cellSize = "small-cell";
      break;
    default:
      cellSize = "big-cell";
      break;
  }
  createGrid(size, cellSize);
  setCellHoverEffect(cellSize);
}

function handleClearClick() {
  const cells = document.querySelectorAll(`.${cellSize}`);
  cells.forEach((cell) => {
    cell.classList.remove("hovered");
  });
}

function createGrid(gridSize, cellSize) {
  container.innerHTML = "";
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cell = document.createElement("div");
      cell.classList.add(cellSize);
      container.appendChild(cell);
    }
  }
}

function setCellHoverEffect(cellSize) {
  const cells = document.querySelectorAll(`.${cellSize}`);
  cells.forEach((cell) => {
    cell.addEventListener("mouseover", handleCellMouseOver);
  });
}

function handleCellMouseOver(e) {
  e.target.classList.add("hovered");
}
