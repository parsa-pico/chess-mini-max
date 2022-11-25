import KingMarkup from "./Markups/King";
import ChessPiece from "./ChessPiece";
export default class King extends ChessPiece {
  constructor(id, location, color) {
    super(id, location, color, "king");
    this.markup = <KingMarkup color={color} />;
  }

  possibleWays(boardPieces) {
    let ways = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (
          x + this.location.x >= 0 &&
          x + this.location.x <= 7 &&
          y + this.location.y >= 0 &&
          y + this.location.y <= 7 &&
          !boardPieces.find(
            (piece) =>
              piece.location.x === x + this.location.x &&
              piece.location.y === y + this.location.y &&
              piece.color === this.color
          )
        ) {
          ways.push({ x: this.location.x + x, y: this.location.y + y });
        }
      }
    }
    this.removeEnemyKingFromWays(ways, boardPieces);
    return ways;
  }
}
