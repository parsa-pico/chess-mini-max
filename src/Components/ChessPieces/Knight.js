import ChessPiece from "./ChessPiece";
import KnightMarkup from "./Markups/Knight";
export default class Knight extends ChessPiece {
  constructor(id, location, color) {
    super(id, location, color, "knight");
    this.markup = <KnightMarkup color={color} />;
  }
  // isVerifiedMove(nextLocation) {
  //   if (
  //     nextLocation.x === this.location.x + 2 ||
  //     nextLocation.x === this.location.x - 2
  //   ) {
  //     if (
  //       nextLocation.y === this.location.y + 1 ||
  //       nextLocation.y === this.location.y - 1
  //     )
  //       return true;
  //   } else if (
  //     nextLocation.y === this.location.y + 2 ||
  //     nextLocation.y === this.location.y - 2
  //   )
  //     if (
  //       nextLocation.x === this.location.x + 1 ||
  //       nextLocation.x === this.location.x - 1
  //     )
  //       return true;
  //   return false;
  // }

  possibleWays(boardPieces) {
    let ways = [
      { x: this.location.x + 2, y: this.location.y + 1 },
      { x: this.location.x + 2, y: this.location.y - 1 },
      { x: this.location.x - 2, y: this.location.y + 1 },
      { x: this.location.x - 2, y: this.location.y - 1 },
      { x: this.location.x + 1, y: this.location.y + 2 },
      { x: this.location.x + 1, y: this.location.y - 2 },
      { x: this.location.x - 1, y: this.location.y + 2 },
      { x: this.location.x - 1, y: this.location.y - 2 },
    ];
    ways.forEach((way, index) => {
      if (
        way.x < 0 ||
        way.x > 7 ||
        way.y < 0 ||
        way.y > 7 ||
        boardPieces.find(
          (piece) =>
            piece.color === this.color &&
            piece.location.x === way.x &&
            piece.location.y === way.y
        )
      )
        ways.splice(index, 1);
    });
    this.removeEnemyKingFromWays(ways, boardPieces);
    return ways;
  }
}
