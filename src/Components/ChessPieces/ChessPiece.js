export default class ChessPiece {
  constructor(id, location, color, type) {
    this.id = id;
    this.location = location;
    this.color = color;
    this.type = type;
  }
  isVerifiedMove() {}
  possibleWays() {}
  isPossibleWay() {}
}
