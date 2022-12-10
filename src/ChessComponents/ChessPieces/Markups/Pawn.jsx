import React from "react";

export default function Pawn({ id, color }) {
  return (
    <span id={id} className={`piece piece--${color}`}>
      ♙
    </span>
  );
}
