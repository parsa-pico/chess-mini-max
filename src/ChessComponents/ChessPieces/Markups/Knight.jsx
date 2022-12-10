import React from "react";

export default function Knight({ id, color }) {
  return (
    <span id={id} className={`piece piece--${color}`}>
      ♘
    </span>
  );
}
