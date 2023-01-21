import { useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./components/Login/Login";
import NotifcationNav from "./components/NotifcationNav/NotifcationNav";
import Register from "./components/register/Register";
import Avatar from "./pages/Avatar";
import Home from "./pages/Home";
function App() {
  const [notifcationStatus, setNotifcationStatus] = useState(true);
  const notifcationStatusHandler = () => {
    setNotifcationStatus((prev) => !prev);
  };
  return (
    <div className="App h-screen min-h-screen   overflow-auto">
      <NotifcationNav
        notifcationStatusHandler={notifcationStatusHandler}
        notifcationStatus={notifcationStatus}
      />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={<Home notifcationStatusHandler={notifcationStatusHandler} />}
        />
        <Route path="/avatar" element={<Avatar />} />
      </Routes>
    </div>
  );
}

export default App;
