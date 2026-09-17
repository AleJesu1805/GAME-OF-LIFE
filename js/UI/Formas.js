import { celulas } from "../game-logic/game.js";
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
      cohete: [
        { x: this.x, y: this.y },
        { x: this.x + 1, y: this.y },
        { x: this.x + 2, y: this.y },
        { x: this.x + 2, y: this.y - 1 },
        { x: this.x + 1, y: this.y - 2 },
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
