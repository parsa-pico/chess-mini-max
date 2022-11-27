import ChessPiece from "./ChessPiece";
import QueenMarkup from "./Markups/Queen";

export default class Queen extends ChessPiece {
  constructor(id, location, color) {
    super(id, location, color, "queen", 9);
    this.markup = <QueenMarkup color={color} />;
  }
  possibleWays(
    boardPieces,
    isForAllPossibleWays = false,
    isForKingCheck = false
  ) {
    let ways = [];
    let x;
    let y;
    //bishop part
    for (
      x = this.location.x + 1, y = this.location.y + 1;
      x <= 7 && y <= 7;
      x++, y++
    ) {
      const obstacle = boardPieces.find(
        (piece) => piece.location.x === x && piece.location.y === y
      );

      if (!obstacle || obstacle.color !== this.color) ways.push({ x, y });
      if (obstacle) break;
    }

    for (
      x = this.location.x - 1, y = this.location.y + 1;
      x >= 0 && y <= 7;
      x--, y++
    ) {
      const obstacle = boardPieces.find(
        (piece) => piece.location.x === x && piece.location.y === y
      );
      if (!obstacle || obstacle.color !== this.color) ways.push({ x, y });
      if (obstacle) break;
    }

    for (
      x = this.location.x + 1, y = this.location.y - 1;
      x <= 7 && y >= 0;
      x++, y--
    ) {
      const obstacle = boardPieces.find(
        (piece) => piece.location.x === x && piece.location.y === y
      );
      if (!obstacle || obstacle.color !== this.color) ways.push({ x, y });
      if (obstacle) break;
    }

    for (
      x = this.location.x - 1, y = this.location.y - 1;
      x >= 0 && y >= 0;
      x--, y--
    ) {
      const obstacle = boardPieces.find(
        (piece) => piece.location.x === x && piece.location.y === y
      );
      if (!obstacle || obstacle.color !== this.color) ways.push({ x, y });
      if (obstacle) break;
    }
    //rook part
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

    if (!isForKingCheck) this.removeEnemyKingFromWays(ways, boardPieces);
    if (!isForAllPossibleWays) this.checkForNextMove(boardPieces, ways);
    return ways;
  }
}
