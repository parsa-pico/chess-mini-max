import Rook from "../ChessPieces/Rook";
import Knight from "../ChessPieces/Knight";
export default [
  new Rook(0, { x: 0, y: 0 }, "black"),
  new Rook(1, { x: 0, y: 7 }, "black"),
  new Knight(2, { x: 0, y: 1 }, "black"),
  new Knight(3, { x: 0, y: 6 }, "black"),
  new Knight(4, { x: 7, y: 6 }, "white"),
];
