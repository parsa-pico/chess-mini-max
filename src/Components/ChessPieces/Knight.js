import ChessPiece from "./ChessPiece";
import KnightMarkup from "./Markups/Knight";
export default class Knight extends ChessPiece {
  constructor(id, location, color) {
    super(id, location, color, "knight", 3);
    this.markup = <KnightMarkup color={color} />;
  }
  possibleWays(
    boardPieces,
    isForAllPossibleWays = false,
    isForKingCheck = false
  ) {
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
    let deleteArray = [];
    for (let index in ways) {
      if (
        ways[index].x < 0 ||
        ways[index].x > 7 ||
        ways[index].y < 0 ||
        ways[index].y > 7 ||
        boardPieces.find(
          (piece) =>
            piece.color === this.color &&
            piece.location.x === ways[index].x &&
            piece.location.y === ways[index].y
        )
      )
        deleteArray.push(index);
    }
    deleteArray.reverse().forEach((index) => ways.splice(index, 1));
    if (!isForKingCheck) this.removeEnemyKingFromWays(ways, boardPieces);
    if (!isForAllPossibleWays) this.checkForNextMove(boardPieces, ways);
    return ways;
  }
}
