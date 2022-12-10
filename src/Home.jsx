import React from "react";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div id="home">
      <Link className="home__link" to={"/chess"}>
        chess game
      </Link>
      <Link className="home__link" to={"/matrix"}>
        min Multipication for matrices
      </Link>
    </div>
  );
}
