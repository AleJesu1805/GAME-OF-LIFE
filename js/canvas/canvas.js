export const canvas = document.querySelector("canvas");
export const ctx = canvas.getContext("2d");
export const canvasWidth = 600;
export const canvasHeight = 600;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

export const cuadricula = {
  ancho: 50,
  alto: 50,
  lineWidth: 0.5,
  lineStyle: "#0b1431",
};
export const escala = canvasWidth / cuadricula.ancho;

export function cleanCanvas() {
  ctx.fillStyle = "#1e2227";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const colors = [
  "#8B1E3F", // Rojo vino
  "#16605A", // Verde petróleo
  "#1D3557", // Azul marino
  "#A44A1F", // Naranja quemado
  "#9A7B16", // Amarillo oscuro
  "#5A189A", // Violeta oscuro
  "#9D174D", // Rosa vino
  "#006494", // Azul profundo
  "#386641", // Verde bosque
  "#3C096C", // Púrpura oscuro
];

export function drawCircle(
  pos = { x: 1, y: 1 },
  color = colors[Math.round(Math.random() * colors.length)],
) {
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
  // ctx.fillStyle = colors[Math.round(Math.random() * colors.length)];
  ctx.fillStyle = colors[8];
  ctx.fillRect(pos.x * escala, pos.y * escala, escala, escala);

  ctx.strokeStyle = cuadricula.lineStyle;
  ctx.lineWidth = cuadricula.lineWidth;
  ctx.strokeRect(pos.x * escala, pos.y * escala, escala, escala);
  // drawCircle(pos);
}

export function drawCelda(pos = { x: 5, y: 9 }) {
  ctx.fillStyle = "#1e2227";
  ctx.fillRect(pos.x * escala, pos.y * escala, escala, escala);

  ctx.strokeStyle = cuadricula.lineStyle;
  ctx.lineWidth = cuadricula.lineWidth;
  ctx.strokeRect(pos.x * escala, pos.y * escala, escala, escala);
}
