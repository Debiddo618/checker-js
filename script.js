const checkerBoardEl = document.querySelector(".checker-board");
const messageEl = document.querySelector("#message");

const checkerCellEl = [];

let turn;
let message;
let selectedPiece = null;
let selectedLocation = null;
let moves;
let checkerBoard;
let attack;

// initialize the board
init();
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
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [1, 0, 1, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
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

// render the initial board
function render() {
  updateBoard();
  updateMessage();
}

// update message
function updateMessage() {
  if (turn === 1) {
    messageEl.innerText = "Turn of Player 1";
  } else {
    if (turn === 2) {
      messageEl.innerText = "Turn of Player 2";
    }
  }
}

// switch player
function switchPlayer() {
  if (turn === 1) {
    turn = 2;
  } else {
    if (turn === 2) {
      turn = 1;
    }
  }
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
        checkerCell.classList.add("white");
      } else {
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
  selectPieceAndLocation(event.target);
  if (selectedPiece !== null) {
    moves = findFreeSpaces(selectedPiece);
  }
  // console.error(selectedLocation);
  if (selectedLocation !== null && isInArray(moves.attack, selectedLocation)) {
    attack = true;
  } else {
    attack = false;
  }
  ////////////////////////////////////////////////////////// selected location is validated up to this point inside selectPiece
  if (selectedLocation !== null && attack) {
    movePiece(selectedPiece, selectedLocation);
    // console.log(moves, selectedLocation);
    removePiece(
      {
        row: Number(selectedPiece.dataset.row),
        col: Number(selectedPiece.dataset.col),
      },
      selectedLocation
    );
  } else {
    if (selectedLocation !== null) {
      movePiece(selectedPiece, selectedLocation);
    }
  }
  if (selectedPiece !== null && selectedLocation !== null) {
    selectedPiece = null;
    selectedLocation = null;
    switchPlayer();
  }
  updateMessage();
}

// remove a piece
function removePiece(before, after) {
  console.log(before);
  console.log(after);
  let midPoint = {
    row: (before.row + after.row) / 2,
    col: (before.col + after.col) / 2,
  };
  console.log(midPoint);
  checkerBoard[midPoint.row][midPoint.col] = 0;
  updateBoard();
}

// select the piece and location, also check if location is valid
function selectPieceAndLocation(event) {
  let locationObj = {
    row: Number(event.dataset.row),
    col: Number(event.dataset.col),
  };
  if (selectedPiece === null) {
    console.log(typeof turn);
    if (Number(event.dataset.player) === turn) {
      // console.log("setting piece");
      selectedPiece = event;
      // console.log(selectedPiece);
    }
  } else {
    if (selectedLocation === null) {
      if (event.dataset.player === "0") {
        if (
          isInArray(moves.move, locationObj) ||
          isInArray(moves.attack, locationObj)
        ) {
          selectedLocation = locationObj;
          // messageEl.innerText="valid";
        } else {
          selectedPiece = null;
          messageEl.innerText = "Invalid Move!";
        }
      }
    }
  }
}

// check if an object is contained in an Array
function isInArray(arr, obj) {
  // console.log("Inside isInarray ");
  // console.log("arr", arr);
  // console.log("obj", obj);
  const foundObject = arr.find(
    (item) => item.row === obj.row && item.col === obj.col
  );
  if (foundObject) {
    return true;
  } else {
    return false;
  }
}

// move a piece to location
function movePiece(piece, location) {
  // console.log(piece);
  // console.log(location);
  // console.log("inside movepiece");
  if (piece.dataset.player === "1" || piece.dataset.player === "2") {
    // console.log(checkerBoard);
    checkerBoard[piece.dataset.row][piece.dataset.col] = 0;
    checkerBoard[location.row][location.col] = Number(piece.dataset.player);
    // console.error(checkerBoard);
    updateBoard();
  }
}

// takes in a piece(checker-cell) and return availiable moves
function findFreeSpaces(piece) {
  let moves = {
    move: [],
    attack: [],
    attackLeft: [],
    attackRight: [],
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

    if (
      checkInBound(leftMoveDouble) &&
      checkOccupied(leftMove) &&
      findPlayer(leftMove) === "2" &&
      !checkOccupied(leftMoveDouble)
    ) {
      moves.attack.push(leftMoveDouble);
      moves.attackLeft.push([leftMove, leftMoveDouble]);
    }
    if (
      checkInBound(rightMoveDouble) &&
      checkOccupied(rightMove) &&
      findPlayer(rightMove) === "2" &&
      !checkOccupied(rightMoveDouble)
    ) {
      moves.attack.push(rightMoveDouble);
      moves.attackRight.push([rightMove, rightMoveDouble]);
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
    let leftMoveDouble = {
      row: Number(piece.dataset.row) + 2,
      col: Number(piece.dataset.col) - 2,
    };
    let rightMoveDouble = {
      row: Number(piece.dataset.row) + 2,
      col: Number(piece.dataset.col) + 2,
    };
    if (checkInBound(leftMove) && !checkOccupied(leftMove)) {
      // console.log("checking left move");
      moves.move.push(leftMove);
    }
    if (checkInBound(rightMove) && !checkOccupied(rightMove)) {
      // console.log("Checking right move")
      moves.move.push(rightMove);
    }

    if (
      checkInBound(leftMoveDouble) &&
      checkOccupied(leftMove) &&
      findPlayer(leftMove) === "1" &&
      !checkOccupied(leftMoveDouble)
    ) {
      moves.attack.push(leftMoveDouble);
      moves.attackLeft.push([leftMove, leftMoveDouble]);
    }
    if (
      checkInBound(rightMoveDouble) &&
      checkOccupied(rightMove) &&
      findPlayer(rightMove) === "1" &&
      !checkOccupied(rightMoveDouble)
    ) {
      moves.attack.push(rightMoveDouble);
      moves.attackRight.push([rightMove, rightMoveDouble]);
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
