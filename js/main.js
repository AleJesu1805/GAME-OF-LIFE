import { cleanCanvas } from "./canvas/canvas.js";
import { Formas } from "./UI/Formas.js";
import { updateGeneration, cleanTable } from "./game-logic/game.js";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

updateGeneration();
// const rpentomino = new Formas(30, 30, "rPentomino");
// rpentomino.drawForma();

const fps = 30;
const frameDuration = 1000 / fps;

let ultimoTiempo = 0;
let animationFrameId = null;
let juegoActivo = false;
let intervaloActualizacion = 3;
let frameCount = 0;

function gameLoop(tiempoActual) {
  if (!juegoActivo) return;
  animationFrameId = requestAnimationFrame(gameLoop);
  const delta = tiempoActual - ultimoTiempo;
  if (delta < frameDuration) return;
  ultimoTiempo = tiempoActual - (delta % frameDuration);

  if (frameCount % intervaloActualizacion === 0) {
    cleanCanvas();
    updateGeneration();
  }

  frameCount++;
}

function actualizarEstadoControles() {
  document
    .querySelector("#playButton")
    .setAttribute("aria-pressed", String(juegoActivo));

  document
    .querySelector("#pauseButton")
    .setAttribute("aria-pressed", String(!juegoActivo));
}

export function play() {
  if (juegoActivo) return;

  juegoActivo = true;
  ultimoTiempo = performance.now();
  animationFrameId = requestAnimationFrame(gameLoop);
  actualizarEstadoControles();
}

export function pausa() {
  juegoActivo = false;

  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  actualizarEstadoControles();
}

window.play = play;
window.pausa = pausa;
window.updateGeneration = updateGeneration;
window.cleanTable = cleanTable;
