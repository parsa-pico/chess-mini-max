import React from "react";

export default function Queen({ id, color }) {
  return (
    <span id={id} className={`piece piece--${color}`}>
      ♕
    </span>
  );
}
