import { Route, Routes } from "react-router";
import "./App.css";

import Register from "./components/register/Register";
function App() {
  return (
    <div className="App pt-16">
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
