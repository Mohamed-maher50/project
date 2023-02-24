import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox/SearchBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBell } from "@fortawesome/free-solid-svg-icons";
function NavBar() {
  const { user } = useSelector((state) => state.user.userData);
  const [searchBox, setSearchBox] = useState(false);

  const handleSearchBox = () => {
    setSearchBox((prev) => !prev);
  };

  const UserActive = () => {
    return (
      <>
        <Link to={"/notification"} className="flex items-center">
          <FontAwesomeIcon
            onClick={handleSearchBox}
            icon={faBell}
            className="w-6 h-6  text-center"
          />
        </Link>
        <FontAwesomeIcon
          onClick={handleSearchBox}
          icon={faMagnifyingGlass}
          className="cursor-pointer   mx-3 w-6 h-6  rounded-full "
        />

        <Link to={`/profile/${user?._id}`} className="">
          <img
            src={user?.AvatarUrl}
            alt="avatar"
            className="w-14 h-14 rounded-full object-cover"
          />
        </Link>
      </>
    );
  };
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

  return (
    <div className="w-full text-white bg-open">
      <div className=" container mx-auto flex py-2 px-5">
        <Link to={`/`} className="flex items-center">
          <div className="w-14 h-14 rounded-full overflow-hidden flex">
            <img src="/logo1.png" alt="logo" className=" object-cover" />
          </div>
          <h2 className="text-white ml-3 text-lg md:text-2xl font-bold ">
            YOU CAN
          </h2>
        </Link>

        <div className="ml-auto text-xl flex items-center">
          {user?._id ? <UserActive /> : <UserNotFound />}
        </div>
      </div>
      {searchBox && <SearchBox handleSearchBox={handleSearchBox} />}
    </div>
  );
}

export default NavBar;
