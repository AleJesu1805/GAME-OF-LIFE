const canvas = document.querySelector("canvas");
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext("2d");

const colorNumero = {
  0: "#697850",
  1: "#4e590f",
};

let matriz = (ancho, alto) => {
  let arr = [];
  for (let y = 0; y < alto; y++) {
    let filas = [];
    arr.push(filas);
    for (let x = 0; x < ancho; x++) {
      filas.push(0);
    }
  }
  return arr;
};

let render = (matriz) => {
  let tamTile = Math.round(canvas.height / matriz.length);
  for (let y = 0; y < matriz.length; y++) {
    for (let x = 0; x < matriz[0].length; x++) {
      let posX = x * tamTile;
      let posY = y * tamTile;

      ctx.fillStyle = colorNumero[matriz[y][x]];
      ctx.fillRect(posX, posY, tamTile, tamTile);
    }
  }
};

let actualizar = (array) => {
  for (let y = 0; y < array.length; y++) {
    for (let x = 0; x < array.length; x++) {
      if (array[y][x] === 1) {
        let celulasVecinas = [
          array[y][x + 1],
          array[y][x - 1],
          array[y + 1][x],
          array[y - 1][x],
          array[y + 1][x + 1],
          array[y - 1][x - 1],
          array[y + 1][x - 1],
          array[y - 1][x + 1],
        ];
        let cont = 0;

        celulasVecinas.forEach((cel, i) => {
          if (cel === 1) {
            cont++;
            if (cont < 2 || cont > 4) {
              array[y][x] = 0;
            } else if (cont === 3) {
              array[y][x] = 1;
            }
          }
        });

        console.log(celulasVecinas, cont);
      }
    }
  }
};

let array = matriz(20, 20);
array[10][10] = 1;
array[11][10] = 1;
array[9][10] = 1;
array[10][11] = 1;
array[10][13] = 1;
array[10][12] = 1;
array[10][14] = 1;
array[10][15] = 1;
array[10][16] = 1;
array[10][17] = 1;
array[10][18] = 1;
render(array);

const fps = 10;
const frameDuration = 1000 / fps;
let ultimoTiempo = 0;
function gameLoop(tiempoActual) {
  const delta = tiempoActual - ultimoTiempo;
  if (delta < frameDuration) return;
  ultimoTiempo = tiempoActual - (delta % frameDuration);

  requestAnimationFrame(gameLoop);
  actualizar(array);
  render(array);
}

setTimeout(() => {
  requestAnimationFrame(gameLoop);
}, 500);
