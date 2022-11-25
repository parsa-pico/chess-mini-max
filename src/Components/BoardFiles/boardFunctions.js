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

export function allPossibleWays(boardPieces, color) {
  let ways = [];
  boardPieces
    .filter((piece) => piece.color === color)
    .forEach((piece) => {
      ways.push(...piece.possibleWays(boardPieces));
    });

  const uniqueWays = ways.unique();
  return uniqueWays;
}
