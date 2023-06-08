import { Route, Routes, useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Login from "./pages/Login/Login";
import Register from "./pages/register/Register";
import Avatar from "./pages/Avatar";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { getSocket } from "./store/SocketReducer";
import Errors from "./components/Errors";
import Layout from "./components/layout/Layout";
import Chats from "./components/Chats/Chats";
import AuthRoute from "./AuthRoute";
import Requests from "./pages/Requests";
import CoursesDashboard from "./pages/CoursesDashboard";
import CreatePlayList from "./pages/CreatePlayList";
import Courses from "./pages/Courses";
import ViewCourse from "./pages/ViewCourse";
import EnrollCourse from "./pages/EnrollCourse";

import ToUp from "./components/toUp/ToUp";
import VerifyEmail from "./pages/VerifyEmail";
import InformationVerification from "./pages/InformationVerification";
import VerifiyAccount from "./utils/Verifiy/VerifiyAccount";



function App() {
  const { user } = useSelector((state) => state.user.userData);
  const { sockets } = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  if (!sockets) dispatch(getSocket());

  useEffect(() => {
    if (sockets && user) sockets.emit("setUpConnection", user._id);
  }, [sockets]);

  return (
    <div className="App h-screen min-h-screen bg-main overflow-auto ">
      <Routes>
            <Route path="user/verifiy" element={< VerifiyAccount/>} />
            <Route path="/verifyInformation" element={<InformationVerification />}/>

            <Route path="/requests" element={ <AuthRoute> <Requests /></AuthRoute>  }/>

            <Route path="/courses" element={ <AuthRoute> <Courses /> </AuthRoute> } />

            <Route path="/course/Enroll/:id" element={   <AuthRoute>     <EnrollCourse />   </AuthRoute> } />

            <Route  path="/courses/view/:id"  element={    <AuthRoute>      <ViewCourse />    </AuthRoute>  }/>
            
            <Route  path="/avatar"  element={    <AuthRoute>      <Avatar />    </AuthRoute>  }/>

            <Route  path="courses/create/playlist"  element={    <AuthRoute>      <CreatePlayList />    </AuthRoute>  }/>
            
            <Route  path="/courses/dashboard"  element={    <AuthRoute>      <CoursesDashboard />    </AuthRoute>  }/>
          
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            
            <Route  path="/"  element={    <AuthRoute>      <Home user={user} />    </AuthRoute>  }/>
            <Route  path="/profile/:id"  element={    <AuthRoute>      <Profile />    </AuthRoute>  }/>

            <Route path="users/:id/verify/:token" element={<VerifyEmail />}></Route>
      </Routes>


      <Chats />
      <Errors />
      <ToastContainer   position="top-right"   autoClose={1000}   hideProgressBar={true}   newestOnTop={false}   closeOnClick   rtl={false}   limit={4}   pauseOnFocusLoss   draggable   pauseOnHover   theme="dark" ></ToastContainer>
      <Layout />
      <ToUp />
    </div>
  );
}

export default App;
