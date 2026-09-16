const canvas = document.querySelector("canvas");
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext("2d");

const cuadricula = {
  ancho: 10,
  alto: 10,
  lineWidth: 0.1,
  lineStyle: "#000000",
};
const escala = canvas.width / cuadricula.ancho;
const celulas = [];
// celulas.push({ x: 2, y: 3 });
// celulas.push({ x: 3, y: 3 });
// celulas.push({ x: 4, y: 3 });

class Formas {
  constructor(x, y, nameForma) {
    this.x = x;
    this.y = y;
    this.nameForma = nameForma;
    this.formas = {
      linea: [
        { x: this.x, y: this.y },
        { x: this.x + 1, y: this.y },
        { x: this.x + 2, y: this.y },
      ],
      columna: [
        { x: this.x, y: this.y },
        { x: this.x, y: this.y + 1 },
        { x: this.x, y: this.y + 2 },
      ],
    };
  }
  drawForma() {
    for (let i = 0; i < this.formas[this.nameForma].length; i++) {
      celulas.push(this.formas[this.nameForma][i]);
      drawCelula(this.formas[this.nameForma][i]);
      console.log(this.formas[this.nameForma][i]);
    }
  }
}

let lines = new Formas(6, 4, "columna");
lines.drawForma();

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

function updateGeneration() {
  const siguiente = [];

  for (let x = 0; x < cuadricula.ancho; x++) {
    for (let y = 0; y < cuadricula.alto; y++) {
      const celda = { x, y };
      const vecinos = observarVecinos(celda); // siempre contra `celulas`, el estado viejo
      const viva = celulas.some((c) => c.x === x && c.y === y);

      if (viva && (vecinos === 2 || vecinos === 3)) {
        siguiente.push(celda);
        drawCelula(celda);
      } else if (!viva && vecinos === 3) {
        siguiente.push(celda);
        drawCelula(celda);
      } else {
        drawCelda(celda);
      }
    }
  }

  celulas.length = 0;
  celulas.push(...siguiente);
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
  updateGeneration();
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
