import { btns, COLS, ROWS } from "../shared.js";
import { colorizeFindingPath } from "../animate.js";

let time = 10;
const checkInPath = (path, row, col) => {
  return path.some(
    (item) => JSON.stringify(item) === JSON.stringify([row, col])
  );
};

export const dfs = (startRow, startCol, destRow, destCol, path) => {
  if (startRow === destRow && startCol === destCol) {
    return true;
  } else if (
    startRow - 1 !== -1 &&
    btns[(startRow - 1) * COLS + startCol].value !== "-1" &&
    checkInPath(path, startRow - 1, startCol) === false
  ) {
    path.push([startRow - 1, startCol]);
    colorizeFindingPath(startRow - 1, startCol, time);
    time += 10;
    let res = dfs(startRow - 1, startCol, destRow, destCol, path);
    if (res == true) {
      return true;
    }
  } else if (
    startCol + 1 !== COLS &&
    btns[startRow * COLS + (startCol + 1)].value !== "-1" &&
    checkInPath(path, startRow, startCol + 1) === false
  ) {
    path.push([startRow, startCol + 1]);
    colorizeFindingPath(startRow, startCol + 1, time);
    time += 10;
    let res = dfs(startRow, startCol + 1, destRow, destCol, path);
    if (res == true) {
      return true;
    }
  } else if (
    startRow + 1 !== ROWS &&
    btns[(startRow + 1) * COLS + startCol].value !== "-1" &&
    checkInPath(path, startRow + 1, startCol) === false
  ) {
    path.push([startRow + 1, startCol]);
    colorizeFindingPath(startRow + 1, startCol, time);
    time += 10;
    let res = dfs(startRow + 1, startCol, destRow, destCol, path);
    if (res == true) {
      return true;
    }
  } else if (
    startCol - 1 !== -1 &&
    btns[startRow * COLS + (startCol - 1)].value !== "-1" &&
    checkInPath(path, startRow, startCol - 1) === false
  ) {
    path.push([startRow, startCol - 1]);
    colorizeFindingPath(startRow, startCol - 1, time);
    time += 10;
    let res = dfs(startRow, startCol - 1, destRow, destCol, path);
    if (res == true) {
      return true;
    }
  }

  path.pop();
  return false;
};
