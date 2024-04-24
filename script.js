const checkerBoardEl = document.querySelector(".checker-board");
const messageEl = document.querySelector("#message");

const checkerCellEl = [];

let turn;
let message;
let selectedPiece = null;
let selectedLocation = null;
let moves = [];
let checkerBoard;

// initialize the board
function init() {
  checkerBoard = [
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
  ];
  checkerBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 2, 0, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 2, 0, 0, 0, 2],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
  ];
  turn = 1;
  render();
}

init();

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

      if (checkerBoard[i][j] === 2) {
        checkerCell.classList.add("occupied");
        checkerPiece.classList.add("red");
        checkerCell.dataset.player = 2;
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

// handle click
function handleClick(event) {
  // console.warn(event.target);
  console.log("/////////////");
  console.log(findFreeSpaces(event.target));
  console.log("/////////////");
}

// move a piece
function movePiece(piece, location) {
  return;
}

// takes in a piece and return availiable moves
function findFreeSpaces(piece) {
  let moves = {
    move: [],
    attack: [],
  };

  if (piece.dataset.player === "1") {
    // this is a white piece
    let leftMove = {
      row: Number(piece.dataset.row) - 1,
      col: Number(piece.dataset.col) - 1,
    };
    let rightMove = {
      row: Number(piece.dataset.row) - 1,
      col: Number(piece.dataset.col) + 1,
    };
    let rightMoveDouble = {
      row: Number(piece.dataset.row) - 2,
      col: Number(piece.dataset.col) + 2,
    };
    let leftMoveDouble = {
      row: Number(piece.dataset.row) - 2,
      col: Number(piece.dataset.col) - 2,
    };

    // adding free spaces into availiable moves
    if (checkInBound(leftMove) && !checkOccupied(leftMove)) {
      moves.move.push(leftMove);
    }
    if (checkInBound(rightMove) && !checkOccupied(rightMove)) {
      moves.move.push(rightMove);
    }

    if(checkInBound(leftMoveDouble) && checkOccupied(leftMove) && findPlayer(leftMove)==="2" &&  !checkOccupied(leftMoveDouble)){
      moves.attack.push(leftMoveDouble);
    }
    if(checkInBound(rightMoveDouble) && checkOccupied(rightMove) && findPlayer(rightMove)==="2" &&  !checkOccupied(rightMoveDouble)){
      moves.attack.push(rightMoveDouble);
    }

    // adding attacks into availiable moves
  } else if (piece.dataset.player === "2") {
    // this is a red piece
    let leftMove = {
      row: Number(piece.dataset.row) + 1,
      col: Number(piece.dataset.col) - 1,
    };
    let rightMove = {
      row: Number(piece.dataset.row) + 1,
      col: Number(piece.dataset.col) + 1,
    };
    if (checkInBound(leftMove) && !checkOccupied(leftMove)) {
      // console.log("checking left move");
      moves.left = leftMove;
    }
    if (checkInBound(rightMove) && !checkOccupied(rightMove)) {
      // console.log("Checking right move")
      moves.right = rightMove;
    }
  } else {
    // this is a empty space
  }
  return moves;
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
  let coordinateId = `${coordinate.row}` + `${coordinate.col}`;
  let checkerCell = document.getElementById(coordinateId);
  if (checkerCell.classList.contains("occupied")) {
    return true;
  } else {
    if (checkerCell.classList.contains("unoccupied")) {
      return false;
    }
  }
}

// find which player a piece belongs to (string)
function findPlayer(coordinate) {
  let coordinateId = `${coordinate.row}` + `${coordinate.col}`;
  let checkerCell = document.getElementById(coordinateId);
  return checkerCell.dataset.player;
}