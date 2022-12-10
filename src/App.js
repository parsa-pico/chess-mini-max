import { Route, Routes } from "react-router-dom";
import Board from "./ChessComponents/Board";
import Matrix from "./MatrixComponents/Matrix";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/chess" element={<Board />} />
        <Route path="/matrix" element={<Matrix />} />
      </Routes>
    </div>
  );
}

export default App;
