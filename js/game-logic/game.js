import { drawCelda, drawCelula, cuadricula } from "../canvas/canvas.js";

export let infoPopulation = document.getElementById("infoPopulation");
export let infoGeneration = document.getElementById("infoGeneration");

export let celulas = [];
export let generation = 0;

function clave(x, y) {
  return `${x},${y}`;
}

export function observarVecinos(celula, vivasSet) {
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
  for (let i = 0; i < alrededores.length; i++) {
    if (vivasSet.has(clave(alrededores[i].x, alrededores[i].y))) {
      vecinos++;
    }
  }
  return vecinos;
}

export function updateGeneration() {
  generation++;
  const siguiente = [];
  const vivasSet = new Set(celulas.map((c) => clave(c.x, c.y)));

  for (let x = 0; x < cuadricula.ancho; x++) {
    for (let y = 0; y < cuadricula.alto; y++) {
      const celda = { x, y };
      const vecinos = observarVecinos(celda, vivasSet);
      const viva = vivasSet.has(clave(x, y));

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
  infoPopulation.textContent = `POPULATION: ${celulas.length}`;
  infoGeneration.textContent = `GENERATION ${generation}`;
}

export function cleanTable() {
  celulas = [];
  updateGeneration();
}
