import React from "react";

export default function King({ id, color }) {
  return (
    <span id={id} className={`piece piece--${color}`}>
      ♔
    </span>
  );
}
