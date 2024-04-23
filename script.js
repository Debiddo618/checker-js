const checkerBoardEl = document.querySelector(".checker-board");
const message = document.querySelector("#message");

let turn = -1;
let selectedPiece;
let moves = [];

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
        checkerCell.dataset.player = -1;
        checkerCell.append(checkerPiece);
      } else if (checkerBoard[i][j] === 0) {
        checkerCell.classList.add("unoccupied");
        checkerCell.dataset.player = 0;
      } else {
        if (checkerBoard[i][j] === 1) {
          checkerCell.classList.add("occupied");
          checkerPiece.classList.add("white");
          checkerCell.dataset.player = 1;
          checkerCell.append(checkerPiece);
        }
      }
      checkerCell.dataset.row = i;
      checkerCell.dataset.col = j;

      checkerPiece.dataset.row = i;
      checkerPiece.dataset.col = j;
      // checkerCell.id = `${i}` + `${j}`;
      // checkerPiece.id = `${i}` + `${j}`;

      checkerCell.addEventListener("click", handleClick);
      checkerBoardEl.append(checkerCell);
    }
  }
}

renderBoard(checkerBoard);

function handleClick(event) {
  // console.log(event.target.dataset.row);
  // console.log(event.target.dataset.col);
  // console.log(event.target.dataset);
  // console.warn(event.target);
  findAvailiableMoves(event.target);
}

// takes in a piece and return availiable moves
function findAvailiableMoves(piece) {
  console.log(piece);
  if (piece.dataset.player === "0") {
    // console.log("It is a blank space");
  } else if (piece.dataset.player === "1") {
    console.log("white piece");
  } else {
    if (piece.dataset.player === "-1") {
      // console.log("red piece");
    }
  }
}

// check if coordinate object is inbound
function checkInBound(coordinate) {
  // coordinate = {row,col}
  if (
    coordinate.row < 0 ||
    coordinate.row > 7 ||
    coordinate.col < 0 ||
    coordinate.col > 7
  ) {
    return false;
  }
  return true;
}


// 1. click a cell
// 2. click  another cell
// 3. move the first cell to the second cell
