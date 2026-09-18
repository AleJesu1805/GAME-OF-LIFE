import { canvas, cuadricula, drawCelda } from "../canvas/canvas.js";
import { celulas, infoPopulation } from "../game-logic/game.js";
import { Formas } from "./Formas.js";

const patternSelect = document.getElementById("patternSelect");
const orientationSelect = document.getElementById("orientationSelect");
const formas = new Formas(null, null, null, null);

// Inicializamos selectedOrientation con el valor actual del select (por defecto "1")
let selectedForm,
  selectedOrientation = parseInt(orientationSelect.value);

Object.keys(formas.formas).forEach((forma) => {
  let option = document.createElement("option");
  option.value = forma;
  option.innerHTML = forma.toUpperCase();
  if (option.innerHTML === "PULSAR") {
    option.setAttribute("selected", "true");
    selectedForm = option.value;
  }
  patternSelect.appendChild(option);
});

patternSelect.addEventListener("change", (e) => {
  selectedForm = e.target.value;
});

// NUEVO: Escuchar cambios en el select de orientación para actualizar la variable
orientationSelect.addEventListener("change", (e) => {
  selectedOrientation = parseInt(e.target.value);
});

canvas.addEventListener("pointerdown", (e) => {
  const rect = canvas.getBoundingClientRect();
  let x = Math.floor(((e.clientX - rect.left) / rect.width) * cuadricula.ancho);
  let y = Math.floor(((e.clientY - rect.top) / rect.height) * cuadricula.alto);

  // SELECCIONAR FORMAS
  // MODIFICADO: Usar selectedOrientation en lugar del valor fijo 4
  const forma = new Formas(x, y, selectedForm, selectedOrientation);
  console.log(forma.formas[selectedForm].length);

  // DIBUJAR CELULAS
  const indice = celulas.findIndex(
    (celula) => celula.x === x && celula.y === y,
  );

  if (indice === -1) {
    forma.drawForma();
  } else {
    drawCelda(celulas[indice]);
    celulas.splice(indice, 1);
  }
  infoPopulation.textContent = `POPULATION: ${celulas.length}`;
});
