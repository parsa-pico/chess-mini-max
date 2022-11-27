import React from "react";

export default function Pawn({ color }) {
  return <span className={`piece piece--${color}`}>♙</span>;
}
