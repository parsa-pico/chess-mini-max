import Knight from "../ChessPieces/Markups/Knight";
import Rook from "../ChessPieces/Markups/Rook";
export default [
  {
    id: 1,
    color: "white",
    markup: <Rook />,
    type: "rook",
    location: { x: 0, y: 0 },
  },
  {
    id: 2,
    color: "white",
    markup: <Rook />,
    type: "rook",
    location: { x: 0, y: 7 },
  },
  {
    id: 3,
    color: "white",
    markup: <Knight />,
    type: "knight",
    location: { x: 0, y: 1 },
  },
  {
    id: 4,
    color: "white",
    markup: <Knight />,
    type: "knight",
    location: { x: 0, y: 6 },
  },
];
