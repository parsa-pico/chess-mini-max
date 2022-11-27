import React from "react";

export default function Queen({ color }) {
  return <span className={`piece piece--${color}`}>♕</span>;
}
