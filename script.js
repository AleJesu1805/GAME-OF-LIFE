const canvas = document.querySelector("canvas");
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext("2d");

const cuadricula = {
  ancho: 50,
  alto: 50,
  lineWidth: 0.00001,
  lineStyle: "#000000",
};
const escala = canvas.width / cuadricula.ancho;
const celulas = [];
celulas.push({ x: 2, y: 3 });
celulas.push({ x: 3, y: 3 });
celulas.push({ x: 4, y: 3 });

function drawCelula(pos = { x: 1, y: 2 }) {
  const escala = canvas.width / cuadricula.ancho;
  ctx.fillStyle = "#161a60";
  ctx.fillRect(pos.x * escala, pos.y * escala, escala, escala);

  ctx.strokeStyle = cuadricula.lineStyle;
  ctx.lineWidth = cuadricula.lineWidth;
  ctx.strokeRect(pos.x * escala, pos.y * escala, escala, escala);
}

function drawCelda(pos = { x: 5, y: 9 }) {
  const escala = canvas.width / cuadricula.ancho;
  ctx.fillStyle = "#7f8285";
  ctx.fillRect(pos.x * escala, pos.y * escala, escala, escala);

  ctx.strokeStyle = cuadricula.lineStyle;
  ctx.lineWidth = cuadricula.lineWidth;
  ctx.strokeRect(pos.x * escala, pos.y * escala, escala, escala);
}

function drawGeneration() {
  for (let x = 0; x < cuadricula.ancho; x++) {
    for (let y = 0; y < cuadricula.alto; y++) {
      const indice = celulas.findIndex(
        (celula) => celula.x === x && celula.y === y,
      );
      if (indice === -1) {
        drawCelda({ x, y });
      } else {
        drawCelula(celulas[indice]);
      }
    }
  }
}
drawGeneration();

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
    if (observarVecinos(celulas[i]) < 2 || observarVecinos(celulas[i]) > 3) {
      celulas.splice(i, 1);
    }
  }
}

function updateGeneration() {
  for (let x = 0; x < cuadricula.ancho; x++) {
    for (let y = 0; y < cuadricula.alto; y++) {
      const celda = { x, y };
      const indice = celulas.findIndex(
        (celula) => celula.x === x && celula.y === y,
      );
      if (indice === -1) {
        if (observarVecinos(celda) === 3) {
          celulas.push(celda);
        }
        drawCelda({ x, y });
      } else {
        drawCelula(celulas[indice]);
      }
    }
  }
  updateCelulas();
}

function update() {
  updateGeneration();
  // drawGeneration();
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
    drawCelula({ x, y });
  } else {
    drawCelda(celulas[indice]);
    celulas.splice(indice, 1);
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGeneration();
});

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

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
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
