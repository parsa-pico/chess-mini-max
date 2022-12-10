import React from "react";

export default function Square({ value, k }) {
  return (
    <span className="matrix-square">
      <span className="matrix-square__value">{value}</span>
      <span className="matrix-square__k">
        {value !== "-" && value > 0 && k + 1}
      </span>
    </span>
  );
}
