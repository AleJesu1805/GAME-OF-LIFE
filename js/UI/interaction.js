import {
  canvas,
  cuadricula,
  cleanCanvas,
  drawCelda,
  drawCelula,
  setMostrarCuadricula,
} from "../canvas/canvas.js";
import {
  celulas,
  infoPopulation,
  updateGeneration,
} from "../game-logic/game.js";
import { Formas } from "./Formas.js";

const patternSelect = document.getElementById("patternSelect");
const rotationButton = document.getElementById("rotationButton");
const nextButton = document.getElementById("nextButton");
const cellModeButton = document.getElementById("cellModeButton");
const cellModeLabel = document.getElementById("cellModeLabel");
const cellGridButton = document.getElementById("cellGridButton");
const formas = new Formas(null, null, null, null);

let selectedForm;
let selectedOrientation = 0;
let deleteMode = false;
let nextIntervalId = null;

function stopAdvancing() {
  if (nextIntervalId !== null) {
    clearInterval(nextIntervalId);
    nextIntervalId = null;
  }
}

nextButton.addEventListener("pointerdown", (event) => {
  if (event.button !== 0 || nextIntervalId !== null) return;

  event.preventDefault();
  nextButton.setPointerCapture(event.pointerId);
  updateGeneration();
  nextIntervalId = setInterval(updateGeneration, 120);
});

nextButton.addEventListener("pointerup", stopAdvancing);
nextButton.addEventListener("pointercancel", stopAdvancing);
nextButton.addEventListener("lostpointercapture", stopAdvancing);
nextButton.addEventListener("click", (event) => {
  if (event.detail === 0) updateGeneration();
});

Object.keys(formas.formas).forEach((forma) => {
  let option = document.createElement("option");
  option.value = forma;
  option.innerHTML = forma.toUpperCase();
  if (option.innerHTML === "BLOQUE") {
    option.setAttribute("selected", "true");
    selectedForm = option.value;
  }
  patternSelect.appendChild(option);
});

patternSelect.addEventListener("change", (e) => {
  selectedForm = e.target.value;
});

rotationButton.addEventListener("click", () => {
  selectedOrientation = (selectedOrientation + 1) % 4;
  const degrees = selectedOrientation * 90;
  rotationButton.textContent = `ROTATE: ${degrees}deg`;
  rotationButton.setAttribute("aria-label", `Rotación: ${degrees} grados`);
});

cellModeButton.addEventListener("click", () => {
  deleteMode = !deleteMode;
  cellModeButton.setAttribute("aria-pressed", String(deleteMode));
  cellModeButton.setAttribute(
    "aria-label",
    `Modo ${deleteMode ? "eliminar" : "añadir"} células`,
  );
  cellModeLabel.textContent = deleteMode ? "DELETE CELLS" : "ADD CELLS";
});

cellGridButton.addEventListener("click", () => {
  const visible = cellGridButton.getAttribute("aria-pressed") !== "true";
  cellGridButton.setAttribute("aria-pressed", String(visible));
  cellGridButton.setAttribute(
    "aria-label",
    `${visible ? "Ocultar" : "Mostrar"} cuadrícula de celdas`,
  );
  setMostrarCuadricula(visible);

  cleanCanvas();
  const celulasVivas = new Set(celulas.map(({ x, y }) => `${x},${y}`));
  for (let x = 0; x < cuadricula.ancho; x++) {
    for (let y = 0; y < cuadricula.alto; y++) {
      const celda = { x, y };
      if (celulasVivas.has(`${x},${y}`)) {
        drawCelula(celda);
      } else {
        drawCelda(celda);
      }
    }
  }
});

function editCell(x, y) {
  const forma = new Formas(x, y, selectedForm, selectedOrientation);

  const indice = celulas.findIndex(
    (celula) => celula.x === x && celula.y === y,
  );

  if (deleteMode) {
    if (indice !== -1) {
      drawCelda(celulas[indice]);
      celulas.splice(indice, 1);
    }
  } else {
    forma.drawForma();
  }
  infoPopulation.textContent = `POPULATION: ${celulas.length}`;
}

canvas.addEventListener("pointerdown", (e) => {
  const rect = canvas.getBoundingClientRect();
  let x = Math.floor(((e.clientX - rect.left) / rect.width) * cuadricula.ancho);
  let y = Math.floor(((e.clientY - rect.top) / rect.height) * cuadricula.alto);
  editCell(x, y);
});

canvas.addEventListener("touchmove", (e) => {
  const rect = canvas.getBoundingClientRect();
  let x = Math.floor(
    ((e.changedTouches[0].clientX - rect.left) / rect.width) * cuadricula.ancho,
  );
  let y = Math.floor(
    ((e.changedTouches[0].clientY - rect.top) / rect.height) * cuadricula.alto,
  );
  editCell(x, y);
});
