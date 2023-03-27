import { colorizeFindingPath, colorizePath } from "../animate.js";
import { COLS, ROWS, btns } from "../shared.js";

let parent = new Map();
let nodesToVisit = new Map();
let time = 10;

const getNodesExceptBlocks = () => {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (btns[row * COLS + col].value != "-1") {
        nodesToVisit.set(`[${row}, ${col}]`, btns[row * COLS + col].value);
      }
    }
  }
};

function getByValue(searchValue) {
  for (let [key, value] of nodesToVisit.entries()) {
    if (value == searchValue) return key;
  }
}

function findAllAncestors(arr, path) {
  let p = parent.get(arr);
  if (p != undefined) {
    path.push(p);
    findAllAncestors(`[${p[0]}, ${p[1]}]`, path);
  }
}

export const dijkstra = async (destRow, destCol, path) => {
  await getNodesExceptBlocks();
  while (nodesToVisit.size != 0) {
    let min = Math.min(...nodesToVisit.values());
    let min_key = getByValue(min);
    let min_key_parsed = JSON.parse(min_key);

    if (min_key !== `[${destRow}, ${destCol}]`) {
      colorizeFindingPath(min_key_parsed[0], min_key_parsed[1], time);
      time += 10;

      //updating values of neighbors
      if (min_key_parsed[0] - 1 != -1) {
        if (
          nodesToVisit.get(min_key) + 1 <
          nodesToVisit.get(`[${min_key_parsed[0] - 1}, ${min_key_parsed[1]}]`)
        ) {
          nodesToVisit.set(
            `[${min_key_parsed[0] - 1}, ${min_key_parsed[1]}]`,
            parseInt(nodesToVisit.get(min_key)) + 1
          );
          parent.set(
            `[${min_key_parsed[0] - 1}, ${min_key_parsed[1]}]`,
            min_key_parsed
          );
        }
      }

      if (min_key_parsed[0] + 1 != ROWS) {
        if (
          nodesToVisit.get(min_key) + 1 <
          nodesToVisit.get(`[${min_key_parsed[0] + 1}, ${min_key_parsed[1]}]`)
        ) {
          nodesToVisit.set(
            `[${min_key_parsed[0] + 1}, ${min_key_parsed[1]}]`,
            parseInt(nodesToVisit.get(min_key)) + 1
          );
          parent.set(
            `[${min_key_parsed[0] + 1}, ${min_key_parsed[1]}]`,
            min_key_parsed
          );
        }
      }

      if (min_key_parsed[1] - 1 != -1) {
        if (
          nodesToVisit.get(min_key) + 1 <
          nodesToVisit.get(`[${min_key_parsed[0]}, ${min_key_parsed[1] - 1}]`)
        ) {
          nodesToVisit.set(
            `[${min_key_parsed[0]}, ${min_key_parsed[1] - 1}]`,
            parseInt(nodesToVisit.get(min_key)) + 1
          );
          parent.set(
            `[${min_key_parsed[0]}, ${min_key_parsed[1] - 1}]`,
            min_key_parsed
          );
        }
      }

      if (min_key_parsed[1] + 1 != COLS) {
        if (
          nodesToVisit.get(min_key) + 1 <
          nodesToVisit.get(`[${min_key_parsed[0]}, ${min_key_parsed[1] + 1}]`)
        ) {
          nodesToVisit.set(
            `[${min_key_parsed[0]}, ${min_key_parsed[1] + 1}]`,
            parseInt(nodesToVisit.get(min_key)) + 1
          );
          parent.set(
            `[${min_key_parsed[0]}, ${min_key_parsed[1] + 1}]`,
            min_key_parsed
          );
        }
      }

      //delete current key since updated all its neighbors
      nodesToVisit.delete(min_key);
    } else {
      path.push([destRow, destCol]);
      findAllAncestors(`[${destRow}, ${destCol}]`, path);
      colorizePath(path);
      nodesToVisit.clear();
    }
  }
};
