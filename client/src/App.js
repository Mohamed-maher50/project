import { useState } from "react";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Login from "./components/Login/Login";
import NotifcationNav from "./components/NotifcationNav/NotifcationNav";
import Register from "./components/register/Register";
import Avatar from "./pages/Avatar";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
function App() {
  const [notifcationStatus, setNotifcationStatus] = useState(false);
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

        <Route path="/profile" element={<Profile />} />
        <Route path="/avatar" element={<Avatar />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      ></ToastContainer>
    </div>
  );
}

export default App;
