import PawnMarkup from "./Markups/Pawn";
import ChessPiece from "./ChessPiece";
import { findPiece } from "../BoardFiles/boardFunctions";
export default class Pawn extends ChessPiece {
  constructor(id, location, color) {
    super(id, location, color, "pawn", 1);
    this.markup = <PawnMarkup id={id} color={color} />;
    this.firstLocation = location;
  }
  possibleWays(
    boardPieces,
    isForAllPossibleWays = false,
    isForKingCheck = false
  ) {
    let ways = [];
    let x;
    let y = this.location.y;

    //two step ahead
    if (this.firstLocation === this.location) {
      x = this.color === "white" ? this.location.x - 2 : this.location.x + 2;
      const obstacle = findPiece(boardPieces, x, y);
      if (!obstacle) ways.push({ x, y });
    }
    //one step ahead
    x = this.color === "white" ? this.location.x - 1 : this.location.x + 1;
    if (x >= 0 && x <= 7) {
      const obstacle = findPiece(boardPieces, x, y);
      if (!obstacle) ways.push({ x, y });
    }
    //oblique left move
    x = this.color === "white" ? this.location.x - 1 : this.location.x + 1;
    y = this.color === "white" ? this.location.y - 1 : this.location.y + 1;
    if (
      x >= 0 &&
      x <= 7 &&
      y >= 0 &&
      y <= 7 &&
      findPiece(boardPieces, x, y, this.enemyColor)
    ) {
      ways.push({ x, y });
    }
    //oblique right move
    x = this.color === "white" ? this.location.x - 1 : this.location.x + 1;
    y = this.color === "white" ? this.location.y + 1 : this.location.y - 1;
    if (
      x >= 0 &&
      x <= 7 &&
      y >= 0 &&
      y <= 7 &&
      findPiece(boardPieces, x, y, this.enemyColor)
    ) {
      ways.push({ x, y });
    }
    if (!isForKingCheck) this.removeEnemyKingFromWays(ways, boardPieces);
    if (!isForAllPossibleWays) this.checkForNextMove(boardPieces, ways);
    return ways;
  }
}
