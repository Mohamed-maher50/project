import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./components/Login/Login";

import Register from "./components/register/Register";
import Avatar from "./pages/Avatar";
import Home from "./pages/Home";
function App() {
  return (
    <div className="App h-screen">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/avatar" element={<Avatar />} />
      </Routes>
    </div>
  );
}

export default App;
