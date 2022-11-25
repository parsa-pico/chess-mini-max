import Rook from "../ChessPieces/Rook";
import Knight from "../ChessPieces/Knight";
import Bishop from "./../ChessPieces/Bishop";
export default [
  new Rook(0, { x: 0, y: 0 }, "black"),
  new Rook(1, { x: 0, y: 7 }, "black"),
  new Knight(2, { x: 0, y: 1 }, "black"),
  new Knight(3, { x: 0, y: 6 }, "black"),
  new Bishop(4, { x: 0, y: 5 }, "black"),
  new Bishop(5, { x: 0, y: 2 }, "black"),
  new Knight(6, { x: 7, y: 6 }, "white"),
  new Bishop(7, { x: 7, y: 5 }, "white"),
];