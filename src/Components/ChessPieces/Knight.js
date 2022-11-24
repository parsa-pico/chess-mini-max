import ChessPiece from "./ChessPiece";
import KnightMarkup from "./Markups/Knight";
export default class Knight extends ChessPiece {
  constructor(id, location, color) {
    super(id, location, color, "knight");
    this.markup = <KnightMarkup color={color} />;
  }
  isVerifiedMove(nextLocation) {
    if (
      nextLocation.x === this.location.x + 2 ||
      nextLocation.x === this.location.x - 2
    ) {
      if (
        nextLocation.y === this.location.y + 1 ||
        nextLocation.y === this.location.y - 1
      )
        return true;
    } else if (
      nextLocation.y === this.location.y + 2 ||
      nextLocation.y === this.location.y - 2
    )
      if (
        nextLocation.x === this.location.x + 1 ||
        nextLocation.x === this.location.x - 1
      )
        return true;
    return false;
  }
}
