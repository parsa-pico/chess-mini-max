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
      {children}
    </span>
  );
}
