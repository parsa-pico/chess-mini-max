import { Route, Routes } from "react-router-dom";
import Board from "./ChessComponents/Board";
import "./Styles/app.css";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Board />} />
      </Routes>
    </div>
  );
}

export default App;
