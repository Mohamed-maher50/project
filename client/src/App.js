import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./components/Login/Login";

import Register from "./components/register/Register";
function App() {
  return (
    <div className="App pt-16">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
