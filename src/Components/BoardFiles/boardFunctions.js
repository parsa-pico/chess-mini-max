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
