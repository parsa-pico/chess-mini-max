import ChessPiece from "./ChessPiece";
import RookMarkup from "./Markups/Rook";
export default class Rook extends ChessPiece {
  constructor(id, location, color) {
    super(id, location, color, "rook");
    this.markup = <RookMarkup />;
  }
  isVerifiedMove(nextLocation) {
    if (
      this.location.x === nextLocation.x ||
      this.location.y === nextLocation.y
    )
      return true;
    return false;
  }
}
