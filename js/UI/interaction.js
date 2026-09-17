import { canvas, cuadricula, drawCelda } from "../canvas/canvas.js";
import { celulas } from "../game-logic/game.js";
import { Formas } from "./Formas.js";

const patternSelect = document.getElementById("patternSelect");
const orientationSelect = document.getElementById("orientationSelect");
const formas = new Formas(null, null, null, null);
let selectedForm, selectedOrientation;

Object.keys(formas.formas).forEach((forma) => {
  let option = document.createElement("option");
  option.value = forma;
  option.innerHTML = forma.toUpperCase();
  if (option.innerHTML === "COHETE") {
    option.setAttribute("selected", "true");
    selectedForm = option.value;
  }
  patternSelect.appendChild(option);
});

patternSelect.addEventListener("change", (e) => {
  selectedForm = e.target.value;
});

// const formaOptions = patternSelect.childNodes;
// formaOptions.forEach((e) => {
//   if (e.selectedForm) {
//     forma = e.value;
//   }
// });

canvas.addEventListener("pointerdown", (e) => {
  const rect = canvas.getBoundingClientRect();
  let x = Math.floor(((e.clientX - rect.left) / rect.width) * cuadricula.ancho);
  let y = Math.floor(((e.clientY - rect.top) / rect.height) * cuadricula.alto);

  // SELECCIONAR FORMAS

  const forma = new Formas(x, y, selectedForm, 4);

  // DIBUJAR CELULAS
  const indice = celulas.findIndex(
    (celula) => celula.x === x && celula.y === y,
  );

  if (indice === -1) {
    // celulas.push({ x, y });
    forma.drawForma();
    // drawCelula({ x, y });
  } else {
    drawCelda(celulas[indice]);
    celulas.splice(indice, 1);
  }

  // cleanCanvas();
  // updateGeneration();
  // drawGeneration();
});
