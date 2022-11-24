import React, { useState, useEffect } from "react";
import Square from "./Square";

import { isVerifiedMove } from "./JsFiles/boardFunctions";
import boardModel from "./JsFiles/boardModel";
export default function Board() {
  const [x, setX] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  const [y, setY] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  const [pieces, setPieces] = useState(boardModel);
  const [selectedPiece, setSetlectedPiece] = useState(null);

  function renderPiece(x, y) {
    const foundPiece = pieces.find(
      (piece) => piece.location.x === x && piece.location.y === y
    );
    if (foundPiece) return foundPiece.markup;
  }
  function findOrMovePiece(x, y) {
    if (!selectedPiece) {
      const foundPiece = pieces.find(
        (piece) => piece.location.x === x && piece.location.y === y
      );
      if (foundPiece) setSetlectedPiece(foundPiece);
    } else {
      if (isVerifiedMove(selectedPiece, { x, y }))
        selectedPiece.location = { x, y };
      setSetlectedPiece(null);
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
            return (
              <Square
                findOrMovePiece={findOrMovePiece}
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
      {!selectedPiece && <h4>select one piece</h4>}
    </div>
  );
}
