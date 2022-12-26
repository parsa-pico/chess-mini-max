import _, { first, max } from "underscore";
Array.prototype.findFrom = function (index, element) {
  for (let i = index; i < this.length; i++) {
    if (_.isEqual(element, this[i])) return true;
  }
  return false;
};
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
Array.prototype.unique = function () {
  var uniqueArray = [];
  this.forEach((element, index) => {
    if (!this.findFrom(index + 1, element)) uniqueArray.push(element);
  });
  return uniqueArray;
};
export function evaluateOnWhite(pieces) {
  let sum = 0;
  pieces.forEach((piece) => {
    sum = piece.color === "white" ? sum + piece.weight : sum - piece.weight;
  });
  return sum;
}
export function randomInt(min, max) {
  const randInt = Math.floor(Math.random() * (max - min) + min);
  return randInt;
}
export let uniqueCost = 0;
export function setUniqueCost() {
  uniqueCost = 0;
}
export function allPossibleWays(boardPieces, color, isForKingCheck = false) {
  let ways = [];

  boardPieces
    .filter((piece) => piece.color === color)
    .forEach((piece) => {
      ways.push(...piece.possibleWays(boardPieces, true, isForKingCheck));
    });
  // const t1 = performance.now();
  const uniqueWays = ways.unique();
  // const t2 = performance.now();
  // uniqueCost += t2 - t1;
  return uniqueWays;
}
export function checkForKingAttack(pieces, isWhiteTurn) {
  const thisTurnColor = isWhiteTurn ? "white" : "black";
  const enemyColor = isWhiteTurn ? "black" : "white";
  const king = pieces.find(
    (piece) => piece.type === "king" && piece.color === thisTurnColor
  );

  const result = allPossibleWays(pieces, enemyColor, true).find((way) => {
    return _.isEqual(way, king.location);
  });
  return result;
}

export function arbitaryMove(pieces, piece, x, y, checkForPossibleWay = true) {
  const piecesCopy = pieces.map((piece) => {
    const clone = Object.assign({}, piece);
    Object.setPrototypeOf(clone, piece);
    return clone;
  });

  piece = piecesCopy.find((p) => p.id === piece.id);
  movePiece(piecesCopy, piece, x, y, true, checkForPossibleWay);
  return piecesCopy;
}
// export function arbitaryMoveV2(
//   pieces,
//   piece,
//   x,
//   y,
//   checkForPossibleWay = true
// ) {
//   const piecesCopy = convertToEasyBoard(pieces);
//   movePiece(piecesCopy, piece, x, y, true, checkForPossibleWay);
//   return piecesCopy;
// }
// export function convertToEasyBoard(pieces) {
//   const easyBoard = [];
//   pieces.forEach((piece) => {
//     easyBoard.push({ ...piece });
//   });
//   return easyBoard;
// }
export let moveTime = 0;
export function movePiece(
  pieces,
  piece,
  x,
  y,
  isArbitaryMove = false,
  checkForPossibleWay = true,
  setRemovedPieces,
  setIsWhiteTurn,
  isWhiteTurn,
  setPieces
) {
  const nextLocationPiece = findPiece(pieces, x, y);
  let isPossible;
  if (checkForPossibleWay) {
    isPossible = piece.isPossibleWay(pieces, { x, y }, isArbitaryMove);
  }
  if (!checkForPossibleWay || isPossible) {
    if (nextLocationPiece) {
      if (!isArbitaryMove)
        setRemovedPieces((prevState) => [...prevState, nextLocationPiece]);
      deletePiece(pieces, nextLocationPiece.id, isArbitaryMove, setPieces);
      piece.location = { x, y };
    } else {
      piece.location = { x, y };
    }
    if (!isArbitaryMove) setIsWhiteTurn(isWhiteTurn ? false : true);
  }
}
export function deletePiece(pieces, id, isForArbitaryMove = false, setPieces) {
  let piecesCopy;
  piecesCopy = isForArbitaryMove ? pieces : [...pieces];
  const index = piecesCopy.findIndex((piece) => piece.id === id);
  piecesCopy.splice(index, 1);
  if (!isForArbitaryMove) setPieces(piecesCopy);
}
export function findPiece(pieces, x, y, color) {
  const foundPiece = pieces.find((piece) => {
    const c = color ? color : piece.color;
    return (
      piece.location.x === x && piece.location.y === y && piece.color === c
    );
  });
  if (foundPiece) return foundPiece;
  return null;
}

// export function nextBestMoveForWhite(boardPieces) {
//   let maxEval = -9999;
//   let bestPiece;
//   let bestWay;
//   boardPieces
//     .filter((p) => p.color === "white")
//     .forEach((piece) => {
//       piece.possibleWays(boardPieces).forEach((way) => {
//         const arbitaryBoard = arbitaryMove(boardPieces, piece, way.x, way.y);
//         let evaluate = evaluateOnWhite(arbitaryBoard);
//         if (evaluate > maxEval) {
//           maxEval = evaluate;
//           bestWay = way;
//           bestPiece = piece;
//         }
//       });
//     });
//   return { bestPiece, bestWay };
// }

export function allBoardsForPossibleWays(boardPieces, color) {
  let allBoards = [];

  boardPieces
    .filter((p) => p.color === color)
    .forEach((piece) => {
      piece.possibleWays(boardPieces).forEach((way) => {
        const arbitaryBoard = arbitaryMove(boardPieces, piece, way.x, way.y);
        allBoards.push({ piece, way, arbitaryBoard });
      });
    });

  return allBoards;
}

export function miniMax(board, depth, isMaximizingPlayer, firstDepth) {
  //maximizing player is white here

  let bestWay = {};
  let color;
  if (depth === 0) {
    // return { e: evaluateOnWhite(board) };
    // if (board.length !== 32)
    // if (board.length === 32)

    return evaluateOnWhite(board);
  }

  if (isMaximizingPlayer) {
    color = "white";
    let maxEval = -Infinity;
    //if there is no move for white,it means black won,so allboards.length=0,thus -infinity will return
    allBoardsForPossibleWays(board, color).forEach((obj) => {
      const evaluate = miniMax(obj.arbitaryBoard, depth - 1, false, firstDepth);
      // if (depth === firstDepth) console.log(obj, evaluate);

      if (evaluate > maxEval) {
        maxEval = evaluate;
        bestWay = { piece: obj.piece, way: obj.way };
      }
    });

    // return { e: maxEval, bestWay };
    if (depth === firstDepth) {
      // console.log(maxEval);
      return { e: maxEval, bestWay };
    }
    return maxEval;
  } else {
    color = "black";
    let minEval = Infinity;
    allBoardsForPossibleWays(board, color).forEach((obj) => {
      const evaluate = miniMax(obj.arbitaryBoard, depth - 1, true, firstDepth);
      if (evaluate < minEval) {
        minEval = evaluate;
        bestWay = obj;
      }
    });

    return minEval;
    // return { e: minEval, bestWay };
  }
}
