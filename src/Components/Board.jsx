import React, { useState, useEffect } from "react";
import Square from "./Square";
import { isVerifiedMove } from "./BoardFiles/boardFunctions";
import boardPieces from "./BoardFiles/boardPieces";
export default function Board() {
  // x is vertical postion,y is horizontal
  const [x, setX] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  const [y, setY] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  const [pieces, setPieces] = useState(boardPieces);
  const [removedPieces, setRemovedPieces] = useState([]);
  const [selectedPiece, setSetlectedPiece] = useState(null);
  const [possibleWays, setPossibleWays] = useState([]);
  function findPiece(x, y) {
    const foundPiece = pieces.find(
      (piece) => piece.location.x === x && piece.location.y === y
    );
    if (foundPiece) return foundPiece;
    return null;
  }
  function renderPiece(x, y) {
    const foundPiece = findPiece(x, y);
    if (foundPiece) return foundPiece.markup;
  }
  function selectOrMovePiece(x, y) {
    if (!selectedPiece) {
      const foundPiece = findPiece(x, y);
      if (foundPiece) {
        setPossibleWays(foundPiece.possibleWays(pieces));
        setSetlectedPiece(foundPiece);
      }
    } else {
      const nextLocationPiece = findPiece(x, y);
      if (selectedPiece.isPossibleWay(pieces, { x, y })) {
        if (nextLocationPiece) {
          setRemovedPieces((prevState) => [...prevState, nextLocationPiece]);

          deletePiece(nextLocationPiece.id);
          selectedPiece.location = { x, y };
        } else {
          selectedPiece.location = { x, y };
        }
      }

      setSetlectedPiece(null);
      setPossibleWays([]);
    }
  }
  function deletePiece(id) {
    const piecesCopy = [...pieces];
    const index = piecesCopy.findIndex((piece) => piece.id === id);
    piecesCopy.splice(index, 1);
    setPieces(piecesCopy);
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
      {removedPieces.map((piece) => (
        <h5 key={piece.id}>{piece.markup}</h5>
      ))}
      {!selectedPiece && <h4>select one piece</h4>}
    </div>
  );
}
