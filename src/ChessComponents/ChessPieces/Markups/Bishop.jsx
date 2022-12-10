import React from "react";

export default function Bishop({ id, color }) {
  return (
    <span id={id} className={`piece piece--${color}`}>
      ♗
    </span>
  );
}
