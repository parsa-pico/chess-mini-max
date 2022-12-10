import Rook from "../ChessPieces/Rook";
import Knight from "../ChessPieces/Knight";
import Bishop from "./../ChessPieces/Bishop";
import King from "../ChessPieces/King";
import Queen from "../ChessPieces/Queen";
import Pawn from "../ChessPieces/Pawn";
export default [
  new Pawn(16, { x: 6, y: 0 }, "white"),
  new Pawn(17, { x: 6, y: 1 }, "white"),
  new Pawn(18, { x: 6, y: 2 }, "white"),
  new Pawn(19, { x: 6, y: 3 }, "white"),
  new Pawn(20, { x: 6, y: 4 }, "white"),
  new Pawn(21, { x: 6, y: 5 }, "white"),
  new Pawn(22, { x: 6, y: 6 }, "white"),
  new Pawn(23, { x: 6, y: 7 }, "white"),
  new Pawn(24, { x: 1, y: 0 }, "black"),
  new Pawn(25, { x: 1, y: 1 }, "black"),
  new Pawn(26, { x: 1, y: 2 }, "black"),
  new Pawn(27, { x: 1, y: 3 }, "black"),
  new Pawn(28, { x: 1, y: 4 }, "black"),
  new Pawn(29, { x: 1, y: 5 }, "black"),
  new Pawn(30, { x: 1, y: 6 }, "black"),
  new Pawn(31, { x: 1, y: 7 }, "black"),
  new Rook(0, { x: 0, y: 0 }, "black"),
  new Rook(1, { x: 0, y: 7 }, "black"),
  new Knight(2, { x: 0, y: 1 }, "black"),
  new Knight(3, { x: 0, y: 6 }, "black"),
  new Bishop(4, { x: 0, y: 5 }, "black"),
  new Bishop(5, { x: 0, y: 2 }, "black"),
  new Knight(6, { x: 7, y: 6 }, "white"),
  new Bishop(7, { x: 7, y: 5 }, "white"),
  new Rook(8, { x: 7, y: 7 }, "white"),
  new Rook(9, { x: 7, y: 0 }, "white"),
  new Knight(10, { x: 7, y: 1 }, "white"),
  new Bishop(11, { x: 7, y: 2 }, "white"),
  new King(12, { x: 0, y: 4 }, "black"),
  new King(13, { x: 7, y: 4 }, "white"),
  new Queen(14, { x: 7, y: 3 }, "white"),
  new Queen(15, { x: 0, y: 3 }, "black"),
];
