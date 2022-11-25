import ChessPiece from "./ChessPiece";
import RookMarkup from "./Markups/Rook";
export default class Rook extends ChessPiece {
  constructor(id, location, color) {
    super(id, location, color, "rook");
    this.markup = <RookMarkup color={color} />;
  }
  isVerifiedMove(nextLocation) {
    if (
      this.location.x === nextLocation.x ||
      this.location.y === nextLocation.y
    )
      return true;
    return false;
  }
  possibleWays() {
    let ways = [];
    for (let x = 0; x <= 7; x++)
      if (x !== this.location.x) ways.push({ x, y: this.location.y });

    for (let y = 0; y <= 7; y++)
      if (y !== this.location.y) ways.push({ x: this.location.x, y });
    return ways;
  }
}
