import _ from "underscore";
Array.prototype.findFrom = function (index, element) {
  for (let i = index; i < this.length; i++) {
    if (_.isEqual(element, this[i])) return true;
  }
  return false;
};

Array.prototype.unique = function () {
  var uniqueArray = [];
  this.forEach((element, index) => {
    if (!this.findFrom(index + 1, element)) uniqueArray.push(element);
  });
  return uniqueArray;
};

export function randomInt(min, max) {
  const randInt = Math.floor(Math.random() * (max - min) + min);
  return randInt;
}

export function allPossibleWays(boardPieces, color, isForKingCheck = false) {
  let ways = [];

  boardPieces
    .filter((piece) => piece.color === color)
    .forEach((piece) => {
      ways.push(...piece.possibleWays(boardPieces, true, isForKingCheck));
    });

  const uniqueWays = ways.unique();

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
  if (checkForPossibleWay)
    isPossible = piece.isPossibleWay(pieces, { x, y }, isArbitaryMove);
  if (!checkForPossibleWay || piece.isPossibleWay(pieces, { x, y })) {
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
