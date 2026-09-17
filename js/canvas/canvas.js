export const canvas = document.querySelector("canvas");
export const ctx = canvas.getContext("2d");
export const canvasWidth = 600;
export const canvasHeight = 600;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

export const cuadricula = {
  ancho: 30,
  alto: 30,
  lineWidth: 0.1,
  lineStyle: "#000000",
};
export const escala = canvasWidth / cuadricula.ancho;

export function cleanCanvas() {
  ctx.fillStyle = "#1e2227";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function drawCircle(pos = { x: 1, y: 1 }, color = "#179211") {
  // ctx.beginPath();
  // ctx.arc(pos.x * escala, pos.y * escala, escala / 2, 0, 2 * Math.PI);
  // ctx.strokeStyle = "blue";
  // ctx.lineWidth = 5;
  // ctx.stroke();

  ctx.beginPath();
  ctx.arc(
    pos.x * escala + escala / 2,
    pos.y * escala + escala / 2,
    escala / 2,
    0,
    2 * Math.PI,
  );
  ctx.fillStyle = color;
  ctx.fill();
}

export function drawCelula(pos = { x: 1, y: 1 }) {
  // ctx.fillStyle = "#161a60";
  // ctx.fillRect(pos.x * escala, pos.y * escala, escala, escala);

  // ctx.strokeStyle = cuadricula.lineStyle;
  // ctx.lineWidth = cuadricula.lineWidth;
  // ctx.strokeRect(pos.x * escala, pos.y * escala, escala, escala);
  drawCircle(pos);
}

export function drawCelda(pos = { x: 5, y: 9 }) {
  ctx.fillStyle = "#1e2227";
  ctx.fillRect(pos.x * escala, pos.y * escala, escala, escala);

  ctx.strokeStyle = cuadricula.lineStyle;
  ctx.lineWidth = cuadricula.lineWidth;
  ctx.strokeRect(pos.x * escala, pos.y * escala, escala, escala);
}
