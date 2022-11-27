import KingMarkup from "./Markups/King";
import ChessPiece from "./ChessPiece";
import _ from "underscore";
import { allPossibleWays } from "./../BoardFiles/boardFunctions";
export default class King extends ChessPiece {
  constructor(id, location, color) {
    super(id, location, color, "king", 0);
    this.markup = <KingMarkup color={color} />;
  }
  // TODO: find a better way instead of isFoAllPossibleWays
  possibleWays(
    boardPieces,
    isForAllPossibleWays = false,
    isForKingCheck = false
  ) {
    let ways = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        // let enemyWay;
        // if (!isForAllPossibleWays) {
        //   enemyWay = allPossibleWays(boardPieces, this.enemyColor).find(
        //     (way) =>
        //       way.x === this.location.x + x && way.y === this.location.y + y
        //   );
        // }

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
          )
          //  &&
          // !enemyWay
        ) {
          ways.push({ x: this.location.x + x, y: this.location.y + y });
        }
      }
    }
    // if (!isForAllPossibleWays) this.checkForNextMove(ways, boardPieces);
    //i dont think this ever happens(remove enemyking ...)
    this.removeEnemyKingFromWays(ways, boardPieces);
    if (!isForAllPossibleWays) this.checkForNextMove(boardPieces, ways);
    return ways;
  }

  // checkForNextMove(ways, boardPieces) {
  //   let piecesCopy = [...boardPieces];
  //   const index = piecesCopy.findIndex((piece) => piece.id === this.id);
  //   piecesCopy.splice(index, 1);
  //   let deleteArray = [];
  //   ways.forEach((way, index) => {
  //     if (
  //       allPossibleWays(piecesCopy, this.enemyColor).find((enemyWay) =>
  //         _.isEqual(enemyWay, way)
  //       )
  //     )
  //       deleteArray.push(index);
  //   });
  //   deleteArray.reverse().forEach((index) => ways.splice(index, 1));
  // }
}
