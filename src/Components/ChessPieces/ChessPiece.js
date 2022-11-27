import {
  arbitaryMove,
  checkForKingAttack,
} from "./../BoardFiles/boardFunctions";
export default class ChessPiece {
  constructor(id, location, color, type) {
    this.id = id;
    this.location = location;
    this.color = color;
    this.type = type;
  }
  isVerifiedMove() {}
  possibleWays() {}
  isPossibleWay(boardPieces, nextLocation) {
    const ways = this.possibleWays(boardPieces);
    const way = ways.find(
      (way) => way.x === nextLocation.x && way.y === nextLocation.y
    );
    return way ? true : false;
  }
  removeEnemyKingFromWays(ways, boardPieces) {
    const enemyKing = boardPieces.find(
      (piece) => piece.color !== this.color && piece.type === "king"
    );
    let enemyKingIndexInWays;
    if (enemyKing)
      enemyKingIndexInWays = ways.findIndex(
        (way) =>
          way.x === enemyKing.location.x && way.y === enemyKing.location.y
      );
    if (enemyKing && enemyKingIndexInWays !== -1)
      ways.splice(enemyKingIndexInWays, 1);
  }

  get enemyColor() {
    return this.color === "white" ? "black" : "white";
  }

  checkForNextMove(pieces, ways) {
    let deleteArray = [];

    const isWhiteTurn = this.color === "white" ? true : false;

    ways.forEach((way, index) => {
      const arbitaryPieces = arbitaryMove(pieces, this, way.x, way.y, false);
      const result = checkForKingAttack(arbitaryPieces, isWhiteTurn);
      if (result) deleteArray.push(index);
    });
    deleteArray.reverse().forEach((index) => ways.splice(index, 1));
  }
}
