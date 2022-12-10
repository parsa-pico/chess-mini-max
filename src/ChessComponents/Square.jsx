import React from "react";

export default function Square({
  squareColor,
  location,
  children,
  findOrMovePiece,
}) {
  return (
    <span
      onClick={() => findOrMovePiece(location.x, location.y)}
      className={`square square--${squareColor}`}
    >
      <span className="square__location">
        x={location.x},y={location.y}
      </span>
      {children}
    </span>
  );
}
