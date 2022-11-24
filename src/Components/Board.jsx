import React, { useState, useEffect } from "react";
import Square from "./Square";
import RookClass from "./ChessPieces/Rook";
import { isVerifiedMove } from "./BoardFiles/boardFunctions";
import BoardModel from "./BoardFiles/boardModel";
export default function Board() {
  const [x, setX] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  const [y, setY] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  const [pieces, setPieces] = useState(BoardModel);
  const [removedPieces, setRemovedPieces] = useState([]);
  const [selectedPiece, setSetlectedPiece] = useState(null);
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
      setSetlectedPiece(foundPiece);
    } else {
      const nextLocationPiece = findPiece(x, y);
      if (nextLocationPiece) {
        if (
          nextLocationPiece.color !== selectedPiece.color &&
          selectedPiece.isVerifiedMove({ x, y })
        ) {
          setRemovedPieces((prevState) => [...prevState, nextLocationPiece]);
          pieces.splice(nextLocationPiece.id, 1);
          selectedPiece.location = { x, y };
        }
      } else if (selectedPiece.isVerifiedMove({ x, y })) {
        console.log("hi");
        selectedPiece.location = { x, y };
      }
      setSetlectedPiece(null);
    }
  }
  console.log(removedPieces);
  return (
    <div className="board-wrapper">
      <div className="board">
        {x.map((x) =>
          y.map((y) => {
            let color, firstColor, secondColor;
            firstColor = x % 2 === 0 ? "red" : "white";
            secondColor = x % 2 === 0 ? "white" : "red";
            color = y % 2 === 0 ? firstColor : secondColor;
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
