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
import { useSelector, useDispatch } from "react-redux";
import Search from "./pages/Search";
import React, { useEffect } from "react";
import NavBar from "./components/NavBar";

import Chat_comp from "./components/chat/Chat_comp";
import { addMessage, getSocket } from "./store/ChatReducer";
var socket;
export { socket };
function App() {
  const { chatsId, sockets } = useSelector((s) => s.chat);
  const { user } = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    dispatch(getSocket());
  }, []);
  useEffect(() => {
    if (!user) return nav("/login");
  }, []);
  useEffect(() => {
    if (user && sockets) {
      sockets.emit("setup", user._id);
    }
  });
  useEffect(() => {
    if (sockets)
      sockets.on("receivedMessage", (data) => {
        console.log(data);
        dispatch(addMessage(data));
      });
  }, [sockets]);
  return (
    <div className="App h-screen min-h-screen bg-secondary overflow-auto">
      <Routes>
        <Route path="/avatar" element={<Avatar />} />

        {!user ? (
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
      </Routes>{" "}
      {chatsId.map((chat, index) => {
        return <Chat_comp chat={chat} key={index} />;
      })}
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
