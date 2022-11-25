import React from "react";

export default function Knight({ color }) {
  return <span className={`piece piece--${color}`}>♗</span>;
}
