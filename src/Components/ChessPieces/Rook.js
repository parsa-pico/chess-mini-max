import ChessPiece from "./ChessPiece";
import RookMarkup from "./Markups/Rook";
export default class Rook extends ChessPiece {
  constructor(id, location, color) {
    super(id, location, color, "rook");
    this.markup = <RookMarkup color={color} />;
  }
  // isVerifiedMove(nextLocation) {
  //   if (
  //     this.location.x === nextLocation.x ||
  //     this.location.y === nextLocation.y
  //   )
  //     return true;
  //   return false;
  // }
  possibleWays(boardPieces) {
    let ways = [];

    for (let x = this.location.x - 1; x >= 0; x--) {
      const obstacle = boardPieces.find(
        (piece) =>
          piece.location.x === x && piece.location.y === this.location.y
      );
      if (!obstacle || obstacle.color !== this.color)
        ways.push({ x, y: this.location.y });
      if (obstacle) break;
    }
    for (let x = this.location.x + 1; x <= 7; x++) {
      const obstacle = boardPieces.find(
        (piece) =>
          piece.location.x === x && piece.location.y === this.location.y
      );
      if (!obstacle || obstacle.color !== this.color)
        ways.push({ x, y: this.location.y });
      if (obstacle) break;
    }
    for (let y = this.location.y - 1; y >= 0; y--) {
      const obstacle = boardPieces.find(
        (piece) =>
          piece.location.y === y && piece.location.x === this.location.x
      );
      if (!obstacle || obstacle.color !== this.color)
        ways.push({ y, x: this.location.x });
      if (obstacle) break;
    }
    for (let y = this.location.y + 1; y <= 7; y++) {
      const obstacle = boardPieces.find(
        (piece) =>
          piece.location.y === y && piece.location.x === this.location.x
      );
      if (!obstacle || obstacle.color !== this.color)
        ways.push({ y, x: this.location.x });
      if (obstacle) break;
    }
    this.removeEnemyKingFromWays(ways, boardPieces);
    return ways;
  }
}
