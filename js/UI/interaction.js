import {
  canvas,
  cuadricula,
  drawCelula,
  drawCelda,
  cleanCanvas,
} from "../canvas/canvas.js";
import { celulas, updateGeneration } from "../game-logic/game.js";

// const patternSelect = document.getElementById("patternSelect");
// let x, y;
// let forma, orientacion;

// Object.keys(point.formas).forEach((forma) => {
//   let option = document.createElement("option");
//   option.value = forma;
//   option.innerHTML = forma.toUpperCase();
//   if (option.innerHTML === "PUNTO") {
//     option.setAttribute("selected", "true");
//   }
//   patternSelect.appendChild(option);
// });

// const formaOptions = patternSelect.childNodes;
// formaOptions.forEach((e) => {
//   if (e.selected) {
//     forma = e.value;
//   }
// });

canvas.addEventListener("pointerdown", (e) => {
  const rect = canvas.getBoundingClientRect();
  let x = Math.floor(((e.clientX - rect.left) / rect.width) * cuadricula.ancho);
  let y = Math.floor(((e.clientY - rect.top) / rect.height) * cuadricula.alto);

  const indice = celulas.findIndex(
    (celula) => celula.x === x && celula.y === y,
  );

  if (indice === -1) {
    celulas.push({ x, y });
    drawCelula({ x, y });
  } else {
    drawCelda(celulas[indice]);
    celulas.splice(indice, 1);
  }
  // cleanCanvas();
  // updateGeneration();
  // drawGeneration();
});
