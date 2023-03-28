import { dijkstra } from "../utils/algorithms/dijkstra.js";
import { dfs } from "../utils/algorithms/dfs.js";
import { ROWS, COLS, btns } from "../utils/shared.js";

let grid = "";
let startRow;
let startCol;
let destRow;
let destCol;
let path = [];
let count = 0;
for (let row = 0; row < ROWS; row++) {
  grid += `<tr>`;
  for (let col = 0; col < COLS; col++) {
    grid += `<td style="padding:0px;"><button class="cell-btn" value=${Number.POSITIVE_INFINITY}></button></td>`;
  }
  grid += `</tr>`;
}

document.getElementById("table").innerHTML = grid;

const chooseNode = (row, col) => {
  let loc = row * COLS + col;
  if (count == 0) {
    //start node
    btns[loc].style.backgroundColor = "green";
    btns[loc].value = 0;
    startRow = row;
    startCol = col;
    path.push([startRow, startCol]);
    count++;
  } else if (count == 1) {
    //end node
    btns[loc].style.backgroundColor = "red";
    destRow = row;
    destCol = col;
    count++;
  } else {
    //block node
    btns[loc].style.backgroundColor = "var(--grid)";
    btns[loc].value = "-1";
  }
};

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", () => {
    const row = Math.floor(i / COLS);
    const col = i % COLS;
    chooseNode(row, col);
  });
}

const visual_btn = document.getElementsByClassName("visualise")[0];

visual_btn.addEventListener("click", () => {
  let opt = document.getElementsByTagName("select")[0].value;

  if (opt == 1) {
    //DFS
    const dfs_info = document.getElementsByClassName("algo-info")[0];
    dfs_info.textContent = "DFS doesn't guarantee shortest path!";
    dfs(startRow, startCol, destRow, destCol, path);
  } else if (opt == 2) {
    //Dijkstra
    const dijk_info = document.getElementsByClassName("algo-info")[0];
    dijk_info.textContent =
      "Dijkstra guarantees shortest path if no negative weights present.\
      Also in an unweighted graph it behaves just like BFS!";
    dijkstra(destRow, destCol, path);
  }
});
