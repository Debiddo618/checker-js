const checkerBoardEl = document.querySelector(".checker-board");
const message = document.querySelector("#message");

let checkerBoard = [
  [0, -1, 0, -1, 0, -1, 0, -1],
  [-1, 0, -1, 0, -1, 0, -1, 0],
  [0, -1, 0, -1, 0, -1, 0, -1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
];

// initialize the checkerBoard
function renderBoard(checkerBoard) {
  checkerBoardEl.innerHTML = "";
  for (let i = 0; i < checkerBoard.length; i++) {
    for (let j = 0; j < checkerBoard[0].length; j++) {
      let checkerCell = document.createElement("div");
      checkerCell.classList.add("checker-cell");
      let checkerPiece = document.createElement("div");
      checkerPiece.classList.add("checker-piece");

      if ((i + j) % 2 === 0) {
        //even => black space
        checkerCell.classList.add("white");
      } else {
        //odd => white space
        checkerCell.classList.add("black");
      }

      if (checkerBoard[i][j] === -1) {
        checkerCell.classList.add("occupied");
        checkerPiece.classList.add("red");
        checkerCell.append(checkerPiece);
      } else if (checkerBoard[i][j] === 0) {
        checkerCell.classList.add("unoccupied");
      } else {
        if (checkerBoard[i][j] === 1) {
          checkerCell.classList.add("occupied");
          checkerPiece.classList.add("white");
          checkerCell.append(checkerPiece);
        }
      }
      checkerCell.id = `${i}` + `${j}`;
      checkerPiece.id = `${i}` + `${j}`;

      checkerCell.addEventListener("click", handleClick);
      checkerBoardEl.append(checkerCell);
    }
  }
}

renderBoard(checkerBoard);

function handleClick(event) {
  console.log(event.target);
}
