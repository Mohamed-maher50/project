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
import { useSelector } from "react-redux";
import Search from "./pages/Search";
function App() {
  const { user } = useSelector((state) => state.user.userData);
  return (
    <div className="App h-screen min-h-screen  bg-[#140029]  overflow-auto">
      <Routes>
        <Route path="/home" element={<Home />} />
        {!user?._id ? (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </>
        ) : (
          <>
            <Route path="/search" element={<Search />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/avatar" element={<Avatar />} />
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
