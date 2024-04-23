const checkerBoardEl = document.querySelector(".checker-board");
const messageEl = document.querySelector("#message");

const checkerCellEl = [];

let turn;
let message;
let selectedPiece;
let moves = [];
let checkerBoard;

// initialize the board
function init() {
  checkerBoard = [
    [0, -1, 0, -1, 0, -1, 0, -1],
    [-1, 0, -1, 0, -1, 0, -1, 0],
    [0, -1, 0, -1, 0, -1, 0, -1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
  ];
  turn = 1;
  render();
}

// render the initial board
function render() {
  updateBoard();
  // updateMessage();
}

// update the board
function updateBoard() {
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
      checkerCell.id = `${i}` + `${j}`;

      checkerPiece.dataset.row = i;
      checkerPiece.dataset.col = j;

      checkerCell.addEventListener("click", handleClick);
      checkerCellEl.push(checkerCell);
      checkerBoardEl.append(checkerCell);
    }
  }
}

function handleClick(event) {
  // console.log(event.target.dataset.row);
  // console.log(event.target.dataset.col);
  // console.log(event.target.dataset);
  console.warn(event.target);
  findAvailiableMoves(event.target);
}

// takes in a piece and return availiable moves
function findAvailiableMoves(piece) {
  let moves = [];
  // console.log(piece);
  if (piece.dataset.player === "0") {
    // console.log("It is a blank space");
    // console.log(`The row: ${piece.dataset.row} col:${piece.dataset.col}`);
    // let coordinates = { row: piece.dataset.row, col: piece.dataset.col };
    // console.log(checkInBound(coordinates));
  } else if (piece.dataset.player === "1") {
    console.log("white piece");
    let leftMove = {
      row: Number(piece.dataset.row) - 1,
      col: Number(piece.dataset.col) - 1,
    };
    let rightMove = {
      row: Number(piece.dataset.row) - 1,
      col: Number(piece.dataset.col) + 1,
    };
    // console.warn(leftMove);
    // console.error(rightMove);
    if (checkInBound(leftMove)) {
      moves.push(leftMove);
    }
    if (checkInBound(rightMove)) {
      moves.push(rightMove);
    }
    console.log(checkInBound(rightMove));
  } else {
    if (piece.dataset.player === "-1") {
      // console.log("red piece");
      let leftMove = {
        row: Number(piece.dataset.row) + 1,
        col: Number(piece.dataset.col) - 1,
      };
      let rightMove = {
        row: Number(piece.dataset.row) + 1,
        col: Number(piece.dataset.col) + 1,
      };
      // console.warn(leftMove);
      // console.error(rightMove);
      if (checkInBound(leftMove)) {
        moves.push(leftMove);
      }
      if (checkInBound(rightMove)) {
        moves.push(rightMove);
      }
      console.log(checkInBound(rightMove));
    }
  }
}

// check if coordinate object is inbound. True if inside the board
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

//check if coordinate object is occupied. True if occupied
function checkOccupied(coordinate) {
  // {row:1,col:2} => 12
  let coordinateId = `${coordinate.row}` + `${coordinate.col}`;
  let checkerCell = document.getElementById(coordinateId);
  // console.log(checkerCell);
  if (checkerCell.classList.contains("occupied")) {
    // console.log("occupied");
    return true;
  } else {
    if (checkerCell.classList.contains("unoccupied")) {
      // console.log("unoccupied");
      return false;
    }
  }
}
// let testCoordinate = { row: 1, col: 2 };
// console.log(checkOccupied(testCoordinate));
init();
