import KingMarkup from "./Markups/King";
import ChessPiece from "./ChessPiece";
import { allPossibleWays } from "./../BoardFiles/boardFunctions";
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
              piece.location.x === this.location.x + x &&
              piece.location.y === this.location.y + y &&
              piece.color === this.color
          ) &&
          !allPossibleWays(boardPieces, this.enemyColor).find(
            (way) =>
              way.x === this.location.x + x && way.y === this.location.y + y
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
