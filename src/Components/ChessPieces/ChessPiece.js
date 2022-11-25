export default class ChessPiece {
  constructor(id, location, color, type) {
    this.id = id;
    this.location = location;
    this.color = color;
    this.type = type;
  }
  isVerifiedMove() {}
  possibleWays() {}
  isPossibleWay(boardPieces, nextLocation) {
    const ways = this.possibleWays(boardPieces);
    const way = ways.find(
      (way) => way.x === nextLocation.x && way.y === nextLocation.y
    );
    return way ? true : false;
  }
}
