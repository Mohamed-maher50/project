import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox/SearchBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBell,
  faPersonWalkingArrowRight,
  faUsersRectangle,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { logOut } from "../store/user";
import NotifcationNav from "./NotifcationNav/NotifcationNav";

const UserNotFound = () => {
  return (
    <>
      <Link className="mr-3" to={"/login"}>
        <span>Login</span>
      </Link>
      <Link to={"/register"}>
        <span>SignUp</span>
      </Link>
    </>
  );
};
function NavBar() {
  const { user } = useSelector((state) => state.user.userData);
  const [searchBox, setSearchBox] = useState(false);
  const [notificationStatus, setNotifcationStatus] = useState(false);
  const [isThereNotifications, setIsThereNotifications] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleSearchBox = () => {
    setSearchBox((prev) => !prev);
  };

  const notificationStatusHandler = (_) => {
    setNotifcationStatus(!notificationStatus);
    setIsThereNotifications(false);
  };

  return (
    <>
      <div className="w-full bg-white text-mainColor shadow-sm">
        <div className=" container mx-auto flex py-2 px-5">
          <Link to={`/`} className="flex items-center">
            <div className="w-14 h-14 rounded-full overflow-hidden flex">
              <img
                src="/logo1.png"
                alt="logo"
                className=" object-cover pointer-events-none"
              />
            </div>
            <h2 className="  ml-3 text-mainBlue text-lg md:text-2xl font-bold ">
              YOU CAN
            </h2>
          </Link>

          <div className="ml-auto text-mainBlue  text-xl flex items-center">
            {user?._id ? (
              <>
                <span className="flex items-center relative">
                  {isThereNotifications && (
                    <span className=" w-3 h-3 absolute top-0 right-0 black rounded-full bg-red-600"></span>
                  )}

                  <FontAwesomeIcon
                    onClick={notificationStatusHandler}
                    icon={faBell}
                    className="w-6 h-6  text-center cursor-pointer"
                  />
                </span>
                <FontAwesomeIcon
                  onClick={handleSearchBox}
                  icon={faMagnifyingGlass}
                  className="cursor-pointer   mx-3 w-6 h-6  rounded-full "
                />

                <Link to={`/profile/${user?._id}`}>
                  <img
                    src={user?.AvatarUrl}
                    alt="avatar"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                </Link>

                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  onClick={() => dispatch(logOut())}
                  className=" text-sm  cursor-pointer rounded-full w-6 ml-3 h-6 inline-block p-1"
                />
              </>
            ) : (
              <UserNotFound />
            )}
          </div>
        </div>
        {searchBox && <SearchBox handleSearchBox={handleSearchBox} />}
      </div>
      <NotifcationNav
        notificationStatus={notificationStatus}
        notificationStatusHandler={notificationStatusHandler}
        setIsThereNotifications={setIsThereNotifications}
      />
    </>
  );
}

export default NavBar;
