import { cleanCanvas } from "./canvas/canvas.js";
import { updateGeneration } from "./game-logic/game.js";

updateGeneration();

const fps = 15;
const frameDuration = 1000 / fps;

let ultimoTiempo = 0;
let animationFrameId = null;
let juegoActivo = false;

function gameLoop(tiempoActual) {
  if (!juegoActivo) return;
  animationFrameId = requestAnimationFrame(gameLoop);
  const delta = tiempoActual - ultimoTiempo;
  if (delta < frameDuration) return;
  ultimoTiempo = tiempoActual - (delta % frameDuration);

  cleanCanvas();
  updateGeneration();
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
