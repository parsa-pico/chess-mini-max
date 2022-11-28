import React from "react";

export default function Rook({ id, color }) {
  return (
    <span id={id} className={`piece piece--${color}`}>
      ♖
    </span>
  );
}
