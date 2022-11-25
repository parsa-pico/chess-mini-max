// export function isVerifiedMove(piece, nextLocation) {
//   if (piece.type === "rook") {
//     if (
//       piece.location.x === nextLocation.x ||
//       piece.location.y === nextLocation.y
//     )
//       return true;
//     return false;
//   }
//   if (piece.type === "knight") {
//     if (
//       nextLocation.x === piece.location.x + 2 ||
//       nextLocation.x === piece.location.x - 2
//     ) {
//       if (
//         nextLocation.y === piece.location.y + 1 ||
//         nextLocation.y === piece.location.y - 1
//       )
//         return true;
//     } else if (
//       nextLocation.y === piece.location.y + 2 ||
//       nextLocation.y === piece.location.y - 2
//     )
//       if (
//         nextLocation.x === piece.location.x + 1 ||
//         nextLocation.x === piece.location.x - 1
//       )
//         return true;
//   }
// }
