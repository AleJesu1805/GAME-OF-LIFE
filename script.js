const canvas = document.querySelector("canvas");
canvas.width = 10;
canvas.height = 10;
const ctx = canvas.getContext("2d");

const colorNumero = {
  0: "#697850",
  1: "#4e590f",
};

const celulas = new Set();

celulas.add({ x: 1, y: 2 });
celulas.add({ x: 9, y: 2 });
celulas.add({ x: 4, y: 4 });
celulas.add({ x: 3, y: 3 });
celulas.add({ x: 2, y: 5 });

function drawCelula(pos = { x: 1, y: 2 }) {
  ctx.fillStyle = colorNumero[1];
  ctx.fillRect(pos.x, pos.y, 1, 1);
}

function drawAllCelulas() {
  for (const celula of celulas) {
    drawCelula(celula);
  }
}

function updateCelulas() {
  for (let i = 0; i < celulas.size; i++) {
    celulas.forEach((cel) => {
      console.log(cel);
    });
  }
}

updateCelulas();

const fps = 10;
const frameDuration = 1000 / fps;
let ultimoTiempo = 0;
function gameLoop(tiempoActual) {
  const delta = tiempoActual - ultimoTiempo;
  if (delta < frameDuration) return;
  ultimoTiempo = tiempoActual - (delta % frameDuration);

  drawAllCelulas();
  requestAnimationFrame(gameLoop);
}

setTimeout(() => {
  requestAnimationFrame(gameLoop);
}, 500);
