import { celulas } from "../game-logic/game.js";
import { drawCelula } from "../canvas/canvas.js";
export class Formas {
  constructor(x, y, nameForma, orientacion = 1) {
    this.x = x;
    this.y = y;
    this.nameForma = nameForma;
    this.orientacion = orientacion;
    this.formas = {
      punto: [{ x: this.x, y: this.y }],
      linea: [
        { x: this.x, y: this.y },
        { x: this.x + 1, y: this.y },
        { x: this.x + 2, y: this.y },
      ],
      // --- Naturalezas muertas (still lifes) ---
      bloque: [
        { x: this.x, y: this.y },
        { x: this.x + 1, y: this.y },
        { x: this.x, y: this.y + 1 },
        { x: this.x + 1, y: this.y + 1 },
      ],
      colmena: [
        { x: this.x + 1, y: this.y },
        { x: this.x + 2, y: this.y },
        { x: this.x, y: this.y + 1 },
        { x: this.x + 3, y: this.y + 1 },
        { x: this.x + 1, y: this.y + 2 },
        { x: this.x + 2, y: this.y + 2 },
      ],
      barco: [
        { x: this.x, y: this.y },
        { x: this.x + 1, y: this.y },
        { x: this.x, y: this.y + 1 },
        { x: this.x + 2, y: this.y + 1 },
        { x: this.x + 1, y: this.y + 2 },
      ],
      // --- Osciladores ---
      sapo: [
        { x: this.x + 1, y: this.y },
        { x: this.x + 2, y: this.y },
        { x: this.x + 3, y: this.y },
        { x: this.x, y: this.y + 1 },
        { x: this.x + 1, y: this.y + 1 },
        { x: this.x + 2, y: this.y + 1 },
      ],
      faro: [
        { x: this.x, y: this.y },
        { x: this.x + 1, y: this.y },
        { x: this.x, y: this.y + 1 },
        { x: this.x + 1, y: this.y + 1 },
        { x: this.x + 2, y: this.y + 2 },
        { x: this.x + 3, y: this.y + 2 },
        { x: this.x + 2, y: this.y + 3 },
        { x: this.x + 3, y: this.y + 3 },
      ],
      pulsar: [
        { x: this.x + 2, y: this.y },
        { x: this.x + 3, y: this.y },
        { x: this.x + 4, y: this.y },
        { x: this.x + 8, y: this.y },
        { x: this.x + 9, y: this.y },
        { x: this.x + 10, y: this.y },
        { x: this.x, y: this.y + 2 },
        { x: this.x + 5, y: this.y + 2 },
        { x: this.x + 7, y: this.y + 2 },
        { x: this.x + 12, y: this.y + 2 },
        { x: this.x, y: this.y + 3 },
        { x: this.x + 5, y: this.y + 3 },
        { x: this.x + 7, y: this.y + 3 },
        { x: this.x + 12, y: this.y + 3 },
        { x: this.x, y: this.y + 4 },
        { x: this.x + 5, y: this.y + 4 },
        { x: this.x + 7, y: this.y + 4 },
        { x: this.x + 12, y: this.y + 4 },
        { x: this.x + 2, y: this.y + 5 },
        { x: this.x + 3, y: this.y + 5 },
        { x: this.x + 4, y: this.y + 5 },
        { x: this.x + 8, y: this.y + 5 },
        { x: this.x + 9, y: this.y + 5 },
        { x: this.x + 10, y: this.y + 5 },
        { x: this.x + 2, y: this.y + 7 },
        { x: this.x + 3, y: this.y + 7 },
        { x: this.x + 4, y: this.y + 7 },
        { x: this.x + 8, y: this.y + 7 },
        { x: this.x + 9, y: this.y + 7 },
        { x: this.x + 10, y: this.y + 7 },
        { x: this.x, y: this.y + 8 },
        { x: this.x + 5, y: this.y + 8 },
        { x: this.x + 7, y: this.y + 8 },
        { x: this.x + 12, y: this.y + 8 },
        { x: this.x, y: this.y + 9 },
        { x: this.x + 5, y: this.y + 9 },
        { x: this.x + 7, y: this.y + 9 },
        { x: this.x + 12, y: this.y + 9 },
        { x: this.x, y: this.y + 10 },
        { x: this.x + 5, y: this.y + 10 },
        { x: this.x + 7, y: this.y + 10 },
        { x: this.x + 12, y: this.y + 10 },
        { x: this.x + 2, y: this.y + 12 },
        { x: this.x + 3, y: this.y + 12 },
        { x: this.x + 4, y: this.y + 12 },
        { x: this.x + 8, y: this.y + 12 },
        { x: this.x + 9, y: this.y + 12 },
        { x: this.x + 10, y: this.y + 12 },
      ],
      // --- Naves espaciales (spaceships) ---
      planeador: [
        { x: this.x + 1, y: this.y },
        { x: this.x + 2, y: this.y + 1 },
        { x: this.x, y: this.y + 2 },
        { x: this.x + 1, y: this.y + 2 },
        { x: this.x + 2, y: this.y + 2 },
      ],
      naveLigera: [
        { x: this.x + 1, y: this.y },
        { x: this.x + 4, y: this.y },
        { x: this.x, y: this.y + 1 },
        { x: this.x, y: this.y + 2 },
        { x: this.x + 4, y: this.y + 2 },
        { x: this.x, y: this.y + 3 },
        { x: this.x + 1, y: this.y + 3 },
        { x: this.x + 2, y: this.y + 3 },
        { x: this.x + 3, y: this.y + 3 },
      ],
      // --- Cañón de planeadores de Gosper (el patrón "infinito" más famoso) ---
      canonGosper: [
        { x: this.x + 24, y: this.y },
        { x: this.x + 22, y: this.y + 1 },
        { x: this.x + 24, y: this.y + 1 },
        { x: this.x + 12, y: this.y + 2 },
        { x: this.x + 13, y: this.y + 2 },
        { x: this.x + 20, y: this.y + 2 },
        { x: this.x + 21, y: this.y + 2 },
        { x: this.x + 34, y: this.y + 2 },
        { x: this.x + 35, y: this.y + 2 },
        { x: this.x + 11, y: this.y + 3 },
        { x: this.x + 15, y: this.y + 3 },
        { x: this.x + 20, y: this.y + 3 },
        { x: this.x + 21, y: this.y + 3 },
        { x: this.x + 34, y: this.y + 3 },
        { x: this.x + 35, y: this.y + 3 },
        { x: this.x, y: this.y + 4 },
        { x: this.x + 1, y: this.y + 4 },
        { x: this.x + 10, y: this.y + 4 },
        { x: this.x + 16, y: this.y + 4 },
        { x: this.x + 20, y: this.y + 4 },
        { x: this.x + 21, y: this.y + 4 },
        { x: this.x, y: this.y + 5 },
        { x: this.x + 1, y: this.y + 5 },
        { x: this.x + 10, y: this.y + 5 },
        { x: this.x + 14, y: this.y + 5 },
        { x: this.x + 16, y: this.y + 5 },
        { x: this.x + 17, y: this.y + 5 },
        { x: this.x + 22, y: this.y + 5 },
        { x: this.x + 24, y: this.y + 5 },
        { x: this.x + 10, y: this.y + 6 },
        { x: this.x + 16, y: this.y + 6 },
        { x: this.x + 24, y: this.y + 6 },
        { x: this.x + 11, y: this.y + 7 },
        { x: this.x + 15, y: this.y + 7 },
        { x: this.x + 12, y: this.y + 8 },
        { x: this.x + 13, y: this.y + 8 },
      ],
    };
  }
  drawForma() {
    const forma = this.formas[this.nameForma];
    const rotaciones = [
      ({ x, y }) => ({ x, y }), // 0 grados
      ({ x, y }) => ({ x: -y, y: x }), // 90 grados
      ({ x, y }) => ({ x: -x, y: -y }), // 180 grados
      ({ x, y }) => ({ x: y, y: -x }), // 270 grados
    ];
    const rotar = rotaciones[this.orientacion % 4];
    forma.forEach((celula) => {
      const relativa = {
        x: celula.x - this.x,
        y: celula.y - this.y,
      };
      const girada = rotar(relativa);
      const nuevaCelula = {
        x: this.x + girada.x,
        y: this.y + girada.y,
      };
      celulas.push(nuevaCelula);
      drawCelula(nuevaCelula);
    });
  }
}
