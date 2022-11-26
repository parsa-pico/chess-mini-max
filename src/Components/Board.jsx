import React, { useState, useEffect } from "react";
import Square from "./Square";
import {
  findPiece,
  movePiece,
  arbitaryMove,
  checkForKingAttack,
} from "./BoardFiles/boardFunctions";
import boardPieces from "./BoardFiles/boardPieces";
import _ from "underscore";
export default function Board() {
  // x is vertical postion,y is horizontal
  const [x, setX] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  const [y, setY] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);
  const [kingAttackedLocation, setKingAttackedLocation] = useState();
  const [pieces, setPieces] = useState(boardPieces);
  const [removedPieces, setRemovedPieces] = useState([]);
  const [selectedPiece, setSetlectedPiece] = useState(null);
  const [possibleWays, setPossibleWays] = useState([]);
  // useEffect(() => {
  //   const color = isWhiteTurn ? "black" : "white";
  //   const allWays = allPossibleWays(pieces, color);

  //   setPossibleWays(allWays);
  //   console.log("all ways for:", color);
  // }, [isWhiteTurn]);
  //
  //computer plays as black
  //random move
  // useEffect(() => {
  //   let BlackPiece;
  //   let blackPossibleWays = [];
  //   let nextLocation;
  //   if (!isWhiteTurn) {
  //     while (blackPossibleWays.length === 0) {
  //       while (!BlackPiece) {
  //         BlackPiece = pieces.find(
  //           (piece) => piece.id === randomInt(0, 32) && piece.color === "black"
  //         );
  //       }
  //       blackPossibleWays = BlackPiece.possibleWays(pieces);
  //       // console.log(blackPossibleWays);
  //       const randPossibleWayIndex = randomInt(0, blackPossibleWays.length - 1);
  //       nextLocation = blackPossibleWays[randPossibleWayIndex];
  //     }

  //     movePiece(BlackPiece, nextLocation.x, nextLocation.y);
  //   }
  // }, [isWhiteTurn]);
  useEffect(() => {
    const color = isWhiteTurn ? "white" : "black";
    const result = checkForKingAttack(pieces, isWhiteTurn);
    if (result) setKingAttackedLocation(result);
  }, [isWhiteTurn]);

  function randomInt(min, max) {
    const randInt = Math.floor(Math.random() * (max - min) + min);
    return randInt;
  }

  function renderPiece(x, y) {
    const foundPiece = findPiece(pieces, x, y);
    if (foundPiece) return foundPiece.markup;
  }

  function selectOrMovePiece(x, y) {
    if (!selectedPiece) {
      let thisTurnColor = isWhiteTurn ? "white" : "black";
      const foundPiece = findPiece(pieces, x, y);
      let piecePossibleWays;

      if (foundPiece) {
        piecePossibleWays = foundPiece.possibleWays(pieces);

        if (
          foundPiece.color === thisTurnColor &&
          piecePossibleWays.length !== 0
        ) {
          setPossibleWays(piecePossibleWays);
          setSetlectedPiece(foundPiece);
        }
      }
    } else {
      const arbitaryPieces = arbitaryMove(pieces, selectedPiece, x, y);
      const result = checkForKingAttack(arbitaryPieces, isWhiteTurn);
      if (!result) {
        movePiece(
          pieces,
          selectedPiece,
          x,
          y,
          false,
          true,
          setRemovedPieces,
          setIsWhiteTurn,
          isWhiteTurn,
          setPieces
        );
        if (kingAttackedLocation) setKingAttackedLocation(null);
      }
      setSetlectedPiece(null);
      setPossibleWays([]);
    }
  }

  return (
    <div className="board-wrapper">
      <div className="board">
        {x.map((x) =>
          y.map((y) => {
            let color, firstColor, secondColor;
            firstColor = x % 2 === 0 ? "red" : "white";
            secondColor = x % 2 === 0 ? "white" : "red";
            color = y % 2 === 0 ? firstColor : secondColor;
            color = possibleWays.find((way) => way.x === x && way.y === y)
              ? "green"
              : color;
            if (_.isEqual(kingAttackedLocation, { x, y })) color = "hot-red";
            return (
              <Square
                findOrMovePiece={selectOrMovePiece}
                key={[x, y]}
                location={{ x, y }}
                squareColor={color}
              >
                {renderPiece(x, y)}
              </Square>
            );
          })
        )}
      </div>
      <div className="board-wrapper__details">
        {!selectedPiece && <h4>select one piece</h4>}
        {isWhiteTurn ? <h6>white turn</h6> : <h6>black turn</h6>}
        <div className="board__removed-pieces">
          {removedPieces.map((piece) => (
            <h5 key={piece.id}>{piece.markup}</h5>
          ))}
        </div>
      </div>
    </div>
  );
}
