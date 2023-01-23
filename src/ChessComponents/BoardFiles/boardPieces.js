import Rook from "../ChessPieces/Rook";
import Knight from "../ChessPieces/Knight";
import Bishop from "./../ChessPieces/Bishop";
import King from "../ChessPieces/King";
import Queen from "../ChessPieces/Queen";
import Pawn from "../ChessPieces/Pawn";
export default [
  new Pawn(0, { x: 6, y: 0 }, "white"),
  new Pawn(1, { x: 6, y: 1 }, "white"),
  new Pawn(2, { x: 6, y: 2 }, "white"),
  new Pawn(3, { x: 6, y: 3 }, "white"),
  new Pawn(4, { x: 6, y: 4 }, "white"),
  new Pawn(5, { x: 6, y: 5 }, "white"),
  new Pawn(6, { x: 6, y: 6 }, "white"),
  new Pawn(7, { x: 6, y: 7 }, "white"),
  new Pawn(8, { x: 1, y: 0 }, "black"),
  new Pawn(9, { x: 1, y: 1 }, "black"),
  new Pawn(10, { x: 1, y: 2 }, "black"),
  new Pawn(11, { x: 1, y: 3 }, "black"),
  new Pawn(12, { x: 1, y: 4 }, "black"),
  new Pawn(13, { x: 1, y: 5 }, "black"),
  new Pawn(14, { x: 1, y: 6 }, "black"),
  new Pawn(15, { x: 1, y: 7 }, "black"),
  new Rook(16, { x: 0, y: 0 }, "black"),
  new Rook(17, { x: 0, y: 7 }, "black"),
  new Knight(18, { x: 0, y: 1 }, "black"),
  new Knight(19, { x: 0, y: 6 }, "black"),
  new Bishop(20, { x: 0, y: 5 }, "black"),
  new Bishop(21, { x: 0, y: 2 }, "black"),
  new Knight(22, { x: 7, y: 6 }, "white"),
  new Bishop(23, { x: 7, y: 5 }, "white"),
  new Rook(24, { x: 7, y: 7 }, "white"),
  new Rook(25, { x: 7, y: 0 }, "white"),
  new Knight(26, { x: 7, y: 1 }, "white"),
  new Bishop(27, { x: 7, y: 2 }, "white"),
  new King(28, { x: 0, y: 4 }, "black"),
  new King(29, { x: 7, y: 4 }, "white"),
  new Queen(30, { x: 7, y: 3 }, "white"),
  new Queen(31, { x: 0, y: 3 }, "black"),
];
