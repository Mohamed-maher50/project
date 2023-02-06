import { Route, Routes, useNavigate } from "react-router";

import { ToastContainer } from "react-toastify";
import "./App.css";
import Login from "./components/Login/Login";
import NotifcationNav from "./components/NotifcationNav/NotifcationNav";
import Register from "./components/register/Register";
import Avatar from "./pages/Avatar";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";
import Search from "./pages/Search";
import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import io from "socket.io-client";
var socket;
export { socket };
function App() {
  const { user } = useSelector((state) => state.user.userData);
  const nav = useNavigate();
  useEffect(() => {
    if (!user?._id) return nav("/login");
  }, []);
  useEffect(() => {
    socket = io("http://localhost:4000");
    socket.emit("setup", "123");
  }, [socket]);
  return (
    <div className="App h-screen min-h-screen bg-[#140029]  overflow-auto">
      <NavBar />
      <Routes>
        <Route path="/avatar" element={<Avatar />} />

        {!user?._id ? (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </>
        ) : (
          <>
            <Route path="/home/:id" element={<Home user={user} />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile/:id" element={<Profile />} />
          </>
        )}
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
