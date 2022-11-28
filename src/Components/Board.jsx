import React, { useState, useEffect } from "react";
import Square from "./Square";
import {
  findPiece,
  movePiece,
  arbitaryMove,
  checkForKingAttack,
  nextBestMoveForWhite,
  miniMax,
  allBoardsForPossibleWays,
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
  const [isGameFinished, setIsGameFinished] = useState(false);

  useEffect(() => {
    let r;
    const color = isWhiteTurn ? "white" : "black";
    const result = checkForKingAttack(pieces, isWhiteTurn);
    if (result) setKingAttackedLocation(result);
    let allPossibleWaysForThisTurn = [];
    pieces
      .filter((p) => p.color === color)
      .forEach((p) =>
        allPossibleWaysForThisTurn.push(...p.possibleWays(pieces))
      );
    if (allPossibleWaysForThisTurn.length === 0) setIsGameFinished(true);
    setTimeout(() => {
      if (isWhiteTurn) {
        r = miniMax(pieces, 2, true);
        const translateX = (r.bestWay.way.x - r.bestWay.piece.location.x) * 50;
        const translateY = (r.bestWay.way.y - r.bestWay.piece.location.y) * 50;
        const element = document.getElementById(r.bestWay.piece.id);
        element.style.transform = `translate(${translateY}px, ${translateX}px)`;
        setTimeout(() => {
          movePiece(
            pieces,
            r.bestWay.piece,
            r.bestWay.way.x,
            r.bestWay.way.y,
            false,
            true,
            setRemovedPieces,
            setIsWhiteTurn,
            isWhiteTurn,
            setPieces
          );
        }, 1000);
      }
    }, 2);
  }, [isWhiteTurn]);

  function renderPiece(x, y) {
    const foundPiece = findPiece(pieces, x, y);
    if (foundPiece) return foundPiece.markup;
  }

  function selectOrMovePiece(x, y) {
    if (!selectedPiece) {
      let thisTurnColor = isWhiteTurn ? "white" : "black";
      const foundPiece = findPiece(pieces, x, y);
      let piecePossibleWays;

      if (foundPiece && foundPiece.color === thisTurnColor) {
        piecePossibleWays = foundPiece.possibleWays(pieces);

        if (piecePossibleWays.length !== 0) {
          setPossibleWays(piecePossibleWays);
          setSetlectedPiece(foundPiece);
        }
      }
    } else {
      const arbitaryPieces = arbitaryMove(pieces, selectedPiece, x, y);
      const result = checkForKingAttack(arbitaryPieces, isWhiteTurn);
      const translateX = (x - selectedPiece.location.x) * 50;
      const translateY = (y - selectedPiece.location.y) * 50;
      if (!result) {
        if (selectedPiece.isPossibleWay(pieces, { x, y }))
          document.getElementById(
            selectedPiece.id
          ).style.transform = `translate(${translateY}px, ${translateX}px)`;
        setTimeout(() => {
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
        }, 1000);
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
        {isGameFinished && (
          <h3>game finished-winner is {isWhiteTurn ? "black" : "white"}</h3>
        )}
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
