import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox/SearchBox";
function NavBar() {
  const { user } = useSelector((state) => state.user);
  const [searchBox, setSearchBox] = useState(false);

  const handleSearchBox = () => {
    setSearchBox((prev) => !prev);
  };

  const UserActive = () => {
    return (
      <>
        <Link to={"/notification"}>
          <i className="fas fa-bell p-2 h-fit  cursor-pointer"></i>
        </Link>

        <i
          className="fas fa-search cursor-pointer  h-fit mx-1 p-2 rounded-full "
          onClick={handleSearchBox}
        ></i>
        <Link to={`/profile/${user?._id}`}>
          <div className="w-14 h-14 rounded-full overflow-hidden cursor-pointer">
            <img src={user?.AvatarUrl} alt="avatar" />
          </div>
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
    <div className="w-full text-white">
      <div className=" container mx-auto flex py-2 px-5">
        <div className="flex items-center">
          <div className="w-14 h-14 rounded-full overflow-hidden flex">
            <img src="/images.png" alt="logo" />
          </div>
          <h2 className="text-white ml-3 text-lg md:text-2xl font-bold ">
            YOU CAN
          </h2>
        </div>

        <div className="ml-auto text-xl flex items-center">
          {user?._id ? <UserActive /> : <UserNotFound />}
        </div>
      </div>
      {searchBox && <SearchBox handleSearchBox={handleSearchBox} />}
    </div>
  );
}

export default NavBar;
