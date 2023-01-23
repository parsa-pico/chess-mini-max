import {
  arbitaryMove,
  checkForKingAttack,
} from "./../BoardFiles/boardFunctions";
export let testCost = 0;
export function setTestCostToZero() {
  testCost = 0;
}
export default class ChessPiece {
  constructor(id, location, color, type, weight) {
    this.id = id;
    this.location = location;
    this.color = color;
    this.type = type;
    this.weight = weight;
  }
  isVerifiedMove() {}

  possibleWaysLogic(boardPieces) {}

  possibleWays(
    boardPieces,
    isForAllPossibleWays = false,
    isForKingCheck = false
    // isForMiniMax = false
  ) {
    let ways = this.possibleWaysLogic(boardPieces);

    if (!isForKingCheck) this.removeEnemyKingFromWays(ways, boardPieces);

    if (!isForAllPossibleWays)
      this.checkForNextMove(
        boardPieces,
        ways
        // isForMiniMax
      );

    return ways;
  }

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

  checkForNextMove(
    pieces,
    ways
    // isForMiniMax
  ) {
    let deleteArray = [];

    const isWhiteTurn = this.color === "white" ? true : false;

    ways.forEach((way, index) => {
      const arbitaryPieces = arbitaryMove(pieces, this, way.x, way.y, false);
      const t1 = performance.now();
      const result = checkForKingAttack(
        arbitaryPieces,
        isWhiteTurn
        // isForMiniMax
      );
      const t2 = performance.now();
      testCost += t2 - t1;
      if (result) deleteArray.push(index);
    });
    deleteArray.reverse().forEach((index) => ways.splice(index, 1));
  }
}
