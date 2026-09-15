const canvas = document.querySelector("canvas");
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext("2d");

const cuadricula = { ancho: 25, alto: 25, lineWidth: 1, lineStyle: "#000000" };
const escala = canvas.width / cuadricula.ancho;
const celulas = [];

function drawCelula(pos = { x: 1, y: 2 }) {
  const escala = canvas.width / cuadricula.ancho;
  ctx.fillStyle = "#3e6016";
  ctx.fillRect(pos.x * escala, pos.y * escala, escala, escala);

  ctx.strokeStyle = cuadricula.lineStyle;
  ctx.lineWidth = cuadricula.lineWidth;
  ctx.strokeRect(pos.x * escala, pos.y * escala, escala, escala);
}

function drawCelda() {
  for (let x = 0; x < cuadricula.ancho; x++) {
    for (let y = 0; y < cuadricula.alto; y++) {
      ctx.fillStyle = "#78856a";
      ctx.fillRect(x * escala, y * escala, escala, escala);

      ctx.strokeStyle = cuadricula.lineStyle;
      ctx.lineWidth = cuadricula.lineWidth;
      ctx.strokeRect(x * escala, y * escala, escala, escala);
    }
  }
}

function drawAllCelulas() {
  for (const celula of celulas) {
    drawCelula(celula);
  }
}

function observarVecinos(celula) {
  const alrededores = [
    { x: celula.x + 1, y: celula.y },
    { x: celula.x - 1, y: celula.y },
    { x: celula.x, y: celula.y + 1 },
    { x: celula.x, y: celula.y - 1 },
    { x: celula.x + 1, y: celula.y - 1 },
    { x: celula.x - 1, y: celula.y + 1 },
    { x: celula.x + 1, y: celula.y + 1 },
    { x: celula.x - 1, y: celula.y - 1 },
  ];
  let vecinos = 0;
  celulas.forEach((cel) => {
    for (let i = 0; i < alrededores.length; i++) {
      if (alrededores[i].x === cel.x && alrededores[i].y === cel.y) {
        vecinos++;
      }
    }
  });
  return vecinos;
}

function updateCelulas() {
  for (let i = celulas.length - 1; i >= 0; i--) {
    const vecinos = observarVecinos(celulas[i]);

    if (vecinos < 2 || vecinos > 3) {
      celulas.splice(i, 1);
    }
  }
}

function revivir() {
  for (let x = 0; x < cuadricula.ancho; x++) {
    for (let y = 0; y < cuadricula.alto; y++) {
      if (observarVecinos({ x: x, y: y }) === 3) {
        celulas.push({ x: x, y: y });
      }
    }
  }
}

canvas.addEventListener("pointerdown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor(
    ((e.clientX - rect.left) / rect.width) * cuadricula.ancho,
  );
  const y = Math.floor(
    ((e.clientY - rect.top) / rect.height) * cuadricula.alto,
  );

  const indice = celulas.findIndex(
    (celula) => celula.x === x && celula.y === y,
  );

  if (indice === -1) {
    celulas.push({ x, y });
  } else {
    celulas.splice(indice, 1);
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCelda();
  drawAllCelulas();
});

drawCelda();
drawAllCelulas();

const fps = 1;
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

  updateCelulas();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCelda();
  revivir();
  drawAllCelulas();
}

function play() {
  if (juegoActivo) return;
  juegoActivo = true;
  ultimoTiempo = performance.now();
  animationFrameId = requestAnimationFrame(gameLoop);
}
function pausa() {
  juegoActivo = false;
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}
