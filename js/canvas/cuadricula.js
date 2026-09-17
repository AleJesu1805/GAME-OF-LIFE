import { canvas, canvasHeight, canvasWidth } from "./canvas.js";

export const cuadricula = {
  ancho: 30,
  alto: 30,
  lineWidth: 0.1,
  lineStyle: "#000000",
};
export const escala = canvasWidth / cuadricula.ancho;
