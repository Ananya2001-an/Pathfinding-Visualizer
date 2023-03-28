import { btns, COLS } from "./shared.js";

export const colorizeFindingPath = (row, col, time) => {
  btns[
    row * COLS + col
  ].style.animation = `findColor 1s ease-in-out ${time}ms 1 forwards`;
};

export const colorizePath = (path, time = 0) => {
  if (document.getElementsByTagName("select")[0].value != 2) {
    for (let i = 0; i < path.length; i++) {
      let row = path[i][0];
      let col = path[i][1];
      btns[
        row * COLS + col
      ].style.animation = `pathColor 1s ease-in-out ${time}ms 1 forwards`;
      time += 10;
    }
  } else {
    for (let i = path.length - 1; i > -1; i--) {
      let row = path[i][0];
      let col = path[i][1];
      btns[
        row * COLS + col
      ].style.animation = `pathColor 1s ease-in-out ${time}ms 1 forwards`;
      time += 100;
    }
  }
};
