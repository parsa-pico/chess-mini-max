import { Route, Routes } from "react-router-dom";
import Board from "./ChessComponents/Board";
import Home from "./Home";
import Matrix from "./MatrixComponents/Matrix";
import "./Styles/app.css";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chess" element={<Board />} />
        <Route path="/matrix" element={<Matrix />} />
      </Routes>
    </div>
  );
}

export default App;
